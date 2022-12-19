import fs from "fs"
import path from "path"
import typescript, { ScriptTarget } from "typescript"
import walkdir from "walkdir"
import eol from "eol"
import deepMerge from "deepmerge"
import _ from "lodash"
import scanner from "i18next-scanner"
import vfs from "vinyl-fs"

import type { Scanner } from "i18next-scanner"
import type File from "vinyl"

import { supportedLanguages } from "../utils/languages"

/**
 * What does this script?
 *
 * - First, it grabs all the existing translations under `i18n/merged/{lang}/index.json`
 *  (the resource file)
 *
 * - Then it collects all the translation keys used in each file
 *    1. Scans all the files under the `src/` folder
 *    2. Looks for the translation keys used by calling `t({key})` or by using `<Translation id="{key}">`
 *
 * - Finally, under `i18n/locales`, it creates new json files with just the
 *   translations needed for each specific namespace
 */

const input = ["./src/**/*.{ts,tsx}"]
const output = "./i18n"

/**
 * Creates a namespace given a filename.
 *
 * E.g. for `usr/www/src/pages/get-eth.tsx` it returns `src-pages-get-eth`
 *
 * Namespaces generation logic:
 *
 * 1. One namespace per page is created. E.g. `src-pages-get-eth` or `src-templates-static`
 *
 * 2. A namespace to group all the translations under the `components/` folder.
 *    These are going to be shared between multiple pages
 *
 * 3. A `common` namespace for the rest of the translations that are not included
 *    either in a page or the components folder
 */
function createNamespaceFromFilename(filename: string) {
  const file = path.parse(filename)
  const dir = file.dir.slice(filename.lastIndexOf("src/"))
  const namespace = dir.replace(/\//g, "-") + "-" + file.name
  return namespace
}

/**
 * Custom transform function that is going to allocate each translation to the
 * corresponding namespace
 */
function customTransform(
  this: Scanner,
  file: File,
  enc: BufferEncoding,
  done: () => void
) {
  const { base, ext } = path.parse(file.path)
  const extensions = [".ts", ".tsx"]
  const target = ScriptTarget.ES2018

  if (extensions.includes(ext) && !base.includes(".d.ts")) {
    const content = fs.readFileSync(file.path, enc)

    const { outputText } = typescript.transpileModule(content, {
      compilerOptions: { target },
      fileName: path.basename(file.path),
    })

    const namespace = createNamespaceFromFilename(file.path)

    const customHandler = (key: string, options: any) => {
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

    // Look for translation keys in `<Translation id="key">` calls
    this.parser.parseTransFromString(
      outputText,
      { component: "Translation", i18nKey: "id" },
      customHandler
    )
    // Look for translation keys in `t(key)` calls
    this.parser.parseFuncFromString(outputText, { list: ["t"] }, customHandler)
  }

  done()
}

/**
 * Custom flush function that is going to create all the necessary json files
 * under `i18n/locales`
 */
function customFlush(this: Scanner, done: () => void) {
  const parser = this.parser
  const resStore = parser.resStore
  const resScan = parser.resScan

  // Merge two objects `resStore` and `resScan` deeply, returning a new merged object with the elements from both `resStore` and `resScan`.
  const resMerged = deepMerge<{ [key: string]: string }>(resStore, resScan)

  Object.keys(resMerged).forEach(function (lng) {
    const namespaces = resMerged[lng]
    const commonNs = resStore[lng]["common"]
    Object.keys(namespaces).forEach(function (ns) {
      const resStoreKeys = Object.keys(_.get(resStore, [lng, ns], {}))
      const resScanKeys = Object.keys(_.get(resScan, [lng, ns], {}))
      const unusedKeys = _.differenceWith(resStoreKeys, resScanKeys, _.isEqual)

      for (let i = 0; i < unusedKeys.length; ++i) {
        _.unset(resMerged[lng][ns], unusedKeys[i])
      }

      for (let i = 0; i < resScanKeys.length; ++i) {
        _.unset(commonNs, resScanKeys[i])
      }

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
}

/**
 * Main script function
 */
async function createLocales() {
  // create all the necessary namespaces
  const ns = ["components", "common"]
  walkdir.sync("./src/pages", (file) => {
    const namespace = createNamespaceFromFilename(file)
    ns.push(namespace)
  })

  walkdir.sync("./src/templates", (file) => {
    const namespace = createNamespaceFromFilename(file)
    ns.push(namespace)
  })

  walkdir.sync("./src/pages-conditional", (file) => {
    const namespace = createNamespaceFromFilename(file)
    ns.push(namespace)
  })

  const options = {
    sort: true,
    lngs: supportedLanguages,
    ns,
    defaultLng: "en",
    defaultValue: "__STRING_NOT_TRANSLATED__",
    fallbackLng: "en",
    resource: {
      loadPath: "i18n/merged/{{lng}}/index.json",
      savePath: "locales/{{lng}}/{{ns}}.json",
    },
    nsSeparator: false,
    keySeparator: false,
    removeUnusedKeys: true,
  }

  // scan all the files & find all the used translation keys
  const stream = scanner(options, customTransform, customFlush)

  // output the results in different json files
  return new Promise(function (resolve) {
    vfs.src(input).pipe(stream).pipe(vfs.dest(output)).on("end", resolve)
  })
}

export default createLocales
