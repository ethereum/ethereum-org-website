import { Skeleton } from "@/components/ui/skeleton"

export const DesktopNavLoading = () => {
  return (
    <div className="me-8 flex w-full items-center gap-10 px-6 max-md:hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-12 py-2" />
      ))}
    </div>
  )
}

export const MobileNavLoading = () => {
  return (
    <>
      <div className="flex items-center gap-6 px-2 max-md:hidden xl:px-3">
        <Skeleton
          data-label="search-xl"
          className="hidden h-6 w-[169px] xl:flex"
        />
        <Skeleton data-label="search" className="size-6 xl:hidden" />
      </div>
      <div className="flex items-center md:hidden">
        <Skeleton data-label="search" className="mx-2 size-6" />
        <Skeleton data-label="mobile-menu" className="ms-2 size-6" />
      </div>
    </>
  )
}
