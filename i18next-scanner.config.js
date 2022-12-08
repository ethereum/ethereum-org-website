const fs = require("fs")
const path = require("path")
const typescript = require("typescript")
const walkdir = require("walkdir")
const eol = require("eol")
const deepMerge = require("deepmerge")
const cloneDeep = require("clone-deep")
const _ = require("lodash")

function getNamespaceFromFilename(filename) {
  const cwd = process.cwd()
  const dirname = path.dirname(filename)
  const dir = dirname.replace(cwd + "/", "")
  const basename = path.basename(filename, ".tsx")
  const namespace = dir + "/" + basename

  return namespace.replaceAll("/", "-")
}

const ns = ["components", "common"]
walkdir.sync("./src/pages", (file) => {
  const namespace = getNamespaceFromFilename(file)
  ns.push(namespace)
})

walkdir.sync("./src/templates", (file) => {
  const namespace = getNamespaceFromFilename(file)
  ns.push(namespace)
})

walkdir.sync("./src/pages-conditional", (file) => {
  const namespace = getNamespaceFromFilename(file)
  ns.push(namespace)
})

const output = "./i18n"

module.exports = {
  input: ["src/**/*.{ts,tsx}"],
  output,
  options: {
    // debug: true,
    sort: true,
    lngs: [
      "en",
      "es",
      "ar",
      "az",
      "bg",
      "bn",
      "ca",
      "cs",
      "da",
      "de",
      "el",
      "fa",
      "fi",
      "fr",
      "gl",
      "hi",
      "hr",
      "hu",
      "id",
      "ig",
      "it",
      "ja",
      "ka",
      "kk",
      "km",
      "ko",
      "lt",
      "ml",
      "mr",
      "ms",
      "nl",
      "nb",
      "ph",
      "pl",
      "pt",
      "pt-br",
      "ro",
      "ru",
      "se",
      "sk",
      "sl",
      "sr",
      "sw",
      "ta",
      "th",
      "tr",
      "uk",
      "uz",
      "vi",
      "zh",
      "zh-tw",
    ],
    ns,
    defaultLng: "en",
    defaultValue: "__STRING_NOT_TRANSLATED__",
    fallbackLng: "en",
    resource: {
      loadPath: "i18n/locales/{{lng}}/index.json",
      savePath: "namespaces/{{lng}}/{{ns}}.json",
    },
    nsSeparator: ":",
    keySeparator: false,
    removeUnusedKeys: true,
  },
  transform: function customTransform(file, enc, done) {
    const { base, ext } = path.parse(file.path)
    const extensions = [".ts", ".tsx"]
    const target = "es2018"

    if (extensions.includes(ext) && !base.includes(".d.ts")) {
      const content = fs.readFileSync(file.path, enc)

      const { outputText } = typescript.transpileModule(content, {
        compilerOptions: { target },
        fileName: path.basename(file.path),
      })

      const namespace = getNamespaceFromFilename(file.path)

      const customHandler = (key, options) => {
        const ns = file.path.includes("components") ? "components" : namespace

        const defaultLng = this.parser.options.defaultLng
        const defaultValue = this.parser.resStore[defaultLng][ns][key]

        if (defaultValue) {
          this.parser.set(key, {
            ...options,
            defaultValue,
            ns,
          })
        }
      }

      this.parser.parseTransFromString(
        outputText,
        { component: "Translation", i18nKey: "id" },
        customHandler
      )
      this.parser.parseFuncFromString(
        outputText,
        { list: ["t"] },
        customHandler
      )
    }

    done()
  },
  flush: function customFlush(done) {
    const parser = this.parser
    const resStore = parser.resStore
    const resScan = parser.resScan

    // resStore = cloneDeep(resStore);

    // Merge two objects `resStore` and `resScan` deeply, returning a new merged object with the elements from both `resStore` and `resScan`.
    const resMerged = deepMerge(resStore, resScan)

    Object.keys(resMerged).forEach(function (lng) {
      const namespaces = resMerged[lng]
      const commonNs = resStore[lng]["common"]
      Object.keys(namespaces).forEach(function (ns) {
        const resStoreKeys = Object.keys(_.get(resStore, [lng, ns], {}))
        const resScanKeys = Object.keys(_.get(resScan, [lng, ns], {}))
        const unusedKeys = _.differenceWith(
          resStoreKeys,
          resScanKeys,
          _.isEqual
        )

        for (let i = 0; i < unusedKeys.length; ++i) {
          _.unset(resMerged[lng][ns], unusedKeys[i])
        }

        for (let i = 0; i < resScanKeys.length; ++i) {
          _.unset(commonNs, resScanKeys[i])
        }

        // Omit empty object
        // obj = omitEmptyObject(resMerged[lng][ns])

        const obj = resMerged[lng][ns]

        const resPath = parser.formatResourceSavePath(lng, ns)
        let text = JSON.stringify(obj, null, 2) + "\n"
        text = eol.lf(text)

        const dest = path.join(output, path.dirname(resPath))

        fs.mkdirSync(dest, {
          recursive: true,
        })
        fs.writeFileSync(path.join(output, resPath), text)
      })

      // save common file
      let commonNsText = JSON.stringify(commonNs, null, 2) + "\n"
      commonNsText = eol.lf(commonNsText)
      const resPath = parser.formatResourceSavePath(lng, "common")
      fs.writeFileSync(path.join(output, resPath), commonNsText)
    })

    done()
  },
}
