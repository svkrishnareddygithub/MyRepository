public with sharing class lwc_acc_contacts {
 @AuraEnabled(cacheable=true)
 public static List<Contact> getContacts(String accName) {
    Account acc=[select Id,Name from Account where Name=:accName];
    return [select Id,LastName,FirstName,Email,Phone,AccountId from Contact where AccountId=:acc.Id];
    }
}
