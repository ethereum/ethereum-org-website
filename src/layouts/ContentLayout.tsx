import type { HTMLAttributes } from "react"

import FeedbackCard from "@/components/FeedbackCard"
import LeftNavBar, { LeftNavBarProps } from "@/components/LeftNavBar"
import { ContentContainer, Page } from "@/components/MdComponents"
import MobileButtonDropdown from "@/components/MobileButtonDropdown"

type ContentLayoutProps = HTMLAttributes<HTMLDivElement> &
  Pick<LeftNavBarProps, "dropdownLinks" | "tocItems" | "maxDepth"> & {
    children: React.ReactNode
    heroSection: React.ReactNode
  }

export const ContentLayout = ({
  children,
  dropdownLinks,
  tocItems,
  maxDepth,
  heroSection,
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
          <FeedbackCard />
        </ContentContainer>

        {dropdownLinks && <MobileButtonDropdown list={dropdownLinks} />}
      </Page>
    </div>
  )
}
