export interface Messages {
  [key: string]: string
}

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
