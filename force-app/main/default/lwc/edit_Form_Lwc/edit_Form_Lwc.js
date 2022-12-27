import { LightningElement,api} from 'lwc';

export default class edit_Form_Lwc extends LightningElement 
{
  @api recordId;
  reset(event){
    const inputFields=this.template.querySelectorAll('lightning-input-field');
    inputFields.forEach(field=>{field.reset();});
  }
}