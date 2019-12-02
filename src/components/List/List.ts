import { Vue, Component, Watch } from 'vue-property-decorator';
import { BdMainItem, BdMainItemProperties } from '../../api/ngw';
import { appModule } from '../../store/modules/app';
import { oralModule } from '../../store/modules/oral';

@Component
export class List extends Vue {
  portionCount = 30;

  portion: BdMainItemProperties[] = [];

  get listSearchText(): string {
    return appModule.listSearchText;
  }

  get items(): BdMainItemProperties[] {
    return oralModule.sortFeatures.map(x => x.properties);
  }

  get filtered() {
    return oralModule.filtered;
  }

  get detail(): BdMainItem {
    return oralModule.detailItem;
  }

  mounted() {
    this.addPortion();
  }

  get displayItems() {
    return this.getDisplayItems();
  }

  getDisplayItems(): BdMainItemProperties[] {
    if (this.listSearchText && this.listSearchText.length > 1) {
      const filteredItems = this.items.filter(item => {
        for (const p in item) {
          // @ts-ignore
          const strItem = String(item[p]);
          const searchText = this.listSearchText.toLowerCase();
          const ok = strItem.toLowerCase().indexOf(searchText) !== -1;
          if (ok) {
            return true;
          }
        }
        return false;
      });
      return filteredItems;
    } else {
      return this.items;
    }
  }

  setDetail(id: number) {
    oralModule.setDetail(id);
    appModule.zoomTo(id);
  }

  @Watch('listSearchText')
  @Watch('filtered')
  resetPortions() {
    this.portion = [];
    this.addPortion();
  }

  addPortion() {
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
