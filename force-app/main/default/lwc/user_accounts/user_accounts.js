import { LightningElement,wire } from 'lwc';
import usersNames from '@salesforce/apex/user_accounts.usersNames';
import accList from '@salesforce/apex/user_accounts.accList';
const colmm=[{label:'Name',fieldName:'Name',type:'text'},
            {label:'Rating',fieldName:'Rating',type:'text'}];
export default class User_accounts extends LightningElement {
    usersdata=[];
    coll=colmm;
  @wire (usersNames)userNamess(data,error){
    if(data){
            this.usersdata=data.data;
      
    }else{
        alert('failed');
    }
  }
  accountsdata;
  id;
  handleClick(event){
    this.name=event.target.title;
     accList({'ids':this.name}).then(res=>{
        this.accountsdata=res;
     }).catch(error=>{
        alert('fail:'+error);
     })
  }
}