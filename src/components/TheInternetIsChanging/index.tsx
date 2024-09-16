import { useTranslation } from "next-i18next"
import { FaCheck } from "react-icons/fa"

import Tooltip from "@/components/Tooltip"

import { cn } from "@/lib/utils/cn"

import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTag,
} from "../ui/section"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

type Item = {
  label: string
  content: string[]
}

type Pairing = {
  legacy: Item
  ethereum: Item
}

// TODO: Extract strings for intl
const pairings: Pairing[] = [
  {
    legacy: {
      label: "Restricted ownership",
      content: [
        "With a regular bank or social media platform, your assets and data are managed by the organization. You rely on them for access and control.",
        "They may use your data in ways you might not agree with, based on their policies.",
      ],
    },
    ethereum: {
      label: "Direct ownership",
      content: [
        "With Ethereum, only you have access and control. Nobody else should ever be able to use your assets. You can decide who to grant that permission.",
      ],
    },
  },
  {
    legacy: {
      label: "Discriminatory",
      content: [
        "Today, not everyone has the same access to financial services. Some people may face barriers to access due to their location or nationality.",
      ],
    },
    ethereum: {
      label: "Equal Access",
      content: [
        "We believe everyone should be allowed to benefit from a global system. That is why Ethereum grants equal access to all worldwide, regardless of who you are or where you come from.",
      ],
    },
  },
  {
    legacy: {
      label: "No privacy",
      content: [
        "We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy out of their beneficence.",
        "Most apps gather as much of your personal information as possible so that they can target you with tailored marketing.",
      ],
    },
    ethereum: {
      label: "Privacy oriented",
      content: [
        "Ethereum community respects privacy. You you have the right to use apps without revealing yourself or your contact information.",
      ],
    },
  },
  {
    legacy: {
      label: "Integrated",
      content: [
        "Most apps push you to create separate accounts, making it hard to remember all your login details and registrations.",
      ],
    },
    ethereum: {
      label: "Fragmented",
      content: [
        "With Ethereum you can reuse one account in all apps instead. No individual registrations are needed.",
      ],
    },
  },
  {
    legacy: {
      label: "Centralized",
      content: [
        "Companies are owned by private entrepreneurs and shareholders. They alone exert control over the company and benefit the most from its success.",
      ],
    },
    ethereum: {
      label: "Decentralized",
      content: [
        "Just like the internet itself, Ethereum doesn't belong to anyone. It’s shared and shaped equally with all. There is no single owner who could control it.",
      ],
    },
  },
  {
    legacy: {
      label: "Censorable",
      content: [
        "Modern platforms and its rules often change. They can be influenced by stakeholders, company management or even oppressive regimes.",
      ],
    },
    ethereum: {
      label: "Censorship resistant",
      content: [
        "Resistance to oppression is key principal of Ethereum. Its functionality should always stay fair and impartial.",
        "Ethereum cannot be controlled by any nation state, company or individual.",
      ],
    },
  },
  {
    legacy: {
      label: "Closed to most",
      content: [
        "Companies protect their intellectual property and don’t share. No one outside the company can see how things work, fix problems, or make improvements. Its hard for people to create new tools or customize.",
      ],
    },
    ethereum: {
      label: "Open to all",
      content: [
        "Ethereum is public to all. Anyone can see, use, and improve the code, making it better for everyone.",
      ],
    },
  },
]

type ItemProps = React.HTMLAttributes<HTMLButtonElement> & {
  explanation: string[]
  separatorClass: string
  icon?: React.ReactNode
}

const Item = ({ children, explanation, separatorClass, icon }: ItemProps) => (
  <>
    <Tooltip
      content={
        <>
          <h3 className="text-md uppercase text-body-medium">{children}</h3>
          {explanation.map((line) => (
            <p key={line} className="text-sm">
              {line}
            </p>
          ))}
        </>
      }
    >
      {icon}
      {children}
    </Tooltip>
    <div
      className={cn(
        "h-1.5 min-w-1.5 rounded-full motion-reduce:last:hidden",
        separatorClass
      )}
    />
  </>
)

const TheInternetIsChanging = () => {
  const { t } = useTranslation("page-index")
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const fadeEdges = {
    mask: `linear-gradient(to right, transparent, white 15%, white 85%, transparent)`,
  }

  return (
    <Section id="values" className="!my-64">
      <SectionContent className="flex flex-col items-center text-center">
        <SectionTag>{t("page-index:page-index-values-tag")}</SectionTag>
        <SectionHeader>
          {t("page-index:page-index-values-header")}
        </SectionHeader>
        <p className="text-lg text-body-medium">
          {t("page-index:page-index-values-description")}
        </p>
      </SectionContent>
      <div className="mt-19 overflow-hidden max-2xl:-mx-4 2xl:rounded-2xl">
        <div className="group bg-blue-50 dark:bg-blue-600">
          <div
            className="flex max-w-full overflow-hidden motion-reduce:overflow-auto"
            style={prefersReducedMotion ? {} : fadeEdges}
          >
            {Array(prefersReducedMotion ? 1 : 3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="group-hover:animate-pause flex min-w-fit animate-scroll-left items-center space-x-10 p-6 ring motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center"
                >
                  {pairings.map(({ ethereum: { label, content } }) => (
                    <Item
                      key={label}
                      explanation={content}
                      separatorClass="bg-accent-a"
                      className="group/item bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700"
                      icon={
                        <FaCheck className="me-1 text-success group-hover/item:text-white" />
                      }
                    >
                      {label}
                    </Item>
                  ))}
                </div>
              ))}
          </div>
        </div>

        <div className="group bg-gray-50 dark:bg-gray-800">
          <div
            className="flex max-w-full overflow-hidden motion-reduce:overflow-auto"
            style={prefersReducedMotion ? {} : fadeEdges}
          >
            {Array(prefersReducedMotion ? 1 : 3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="group-hover:animate-pause flex animate-scroll-right items-center space-x-10 p-6 motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center"
                >
                  {pairings.map(({ legacy: { label, content } }) => (
                    <Item
                      key={label}
                      explanation={content}
                      className="bg-gray-200/20 text-body-medium hover:bg-gray-600 hover:text-white dark:bg-gray-950 dark:text-body"
                      separatorClass="bg-gray-200 dark:bg-gray-950"
                    >
                      {label}
                    </Item>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default TheInternetIsChanging
