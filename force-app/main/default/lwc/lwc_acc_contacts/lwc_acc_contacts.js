import { LightningElement,track,wire } from 'lwc';
import getContacts from '@salesforce/apex/lwc_acc_contacts.getContacts';
export default class Lwc_acc_contacts extends LightningElement {
    name;
    name2;
    @wire(getContacts,{accName:'$name2'}) krishna;
    @track  col=[
        {label:'FirstName', fieldName:'FirstName', type:'text', editable:true},
        {label:'LastName', fieldName:'LastName', type:'text', editable:true},
        {label:'Email', fieldName:'Email',type:'text',editable:true}
      ];
    captureAcc(event){
        this.name=event.target.value;
    }
    search(event){
       this.dispatchEvent(new CustomEvent("create",{detail:{nm:this.name}}));
       this.name2=this.name;
    }
}