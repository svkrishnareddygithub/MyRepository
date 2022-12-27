import { LightningElement,api,track,wire } from 'lwc';
import getContacts from '@salesforce/apex/retrieve_contacts_passing_acc_id.getContacts';
import { updateRecord } from 'lightning/uiRecordApi';
import Id_Field from '@salesforce/schema/Contact.Id';
import Last_Name from '@salesforce/schema/Contact.LastName'; 
export default class display_contacts extends LightningElement {
   @track  col=[
      {label:'FirstName', fieldName:'FirstName', type:'text', editable:true},
      {label:'LastName', fieldName:'LastName', type:'text', editable:true},
      {label:'Email', fieldName:'Email',type:'text',editable:true}
    ];
  @wire(getContacts,{id:'$recordId'}) krishna;
  saveMe(event){
    alert('save');
     const fields={};
     alert('s');    
     fields[Last_Name.fieldApiName]=event.detail.draftvalues[0].LastName;
     alert('sdkj');
     fields[First_Name.fieldApiName]=event.detail.draftvalues[0].FirstName;
     fields[Email_Field.fieldApiName]=event.detail.draftvalues[0].Email;
     const recordinput={fields};
     alert('saveee');
     updateRecord(recordinput).then(response=>{
        alert('record saved succesfully');
        this.draftvalues=[];
     }).catch(error=>{
        alert('faild');
     });
  }
}