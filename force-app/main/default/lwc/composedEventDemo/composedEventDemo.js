import { LightningElement } from 'lwc';

export default class ComposedEventDemo extends LightningElement {
  composedEventReceived = false;
  composedEventDetail = null;

  nonComposedEventReceivedAtGrandparent = false;

  connectedCallback() {
    console.log('\n=================================');
    console.log('🎯 ComposedEventDemo Initialized');
    console.log('=================================\n');
    console.log('This demo explains the composed property in LWC custom events:');
    console.log('composed: true  → Event crosses shadow DOM boundaries');
    console.log('composed: false → Event blocked at shadow DOM boundary\n');
  }

  // Handler for composed event - WILL be received
  handleComposedEvent(event) {
    console.log('\n✅ ========================================');
    console.log('🟢 [PARENT] Received COMPOSED event');
    console.log('Event Properties:');
    console.log('  - event.composed:', event.composed);
    console.log('  - event.bubbles:', event.bubbles);
    console.log('  - event.type:', event.type);
    console.log('Event detail:', event.detail);
    console.log('✅ ========================================\n');
    
    this.composedEventReceived = true;
    this.composedEventDetail = event.detail;
    
    // Reset the received flag after 3 seconds
    setTimeout(() => {
      this.composedEventReceived = false;
      this.composedEventDetail = null;
    }, 3000);
  }

  // Handler for non-composed event at grandparent level
  handleNonComposedEventAtGrandparent(event) {
    console.error('\n🔴 [GRANDPARENT ERROR] Received non-composed event at grandparent level!');
    console.error('Event composed:', event.composed);
    console.error('This should NOT happen if composed: false is working correctly!');
    console.error('The event crossed the wrapper boundary when it should have been blocked.\n');
    
    this.nonComposedEventReceivedAtGrandparent = true;
    
    setTimeout(() => {
      this.nonComposedEventReceivedAtGrandparent = false;
    }, 3000);
  }
}
