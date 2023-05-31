import React from "react"
import { Center, FlexProps, useMediaQuery } from "@chakra-ui/react"
import { lightTheme as oldTheme } from "../../theme"

export interface IProps extends FlexProps {
  shouldShow?: boolean
}

const BannerNotification: React.FC<IProps> = ({
  children,
  shouldShow = false,
  ...props
}) => {
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
          bg="primary"
          color="background"
          sx={{
            a: {
              color: "background",
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
