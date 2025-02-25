"use client"

import { useEffect, useState } from "react"

const useActiveScrollSection = () => {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], [id].scroll-mt-40")

    const handleScroll = () => {
      let currentSection = ""
      let minDistance = Infinity

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const distance = Math.abs(sectionTop - 5 * 16) // 5rem from the top
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

    const debounce = (func: () => void, wait: number) => {
      let timeout: NodeJS.Timeout
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait)
      }
    }

    const debouncedHandleScroll = debounce(handleScroll, 100)

    window.addEventListener("scroll", debouncedHandleScroll)
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll)
    }
  }, [])

  return activeSection
}

export default useActiveScrollSection
