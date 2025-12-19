# Storybook configuration for ethereum.org

This directory contains the Storybook configuration used to develop and document the UI components that power ethereum.org.

The configuration is based on the modern Storybook setup with TypeScript support and Chromatic visual testing.

## Key files

- `main.ts` – Storybook entrypoint that wires up addons, stories and framework options.
- `preview.tsx` – global decorators, parameters and layout tweaks shared by all stories.
- `modes.ts` – helpers for multi-language and multi-viewport Chromatic modes.
- `decorators/withThemeContainer.tsx` – layout decorator that aligns Storybook with the ethereum.org page width.
- `decorators/withChromaticModes.ts` – optional decorator for selecting Chromatic modes via Storybook globals.

## Local development

Run Storybook locally from the project root:

```bash
pnpm storybook
