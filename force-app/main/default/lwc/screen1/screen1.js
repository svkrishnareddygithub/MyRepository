import { LightningElement,track } from 'lwc';
import allLogos from '@salesforce/resourceUrl/allLogos';
import Arrows from '@salesforce/resourceUrl/Arrows';
import { createRecord } from 'lightning/uiRecordApi';
export default class Screen1 extends LightningElement {
    //image resource values
    unitresource = allLogos+'/allLogos/UnitSelection.png';
    unitSelection1= allLogos+'/allLogos/UnitSelection1.png';
    companysource = allLogos+'/allLogos/company.png';
    company1=allLogos+'/allLogos/company1.png';
    gaugesource =  allLogos+'/allLogos/gauge.png';
    gauge1=allLogos+'/allLogos/gauge1.png'
    trolleysource =  allLogos+'/allLogos/trolley.png';
    trolley1=allLogos+'/allLogos/trolley1.png';
    trucksource =  allLogos+'/allLogos/truck.png';
    truck1=allLogos+'/allLogos/truck1.png';
    cartsource =  allLogos+'/allLogos/cart.png';
    cart1=allLogos+'/allLogos/cart1.png'
    businessArrows = Arrows+'/Arrows/businessArrows.jpg';
    unitSelectionArrows =Arrows+'/Arrows/unitSelectionArrows.jpg';
    unitflag = true;
    companyflag = false;
    //styling for selected button 
    selectedbutton(selButtton) {
        selButtton.style.backgroundColor = 'white';
        selButtton.style.border = '2px solid #aa2525';
        selButtton.style.cssText += "box-shadow: 0 0 8px red";
    }
    //called function from other functions, applying styling for completed sections
    commoncode(btn) {  //btn is the selected button which we are passing from selected button functionn
        btn.style.backgroundColor = '#B1F7BA';
        btn.style.border = '2px solid #aa2525';
        btn.style.cssText += "box-shadow: 0 0 8px red";
    }

    button1;
    button2;
    button3;
    button4;
    button5;
    button6;

    navigationValue;

    hidePrevious=true;
    hideNext=false;      
    //unit selection onclick function
    unithandler() {
        this.navigationValue=1;
        this.button1 = this.template.querySelector("button[data-my-id=unitid]");
        //passing this button id to the called function
        this.selectedbutton(this.button1);
        //changing the logo  by importing
        this.unitresource = this.unitSelection1;
        this.unitflag = true;
        this.companyflag = false;
        this.hidePrevious=true;
        this.hideNext=false;
    }
    //company onclick function
    companyhandler() {
        this.navigationValue=2;
        this.button2 = this.template.querySelector("button[data-my-id=companyid]");
        this.selectedbutton(this.button2);
        this.companysource = this.company1;
        this.companyflag = true;
        this.unitflag = false;
        if (this.button1) {
            this.commoncode(this.button1);
            this.unitresource = this.unitSelection1;;
        }
        this.hidePrevious=false;
        this.hideNext=false;
    }
    //gauge meter onclick function
    gaugehandler() {
        this.navigationValue=3;
        this.button3 = this.template.querySelector("button[data-my-id=gaugeid]");
        this.selectedbutton(this.button3);
        this.gaugesource = this.gauge1;
        this.companyflag = false;
        this.unitflag = false;
        if (this.button2) {
            this.commoncode(this.button2);
            this.companysource = this.company1;
        }
        this.hidePrevious=false;
        this.hideNext=false;
    }
    //cart button onclick function
    carthandler() {
        this.navigationValue=4;
        this.button4 = this.template.querySelector("button[data-my-id=cartid]");
        this.selectedbutton(this.button4);
        this.cartsource = this.cart1;
        this.companyflag = false;
        this.unitflag = false;
        if (this.button3) {
            this.commoncode(this.button3);
            this.gaugesource = this.gauge1;
        }
        this.hidePrevious=false;
        this.hideNext=false;
    }
    //trolley button onclick function
    trolleyhandler() {
        this.navigationValue=5;
        this.button5 = this.template.querySelector("button[data-my-id=trolleyid]");
        this.selectedbutton(this.button5);
        this.companyflag = false;
        this.trolleysource = this.trolley1
        this.unitflag = false;
        if (this.button4) {
            this.commoncode(this.button4);
            this.cartsource = this.cart1;
        }
        this.hidePrevious=false;
        this.hideNext=false;
    }
    //truck button onclick function
    click = 0;
    truckhandler() {
        this.navigationValue=6;
        // this.click = '1'
        this.button6 = this.template.querySelector("button[data-my-id=truckid]");
        this.selectedbutton(this.button6);
        this.trucksource = this.truck1;
        this.companyflag = false;
        this.unitflag = false;
        if (this.button5) {
            this.trolleysource = this.trolley1
            this.commoncode(this.button5);
        }
        this.hidePrevious=false;
        this.hideNext=true;
    }

