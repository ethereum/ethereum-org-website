import { useEffect, useRef, useState } from "react"
import { IoClose } from "react-icons/io5"

import {
  ArrowIcon,
  AutoplayIcon,
  CollapseIcon,
  ExpandIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@/components/icons/listen-to"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

interface PlayerWidgetProps {
  title: string
  duration: number
  timeRemaining: number
  onSeek: (time: number) => void
  isPlaying: boolean
  handlePlayPause: () => void
  autoplay: boolean
  setAutoplay: (autoplay: boolean) => void
  handlePrevious: () => void
  handleNext: () => void
  playbackSpeed: number
  handlePlaybackSpeed: (playbackSpeed: number) => void
  handleCloseWidget: () => void
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
}

const PlayerWidget = ({
  title,
  duration,
  timeRemaining,
  onSeek,
  isPlaying,
  handlePlayPause,
  autoplay,
  setAutoplay,
  handlePrevious,
  handleNext,
  playbackSpeed,
  handlePlaybackSpeed,
  handleCloseWidget,
  isExpanded,
  setIsExpanded,
}: PlayerWidgetProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const scrubBarRef = useRef<HTMLDivElement>(null)
  const progress =
    duration > 0 ? ((duration - timeRemaining) / duration) * 100 : 0
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const speedMenuRef = useRef<HTMLDivElement>(null)

  const calculateNewTime = (clientX: number) => {
    if (!scrubBarRef.current) return 0
    const rect = scrubBarRef.current.getBoundingClientRect()
    const position = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    )
    return duration * position
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    const newTime = calculateNewTime(e.clientX)
    onSeek(newTime)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    const newTime = calculateNewTime(e.clientX)
    onSeek(newTime)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        speedMenuRef.current &&
        !speedMenuRef.current.contains(event.target as Node)
      ) {
        setShowSpeedMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const speedOptions = [0.5, 1.0, 1.5, 2.0]

  return (
    <div
      className={cn(
        "w-80 border bg-background shadow-widget",
        isExpanded ? "rounded-2xl p-4" : "rounded-t-2xl p-2"
      )}
    >
      <div
        className={cn("flex flex-col gap-2", isExpanded ? "block" : "hidden")}
      >
        <div className="flex justify-between">
          <p className="text-sm font-bold leading-base">{title}</p>
          <button
            className="cursor-pointer text-body-medium hover:text-body"
            aria-label={"Collapse"}
            title={"Collapse"}
            onClick={() => {
              setIsExpanded(!isExpanded)
              trackCustomEvent({
                eventCategory: "Audio",
                eventAction: "click",
                eventName: "minimize",
              })
            }}
          >
            <CollapseIcon />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div
            ref={scrubBarRef}
            className="relative h-0.5 w-[240px] cursor-pointer rounded bg-background-highlight"
            onMouseDown={handleMouseDown}
          >
            <div
              className="absolute left-0 top-0 h-full rounded bg-primary"
              style={{
                width: `${Number.isFinite(progress) && progress >= 0 ? progress : 0}%`,
              }}
            />
            <div
              className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-md transition-transform hover:scale-110"
              style={{
                left: `${Number.isFinite(progress) && progress >= 0 ? progress : 0}%`,
              }}
            />
          </div>
          <div className="text-sm text-body-medium">
            {`${Math.floor(timeRemaining / 60)}:${String(Math.floor(timeRemaining % 60)).padStart(2, "0")}`}
          </div>
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className="relative">
            <button
              className="w-[24px] cursor-pointer text-right text-xs font-bold leading-base text-body-medium hover:text-body"
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              title={`Playback speed`}
              aria-label={"Playback speed"}
            >
              {playbackSpeed}x
            </button>
            {showSpeedMenu && (
              <div
                ref={speedMenuRef}
                className="absolute bottom-full left-0 mb-2 rounded-lg border bg-background shadow-lg"
              >
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    className="cursor-pointer px-4 py-1 text-xs hover:bg-background-highlight"
                    onClick={() => {
                      handlePlaybackSpeed(speed)
                      setShowSpeedMenu(false)
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="cursor-pointer text-2xl text-disabled hover:text-body"
            onClick={handlePrevious}
            title="Previous"
            aria-label={"Previous"}
          >
            <ArrowIcon />
          </button>
          <button
            className="cursor-pointer text-[32px] text-primary hover:text-primary-hover"
            onClick={handlePlayPause}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
          </button>
          <button
            className="cursor-pointer text-2xl text-disabled hover:text-body"
            onClick={handleNext}
            title="Next"
            aria-label={"Next"}
          >
            <ArrowIcon className="rotate-180" />
          </button>
          <button
            className={cn(
              "cursor-pointer text-base",
              autoplay ? "text-primary" : "text-disabled",
              "hover:text-primary-hover"
            )}
            onClick={() => setAutoplay(!autoplay)}
            title={autoplay ? "Disable autoplay" : "Enable autoplay"}
            aria-label={autoplay ? "Disable autoplay" : "Enable autoplay"}
          >
            <AutoplayIcon />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "flex-row items-center justify-between",
          isExpanded ? "hidden" : "flex"
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <button
            className="cursor-pointer text-[32px] text-primary hover:text-primary-hover"
            onClick={handlePlayPause}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
          </button>
          <div className="text-sm text-body-medium">
            {`${Math.floor(timeRemaining / 60)}:${String(Math.floor(timeRemaining % 60)).padStart(2, "0")}`}
          </div>
        </div>
        <div className="flex flex-row gap-6">
          <button
            className="cursor-pointer text-disabled hover:text-body"
            title={"Expand"}
            aria-label={"Expand"}
            onClick={() => {
              setIsExpanded(!isExpanded)
              trackCustomEvent({
                eventCategory: "Audio",
                eventAction: "click",
                eventName: "expand",
              })
            }}
          >
            <ExpandIcon />
          </button>
          <button
            className="cursor-pointer text-disabled hover:text-body"
            title={"Close"}
            aria-label={"Close"}
            onClick={() => {
              setIsExpanded(!isExpanded)
              handleCloseWidget()
            }}
          >
            <IoClose />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayerWidget
