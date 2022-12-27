import { LightningElement } from 'lwc';

export default class lwc_volume_buttons extends LightningElement {
    decreasevol(event){
       const dec=new CustomEvent("decrease",{detail:"decrese volume"});
       this.dispatchEvent(dec);
    }
    increasevol(event){
          this.dispatchEvent(new CustomEvent("increase",{detail:"increase volume"}));
    }
}