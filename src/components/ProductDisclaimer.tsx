import Translation from "@/components/Translation"

import { Alert, AlertContent, AlertEmoji } from "./ui/alert"

const ProductDisclaimer = () => (
  <Alert variant="warning">
    <AlertEmoji text="⚠️" />
    <AlertContent>
      <Translation id="product-disclaimer" />
    </AlertContent>
  </Alert>
)

export default ProductDisclaimer
