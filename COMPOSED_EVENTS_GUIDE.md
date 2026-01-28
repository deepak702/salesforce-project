# Composed Property in Salesforce LWC Custom Events - Complete Guide

## Overview
This project demonstrates the `composed` property in Lightning Web Components (LWC) custom events with real-world examples. The `composed` property controls whether a custom event can cross the shadow DOM boundary.

## What is the Composed Property?

### Definition
The `composed` property is a boolean option in custom event creation that determines whether an event can propagate across the shadow DOM boundary.

```javascript
const event = new CustomEvent('eventname', {
  detail: { /* data */ },
  bubbles: true,
  composed: true  // or false
});
```

### Key Concepts

| Property | Value | Behavior | Use Case |
|----------|-------|----------|----------|
| `composed` | `true` | Event crosses shadow DOM boundary (propagates to parent) | Public component events |
| `composed` | `false` | Event stops at shadow DOM boundary (stays inside component) | Internal component events |

---

## Components in This Project

### 1. **composedEventChild** 
A child component that dispatches a custom event with `composed: true`.

**File Structure:**
```
composedEventChild/
├── composedEventChild.html      # Template with dispatch button
├── composedEventChild.js         # Event logic with composed: true
├── composedEventChild.js-meta.xml # Metadata
└── __tests__/
    └── composedEventChild.test.js # Unit tests
```

**Key Code:**
```javascript
const event = new CustomEvent('composedcustomevent', {
  detail: { message: 'This is a composed event' },
  bubbles: true,
  composed: true  // ✓ Event can cross shadow DOM boundary
});
```

**Behavior:**
- ✓ Parent component CAN listen and receive the event
- ✓ Event propagates through shadow DOM boundary
- ✓ Useful for public component events

---

### 2. **nonComposedEventChild**
A child component that dispatches a custom event with `composed: false`.

**File Structure:**
```
nonComposedEventChild/
├── nonComposedEventChild.html      # Template with dispatch button
├── nonComposedEventChild.js        # Event logic with composed: false
└── nonComposedEventChild.js-meta.xml # Metadata
```

**Key Code:**
```javascript
const event = new CustomEvent('noncomposedcustomevent', {
  detail: { message: 'This is a non-composed event' },
  bubbles: true,
  composed: false  // ✗ Event cannot cross shadow DOM boundary
});
```

**Behavior:**
- ✗ Parent component CANNOT listen to this event
- ✗ Event is blocked at shadow DOM boundary
- ✓ Useful for internal component state changes

---

### 3. **composedEventDemo**
The main demo component that showcases both event types with live examples.

**File Structure:**
```
composedEventDemo/
├── composedEventDemo.html        # Template with detailed examples
├── composedEventDemo.js          # Event handlers and logic
├── composedEventDemo.js-meta.xml # Metadata (exposed component)
└── composedEventDemo.css         # Styling
```

**Features:**
- Live interactive examples
- Event listener status display
- Comparison table
- Console logging
- Real-time event reception feedback

---

### 4. **composedEventTest**
A test component demonstrating real-world scenarios.

**File Structure:**
```
composedEventTest/
├── composedEventTest.html        # Template with test buttons
├── composedEventTest.js          # Real-world event scenarios
└── composedEventTest.js-meta.xml # Metadata
```

**Scenarios:**
1. **User Interaction** - Uses composed: true (should propagate)
2. **Internal State Change** - Uses composed: false (should not propagate)

---

## Real-World Use Cases

### ✓ Use `composed: true` When:

1. **User Interactions Tracking (Analytics)**
   ```javascript
   // Button click that should be tracked by parent/analytics service
   const clickEvent = new CustomEvent('useraction', {
     detail: { action: 'clicked', userId: '123' },
     bubbles: true,
     composed: true
   });
   ```

2. **Public API Events**
   ```javascript
   // Component state change that parent cares about
   const changeEvent = new CustomEvent('valuechanged', {
     detail: { newValue: 'updated' },
     bubbles: true,
     composed: true
   });
   ```

3. **Form Submissions**
   ```javascript
   // Form data submission from nested component
   const submitEvent = new CustomEvent('formssubmitted', {
     detail: { formData: {...} },
     bubbles: true,
     composed: true
   });
   ```

### ✗ Use `composed: false` When:

1. **Internal Component Logic**
   ```javascript
   // Internal state update not needed by parent
   const internalEvent = new CustomEvent('internalstatechanged', {
     detail: { internalState: {...} },
     bubbles: true,
     composed: false
   });
   ```

2. **Component Lifecycle Events**
   ```javascript
   // Loading complete (internal concern)
   const loadEvent = new CustomEvent('contentloaded', {
     detail: { timestamp: Date.now() },
     bubbles: true,
     composed: false
   });
   ```

3. **Animation or Transition Handlers**
   ```javascript
   // Animation frame update (internal implementation detail)
   const animEvent = new CustomEvent('animationframe', {
     detail: { frame: 42 },
     bubbles: true,
     composed: false
   });
   ```

---

## Visual Comparison

### Event with `composed: true`
```
Child Component (Shadow DOM)
        ↓
    Dispatches Event
        ↓
    Shadow DOM Boundary
        ↓ (✓ CAN CROSS)
    Parent Component (Light DOM)
        ↓
    Parent can listen and handle event
```

