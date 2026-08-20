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
      // Most messages are looked up at runtime (`<Translation id>` in MDX
      // content, glossary terms, tool and app descriptions keyed by id), so
      // static analysis can't see them being used.
      "orphan-message": "off",
    },
    overrides: [
      {
        // No English string exists for this entry yet; it renders the key's
        // last segment on /resources/ until one is written.
        keys: "page-resources.page-resources-reserves-cryptowerk-description",
        rules: { "undefined-key": "off" },
      },
      {
        // The namespace comes from a variable (`getTranslations(NAMESPACE)` in
        // the translation-program contributors page, `tDev` in card.stories.tsx),
        // so these keys can't be resolved statically.
        keys: [
          "page-contributing-translation-program-contributors-*",
          "page-developers-learn",
          "page-developers-learn-desc",
          "page-developers-read-docs",
        ],
        rules: { "undefined-key": "off" },
      },
    ],
  },
})
