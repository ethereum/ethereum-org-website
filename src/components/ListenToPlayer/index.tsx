import { useState } from "react"

import { PauseCircleIcon, PlayCircleIcon } from "@/components/icons/listen-to"

const ListenToPlayer = () => {
  const [startedPlaying, setStartedPlaying] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // TODO: Use actual audio file data
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        onClick={() => {
          setStartedPlaying(true)
          setIsPlaying(!isPlaying)
        }}
      >
        {startedPlaying ? (
          isPlaying ? (
            <PauseCircleIcon className="h-6 w-6 transition-transform hover:scale-110" />
          ) : (
            <PlayCircleIcon className="h-6 w-6 transition-transform hover:scale-110" />
          )
        ) : (
          <PlayCircleIcon className="h-6 w-6 transition-transform hover:scale-110" />
        )}
      </div>
      <div className="text-sm text-gray-500">
        {startedPlaying ? (
          "4:56"
        ) : (
          <p>
            <strong>Listen to this article</strong> (4 min)
          </p>
        )}
      </div>
    </div>
  )
}

export default ListenToPlayer
