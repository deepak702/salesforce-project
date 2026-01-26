import { LightningElement } from 'lwc';

export default class WrapperBoundary extends LightningElement {
    messageFromChild;

    connectedCallback() {
        // Listen for the event on the wrapper itself
        // This event must cross the wrapper's shadow DOM boundary
        // Only possible if composed: true is set in child
        this.addEventListener('customevent', (event) => {
            console.log('Event captured in wrapper:', event.detail.message);
            this.messageFromChild = event.detail.message;
        });
    }
}
