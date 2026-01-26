import { LightningElement } from 'lwc';

export default class ChildComposedTest extends LightningElement {

    fireEvent() {
        // BUBBLES PROPERTY DEMONSTRATION:
        // ===============================
        // 
        // Current setup: Event fires from child component
        // 
        // TEST 1: Set bubbles: false
        //   Event fires → Stops at the immediate listener only
        //   Result: Wrapper and Parent cannot capture event (no bubbling) ❌
        //
        // TEST 2: Set bubbles: true (CURRENT)
        //   Event fires → Bubbles up through the DOM tree
        //   Result: Event propagates to wrapper listener, then to parent ✓
        //
        // LEARNING: bubbles property controls whether events bubble up the DOM tree.
        // Without it, the event only fires at the direct listener.

        const event = new CustomEvent('customevent', {
            detail: {
                message: 'Event reached parent successfully'
            },
            bubbles: false,  // Set to FALSE to see event stop propagating
            composed: false
        });

        this.dispatchEvent(event);
    }
}
