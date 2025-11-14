"use client"

import { useCallback, useEffect, useState } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"
import { useLocale } from "next-intl"

import type { CodeExample } from "@/lib/interfaces"

import AngleBrackets from "@/components/icons/angle-brackets.svg"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import Codeblock from "../Codeblock"
import CodeModal from "../CodeModal"
import CopyToClipboard from "../CopyToClipboard"
import { SkeletonLines } from "../ui/skeleton"
import WindowBox from "../WindowBox"

type CodeExamplesProps = {
  codeExamples: CodeExample[]
  title: string
  eventCategory: string
}

const AccordionCodeBlock = ({
  code,
  codeLanguage,
}: {
  code: string
  codeLanguage: string
}) => (
  <>
    <Codeblock
      codeLanguage={codeLanguage}
      allowCollapse={false}
      className="[&>div]:-m-//2 [&>div]:rounded-none [&_*]:!text-xs [&_pre]:p-4"
      fromHomepage
    >
      {code}
    </Codeblock>
    <CopyToClipboard
      text={code ?? ""}
      className="absolute end-2 top-2 rounded p-2 hover:bg-primary/10 hover:text-primary"
    >
      {(hasCopied) => (hasCopied ? <ClipboardCheck /> : <Clipboard />)}
    </CopyToClipboard>
  </>
)

const CodeExamples = ({ title, codeExamples }: CodeExamplesProps) => {
  const locale = useLocale()

  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)
  const [fetchedCodes, setFetchedCodes] = useState<{ [key: number]: string }>(
    {}
  )

  const eventCategory = `Homepage - ${locale}`

  const getCode = useCallback(
    (idx: number) => {
      const example = codeExamples[idx]
      if (!fetchedCodes[idx]) {
        fetch(example.codeUrl)
          .then((res) => res.text())
          .then((text) => setFetchedCodes((prev) => ({ ...prev, [idx]: text })))
      }
    },
    [codeExamples, fetchedCodes]
  )

  // For modal: fetch code when opened if needed
  useEffect(() => {
    if (isModalOpen) {
      getCode(activeCode)
    }
  }, [isModalOpen, activeCode, getCode])

  // For accordion: fetch code when expanded if needed
  const handleAccordionOpen = (idx: number) => {
    getCode(idx)
  }

  return (
    <div className="py-8 md:pb-16 md:pt-8 lg:pb-32 lg:pt-16">
      <WindowBox title={title} Svg={AngleBrackets}>
        {/* Desktop */}
        {codeExamples.map(({ title, description, eventName }, idx) => (
          <button
            key={title}
            className={cn(
              "flex flex-col gap-y-0.5 border-t px-6 py-4 text-start hover:bg-background-highlight max-md:hidden",
              isModalOpen && idx === activeCode && "bg-background-highlight"
            )}
            onClick={() => {
              setActiveCode(idx)
              setModalOpen(true)
              trackCustomEvent({
                eventCategory,
                eventAction: "Code Examples",
                eventName,
              })
            }}
          >
            <p className="font-bold">{title}</p>
            <p className="text-sm text-body-medium">{description}</p>
          </button>
        ))}
        {/* Mobile */}
        <Accordion type="single" collapsible className="md:hidden">
          {codeExamples.map(({ title, description, codeLanguage }, idx) => (
            <AccordionItem key={title} value={title} className="relative">
              <AccordionTrigger
                className="flex border-t px-6 py-4 hover:bg-background-highlight"
                onClick={() => handleAccordionOpen(idx)}
              >
                <div className="flex flex-col items-start gap-y-0.5">
                  <p className="text-start text-md font-bold text-body">
                    {title}
                  </p>
                  <p className="text-start text-sm text-body-medium">
                    {description}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="relative border-t" dir="ltr">
                <div className="-m-2 max-h-[50vh] overflow-auto">
                  {!fetchedCodes[idx] ? (
                    <SkeletonLines noOfLines={16} />
                  ) : (
                    <AccordionCodeBlock
                      code={fetchedCodes[idx]}
                      codeLanguage={codeLanguage}
                    />
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </WindowBox>
      <CodeModal
        isOpen={isModalOpen}
        setIsOpen={setModalOpen}
        title={codeExamples[activeCode].title}
      >
        {!fetchedCodes[activeCode] ? (
          <SkeletonLines noOfLines={16} />
        ) : (
          <Codeblock
            codeLanguage={codeExamples[activeCode].codeLanguage}
            allowCollapse={false}
            className="[&_pre]:p-6"
            fromHomepage
          >
            {fetchedCodes[activeCode]}
          </Codeblock>
        )}
      </CodeModal>
    </div>
  )
}

CodeExamples.displayName = "CodeExamples"

export default CodeExamples
