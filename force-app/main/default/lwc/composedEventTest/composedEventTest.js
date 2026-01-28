import { LightningElement } from 'lwc';
/**
 * Test component to demonstrate composed vs non-composed events
 * in a real-world scenario with event boundary crossing
 */
export default class ComposedEventTest extends LightningElement {
  composedEventLog = [];
  nonComposedEventLog = [];

  connectedCallback() {
    console.log('=== Composed Event Test Component Initialized ===');
    console.log('This component demonstrates:');
    console.log('1. Events with composed: true (can cross shadow DOM)');
    console.log('2. Events with composed: false (blocked at shadow DOM)');
    console.log('3. Event propagation across component boundaries');
  }

  /**
   * Simulates a real-world scenario where you want to track user interactions
   * This event should propagate to parent components
   */
  handleUserInteraction() {
    const composedEvent = new CustomEvent('useraction', {
      detail: {
        action: 'button-clicked',
        userId: 'user123',
        timestamp: new Date().toISOString()
      },
      bubbles: true,
      composed: true
    });

    this.dispatchEvent(composedEvent);
    this.logEvent('composed', 'User Interaction Event dispatched');
  }

  /**
   * Simulates an internal component state change that should NOT
   * propagate to parent components (internal concern)
   */
  handleInternalStateChange(newState) {
    const nonComposedEvent = new CustomEvent('internalstatechanged', {
      detail: {
        state: newState,
        timestamp: new Date().toISOString()
      },
      bubbles: true,
      composed: false
    });

    this.dispatchEvent(nonComposedEvent);
    this.logEvent('non-composed', 'Internal State Changed (should not cross boundary)');
  }

  logEvent(eventType, message) {
    const logEntry = `[${new Date().toLocaleTimeString()}] ${message}`;
    if (eventType === 'composed') {
      this.composedEventLog = [...this.composedEventLog, logEntry];
    } else {
      this.nonComposedEventLog = [...this.nonComposedEventLog, logEntry];
    }
    console.log(logEntry);
  }
}
