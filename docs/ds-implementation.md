# DS implementation guide

This document serves as a reference for implementing the new Design System (DS) components and styles defined in the public [Figma file](https://www.figma.com/file/NrNxGjBL0Yl1PrNrOT8G2B/ethereum.org-Design-System).

This work is part of the [Design System implementation epic](https://github.com/ethereum/ethereum-org-website/issues/9546).
Currently, we are implementing **v1** — you can track remaining tasks [here](https://github.com/ethereum/ethereum-org-website/issues/9548).

---

## Basics

* Use **shadcn/ui** components and patterns for all base UI elements.
  [shadcn/ui documentation](https://ui.shadcn.com/docs/components)
* Follow **Radix UI** principles for accessibility and composability.
* Reference base components located in `src/components/ui`.
* Use **Tailwind CSS utility classes** and DS tokens (spacing, colors, breakpoints) as defined in the Figma file.
* Read the [Best Practices doc](https://github.com/ethereum/ethereum-org-website/blob/dev/docs/best-practices.md) for examples and additional details.

---

**IMPORTANT**
Follow the new component directory structure:

```markdown
src/
└── components/
····└── ComponentA/
··········├── index.tsx
··········├── ComponentA.stories.tsx
··········└── // Any other files as applicable (utils, child components, useHook, etc.)
```

---

## Component implementation from the DS

If you are implementing:

### 🧩 Base components

*(components that already exist in the [shadcn/ui components list](https://ui.shadcn.com/docs/components), e.g., Button, Input, Alert)*

* Do **not** create a new component file under `/ComponentA/index.tsx` unless additional or custom logic is required.
* Extend or style base components in `src/components/ui`.
* Use Tailwind and `class-variance-authority` (`cva`) for managing variants and states.
* Create a `.stories.tsx` file under `src/components/BaseStories` for Storybook documentation.

### 🧱 Custom components

*(components not covered by shadcn/ui, e.g., PageHero)*

* Use base `ui` components whenever possible.
* Keep the structure consistent with the DS and Figma specifications.
* Avoid re-implementing primitives that already exist in `shadcn/ui` or Radix UI.

---

## Stories

Each created or adapted component must include a corresponding Storybook story.

* Follow the [Storybook integration guide](https://github.com/ethereum/ethereum-org-website/blob/dev/docs/applying-storybook.md)
* Follow the [proposed Storybook structure](https://www.figma.com/file/Ne3iAassyfAcJ0AlgqioAP/DS-to-storybook-structure)


