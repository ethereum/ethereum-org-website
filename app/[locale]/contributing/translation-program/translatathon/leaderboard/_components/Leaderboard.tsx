import Emoji from "@/components/Emoji"

import { cn } from "@/lib/utils/cn"

import { translators } from "./leaderboard-data"

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
        "me-4 hidden h-7.5 w-7.5 items-center justify-center rounded-full text-sm font-semibold text-white sm:flex sm:h-10 sm:w-10",
        avatarColorClass
      )}
    >
      {initials}
    </div>
  )
}

export const Leaderboard = () => (
  <div className="mb-8 w-full max-w-3xl rounded-base bg-background-highlight shadow-md">
    <div className="mb-px flex w-full items-center justify-between border-b p-4">
      <div className="flex">
        <div className="w-10 opacity-40">#</div>
        <div className="div-row me-8 flex items-center wrap-break-word">
          <p>Translator</p>
        </div>
      </div>
      <div className="div-row flex min-w-[20%] items-start">
        <p>Total words</p>
      </div>
    </div>
    {translators.map((translator, index) => {
      const { name, words } = translator

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
          className="mb-px flex w-full items-center justify-between px-4 py-2 shadow-xs hover:bg-background/50 hover:shadow-md"
        >
          <div className="flex">
            <div className="flex w-10 items-center">
              {emoji ? (
                <Emoji className="me-4 text-[2rem]" text={emoji} />
              ) : (
                <span className="opacity-40">{index + 1}</span>
              )}
            </div>
            <div className="me-8 flex flex-row items-center wrap-break-word">
              <AvatarWithFallback username={name} />
              <div className="max-w-25 sm:max-w-none">{name}</div>
            </div>
          </div>
          <div className="div-row flex min-w-[20%] items-start">
            <Emoji text=":writing:" className="me-2 text-2xl sm:block" />
            <p>{words}</p>
          </div>
        </div>
      )
    })}
  </div>
)
