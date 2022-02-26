const path = require("path")
const visitWithParents = require("unist-util-visit-parents")
const isRelativeUrl = require("is-relative-url")

/**
 * Modify the images urls on translated md files to point to the source ones.
 *
 * E.g.
 * Before
 * - Source file:     ./image.png
 * - Translated file: ./image.png
 *
 * After
 * - Source file:     ./image.png
 * - Translated file: ../path/to/source/image.png
 */
module.exports = ({ markdownNode, markdownAST }) => {
  const fileAbsoluteDir = path.dirname(markdownNode.fileAbsolutePath)
  const sourceAbsoluteDir = fileAbsoluteDir.replace(
    /translations\/\w{2}(-\w{2})?\//,
    ""
  )
  const relativePath = path.relative(fileAbsoluteDir, sourceAbsoluteDir)

  // if it is not a translated file, skip it
  if (!fileAbsoluteDir.includes("/translations")) {
    return markdownAST
  }

  // loop for each image node in the mdx file
  visitWithParents(markdownAST, ["image"], (node) => {
    const isRelativeToMdFile = isRelativeUrl(node.url)
    if (isRelativeToMdFile) {
      const fileName = path.basename(node.url)
      node.url = `${relativePath}/${fileName}`
    }
  })

  return markdownAST
}
