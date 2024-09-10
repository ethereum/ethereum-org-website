import type { HTMLAttributes } from "react"

import FeedbackCard from "@/components/FeedbackCard"
import { ContentHero, type ContentHeroProps } from "@/components/Hero"
import LeftNavBar, { LeftNavBarProps } from "@/components/LeftNavBar"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page,
} from "@/components/MdComponents"

type ContentLayoutProps = HTMLAttributes<HTMLDivElement> &
  Pick<LeftNavBarProps, "dropdownLinks" | "tocItems" | "maxDepth"> & {
    children: React.ReactNode
    heroProps: ContentHeroProps
  }

export const ContentLayout = ({
  children,
  dropdownLinks,
  tocItems,
  maxDepth,
  heroProps,
  ...props
}: ContentLayoutProps) => {
  return (
    <div {...props}>
      <ContentHero {...heroProps} />

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

        {dropdownLinks && (
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        )}
      </Page>
    </div>
  )
}
