import { useTranslation } from "next-i18next"
import { DrawerCloseButton, DrawerHeader, Flex } from "@chakra-ui/react"

const MenuHeader = () => {
  const { t } = useTranslation("common")

  return (
    <Flex p="6" alignItems="center" justify="space-between">
      <DrawerHeader
        fontWeight="regular"
        fontSize="md"
        color="body.medium"
        textTransform="uppercase"
        p="0"
      >
        {t("site-title")}
      </DrawerHeader>
      <DrawerCloseButton fontSize="md" w="fit-content" p="2" mt="3" me="2">
        {t("close")}
      </DrawerCloseButton>
    </Flex>
  )
}

export default MenuHeader
