import React, { useState } from "react"

import type { PhoneScreenProps } from "@/lib/types"

import { generateInvalidSafeSeed } from "@/lib/utils/generateSeed"

import { ProgressCta } from "../../ProgressCta"
import { WalletHome } from "../../WalletHome"

import { GeneratingKeys } from "./GeneratingKeys"
import { HomeScreen } from "./HomeScreen"
import { InitialWordDisplay } from "./InitialWordDisplay"
import { InteractiveWordSelector } from "./InteractiveWordSelector"
import { RecoveryPhraseNotice } from "./RecoveryPhraseNotice"
import { WelcomeScreen } from "./WelcomeScreen"

export const CreateAccount = ({ nav, ctaLabel }: PhoneScreenProps) => {
  const { progressStepper, step } = nav
  const [words, setWords] = useState<Array<string>>(generateInvalidSafeSeed())
  const [categoryIndex, setCategoryIndex] = useState(0)
  const generateNewWords = () => {
    setWords(generateInvalidSafeSeed())
  }

  return (
    <>
      {[0, 1].includes(step) && <HomeScreen nav={nav} />}
      {[2].includes(step) && <WelcomeScreen />}
      {[3].includes(step) && (
        <GeneratingKeys
          nav={nav}
          generateNewWords={generateNewWords}
          ctaLabel={ctaLabel}
        />
      )}
      {[4].includes(step) && <RecoveryPhraseNotice />}
      {[5].includes(step) && <InitialWordDisplay words={words} />}
      {[6].includes(step) && (
        <InteractiveWordSelector nav={nav} words={words} ctaLabel={ctaLabel} />
      )}
      {[7].includes(step) && (
        <WalletHome
          activeTabIndex={categoryIndex}
          setActiveTabIndex={setCategoryIndex}
        />
      )}
      {[0, 1, 2, 4, 5].includes(step) && (
        <ProgressCta
          isAnimated={step === 0}
          progressStepper={progressStepper}
          className={
            [5].includes(step) ? "bg-background" : "bg-background-highlight"
          }
        >
          {ctaLabel}
        </ProgressCta>
      )}
    </>
  )
}
