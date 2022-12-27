import { LightningElement,wire,api,track } from 'lwc';
import searchOpps from '@salesforce/apex/opp_track_list_view.searchOpps';
import { NavigationMixin } from 'lightning/navigation';
const colm=[
    {
        label: 'View',
        type: 'button-icon',
        initialWidth: 75,
        typeAttributes: {
            iconName: 'action:preview',
            title: 'Preview',
            variant: 'border-filled',
            alternativeText: 'View'
        }   
      },    
    {label:"Opportunity id",fieldName:"Id",type:"text"},
    {label:"CustomerName",fieldName:"Name",type:"text"},    
    {label:"Opportunity info",fieldName:"Opportunity_Info__c",type:"text"},
    {label:"Sales Status",fieldName:"Sales_Status__c",type:"text"},
    {label:"SalesRegion",fieldName:"Sales_Region__c",type:"text"},
    {label:"Estimated Value(PoC)",fieldName:"Estimated_Value_PoC__c",type:"currency"},
    {label:"Sales Contact",fieldName:"Sales_Contact__c",type:"text"},
    {label:"BD Contact",fieldName:"BD_Contact__c",type:"text"},
    {label:"Forecast",fieldName:"Forecast__c",type:"text"},
    {label:"Hosting",fieldName:"Hosting__c",type:"text"},
    {label:"OneSMS OpportunityID",fieldName:"OneSMS_OpportunityID__c",type:"text"},
    {label:"DXP Proposal Ref Number",fieldName:"DXP_Proposal_Ref_Number__c",type:"text"},
    {label:"SaaS Revenue (USD)",fieldName:"SaaS_Revenue__c",type:"text"},
    {label:"Comments",fieldName:"Comments__c",type:"text"}
    ];
export default class Opp_tracking_list_view extends NavigationMixin(LightningElement) {
    col=colm;
    @track searchKey='';
    cptrSearch(event){
       this.searchKey=event.target.value;

    }

    @track visibleRecords;
    @api recordSize=10;
    totalPage=0;
    currentPage=1;
    tempdata;
    totalRecords;

    handleClick(event){
        this[NavigationMixin.Navigate]({
            "type": "standard__component",
            "attributes": {
                //Here customLabelExampleAura is name of lightning aura component
                //This aura component should implement lightning:isUrlAddressable
                "componentName": "Opp_Tracking"
            }
        });
    }

    @wire(searchOpps,{name:'$searchKey'}) trackList({error,data}){
        if(data){
            this.visibleRecords=data;
            this.tempdata=data;
            this.totalRecords=data.length;
            this.currentPage=1;

            this.recordSize = Number(this.recordSize);
            this.totalPage = Math.ceil(data.length/this.recordSize);
            
                const start = (this.currentPage-1)*this.recordSize;
                const end = this.recordSize*this.currentPage;
                this.visibleRecords= this.visibleRecords.slice(start, end);

                this.updateRecords();
        }
    };    
    
    get disablePrevious(){ 
        return this.currentPage<=1
    }
    get disableNext(){ 
        return this.currentPage>=this.totalPage
    }
    recordStart;
    recordEnd;
    previousHandler(){ 
        if(this.currentPage>1){
            this.currentPage = this.currentPage-1;
            this.updateRecords();
        }
    }

    nextHandler(){
        if(this.currentPage < this.totalPage){
            this.currentPage = this.currentPage+1;
            this.updateRecords();
        }
     }
        updateRecords(){ 
            const start = (this.currentPage-1)*this.recordSize;
            const end = this.recordSize*this.currentPage;
            this.visibleRecords= this.tempdata.slice(start, end);
            
            if(this.tempdata.length>0){
                this.recordStart=start+1;
                if(this.currentPage ==this.totalPage){
                    this.recordEnd=this.visibleRecords.length+start;
                }else{
                    this.recordEnd=end;
                }
            }
        }

    refreshMe(){
        window.location.reload();
    }

    columnHeader = ['ID', 'Name', 'Source', 'SalesRegion','Sales Status' ]
    exporToExcel(event){
        if(this.tempdata.length>0){
            let doc = '<table>';
            // Add styles for the table
            doc += '<style>';
            doc += 'table, th, td {';
            doc += '    border: 1px solid black;';
            doc += '    border-collapse: collapse;';
            doc += '    width: 100%;';
            doc += '}';          
            doc += '</style>';
            // Add all the Table Headers
            doc += '<tr>';
            this.columnHeader.forEach(element => {            
                doc += '<th>'+ element +'</th>'           
            });
            doc += '</tr>';
            // Add the data rows
            this.tempdata.forEach(record => {
                doc += '<tr>';
                doc += '<th>'+record.Id+'</th>'; 
                doc += '<th>'+record.Name+'</th>'; 
                doc += '<th>'+record.Source__c+'</th>';
                doc += '<th>'+record.Sales_Region__c+'</th>'; 
                doc += '<th>'+record.Sales_Status__c+'</th>'; 
                doc += '</tr>';
            });
            doc += '</table>';
            var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
            let downloadElement = document.createElement('a');
            downloadElement.href = element;
            downloadElement.target = '_self';
            // use .csv as extension on below line if you want to export data as csv
            downloadElement.download = 'excelRecords.xls';
            document.body.appendChild(downloadElement);
            downloadElement.click();

        }else{
            alert('First select the records');
        }
    }   
}