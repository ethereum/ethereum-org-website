import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"
import Translation from "@/components/utilities/Translation"

const EnvWarningBanner = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <Alert variant="warning" {...props}>
    <AlertContent>
      <AlertDescription>
        <Translation id="page-developers-tutorials:page-tutorials-env-banner" />
      </AlertDescription>
    </AlertContent>
  </Alert>
)

export default EnvWarningBanner
