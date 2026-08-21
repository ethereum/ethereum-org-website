import { defineConfig } from "@eloqnt/cli"

export default defineConfig({
  srcPath: ["./src", "./app"],

  messages: {
    path: "./src/intl/{locale}/{namespace}",
    locales: "infer",
    sourceLocale: "en",
    format: "json",
  },

  lint: {
    rules: {
      // Many messages are looked up at runtime (`<Translation id>` in MDX
      // content, glossary terms, tool and app descriptions keyed by id), so
      // static analysis can't see them being used.
      "orphan-message": "off",
    },
  },
})
