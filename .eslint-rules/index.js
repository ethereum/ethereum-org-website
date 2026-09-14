"use strict"

const setRequestLocaleFirst = require("./set-request-locale-first")

// `meta` is what flat config uses to name the plugin; harmless under eslintrc.
module.exports = {
  meta: { name: "eslint-plugin-local", version: "1.0.0" },
  rules: {
    "set-request-locale-first": setRequestLocaleFirst,
  },
}
