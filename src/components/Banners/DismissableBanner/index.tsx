import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"

import { Button } from "@/components/ui/buttons/Button"
import { Center } from "@/components/ui/flex"

import BannerNotification from "../BannerNotification"

export type DismissableBannerProps = {
  children: JSX.Element
  storageKey: string
}

const DismissableBanner = ({
  children,
  storageKey,
}: DismissableBannerProps) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem(storageKey) === "true"
    setShow(!isDismissed)
  }, [storageKey])

  const onClose = () => {
    localStorage.setItem(storageKey, "true")
    setShow(false)
  }

  return (
    <BannerNotification shouldShow={show} className="gap-8">
      <Center className="ms-auto">{children}</Center>
      <Button className="ms-auto" onClick={onClose} aria-label="Close Banner">
        <MdClose />
      </Button>
    </BannerNotification>
  )
}

export default DismissableBanner
