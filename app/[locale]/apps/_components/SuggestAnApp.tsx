import { getTranslations } from "next-intl/server"

import { ButtonLink } from "@/components/ui/buttons/Button"

const SuggestAnApp = async () => {
  const t = await getTranslations("page-apps")
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-radial-a p-12">
      <h2>{t("page-apps-suggest-an-app-title")}</h2>
      <p>{t("page-apps-suggest-an-app-description")}</p>
      <ButtonLink
        href="https://submitapp.paperform.co/"
        variant="outline"
        className="w-fit"
        hideArrow
      >
        {t("page-apps-suggest-an-app-button")}
      </ButtonLink>
    </div>
  )
}

export default SuggestAnApp
