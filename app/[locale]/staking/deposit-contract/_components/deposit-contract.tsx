"use client"

import { useEffect, useState } from "react"
import makeBlockie from "ethereum-blockies-base64"
import { Clipboard, ClipboardCheck } from "lucide-react"

import type { TranslationKey } from "@/lib/types"

import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import { Image } from "@/components/Image"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"
import { Button } from "@/components/ui/buttons/Button"
import { CardButtonFake, CardParagraph, CardTitle } from "@/components/ui/card"
import Checkbox from "@/components/ui/checkbox"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { DEPOSIT_CONTRACT_ADDRESS } from "@/data/addresses"

import useTranslation from "@/hooks/useTranslation"

const CHUNKED_ADDRESS =
  DEPOSIT_CONTRACT_ADDRESS.match(/(?:^0x|.{4})/g)?.join(" ")

const blockieSrc = makeBlockie(DEPOSIT_CONTRACT_ADDRESS)

const DepositContract = () => {
  const { t } = useTranslation("page-staking-deposit-contract")

  const [state, setState] = useState<{
    browserHasTextToSpeechSupport: boolean
    textToSpeechRequest: SpeechSynthesisUtterance | undefined
    isSpeechActive: boolean
    showAddress: boolean
    userHasUsedLaunchpad: boolean
    userUnderstandsStaking: boolean
    userWillCheckOtherSources: boolean
  }>({
    browserHasTextToSpeechSupport: false,
    textToSpeechRequest: undefined,
    isSpeechActive: false,
    showAddress: false,
    userHasUsedLaunchpad: false,
    userUnderstandsStaking: false,
    userWillCheckOtherSources: false,
  })

  useEffect(() => {
    const browserHasTextToSpeechSupport = !!window.speechSynthesis
    if (!browserHasTextToSpeechSupport) return
    // Create textToSpeechRequest
    const speech = new SpeechSynthesisUtterance()
    speech.lang = "en-US"
    speech.text = DEPOSIT_CONTRACT_ADDRESS.split("").join(",")
    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1
    // Add event listeners
    // Explicitly set state in listener callback
    const speechCallbackState = {
      browserHasTextToSpeechSupport: true,
      textToSpeechRequest: speech,
      showAddress: true,
      userHasUsedLaunchpad: true,
      userUnderstandsStaking: true,
      userWillCheckOtherSources: true,
    }
    const onStartCallback = () =>
      setState({ ...speechCallbackState, isSpeechActive: true })
    const onEndCallback = () =>
      setState({ ...speechCallbackState, isSpeechActive: false })
    speech.addEventListener("start", onStartCallback)
    speech.addEventListener("end", onEndCallback)

    setState((prevState) => ({
      ...prevState,
      browserHasTextToSpeechSupport,
      textToSpeechRequest: speech,
    }))
    return () => {
      speech.removeEventListener("start", onStartCallback)
      speech.removeEventListener("end", onEndCallback)
      window.speechSynthesis.cancel()
    }
  }, [])

  const handleTextToSpeech = () => {
    if (!window.speechSynthesis) {
      console.error(
        "Browser doesn't support the 'SpeechSynthesis' text-to-speech API"
      )
      return
    }
    if (state.isSpeechActive) {
      window.speechSynthesis.cancel()
    } else {
      window.speechSynthesis.speak(
        state.textToSpeechRequest as SpeechSynthesisUtterance
      )
    }
  }

  const isButtonEnabled =
    state.userHasUsedLaunchpad &&
    state.userUnderstandsStaking &&
    state.userWillCheckOtherSources

  const textToSpeechText = state.isSpeechActive
    ? t("page-staking-deposit-contract-stop-reading")
    : t("page-staking-deposit-contract-read-aloud")
  const textToSpeechEmoji = state.isSpeechActive
    ? ":speaker_high_volume:"
    : ":speaker:"

  if (!state.showAddress) {
    return (
      <>
        <CardTitle>
          {t("page-staking-deposit-contract-confirm-address")}
        </CardTitle>
        <div>
          <label className="flex gap-2">
            <Checkbox
              className="m-1 shrink-0"
              checked={state.userHasUsedLaunchpad}
              onCheckedChange={() =>
                setState({
                  ...state,
                  userHasUsedLaunchpad: !state.userHasUsedLaunchpad,
                })
              }
            />
            {t("page-staking-deposit-contract-checkbox1")}
          </label>
          <label className="flex gap-2">
            <Checkbox
              className="m-1 shrink-0"
              checked={state.userUnderstandsStaking}
              onCheckedChange={() =>
                setState({
                  ...state,
                  userUnderstandsStaking: !state.userUnderstandsStaking,
                })
              }
            />
            {t("page-staking-deposit-contract-checkbox2")}
          </label>
          <label className="flex gap-2">
            <Checkbox
              className="m-1 shrink-0"
              checked={state.userWillCheckOtherSources}
              onCheckedChange={() =>
                setState({
                  ...state,
                  userWillCheckOtherSources: !state.userWillCheckOtherSources,
                })
              }
            />
            {t("page-staking-deposit-contract-checkbox3")}
          </label>
        </div>
        <Button
          variant="outline"
          disabled={!isButtonEnabled}
          onClick={() =>
            setState({ ...state, showAddress: !state.showAddress })
          }
        >
          <Emoji text=":eyes:" />
          &nbsp;
          {t("page-staking-deposit-contract-reveal-address-btn")}
        </Button>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:justify-between">
        <div>
          <CardTitle>{t("page-staking-deposit-contract-address")}</CardTitle>
          <CardParagraph>
            {t("page-staking-deposit-contract-address-caption")}
          </CardParagraph>
        </div>
        <Image
          className="rounded-xs"
          src={blockieSrc}
          alt=""
          height={64}
          width={64}
        />
      </div>
      {state.browserHasTextToSpeechSupport && (
        <Flex className="mb-8 items-center">
          <Button
            className="me-2 cursor-pointer px-0 text-primary"
            variant="ghost"
            onClick={handleTextToSpeech}
          >
            <Translation id={textToSpeechText as TranslationKey} />
          </Button>{" "}
          <Emoji text={textToSpeechEmoji} className="text-md" />
        </Flex>
      )}
      <Tooltip content={t("page-staking-deposit-contract-warning")}>
        <div className="mb-4 font-monospace text-3xl/xs text-balance uppercase">
          {CHUNKED_ADDRESS}
        </div>
      </Tooltip>
      <div className="flex flex-col-reverse items-start justify-start gap-4 md:flex-row md:items-center">
        <CopyToClipboard text={DEPOSIT_CONTRACT_ADDRESS}>
          {(isCopied) => (
            <CardButtonFake variant="outline">
              {!isCopied ? (
                <>
                  {t("page-staking-deposit-contract-copy")}
                  <Clipboard className="-me-1 mb-0.5" />
                </>
              ) : (
                <>
                  {t("page-staking-deposit-contract-copied")}
                  <ClipboardCheck className="-me-1 mb-0.5" />
                </>
              )}
            </CardButtonFake>
          )}
        </CopyToClipboard>
        <InlineLink
          href={`https://eth.blockscout.com/address/${DEPOSIT_CONTRACT_ADDRESS}`}
        >
          {t("page-staking-deposit-contract-blockexplorer")}
        </InlineLink>
      </div>
    </>
  )
}

export default DepositContract
