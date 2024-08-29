import { useTranslation } from "next-i18next"

import { MAIN_CONTENT_ID } from "@/lib/constants"

import { BaseLink } from "./ui/Link"

export const SkipLink = () => {
  const { t } = useTranslation()
  return (
    <div className="bg-primary">
      <BaseLink
        href={"#" + MAIN_CONTENT_ID}
        className="absolute -top-12 ms-2 leading-8 text-background no-underline hover:no-underline focus:static"
      >
        {t("skip-to-main-content")}
      </BaseLink>
    </div>
  )
}
