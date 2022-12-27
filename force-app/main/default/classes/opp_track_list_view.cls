public with sharing class opp_track_list_view {
 @AUraEnabled (cacheable=true)
 public static List<Opportunity_Track__c> searchOpps(String name){
    String searchKey=name+'%';

    if(searchKey!=null){
        return [SELECT Id, Name, Opportunity_Info__c, Source__c, Sales_Region__c, Conversion_Rate__c,
            Sales_Contact__c, BD_Contact__c, Comments__c, Opportunity_Type__c, Sales_Status__c, Currency_Type__c,
            Estimated_Value_PoC__c, Rough_Business_Volume__c, SaaS_Revenue__c, Local_Estimated_Value_PoC__c, 
            Chance__c, OneSMS_OpportunityID__c, DXP_Proposal_Ref_Number__c, BHQ__c, Hosting__c, 
            Estimated_Value_Project__c, Local_Estimated_Value_PRO__c, Sub_Sales_Region__c, Forecast__c, 
            Opportunity_Start__c FROM Opportunity_Track__c WHERE Name LIKE : searchKey];
    }else{
        return [SELECT Id, Name, Opportunity_Info__c, Source__c, Sales_Region__c, Conversion_Rate__c,
            Sales_Contact__c, BD_Contact__c, Comments__c, Opportunity_Type__c, Sales_Status__c, Currency_Type__c,
             Estimated_Value_PoC__c, Rough_Business_Volume__c, SaaS_Revenue__c, Local_Estimated_Value_PoC__c, 
             Chance__c, OneSMS_OpportunityID__c, DXP_Proposal_Ref_Number__c, BHQ__c, Hosting__c, 
             Estimated_Value_Project__c, Local_Estimated_Value_PRO__c, Sub_Sales_Region__c, Forecast__c, 
             Opportunity_Start__c FROM Opportunity_Track__c];
    }
    }
}
