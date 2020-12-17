import React, { useState, useEffect } from "react"
import styled from "styled-components"

const NavLink = styled.span`
  font-size: 20px;
  text-decoration: underline;
`

const BenefitMorpher = () => {
  const [state, setState] = useState({
    text: "game",
    words: ["society", "internet", "money", "market"],
  })

  // loops over chars to morph a text to another
  const BenefitMorpher = (start, end) => {
    // array of chars to randomly morph the text between start and end
    const chars = [
      "e",
      "t",
      "h",
      "e",
      "r",
      "e",
      "u",
      "m",
      "d",
      "o",
      "g",
      "e",
      "0",
      "x",
    ]
    // duration of the global morph
    const duration = 20
    // speed of the morph for each letter
    const frameRate = 30

    // text variables
    const string = start.split("")
    const result = end.split("")
    const slen = string.length
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
        string[i] = chars[random]
      }

      // Morph letters from start to end
      if (spentTime >= splitTime) {
        // Update count of letters to morph
        count += Math.floor(spentTime / splitTime)
        // Morphing
        for (let j = 0; j < count; j++) {
          string[j] = result[j] || null
        }
        // Reset spent time
        spentTime = 0
      }

      // Update DOM
      setState({ ...state, text: string.join("") })

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

  let morphTimeout = null

  useEffect(() => {
    let counter = 0

    const morphInterval = setInterval(() => {
      const start = state.text
      const end = state.words[counter]

      BenefitMorpher(start, end)

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
  }, [])

  return <NavLink>{state.text}</NavLink>
}

export default BenefitMorpher
