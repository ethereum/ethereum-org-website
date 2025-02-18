import { Button } from "@/components/ui/buttons/Button"

const ConnectYourWallet = ({ handleNext }: { handleNext: () => void }) => {
  return (
    <div>
      <h2>Connect Your Wallet</h2>
      <Button onClick={handleNext}>Next</Button>
    </div>
  )
}

export default ConnectYourWallet
