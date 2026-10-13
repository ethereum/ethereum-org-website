"use client"

import type { PrivacyLessonDossierId } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"

import { catalogue } from "@/data/privacy-lesson/catalogue"
import { fixes } from "@/data/privacy-lesson/fixes"

import { useLesson } from "./lesson-provider"

// TEMPORARY (step 2 only): lets the dossier rail be tested before the
// chapters exist. Never rendered in production builds; remove in step 3.
// Labels are developer-facing, so they are deliberately not translated.
const SAMPLE: PrivacyLessonDossierId[] = ["tz", "fp", "ip", "linked", "salary"]

const LessonDevTools = () => {
  const { collect, setFix, setPrivateMode, privateMode, fixesOn, reset } =
    useLesson()

  if (process.env.NODE_ENV === "production") return null

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-base border border-dashed p-3 text-sm">
      <span className="font-mono text-body-medium">dev</span>
      <Button size="sm" variant="outline" onClick={() => collect(...SAMPLE)}>
        Collect sample
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => collect(...catalogue.map(({ id }) => id))}
      >
        Collect all
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setFix(fixes[2].id, !fixesOn.includes(fixes[2].id))}
      >
        Toggle fix: {fixes[2].id}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setPrivateMode(!privateMode)}
      >
        Private mode: {privateMode ? "on" : "off"}
      </Button>
      <Button size="sm" variant="ghost" isSecondary onClick={reset}>
        Reset
      </Button>
    </div>
  )
}

export default LessonDevTools
