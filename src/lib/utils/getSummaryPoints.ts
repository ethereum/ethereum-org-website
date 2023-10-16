import { SummaryPointsNumbered } from "@/lib/interfaces"

export const getSummaryPoints = (
  frontmatter: SummaryPointsNumbered,
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
