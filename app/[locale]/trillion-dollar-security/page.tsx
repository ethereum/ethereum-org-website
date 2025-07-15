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

import TdsHero from "@/public/images/trillion-dollar-security/hero.png"
import TdsReport from "@/public/images/trillion-dollar-security/report.png"

const ReportCard = ({ cta }: { cta: string }) => {
  return (
    <Card className="rounded-2xl border bg-card-gradient p-8 shadow dark:bg-gradient-to-br dark:from-white/0 dark:to-purple-500/10">
      <CardContent className="p-0 pb-4">
        <CardDescription>
          <Image
            src={TdsReport}
            alt="Cover image of the Trillion Dollar Security report showing a modern digital security visualization with blockchain elements and network connections"
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
    <MainArticle>
      {/* Hero Section */}
      <section className="mb-32 w-full">
        <Image
          src={TdsHero}
          alt="A futuristic visualization showing interconnected blockchain nodes and security elements, representing trillion dollar security in the digital asset space"
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
              />
            </div>
            <div className="flex-1 space-y-6 xl:max-w-screen-lg">
              <p>{t("page-trillion-dollar-security-hero-paragraph-1")}</p>
              <p>{t("page-trillion-dollar-security-hero-paragraph-2")}</p>
              <ul>
                <li>
                  <b>
                    Billions of individuals are each comfortable holding more
                    than $1000 onchain
                  </b>
                  , collectively amounting to trillions of dollars secured on
                  Ethereum.
                </li>
                <li>
                  <b>
                    Companies, institutions, and governments are comfortable
                    storing more than 1 trillion dollars of value inside a
                    single contract or application
                  </b>
                  , and are comfortable transacting in comparable amounts.
                </li>
              </ul>

              <div className="mx-auto max-w-sm md:hidden">
                <ReportCard
                  cta={t("page-trillion-dollar-security-download-report")}
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
                This first report is focused on identifying and mapping the
                problems and challenges that remain. The next step will be to
                choose the highest priority issues, identify solutions, and work
                with the ecosystem to address them.
              </p>
              <p>
                Because the Ethereum ecosystem is decentralized, securing
                Ethereum is not something that can be done by a single entity.
                Ethereum&apos;s technology stack is built and maintained by
                independent organizations all around the world, ranging from
                wallets to infrastructure to developer tooling. While the 1TS
                project is coordinated by the Ethereum Foundation, we need your
                help to secure Ethereum.
              </p>
              <p>
                You can contribute to the 1TS security project by sharing your
                feedback and ideas:
              </p>

              <ul>
                <li>
                  Are there problems you see in Ethereum security not included
                  in this report?
                </li>
                <li>
                  What do you believe are the highest priorities of the issues
                  surveyed below?
                </li>
                <li>
                  What ideas or solutions do you have for how to address these
                  problems?
                </li>
              </ul>

              <p>
                We&apos;re eager to hear from you at{" "}
                <a
                  href="mailto:trilliondollarsecurity@ethereum.org"
                  className="text-primary"
                >
                  trilliondollarsecurity@ethereum.org
                </a>
                .
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
              <h3 className="mb-4">1. User experience (UX)</h3>
              <p>
                Security begins with the interface people use to interact with
                Ethereum. This boundary between users and the blockchain itself
                is a consistent source of security challenges.
              </p>
            </div>
            <div className="flex-1">
              <div className="space-y-10">
                <div className="space-y-4">
                  <p>
                    One defining feature of blockchains is the atomic nature of
                    transactions: once an update is recorded into the
                    blockchain, there is no opportunity for intervention or
                    reversal. This provides strong guarantees of consistency and
                    protocol level security, but exposes users to heightened
                    operational risk: a single mistake, compromised key, or
                    rushed approval can lead to irreversible loss.
                  </p>
                  <p>
                    As a result, a significant burden of security falls on the
                    user. To use Ethereum safely, individuals and organizations
                    must securely hold and manage keys, interact with onchain
                    applications, and use their keys to sign transactions to
                    transfer assets or otherwise update Ethereum&apos;s state.
                  </p>
                  <p>
                    Each of these requirements introduces risks like key
                    compromise or loss, rushed or uninformed approvals, or
                    compromise of the wallet software users rely on to inform
                    and guide them through interacting with Ethereum.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    1.1 Key management
                  </h4>
                  <p>
                    Many users are not equipped to safely manage cryptographic
                    keys.
                  </p>
                  <p>
                    Most widely used software wallets rely on users securely
                    storing seed phrases representing their underlying
                    cryptographic private key, which often leads them to use
                    insecure workarounds like storing seed phrases in plaintext,
                    on cloud services, or writing them down on paper.
                  </p>
                  <p>
                    Hardware wallets are an alternative, which enable users to
                    manage a cryptographic key stored within a special purpose
                    physical device. However, hardware wallets have their own
                    flaws and attack surface. Hardware wallets can be lost,
                    damaged, or stolen. Many hardware wallets are not open
                    source and may have opaque supply chains, raising the risk
                    of a supply chain attack where compromised devices are sold
                    into the market.
                  </p>
                  <p>
                    Whether keys are managed in a software or hardware wallet,
                    many users are understandably nervous about self custody
                    when it can be compromised through physical theft or
                    assault.
                  </p>
                  <p>
                    Enterprise and institutional users face additional
                    challenges in key management. If individual employees hold
                    keys (e.g. as part of a multisig wallet), the organization
                    must be able to replace them and create new ones due to
                    personnel changes over time. Compliance requirements in
                    different industries and jurisdictions may require custom
                    workflows or audit trails not supported by existing wallet
                    software. In some cases, enterprise users turn to
                    third-party custodians for digital assets, which may
                    introduce another layer of security risks to consider.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    1.2 Blind signing &amp; transaction uncertainty
                  </h4>
                  <p>
                    Users routinely approve transactions &ldquo;blindly&rdquo;
                    without understanding what they are doing. Wallets often
                    present raw hexadecimal data, truncated contract address, or
                    other information that is not sufficient for the user to
                    understand the consequences of a given transaction. This
                    leaves users of all kinds vulnerable to malicious smart
                    contracts, phishing, scams, spoofed interfaces, front-end
                    compromises, and basic user errors.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    1.3 Approval and permission management
                  </h4>
                  <p>
                    In many Ethereum applications, it is common for users to
                    grant certain permissions to the underlying application as
                    part of normal use. For instance, a user might grant a
                    decentralized exchange like Uniswap permission to move their
                    tokens in order to swap them for ETH.
                  </p>
                  <p>
                    These approvals can have limits on the amount, but many
                    wallets default to granting unlimited approvals with no
                    expiry date. There is no way for users to manage or review
                    their outstanding approvals from within most wallets.
                  </p>
                  <p>
                    This can expose users to malicious apps or compromised
                    frontends, because the default pattern for many users is to
                    grant unlimited approvals which can be used to drain their
                    funds. Even if a user grants an approval to a legitimate
                    smart contract, if that contract were later compromised
                    while the approval remains in place, then the compromised
                    contract could drain the user&rsquo;s funds.
                  </p>
                  <p>
                    This is equally a risk for organizational users. For
                    instance, an organization might choose to grant a DEX router
                    unlimited USDC allowance for operational convenience, which
                    then exposes them to risks if the router contract is
                    upgraded.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    1.4 Compromised web interfaces
                  </h4>
                  <p>
                    Most users do not directly interact with a smart contract,
                    but rather through a web interface via their mobile device
                    or web browser.
                  </p>
                  <p>
                    These frontends can be vulnerable to attack through familiar
                    means like DNS hijacking, malicious javascript injection,
                    insecure hosting, or various third party dependencies. A
                    compromised app UX can redirect users of all kinds to
                    malicious smart contracts or lead them to sign misleading
                    transactions.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">1.5 Privacy</h4>
                  <p>
                    Privacy can mitigate or magnify security risks for users of
                    all kinds.
                  </p>
                  <p>
                    Weaker privacy protections expose individual users to a
                    variety of targeted threats like phishing, exploitation,
                    scams, or physical attacks. Many common UX patterns expose
                    users, e.g., address reuse, KYC data, and other metadata
                    leaks.
                  </p>
                  <p>
                    For institutions and enterprises, privacy is often a
                    fundamental business requirement for compliance reasons or
                    certain use cases. In addition to those issues, it can
                    create exposure to specific security risks. For instance, a
                    user of a supply chain system built on Ethereum may require
                    strong privacy guarantees to protect intellectual property
                    assets that could be compromised if the system was
                    transparent.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    1.6 Fragmentation
                  </h4>
                  <p>
                    There is a lack of consistency in how different wallets
                    handle core behaviours like displaying transactions,
                    handling approvals, or labelling contracts. This
                    fragmentation of user experience adds friction to the
                    user&rsquo;s ability to learn how to safely use wallets, and
                    increases risks.
                  </p>
                  <p>
                    For instance, users cannot rely on consistent UX cues to
                    protect themselves from phishing and spoofing as they differ
                    across wallets. Users cannot form reliable expectations
                    about how Ethereum works if each tool functions differently.
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
              <h3 className="mb-4">2. Smart Contract Security</h3>
              <p>
                Smart contracts are the onchain components of Ethereum
                applications: the code that holds funds, defines access
                controls, and enforces the application&rsquo;s business logic.
                Because smart contracts are typically transparent and accessible
                to anyone, they are a critical attack surface when considering
                security in the Ethereum ecosystem.
              </p>
            </div>
            <div className="flex-1">
              <div className="space-y-10">
                <div className="space-y-4">
                  <p>
                    Smart contract security has radically improved over
                    Ethereum&rsquo;s history. Early security incidents like the
                    DAO hack motivated the ecosystem to professionalize and
                    improve safeguards across the software lifecycle that leads
                    to code being deployed onchain. Key advancements include:
                  </p>
                  <ul className="my-0 ml-6 list-disc">
                    <li>
                      Security auditing became a standard practice, with several
                      security firms entering the ecosystem and developing
                      expertise.
                    </li>
                    <li>
                      Tooling, testing, and static analysis systems matured and
                      became standard practice.
                    </li>
                    <li>
                      Libraries of pre-audited common components gave developers
                      secure-by-default building blocks.
                    </li>
                    <li>
                      Formal verification techniques were adopted, especially
                      for bridges, staking systems, and high value contracts.
                    </li>
                    <li>
                      The ecosystem&rsquo;s security culture and best practices
                      improved.
                    </li>
                    <li>
                      The creation of significant bounty programs that hardened
                      the app layer.
                    </li>
                  </ul>
                  <p>
                    However, there remain weaknesses and areas for improvement
                    in this domain.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    2.1 Contract vulnerabilities
                  </h4>
                  <p>
                    Despite advances in smart contract security, there are still
                    vulnerabilities that can lead to significant security
                    issues, including:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      <b>Contract upgrade risk.</b> Some contracts are designed
                      to be modifiable after deployment, to enable a development
                      team to continue to update and improve an application.
                      However, this introduces risks. Upgrades could result in
                      new vulnerabilities, or total loss of user funds in the
                      case of a malicious upgrade.
                    </li>
                    <li>
                      <b>Re-entrancy</b>, where contract A calls an external
                      contract B before updating its own internal state, and
                      contract B calls back to the original contract A before
                      the first call finishes.
                    </li>
                    <li>
                      <b>Unsafe use of external libraries</b>, where a contract
                      calls an external library that may be unaudited,
                      malicious, or upgradeable.
                    </li>
                    <li>
                      <b>Unaudited components.</b> While auditing and use of
                      standard libraries has improved, developers sometimes rely
                      on unaudited components in their applications.
                    </li>
                    <li>
                      <b>Access control failures</b>, where permissions are
                      misconfigured or defined too broadly, allowing attackers
                      to take malicious actions.
                    </li>
                    <li>
                      <b>Unauthorized Access</b>, where a private key that is
                      able to control the contract is obtained by a malicious
                      actor.
                    </li>
                    <li>
                      <b>Bridges and crosschain interactions.</b> Bridges and
                      crosschain protocols introduce additional complexity, and
                      attackers can exploit weaknesses in how crosschain
                      messages are passed or validated.
                    </li>
                    <li>
                      <b>
                        Externally Owned Account (EOA) delegation or signature
                        misuse.
                      </b>{" "}
                      Malicious applications may trick users into signing over
                      full delegation of their account to another party,
                      enabling theft. Malicious applications can also use signed
                      messages from the user in unexpected ways, e.g., in a
                      replay attack.
                    </li>
                    <li>
                      <b>
                        Emerging risk of bugs introduced by AI code generation
                        or automated refactoring tools.
                      </b>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    2.2 Developer experience, tooling and programming languages
                  </h4>
                  <p>
                    Vulnerabilities end up in deployed code as a result of
                    developer error. Improved developer tooling has made it
                    significantly easier to deploy safe smart contracts.
                    However, issues remain.
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      <b>Lack of secure defaults in popular frameworks.</b> Some
                      tools prioritize flexibility or speed over safety, setting
                      insecure defaults like unlimited token approvals in the
                      approve() function, or failing to include access control
                      patterns by default.
                    </li>
                    <li>
                      <b>Custom code for advanced operational controls.</b>{" "}
                      Institutional users with complex operational requirements
                      often must build required features from scratch,
                      increasing the risk of vulnerabilities. There is a lack of
                      standardized secure components or frameworks for advanced
                      security workflows.
                    </li>
                    <li>
                      <b>Inconsistent testing coverage</b> across tooling
                      stacks, as well as a lack of norms around using proven
                      techniques like fuzzing or invariant checking.
                    </li>
                    <li>
                      <b>Low adoption of formal verification methods.</b> Formal
                      verification techniques are powerful, but they are
                      complex, costly, require specialized domain expertise, and
                      are not well integrated into standard developer workflows,
                      where they could be used much earlier in the production of
                      software to verify safety at the specification stage.
                    </li>
                    <li>
                      <b>Issues related to contract verification.</b> Users and
                      developers cannot easily assess the trustworthiness of
                      deployed contracts, the extent of their security
                      validation (e.g. code audits), or the presence of latent
                      risks. While solutions exist for this purpose, many issues
                      remain. Tooling that addresses these issues is not widely
                      adopted, the standards that would unify the approaches
                      remain fragmented, and some of the existing services are
                      themselves centralized dependencies.
                    </li>
                    <li>
                      <b>Compiler risks.</b> Compilers (the software that
                      converts human readable code like Solidity into the
                      bytecode used by the EVM itself) can have flaws which
                      introduce errors into smart contracts before they are
                      deployed. The Ethereum ecosystem today mostly depends on
                      the solc compiler, meaning a bug could have widespread
                      effects.
                    </li>
                    <li>
                      <b>Programming language diversity and depth.</b> While
                      Solidity has a deep tooling ecosystem built on it, some
                      developers want more modern safety features found in other
                      programming languages, like memory safety.
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    2.3 Risk assessment of onchain code
                  </h4>
                  <p>
                    Institutions and enterprises have existing processes,
                    standards, and requirements for evaluating the security of
                    technology and systems that they depend on. However,
                    existing frameworks often do not cleanly map onto smart
                    contracts, usually assuming mutable code, centralized change
                    control, and clear lines of accountability or legal
                    liability. Systems built on smart contracts may sometimes
                    break those assumptions, making it difficult for
                    organizations to adopt Ethereum and manage risk
                    appropriately.
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
              <h3 className="mb-4">3. Infrastructure and cloud security</h3>
              <p>
                Many uses of Ethereum depend on a variety of infrastructure
                providers, including both crypto-specific infrastructure (e.g.,
                Layer 2 chains, RPC providers) and traditional cloud and
                internet infra (e.g., AWS, CDN, DNS).
              </p>
            </div>
            <div className="flex-1">
              <div className="space-y-10">
                <div className="space-y-4">
                  <p>
                    These systems are an attack surface both for the wallet and
                    application layer (e.g., RPC endpoints for wallets) and for
                    the Ethereum protocol itself (e.g., many validators are
                    hosted on cloud infrastructure). Private key compromise,
                    phishing, and lack of granular access controls can lead to
                    large-scale outages, theft, or unauthorized changes, even if
                    the underlying blockchain protocol remains secure.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    3.1 Layer 2 chains
                  </h4>
                  <p>
                    Layer 2 chains (L2s) serve as extensions for Ethereum,
                    enabling faster and lower fee environments while retaining
                    some of the characteristic security guarantees of Ethereum
                    mainnet (depending on their specific design). However, they
                    also have their own distinct attack surfaces including:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      <b>Multi-hop bridged asset complexity.</b> When assets
                      travel between L1 and multiple L2s, they are exposed to
                      multiple sets of contracts all of which must be secure.
                      Mismatched accounting or outages in L2 chains can
                      introduce vulnerabilities that can be exploited by
                      attackers.
                    </li>
                    <li>
                      <b>
                        Rollup L2s rely on proving systems to enforce
                        correctness of state updates.
                      </b>{" "}
                      Bugs or misconfigurations in these systems can stall or
                      prevent finalization, or allow finalization of false state
                      updates leading to loss of user funds.
                    </li>
                    <li>
                      <b>
                        Security councils are groups of keyholders who serve as
                        a &quot;backup&quot; mechanism to upgrade L2 software or
                        respond to certain emergencies.
                      </b>{" "}
                      Security councils themselves pose risks, as compromise or
                      collusion among members could put user funds at risk or
                      freeze assets.
                    </li>
                  </ul>
                  <p>
                    See <Link href="https://l2beat.com/">L2Beat</Link> for a
                    detailed framework and monitoring dashboard that evaluates
                    and compares L2 performance and security.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    3.2 RPC and node infrastructure
                  </h4>
                  <p>
                    Ethereum applications depend on a small number of infra
                    providers for RPC access, APIs and node services. This
                    includes crypto-specific infra providers, as well as
                    traditional cloud services that are commonly used to host
                    nodes (e.g., AWS, Cloudflare, Hetzner).
                  </p>
                  <p>
                    If these infra providers went offline or attempted to censor
                    or throttle access, many users could be prevented from
                    accessing Ethereum through their wallet or application,
                    until they were able to migrate to a new RPC or other infra
                    provider. Some of these providers have previously suspended
                    or shut down accounts associated with blockchain activity,
                    raising concerns about their long-term reliability for
                    decentralized applications.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    3.3 DNS level vulnerabilities
                  </h4>
                  <p>
                    The Domain Name System (DNS) is a foundational layer of the
                    internet, but it is also centralized and can be compromised.
                    Many users access apps through web domains, which are
                    susceptible to:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      DNS hijacking where an attacker inserts a malicious false
                      frontend.
                    </li>
                    <li>
                      Domain seizure, where a government or registrar can seize
                      domains.
                    </li>
                    <li>
                      Phishing via lookalike domains, where attackers register
                      near identical names to confuse users.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    3.4 Software supply chain and libraries
                  </h4>
                  <p>
                    Ethereum developers rely on open-source libraries, often
                    pulled directly from services like npm, crates.io, or
                    GitHub. If these libraries are compromised, they can be a
                    vector for attacks like:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      <b>Malicious package injection</b>, where attackers
                      compromise a widely used package or publish one under a
                      similar name
                    </li>
                    <li>
                      <b>Hijacked dependencies</b>, where maintainers lose
                      control of a project and a malicious actor introduces
                      harmful code
                    </li>
                    <li>
                      <b>Developer compromise</b>, where packages installed
                      contain code that gives the attacker control over the
                      developer&rsquo;s computer.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    3.5 Frontend delivery services and related risks
                  </h4>
                  <p>
                    Many Ethereum applications serve their frontends via a
                    Content Delivery Network (CDN) or cloud-based hosting
                    platform (e.g., Vercel, Netlify, Cloudflare). If these
                    services are compromised, they can be a vector for attacks
                    like malicious javascript injection, where attackers serve
                    an altered frontend to users.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    3.6 Internet Service Provider level censorship
                  </h4>
                  <p>
                    Internet Service Providers (ISPs) or nation states can use
                    control of underlying internet infrastructure to censor
                    access to Ethereum. For example, these attacks could
                    include:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      Blocking or throttling traffic to common Ethereum ports
                    </li>
                    <li>
                      Filtering DNS requests that resolve to Ethereum related
                      services
                    </li>
                    <li>Geofencing or IP bans against known Ethereum nodes</li>
                    <li>
                      Deep packet inspection to identify and censor Ethereum
                      protocol related traffic
                    </li>
                  </ul>
                  <p>
                    Many of these basic techniques are already used by
                    authoritarian governments around the world to suppress
                    access to information, protest tools, or cryptocurrencies
                    today.
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
              <h3 className="mb-4">4. Consensus protocol</h3>
              <p>
                Ethereum&rsquo;s consensus protocol defines how the network
                updates the state of the Ethereum blockchain and comes to
                agreement. This protocol is at the foundation of what makes
                Ethereum a trustworthy platform for money, finance, identity,
                governance, real world assets, and more.
              </p>
            </div>
            <div className="flex-1">
              <div className="space-y-10">
                <div className="space-y-4">
                  <p>
                    Ethereum&rsquo;s consensus protocol has proven robust in
                    practice, with zero downtime since first launching in 2015
                    and across several upgrades. However, there remain long-term
                    areas for improvement to make the system more resilient and
                    secure.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    4.1 Consensus brittleness and recovery risks
                  </h4>
                  <p>
                    Ethereum&rsquo;s fork choice and finality rules are
                    resilient, but they are not invulnerable. During certain
                    edge case conditions (like prolonged validator disagreement,
                    client bugs, or network partitions) consensus could stall or
                    temporarily diverge. In extreme conditions, this could lead
                    to cascading validator penalties through inactivity leaks or
                    slashing, which could further lead to capital flight from
                    validators.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    4.2 Client diversity
                  </h4>
                  <p>
                    Ethereum&rsquo;s industry-leading client diversity protects
                    the network from bugs in any single client. However, client
                    diversity could still be improved with more adoption of
                    minority clients to reduce these risks even further.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    4.3 Staking centralization and pool dominance
                  </h4>
                  <p>
                    A significant amount of validator weight is concentrated in
                    liquid staking protocols, custodial services, and large node
                    operators. This concentration can lead to risks like:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      Governance capture or influence. If entities controlling
                      large amounts of stake (or entities with legal power to
                      influence those entities) coordinated together, they could
                      have outsized influence on which blocks are proposed and
                      attested, potentially censoring users, or influencing
                      protocol upgrades.
                    </li>
                    <li>
                      Homogeneity in client choice and infrastructure setup,
                      which can increase correlated failure risks.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    4.4 Undefined social slashing and coordination gaps
                  </h4>
                  <p>
                    In some extreme failure modes, Ethereum would rely on
                    &ldquo;social slashing&rdquo; to penalize validators who
                    acted maliciously to attack the network (see section 6.1).
                    However, the infrastructure, norms, and expected processes
                    for this kind of slashing are underdeveloped. There is no
                    established mechanism that the community would use to engage
                    in this process.
                  </p>
                  <h4 className="mb-4 text-xl font-semibold">
                    4.5 Economic and game-theoretic attack vectors
                  </h4>
                  <p>
                    Many potential economic attack vectors remain understudied,
                    including:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      Griefing attacks or slash griefing. Validators may incur
                      costs or slashing penalties not due to their own faults
                      but because of adversarial behavior intended solely to
                      harm others at a net cost to the attacker.
                    </li>
                    <li>
                      Strategic exits or timed inactivity. Validators could
                      intentionally go offline or exit at critical times to
                      maximize profits or disrupt consensus with minimal
                      penalties.
                    </li>
                    <li>
                      Collusion among validators or relays. Coordinated behavior
                      between validators or between relays and validators could
                      reduce decentralization, or extract MEV.
                    </li>
                    <li>
                      Exploitation of edge-case incentives in MEV,
                      proposer-builder separation, or liquid staking design.
                      Actors may manipulate rare protocol conditions to gain
                      outsized rewards.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    4.6 Quantum risk
                  </h4>
                  <p>
                    Ethereum&rsquo;s core cryptography (e.g. elliptic curve
                    signatures like secp256k1) could one day be broken by
                    quantum computers. While this is not an imminent risk, a
                    credible threat could instantly render existing wallets,
                    contracts, and staking keys vulnerable. This future
                    challenge weakens Ethereum&rsquo;s long-term guarantees to
                    users.
                  </p>
                  <p>
                    Migration paths to quantum-resistant cryptography (e.g., via
                    post-quantum signature schemes) need to be designed, tested,
                    and possibly embedded in the protocol years before they are
                    needed. Organizations across the Ethereum ecosystem,
                    including the Ethereum Foundation, are actively exploring
                    these options and monitoring risks.
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
                5. Monitoring, incident response, and mitigation
              </h3>
            </div>
            <div className="flex-1">
              <div className="space-y-10">
                <div className="space-y-4">
                  <p>
                    Even an idealized blockchain ecosystem will have risks,
                    attacks, and vulnerabilities. When things do go wrong, there
                    must be effective systems to mitigate, detect and respond.
                    Challenges here include:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>
                      <b>Reaching the affected team.</b> It can be difficult to
                      get in contact with the team whose application has been
                      compromised. This can lead to hours of delays, limiting
                      the ability for responders to recover funds.
                    </li>
                    <li>
                      <b>Escalating issues at related organizations.</b> When
                      the issue involves a platform (like a social network or
                      centralized exchange) it can be challenging for responders
                      to escalate the issue if they do not have a pre-existing
                      contact.
                    </li>
                    <li>
                      <b>Response coordination.</b> It is often unclear how many
                      incident response teams are assisting the affected
                      application, leading to miscommunication or wasted effort
                      when a group effort may have been more effective.
                    </li>
                    <li>
                      <b>Lack of monitoring capabilities.</b> It can be
                      difficult to monitor for onchain and offchain issues,
                      which would provide early warning and ensure a swift
                      response to threats.
                    </li>
                    <li>
                      <b>Access to insurance.</b> Insurance is an essential tool
                      for mitigating losses in most traditional systems that
                      deal with money, financial systems, identity, and other
                      valuable information. However, today few insurance options
                      are available from traditional financial services for the
                      crypto ecosystem.
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
              <h3 className="mb-4">6. Social layer and governance</h3>
              <p>
                Ethereum&apos;s &quot;social layer&quot; refers to the set of
                people, organizations, companies, governance processes, and
                cultural norms that influence how the Ethereum ecosystem
                behaves. This social layer is itself vulnerable to certain
                attacks or risks, which can then influence the security and
                reliability of Ethereum.
              </p>
            </div>
            <div className="flex-1">
              <div className="space-y-10">
                <div className="space-y-4">
                  <p>
                    These risks tend to be more long-term oriented, and concern
                    Ethereum as a whole rather than the security of individual
                    users or applications.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    6.1 Stake centralization
                  </h4>
                  <p>
                    Centralization of large amounts of stake can pose risks to
                    Ethereum as a whole if the entities controlling that stake
                    decide to collude.
                    <br />
                    This economic centralization creates the potential for
                    social governance capture. If a small group of validators
                    controls a supermajority of stake, they could:
                  </p>
                  <ul className="ml-6 mt-2 list-disc">
                    <li>Coordinate on or resist forks.</li>
                    <li>Censor certain transactions or contracts.</li>
                    <li>
                      Undermine community consensus by threatening exit or
                      opposition.
                    </li>
                  </ul>
                  <p>
                    If this extreme scenario were to happen, the Ethereum
                    community has suggested that &quot;social slashing&quot;
                    might be the answer. Social slashing is the use of offchain
                    social consensus to decide to slash misbehaving validators,
                    as a check on their power. But no clear norms, procedures,
                    or tooling exist to enact such measures (see section 4.4).
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    6.2 Offchain asset centralization
                  </h4>
                  <p>
                    Ethereum hosts significant amounts of real world assets,
                    where the assets are held offchain in bank accounts or other
                    deposits, which are then traded onchain via tokens that
                    represent a claim on the offchain assets. For instance, many
                    large stablecoins function this way.
                  </p>
                  <p>
                    The institutions that hold the offchain deposits may have
                    influence over the Ethereum ecosystem. For instance, during
                    an extreme scenario where there is a contentious fork or
                    network upgrade, large depositors can influence which chain
                    becomes widely accepted by only choosing to recognize tokens
                    on one chain or the other.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    6.3 Regulatory attack or pressure
                  </h4>
                  <p>
                    Governments and regulators could pressure various entities
                    that control important components of the Ethereum stack to
                    censor or otherwise interfere with the Ethereum protocol.
                    Institutional users of Ethereum could also be impacted by
                    these pressures, which would have further consequences for
                    their users (e.g. a bank who can no longer offer certain
                    crypto products due to regulatory bans).
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="mb-4 text-xl font-semibold">
                    6.4 Organizational capture of governance
                  </h4>
                  <p>
                    Ethereum&apos;s open source governance and development
                    processes are driven by a diverse and global set of teams
                    and companies that maintain core client software,
                    infrastructure, and tooling.
                  </p>
                  <p>
                    Various forms of influence (corporate acquisitions, funding
                    dependencies, employment of key contributors, conflicts of
                    interest inside existing orgs) could gradually shift the
                    culture and priorities of Ethereum governance. This may lead
                    to alignment with specific commercial or external interests
                    that diverge from the community-driven ethos and established
                    roadmap, potentially weakening Ethereum&apos;s neutrality
                    and resilience over time.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainArticle>
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
