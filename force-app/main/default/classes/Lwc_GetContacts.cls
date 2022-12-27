public with sharing class Lwc_GetContacts {
    @AuraEnabled(cacheable=true)
    public static List<Contact> lwccontacts() {
      return [select Id,LastName,FirstName,Email,Phone from Contact];
    }
}
