import { LightningElement } from 'lwc';

export default class NonComposedEventChild extends LightningElement {
  handleDispatchNonComposedEvent() {
    console.log('\n=== DISPATCHING NON-COMPOSED EVENT ===');
    
    const event = new CustomEvent('noncomposedcustomevent', {
      detail: {
        message: 'This is a non-composed event - cannot cross shadow DOM boundary',
        timestamp: new Date().toISOString()
      },
      bubbles: true,
      composed: true  // KEY: This prevents event from crossing shadow DOM boundary
    });
    
    console.log('Event properties BEFORE dispatch:');
    console.log('  - composed:', event.composed);
    console.log('  - bubbles:', event.bubbles);
    console.log('  - type:', event.type);
    console.log('📤 Dispatching from child component (inside shadow DOM)...');
    
    this.dispatchEvent(event);
    
    console.log('✓ Non-composed event dispatched from child');
    console.log('ℹ️ Note: Event should NOT reach parent due to composed: false');
    console.log('=== END DISPATCH ===\n');
  }
}
