import {
  Box,
  Flex,
  Hide,
  Icon,
  ListItem,
  Show,
  Text,
  UnorderedList,
  useToken,
} from "@chakra-ui/react"
import { MdExpandMore } from "react-icons/md"

import BannerNotification from "@/components/BannerNotification"
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { BaseLink } from "@/components/Link"
import { Image } from "@/components/Image"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import TableOfContents from "@/components/TableOfContents"
import UpgradeTableOfContents from "@/components/UpgradeTableOfContents"
import {
  ContentContainer,
  InfoColumn,
  InfoTitle,
  MobileButton,
  MobileButtonDropdown,
  Page,
  StyledButtonDropdown,
  Title,
} from "@/components/MdComponents"

import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"
import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, UseCasesFrontmatter } from "@/lib/interfaces"

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    bg="cardGradient"
    boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
    direction={{ base: "column-reverse", lg: "row" }}
    justify="end"
    minHeight={{ base: "800px", lg: "608px" }}
    maxHeight={{ base: "full", lg: "608px" }}
    width="full"
    position="relative"
    {...props}
  />
)

const TitleCard = (props: ChildOnlyProp) => {
  const boxShadow = useToken("colors", "cardBoxShadow")

  return (
    <Flex
      bg={{ base: "ednBackground", lg: "background.base" }}
      border="1px"
      borderColor="border"
      borderRadius={{ base: "none", lg: "base" }}
      boxShadow={{ lg: boxShadow }}
      flexDirection="column"
      maxWidth={{ base: "full", lg: "container.sm" }}
      zIndex="docked"
      p={8}
      position="absolute"
      top={{ base: "unset", lg: 24 }}
      left={{ base: 0, lg: 24 }}
      bottom={{ base: 0, lg: "unset" }}
      right={{ base: 0, lg: "unset" }}
      {...props}
    />
  )
}

// UseCases layout components
export const useCasesComponents = {
  // Export empty object if none needed
}

interface IProps extends ChildOnlyProp, MdPageContent {
  frontmatter: UseCasesFrontmatter
}
export const UseCasesLayout: React.FC<IProps> = ({
  children,
  frontmatter,
  slug,
  tocItems,
}) => {
  // TODO: Re-enable after i18n implemented
  // const { t } = useTranslation()
  const lgBp = useToken("breakpoints", "lg")

  const summaryPoints = getSummaryPoints(frontmatter)

  // TODO: Re-implement GitHub edit path
  // const { editContentUrl } = siteData.siteMetadata || {}
  // const { relativePath } = pageContext
  // const absoluteEditPath = `${editContentUrl}${relativePath}`

  // Assign hero styling, default to "defi"
  let useCase = "defi"
  if (slug.includes("dao") || slug.includes("identity")) {
    useCase = "dao"
  }
  if (slug.includes("nft")) {
    useCase = "nft"
  }

  const dropdownLinks: ButtonDropdownList = {
    text: "Ethereum use cases", // t("template-usecase-dropdown"),
    ariaLabel: "Use case dropdown menu", // t("template-usecase-dropdown-aria"),
    items: [
      {
        text: "Decentralized finance (DeFi)", // t("template-usecase-dropdown-defi"),
        to: "/defi/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "defi",
        },
      },
      {
        text: "Non-fungible tokens (NFTs)", // t("template-usecase-dropdown-nft"),
        to: "/nft/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "nft",
        },
      },
      {
        text: "Decentralized autonomous organisations (DAOs)", // t("template-usecase-dropdown-dao"),
        to: "/dao/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "dao",
        },
      },
      {
        text: "Decentralized social networks", // t("template-usecase-dropdown-social-networks"),
        to: "/social-networks/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "social-networks",
        },
      },
      {
        text: "Decentralized identity", // t("template-usecase-dropdown-identity"),
        to: "/decentralized-identity/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "decentralized-identity",
        },
      },
      {
        text: "Decentralized science (DeSci)", // t("template-usecase-dropdown-desci"),
        to: "/desci/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "desci",
        },
      },
      {
        text: "Regenerative finance (ReFi)", // t("template-usecase-dropdown-refi"),
        to: "/refi/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "refi",
        },
      },
    ],
  }

  return (
    <Box position="relative" width="full">
      <Show above={lgBp}>
        <BannerNotification shouldShow zIndex="sticky">
          <Emoji text=":pencil:" fontSize="2xl" mr={4} flexShrink={0} />
          <Text m={0}>
            Uses of Ethereum are always developing and evolving. Add any info
            you think will make things clearer or more up to date. Edit page
            {/* TODO: Re-enable after intl implemented */}
            {/* <Translation id="template-usecase-banner" />{" "}
            <InlineLink to={absoluteEditPath}>
              <Translation id="template-usecase-edit-link" />
            </InlineLink> */}
          </Text>
        </BannerNotification>
      </Show>
      <HeroContainer>
        <TitleCard>
          <Emoji fontSize="4rem" text={frontmatter.emoji!} />
          <Title>{frontmatter.title}</Title>
          <Box>
            <UnorderedList ms="1.45rem">
              {summaryPoints.map((point, idx) => (
                <ListItem key={idx} color="text300" mb={0}>
                  {point}
                </ListItem>
              ))}
            </UnorderedList>
            <TableOfContents
              items={tocItems}
              maxDepth={frontmatter.sidebarDepth || 2}
              isMobile
            />
          </Box>
        </TitleCard>
        <Image
          position="absolute"
          alignSelf={{ base: "center", lg: "normal" }}
          top={0}
          bottom={0}
          style={{ objectFit: "cover" }}
          width={1000}
          height={610}
          src={frontmatter.image}
          alt={frontmatter.alt || ""}
          maxW={{
            base: useCase === "defi" ? "full" : "min(405px, 98%)",
            lg:
              (useCase === "dao" && "572px") ||
              (useCase === "defi" && "80%") ||
              "640px",
          }}
        />
      </HeroContainer>
      <Show above={lgBp}>
        <Flex
          as={BaseLink}
          to="#content"
          bg="ednBackground"
          justifyContent="center"
          p={4}
          width="full"
          _hover={{
            bg: "background.base",
          }}
        >
          <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
        </Flex>
      </Show>
      <Page>
        <Show above={lgBp}>
          <InfoColumn>
            <StyledButtonDropdown list={dropdownLinks} />
            <InfoTitle>{frontmatter.title}</InfoTitle>

            {tocItems && (
              <UpgradeTableOfContents items={tocItems} maxDepth={2} />
            )}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          {children}
          <FeedbackCard />
        </ContentContainer>
        <Hide above={lgBp}>
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        </Hide>
      </Page>
    </Box>
  )
}
