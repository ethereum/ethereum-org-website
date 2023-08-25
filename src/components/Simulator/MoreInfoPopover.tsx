import {
  Popover,
  PopoverTrigger,
  Button,
  Icon,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  type PopoverBodyProps,
} from "@chakra-ui/react"
import React from "react"
import { MdInfoOutline } from "react-icons/md"

export const MoreInfoPopover: React.FC<Pick<PopoverBodyProps, "children">> = ({
  children,
}) => (
  <Popover>
    <PopoverTrigger>
      <Button
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
      p={4}
      insetStart={{ base: 4, sm: 8 }}
      maxW={{ base: "calc(100vw - 3rem)", sm: "calc(100vw - 5rem)" }}
      borderRadius="base"
      boxShadow="tooltip"
    >
      <PopoverArrow bg="background.highlight" />
      <PopoverBody>{children}</PopoverBody>
    </PopoverContent>
  </Popover>
)
