import { useEffect, useState } from "react"
import { AlertTriangle, Info, type LucideIcon } from "lucide-react"

import { Flex } from "@/components/ui/flex"

import { NULL_VALUE } from "@/lib/constants"

import Tooltip, { type TooltipProps } from "../Tooltip"

const initialContent = {
  contentValue: NULL_VALUE,
  tooltipIcon: Info,
}

export type StatProps = {
  tooltipProps?: TooltipProps
  value: string | undefined
  label: string
  isError: boolean
}

const Stat = ({ tooltipProps, value, label, isError }: StatProps) => {
  const [content, setContent] = useState<{
    contentValue: string | JSX.Element
    tooltipIcon: LucideIcon
  }>(initialContent)

  useEffect(() => {
    if (isError) {
      return setContent({
        contentValue: NULL_VALUE,
        tooltipIcon: AlertTriangle,
      })
    }

    if (!value) return

    return setContent({ ...initialContent, contentValue: value })
  }, [isError, value])

  return (
    <Flex className="flex-col-reverse">
      <div className="flex items-center space-x-2 leading-none text-body-medium">
        <span>{label}</span>
        {!!tooltipProps && (
          <Tooltip {...tooltipProps}>
            <button className="flex text-inherit">
              <content.tooltipIcon className="h-4 w-4" />
            </button>
          </Tooltip>
        )}
      </div>
      <span className="text-5xl font-bold">{content.contentValue}</span>
    </Flex>
  )
}

export default Stat
