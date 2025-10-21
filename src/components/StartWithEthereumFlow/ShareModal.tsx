"use client"

import { useState } from "react"
import { Check, Link } from "lucide-react"
import { useTranslations } from "next-intl"

import Twitter from "@/components/icons/twitter.svg"
import { Button } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-modal"

import { useClipboard } from "@/hooks/useClipboard"

export const shareOnTwitter = (tweetText: string): void => {
  const hashtags = ["ethereum", "web3", "startwithethereum"]
  const tweet = encodeURI(tweetText)

  window.open(
    `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}`
  )
}

const ShareModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { onCopy, hasCopied } = useClipboard()
  const t = useTranslations("page-start")

  const handleTwitterShare = () => {
    const url = "https://ethereum.org/start"
    const tweetText = t("page-start-share-modal-tweet-text", { url })
    shareOnTwitter(tweetText)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>{t("page-start-share-modal-trigger")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("page-start-share-modal-title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("page-start-share-modal-description")}
        </DialogDescription>
        <div className="flex flex-row justify-center">
          <Button
            onClick={() => onCopy(window.location.href)}
            variant="ghost"
            className="flex flex-col hover:bg-background-highlight"
          >
            {hasCopied ? (
              <>
                <Check />
                <p className="text-sm">{t("page-start-share-modal-copied")}</p>
              </>
            ) : (
              <>
                <Link />
                <p className="text-sm">{t("page-start-share-modal-share")}</p>
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col hover:bg-background-highlight"
            onClick={handleTwitterShare}
          >
            <Twitter />
            <p className="text-sm">{t("page-start-share-modal-twitter")}</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareModal
