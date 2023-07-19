import { TransformOptions } from "@babel/core"

export const babelConfig: TransformOptions = {
  sourceType: "unambiguous",
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: 100,
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [],
}
