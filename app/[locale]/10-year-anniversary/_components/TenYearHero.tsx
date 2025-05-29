"use client"

import { useEffect, useState } from "react"

import { Image } from "@/components/Image"
import ParallaxImage from "@/components/Image/ParallaxImage"

import TenYearBackgroundImage from "@/public/images/10-year-anniversary/10-year-background.png"
import TenYearGraphicImage from "@/public/images/10-year-anniversary/10-year-graphic.png"

const TenYearHero = () => {
  const [words, setWords] = useState<{ text: string; words: string[] }>({
    text: "censorship resistance",
    words: [
      "censorship resistance",
      "100% uptime",
      "decentralization",
      "community building",
      "developer growth",
      "global collaboration",
      "cypherpunk values",
      "hackathons",
      "censorship resistance",
      "permissionless finance",
      "credible neutrality",
      "the infinite garden",
      "client diversity",
    ],
  })

  // loops over chars to morph a text to another
  const morpher = (start: string, end: string): void => {
    // array of chars to randomly morph the text between start and end
    const chars = "abcdxyz01234567{}%$?!".split("")
    // duration of the global morph
    const duration = 3
    // speed of the morph for each letter
    const frameRate = 30

    // text variables
    const textString = start.split("")
    const result = end.split("")
    const slen = textString.length
    const rlen = result.length

    // time variables
    let present = new Date()
    let past = present.getTime()
    let count = 0
    let spentTime = 0
    // splitTime  = milliseconds / letters
    const splitTime = (duration * 70) / Math.max(slen, rlen)

    function update() {
      // Update present date and spent time
      present = new Date()
      spentTime += present.getTime() - past

      // Random letters
      for (let i = count; i < Math.max(slen, rlen); i++) {
        const random = Math.floor(Math.random() * (chars.length - 1))
        // Change letter
        textString[i] = chars[random]
      }

      // Morph letters from start to end
      if (spentTime >= splitTime) {
        // Update count of letters to morph
        count += Math.floor(spentTime / splitTime)
        // Morphing
        for (let j = 0; j < count; j++) {
          textString[j] = result[j] || ""
        }
        // Reset spent time
        spentTime = 0
      }

      // Update DOM
      setWords({ ...words, text: textString.join("") })

      // Save present date
      past = present.getTime()

      // Loop
      if (count < Math.max(slen, rlen)) {
        // Only use a setTimeout if the frameRate is lower than 60FPS
        // Remove the setTimeout if the frameRate is equal to 60FPS
        morphTimeout = setTimeout(() => {
          window.requestAnimationFrame(update)
        }, 1000 / frameRate)
      }
    }

    // Start loop
    update()
  }

  let morphTimeout: NodeJS.Timeout

  useEffect(() => {
    let counter = 0

    const morphInterval = setInterval(() => {
      const start = words.text
      const end = words.words[counter]

      morpher(start, end)

      if (counter < words.words.length - 1) {
        counter++
      } else {
        counter = 0
      }
    }, 3000)

    return () => {
      clearInterval(morphInterval)
      clearTimeout(morphTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="relative mb-16">
        <Image
          src={TenYearBackgroundImage}
          alt="10 Year Anniversary"
          className="max-h-[350px] object-cover"
        />
        <ParallaxImage
          src={TenYearGraphicImage}
          alt="10 Year Anniversary"
          className="absolute left-0 top-0 max-h-[350px] object-contain transition-transform duration-200 ease-out"
        />
      </div>
      <p className="text-center text-3xl">
        Celebrating 10 years of <span className="font-bold">{words.text}</span>
      </p>
    </div>
  )
}

export default TenYearHero
