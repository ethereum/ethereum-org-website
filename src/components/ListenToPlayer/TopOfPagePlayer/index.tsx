import { PauseCircleIcon, PlayCircleIcon } from "@/components/icons/listen-to"

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
    <div className="flex flex-row items-center gap-2">
      <div
        onClick={handlePlayPause}
        className="cursor-pointer text-primary hover:text-primary-hover"
      >
        {startedPlaying ? (
          isPlaying ? (
            <PauseCircleIcon className="h-6 w-6 transition-transform" />
          ) : (
            <PlayCircleIcon className="h-6 w-6 transition-transform" />
          )
        ) : (
          <PlayCircleIcon className="h-6 w-6 transition-transform" />
        )}
      </div>
      <div className="text-sm text-body-medium">
        {startedPlaying ? (
          `${Math.floor(timeRemaining / 60)}:${String(Math.floor(timeRemaining % 60)).padStart(2, "0")}`
        ) : (
          <p>
            <strong>Listen to this article</strong> ({Math.round(duration / 60)}{" "}
            min)
          </p>
        )}
      </div>
    </div>
  )
}

export default TopOfPagePlayer
