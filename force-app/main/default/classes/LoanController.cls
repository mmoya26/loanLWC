public with sharing class LoanController {
    @AuraEnabled(cacheable=true)
    public static List<Loan__c> getLoans() {
        List<Loan__c> loans = [SELECT Name, FirstName__c, LastName__c, PhoneNumber__c, EmailAddress__c, LoanAmount__c FROM Loan__c];

        return loans;
    }
}
