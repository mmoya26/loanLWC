import { LightningElement, track, wire} from 'lwc';
import getLoans from '@salesforce/apex/LoanController.getLoans';

export default class ViewLoans extends LightningElement {
    @track data;
    @track columns = [
        {label: 'Loan ID', fieldName: 'Name', type: 'text'},
        {label: 'First Name', fieldName: 'FirstName__c', type: 'text'},
        {label: 'Phone Number', fieldName: 'PhoneNumber__c', type: 'text'},
        {label: 'Loan Amount', fieldName: 'LoanAmount__c', type: 'text'}
    ];

    @wire (getLoans) loanRecords({error, data}) {
        if(data) {
            this.data = data;
            console.log("Data found");
        } else if (error) {
            this.data = undefined;
            console.log("No data found");
        }
    }
}