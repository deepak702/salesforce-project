import { LightningElement } from 'lwc';

export default class ParentComponentTest extends LightningElement {
    messageFromChild;
    isEventReceived = false;

    handleChildEvent(event) {
        this.messageFromChild = event.detail.message;
        this.isEventReceived = true;
    }
}
