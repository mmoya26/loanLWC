import {LightningElement} from 'lwc';

export default class LoanForm extends LightningElement {
    value = ['S'];

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
        console.log(e);
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
    validateFields() {
        this.template.querySelectorAll('lightning-input').forEach(element => {
            console.log(element);
            element.reportValidity();
        });
    }
}