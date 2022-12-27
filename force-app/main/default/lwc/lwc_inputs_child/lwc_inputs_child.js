import { LightningElement } from 'lwc';

export default class Lwc_inputs_child extends LightningElement {
    name;
    age;
    city;
    capturenm(event){
        this.name=event.target.value;
    }
    captureage(event){
        this.age=event.target.value;
    }
    capturecity(event){
        this.city=event.target.value;
    }
    submitt(event){
        this.dispatchEvent(new CustomEvent('evt',{detail:{nm:this.name,ag:this.age,ct:this.city}}));
    }
}
