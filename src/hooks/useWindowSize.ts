import { useLayoutEffect, useState } from "react"

type Size = [number, number]

export const useWindowSize = (): Size => {
  const [size, setSize] = useState<Size>([0, 0])

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return size
}
