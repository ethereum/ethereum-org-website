// Configuration file for Jest testing
// https://www.gatsbyjs.com/docs/unit-testing/

const babelOptions = {
  presets: ["babel-preset-gatsby"],
}

module.exports = require("babel-jest").createTransformer(babelOptions)
