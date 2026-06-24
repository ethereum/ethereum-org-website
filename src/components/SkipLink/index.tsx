import { getTranslations } from "next-intl/server"

import SkipLinkContent from "./SkipLinkContent"

export const SkipLink = async () => {
  const t = await getTranslations("common")

  return <SkipLinkContent label={t("skip-to-main-content")} />
}
