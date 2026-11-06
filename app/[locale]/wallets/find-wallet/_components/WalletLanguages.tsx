import { Fragment } from "react"

import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"

import { cn } from "@/lib/utils/cn"

type WalletLanguagesProps = {
  languages: string[]
  /** Bolded when present in the shown slice; everything else stays plain. */
  localeLanguage?: string
  shown: number
}

/** Highlights the viewer's own language, not every language the wallet speaks. */
const WalletLanguages = ({
  languages,
  localeLanguage,
  shown,
}: WalletLanguagesProps) => (
  <>
    {languages.slice(0, shown).map((language, index) => (
      <Fragment key={language}>
        {index > 0 && " · "}
        <span
          className={cn(
            language === localeLanguage && "font-semibold text-body"
          )}
        >
          {language}
        </span>
      </Fragment>
    ))}{" "}
    {/* Lift above the card LinkOverlay's ::before so the tooltip is hoverable. */}
    <span className="relative z-10">
      <SupportedLanguagesTooltip supportedLanguages={languages} shown={shown} />
    </span>
  </>
)

export default WalletLanguages
