import { LightningElement } from 'lwc';

export default class FinishPage extends LightningElement {
    renderedCallback() {
        let messageContainer = this.template.querySelector(".success_message");
        
        messageContainer.addEventListener("click", () => {
            console.log("Message Clicked")
        })
    }
}