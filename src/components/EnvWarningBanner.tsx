import { Alert } from "./ui/alert"
import Translation from "./Translation"

const EnvWarningBanner = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <Alert variant="error" {...props}>
    <Translation id="page-tutorials-env-banner" />
  </Alert>
)

export default EnvWarningBanner
