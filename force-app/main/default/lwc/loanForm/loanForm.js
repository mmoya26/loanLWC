import {LightningElement} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import LOAN_OBJECT from '@salesforce/schema/Loan__c'
import FIRST_NAME_FIELD from '@salesforce/schema/Loan__c.FirstName__c'
import LAST_NAME_FIELD from '@salesforce/schema/Loan__c.LastName__c'
import EMAIL_ADDRESS_FIELD from '@salesforce/schema/Loan__c.EmailAddress__c'
import DATE_OF_BIRTH_FIELD from '@salesforce/schema/Loan__c.DateOfBirth__c'
import SSN_FIELD from '@salesforce/schema/Loan__c.SSN__c'
import STREET_ADDRESS_ONE_FIELD from '@salesforce/schema/Loan__c.StreetAdressOne__c'
import STREET_ADDRESS_TWO_FIELD from '@salesforce/schema/Loan__c.StreetAdressTwo__c'
import CITY_FIELD from '@salesforce/schema/Loan__c.City__c'
import STATE_FIELD from '@salesforce/schema/Loan__c.State__c'
import ZIP_CODE_FIELD from '@salesforce/schema/Loan__c.ZipCode__c'
import PHONE_NUMBER_FIELD from '@salesforce/schema/Loan__c.PhoneNumber__c'
import CIVIL_STATUS_FIELD from '@salesforce/schema/Loan__c.CivilStatus__c'

export default class LoanForm extends LightningElement {
    value = ['S'];

