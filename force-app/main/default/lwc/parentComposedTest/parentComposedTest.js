import { LightningElement } from 'lwc';

export default class ParentComposedTest extends LightningElement {
    messageFromChildWhenBubbleIsFalse;
    isEventReceivedWhenBubbleIsFalse = false;

    handleChildEventBubbleIsFalse(event) {
        this.messageFromChildWhenBubbleIsFalse = event.detail.message;
        this.isEventReceivedWhenBubbleIsFalse = true;
    }
}
