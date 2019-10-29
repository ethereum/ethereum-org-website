module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  "transform": {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/docs/.vuepress/$1",
    ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  "collectCoverage": false,
  "collectCoverageFrom": [
    "**/*.{js,vue}",
    "!**/node_modules/**"
  ],
  "snapshotSerializers": [
    "jest-serializer-vue"
  ]
}
