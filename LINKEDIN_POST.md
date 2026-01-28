# LinkedIn Post: Understanding the `composed` Property in Salesforce LWC

---

## Post Content

🚀 **Understanding the `composed` Property in Salesforce LWC Custom Events**

Just spent some time diving deep into one of the most underrated concepts in Lightning Web Components: the `composed` property in custom events. 

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
2. **Add a cover image** showing the component hierarchy (grandparent → wrapper → child)
3. **Consider adding:** Screenshots of the working demo or console logs
4. **Engage:** Respond to comments and share your own experiences
5. **Link:** Reference the GitHub repository or your blog post for more details

---

Generated as part of the Salesforce LWC composed property learning project.