    basicInformation = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        dateOfBirth: "",
        SSN: "",
        streetAddressOne: "",
        streetAddressTwo: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        civilStatus: ""
    }

    // List of all states for the State select field to be populated
    states = ["AK",
        "AL",
        "AR",
        "AS",
        "AZ",
        "CA",
        "CO",
        "CT",
        "DC",
        "DE",
        "FL",
        "GA",
        "GU",
        "HI",
        "IA",
        "ID",
        "IL",
        "IN",
        "KS",
        "KY",
        "LA",
        "MA",
        "MD",
        "ME",
        "MI",
        "MN",
        "MO",
        "MS",
        "MT",
        "NC",
        "ND",
        "NE",
        "NH",
        "NJ",
        "NM",
        "NV",
        "NY",
        "OH",
        "OK",
        "OR",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VA",
        "VI",
        "VT",
        "WA",
        "WI",
        "WV",
        "WY"
    ]

    get options() {
        return [
            {
                label: 'Separated',
                value: 'S'
            },

            {
                label: "Married",
                value: "M"
            },

            {
                label: "Unmarried",
                value: "U"
            }
        ];
    }

    get selectedValues() {
        return this.value.join(',');
    }

    handleChange(e) {
        this.value = e.detail.value;
    }

    // This fuction will handle the logic when the preview icon is clicked
    previewClicked(e) {
        let element = this.template.querySelector('.ssn_input');

        // If the input field type attribute is currently "password" meaning that is hidden
        if (element.type === "password") {
            // Set the input field type attribute to be "text" so that the customer can see their SSN
            element.type = "text";
        } else {
            // If the input field type attribute is already "text" then set back the attribute to be "password"
            element.type = "password";
        }
    }

    /* This function will handle the Social Securit Number formatting
     Whenever there is a change in the value of the input field, this function will be called */
    formatSocialSecurityNumber(e) {
        let val = e.target.value.replace(/\D/g, '');
        val = val.replace(/^(\d{3})/, '$1-');
        val = val.replace(/-(\d{2})/, '-$1-');
        val = val.replace(/(\d)-(\d{4}).*/, '$1-$2');

        // Set the value of our e.target(input) to be equals to the correct val.
        e.target.value = val;
    }

    /* 
    This function will be called when the "submit" button is clicked
    and will validate all of the forms that have the attribute of required
    to make sure that they are not empty
    */
    validateFields(e) {
        let validInputs = false;
        this.template.querySelectorAll('lightning-input').forEach(element => {
            /* reportValidity() returns true or false based on whether or not
            an input field was filled out properly or not and this callback function will run for
            every lightning-input element found in the form*/
            validInputs = element.reportValidity();
        });

        // If all input fields are properly filled out, proceed
        if (validInputs) {
            console.log("All inputs are valid");
            this.saveBasicInformation();
        } else {
            console.log("Some inputs are invalid");
        }
    }

    saveBasicInformation() {
        // Selecting all of the inputs and their values
        let firstNameInput = this.template.querySelector(".first_name_input").value;
        let lastNameInput = this.template.querySelector(".last_name_input").value;
        let emailAddressInput = this.template.querySelector(".email_address_input").value;
        let dateOfBirthInput = this.template.querySelector(".date_of_birth_input").value;
        let socialSecurityInput = this.template.querySelector(".social_security_number_input").value;
        let streetAddressOneInput = this.template.querySelector(".street_address_one_input").value;
        let streetAddressTwoInput = this.template.querySelector(".street_address_two_input").value;
        let cityInput = this.template.querySelector(".city_input").value;
        let stateInput = this.template.querySelector(".state_input").value;
        let zipCodeInput = this.template.querySelector(".zip_code_input").value;
        let phoneNumberInput = this.template.querySelector(".phone_number_input").value;
        let civilStatusInput = this.value;

        // Setting the data of each key with according value to the basicInformation object
        this.basicInformation.firstName = firstNameInput;
        this.basicInformation.lastName = lastNameInput;
        this.basicInformation.emailAddress = emailAddressInput;
        this.basicInformation.dateOfBirth = dateOfBirthInput;
        this.basicInformation.SSN = socialSecurityInput;
        this.basicInformation.streetAddressOne = streetAddressOneInput;
        this.basicInformation.streetAddressTwo = streetAddressTwoInput;
        this.basicInformation.city = cityInput;
        this.basicInformation.state = stateInput;
        this.basicInformation.zipCode = zipCodeInput;
        this.basicInformation.phoneNumber = phoneNumberInput;
        this.basicInformation.civilStatus = civilStatusInput;

        console.log(this.basicInformation);

        // Create record after saving all of the data to basicInformation object
        this.createLoanRecord();
    }

    createLoanRecord() {
        const fields = {};

        // All fields that used to store the data from basicInformation object 
        fields[FIRST_NAME_FIELD.fieldApiName] = this.basicInformation.firstName;
        fields[LAST_NAME_FIELD.fieldApiName] = this.basicInformation.lastName;
        fields[EMAIL_ADDRESS_FIELD.fieldApiName] = this.basicInformation.emailAddress;
        fields[DATE_OF_BIRTH_FIELD.fieldApiName] = this.basicInformation.dateOfBirth;
        fields[SSN_FIELD.fieldApiName] = this.basicInformation.SSN;
        fields[STREET_ADDRESS_ONE_FIELD.fieldApiName] = this.basicInformation.streetAddressOne;
        fields[STREET_ADDRESS_TWO_FIELD.fieldApiName] = this.basicInformation.streetAddressTwo;
        fields[CITY_FIELD.fieldApiName] = this.basicInformation.city;
        fields[STATE_FIELD.fieldApiName] = this.basicInformation.state;
        fields[ZIP_CODE_FIELD.fieldApiName] = this.basicInformation.zipCode;
        fields[PHONE_NUMBER_FIELD.fieldApiName] = this.basicInformation.phoneNumber;
        fields[CIVIL_STATUS_FIELD.fieldApiName] = this.basicInformation.civilStatus;

        const recordInput = { apiName: LOAN_OBJECT.objectApiName, fields};
        createRecord(recordInput)
            .then(() => {
                console.log("Loan Record created sucessfully");
            })
            .catch(error => {
                console.log("Error creating record" + "Eror body message:" + error.body.message);
            });
    }
}