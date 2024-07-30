import React, { useState } from "react"
import { motion } from "framer-motion"
import { MdInfoOutline } from "react-icons/md"
import {
  Button,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  type PopoverBodyProps,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"

import { PulseAnimation } from "./PulseAnimation"

const MotionButton = motion(Button)

type MoreInfoPopover = Pick<PopoverBodyProps, "children"> & {
  isFirstStep: boolean
}
export const MoreInfoPopover = ({ isFirstStep, children }: MoreInfoPopover) => {
  const [clicked, setClicked] = useState(false)
  return (
    <Popover>
      <PopoverTrigger>
        <MotionButton
          rightIcon={<Icon as={MdInfoOutline} size={24} />}
          variant="ghost"
          sx={{ paddingInlineStart: 0 }}
          color="body.medium"
          fontSize="sm"
          p={0}
          onClick={() => setClicked(true)}
          position="relative"
        >
          More info
          {isFirstStep && !clicked && <PulseAnimation type="narrow-button" />}
        </MotionButton>
      </PopoverTrigger>
      <PopoverContent
        px={4}
        py={6}
        insetStart={{ base: 4, sm: 8 }}
        w={{ base: "calc(100vw - 3rem)", sm: "calc(100vw - 5rem)" }}
      >
        <PopoverArrow />
        <PopoverCloseButton ms="auto" />
        <PopoverBody sx={{ "p:last-of-type": { mb: 2 } }}>
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
