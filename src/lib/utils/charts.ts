// Splits charts labels with multiple words in multiple words
// See: https://chartjs-plugin-datalabels.netlify.app/guide/formatting.html#multiline-labels
// Uses Intl.Segmenter API instead of .split(), to format translations properly
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter#basic_usage_and_difference_from_string.prototype.split
export const splitLongLabels = (labels) => {
  return labels.map((w) => {
    if (w.length > 5) {
      const segmenter = new Intl.Segmenter([], { granularity: "word" })
      const segmentedText = segmenter.segment(w)

      return [...segmentedText]
        .filter((s) => s.isWordLike)
        .map((s) => s.segment)
    }

    return w
  })
}
