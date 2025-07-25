import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/buttons/Button"

export default function MintError({
  errorMessage,
  onTryAgain,
}: {
  errorMessage: string
  onTryAgain: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <Alert variant="error" className="w-full rounded-none border-none">
        <AlertContent>
          <AlertDescription className="text-error-dark">
            {errorMessage}
          </AlertDescription>
        </AlertContent>
      </Alert>

      <Button size="lg" onClick={onTryAgain}>
        Try again
      </Button>
    </div>
  )
}
