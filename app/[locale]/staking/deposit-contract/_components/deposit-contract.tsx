"use client"
import { useEffect, useState } from "react"
import makeBlockie from "ethereum-blockies-base64"
import { Clipboard, ClipboardCheck } from "lucide-react"

import type { ChildOnlyProp, Lang, TranslationKey } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import CardList from "@/components/CardList"
import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertEmoji,
} from "@/components/ui/alert"
import {
  Button,
  ButtonLink,
  type ButtonLinkProps,
  type ButtonProps,
} from "@/components/ui/buttons/Button"
import Checkbox from "@/components/ui/checkbox"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { DEPOSIT_CONTRACT_ADDRESS } from "@/data/addresses"

import useTranslation from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/routing"
import consensys from "@/public/images/projects/consensys.png"
import blockscout from "@/public/images/resources/blockscout.webp"
import ef from "@/public/images/staking/ef-blog-logo.png"

const FlexBox = (props: ChildOnlyProp) => (
  <Flex className="flex-col border-b lg:flex-row" {...props} />
)

const LeftColumn = (props: ChildOnlyProp) => (
  <div className="flex-shrink flex-grow basis-1/2 p-8 pt-20" {...props} />
)

const RightColumn = (props: ChildOnlyProp) => (
  <Flex
    className="flex-shrink flex-grow basis-1/2 flex-col items-center p-8 pt-4 lg:pt-36"
    {...props}
  />
)

const Title = (props: ChildOnlyProp) => (
  <h1 className="py-8 leading-xs" {...props} />
)

const Subtitle = (props: ChildOnlyProp) => (
  <p className="mb-14 leading-xs text-body-medium" {...props} />
)

const ButtonRow = (props: ChildOnlyProp) => (
  <Flex
    className="flex-col-reverse items-start justify-start md:flex-row md:items-center"
    {...props}
  />
)

const H2 = (props: ChildOnlyProp) => (
  <h2 className="mb-8 mt-12 leading-xs" {...props} />
)

const StyledButton = ({
  href,
  children,
}: Pick<ButtonLinkProps, "href" | "children">) => (
  <ButtonLink className="mb-12 mt-0" href={href}>
    {children}
  </ButtonLink>
)

const CardTag = (props: ChildOnlyProp) => (
  <Flex
    className="items-center justify-center rounded-t-sm border-b-white bg-primary p-2 text-sm uppercase text-white dark:text-background-medium"
    {...props}
  />
)

const AddressCard = (props: ChildOnlyProp) => {
  return (
    <div
      className="mb-8 max-w-full rounded-sm border border-border shadow-table lg:sticky lg:top-28 lg:max-w-[560px]"
      {...props}
    />
  )
}

const Address = (props: ChildOnlyProp) => (
  <div
    className="mb-4 flex-wrap rounded-sm font-monospace text-[2rem] uppercase leading-xs"
    {...props}
  />
)

const CopyButton = (props: ButtonProps) => (
  <Button
    className="mb-4 me-0 mt-4 md:me-6 md:mt-0"
    variant="outline"
    {...props}
  />
)

const Row = (props: ChildOnlyProp) => (
  <Flex
    className="mb-4 flex-col items-start justify-start text-left md:flex-row md:justify-between"
    {...props}
  />
)

const CardTitle = (props: ChildOnlyProp) => (
  <h2 className="mb-4 text-[2rem] font-semibold leading-[1.4]" {...props} />
)

const Caption = (props: ChildOnlyProp) => (
  <p className="mb-8 text-body-medium md:mb-8 lg:mb-0" {...props} />
)

const Blockie = (props: { src: string }) => (
  <Image
    className="rounded-sm"
    src={props.src}
    alt={""}
    height={64}
    width={64}
  />
)

const StyledFakeLink = (props: ButtonProps) => (
  <Button
    className="me-2 cursor-pointer px-0 text-primary"
    variant="ghost"
    {...props}
  />
)

const CHUNKED_ADDRESS =
  DEPOSIT_CONTRACT_ADDRESS.match(/(?:^0x|.{4})/g)?.join(" ")

const blockieSrc = makeBlockie(DEPOSIT_CONTRACT_ADDRESS)

