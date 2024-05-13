// Splits charts labels with multiple words in multiple words
// See: https://chartjs-plugin-datalabels.netlify.app/guide/formatting.html#multiline-labels
export const splitLongLabels = (label) => {
  const labelLength = label.length
  const splittedLabel: any[] = label

  for (let i = 0; i < labelLength; i++) {
    const word = label[i].trim().split(" ")

    if (word.length > 1) {
      splittedLabel[i] = word
    }
  }

  return splittedLabel
}
