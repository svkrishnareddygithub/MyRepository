public with sharing class retrieve_contacts_passing_acc_id {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String id) {
      return [select Id,LastName,FirstName,Email,Phone,AccountId from Contact where  AccountId=:id];
    }
}
