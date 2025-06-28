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
  ProposerBuilderSeparationIcon,
  SecretLeaderElectionIcon,
  SingleSlotFinalityIcon,
  StatelessnessIcon,
  VerkleTreesIcon,
} from "@/components/icons/roadmap"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"
import InlineLink from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import ReleaseCarousel from "./ReleaseCarousel"

import { useTranslation } from "@/hooks/useTranslation"
import ethBlocksImage from "@/public/images/developers-eth-blocks.png"
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
      icon: <CheaperTransactionsIcon className="h-auto w-12" />,
      description:
        "Rollups are too expensive and rely on centralized components, causing users to place too much trust in their operators. The roadmap includes fixes for both of these problems.",
      button: {
        label: "More on reducing fees",
        href: "/roadmap/scaling",
      },
    },
    {
      title: "Extra security",
      icon: <ExtraSecurityIcon className="h-auto w-12" />,
      description:
        "Ethereum is already very secure but it can be made even stronger, ready to withstand all kinds of attack far into the future.",
      button: {
        label: "More on security",
        href: "/roadmap/security",
      },
    },
    {
      title: "Better user experience",
      icon: <BetterUserExperienceIcon className="h-auto w-12" />,
      description:
        "More support for smart contract wallets and light-weight nodes will make using Ethereum simpler and safer.",
      button: {
        label: "More on user experience",
        href: "/roadmap/user-experience",
      },
    },
    {
      title: "Future-proofing",
      icon: <FutureProofingIcon className="h-auto w-12" />,
      description:
        "Ethereum researchers and developers are solving tomorrow's problems today, readying the network for future generations.",
      button: {
        label: "More on future-proofing",
        href: "/roadmap/future-proofing",
      },
    },
  ]

  const technicalUpgradesItems = [
    {
      icon: <DankshardingIcon className="size-7" />,
      title: "Danksharding",
      description:
        "Danksharding makes L2 rollups much cheaper for users by adding “blobs” of data to Ethereum blocks.",
      href: "/roadmap/danksharding",
    },
    {
      icon: <SingleSlotFinalityIcon className="size-7" />,
      title: "Single slot finality",
      description:
        "Instead of waiting for fifteen minutes, blocks could get proposed and finalized in the same slot. This is more convenient for apps and difficult to attack.",
      href: "/roadmap/single-slot-finality",
    },
    {
      icon: <ProposerBuilderSeparationIcon className="size-7" />,
      title: "Proposer-builder separation",
      description:
        "Splitting the block building and block proposal tasks across separate validators creates a fairer, more censorship resistant and efficient way for Ethereum to come to consensus.",
      href: "/roadmap/pbs",
    },
    {
      icon: <SecretLeaderElectionIcon className="size-7" />,
      title: "Secret leader election",
      description:
        "Clever cryptography can be used to ensure that the identity of the current block proposer is not made public, protecting them from certain types of attack.",
      href: "/roadmap/secret-leader-election",
    },
    {
      icon: <AccountAbstractionIcon className="size-7" />,
      title: "Account abstraction",
      description:
        "Account abstraction is a class of upgrades that support smart contract wallets natively on Ethereum, rather than having to use complex middleware.",
      href: "/roadmap/account-abstraction",
    },
    {
      icon: <VerkleTreesIcon className="size-7" />,
      title: "Verkle trees",
      description:
        "Verkle trees are a data structure that can be used to enable stateless clients on Ethereum. These clients will require a small amount of storage space but will still be able to verify new blocks.",
      href: "/roadmap/verkle-trees",
    },
    {
      icon: <StatelessnessIcon className="size-7" />,
      title: "Statelessness",
      description:
        "Stateless clients will be able to verify new blocks without having to store large amounts of data. This will provide all the benefits of running a node with only a tiny fraction of today’s costs.",
      href: "/roadmap/statelessness",
    },
  ]

  // TODO: MATOMO EVENTS
  return (
    <MainArticle className="mx-auto flex w-full flex-col items-center">
      <BannerNotification shouldShow>
        <p>
          Ethereum&apos;s development is community-driven and subject to change.
        </p>
      </BannerNotification>
      <div className="flex flex-col gap-16">
        <HubHero {...heroContent} />

        <div className="py-4">
          <ReleaseCarousel />
        </div>

        <div className="flex w-full flex-col gap-8 px-8 py-4">
          <h2 className="m-0">What changes are coming to Ethereum?</h2>
          <p className="max-w-screen-md text-lg">
            Ethereum is already a powerful platform, but it is still being
            improved. An ambitious set of improvements will upgrade Ethereum
            from its current form into a fully scaled, maximally resilient
            platform.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {changesComingItems.map((item) => (
              <div
                key={item.title}
                className="bg-roadmap-card-gradient flex h-full flex-col gap-4 rounded-3xl border p-6"
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
            <h2 className="mb-8">Why does Ethereum need a roadmap?</h2>
            <p className="mb-10">
              Ethereum gets regular upgrades that enhance its scalability,
              security, or sustainability. One of Ethereum&apos;s core strengths
              is adapting as new ideas emerge from research and development.
              Adaptability gives Ethereum the flexibility to tackle emerging
              challenges and keep up with the most advanced technological
              breakthroughs.
            </p>
            <h3 className="mb-6">How the roadmap is defined</h3>
            <p className="mb-6">
              The roadmap is mostly the result of years of work by researchers
              and developers - because the protocol is very technical - but any
              motivated person can participate.
            </p>
            <p className="mb-6">
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
            <p className="mb-6">
              When these ideas mature, they can be proposed as{" "}
              <Link href="https://eips.ethereum.org">
                Ethereum Improvement Proposals
              </Link>
              . This is all done in public so that anyone from the community can
              weigh in at any time.
            </p>
            <ButtonLink
              href="/governance"
              variant="outline"
              className="w-full md:w-auto"
            >
              More on Ethereum governance
            </ButtonLink>
          </div>
          <div className="relative min-h-[272px] w-full flex-shrink-0 overflow-hidden rounded-3xl md:w-1/2 xl:w-1/3">
            <Image
              src={communityHeroImg}
              alt="Ethereum roadmap"
              className="absolute inset-0 h-full w-full object-cover"
              fill
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-8 px-8">
          <h2 className="text-center">
            What technical upgrades are coming to Ethereum?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {technicalUpgradesItems.map((item) => (
              <LinkBox
                key={item.title}
                className="flex flex-col rounded-3xl border border-[rgba(159,43,212,0.11)] bg-card-gradient-secondary p-6 hover:bg-card-gradient-secondary-hover hover:shadow-lg"
              >
                <div className="mb-3 flex gap-4">
                  <div className="text-primary">{item.icon}</div>
                  <h3 className="text-xl">{item.title}</h3>
                </div>
                <p className="m-0 p-0 pb-3 text-body-medium">
                  {item.description}
                </p>

                <LinkOverlay href={item.href} asChild>
                  <InlineLink
                    href={item.href}
                    className="hover:text-primary-hover"
                  >
                    Learn more
                  </InlineLink>
                </LinkOverlay>
              </LinkBox>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 px-8 lg:flex-row">
          <div className="top-24 flex h-fit flex-1 items-start lg:sticky">
            <Image
              src={ethBlocksImage}
              alt="Ethereum blocks"
              className="object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col gap-8">
            <h2>What is the timeline for these upgrades?</h2>
            <div>
              <ExpandableCard
                title="Will Ethereum's roadmap change over time?"
                className="mb-0"
              >
                <div className="flex flex-col gap-4">
                  <p>
                    <strong>Yes—almost definitely.</strong> The roadmap is the
                    current plan for upgrading Ethereum, covering both near-term
                    and future plans. We expect the roadmap to change as new
                    information and technology become available.
                  </p>
                  <p>
                    Think of Ethereum&apos;s roadmap as a set of intentions for
                    improving Ethereum; it is the core researchers&apos; and
                    developers&apos; best hypothesis of Ethereum&apos;s most
                    optimal path forward.
                  </p>
                </div>
              </ExpandableCard>
              <ExpandableCard
                title="When will the roadmap be finished?"
                className="mb-0"
              >
                <div className="flex flex-col gap-4">
                  <p>
                    Some upgrades are lower priority and likely not to be
                    implemented for the next 5-10 years (e.g. quantum
                    resistance).{" "}
                    <strong>
                      Giving precise timing of each upgrade is complicated
                    </strong>{" "}
                    to predict as many roadmap items are worked on in parallel
                    and developed at different speeds. The urgency of an upgrade
                    can also change over time depending on external factors
                    (e.g. a sudden leap in the performance and availability of
                    quantum computers may make quantum-resistant cryptography
                    more urgent).
                  </p>
                  <p>
                    One way to think about Ethereum development is by analogy to
                    biological evolution. A network that is able to adapt to new
                    challenges and maintain fitness is more likely to succeed
                    that one that is resistant to change, although as the
                    network becomes more and more performant, scalable and
                    secure fewer changes to the protocol will be required.
                  </p>
                </div>
              </ExpandableCard>
              <ExpandableCard
                title="Do I have to do anything to prepare for these upgrades?"
                className="mb-0"
              >
                <div className="flex flex-col gap-4">
                  <p>
                    Upgrades tend not to impact end-users except by providing
                    better user-experiences and a more secure protocol and
                    perhaps more <i>options</i> for how to interact with
                    Ethereum.{" "}
                    <strong>
                      Regular users are not required to actively participate in
                      an upgrade, nor are they required to do anything** to
                      secure their assets.
                    </strong>{" "}
                    <Link href="/glossary/#node">Node</Link> operators will need
                    to update their clients to prepare for an upgrade. Some
                    upgrades may lead to changes for application developers. For
                    example, history expiry upgrades may lead application
                    developers to grab historical data from new sources.
                  </p>
                </div>
              </ExpandableCard>
              <ExpandableCard title="What about sharding?" className="mb-0">
                <div className="flex flex-col gap-4">
                  <p>
                    Sharding is splitting up the Ethereum blockchain so that
                    subsets of{" "}
                    <Link href="/glossary/#validator">validators</Link> are only
                    responsible for a fraction of the total data. This was
                    originally intended to be the way for Ethereum to scale.
                    However, <Link href="/glossary/#layer-2">layer 2</Link>{" "}
                    rollups have developed much faster than expected and have
                    provided a lot of scaling already, and will provide much
                    more after Proto-Danksharding is implemented. This means
                    &quot;shard chains&quot; are no longer needed and have been
                    dropped from the roadmap.
                  </p>
                </div>
              </ExpandableCard>
            </div>
          </div>
        </div>

        <FeedbackCard />
      </div>
    </MainArticle>
  )
}

export default RoadmapPage
