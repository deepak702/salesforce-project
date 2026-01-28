import { LightningElement } from 'lwc';

export default class WrapperMiddle extends LightningElement {
  wrapperReceivedEvent = false;

  handleNonComposedEvent(event) {
    console.log('\n🟠 [WRAPPER] RECEIVED non-composed event');
    console.log('Event Properties:');
    console.log('  - event.composed:', event.composed);
    console.log('  - event.bubbles:', event.bubbles);
    console.log('This is EXPECTED because child and wrapper are in the same shadow DOM context.\n');
    
    this.wrapperReceivedEvent = true;
    
    setTimeout(() => {
      this.wrapperReceivedEvent = false;
    }, 3000);
  }
}
