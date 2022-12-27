import { LightningElement ,api} from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
export default class Lwc_Delete_rec extends LightningElement {
 @api recordId;
 deleteMe(event){
    deleteRecord(this.recordId).then(Response=>{
        alert('successfully deleted');
    }).catch(Error=>{
        alert('failed');
    });
 }
}