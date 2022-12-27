public with sharing class Lwc_Wire_Update {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
       return [select Id,LastName,FirstName,Email,Phone from Contact];
    }
   
}
