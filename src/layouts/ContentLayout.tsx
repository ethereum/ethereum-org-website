import type { HTMLAttributes } from "react"

import { FileContributor } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import LeftNavBar, { LeftNavBarProps } from "@/components/LeftNavBar"
import { ContentContainer, Page } from "@/components/MdComponents"
import MobileButtonDropdown from "@/components/MobileButtonDropdown"

type ContentLayoutProps = HTMLAttributes<HTMLDivElement> &
  Pick<LeftNavBarProps, "dropdownLinks" | "tocItems" | "maxDepth"> & {
    children: React.ReactNode
    heroSection: React.ReactNode
    contributors: FileContributor[]
    lastEditLocaleTimestamp: string
  }

export const ContentLayout = ({
  children,
  dropdownLinks,
  tocItems,
  maxDepth,
  heroSection,
  contributors,
  lastEditLocaleTimestamp,
  ...props
}: ContentLayoutProps) => {
  return (
    <div {...props}>
      {heroSection}

      <Page>
        <LeftNavBar
          className="max-lg:hidden"
          dropdownLinks={dropdownLinks}
          tocItems={tocItems}
          maxDepth={maxDepth}
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
        {dropdownLinks && <MobileButtonDropdown list={dropdownLinks} />}
      </Page>
    </div>
  )
}
