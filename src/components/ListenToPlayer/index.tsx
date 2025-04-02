"use client"

import { useContext, useEffect, useState } from "react"
import { Howl } from "howler"
import { useLocale } from "next-intl"
import { Portal } from "@radix-ui/react-portal"

import PlayerWidget from "@/components/ListenToPlayer/PlayerWidget"
import TopOfPagePlayer from "@/components/ListenToPlayer/TopOfPagePlayer"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { getPlaylistBySlug } from "@/data/listen-to-feature/playlist"

import { FeedbackWidgetContext } from "@/contexts/FeedbackWidgetContext"
import { useTranslation } from "@/hooks/useTranslation"

const ListenToPlayer = ({ slug }: { slug: string }) => {
  const locale = useLocale()
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
  const [isExpanded, setIsExpanded] = useState(true)
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
        // Only do countdown/timeout if track naturally ended (not manually skipped)
        if (
          autoplay &&
          currentTrackIndex < playlist.length - 1 &&
          !sound?.playing()
        ) {
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
        sound.stop()
        sound.unload()
      }
      audioPlayer.unload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex])

  useEffect(() => {
    if (sound && autoplay && isPlaying) {
      sound.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Only show the player if the locale is English and there is a playlist, renders null early
  if (!playlist.length || index === -1 || locale !== "en") return null

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
    sound.stop() // Stop current sound
    if (currentTrackIndex < playlist.length - 1) {
      trackCustomEvent({
        eventCategory: "Audio",
        eventAction: "click",
        eventName: "next",
      })
      setCurrentTrackIndex(currentTrackIndex + 1) // Directly go to next track
    } else {
      setIsPlaying(false)
    }
  }

  const handlePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed)
    trackCustomEvent({
      eventCategory: "Audio",
      eventAction: "click",
      eventName: `speed (${speed})`,
    })
  }

  return (
    <>
      <TopOfPagePlayer
        duration={duration}
        startedPlaying={startedPlaying}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        timeRemaining={timeRemaining}
      />
      <Portal>
        <div
          className={cn(
            showWidget ? "block" : "hidden",
            isExpanded ? "bottom-4" : "bottom-0",
            "fixed left-1/2 right-auto z-10 -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0"
          )}
          data-testid="player-widget-modal"
        >
          <div className="relative">
            <PlayerWidget
              autoplay={autoplay}
              setAutoplay={setAutoplay}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              title={
                countdown > 0
                  ? `${t(playlist[currentTrackIndex + 1].title)} in ${countdown}s`
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
              currentTrackIndex={currentTrackIndex}
              totalTracks={playlist.length}
            />
          </div>
        </div>
      </Portal>
    </>
  )
}

export default ListenToPlayer
