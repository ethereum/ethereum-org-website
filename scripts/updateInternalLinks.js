var glob = require('glob')
var fs = require('fs')

function getMarkdownFiles(src, callback) {
  glob(src + '/**/*.md', callback)
}

function updateInFile(data, link, lang) {
  var r = /\(\/\S+\)/g
  var [repl] = link.match(r)
  var new_link

  if (repl.charAt(repl.length - 2) != '/')
    repl = repl.slice(0, repl.length - 1) + '/)'

  if (!link.includes('/' + lang + '/')) {
    repl = '(/' + lang + repl.slice(1, repl.length)
  }

  if ((new_link = link.replace(r, repl)) != link) {
    console.log('changing ' + link + ' for ' + new_link)
    data = data.replace(link, new_link)
  }
}

function updateLinks(src, lang) {
  fs.readFile(src, 'utf-8', function(err, data) {
    if (err) {
      return console.log(err)
    }

    var re = /\[.*?\]\(\/\S+\)/g
    var m

    do {
      m = re.exec(data)
      if (m) updateInFile(data, m[0], lang)
    } while (m !== null)

    fs.writeFile(src, data, 'utf8', function(err) {
      if (err) return console.log(err)
    })
  })
}

const [lang] = process.argv.slice(2)
getMarkdownFiles('docs/translations/' + lang, function(err, res) {
  if (err) {
    console.log('Cannot find folder', err)
  } else {
    console.log('Found results: ')
    console.log(res)
    res.forEach(e => updateLinks(e, lang))
  }
})
