import { LightningElement,track,api, wire } from 'lwc';
import searchTe from '@salesforce/apex/Lwc_Wire2_SearchText.searchTe';
export default class Lwc_Wire2_Search extends LightningElement {
@track col=[
             {label:'FirstName',fieldName:'FirstName',type:'text'},
             {label:'LastName',fieldName:'LastName',type:'text'},
             {label:'Email',fieldName:'Email',type:'Email'}
           ];
    @track st;
    @wire(searchTe,{searchText:'$st'}) krishna;
    capture(event){
        this.st=event.target.value;
        this.st=event.target.value;
    }
}