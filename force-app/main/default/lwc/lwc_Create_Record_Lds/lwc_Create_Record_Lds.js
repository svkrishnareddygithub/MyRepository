import { createRecord } from 'lightning/uiRecordApi';
import { LightningElement } from 'lwc';

export default class Lwc_Create_Record_Lds extends LightningElement {
    accName;
    accRating;
    accPhone;
    accIndustry;
    
    capture(event){
       const nm=event.target.name;
        if(nm=='name'){
          this.accName=event.target.value;
        }
        else if(nm=='rating'){
            this.accRating=event.target.value;
        }else if(nm=='phone'){
            this.accPhone=event.target.value;
        }else if(nm=='industry'){
            this.accIndustry=event.target.value;
        }
    }
    create(event){
        const fields={'Name':this.accName,'Phone':this.accPhone,'Rating':this.accRating,'Industry':this.accIndustry};
        const recdata={apiName:'Account',fields};
        createRecord(recdata).then(Response=>{
            alert('account is created successfully with id'+Response.id);
        }).catch(error=>{
            alert('failed');
        });

    }
    reset(event){
     this.accName='';
     this.accRating='';
     this.accPhone='';
     this.accIndustry='';
    }
}