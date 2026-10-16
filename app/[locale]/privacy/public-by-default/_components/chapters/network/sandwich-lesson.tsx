"use client"

import SandwichAttackDemoLazy from "@/components/PrivacyWidgets/SandwichAttackDemo/lazy"

import { useLesson } from "../../lesson-provider"

/** The sandwich demo in lesson mode: a public run adds "Your trades, early". */
const SandwichLesson = () => {
  const { collect } = useLesson()
  return (
    <SandwichAttackDemoLazy
      variant="lesson"
      onComplete={(mode) => {
        if (mode === "public") collect("mev")
      }}
    />
  )
}

export default SandwichLesson