const DepositContractPage = ({ locale }: { locale: Lang }) => {
  const pathname = usePathname()

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
      title: "Blockscout",
      link: `https://eth.blockscout.com/address/${DEPOSIT_CONTRACT_ADDRESS}`,
      image: blockscout,
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

  // JSON-LD structured data for the Deposit Contract page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://ethereum.org/${locale}/staking/deposit-contract/`,
    name: t("page-staking-deposit-contract-title"),
    description: t("page-staking-deposit-contract-subtitle"),
    url: `https://ethereum.org/${locale}/staking/deposit-contract/`,
    inLanguage: locale,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://ethereum.org/${locale}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Staking",
          item: `https://ethereum.org/${locale}/staking/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t("page-staking-deposit-contract-title"),
          item: `https://ethereum.org/${locale}/staking/deposit-contract/`,
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
  }

  // JSON-LD for the deposit contract article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("page-staking-deposit-contract-title"),
    description: t("page-staking-deposit-contract-subtitle"),
    author: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    about: {
      "@type": "Thing",
      name: "Ethereum Deposit Contract",
      description:
        "Official Ethereum 2.0 deposit contract address for staking validators",
    },
  }

  return (
    <>
      <script
        id="jsonld-webpage-deposit-contract"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd),
        }}
      />

      <script
        id="jsonld-article-deposit-contract"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      <MainArticle className="w-full">
        <FlexBox>
          <LeftColumn>
            <Breadcrumbs slug={pathname} startDepth={1} />
            <Title>{t("page-staking-deposit-contract-title")}</Title>
            <Subtitle>{t("page-staking-deposit-contract-subtitle")}</Subtitle>
            <H2>{t("page-staking-deposit-contract-h2")}</H2>
            <p className="mb-6">
              {t("page-staking-deposit-contract-staking")}{" "}
              <InlineLink href="/staking/">
                {t("page-staking-deposit-contract-staking-more-link")}
              </InlineLink>
            </p>
            <StyledButton href="https://launchpad.ethereum.org">
              {t("page-staking-deposit-contract-launchpad")}
            </StyledButton>
            <H2>{t("page-staking-deposit-contract-staking-check")}</H2>
            <p className="mb-6">
              {t("page-staking-deposit-contract-staking-check-desc")}
            </p>
            <CardList items={addressSources} />
          </LeftColumn>
          <RightColumn>
            <AddressCard>
              <CardTag>
                {t("page-staking-deposit-contract-address-check-btn")}
              </CardTag>
              <div className="m-8">
                {!state.showAddress && (
                  <>
                    <Row>
                      <CardTitle>
                        {t("page-staking-deposit-contract-confirm-address")}
                      </CardTitle>
                    </Row>
                    <Flex className="flex-col">
                      <label className="mb-2 flex items-center gap-2">
                        <Checkbox
                          className="flex-none"
                          checked={state.userHasUsedLaunchpad}
                          onCheckedChange={() =>
                            setState({
                              ...state,
                              userHasUsedLaunchpad: !state.userHasUsedLaunchpad,
                            })
                          }
                        />
                        {t("page-staking-deposit-contract-checkbox1")}
                      </label>
                      <label className="mb-2 flex items-center gap-2">
                        <Checkbox
                          className="flex-none"
                          checked={state.userUnderstandsStaking}
                          onCheckedChange={() =>
                            setState({
                              ...state,
                              userUnderstandsStaking:
                                !state.userUnderstandsStaking,
                            })
                          }
                        />
                        {t("page-staking-deposit-contract-checkbox2")}
                      </label>
                      <label className="mb-2 flex items-center gap-2">
                        <Checkbox
                          className="flex-none"
                          checked={state.userWillCheckOtherSources}
                          onCheckedChange={() =>
                            setState({
                              ...state,
                              userWillCheckOtherSources:
                                !state.userWillCheckOtherSources,
                            })
                          }
                        />
                        {t("page-staking-deposit-contract-checkbox3")}
                      </label>
                    </Flex>
                    <CopyButton
                      disabled={!isButtonEnabled}
                      onClick={() =>
                        setState({ ...state, showAddress: !state.showAddress })
                      }
                    >
                      <Emoji text=":eyes:" className="text-md" />
                      {t("page-staking-deposit-contract-reveal-address-btn")}
                    </CopyButton>
                  </>
                )}
                {state.showAddress && (
                  <>
                    <Row>
                      <div>
                        <CardTitle>
                          {t("page-staking-deposit-contract-address")}
                        </CardTitle>
                        <Caption>
                          {t("page-staking-deposit-contract-address-caption")}
                        </Caption>
                      </div>
                      <Blockie src={blockieSrc} />
                    </Row>
                    {state.browserHasTextToSpeechSupport && (
                      <Flex className="mb-8 items-center">
                        <StyledFakeLink onClick={handleTextToSpeech}>
                          <Translation
                            id={textToSpeechText as TranslationKey}
                          />
                        </StyledFakeLink>{" "}
                        <Emoji text={textToSpeechEmoji} className="text-md" />
                      </Flex>
                    )}
                    <Tooltip
                      content={t("page-staking-deposit-contract-warning")}
                    >
                      <Address>{CHUNKED_ADDRESS}</Address>
                    </Tooltip>
                    <ButtonRow>
                      <CopyToClipboard text={DEPOSIT_CONTRACT_ADDRESS}>
                        {(isCopied) => (
                          <CopyButton>
                            {!isCopied ? (
                              <>
                                {t("page-staking-deposit-contract-copy")}
                                <Clipboard className="ms-1" />
                              </>
                            ) : (
                              <>
                                {t("page-staking-deposit-contract-copied")}
                                <ClipboardCheck className="ms-1" />
                              </>
                            )}
                          </CopyButton>
                        )}
                      </CopyToClipboard>
                      <InlineLink
                        href={`https://eth.blockscout.com/address/${DEPOSIT_CONTRACT_ADDRESS}`}
                      >
                        {t("page-staking-deposit-contract-blockexplorer")}
                      </InlineLink>
                    </ButtonRow>
                  </>
                )}
                <Alert variant="warning">
                  <AlertEmoji text=":warning:" />
                  <AlertContent>
                    <AlertDescription>
                      {t("page-staking-deposit-contract-warning-2")}{" "}
                      <InlineLink
                        className="text-primary"
                        href="https://launchpad.ethereum.org"
                      >
                        {t("page-staking-deposit-contract-launchpad-2")}
                      </InlineLink>
                    </AlertDescription>
                  </AlertContent>
                </Alert>
              </div>
            </AddressCard>
          </RightColumn>
        </FlexBox>
        <FeedbackCard />
      </MainArticle>
    </>
  )
}

export default DepositContractPage
