// These are styles only used by the mdx components. See
// `src/components/mdx/index.tsx` to see its implementation

const mdx = {
  ul: {
    ms: 6,
    mb: 6,
  },
  ol: {
    ms: 6,
    mb: 6,
  },
  li: {
    mb: 3,
    "& > ul, & > ol": {
      mt: 3,
      mb: 3,
    },
  },
}

export default mdx
