import { cva, VariantProps } from "class-variance-authority"
import { Info } from "lucide-react"

import { Alert, AlertContent } from "@/components/ui/alert"

const variants = cva("max-w-xl", {
  variants: {
    variant: {
      center: "mx-auto justify-center",
    },
  },
})

type NoResultsAlert = {
  children: string
} & VariantProps<typeof variants>

const NoResultsAlert = ({ children, variant }: NoResultsAlert) => (
  <Alert
    data-flow="cta"
    variant="warning"
    role="status"
    className={variants({ variant })}
  >
    <Info className="size-6 text-current!" />
    <AlertContent>{children}</AlertContent>
  </Alert>
)

export default NoResultsAlert
