import { createContext } from "react"

interface IZenModeContext {
  isZenMode: boolean
  handleZenModeChange: (val?: boolean | undefined) => void
}

export const ZenModeContext = createContext<IZenModeContext>(
  {} as IZenModeContext
)
