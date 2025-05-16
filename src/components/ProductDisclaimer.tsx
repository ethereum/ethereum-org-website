import Translation from "@/components/Translation"

import { Alert, AlertContent, AlertDescription, AlertEmoji } from "./ui/alert"

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
