import React from "react"
import Image from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Lang } from "@/lib/types"

import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import InlineLink, { BaseLink as Link } from "@/components/ui/Link"

import { getMetadata } from "@/lib/utils/metadata"

import TrillionDollarSecurityPageJsonLD from "./page-jsonld"

import TdsHero from "@/public/images/trillion-dollar-security/hero.png"
import TdsReport from "@/public/images/trillion-dollar-security/report.png"

const ReportCard = ({ cta, altText }: { cta: string; altText: string }) => {
  return (
    <Card className="rounded-2xl border bg-card-gradient p-8 shadow dark:bg-gradient-to-br dark:from-white/0 dark:to-purple-500/10">
      <CardContent className="p-0 pb-4">
        <CardDescription>
          <Image
            src={TdsReport}
            alt={altText}
            className="w-full object-contain"
          />
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-center p-0">
        <ButtonLink size="lg" href="/reports/trillion-dollar-security.pdf">
          {cta}
        </ButtonLink>
      </CardFooter>
    </Card>
  )
}

const TdsPage = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations({
    locale,
    namespace: "page-trillion-dollar-security",
  })

  return (
    <>
      <TrillionDollarSecurityPageJsonLD locale={locale} />
      <MainArticle>
        {/* Hero Section */}
        <section className="mb-32 w-full">
          <Image
            src={TdsHero}
            alt={t("page-trillion-dollar-security-image-alt-hero")}
            width={1200}
            height={480}
            className="max-h-[480px] w-full object-cover"
          />
          <div className="px-6 md:px-8">
            <p className="mb-2 mt-6 text-center text-body-medium">
              {t("page-trillion-dollar-security-subtitle")}
            </p>
            <h1 className="mb-20 text-center">
              {t("page-trillion-dollar-security-title")}
            </h1>

            <div className="mt-8">
              {/* Right: Download Card */}
              <div className="hidden w-full max-w-sm md:float-right md:mb-16 md:ms-16 md:block">
                <ReportCard
                  cta={t("page-trillion-dollar-security-download-report")}
                  altText={t("page-trillion-dollar-security-image-alt-report")}
                />
              </div>
              <div className="flex-1 space-y-6 xl:max-w-screen-lg">
                <p>{t("page-trillion-dollar-security-hero-paragraph-1")}</p>
                <p>{t("page-trillion-dollar-security-hero-paragraph-2")}</p>
                <ul>
                  <li>
                    {t.rich("page-trillion-dollar-security-hero-paragraph-3", {
                      b: (chunks) => <b>{chunks}</b>,
                    })}
                  </li>
                  <li>
                    {t.rich("page-trillion-dollar-security-hero-paragraph-4", {
                      b: (chunks) => <b>{chunks}</b>,
                    })}
                  </li>
                </ul>

                <div className="mx-auto max-w-sm md:hidden">
                  <ReportCard
                    cta={t("page-trillion-dollar-security-download-report")}
                    altText={t(
                      "page-trillion-dollar-security-image-alt-report"
                    )}
                  />
                </div>

                <p>
                  {t.rich("page-trillion-dollar-security-hero-paragraph-5", {
                    a: (chunks) => (
                      <InlineLink href="https://blog.ethereum.org/2025/05/14/trillion-dollar-security">
                        {chunks}
                      </InlineLink>
                    ),
                  })}
                </p>
                <p>{t("page-trillion-dollar-security-hero-paragraph-6")}</p>

                <ol className="list-decimal font-bold text-primary">
                  <li>
                    <Link href="#ux" className="no-underline">
                      {t("page-trillion-dollar-security-user-experience-title")}
                    </Link>
                    <p className="font-normal text-body">
                      {t(
                        "page-trillion-dollar-security-user-experience-description"
                      )}
                    </p>
                  </li>
                  <li>
                    <Link href="#smart-contracts" className="no-underline">
                      {t("page-trillion-dollar-security-smart-contract-title")}
                    </Link>
                    <p className="font-normal text-body">
                      {t(
                        "page-trillion-dollar-security-smart-contract-description"
                      )}
                    </p>
                  </li>
                  <li>
                    <Link href="#infrastructure" className="no-underline">
                      {t("page-trillion-dollar-security-infrastructure-title")}
                    </Link>
                    <p className="font-normal text-body">
                      {t(
                        "page-trillion-dollar-security-infrastructure-description"
                      )}
                    </p>
                  </li>
                  <li>
                    <Link href="#consensus" className="no-underline">
                      {t("page-trillion-dollar-security-consensus-title")}
                    </Link>
                    <p className="font-normal text-body">
                      {t("page-trillion-dollar-security-consensus-description")}
                    </p>
                  </li>
                  <li>
                    <Link href="#incident" className="no-underline">
                      {t("page-trillion-dollar-security-incident-title")}
                    </Link>
                    <p className="font-normal text-body">
                      {t("page-trillion-dollar-security-incident-description")}
                    </p>
                  </li>
                  <li>
                    <Link href="#social" className="no-underline">
                      {t("page-trillion-dollar-security-social-title")}
                    </Link>
                    <p className="font-normal text-body">
                      {t("page-trillion-dollar-security-social-description")}
                    </p>
                  </li>
                </ol>

                <p>
                  {t("page-trillion-dollar-security-hero-closing-paragraph-1")}
                </p>
                <p>
                  {t("page-trillion-dollar-security-hero-closing-paragraph-2")}
                </p>
                <p>
                  {t("page-trillion-dollar-security-hero-closing-paragraph-3")}
                </p>

                <ul>
                  <li>
                    {t("page-trillion-dollar-security-feedback-question-1")}
                  </li>
                  <li>
                    {t("page-trillion-dollar-security-feedback-question-2")}
                  </li>
                  <li>
                    {t("page-trillion-dollar-security-feedback-question-3")}
                  </li>
                </ul>

                <p>
                  {t.rich("page-trillion-dollar-security-contact-paragraph", {
                    a: (chunks) => (
                      <a
                        href="mailto:trilliondollarsecurity@ethereum.org"
                        className="text-primary"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="px-6 md:px-8">
          {/* Main Content Sections - Each with its own sticky heading */}
          <div className="my-16 w-full space-y-32 lg:space-y-48">
            {/* User Experience section */}
            <section
              id="ux"
              className="mb-8 flex scroll-mt-24 flex-col gap-8 lg:flex-row"
            >
              <div className="top-24 flex h-fit flex-shrink-0 flex-col items-start gap-4 self-start lg:sticky lg:flex lg:w-[400px]">
                <h3 className="mb-4">
                  1. {t("page-trillion-dollar-security-user-experience-title")}
                </h3>
                <p>{t("page-trillion-dollar-security-section-1-intro")}</p>
              </div>
              <div className="flex-1">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p>
                      {t("page-trillion-dollar-security-section-1-paragraph-1")}
                    </p>
                    <p>
                      {t("page-trillion-dollar-security-section-1-paragraph-2")}
                    </p>
                    <p>
                      {t("page-trillion-dollar-security-section-1-paragraph-3")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-1-1-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-1-paragraph-1"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-1-paragraph-2"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-1-paragraph-3"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-1-paragraph-4"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-1-paragraph-5"
                      )}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-1-2-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-1-2-paragraph")}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-1-3-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-3-paragraph-1"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-3-paragraph-2"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-3-paragraph-3"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-3-paragraph-4"
                      )}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-1-4-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-4-paragraph-1"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-4-paragraph-2"
                      )}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-1-5-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-5-paragraph-1"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-5-paragraph-2"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-5-paragraph-3"
                      )}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-1-6-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-6-paragraph-1"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-1-6-paragraph-2"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Smart Contract Security section */}
            <section
              id="smart-contracts"
              className="mb-8 flex scroll-mt-24 flex-col gap-8 lg:flex-row"
            >
              <div className="top-24 flex h-fit flex-shrink-0 flex-col items-start gap-4 self-start lg:sticky lg:flex lg:w-[400px]">
                <h3 className="mb-4">
                  2. {t("page-trillion-dollar-security-smart-contract-title")}
                </h3>
                <p>{t("page-trillion-dollar-security-section-2-intro")}</p>
              </div>
              <div className="flex-1">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p>
                      {t("page-trillion-dollar-security-section-2-paragraph-1")}
                    </p>
                    <ul className="my-0 ml-6 list-disc">
                      <li>
                        {t("page-trillion-dollar-security-section-2-list-1")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-2-list-2")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-2-list-3")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-2-list-4")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-2-list-5")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-2-list-6")}
                      </li>
                    </ul>
                    <p>
                      {t("page-trillion-dollar-security-section-2-paragraph-2")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-2-1-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-2-1-paragraph")}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-1-list-title-1"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-1-list-desc-1"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-1-list-title-2"
                          )}
                        </b>
                        ,{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-1-list-desc-2"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-1-list-title-3"
                          )}
                        </b>
                        ,{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-1-list-desc-3"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-1-list-title-4"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-1-list-desc-4"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-1-list-title-5"
                          )}
                        </b>
                        ,{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-1-list-desc-5"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-1-list-title-6"
                          )}
                        </b>
                        ,{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-1-list-desc-6"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-1-list-title-7"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-1-list-desc-7"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-1-list-title-8"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-1-list-desc-8"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-1-list-title-9"
                          )}
                          .
                        </b>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-2-2-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-2-2-paragraph")}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-2-list-title-1"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-2-list-desc-1"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-2-list-title-2"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-2-list-desc-2"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-2-list-title-3"
                          )}
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-2-list-desc-3"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-2-list-title-4"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-2-list-desc-4"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-2-list-title-5"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-2-list-desc-5"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-2-list-title-6"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-2-list-desc-6"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-2-2-list-title-7"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-2-2-list-desc-7"
                        )}
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-2-3-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-2-3-paragraph")}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Infrastructure & Cloud Security section */}
            <section
              id="infrastructure"
              className="mb-8 flex scroll-mt-24 flex-col gap-8 lg:flex-row"
            >
              <div className="top-24 flex h-fit flex-shrink-0 flex-col items-start gap-4 self-start lg:sticky lg:flex lg:w-[400px]">
                <h3 className="mb-4">
                  3. {t("page-trillion-dollar-security-infrastructure-title")}
                </h3>
                <p>{t("page-trillion-dollar-security-section-3-intro")}</p>
              </div>
              <div className="flex-1">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p>
                      {t("page-trillion-dollar-security-section-3-paragraph-1")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-3-1-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-3-1-paragraph")}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-3-1-list-title-1"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-3-1-list-desc-1"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-3-1-list-title-2"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-3-1-list-desc-2"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-3-1-list-title-3"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-3-1-list-desc-3"
                        )}
                      </li>
                    </ul>
                    <p>
                      {t.rich(
                        "page-trillion-dollar-security-section-3-1-paragraph-2",
                        {
                          a: (chunks) => (
                            <Link href="https://l2beat.com/">{chunks}</Link>
                          ),
                        }
                      )}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-3-2-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-3-2-paragraph-1"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-3-2-paragraph-2"
                      )}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-3-3-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-3-3-paragraph")}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        {t("page-trillion-dollar-security-section-3-3-list-1")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-3-3-list-2")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-3-3-list-3")}
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-3-4-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-3-4-paragraph")}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-3-4-list-title-1"
                          )}
                        </b>
                        ,{" "}
                        {t(
                          "page-trillion-dollar-security-section-3-4-list-desc-1"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-3-4-list-title-2"
                          )}
                        </b>
                        ,{" "}
                        {t(
                          "page-trillion-dollar-security-section-3-4-list-desc-2"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-3-4-list-title-3"
                          )}
                        </b>
                        ,{" "}
                        {t(
                          "page-trillion-dollar-security-section-3-4-list-desc-3"
                        )}
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-3-5-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-3-5-paragraph")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-3-6-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-3-6-paragraph-1"
                      )}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        {t("page-trillion-dollar-security-section-3-6-list-1")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-3-6-list-2")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-3-6-list-3")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-3-6-list-4")}
                      </li>
                    </ul>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-3-6-paragraph-2"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Consensus Protocol section */}
            <section
              id="consensus"
              className="mb-8 flex scroll-mt-24 flex-col gap-8 lg:flex-row"
            >
              <div className="top-24 flex h-fit flex-shrink-0 flex-col items-start gap-4 self-start lg:sticky lg:flex lg:w-[400px]">
                <h3 className="mb-4">
                  4. {t("page-trillion-dollar-security-consensus-title")}
                </h3>
                <p>{t("page-trillion-dollar-security-section-4-intro")}</p>
              </div>
              <div className="flex-1">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p>
                      {t("page-trillion-dollar-security-section-4-paragraph-1")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-4-1-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-4-1-paragraph")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-4-2-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-4-2-paragraph")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-4-3-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-4-3-paragraph")}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        {t("page-trillion-dollar-security-section-4-3-list-1")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-4-3-list-2")}
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-4-4-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-4-4-paragraph")}
                    </p>
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-4-5-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-4-5-paragraph")}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        {t("page-trillion-dollar-security-section-4-5-list-1")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-4-5-list-2")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-4-5-list-3")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-4-5-list-4")}
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-4-6-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-4-6-paragraph-1"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-4-6-paragraph-2"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Incident Response & Mitigation section */}
            <section
              id="incident"
              className="mb-8 flex scroll-mt-24 flex-col gap-8 lg:flex-row"
            >
              <div className="top-24 flex h-fit flex-shrink-0 flex-col items-start self-start lg:sticky lg:flex lg:w-[400px]">
                <h3 className="mb-4">
                  5. {t("page-trillion-dollar-security-incident-title")}
                </h3>
              </div>
              <div className="flex-1">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p>
                      {t("page-trillion-dollar-security-section-5-paragraph-1")}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-5-list-title-1"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-5-list-desc-1"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-5-list-title-2"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-5-list-desc-2"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-5-list-title-3"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-5-list-desc-3"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-5-list-title-4"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-5-list-desc-4"
                        )}
                      </li>
                      <li>
                        <b>
                          {t(
                            "page-trillion-dollar-security-section-5-list-title-5"
                          )}
                          .
                        </b>{" "}
                        {t(
                          "page-trillion-dollar-security-section-5-list-desc-5"
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Social layer and governance section */}
            <section
              id="social"
              className="mb-8 flex scroll-mt-24 flex-col gap-8 lg:flex-row"
            >
              <div className="top-24 flex h-fit flex-shrink-0 flex-col items-start gap-4 self-start lg:sticky lg:flex lg:w-[400px]">
                <h3 className="mb-4">
                  6. {t("page-trillion-dollar-security-social-title")}
                </h3>
                <p>{t("page-trillion-dollar-security-section-6-intro")}</p>
              </div>
              <div className="flex-1">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p>
                      {t("page-trillion-dollar-security-section-6-paragraph-1")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-6-1-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-6-1-paragraph-1"
                      )}
                      <br />
                      {t(
                        "page-trillion-dollar-security-section-6-1-paragraph-2"
                      )}
                    </p>
                    <ul className="ml-6 mt-2 list-disc">
                      <li>
                        {t("page-trillion-dollar-security-section-6-1-list-1")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-6-1-list-2")}
                      </li>
                      <li>
                        {t("page-trillion-dollar-security-section-6-1-list-3")}
                      </li>
                    </ul>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-6-1-paragraph-3"
                      )}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-6-2-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-6-2-paragraph-1"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-6-2-paragraph-2"
                      )}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-6-3-title")}
                    </h4>
                    <p>
                      {t("page-trillion-dollar-security-section-6-3-paragraph")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="mb-4 text-xl font-semibold">
                      {t("page-trillion-dollar-security-section-6-4-title")}
                    </h4>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-6-4-paragraph-1"
                      )}
                    </p>
                    <p>
                      {t(
                        "page-trillion-dollar-security-section-6-4-paragraph-2"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </MainArticle>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "page-trillion-dollar-security",
  })

  return await getMetadata({
    locale,
    slug: ["trillion-dollar-security"],
    title: t("page-trillion-dollar-security-meta-title"),
    description: t("page-trillion-dollar-security-meta-description"),
    image: "/images/trillion-dollar-security/og-image.png",
  })
}

export default TdsPage
