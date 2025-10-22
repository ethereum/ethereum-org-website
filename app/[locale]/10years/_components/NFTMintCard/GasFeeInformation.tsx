import { Info } from "lucide-react"

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const GasFeeInformation = () => {
  return (
    <Alert variant="warning" className="w-full rounded-none border-none">
      <Info className="h-5 w-5 !text-yellow-600" />
      <AlertContent>
        <AlertTitle className="!text-yellow-800">About Network Fees</AlertTitle>
        <AlertDescription className="text-sm text-yellow-700">
          While the NFT is free, you&apos;ll need to pay Ethereum network fees
          to complete the transaction. Network fees vary throughout the day -
          consider waiting for lower network fees periods to save on costs.
        </AlertDescription>
      </AlertContent>
    </Alert>
  )
}

export default GasFeeInformation
