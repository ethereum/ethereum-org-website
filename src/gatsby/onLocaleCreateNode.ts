// Idea extracted from `gatsby-plugin-react-i18next`
// Ref. https://github.com/microapps/gatsby-plugin-react-i18next/blob/master/src/plugin/onCreateNode.ts

const onLocaleCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}: // @ts-ignore
CreateNodeArgs<FileSystemNode>) => {
  if (node.internal.mediaType !== `application/json`) {
    return
  }

  const {
    absolutePath,
    internal: { type },
    relativeDirectory,
    name,
    id,
  } = node

  // Currently only support file resources
  if (type !== "File") {
    return
  }

  // relativeDirectory name is language name.
  const language = relativeDirectory
  const content = await loadNodeContent(node)

  // verify & canonicalize indent. (do not care about key order)
  let data: string
  try {
    data = JSON.stringify(JSON.parse(content), undefined, "")
  } catch {
    const hint = node.absolutePath
      ? `file ${node.absolutePath}`
      : `in node ${node.id}`
    throw new Error(`Unable to parse JSON: ${hint}`)
  }

  const { createNode, createParentChildLink } = actions

  const localeNode = {
    id: createNodeId(`${id} >>> Locale`),
    children: [],
    parent: id,
    internal: {
      content: data,
      contentDigest: createContentDigest(data),
      type: `Locale`,
    },
    language: language,
    ns: name,
    data,
    fileAbsolutePath: absolutePath,
  }

  createNode(localeNode)

  // @ts-ignore
  // staled issue: https://github.com/gatsbyjs/gatsby/issues/19993
  createParentChildLink({ parent: node, child: localeNode })
}

export default onLocaleCreateNode