### Event with `composed: false`
```
Child Component (Shadow DOM)
        ↓
    Dispatches Event
        ↓
    Shadow DOM Boundary
        ↓ (✗ BLOCKED)
    [Event Stops Here - Cannot Cross]
        
Parent Component (Light DOM)
    [Cannot hear the event]
```

---

## How to Test

### 1. **Using the Demo Component**
1. Add `composedEventDemo` to a Lightning page or app
2. Open browser DevTools (F12)
3. Go to the Console tab
4. Click the buttons to dispatch events
5. Watch for console logs and event status updates

### 2. **Running Unit Tests**
```bash
npm test -- composedEventChild.test.js
```

The test file includes:
- ✓ Composed event propagation tests
- ✓ Non-composed event boundary tests
- ✓ Real-world use case scenarios
- ✓ Analytics tracking simulation
- ✓ Encapsulation verification

### 3. **Manual Testing Steps**

**Testing Composed Event:**
1. Click "Dispatch Composed Event" button
2. Parent component's event listener should trigger
3. "Event Received at Parent Level" message appears
4. Console shows: `Parent component received COMPOSED event`

**Testing Non-Composed Event:**
1. Click "Dispatch Non-Composed Event" button
2. Parent component's event listener does NOT trigger
3. "Event will NOT propagate to parent" message shows
4. Console does NOT show received event at parent level

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✓ Full Support |
| Firefox | ✓ Full Support |
| Safari | ✓ Full Support |
| Edge | ✓ Full Support |
| IE 11 | ✗ Not Supported |

---

## Common Mistakes

### ❌ Mistake 1: Forgetting `bubbles: true` with `composed: true`
```javascript
// Event won't propagate at all!
const event = new CustomEvent('eventname', {
  bubbles: false,  // ❌ Should be true
  composed: true
});
```

### ❌ Mistake 2: Using `composed: true` for internal events
```javascript
// Exposes internal implementation details
const internalEvent = new CustomEvent('internalevent', {
  bubbles: true,
  composed: true  // ❌ Should be false for internal events
});
```

### ❌ Mistake 3: Not checking `composed` property in tests
```javascript
// Test won't verify boundary crossing
it('should dispatch event', () => {
  // ❌ Doesn't verify composed: true
  expect(event).toBeDefined();
});

// ✓ Better approach:
it('should dispatch composed event', () => {
  expect(event.composed).toBe(true);
});
```

---

## Best Practices

### 1. **Always Set Both `bubbles` and `composed`**
```javascript
// Good - explicit configuration
const event = new CustomEvent('eventname', {
  detail: { /* data */ },
  bubbles: true,
  composed: true
});
```

### 2. **Use Descriptive Event Names**
```javascript
// ✓ Clear event names
'useraction'           // User interaction (composed)
'valuechanged'         // Public value change (composed)
'internalstatechanged' // Internal state (non-composed)

// ❌ Unclear
'eventfired'
'somethingchanged'
```

### 3. **Document Event Intent**
```javascript
/**
 * Dispatched when user clicks the action button
 * This is a PUBLIC event that crosses shadow DOM boundaries
 * composed: true
 */
const event = new CustomEvent('actionclicked', {
  bubbles: true,
  composed: true
});
```

### 4. **Type Events with Detail**
```javascript
// Use JSDoc to document event detail structure
/**
 * @event eventname
 * @type {CustomEvent}
 * @property {Object} detail - Event payload
 * @property {string} detail.action - The action name
 * @property {string} detail.timestamp - ISO timestamp
 */
const event = new CustomEvent('eventname', {
  detail: {
    action: 'someaction',
    timestamp: new Date().toISOString()
  },
  bubbles: true,
  composed: true
});
```

---

## Related Resources

- [MDN - CustomEvent.composed](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
- [W3C - Shadow DOM Event Retargeting](https://dom.spec.whatwg.org/#retarget)
- [Salesforce LWC Documentation](https://developer.salesforce.com/docs/component-library/documentation/lwc)
- [Web Components Best Practices](https://www.webcomponents.org/introduction)

---

## Summary Table

| Aspect | Composed: true | Composed: false |
|--------|---|---|
| **Crosses Shadow DOM** | ✓ Yes | ✗ No |
| **Parent Can Listen** | ✓ Yes | ✗ No |
| **Bubbles Enabled** | ✓ Required | ✓ Required |
| **Event Propagation** | ↗ Outward | ⊗ Internal Only |
| **Use for Public APIs** | ✓ Yes | ✗ No |
| **Use for Internal Events** | ✗ No | ✓ Yes |
| **Track User Actions** | ✓ Yes | ✗ No |
| **Component Encapsulation** | ✗ No | ✓ Yes |

---

## Conclusion

The `composed` property is crucial for proper component design in LWC:
- Use `composed: true` for events that are part of your component's public API
- Use `composed: false` for internal implementation details
- Always set `bubbles: true` when using `composed: true`
- Document your events clearly so consumers understand propagation behavior

This creates clean, predictable, and maintainable Lightning Web Components!
