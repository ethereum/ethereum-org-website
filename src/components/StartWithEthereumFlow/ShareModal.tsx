"use client"

import { useState } from "react"
import { Check, Link } from "lucide-react"

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

export const shareOnTwitter = (): void => {
  const url = "https://ethereum.org/start"
  const hashtags = ["ethereum", "web3", "startwithethereum"]
  const tweet = `${encodeURI(`I connected to ethereum on ethereum.org! Try it yourself at ${url}`)}`

  window.open(
    `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}`
  )
}

const ShareModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { onCopy, hasCopied } = useClipboard()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Share this page</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this page</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Share this page with your friends and family.
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
                <p className="text-sm">Copied!</p>
              </>
            ) : (
              <>
                <Link />
                <p className="text-sm">Share</p>
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col hover:bg-background-highlight"
            onClick={() => shareOnTwitter()}
          >
            <Twitter />
            <p className="text-sm">Twitter</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ShareModal
