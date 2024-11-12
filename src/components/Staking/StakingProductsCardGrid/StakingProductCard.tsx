import { useTranslation } from "next-i18next"
import type { ComponentType, ReactNode, SVGProps } from "react"

import {
  CautionProductGlyphIcon,
  GreenCheckProductGlyphIcon,
  UnknownProductGlyphIcon,
  WarningProductGlyphIcon,
} from "@/components/icons/staking"
import SocialListItem from "@/components/SocialListItem"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"

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
      return <GreenCheckProductGlyphIcon className={styles} />
    case "caution":
      return <CautionProductGlyphIcon className={styles} />
    case "warning":
    case "false":
      return <WarningProductGlyphIcon className={styles} />
    default:
      return <UnknownProductGlyphIcon className={styles} />
  }
}

const StakingBadge = ({
  type,
  children,
}: {
  type: "ui" | "platform"
  children: ReactNode
}) => {
  const uiTypeColor = type === "ui"
  return (
    <span
      className={cn(
        "rounded-full px-2 py-1 text-xs normal-case",
        uiTypeColor
          ? "bg-success-light text-success dark:bg-success-dark dark:text-success-light"
          : "bg-primary-low-contrast text-primary-high-contrast"
      )}
    >
      {children}
    </span>
  )
}

type StakingProductCardProps = {
  product: Product
}

export const StakingProductCard = ({
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
  const validSocials = socials
    ? Object.entries(socials).filter(
        ([platform, url]) =>
          url &&
          [
            "twitter",
            "reddit",
            "youtube",
            "discord",
            "stackExchange",
            "webpage",
          ].includes(platform)
      )
    : []

  const { t } = useTranslation("page-staking")
  const Svg = getIconFromName(imageName)
  type DataType = { label: string; status?: FlagType }
  const data: DataType[] = [
    {
      label: t("page-staking-considerations-solo-1-title"),
      status: openSource,
    },
    {
      label: t("page-staking-considerations-solo-2-title"),
      status: audited,
    },
    {
      label: t("page-staking-considerations-solo-3-title"),
      status: bugBounty,
    },
    {
      label: t("page-staking-considerations-solo-4-title"),
      status: battleTested,
    },
    {
      label: t("page-staking-considerations-solo-5-title"),
      status: trustless,
    },
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
    <div className="rounded-base hover:scale-101 flex flex-col bg-background-highlight transition-transform">
      <div className="flex max-h-24 space-x-3 p-6">
        {!!Svg && <Svg className="size-12" />}
        <div className="flex flex-col justify-center">
          <h4 className="text-xl">{name}</h4>
          {typeof minEth !== "undefined" && (
            <p className="text-sm font-normal text-body-medium">
              {minEth > 0
                ? `${t("common:from")} ${minEth} ETH`
                : t("page-staking-any-amount")}
            </p>
          )}
        </div>
      </div>
      <div className="min-h-75 flex flex-wrap items-start gap-1 p-6 pt-0">
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
      <div className="p-6 py-0">
        <ul className="m-0 gap-3">
          {data.map(({ label, status }, idx) => (
            <li
              key={idx}
              className={`my-4 me-0 ms-auto flex items-center gap-1 text-md leading-3 ${status === "false" && "text-body-medium"}`}
            >
              <Status status={status} />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-col gap-3 p-6">
        <ButtonLink
          href={url}
          customEventOptions={matomo}
          className="w-full"
          variant="outline"
          isSecondary
        >
          {t("page-staking-products-get-started")}
        </ButtonLink>
        <div className="flex h-7.5 items-center justify-center">
          {validSocials.length > 0 && (
            <p className="me-2 text-body-medium">
              {t("page-staking-products-follow")}
            </p>
          )}

          {validSocials.map(([platform, url], idx) => (
            <Link key={idx} href={url} hideArrow>
              <SocialListItem
                className="size-8 text-body [&>svg]:text-body"
                socialIcon={
                  platform as
                    | "twitter"
                    | "reddit"
                    | "youtube"
                    | "discord"
                    | "stackExchange"
                    | "webpage"
                }
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
