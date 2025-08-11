import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import { CROWDIN_PROJECT_URL } from "@/lib/constants"

import {
  APPLICATION_END_DATE,
  APPLICATION_START_DATE,
  APPLICATION_URL,
} from "./constants"

export const dates = [
  {
    title: "Applications open",
    description:
      "Fill out the application form to participate and compete for prizes",
    startDate: new Date(APPLICATION_START_DATE),
    endDate: new Date(APPLICATION_END_DATE),
    link: APPLICATION_URL,
    linkText: "Apply",
  },
  // {
  //   title: "Workshops",
  //   description:
  //     "Join our Discord to participate in onboarding calls and workshops and learn all about the Translatathon",
  //   startDate: new Date("2025-08-15T12:00:00"),
  //   endDate: new Date("2025-08-22T12:00:00"),
  //   link: "/discord/",
  //   linkText: "Join our Discord",
  // },
  {
    title: "Translatathon",
    description:
      "Collect points for any translations you add during the translation period",
    startDate: new Date("2025-08-25T00:00:00"),
    endDate: new Date("2025-08-31T23:59:59"),
    link: CROWDIN_PROJECT_URL,
    linkText: "Translate",
  },
  {
    title: "Evaluation period",
    description:
      "Each translation will be evaluated by professional reviewers to make sure no AI tools were used and they meet the minimum quality threshold",
    startDate: new Date("2025-09-01T00:00:00"),
    endDate: new Date("2025-09-22T23:59:59"),
    link: null,
    linkText: null,
  },
  {
    title: "Results announcement",
    description:
      "We will announce the results and winners on the ethereum.org community Call",
    startDate: new Date("2025-09-25T00:00:00"),
    endDate: null,
    link: null,
    linkText: null,
  },
]

export const DatesAndTimeline = () => {
  const todaysDate = new Date()

  return (
    <Flex className="mb-16 flex flex-col p-4">
      {dates.map((date, index) => {
        const isLive =
          todaysDate >= date.startDate &&
          (date.endDate ? todaysDate <= date.endDate : true)
        return (
          <Flex
            key={index}
            className={cn(
              "flex gap-4 border-l px-4",
              index === dates.length - 1
                ? "border-transparent pb-0"
                : "border-primary pb-16"
            )}
          >
            <Flex>
              <div
                className={cn(
                  "-ml-8 h-8 w-8 rounded-full",
                  isLive ? "bg-primary" : "bg-primary-low-contrast"
                )}
              />
            </Flex>
            <Flex className="flex flex-col gap-6">
              <Flex
                className={cn(
                  "flex h-8 items-center rounded-full px-4",
                  isLive && "text-body-inverse",
                  isLive ? "bg-primary" : "bg-primary-low-contrast"
                )}
              >
                <p>
                  {date.startDate.toDateString()}{" "}
                  {date.endDate ? `- ${date.endDate.toDateString()}` : ""}
                </p>
              </Flex>
              <Flex className="flex flex-col">
                <h3 className="text-2xl">{date.title}</h3>
                <p>{date.description}</p>
              </Flex>
              {date.link && (
                <Flex>
                  <ButtonLink
                    href={date.link}
                    className={cn(
                      "mt-2",
                      date.link === APPLICATION_URL && !isLive
                        ? "pointer-events-none text-disabled"
                        : ""
                    )}
                    variant="outline"
                    aria-disabled={date.link === APPLICATION_URL && !isLive}
                  >
                    {date.linkText}
                  </ButtonLink>
                </Flex>
              )}
            </Flex>
          </Flex>
        )
      })}
      <p className="mt-8 italic">Note: All dates are in UTC</p>
    </Flex>
  )
}
