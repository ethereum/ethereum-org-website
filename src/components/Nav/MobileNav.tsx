import { cn } from "@/lib/utils/cn"

import MobileMenu from "./MobileMenu"
import Search from "./Search"

const MobileNav = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Search />
      <MobileMenu className="flex animate-fade-in md:hidden" />
    </div>
  )
}

export default MobileNav
