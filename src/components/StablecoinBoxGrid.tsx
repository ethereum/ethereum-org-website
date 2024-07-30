import { useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Box, Flex } from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import { isMobile } from "../lib/utils/isMobile"

import Emoji from "./Emoji"
import InlineLink from "./Link"
import OldHeading from "./OldHeading"

// Represent string as 32-bit integer
const hashCode = (string: string): number => {
  let hash = 0
  for (const char of string) {
    const code = char.charCodeAt(0)
    hash = (hash << 5) - hash + code
    hash |= 0
  }
  return Math.abs(hash)
}

// Theme variables from Theme.js
const colors = [
  "gridYellow",
  "gridBlue",
  "gridGreen",
  "gridOrange",
  "gridPink",
  "gridPurple",
]

interface ILink {
  url: string
  text: string
}

type GridItemProps = {
  description: string
  columnNumber: number
  rowNumber: number
  emoji: string
  index: number
  title: string
  isOpen: boolean
  callback: (index: number) => void
  color: string
  pros?: Array<string>
  cons?: Array<string>
  links: Array<ILink>
}

const OpenTitle = ({ title }: { title: string }) => {
  return (
    <OldHeading
      as="h3"
      fontSize={{ base: "2rem", sm: "2.5rem" }}
      fontWeight={700}
      marginTop={0}
    >
      {title}
    </OldHeading>
  )
}

const Title = ({ title }: { title: string }) => {
  return (
    <OldHeading
      as="h3"
      fontSize={{ base: "2rem", sm: "2.5rem" }}
      fontWeight={400}
      marginTop={0}
    >
      {title}
    </OldHeading>
  )
}

const Subtitle = ({ children }: ChildOnlyProp) => {
  return (
    <OldHeading
      as="h4"
      fontSize={{ base: "2xl", sm: "2rem" }}
      fontWeight={600}
      marginTop={0}
      padding={2}
      paddingBottom={4}
      borderBottom="1px solid"
      borderColor="black300"
    >
      {children}
    </OldHeading>
  )
}

const Body = ({ children }: ChildOnlyProp) => {
  return (
    <Box fontSize="xl" lineHeight="140%" color="black300">
      {children}
    </Box>
  )
}

const StyledEmoji = ({ emoji }: { emoji: string }) => {
  return (
    <Emoji
      fontSize="8xl"
      text={emoji}
      margin={2}
      alignSelf="center"
      order="2"
      _hover={{
        transition: "transform 50s",
        transform: "rotate(10turn)",
      }}
    />
  )
}

const Row = ({ children }: ChildOnlyProp) => {
  return (
    <Flex
      justify="space-between"
      marginTop={8}
      direction={{ base: "column", md: "row" }}
    >
      {children}
    </Flex>
  )
}

const Column = ({ children }: ChildOnlyProp) => {
  return <Box width="100%">{children}</Box>
}

const GridItem = ({
  description,
  columnNumber,
  rowNumber,
  emoji,
  index,
  title,
  isOpen,
  callback,
  color,
  pros,
  cons,
  links,
}: GridItemProps) => {
  const handleClick = (): void => {
    callback(index)
  }
  const shadow = useColorModeValue("tableBox.light", "tableBox.dark")
  const { t } = useTranslation("page-stablecoins")

  return (
    <Flex
      id={`type-${index}`}
      onClick={() => handleClick()}
      gridRowStart={isOpen ? rowNumber : `auto`}
      gridRowEnd={isOpen ? `span 3` : `auto`}
      gridColumnStart={isOpen ? columnNumber : `auto`}
      color={isOpen ? "black300" : "text"}
      cursor={isOpen ? `auto` : `pointer`}
      background={isOpen ? color : "background.base"}
      direction={{
        base: "column",
        sm: `${isOpen ? "column" : "row"}`,
        lg: "column",
      }}
      justify={{
        base: `${isOpen ? "flex-start" : "space-between"}`,
        lg: "flex-start",
      }}
      align={{ base: "center", lg: "flex-start" }}
      border="1px solid"
      borderColor="text"
      padding={6}
      _hover={{
        background: isOpen ? color : "ednBackground",
        transition: isOpen ? "auto" : "transform 0.5s",
        transform: isOpen ? "auto" : "skewX(-5deg)",
        boxShadow: shadow,
      }}
    >
      {isOpen ? (
        <Emoji mb={8} text={emoji} fontSize="8xl" />
      ) : (
        <>
          <StyledEmoji emoji={emoji} />
          <Title title={title} />
        </>
      )}
      <div>
        {isOpen && (
          <div>
            <OpenTitle title={title} />
            <Body>{description}</Body>
            <Row>
              {pros && (
                <Column>
                  <Subtitle>{t("pros")}</Subtitle>

                  <Body>
                    <ul>
                      {pros.map((pro, idx) => (
                        <li key={idx}>{pro}</li>
                      ))}
                    </ul>
                  </Body>
                </Column>
              )}
              {cons && (
                <Column>
                  <Subtitle>{t("cons")}</Subtitle>
                  <Body>
                    <ul>
                      {cons.map((con, idx) => (
                        <li key={idx}>{con}</li>
                      ))}
                    </ul>
                  </Body>
                </Column>
              )}
            </Row>
            <div>
              <Subtitle>{t("example-projects")}</Subtitle>
              <Body>
                <ul>
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <InlineLink
                        key={idx}
                        href={link.url}
                        color="black300"
                        _hover={{
                          color: "black",
                        }}
                      >
                        {link.text}
                      </InlineLink>
                    </li>
                  ))}
                </ul>
              </Body>
            </div>
          </div>
        )}
      </div>
    </Flex>
  )
}

export interface IPropsBoxItem {
  description: string
  emoji: string
  title: string
  pros?: Array<string>
  cons?: Array<string>
  links: Array<ILink>
}

export type StablecoinBoxGridProps = {
  items: Array<IPropsBoxItem>
}

const StablecoinBoxGrid = ({ items }: StablecoinBoxGridProps) => {
  const [indexOpen, setOpenIndex] = useState<number>(0)
  const router = useRouter()

  // TODO generalize
  const handleSelect = (idx: number): void => {
    setOpenIndex(idx)
    if (isMobile()) {
      router.push(`/stablecoins/#type-${idx}`)
    }
  }

  return (
    <Box
      gridTemplateColumns="3fr 1fr"
      gridTemplateRows="3fr 3fr"
      borderRadius="sm"
      my={16}
      display={{ base: "flex", lg: "grid" }}
      flexDirection="column"
      maxW="100%"
    >
      {items.map((item, idx) => {
        const columnNumber = 1
        const rowNumber = 1
        const colorIdx = hashCode(item.emoji) % colors.length
        const color = colors[colorIdx]
        return (
          <GridItem
            key={idx}
            title={item.title}
            emoji={item.emoji}
            description={item.description}
            pros={item.pros}
            cons={item.cons}
            links={item.links}
            index={idx}
            columnNumber={columnNumber}
            rowNumber={rowNumber}
            isOpen={idx === indexOpen}
            callback={handleSelect}
            color={color}
          />
        )
      })}
    </Box>
  )
}

export default StablecoinBoxGrid
