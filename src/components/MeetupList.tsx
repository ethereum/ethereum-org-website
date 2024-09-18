import { useState } from "react"
import sortBy from "lodash/sortBy"
import { FaChevronRight } from "react-icons/fa6"

import Emoji from "@/components/Emoji"
import InfoBanner from "@/components/InfoBanner"
import Translation from "@/components/Translation"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import meetups from "@/data/community-meetups.json"

import Input from "../../tailwind/ui/Input"

import { Flex } from "./ui/flex"
import InlineLink, { BaseLink } from "./ui/Link"

export interface Meetup {
  title: string
  emoji: string
  location: string
  link: string
}

const filterMeetups = (query: string): Array<Meetup> => {
  if (!query) return sortedMeetups

  return sortedMeetups.filter((meetup) => {
    const flag = meetup.emoji.replace(/[:_]/g, " ")
    const searchable = [meetup.title, meetup.location, flag].join(" ")
    return searchable.toLowerCase().includes(query.toLowerCase())
  })
}

// sort meetups by country and then by city
const sortedMeetups: Array<Meetup> = sortBy(meetups, ["emoji", "location"])

// TODO create generalized CardList / TableCard
// TODO prop if ordered list or unordered
const MeetupList = () => {
  const [searchField, setSearchField] = useState<string>("")
  const filteredMeetups = filterMeetups(searchField)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchField(event.target.value)
    trackCustomEvent({
      eventCategory: "events search",
      eventAction: "click",
      eventName: event.target.value,
    })
  }

  return (
    <div>
      <Input
        className="mb-6 w-full"
        onChange={handleSearch}
        placeholder={"Search by meetup title or location"}
        aria-describedby="input-instruction"
      />
      {/* hidden for attachment to input only */}
      <span id="input-instruction" className="sr-only">
        results update as you type
      </span>
      <ul
        className="m-0 border-2 border-body-light"
        aria-label="Event meetup results"
      >
        {filteredMeetups.map((meetup, idx) => (
          <BaseLink
            href={meetup.link}
            hideArrow
            className={cn(
              "group mb-[0.25px] flex w-full justify-between p-4 text-current no-underline",
              "hover:bg-background-highlight hover:text-current hover:no-underline hover:shadow-[0_0_1px] hover:shadow-primary",
              "border-b-2 border-body-light"
            )}
            key={idx}
          >
            <Flex className="me-4 flex-[1_1_75%]">
              <div className="me-4 opacity-40">{idx + 1}</div>
              <div>
                <p className="no-underline group-hover:text-primary-hover group-hover:underline">
                  {meetup.title}
                </p>
              </div>
            </Flex>
            <Flex className="me-4 flex-[1_1_25%] flex-wrap content-start items-center text-end">
              <Emoji
                text={meetup.emoji}
                className="me-2 text-md leading-none"
              />
              <p className="mb-0 opacity-60">{meetup.location}</p>
            </Flex>
            <Flex className="items-center">
              <FaChevronRight className="h-[14px] w-[14px] xl:h-[18px] xl:w-[18px]" />
            </Flex>
          </BaseLink>
        ))}
      </ul>
      <div aria-live="assertive" aria-atomic>
        {!filteredMeetups.length && (
          <InfoBanner emoji=":information_source:">
            <Translation id="page-community:page-community-meetuplist-no-meetups" />{" "}
            <InlineLink href="https://github.com/ethereum/ethereum-org-website/blob/dev/src/data/community-meetups.json">
              <Translation id="page-community:page-community-please-add-to-page" />
            </InlineLink>
          </InfoBanner>
        )}
      </div>
    </div>
  )
}

export default MeetupList
