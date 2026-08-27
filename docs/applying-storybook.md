# Applying Storybook to Components and Pages

## Overview

StorybookJS is a UI tool for isolating UI components to visually test their styles and states.

This is great for checking the various iterations of a component in a sandbox versus scouring all the pages in a large scale project it is used to verify that the component is rendering properly.

You can also render pages if you need that level of visual testing.

Storybook also gives you a library of addons provided by the team and the community to enhance the testing, including UX testing, A11y compliance, etc.

Check out [Intro to Storybook](https://storybook.js.org/tutorials/intro-to-storybook/) to get an in-depth look at the workflow.

## Spinning up the Storybook server

It's as easy as running `pnpm storybook` to boot up a dedicated localhost to see all the components that have stories.

## Setting up a component's stories

> 🚨 NOTE: This project uses Storybook v10.3+, using the Component Story Format v3 and the `satisfies` keyword to define the type of the meta object. The following documentation outlines preferences in setup as it relates to this version. You can refer to the [main docs](https://storybook.js.org/docs/get-started) if you need any additional details

A Storybook "story" is an instance of a component in a certain state or with certain parameters applied to show an alternative version of the component.

There may be some exceptions, but generally each component should have only one story file.

The stories file will reside with each component. So the base folder structure in `src` will look like this:

```
src/
└── components/
    └── ComponentA/
        ├── index.tsx
        ├── component-a.stories.tsx
        └── // Any other files as applicable (utils, child components, useHook, etc.)
```

The initial structure of each story file will look something like this (in TypeScript):

```tsx
import ComponentA from "."

const meta = {
  title: "ComponentA",
  component: ComponentA,
} satisfies Meta<typeof ComponentA>

export default meta
// Please use `typeof meta` for maximum type safety
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
```

- The `title` option places the story in the sidebar, and its **top-level section is derived from the file's path** -- see [Story titles](#story-titles) below. Groupings are declared with forward slashes (i.e., `UI / Forms / Input`). See the Storybook docs for details on [Naming conventions](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy)
- The `satisfies` TypeScript keyword is used with the `Meta` type for stricter type checking. This is particularly helpful to make sure required args are not missed. [Storybook Docs regarding `satisfies`](https://storybook.js.org/docs/writing-stories/typescript#using-satisfies-for-better-type-safety)
- The use of `StoryObj` is to be able to typecheck the creation of a story as an object. This helps with prop inference.
- We use `StoryObj<typeof meta>` in the event a required arg is provided in the `meta` object, to be applied to all stories in the file. This prevents type errors from being thrown at the story level for a required missing arg.
- If the story does not need any args or any custom rendering, it should be left as an empty object. Otherwise, use the `render` option to explicitly write the rendering of the story: i.e., `render: () => <Component />`

We maintain this structure for every story file, regardless of simplicity.

Story filenames are **kebab-case** (`component-a.stories.tsx`), matching the repo's file convention, even where the component directory is still PascalCase. This is enforced by `tests/unit/storybook/story-titles.spec.ts`.

## Story titles

Titles read `Section / Group / Name`. The **section comes from where the file lives**, so it is never a judgment call:

| Path                                  | Section         |
| ------------------------------------- | --------------- |
| `src/styles/**`                       | `Design System` |
| `src/components/ui/**`                | `UI`            |
| `src/components/**` (everything else) | `Components`    |
| `src/layouts/**`                      | `Layouts`       |
| `app/**`                              | `Pages`         |

The second level is a light functional group for browsability -- Actions, Forms, Layout, Navigation, Overlays, Data Display under `UI /`; Cards, Heroes, Navigation, Site Chrome, Content, Data Viz, Features under `Components /`. Use one only when it already fits. **Do not invent a group for a single component**: a flat `Components / Morpher` is correct, and inventing categories is exactly how the six competing schemes this replaced accumulated.

`tests/unit/storybook/story-titles.spec.ts` enforces the section prefix, requires an explicit title on every story, and rejects duplicate titles -- Storybook merges two files sharing a title into a single sidebar entry with no warning.

> This taxonomy replaced the old `Atoms / Molecules / Organisms` structure (and the Figma "DS to storybook structure" file behind it) in August 2026. See issue #18967 for the rationale.

### Deprecated components get no story

A rendered example reads as an endorsement whatever the caption says. If a component or variant is on the way out, leave it out of Storybook and note the deprecation in prose -- `Swiper` and `HR`'s `narrow` variant are both in the codebase and both intentionally unshown. A component whose future is undecided rather than settled keeps its story plus a blurb saying it isn't for new work (`Carousel`).

### Writing MDX docs pages

`.storybook/Overview.mdx` is the entry-point page. Two gotchas if you add or edit one:

- **No `remark-gfm`.** A markdown pipe table renders as literal pipes -- write tables as JSX.
- **Prettier mangles MDX comments.** It rewrites `{/* … */}` to `{/_ … _/}`, which is invalid and breaks the build. Leave comments out of `.mdx`.

### Verifying a story actually renders

`pnpm build-storybook` compiles stories **without executing them**, and every `ui/` story sets `chromatic: { disableSnapshot: true }`. Neither CI signal catches a story that throws at render, so open new stories in `pnpm storybook` before pushing.

Three things commonly break a story that compiles fine:

- **Async server components** call `getTranslations`/`getLocale`, which throw in the browser. `.storybook/next-intl-server.tsx` shims `next-intl/server` against the same messages the client provider uses.
- **`usePathname` consumers** get `null` without `parameters.nextjs.navigation.pathname`.
- **New i18n namespaces** render as raw key tails until added to the `ns` array in `.storybook/next-intl.ts`.

Should the component accept props on all or some renders, you can provide an `args` prop for each story and supply the necessary data. This can be done in place of the render if only a single instance of the given component is needed with no other components. If the `children` prop is used, it can still be used in the `args` prop.

Let's say for a `Button` component with different style variants...

```tsx
import { VStack } from "@/components/ui/flex"

import Button from "."

type ButtonType = typeof Button

const meta = {
  title: "UI / Actions / Button",
  component: Button,
} satisfies Meta<ButtonType>

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {
  args: {
    variant: "solid",
    children: "A Button",
  },
}
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "A Button",
  },
}

/**
 * For practical purposes, if you are displaying different "variants",
 * they should be shown under one story, so they can be seen side-by-side in the GUI
 * for reviewers to easily compare.
 * This can also be done for various sizes or other similar alterations
 *
 * 🚨 If prop content is supplied directly to the component and the `args` prop is not used,
 * use `StoryObj` without a prop type. This is especially important when a story renders multiple versions
 * of the component.
 */

// `solid` is the default variant in the Button's cva config
// (see `src/components/ui/buttons/Button.tsx`)
export const Variants: StoryObj = {
  render: () => (
    <VStack>
      <Button>A Solid Button</Button>
      <Button variant="outline">An Outline Button</Button>
      <Button variant="ghost">A Ghost Button</Button>
    </VStack>
  ),
}
```

### Story file containing a single story

If only one story is provided for a component, the name of the exported object should match the name in the `title` meta option. For example, if the title is `UI / Actions / Button` then the story should be named `Button`. This will hoist the display name up to the parent level in the Storybook dashboard's sidebar. This will also mean you have to rename the import of the component. Call it `ButtonComponent`, say.

```tsx
import ButtonComponent from "."

const meta = {
  title: "UI / Actions / Button",
  component: ButtonComponent,
} satisfies Meta<typeof ButtonComponent>

export default meta

export const Button: StoryObj<typeof meta> = {
  render: () => <ButtonComponent />,
}
```

As you go and make adjustments to the component itself or its variant styles, Storybook will hot reload and those changes will appear in the stories that emphasize them.

## Storybook Dashboard

The dashboard where you view each story has a number of different addons available to check the story thoroughly.

![Screenshot of Storybook Dashboard for Ethereum.org](https://github.com/ethereum/ethereum-org-website/assets/65234762/7dea7692-6a6d-4f1c-b7cb-db177bcab44d)

Outlined below are each of the areas going from left to right in the selections.

| Toolbar above the preview                | Panel below the preview                                                                                                                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Rerender preview                      | 1. Controls - allows you to interact with a component’s args (inputs) dynamically. Experiment with alternate configurations of the component to discover edge cases. See [Controls addon docs](https://storybook.js.org/docs/essentials/controls)                          |
| 2. Zoom In                               | 2. Actions (if applicable) - help you verify interactions produce the correct outputs via callbacks. See [Actions addon docs](https://storybook.js.org/docs/essentials/actions)                                                                                            |
| 3. Zoom Out                              | 3. Interactions (if applicable) - In conjunction with the `play` function in a story object, this section allows you to simulate user interactions after the story renders. See [Interactions addon docs](https://storybook.js.org/docs/writing-tests/interaction-testing) |
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

### Publishing builds

CI runs on every non-draft PR, so you don't normally need to run Chromatic yourself. A PR that affects no story is bypassed and publishes no build at all -- that is expected, not a broken pipeline. Snapshots are billed against a monthly quota shared by the whole team, and a local run of `pnpm chromatic` costs up to a full rebuild, so prefer letting CI do it.

If you do need a local run, the repo has two Chromatic projects and each script takes its own token:

| Script                 | Token                       | Project                |
| ---------------------- | --------------------------- | ---------------------- |
| `pnpm chromatic`       | `CHROMATIC_STORYBOOK_TOKEN` | Storybook components   |
| `pnpm chromatic:pages` | `CHROMATIC_PAGES_TOKEN`     | Full-page visual tests |

Both must be exported in your shell — `.env.local` won't work, since the scripts expand them before Chromatic starts. Each script fails immediately if its token is missing, which is deliberate: a single shared token would let a page-test token publish a Storybook build into the wrong project.

### Story Modes

Depending on the component, we might look for more than just one snapshot per story. In some cases, we might want multiple snapshots showing the story rendered at various viewport widths or in different languages, a combination of both, etc. These are referred to as [Story Modes](https://www.chromatic.com/docs/modes/). Examples of applicable components include the `Footer` and the `HubHero`.

You will currently find the setup of these modes in [the `.storybook/modes.ts` file](../.storybook/modes.ts)

> Note: At this time we are only considering modes for viewport and languages. Color mode is not possible with the existing setup and is being investigated to make it available, should we want to use it.

When using a mode at either the component level (all stories in a given file) or at the story level, they are supplied under the `chromatic` parameter.

```tsx
import { Meta, StoryObj } from "@storybook/nextjs"

import { langViewportModes } from "../../../../.storybook/modes"

import ContentHeroComponent, { ContentHeroProps } from "."

const meta = {
  title: "Components / Heroes / PageHero",
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

In this example, we are supplying all the combinations of the languages and viewports together in snapshots. These will only be viewed in Chromatic and cannot be seen when viewing Storybook locally.

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

> 🚨 NOTE: This will be noted ahead of time by the team which stories should not receive snapshots.
