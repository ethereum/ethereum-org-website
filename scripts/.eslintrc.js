module.exports = {
  env: {
    node: true,
    es6: true,
  },
  rules: {
    "@typescript-eslint/no-var-requires": "off", // Allow require() in Node.js scripts
    "unused-imports/no-unused-vars": "off", // Allow unused vars in scripts
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
}
