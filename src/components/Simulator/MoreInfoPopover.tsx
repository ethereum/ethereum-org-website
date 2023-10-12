import {
  Popover,
  PopoverTrigger,
  Button,
  Icon,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  type PopoverBodyProps,
  PopoverCloseButton,
  PopoverHeader,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import React, { useState } from "react"
import { MdInfoOutline } from "react-icons/md"
import { PulseAnimation } from "./PulseAnimation"

const MotionButton = motion(Button)

interface IProps extends Pick<PopoverBodyProps, "children"> {
  isFirstStep: boolean
}
export const MoreInfoPopover: React.FC<IProps> = ({
  isFirstStep,
  children,
}) => {
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
        bg="background.highlight"
        px={4}
        py={6}
        insetStart={{ base: 4, sm: 8 }}
        maxW={{ base: "calc(100vw - 3rem)", sm: "calc(100vw - 5rem)" }}
        borderRadius="base"
        boxShadow="tooltip"
      >
        <PopoverArrow bg="background.highlight" boxShadow="2xl" />
        <PopoverHeader mb={2}>
          <PopoverCloseButton ms="auto" />
        </PopoverHeader>
        <PopoverBody sx={{ "p:last-of-type": { mb: 2 } }}>
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
