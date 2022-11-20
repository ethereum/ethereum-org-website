import React, { ReactNode, useState } from "react"
import styled from "@emotion/styled"
import { Box, calc } from "@chakra-ui/react"
import * as utils from "../utils/isMobile"

const Arrow = styled.span`
  position: absolute;
  bottom: -0.5rem;
  left: calc(50% - 6px);
  border-right: 10px solid transparent;
  border-top: 10px solid ${({ theme }) => theme.colors.background};
  border-left: 10px solid transparent;
`

// Invisible full screen div "below" the clickable link
// Added so clicking away anywhere will hide Tooltip
const ModalReturn = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

export interface IProps {
  content: ReactNode
  children?: React.ReactNode
}

// TODO add `position` prop
const Tooltip: React.FC<IProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const isMobile = utils.isMobile()

  return (
    <>
      {isVisible && isMobile && (
        <ModalReturn onClick={() => setIsVisible(false)} />
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
            bg="background"
            boxShadow="tableBoxShadow"
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
            <Arrow />
            {content}
          </Box>
        )}
      </Box>
    </>
  )
}

export default Tooltip
