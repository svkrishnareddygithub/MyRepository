import { LightningElement } from 'lwc';

export default class lwc_volume_buttons_parent extends LightningElement {
    vol=0;
    det='click the button to activate';
    dechandler(event){
        this.det=event.detail;
        if(this.vol>0){
            this.vol=this.vol-1;
        }
    }
    inchandler(event){
        this.det=event.detail;
        if(this.vol<100){
            this.vol=this.vol+1;
        }
    }
}