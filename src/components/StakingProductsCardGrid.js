import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"
// Data imports
import stakingProducts from "../data/staking-products.json"
// Component imports
import ButtonLink from "./ButtonLink"
// SVG imports
import GreenCheck from "../assets/staking/green-check-product-glyph.svg"
import Caution from "../assets/staking/caution-product-glyph.svg"
import Warning from "../assets/staking/warning-product-glyph.svg"
import Unknown from "../assets/staking/unknown-product-glyph.svg"
// Product SVGs
import Abyss from "../assets/staking/abyss-glyph.svg"
import Allnodes from "../assets/staking/allnodes-glyph.svg"
import Ankr from "../assets/staking/ankr-glyph.svg"
import Bloxstaking from "../assets/staking/bloxstaking-glyph.svg"
import Dappnode from "../assets/staking/dappnode-glyph.svg"
import DefaultOpenSource from "../assets/staking/default-open-source-glyph.svg"
import Lido from "../assets/staking/lido-glyph.svg"
import RocketPool from "../assets/staking/rocket-pool-glyph.svg"
import Stafi from "../assets/staking/stafi-glyph.svg"
import Stakefish from "../assets/staking/stakefish-glyph.svg"
import Stakewise from "../assets/staking/stakewise-glyph.svg"
import Stereum from "../assets/staking/stereum-glyph.svg"
import Wagyu from "../assets/staking/wagyu-glyph.svg"
// When adding a product svg, be sure to add to mapping below as well.

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 2rem;
  margin: 3rem 0;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.offBackground};
  border-radius: 0.25rem;
`

const PaddedDiv = styled.div`
  padding: 1.75rem 2rem;
`

const Spacer = styled.div`
  flex: 1;
`

const Banner = styled(PaddedDiv)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: ${({ color }) => color}
    linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  border-radius: 0.25rem;
  max-height: 6rem;
  h2 {
    margin: 0;
    color: white;
    font-size: 1.5rem;
  }
  svg {
    height: 2rem;
  }
`
const Pills = styled(PaddedDiv)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`

const Pill = styled.div`
  text-align: center;
  padding: 0.25rem 0.75rem;
  color: ${({ theme, type }) =>
    type ? "rgba(0, 0, 0, 0.6)" : theme.colors.text200};
  background: ${({ theme, type }) => {
    if (!type) return "transparent"
    switch (type.toLowerCase()) {
      case "ui":
        return theme.colors.stakingPillUI
      case "platform":
        return theme.colors.stakingPillPlatform
      default:
        return theme.colors.tagGray
    }
  }};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-radius: 0.25rem;
`

const Content = styled(PaddedDiv)`
  padding-top: 0;
  padding-bottom: 0;

  ul {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }
`

const Item = styled.li`
  display: flex;
  align-items: center;
  text-indent: 1em;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 0.875rem;
  letter-spacing: 0.04em;
`

const Cta = styled(PaddedDiv)`
  a {
    width: 100%;
  }
`
const glyphSize = "1.5rem"
const StyledGreenCheck = styled(GreenCheck)`
  --size: ${({ size }) => (size ? size : glyphSize)};
  height: var(--size);
  width: var(--size);
  .circle {
    ${({ disabled }) => (disabled ? "fill: #808080;" : null)}
  }
`
const StyledCaution = styled(Caution)`
  --size: ${({ size }) => (size ? size : glyphSize)};
  height: var(--size);
  width: var(--size);
  .circle {
    ${({ disabled }) => (disabled ? "fill: #808080;" : null)}
  }
`
const StyledWarning = styled(Warning)`
  --size: ${({ size }) => (size ? size : glyphSize)};
  height: var(--size);
  width: var(--size);
  .circle {
    ${({ disabled }) => (disabled ? "fill: #808080;" : null)}
  }
`
const StyledUnknown = styled(Unknown)`
  --size: ${({ size }) => (size ? size : glyphSize)};
  height: var(--size);
  width: var(--size);
  .circle {
    ${({ disabled }) => (disabled ? "fill: #808080;" : null)}
  }
