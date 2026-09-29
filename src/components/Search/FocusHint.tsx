"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

/**
 * The `/` hint, shown in the search bar only while focus has left the input.
 *
 * Tabbing through the answer's links takes focus out of the box, and nothing on screen
 * says how to get back. Hidden while the input has focus, where the key is just a
 * character, and on touch, where there is no keyboard to press it with.
 */
const FocusHint = () => {
  const [slot, setSlot] = useState<HTMLElement | null>(null)
  const [away, setAway] = useState(false)

  useEffect(() => {
    // The modal renders in the same commit, so one frame is enough to find it.
    const frame = requestAnimationFrame(() => {
      const form = document.querySelector<HTMLElement>(".DocSearch-Form")
      if (!form) return
      const host = document.createElement("span")
      host.className = "DocSearch-Focus-hint"
      form.append(host)
      setSlot(host)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => () => slot?.remove(), [slot])

  useEffect(() => {
    const input = slot?.parentElement?.querySelector(".DocSearch-Input")
    if (!input) return
    const read = () => setAway(document.activeElement !== input)
    read()
    // `focusin` bubbles where `focus` does not, so one listener covers the modal.
    document.addEventListener("focusin", read)
    document.addEventListener("focusout", read)
    return () => {
      document.removeEventListener("focusin", read)
      document.removeEventListener("focusout", read)
    }
  }, [slot])

  if (!slot || !away) return null
  return createPortal(<kbd>/</kbd>, slot)
}

export default FocusHint
