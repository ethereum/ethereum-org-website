"use client"

import React from "react"
import { useLocale, useTranslations } from "next-intl"

import { AvatarBase, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import {
  extractTwitterHandle,
  formatTorchDate,
  getTxEtherscanUrl,
} from "./torchHoldersData"

interface TorchHistoryCardProps {
  name: string
  role: string
  avatar: string
  twitter: string
  from: number
  to?: number
  transactionHash: string
}

const TorchHistoryCard: React.FC<TorchHistoryCardProps> = ({
  name,
  role,
  avatar,
  twitter,
  from,
  to,
  transactionHash,
}) => {
  const t = useTranslations("page-10-year-anniversary")
  const locale = useLocale()

  return (
    <Card>
      <CardHeader className="flex flex-col">
        <AvatarBase
          className={cn(
            "mx-auto h-32 w-32 border-2 !shadow-none",
            !twitter && "pointer-events-none"
          )}
        >
          {twitter ? (
            <BaseLink href={`https://x.com/${extractTwitterHandle(twitter)}`}>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </BaseLink>
          ) : (
            <>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </>
          )}
        </AvatarBase>
      </CardHeader>
      <CardContent spacing="sm">
        <CardTitle size="sm" spacing="none">
          {name}
        </CardTitle>
        <CardParagraph textColor="body">{role}</CardParagraph>
        <CardParagraph size="sm">
          {to !== undefined
            ? t("page-10-year-torch-held-range", {
                from: formatTorchDate(from, locale),
                to: formatTorchDate(to, locale),
              })
            : t("page-10-year-torch-held-since", {
                from: formatTorchDate(from, locale),
              })}
        </CardParagraph>
      </CardContent>
      <CardFooter>
        <BaseLink href={getTxEtherscanUrl(transactionHash)} className="text-sm">
          {t("page-10-year-torch-view-on-etherscan")}
        </BaseLink>
      </CardFooter>
    </Card>
  )
}

export default TorchHistoryCard
