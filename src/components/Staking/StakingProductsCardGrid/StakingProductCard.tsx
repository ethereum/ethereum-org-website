import { getTranslations } from "next-intl/server"
import type { ComponentType, ReactNode, SVGProps } from "react"

import {
  CautionProductGlyph,
  GreenCheckProductGlyph,
  UnknownProductGlyph,
  WarningProductGlyph,
} from "@/components/icons/staking"
import SocialListItem from "@/components/SocialListItem"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import { FlagType, Product } from "./types"

const getIconFromName = (
  imageName: string
): ComponentType<SVGProps<SVGElement>> => {
  const {
    [imageName + "GlyphIcon"]: Icon,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require("@/components/icons/staking")
  return Icon
}

const Status = ({ status }: { status: FlagType | undefined }) => {
  if (!status) return null

  const styles = "me-2 size-5"
  switch (status) {
    case "green-check":
      return <GreenCheckProductGlyph className={styles} />
    case "caution":
      return <CautionProductGlyph className={styles} />
    case "warning":
    case "false":
      return <WarningProductGlyph className={styles} />
    default:
      return <UnknownProductGlyph className={styles} />
  }
}

const StakingBadge = ({
  type,
  children,
}: {
  type: "ui" | "platform"
  children: ReactNode
}) => (
  <Tag variant="solid" status={type === "ui" ? "success" : "tag"} size="small">
    {children}
  </Tag>
)

const SOCIAL_PLATFORMS = [
  "twitter",
  "reddit",
  "youtube",
  "discord",
  "stackExchange",
  "webpage",
] as const

type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]

type StakingProductCardProps = {
  product: Product
}

export const StakingProductCard = async ({
  product: {
    name,
    imageName,
    url,
    platforms,
    ui,
    minEth,
    openSource,
    audited,
    bugBounty,
    battleTested,
    trustless,
    selfCustody,
    liquidityToken,
    permissionless,
    permissionlessNodes,
    multiClient,
    consensusDiversity,
    executionDiversity,
    economical,
    socials,
    matomo,
  },
}: StakingProductCardProps) => {
  const t = await getTranslations("page-staking")
  const tCommon = await getTranslations("common")

  const validSocials = socials
    ? (Object.entries(socials).filter(
        ([platform, url]) =>
          !!url && SOCIAL_PLATFORMS.includes(platform as SocialPlatform)
      ) as [SocialPlatform, string][])
    : []

  const Svg = getIconFromName(imageName)

  const data: { label: string; status?: FlagType }[] = [
    {
      label: t("page-staking-considerations-solo-1-title"),
      status: openSource,
    },
    { label: t("page-staking-considerations-solo-2-title"), status: audited },
    { label: t("page-staking-considerations-solo-3-title"), status: bugBounty },
    {
      label: t("page-staking-considerations-solo-4-title"),
      status: battleTested,
    },
    { label: t("page-staking-considerations-solo-5-title"), status: trustless },
    {
      label: t("page-staking-considerations-solo-6-title"),
      status: permissionless,
    },
    {
      label: t("page-staking-considerations-pools-6-title"),
      status: permissionlessNodes,
    },
    {
      label: t("page-staking-considerations-solo-7-title"),
      status: multiClient,
    },
    {
      label: t("page-staking-considerations-saas-7-title"),
      status: executionDiversity,
    },
    {
      label: t("page-staking-considerations-saas-8-title"),
      status: consensusDiversity,
    },
    {
      label: t("page-staking-considerations-solo-8-title"),
      status: selfCustody,
    },
    {
      label: t("page-staking-considerations-pools-8-title"),
      status: liquidityToken,
    },
    {
      label: t("page-staking-considerations-solo-9-title"),
      status: economical,
    },
  ].filter(({ status }) => !!status)

  return (
    <Card hoverEffect="lift">
      <CardHeader className="space-y-4">
        <div className="flex gap-3">
          {!!Svg && <Svg className="size-12 shrink-0" />}
          <div className="flex min-w-0 flex-col justify-center">
            <CardTitle variant="semibold" asChild>
              <h4>{name}</h4>
            </CardTitle>
            {typeof minEth !== "undefined" && (
              <CardParagraph size="sm">
                {minEth > 0 ? (
                  <>
                    {tCommon("from")} <span dir="ltr">{minEth} ETH</span>
                  </>
                ) : (
                  t("page-staking-any-amount")
                )}
              </CardParagraph>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-1">
          {platforms.map((platform, idx) => (
            <StakingBadge type="platform" key={idx}>
              {platform}
            </StakingBadge>
          ))}
          {ui.map((_ui, idx) => (
            <StakingBadge type="ui" key={idx}>
              {_ui}
            </StakingBadge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <UnorderedList className="m-0 list-none ps-0">
          {data.map(({ label, status }, idx) => (
            <ListItem
              key={idx}
              className={cn(
                "my-4 flex items-center gap-1 text-base/none",
                status !== "false" && "text-body!"
              )}
            >
              <Status status={status} />
              {label}
            </ListItem>
          ))}
        </UnorderedList>
      </CardContent>
      <CardFooter>
        {validSocials.length > 0 && (
          <div className="flex items-center justify-center">
            <CardParagraph className="me-2 text-body-medium">
              {t("page-staking-products-follow")}
            </CardParagraph>
            {validSocials.map(([platform, socialUrl], idx) => (
              <ButtonLink
                key={idx}
                href={socialUrl}
                variant="ghost"
                className="p-2!"
                hideArrow
              >
                <SocialListItem
                  className="p-0 **:[svg]:size-6 **:[svg]:p-0 **:[svg]:text-body hover:**:[svg]:text-primary-hover"
                  socialIcon={platform as SocialPlatform}
                />
              </ButtonLink>
            ))}
          </div>
        )}
        <ButtonLink href={url} customEventOptions={matomo}>
          {t("page-staking-products-get-started")}
        </ButtonLink>
      </CardFooter>
    </Card>
  )
}
