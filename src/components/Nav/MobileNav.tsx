import { cn } from "@/lib/utils/cn"

import Search from "../Search"

import MobileMenu from "./Mobile"

export const MobileNav = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Search />
      <MobileMenu className="flex animate-fade-in md:hidden" />
    </div>
  )
}
