import { useTranslation } from "next-i18next"
import { Box, Text } from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"

import MenuItem from "./MenuItem"

type NoResultsCalloutProps = { onClose: () => void }

const NoResultsCallout = ({ onClose }: NoResultsCalloutProps) => {
  const { t } = useTranslation("page-languages")
  return (
    <Box>
      <Text fontWeight="bold" mb="2">
        {t("page-languages-want-more-header")}
      </Text>
      {t("page-languages-want-more-paragraph")}{" "}
      <BaseLink
        as={MenuItem}
        key="item-no-results"
        href="contributing/translation-program"
        onClick={onClose}
      >
        {t("page-languages-want-more-link")}
      </BaseLink>
    </Box>
  )
}

export default NoResultsCallout
