"use client"

import { useState } from "react"

import Emoji from "@/components/Emoji"
import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

const AvatarWithFallback = ({ username }: { username: string }) => {
  // Generate consistent avatar colors using design system colors
  const avatarColors = [
    "bg-primary",
    "bg-accent-a",
    "bg-accent-b",
    "bg-accent-c",
    "bg-blue-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-teal-600",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
  ]

  // Simple hash function for consistent color selection
  const hash = username.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  const avatarColorClass = avatarColors[Math.abs(hash) % avatarColors.length]
  const initials = username.slice(0, 1).toUpperCase()

  return (
    <div
      className={cn(
        "me-4 hidden h-[30px] w-[30px] items-center justify-center rounded-full text-sm font-semibold text-white sm:flex sm:h-10 sm:w-10",
        avatarColorClass
      )}
    >
      {initials}
    </div>
  )
}

export const Leaderboard = ({ translators }) => {
  const [filterAmount, updateFilterAmount] = useState(10)

  const showMore = () => {
    if (filterAmount < translators.length) {
      updateFilterAmount(filterAmount + 50)
    }
  }

  return (
    <div className="mb-8 w-full bg-background-highlight shadow-md">
      <div className="bg-muted text-foreground mb-[1px] flex w-full items-center justify-between p-4">
        <div className="flex">
          <div className="w-10 opacity-40">#</div>
          <div className="div-row me-8 flex items-center break-words">
            <p>Translator</p>
          </div>
        </div>
        <div className="div-row flex min-w-[20%] items-start">
          <p>Total words</p>
        </div>
      </div>
      {translators.slice(0, filterAmount).map((translator, index) => {
        const { username, totalCosts } = translator
        let emoji: string | null = null
        if (index === 0) {
          emoji = ":trophy:"
        } else if (index === 1) {
          emoji = ":2nd_place_medal:"
        } else if (index === 2) {
          emoji = ":3rd_place_medal:"
        }
        return (
          <div
            key={index}
            className="text-foreground hover:rounded-base hover:bg-accent/50 mb-[1px] flex w-full items-center justify-between px-4 py-2 shadow-sm hover:shadow-md"
          >
            <div className="flex">
              <div className="flex w-10 items-center">
                {emoji ? (
                  <Emoji className="me-4 text-[2rem]" text={emoji} />
                ) : (
                  <span className="opacity-40">{index + 1}</span>
                )}
              </div>
              <div className="me-8 flex flex-row items-center break-words">
                <AvatarWithFallback username={username} />
                <div className="max-w-[100px] sm:max-w-none">{username}</div>
              </div>
            </div>
            <div className="div-row flex min-w-[20%] items-start">
              <Emoji text=":writing:" className="me-2 text-2xl sm:block" />
              <p>{totalCosts}</p>
            </div>
          </div>
        )
      })}
      {translators.length > filterAmount && (
        <div className="flex w-full flex-col justify-center px-8 py-0 lg:flex-row">
          <Button
            variant="ghost"
            onClick={showMore}
            className="m-2 mx-0 flex h-full w-full items-center justify-center rounded-full px-6 py-4 lg:mx-2 lg:w-auto"
          >
            <span className="text-center text-md font-semibold leading-none md:text-lg md:font-normal">
              Show more
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}
