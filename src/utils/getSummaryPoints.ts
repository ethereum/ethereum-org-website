export const getSummaryPoints = (
  frontmatter: Partial<
    Pick<
      Queries.Frontmatter,
      "summaryPoint1" | "summaryPoint2" | "summaryPoint3" | "summaryPoint4"
    >
  >,
  count = 4
): Array<string> => {
  // Place summary points into an array, guarding for `undefined` values
  let summaryPoints: Array<string> = []
  for (let i = 1; i <= count; i++) {
    // @ts-ignore
    const summaryPoint = frontmatter[`summaryPoint${i}`] as string
    if (summaryPoint) {
      summaryPoints.push(summaryPoint)
    }
  }
  return summaryPoints
}
