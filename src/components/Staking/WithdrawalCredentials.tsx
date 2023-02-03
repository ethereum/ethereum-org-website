// Import libraries
import React, { FC, useState, useMemo, ChangeEvent } from "react"
import { Button, Flex, Input, Spinner, Text } from "@chakra-ui/react"
// Components
import CopyToClipboard from "../CopyToClipboard"
import Emoji from "../Emoji"
import Link from "../Link"
import InfoBanner from "../InfoBanner"

interface Validator {
  validatorIndex: number
  withdrawalCredentials: string
  isUpgraded: boolean
  isTestnet?: boolean
}

interface IProps {}
const WithdrawalCredentials: FC<IProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [validator, setValidator] = useState<Validator | null>(null)

  const checkWithdrawalCredentials = async (isTestnet: boolean = false) => {
    setHasError(false)
    setIsLoading(true)
    const endpoint = `https://${
      isTestnet ? "goerli." : ""
    }beaconcha.in/api/v1/validator/${inputValue}`
    try {
      const response = await fetch(endpoint)
      const { data } = await response.json()
      const withdrawalCredentials = data.withdrawalcredentials
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
      setIsLoading(false)
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
    if (isLoading) return <Spinner />
    if (hasError)
      return (
        <Flex bg="errorNeutral" p={4}>
          <Text m={0} color="error">
            Oops! Double check validator index number and try again.
          </Text>
        </Flex>
      )
    if (!validator) return " "
    if (validator.isUpgraded)
      return (
        <Flex bg="successNeutral" p={4}>
          <Text m={0} color="success">
            <Text as="span" fontWeight="bold">
              Validator index {validator.validatorIndex} is ready to start
              receiving rewards!
            </Text>{" "}
            Withdrawal credentials linked to execution address{" "}
            <CopyToClipboard text={longAddress} inline>
              {(isCopied) => (
                <>
                  <Text as="span" title={longAddress} fontWeight="bold">
                    {shortAddress}
                  </Text>
                  {isCopied ? (
                    <>
                      <Emoji text="✅" fontSize="lg" mr={2} ml={2} />
                      <Text as="span" title={longAddress}>
                        Copied!
                      </Text>
                    </>
                  ) : (
                    <Emoji text="📋" fontSize="lg" mr={2} ml={2} />
                  )}
                </>
              )}
            </CopyToClipboard>
          </Text>
        </Flex>
      )
    return (
      <Flex bg="errorNeutral" p={4}>
        <Text m={0} color="error">
          <Text as="span" fontWeight="bold">
            This {validator.isTestnet ? "Goerli testnet" : ""} validator needs
            to be upgraded.
          </Text>{" "}
          Instructions on how to upgrade can be found at{" "}
          <Link to="https://launchpad.ethereum.org/withdrawals">
            Staking Launchpad Withdrawals
          </Link>
        </Text>
      </Flex>
    )
  }, [isLoading, hasError, validator, longAddress, shortAddress])

  return (
    <Flex direction="column" gap={4}>
      <Flex alignItems="center" gap={2} flexWrap="wrap">
        <Input
          size="lg"
          id="validatorIndex"
          value={inputValue}
          onChange={handleChange}
          w={{ base: "full", sm: "18ch" }}
          placeholder="Validator index"
          bg="background"
        />
        <Flex
          w={{ base: "full", sm: "fit-content" }}
          direction={{ base: "column", sm: "row" }}
          gap={2}
        >
          <Button
            onClick={() => checkWithdrawalCredentials()}
            disabled={!inputValue.length}
          >
            Verify on Mainnet
          </Button>
          <Button
            onClick={() => checkWithdrawalCredentials(true)}
            disabled={!inputValue.length}
            variant="outline"
          >
            Verify on Goerli
          </Button>
        </Flex>
      </Flex>
      {resultText}
    </Flex>
  )
}

export default WithdrawalCredentials
