import { cn } from "@/lib/utils/cn"

import { MAIN_CONTENT_ID } from "@/lib/constants"

const MainArticle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <article
    id={MAIN_CONTENT_ID}
    className={cn("scroll-mt-24", className)}
    {...props}
  />
)

export default MainArticle
