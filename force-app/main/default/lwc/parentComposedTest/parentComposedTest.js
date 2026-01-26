import { LightningElement } from 'lwc';

export default class ParentComposedTest extends LightningElement {
    messageFromChild;
    isEventReceived = false;

    handleChildEvent(event) {
        this.messageFromChild = event.detail.message;
        this.isEventReceived = true;
    }

    // handleChildEvent2(event) {
    //     this.messageFromChild = event.detail.message;
    //     this.isEventReceived = true;
    // }
}
