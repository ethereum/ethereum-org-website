import React, { useState, useEffect, ReactNode } from "react"
import { graphql, PageProps } from "gatsby"
import makeBlockie from "ethereum-blockies-base64"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Heading,
  Img,
  Text,
  useToken,
} from "@chakra-ui/react"

import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import CardList from "../../components/CardList"
import Checkbox from "../../components/Checkbox"
import CopyToClipboard from "../../components/CopyToClipboard"
import Emoji from "../../components/Emoji"
import InfoBanner from "../../components/InfoBanner"
import Link from "../../components/Link"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import Tooltip from "../../components/Tooltip"
import FeedbackCard from "../../components/FeedbackCard"

import { DEPOSIT_CONTRACT_ADDRESS } from "../../data/addresses"
import { TranslationKey } from "../../utils/translations"
import { getImage } from "../../utils/image"

import type { ChildOnlyProp, Context } from "../../types"

const FlexBox = (props: ChildOnlyProp) => (
  <Flex
    borderBottom="1px"
    borderBottomColor="border"
    direction={{ base: "column", lg: "row" }}
    {...props}
  />
)

const LeftColumn = (props: ChildOnlyProp) => (
  <Box flex="1 1 50%" p={8} pt={20} {...props} />
)

const RightColumn = (props: ChildOnlyProp) => (
  <Flex
    flex="1 1 50%"
    p={8}
    pt={{ base: 4, lg: "8.5rem" }}
    direction="column"
    alignItems="center"
    {...props}
  />
)

const Title = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    fontWeight="700"
    fontSize="2rem"
    lineHeight="140%"
    color="text"
    {...props}
  />
)

const Subtitle = (props: ChildOnlyProp) => (
  <Text fontSize="xl" lineHeight="140%" color="text200" mb={14} {...props} />
)

const ButtonRow = (props: ChildOnlyProp) => (
  <Flex
    flexDir={{ base: "column-reverse", md: "row" }}
    alignItems={{ base: "flex-start", md: "center" }}
    justifyContent={{ base: "flex-start", md: "initial" }}
    {...props}
  />
)

const StyledButton = (props: { id: TranslationKey; to: string }) => (
  <ButtonLink to={props.to} mt="0" mb={12}>
    <Translation id={props.id} />
  </ButtonLink>
)

const CardTag = (props: ChildOnlyProp) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    p={2}
    bg="primary.base"
    borderBottom="1px solid border"
    color="buttonColor"
    borderRadius="3px 3px 0px 0px"
    textTransform="uppercase"
    fontSize="sm"
    {...props}
  />
)

const AddressCard = (props: ChildOnlyProp) => {
  const tableBoxShadow = useToken("colors", "tableBoxShadow")
  return (
    <Box
      bg="background.base"
      border="1px solid"
      borderColor="border"
      borderRadius="4px"
      boxShadow={tableBoxShadow}
      mb={8}
      maxWidth={{ base: "100%", lg: "560px" }}
      position={{ base: "initial", lg: "sticky" }}
      top={{ base: "initial", lg: "7.25rem" }}
      {...props}
    />
  )
}

const Address = (props: ChildOnlyProp) => (
  <Box
    fontFamily="monospace"
    borderRadius="sm"
    fontSize="2rem"
    flexWrap="wrap"
    textTransform="uppercase"
    lineHeight="140%"
    mb={4}
    {...props}
  />
)

const CopyButton = (props: ButtonProps) => (
  <Button
    variant="outline"
    mb={4}
    mr={{ base: 0, md: 6 }}
    mt={{ base: 4, md: 0 }}
    {...props}
  />
)

const Row = (props: ChildOnlyProp) => (
  <Flex
    alignItems="flex-start"
    mb={4}
    justifyContent={{ base: "flex-start", md: "space-between" }}
    flexDir={["column", "column", "row"]}
    textAlign="left"
    {...props}
  />
)

const CardTitle = (props: ChildOnlyProp) => (
  <Heading
    as="h2"
    mt={0}
    mb={4}
    fontWeight="600"
    fontSize="2rem"
    lineHeight={1.4}
    {...props}
  />
)

const Caption = (props: ChildOnlyProp) => (
  <Text
    color="text200"
    fontWeight="400"
    fontSize="sm"
    mb={[8, 8, 0]}
    {...props}
  />
)

const Blockie = (props: { src: string }) => (
  <Img src={props.src} borderRadius="base" height={16} width={16} />
)

const StyledFakeLink = (props: { onClick: any; children: ReactNode }) => (
  <Text
    as="button"
    onClick={props.onClick}
    mr={2}
    color="primary.base"
    cursor="pointer"
  >
    {props.children}
  </Text>
)

const CHUNKED_ADDRESS = DEPOSIT_CONTRACT_ADDRESS.match(/.{1,3}/g)?.join(" ")

const blockieSrc = makeBlockie(DEPOSIT_CONTRACT_ADDRESS)

