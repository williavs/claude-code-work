# ScrollArea Horizontal Scrolling Analysis

## Issue Summary
The horizontal ScrollBar is not enabling horizontal scrolling when a ScrollArea is nested inside another vertical ScrollArea. The JSON content in the event timeline overflows but cannot be scrolled horizontally.

## Root Cause Analysis

### 1. The `size-full` Class Issue
The ScrollArea viewport uses `size-full` class which applies:
```css
width: 100%;
height: 100%;
```

This constrains the viewport to the parent's width, preventing the content from expanding beyond the container width, which is necessary for horizontal scrolling.

### 2. Nested ScrollArea Constraints
When a ScrollArea is nested inside another ScrollArea:
- The parent ScrollArea's viewport constrains the child's width
- The child ScrollArea's viewport also has `size-full`, further constraining content
- The `pre` element with `whitespace: 'pre'` tries to expand but is limited by its container

### 3. How Radix ScrollArea Works
- The ScrollArea creates a viewport that clips overflow
- The content inside needs to be allowed to exceed the viewport dimensions
- The scrollbar then allows scrolling to view the overflowed content

## Solutions

### Solution 1: Remove width constraint for horizontal scrolling
Modify the ScrollArea component to not use `size-full` when horizontal scrolling is needed:

```tsx
<ScrollAreaPrimitive.Viewport
  className="h-full rounded-[inherit] ..." // Remove size-full, keep only h-full
>
```

### Solution 2: Use overflow-x-auto directly
For simple horizontal scrolling of code blocks:

```tsx
<div className="w-full overflow-x-auto bg-muted/30 rounded">
  <pre className="p-2 text-xs font-mono whitespace-pre">
    {JSON.stringify(event.payload, null, 2)}
  </pre>
</div>
```

### Solution 3: Custom ScrollArea for horizontal scrolling
Create a specialized component that handles horizontal scrolling properly:

```tsx
// For horizontal-only scrolling
<ScrollAreaPrimitive.Viewport className="h-full overflow-x-auto overflow-y-hidden">
  {children}
</ScrollAreaPrimitive.Viewport>
```

### Solution 4: Modify the event-timeline implementation
Update the event timeline to use a pattern that works better:

```tsx
{isExpanded && (
  <div className="mt-2 relative">
    <div className="w-full overflow-x-auto bg-muted/30 rounded max-h-64 overflow-y-auto">
      <pre className="p-2 text-[10px] sm:text-xs font-mono whitespace-pre">
        {JSON.stringify(event.payload, null, 2)}
      </pre>
    </div>
  </div>
)}
```

## Recommendation
For the event timeline use case, Solution 2 (using native overflow-x-auto) is the simplest and most reliable approach. The ScrollArea component is better suited for vertical scrolling or when you need custom scrollbar styling.

If custom scrollbar styling is required, then Solution 3 with a modified ScrollArea component specifically for horizontal scrolling would be the best approach.