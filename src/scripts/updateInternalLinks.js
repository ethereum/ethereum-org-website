// TODO

// var glob = require('glob')
// var fs = require('fs')

// function getMarkdownFiles(src, callback) {
//   glob(src + '/**/*.md', callback)
// }

// function updateInFile(data, link, index, lang) {
//   var r = /\(\/\S+\)/g
//   var [repl] = link.match(r)
//   var new_link

//   if (repl.charAt(repl.length - 2) != '/')
//     repl = repl.slice(0, repl.length - 1) + '/)'

//   if (!link.includes('/' + lang + '/')) {
//     repl = '(/' + lang + repl.slice(1, repl.length)
//   }

//   if ((new_link = link.replace(r, repl)) != link) {
//     data = data.slice(0, index) + new_link + data.slice(index + link.length)
//   }

//   return data
// }

// function updateLinks(src, lang) {
//   console.log('Updating links in' + src + ' ...')
//   fs.readFile(src, 'utf-8', function(err, data) {
//     if (err) {
//       throw new Error(err)
//     }

//     var re = /\[.*?\]\(\/\S+\)/g
//     var m

//     do {
//       m = re.exec(data)
//       if (m) {
//         data = updateInFile(data, m[0], m.index, lang)
//       }
//     } while (m !== null)

//     fs.writeFile(src, data, 'utf8', function(err) {
//       if (err) return console.log(err)
//     })
//   })
// }

// const [lang] = process.argv.slice(2)
// getMarkdownFiles('docs/translations/' + lang, function(err, res) {
//   if (err || res.length === 0) {
//     throw new Error(`Cannot find folder "${lang}", error: `, err)
//   } else {
//     res.forEach(e => updateLinks(e, lang))
//   }
// })
