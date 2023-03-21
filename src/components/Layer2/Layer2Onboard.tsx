// Libraries
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "@emotion/styled"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { Stack, Text } from "@chakra-ui/react"

// Components
import ButtonLink from "../ButtonLink"
import Link from "../Link"
import Translation from "../Translation"
import { StyledSelect as Select } from "../SharedStyledComponents"

// Data
import {
  cexOnboardData,
  CexOnboard,
} from "../../data/layer-2/cex-layer-2-onboard"
import cexSupport from "../../data/layer-2/cex-layer-2-support.json"

//Utils
import { trackCustomEvent } from "../../utils/matomo"

// Styles
const Content = styled.div`
  background: ${(props) => props.theme.colors.layer2Gradient};
  padding: 2.5rem;
  border-radius: 2px;
`

const Description = styled.div`
  text-align: center;
  max-width: 75ch;
  margin: auto;
`

const H3 = styled.h3`
  margin-top: 0;
`

const Flex50 = styled.div`
  flex: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const TwoColumnContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

// https://react-select.com/styles#using-classnames
// Pass menuIsOpen={true} to component to debug
const StyledSelect = styled(Select)`
  max-width: none;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    .react-select__control {
      padding: 14px 0;
    }
  }
`

const SelectedContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  margin-top: 0.5rem;
  padding: 21px;
`

const ButtonLinkMargin = styled(ButtonLink)`
  margin-top: 2.5rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(21, 1fr);
  gap: 10px;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: repeat(11, 1fr);
    margin: auto;
  }
`

const LeftDescription = styled.div`
  grid-column: 1/11;
  grid-row: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 1;
  }
`

const LeftSelect = styled.div`
  grid-column: 1/11;
  grid-row: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 2;
  }
`

const RightDescription = styled.div`
  grid-column: 12/22;
  grid-row: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 5;
  }
`

const RightSelect = styled.div`
  grid-column: 12/22;
  grid-row: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 6;
  }
`

const LeftSelected = styled.div`
  grid-column: 1/11;
  grid-row: 3/6;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 3;
  }
`

const EthLogo = styled.div`
  grid-column: 11;
  grid-row: 4;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 4;
  }
`

const Image = styled(GatsbyImage)`
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 1.5rem;
  }
`

const RightSelected = styled.div`
  grid-column: 12/22;
  grid-row: 3/6;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 7;
  }
`

interface Exchange {
  name: string
  supports_deposits: Array<string>
  supports_withdrawals: Array<string>
  url: string
}

interface Layer2 {
  name: string
  bridgeWallets: Array<string>
  bridge: string
}

interface Option {
  value: string
  label: string
}

interface Layer2Option extends Option {
  l2: Layer2
}

interface ExchangeOption extends Option {
  cex: Exchange
}

interface CexOnboardOption extends Option {
  cexOnboard: CexOnboard
}

export interface IProps {
  layer2DataCombined: Array<Layer2>
  ethIcon: IGatsbyImageData
  ethIconAlt: string
}

