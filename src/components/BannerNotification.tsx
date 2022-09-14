import React from "react"
import { Flex, useMediaQuery } from "@chakra-ui/react"
import { lightTheme as oldTheme } from "../theme"

export interface IProps {
  children?: React.ReactNode
  shouldShow?: boolean
  className?: string
}

const BannerNotification: React.FC<IProps> = ({
  children,
  className,
  shouldShow = false,
}) => {
  const [isLGScreen] = useMediaQuery(`min-width: ${oldTheme.breakpoints.l}`)

  return (
    <>
      {shouldShow && (
        <Flex
          className={className}
          maxW={isLGScreen ? oldTheme.variables.maxPageWidth : "100%"}
          w="100%"
          py="4"
          px="8"
          bg="primary"
          color="background"
          borderBottom="1px solid primary"
          sx={{
            a: {
              color: "background",
            },
          }}
        >
          {children}
        </Flex>
      )}
    </>
  )
}

export default BannerNotification
