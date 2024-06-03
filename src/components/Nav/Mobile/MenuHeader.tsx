import { useTranslation } from "next-i18next"
import { Box, DrawerCloseButton, DrawerHeader, Flex } from "@chakra-ui/react"

const MenuHeader = () => {
  const { t } = useTranslation("common")

  return (
    <Flex p="6" alignItems="center" justify="space-between">
      <Box
        fontWeight="regular"
        fontSize="md"
        color="body.medium"
        textTransform="uppercase"
        p="0"
      >
        {t("site-title")}
      </Box>
      <label htmlFor="css-drawer-toggle" className="drawer-toggle-label">
        {t("close")}
      </label>
      {/* <Box fontSize="md" w="fit-content" p="2" mt="3" me="2">
        {t("close")}
      </Box> */}
    </Flex>
  )
}

export default MenuHeader
