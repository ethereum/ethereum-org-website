import { useTranslation } from "next-i18next"
import { Box, Text } from "@chakra-ui/react"

import OldHeading from "@/components/OldHeading"

interface IProps {
  term: string
  size?: "md" | "sm"
}

const GlossaryDefinition: React.FC<IProps> = ({ term, size = "md" }) => {
  const { t } = useTranslation("glossary")

  const headingStyles =
    size === "sm"
      ? { fontSize: "md", mt: 0, mb: 2 }
      : { fontSize: { base: "xl", md: "2xl" } }

  const textStyles = size === "sm" ? { mb: 0 } : {}

  return (
    <Box>
      <OldHeading as="h3" lineHeight={1.4} id={term} {...headingStyles}>
        {t(`${term}-term`)}
      </OldHeading>
      <Text {...textStyles}>{t(`${term}-definition`)}</Text>
    </Box>
  )
}

export default GlossaryDefinition
