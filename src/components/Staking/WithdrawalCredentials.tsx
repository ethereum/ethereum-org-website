import { ChangeEvent, FC, useMemo, useState } from "react"
import { useTranslation } from "next-i18next"

import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

import Input from "../../../tailwind/ui/Input"
import { Alert, AlertContent } from "../ui/alert"
import { Button } from "../ui/buttons/Button"
import { Flex } from "../ui/flex"
import { Spinner } from "../ui/spinner"

interface Validator {
  validatorIndex: number
  withdrawalCredentials: string
  isUpgraded: boolean
  isTestnet?: boolean
}

const WithdrawalCredentials: FC = () => {
  const { t } = useTranslation("page-staking")
  const [isLoading, setIsLoading] = useState<{
    mainnet: boolean
    testnet: boolean
  }>({ mainnet: false, testnet: false })
  const [hasError, setHasError] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [validator, setValidator] = useState<Validator | null>(null)

  const checkWithdrawalCredentials = async (isTestnet: boolean = false) => {
    const network = isTestnet ? "Holesky" : "Mainnet"
    const networkLowercase = network.toLowerCase()
    trackCustomEvent({
      eventCategory: `Validator index`,
      eventAction: `Verify on ${network}`,
      eventName: `click`,
    })
    setHasError(false)
    setIsLoading((prev) =>
      isTestnet ? { ...prev, testnet: true } : { ...prev, mainnet: true }
    )
    const endpoint = `https://${networkLowercase}.beaconcha.in/api/v1/validator/${inputValue}`
    try {
      const response = await fetch(endpoint)
      const { data } = await response.json()
      const withdrawalCredentials = data.length
        ? data[0].withdrawalcredentials
        : data.withdrawalcredentials
      setValidator({
        validatorIndex: parseInt(inputValue),
        withdrawalCredentials,
        isUpgraded: withdrawalCredentials.startsWith("0x01"),
        isTestnet,
      })
    } catch (error) {
      console.error(error)
      setHasError(true)
    } finally {
      setIsLoading((prev) =>
        isTestnet ? { ...prev, testnet: false } : { ...prev, mainnet: false }
      )
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value.replace(/\D/g, ""))

  const longAddress = useMemo<string>(
    () => (validator ? `0x${validator.withdrawalCredentials.slice(-40)}` : ""),
    [validator]
  )
  const shortAddress = useMemo<string>(
    () =>
      longAddress ? `${longAddress.slice(0, 6)}…${longAddress.slice(-4)}` : "",
    [longAddress]
  )
  const resultText = useMemo<string | JSX.Element>(() => {
    if (hasError)
      return (
        <Alert variant="error">
          <AlertContent className="inline">
            {t("comp-withdrawal-credentials-error")}
          </AlertContent>
        </Alert>
      )
    if (!validator) return " "
    if (validator.isUpgraded)
      return (
        <Alert variant="success">
          <AlertContent className="inline">
            <strong>
              <Translation
                id="page-staking:comp-withdrawal-credentials-upgraded-1"
                options={{ validatorIndex: validator.validatorIndex }}
              />{" "}
            </strong>
            {t("comp-withdrawal-credentials-upgraded-2")}{" "}
            <CopyToClipboard text={longAddress} inline>
              {(isCopied) => (
                <>
                  <strong title={longAddress}>{shortAddress}</strong>
                  {isCopied ? (
                    <>
                      <Emoji text="✅" className="mx-2 text-lg" />
                      <span title={longAddress}>{t("copied")}</span>
                    </>
                  ) : (
                    <Emoji text="📋" className="mx-2 text-lg" />
                  )}
                </>
              )}
            </CopyToClipboard>
          </AlertContent>
        </Alert>
      )
    return (
      <Alert variant="error">
        <AlertContent className="inline">
          <strong>
            {validator.isTestnet
              ? t("comp-withdrawal-credentials-not-upgraded-1-testnet")
              : t("comp-withdrawal-credentials-not-upgraded-1")}
          </strong>{" "}
          <Translation id="page-staking:comp-withdrawal-credentials-not-upgraded-2" />
        </AlertContent>
      </Alert>
    )
  }, [hasError, validator, longAddress, shortAddress, t])

  return (
    <Flex className="flex-col gap-4">
      <Flex className="flex-wrap items-center gap-2">
        <Input
          id="validatorIndex"
          value={inputValue}
          onChange={handleChange}
          className="w-full sm:w-[18ch]"
          placeholder={t("comp-withdrawal-credentials-placeholder")}
        />
        <Flex className="w-full flex-col gap-2 sm:w-fit sm:flex-row">
          <Button
            onClick={() => checkWithdrawalCredentials()}
            disabled={!inputValue.length}
          >
            {t("comp-withdrawal-credentials-verify-mainnet")}
            {isLoading.mainnet && <Spinner />}
          </Button>
          <Button
            onClick={() => checkWithdrawalCredentials(true)}
            disabled={!inputValue.length}
            variant="outline"
          >
            {t("comp-withdrawal-credentials-verify-holesky")}
            {isLoading.testnet && <Spinner />}
          </Button>
        </Flex>
      </Flex>
      {resultText}
    </Flex>
  )
}

export default WithdrawalCredentials
