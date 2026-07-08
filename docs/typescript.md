# TypeScript

Our codebase is fully written in TypeScript, with strict mode enabled. Having a strongly typed language reduces bugs, improves code quality, increases productivity and allows us to scale (both our codebase and our developer community) better in the long term. All new code should be written in TypeScript.

## Declaring types for variables

When declaring types for variables, you should only declare a type when it isn't obvious and the type can't be inferred.

```
// Do not use
const someVar: string = 'string'

// Use
const someVar = 'string'
```

Do declare a type for an unassigned variable when a type cannot be inferred.

```
const someVar: string
```

## Learning resources

- [Official TypeScript website](https://www.typescriptlang.org/)
- [TypeScript Challenges](https://github.com/type-challenges/type-challenges)
- [React TS Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [TypeScript errors](https://typescript.tv/errors/)
