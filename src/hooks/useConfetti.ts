import { useEffect } from "react"
import { useReward } from "react-rewards"

export const useConfetti = (elementId: string): void => {
  const { reward: confetti } = useReward(elementId, "confetti", {
    spread: 360,
    elementCount: 42,
    position: "absolute",
    zIndex: 10,
    lifetime: 420,
  })
  useEffect(() => {
    confetti()
  })
}
