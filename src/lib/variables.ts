import * as constants from "./constants"

const GITHUB_REPO = constants.GITHUB_REPO_URL
const DISCORD = constants.DISCORD_PATH

/*NOTE External URLs Reference */
const CROWDIN_PROJECT = "https://crowdin.com/project/ethereum-org"
const EXT_GITHUB_ISSUES = GITHUB_REPO + "/issues"
const EXT_GITHUB_ISSUES_GFI =
  EXT_GITHUB_ISSUES + "?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22"
const EXT_GITHUB_FEATURE_REQUEST =
  EXT_GITHUB_ISSUES +
  "/new?assignees=&labels=Type%3A+Feature&template=feature_request.yaml&title="
const EXT_DISCORD = DISCORD
const EXT_CROWDIN_DOCS = "https://support.crowdin.com/online-editor"
const EXT_X = "https://x.com/ethdotorg"

// Translation-guide
const EXT_ISO_LANG_CODE =
  "https://www.andiamo.co.uk/resources/iso-language-codes"

// Translation Tools
const EXT_MS_LANG_PORTAL = "https://www.microsoft.com/en-us/language"
const EXT_LINGUEE = "https://www.linguee.com"
const EXT_PROZ_SEARCH = "https://www.proz.com/search"
const EXT_EURO_TERMBANK = "https://www.eurotermbank.com"

// Translation Communities
const EXT_TRANSLATORS_CH =
  "https://www.notion.so/Ethereum-org-05375fe0a94c4214acaf90f42ba40171"

// Contributing Rewards
const EXT_GALXE = "https://app.galxe.com/quest/ethereumorg"
const EXT_GALXE_DOCS = "https://help.galxe.com"
const EXT_GALXE_OATS =
  EXT_GALXE_DOCS + "/en/articles/9645630-create-quest-rewards#h_1c5d63ba03"
const EXT_GITPOAP = "https://www.gitpoap.io"
const EXT_DEVCON = "https://devcon.org"
const EXT_DEVCONNECT = "https://devconnect.org"

// External URLs export
export const EXT_URLS = {
  GITHUB_REPO,
  CROWDIN_PROJECT,
  EXT_GITHUB_ISSUES,
  EXT_GITHUB_ISSUES_GFI,
  EXT_GITHUB_FEATURE_REQUEST,
  EXT_DISCORD,
  EXT_X,
  EXT_CROWDIN_DOCS,
  EXT_ISO_LANG_CODE,
  EXT_MS_LANG_PORTAL,
  EXT_LINGUEE,
  EXT_PROZ_SEARCH,
  EXT_EURO_TERMBANK,
  EXT_TRANSLATORS_CH,
  EXT_GALXE,
  EXT_GALXE_DOCS,
  EXT_GALXE_OATS,
  EXT_GITPOAP,
  EXT_DEVCON,
  EXT_DEVCONNECT,
}
