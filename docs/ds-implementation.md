# DS implementation guide

This is a reference for implementing the new Design System components and styles defined in a public [Figma file](https://www.figma.com/file/NrNxGjBL0Yl1PrNrOT8G2B/ethereum.org-Design-System).

This is part of our [Design System implementation epic](https://github.com/ethereum/ethereum-org-website/issues/9546). Currently we are implementing the v1, check the remaining tasks [here](https://github.com/ethereum/ethereum-org-website/issues/9548).

## Basics

- Use Chakra tokens for spacing, sizes, and breakpoints. [Chakra theme docs](https://chakra-ui.com/docs/styled-system/theme)
- For colors use the semantic tokens defined in [this file](https://github.com/ethereum/ethereum-org-website/blob/dev/src/%40chakra-ui/semanticTokens.ts). These tokens will match the color variables used in the DS Figma file
- Use as many Chakra components and utils as possible
- Read the [Best Practices doc](https://github.com/ethereum/ethereum-org-website/blob/dev/docs/best-practices.md) for more examples and info

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

- A base component (a component that already exists in the [Chakra components list](https://chakra-ui.com/docs/components/), for example, the button or inputs)
  - Try to avoid creating a new component file `/ComponentA/index.tsx` if there is no additional or custom logic we need to add to them
  - Create a theme file to override the default Chakra styles with the DS specs. See examples under the [Chakra theme folder](https://github.com/ethereum/ethereum-org-website/tree/dev/src/%40chakra-ui/components)
  - Create a `.stories.tsx` file under `src/components/BaseStories`
- A new custom component (e.g. the PageHero)
  - Use as many Chakra components as possible
  - Avoid implementing previous implementation details or styles if Chakra offers a solution for that

## Stories

As defined in the new directory structure, each created or adapted component must have a story attached to it.

- Follow the [Applying Storybook documentation](https://github.com/ethereum/ethereum-org-website/blob/dev/docs/applying-storybook.md)
- Follow the [proposed Storybook structure](https://www.figma.com/file/Ne3iAassyfAcJ0AlgqioAP/DS-to-storybook-structure)