`

const Status = ({ status }) => {
  if (!status) return null
  switch (status) {
    case "green-check":
      return <StyledGreenCheck />
    case "caution":
      return <StyledCaution />
    case "warning":
    case "false":
      return <StyledWarning />
    default:
      return <StyledUnknown disabled={true} />
  }
}

const getSvgFromPath = (svgPath) => {
  const mapping = {
    "abyss-glyph.svg": Abyss,
    "allnodes-glyph.svg": Allnodes,
    "ankr-glyph.svg": Ankr,
    "bloxstaking-glyph.svg": Bloxstaking,
    "dappnode-glyph.svg": Dappnode,
    "default-open-source-glyph.svg": DefaultOpenSource,
    "lido-glyph.svg": Lido,
    "rocket-pool-glyph.svg": RocketPool,
    "stafi-glyph.svg": Stafi,
    "stakewise-glyph.svg": Stakewise,
    "stereum-glyph.svg": Stereum,
    "wagyu-glyph.svg": Wagyu,
    "stakefish-glyph.svg": Stakefish,
  }
  return mapping[svgPath]
}

const StakingProductCard = ({
  product: {
    name,
    svgPath,
    color,
    url,
    socials,
    platforms,
    ui,
    minEth,
    openSource,
    audited,
    bugBounty,
    battleTested,
    trustless,
    permissionless,
    multiClient,
    diverseClients,
    economical,
  },
}) => {
  const Svg = getSvgFromPath(svgPath)

  const data = [
    {
      label: "Open source",
      status: openSource,
    },
    {
      label: "Audited",
      status: audited,
    },
    {
      label: "Bug bounty",
      status: bugBounty,
    },
    {
      label: "Battle Tested",
      status: battleTested,
    },
    {
      label: "Trustless",
      status: trustless,
    },
    {
      label: "Permissionless",
      status: permissionless,
    },
    {
      label: "Multi-client",
      status: multiClient,
    },
    {
      label: "Diverse Clients",
      status: diverseClients,
    },
    {
      label: "Economical",
      status: economical,
    },
  ].filter(({ status }) => !!status)

  return (
    <Card>
      <Banner color={color}>
        {!!Svg && <Svg style={{ width: "32", height: "auto" }} />}
        <h2>{name}</h2>
      </Banner>
      <Pills>
        {platforms &&
          platforms.map((platform, idx) => (
            <Pill type="platform" key={idx}>
              {platform}
            </Pill>
          ))}
        {ui &&
          ui.map((_ui, idx) => (
            <Pill type="ui" key={idx}>
              {_ui}
            </Pill>
          ))}
        <Pill>{!!minEth ? `From ${minEth} ETH` : "Any amount"}</Pill>
      </Pills>
      <Spacer />
      <Content>
        <ul>
          {data &&
            data.map(({ label, status }, idx) => (
              <Item key={idx}>
                <Status status={status} />
                {label}
              </Item>
            ))}
        </ul>
      </Content>
      <Cta>
        <ButtonLink to={url}>Get started</ButtonLink>
      </Cta>
    </Card>
  )
}

const StakingProductCardGrid = ({ category }) => {
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark
  const [VALID_FLAG, CAUTION_FLAG, WARNING_FLAG, FALSE_FLAG, UNKNOWN_FLAG] = [
    "green-check",
    "caution",
    "warning",
    "false",
    "unknown",
  ]
  const [SAT, LUM] = isDarkTheme ? ["50%", "35%"] : ["75%", "60%"]

  const getBattleTestedFlag = (_launchDate) => {
    let battleTested = WARNING_FLAG
    const launchDate = new Date(_launchDate)
    const now = new Date()
    const halfYearAgo = new Date()
    const oneYearAgo = new Date()
    halfYearAgo.setDate(now.getDate() - 183)
    oneYearAgo.setDate(now.getDate() - 365)
    if (halfYearAgo > launchDate) {
      battleTested = CAUTION_FLAG
    }
    if (oneYearAgo > launchDate) {
      battleTested = VALID_FLAG
    }
    return battleTested
  }

  const getDiversityOfClients = (_pctMajorityClient) => {
    if (!_pctMajorityClient) return UNKNOWN_FLAG
    if (_pctMajorityClient > 50) return WARNING_FLAG
    return VALID_FLAG
  }

  const getFlagFromBoolean = (bool) => (!!bool ? VALID_FLAG : FALSE_FLAG)

  const getBrandProperties = ({ name, svgPath, hue, url, socials }) => ({
    name,
    svgPath,
    color: `hsla(${hue}, ${SAT}, ${LUM}, 1)`,
    url,
    socials,
  })

  const getTagProperties = ({ platforms, ui, minEth }) => ({
    platforms,
    ui,
    minEth,
  })

  const getSharedSecurityProperties = ({
    isFoss,
    audits,
    hasBugBounty,
    launchDate,
    isTrustless,
    isPermissionless,
  }) => ({
    openSource: getFlagFromBoolean(isFoss),
    audited: getFlagFromBoolean(audits?.length),
    bugBounty: getFlagFromBoolean(hasBugBounty),
    battleTested: getBattleTestedFlag(launchDate),
    trustless: getFlagFromBoolean(isTrustless),
    permissionless: getFlagFromBoolean(isPermissionless),
  })

  const categoryProducts = stakingProducts[category]

  const products = []

  // Solo staking products
  if (category === "nodeTools") {
    products.push(
      ...categoryProducts.map((listing) => ({
        ...getBrandProperties(listing),
        ...getTagProperties(listing),
        ...getSharedSecurityProperties(listing),
        multiClient: getFlagFromBoolean(listing.multiClient),
        selfCustody: getFlagFromBoolean(true),
        economical: getFlagFromBoolean(listing.minEth < 32),
      }))
    )
  }
  // Staking as a service
  if (category === "saas") {
    products.push(
      ...categoryProducts.map((listing) => ({
        ...getBrandProperties(listing),
        ...getTagProperties(listing),
        ...getSharedSecurityProperties(listing),
        diverseClients: getDiversityOfClients(listing.pctMajorityClient),
        selfCustody: getFlagFromBoolean(listing.isSelfCustody),
      }))
    )
  }
  // Pooled staking services
  if (category === "pools") {
    products.push(
      ...categoryProducts.map((listing) => ({
        ...getBrandProperties(listing),
        ...getTagProperties(listing),
        ...getSharedSecurityProperties(listing),
        diverseClients: getDiversityOfClients(listing.pctMajorityClient),
        selfCustody: getFlagFromBoolean(listing.tokens?.length),
      }))
    )
  }
  // Key generators
  if (category === "keyGen") {
    products.push(
      ...categoryProducts.map((listing) => ({
        ...getBrandProperties(listing),
        ...getTagProperties(listing),
        ...getSharedSecurityProperties(listing),
        selfCustody: getFlagFromBoolean(listing.isSelfCustody),
      }))
    )
  }
  if (!products) return null
  return (
    <CardGrid>
      {products.map((product) => (
        <StakingProductCard product={product} />
      ))}
    </CardGrid>
  )
}
export default StakingProductCardGrid
