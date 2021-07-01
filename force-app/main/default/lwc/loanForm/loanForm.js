import { LightningElement } from 'lwc';

export default class LoanForm extends LightningElement {
    value = ['option1'];

    get options() {
        return [
            { 
                label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non augue leo. In feugiat nec odio at pretium. Quisque euismod non sapien eget efficitur.', 
                value: 'option1' 
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
}