import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/Lwc_Wire_Update.getContacts';
import { updateRecord } from 'lightning/uiRecordApi';
import Id_Field from '@salesforce/schema/contact.Id';
import First_Name from '@salesforce/schema/Contact.FirstName';
import Last_Name from '@salesforce/schema/Contact.LastName';
import Email_Field from '@salesforce/schema/Contact.Email';
export default class Lwc_Wire_Update_Temp extends LightningElement {
    @track draftValues=[];
         @track  col=[
                 {label:'FirstName', fieldName:'FirstName', type:'text', editable:true},
                 {label:'LastName', fieldName:'LastName', type:'text', editable:true},
                 {label:'Email', fieldName:'Email',type:'text',editable:true}
               ];
        @wire (getContacts)  krishna;
        handleSave(event){
           const fields={};
           fields[Id_Field.fieldApiName]=event.detail.draftValues.Id;
           fields[First_Name.fieldApiName]=event.detail.draftValues.FirstName;
           fields[Last_Name.fieldApiName]=event.detail.draftValues.LastName;
           fields[Email_Field.fieldApiName]=event.detail.draftValues.Email;
           const tarfields={fields};
           updateRecord(tarfields).then(Response=>{
            alert('records saved' +Response.id);
           }).catch(error=>{
            alert('failed' +error.body.message);
           });
        }
}