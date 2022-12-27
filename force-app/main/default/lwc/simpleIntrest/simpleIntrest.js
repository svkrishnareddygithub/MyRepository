import { LightningElement } from 'lwc';

export default class simpleIntrest extends LightningElement {
amt;
rt;
int;
total;
amount(event){
   this.amt=event.target.value;
}
rate(event){
    this.rt=event.target.value;
}
years(event){
    this.int=event.target.value;
}
call(event){
    const a=parseInt(this.amt);
    const b=parseInt(this.rt);
    const c=parseInt(this.int);
   this.total= (a*b*c)/100;
   
}
}