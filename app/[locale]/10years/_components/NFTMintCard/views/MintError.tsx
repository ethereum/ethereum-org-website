import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/buttons/Button"

export default function MintError({
  errorMessage,
  onTryAgain,
}: {
  errorMessage: string
  onTryAgain: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Alert variant="error">
        <AlertContent>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </AlertContent>
      </Alert>

      <Button size="lg" onClick={onTryAgain}>
        Try again
      </Button>
    </div>
  )
}
