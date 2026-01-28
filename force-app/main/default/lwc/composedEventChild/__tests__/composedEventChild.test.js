import { createElement } from 'lwc';
import ComposedEventChild from 'c/composedEventChild';
import NonComposedEventChild from 'c/nonComposedEventChild';

describe('Composed vs Non-Composed Events', () => {
  describe('ComposedEventChild - composed: true', () => {
    let element;

    beforeEach(() => {
      element = createElement('c-composed-event-child', {
        is: ComposedEventChild
      });
      document.body.appendChild(element);
    });

    afterEach(() => {
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    it('should dispatch event with composed: true', (done) => {
      const composedEventHandler = jest.fn();
      
      // Attach listener to the element
      element.addEventListener('composedcustomevent', composedEventHandler);

      // Get the button and click it
      const button = element.shadowRoot.querySelector('button');
      button.click();

      // Use setImmediate to allow event propagation
      setImmediate(() => {
        expect(composedEventHandler).toHaveBeenCalled();
        const event = composedEventHandler.mock.calls[0][0];
        expect(event.composed).toBe(true);
        expect(event.bubbles).toBe(true);
        expect(event.detail.message).toContain('composed event');
        done();
      });
    });

    it('should have correct event detail', (done) => {
      const composedEventHandler = jest.fn();
      element.addEventListener('composedcustomevent', composedEventHandler);

      const button = element.shadowRoot.querySelector('button');
      button.click();

      setImmediate(() => {
        const event = composedEventHandler.mock.calls[0][0];
        expect(event.detail).toEqual(
          expect.objectContaining({
            message: expect.stringContaining('composed event'),
            timestamp: expect.any(String)
          })
        );
        done();
      });
    });

    it('event should be able to cross shadow DOM boundary', (done) => {
      // This test demonstrates that composed events can bubble through shadow DOM
      const parentHandler = jest.fn();
      
      // Add listener to document (outside of component's shadow DOM)
      document.addEventListener('composedcustomevent', parentHandler);

      const button = element.shadowRoot.querySelector('button');
      button.click();

      setImmediate(() => {
        // The event handler on document will be called because composed: true
        expect(parentHandler).toHaveBeenCalled();
        document.removeEventListener('composedcustomevent', parentHandler);
        done();
      });
    });
  });

  describe('NonComposedEventChild - composed: false', () => {
    let element;

    beforeEach(() => {
      element = createElement('c-non-composed-event-child', {
        is: NonComposedEventChild
      });
      document.body.appendChild(element);
    });

    afterEach(() => {
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    it('should dispatch event with composed: false', (done) => {
      const nonComposedEventHandler = jest.fn();
      
      // Attach listener to the element
      element.addEventListener('noncomposedcustomevent', nonComposedEventHandler);

      const button = element.shadowRoot.querySelector('button');
      button.click();

      setImmediate(() => {
        expect(nonComposedEventHandler).toHaveBeenCalled();
        const event = nonComposedEventHandler.mock.calls[0][0];
        expect(event.composed).toBe(false);
        expect(event.bubbles).toBe(true);
        expect(event.detail.message).toContain('non-composed event');
        done();
      });
    });

    it('should NOT cross shadow DOM boundary', (done) => {
      // This test demonstrates that non-composed events cannot bubble through shadow DOM
      const parentHandler = jest.fn();
      
      // Add listener to document (outside of component's shadow DOM)
      document.addEventListener('noncomposedcustomevent', parentHandler);

      const button = element.shadowRoot.querySelector('button');
      button.click();

      // Wait a bit to ensure event would have propagated if it could
      setTimeout(() => {
        // The event handler on document will NOT be called because composed: false
        expect(parentHandler).not.toHaveBeenCalled();
        document.removeEventListener('noncomposedcustomevent', parentHandler);
        done();
      }, 100);
    });
  });

  describe('Event Propagation Behavior', () => {
    let composedChild;
    let nonComposedChild;

    beforeEach(() => {
      composedChild = createElement('c-composed-event-child', {
        is: ComposedEventChild
      });
      nonComposedChild = createElement('c-non-composed-event-child', {
        is: NonComposedEventChild
      });
      document.body.appendChild(composedChild);
      document.body.appendChild(nonComposedChild);
    });

    afterEach(() => {
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    it('composed event should propagate, non-composed should not', (done) => {
      const composedHandler = jest.fn();
      const nonComposedHandler = jest.fn();

      document.addEventListener('composedcustomevent', composedHandler);
      document.addEventListener('noncomposedcustomevent', nonComposedHandler);

      // Dispatch both events
      const composedBtn = composedChild.shadowRoot.querySelector('button');
      const nonComposedBtn = nonComposedChild.shadowRoot.querySelector('button');

      composedBtn.click();
      nonComposedBtn.click();

      setImmediate(() => {
        expect(composedHandler).toHaveBeenCalledTimes(1);
        expect(nonComposedHandler).not.toHaveBeenCalled();

        document.removeEventListener('composedcustomevent', composedHandler);
        document.removeEventListener('noncomposedcustomevent', nonComposedHandler);
        done();
      });
    });
  });
});

describe('Real-World Use Cases', () => {
  describe('Analytics Use Case - Composed Event', () => {
    it('should allow parent to track user interactions', (done) => {
      const element = createElement('c-composed-event-child', {
        is: ComposedEventChild
      });
      document.body.appendChild(element);

      const analyticsHandler = jest.fn();
      // Analytics service listens at document level
      document.addEventListener('composedcustomevent', analyticsHandler);

      const button = element.shadowRoot.querySelector('button');
      button.click();

      setImmediate(() => {
        // Analytics handler receives the event
        expect(analyticsHandler).toHaveBeenCalled();
        expect(analyticsHandler.mock.calls[0][0].detail.timestamp).toBeDefined();
        
        document.removeEventListener('composedcustomevent', analyticsHandler);
        while (document.body.firstChild) {
          document.body.removeChild(document.body.firstChild);
        }
        done();
      });
    });
  });

  describe('Encapsulation Use Case - Non-Composed Event', () => {
    it('should keep internal events private', (done) => {
      const element = createElement('c-non-composed-event-child', {
        is: NonComposedEventChild
      });
      document.body.appendChild(element);

      const internalHandler = jest.fn();
      // External listeners cannot capture non-composed events
      document.addEventListener('noncomposedcustomevent', internalHandler);

      const button = element.shadowRoot.querySelector('button');
      button.click();

      setTimeout(() => {
        // External handler does NOT receive the event
        expect(internalHandler).not.toHaveBeenCalled();
        
        document.removeEventListener('noncomposedcustomevent', internalHandler);
        while (document.body.firstChild) {
          document.body.removeChild(document.body.firstChild);
        }
        done();
      }, 100);
    });
  });
});
