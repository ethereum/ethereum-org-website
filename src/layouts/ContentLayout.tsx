import type { HTMLAttributes } from "react"

import { FileContributor } from "@/lib/types"

import FeedbackCard from "@/components/molecules/FeedbackCard"
import FileContributors from "@/components/molecules/FileContributors"
import MobileButtonDropdown from "@/components/molecules/MobileButtonDropdown"
import { ContentContainer, Page } from "@/components/organisms/MdComponents"
import TableOfContents, {
  type TableOfContentsProps,
} from "@/components/organisms/TableOfContents"

type ContentLayoutProps = HTMLAttributes<HTMLDivElement> &
  Pick<TableOfContentsProps, "dropdownLinks" | "showDropdown"> & {
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
          maxDepth={0}
          showDropdown={showDropdown}
          variant="left"
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
