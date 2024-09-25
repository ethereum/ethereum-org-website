import Translation from "@/components/Translation"

import { Alert, AlertContent, AlertEmoji } from "./ui/alert"

const ProductDisclaimer = () => (
  <Alert variant="error">
    <AlertEmoji text="⚠️" />
    <AlertContent>
      <Translation id="product-disclaimer" />
    </AlertContent>
  </Alert>
)

export default ProductDisclaimer
