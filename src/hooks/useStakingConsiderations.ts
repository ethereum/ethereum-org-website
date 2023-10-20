import { useState } from "react"
// SVG imports
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
// Component imports
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { MatomoEventOptions } from "@/lib/utils/matomo"
import { IProps as StakingConsiderationsProps } from "@/components/Staking/StakingConsiderations"
import { chakra } from "@chakra-ui/react"

import type { StakingPage } from "@/lib/types"

type DataType = {
  title: string
  description: string
  valid: string
  caution: string
  warning: string
  Svg: any
  matomo: MatomoEventOptions
}

export const useStakingConsiderations = ({
  page,
}: StakingConsiderationsProps) => {
  // TODO: Re-enable after i18n implemented
  // const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)

  // TODO
  const data: { [key in StakingPage]: DataType[] } = {
    solo: [
      {
        title: "page-staking-considerations-solo-1-title", // t("page-staking-considerations-solo-1-title"),
        description: "page-staking-considerations-solo-1-description", // t("page-staking-considerations-solo-1-description"),
        valid: "page-staking-considerations-solo-1-title", // t("page-staking-considerations-solo-1-title"),
        caution: "",
        warning: "page-staking-considerations-solo-1-warning", // t("page-staking-considerations-solo-1-warning"),
        Svg: OpenSourceStakingIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo open source",
        },
      },
      {
        title: "page-staking-considerations-solo-2-title", // t("page-staking-considerations-solo-2-title"),
        description: "page-staking-considerations-solo-2-description", // t("page-staking-considerations-solo-2-description"),
        valid: "page-staking-considerations-solo-2-title", // t("page-staking-considerations-solo-2-title"),
        caution: "",
        warning: "page-staking-considerations-solo-2-warning", // t("page-staking-considerations-solo-2-warning"),
        Svg: AuditedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo audited",
        },
      },
      {
        title: "page-staking-considerations-solo-3-title", // t("page-staking-considerations-solo-3-title"),
        description: "page-staking-considerations-solo-3-description", // t("page-staking-considerations-solo-3-description"),
        valid: "page-staking-considerations-solo-3-valid", // t("page-staking-considerations-solo-3-valid"),
        caution: "page-staking-considerations-solo-3-caution", // t("page-staking-considerations-solo-3-caution"),
        warning: "page-staking-considerations-solo-2-warning", // t("page-staking-considerations-solo-2-warning"),
        Svg: BugBountyIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo bug bounty",
        },
      },
      {
        title: "page-staking-considerations-solo-4-title", // t("page-staking-considerations-solo-4-title"),
        description: "page-staking-considerations-solo-4-description", // t("page-staking-considerations-solo-4-description"),
        valid: "page-staking-considerations-solo-4-valid", // t("page-staking-considerations-solo-4-valid"),
        caution: "page-staking-considerations-solo-4-caution", // t("page-staking-considerations-solo-4-caution"),
        warning: "page-staking-considerations-solo-4-warning", // t("page-staking-considerations-solo-4-warning"),
        Svg: BattleTestedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo battle tested",
        },
      },
      {
        title: "page-staking-considerations-solo-5-title", // t("page-staking-considerations-solo-5-title"),
        description: "page-staking-considerations-solo-5-description", // t("page-staking-considerations-solo-5-description"),
        valid: "page-staking-considerations-solo-5-title", // t("page-staking-considerations-solo-5-title"),
        caution: "",
        warning: "page-staking-considerations-solo-5-warning", // t("page-staking-considerations-solo-5-warning"),
        Svg: TrustlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo trustless",
        },
      },
      {
        title: "page-staking-considerations-solo-6-title", // t("page-staking-considerations-solo-6-title"),
        description: "page-staking-considerations-solo-6-description", // t("page-staking-considerations-solo-6-description"),
        valid: "page-staking-considerations-solo-6-valid", // t("page-staking-considerations-solo-6-valid"),
        caution: "",
        warning: "page-staking-considerations-solo-6-warning", // t("page-staking-considerations-solo-6-warning"),
        Svg: PermissionlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo permissionless",
        },
      },
      {
        title: "page-staking-considerations-solo-7-title", // t("page-staking-considerations-solo-7-title"),
        description: "page-staking-considerations-solo-7-description", // t("page-staking-considerations-solo-7-description"),
        valid: "page-staking-considerations-solo-7-valid", // t("page-staking-considerations-solo-7-valid"),
        caution: "",
        warning: "page-staking-considerations-solo-7-warning", // t("page-staking-considerations-solo-7-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo multi-client",
        },
      },
      {
        title: "page-staking-considerations-solo-8-title", // t("page-staking-considerations-solo-8-title"),
        description: "page-staking-considerations-solo-8-description", // t("page-staking-considerations-solo-8-description"),
        valid: "page-staking-considerations-solo-8-title", // t("page-staking-considerations-solo-8-title"),
        caution: "",
        warning: "page-staking-considerations-solo-8-warning", // t("page-staking-considerations-solo-8-warning"),
        Svg: SelfCustodyIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked solo self custody",
        },
      },
      {
        title: "page-staking-considerations-solo-9-title", // t("page-staking-considerations-solo-9-title"),
        description: "page-staking-considerations-solo-9-description", // t("page-staking-considerations-solo-9-description"),
        valid: "page-staking-considerations-solo-9-valid", // t("page-staking-considerations-solo-9-valid"),
        caution: "",
        warning: "page-staking-considerations-solo-9-warning", // t("page-staking-considerations-solo-9-warning"),
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
        title: "page-staking-considerations-solo-1-title", // t("page-staking-considerations-solo-1-title"),
        description: "page-staking-considerations-solo-1-description", // t("page-staking-considerations-solo-1-description"),
        valid: "page-staking-considerations-solo-1-title", // t("page-staking-considerations-solo-1-title"),
        caution: "",
        warning: "page-staking-considerations-solo-1-warning", // t("page-staking-considerations-solo-1-warning"),
        Svg: OpenSourceStakingIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas open source",
        },
      },
      {
        title: "page-staking-considerations-solo-2-title", // t("page-staking-considerations-solo-2-title"),
        description: "page-staking-considerations-solo-2-description", // t("page-staking-considerations-solo-2-description"),
        valid: "page-staking-considerations-solo-2-title", // t("page-staking-considerations-solo-2-title"),
        caution: "",
        warning: "page-staking-considerations-solo-2-warning", // t("page-staking-considerations-solo-2-warning"),
        Svg: AuditedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas audited",
        },
      },
      {
        title: "page-staking-considerations-solo-3-title", // t("page-staking-considerations-solo-3-title"),
        description: "page-staking-considerations-solo-3-description", // t("page-staking-considerations-solo-3-description"),
        valid: "page-staking-considerations-solo-3-valid", // t("page-staking-considerations-solo-3-valid"),
        caution: "page-staking-considerations-solo-3-caution", // t("page-staking-considerations-solo-3-caution"),
        warning: "page-staking-considerations-solo-2-warning", // t("page-staking-considerations-solo-2-warning"),
        Svg: BugBountyIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas bug-bounty",
        },
      },
      {
        title: "page-staking-considerations-solo-4-title", // t("page-staking-considerations-solo-4-title"),
        description: "page-staking-considerations-saas-4-description", // t("page-staking-considerations-saas-4-description"),
        valid: "page-staking-considerations-solo-4-valid", // t("page-staking-considerations-solo-4-valid"),
        caution: "page-staking-considerations-solo-4-caution", // t("page-staking-considerations-solo-4-caution"),
        warning: "page-staking-considerations-solo-4-warning", // t("page-staking-considerations-solo-4-warning"),
        Svg: BattleTestedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas battle tested",
        },
      },
      {
        title: "page-staking-considerations-solo-6-title", // t("page-staking-considerations-solo-6-title"),
        description: "page-staking-considerations-saas-6-description", // t("page-staking-considerations-saas-6-description"),
        valid: "page-staking-considerations-saas-6-valid", // t("page-staking-considerations-saas-6-valid"),
        caution: "",
        warning: "page-staking-considerations-saas-6-warning", // t("page-staking-considerations-saas-6-warning"),
        Svg: PermissionlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas permissionless",
        },
      },
      {
        title: "page-staking-considerations-saas-7-title", // t("page-staking-considerations-saas-7-title"),
        description: "page-staking-considerations-saas-7-description", // t("page-staking-considerations-saas-7-description"),
        valid: "page-staking-considerations-saas-7-valid", // t("page-staking-considerations-saas-7-valid"),
        caution: "page-staking-considerations-saas-7-caution", // t("page-staking-considerations-saas-7-caution"),
        warning: "page-staking-considerations-saas-7-warning", // t("page-staking-considerations-saas-7-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas diverse consensus clients",
        },
      },
      {
        title: "page-staking-considerations-saas-8-title", // t("page-staking-considerations-saas-8-title"),
        description: "page-staking-considerations-saas-8-description", // t("page-staking-considerations-saas-8-description"),
        valid: "page-staking-considerations-saas-8-valid", // t("page-staking-considerations-saas-8-valid"),
        caution: "page-staking-considerations-saas-8-caution", // t("page-staking-considerations-saas-8-caution"),
        warning: "page-staking-considerations-saas-8-warning", // t("page-staking-considerations-saas-8-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked saas diverse execution clients",
        },
      },
      {
        title: "page-staking-considerations-solo-8-title", // t("page-staking-considerations-solo-8-title"),
        description: "page-staking-considerations-solo-8-description", // t("page-staking-considerations-solo-8-description"),
        valid: "page-staking-considerations-solo-8-title", // t("page-staking-considerations-solo-8-title"),
        caution: "",
        warning: "page-staking-considerations-solo-8-warning", // t("page-staking-considerations-solo-8-warning"),
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
        title: "page-staking-considerations-solo-1-title", // t("page-staking-considerations-solo-1-title"),
        description: "page-staking-considerations-solo-1-description", // t("page-staking-considerations-solo-1-description"),
        valid: "page-staking-considerations-solo-1-title", // t("page-staking-considerations-solo-1-title"),
        caution: "",
        warning: "page-staking-considerations-solo-1-warning", // t("page-staking-considerations-solo-1-warning"),
        Svg: OpenSourceStakingIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled open source",
        },
      },
      {
        title: "page-staking-considerations-solo-2-title", // t("page-staking-considerations-solo-2-title"),
        description: "page-staking-considerations-solo-2-description", // t("page-staking-considerations-solo-2-description"),
        valid: "page-staking-considerations-solo-2-title", // t("page-staking-considerations-solo-2-title"),
        caution: "",
        warning: "page-staking-considerations-solo-2-warning", // t("page-staking-considerations-solo-2-warning"),
        Svg: AuditedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled audited",
        },
      },
      {
        title: "page-staking-considerations-solo-3-title", // t("page-staking-considerations-solo-3-title"),
        description: "page-staking-considerations-solo-3-description", // t("page-staking-considerations-solo-3-description"),
        valid: "page-staking-considerations-solo-3-valid", // t("page-staking-considerations-solo-3-valid"),
        caution: "page-staking-considerations-solo-3-caution", // t("page-staking-considerations-solo-3-caution"),
        warning: "page-staking-considerations-solo-2-warning", // t("page-staking-considerations-solo-2-warning"),
        Svg: BugBountyIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled bug bounty",
        },
      },
      {
        title: "page-staking-considerations-solo-4-title", // t("page-staking-considerations-solo-4-title"),
        description: "page-staking-considerations-saas-4-description", // t("page-staking-considerations-saas-4-description"),
        valid: "page-staking-considerations-solo-4-valid", // t("page-staking-considerations-solo-4-valid"),
        caution: "page-staking-considerations-solo-4-caution", // t("page-staking-considerations-solo-4-caution"),
        warning: "page-staking-considerations-solo-4-warning", // t("page-staking-considerations-solo-4-warning"),
        Svg: BattleTestedIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled battle tested",
        },
      },
      {
        title: "page-staking-hierarchy-solo-pill-4", // t("page-staking-hierarchy-solo-pill-4"),
        description: "page-staking-considerations-pools-5-description", // t("page-staking-considerations-pools-5-description"),
        valid: "page-staking-hierarchy-solo-pill-4", // t("page-staking-hierarchy-solo-pill-4"),
        caution: "",
        warning: "page-staking-considerations-solo-5-warning", // t("page-staking-considerations-solo-5-warning"),
        Svg: TrustlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled trustless",
        },
      },
      {
        title: "page-staking-considerations-pools-6-title", // t("page-staking-considerations-pools-6-title"),
        description: "page-staking-considerations-pools-6-description", // t("page-staking-considerations-pools-6-description"),
        valid: "page-staking-considerations-saas-6-valid", // t("page-staking-considerations-saas-6-valid"),
        caution: "",
        warning: "page-staking-considerations-saas-6-warning", // t("page-staking-considerations-saas-6-warning"),
        Svg: PermissionlessIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled permissionless nodes",
        },
      },
      {
        title: "page-staking-considerations-saas-7-title", // t("page-staking-considerations-saas-7-title"),
        description: "page-staking-considerations-pools-7-description", // t("page-staking-considerations-pools-7-description"),
        valid: "page-staking-considerations-saas-7-valid", // t("page-staking-considerations-saas-7-valid"),
        caution: "page-staking-considerations-saas-7-caution", // t("page-staking-considerations-saas-7-caution"),
        warning: "page-staking-considerations-saas-7-warning", // t("page-staking-considerations-saas-7-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled diverse execution clients",
        },
      },
      {
        title: "page-staking-considerations-saas-8-title", // t("page-staking-considerations-saas-8-title"),
        description: "page-staking-considerations-pools-9-description", // t("page-staking-considerations-pools-9-description"),
        valid: "page-staking-considerations-saas-8-valid", // t("page-staking-considerations-saas-8-valid"),
        caution: "page-staking-considerations-saas-8-caution", // t("page-staking-considerations-saas-8-caution"),
        warning: "page-staking-considerations-saas-8-warning", // t("page-staking-considerations-saas-8-warning"),
        Svg: MultiClientIcon,
        matomo: {
          eventCategory: `StakingConsiderations`,
          eventAction: `Clicked`,
          eventName: "clicked pooled diverse consensus clients",
        },
      },
      {
        title: "page-staking-considerations-pools-8-title", // t("page-staking-considerations-pools-8-title"),
        description: "page-staking-considerations-pools-8-description", // t("page-staking-considerations-pools-8-description"),
        valid: "page-staking-considerations-pools-8-valid", // t("page-staking-considerations-pools-8-valid"),
        caution: "",
        warning: "page-staking-considerations-pools-8-warning", // t("page-staking-considerations-pools-8-warning"),
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
    text: "Staking Considerations",
    ariaLabel: "Dropdown menu for staking considerations",
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
  const StyledSvg = !!Svg
    ? chakra(Svg, {
        baseStyle: {
          path: {
            fill: "text",
          },
        },
      })
    : chakra("div", {
        baseStyle: {
          display: "none",
        },
      })

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
