import React from "react"

import {
  AvatarBase as Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BaseLink } from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import { formatDate, getTxEtherscanUrl } from "@/lib/torch"

interface TorchHistoryCardProps {
  name: string
  role: string
  avatar: string
  from: number
  to: number
  transactionHash: string
  className?: string
  isCurrentHolder?: boolean
  isPlaceholder?: boolean
}

const TorchHistoryCard: React.FC<TorchHistoryCardProps> = ({
  name,
  role,
  avatar,
  from,
  to,
  transactionHash,
  className,
  isCurrentHolder,
  isPlaceholder = false,
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col rounded-xl border border-gray-100/50 bg-gradient-to-b from-white to-gray-100 px-6 py-12 shadow-lg dark:text-body-inverse",
        isCurrentHolder && "bg-gradient-to-b from-[#B38DF0] to-[#DED4ED]",
        isPlaceholder &&
          "bg-gradient-to-b from-gray-100 to-gray-200 opacity-50",
        className
      )}
    >
      <CardHeader className="flex flex-col p-0">
        <div className="mb-4 flex flex-col items-center">
          <Avatar className="h-32 w-32 border-2 border-gray-100/50 !shadow-none">
            <AvatarImage src={avatar} alt={`Avatar for ${name}`} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </div>

        {isCurrentHolder && (
          <div>
            <Tag
              size="small"
              variant="solid"
              status="tag"
              className="text-2xs font-bold"
            >
              Current torchbearer
            </Tag>
          </div>
        )}

        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 p-0">
        <div>{role}</div>
        {!isPlaceholder && (
          <>
            <div className="text-xs text-gray-500">
              {isCurrentHolder 
                ? `From ${formatDate(from)}`
                : `From ${formatDate(from)} to ${formatDate(to)}`
              }
            </div>
            <BaseLink
              href={getTxEtherscanUrl(transactionHash)}
              className="text-xs text-purple-600 hover:text-purple-500"
            >
              View on Etherscan
            </BaseLink>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default TorchHistoryCard
