import { cva, VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

import { FileContributor } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import FileContributors from "@/components/FileContributors"
import ListenToPlayer from "@/components/ListenToPlayer/lazy"
import MainArticle from "@/components/MainArticle"
import MobileButtonDropdown from "@/components/MobileButtonDropdown"
import TableOfContents, {
  type TableOfContentsProps,
} from "@/components/TableOfContents"

const variants = cva("flow flex-1", {
  variants: {
    variant: { base: "max-w-4xl", narrow: "max-w-3xl" },
  },
  defaultVariants: {
    variant: "narrow",
  },
})

type ContentLayoutProps = HTMLAttributes<HTMLDivElement> &
  Pick<TableOfContentsProps, "dropdownLinks" | "showDropdown"> & {
    children: React.ReactNode
    tocItems: TableOfContentsProps["items"]
    heroSection: React.ReactNode
    contributors: FileContributor[]
    lastEditLocaleTimestamp?: string
    listenSlug?: string
  } & VariantProps<typeof variants>

export const ContentLayout = ({
  children,
  dropdownLinks,
  tocItems,
  showDropdown = true,
  heroSection,
  contributors,
  lastEditLocaleTimestamp,
  listenSlug,
  variant,
  ...props
}: ContentLayoutProps) => (
  <div {...props}>
    {heroSection}

    <main className="p-page">
      <div className="flex justify-between gap-x-space-3x max-lg:flex-col-reverse">
        <MainArticle className={variants({ variant })}>
          <FileContributors
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            variant="compact"
          />
          {listenSlug && (
            <ListenToPlayer className="mt-space-half" slug={listenSlug} />
          )}

          {children}
        </MainArticle>

        <aside>
          <TableOfContents variant="card" items={tocItems} isMobile />

          <TableOfContents
            items={tocItems}
            dropdownLinks={dropdownLinks}
            maxDepth={0}
            showDropdown={showDropdown}
            variant="card"
          />
        </aside>
      </div>

      {/* End-of-page actions */}
      <ContentFeedback />
    </main>

    {showDropdown && dropdownLinks && (
      <MobileButtonDropdown list={dropdownLinks} />
    )}
  </div>
)
