import { ElementType, useState } from "react"
import { useTranslation } from "next-i18next"

import type { StakingPage } from "@/lib/types"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import {
  AuditedIcon,
  BattleTestedIcon,
  BugBountyIcon,
  EconomicalIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  PermissionlessIcon,
  SelfCustodyIcon,
  TrustlessIcon,
} from "@/components/icons/staking"
import { StakingConsiderationsProps } from "@/components/Staking/StakingConsiderations"

import { MatomoEventOptions } from "@/lib/utils/matomo"

type DataType = {
  title: string
  description: string
  valid: string
  caution: string
  warning: string
  Svg: ElementType
  matomo: MatomoEventOptions
}

export const useStakingConsiderations = ({
  page,
}: StakingConsiderationsProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useTranslation("page-staking")

  const data: { [key in StakingPage]: DataType[] } = {
    solo: [
      {
        title: t("page-staking-considerations-solo-1-title"),
        description: t("page-staking-considerations-solo-1-description"),
        valid: t("page-staking-considerations-solo-1-title"),
        caution: "",
        warning: t("page-staking-considerations-solo-1-warning"),
        Svg: OpenSourceStakingIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo open source",
        },
      },
      {
        title: t("page-staking-considerations-solo-2-title"),
        description: t("page-staking-considerations-solo-2-description"),
        valid: t("page-staking-considerations-solo-2-title"),
        caution: "",
        warning: t("page-staking-considerations-solo-2-warning"),
        Svg: AuditedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo audited",
        },
      },
      {
        title: t("page-staking-considerations-solo-3-title"),
        description: t("page-staking-considerations-solo-3-description"),
        valid: t("page-staking-considerations-solo-3-valid"),
        caution: t("page-staking-considerations-solo-3-caution"),
        warning: t("page-staking-considerations-solo-2-warning"),
        Svg: BugBountyIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo bug bounty",
        },
      },
      {
        title: t("page-staking-considerations-solo-4-title"),
        description: t("page-staking-considerations-solo-4-description"),
        valid: t("page-staking-considerations-solo-4-valid"),
        caution: t("page-staking-considerations-solo-4-caution"),
        warning: t("page-staking-considerations-solo-4-warning"),
        Svg: BattleTestedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo battle tested",
        },
      },
      {
        title: t("page-staking-considerations-solo-5-title"),
        description: t("page-staking-considerations-solo-5-description"),
        valid: t("page-staking-considerations-solo-5-title"),
        caution: "",
        warning: t("page-staking-considerations-solo-5-warning"),
        Svg: TrustlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo trustless",
        },
      },
      {
        title: t("page-staking-considerations-solo-6-title"),
        description: t("page-staking-considerations-solo-6-description"),
        valid: t("page-staking-considerations-solo-6-valid"),
        caution: "",
        warning: t("page-staking-considerations-solo-6-warning"),
        Svg: PermissionlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo permissionless",
        },
      },
      {
        title: t("page-staking-considerations-solo-7-title"),
        description: t("page-staking-considerations-solo-7-description"),
        valid: t("page-staking-considerations-solo-7-valid"),
        caution: "",
        warning: t("page-staking-considerations-solo-7-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo multi-client",
        },
      },
      {
        title: t("page-staking-considerations-solo-8-title"),
        description: t("page-staking-considerations-solo-8-description"),
        valid: t("page-staking-considerations-solo-8-title"),
        caution: "",
        warning: t("page-staking-considerations-solo-8-warning"),
        Svg: SelfCustodyIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo self custody",
        },
      },
      {
        title: t("page-staking-considerations-solo-9-title"),
        description: t("page-staking-considerations-solo-9-description"),
        valid: t("page-staking-considerations-solo-9-valid"),
        caution: "",
        warning: t("page-staking-considerations-solo-9-warning"),
        Svg: EconomicalIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo economical",
        },
      },
    ],
    saas: [
      {
        title: t("page-staking-considerations-solo-1-title"),
        description: t("page-staking-considerations-solo-1-description"),
        valid: t("page-staking-considerations-solo-1-title"),
        caution: "",
        warning: t("page-staking-considerations-solo-1-warning"),
        Svg: OpenSourceStakingIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas open source",
        },
      },
      {
        title: t("page-staking-considerations-solo-2-title"),
        description: t("page-staking-considerations-solo-2-description"),
        valid: t("page-staking-considerations-solo-2-title"),
        caution: "",
        warning: t("page-staking-considerations-solo-2-warning"),
        Svg: AuditedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas audited",
        },
      },
      {
        title: t("page-staking-considerations-solo-3-title"),
        description: t("page-staking-considerations-solo-3-description"),
        valid: t("page-staking-considerations-solo-3-valid"),
        caution: t("page-staking-considerations-solo-3-caution"),
        warning: t("page-staking-considerations-solo-2-warning"),
        Svg: BugBountyIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas bug-bounty",
        },
      },
      {
        title: t("page-staking-considerations-solo-4-title"),
        description: t("page-staking-considerations-saas-4-description"),
        valid: t("page-staking-considerations-solo-4-valid"),
        caution: t("page-staking-considerations-solo-4-caution"),
        warning: t("page-staking-considerations-solo-4-warning"),
        Svg: BattleTestedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas battle tested",
        },
      },
      {
        title: t("page-staking-considerations-solo-6-title"),
        description: t("page-staking-considerations-saas-6-description"),
        valid: t("page-staking-considerations-saas-6-valid"),
        caution: "",
        warning: t("page-staking-considerations-saas-6-warning"),
        Svg: PermissionlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas permissionless",
        },
      },
      {
        title: t("page-staking-considerations-saas-7-title"),
        description: t("page-staking-considerations-saas-7-description"),
        valid: t("page-staking-considerations-saas-7-valid"),
        caution: t("page-staking-considerations-saas-7-caution"),
        warning: t("page-staking-considerations-saas-7-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas diverse consensus clients",
        },
      },
      {
        title: t("page-staking-considerations-saas-8-title"),
        description: t("page-staking-considerations-saas-8-description"),
        valid: t("page-staking-considerations-saas-8-valid"),
        caution: t("page-staking-considerations-saas-8-caution"),
        warning: t("page-staking-considerations-saas-8-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas diverse execution clients",
        },
      },
      {
        title: t("page-staking-considerations-solo-8-title"),
        description: t("page-staking-considerations-solo-8-description"),
        valid: t("page-staking-considerations-solo-8-title"),
        caution: "",
        warning: t("page-staking-considerations-solo-8-warning"),
        Svg: SelfCustodyIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas self custody",
        },
      },
    ],
    pools: [
      {
        title: t("page-staking-considerations-solo-1-title"),
        description: t("page-staking-considerations-solo-1-description"),
        valid: t("page-staking-considerations-solo-1-title"),
        caution: "",
        warning: t("page-staking-considerations-solo-1-warning"),
        Svg: OpenSourceStakingIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled open source",
        },
      },
      {
        title: t("page-staking-considerations-solo-2-title"),
        description: t("page-staking-considerations-solo-2-description"),
        valid: t("page-staking-considerations-solo-2-title"),
        caution: "",
        warning: t("page-staking-considerations-solo-2-warning"),
        Svg: AuditedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled audited",
        },
      },
      {
        title: t("page-staking-considerations-solo-3-title"),
        description: t("page-staking-considerations-solo-3-description"),
        valid: t("page-staking-considerations-solo-3-valid"),
        caution: t("page-staking-considerations-solo-3-caution"),
        warning: t("page-staking-considerations-solo-2-warning"),
        Svg: BugBountyIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled bug bounty",
        },
      },
      {
        title: t("page-staking-considerations-solo-4-title"),
        description: t("page-staking-considerations-saas-4-description"),
        valid: t("page-staking-considerations-solo-4-valid"),
        caution: t("page-staking-considerations-solo-4-caution"),
        warning: t("page-staking-considerations-solo-4-warning"),
        Svg: BattleTestedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled battle tested",
        },
      },
      {
        title: t("page-staking-hierarchy-solo-pill-4"),
        description: t("page-staking-considerations-pools-5-description"),
        valid: t("page-staking-hierarchy-solo-pill-4"),
        caution: "",
        warning: t("page-staking-considerations-solo-5-warning"),
        Svg: TrustlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled trustless",
        },
      },
      {
        title: t("page-staking-considerations-pools-6-title"),
        description: t("page-staking-considerations-pools-6-description"),
        valid: t("page-staking-considerations-saas-6-valid"),
        caution: "",
        warning: t("page-staking-considerations-saas-6-warning"),
        Svg: PermissionlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled permissionless nodes",
        },
      },
      {
        title: t("page-staking-considerations-saas-7-title"),
        description: t("page-staking-considerations-pools-7-description"),
        valid: t("page-staking-considerations-saas-7-valid"),
        caution: t("page-staking-considerations-saas-7-caution"),
        warning: t("page-staking-considerations-saas-7-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled diverse execution clients",
        },
      },
      {
        title: t("page-staking-considerations-saas-8-title"),
        description: t("page-staking-considerations-pools-9-description"),
        valid: t("page-staking-considerations-saas-8-valid"),
        caution: t("page-staking-considerations-saas-8-caution"),
        warning: t("page-staking-considerations-saas-8-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled diverse consensus clients",
        },
      },
      {
        title: t("page-staking-considerations-pools-8-title"),
        description: t("page-staking-considerations-pools-8-description"),
        valid: t("page-staking-considerations-pools-8-valid"),
        caution: "",
        warning: t("page-staking-considerations-pools-8-warning"),
        Svg: LiquidityTokenIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled liquidity token",
        },
      },
    ],
  }

  const pageData = data[page]
  const { title, description, valid, caution, warning, Svg } =
    pageData[activeIndex]

  const dropdownLinks: ButtonDropdownList = {
    text: t("page-staking-considerations-dropdown-text"),
    ariaLabel: t("page-staking-considerations-dropdown-aria-label"),
    items: pageData.map(({ title, matomo }) => ({
      text: title,
      callback: setActiveIndex,
      matomo: matomo,
    })),
  }

  const handleSelection = (idx: number): void => {
    setActiveIndex(idx)
  }

  const indicatorSvgStyle = { width: 20, height: "auto" }
  const StyledSvg = () =>
    Svg ? <Svg className="size-[4.5rem]" /> : <div className="hidden" />

  return {
    title,
    description,
    valid,
    caution,
    warning,
    dropdownLinks,
    handleSelection,
    indicatorSvgStyle,
    StyledSvg,
    pageData,
    activeIndex,
  }
}
