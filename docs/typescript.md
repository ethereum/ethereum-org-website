# Typescript

Our codebase is rapidly increasing in size and in contributors. This brings challenges to reliably keep the code organized, avoid code duplication, and review code. To help alleviate these challenges, we’re in the process of migrating to TypeScript across our codebase. We believe having a strongly typed language will reduce bugs, improve code quality, increase productivity and allow us to scale (both our codebase and our developer community) better in the long term.

## General considerations

As we are progressively migrating the entire codebase to TS, we will have a mix of `.js` and `.ts` files in the process. For this reason and to make the migration easier for beginners, we have disabled the [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) option from our `tsconfig.json` which means that you can use the `any` type and you will not get an error from that.
When we reach the moment where the entire codebase is in TS, we will enable `noImplicitAny` and increase the checker’s strictness.

This is just starting, any suggestion is always welcomed and appreciated.

## Declaring types for variables

When declaring types for variables, you should only declare a type when it isn't obvious and the type can't be inferred.

```
// Do not use
const someVar: string = 'string'

// Use
const someVar = 'string'
```

Do declare a type for an unassigned variable when a type can not be inferred.

```
const someVar: string
```

## Migration guide & contribution opportunity 🎉

We'd love your help in migrating our codebase!

1. Visit the [Typescript Migration Issue](https://github.com/ethereum/ethereum-org-website/issues/6392) and make a comment to get assigned to a file from the complete list of pending files to be migrated.
2. Run `yarn start` to generate the `src/gatsby-types.d.ts` file. More on this in the "GraphQL Typegen" section.
3. Convert the js file into a `.ts` or `.tsx` file in case the file includes some jsx in it.
4. Try to follow one already migrated file similar to the one you are migrating.

   - For `pages`,

     - Run again `yarn start` in order to update the `src/gatsby-types.d.ts` file with the page's query type.
     - Use the Gatsby type `PageProps`, passing the generated GraphQL query type + the context type args.

     ```tsx
     import { graphql, PageProps } from "gatsby"
     import type { Context } from "src/types"

     const HomePage = ({}: PageProps<Queries.HomePageQuery, Context>) => {
         ...
     }
     export const query = graphql`
         query HomePage {
             ...
         }
     `
     ```

     - Always name your queries.

     ```tsx
     // BAD
     query {
         ...
     }

     // GOOD
     query MyQuery {
         ...
     }
     ```

   - For `components`,

     - Use `React.FC` prop on function components.
     - As a convention, define the component's props types as an interface with the name `IProps`.
     - As a convention, export `IProps`.

     ```tsx
     import React from "react"

     export interface IProps {
       coolProp: string
     }

     const Component: React.FC<IProps> = ({ coolProp }) => {
       ...
     }
     ```

     - In case you need to extend your component with some other component's interface, import the latter with the following naming convention `I{NameOfTheComponent}Props`.

     ```tsx
     import Link, { IProps as ILinkProps } from "./Link"

     export interface IProps extends ILinkProps {
       newCoolProp: string
     }
     ```

5. Try to avoid as much as possible the usage of `any` :)
6. Run `yarn type-check` to check if everything looks good and nothing else broke.

## GraphQL Typegen

With the release of Gatsby v4.15.0, [the config option `graphqlTypegen` has been added](https://www.gatsbyjs.com/docs/reference/release-notes/v4.15/#graphql-typegen).

- This will generate automatically a `src/gatsby-types.d.ts` file which will contain all the GraphQL query types on the codebase.
- This will happen in build time. In other words, when you call `yarn start` or `yarn build`.
- Once you have that file created, a global `Queries` variable will be available which will contain all the query types.
- More information about how this works https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/

## Learning resources

- [Official Gatsby Typescript guide](https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/)
- [Official Typescript website](https://www.typescriptlang.org/)
- [GraphQL Typegen](https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/)
- [Typescript Challenges](https://github.com/type-challenges/type-challenges)
- [React TS Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Typescript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Typescript errors](https://typescript.tv/errors/)
