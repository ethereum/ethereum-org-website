"use client"

import BannerNotification from "@/components/Banners/BannerNotification"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import {
  AccountAbstractionIcon,
  BetterUserExperienceIcon,
  CheaperTransactionsIcon,
  DankshardingIcon,
  ExtraSecurityIcon,
  FutureProofingIcon,
  SingleSlotFinalityIcon,
  StatelessnessIcon,
} from "@/components/icons/roadmap"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import SubpageCard from "@/components/SubpageCard"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"

import ReleaseCarousel from "./ReleaseCarousel"

import { useTranslation } from "@/hooks/useTranslation"
import ethBlocksImage from "@/public/images/developers-eth-blocks.png"
import communityHeroImg from "@/public/images/heroes/community-hero.png"
import roadmapHeroImg from "@/public/images/heroes/roadmap-hub-hero.jpg"

const RoadmapPage = () => {
  const { t } = useTranslation("page-roadmap")

  const heroContent: HubHeroProps = {
    title: "",
    header: t("page-roadmap-title"),
    description: t("page-roadmap-meta-description"),
    heroImg: roadmapHeroImg,
  }

  const changesComingItems = [
    {
      title: t("page-roadmap-cheaper-transactions-title"),
      icon: <CheaperTransactionsIcon className="h-auto w-12" />,
      description: t("page-roadmap-cheaper-transactions-description"),
      button: {
        label: t("page-roadmap-cheaper-transactions-button"),
        href: "/roadmap/scaling",
      },
    },
    {
      title: t("page-roadmap-extra-security-title"),
      icon: <ExtraSecurityIcon className="h-auto w-12" />,
      description: t("page-roadmap-extra-security-description"),
      button: {
        label: t("page-roadmap-extra-security-button"),
        href: "/roadmap/security",
      },
    },
    {
      title: t("page-roadmap-better-user-experience-title"),
      icon: <BetterUserExperienceIcon className="h-auto w-12" />,
      description: t("page-roadmap-better-user-experience-description"),
      button: {
        label: t("page-roadmap-better-user-experience-button"),
        href: "/roadmap/user-experience",
      },
    },
    {
      title: t("page-roadmap-future-proofing-title"),
      icon: <FutureProofingIcon className="h-auto w-12" />,
      description: t("page-roadmap-future-proofing-description"),
      button: {
        label: t("page-roadmap-future-proofing-button"),
        href: "/roadmap/future-proofing",
      },
    },
  ]

  const technicalUpgradesItems = [
    {
      icon: <DankshardingIcon className="size-7" />,
      title: t("page-roadmap-danksharding-title"),
      description: t("page-roadmap-danksharding-description"),
      href: "/roadmap/danksharding",
    },
    {
      icon: <SingleSlotFinalityIcon className="size-7" />,
      title: t("page-roadmap-single-slot-finality-title"),
      description: t("page-roadmap-single-slot-finality-description"),
      href: "/roadmap/single-slot-finality",
    },
    {
      icon: <AccountAbstractionIcon className="size-7" />,
      title: t("page-roadmap-account-abstraction-title"),
      description: t("page-roadmap-account-abstraction-description"),
      href: "/roadmap/account-abstraction",
    },
    {
      icon: <StatelessnessIcon className="size-7" />,
      title: t("page-roadmap-statelessness-title"),
      description: t("page-roadmap-statelessness-description"),
      href: "/roadmap/statelessness",
    },
  ]

  // TODO: MATOMO EVENTS
  return (
    <>
      <MainArticle className="mx-auto flex w-full flex-col items-center">
        <BannerNotification shouldShow>
          <p>{t("page-roadmap-banner-notification")}</p>
        </BannerNotification>
        <div className="flex flex-col gap-16">
          <HubHero {...heroContent} />

          <div className="py-4">
            <ReleaseCarousel />
          </div>

          <div className="flex w-full flex-col gap-8 px-8 py-4">
            <h2 className="m-0">{t("page-roadmap-changes-coming-title")}</h2>
            <p className="max-w-screen-md text-lg">
              {t("page-roadmap-changes-coming-description")}
            </p>
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
              {changesComingItems.map((item) => (
                <div
                  key={item.title}
                  className="bg-roadmap-card-gradient flex flex-col gap-4 rounded-3xl border p-6"
                >
                  <div className="flex flex-row items-center justify-between gap-4">
                    <h3 className="m-0">{item.title}</h3>
                    <div className="flex h-12 w-12 items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <p className="flex-grow">{item.description}</p>
                  <ButtonLink href={item.button.href} variant="outline">
                    {item.button.label}
                  </ButtonLink>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-12 px-8 py-4 md:w-full md:flex-row">
            <div className="max-w-screen-md flex-1">
              <h2 className="mb-8">{t("page-roadmap-why-need-title")}</h2>
              <p className="mb-10">{t("page-roadmap-why-need-description")}</p>
              <h3 className="mb-6">{t("page-roadmap-how-defined-title")}</h3>
              <p className="mb-6">{t("page-roadmap-how-defined-p1")}</p>
              <p className="mb-6">
                <Translation id="page-roadmap:page-roadmap-how-defined-p2" />
              </p>
              <p className="mb-6">
                <Translation id="page-roadmap:page-roadmap-how-defined-p3" />
              </p>
              <ButtonLink
                href="/governance"
                variant="outline"
                className="w-full md:w-auto"
              >
                {t("page-roadmap-governance-button")}
              </ButtonLink>
            </div>
            <div className="relative min-h-[272px] w-full flex-shrink-0 overflow-hidden rounded-3xl md:w-1/2 xl:w-1/3">
              <Image
                src={communityHeroImg}
                alt={t("page-roadmap-hero-alt")}
                className="absolute inset-0 h-full w-full object-cover"
                fill
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-8 px-8">
            <h2 className="text-center">
              {t("page-roadmap-technical-upgrades-title")}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {technicalUpgradesItems.map((item) => (
                <SubpageCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  href={item.href}
                  inlineLink={{ text: t("page-roadmap-learn-more") }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 px-8 lg:flex-row">
            <div className="top-24 flex h-fit flex-1 items-start lg:sticky">
              <Image
                src={ethBlocksImage}
                alt={t("page-roadmap-blocks-alt")}
                className="object-contain"
              />
            </div>
            <div className="flex flex-1 flex-col gap-8">
              <h2>{t("page-roadmap-timeline-title")}</h2>
              <div>
                <ExpandableCard
                  title={t("page-roadmap-faq-1-title")}
                  className="mb-0"
                >
                  <div className="flex flex-col gap-4">
                    <p>
                      <strong>{t("page-roadmap-faq-1-p1")}</strong>{" "}
                      {t("page-roadmap-faq-1-p1-continued")}
                    </p>
                    <p>{t("page-roadmap-faq-1-p2")}</p>
                  </div>
                </ExpandableCard>
                <ExpandableCard
                  title={t("page-roadmap-faq-2-title")}
                  className="mb-0"
                >
                  <div className="flex flex-col gap-4">
                    <p>
                      {t("page-roadmap-faq-2-p1")}{" "}
                      <strong>{t("page-roadmap-faq-2-p1-strong")}</strong>{" "}
                      {t("page-roadmap-faq-2-p1-continued")}
                    </p>
                    <p>{t("page-roadmap-faq-2-p2")}</p>
                  </div>
                </ExpandableCard>
                <ExpandableCard
                  title={t("page-roadmap-faq-3-title")}
                  className="mb-0"
                >
                  <div className="flex flex-col gap-4">
                    <p>
                      <Translation
                        id="page-roadmap:page-roadmap-faq-3-p1"
                        transform={{ a: Link }}
                      />
                    </p>
                  </div>
                </ExpandableCard>
                <ExpandableCard
                  title={t("page-roadmap-faq-4-title")}
                  className="mb-0"
                >
                  <div className="flex flex-col gap-4">
                    <p>
                      <Translation
                        id="page-roadmap:page-roadmap-faq-4-p1"
                        transform={{ a: Link }}
                      />
                    </p>
                  </div>
                </ExpandableCard>
              </div>
            </div>
          </div>

          <FeedbackCard />
        </div>
      </MainArticle>
    </>
  )
}

export default RoadmapPage
