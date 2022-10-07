import React, { useState } from "react"
import { Box, Container, Flex, Grid, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { useIntl } from "react-intl"
import Link, { navigate } from "./Link"
import Emoji from "./Emoji"
import Translation from "./Translation"
import { isMobile } from "../utils/isMobile"

const OpenTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 2rem;
  }
`

const Title = styled.h3`
  font-size: 2.5rem;
  font-weight: 400;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 2rem;
  }
`

const Subtitle = styled.h4`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0rem;
  padding: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.black300};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 1.5rem;
  }
`

const Body = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.black300};
`

const OldGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 3fr 3fr;
  margin: 4rem 0rem;
  border-radius: 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: flex;
    flex-direction: column;
  }
`

const StyledEmoji = styled(Emoji)<{
  isOpen?: boolean
}>`
  order: ${(props) => (props.isOpen ? `1` : `2`)};
  margin: 0.5rem;
  align-self: center;
  &:hover {
    transition: transform 50s;
    transform: rotate(10turn);
  }
`

const Row = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const Column = styled.div`
  width: 100%;
`

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.black300};
  &:hover {
    color: ${(props) => props.theme.colors.black};
  }
`

const OldBox = styled.div<{
  isOpen: boolean
  columnNumber: number
  rowNumber: number
  color: string
}>`
  grid-row-start: ${(props) => (props.isOpen ? props.rowNumber : `auto`)};
  grid-row-end: ${(props) => (props.isOpen ? `span 3` : `auto`)};
  grid-column-start: ${(props) => (props.isOpen ? props.columnNumber : `auto`)};
  color: ${(props) =>
    props.isOpen ? props.theme.colors.black300 : props.theme.colors.text};
  cursor: ${(props) => (props.isOpen ? `auto` : `pointer`)};
  background: ${(props) =>
    props.isOpen
      ? props.theme.colors[props.color]
      : props.theme.colors.background};
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 1.5rem;
  &:hover {
    background: ${(props) =>
      props.isOpen
        ? props.theme.colors[props.color]
        : props.theme.colors.ednBackground};
    transition: ${(props) => (props.isOpen ? `auto` : `transform 0.5s`)};
    transform: ${(props) => (props.isOpen ? `auto` : `skewX(-5deg)`)};
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: ${(props) => (props.isOpen ? `column` : `row`)};
    justify-content: ${(props) =>
      props.isOpen ? `flex-start` : `space-between`};
    align-items: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
`

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

