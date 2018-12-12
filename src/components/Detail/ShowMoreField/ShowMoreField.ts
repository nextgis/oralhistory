import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export class ShowMoreField extends Vue {

  @Prop({default: ''}) text: string;
  @Prop({default: 40}) charCount: number;

  expand = false;

  get toShow() {
    if (this.expand) {
      return this.text;
    } else {
      return this.text.slice(0, this.charCount) + '...';
    }
  }

  onClick() {
    this.expand = !this.expand;
  }
}