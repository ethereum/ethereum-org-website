import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { useQuery, gql } from "@apollo/client"

import GitStars from "./GitStars"
import ButtonLink from "./ButtonLink"
import { Badge } from "@chakra-ui/react"

const ImageWrapper = styled.div<{
  background: string
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.background};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  min-height: 200px;
`

const Image = styled(GatsbyImage)`
  width: 100%;
  align-self: center;
  max-width: 372px;
  max-height: 257px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 311px;
  }
`

const Card = styled.div`
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-decoration: none;
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Content = styled.div`
  padding: 1.5rem;
  text-align: left;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3<{
  gitHidden: boolean
}>`
  margin-top: ${(props) => (props.gitHidden ? "2rem" : "3rem")};
  margin-bottom: 0.75rem;
`

const Description = styled.p`
  opacity: 0.8;
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-bottom: 0.5rem;
  line-height: 140%;
`

const SubjectContainer = styled.div`
  margin-top: 1.25rem;
  padding: 0 1.5rem;
`

const StyledButtonLink = styled(ButtonLink)`
  margin: 1rem;
`

const Children = styled.div`
  margin-top: 1rem;
`

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

const Subjectbadge: React.FC<{
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
    <Badge
      background={backgroundProp()}
      py={0}
      me={3}
      mb={2}
      textTransform="initial"
    >
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
  background,
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

  return (
    <Card>
      <ImageWrapper background={background}>
        {isImgSrc ? (
          <img src={image} alt={alt} />
        ) : (
          <Image image={image} alt={alt} objectFit="contain" />
        )}
      </ImageWrapper>
      <Content className="hover">
        <div>
          {hasRepoData && (
            <GitStars gitHubRepo={data.repository} hideStars={hideStars} />
          )}
          <Title gitHidden={!hasRepoData}>{name}</Title>
          <Description>{description}</Description>
          {note.length > 0 && <Description>Note: {note}</Description>}
        </div>
        {children && <Children>{children}</Children>}
      </Content>
      <SubjectContainer>
        {subjects &&
          subjects.map((subject, idx) => (
            <Subjectbadge key={idx} subject={subject}>
              {subject}
            </Subjectbadge>
          ))}
        {hasRepoData &&
          data.repository.languages.nodes.map(
            ({ name }: { name: string }, idx: number) => (
              <Subjectbadge key={idx} subject={name}>
                {name.toUpperCase()}
              </Subjectbadge>
            )
          )}
      </SubjectContainer>
      <StyledButtonLink h={20} to={url}>
        Open {name}
      </StyledButtonLink>
    </Card>
  )
}

export default ProductCard
