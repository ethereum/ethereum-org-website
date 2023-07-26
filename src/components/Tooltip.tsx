import React, { ReactNode, useState } from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"
import * as utils from "../utils/isMobile"

export interface IProps {
  content: ReactNode
  children?: React.ReactNode
}

// TODO add `position` prop
const Tooltip: React.FC<IProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const isMobile = utils.isMobile()
  const shadow = useColorModeValue("tableBox.light", "tableBox.dark")

  return (
    <>
      {isVisible && isMobile && (
        // Invisible full screen div "below" the clickable link
        // Added so clicking away anywhere will hide Tooltip
        <Box
          position="fixed"
          top={0}
          left={0}
          w="full"
          h="full"
          zIndex={1}
          onClick={() => setIsVisible(false)}
        />
      )}
      <Box
        position="relative"
        display="inline-flex"
        userSelect="none"
        cursor="pointer"
        title="More info"
        onMouseEnter={!isMobile ? () => setIsVisible(true) : undefined}
        onMouseLeave={!isMobile ? () => setIsVisible(false) : undefined}
        onClick={isMobile ? () => setIsVisible(!isVisible) : undefined}
      >
        {children}
        {isVisible && (
          <Box
            textAlign="center"
            whiteSpace="normal"
            w={{ base: "140px", md: "200px" }}
            color="text"
            bg="background.base"
            boxShadow={shadow}
            position="absolute"
            zIndex="docked"
            py={4}
            px={2}
            textTransform="none"
            fontSize="sm"
            fontWeight="medium"
            cursor="default"
            borderRadius="base"
            bottom="125%"
            left="25%"
            transform="translateX(-50%)"
          >
            <Box
              as="span"
              position="absolute"
              bottom={-2}
              left="calc(50% - 6px)"
              borderRightWidth={10}
              borderRightStyle="solid"
              borderRightColor="transparent"
              borderTopWidth={10}
              borderTopStyle="solid"
              borderTopColor="background.base"
              borderLeftWidth={10}
              borderLeftStyle="solid"
              borderLeftColor="transparent"
            />
            {content}
          </Box>
        )}
      </Box>
    </>
  )
}

export default Tooltip
