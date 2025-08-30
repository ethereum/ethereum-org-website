import { useLocale } from "next-intl"

import type { LocaleDisplayInfo } from "@/lib/types"

import { ButtonLink } from "@/components/ui/buttons/Button"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { useTranslation } from "@/hooks/useTranslation"

type LanguagePickerFooterProps = {
  intlLanguagePreference?: LocaleDisplayInfo
  onTranslationProgramClick: () => void
}

const LanguagePickerFooter = ({
  intlLanguagePreference,
  onTranslationProgramClick,
}: LanguagePickerFooterProps) => {
  const { t } = useTranslation("common")
  const locale = useLocale()
  return (
    <div className="sticky bottom-0 flex border-t-2 border-primary bg-primary-low-contrast p-0 pb-1 pt-1">
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex min-w-0 flex-col items-start">
          {locale === DEFAULT_LOCALE ? (
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold text-body">
              {intlLanguagePreference
                ? `${t("page-languages-translate-cta-title")} ${t(`language-${intlLanguagePreference.localeOption}`)}`
                : "Translate ethereum.org"}
            </p>
          ) : (
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold text-body">
              {t("page-languages-translate-cta-title")}{" "}
              {t(`language-${locale}`)}
            </p>
          )}
          <p className="text-xs text-body">
            {t("page-languages-recruit-community")}
          </p>
        </div>
        <ButtonLink
          className="text-nowrap"
          href="/contributing/translation-program/"
          size="sm"
          onClick={onTranslationProgramClick}
        >
          {t("get-involved")}
        </ButtonLink>
      </div>
    </div>
  )
}

export default LanguagePickerFooter
