import { useState, useEffect } from "react"

/**
 * A hook to determine which section of the page is currently in the viewport.
 * @param {*} itemIds Array of document ids to observe
 * @param {*} rootMargin
 * @returns id of the element currently in viewport
 */
export const useActiveHash = (itemIds, rootMargin = `0% 0% -80% 0%`) => {
  const [activeHash, setActiveHash] = useState(``)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: rootMargin }
    )

    itemIds?.forEach((id) => {
      if (document.getElementById(id) !== null) {
        observer.observe(document.getElementById(id))
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        if (document.getElementById(id) !== null) {
          observer.unobserve(document.getElementById(id))
        }
      })
    }
  }, [])

  return activeHash
}
