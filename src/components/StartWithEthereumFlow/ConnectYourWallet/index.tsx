import { Image } from "@/components/Image"
import { Button } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import FinanceImage from "@/public/images/finance_transparent.png"

const ConnectYourWallet = ({
  handleNext,
  stepIndex,
  totalSteps,
}: {
  handleNext: () => void
  stepIndex: number
  totalSteps: number
}) => {
  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-24">
      <div className="flex flex-1 flex-col gap-14">
        <div className="flex flex-col gap-5">
          <div>
            <Tag status="tag">
              {stepIndex} / {totalSteps}
            </Tag>
          </div>
          <h2 className="text-3xl font-bold">Connect Your Wallet</h2>
          <p>
            You can use your new wallet as a single account in all apps and
            projects on Ethereum. No separate accounts needed.
          </p>
        </div>
        <div className="hidden flex-col lg:flex">
          <Button onClick={handleNext}>Sign in with Ethereum</Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <div className="mx-auto">
          <Image src={FinanceImage} alt="Finance" width={370} height={370} />
        </div>
        <div className="flex flex-col lg:hidden">
          <Button onClick={handleNext}>Sign in with Ethereum</Button>
        </div>
      </div>
    </div>
  )
}

export default ConnectYourWallet
