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
      size="sm"
      isSecondary
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
      {startedPlaying && isPlaying ? <CirclePause /> : <CirclePlay />}
      <span>
        Listen
        <span className="max-sm:hidden">
          {" "}
          to this article{" "}
          <span className="tabular-nums">
            (
            {startedPlaying
              ? `${Math.floor(timeRemaining / 60)}:${String(Math.floor(timeRemaining % 60)).padStart(2, "0")}`
              : `${Math.round(duration / 60)} min`}
            )
          </span>
        </span>
      </span>
    </Button>
  )
}

export default TopOfPagePlayer
