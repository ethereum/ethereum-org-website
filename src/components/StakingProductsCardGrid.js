import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"
// SVG imports
import GreenCheck from "../assets/staking/green-check-product-glyph.svg"
import Caution from "../assets/staking/caution-product-glyph.svg"
import Warning from "../assets/staking/warning-product-glyph.svg"
import Unknown from "../assets/staking/unknown-product-glyph.svg"
// Data imports
import stakingProducts from "../data/staking-products.json"
// Component imports
import ButtonLink from "./ButtonLink"

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 2rem;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.offBackground};
  border-radius: 0.25rem;
`

const PaddedDiv = styled.div`
  padding: 2rem;
`

const Spacer = styled.div`
  flex: 1;
`

const Pill = styled.div`
  text-align: center;
  padding: 0.25rem 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  background: ${({ theme, type }) => {
    switch (type.toLowerCase()) {
      case "ui":
        return theme.colors.stakingPillUI
      case "platform":
        return theme.colors.stakingPillPlatform
      default:
        return theme.colors.tagGray
    }
  }};
  font-size: ${(props) => props.theme.fontSizes.xs};
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-radius: 0.25rem;
`

const Svg = styled.div`
  --size: ${({ size }) => (size ? size : `3rem`)};
  /* background-image: url("${({ svgPath }) => svgPath}"); */
  height: var(--size);
  width: var(--size);
`

const Banner = styled(PaddedDiv)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: ${({ color }) => color}
    linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  border-radius: 0.25rem;
  h2 {
    margin: 0;
    color: white;
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
    case ("warning", "false"):
      return <StyledWarning />
    default:
      return <StyledUnknown disabled={true} />
  }
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
  },
}) => {
  return (
    <Card>
      <Banner color={color}>
        {/* TODO: Dynamically load SVG based on filename provided in `svgPath` */}
        <Svg svgPath={svgPath} />
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
      </Pills>
      <Spacer />
      <Content>
        <ul>
          <Item>
            <Status status={openSource} />
            Open source
          </Item>
          <Item>
            <Status status={audited} />
            Audited
          </Item>
          <Item>
            <Status status={bugBounty} />
            Bug Bounty
          </Item>
          <Item>
            <Status status={battleTested} />
            Battle tested
          </Item>
          <Item>
            <Status status={trustless} />
            Trustless
          </Item>
          <Item>
            <Status status={permissionless} />
            Permissionless
          </Item>
          <Item>Min ETH: {minEth} ETH</Item>
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
  const [SAT, LUM] = isDarkTheme ? ["60%", "35%"] : ["95%", "70%"]

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
    svgPath: svgPath ? `../assets/staking/${svgPath}` : ``,
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
        economical: getFlagFromBoolean(listing.minEth < 32),
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
        economical: getFlagFromBoolean(listing.minEth < 32),
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
