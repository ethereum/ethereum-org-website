const path = require("path")

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`

const formatCommand = "prettier --write"

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, formatCommand],
}
