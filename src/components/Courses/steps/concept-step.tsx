"use client"

import { Lightbulb } from "lucide-react"
import { useTranslations } from "next-intl"
import type { ReactNode } from "react"

import type { ConceptStep as ConceptStepData } from "@/data/courses"

import CourseArt from "../art/course-art"

const rich = {
  strong: (chunks: ReactNode) => (
    <strong className="font-bold text-(--course-strong) dark:text-(--course-bright)">
      {chunks}
    </strong>
  ),
}

interface ConceptStepProps {
  step: ConceptStepData
  keyFor: (suffix: string) => string
}

const ConceptStep = ({ step, keyFor }: ConceptStepProps) => {
  const t = useTranslations("page-courses")
  const paragraphs = Array.from(
    { length: step.paragraphs },
    (_, i) => `p${i + 1}`
  )

  if (step.takeaway) {
    return (
      <div className="relative overflow-hidden rounded-3xl border-b-8 border-(--course-strong) bg-(--course) p-8 text-white">
        <Lightbulb
          aria-hidden
          className="absolute -end-6 -top-6 size-36 rotate-12 opacity-15"
        />
        <p className="m-0 mb-3 flex items-center gap-2 text-sm font-black tracking-widest uppercase">
          <Lightbulb className="size-5" aria-hidden />
          {t("page-courses-takeaway")}
        </p>
        {paragraphs.map((p) => (
          <p key={p} className="m-0 text-xl leading-snug font-bold">
            {t.rich(keyFor(p), {
              strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
            })}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {step.art && (
        <div className="mx-auto w-full max-w-60 rounded-3xl bg-(--course-softer) px-8 pt-6 pb-4">
          <CourseArt id={step.art} />
        </div>
      )}
      <div className="flex flex-col gap-4 text-md leading-relaxed">
        {paragraphs.map((p) => (
          <p key={p} className="m-0">
            {t.rich(keyFor(p), rich)}
          </p>
        ))}
      </div>
    </div>
  )
}

export default ConceptStep
