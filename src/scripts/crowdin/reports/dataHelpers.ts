import { UserData, loadExcludedTranslators } from "./fileHelpers"

export async function filterAndFormatData(data: UserData[]) {
  const excludedTranslators = await loadExcludedTranslators()

  return data
    .filter((userObj) => {
      const fullName = userObj.user.fullName?.toLowerCase()
      const username = userObj.user.username?.toLowerCase()

      return (
        fullName &&
        !excludedTranslators.excludedNames.includes(fullName) &&
        username &&
        !excludedTranslators.excludedUsernames.includes(username) &&
        !excludedTranslators.excludedPhrases.some(
          (phrase) => fullName.includes(phrase) || username.includes(phrase)
        )
      )
    })
    .map((userObj) => ({
      id: userObj.user.id,
      username: userObj.user.username,
      totalCosts: userObj.user.totalCosts,
      avatarUrl: userObj.user.avatarUrl,
    }))
    .sort((a, b) => b.totalCosts - a.totalCosts) // sort users by totalCosts, highest first
}
