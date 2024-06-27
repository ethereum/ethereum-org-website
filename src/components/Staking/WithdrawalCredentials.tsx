import { ChangeEvent, FC, useMemo, useState } from "react"
import { useTranslation } from "next-i18next"
import { Button, Flex, Text } from "@chakra-ui/react"

import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import Input from "@/components/Input"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

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
    setIsLoading((prev) => ({
      ...prev,
      [networkLowercase]: true,
    }))
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
      setIsLoading((prev) => ({
        ...prev,
        [networkLowercase]: false,
      }))
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
        <Flex bg="error.neutral" p={4}>
          <Text m={0} color="error.base">
            {t("comp-withdrawal-credentials-error")}
          </Text>
        </Flex>
      )
    if (!validator) return " "
    if (validator.isUpgraded)
      return (
        <Flex bg="success.neutral" p={4}>
          <Text m={0} color="success.base">
            <Text as="span" fontWeight="bold">
              <Translation
                id="page-staking:comp-withdrawal-credentials-upgraded-1"
                options={{ validatorIndex: validator.validatorIndex }}
              />{" "}
            </Text>
            {t("comp-withdrawal-credentials-upgraded-2")}{" "}
            <CopyToClipboard text={longAddress} inline>
              {(isCopied) => (
                <>
                  <Text as="span" title={longAddress} fontWeight="bold">
                    {shortAddress}
                  </Text>
                  {isCopied ? (
                    <>
                      <Emoji text="✅" fontSize="lg" mx={2} />
                      <Text as="span" title={longAddress}>
                        {t("copied")}
                      </Text>
                    </>
                  ) : (
                    <Emoji text="📋" fontSize="lg" mx={2} />
                  )}
                </>
              )}
            </CopyToClipboard>
          </Text>
        </Flex>
      )
    return (
      <Flex bg="error.neutral" p={4}>
        <Text m={0} color="error.base">
          <Text as="span" fontWeight="bold">
            {validator.isTestnet
              ? t("comp-withdrawal-credentials-not-upgraded-1-testnet")
              : t("comp-withdrawal-credentials-not-upgraded-1")}
          </Text>{" "}
          <Translation id="page-staking:comp-withdrawal-credentials-not-upgraded-2" />
        </Text>
      </Flex>
    )
  }, [hasError, validator, longAddress, shortAddress, t])

  return (
    <Flex direction="column" gap={4}>
      <Flex alignItems="center" gap={2} flexWrap="wrap">
        <Input
          id="validatorIndex"
          value={inputValue}
          onChange={handleChange}
          w={{ base: "full", sm: "18ch" }}
          placeholder={t("comp-withdrawal-credentials-placeholder")}
        />
        <Flex
          w={{ base: "full", sm: "fit-content" }}
          direction={{ base: "column", sm: "row" }}
          gap={2}
        >
          <Button
            onClick={() => checkWithdrawalCredentials()}
            isDisabled={!inputValue.length}
            isLoading={isLoading.mainnet}
          >
            {t("comp-withdrawal-credentials-verify-mainnet")}
          </Button>
          <Button
            onClick={() => checkWithdrawalCredentials(true)}
            isDisabled={!inputValue.length}
            variant="outline"
            isLoading={isLoading.testnet}
          >
            {t("comp-withdrawal-credentials-verify-holesky")}
          </Button>
        </Flex>
      </Flex>
      {resultText}
    </Flex>
  )
}

export default WithdrawalCredentials