const DepositContractPage = ({
  data,
  location,
}: PageProps<Queries.DepositContractPageQuery, Context>) => {
  const { t } = useTranslation()

  const [state, setState] = useState<{
    browserHasTextToSpeechSupport: boolean
    textToSpeechRequest: SpeechSynthesisUtterance | undefined
    isSpeechActive: boolean
    showAddress: boolean
    userHasUsedLaunchpad: boolean
    userUnderstandsStaking: boolean
    userWillCheckOtherSources: boolean
  }>({
    browserHasTextToSpeechSupport: false,
    textToSpeechRequest: undefined,
    isSpeechActive: false,
    showAddress: false,
    userHasUsedLaunchpad: false,
    userUnderstandsStaking: false,
    userWillCheckOtherSources: false,
  })

  useEffect(() => {
    const browserHasTextToSpeechSupport = !!window.speechSynthesis
    if (!browserHasTextToSpeechSupport) {
      return
    }
    // Create textToSpeechRequest
    let speech = new SpeechSynthesisUtterance()
    speech.lang = "en-US"
    speech.text = DEPOSIT_CONTRACT_ADDRESS.split("").join(",")
    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1
    // Add event listeners
    // Explicitly set state in listener callback
    const speechCallbackState = {
      browserHasTextToSpeechSupport: true,
      textToSpeechRequest: speech,
      showAddress: true,
      userHasUsedLaunchpad: true,
      userUnderstandsStaking: true,
      userWillCheckOtherSources: true,
    }
    const onStartCallback = () =>
      setState({ ...speechCallbackState, isSpeechActive: true })
    const onEndCallback = () =>
      setState({ ...speechCallbackState, isSpeechActive: false })
    speech.addEventListener("start", onStartCallback)
    speech.addEventListener("end", onEndCallback)

    setState((prevState) => ({
      ...prevState,
      browserHasTextToSpeechSupport,
      textToSpeechRequest: speech,
    }))
    return () => {
      speech.removeEventListener("start", onStartCallback)
      speech.removeEventListener("end", onEndCallback)
      window.speechSynthesis.cancel()
    }
  }, [])

  const handleTextToSpeech = () => {
    if (!window.speechSynthesis) {
      console.error(
        "Browser doesn't support the 'SpeechSynthesis' text-to-speech API"
      )
      return
    }
    if (state.isSpeechActive) {
      window.speechSynthesis.cancel()
    } else {
      window.speechSynthesis.speak(
        state.textToSpeechRequest as SpeechSynthesisUtterance
      )
    }
  }

  const addressSources = [
    {
      title: "ConsenSys",
      link: "https://consensys.net/blog/news/eth2-phase-0-deposit-contract-address/",
      image: getImage(data.consensys)!,
      alt: "",
    },
    {
      title: "Ethereum Foundation",
      link: "https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/",
      image: getImage(data.ef)!,
      alt: "",
    },
    {
      title: "Etherscan",
      link: `https://etherscan.io/address/${DEPOSIT_CONTRACT_ADDRESS}`,
      image: getImage(data.etherscan)!,
      alt: "",
    },
  ]

  const isButtonEnabled =
    state.userHasUsedLaunchpad &&
    state.userUnderstandsStaking &&
    state.userWillCheckOtherSources

  const textToSpeechText = state.isSpeechActive
    ? t("page-staking-deposit-contract-stop-reading")
    : t("page-staking-deposit-contract-read-aloud")
  const textToSpeechEmoji = state.isSpeechActive
    ? ":speaker_high_volume:"
    : ":speaker:"
  return (
    <Box w="100%">
      <FlexBox>
        <PageMetadata
          title={t("page-staking-deposit-contract-meta-title")}
          description={t("page-staking-deposit-contract-meta-desc")}
        />
        <LeftColumn>
          <Breadcrumbs slug={location.pathname} startDepth={1} />
          <Title>
            <Translation id="page-staking-deposit-contract-title" />
          </Title>
          <Subtitle>
            <Translation id="page-staking-deposit-contract-subtitle" />
          </Subtitle>
          <h2>
            <Translation id="page-staking-deposit-contract-h2" />
          </h2>
          <p>
            <Translation id="page-staking-deposit-contract-staking" />{" "}
            <Link to="/staking/">
              <Translation id="page-staking-deposit-contract-staking-more-link" />
            </Link>
          </p>
          <StyledButton
            to="https://launchpad.ethereum.org"
            id="page-staking-deposit-contract-launchpad"
          />
          <h2>
            <Translation id="page-staking-deposit-contract-staking-check" />
          </h2>
          <p>
            <Translation id="page-staking-deposit-contract-staking-check-desc" />
          </p>
          <CardList content={addressSources} />
        </LeftColumn>
        <RightColumn>
          <AddressCard>
            <CardTag>
              <Translation id="page-staking-deposit-contract-address-check-btn" />
            </CardTag>
            <Box m={8}>
              {!state.showAddress && (
                <>
                  <Row>
                    <CardTitle>
                      <Translation id="page-staking-deposit-contract-confirm-address" />
                    </CardTitle>
                  </Row>
                  <Checkbox
                    isChecked={state.userHasUsedLaunchpad}
                    size="md"
                    mb="0.5rem"
                    display="flex"
                    alignItems="top"
                    variant="alignTop"
                    minHeight="3.5rem"
                    onChange={() =>
                      setState({
                        ...state,
                        userHasUsedLaunchpad: !state.userHasUsedLaunchpad,
                      })
                    }
                  >
                    <Translation id="page-staking-deposit-contract-checkbox1" />
                  </Checkbox>
                  <Checkbox
                    isChecked={state.userUnderstandsStaking}
                    size="md"
                    mb="0.5rem"
                    display="flex"
                    alignItems="top"
                    variant="alignTop"
                    minHeight="3.5rem"
                    onChange={() =>
                      setState({
                        ...state,
                        userUnderstandsStaking: !state.userUnderstandsStaking,
                      })
                    }
                  >
                    <Translation id="page-staking-deposit-contract-checkbox2" />
                  </Checkbox>
                  <Checkbox
                    isChecked={state.userWillCheckOtherSources}
                    size="md"
                    mb="0.5rem"
                    display="flex"
                    alignItems="top"
                    variant="alignTop"
                    minHeight="3.5rem"
                    onChange={() =>
                      setState({
                        ...state,
                        userWillCheckOtherSources:
                          !state.userWillCheckOtherSources,
                      })
                    }
                  >
                    <Translation id="page-staking-deposit-contract-checkbox3" />
                  </Checkbox>
                  <CopyButton
                    isDisabled={!isButtonEnabled}
                    leftIcon={<Emoji text=":eyes:" boxSize={4} />}
                    onClick={() =>
                      setState({ ...state, showAddress: !state.showAddress })
                    }
                  >
                    <Translation id="page-staking-deposit-contract-reveal-address-btn" />
                  </CopyButton>
                </>
              )}
              {state.showAddress && (
                <>
                  <Row>
                    <Box>
                      <CardTitle>
                        <Translation id="page-staking-deposit-contract-address" />
                      </CardTitle>
                      <Caption>
                        <Translation id="page-staking-deposit-contract-address-caption" />
                      </Caption>
                    </Box>
                    <Blockie src={blockieSrc} />
                  </Row>
                  {state.browserHasTextToSpeechSupport && (
                    <Flex mb={8} alignItems="center">
                      <StyledFakeLink onClick={handleTextToSpeech}>
                        <Translation id={textToSpeechText as TranslationKey} />
                      </StyledFakeLink>{" "}
                      <Emoji text={textToSpeechEmoji} boxSize={4} />
                    </Flex>
                  )}
                  <Tooltip content={t("page-staking-deposit-contract-warning")}>
                    <Address>{CHUNKED_ADDRESS}</Address>
                  </Tooltip>
                  <ButtonRow>
                    <CopyToClipboard text={DEPOSIT_CONTRACT_ADDRESS}>
                      {(isCopied) => (
                        <CopyButton
                          leftIcon={
                            isCopied ? (
                              <Emoji text=":white_check_mark:" boxSize={4} />
                            ) : (
                              <Emoji text=":clipboard:" boxSize={4} />
                            )
                          }
                        >
                          {!isCopied ? (
                            <Translation id="page-staking-deposit-contract-copy" />
                          ) : (
                            <Translation id="page-staking-deposit-contract-copied" />
                          )}
                        </CopyButton>
                      )}
                    </CopyToClipboard>
                    <Link
                      to={`https://etherscan.io/address/${DEPOSIT_CONTRACT_ADDRESS}`}
                    >
                      <Translation id="page-staking-deposit-contract-etherscan" />
                    </Link>
                  </ButtonRow>
                </>
              )}
              <InfoBanner isWarning emoji=":warning:">
                <div>
                  <Translation id="page-staking-deposit-contract-warning-2" />{" "}
                  <Link to="https://launchpad.ethereum.org">
                    <Translation id="page-staking-deposit-contract-launchpad-2" />
                  </Link>
                </div>
              </InfoBanner>
            </Box>
          </AddressCard>
        </RightColumn>
      </FlexBox>
      <FeedbackCard />
    </Box>
  )
}

export default DepositContractPage

export const sourceImage = graphql`
  fragment sourceImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 20
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query DepositContractPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-staking-deposit-contract", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    consensys: file(relativePath: { eq: "projects/consensys.png" }) {
      ...sourceImage
    }
    ef: file(relativePath: { eq: "staking/ef-blog-logo.png" }) {
      ...sourceImage
    }
    etherscan: file(
      relativePath: { eq: "projects/etherscan-logo-circle.png" }
    ) {
      ...sourceImage
    }
  }
`