interface IPropsGridItem {
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

const GridItem: React.FC<IPropsGridItem> = ({
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
}) => {
  const handleClick = (): void => {
    callback(index)
  }
  {
    /**

const OldBox = styled.div<{
  isOpen: boolean
  columnNumber: number
  rowNumber: number
  color: string
}>`
  grid-row-start: ${(props) => (props.isOpen ? props.rowNumber : `auto`)};
  grid-row-end: ${(props) => (props.isOpen ? `span 3` : `auto`)};
  grid-column-start: ${(props) => (props.isOpen ? props.columnNumber : `auto`)};
  color: ${(props) =>
    props.isOpen ? props.theme.colors.black300 : props.theme.colors.text};
  cursor: ${(props) => (props.isOpen ? `auto` : `pointer`)};
  background: ${(props) =>
    props.isOpen
      ? props.theme.colors[props.color]
      : props.theme.colors.background};
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 1.5rem;
  &:hover {
    background: ${(props) =>
      props.isOpen
        ? props.theme.colors[props.color]
        : props.theme.colors.ednBackground};
    transition: ${(props) => (props.isOpen ? `auto` : `transform 0.5s`)};
    transform: ${(props) => (props.isOpen ? `auto` : `skewX(-5deg)`)};
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: ${(props) => (props.isOpen ? `column` : `row`)};
    justify-content: ${(props) =>
      props.isOpen ? `flex-start` : `space-between`};
    align-items: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
  base to sm
`*/
  }
  return (
    <Flex
      id={`type-${index}`}
      onClick={() => handleClick()}
      gridRowStart={isOpen ? rowNumber : `auto`}
      gridRowEnd={isOpen ? `span 3` : `auto`}
      gridColumnStart={isOpen ? columnNumber : `auto`}
      color={isOpen ? "black300" : "text"}
      cursor={isOpen ? `auto` : `pointer`}
      background={isOpen ? `${color}` : "background"}
      direction={{
        base: "column",
        sm: `${isOpen ? "column" : "row"}`,
        lg: "column",
      }}
      justify={{ base: `${isOpen ? "flex-start" : "space-between"}` }}
      align="center"
      border="1px solid"
      borderColor="text"
      padding={6}
      _hover={{
        background: `${isOpen ? color : "ednBackground"}`,
        transition: `${isOpen ? "auto" : "transform 0.5s"}`,
        transform: `${isOpen ? "auto" : "skewX(-5deg)"}`,
        boxShadow: "tableBoxShadow",
      }}
    >
      {isOpen ? (
        <Emoji mb={8} text={emoji} fontSize="8xl" w="100%" />
      ) : (
        <>
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
          <Text
            fontSize={{ base: "2rem", sm: "2.5rem" }}
            fontWeight={400}
            marginTop={0}
          >
            {title}
          </Text>
        </>
      )}
      <div>
        {isOpen && (
          <div>
            <Text
              fontSize={{ base: "2rem", sm: "2.5rem" }}
              fontWeight={700}
              marginTop={0}
            >
              {title}
            </Text>
            <Box fontSize="xl" lineHeight="140%" color="black300">
              {description}
            </Box>
            <Flex
              justify="space-between"
              marginTop={8}
              direction={{ base: "column", md: "row" }}
            >
              {pros && (
                <Box w="100%">
                  <Text
                    fontSize={{ base: "2xl", sm: "2rem" }}
                    fontWeight={600}
                    marginTop={0}
                    padding={2}
                    paddingBottom={4}
                    borderBottom="1px solid"
                    borderColor="black300"
                  >
                    <Translation id="pros" />
                  </Text>

                  <Box fontSize="xl" lineHeight="140%" color="black300">
                    <ul>
                      {pros.map((pro, idx) => (
                        <li key={idx}>{pro}</li>
                      ))}
                    </ul>
                  </Box>
                </Box>
              )}
              {cons && (
                <Box w="100%">
                  <Text
                    fontSize={{ base: "1.5rem", sm: "2rem" }}
                    fontWeight={600}
                    marginTop="0rem"
                    padding="0.5rem"
                    paddingBottom="1rem"
                    borderBottom="1px solid"
                    borderColor="black300"
                  >
                    <Translation id="cons" />
                  </Text>
                  <Box fontSize="xl" lineHeight="140%" color="black300">
                    <ul>
                      {cons.map((con, idx) => (
                        <li key={idx}>{con}</li>
                      ))}
                    </ul>
                  </Box>
                </Box>
              )}
            </Flex>
            <div>
              <Text
                fontSize={{ base: "1.5rem", sm: "2rem" }}
                fontWeight={600}
                marginTop="0rem"
                padding="0.5rem"
                paddingBottom="1rem"
                borderBottom="1px solid"
                borderColor="black300"
              >
                <Translation id="example-projects" />
              </Text>
              <Box fontSize="xl" lineHeight="140%" color="black300">
                <ul>
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        key={idx}
                        to={link.url}
                        color="black300"
                        _hover={{
                          color: "black",
                        }}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
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

export interface IProps {
  items: Array<IPropsBoxItem>
}

const StablecoinBoxGrid: React.FC<IProps> = ({ items }) => {
  const intl = useIntl()
  const [indexOpen, setOpenIndex] = useState<number>(0)

  // TODO generalize
  const handleSelect = (idx: number): void => {
    setOpenIndex(idx)
    if (isMobile()) {
      navigate(`/stablecoins/#type-${idx}`, intl)
    }
  }

  return (
    <Container
      gridTemplateColumns={"3fr 1fr"}
      gridTemplateRows={"3fr 3fr"}
      borderRadius="2px"
      margin={0}
      padding={6}
      display={{ base: "flex", lg: "grid" }}
      flexDirection="column"
      maxW="100%"
    >
      {items.map((item, idx) => {
        let columnNumber = 1
        let rowNumber = 1
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
    </Container>
  )
}

export default StablecoinBoxGrid
