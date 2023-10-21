import React from "react"
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Hide,
  Stack,
  useToken,
} from "@chakra-ui/react"
import Card from "../Card"
import Translation from "../Translation"
import Text from "../OldText"
import OldHeading from "../OldHeading"
import { TriangleSVG, IProps as TriangleSVGProps } from "./Triangle"
import { useTrilemma } from "./useTrilemma"

export interface IProps {}

const Trilemma: React.FC<IProps> = () => {
  const {
    trilemmaChecks,
    mobileModalOpen,
    handleClick,
    handleModalClose,
    cardDetail,
  } = useTrilemma()

  const triangleSVGProps: TriangleSVGProps = {
    handleClick,
    ...trilemmaChecks,
  }

  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  return (
    <Flex
      alignItems="center"
      flexDirection={{ base: "column", lg: "row" }}
      gap={12}
      py={12}
      pl={{ lg: 12 }}
      pr={{ lg: 32 }}
    >
      <Stack
        gap={8}
        py={{ lg: 8 }}
        px={{ base: 12, lg: 0 }}
        flex={{
          lg: "0 1 500px",
        }}
      >
        <Box>
          <OldHeading fontSize="2rem" mt={0}>
            <Translation id="page-roadmap-vision-trilemma-h2" />
          </OldHeading>
          <Text>
            <Translation id="page-roadmap-vision-trilemma-p" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-trilemma-p-1" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-trilemma-p-2" />
          </Text>
          <Text fontWeight={600} hideFrom="lg">
            <Translation id="page-roadmap-vision-trilemma-modal-tip" />:
          </Text>
        </Box>
        <Card {...cardDetail} minH="300px" hideBelow="lg" />
      </Stack>
      <Hide above={lgBp}>
        <Drawer
          isOpen={mobileModalOpen}
          onClose={handleModalClose}
          placement="bottom"
        >
          <DrawerOverlay background="rgba(0,0,0,0.3)" />
          <DrawerContent borderTopRadius="1rem" background="background.base">
            <Card {...cardDetail} background="none" border="none" my={8} />
            <DrawerCloseButton top={6} right={6} />
          </DrawerContent>
        </Drawer>
      </Hide>
      <TriangleSVG {...triangleSVGProps} />
    </Flex>
  )
}

export default Trilemma
