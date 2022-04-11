export const getSummaryPoints = (frontmatter, count = 4) => {
  // Place summary points into an array, guarding for `undefined` values
  let summaryPoints = []
  for (let i = 1; i <= count; i++) {
    const summaryPoint = frontmatter[`summaryPoint${i}`]
    if (summaryPoint) {
      summaryPoints.push(summaryPoint)
    }
  }
  return summaryPoints
}
