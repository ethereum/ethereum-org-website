import Translation from "@/components/Translation"

import { Alert, AlertContent, AlertDescription } from "./ui/alert"
import Emoji from "./Emoji"

const ProductDisclaimer = () => (
  <Alert variant="warning">
    <Emoji text="⚠️" className="text-4xl" />
    <AlertContent>
      <AlertDescription>
        <Translation id="product-disclaimer" />
      </AlertDescription>
    </AlertContent>
  </Alert>
)

export default ProductDisclaimer
