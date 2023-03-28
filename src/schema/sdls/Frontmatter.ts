export const Frontmatter = `
  type Mdx implements Node {
    frontmatter: Frontmatter
  }
  type Frontmatter {
    hideEditButton: Boolean
    sidebarDepth: Int
    incomplete: Boolean
    template: String
    summaryPoint1: String
    summaryPoint2: String
    summaryPoint3: String
    summaryPoint4: String
    position: String
    compensation: String
    location: String
    type: String
    link: String
    address: String
    skill: String
    published: String
    sourceUrl: String
    source: String
    author: String
    tags: [String]
    isOutdated: Boolean
    postMergeBannerTranslation: String
  }
`
