public with sharing class Lwc_Wire2_SearchText {
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchTe(String searchText) {
        String key='%'+searchText+'%';
        return [select id,FirstName,LastName,Email,Phone from Contact where LastName LIKE :key];
    }
}