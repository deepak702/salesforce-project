🚀 Understanding BUBBLES Property in Salesforce LWC

The `bubbles` property controls whether custom events propagate up the DOM tree - essential for parent-child component communication!

WHAT IS BUBBLING?
Like a bubble rising through water, events travel UP the component hierarchy. Without bubbles: true, events get trapped!

EVENT CHAIN: Child → Wrapper → Parent

❌ bubbles: false
Child dispatches event → Event STOPS at Wrapper → Parent CANNOT receive! 🔇
Result: Event doesn't propagate up the DOM tree

✅ bubbles: true  
Child dispatches event → Wrapper receives → Parent receives → Continues up! 📢
Result: Event travels through entire component hierarchy

WHY DOES THIS MATTER?
In LWC, when you have nested components (Child inside Wrapper inside Parent), you need bubbles: true if you want parent components to handle child events.

Code Setup:

CHILD:
```javascript
const event = new CustomEvent('customevent', {
    detail: { message: 'Hello Parent!' },
    bubbles: true  // ← Set FALSE to see event stop at wrapper
});
this.dispatchEvent(event);
```

WRAPPER (Middle Layer):
```html
<slot oncustomevent={handleChildEvent}></slot>
```

PARENT (Top Layer):
```html
<c-wrapper-boundary oncustomevent={handleChildEvent}>
    <c-child-bubble-test></c-child-bubble-test>
</c-wrapper-boundary>
```

KEY DIFFERENCES:
• bubbles: false = Event trapped (only immediate listeners can respond)
• bubbles: true = Event propagates up (all ancestors can respond)

REAL TEST:
bubbles: false → Event handled only at immediate child ✅
bubbles: true → Event handled in wrapper AND parent ✅

LEARNING: Without understanding bubbles, you'll struggle with event communication in nested LWC components!

#Salesforce #LWC #JavaScript #EventHandling #WebDevelopment #SalesforceDevs
