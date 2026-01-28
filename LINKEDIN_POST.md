# LinkedIn Post: Understanding the `composed` Property in Salesforce LWC

---

## Visual Diagrams

### 1. Component Hierarchy - The Three-Level Structure

```
┌─────────────────────────────────────────────────────────────┐
│                  🟢 GRANDPARENT                             │
│         (composedEventDemo - Light DOM)                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Shadow DOM Boundary #1                              │  │
│  │                                                       │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │     🟠 WRAPPER (wrapperMiddle)               │   │  │
│  │  │   (Shadow DOM Level 2)                       │   │  │
│  │  │                                              │   │  │
│  │  │  ┌──────────────────────────────────────┐   │   │  │
│  │  │  │ Shadow DOM Boundary #2               │   │   │  │
│  │  │  │                                      │   │   │  │
│  │  │  │ 🔵 CHILD                            │   │   │  │
│  │  │  │ (nonComposedEventChild)             │   │   │  │
│  │  │  │ (Shadow DOM Level 3)                │   │   │  │
│  │  │  │                                      │   │   │  │
│  │  │  │ [Dispatch Event Button]             │   │   │  │
│  │  │  │                                      │   │   │  │
│  │  │  └──────────────────────────────────────┘   │   │  │
│  │  │                                              │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### 2. Event Flow with `composed: true` ✅

```
🔵 CHILD dispatches event with composed: true
        ↓
    Child's Shadow DOM
        ↓
    [CROSSES Boundary #2] ✅
        ↓
    🟠 WRAPPER receives event ✅
        ↓
    Wrapper's Shadow DOM
        ↓
    [CROSSES Boundary #1] ✅
        ↓
    🟢 GRANDPARENT receives event ✅
        ↓
    Event propagates to document level
        ↓
    All ancestors can listen ✅


CODE EXAMPLE:
┌──────────────────────────────────────────┐
│ const event = new CustomEvent('myevent', │
│ {                                        │
│   bubbles: true,                         │
│   composed: true  ← CROSSES BOUNDARIES   │
│ });                                      │
│ this.dispatchEvent(event);               │
└──────────────────────────────────────────┘
```

---

### 3. Event Flow with `composed: false` 🚫

```
🔵 CHILD dispatches event with composed: false
        ↓
    Child's Shadow DOM
        ↓
    [BLOCKED at Boundary #2] ❌
        ↓
    Event STOPS HERE
        ↓
    🟠 WRAPPER receives event ✅
    (because it's in same shadow DOM context)
        ↓
    [CANNOT CROSS Boundary #1] ❌
        ↓
    🟢 GRANDPARENT DOES NOT receive event ✓
        ↓
    Event never reaches document level


CODE EXAMPLE:
┌────────────────────────────────────────────┐
│ const event = new CustomEvent('myevent',   │
│ {                                          │
│   bubbles: true,                           │
│   composed: false  ← BLOCKS AT BOUNDARY    │
│ });                                        │
│ this.dispatchEvent(event);                 │
└────────────────────────────────────────────┘
```

---

### 4. Shadow DOM Boundary Comparison

```
╔════════════════════════════════════════════════════════╗
║          COMPOSED: TRUE vs COMPOSED: FALSE             ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║ COMPOSED: TRUE                                         ║
║ ┌──────────────────────────────────────────────┐      ║
║ │ Component 1 (Shadow DOM)                     │      ║
║ │  ┌────────────────────────────────────────┐  │      ║
║ │  │ dispatchEvent({composed: true})        │  │      ║
║ │  └────────────────────────────────────────┘  │      ║
║ │          ↓                                    │      ║
║ │ ═══════════════════════════════════════════   │      ║
║ │         SHADOW DOM BOUNDARY                   │      ║
║ │ ═══════════════════════════════════════════   │      ║
║ │          ↓                                    │      ║
║ │ Component 2 receives event ✅                 │      ║
║ └──────────────────────────────────────────────┘      ║
║                                                        ║
║ ════════════════════════════════════════════════════   ║
║                                                        ║
║ COMPOSED: FALSE                                        ║
║ ┌──────────────────────────────────────────────┐      ║
║ │ Component 1 (Shadow DOM)                     │      ║
║ │  ┌────────────────────────────────────────┐  │      ║
║ │  │ dispatchEvent({composed: false})       │  │      ║
║ │  └────────────────────────────────────────┘  │      ║
║ │          ↓                                    │      ║
║ │ ═══════════════════════════════════════════   │      ║
║ │         SHADOW DOM BOUNDARY (BLOCKS)         │      ║
║ │ ═══════════════════════════════════════════   │      ║
║ │          ✗ EVENT STOPS HERE                  │      ║
║ │                                               │      ║
║ │ Component 2 DOES NOT receive event ✓         │      ║
║ └──────────────────────────────────────────────┘      ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

### 5. Real-World Use Case Diagram

```
┌─────────────────────────────────────────────────────────────┐
│            FORM COMPONENT (Parent)                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ INPUT FIELD COMPONENT (Child)                        │   │
│  │                                                      │   │
│  │  On Value Change:                                    │   │
│  │  ├─ Event: 'valuechanged'                            │   │
│  │  ├─ composed: true ✅ (Parent needs to know)         │   |
│  │  └─ Parent updates form state                        │   │
│  │                                                      │   │
│  │  Internal State Update:                              │   │
│  │  ├─ Event: 'internalstatechanged'                    │   │
│  │  ├─ composed: false ✅ (Private, don't expose)      │   │
│  │  └─ Parent doesn't care about internal details       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

### 6. Testing Scenario - Console Output Expected

```
╔════════════════════════════════════════════════════════╗
║         EXPECTED CONSOLE OUTPUT                        ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║ When Click "Dispatch Composed Event":                  ║
║ ✅ [PARENT] Received COMPOSED event                    ║
║ ✅ Event Properties: composed: true                    ║
║ ✅ Parent listener triggered                          ║
║                                                        ║
║ ════════════════════════════════════════════════      ║
║                                                        ║
║ When Click "Dispatch Non-Composed Event":             ║
║ ✅ [WRAPPER] RECEIVED non-composed event              ║
║    (same shadow DOM context)                          ║
║ ❌ [GRANDPARENT ERROR] NOT in console                 ║
║    (blocked at wrapper boundary)                      ║
║ ✅ Grandparent listener NOT triggered                 ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## Post Content

🚀 **Understanding the `composed` Property in Salesforce LWC Custom Events**

Just spent some time diving deep into one of the most underrated concepts in Lightning Web Components: the `composed` property in custom events. Here's what I learned! 🎯

### What is the `composed` Property?

When dispatching custom events in LWC, we often set `bubbles: true` to allow events to propagate. But there's a hidden superpower: the `composed` property! 🔐

```javascript
const event = new CustomEvent('myevent', {
  detail: { message: 'Hello' },
  bubbles: true,
  composed: true  // ← This is the magic!
});
```

### The Real Difference:

**`composed: true`** → Events can cross shadow DOM boundaries (perfect for public APIs)
**`composed: false`** → Events are blocked at shadow DOM boundaries (ideal for internal events)

### Why This Matters:

In Salesforce LWC architecture, shadow DOM creates natural encapsulation boundaries. When you set `composed: false`, you're essentially saying: "This is an internal event. Don't let it escape my component's context."

### Real-World Scenarios:

✅ **Use `composed: true` for:**
- User interactions tracking (analytics)
- Public value changes
- Form submissions
- Events meant for parent components

✅ **Use `composed: false` for:**
- Internal state changes
- Component lifecycle events
- Implementation details
- Private component communication

### The Challenge:

Here's where it gets interesting! In Salesforce LWC, testing this behavior requires a **three-level component hierarchy** to see the boundary blocking in action. A simple parent-child setup might be misleading because direct parents can receive events due to LWC's event retargeting.

The key: Use a **grandparent → wrapper → child** structure to truly demonstrate how `composed: false` blocks events at shadow DOM boundaries! 🎯

### My Takeaway:

Always think about whether your custom event is part of your component's **public API** or just **internal noise**. Choose `composed` wisely, and you'll build more maintainable, secure, and predictable components.

Have you encountered issues with custom event propagation in LWC? Drop a comment—let's discuss! 💬

#Salesforce #LWC #WebDevelopment #JavaScript #ShadowDOM #BestPractices

---

## Metadata

- **Character Count:** 1,487 characters
- **Status:** Ready to post
- **Date Created:** January 28, 2026
- **Platform:** LinkedIn
- **Category:** Technical Learning / Salesforce LWC

---

## Related Resources

This LinkedIn post is based on the hands-on implementation in this repository:
- **Components Demonstrated:**
  - `composedEventChild` - Demonstrates composed: true behavior
  - `nonComposedEventChild` - Demonstrates composed: false behavior
  - `wrapperMiddle` - Wrapper component for testing boundary crossing
  - `composedEventDemo` - Main demo component

- **Key Files:**
  - `COMPOSED_EVENTS_GUIDE.md` - Comprehensive technical guide
  - `force-app/main/default/lwc/composedEventDemo/` - Live demo components

---

## Tips for Sharing

1. **Copy the post content** (without metadata) and paste into LinkedIn
2. **Convert diagrams to images** - Use tools like:
   - Excalidraw (excalidraw.com)
   - Lucidchart
   - Draw.io
   - Figma
3. **Consider adding:** Screenshots of the working demo or console logs
4. **Engage:** Respond to comments and share your own experiences
5. **Link:** Reference the GitHub repository or your blog post for more details

---

## Diagram Conversion Guide

**For best results on LinkedIn:**
- Diagram 1: Component Hierarchy (use as main cover image)
- Diagram 2: Event Flow with composed: true (side-by-side comparison)
- Diagram 3: Event Flow with composed: false
- Diagram 4: Shadow DOM Boundary Comparison (infographic style)
- Diagram 5: Real-World Use Case
- Diagram 6: Console Output Expected (reference for testing)

---

Generated as part of the Salesforce LWC composed property learning project.
