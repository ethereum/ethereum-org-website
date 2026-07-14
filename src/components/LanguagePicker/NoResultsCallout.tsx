import { useTranslations } from "next-intl"

import { BaseLink } from "../ui/Link"

type NoResultsCalloutProps = { onClose: () => void }

const NoResultsCallout = ({ onClose }: NoResultsCalloutProps) => {
  const t = useTranslations("common")
  return (
    <div>
      <p className="mb-2 font-bold">{t("page-languages-want-more-header")}</p>
      <p className="text-body-medium">
        {t("page-languages-want-more-paragraph")}
      </p>
      <BaseLink
        key="item-no-results"
        href="contributing/translation-program"
        onClick={onClose}
      >
        {t("page-languages-want-more-link")}
      </BaseLink>
    </div>
  )
}

export default NoResultsCallout
