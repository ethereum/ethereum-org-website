// Splits longer labels in multiple lines, using the longest word as a max width
// See: https://chartjs-plugin-datalabels.netlify.app/guide/formatting.html#multiline-labels
// Based on https://stackoverflow.com/a/76433452
export const wrapLabel = (str: string) => {
  const result = str.split(" ").reduce((res, word, idx) => {
    if (!idx || word.length > res) {
      res = word.length
    }

    return res
  }, 0)
  const regex = new RegExp(
    "(?=\\S).{0," + (result - 1) + "}\\S(?!\\S)|\\S{" + result + "}",
    "gm"
  )

  return Array.from(str.matchAll(regex), (m) => m[0])
}
