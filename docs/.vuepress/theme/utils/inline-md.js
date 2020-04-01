const { parse } = require('twemoji-parser')
const md = require('markdown-it')()
md.use(require('markdown-it-emoji'))

md.renderer.rules.emoji = (token, idx) => {
  // Get file name from parser
  let file = parse(token[idx].content)
    .find(({ url }) => url)
    .url.split('/')
    .pop()
  // get svg file contents
  let svg = require('twemoji/svg/' + file)
  return `<img class="twemoji-svg" src="${svg}" />`
}

const inlineMd = str => md.renderInline(str)

module.exports = {
  inlineMd
}
