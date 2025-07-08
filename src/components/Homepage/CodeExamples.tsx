"use client"

import { Suspense, useState } from "react"
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

const CodeExamples = ({ title, codeExamples }: CodeExamplesProps) => {
  const locale = useLocale()

  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)

  const eventCategory = `Homepage - ${locale}`

  const toggleCodeExample = (id: number): void => {
    setActiveCode(id)
    setModalOpen(true)
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
              toggleCodeExample(idx)
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
          {codeExamples.map(({ title, description, code, codeLanguage }) => (
            <AccordionItem key={title} value={title} className="relative">
              <AccordionTrigger className="flex border-t px-6 py-4 hover:bg-background-highlight">
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
                <Suspense fallback={<SkeletonLines noOfLines={16} />}>
                  <div className="-m-2 max-h-[50vh] overflow-auto">
                    <Codeblock
                      codeLanguage={codeLanguage}
                      allowCollapse={false}
                      className="[&>div]:-m-//2 [&>div]:rounded-none [&_*]:!text-xs [&_pre]:p-4"
                      fromHomepage
                    >
                      {code}
                    </Codeblock>
                    <CopyToClipboard
                      text={code}
                      className="absolute end-2 top-2 rounded p-2 hover:bg-primary/10 hover:text-primary"
                    >
                      {(hasCopied) =>
                        hasCopied ? <ClipboardCheck /> : <Clipboard />
                      }
                    </CopyToClipboard>
                  </div>
                </Suspense>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </WindowBox>
      {isModalOpen && (
        <CodeModal
          isOpen={isModalOpen}
          setIsOpen={setModalOpen}
          title={codeExamples[activeCode].title}
        >
          <Suspense fallback={<SkeletonLines noOfLines={16} dir="ltr" />}>
            <Codeblock
              codeLanguage={codeExamples[activeCode].codeLanguage}
              allowCollapse={false}
              className="[&_pre]:p-6"
              fromHomepage
            >
              {codeExamples[activeCode].code}
            </Codeblock>
          </Suspense>
        </CodeModal>
      )}
    </div>
  )
}

CodeExamples.displayName = "CodeExamples"

export default CodeExamples
