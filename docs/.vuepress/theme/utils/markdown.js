// the markdown heading anchor parser is modified from the markdown-it-anchor: https://github.com/valeriangalliat/markdown-it-anchor
// might be necessary to create a markdown-it plugin for supporting markdown heading anchor syntax

const slugify = s =>
  encodeURIComponent(
    String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
  )

const position = {
  false: 'push',
  true: 'unshift'
}

const renderPermalink = (slug, opts, state, idx) => {
  const space = () =>
    Object.assign(new state.Token('text', '', 0), { content: ' ' })

  const linkTokens = [
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ['class', opts.permalinkClass],
        ['href', opts.permalinkHref(slug, state)]
      ]
    }),
    Object.assign(new state.Token('html_block', '', 0), {
      content: opts.permalinkSymbol
    }),
    new state.Token('link_close', 'a', -1)
  ]

  // `push` or `unshift` according to position option.
  // Space is at the opposite side.
  if (opts.permalinkSpace) {
    linkTokens[position[!opts.permalinkBefore]](space())
  }
  state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens)
}

const customizeHeaderId = (title, headingToken) => {
  const match = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/.exec(title)
  const id = match ? match[2].toLowerCase() : slugify(title)
  if (match) {
    // update header ID
    headingToken.attrSet('id', id)
  }
  return id
}

// Function to generate custom header anchor links
// in order to keep anchor links consistent across languages
const renderHeaderWithExplicitAnchor = (slug, opts, state, idx) => {
  const headingToken = state.tokens[idx]
  const textToken = state.tokens[idx + 1]
  const title = textToken.content
  slug = customizeHeaderId(title, headingToken)

  // render the permalink
  renderPermalink(slug, opts, state, idx)
}

module.exports = {
  renderHeaderWithExplicitAnchor
}
