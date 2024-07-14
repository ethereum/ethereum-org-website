import {
  Box,
  useToken,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent } from "@/lib/interfaces"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import FeedbackCard from "@/components/FeedbackCard"
import LeftNavBar from "@/components/LeftNavBar"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page,
} from "@/components/MdComponents"

// UseCases layout components
export const translatathonComponents = {
  // Export empty object if none needed
}

type TranslatathonLayoutProps = ChildOnlyProp &
Pick<MdPageContent, "tocItems"> & {
  frontmatter: unknown // TODO: setup type
}

export const TranslatathonLayout = ({
  children,
//   frontmatter,
  tocItems,
}: TranslatathonLayoutProps) => {
  const lgBp = useToken("breakpoints", "lg")

  const dropdownLinks: ButtonDropdownList = {
    text: "Translatathon dropdown",
    ariaLabel: "Translatathon dropdown",
    items: [
      {
        text: "Translatathon",
        to: "/translatathon",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "translatathon hub",
        },
      },
      {
        text: "Details and submission criteria",
        to: "/translatathon/details",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "details and submission criteria",
        },
      },
      {
        text: "Terms and conditions",
        to: "/translatathon/terms-and-conditions",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "terms and conditions",
        },
      },
      {
        text: "Local communities",
        to: "/translatathon/local-communities",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "local communities",
        },
      },
    ],
  }

  return (
    <Box
      position="relative"
      width="full"
      dir={'ltr'}
    >
      <Page>
        <LeftNavBar
          hideBelow={lgBp}
          dropdownLinks={dropdownLinks}
          tocItems={tocItems}
        />
        <ContentContainer id="content">
          {children}
          <FeedbackCard />
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Box>
  )
}
