import React, { ReactNode } from "react"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { useQuery, gql } from "@apollo/client"
import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Img,
  TextProps,
} from "@chakra-ui/react"

import GitStars from "./GitStars"
import { ButtonLink } from "./Buttons"
import Text from "./OldText"
import GatsbyImage from "./GatsbyImage"

const REPO_DATA = gql`
  query RepoData(
    $repoOwner: String!
    $repoName: String!
    $repoLangCount: Int!
  ) {
    repository(owner: $repoOwner, name: $repoName) {
      stargazerCount
      languages(
        orderBy: { field: SIZE, direction: DESC }
        first: $repoLangCount
      ) {
        nodes {
          name
        }
      }
      url
    }
  }
`

const SubjectBadge: React.FC<{
  subject: string
  children: React.ReactNode
}> = ({ subject, children }) => {
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

export interface IProps {
  children?: React.ReactNode
  url: string
  background: string
  image: IGatsbyImageData | string
  name: string
  description?: ReactNode
  note?: string
  alt?: string
  githubUrl?: string
  repoLangCount?: number
  subjects?: Array<string>
  hideStars?: boolean
}

const ProductCard: React.FC<IProps> = ({
  url,
  background: bgProp,
  image,
  name,
  description,
  note = "",
  alt = "",
  children,
  githubUrl = "",
  repoLangCount = 1,
  subjects,
  hideStars = false,
}) => {
  const split = githubUrl.split("/")
  const repoOwner = split[split.length - 2]
  const repoName = split[split.length - 1]

  // TODO add loading state
  const { error, data } = useQuery(REPO_DATA, {
    variables: {
      repoOwner,
      repoName,
      repoLangCount,
    },
    skip: !githubUrl,
  })

  const hasRepoData = data && data.repository && !error

  const isImgSrc = typeof image === "string"

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
        {isImgSrc ? (
          <Img src={image} alt={alt} />
        ) : (
          <GatsbyImage
            image={image}
            alt={alt}
            objectFit="contain"
            width="100%"
            alignSelf="center"
            maxW={{ base: "311px", sm: "372px" }}
            maxH="257px"
          />
        )}
      </Center>
      <Flex flexDirection="column" p={6} textAlign="left" height="100%">
        {hasRepoData && (
          <GitStars gitHubRepo={data.repository} hideStars={hideStars} />
        )}
        <Heading
          as="h3"
          fontSize="2xl"
          fontWeight={600}
          mt={!hasRepoData ? 8 : 12}
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
        {hasRepoData &&
          data.repository.languages.nodes.map(
            ({ name }: { name: string }, idx: number) => (
              <SubjectBadge key={idx} subject={name}>
                {name.toUpperCase()}
              </SubjectBadge>
            )
          )}
      </HStack>
      <ButtonLink to={url} m={4} height={20}>
        Open {name}
      </ButtonLink>
    </Flex>
  )
}

export default ProductCard
