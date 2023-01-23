// Import libraries
import React, { FC, useState, useMemo } from "react"
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Switch,
  Text,
} from "@chakra-ui/react"
// Components
import CopyToClipboard from "../CopyToClipboard"
import Emoji from "../Emoji"
import Link from "../Link"
import Translation from "../../components/Translation"

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
  const [inputValue, setInputValue] = useState<number>(0)
  const [validator, setValidator] = useState<Validator | null>(null)
  const [isTestnet, setIsTestnet] = useState<boolean>(false)

  const checkWithdrawalCredentials = async () => {
    setHasError(false)
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://${
          isTestnet ? "goerli." : ""
        }beaconcha.in/api/v1/validator/${inputValue}`
      )
      const { data } = await response.json()
      const withdrawalCredentials = data.withdrawalcredentials
      setValidator({
        validatorIndex: inputValue,
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

  const handleChange = (value: string) =>
    setInputValue(parseInt(value.replace(/\D/g, "")))
  const handleNetworkToggle = () => setIsTestnet((prev) => !prev)

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
      return "Error fetching. Double check validator index number and try again."
    if (!validator) return " "
    if (validator.isUpgraded)
      return (
        <>
          <Text>
            Withdrawal address:{" "}
            <Text as="span" title={longAddress} fontWeight="bold">
              {longAddress}
            </Text>
          </Text>
          <Text>
            <Emoji text=":tada:" mr={1} />
            Congrats! This validator has been upgraded and will automatically
            receive rewards to{" "}
            <Text as="span" title={longAddress} fontWeight="bold">
              {shortAddress}
            </Text>{" "}
            when the Shanghai upgrade is complete.
          </Text>
        </>
      )
    return (
      <Text as="span">
        <Emoji text="⚠️" mr={1} />
        This {validator.isTestnet ? "Goerli testnet" : ""} validator has not
        been upgraded. Instructions on how to upgrade can be found at{" "}
        <Link to="https://launchpad.ethereum.org/withdrawals">
          Staking Launchpad Withdrawals
        </Link>
      </Text>
    )
  }, [isLoading, hasError, validator, longAddress, shortAddress])

  return (
    <Flex direction="column" gap={4}>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="mainnet-testnet" mb={0} me={2}>
          Mainnet
        </FormLabel>
        <Switch
          id="mainnet-testnet"
          onChange={handleNetworkToggle}
          sx={{
            "&>[data-checked]": {
              background: "switchBackground !important",
            },
          }}
        />
        <FormLabel htmlFor="mainnet-testnet" mb={0} ms={2}>
          Goerli testnet
        </FormLabel>
      </FormControl>
      <Flex alignItems="center" gap={4}>
        <FormLabel htmlFor="validatorIndex">Your validator index:</FormLabel>
        <NumberInput
          size="lg"
          id="validatorIndex"
          value={inputValue}
          onChange={handleChange}
          min={0}
          maxW="20ch"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button onClick={checkWithdrawalCredentials}>Check account</Button>
        {validator?.isUpgraded && (
          <CopyToClipboard text={longAddress}>
            {(isCopied) => (
              <Button variant="outline">
                {!isCopied ? (
                  <div>
                    <Emoji text=":clipboard:" />{" "}
                    <Translation id="page-staking-deposit-contract-copy" />
                  </div>
                ) : (
                  <div>
                    <Emoji text=":white_check_mark:" />{" "}
                    <Translation id="page-staking-deposit-contract-copied" />
                  </div>
                )}
              </Button>
            )}
          </CopyToClipboard>
        )}
      </Flex>
      <Text mt={4}>{resultText}</Text>
    </Flex>
  )
}

export default WithdrawalCredentials
