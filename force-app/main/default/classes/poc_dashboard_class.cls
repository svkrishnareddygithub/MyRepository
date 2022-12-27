public with sharing class poc_dashboard_class {
  @AuraEnabled(cacheable=true)
  public static List<Integer> technologies(){
    List<Integer> intList=new List<Integer>();
    integer a=0;
    integer b=0;
    integer c=0;
    integer d=0;
    integer e=0;
    integer f=0;
    integer g=0;
    integer h=0;
    integer i=0;
    List<OppServices__c> listServices= [select id,App__c,Technologies__c,OppTrack__c from OppServices__c WHERE OppTrack__c!=null AND Technologies__c!=null];
    for(OppServices__c v:listServices){
        //String nm=v.Technologies__c;

        //IIoT;IT/Cloud Managed Services;IT-OT Integration;Robotic;Security;Operation Management;Others;Decd24 Opp;OPP D241

       if (v.Technologies__c.contains('IIoT')){
        a+=1;
       }else if(v.Technologies__c.contains('IT/Cloud Managed Services')){
        b+=1;
       }else if(v.Technologies__c.contains('IT-OT Integration')){
        c+=1;
       }else if(v.Technologies__c.contains('Robotic')){
        d+=1;
       }else if(v.Technologies__c.contains('Security')){
        e+=1;
       }else if(v.Technologies__c.contains('Operation Management')){
        f+=1;
       }else if(v.Technologies__c.contains('Decd24 Opp')){
        g+=1;
       }else if(v.Technologies__c.contains('OPP D241')){
        h+=1;
       }else{
        i+=1;
       }
    }
    intList.add(a);
    intList.add(b);
    intList.add(c);
    intList.add(d);
    intList.add(e);
    intList.add(f);
    intList.add(g);
    intList.add(h);
    intList.add(i);
    return intList;
  }
}
