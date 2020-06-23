const fs = require('fs')
const GitHubSlugger = require('github-slugger')
const toc = {}
let curLevel = [0, 0, 0]

function walk(dir, doc) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(function(file) {
    file = dir + '/' + file
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file, doc))
    } else {
      /* Is a file */
      if (
        !doc ||
        doc.length == 0 ||
        (file.indexOf(doc) != -1 && !file.startsWith(`docs/${doc}`))
      ) {
        results.push(file)
      }
    }
  })
  return results
}

function stripLinks(line) {
  return line.replace(/\[([^\]]+)\]\([^)]+\)/, (match, p1) => p1)
}

function addHeaderID(line, slugger, write = false) {
  // check if we're a header at all
  if (!line.startsWith('#')) {
    return line
  }
  // check if it already has an id
  if (/\{#[^}]+\}/.test(line)) {
    return line
  }
  const headingText = line
    .slice(line.indexOf(' '))
    .replace(/\{#[^}]+\}/, '')
    .trim()
  const headingLevel = line.slice(0, line.indexOf(' '))
  curLevel[headingLevel.length - 1]++
  for (let l = headingLevel.length; l < 3; l++) {
    curLevel[l] = 0
  }
  const headerNumber = curLevel.join('.')
  let slug = null
  if (!write) {
    // const match = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/.exec(line);
    // slug = match ? match[2].toLowerCase() : slugger.slug(stripLinks(headingText));
    slug = slugger.slug(stripLinks(headingText))
    toc[headerNumber] = {
      text: headingText,
      slug
    }
    // The below code is for printing the anchor link reference
    // const title = headingText.replace(/^\d\.\s+/, '').trim()
    // if (curLevel[1] > 0)
    // console.log(`  ${curLevel[1]}. [${title}](#${slug})`);
  } else {
    if (headerNumber in toc) {
      slug = toc[headerNumber].slug
      console.log('\twrite heading ID', headerNumber, headingText, '==>', slug)
      return `${headingLevel} ${headingText} {#${slug}}`
    } else {
      console.log(
        '\theaderNumber not found',
        headerNumber,
        headingText,
        '==>',
        slug
      )
      return line
    }
  }
}

function addHeaderIDs(lines, write = false) {
  // Sluggers should be per file
  const slugger = new GitHubSlugger()
  let inCode = false
  const results = []
  lines.forEach(line => {
    // Ignore code blocks
    if (line.startsWith('```')) {
      inCode = !inCode
      results.push(line)
      return
    }
    if (inCode) {
      results.push(line)
      return
    }

    results.push(addHeaderID(line, slugger, write))
  })
  return results
}

function traverseHeaders(path, doc = '', write = false) {
  const files = walk(path, doc)
  files.forEach(file => {
    if (!file.endsWith('.md')) {
      return
    }

    console.log(`>>> processing ${file}`)
    curLevel = [0, 0, 0]
    const content = fs.readFileSync(file, 'utf8')
    const lines = content.split('\n')
    const updatedLines = addHeaderIDs(lines, write)
    if (write) {
      fs.writeFileSync(file, updatedLines.join('\n'))
    }
  })
  if (!write) {
    console.log(toc)
  }
}

function addHeaderIDsForDir(path) {
  traverseHeaders(path, null, false)
  traverseHeaders(path, null, true)
}

const [path] = process.argv.slice(2)
addHeaderIDsForDir(path)

// The below function will update header IDs for all languages
// function updateAllLanguageHeaderIDs() {
// for (let doc of ["what-is-ethereum", "developers", "learn", "use"]) {
//   traverseHeaders(`docs/${doc}`); // build toc
//   traverseHeaders("docs", doc, true); // write heading anchors
// }
// }

// The below function will print anchor links for "use" doc
// function printAnchorLinks() {
// for (let doc of ["use"]) {
//   traverseHeaders("docs", doc, false); // build toc
// }
// }
