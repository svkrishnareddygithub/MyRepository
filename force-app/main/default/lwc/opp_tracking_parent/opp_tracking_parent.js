import { LightningElement, wire,track,api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import source from '@salesforce/schema/Opportunity_Track__c.Source__c';
import opptype from  '@salesforce/schema/Opportunity_Track__c.Opportunity_Type__c';
import ss from  '@salesforce/schema/Opportunity_Track__c.Sales_Status__c';
import chan from  '@salesforce/schema/Opportunity_Track__c.Chance__c';
import cur from  '@salesforce/schema/Opportunity_Track__c.Currency_Type__c';
import host from  '@salesforce/schema/Opportunity_Track__c.Hosting__c';
import subsale from  '@salesforce/schema/Opportunity_Track__c.Sub_Sales_Region__c';
import bhqList from  '@salesforce/schema/Opportunity_Track__c.BHQ__c';
import ap from  '@salesforce/schema/OppServices__c.App__c';
import tech from  '@salesforce/schema/OppServices__c.Technologies__c';
import getTechnology from '@salesforce/apex/opp_tracking_class.getTechnology';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import uploadFiles from '@salesforce/apex/opp_tracking_class.uploadFiles'
const MAX_FILE_SIZE = 2097152;
import ListServices from '@salesforce/apex/opp_tracking_class.ListServices';
import insertList from '@salesforce/apex/opp_tracking_class.insertList';
import { NavigationMixin } from 'lightning/navigation';

export default class Opp_tracking_parent extends NavigationMixin(LightningElement) {
    
    @wire(getObjectInfo, { objectApiName:'Opportunity_Track__c' }) obj;

    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: source })
    sourceData;
    
    showSalesRegpicklist=false;
    salesRegPickList=[];
    dependentPicklist;
    @track finalDependentVal=[];
    @track selectedSalesReg;
    @track  selectedSubSalesReg;
    dependentDisabled=true;
    showdependent = false;
    
    //sales region picklist values
    @wire(getPicklistValuesByRecordType, { objectApiName: 'Opportunity_Track__c', recordTypeId: '$obj.data.defaultRecordTypeId' })
    fetchPicklist({error,data}){
        
        if(data && data.picklistFieldValues){
            data.picklistFieldValues["Sales_Region__c"].values.forEach(optionData => {
                this.salesRegPickList.push({label : optionData.label, value : optionData.value});
            });
            this.dependentPicklist = data.picklistFieldValues["Sub_Sales_Region__c"];
            this.showSalesRegpicklist = true;
        }
    };
  //salesRegion selected values 
    cptrSalesReg(event){
        this.finalDependentVal=[];
        this.showdependent = false;
        this.selectedSalesReg = event.target.value;
        let controllerValues = this.dependentPicklist.controllerValues;
        this.dependentPicklist.values.forEach(depVal => {
           // alert(depVal.value)   depval contains the dependentpicklistvalues
            depVal.validFor.forEach(depKey =>{
             //   alert(depKey) depkey contains the position of the value like 8,10,11
                if(depKey === controllerValues[this.selectedSalesReg]){
                    this.dependentDisabled = false;
                    this.showdependent = true;
                    this.finalDependentVal.push({label : depVal.label, value : depVal.value});
                }
            });
            
        });
    }
    cptrSubSalesReg(event){
        this.selectedSubSalesReg=event.target.value;
    }


    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: subsale})
    subsaleRegData;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: opptype })
    opType;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: ss })
    salesStatus;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: chan})
    chance;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: cur})
    currency;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: host})
    hostingData;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: bhqList})
    bhq;
    today;
    connectedCallback()
    {
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = this.today.getFullYear();

        this.today = mm + '/' + dd + '/' + yyyy;
    
    }
    @track selectedSource='External';
    @track opprtType='POC';
    estValPoCTrueFalse=true;
    @track sStatus='Lead/Demand';
    roughBusVol;
    @track selectedChance='Low';

    @track CurrencyType='USD';
   
    LocEstValuePoC;
    LocEstValuePro;
    EstValuePoC;
    EstValuePro;

    capturecustomerName(event){
     this.customerName=event.target.value;
    }
    sourceHandler(event)
    {
        this.selectedSource=event.target.value;
    }
    cptrBDCon(event){
        this.BDCon=event.target.value;
   }
   captureOppInfo(event){
       this.OppInfo=event.target.value;
   }
    captureOppStart(event){
        this.OppStartDate=event.target.value;
    }
    cptrSalesCon(event){
        this.SalesCon=event.target.value;
    }
    
    cprtComment(event){
        this.comments=event.target.value;
    }
  
    cptrOpType(event){
        this.opprtType=event.target.value;
        if(this.opprtType!='POC'){
            this.estValProTrueFalse=true;
            this.estValPoCTrueFalse=false;
            this.locPoCEstValTrueFalse=false;
            this.locProEstValTrueFalse=false;
        }
        else if(this.opprtType=='POC'){
            this.estValProTrueFalse=false;
            this.estValPoCTrueFalse=true;
        }
        if(this.CurrencyType!='USD'){
            if(this.opprtType!='POC'){
                this.estValProTrueFalse=true;
                this.estValPoCTrueFalse=false;
                this.locProEstValTrueFalse=true;
                this.locPoCEstValTrueFalse=false;
            }else if(this.opprtType=='POC'){
                this.estValProTrueFalse=false;
                this.estValPoCTrueFalse=true;
                this.locProEstValTrueFalse=false;
                this.locPoCEstValTrueFalse=true;
            }
        }
    }
    cptrLocEstValuePoC(event){
        this.LocEstValuePoC=event.target.value;
    }
    cptrLocEstValuePro(event){
         this.LocEstValuePro=event.target.value;
    }
    cptrEstValuePoC(event){
       this.EstValuePoC=event.target.value;
    }
    cptrEstValuePro(event){
       this.EstValuePro=event.target.value;
    }
    cptrForecast(event){
        this.forecast=event.target.value;
    }
    cptrBHQ(event){
        this.bhqvalue=event.target.value;
    }
    cptrSalesStatus(event){
        this.sStatus=event.target.value;
         if(this.sStatus=='Exploration' || this.sStatus=='Marketing Activities'){
            this.selectedChance='NA';
         }else{
            this.selectedChance='Low';
         }
        this.opprtType='Others';
        if(this.CurrencyType!='USD'){
            if(this.opprtType!='POC'){
                this.locProEstValTrueFalse=true
                this.locPoCEstValTrueFalse=false;
                this.estValProTrueFalse=true;
                this.estValPoCTrueFalse=false;
            }else{
                this.locProEstValTrueFalse=false
                this.locPoCEstValTrueFalse=true;
                this.estValProTrueFalse=false;
                this.estValPoCTrueFalse=true;
            }
        }else if(this.CurrencyType=='USD'){
            if(this.opprtType!='POC'){
                this.estValProTrueFalse=true;
                this.estValPoCTrueFalse=false;
            }else{
                this.estValProTrueFalse=false;
                this.estValPoCTrueFalse=true;
            }
        }

    }
    cptrRoughBusVol(event){
        this.roughBusVol=event.target.value;
    }
    cptrChance(event){
        this.selectedChance=event.target.value;
    }
    cptrRefNum(event){
        this.refnum=event.target.value;
    }
    cptrCurrencyType(event){
        this.CurrencyType=event.target.value;
        this.LocEstValuePoC=null;
        this.LocEstValuePro=null;
        this.EstValuePoC=null;
        this.EstValuePro=null;
        if(this.CurrencyType=='INR'){
            this.rate=75;
        }else if(this.CurrencyType=='JPY'){
            this.rate=115.04;
        }else if(this.CurrencyType=='SGD'){
            this.rate=1.34;
        }
        if(this.CurrencyType!='USD'){
           this.convRateTrueFalse=true;
           this.locProEstValTrueFalse=true;
           this.locPoCEstValTrueFalse=true;
            if(this.opprtType!='POC'){
                this.locProEstValTrueFalse=true
                this.locPoCEstValTrueFalse=false;
                this.estValProTrueFalse=true;
                this.estValPoCTrueFalse=false;
            }
            else{
                this.locProEstValTrueFalse=false;
                this.locPoCEstValTrueFalse=true;
                this.estValProTrueFalse=false;
                this.estValPoCTrueFalse=true;
            }
        }else if(this.CurrencyType=='USD'){
            this.convRateTrueFalse=false;
            this.locProEstValTrueFalse=false;
            this.locPoCEstValTrueFalse=false;
            if(this.opprtType!='POC'){
                this.estValProTrueFalse=true;
                this.estValPoCTrueFalse=false;
            }else{
                this.estValProTrueFalse=false;
                this.estValPoCTrueFalse=true;
            }
        }
    }
    cptrSaasRev(event){
        this.saasRev=event.target.value;
    }
    cptrSmsOpt(event){
        this.SmsOpt=event.target.value;
    }
    cptrConvRate(event){
        this.ConvRate=event.target.value;
    }
    cptrHosting(event){
        this.Hosting=event.target.value;
    }
    //child Object(OppServices) detailes
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: ap})
    appData;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: tech})
    techData(data, error){
        if(data && data.data && data.data.values){
            data.data.values.forEach( objPicklist => {
                this.techValues.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
        } else if(error){
            console.log(error);
        }
    };
    @track selectedApp;
    
    @track techValues = [];

    @track selectedtechValuesArray=[];
    @track selectedtechValuesString='';

    cptrApp(event){
           this.selectedApp=event.target.value;
        getTechnology({service:this.selectedApp}).then(ress=>{
            this.selectedtechValuesArray=ress.split(';');
            
            this.selectedtechValuesString=ress;
        }).catch(error=>{
            alert('falied:'+error.body.message);
        });
    
    }  
    selectedtechValuesArray=[];
    cptrTech(event) {
         this.selectedtechValuesArray=event.target.value;
         this.selectedtechValuesString='';
        this.selectedtechValuesArray.forEach(item=>{
            this.selectedtechValuesString=this.selectedtechValuesString+item+';';
        });
        this.selectedtechValuesString=this.selectedtechValuesString.slice(0,-1);
    }

    //Create a record
    saveMe(){
             const  fields={'Name':this.customerName,'Source__c':this.selectedSource,
                    'Sales_Region__c':this.selectedSalesReg,'Sales_Status__c':this.sStatus
                      , 'BD_Contact__c':this.BDCon,'Opportunity_Info__c':this.OppInfo
                      , 'Opportunity_Start__c':this.OppStartDate,'Comments__c':this.comments
                     , 'Sales_Contact__c':this.SalesCon
                     , 'Opportunity_Type__c':this.opprtType,'Estimated_Value_PoC__c':this.EstValuePoC
                     ,'Local_Estimated_Value_PoC__c':this.LocEstValuePoC
                     ,'Local_Estimated_Value_PRO__c':this.LocEstValuePro
                     ,'Estimated_Value_Project__c':this.EstValuePro
                     ,  'Forecast__c':this.forecast,'BHQ__c':this.bhqvalue
                      ,  'Rough_Business_Volume__c':this.roughBusVol,'Chance__c':this.selectedChance
                     , 'DXP_Proposal_Ref_Number__c':this.refnum,'Currency_Type__c':this.CurrencyType
                      ,'SaaS_Revenue__c':this.saasRev,'OneSMS_OpportunityID__c':this.SmsOpt
                      ,'Conversion_Rate__c':this.rate,'Local_Estimated_Value_PoC__c':this.LocEstValue
                      ,'Sub_Sales_Region__c':this.selectedSubSalesReg,'Hosting__c':this.Hosting
                };
               
                const  recordData={apiName:'Opportunity_Track__c',fields};
            if(this.customerName){
                createRecord(recordData).then(Response=>{         
                    this.uploadFiles(Response.id);
                    
                            insertList({id:Response.id ,listopp:this.multipleServiceTech}).then(resp=>{
                                // alert('listOf objects inserted');
                            }).catch(error=>{
                                alert('list Insertion failed');
                            });

                        this[NavigationMixin.Navigate]({
                            type: 'standard__recordPage',   
                            attributes: {
                                recordId: Response.id,
                                actionName: 'view'
                            }
                        });
                        this.showToast('Success', 'success', 'Record was created successfully.');

                }).catch(error=>{
                   alert('failed parent:' +error.body.message);
                });
            }else{
              alert('Enter CustomerName');
            }
        }

    //addButton(one more service and technology)
    multipleServiceTech=[];
    tempApp=[];
    addOneMoreService(){

        if(this.selectedApp && this.selectedtechValuesArray.length>0){  
            if(!this.tempApp.includes(this.selectedApp)){
                
                ListServices({app:this.selectedApp,ser:this.selectedtechValuesString}).then(Response=>{
                    if(this.selectedApp && this.selectedtechValuesArray.length>0){
                            this.tempApp.push(this.selectedApp);
                            this.multipleServiceTech.push(Response);
                            this.selectedApp=null;
                            this.selectedtechValuesArray=[];
                    }else{
                        alert('select App and Technologies');
                    }
                }).catch(error=>{
                    alert('object creation failed');
                });
            }
            else{
                this.selectedApp='';
                this.selectedtechValuesArray=[];
                alert('Already exist an App');    
            }
        }else{
            if(!this.selectedApp && this.selectedtechValuesArray.length>0){
                alert('Select an app');
            }else if(this.selectedApp && this.selectedtechValuesArray.length<=0){
                alert('Select technologies');
            }
        }
        
    }
    //remove app and technologies
    @track indx = 0;
    removeRow(event){ 
        var selectedRow = event.target.dataset.id;
        //to remove the app from the tempApp variable
        var singleRecord=this.multipleServiceTech[selectedRow];
        this.selectedApp=singleRecord.App__c;
        const index = this.tempApp.indexOf(this.selectedApp);
        this.tempApp.splice(index,1);

        this.multipleServiceTech.splice(selectedRow, 1);
        this.selectedApp='';
        this.selectedApp=null;
        if(this.selectedApp==''){
          this.selectedApp='';
        }else{
            this.selectedApp=this.tempSelApp;
        }
    }
    tempSelApp;
    editRow(event){
        var selRow=event.target.dataset.id;
        var singleRecord=this.multipleServiceTech[selRow];
        this.selectedApp=singleRecord.App__c;
        this.tempSelApp=this.selectedApp;
        //to remove the app from the tempApp variable
        const index = this.tempApp.indexOf(this.selectedApp);
        this.tempApp.splice(index,1);
        
        this.selectedtechValuesArray=singleRecord.Technologies__c.split(';');
        this.multipleServiceTech.splice(selRow, 1);
        const toAppAndTech = this.template.querySelector('[data-id="appId"]');
        toAppAndTech.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});

    }

    // Upload Document Content
    @track filesData = [];
    showSpinner = false;
 
    handleFileUploaded(event) {
        if (event.target.files.length > 0) {
            for(var i=0; i< event.target.files.length; i++){
                if (event.target.files[i].size > MAX_FILE_SIZE) {
                    this.showToast('Error!', 'error', 'File size exceeded the upload size limit.');
                    return;
                }
                let file = event.target.files[i];
                let reader = new FileReader();
                reader.onload = e => {
                    var fileContents = reader.result.split(',')[1]
                    this.filesData.push({'fileName':file.name, 'fileContent':fileContents});
                };
                reader.readAsDataURL(file);
            
            }
        } 
    }
 
    uploadFiles(recId) {
        
        if(this.filesData == [] || this.filesData.length == 0) {
            // this.showToast('Error', 'error', 'Please select files first'); return;
        }
        this.showSpinner = true;
        uploadFiles({
            recordId : recId,
            filedata : JSON.stringify(this.filesData)
        })
        .then(result => {
            console.log(result);
            if(result && result == 'success') {
                this.filesData = [];
                //this.showToast('Success', 'success', 'Files Uploaded successfully.');
            } else {
                this.showToast('Error', 'error', result);
            }
        }).catch(error => {
            if(error && error.body && error.body.message) {
                this.showToast('Error', 'error', error.body.message);
            }
        }).finally(() => this.showSpinner = false );
    }
 
    removeReceiptImage(event) {
        var index = event.currentTarget.dataset.id;
        this.filesData.splice(index, 1);
    }
 
    showToast(title, variant, message) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                variant: variant,
                message: message,
            })
        );
    }

    cancelMe(){
        location.reload();
    }

}