const path = require("path")

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`

const formatCommand = "prettier --write"

const buildMarkdownLintCommand = (filenames) => {
  const files = filenames
    .map((f) => path.relative(process.cwd(), f))
    .filter((f) => !f.startsWith("public/content/translations/"))
    .join(" ")
  if (!files) return 'echo "No English content files to lint"'
  return `markdownlint-cli2 ${files} || (echo "\n  Fix with: npx markdownlint-cli2 --fix ${files}\n"; exit 1)`
}

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, formatCommand],
  "public/content/**/*.md": buildMarkdownLintCommand,
}
