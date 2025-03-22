"use client"

import { BaseHTMLAttributes } from "react"

import ActionCard from "@/components/ActionCard"
import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import TranslationLeaderboard from "@/components/TranslationLeaderboard"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { ListItem, OrderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"

import allTimeData from "@/data/translation-reports/alltime/alltime-data.json"
import monthData from "@/data/translation-reports/month/month-data.json"
import quarterData from "@/data/translation-reports/quarter/quarter-data.json"

import useColorModeValue from "@/hooks/useColorModeValue"
import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/routing"
import darkThemeCertificateImg from "@/public/images/certificates/dark-certificate.png"
import lightThemeCertificateImg from "@/public/images/certificates/light-certificate.png"
import dogeComputerImg from "@/public/images/doge-computer.png"
import whatIsEthereumImg from "@/public/images/what-is-ethereum.png"

const Content = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <MainArticle className={cn("w-full px-10 py-4", className)} {...props} />
)

const H2 = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("mb-8 mt-12 leading-xs", className)} {...props} />
)

const Text = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <p className={cn("mb-6", className)} {...props} />
)

const TranslatorAcknowledgements = () => {
  const pathname = usePathname()
  const { t } = useTranslation(
    "page-contributing-translation-program-acknowledgements"
  )

  const themedCertificateImage = useColorModeValue(
    lightThemeCertificateImg,
    darkThemeCertificateImg
  )

  return (
    <Flex className="w-full flex-col items-center">
      <Content>
        <Breadcrumbs slug={pathname} className="mt-12" />
        <h1 className="my-8 leading-xs">
          {t(
            "page-contributing-translation-program-acknowledgements-acknowledgement-page-title"
          )}
        </h1>
        <Flex className="me-0 ms-0 w-full flex-col items-start lg:me-8 lg:flex-row">
          {/* LEFT COLUMN */}
          <div className="m-auto w-full lg:mb-0 lg:ml-0 lg:mr-8 lg:mt-0 lg:w-1/2">
            <Text>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-1"
              )}
            </Text>
            <Text>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-2"
              )}
            </Text>
            <Text>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-3"
              )}{" "}
              <InlineLink href="/contributing/translation-program/contributors/">
                {t(
                  "page-contributing-translation-program-acknowledgements-acknowledgement-page-link"
                )}
              </InlineLink>
              .
            </Text>
            <Text>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-4"
              )}
            </Text>
            {/* TODO: add certification section */}
            {/* <p>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-5" />
            </p> */}
          </div>
          {/* RIGHT COLUMN */}
          <div className="m-auto w-full lg:mb-0 lg:ml-8 lg:mr-0 lg:mt-0 lg:w-1/2">
            <Image
              width={500}
              src={dogeComputerImg}
              alt={t(
                "page-contributing-translation-program-acknowledgements-hero-image-alt"
              )}
            />
          </div>
        </Flex>
      </Content>

      <Content className="max-w-[800px]">
        <H2 className="text-center">
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-title"
          )}
        </H2>
        <TranslationLeaderboard
          monthData={monthData}
          quarterData={quarterData}
          allTimeData={allTimeData}
        />
        <Text>
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-1"
          )}
        </Text>
      </Content>

      <Content>
        <H2>
          {t(
            "page-contributing-translation-program-acknowledgements-our-translators-title"
          )}
        </H2>
        <Text>
          {t(
            "page-contributing-translation-program-acknowledgements-our-translators-1"
          )}
        </Text>
        <ActionCard
          className="my-8"
          imageWidth={260}
          href="/contributing/translation-program/contributors/"
          title={t(
            "page-contributing-translation-program-acknowledgements-our-translators-view-all"
          )}
          description={t(
            "page-contributing-translation-program-acknowledgements-our-translators-cta"
          )}
          image={whatIsEthereumImg}
        />
      </Content>

      <Content id="certificate">
        <H2>
          {t(
            "page-contributing-translation-program-acknowledgements-cert-title"
          )}
        </H2>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-cert-1")}
        </Text>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-cert-2")}
        </Text>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-cert-3")}
        </Text>
        <Flex className="justify-center">
          <Image src={themedCertificateImage} alt="translator certificate" />
        </Flex>
      </Content>

      <Content id="oats">
        <H2>
          {t(
            "page-contributing-translation-program-acknowledgements-oats-title"
          )}
        </H2>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-1")}
        </Text>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-2")}
        </Text>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-3")}
        </Text>
        <h3 className="mb-8 mt-10 leading-xs">
          {t(
            "page-contributing-translation-program-acknowledgements-how-to-claim-title"
          )}
        </h3>

        <OrderedList>
          <ListItem>
            {t(
              "page-contributing-translation-program-acknowledgements-how-to-claim-1"
            )}{" "}
            <InlineLink href="/discord/">
              {t(
                "page-contributing-translation-program-acknowledgements-how-to-claim-1-discord"
              )}
            </InlineLink>
          </ListItem>
          <ListItem>
            {t(
              "page-contributing-translation-program-acknowledgements-how-to-claim-2"
            )}
          </ListItem>
          <ListItem>
            {t(
              "page-contributing-translation-program-acknowledgements-how-to-claim-3"
            )}
          </ListItem>
          <ListItem>
            {t(
              "page-contributing-translation-program-acknowledgements-how-to-claim-4"
            )}
          </ListItem>
        </OrderedList>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-4")}
        </Text>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Flex>
  )
}

export default TranslatorAcknowledgements
