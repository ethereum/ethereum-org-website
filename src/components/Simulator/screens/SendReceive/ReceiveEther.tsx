import { motion } from "framer-motion"

import EthGlyph from "@/components/icons/eth-glyph-solid.svg"
import { TwImage } from "@/components/Image"
import { Button } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { FAKE_DEMO_ADDRESS } from "../../constants"
import { NotificationPopover } from "../../NotificationPopover"

import QrImage from "@/public/images/qr-code-ethereum-org.png"

export const ReceiveEther = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="h-full bg-background-highlight px-4 py-6 text-sm md:px-6 md:py-8 md:text-md"
  >
    <p className="mb-3 text-xl font-bold md:mb-6 md:text-2xl">Receive assets</p>
    <p className="mb-3 md:mb-5">
      Show this QR code containing your account address to the sender
    </p>
    {/* QR Code */}
    <NotificationPopover
      title="Example walkthrough"
      content="Share QR containing your address (public identifier) from your own wallet when finished here"
      side="top"
    >
      <div className="relative mx-auto mb-3 w-fit bg-background p-3 md:mb-5">
        <TwImage
          alt=""
          src={QrImage}
          className="size-[6rem] rounded p-1 md:size-[7.5rem] dark:invert"
        />
        <div className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary-action" />
        <EthGlyph className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 transform text-white" />
      </div>
    </NotificationPopover>
    <Flex className="relative mb-3 w-full items-center justify-between gap-2 rounded border px-3 py-2 md:mb-5">
      <div>
        <p className="m-0 text-xs text-body-medium">Your Ethereum address</p>
        <p className="m-0 text-sm">{FAKE_DEMO_ADDRESS}</p>
      </div>
      <NotificationPopover
        title="Example walkthrough"
        content="Share your address (public identifier) from your own wallet when finished here"
        side="top"
        align="end"
      >
        <Button className="h-fit rounded-lg bg-body-light px-2 py-1.5 text-xs font-bold text-body">
          Copy
        </Button>
      </NotificationPopover>
    </Flex>
    <p className="m-0 text-xs">
      Use this address for receiving tokens and NFTs on the Ethereum network.
    </p>
  </motion.div>
)
