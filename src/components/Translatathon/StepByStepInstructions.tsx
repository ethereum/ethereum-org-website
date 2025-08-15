import { CROWDIN_PROJECT_URL } from "@/lib/constants"

import { Button, ButtonLink } from "../ui/buttons/Button"
import { Center, Flex } from "../ui/flex"

import {
  APPLICATION_END_DATE,
  APPLICATION_START_DATE,
  APPLICATION_URL,
} from "./constants"
import PaperformModal from "./PaperformModal"

const instructions = [
  {
    title: "Read the rules and details",
    description:
      "Get familiar with the rules, translation process and what to translate",
    ctaLink: "/contributing/translation-program/translatathon/details/",
    ctaLabel: "Learn",
  },
  {
    title: "Submit your application",
    description:
      "All participants need to fill out the application form before the translation period starts!",
    ctaLink: APPLICATION_URL,
    ctaLabel: "Apply",
  },
  {
    title: "Register on Crowdin",
    description:
      "Join the ethereum.org project and familiarize yourself with Crowdin, where all the translations will take place",
    ctaLink: CROWDIN_PROJECT_URL,
    ctaLabel: "Join",
  },
  {
    title: "Join our Discord",
    description:
      "Keep up with the latest updates, attend the onboarding calls or ask questions",
    ctaLink: "/discord/",
    ctaLabel: "Join",
  },
  {
    title: "Translate! August 25th to August 31st",
    description:
      "Translate content to earn points. Each word you translate counts towards your final score",
    ctaLink: CROWDIN_PROJECT_URL,
    ctaLabel: "Translate",
  },
  {
    title: "Wait for evaluations",
    description:
      "All translations will be evaluated for quality and AI or machine translations will be rejected",
    ctaLink: null,
  },
  {
    title: "Claim your prizes",
    description: (
      <>
        Results will be announced on <strong>September 25th</strong>. Eligible
        participants will receive an email with instructions on how to prize
        claim their prizes.
      </>
    ),
    ctaLink: null,
  },
]

export const StepByStepInstructions = () => {
  const appStartDate = new Date(APPLICATION_START_DATE)
  const appEndDate = new Date(APPLICATION_END_DATE)
  const todaysDate = new Date()
  const appLive = todaysDate >= appStartDate && todaysDate <= appEndDate

  return (
    <Flex className="w-full flex-col">
      {instructions.map((instruction, index) => {
        const isDisabled = instruction.ctaLink === APPLICATION_URL && !appLive

        return (
          <Flex
            key={index}
            className="w-full flex-col items-start justify-between gap-4 border-b border-body-light p-4 md:flex-row md:items-center"
          >
            <Flex className="flex-col items-start gap-4 md:flex-row md:items-center">
              <Center className="h-[46px] min-w-[46px] max-w-[46px] rounded-lg bg-background p-1 shadow">
                <p className="text-4xl font-bold text-primary">{index + 1}</p>
              </Center>
              <Flex className="flex-col">
                <p className="text-xl font-bold">{instruction.title}</p>
                <p>{instruction.description}</p>
              </Flex>
            </Flex>
            {instruction.ctaLink ? (
              <Flex className="h-[42px]">
                {isDisabled ? (
                  <Button variant="outline" disabled>
                    {instruction.ctaLabel}
                  </Button>
                ) : instruction.ctaLink === APPLICATION_URL ? (
                  <PaperformModal
                    trigger={
                      <Button variant="outline">{instruction.ctaLabel}</Button>
                    }
                    title="Apply to Translate"
                  />
                ) : (
                  <ButtonLink href={instruction.ctaLink} variant="outline">
                    {instruction.ctaLabel}
                  </ButtonLink>
                )}
              </Flex>
            ) : (
              <Flex className="w-[140px]" />
            )}
          </Flex>
        )
      })}
    </Flex>
  )
}
