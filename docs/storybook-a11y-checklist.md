# Storybook accessibility checklist

This document collects a lightweight checklist for contributors who add or update stories in our Storybook instance. The goal is to catch the most common accessibility issues early, while keeping the process practical for everyday work.

## 1. Keyboard navigation

When you preview a component in Storybook, verify that:

- All interactive elements (buttons, links, form fields) are reachable with the <kbd>Tab</kbd> key.
- The visual focus ring is clearly visible on every focusable element.
- The focus order follows the visual order on the screen.

If a component intentionally traps focus (e.g. a modal dialog), check that:

- Focus moves into the component when it opens.
- Focus does not escape to the page behind it.
- Focus returns to the triggering element when the component closes.

## 2. Color contrast

Before marking a story as "ready", check that:

- Text has sufficient contrast against its background.
- Disabled states are still distinguishable from active states.
- Focus outlines are visible on both light and dark backgrounds.

If you are unsure, run the Storybook accessibility panel (A11y addon) or a browser extension (Lighthouse, Axe, etc.) against the story.

## 3. Semantics and ARIA

For each new component or story, try to use native HTML semantics first:

- Prefer `<button>` over clickable `<div>` or `<span>`.
- Prefer `<label>` and `<input>` over custom form markup.
- Use headings (`<h1>`–`<h6>`) in a logical order.

Only add ARIA attributes when needed. When you do:

- Ensure `role` values match the actual behavior of the component.
- Keep ARIA labels in sync with visible copy in localizations.
- Avoid duplicating the same information visually and via ARIA text.

## 4. Announcements and live regions

For components that update content without a full page reload (e.g. toasts, inline validation, tab switches):

- Consider whether screen reader users need an announcement.
- Prefer `aria-live="polite"` for non-critical updates.
- Use `role="status"` or `role="alert"` sparingly for high-priority messages.

## 5. Storybook-specific tips

When writing stories:

- Provide meaningful `args` defaults so that the primary story shows a realistic state.
- Add controls for props that significantly change behavior or layout.
- Document known accessibility limitations in the story description when they cannot be fixed yet.

For complex components, consider adding a dedicated "Accessibility" story that demonstrates focus management, keyboard shortcuts and screen reader labels.

## 6. When in doubt

Accessibility is an incremental journey. If you are not sure whether a component meets the guidelines:

- Add a short note in the PR description (what you checked, what you are unsure about).
- Tag reviewers who are familiar with accessibility.
- Prefer shipping small improvements over waiting for a "perfect" solution.
