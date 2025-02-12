import { useEffect, useState } from "react"
import { Howl } from "howler"
import { useTranslation } from "next-i18next"

import PlayerWidget from "@/components/ListenToPlayer/PlayerWidget"
import TopOfPagePlayer from "@/components/ListenToPlayer/TopOfPagePlayer"

import { getPlaylistBySlug } from "@/data/listen-to-feature/playlist"

const ListenToPlayer = ({ slug }) => {
  const { playlist, index } = getPlaylistBySlug(slug)

  const { t } = useTranslation()
  const [startedPlaying, setStartedPlaying] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showWidget, setShowWidget] = useState(false)
  const [sound, setSound] = useState<Howl | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(index)
  const [countdown, setCountdown] = useState(0)
  const duration = sound?.duration() ?? 0

  useEffect(() => {
    const audioPlayer = new Howl({
      src: [playlist[currentTrackIndex].audioFile],
      html5: true,
      onload: () => {
        setSound(audioPlayer)
        setTimeRemaining(audioPlayer.duration())
      },
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => {
        if (autoplay && currentTrackIndex < playlist.length - 1) {
          setCountdown(5)
          const countdownInterval = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1))
          }, 1000)
          const timer = setTimeout(() => {
            clearInterval(countdownInterval)
            setCurrentTrackIndex(currentTrackIndex + 1)
          }, 5000)
          return () => {
            clearTimeout(timer)
            clearInterval(countdownInterval)
          }
        } else {
          setIsPlaying(false)
        }
      },
    })

    return () => {
      if (sound) {
        sound.unload()
      }
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (sound && autoplay && isPlaying) {
      sound.play()
    }
  }, [sound])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (isPlaying && sound) {
      intervalId = setInterval(() => {
        const currentTime = sound.seek()
        const remaining = duration - currentTime
        setTimeRemaining(remaining)
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying, sound, duration])

  useEffect(() => {
    if (sound) {
      sound.rate(playbackSpeed)
    }
  }, [playbackSpeed, sound])

  const handlePlayPause = () => {
    if (!sound) return

    if (isPlaying) {
      sound.pause()
    } else {
      sound.play()
      setTimeRemaining(sound.duration() - sound.seek())
      setStartedPlaying(true)
      setIsPlaying(true)
      setShowWidget(true)
    }
  }

  const handleCloseWidget = () => {
    setShowWidget(false)
    sound?.pause()
  }

  const handleSeek = (time: number) => {
    if (!sound) return
    sound.seek(time)
    setTimeRemaining(duration - time)
  }

  const handlePrevious = () => {
    if (!sound) return
    const currentTime = sound.seek()

    if (currentTime <= 3 && currentTrackIndex > 0) {
      sound.stop()
      sound.unload()
      setSound(null)
      setCurrentTrackIndex(currentTrackIndex - 1)
    } else {
      sound.seek(0)
      setTimeRemaining(duration)
    }
  }

  const handleNext = () => {
    if (!sound) return
    sound.seek(duration)
    setTimeRemaining(0)
  }

  const handlePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed)
  }

  const title =
    countdown > 0
      ? `Next article in ${countdown}s`
      : t(playlist[currentTrackIndex].title)

  return (
    <>
      <TopOfPagePlayer
        duration={duration}
        startedPlaying={startedPlaying}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        timeRemaining={timeRemaining}
      />
      <PlayerWidget
        autoplay={autoplay}
        setAutoplay={setAutoplay}
        showWidget={showWidget}
        title={title}
        duration={duration}
        timeRemaining={timeRemaining}
        onSeek={handleSeek}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        playbackSpeed={playbackSpeed}
        handlePlaybackSpeed={handlePlaybackSpeed}
        handleCloseWidget={handleCloseWidget}
      />
    </>
  )
}

export default ListenToPlayer
