import { useEffect, useMemo, useState } from "react"

import BannerNotification from "@/components/Banners/BannerNotification"

export const CountdownBanner = () => {
  const [countdown, setCountdown] = useState("")

  const translatathonStartDate = useMemo(
    () => new Date("August 25, 2025 12:00:00 UTC"),
    []
  )
  const translatathonEndDate = useMemo(
    () => new Date("August 31, 2025 12:00:00 UTC"),
    []
  )

  const calculateCountdown = (targetDate: Date) => {
    const currentTime = new Date()
    const timeDifference = targetDate.getTime() - currentTime.getTime()

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    )
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown =
        new Date() < translatathonStartDate
          ? calculateCountdown(translatathonStartDate)
          : calculateCountdown(translatathonEndDate)
      setCountdown(newCountdown)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [translatathonEndDate, translatathonStartDate])

  return new Date() < translatathonStartDate ? (
    <>
      <BannerNotification shouldShow={true}>
        Translatathon starts in {countdown}
      </BannerNotification>
    </>
  ) : new Date() > translatathonStartDate &&
    new Date() < translatathonEndDate ? (
    <>
      <BannerNotification shouldShow={true}>
        Translatathon ends in {countdown}
      </BannerNotification>
    </>
  ) : (
    <></>
  )
}
