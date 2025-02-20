import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"

import { Button } from "@/components/ui/buttons/Button"
import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import BannerNotification from "../BannerNotification"

import { useTranslation } from "@/hooks/useTranslation"

type DismissableBannerProps = React.HTMLAttributes<HTMLDivElement> & {
  storageKey: string
}

const DismissableBanner = ({
  children,
  storageKey,
  className,
}: DismissableBannerProps) => {
  const { t } = useTranslation("common")
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
        className="ms-auto hover:shadow-none"
        onClick={onClose}
        aria-label={t("close")}
        size="sm"
      >
        <MdClose />
      </Button>
    </BannerNotification>
  )
}

export default DismissableBanner