const Layer2Onboard: React.FC<IProps> = ({
  layer2DataCombined,
  ethIcon,
  ethIconAlt,
}) => {
  const { t } = useTranslation()

  const [selectedCexOnboard, setSelectedCexOnboard] = useState<
    CexOnboard | undefined
  >(undefined)
  const [selectedExchange, setSelectedExchange] = useState<
    Exchange | undefined
  >(undefined)
  const [selectedL2, setSelectedL2] = useState<Layer2 | undefined>(undefined)

  const layer2Options: Array<Layer2Option> = layer2DataCombined.map((l2) => {
    return {
      label: l2.name,
      value: l2.name,
      l2,
    }
  })

  const cexSupportOptions: Array<ExchangeOption> = cexSupport.map(
    (cex: Exchange) => {
      return {
        label: cex.name,
        value: cex.name,
        cex,
      }
    }
  )

  const cexOnboardOptions: Array<CexOnboardOption> = cexOnboardData.map(
    (cexOnboard: CexOnboard) => {
      return {
        label: cexOnboard.name,
        value: cexOnboard.name,
        cexOnboard: cexOnboard,
      }
    }
  )

  const formatGroupLabel = (data) => {
    return data.label ? (
      <Stack borderTop="2px solid" m={0}>
        <Text mb={0} mt={2} textTransform="none" color="theme.colors.text">
          {data.label}
        </Text>
      </Stack>
    ) : (
      <></>
    )
  }

  const selectExchangeOnboard = (option: ExchangeOption | CexOnboardOption) => {
    if (Object.hasOwn(option, "cex")) {
      trackCustomEvent({
        eventCategory: `Selected cex to onboard`,
        eventAction: `Clicked`,
        eventName: `${option.cex.name} selected`,
        eventValue: `${option.cex.name}`,
      })
      setSelectedExchange(option.cex)
      setSelectedCexOnboard(undefined)
    } else {
      trackCustomEvent({
        eventCategory: `Selected cexOnboard to onboard`,
        eventAction: `Clicked`,
        eventName: `${option.cexOnboard.name} selected`,
        eventValue: `${option.cexOnboard.name}`,
      })
      setSelectedCexOnboard(option.cexOnboard)
      setSelectedExchange(undefined)
    }
  }

  return (
    <Content>
      <Description>
        <h2>
          <Translation id="layer-2-onboard-title" />
        </h2>
        <p>
          <Translation id="layer-2-onboard-1" />
        </p>
      </Description>
      <Grid>
        <LeftDescription>
          <h4>
            <Translation id="layer-2-onboard-wallet-title" />
          </h4>
          <p>
            <Translation id="layer-2-onboard-wallet-1" />
          </p>
          <p>
            <Link to="/bridges/">
              <Translation id="layer-2-more-on-bridges" />
            </Link>
          </p>
        </LeftDescription>
        <LeftSelect>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={layer2Options}
            onChange={(selectedOption: Layer2Option) => {
              trackCustomEvent({
                eventCategory: `Selected layer 2 to bridge to`,
                eventAction: `Clicked`,
                eventName: `${selectedOption.l2.name} bridge selected`,
                eventValue: `${selectedOption.l2.name}`,
              })
              setSelectedL2(selectedOption.l2)
            }}
            placeholder={t("layer-2-onboard-wallet-input-placeholder")}
          />
        </LeftSelect>
        {selectedL2 && (
          <LeftSelected>
            <SelectedContainer>
              <p>
                <b>{`${t("layer-2-onboard-wallet-selected-1")} ${
                  selectedL2.name
                } ${t("layer-2-onboard-wallet-selected-2")}`}</b>
              </p>
              <p>{selectedL2.bridgeWallets.join(", ")}</p>
              <ButtonLinkMargin to={selectedL2.bridge}>
                {`${selectedL2.name} ${t("layer-2-bridge")}`}
              </ButtonLinkMargin>
            </SelectedContainer>
          </LeftSelected>
        )}
        <RightDescription>
          <h4>
            <Translation id="layer-2-onboard-exchange-title" />
          </h4>
          <p>
            <Translation id="layer-2-onboard-exchange-1" />
          </p>
          <p>
            <Translation id="layer-2-onboard-exchange-2" />{" "}
            <Link to="/wallets/find-wallet/">
              <Translation id="layer-2-onboard-find-a-wallet" />
            </Link>
          </p>
        </RightDescription>
        <RightSelect>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                options: [...cexSupportOptions],
              },
              {
                label:
                  "Don't see you exchange? Use dapps to bridge directly from exchanges to layer 2.",
                options: [...cexOnboardOptions],
              },
            ]}
            onChange={(selectedOption: ExchangeOption | CexOnboardOption) => {
              selectExchangeOnboard(selectedOption)
            }}
            placeholder={t("layer-2-onboard-exchange-input-placeholder")}
            formatGroupLabel={formatGroupLabel}
          />
        </RightSelect>
        <EthLogo>
          <Image image={ethIcon} objectFit="contain" alt={ethIconAlt} />
        </EthLogo>
        {selectedExchange && (
          <RightSelected>
            <SelectedContainer>
              <TwoColumnContent>
                <Flex50>
                  <H3>
                    <Translation id="layer-2-deposits" />
                  </H3>
                  <ul>
                    {selectedExchange.supports_deposits.map((l2) => (
                      <li key={l2}>{l2}</li>
                    ))}
                  </ul>
                </Flex50>
                <Flex50>
                  <H3>
                    <Translation id="layer-2-withdrawals" />
                  </H3>
                  <ul>
                    {selectedExchange.supports_withdrawals.map((l2) => (
                      <li key={l2}>{l2}</li>
                    ))}
                  </ul>
                </Flex50>
              </TwoColumnContent>
              <ButtonLink to={selectedExchange.url}>
                {`${t("layer-2-go-to")} ${selectedExchange.name}`}
              </ButtonLink>
            </SelectedContainer>
          </RightSelected>
        )}
        {selectedCexOnboard && (
          <RightSelected>
            <SelectedContainer>
              <H3>Supported exchanges</H3>
              <p>{selectedCexOnboard.cex_support.join(", ")}</p>
              <H3>Supported layer 2s</H3>
              <p>{selectedCexOnboard.network_support.join(", ")}</p>
              <ButtonLink to={selectedCexOnboard.url}>
                {`${t("layer-2-go-to")} ${selectedCexOnboard.name}`}
              </ButtonLink>
            </SelectedContainer>
          </RightSelected>
        )}
      </Grid>
    </Content>
  )
}

export default Layer2Onboard
