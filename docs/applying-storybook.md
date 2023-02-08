# Applying Storybook to Components and Pages

## Overview

StorybookJS is a UI tool for isolating UI components to visually test their styles and states.

This is great for checking the various iterations of a component in a sandbox versus scouring all the pages in a large scale project it is used to verify that the component is rendering properly.

You can also render pages if you need that level of visual testing.

Storybook also gives you a library of addons provided by the team and the community to enhance the testing, including UX testing, A11y compliance, etc.

Check out [Intro to Storybook](https://storybook.js.org/tutorials/intro-to-storybook/) to get an in-depth look on the workflow.

## Spinning up the Storybook server

It's as easy as running `yarn storybook` to boot up a dedicated localhost to see all the components that have stories.

## Setting up a component's stories

A Storybook "story" is an instance of a component in a certain state or with certain parameters applied to show an alternative version of the component.

Each component will only need one file containing all the stories, and should follow the naming convention of the component.

So for the component `ExpandableCard.tsx`, the stories file will be named `ExpandableCard.stories.tsx`.

The stories file will reside with each component. So the base folder structure in `src` will look like this:

```
src/
└── components/
    └── ComponentA/
        ├── index.tsx
        ├── ComponentA.stories.tsx
        └── // Any other files as applicable (utils, child components, useHook, etc.)
```

The initial structure of each story file will look something like this (in typescript):

```tsx
import ComponentA from "."

export default {
  title: "ComponentA", // Generates the nav structure in the Storybook server
} as ComponentMeta<typeof ComponentA>

export const Basic = () => <ComponentA />
```

Should the component accept props on all or some renders, a template can be created.

Let's say for a `Button` component with different style variants...

```tsx
import Button from "."

export default {
  title: "Button",
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <ComponentA {...args} />
)

export const Solid = Template.bind({})
Solid.args = {
  variant: "solid",
  children: "A Button", // Assuming the `children` prop takes text content only
}

export const Outline = Template.bind({})
Outline.args = {
  variant: "outline",
  children: "A Button", // Assuming the `children` prop takes text content only
}

/**
 * For practical purposes, if you are displaying different "variants",
 * they should be shown under one story, so they can be seen side-by-side in the GUI
 * for reviewers to easily compare.
 * This can be done for various sizes or other like alterations
 */

// Assuming `solid` is the default variant in the Chakra theme config
export const Variants = () => (
  <VStack>
    <Button>A Solid Button</Button>
    <Button variant="outline">An Outline Button</Button>
    <Button variant="unstyled">An Unstyled Button</Button>
  </VStack>
)
```

As you go and make adjustments to the component itself or it's variant styles, Storybook will hot reload and those changes will appear in the stories that emphasize them.
