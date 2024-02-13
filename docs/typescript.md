# Typescript

Our codebase is rapidly increasing in size and in contributors. This brings challenges to reliably keep the code organized, avoid code duplication, and review code. To help alleviate these challenges, we’re in the process of migrating to TypeScript across our codebase. We believe having a strongly typed language will reduce bugs, improve code quality, increase productivity and allow us to scale (both our codebase and our developer community) better in the long term.

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

## Learning resources

- [Official Typescript website](https://www.typescriptlang.org/)
- [Typescript Challenges](https://github.com/type-challenges/type-challenges)
- [React TS Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Typescript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Typescript errors](https://typescript.tv/errors/)
