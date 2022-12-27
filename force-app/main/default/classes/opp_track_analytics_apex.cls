public with sharing class opp_track_analytics_apex {
   @AuraEnabled(cacheable=true)
   public static List<Opportunity_Track__c> totalOpportunities(){
        return [SELECT Id, Name, Opportunity_Info__c, Source__c, Sales_Region__c, Conversion_Rate__c, Sales_Contact__c, BD_Contact__c, Comments__c, Opportunity_Type__c, Sales_Status__c, Currency_Type__c, Estimated_Value_PoC__c, Rough_Business_Volume__c, SaaS_Revenue__c, Local_Estimated_Value_PoC__c, Chance__c, OneSMS_OpportunityID__c, BHQ__c, DXP_Proposal_Ref_Number__c, Hosting__c, Status__c, Estimated_Value_Project__c, Local_Estimated_Value_PRO__c, Sub_Sales_Region__c, Forecast__c, Opportunity_Start__c FROM Opportunity_Track__c];
     }

     @AuraEnabled(cacheable=true)
     public static List<List<Integer>> arrayValues(){
         List<Opportunity_Track__c> temdata=[SELECT Id, Name, Opportunity_Info__c, Source__c, Sales_Region__c, Conversion_Rate__c, Sales_Contact__c, BD_Contact__c, Comments__c, Opportunity_Type__c, Sales_Status__c, Currency_Type__c, Estimated_Value_PoC__c, Rough_Business_Volume__c, SaaS_Revenue__c, Local_Estimated_Value_PoC__c, Chance__c, OneSMS_OpportunityID__c, BHQ__c, DXP_Proposal_Ref_Number__c, Hosting__c, Status__c, Estimated_Value_Project__c, Local_Estimated_Value_PRO__c, Sub_Sales_Region__c, Forecast__c, Opportunity_Start__c FROM Opportunity_Track__c];
         //status labels
         List<String> labelList=new List<String>();
         Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
         Schema.sObjectType objType = schemaMap.get('Opportunity_Track__c');
         Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
         map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
         list < Schema.PicklistEntry > values = fieldMap.get('Status__c').getDescribe().getPickListValues();

         for (Schema.PicklistEntry a: values) {
            labelList.add(a.getLabel());
         }
         //sales region labels
         List<String> labelList2=new List<String>();
         Map<String, Schema.SObjectType> schemaMap2 = Schema.getGlobalDescribe();
         Schema.sObjectType objType2 = schemaMap2.get('Opportunity_Track__c');
         Schema.DescribeSObjectResult objDescribe2 = objType2.getDescribe();
         map < String, Schema.SObjectField > fieldMap2 = objDescribe.fields.getMap();
         list < Schema.PicklistEntry > values2 = fieldMap2.get('Sales_Region__c').getDescribe().getPickListValues();

         for (Schema.PicklistEntry b: values2) {
            labelList2.add(b.getLabel());
         }
         
         List<List<Integer>> li=new List<List<Integer>>();
         for(String s: labelList){
            System.debug(s);
            List<Integer>cc=new List<Integer>();
             for(String d:labelList2){
               integer count=0;
                  for(Opportunity_Track__c t:temdata){
                    if(d==t.Sales_Region__c && s==t.Status__c)
                        count+=1;
                    }
                    cc.add(count);
                  }
                  li.add(cc);
             }
             System.debug(li);
             return li;
         }  
      }
