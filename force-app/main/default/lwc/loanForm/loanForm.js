import {LightningElement} from 'lwc';

export default class LoanForm extends LightningElement {
    value = ['option1'];
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
        return [{
            label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non augue leo. In feugiat nec odio at pretium. Quisque euismod non sapien eget efficitur.',
            value: 'option1'
        }];
    }

    get selectedValues() {
        return this.value.join(',');
    }

    handleChange(e) {
        console.log(e);
        this.value = e.detail.value;
    }

    previewClicked(e) {
        let element = this.template.querySelector('.ssn_input');

        if (element.type === "password") {
            element.type = "text";
        } else {
            element.type = "password";
        }
    }
}