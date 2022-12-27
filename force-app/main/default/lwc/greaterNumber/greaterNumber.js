 import { LightningElement } from 'lwc';

export default class GreaterNumber extends LightningElement {
    a;
    b;
    res;
    abVal(event)
    {
        const c= event.target.name;
       if(c=="av"){
        this.a=event.target.value;
       }
       else{
        this.b=event.target.value;
        }
    }
    add(event)
    {
       
    const aa=parseInt(this.a);
    const bb=parseInt(this.b);
     this.res=aa+bb;
    }
}