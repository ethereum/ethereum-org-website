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

There may be some exceptions, but generally each component should have only on story file.

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

const meta {
  title: "ComponentA",
  component: ComponentA
} satisfies Meta<typeof ComponentA>

export default meta
// Please use `typeof meta` for maximum type safety
type Story = StoryObj<typeof meta>;

export const Basic: Story = {}
```

- With the `title` option, we write this based on the groupings set by the Design System. Groupings are declared with forward slashes. (i.e. `Atoms / Form / Input`). See the Storybook docs for details on [Naming conventions](https://storybook.js.org/docs/7.0/react/writing-stories/naming-components-and-hierarchy)
- The `satisfies` TypeScript keyword is used with the `Meta` type for stricter type checking. This is particularly helpful to make sure required args are not missed. [Storybook Docs regarding `satisfies`](https://storybook.js.org/docs/writing-stories/typescript#using-satisfies-for-better-type-safety)
- The use of `StoryObj` is to be able to typecheck the creation of a story as an object. This helps with prop inference.
- We use `StoryObj<typeof meta>` in the event a required arg is provided in the `meta` object, to be applied to all stories in the file. This prevents type errors throwing at the story level for a required missing arg.
- If the story does not need any args or any custom rendering, it should be left as an empty object. Otherwise, use the `render` option to explicitly write the rendering of the story: i.e. `render: () => <Component />`

Also, please view the Figma file for the [proposed structure for the Design System](https://www.figma.com/file/Ne3iAassyfAcJ0AlgqioAP/DS-to-storybook-structure?type=design&node-id=42%3A50&mode=design&t=RGkyouvTilzF42y0-1) to provide the correct groupings.

We will maintain this structure for every story file, regardless of simplicity.

Should the component accept props on all or some renders, you can provide an `args` prop for each story and supply the necessary data. This can be done in place of the render if only a single instance of the given component is needed with no other components. If the `children` prop is used, it can still be used in the `args` prop.

Let's say for a `Button` component with different style variants...

```tsx
import Button from "."

type ButtonType = typeof Button

const meta {
  title: "Atoms / Form / Button",
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
 * use `StoryObj` without a prop type. This is especially important when a story renders multiple versions
 * of the component.
 */

// Assuming `solid` is the default variant in the Chakra theme config
export const Variants: StoryObj = {
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

If only one story is provided for a component, the name of the exported object should match the name in the `title` meta option. For example, if the title is `Atoms / Form / Button` then the story should be named `Button`. This will hoist the display name up to the parent level in the Storybook dashboard's sidebar. This will also mean you have to rename the import of the component. Call it `ButtonComponent`, say.

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

## Chromatic

Chromatic is a visual testing tool that scans every possible UI state across browsers to catch bugs in appearance and functionality. It enables you to assign reviewers and resolve discussions to streamline team sign-off. It is created by the same team that made Storybook. [Read more in the Chromatic docs](https://www.chromatic.com/docs/)

When creating a story, Chromatic creates a "snapshot" of it and sets it as a baseline. This baseline is also approved or denied before merging into the project. Whenever there are changes that affect the component, Chromatic will create a new snapshot to analyze. If there are changes, Chromatic will provide them for a reviewer to accept or decline, and be able to provide any further comments.

### Story Modes

Depending on the component, we might look for more than just one snapshot per story. In some cases, we might want multiple snapshots showing the story rendered at various viewport widths or in different languages, a combination of both, etc. These are referred to as [Story Modes](https://www.chromatic.com/docs/modes/). Examples of applicable components include the `Footer` and the `HubHero`.

You will currently find the setup of these modes in [the `./storybook/modes.ts` file](../.storybook/modes.ts)

> Note: At this time we are only considering modes for viewport and languages. Color mode is not possible with the existing setup and is being investigated on making it available, should we want to use it.

When using a mode at either the component level (all stories in a given file) or at the story level, they are supplied under the `chromatic` parameter.

```tsx
import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../../.storybook/modes"

import ContentHeroComponent, { ContentHeroProps } from "."

const meta = {
  title: "Organisms / Layouts / Hero",
  component: ContentHeroComponent,
  parameters: {
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
  // other options as needed
} satisfies Meta<typeof ContentHeroComponent>
```

In this example, we are supplying all the combinations of the languages and viewports together in snapshots. These will only be viewed in chromatic and cannot be seen when viewing storybook locally.

If needs to be only a couple of options, you can write them like this:

```ts
import { viewportModes, langViewportModes } from "../../../../.storybook/modes"

// In the `meta` object
parameters: {
  chromatic: {
    modes: {
      base: viewportModes['base']
      'ru-xl': langViewportModes['ru-xl']
    }
  }
}
```

### Disabling Snapshots

There may be instances where we would like to save a story for visual testing in local development, but do not want to capture snapshots for regressions. In these cases, enable the `disableSnapshot` option.

This can be applied at any level (project, component, story)

```ts
// At any level
parameters: {
  chromatic: {
    disableSnapshot: true
  }
}
```

> 🚨 NOTE: This will be notated ahead of time by the team which stories should not receive snapshots.
