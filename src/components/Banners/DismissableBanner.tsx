// Libraries
import React, { useEffect, useState } from "react"
import { Center, CloseButton } from "@chakra-ui/react"

// Components
import BannerNotification from "../BannerNotification"
import Emoji from "../Emoji"

// Interface
export interface IProps {
  children: JSX.Element
  storageKey: string
}

const DismissableBanner: React.FC<IProps> = ({ children, storageKey }) => {
  const [show, setShow] = useState<boolean>(false)

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
      <Center paddingEnd={8}>
        <Emoji marginEnd={4} flexShrink={0} text=":tada:" />
        {children}
      </Center>
      <CloseButton onClick={onClose} aria-label="Close Banner" />
    </BannerNotification>
  )
}

export default DismissableBanner
