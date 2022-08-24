const styles = {
  global: (_props) => ({
    /**
     * Current scenario: we have 2 places where global styles are defined.
     * - Our legacy global styles under `src/components/GlobalStyle.ts`
     * - Chakra also defines its own global styles. Check them here:
     *  https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts
     *
     * Having those 2 global styles creates some style conflicts. Here we
     * override some of the default Chakra globals in order to keep the same
     * styles as we had in the legacy one.
     *
     * TODO: remove these overrides as we adopt the new Design System and we
     * don't need the global styles anymore
     */
    body: {
      lineHeight: "1.6rem",
    },
    // should be replace with https://chakra-ui.com/docs/components/text
    p: {
      margin: "0px 0px 1.45rem",
    },
    // should be replace with https://chakra-ui.com/docs/components/list
    "ul, ol": {
      margin: "0px 0px 1.45rem 1.45rem",
      padding: 0,
    },
  }),
}

export default styles
