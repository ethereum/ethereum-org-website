export interface AllMdxQuery {
  node: {
    fields: {
      isOutdated: boolean
      slug: string
      relativePath: string
    }
    frontmatter: {
      lang: string
      template: string
    }
  }
}
