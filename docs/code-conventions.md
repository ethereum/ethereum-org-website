# Code conventions

Some conventions we are using related to the project structure, TypeScript, etc, to improve consistency and facilitate maintenance.

## Utils

Utility functions (utils) should be defined in standalone files inside `src/lib/utils` dir.

## Scripts

Scripts we use on build time and are not directly related to the source code (eg: Crowdin imports, GitHub tasks) should be defined in standalone files inside `src/scripts` dir.

## Constants

Global constants should be defined inside `src/lib/constants.ts` file.

## TypeScript

### Types

TypeScript types should be defined inside `src/lib/types.ts` file. Note that some pre-existent types could be defined in other files and will be temporarily kept there during the migration, to facilitate synchronization. These types should be moved to `src/lib/types.ts` later.

### Interfaces

TypeScript types should be defined inside `src/lib/interfaces.ts` file. Note that some pre-existent interfaces could be defined in other files and will be temporarily kept there during the migration, to facilitate synchronization. These interfaces should be moved to `src/lib/interfaces.ts` later.

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
 * Components using `forwardRef` from the Chakra UI package
 *
 * The first argument of the generic types is the props type signature.
 *
 * For the second argument of the generic types, you are declaring the primary element type that the component will render.
 * This could be a `div`, `span`, `button`, etc. or a custom component (typeof Button) if said component is being used in the return.
 */
const Component = forwardRef<ComponentProps, "div">(
  ({ title, label, ...props }, ref) => {
    // Component code
  }
)
```

#### Prop Type Naming Convention

For the props type signature use the naming convention `<ComponentName>Props` to provide an explicit name for the type. This is helpful for importing the signature to other files like page component and not force the user to alias the import every time, while providing readability.

#### Directly annotate the props object

**Do not use `React.FC`** and instead annotate the props object directly. `React.FC` implies the `children` prop, but this is not always desired when there is a component that should not accept this prop. `React.FC` also does not allow for use of Generic types, or use of Generic type when doing type guarding like function overloading. It is also not generally recommended to use and [was removed from the create-react-app template](https://github.com/facebook/create-react-app/pull/8177).

A positive side-effect to directly annotating the props object is for IDE intellisense where you can view the props when hovering over the component name to see it's signature.

i.e. `const Component: ({ label, title, ...props }: ComponentProps) => React.JSX.Element`

#### Use the type alias for props type

Use `type` and not `interface` to have the most constraint on the signature. We should also not be modifying the signature such as using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces).
