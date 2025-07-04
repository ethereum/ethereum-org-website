import { CirclePause, CirclePlay } from "lucide-react"

import { Button } from "@/components/ui/buttons/Button"

import { trackCustomEvent } from "@/lib/utils/matomo"

interface TopOfPagePlayerProps {
  startedPlaying: boolean
  isPlaying: boolean
  duration: number
  timeRemaining: number
  handlePlayPause: () => void
}

const TopOfPagePlayer = ({
  startedPlaying,
  isPlaying,
  duration,
  timeRemaining,
  handlePlayPause,
}: TopOfPagePlayerProps) => {
  return (
    <Button
      variant="ghost"
      className="inline-block w-full rounded-lg bg-background-low p-2 hover:bg-background-medium lg:w-auto"
      onClick={() => {
        if (startedPlaying) {
          trackCustomEvent({
            eventCategory: "Audio",
            eventAction: "click",
            eventName: "start",
          })
        }
        handlePlayPause()
      }}
    >
      <div className="flex flex-row items-center gap-2 text-primary hover:text-primary-hover">
        {startedPlaying ? (
          isPlaying ? (
            <CirclePause />
          ) : (
            <CirclePlay />
          )
        ) : (
          <CirclePlay />
        )}
        <div className="text-sm text-body-medium">
          {startedPlaying ? (
            `${Math.floor(timeRemaining / 60)}:${String(Math.floor(timeRemaining % 60)).padStart(2, "0")}`
          ) : (
            <p className="text-primary hover:text-primary-hover">
              <strong>Listen to this article</strong> (
              {Math.round(duration / 60)} min)
            </p>
          )}
        </div>
      </div>
    </Button>
  )
}

export default TopOfPagePlayer
