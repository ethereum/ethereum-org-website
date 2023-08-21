import React, { ReactNode } from "react"
import {
  Box,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverContentProps,
  PopoverTrigger,
  useColorModeValue,
  useTooltip,
} from "@chakra-ui/react"
import * as utils from "../utils/isMobile"

const tooltipContentStyle: Omit<PopoverContentProps, "children"> = {
  maxW: 48,
  p: 2,
  bg: "background.highlight",
  fontSize: "sm",
  fontWeight: "normal",
  borderRadius: "base",
  cursor: "default",
  textAlign: "center",
  userSelect: "none",
  zIndex: "docked",
  outline: 0,
}

export interface IProps {
  content: ReactNode
  children?: React.ReactNode
}

const Tooltip: React.FC<IProps> = ({ content, children }) => {
  const { isOpen, hide, show } = useTooltip()
  const isMobile = utils.isMobile()
  const shadow = useColorModeValue("tableBox.light", "tableBox.dark")

  let hideTimeout: ReturnType<typeof setTimeout>

  const handleOpen = () => {
    if (hideTimeout) clearTimeout(hideTimeout)
    show()
  }

  const handleClose = () => {
    hideTimeout = setTimeout(() => {
      hide()
    }, 500)
  }

  const resetCloseTimeout = () => {
    if (hideTimeout) clearTimeout(hideTimeout)
    show()
  }

  return (
    <Box title="More Info!" display="inline-block" ml={2}>
      <Popover
        placement="top"
        trigger="hover"
        strategy="fixed"
        offset={[0, 6]}
        isOpen={isOpen}
      >
        <PopoverTrigger>
          <Center
            p={1}
            tabIndex={0}
            _focusVisible={{
              outline: "none",
              border: "2px",
              borderColor: "primary.hover",
              borderRadius: "full",
            }}
            sx={{
              "&:hover svg": {
                color: isMobile ? "primary.hover" : "primary.base",
              },
              "&:focus-visible svg": {
                color: "primary.base",
              },
              svg: {
                w: 3,
                h: 3,
                ml: 0,
                color: "body.base",
              },
            }}
            onMouseEnter={!isMobile ? handleOpen : undefined}
            onMouseLeave={!isMobile ? handleClose : undefined}
            onClick={isMobile ? () => (isOpen ? hide() : show()) : undefined}
            onBlur={isMobile ? hide : undefined}
          >
            {children}
          </Center>
        </PopoverTrigger>
        <PopoverContent
          {...tooltipContentStyle}
          boxShadow={shadow}
          onMouseEnter={!isMobile ? resetCloseTimeout : undefined}
          onMouseLeave={!isMobile ? handleClose : undefined}
        >
          <PopoverArrow bg="background.highlight" />
          <PopoverBody>{content}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default Tooltip
