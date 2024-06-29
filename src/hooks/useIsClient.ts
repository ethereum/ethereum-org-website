import { useEffect, useState } from "react"

export const useIsClient = () => {
  const [isClient, setClient] = useState(false)

  useEffect(() => {
    setClient(true)
  }, [])

  return isClient
}
