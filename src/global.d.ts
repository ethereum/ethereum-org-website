// Ensure this is treated as a module.
// ref. https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-8.html#example-6
export {}

declare global {
  interface Window {
    // Used by matomo
    _paq: any
    dev: boolean
  }
}
