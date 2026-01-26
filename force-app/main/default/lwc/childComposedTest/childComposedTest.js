import { LightningElement } from 'lwc';

export default class ChildComposedTest extends LightningElement {

    fireEvent() {
        // COMPOSED PROPERTY DEMONSTRATION:
        // ================================
        // 
        // Current setup: Parent listens on wrapper component,
        // Child is inside wrapper's shadow DOM
        //
        // TEST 1: Set composed: false
        //   Event fires → Hits wrapper's shadow DOM boundary → STOPS
        //   Result: Wrapper cannot capture event, Parent cannot capture event ❌
        //
        // TEST 2: Set composed: true  
        //   Event fires → Passes through wrapper's shadow DOM boundary → Reaches Parent
        //   Result: Event propagates to wrapper and parent ✓
        //
        // LEARNING: composed property controls whether events can cross
        // shadow DOM boundaries. Without it, events are confined within shadow DOM.

        const event = new CustomEvent('customevent', {
            detail: {
                message: 'Event reached parent successfully'
            },
            bubbles: true,
            composed: false  // Change to TRUE to see it work across shadow DOM boundary
        });

        this.dispatchEvent(event);
    }
}
