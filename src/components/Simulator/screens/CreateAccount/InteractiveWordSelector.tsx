import { useState } from "react"
import { useTranslations } from "next-intl"

import { PhoneScreenProps } from "@/lib/types"

import { ProgressCta } from "../../ProgressCta"

import { WordList } from "./WordList"
import { WordSelectorButtons } from "./WordSelectorButtons"

type InteractiveWordSelectorProps = PhoneScreenProps & {
  words: Array<string>
}

export const InteractiveWordSelector = ({
  words,
  ctaLabel,
  nav,
}: InteractiveWordSelectorProps) => {
  const t = useTranslations("component-wallet-simulator")
  const { progressStepper } = nav
  const [wordsSelected, setWordsSelected] = useState(0)
  return (
    <div className="mt-8">
      <p className="mb-4 px-4 text-2xl font-bold leading-8 max-md:hidden md:px-8">
        {t("sim-ca-repeat-words")}
      </p>
      <WordList words={words} wordsSelected={wordsSelected} />
      {wordsSelected < words.length ? (
        <WordSelectorButtons
          words={words}
          wordsSelected={wordsSelected}
          setWordsSelected={setWordsSelected}
        />
      ) : (
        <ProgressCta
          data-testid="word-selector-cta"
          progressStepper={progressStepper}
        >
          {ctaLabel}
        </ProgressCta>
      )}
    </div>
  )
}
