public with sharing class user_accounts {
   @AuraEnabled(cacheable=true)
   public static List<User> usersNames(){
    List<User> u=[select Id,Name,Username from User];
    return u; 
   }
   @AuraEnabled(cacheable=true)
   public static List<Account> accList(Id ids){
    return [select Id,Name,Rating,OwnerId from Account WHERE OwnerId=:ids];
   }
}
