public with sharing class opp_order_listview_search {
    @AuraEnabled (cacheable=true)
    public static List<Opportunity_Order__c> searchOrders(String name){
       String searchKey=name+'%';
       if(searchKey!=null){
          return [SELECT Id, Name, Order__c, Order_Type__c, Source__c, Region_region__c, LCO__c, Contact__c, 
          Email__c, Project_Name__c, Project_Description__c, Proposal_Ref_No__c, Customer_Name__c,
           Customer_Country__c, YGS_GBPM_SAP_customer_Id__c, Other_Project_Information_Number_of_Sus__c, 
           Project_PO_number__c, PO_Amount__c, Scope__c, SaaS_Solution_Owner_Division__c, SaaS_Subscriber__c,
            Contact_Person_Email__c, SaaS_PO_Number__c, SaaS_Service_Term_Duration__c, SaaS_Payment_Term__c,
             PaaS_Subscription_Termination__c, PaaS_Subscription_Condition__c, Number_of_Asset__c, 
             No_of_users__c, Connected_Devices__c, SaaS_Order_Size__c, SaaS_Annual_Fee_To_DXP__c, 
             SaaS_Order_Size_RHQ__c, Customer_PO_Amount__c, Customer_PO_Date__c, Remarks__c, Status__c, 
             SaaS_Subscription_Start_Date__c FROM Opportunity_Order__c WHERE Customer_Name__c LIKE:searchKey];
        }else{
           return [SELECT Id, Name, Order__c, Order_Type__c, Source__c, Region_region__c, LCO__c, Contact__c, 
           Email__c, Project_Name__c, Project_Description__c, Proposal_Ref_No__c, Customer_Name__c, 
           Customer_Country__c, YGS_GBPM_SAP_customer_Id__c, Other_Project_Information_Number_of_Sus__c, 
           Project_PO_number__c, PO_Amount__c, Scope__c, SaaS_Solution_Owner_Division__c, SaaS_Subscriber__c,
            Contact_Person_Email__c, SaaS_PO_Number__c, SaaS_Service_Term_Duration__c, SaaS_Payment_Term__c,
             PaaS_Subscription_Termination__c, PaaS_Subscription_Condition__c, Number_of_Asset__c, 
             No_of_users__c, Connected_Devices__c, SaaS_Order_Size__c, SaaS_Annual_Fee_To_DXP__c, 
             SaaS_Order_Size_RHQ__c, Customer_PO_Amount__c, Customer_PO_Date__c, Remarks__c, Status__c,
              SaaS_Subscription_Start_Date__c FROM Opportunity_Order__c];
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Order_Invoice__c> invoice(integer years,Opportunity_Order__c obj){
        Decimal tempamt=obj.PO_Amount__c;
        Decimal intrest=(tempamt*2)/100;
        Decimal amt=(tempamt+intrest)/years;

        List<Order_Invoice__c> li=new List<Order_Invoice__c>();
        Date sd=obj.SaaS_Subscription_Start_Date__c;
        Date dd;
        integer s=0;
        integer ss=1;
        for(Integer k=1;k<=years;k++){
            Order_Invoice__c oi=new Order_Invoice__c();
            oi.Invoice_No__c=obj.Region_region__c+'-'+obj.Name+k;
            oi.Total_Amount__c=amt;
            oi.Start_Date__c=Date.newInstance(sd.year()+s, sd.month(), sd.Day());
            oi.SaaS_Subscription_Start_Date__c=sd;
            oi.SaaS_Service_Term_Duration__c=obj.SaaS_Service_Term_Duration__c;
            oi.PaaS_Subscription_Termination__c=obj.PaaS_Subscription_Termination__c;
            Date ed= Date.newInstance(sd.year()+ss, sd.month(), sd.Day()-1);
            oi.End_Date__c=ed;
            if(sd.month()>03){
                dd= Date.newInstance(ed.year(), ed.month()-03, ed.Day());  
            }else{
                dd= Date.newInstance(ed.year()-1, ed.month()-3+12, ed.Day());
            }
            oi.Due_Date__c=dd;
            li.add(oi);
            s++;
            ss++;
        }
        return li;
    }
    @AuraEnabled
    public static void deleteMe(List<Opportunity_Order__c> orlist){
        delete orlist;
    }
}
