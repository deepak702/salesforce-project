import { LightningElement } from 'lwc';

export default class WrapperBoundary extends LightningElement {
    messageFromChild;

    handleChildEvent(event) {
        // This handler captures the event on the slot
        // demonstrating the BUBBLES property
        console.log('Event captured in wrapper via slot listener:', event.detail.message);
        this.messageFromChild = event.detail.message;
    }
}
