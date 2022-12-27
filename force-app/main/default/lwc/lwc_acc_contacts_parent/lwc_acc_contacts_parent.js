import LastName from '@salesforce/schema/Contact.LastName';
import getContacts from '@salesforce/apex/lwc_acc_contacts.getContacts';
import { LightningElement,track,wire } from 'lwc';

export default class Lwc_acc_contacts_parent extends LightningElement {
    @track  col=[
        {label:'FirstName', fieldName:'FirstName', type:'text', editable:true},
        {label:'LastName', fieldName:'LastName', type:'text', editable:true},
        {label:'Email', fieldName:'Email',type:'text',editable:true}
      ];
    nmm;
    @wire(getContacts,{accName:'$nmm'}) krishna;
    handler(event){
     this.nmm=event.detail.nm;
    }
}