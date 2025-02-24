"use client"

import { useEffect, useState } from "react"

const useScrollPositionActiveSection = () => {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], [id].scroll-mt-20")

    const handleScroll = () => {
      let currentSection = ""
      let minDistance = Infinity

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const distance = Math.abs(sectionTop - window.innerHeight / 2)
        if (distance < minDistance) {
          minDistance = distance
          currentSection = section.getAttribute("id") || ""
        }
      })

      setActiveSection(currentSection)
      if (currentSection) {
        window.history.replaceState(null, "", `#${currentSection}`)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return activeSection
}

export default useScrollPositionActiveSection
