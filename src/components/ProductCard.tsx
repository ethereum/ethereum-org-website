import type { ImageProps } from "next/image"
import { useTranslation } from "next-i18next"
import type { ReactNode } from "react"
import { Badge } from "@chakra-ui/react"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "./ui/buttons/Button"
import { Center, Flex, HStack } from "./ui/flex"
import GitStars from "./GitStars"
import { TwImage } from "./Image"

type SubjectBadgeProps = {
  subject: string
  children: ReactNode
}

const SubjectBadge = ({ subject, children }: SubjectBadgeProps) => {
  const backgroundProp = () => {
    switch (subject) {
      case "Solidity":
        return "tagYellow"
      case "Vyper":
        return "tagBlue"
      case "web3":
        return "tagTurquoise"
      case "JavaScript":
        return "tagRed"
      case "TypeScript":
        return "tagBlue"
      case "Go":
        return "tagTurquoise"
      case "Python":
        return "tagMint"
      case "Rust":
        return "tagOrange"
      case "C#":
        return "tagBlue"
      case "Java":
        return "tagPink"
      default:
        return "tagGray"
    }
  }
  return (
    <Badge size="sm" textTransform="unset" background={backgroundProp()}>
      {children}
    </Badge>
  )
}

export type ProductCardProps = {
  children?: ReactNode
  url: string
  background: string
  image: ImageProps["src"]
  name: string
  description?: ReactNode
  note?: string
  alt?: string
  githubUrl?: string
  subjects?: Array<string>
  githubRepoStars?: number
  githubRepoLanguages?: Array<string>
  hideStars?: boolean
}

const ProductCard = ({
  url,
  background: bgProp,
  image,
  name,
  description,
  note = "",
  alt = "",
  children,
  githubUrl = "",
  subjects,
  githubRepoStars = 0,
  githubRepoLanguages = [],
  hideStars = false,
}: ProductCardProps) => {
  const { t } = useTranslation("common")

  return (
    <Flex
      className={cn(
        "flex-col justify-between bg-background-highlight",
        "rounded-base border no-underline",
        "hover:scale-[1.02] hover:transition-transform"
      )}
    >
      <Center className="min-h-[200px]" style={{ backgroundColor: bgProp }}>
        <TwImage src={image} alt={alt} height="100" className="self-center" />
      </Center>
      <Flex className="h-full flex-col p-6 text-left">
        {githubRepoStars > 0 && (
          <GitStars
            gitHubRepo={{ url: githubUrl, stargazerCount: githubRepoStars }}
            hideStars={hideStars}
          />
        )}
        <h3
          className={cn(
            "mb-3 text-2xl font-semibold",
            githubRepoStars > 0 ? "mt-8" : "mt-12"
          )}
        >
          {name}
        </h3>
        {description && (
          <p className="mb-2 text-sm leading-xs opacity-80">{description}</p>
        )}
        {note.length > 0 && (
          <p className="mb-2 text-sm leading-xs opacity-80">Note: {note}</p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </Flex>
      <HStack className="mb-2 mt-5 gap-3 px-6">
        {subjects &&
          subjects.map((subject, idx) => (
            <SubjectBadge key={idx} subject={subject}>
              {subject}
            </SubjectBadge>
          ))}
        {githubRepoLanguages.length > 0 &&
          githubRepoLanguages.map((name, idx: number) => (
            <SubjectBadge key={idx} subject={name}>
              {name.toUpperCase()}
            </SubjectBadge>
          ))}
      </HStack>
      <ButtonLink href={url} className="m-4 h-20">
        {t("open")} {name}
      </ButtonLink>
    </Flex>
  )
}

export default ProductCard
