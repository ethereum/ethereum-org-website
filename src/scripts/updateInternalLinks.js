const glob = require("glob")
const fs = require("fs")

// Given a translation directory (e.g. `pt`), this script updates all internal links
// of all markdown files within the directory to include the provided translation path,
// e.g. from `/what-is-ethereum` --> `/pt/what-is-ethereum/`

const getMarkdownFiles = (src, callback) => {
  glob(src + "/**/*.md", callback)
}

const updateInFile = (data, link, index, lang) => {
  const regex = /\(\/\S+\)/g
  let [repl] = link.match(regex)
  let newLink

  if (repl.charAt(repl.length - 2) != "/")
    repl = repl.slice(0, repl.length - 1) + "/)"

  if (!link.includes("/" + lang + "/")) {
    repl = "(/" + lang + repl.slice(1, repl.length)
  }

  if ((newLink = link.replace(regex, repl)) != link) {
    data = data.slice(0, index) + newLink + data.slice(index + link.length)
  }

  return data
}

const updateLinks = (src, lang) => {
  console.log("Updating links in" + src + " ...")
  fs.readFile(src, "utf-8", (err, data) => {
    if (err) {
      throw new Error(err)
    }

    const regex = /\[.*?\]\(\/\S+\)/g
    let m

    do {
      m = regex.exec(data)
      if (m) {
        data = updateInFile(data, m[0], m.index, lang)
      }
    } while (m !== null)

    fs.writeFile(src, data, "utf8", (err) => {
      if (err) return console.log(err)
    })
  })
}

const [lang] = process.argv.slice(2)

getMarkdownFiles("src/content/translations/" + lang, (err, files) => {
  if (err || files.length === 0) {
    throw new Error(`Cannot find folder "${lang}", error: `, err)
  } else {
    files.forEach((file) => updateLinks(file, lang))
  }
})
