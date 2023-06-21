import React from "react"
import { Flex, FlexProps, Text } from "@chakra-ui/react"
import Emoji from "./Emoji"

export interface IProps extends FlexProps {
  children?: React.ReactNode
  className?: string
  emoji?: string
  isWarning?: boolean
  shouldCenter?: boolean
  shouldSpaceBetween?: boolean
  title?: string
}

const InfoBanner: React.FC<IProps> = ({
  children,
  className,
  emoji,
  isWarning = false,
  shouldCenter = false,
  shouldSpaceBetween = false,
  title,
  ...props
}) => {
  const banner = (
    <Flex
      align="center"
      p={6}
      borderRadius={"sm"}
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
          flexGrow="0"
          flexShrink="0"
          mr={{ base: 0, sm: 6 }}
          mb={{ base: 2, sm: 0 }}
          alignSelf={{ base: "flex-start", sm: "auto" }}
          text={emoji}
          fontSize="4xl"
        />
      )}
      <Flex
        display={{ base: "block", sm: shouldSpaceBetween ? "flex" : "block" }}
        align={shouldSpaceBetween ? "center" : "auto"}
        w={shouldSpaceBetween ? "100%" : "auto"}
        justify={shouldSpaceBetween ? "space-between" : "auto"}
      >
        {title && (
          <Text fontSize="lg" fontWeight="700">
            {title}
          </Text>
        )}
        {children}
      </Flex>
    </Flex>
  )
  return shouldCenter ? <Flex justify="center">{banner}</Flex> : banner
}

export default InfoBanner
