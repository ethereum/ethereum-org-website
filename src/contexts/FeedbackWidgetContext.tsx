import { createContext, useState } from "react"

import { FeedbackWidgetContextType } from "@/lib/types"

// Context API for /find-wallets language support filter
export const FeedbackWidgetContext = createContext<FeedbackWidgetContextType>({
  showFeedbackWidget: true,
  setShowFeedbackWidget: () => {},
})

export const FeedbackWidgetProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [showFeedbackWidget, setShowFeedbackWidget] = useState(true)

  return (
    <FeedbackWidgetContext.Provider
      value={{ showFeedbackWidget, setShowFeedbackWidget }}
    >
      {children}
    </FeedbackWidgetContext.Provider>
  )
}
