import { useAccount } from "wagmi"

import ConnectToEthereumButton from "@/components/ConnectToEthereumButton"
import Emoji from "@/components/Emoji"
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
  const { isConnected } = useAccount()

  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-24">
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
        <div className="hidden flex-col items-center justify-center gap-4 lg:flex">
          {isConnected && <Emoji text="🎉" className="text-[72px]" />}
          {isConnected && (
            <p className="text-center text-md font-bold">
              This is your account
            </p>
          )}
          <ConnectToEthereumButton />
          {isConnected && <Button onClick={handleNext}>Lets continue</Button>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 lg:gap-8">
        <div className="mx-auto">
          <Image
            className="hidden lg:block"
            src={FinanceImage}
            alt="Finance"
            width={370}
            height={370}
          />
          {!isConnected && (
            <Image
              className="block lg:hidden"
              src={FinanceImage}
              alt="Finance"
              width={200}
              height={200}
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-4 lg:hidden">
          {isConnected && <Emoji text="🎉" className="text-[72px]" />}
          {isConnected && (
            <p className="text-center text-md font-bold">
              This is your account
            </p>
          )}
          <ConnectToEthereumButton />
          {isConnected && <Button onClick={handleNext}>Lets continue</Button>}
        </div>
      </div>
    </div>
  )
}

export default ConnectYourWallet
