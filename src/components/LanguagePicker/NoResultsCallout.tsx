import { useTranslation } from "next-i18next"
import { FormHelperText, forwardRef, Text } from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"

import MenuItem from "./MenuItem"

type NoResultsCalloutProps = { onClose: () => void }

const NoResultsCallout = forwardRef(
  ({ onClose }: NoResultsCalloutProps, ref) => {
    const { t } = useTranslation("common")
    return (
      <FormHelperText color="body.medium" lineHeight="base" fontSize="md">
        <Text fontWeight="bold" mb="2" color="body.base">
          {t("page-languages-want-more-header")}
        </Text>
        {t("page-languages-want-more-paragraph")}{" "}
        <BaseLink
          ref={ref}
          as={MenuItem}
          key="item-no-results"
          href="contributing/translation-program"
          onClick={onClose}
        >
          {t("page-languages-want-more-link")}
        </BaseLink>
      </FormHelperText>
    )
  }
)

export default NoResultsCallout
