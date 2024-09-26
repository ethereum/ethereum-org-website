import React, { ReactNode } from "react"
import { useTranslation } from "next-i18next"
import { Box, Center, Flex, Heading, HStack, TextProps } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import { Image, type ImageProps } from "@/components/Image"
import Text from "@/components/OldText"

import { Tag } from "./ui/tag"
import GitStars from "./GitStars"

type SubjectBadgeProps = {
  subject: string
  children: React.ReactNode
}

const SubjectBadge = ({ subject, children }: SubjectBadgeProps) => {
  const backgroundProp = () => {
    switch (subject) {
      case "Solidity":
        return "warning"
      case "Vyper":
        return "tag"
      case "web3":
        return "success"
      case "JavaScript":
        return "error"
      case "TypeScript":
        return "tag"
      case "Go":
        return "tag"
      case "Python":
        return "error"
      case "Rust":
        return "warning"
      case "C#":
        return "tag"
      case "Java":
        return "error"
      default:
        return "normal"
    }
  }
  return <Tag status={backgroundProp()}>{children}</Tag>
}

export type ProductCardProps = {
  children?: React.ReactNode
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
  const DESCRIPTION_STYLES: TextProps = {
    opacity: 0.8,
    fontSize: "sm",
    mb: 2,
    lineHeight: "140%",
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      color="text"
      background="searchBackground"
      boxShadow="0px 14px 66px rgba(0, 0, 0, 0.07)"
      borderRadius="base"
      border="1px"
      borderColor="lightBorder"
      textDecoration="none"
      _hover={{
        transition: "transform 0.1s",
        transform: "scale(1.02)",
      }}
    >
      <Center
        background={bgProp}
        boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
        minH="200px"
      >
        <Image
          src={image}
          alt={alt}
          height="100"
          alignSelf="center"
          maxW={{ base: "311px", sm: "372px" }}
          maxH="257px"
        />
      </Center>
      <Flex flexDirection="column" p={6} textAlign="start" height="100%">
        {githubRepoStars > 0 && (
          <GitStars
            gitHubRepo={{ url: githubUrl, stargazerCount: githubRepoStars }}
            hideStars={hideStars}
          />
        )}
        <Heading
          as="h3"
          fontSize="2xl"
          fontWeight={600}
          mt={githubRepoStars > 0 ? 8 : 12}
          mb={3}
        >
          {name}
        </Heading>
        {description && <Text {...DESCRIPTION_STYLES}>{description}</Text>}
        {note.length > 0 && <Text {...DESCRIPTION_STYLES}>Note: {note}</Text>}
        {children && <Box mt={4}>{children}</Box>}
      </Flex>
      <HStack mt={5} mb={2} px={6} spacing={3}>
        {subjects &&
          subjects.map((subject, idx) => (
            <SubjectBadge key={idx} subject={subject}>
              {subject}
            </SubjectBadge>
          ))}
        {githubRepoLanguages.length &&
          githubRepoLanguages.map((name, idx: number) => (
            <SubjectBadge key={idx} subject={name}>
              {name.toUpperCase()}
            </SubjectBadge>
          ))}
      </HStack>
      <ButtonLink href={url} m={4} height={20}>
        {t("open")} {name}
      </ButtonLink>
    </Flex>
  )
}

export default ProductCard
