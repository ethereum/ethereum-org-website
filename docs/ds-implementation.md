# DS implementation guide

This is a reference for implementing the new Design System components and styles defined in a public [Figma file](https://www.figma.com/file/NrNxGjBL0Yl1PrNrOT8G2B/ethereum.org-Design-System).

This is part of our [Design System implementation epic](https://github.com/ethereum/ethereum-org-website/issues/9546). Currently, we are implementing **v1**, check the remaining tasks [here](https://github.com/ethereum/ethereum-org-website/issues/9548).

## Basics

* Use the **shadcn/ui** component approach for all base and shared UI elements.
  [shadcn/ui documentation](https://ui.shadcn.com/docs/components)
* Reference existing base components from `src/components/ui` whenever possible.
* Use **design tokens** (spacing, sizes, breakpoints, and semantic colors) defined in our DS Figma file and theme configuration.
* Read the [Best Practices doc](https://github.com/ethereum/ethereum-org-website/blob/dev/docs/best-practices.md) for more examples and implementation details.

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

## Components creation/modification from the DS

If you are implementing:

* **A base component** (a component that already exists in the [shadcn/ui components list](https://ui.shadcn.com/docs/components), for example, Button or Input)

  * Do not create a new component file under `/ComponentA/index.tsx` unless you need additional or custom logic.
  * Update or override styles and tokens in the base `ui` components located under `src/components/ui`.
  * Create a `.stories.tsx` file under `src/components/BaseStories` for documentation and visual testing.

* **A new custom component** (e.g., `PageHero`)

  * Use base components from `src/components/ui` whenever possible.
  * Avoid re-implementing styles or logic that are already covered by the base `ui` components or design tokens.

## Stories

As defined in the new directory structure, each created or adapted component must have a story attached to it.

* Follow the [Storybook integration guide](https://github.com/ethereum/ethereum-org-website/blob/dev/docs/applying-storybook.md)
* Follow the [proposed Storybook structure](https://www.figma.com/file/Ne3iAassyfAcJ0AlgqioAP/DS-to-storybook-structure)
