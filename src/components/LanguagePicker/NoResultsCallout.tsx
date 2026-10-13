import { useTranslations } from "next-intl"

import { BaseLink } from "../ui/Link"

type NoResultsCalloutProps = { onClose: () => void }

const NoResultsCallout = ({ onClose }: NoResultsCalloutProps) => {
  const t = useTranslations("common")
  return (
    <div>
      <p className="mb-2 font-bold">{t("page-languages-want-more-header")}</p>
      <p className="text-body-medium">
        {t.rich("page-languages-want-more-paragraph", {
          a: (chunks) => (
            <BaseLink
              key="item-no-results"
              href="/contributing/translation-program/"
              onClick={onClose}
            >
              {chunks}
            </BaseLink>
          ),
        })}
      </p>
    </div>
  )
}

export default NoResultsCallout
