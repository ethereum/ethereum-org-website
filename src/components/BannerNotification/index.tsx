import React from "react"
import { Center, FlexProps, useMediaQuery } from "@chakra-ui/react"

import { lightTheme as oldTheme } from "../../theme"

export type BannerNotificationProps = FlexProps & {
  shouldShow?: boolean
}

const BannerNotification = ({
  children,
  shouldShow = false,
  ...props
}: BannerNotificationProps) => {
  const [isLGScreen] = useMediaQuery(`min-width: ${oldTheme.breakpoints.l}`)
  return (
    <>
      {shouldShow && (
        <Center
          as="aside"
          maxW={isLGScreen ? oldTheme.variables.maxPageWidth : "100%"}
          w="100%"
          py="4"
          px="8"
          bg="primary.base"
          color="background.base"
          sx={{
            a: {
              color: "background.base",
            },
          }}
          {...props}
        >
          {children}
        </Center>
      )}
    </>
  )
}

export default BannerNotification
