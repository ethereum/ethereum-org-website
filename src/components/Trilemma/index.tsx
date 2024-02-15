import { useTranslation } from "next-i18next"
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Hide,
  Stack,
} from "@chakra-ui/react"

import Card from "@/components/Card"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"

import { TriangleSVG, TriangleSVGProps } from "./Triangle"
import { useTrilemma } from "./useTrilemma"

const Trilemma = () => {
  const { t } = useTranslation("page-roadmap-vision")

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
        <OldHeading fontSize="2rem" mt={0}>
          {t("page-roadmap-vision-trilemma-h2")}
        </OldHeading>
        <Text>{t("page-roadmap-vision-trilemma-p")}</Text>
        <Text>{t("page-roadmap-vision-trilemma-p-1")}</Text>
        <Text>{t("page-roadmap-vision-trilemma-p-2")}</Text>
        <Text fontWeight={600} hideFrom="lg">
          {t("page-roadmap-vision-trilemma-modal-tip")}:
        </Text>
        <Card {...cardDetail} mt={8} minH="300px" hideBelow="lg" />
      </Stack>
      <Hide above="lg">
        <Drawer
          isOpen={mobileModalOpen}
          onClose={handleModalClose}
          placement="bottom"
        >
          <DrawerOverlay background="rgba(0,0,0,0.3)" />
          <DrawerContent borderTopRadius="2xl" background="background.base">
            <Card {...cardDetail} background="none" border="none" my="8" />
            <DrawerCloseButton top="6" insetInlineEnd="6" />
          </DrawerContent>
        </Drawer>
      </Hide>
      <TriangleSVG {...triangleSVGProps} />
    </Flex>
  )
}

export default Trilemma
