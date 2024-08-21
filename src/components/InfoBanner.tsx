import type { ReactNode } from "react"
import { Flex, type FlexProps, LightMode } from "@chakra-ui/react"

import Emoji from "@/components/Emoji"
import Text from "@/components/OldText"

type InfoBannerProps = FlexProps & {
  children?: ReactNode
  emoji?: string
  isWarning?: boolean
  shouldCenter?: boolean
  shouldSpaceBetween?: boolean
  title?: string
}

const InfoBanner = ({
  children,
  emoji,
  isWarning,
  shouldCenter,
  shouldSpaceBetween,
  title,
  ...props
}: InfoBannerProps) => {
  const banner = (
    <LightMode>
      <Flex
        align="center"
        p="6"
        borderRadius="sm"
        maxW={shouldCenter ? "55rem" : "100%"}
        sx={{
          ":not(button)": {
            color: "black300 !important",
          },
        }}
        bg={isWarning ? "warning" : "infoBanner"}
        direction={{ base: "column", sm: "row" }}
        {...props}
      >
        {emoji && (
          <Emoji
            className="mb-2 me-0 flex-shrink-0 flex-grow-0 self-start text-4xl sm:mb-0 sm:me-6 sm:self-auto"
            text={emoji}
          />
        )}
        <Flex
          display={{ base: "block", sm: shouldSpaceBetween ? "flex" : "block" }}
          align={shouldSpaceBetween ? "center" : "auto"}
          w={shouldSpaceBetween ? "100%" : "auto"}
          justify={shouldSpaceBetween ? "space-between" : "auto"}
        >
          {title && (
            <Text fontSize="lg" fontWeight="bold">
              {title}
            </Text>
          )}
          {children}
        </Flex>
      </Flex>
    </LightMode>
  )
  return shouldCenter ? <Flex justify="center">{banner}</Flex> : banner
}

export default InfoBanner
