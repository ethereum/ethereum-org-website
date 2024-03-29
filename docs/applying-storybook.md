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

> 🚨 NOTE: This project uses Storybook v7, using the Component Story Format v3 and the `satisfies` keyword to define the type of the meta object. The following documentation outlines preferences in setup as it relates to this version. You can refer to the [main docs](https://storybook.js.org/docs/get-started) if you need any additional details

A Storybook "story" is an instance of a component in a certain state or with certain parameters applied to show an alternative version of the component.

Each component will only need one file containing all the stories.

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

type ComponentAType = typeof ComponentA

const meta {
  title: "ComponentA",
  component: ComponentA
} satisfies Meta<ComponentAType>

export default meta
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <ComponentA />
}
```

**Note**: with the `title` option, we write this based on the groupings set by the Design System. Groupings are declared with forward slashes. (i.e. `Atoms / Form / Input`). See the Storybook docs for details on [Naming conventions](https://storybook.js.org/docs/7.0/react/writing-stories/naming-components-and-hierarchy)

Also, please view the Figma file for the [proposed structure for the Design System](https://www.figma.com/file/Ne3iAassyfAcJ0AlgqioAP/DS-to-storybook-structure?type=design&node-id=42%3A50&mode=design&t=RGkyouvTilzF42y0-1) to provide the correct groupings.

We will maintain this structure for every story file, regardless of simplicity.

Should the component accept props on all or some renders, you can provide an `args` prop for each story and supply the necessary data. This can be done in place of the render if only a single instance of the given component is needed with no other components. If the `children` prop is used, it can still be used in the `args` prop.

Let's say for a `Button` component with different style variants...

```tsx
import Button from "."

type ButtonType = typeof Button

const meta {
  title: "Button",
  component: Button
} satisfies Meta<ButtonType>

export default meta
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'A Button'
  }
}
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'A Button'
  }
}

/**
 * For practical purposes, if you are displaying different "variants",
 * they should be shown under one story, so they can be seen side-by-side in the GUI
 * for reviewers to easily compare.
 * This can also be done for various sizes or other like alterations
 *
 * 🚨 If prop content is supplied directly to the component and the `args` prop is not used,
 * do not use the `StoryObj` type. This is especially important when a story rendering multiple versions
 * of the component.
 */

// Assuming `solid` is the default variant in the Chakra theme config
export const Variants = {
  render: () => (
    <VStack>
      <Button>A Solid Button</Button>
      <Button variant="outline">An Outline Button</Button>
      <Button variant="unstyled">An Unstyled Button</Button>
    </VStack>
  )
}
```

### Story file containing a single story

If only one story is provided for a component, the name of the exported object should match the name in the `title` meta option. (If the title is `Atoms / Form / Button` then the object should be named `Button`) This will hoist the display name up to the parent level in the Storybook dashboard's sidebar. This will also mean you have to rename the import of the component. Call it `ButtonComponent`, say.

```tsx
import ButtonComponent from "."

const meta = {
  title: "Atoms / Form / Button",
  component: ButtonComponent,
} satisfies Meta<typeof ButtonComponent>

export default meta

export const Button: StoryObj<typeof meta> = {
  render: () => <ButtonComponent />,
}
```

As you go and make adjustments to the component itself or it's variant styles, Storybook will hot reload and those changes will appear in the stories that emphasize them.

## Storybook Dashboard

The dashboard where you view each story has a number of different addons available to check the story thoroughly.

![Screenshot of Storybook Dashboard for Ethereum.org](https://github.com/ethereum/ethereum-org-website/assets/65234762/7dea7692-6a6d-4f1c-b7cb-db177bcab44d)

Outlined below are each area going from left to right in the selections.

| Toolbar above the preview                | Panel below the preview                                                                                                                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Rerender preview                      | 1. Controls - allows you to interact with a component’s args (inputs) dynamically. Experiment with alternate configurations of the component to discover edge cases. See [Controls addon docs](https://storybook.js.org/docs/7.0/react/essentials/controls)                |
| 2. Zoom In                               | 2. Actions (if applicable) - help you verify interactions produce the correct outputs via callbacks. See [Actions addon docs](https://storybook.js.org/docs/7.0/react/essentials/actions)                                                                                  |
| 3. Zoom Out                              | 3. Interactions (if applicable) - In conjunction with the `play` function in a story object, this section allows you to simulate user interactions after the story renders. See [Interactions addon docs](https://storybook.js.org/docs/7.0/react/essentials/interactions) |
| 4. Reset Zoom                            | 4. Accessibility provides visual A11y results for each story.<br><br>**NOTE**: To check accessibility for light and dark mode, you will need to toggle the mode, then rerender the preview to update the results.                                                          |
| 5. Change background                     |
| 6. Apply grid to preview                 |
| 7. Change viewport size                  |
| 8. Enable measuring of elements on hover |
| 9. Apply element outlines to preview     |
| 10. A11y Visualization Simulator         |
| 11. Set layout direction (left or right) |
| 12. Toggle color mode                    |
