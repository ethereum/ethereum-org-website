import { useEffect } from "react"

// Use with `ref` on a component to handle clicks outside of ref element
// e.g. to hide the component (see Search or NavDropdown)
export const useOnClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = (event) =>
    ref.current && event && !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}
