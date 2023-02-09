// Libraries
import React, { useEffect, useState } from "react"
import { Box, Center, CloseButton } from "@chakra-ui/react"

// Components
import BannerNotification from "../BannerNotification"
import Emoji from "../Emoji"

// Interface
export interface IProps {
  children: JSX.Element
  storageKey: string
}

const DismissableBanner: React.FC<IProps> = ({ children, storageKey }) => {
  const [show, setShow] = useState<boolean>(true)

  useEffect(() => {
    const isDismissed = localStorage.getItem(storageKey) === "true"
    setShow(!isDismissed)
  }, [])

  const onClose = () => {
    localStorage.setItem(storageKey, "true")
    setShow(false)
  }

  return (
    <BannerNotification shouldShow={show}>
      <Center paddingRight={8} flexWrap="wrap">
        <Emoji marginRight={4} flexShrink={0} text=":tada:" w={4} h={4} />
        <Box paddingLeft="5px">{children}</Box>
      </Center>
      <CloseButton onClick={onClose} aria-label="Close Banner" float="right" />
    </BannerNotification>
  )
}

export default DismissableBanner
