import { Box, Flex } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import Callout from "@/components/Callout"

import DolphinImage from "@/public/images/translatathon_dolphin.png"

// TODO: Confirm deadline for applying

export const ApplyNow = () => {
  const dateToday = new Date()
  const deadline = new Date("August 3, 2024")

  if (dateToday < deadline) {
    return (
      <Box pt={12}>
        <Callout
          flex="1 1 416px"
          image={DolphinImage}
          titleKey="page-translatathon:translatathon-apply-now"
          descriptionKey="page-translatathon:translatathon-apply-now-desc"
          alignItems="center"
          textAlign='center'
        >
          <Flex m="auto">
            <ButtonLink href="/">
              Apply now
            </ButtonLink>
          </Flex>
        </Callout>
      </Box>
    )
  } else {
    return <></>
  }
}