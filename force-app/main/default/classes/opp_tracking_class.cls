public with sharing class opp_tracking_class {

    @AuraEnabled(cacheable=true)
    public static String getTechnology(String service) {
            String s;
            List<OppTechnology__c> techList=[select Id,App__c,Technologies__C from OppTechnology__c];
            for(OppTechnology__c c: techList){
            if(c.App__c==service){
                    s=c.Technologies__C;
            }
            }
            return s; 
    }

    @AuraEnabled 
    public static OppServices__c ListServices(String app, String ser){
        OppServices__c o=new OppServices__c();
        o.App__c=app;
        o.Technologies__c=ser;
        return o;
    }

    @AuraEnabled 
    public static void insertList(Id id, List<OppServices__c> listopp){
            for(OppServices__c o: listopp){
                o.OppTrack__c=id;
            }
        insert listopp;
    }


    
    @AuraEnabled
    public static String uploadFiles(String recordId, String filedata) {
        try {
            if(String.isNotBlank(FileData)) {
                List<FileDataWP> files = (List<FileDataWP>) JSON.deserialize(filedata, List<FileDataWP>.class);
                System.debug(files);

                List<ContentVersion> cvList = new List<ContentVersion>();
                for(FileDataWP file : files) {
                    ContentVersion conVer = new ContentVersion();
                    conVer.ContentLocation = 'S'; 
                    conVer.VersionData = EncodingUtil.base64Decode(file.fileContent);
                    conVer.Title = file.fileName;
                    conVer.PathOnClient = file.fileName;
                    cvList.add(conVer);
                }
                Insert cvList;

                List<ContentDocumentLink> cdList = new List<ContentDocumentLink>();
                for(ContentVersion cv : [SELECT ContentDocumentId FROM ContentVersion WHERE Id =: cvList]) {
                    ContentDocumentLink conDocLink = New ContentDocumentLink();
                    conDocLink.LinkedEntityId = recordId;
                    conDocLink.ContentDocumentId = cv.ContentDocumentId;
                    conDocLink.Visibility = 'AllUsers';
                    conDocLink.shareType = 'V'; // V = Viewer, C = Collaborator, I = Inferred
                    cdList.add(conDocLink);
                }
                Insert cdList;        
            } else {
                return 'record Id is Blank';
            }
            return 'success';
        } catch (Exception ex) {
            System.debug(ex.getMessage() + ' -> ' + ex.getStackTraceString());
            throw new AuraHandledException(ex.getMessage());
        }
    }

    public class FileDataWP {
        public String fileName;
        public String fileContent;
    }

}
