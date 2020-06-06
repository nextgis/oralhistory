import { Vue, Component, Watch } from 'vue-property-decorator';
import { CirclePaint } from '@nextgis/paint';
import { getHistoryPaint } from '../OralMap/OralMap';
import { BdMainItemProperties } from '../../api/ngw';
import { appModule } from '../../store/modules/app';
import { oralModule } from '../../store/modules/oral';
import SymbolComponent from '../Symbol/Symbol.vue';
import { OralFeature } from '../../interfaces';

@Component({ components: { SymbolComponent } })
export class List extends Vue {
  portionCount = 30;

  portion: BdMainItemProperties[] = [];

  active: number | null = null;

  get listSearchText(): string {
    return oralModule.listSearchText;
  }

  get items(): BdMainItemProperties[] {
    return oralModule.sortFeatures.map((x) => x.properties);
  }

  get filtered(): OralFeature[] {
    return oralModule.filtered;
  }

  get detail(): OralFeature | false {
    return oralModule.detailItem;
  }

  get displayItems(): BdMainItemProperties[] {
    return this.getDisplayItems();
  }

  @Watch('detail')
  onDetailChange(detail?: OralFeature): void {
    const index = detail
      ? this.items.findIndex((x) => x.id === detail.id)
      : null;
    this.active = index;
  }

  @Watch('listSearchText')
  @Watch('filtered')
  resetPortions(): void {
    this.portion = [];
    this.addPortion();
  }

  mounted(): void {
    this.addPortion();
  }

  getItemPaint(item: BdMainItemProperties): CirclePaint {
    return getHistoryPaint(item);
  }

  getDisplayItems(): BdMainItemProperties[] {
    return this.items;
  }

  setDetail(id: number): void {
    oralModule.setDetail(id);
    appModule.zoomTo(id);
  }

  addPortion(): void {
    const items = this.getDisplayItems();
    const portionsLength = this.portion.length;
    const itemsLength = items.length;
    if (portionsLength < itemsLength) {
      const addLength = portionsLength + this.portionCount;
      const len = addLength > itemsLength ? itemsLength : addLength;
      for (let fry = portionsLength; fry < len; fry++) {
        const portion = items[fry];
        this.portion.push(portion);
      }
    }
  }
}
