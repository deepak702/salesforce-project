import { LightningElement } from 'lwc';

export default class WrapperMiddle extends LightningElement {
  wrapperReceivedEvent = false;

  renderedCallback() {
    // Try to listen for non-composed event at the wrapper level
    const childElement = this.template.querySelector('c-non-composed-event-child');
    
    if (childElement && !childElement._wrapperListenerAttached) {
      console.log('🔵 [WRAPPER] Attaching listener for non-composed event');
      
      childElement.addEventListener('noncomposedcustomevent', (event) => {
        console.error('🔵 [WRAPPER] RECEIVED non-composed event!');
        console.error('  Event composed:', event.composed);
        this.wrapperReceivedEvent = true;
        
        setTimeout(() => {
          this.wrapperReceivedEvent = false;
        }, 3000);
      });
      
      childElement._wrapperListenerAttached = true;
    }
  }
}
