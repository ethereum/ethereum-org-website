// the markdown heading anchor parser is modified from the markdown-it-anchor: https://github.com/valeriangalliat/markdown-it-anchor
// might be necessary to create a markdown-it plugin for supporting markdown heading anchor syntax

const slugify = (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));

const position = {
  false: 'push',
  true: 'unshift'
}

const renderPermalink = (slug, opts, state, idx) => {
  const space = () => Object.assign(new state.Token('text', '', 0), { content: ' ' })

  const linkTokens = [
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ['class', opts.permalinkClass],
        ['href', opts.permalinkHref(slug, state)]
      ]
    }),
    Object.assign(new state.Token('html_block', '', 0), { content: opts.permalinkSymbol }),
    new state.Token('link_close', 'a', -1)
  ]

  // `push` or `unshift` according to position option.
  // Space is at the opposite side.
  if (opts.permalinkSpace) {
    linkTokens[position[!opts.permalinkBefore]](space())
  }
  state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens)
}

const getTitle = (token) => {
  return token
    .children
    .filter(token => token.type === 'text' || token.type === 'code_inline')
    .reduce((acc, t) => acc + t.content, '')
}

const customizeHeaderId = (title, headingToken, textToken) => {
  const match = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/.exec(title);
  const id = match ? match[2].toLowerCase() : slugify(title);
  if (match) {
    // update header ID
    headingToken.attrSet('id', id);

    // Remove the custom ID part from the text node.
    textToken
      .children
      .filter(token => token.type === 'text' || token.type === 'code_inline')
      .forEach(token => {
        token.content = token.content.replace(match[1], '')
      })
  }
  return id;
}

const renderHeaderWithExplicitAnchor = (slug, opts, state, idx) => {
  // customize header anchor
  const headingToken = state.tokens[idx];
  const textToken = state.tokens[idx + 1];
  const title = getTitle(textToken);
  slug = customizeHeaderId(title, headingToken, textToken);

  // render the permalink
  renderPermalink(slug, opts, state, idx);
}

module.exports = {
  renderHeaderWithExplicitAnchor
}
