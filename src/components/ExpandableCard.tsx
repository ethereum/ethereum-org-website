// Libraries
import { ReactNode, useState } from "react"
import { useTranslation } from "next-i18next"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Icon,
} from "@chakra-ui/react"

// Components
import Text from "./OldText"

// Utils
// TODO: add trackCustomEvent when util is migrated
// import { trackCustomEvent } from "../utils/matomo"

export interface IProps {
  children?: React.ReactNode
  contentPreview?: ReactNode
  title: ReactNode
  svg?: typeof Icon
  eventAction?: string
  eventCategory?: string
  eventName?: string
}

const ExpandableCard: React.FC<IProps> = ({
  children,
  contentPreview,
  title,
  svg: Svg,
  eventAction = "Clicked",
  eventCategory = "",
  eventName = "",
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation("common")
  const matomo = {
    eventAction,
    eventCategory: `ExpandableCard${eventCategory}`,
    eventName,
  }
  const onClick = () => {
    // Card will not collapse if clicking on a link or selecting text
    if (
      window.getSelection()?.toString().length === 0 &&
      !(window.event?.target as HTMLDivElement)?.className.includes(
        "ExternalLink"
      )
    ) {
      // TODO: add trackCustomEvent
      // !isVisible && trackCustomEvent(matomo)
      setIsVisible(!isVisible)
    }
  }

  return (
    <Accordion
      border="1px solid"
      borderColor="border"
      borderRadius="sm"
      display="flex"
      flex-direction="column"
      marginBottom="4"
      cursor="pointer"
      _hover={{
        backgroundColor: "ednBackground",
      }}
      borderBottomWidth="0"
      index={isVisible ? [0] : []}
    >
      <AccordionItem borderTopWidth="0" flex="1">
        <Heading as="h3" m={0}>
          <AccordionButton
            width="100%"
            p={6}
            flex="1"
            onClick={onClick}
            _hover={{
              backgroundColor: "ednBackground",
            }}
          >
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              flexDir={{ base: "column", sm: "row" }}
              textAlign="start"
            >
              <Box
                marginBottom={{ base: 2, sm: 0 }}
                me={{ base: 0, sm: 4 }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    svg: { me: "1.5rem" },
                  }}
                  my="4"
                >
                  {!!Svg && <Svg />}
                  <Text fontSize="xl" fontWeight="semibold" flex="1" m="0">
                    {title}
                  </Text>
                </Box>
                <Text
                  fontSize="sm"
                  color="text200"
                  marginBottom="0"
                  width="fit-content"
                >
                  {contentPreview}
                </Text>
              </Box>
              <Text
                fontSize="md"
                color="primary.base"
                ms={{ base: undefined, sm: "auto" }}
                mt="auto"
                mb="auto"
              >
                {t(isVisible ? "less" : "more")}
              </Text>
            </Box>
          </AccordionButton>
        </Heading>
        <AccordionPanel
          paddingX="6"
          paddingBottom="6"
          paddingTop="0"
          onClick={onClick}
        >
          <Box
            fontSize="md"
            color="text"
            paddingTop="6"
            borderTop="1px solid"
            borderColor="border"
          >
            {children}
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ExpandableCard
