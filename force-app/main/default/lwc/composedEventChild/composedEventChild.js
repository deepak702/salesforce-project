import { LightningElement } from 'lwc';

export default class ComposedEventChild extends LightningElement {
  handleDispatchComposedEvent() {
    const event = new CustomEvent('composedcustomevent', {
      detail: {
        message: 'This is a composed event - can cross shadow DOM boundary',
        timestamp: new Date().toISOString()
      },
      bubbles: true,
      composed: true  // KEY: This allows event to cross shadow DOM boundary
    });
    
    this.dispatchEvent(event);
    console.log('Composed event dispatched:', event);
  }
}
