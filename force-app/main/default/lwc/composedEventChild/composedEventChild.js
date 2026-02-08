import { LightningElement } from 'lwc';

/**
 * ComposedEventChild Component
 * 
 * This component demonstrates how COMPOSED events work in Lightning Web Components.
 * 
 * Key Concept: The 'composed' property determines whether a custom event can cross
 * the Shadow DOM boundary. This is critical for event propagation in LWC.
 * 
 * Shadow DOM creates encapsulation boundaries. Events with composed: true can escape
 * these boundaries and propagate to parent components outside the shadow root.
 */
export default class ComposedEventChild extends LightningElement {
  
  /**
   * Handles the dispatch of a composed custom event
   * 
   * This method demonstrates the creation and dispatch of a composed event that
   * can cross Shadow DOM boundaries and reach parent/ancestor components.
   */
  handleDispatchComposedEvent() {
    // Create a new CustomEvent with composed: true
    // This is the standard way to create events that need to propagate across component boundaries
    const event = new CustomEvent('composedcustomevent', {
      
      // detail: Contains the data payload you want to send to parent components
      // This can be any serializable JavaScript object
      detail: {
        message: 'This is a composed event - can cross shadow DOM boundary',
        timestamp: new Date().toISOString()
      },
      
      // bubbles: true - Allows the event to bubble up the DOM tree
      // Without this, the event would only fire on the exact element that dispatched it
      bubbles: true,
      
      // composed: true - KEY PROPERTY! This allows the event to cross Shadow DOM boundaries
      // 
      // When composed: true:
      //   ✅ Event can propagate from child component to parent component
      //   ✅ Event can reach grandparent and higher ancestor components
      //   ✅ Event crosses the shadow root boundary
      //
      // When composed: false (or omitted):
      //   ❌ Event stops at the shadow DOM boundary
      //   ❌ Parent components cannot listen to this event
      //   ❌ Only components within the same shadow root can receive it
      //
      // Best Practice: For public API events that parent components should handle,
      // always set both bubbles: true AND composed: true
      composed: true
    });
    
    // Dispatch the event - this sends it up the component hierarchy
    // Parent components can listen for this using the oneventname syntax in their template
    // Example: <c-composed-event-child oncomposedcustomevent={handleEvent}></c-composed-event-child>
    this.dispatchEvent(event);
    
    // Log for debugging - helps verify the event was dispatched successfully
    console.log('Composed event dispatched:', event);
  }
}
