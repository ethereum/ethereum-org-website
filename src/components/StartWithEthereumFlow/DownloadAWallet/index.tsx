import { Button } from "@/components/ui/buttons/Button"

const DownloadAWallet = ({
  handleNext,
  stepIndex,
  totalSteps,
}: {
  handleNext: () => void
  stepIndex: number
  totalSteps: number
}) => {
  return (
    <div>
      <div>
        <div>
          <p>
            {stepIndex} of {totalSteps}
          </p>
          <h2>Download a Wallet</h2>
        </div>
      </div>
      <Button onClick={handleNext}>Next</Button>
    </div>
  )
}

export default DownloadAWallet
