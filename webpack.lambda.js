// Expose a custom webpack config in order to let netlify-lambda read it and
// build the TS lambda functions. This way, netlify-lambda use the same
// babel config that Gatsby does.
module.exports = {
  module: {
    rules: [
      {
        test: /\.(m?js|ts)?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              [
                "babel-preset-gatsby",
                {
                  targets: {
                    browsers: [">0.25%", "not dead"],
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
}
