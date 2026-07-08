import { cn } from "@/lib/utils/cn"

import EthToken from "./eth-token.svg"

const EthTokenIcon = ({ className }: { className?: string }) => (
  <EthToken
    className={cn(
      "[&_circle]:fill-primary-hover [&_path]:fill-background",
      className
    )}
  />
)

export default EthTokenIcon
