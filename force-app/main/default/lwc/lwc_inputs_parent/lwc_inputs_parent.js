import { LightningElement } from 'lwc';

export default class Lwc_inputs_parent extends LightningElement {
    empname;
    empage;
    empcity;
    handler(event){
        this.empname=event.detail.nm;
        this.empage=event.detail.ag;
        this.empcity=event.detail.ct;
    }
}