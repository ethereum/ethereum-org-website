"use client"

import { useEffect, useRef, useState } from "react"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

type MorpherProps = {
  words: string[]
  charSet?: string
}

const Morpher = ({
  words,
  charSet = "abcdefghijklmnopqrstuvwxyz",
}: MorpherProps) => {
  const [currentText, setCurrentText] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const { prefersReducedMotion } = usePrefersReducedMotion()

  const morphTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const morphIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const counterRef = useRef(0)
  const wordsRef = useRef(words)
  const currentTextRef = useRef(currentText)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    wordsRef.current = words
    currentTextRef.current = currentText
    isAnimatingRef.current = isAnimating
  }, [words, currentText, isAnimating])

  // loops over chars to morph a text to another
  const morpher = (start: string, end: string): void => {
    // prevent multiple simultaneous animations
    if (isAnimatingRef.current) return

    setIsAnimating(true)
    isAnimatingRef.current = true

    // array of chars to randomly morph the text between start and end
    const chars = charSet.split("")
    // duration of the global morph
    const duration = 3
    // speed of the morph for each letter
    const frameRate = 24

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
      // check if component is still mounted and animation should continue
      if (!isAnimatingRef.current) return

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

      // Update text
      const newText = textString.join("")
      if (newText !== currentTextRef.current) {
        setCurrentText(newText)
        currentTextRef.current = newText
      }

      // Save present date
      past = present.getTime()

      // Loop
      if (count < Math.max(slen, rlen)) {
        // Only use a setTimeout if the frameRate is lower than 60FPS
        morphTimeoutRef.current = setTimeout(() => {
          window.requestAnimationFrame(update)
        }, 1000 / frameRate)
      } else {
        // Animation complete
        setIsAnimating(false)
        isAnimatingRef.current = false
      }
    }

    // Start loop
    update()
  }

  useEffect(() => {
    // If reduced motion is preferred, show static text cycling
    if (prefersReducedMotion) {
      morphIntervalRef.current = setInterval(() => {
        counterRef.current = (counterRef.current + 1) % wordsRef.current.length
        const nextWord = wordsRef.current[counterRef.current]
        setCurrentText(nextWord)
        currentTextRef.current = nextWord
      }, 3000)
    } else {
      // Defer animation start by 2 seconds to improve initial page load
      const startupDelay = setTimeout(() => {
        morphIntervalRef.current = setInterval(() => {
          // Don't start new animation if one is already running
          if (isAnimatingRef.current) return

          const start = currentTextRef.current
          const end = wordsRef.current[counterRef.current]

          morpher(start, end)

          counterRef.current =
            (counterRef.current + 1) % wordsRef.current.length
        }, 3000)
      }, 2000)

      return () => {
        clearTimeout(startupDelay)
      }
    }

    return () => {
      if (morphIntervalRef.current) {
        clearInterval(morphIntervalRef.current)
        morphIntervalRef.current = null
      }
      if (morphTimeoutRef.current) {
        clearTimeout(morphTimeoutRef.current)
        morphTimeoutRef.current = null
      }
      setIsAnimating(false)
      isAnimatingRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, charSet])

  return currentText
}

export default Morpher
