import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/buttons/Button"
import { BaseLink } from "@/components/ui/Link"

import { getTxEtherscanUrl } from "@/lib/torch"

export default function MintError({
  errorMessage,
  onTryAgain,
  hash,
}: {
  errorMessage: string
  onTryAgain: () => void
  hash?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <Alert variant="error" className="w-full rounded-none border-none">
        <AlertContent>
          <AlertDescription className="text-error-dark">
            <p>{errorMessage}</p>

            {hash && (
              <div>
                <BaseLink
                  className="text-sm text-error hover:text-error/80"
                  href={getTxEtherscanUrl(hash)}
                >
                  View transaction on Etherscan
                </BaseLink>
              </div>
            )}
          </AlertDescription>
        </AlertContent>
      </Alert>

      <Button size="lg" onClick={onTryAgain}>
        Try again
      </Button>
    </div>
  )
}
