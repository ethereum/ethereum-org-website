import { useEffect, useState } from "react"

/**
 * A hook to determine which section of the page is currently in the viewport.
 * @param {*} itemIds Array of document ids to observe, with or without a leading `#`
 * @param {*} rootMargin
 * @returns id of the element currently in viewport
 */
export const useActiveHash = (
  itemIds: Array<string>,
  rootMargin = `0% 0% -80% 0%`
): string => {
  const [activeHash, setActiveHash] = useState(``)

  // Callers often build the array inline on every render; keying the effect on
  // its contents stops the observer from being torn down and rebuilt each time.
  const idsKey = (itemIds ?? []).map((id) => id.replace(/^#/, "")).join(" ")

  useEffect(() => {
    if (!idsKey) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin }
    )

    idsKey.split(" ").forEach((id) => {
      const element = document.getElementById(id)
      if (element !== null) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [idsKey, rootMargin])

  return activeHash
}
