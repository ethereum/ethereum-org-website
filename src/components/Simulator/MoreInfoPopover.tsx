import { type ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { MdClose, MdInfoOutline } from "react-icons/md"

import { Button } from "../ui/buttons/Button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

import { PulseAnimation } from "./PulseAnimation"

const MotionButton = motion(Button)

type MoreInfoPopover = {
  isFirstStep: boolean
  children: ReactNode
}
export const MoreInfoPopover = ({ isFirstStep, children }: MoreInfoPopover) => {
  const [clicked, setClicked] = useState(false)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MotionButton
          variant="ghost"
          className="relative min-h-0 p-0 text-sm text-body-medium"
          onClick={() => setClicked(true)}
          data-testid="more-info-popover-trigger"
        >
          More info
          <MdInfoOutline size={24} />
          {isFirstStep && !clicked && <PulseAnimation type="narrow-button" />}
        </MotionButton>
      </PopoverTrigger>
      <PopoverContent
        className="relative start-4 w-[calc(100vw-3rem)] max-w-xs bg-background-highlight px-4 py-6 text-sm shadow-none sm:start-8 sm:w-[calc(100vw-5rem)]"
        data-testid="more-info-popover-content"
      >
        <PopoverClose className="absolute right-2 top-1 ms-auto flex size-6 items-center justify-center text-xl leading-none">
          <MdClose />
        </PopoverClose>
        <div className="px-3 py-2 last-of-type:[&_p]:mb-2">{children}</div>
      </PopoverContent>
    </Popover>
  )
}
