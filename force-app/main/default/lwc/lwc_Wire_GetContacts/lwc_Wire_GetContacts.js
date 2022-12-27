import { LightningElement,api,track, wire } from 'lwc';
import lwccontacts from '@salesforce/apex/Lwc_GetContacts.lwccontacts';
//import FirstName from '@salesforce/schema/Contact.FirstName';
 const cols=[
                {label:'FirstName',fieldName:'FirstName',type:'text',editable:true},
                {label:'LastName',fieldName:'LastName',type:'text',editable:true},
                {label:'Email',fieldName:'Email',type:'Email'}
            ];
export default class Lwc_Wire_GetContacts extends LightningElement {
   @track col=cols;
   @wire (lwccontacts) krishna;
}