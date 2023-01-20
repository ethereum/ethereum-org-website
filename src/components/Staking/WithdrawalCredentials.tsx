// Import libraries
import React, { FC, useState, useMemo } from "react"
import { useIntl } from "react-intl"
import {
  Box,
  Button,
  Flex,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
  useMediaQuery,
} from "@chakra-ui/react"
// Components
import Link from "../Link"
import Emoji from "../Emoji"
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"

interface Validator {
  validatorIndex: number
  pubKey: string
  withdrawalCredentials: string
  isUpgraded: boolean
}

interface IProps {}
const WithdrawalCredentials: FC<IProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<number>(1)
  const [validator, setValidator] = useState<Validator | null>(null)

  const checkWithdrawalCredentials = async () => {
    setHasError(false)
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://beaconcha.in/api/v1/validator/${inputValue}`
      )
      const { data } = await response.json()
      const withdrawalCredentials = data.withdrawalcredentials
      setValidator({
        validatorIndex: inputValue,
        pubKey: data.pubkey,
        withdrawalCredentials,
        isUpgraded: withdrawalCredentials.startsWith("0x01"),
      })
    } catch (error) {
      console.error(error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (value) => setInputValue(value.replace(/\D/g, ""))

  const longAddress = useMemo<string>(
    () => (validator ? `0x${validator.withdrawalCredentials.slice(-40)}` : ""),
    [validator]
  )
  const shortAddress = useMemo<string>(
    () =>
      longAddress ? `${longAddress.slice(0, 6)}…${longAddress.slice(-4)}` : "",
    [longAddress]
  )
  const resultText = useMemo<string | ReactJSXElement>(() => {
    if (isLoading) return <Spinner />
    if (hasError)
      return "Error fetching. Double check validator index number and try again."
    if (!validator) return " "
    if (validator.isUpgraded)
      return (
        <Text as="span">
          <Emoji text=":tada:" mr={1} />
          Congrats! This validator has been upgraded and will automatically
          receive rewards to{" "}
          <Text as="span" title={longAddress} fontWeight="bold">
            {shortAddress}
          </Text>{" "}
          when the Shanghai upgrade is complete.
        </Text>
      )
    return (
      <Text as="span">
        <Emoji text="⚠️" mr={1} />
        This validator has not been upgraded. Instructions on how to upgrade can
        be found at{" "}
        <Link to="https://launchpad.ethereum.org/withdrawals">
          Staking Launchpad Withdrawals
        </Link>
      </Text>
    )
  }, [isLoading, hasError, validator, longAddress, shortAddress])
  return (
    <Box>
      <Flex alignItems="center" gap={4}>
        <FormLabel htmlFor="validatorIndex">Your validator index:</FormLabel>
        <NumberInput
          size="lg"
          id="validatorIndex"
          value={inputValue}
          onChange={handleChange}
          min={1}
          maxW="20ch"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button onClick={checkWithdrawalCredentials}>Ready?</Button>
      </Flex>
      <Text mt={4}>{resultText}</Text>
    </Box>
  )
}

export default WithdrawalCredentials
