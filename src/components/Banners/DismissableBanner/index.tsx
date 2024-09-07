import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"

import { Button } from "@/components/ui/buttons/Button"
import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import BannerNotification from "../BannerNotification"

type DismissableBannerProps = React.HTMLAttributes<HTMLDivElement> & {
  storageKey: string
}

const DismissableBanner = ({
  children,
  storageKey,
  className,
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
    <BannerNotification shouldShow={show} className={cn("gap-8", className)}>
      <Center className="ms-auto">{children}</Center>
      <Button
        className="ms-auto"
        onClick={onClose}
        aria-label="Close Banner"
        variant="ghost"
      >
        <MdClose />
      </Button>
    </BannerNotification>
  )
}

export default DismissableBanner
