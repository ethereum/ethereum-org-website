import React, { useState } from "react"
import type { SimulatorStateProps } from "../../../interfaces"
import { generateSeedWithoutChecksum } from "../../../utils/generateSeedWithoutChecksum"
import { NewWalletPreview, ProgressCta } from ".."
import {
  GeneratingKeys,
  HomeScreen,
  InitialWordDisplay,
  InteractiveWordSelector,
  RecoveryPhraseNotice,
  WelcomeScreen,
} from "./CreateAccount/index"

export const CreateAccount: React.FC<SimulatorStateProps> = ({ state }) => {
  const { step } = state
  const [words, setWords] = useState<Array<string>>(
    generateSeedWithoutChecksum()
  )
  const generateNewWords = () => {
    setWords(generateSeedWithoutChecksum())
  }
  return (
    <>
      {[0, 1].includes(step) && <HomeScreen state={state} />}
      {[2].includes(step) && <WelcomeScreen />}
      {[3].includes(step) && (
        <GeneratingKeys state={state} generateNewWords={generateNewWords} />
      )}
      {[4].includes(step) && <RecoveryPhraseNotice />}
      {[5].includes(step) && <InitialWordDisplay words={words} />}
      {[6].includes(step) && (
        <InteractiveWordSelector state={state} words={words} />
      )}
      {[7].includes(step) && <NewWalletPreview />}
      {[0, 1, 2, 4, 5].includes(step) && (
        <ProgressCta
          state={state}
          bg={[5].includes(step) ? "background.base" : "background.highlight"}
        />
      )}
    </>
  )
}
