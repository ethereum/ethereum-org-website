import {
  Popover,
  PopoverTrigger,
  Button,
  Icon,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  type PopoverBodyProps,
  Checkbox,
  PopoverFooter,
  PopoverCloseButton,
  PopoverHeader,
} from "@chakra-ui/react"
import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { MdInfoOutline } from "react-icons/md"

interface IProps extends Pick<PopoverBodyProps, "children"> {
  step: number
}
export const MoreInfoPopover: React.FC<IProps> = ({ step, children }) => {
  const DEFAULT_HIDDEN = true as const
  const [hidden, setHidden] = useState<boolean>(DEFAULT_HIDDEN)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (hidden && step !== 0) return
    buttonRef.current?.click()
  }, [step])

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setHidden(e.target.checked)
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          ref={buttonRef}
          rightIcon={<Icon as={MdInfoOutline} size={24} />}
          variant="ghost"
          sx={{ paddingInlineStart: 0 }}
          color="body.medium"
          fontSize="sm"
          py={0}
        >
          More info
        </Button>
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
        <PopoverBody>{children}</PopoverBody>
        <PopoverFooter display="flex">
          <Checkbox
            defaultChecked={DEFAULT_HIDDEN}
            ms="auto"
            onChange={handleCheckbox}
          >
            Hide by default
          </Checkbox>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
