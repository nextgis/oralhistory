import { Vue, Component, Watch } from 'vue-property-decorator';
import { BdMainItemProperties } from '../../api/ngw';
import { oralModule, OralFeature } from '../../store/modules/oral';

@Component
export class ItemsFilter extends Vue {
  form = false;
  years: [number, number] = [1900, 2018];
  minYear = 1900;
  maxYear = 2018;
  moscow: Array<{ name: string; param: string; value?: boolean }> = [
    { name: 'дворовая', param: 'mos1' },
    { name: 'легендарная', param: 'mos2' },
    { name: 'бездомная', param: 'mos3' },
    { name: 'подземная', param: 'mos4' },
    { name: 'церковная', param: 'mos5' },
    { name: 'субкультурная', param: 'mos6', value: false }
  ];
  rayon = 'Все';
  areas: string[] = [];
  areasByCities: Record<string, string> = {};

  city = 'Москва';
  cities: string[] = [];

  get items() {
    return oralModule.items;
  }

  mounted() {
    this.moscow.forEach(x => {
      x.value = x.value !== undefined ? x.value : true;
    });

    this.updateFilterValues(oralModule.items);
  }

  @Watch('items')
  updateFilterValues(items: OralFeature[]) {
    const areas: Record<string, string> = {};
    const cities: Record<string, boolean> = {};
    items.forEach(x => {
      const prop = x.properties;
      areas[prop.rayon] = prop.city;
      cities[prop.city] = true;
    });

    this.areasByCities = areas;

    const sortCities = Object.keys(cities).sort();
    if (!(this.city in cities)) {
      this.city = sortCities[0];
    }
    this.cities = sortCities;
    this.updateFilterAreas();
  }

  @Watch('city')
  updateFilterAreas() {
    const areas = this.areasByCities;
    const areasByActiveCity = [];

    for (const a in areas) {
      const val = areas[a];
      if (val === this.city) {
        areasByActiveCity.push(a);
      }
    }

    this.areas = ['Все', ...areasByActiveCity].sort();
  }

  updateCity() {
    this.rayon !== 'Все';
    this.updateFilter();
  }

  updateFilter() {
    const items = this.items.slice();

    const filtered = items.filter(x => {
      const prop: BdMainItemProperties = x.properties;
      if (prop.city !== this.city) {
        return false;
      }
      if (this.rayon && this.rayon !== 'Все' && prop.rayon !== this.rayon) {
        return false;
      }
      return true;
    });

    oralModule.setFilter(filtered);
  }
}
