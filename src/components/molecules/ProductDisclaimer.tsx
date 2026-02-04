import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertEmoji,
} from "@/components/ui/alert"
import Translation from "@/components/utilities/Translation"

const ProductDisclaimer = () => (
  <Alert variant="warning">
    <AlertEmoji text="⚠️" />
    <AlertContent>
      <AlertDescription>
        <Translation id="product-disclaimer" />
      </AlertDescription>
    </AlertContent>
  </Alert>
)

export default ProductDisclaimer
