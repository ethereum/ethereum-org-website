import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function MintSuccess() {
  return (
    <Alert variant="success">
      <AlertContent>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your NFT has been minted successfully.
        </AlertDescription>
      </AlertContent>
    </Alert>
  )
}
