import { LightningElement,api,wire,track } from 'lwc';
import searchOrders from '@salesforce/apex/opp_order_listview_search.searchOrders';
import { NavigationMixin } from 'lightning/navigation';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import SS_TERM_DURATION from '@salesforce/schema/Opportunity_Order__c.SaaS_Service_Term_Duration__c';
import SS_PAYMENT_TERM from '@salesforce/schema/Opportunity_Order__c.SaaS_Payment_Term__c';
import invoice from '@salesforce/apex/opp_order_listview_search.invoice';
import deleteMe from '@salesforce/apex/opp_order_listview_search.deleteMe';
const colm=[
    {
        label: 'Action',
        type: 'button-icon',
        initialWidth: 75,
        typeAttributes: {
            iconName: 'doctype:pdf',
            title: 'Generate Invoice',
            variant: 'border-filled',
            alternativeText: 'pdf'
        }       
      },    
    {label:"Order id",fieldName:"Id",type:"text"},
    {label:"Project No.",fieldName:"Name",type:"text"},    
    {label:"Customer Name",fieldName:"Customer_Name__c",type:"text"},
    {label:"Order Type",fieldName:"Order_Type__c",type:"text"},
    {label:"Region(region)",fieldName:"Region_region__c",type:"text"},
    {label:"Status",fieldName:"Status__c",type:"text"}
    ];
    
const invcolm=[
    {label:"Start Date",fieldName:"Start_Date__c",type:"Date"},
    {label:"End Date",fieldName:"End_Date__c",type:"Date"},
    {label:"Due Date",fieldName:"Due_Date__c",type:"Date"},
    {label:"Total Amount",fieldName:"Total_Amount__c",type:"currency"},
    {label: 'Action',
        type: 'button-icon',
        initialWidth: 75,
        typeAttributes: {
            iconName: 'action:download',
            title: 'download',
            alternativeText: 'download'
    }}
];
export default class Opp_order_listview extends NavigationMixin(LightningElement) {
    @track col=[
        {
            label: 'Action',
            type: 'button-icon',
            initialWidth: 75,
             typeAttributes: 
            //  { rowActions: this.getRowActions }
           {
                iconName: 'doctype:pdf',
                title: 'Generate Invoice',
                variant: 'border-filled',
                alternativeText: 'pdf'  
                
            }       
          },    
        {label:"Order id",fieldName:"Id",type:"text"},
        {label:"Project No.",fieldName:"Name",type:"text"},    
        {label:"Customer Name",fieldName:"Customer_Name__c",type:"text"},
        {label:"Order Type",fieldName:"Order_Type__c",type:"text"},
        {label:"Region(region)",fieldName:"Region_region__c",type:"text"},
        {label:"Status",fieldName:"Status__c",type:"text"}
        ];

        // getRowActions(row, doneCallback) {
        //     if(row.Status__c=='Approved') {
        //         doneCallback([{ iconName: 'doctype:pdf',
        //                         title: 'Generate Invoice',
        //                         variant: 'border-filled',
        //                         alternativeText: 'pdf'}]);
        //     }
        //   }

    invcol=invcolm;
    @track searchKey='';
    cptrSearch(event){
       this.searchKey=event.target.value;

    }
    @wire(getObjectInfo, { objectApiName: 'Opportunity_Order__c' })
    obj;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: SS_TERM_DURATION })
    sspicklistvalues;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: SS_PAYMENT_TERM })
    ssPayTermOptions;

    @track visibleRecords;
    @api recordSize=10;
    totalPage=0;
    currentPage=1;
    tempdata;
    totalRecords;
    listviewflag=true;
    invoiceflag=false;
    row;
    backbuttonhandler(){
        this.listviewflag=true;
        this.invoiceflag=false;
    }
    backbuttonhandlerinvoice(){
        this.listviewflag=false;
        this.invoiceflag=true;
        this.pdfflag=false;

        if(this.totalyears!=1){
            invoice({years:this.totalyears,obj:this.row}).then(res=>{
                this.invflag=true;
                if(res){
                 this.invoiceList=res;
                }
            }).catch(error=>{
               alert('failed');
            });
        }
    }

    totalyears;
    yearlyAmount;
    today;
    duedate='';
    ssTerminationDate;
    invoiceList=[];
    invflag=false;
    handleRowAction(event){
        this.row = event.detail.row;
       // alert(this.row.Id);
        if(this.row.Status__c=='Approved'){
            this.listviewflag=false;
            this.invoiceflag=true;
        }else{
            alert('This record is not Approved');
        }
        this.totalyears=this.row.SaaS_Service_Term_Duration__c[0];   
       // alert(this.totalyears)
        if(this.row.PO_Amount__c){
                var n=(parseInt(this.row.PO_Amount__c)*2)/100;
              this.yearlyAmount=(parseInt(this.row.PO_Amount__c)+n)/parseInt(this.totalyears);
              invoice({years:this.totalyears,obj:this.row}).then(res=>{
                this.invoiceList=res;
                this.invflag=true;
              }).catch(error=>{
               alert(error.body.message);
              });
        }
        if(this.row.SaaS_Subscription_Start_Date__c){
            var dat=this.row.SaaS_Subscription_Start_Date__c;
            this.duedate = new Date(dat); 
            this.duedate.setFullYear(this.duedate.getFullYear()+1);
            this.duedate.setMonth(this.duedate.getMonth() - 2);
            this.duedate.setDate(this.duedate.getDate()-1)
            this.duedate=this.duedate.getFullYear()+'-'+this.duedate.getMonth()+'-'+this.duedate.getDate();
        
            
            this.ssTerminationDate=new Date(dat);
            this.ssTerminationDate.setMonth(this.ssTerminationDate.getMonth()+1);
            this.ssTerminationDate.setDate(this.ssTerminationDate.getDate()); 
            this.ssTerminationDate.setFullYear(parseInt(this.ssTerminationDate.getFullYear())+parseInt(this.totalyears));
            this.ssTerminationDate=this.ssTerminationDate.getFullYear()+'-'+this.ssTerminationDate.getMonth()+'-'+this.ssTerminationDate.getDate();
        }
    }
    deleteRecords;
    handleRowSelection(event){
        const selectedRows = event.detail.selectedRows;
        this.deleteRecords=new Array();
        for (let i = 0; i < selectedRows.length; i++) {
            this.deleteRecords.push(selectedRows[i]);
        }     
    }
    deleteMe(){
        deleteMe({orlist:this.deleteRecords}).then(res=>{
            alert(this.deleteRecords.length+ 'Records deleted:');
            window.location.reload();
        }).catch(error=>{
            alert(error.body.message);
        });
    }

    today;
    connectedCallback()
    {
        
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = this.today.getFullYear();

        this.today = yyyy + '/' + mm + '/' + dd;
    
    } 
    pdfflag=false;
    invoicerow;
    
    generatePdf(event){
        this.invoicerow=event.detail.row;
        this.invoiceflag=false;
        this.invflag=false;
        this.pdfflag=true;        
    }
    downloadme(){
        window.print();
    }

    handleClick(event){
        // this[NavigationMixin.Navigate]({
        //     "type": "standard__component",
        //     "attributes": {
        //         //Here customLabelExampleAura is name of lightning aura component
        //         //This aura component should implement lightning:isUrlAddressable
        //         "componentName": "Opp_Tracking"
        //     }
        // });
       window.location.replace('https://www.google.com/')
    }

    @wire(searchOrders,{name:'$searchKey'}) trackList({error,data}){
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
}