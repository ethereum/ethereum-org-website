import { useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { ChildOnlyProp } from "@/lib/types"

import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { isMobile } from "../lib/utils/isMobile"

import Emoji from "./Emoji"

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
  "bg-yellow-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-orange-100",
  "bg-pink-300",
  "bg-purple-300",
]

interface ILink {
  url: string
  text: string
}

type GridItemProps = {
  description: string
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
  return <h3 className="mb-8 mt-0 text-3xl font-bold sm:text-4xl">{title}</h3>
}

const Title = ({ title }: { title: string }) => {
  return <h3 className="mb-8 mt-0 text-3xl font-normal sm:text-4xl">{title}</h3>
}

const Subtitle = ({ children }: ChildOnlyProp) => {
  return (
    <h4 className="mb-8 mt-0 border-b border-body-medium p-2 pb-4 text-2xl font-semibold sm:text-3xl">
      {children}
    </h4>
  )
}

const Body = ({ children }: ChildOnlyProp) => {
  return <div className="text-xl text-gray-600">{children}</div>
}

const StyledEmoji = ({ emoji }: { emoji: string }) => {
  return (
    <Emoji
      className="order-2 m-2 self-center text-8xl duration-500 hover:rotate-12"
      text={emoji}
    />
  )
}

const Row = ({ children }: ChildOnlyProp) => {
  return (
    <Flex className="mt-8 flex-col justify-between md:flex-row">
      {children}
    </Flex>
  )
}

const Column = ({ children }: ChildOnlyProp) => {
  return <div className="w-full">{children}</div>
}

const GridItem = ({
  description,
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
  const { t } = useTranslation("page-stablecoins")

  return (
    <Flex
      id={`type-${index}`}
      onClick={() => handleClick()}
      className={cn(
        "flex-col",
        isOpen
          ? `${color} col-start-1 row-start-1 row-end-[span_3] cursor-auto justify-start text-gray-600 transition sm:flex-col`
          : "col-start-auto row-start-auto row-end-auto cursor-pointer justify-between bg-background transition-transform duration-500 hover:skew-x-[-5deg] hover:bg-background-highlight sm:flex-row",
        "items-center border border-body p-6 hover:shadow-table-box lg:flex-col lg:items-start lg:justify-start"
      )}
    >
      {isOpen ? (
        <Emoji className="mb-8 text-8xl" text={emoji} />
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
                        className="text-gray-600 hover:text-gray-900"
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
    <div className="my-16 flex max-w-full flex-col rounded-sm lg:grid lg:grid-cols-[3fr_1fr] lg:grid-rows-[3fr_3fr]">
      {items.map((item, idx) => {
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
            isOpen={idx === indexOpen}
            callback={handleSelect}
            color={color}
          />
        )
      })}
    </div>
  )
}

export default StablecoinBoxGrid
