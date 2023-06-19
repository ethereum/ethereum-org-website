import React, { useState, useEffect } from "react"
import { MATOMO_LS_KEY } from "../utils/matomo"
import { Checkbox, Flex, Text } from "@chakra-ui/react"

export interface IProps {}

const MatomoOptOut: React.FC<IProps> = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isOptedOut, setIsOptedOut] = useState<boolean>(false)

  useEffect(() => {
    // Load user choice for Matomo tracking from localStorage
    const savedOptOut = JSON.parse(localStorage.getItem(MATOMO_LS_KEY)!)
    // If saved opt-out selection is `true` then set this as local checkbox state
    // Else, instantiate localStorage value to `false`
    if (savedOptOut) {
      setIsOptedOut(true)
    } else {
      localStorage.setItem(MATOMO_LS_KEY, "false")
    }
    setLoading(false)
  }, [])

  const handleCheckbox = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    // Set local opt-out state based on check mark
    // Note: `checked` in the UI refers to being opted-in
    setIsOptedOut(!checked)
    // Save selection to localStorage
    localStorage.setItem(MATOMO_LS_KEY, String(!checked))
  }
  return (
    <Flex
      border="1px solid"
      borderColor="border"
      bgColor="background.base"
      borderRadius="base"
      p={6}
      direction="column"
      mb={4}
      mt={8}
      align="flex-start"
      justify="space-between"
    >
      <Text color="fail">
        You can opt out of being tracked by Matomo Analytics and prevent the
        website from analysing the actions you take using the website. This will
        prevent us from learning from your actions and creating a better website
        experience for you and other users.
      </Text>
      {loading ? (
        "Loading preferences..."
      ) : (
        <Checkbox
          type="checkbox"
          id="matomo"
          isChecked={!isOptedOut}
          onChange={handleCheckbox}
          mr={2}
          size="md"
        >
          {isOptedOut
            ? "You are opted out. Check this box to opt-in."
            : "You are not opted out. Uncheck this box to opt-out."}
        </Checkbox>
      )}
    </Flex>
  )
}

export default MatomoOptOut
