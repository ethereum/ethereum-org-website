import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Hide,
  Show,
  Text,
} from "@chakra-ui/react"
import React from "react"
import Card from "../Card"
import Translation from "../Translation"
import { TriangleSVG, IProps as TriangleSVGProps } from "./Triangle"
import { useTrilemma } from "./use-trilemma"

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

  return (
    <Flex
      alignItems="flex-start"
      flexDirection={{ base: "column", lg: "row" }}
      justifyContent="space-between"
    >
      <Flex
        flexDirection="column"
        my={{ base: 8, md: 12 }}
        mx={{ md: 12 }}
        py={8}
        flex={{
          base: "1 1 100%",
          lg: "0 1 500px",
        }}
      >
        <Heading fontSize="2rem" mt={0}>
          <Translation id="page-upgrades-vision-trilemma-h2" />
        </Heading>
        <Text>
          <Translation id="page-upgrades-vision-trilemma-p" />
        </Text>
        <Text>
          <Translation id="page-upgrades-vision-trilemma-p-1" />
        </Text>
        <Text>
          <Translation id="page-upgrades-vision-trilemma-p-2" />
        </Text>
        {/* TODO: replace `l` with `lg` after UI migration */}
        <Show below="l">
          <Text fontWeight={600}>
            <Translation id="page-upgrades-vision-trilemma-modal-tip" />:
          </Text>
        </Show>
        {/* TODO: replace `l` with `lg` after UI migration */}
        <Hide below="l">
          <Card {...cardDetail} mt={8} minH="300px" />
        </Hide>
      </Flex>
      {/* TODO: replace `l` with `lg` after UI migration */}
      <Hide above="l">
        <Drawer
          isOpen={mobileModalOpen}
          onClose={handleModalClose}
          placement="bottom"
        >
          <DrawerOverlay background="rgba(0,0,0,0.3)" />
          <DrawerContent
            border="none"
            borderTopRadius="1rem"
            background="background"
          >
            <Card
              {...cardDetail}
              background="none"
              border="none"
              justifyContent="flex-start"
              my={8}
            />
            <DrawerCloseButton top={6} right={6} />
          </DrawerContent>
        </Drawer>
      </Hide>
      <TriangleSVG {...triangleSVGProps} />
    </Flex>
  )
}

export default Trilemma
