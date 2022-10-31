import { RefObject, useEffect } from "react"

// Use with `ref` on a component to handle clicks outside of ref element
// e.g. to hide the component (see Search or NavDropdown)
export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  events: Array<string> = ["mousedown", "touchstart"]
) => {
  const detectClickOutside = (event: Event) => {
    const element = event.target as HTMLElement
    ref.current && event && !ref.current.contains(element) && handler()
  }
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}
