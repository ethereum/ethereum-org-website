import React from "react"
import { Flex } from "@chakra-ui/react"
import Emoji from "./Emoji"

export interface IProps {
  children?: React.ReactNode
  className?: string
  emoji?: string
  isWarning?: boolean
  shouldCenter?: boolean
  shouldSpaceBetween?: boolean
}

const InfoBanner: React.FC<IProps> = ({
  children,
  className,
  emoji,
  isWarning = false,
  shouldCenter = false,
  shouldSpaceBetween = false,
  ...props
}) => {
  const banner = (
    <Flex
      alignItems="center"
      p={6}
      borderRadius={0.5}
      maxW={shouldCenter ? "55rem" : "100%"}
      color="black300"
      bg={isWarning ? "warning" : "infoBanner"}
      direction={{ sm: "column" }}
      {...props}
    >
      {emoji && (
        <Emoji
          flexGrow="0"
          flexShrink="0"
          mr={{base : 6, sm: 0}}
          mb={{ sm: 2 }}
          alignSelf={{ sm: "flex-start" }}
          text={emoji}
          fontSize={"2em"}
        />
      )}
      <Flex
        display={{ base: shouldSpaceBetween ? "flex" : "block", sm: "block" }}
        alignItems={shouldSpaceBetween ? "center" : "auto"}
        w={shouldSpaceBetween ? "100%" : "auto"}
        justifyContent={shouldSpaceBetween ? "space-between" : "auto"}
      >
        {children}
      </Flex>
    </Flex>
  )
  return shouldCenter ? <Flex justify="center">{banner}</Flex> : banner
}

export default InfoBanner
