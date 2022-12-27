public class AccouuntShare {
    /*
    public static void accShare(List<Account> accList){
        List<AccountShare> share=new List<AccountShare>();
        User u=[select id,name from User where name='Anji'];
        for(Account a: accList){
            AccountShare ashare=new AccountShare(); 
            ashare.AccountId=a.Id;
            ashare.AccountAccessLevel='Edit';
            ashare.OpportunityAccessLevel='Edit';
            ashare.RowCause='Manual';
            ashare.UserOrGroupId=u.id;
            share.add(ashare);
        }
        insert share;
    }
    public static void call(List<Account> aList){
        List<Account> newList=new List<Account>();
        for(Account a: aList){
            if(a.name=='krishna'){
                newList.add(a);
            }
        }
        accShare(newList);
    }
    public static void calling(Map<Id,Account> accOld,Map<Id,Account>accNew){
       Set<Id>ids=accOld.keySet();
        List<Account> a=new List<Account>();
        for(Id i:ids){
            Account old=accOld.get(i);
            Account newOne=accNew.get(i);
            if(old.Industry!='Energy' && newOne.Industry=='Energy'){
                a.add(newOne);
            }
        }
        accShare(a);
    }
   */
    public static void insertOpp(List<Opportunity> opList){
        set<id>ids=new set<Id>();
        for(Opportunity o: opList){
            if(o.accountId!=null){
                ids.add(o.AccountId);
            }
        }
        List<Account> accList=[select id,name,annualRevenue,Total_Opp_Amount__c,(select id,stageName,closeDate,Amount from Opportunities) from Account where id in:ids];
       List<Account>updateList=new List<Account>();
        for(Account a: accList){
            decimal amt=0;
                for(Opportunity o: a.Opportunities){
                    if(o.Amount==null){
                        o.Amount=0;
                        amt+=o.Amount;
                    }else{
                        amt+=o.Amount;	
                    }
                }
                if(a.Total_Opp_Amount__c==null){
                    a.Total_Opp_Amount__c=0;
                    a.Total_Opp_Amount__c=amt;
                    updateList.add(a);
                }else {	
                    a.Total_Opp_Amount__c=amt;
                    updateList.add(a);
                }
            }
        update updateList;
    }
}