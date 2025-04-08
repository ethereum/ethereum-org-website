import BannerNotification from "@/components/Banners/BannerNotification"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import {
  BetterUserExperienceIcon,
  CheaperTransactionsIcon,
  ExtraSecurityIcon,
  FutureProofingIcon,
} from "@/components/icons/roadmap"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"

import { useTranslation } from "@/hooks/useTranslation"
import communityHeroImg from "@/public/images/heroes/community-hero.png"
import roadmapHeroImg from "@/public/images/heroes/roadmap-hub-hero.jpg"

const RoadmapPage = () => {
  const { t } = useTranslation("page-roadmap")

  const heroContent: HubHeroProps = {
    title: "",
    header: t("page-roadmap-meta-title"),
    description: t("page-roadmap-meta-description"),
    heroImg: roadmapHeroImg,
  }

  const changesComingItems = [
    {
      title: "Cheaper transactions",
      icon: <CheaperTransactionsIcon />,
      description:
        "Rollups are too expensive and rely on centralized components, causing users to place too much trust in their operators. The roadmap includes fixes for both of these problems.",
      button: {
        label: "More on reducing fees",
        href: "/roadmap/scaling",
      },
    },
    {
      title: "Extra security",
      icon: <ExtraSecurityIcon />,
      description:
        "Ethereum is already very secure but it can be made even stronger, ready to withstand all kinds of attack far into the future.",
      button: {
        label: "More on security",
        href: "/roadmap/security",
      },
    },
    {
      title: "Better user experience",
      icon: <BetterUserExperienceIcon />,
      description:
        "More support for smart contract wallets and light-weight nodes will make using Ethereum simpler and safer.",
      button: {
        label: "More on user experience",
        href: "/roadmap/user-experience",
      },
    },
    {
      title: "Future-proofing",
      icon: <FutureProofingIcon />,
      description:
        "Ethereum researchers and developers are solving tomorrow's problems today, readying the network for future generations.",
      button: {
        label: "More on future-proofing",
        href: "/roadmap/future-proofing",
      },
    },
  ]

  return (
    <MainArticle className="mx-auto flex w-full flex-col items-center">
      <BannerNotification shouldShow>
        <p>
          Ethereum&apos;s development is community-driven and subject to change.
        </p>
      </BannerNotification>
      <div className="flex flex-col gap-16">
        <HubHero {...heroContent} />

        {/* TODO: ROADMAP CAROUSAL */}

        <div className="flex w-full flex-col gap-8 px-8 py-4">
          <h2 className="m-0">What changes are coming to Ethereum?</h2>
          <p className="text-lg">
            Ethereum is already a powerful platform, but it is still being
            improved. An ambitious set of improvements will upgrade Ethereum
            from its current form into a fully scaled, maximally resilient
            platform.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {changesComingItems.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col gap-4 rounded-3xl border bg-roadmap-card-gradient p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="m-0">{item.title}</h3>
                  {item.icon}
                </div>
                <p className="flex-grow">{item.description}</p>
                <ButtonLink href={item.button.href} variant="outline">
                  {item.button.label}
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 px-12 py-8">
          <div>
            <h2>Why does Ethereum need a roadmap?</h2>
            <p>
              Ethereum gets regular upgrades that enhance its scalability,
              security, or sustainability. One of Ethereum&apos;s core strengths
              is adapting as new ideas emerge from research and development.
              Adaptability gives Ethereum the flexibility to tackle emerging
              challenges and keep up with the most advanced technological
              breakthroughs.
            </p>
            <h3>How the roadmap is defined</h3>
            <p>
              The roadmap is mostly the result of years of work by researchers
              and developers - because the protocol is very technical - but any
              motivated person can participate.
            </p>
            <p>
              Ideas usually start off as discussions on a forum such as{" "}
              <Link href="https://ethresear.ch">ethresear.ch</Link>,{" "}
              <Link href="https://ethereum-magicians.org">
                Ethereum Magicians
              </Link>{" "}
              or the Eth R&D discord server. They may be responses to new
              vulnerabilities that are discovered, suggestions from
              organizations working in the application layer (such as dapps and
              exchanges) or from known frictions for end users (such as costs or
              transaction speeds).
            </p>
            <p>
              When these ideas mature, they can be proposed as{" "}
              <Link href="https://eips.ethereum.org">
                Ethereum Improvement Proposals
              </Link>
              . This is all done in public so that anyone from the community can
              weigh in at any time.
            </p>
          </div>
          <div>
            <Image src={communityHeroImg} alt="Ethereum roadmap" />
          </div>
        </div>

        {/* TODO: LOOKING FOR SPECIFIC UPGRADES? */}

        {/* TODO: FAQ */}
      </div>
    </MainArticle>
  )
}

export default RoadmapPage
