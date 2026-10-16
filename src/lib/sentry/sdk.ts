// The only SDK functions the browser uses. Importing them through this module
// lets the bundler tree-shake the lazily loaded chunk; a dynamic import of
// "@sentry/nextjs" itself keeps the whole namespace.
export {
  captureException,
  captureRouterTransitionStart,
  init,
} from "@sentry/nextjs"
