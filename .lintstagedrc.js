const path = require("path")

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`

const formatCommand = "prettier --write"

const buildMarkdownLintCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f)).join(" ")
  return `markdownlint-cli2 ${files} || (echo "\n  Fix with: npx markdownlint-cli2 --fix ${files}\n"; exit 1)`
}

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, formatCommand],
  "public/content/**/*.md": buildMarkdownLintCommand,
}
