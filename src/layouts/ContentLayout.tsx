import type { HTMLAttributes } from "react"

import { FileContributor } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import FileContributors from "@/components/FileContributors"
import MainArticle from "@/components/MainArticle"
import MobileButtonDropdown from "@/components/MobileButtonDropdown"
import TableOfContents, {
  type TableOfContentsProps,
} from "@/components/TableOfContents"

type ContentLayoutProps = HTMLAttributes<HTMLDivElement> &
  Pick<TableOfContentsProps, "dropdownLinks" | "showDropdown"> & {
    children: React.ReactNode
    tocItems: TableOfContentsProps["items"]
    heroSection: React.ReactNode
    contributors: FileContributor[]
    lastEditLocaleTimestamp?: string
  }

export const ContentLayout = ({
  children,
  dropdownLinks,
  tocItems,
  showDropdown = true,
  heroSection,
  contributors,
  lastEditLocaleTimestamp,
  ...props
}: ContentLayoutProps) => {
  return (
    <div {...props}>
      {heroSection}

      <div className="mx-auto mb-16 flex w-full flex-col justify-between lg:flex-row lg:pt-16">
        <TableOfContents
          items={tocItems}
          dropdownLinks={dropdownLinks}
          maxDepth={0}
          showDropdown={showDropdown}
          variant="left"
        />

        <main className="min-w-0 flex-[1_1_992px] px-8 pb-8 max-lg:pt-12">
          <MainArticle className="flow">
            {children}

            <FileContributors
              className="my-10 border-t"
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />
          </MainArticle>

          {/* End-of-page actions */}
          <ContentFeedback />
        </main>

        {showDropdown && dropdownLinks && (
          <MobileButtonDropdown list={dropdownLinks} />
        )}
      </div>
    </div>
  )
}
