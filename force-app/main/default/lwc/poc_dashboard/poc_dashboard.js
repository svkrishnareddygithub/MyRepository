import { LightningElement, wire } from 'lwc';
import ApexChartJs from '@salesforce/resourceUrl/ApexChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import technologies from '@salesforce/apex/poc_dashboard_class.technologies';
export default class Poc_dashboard extends LightningElement {
    // techcount;
    // @wire(technologies) listvalues(data,error){
    //     if(data){
    //         this.techcount=data;
    //        // alert('listdata:'+data)
            
    //     }else{
    //         alert('values error'+error)
    //     }
  //   }
  //  connectedCallback(){

  //   loadScript(this, ApexChartJs + '/dist/apexcharts.js').then(() => {
  //       // your code with calls to the JS library
  //       // alert('success')
  //       var chart = new window.ApexCharts(this.template.querySelector('.chart'), options);
  //       chart.render();
      
  //   }).catch(error=>{
  //       alert('failed loadscript'+error)
  //   });

  //   var options = {
  //       series: [{
  //       data:this.techcount
  //     }],
  //       chart: {
  //       type: 'bar',
  //       height: 380
  //     },
  //     plotOptions: {
  //       bar: {
  //         barHeight: '100%',
  //         distributed: true,
  //         horizontal: true,
  //         dataLabels: {
  //           position: 'bottom'
  //         },
  //       }
  //     },
  //     colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
  //       '#f48024'
  //     ],
  //     dataLabels: {
  //       enabled: true,
  //       textAnchor: 'start',
  //       style: {
  //         colors: ['#fff']
  //       },
  //       formatter: function (val, opt) {
  //         return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
  //       },
  //       offsetX: 0,
  //       dropShadow: {
  //         enabled: true
  //       }
  //     },
  //     stroke: {
  //       width: 1,
  //       colors: ['#fff']
  //     },
  //     xaxis: {
  //       categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
  //         'United States', 'China'
  //       ],
  //     },
  //     yaxis: {
  //       labels: {
  //         show: false
  //       }
  //     },
  //     title: {
  //         text: 'Custom DataLabels',
  //         align: 'center',
  //         floating: true
  //     },
  //     subtitle: {
  //         text: 'Category Names as DataLabels inside bars',
  //         align: 'center',
  //     },
  //     tooltip: {
  //       theme: 'dark',
  //       x: {
  //         show: false
  //       },
  //       y: {
  //         title: {
  //           formatter: function () {
  //             return ''
  //           }
  //         }
  //       }
  //     }
  //     };   
  // }
}