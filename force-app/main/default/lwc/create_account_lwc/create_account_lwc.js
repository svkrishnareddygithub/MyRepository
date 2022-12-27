import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Rating from '@salesforce/schema/Account.Rating';
import { createRecord } from 'lightning/uiRecordApi';
export default class Create_account_lwc extends LightningElement {
    
    accountObject = ACCOUNT_OBJECT;
    myFields = [NAME_FIELD, Rating];

    handleAccountCreated(){
        const recdata={apiName:'Account',fields};
       createRecord(recdata).then(Response=>{
           alert('Account Created with Id:'+ Response.id);
       }).catch(error=>{
         alert('failed');
       });
     }
}