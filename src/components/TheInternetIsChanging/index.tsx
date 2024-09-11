import { useTranslation } from "next-i18next"
import { FaCheck } from "react-icons/fa"
import { Portal } from "@radix-ui/react-portal"

import { cn } from "@/lib/utils/cn"

import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTag,
} from "../ui/section"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

type Item = {
  oldLabel: string
  newLabel: string
  explanation: string[]
}

// TODO: Extract strings for intl
// TODO: Clean up and finalize copy; currently WIP
const items: Item[] = [
  {
    oldLabel: "Discriminatory",
    newLabel: "Equal Access",
    explanation: [
      "Not everyone has the same opportunities or ability to use certain resources, services, or information.",
      "Some people might have more or better access, while others are left out or given less.",
      "Anyone in the world should be able to participate as a user, observer or developer, on a maximally equal access. Participation should be permissionless and open to everyone.",
      "Ethereum protocol is designed to be fair and impartial. It only focuses on whether the process is valid, not who’s behind it.",
    ],
  },
  {
    oldLabel: "Censored",
    newLabel: "Censorship Resistant",
    explanation: [
      "Services decide who gets to speak or participate online, which can silence voices unfairly.",
      "It also means you can lose access to your following or communities without any say or way to appeal.",
      "Nobody should be able to stop anyone from using Ethereum apps or doing what they want. Bad actors should be addressed at a different layer.",
    ],
  },
  {
    oldLabel: "Opaque",
    newLabel: "Transparent",
    explanation: [
      "Anyone should be able to check whether Ethereum and its apps are working correctly and are following the rules their creators claim the apps have, even if you don't trust the creators.",
    ],
  },
  {
    oldLabel: "Centralized",
    newLabel: "Decentralized",
    explanation: [
      "Centralization gives too much power to one group, which can lead to censorship or control over users.",
      "It also creates a single point of failure, making the system more vulnerable to hacks or outages.",
      "Ethereum is not owned or controlled by any particular entity, even the Ethereum source code is not produced by a single company.",
      "Ethereum exists thanks to thousands of independent individuals around the world working together for Ethereum’s independence.",
    ],
  },
  {
    oldLabel: "Monopolistic",
    newLabel: "Distributed",
    explanation: [
      "Some companies and individuals have grown so strong they control most of the resources, gaining significant power over others.",
      "This allows them to influence decisions and outcomes to their benefit while limiting opportunities for others.",
    ],
  },
  {
    oldLabel: "Coercive",
    newLabel: "Opt-in",
    explanation: [
      "Current monopolies try to capture and trap you inside a walled ecosystem.",
      "Ethereum community builds tools that do their task but otherwise freely integrate with a wider open ecosystem instead.",
    ],
  },
]

type ItemProps = React.HTMLAttributes<HTMLButtonElement> & {
  explanation: string[]
  separatorClass: string
}

const Item = ({
  children,
  explanation,
  className,
  separatorClass,
}: ItemProps) => (
  <>
    <Tooltip>
      <TooltipTrigger>
        <button
          className={cn(
            "flex h-fit items-center gap-x-1 text-nowrap rounded-full px-4 py-1 font-bold uppercase",
            className
          )}
        >
          {children}
        </button>
      </TooltipTrigger>
      <Portal>
        <TooltipContent className="max-w-sm space-y-2">
          {explanation.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </TooltipContent>
      </Portal>
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
    <Section id="values">
      <SectionContent className="flex flex-col items-center text-center">
        <SectionTag>{t("page-index:page-index-values-tag")}</SectionTag>
        <SectionHeader>
          {t("page-index:page-index-values-header")}
        </SectionHeader>
        <p className="text-lg text-body-medium">
          {t("page-index:page-index-values-description")}
        </p>
      </SectionContent>
      <div className="mt-19 overflow-hidden max-lg:-mx-4 lg:rounded-2xl">
        <div className="group bg-blue-50 dark:bg-blue-600">
          <div
            className="flex max-w-full overflow-hidden motion-reduce:justify-center motion-reduce:overflow-auto"
            style={prefersReducedMotion ? {} : fadeEdges}
          >
            {Array(prefersReducedMotion ? 1 : 3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="group-hover:animate-pause flex animate-scroll-left items-center space-x-10 p-6 motion-reduce:animate-none"
                >
                  {items.map(({ newLabel: label, explanation }) => (
                    <Item
                      key={label}
                      explanation={explanation}
                      separatorClass="bg-accent-a"
                      className="group/item bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700"
                    >
                      <FaCheck className="text-success group-hover/item:text-white" />{" "}
                      {label}
                    </Item>
                  ))}
                </div>
              ))}
          </div>
        </div>

        <div className="group bg-gray-50 dark:bg-gray-800">
          <div
            className="flex max-w-full overflow-hidden motion-reduce:justify-center motion-reduce:overflow-auto"
            style={prefersReducedMotion ? {} : fadeEdges}
          >
            {Array(prefersReducedMotion ? 1 : 3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="group-hover:animate-pause flex animate-scroll-right items-center space-x-10 p-6 motion-reduce:animate-none"
                >
                  {items.map(({ oldLabel: label, explanation }) => (
                    <Item
                      key={label}
                      explanation={explanation}
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
