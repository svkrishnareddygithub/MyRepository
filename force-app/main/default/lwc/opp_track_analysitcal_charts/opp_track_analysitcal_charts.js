import { LightningElement,wire,track,api } from 'lwc';
import totalOpportunities from '@salesforce/apex/opp_track_analytics_apex.totalOpportunities';
import arrayValues from '@salesforce/apex/opp_track_analytics_apex.arrayValues';
import ApexChartJs from '@salesforce/resourceUrl/ApexChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import salesRegion from  '@salesforce/schema/Opportunity_Track__c.Sales_Region__c';
import status from  '@salesforce/schema/Opportunity_Track__c.Status__c';

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

export default class Opp_track_analysitcal_charts extends LightningElement {

    col=colm;
    allRecords;
    totalOppsCount;
    visibleRecords;
    @wire(totalOpportunities) tracklist({error,data}){
        if(data){
            this.allRecords=data;
            this.totalOppsCount=data.length;
        }
    };
    handleTotalOpps(){
        this.visibleRecords=this.allRecords;
    }

    salesRegPicklistValues=[];
    activerec=[13, 23, 20, 8, 13, 27,33,22,44];

    @wire(getObjectInfo, { objectApiName:'Opportunity_Track__c' }) obj;
    @wire(getPicklistValues, { recordTypeId: '$obj.data.defaultRecordTypeId', fieldApiName: salesRegion})
    salespicklistvalues({error,data}){
      if(data){
         data.values.forEach(element => {
           this.salesRegPicklistValues.push(element['value']);
         });
        loadScript(this, ApexChartJs + '/dist/apexcharts.js').then(() => {
            // your code with calls to the JS library
            // alert('success')
            alert('2')
            var chart = new window.ApexCharts(this.template.querySelector('.chart'), this.options);
            chart.render();
        }).catch(error=>{
            alert('failed loadscript'+error)
        });
      }
    };
    @wire(arrayValues)sam ({error,data}){
       if(data){ 
          console.log(data.data)
          //alert(data[0])
          //this.activerec=data[0];
       }else{
          console.log(error)
       }
     }

    options = {
        series: [{
        name: 'PRODUCT A',
        data: this.activerec

      }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27,33,22,44]
      }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14,33,22,44]
      }],
        chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
      xaxis: {
        type: 'String',
        categories: this.salesRegPicklistValues
      ,
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
      };    

}