import { useContext, useEffect, useState } from "react"
import { Howl } from "howler"
import { useTranslation } from "next-i18next"

import PlayerWidget from "@/components/ListenToPlayer/PlayerWidget"
import TopOfPagePlayer from "@/components/ListenToPlayer/TopOfPagePlayer"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { getPlaylistBySlug } from "@/data/listen-to-feature/playlist"

import { FeedbackWidgetContext } from "@/contexts/FeedbackWidgetContext"

const ListenToPlayer = ({ slug }) => {
  const { setShowFeedbackWidget } = useContext(FeedbackWidgetContext)
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
    setShowFeedbackWidget(!showWidget)
  }, [showWidget, setShowFeedbackWidget])

  useEffect(() => {
    // Guard clause to prevent accessing playlist when empty
    if (!playlist.length || currentTrackIndex === -1) return

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
            trackCustomEvent({
              eventCategory: "Audio",
              eventAction: "automated_next",
              eventName: `${currentTrackIndex + 1}`,
            })
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
      trackCustomEvent({
        eventCategory: "Audio",
        eventAction: "click",
        eventName: "pause",
      })
    } else {
      sound.play()
      trackCustomEvent({
        eventCategory: "Audio",
        eventAction: "click",
        eventName: "play",
      })
      setTimeRemaining(sound.duration() - sound.seek())
      setStartedPlaying(true)
      setIsPlaying(true)
      setShowWidget(true)
    }
  }

  const handleCloseWidget = () => {
    setShowWidget(false)
    sound?.pause()
    trackCustomEvent({
      eventCategory: "Audio",
      eventAction: "click",
      eventName: "close",
    })
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
      trackCustomEvent({
        eventCategory: "Audio",
        eventAction: "click",
        eventName: "previous (previous track)",
      })
    } else {
      sound.seek(0)
      setTimeRemaining(duration)
      trackCustomEvent({
        eventCategory: "Audio",
        eventAction: "click",
        eventName: "previous (current track)",
      })
    }
  }

  const handleNext = () => {
    if (!sound) return
    sound.seek(duration)
    setTimeRemaining(0)
    trackCustomEvent({
      eventCategory: "Audio",
      eventAction: "click",
      eventName: "next",
    })
  }

  const handlePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed)
    trackCustomEvent({
      eventCategory: "Audio",
      eventAction: "click",
      eventName: `speed (${speed})`,
    })
  }

  return playlist.length > 0 && index !== -1 ? (
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
        title={
          countdown > 0
            ? `Next article in ${countdown}s`
            : t(playlist[currentTrackIndex].title)
        }
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
  ) : (
    <></>
  )
}

export default ListenToPlayer