    @track isSpinner = false;
    temp=1;
    renderedCallback()
    {
        if(this.template.querySelector("button[data-my-id=unitid]") && this.temp==1)
        {
            
            this.template.querySelector("button[data-my-id=unitid]").click();
            this.temp=2;
        }
        // this.unithandler();
    }
    //next button handler
    nextHandler() {
        if(this.navigationValue==1)
        {
            this.template.querySelector("button[data-my-id=companyid]").click();

        }
        else if(this.navigationValue==2)
        {
            this.template.querySelector("button[data-my-id=gaugeid]").click();

        }
        else if(this.navigationValue==3)
        {
        this.template.querySelector("button[data-my-id=cartid]").click();
            
        }
        else if(this.navigationValue==4)
        {
            this.template.querySelector("button[data-my-id=trolleyid]").click();
        }
        else if(this.navigationValue==5)
        {
            this.template.querySelector("button[data-my-id=truckid]").click();
        }

    }

    prevHandler(){

    }


    btn1;
    btn2;
    btn3;
    btnValue;
    // Reading the button values
    selectButtons() {
        this.btn1 = this.template.querySelector("button[data-my-id=btn1]");
        this.btn2 = this.template.querySelector("button[data-my-id=btn2]");
        this.btn3 = this.template.querySelector("button[data-my-id=btn3]");
    }
    //Deselect the value
    deslectButtons() {
        this.btnValue = null;
        if (this.btn1 != null) {
            this.btn1.style.removeProperty("background-color");
        }
        else if (this.btn2 != null) {
            this.btn2.style.removeProperty("background-color");
        }
        else if (this.btn3 != null) {
            this.btn3.style.removeProperty("background-color");
        }

        this.btn1 = null;
        this.btn2 = null;
        this.btn3 = null;
    }

    // Button click of Production Unit button
    productionUnit(){
        if (this.btn1 == null) {
            this.selectButtons();
            this.btnValue = this.btn1.value;
            this.btn1.style.cssText += "background-color:lightGreen";  //Changing the color to light green on click
            this.btn2.style.removeProperty("background-color");  //Changing the other button's color to white
            this.btn3.style.removeProperty("background-color"); //Changing the other button's color to white
            this.btn2 = this.btn2 = null;
        }
        else {
            this.deslectButtons();
        }

        // alert(this.btnValue);
    }
    supplierUnit() {
        if (this.btn2 == null) {
            this.selectButtons();
            this.btnValue = this.btn2.value;
            this.btn2.style.cssText += "background-color:lightGreen"; //Changing the color to light green on click
            this.btn1.style.removeProperty("background-color"); //Changing the other button's color to white
            this.btn3.style.removeProperty("background-color"); //Changing the other button's color to white
            this.btn1 = this.btn3 = null;
            // alert(this.btnValue);
        }
        else {
            this.deslectButtons();
        }
    }
    deliveryUnit(){
        if (this.btn3 == null) {
            this.selectButtons();
            this.btnValue = this.btn3.value;
            this.btn3.style.cssText += "background-color:lightGreen"; //Changing the color to light green on click
            this.btn1.style.removeProperty("background-color"); //Changing the other button's color to white
            this.btn2.style.removeProperty("background-color"); //Changing the other button's color to white
            this.btn1 = this.btn2 = null;
            // alert(this.btnValue);
        }
        else {
            this.deslectButtons();
        }
    }
}