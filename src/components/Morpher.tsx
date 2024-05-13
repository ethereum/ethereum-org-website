import { useEffect, useState } from "react"
import { useBreakpointValue } from "@chakra-ui/react"

import { Button } from "@/components/Buttons"

import {
  DESKTOP_LANGUAGE_BUTTON_NAME,
  HAMBURGER_BUTTON_ID,
  MOBILE_LANGUAGE_BUTTON_NAME,
} from "@/lib/constants"

const Morpher = () => {
  const [state, setState] = useState({
    text: "Ethereum",
    words: [
      "以太坊",
      "イーサリアム",
      "Etérium",
      "이더리움",
      "اتریوم",
      "Αιθέριο",
      "Eterijum",
      "إثيريوم",
      "อีเธอเรียม",
      "Эфириум",
      "इथीरियम",
      "ಇಥೀರಿಯಮ್",
      "אתריום",
      "Ξ",
      "ইথেরিয়াম",
      "எதீரியம்",
      "ఇథిరియూమ్",
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
    let splitTime = (duration * 70) / Math.max(slen, rlen)

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
      setState({ ...state, text: textString.join("") })

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
      const start = state.text
      const end = state.words[counter]

      morpher(start, end)

      if (counter < state.words.length - 1) {
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

  const handleMobileClick = () => {
    if (!document) return
    ;(document.getElementById(HAMBURGER_BUTTON_ID) as HTMLButtonElement).click()
    setTimeout(
      () =>
        (
          document.querySelector(
            `button[name="${MOBILE_LANGUAGE_BUTTON_NAME}"`
          ) as HTMLButtonElement
        ).click(),
      1
    )
  }
  const handleDesktopClick = () => {
    if (!document) return
    ;(
      document.querySelector(
        `button[name="${DESKTOP_LANGUAGE_BUTTON_NAME}"`
      ) as HTMLButtonElement
    ).click()
  }

  const handleClick =
    useBreakpointValue({
      base: handleMobileClick,
      md: handleDesktopClick,
    }) || handleDesktopClick

  return (
    <Button
      w="fit-content"
      mx="auto"
      variant="ghost"
      textDecor="none"
      fontSize="md"
      color="body.medium"
      _hover={{ color: "primary.base" }}
      onClick={handleClick}
    >
      {state.text}
    </Button>
  )
}

export default Morpher
