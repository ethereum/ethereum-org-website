import { forwardRef, useEffect, useRef, useState } from "react"
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
  container?: HTMLElement | null
}

const Item = ({
  children,
  className,
  explanation,
  separatorClass,
  icon,
  container,
}: ItemProps) => (
  <>
    <Tooltip
      container={container}
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
      <div
        className={cn(
          "flex flex-nowrap items-center text-nowrap rounded-full px-4 py-1 font-bold uppercase",
          className
        )}
      >
        {icon}
        {children}
      </div>
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

const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ className, children, toRight }, ref) => {
    const { prefersReducedMotion } = usePrefersReducedMotion()
    const fadeEdges = {
      mask: `linear-gradient(to right, transparent 1rem, white 15%, white 85%, transparent calc(100% - 1rem))`,
    }

    return (
      <div ref={ref} className={cn("group", className)}>
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
)
Row.displayName = "Row"

const ValuesMarquee = () => {
  const { t, pairings } = useValuesMarquee()
  const containerFirstRef = useRef<HTMLDivElement>(null)
  const containerSecondRef = useRef<HTMLDivElement>(null)

  const [containerFirst, setContainerFirst] = useState<HTMLDivElement | null>(
    null
  )
  const [containerSecond, setContainerSecond] = useState<HTMLDivElement | null>(
    null
  )

  useEffect(() => {
    if (containerFirstRef.current) {
      setContainerFirst(containerFirstRef.current)
    }
    if (containerSecondRef.current) {
      setContainerSecond(containerSecondRef.current)
    }
  }, [])

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
      <div className="relative mt-19 overflow-hidden max-2xl:-mx-4 2xl:rounded-2xl">
        <Row
          ref={containerFirstRef}
          className="border-b border-background bg-blue-50 dark:bg-blue-600"
        >
          {pairings.map(({ ethereum: { label, content } }) => (
            <Item
              key={label}
              explanation={content}
              container={containerFirst}
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
        <Row
          ref={containerSecondRef}
          className="border-t border-background bg-gray-50 dark:bg-gray-800"
          toRight
        >
          {pairings.map(({ legacy: { label, content } }) => (
            <Item
              key={label}
              container={containerSecond}
              explanation={content}
              className="bg-gray-200/20 text-body-medium hover:bg-gray-600 hover:text-white dark:bg-gray-950 dark:text-body"
              separatorClass="bg-gray-200 dark:bg-gray-950"
            >
              {label}
            </Item>
          ))}
        </Row>

        <div className="absolute start-[50%] top-[50%] flex -translate-x-[50%] -translate-y-[50%] items-center overflow-hidden rounded-lg text-xs font-bold">
          <p className="bg-gray-50 px-4 py-1 text-body-medium dark:bg-gray-800 dark:text-gray-200">
            {t("page-index-values-legacy")}
          </p>

          <div
            className={cn(
              "border-t-[13px] border-t-blue-50 dark:border-t-blue-600",
              "border-r-8 border-r-blue-50 dark:border-r-blue-600",
              "border-b-[13px] border-b-gray-50 dark:border-b-gray-800",
              "border-l-8 border-l-gray-50 dark:border-l-gray-800"
            )}
          />

          <p className="bg-blue-50 px-4 py-1 text-accent-a dark:bg-blue-600 dark:text-white">
            {t("common:ethereum")}
          </p>
        </div>
      </div>
    </Section>
  )
}

export default ValuesMarquee
