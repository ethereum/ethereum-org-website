import { TriangleAlert } from "lucide-react"

import Translation from "@/components/Translation"

import { Alert, AlertContent, AlertDescription, AlertIcon } from "./ui/alert"

const ProductDisclaimer = () => (
  <Alert variant="warning">
    <AlertIcon size="lg">
      <TriangleAlert />
    </AlertIcon>
    <AlertContent>
      <AlertDescription>
        <Translation id="product-disclaimer" />
      </AlertDescription>
    </AlertContent>
  </Alert>
)

export default ProductDisclaimer
