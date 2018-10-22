import { WebMap, MapOptions } from '../../../nextgisweb_frontend/packages/webmap/src/webmap';
import { LeafletMapAdapter } from '../../../nextgisweb_frontend/packages/leaflet-map-adapter/src/leaflet-map-adapter';
import { QmsKit } from '../../../nextgisweb_frontend/packages/qms-kit/src/qms-kit';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Projection, Point, Marker, Icon, GeoJSON } from 'leaflet';

import 'leaflet/dist/leaflet.css';

import '../../images/marker-icon.png';
import '../../images/marker-icon-2x.png';
import '../../images/marker-shadow.png';

import '../../images/marker-icon_selected.png';
import '../../images/marker-icon-2x_selected.png';

import { BdMainItem } from '../../api/ngw';

export interface NgwMapOptions {
  mapOptions: MapOptions;
}

const markerOptions = {
  iconUrl: 'marker-icon.png',
  iconRetinaUrl: 'marker-icon-2x.png',
  shadowUrl: 'marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
};

const selectedOptions = {
  ...markerOptions, ...{
    iconUrl: 'marker-icon_selected.png',
    iconRetinaUrl: 'marker-icon-2x_selected.png',
  }
};

const _customIcon = Icon.extend({
  options: markerOptions
});

const _selectedIcon = Icon.extend({
  options: selectedOptions
});

const customIcon = new _customIcon();
const selectedIcon = new _selectedIcon();

@Component
export class NgwMap extends Vue {

  @Prop() center: [number, number];
  @Prop() zoom: number;

  webMap = new WebMap({
    mapAdapter: new LeafletMapAdapter(),
    starterKits: [new QmsKit()],
  });

  ready: boolean = false;

  mapObject;

  options: NgwMapOptions = { mapOptions: { target: 'map' } };

  markers: { [name: string]: boolean } = {};
  selected: GeoJSON;

  mounted() {
    this.mapObject = this.webMap.map.map;
    const target = this.$el as HTMLElement;
    this.createWebMap({ target, center: this.center, zoom: this.zoom }).then(() => {
      this.ready = true;
      const items = this.$store.state.bdMain.filtered;
      if (items && items.length) {
        this.addMarkers(items);
      }

      this.$store.watch((state) => state.bdMain.filtered, (_items) => {
        _items = JSON.parse(JSON.stringify(_items));
        this.addMarkers(_items);
      });

      this.$store.watch((state) => state.bdMain.detailItem, (detail: BdMainItem) => {
        this.setSelected(detail);
      });
    });
  }

  createWebMap(options?: MapOptions) {
    const webMap = this.webMap;
    this.options.mapOptions = { ...this.options.mapOptions, ...options };
    return webMap.create(options).then(() => {

      webMap.map.addControl('ZOOM', 'top-right');
      webMap.map.addControl('ATTRIBUTION', 'bottom-right', {
        customAttribution: [
          '<a href="http://nextgis.ru" target="_blank">©NextGIS</a>',
        ]
      });

      // const panel = this.createDrawerSwitcher();
      // webMap.map.addControl(panel, 'top-left');


      webMap.addBaseLayer('sputnik', 'QMS', {
        qmsid: 487
      }).then((layer) => {
        webMap.map.showLayer(layer.name);
      });

    });
  }

  // createDrawerSwitcher() {
  //   const panel = new Panel();

  //   const switcher = document.createElement('div');
  //   panel.updateBody(switcher);

  //   const buttonCounter = Vue.component('button-counter', {
  //     data: () => {
  //       return {
  //         count: 0
  //       };
  //     },
  //     template: `
  //       <v-btn fab dark small color="pink">
  //         <v-icon dark>favorite</v-icon>
  //       </v-btn>`
  //   });

  //   const s = new Vue({
  //     components: {
  //       buttonCounter
  //     },
  //     template: `
  //       <button-counter></button-counter>
  //     `
  //   });

  //   setTimeout(() => {
  //     s.$mount(switcher);
  //   }, 1000);

  //   return panel;
  // }

  findFirsVueParent(firstVueParent) {
    let found = false;
    while (!found) {
      if (firstVueParent.mapObject === undefined) {
        firstVueParent = firstVueParent.$parent;
      } else {
        found = true;
      }
    }
    return firstVueParent;
  }

  addMarkers(items: BdMainItem[]) {
    const promises: Array<Promise<any>> = items.map((item) => {
      const id = String(item.properties.id);
      if (this.markers[id] === undefined) {
        this.markers[id] = false;
        const [x, y] = item.geometry.coordinates;
        const { lat, lng } = Projection.SphericalMercator.unproject(new Point(x, y));
        item.geometry.coordinates = [lng, lat];
        return this.webMap.map.addLayer('GEOJSON', { data: item, id }).then((l) => {
          // @ts-ignore
          const layerMem = this.webMap.map._layers[l.name];
          const layer: GeoJSON = layerMem.layer;
          layer.on('click', () => {
            this.$store.dispatch('bdMain/setDetail', Number(id));
          });
          this._unselectMarker(layer);
        });
      } else {
        return Promise.resolve();
      }

    });

    const ids: string[] = items.map((x) => String(x.properties.id));

    Promise.all(promises).then(() => {
      for (const m in this.markers) {
        if (this.markers.hasOwnProperty(m)) {

          if (ids.indexOf(m) !== -1) {
            if (!this.markers[m]) {
              this.markers[m] = true;
              this.webMap.map.showLayer(m);
            }
          } else {
            if (this.markers[m]) {
              this.markers[m] = false;
              this.webMap.map.hideLayer(m);
            }
          }
        }
      }
    });
  }

  setSelected(item: BdMainItem) {

    if (item) {
      // @ts-ignore
      const layerMem = this.webMap.map._layers[item.id];
      const layerToSelect = layerMem && layerMem.layer;
      if (layerToSelect && layerToSelect !== this.selected) {
        if (this.selected) {
          this._unselectMarker(this.selected);
        }
        this.selected = layerToSelect;
        this._selectMarker(layerToSelect);
      }
    } else if (this.selected) {
      this._unselectMarker(this.selected);
    }
  }

  private _selectMarker(layer: GeoJSON) {
    layer.eachLayer((x: Marker) => {
      x.setIcon(selectedIcon);
      x.setZIndexOffset(100);
    });
  }

  private _unselectMarker(layer: GeoJSON) {
    layer.eachLayer((x: Marker) => {
      x.setIcon(customIcon);
      x.setZIndexOffset(10);
    });
  }
}
