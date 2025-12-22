# ethereum.org tests – local run guide

This document gives a short overview of how to run the main test suites for the ethereum.org website locally.

## 1. Prerequisites

- Node.js version specified in `.nvmrc`
- Dependencies installed with:

~~~bash
pnpm install
~~~

We recommend using `nvm use` before installing dependencies.

## 2. Linting and type checks

Run the fast feedback checks before pushing a pull request:

~~~bash
pnpm lint
pnpm type-check
~~~

These commands catch common issues such as TypeScript errors or style violations.

## 3. Unit and integration tests

If your changes affect components or utilities that have tests, run:

~~~bash
pnpm test
~~~

Use the `--watch` flag to re-run tests on file changes during development.

## 4. End-to-end tests (Playwright)

For changes that may affect user flows, you can run the Playwright suite:

~~~bash
pnpm test:e2e
~~~

Refer to `playwright.config.ts` for configuration details and available projects.

## 5. Before opening a PR

Before opening or updating a pull request, it is a good idea to:

1. Run `pnpm lint`, `pnpm type-check` and relevant `pnpm test*` commands.
2. Mention in your PR description which test commands you ran locally.

This helps reviewers understand the level of validation that has already been done on your changes.
