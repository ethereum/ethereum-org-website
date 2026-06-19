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

import { cn } from "@/lib/utils/cn"

type ContentLayoutProps = HTMLAttributes<HTMLDivElement> &
  Pick<TableOfContentsProps, "dropdownLinks" | "showDropdown"> & {
    children: React.ReactNode
    tocItems: TableOfContentsProps["items"]
    heroSection: React.ReactNode
    contributors: FileContributor[]
    lastEditLocaleTimestamp?: string
    /**
     * `"left-bottom"` — Contributors at the foot of the article, TOC rail on the left.
     * `"right-top"` — Compact contributors + listen byline up top, card TOC on the right.
     */
    asidePosition?: "left-bottom" | "right-top"
    listenSlug?: string
  }

export const ContentLayout = ({
  children,
  dropdownLinks,
  tocItems,
  showDropdown = true,
  heroSection,
  contributors,
  lastEditLocaleTimestamp,
  asidePosition = "left-bottom",
  listenSlug,
  ...props
}: ContentLayoutProps) => (
  <div {...props}>
    {heroSection}

    <main
      className={cn(
        "p-page",
        asidePosition === "left-bottom" &&
          "pt-space-3x max-lg:has-[[role=toolbar]:first-child]:pt-space",
        asidePosition === "left-bottom" && listenSlug && "pt-0"
      )}
    >
      <div
        className={cn(
          "flex justify-between gap-x-space-3x",
          asidePosition === "left-bottom"
            ? "flex-col lg:flex-row-reverse"
            : "max-lg:flex-col-reverse"
        )}
      >
        <MainArticle
          className={cn(
            "flow",
            asidePosition === "right-top"
              ? "max-w-3xl flex-1"
              : "shrink grow basis-5xl"
          )}
        >
          {asidePosition === "right-top" && (
            <FileContributors
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
              variant="compact"
            />
          )}
          {listenSlug && (
            <ListenToPlayer className="mt-space-half" slug={listenSlug} />
          )}

          {children}

          {asidePosition === "left-bottom" && (
            <FileContributors
              className="my-10 border-t"
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />
          )}
        </MainArticle>

        <aside
          className={cn(
            asidePosition === "left-bottom" &&
              "basis-md pb-space-3x max-lg:hidden"
          )}
        >
          {asidePosition === "right-top" && (
            <TableOfContents variant="card" items={tocItems} isMobile />
          )}

          <TableOfContents
            items={tocItems}
            dropdownLinks={dropdownLinks}
            maxDepth={0}
            showDropdown={showDropdown}
            variant={asidePosition === "left-bottom" ? "left" : "card"}
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
