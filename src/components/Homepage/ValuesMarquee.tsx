import { FaCheck } from "react-icons/fa"

import Tooltip from "@/components/Tooltip"

import { cn } from "@/lib/utils/cn"

import { useValuesMarquee } from "../Homepage/useValuesMarquee"
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTag,
} from "../ui/section"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

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

type RowProps = React.HTMLAttributes<HTMLDivElement> & {
  toRight?: boolean
}

const Row = ({ className, children, toRight }: RowProps) => {
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const fadeEdges = {
    mask: `linear-gradient(to right, transparent, white 15%, white 85%, transparent)`,
  }

  return (
    <div className={cn("group", className)}>
      <div
        className="flex max-w-full overflow-hidden motion-reduce:overflow-auto"
        style={prefersReducedMotion ? {} : fadeEdges}
      >
        {Array(prefersReducedMotion ? 1 : 3)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "group-hover:animate-pause flex min-w-fit items-center space-x-10 p-6 motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center",
                toRight ? "animate-scroll-right" : "animate-scroll-left"
              )}
            >
              {children}
            </div>
          ))}
      </div>
    </div>
  )
}

const ValuesMarquee = () => {
  const { t, pairings } = useValuesMarquee()
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
        <Row className="bg-blue-50 dark:bg-blue-600">
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
        </Row>
        <Row className="bg-gray-50 dark:bg-gray-800" toRight>
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
        </Row>
      </div>
    </Section>
  )
}

export default ValuesMarquee
