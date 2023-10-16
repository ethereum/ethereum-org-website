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
