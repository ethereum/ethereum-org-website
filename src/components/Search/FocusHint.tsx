"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

import KBD from "@/components/ui/kbd"

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
      // Desktop only: there is no `/` key to press on touch.
      host.className = "mx-2 hidden shrink-0 items-center md:flex"
      // Ahead of the clear button, so appearing and disappearing never shifts it or the
      // Ask button beyond it. The clear button is always in the DOM -- the library only
      // hides it while the query is empty -- so this lands in the same place either way.
      const reset = form.querySelector(".DocSearch-Reset")
      if (reset) form.insertBefore(host, reset)
      else form.append(host)
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
  return createPortal(<KBD className="min-w-0 text-sm">/</KBD>, slot)
}

export default FocusHint
