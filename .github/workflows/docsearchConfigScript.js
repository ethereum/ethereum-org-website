const fs = require("fs")
const translations = require("../../src/utils/languages").default

var config = {
  index_name: "prod-ethereum-org",
  start_urls: [
    {
      url: "https://ethereum.org/(?P<lang>.*?)/developers/tutorials/",
      variables: {
        lang: Object.keys(translations),
      },
      page_rank: 1,
    },
    {
      url: "https://ethereum.org/(?P<lang>.*?)/",
      variables: {
        lang: Object.keys(translations),
      },
      page_rank: 10,
    },
  ],
  stop_urls: [".*(?<!/)$"],
  selectors: {
    lvl0: {
      selector: "title",
      global: true,
    },
    lvl1: "#___gatsby h1",
    lvl2: {
      selector: "//meta[@name='description']/@content",
      type: "xpath",
      global: true,
    },
    lvl3: "#___gatsby h2",
    lvl4: "#___gatsby h3",
    lvl5: "#___gatsby h4",
    text: "#___gatsby p, #___gatsby ul, #___gatsby ol, #___gatsby li",
    lang: {
      selector: "/html/@lang",
      type: "xpath",
      global: true,
      default_value: "en",
    },
  },
  selectors_exclude: ["aside", "nav", "footer"],
  strip_chars: " .,;:#",
  custom_settings: {
    attributesForFaceting: ["lang", "content"],
    attributeForDistinct: "url_without_anchor",
    distinct: true,
  },
  scrape_start_urls: false,
}

fs.writeFile(
  "./.github/workflows/docsearchConfig.json",
  JSON.stringify(config),
  function (err) {
    if (err) {
      console.log(err)
    }
  }
)
