import React from "react"

import {
  AvatarBase as Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BaseLink } from "@/components/ui/Link"

interface TorchHistoryCardProps {
  name: string
  role: string
  avatar: string
  from: string
  to: string
  twitter?: string
}

const TorchHistoryCard: React.FC<TorchHistoryCardProps> = ({
  name,
  role,
  avatar,
  from,
  to,
  twitter,
}) => (
  <Card className="flex flex-col rounded-xl bg-white p-6 shadow-lg dark:text-body-inverse">
    <CardHeader className="flex flex-col gap-4 p-0">
      <div className="flex flex-col items-center">
        <Avatar className="h-32 w-32">
          <AvatarImage src={avatar} alt={`Avatar for ${name}`} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </div>

      <CardTitle className="text-lg">{name}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-1 p-0">
      <div>{role}</div>
      <div className="text-xs text-body-medium">
        From {from} to {to}
      </div>
      <BaseLink href={`https://twitter.com/${twitter}`} className="text-xs">
        View on Etherscan
      </BaseLink>
    </CardContent>
  </Card>
)

export default TorchHistoryCard
