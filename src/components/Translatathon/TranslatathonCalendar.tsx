import { useRouter } from "next/router"
import { FaDiscord } from "react-icons/fa"

import type { Lang } from "@/lib/types"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"

const matomoEvent = (buttonType: string) => {
  trackCustomEvent({
    eventCategory: "TranslatathonCalender",
    eventAction: "clicked",
    eventName: buttonType,
  })
}

const events = [
  {
    date: "2024-08-06T09:30:00Z",
    title: "Crowdin walkthrough + Q&A",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MHJoczcybG42Y2R2YXFncDBwZmxvbzRoNjUgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
  {
    date: "2024-08-07T16:00:00Z",
    title: "Crowdin walkthrough + Q&A",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NGRpZWo3Y3E4a2d2dWVqMjdjNnFtZzZzZTEgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
  {
    date: "2024-08-09T12:00:00Z",
    title: "Translatathon kickoff call",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NjU5dDRoNW9yNG0waDM3bjY0dDJmNWx2dmsgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
  {
    date: "2024-08-13T09:30:00Z",
    title: "Translatathon office hours",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=N292aDBqNWRnb3BoY2lldXBmcDVsM2o4MjIgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
  {
    date: "2024-08-15T15:00:00Z",
    title: "Translatathon office hours",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NGJxazFsa2xjdm9ocmZnaGU0ZWZqbGIwNWEgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
]

export const TranslatathonCalendar = () => {
  const { locale } = useRouter()

  return (
    <Flex className="w-full flex-col py-16 lg:flex-row">
      <Flex
        className={cn(
          "w-full flex-col gap-6 px-8 py-16 text-center lg:w-1/2",
          "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20"
        )}
      >
        <h3 className="text-2xl font-bold">Translatathon calls</h3>
        <p>
          Join us on the ethereum.org Discord for a series of onboarding calls
          and workshops where we’ll cover everything you need to know about the
          Translatathon, walk through using Crowdin and answer any questions you
          might have.
        </p>
        <ButtonLink href="/discord/" onClick={() => matomoEvent("discord")}>
          <FaDiscord className="text-2xl" />
          Join Discord
        </ButtonLink>
      </Flex>
      <Flex className="w-full flex-col bg-background-highlight p-8 lg:w-1/2">
        <p className="mb-2 text-lg font-bold">Translatathon calls</p>
        {events.map((event, index) => (
          <Flex className="mb-4 gap-6" key={index}>
            <p>{getLocaleTimestamp(locale! as Lang, event.date)}</p>
            <InlineLink href={event.calendarLink}>{event.title}</InlineLink>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
