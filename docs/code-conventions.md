# Code conventions

Some conventions we are using related to the project structure, TypeScript, etc, to improve consistency and facilitate maintenance.

## Utils

Utility functions (utils) should be defined in standalone files inside `src/lib/utils` dir.

## Scripts

Scripts we use at build time and are not directly related to the source code (eg: Crowdin imports, GitHub tasks) should be defined in standalone files inside `src/scripts` dir.

## Constants

Global constants should be defined inside `src/lib/constants.ts` file.

## TypeScript

### Types

TypeScript types should be defined inside `src/lib/types.ts` file. Some types still live in other files for historical reasons; move them to `src/lib/types.ts` when you're already touching them.

### Interfaces

TypeScript interfaces should be defined inside `src/lib/interfaces.ts` file. Some interfaces still live in other files for historical reasons; move them to `src/lib/interfaces.ts` when you're already touching them.

### Component Props

For all components, use the following pattern:

```tsx
type ComponentProps = {
  // Prop types
}

// Destructure props at the declaration and use the name `props` when using the spread operator for the remaining props not specifically needed
const Component = ({ title, label, ...props }: ComponentProps) => {
  // Component code
}

/**
 * Components accepting a `ref`
 *
 * With React 19, `ref` is a regular prop — new components should accept it
 * directly instead of using `React.forwardRef` (now legacy).
 * The ref type should match the element being rendered (HTMLDivElement, HTMLButtonElement, etc.)
 */
const Component = ({ title, label, ref, ...props }: ComponentProps) => {
  return (
    <div ref={ref} {...props}>
      {/* Component code */}
    </div>
  )
}

// Many existing components still use `React.forwardRef`; they work fine and
// don't need bulk migration — update them opportunistically when already
// touching the component.
```

#### Prop Type Naming Convention

For the props type signature use the naming convention `<ComponentName>Props` to provide an explicit name for the type. This is helpful for importing the signature to other files like page component and not force the user to alias the import every time, while providing readability.

#### Directly annotate the props object

**Do not use `React.FC`** and instead annotate the props object directly. `React.FC` implies the `children` prop, but this is not always desired when there is a component that should not accept this prop. `React.FC` also does not allow for use of Generic types, or use of Generic type when doing type guarding like function overloading. It is also not generally recommended to use and [was removed from the create-react-app template](https://github.com/facebook/create-react-app/pull/8177).

A positive side-effect to directly annotating the props object is for IDE intellisense where you can view the props when hovering over the component name to see its signature.

i.e., `const Component: ({ label, title, ...props }: ComponentProps) => React.JSX.Element`

#### Choosing between `type` and `interface`

Use `interface` for object shapes, and `type` for unions and intersections. We should also not be modifying signatures such as using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces).
