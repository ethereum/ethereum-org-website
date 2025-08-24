import type { HTMLAttributes } from "react"

import { FileContributor } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import { ContentContainer, Page } from "@/components/MdComponents"
import MobileButtonDropdown from "@/components/MobileButtonDropdown"
import TableOfContents, {
  type TableOfContentsProps,
} from "@/components/TableOfContents"

type ContentLayoutProps = HTMLAttributes<HTMLDivElement> &
  Pick<TableOfContentsProps, "dropdownLinks" | "showDropdown" | "maxDepth"> & {
    children: React.ReactNode
    tocItems: TableOfContentsProps["items"]
    heroSection: React.ReactNode
    contributors: FileContributor[]
    lastEditLocaleTimestamp: string
  }

export const ContentLayout = ({
  children,
  dropdownLinks,
  tocItems,
  maxDepth,
  showDropdown = true,
  heroSection,
  contributors,
  lastEditLocaleTimestamp,
  ...props
}: ContentLayoutProps) => {
  return (
    <div {...props}>
      {heroSection}

      <Page>
        <TableOfContents
          items={tocItems}
          dropdownLinks={dropdownLinks}
          maxDepth={maxDepth}
          showDropdown={showDropdown}
        />
        <ContentContainer>
          {children}

          <FileContributors
            className="my-10 border-t"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
          <FeedbackCard />
        </ContentContainer>
        {showDropdown && dropdownLinks && (
          <MobileButtonDropdown list={dropdownLinks} />
        )}
      </Page>
    </div>
  )
}
