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

  const pairings: Pairing[] = [
    {
      legacy: {
        label: t("page-index-values-ownership-legacy-label"),
        content: [
          t("page-index-values-ownership-legacy-content-0"),
          t("page-index-values-ownership-legacy-content-1"),
        ],
      },
      ethereum: {
        label: t("page-index-values-ownership-ethereum-label"),
        content: [t("page-index-values-ownership-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-fairness-legacy-label"),
        content: [t("page-index-values-fairness-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-fairness-ethereum-label"),
        content: [t("page-index-values-fairness-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-privacy-legacy-label"),
        content: [
          t("page-index-values-privacy-legacy-content-0"),
          t("page-index-values-privacy-legacy-content-1"),
        ],
      },
      ethereum: {
        label: t("page-index-values-privacy-ethereum-label"),
        content: [t("page-index-values-privacy-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-integration-legacy-label"),
        content: [t("page-index-values-integration-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-integration-ethereum-label"),
        content: [t("page-index-values-integration-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-decentralization-legacy-label"),
        content: [t("page-index-values-decentralization-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-decentralization-ethereum-label"),
        content: [t("page-index-values-decentralization-ethereum-content-0")],
      },
    },
    {
      legacy: {
        label: t("page-index-values-censorship-legacy-label"),
        content: [t("page-index-values-censorship-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-censorship-ethereum-label"),
        content: [
          t("page-index-values-censorship-ethereum-content-0"),
          t("page-index-values-censorship-ethereum-content-1"),
        ],
      },
    },
    {
      legacy: {
        label: t("page-index-values-open-legacy-label"),
        content: [t("page-index-values-open-legacy-content-0")],
      },
      ethereum: {
        label: t("page-index-values-open-ethereum-label"),
        content: [t("page-index-values-open-ethereum-content-0")],
      },
    },
  ]
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
