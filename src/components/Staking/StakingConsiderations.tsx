import React, { useState } from "react"
import styled from "@emotion/styled"
import { useTranslation } from "gatsby-plugin-react-i18next"
// SVG imports
import {
  AuditedIcon,
  BattleTestedIcon,
  BugBountyIcon,
  CautionProductGlyphIcon,
  EconomicalIcon,
  GreenCheckProductGlyphIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  PermissionlessIcon,
  SelfCustodyIcon,
  TrustlessIcon,
  WarningProductGlyphIcon,
} from "../icons/staking"
// Component imports
import ButtonDropdown, { List as ButtonDropdownList } from "../ButtonDropdown"
import Translation from "../Translation"
import { EventOptions, trackCustomEvent } from "../../utils/matomo"

const Container = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const List = styled.div`
  flex: 1;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    display: none;
  }
`

// TODO: Make mobile responsive

const ListItem = styled.li<{ active: boolean }>`
  padding: 0.125rem 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  height: 2rem;
  ${({ theme, active }) =>
    active
      ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
    &::after{
        content:"";
        position:absolute;
        height:0;
        width:0;
        left:100%;
        top:0;
        border: 1rem solid transparent;
        border-left: 1rem solid ${theme.colors.primary};
    }`
      : `
    color: ${theme.colors.primary};
    `};
`

const StyledButtonDropdown = styled(ButtonDropdown)`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    display: inline-block;
  }
`

const Content = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 410px;
  background: ${({ theme }) => theme.colors.offBackground};
  padding: 1.5rem;
  h3 {
    font-weight: 700;
    font-size: 27px;
  }
`

const IndicatorRow = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: auto;
`

const Indicator = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: max-content;
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: fit-content;
  }
  p {
    font-size: 0.75rem;
    padding: 0;
    text-align: center;
    width: max-content;
    @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
      width: fit-content;
    }
  }
`

type DataType = {
  title: string
  description: string
  valid: string
  caution: string
  warning: string
  Svg: any
  matomo: EventOptions
}

export interface IProps {
  page: "solo" | "saas" | "pools"
}

const StakingConsiderations: React.FC<IProps> = ({ page }) => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)

  const data: { [key in "solo" | "saas" | "pools"]: DataType[] } = {
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
          eventName: "clicked saas diverse clients",
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
          eventName: "clicked pooled diverse clients",
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
    text: "Staking Considerations",
    ariaLabel: "Dropdown menu for staking considerations",
    items: pageData.map(({ title }) => ({
      text: title,
      callback: setActiveIndex,
    })),
  }

  const handleSelection = (idx: number): void => {
    setActiveIndex(idx)
  }

  const selectionSvgStyle = { width: 72, height: "auto" }
  const indicatorSvgStyle = { width: 20, height: "auto" }
  const StyledSvg = !!Svg
    ? styled(Svg)`
        path {
          fill: ${({ theme }) => theme.colors.text};
        }
      `
    : styled.div`
        display: none;
      `

  return (
    <Container>
      <StyledButtonDropdown list={dropdownLinks} />
      <List>
        {!!pageData && (
          <ul>
            {pageData.map(({ title, matomo }, idx) => (
              <ListItem
                key={idx}
                onClick={(e) => {
                  handleSelection(idx)
                  trackCustomEvent(matomo)
                }}
                active={idx === activeIndex}
              >
                {title}
              </ListItem>
            ))}
          </ul>
        )}
      </List>
      <Content>
        <StyledSvg style={selectionSvgStyle} />
        <h3>{title}</h3>
        <p>{description}</p>
        <IndicatorRow>
          {!!valid && (
            <Indicator>
              <GreenCheckProductGlyphIcon style={indicatorSvgStyle} />
              <p>
                <Translation id={valid} />
              </p>
            </Indicator>
          )}
          {!!caution && (
            <Indicator>
              <CautionProductGlyphIcon style={indicatorSvgStyle} />
              <p>
                <Translation id={caution} />
              </p>
            </Indicator>
          )}
          {!!warning && (
            <Indicator>
              <WarningProductGlyphIcon style={indicatorSvgStyle} />
              <p>
                <Translation id={warning} />
              </p>
            </Indicator>
          )}
        </IndicatorRow>
      </Content>
    </Container>
  )
}

export default StakingConsiderations
