import {
  Box,
  Flex,
  Text,
  useToken,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, SharedFrontmatter } from "@/lib/interfaces"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { ButtonLink } from "@/components/Buttons"
import { ContentHero } from "@/components/Hero"
import LeftNavBar from "@/components/LeftNavBar"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page,
} from "@/components/MdComponents"

import translatathonHeroImg from "@/public/images/heroes/translatathon-hero.png"

// UseCases layout components
export const translatathonComponents = {
  // Export empty object if none needed
}

type TranslatathonLayoutProps = ChildOnlyProp &
Pick<MdPageContent, "slug" | "tocItems"> & {
  frontmatter: SharedFrontmatter
}

export const TranslatathonLayout = ({
  children,
  frontmatter,
  slug,
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
      <ContentHero
        breadcrumbs={{ slug, startDepth: 1 }}
        title={frontmatter.title}
        maxHeight={'400px'}
        description={<>
          <Text>Welcome to the thereum.org Translatathon!
          A translatathon is a collaborative and competitive hackathon-style event where individuals and teams compete for prizes by translating ethereum.org content into different languages.</Text>
          <Flex>
            <ButtonLink href="/">Apply to translate</ButtonLink> 
          </Flex>
        </>}
        heroImg={translatathonHeroImg}
        blurDataURL={""}
      />
      <Page>
        <LeftNavBar
          hideBelow={lgBp}
          dropdownLinks={dropdownLinks}
          tocItems={tocItems}
        />
        <ContentContainer id="content">
          {children}
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Box>
  )
}
