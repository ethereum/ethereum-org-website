import { useEffect, useState } from "react"
import makeBlockie from "ethereum-blockies-base64"
import { type GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  Button,
  type ButtonProps,
  Checkbox,
  Flex,
  forwardRef,
  Heading,
  Img,
  Text,
  TextProps,
  useToken,
} from "@chakra-ui/react"

import type {
  BasePageProps,
  ChildOnlyProp,
  Lang,
  TranslationKey,
} from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import ButtonLink, {
  type ButtonLinkProps,
} from "@/components/Buttons/ButtonLink"
import CardList from "@/components/CardList"
import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import InfoBanner from "@/components/InfoBanner"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import PageMetadata from "@/components/PageMetadata"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DEPOSIT_CONTRACT_ADDRESS } from "@/data/addresses"

import consensys from "@/public/images/projects/consensys.png"
import etherscan from "@/public/images/projects/etherscan-logo-circle.png"
import ef from "@/public/images/staking/ef-blog-logo.png"

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
  <OldHeading
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

const StyledButton = ({
  href,
  children,
}: Pick<ButtonLinkProps, "href" | "children">) => (
  <ButtonLink href={href} mt="0" mb="12">
    {children}
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

const Address = forwardRef<ChildOnlyProp, "div">((props, ref) => (
  <Box
    ref={ref}
    fontFamily="monospace"
    borderRadius="sm"
    fontSize="2rem"
    flexWrap="wrap"
    textTransform="uppercase"
    lineHeight="140%"
    mb={4}
    {...props}
  />
))

const CopyButton = (props: ButtonProps) => (
  <Button
    variant="outline"
    mb={4}
    me={{ base: 0, md: 6 }}
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

const StyledFakeLink = forwardRef<TextProps, "button">((props, ref) => (
  <Text
    ref={ref}
    as="button"
    me={2}
    color="primary.base"
    cursor="pointer"
    {...props}
  />
))

const CHUNKED_ADDRESS = DEPOSIT_CONTRACT_ADDRESS.match(/.{1,3}/g)?.join(" ")

const blockieSrc = makeBlockie(DEPOSIT_CONTRACT_ADDRESS)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/staking/deposit-contract"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const DepositContractPage = () => {
  const { asPath } = useRouter()

  const { t } = useTranslation("page-staking-deposit-contract")

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
    if (!browserHasTextToSpeechSupport) return
    // Create textToSpeechRequest
    const speech = new SpeechSynthesisUtterance()
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
      image: consensys,
      alt: "",
    },
    {
      title: "Ethereum Foundation",
      link: "https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/",
      image: ef,
      alt: "",
    },
    {
      title: "Etherscan",
      link: `https://etherscan.io/address/${DEPOSIT_CONTRACT_ADDRESS}`,
      image: etherscan,
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
    <Box as={MainArticle} w="100%">
      <FlexBox>
        <PageMetadata
          title={t("page-staking-deposit-contract-meta-title")}
          description={t("page-staking-deposit-contract-meta-desc")}
        />
        <LeftColumn>
          <Breadcrumbs slug={asPath} startDepth={1} />
          <Title>{t("page-staking-deposit-contract-title")}</Title>
          <Subtitle>{t("page-staking-deposit-contract-subtitle")}</Subtitle>
          <OldHeading>{t("page-staking-deposit-contract-h2")}</OldHeading>
          <Text>
            {t("page-staking-deposit-contract-staking")}{" "}
            <InlineLink href="/staking/">
              {t("page-staking-deposit-contract-staking-more-link")}
            </InlineLink>
          </Text>
          <StyledButton href="https://launchpad.ethereum.org">
            {t("page-staking-deposit-contract-launchpad")}
          </StyledButton>
          <OldHeading>
            {t("page-staking-deposit-contract-staking-check")}
          </OldHeading>
          <Text>{t("page-staking-deposit-contract-staking-check-desc")}</Text>
          <CardList items={addressSources} />
        </LeftColumn>
        <RightColumn>
          <AddressCard>
            <CardTag>
              {t("page-staking-deposit-contract-address-check-btn")}
            </CardTag>
            <Box m={8}>
              {!state.showAddress && (
                <>
                  <Row>
                    <CardTitle>
                      {t("page-staking-deposit-contract-confirm-address")}
                    </CardTitle>
                  </Row>
                  <Checkbox
                    mb={2}
                    isChecked={state.userHasUsedLaunchpad}
                    onChange={() =>
                      setState({
                        ...state,
                        userHasUsedLaunchpad: !state.userHasUsedLaunchpad,
                      })
                    }
                  >
                    {t("page-staking-deposit-contract-checkbox1")}
                  </Checkbox>
                  <Checkbox
                    mb={2}
                    isChecked={state.userUnderstandsStaking}
                    onChange={() =>
                      setState({
                        ...state,
                        userUnderstandsStaking: !state.userUnderstandsStaking,
                      })
                    }
                  >
                    {t("page-staking-deposit-contract-checkbox2")}
                  </Checkbox>
                  <Checkbox
                    mb={2}
                    isChecked={state.userWillCheckOtherSources}
                    onChange={() =>
                      setState({
                        ...state,
                        userWillCheckOtherSources:
                          !state.userWillCheckOtherSources,
                      })
                    }
                  >
                    {t("page-staking-deposit-contract-checkbox3")}
                  </Checkbox>
                  <CopyButton
                    isDisabled={!isButtonEnabled}
                    leftIcon={<Emoji text=":eyes:" boxSize={4} />}
                    onClick={() =>
                      setState({ ...state, showAddress: !state.showAddress })
                    }
                  >
                    {t("page-staking-deposit-contract-reveal-address-btn")}
                  </CopyButton>
                </>
              )}
              {state.showAddress && (
                <>
                  <Row>
                    <Box>
                      <CardTitle>
                        {t("page-staking-deposit-contract-address")}
                      </CardTitle>
                      <Caption>
                        {t("page-staking-deposit-contract-address-caption")}
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
                          {!isCopied
                            ? t("page-staking-deposit-contract-copy")
                            : t("page-staking-deposit-contract-copied")}
                        </CopyButton>
                      )}
                    </CopyToClipboard>
                    <InlineLink
                      href={`https://etherscan.io/address/${DEPOSIT_CONTRACT_ADDRESS}`}
                    >
                      {t("page-staking-deposit-contract-etherscan")}
                    </InlineLink>
                  </ButtonRow>
                </>
              )}
              <InfoBanner isWarning emoji=":warning:">
                <div>
                  {t("page-staking-deposit-contract-warning-2")}{" "}
                  <InlineLink href="https://launchpad.ethereum.org">
                    {t("page-staking-deposit-contract-launchpad-2")}
                  </InlineLink>
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
