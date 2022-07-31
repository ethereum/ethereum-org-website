const styles = {
  global: (_props) => ({
    // TODO: remove these overrides as we adopt the new Design System
    // override default global Chakra styles to keep compatibility with old theme
    // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts
    body: {
      lineHeight: "1.6rem",
    },
  }),
}

export default styles
