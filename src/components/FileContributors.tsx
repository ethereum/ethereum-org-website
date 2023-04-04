import React, { useState } from "react"

import { useI18next } from "gatsby-plugin-react-i18next"
import { useQuery, gql } from "@apollo/client"

import {
  Avatar,
  ButtonProps,
  ChakraProps,
  Flex,
  Icon,
  ListItem,
  ModalBody,
  ModalHeader,
  Skeleton,
  SkeletonCircle,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"

import { getLocaleTimestamp } from "../utils/time"
import { Lang } from "../utils/languages"

import ButtonLink from "./ButtonLink"
import Link, { IProps as ILinkProps } from "./Link"
import Modal from "./Modal"
import Translation from "./Translation"
import Button from "./Button"

interface Author {
  name: string
  email: string
  avatarUrl: string
  user: {
    login: string
    url: string
  }
}

interface Commit {
  author: Author
  committedDate: string
}

const COMMIT_HISTORY = gql`
  query CommitHistory($relativePath: String) {
    repository(name: "ethereum-org-website", owner: "ethereum") {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            id
            history(path: $relativePath) {
              edges {
                node {
                  author {
                    name
                    email
                    avatarUrl(size: 100)
                    user {
                      login
                      url
                    }
                  }
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`

const ContributorsButton = ({
  children,
  ...props
}: {
  children: React.ReactNode
} & ButtonProps) => {
  return (
    <Button
      m={0}
      variant="outline"
      border={0}
      color="text"
      bgColor="background"
      p="md"
      mt="1rem"
      mb="0.5rem"
      justifyContent="center"
      height="40px"
      {...props}
    >
      {children}
    </Button>
  )
}

const GithubButton = ({ ...props }: ILinkProps & ButtonProps) => {
  return (
    <ButtonLink
      mt={0}
      p="0.5rem"
      height="40%"
      display={{ base: "block", lg: "none" }}
      {...props}
    />
  )
}

const ContributorList = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnorderedList maxH="16rem" m={0} mt="1.5rem" overflowY="scroll">
      {children}
    </UnorderedList>
  )
}

const Contributor = ({ contributor }: { contributor: Author }) => {
  return (
    <ListItem p="0.5rem" display="flex" alignItems="center">
      <Avatar
        height="40px"
        width="40px"
        src={contributor.avatarUrl}
        name={contributor.name}
        mr="0.5rem"
      />
      {contributor.user && (
        <Link to={contributor.user.url}>@{contributor.user.login}</Link>
      )}
      {!contributor.user && <span>{contributor.name}</span>}
    </ListItem>
  )
}

const LeftContent = ({
  children,
  ...props
}: { children: React.ReactNode } & ChakraProps) => {
  return (
    <Flex
      w="100%"
      mr="1rem"
      alignItems="center"
      fontSize={{
        base: "sm",
        md: "unset",
      }}
      {...props}
    >
      {children}
    </Flex>
  )
}

export interface IProps {
  relativePath: string
  editPath?: string
}

const FileContributors: React.FC<IProps> = ({
  relativePath,
  editPath,
  ...props
}) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { language } = useI18next()

  const { loading, error, data } = useQuery(COMMIT_HISTORY, {
    variables: { relativePath },
  })

  if (error) return null

  const commits: Array<Commit> =
    data?.repository?.ref?.target?.history?.edges?.map((commit) => commit.node)

  const lastCommit = commits?.[0] || {}
  const lastContributor = lastCommit?.author || {}
  const uniqueContributors =
    commits?.reduce(
      (res: Array<Author>, cur: Commit) => {
        if (cur.author.user === null) {
          return res
        }
        for (const contributor of res) {
          const hasAuthorInfo = !!contributor.user && !!cur.author.user
          if (
            hasAuthorInfo &&
            contributor.user.login === cur.author.user.login
          ) {
            return res
          }
        }
        res.push(cur.author)
        return res
      },
      [lastContributor]
    ) || []

  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen} {...props}>
        <ModalHeader py={0}>
          <Text as="h2" m={0}>
            <Translation id="contributors" />
          </Text>
        </ModalHeader>

        <ModalBody>
          <Translation id="contributors-thanks" />

          <ContributorList>
            {uniqueContributors.map((contributor) => (
              <Contributor contributor={contributor} key={contributor.email} />
            ))}
          </ContributorList>
        </ModalBody>
      </Modal>

      <Flex
        justifyContent="space-between"
        direction={{
          base: "column",
          md: "row",
        }}
        pb={{
          base: "2rem",
          lg: 0,
        }}
      >
        <LeftContent>
          <SkeletonCircle size="10" mr="0.5rem" isLoaded={!loading}>
            <Avatar
              height="40px"
              width="40px"
              src={lastContributor.avatarUrl}
              name={lastContributor.name}
              mr="0.5rem"
            />
          </SkeletonCircle>

          <Skeleton isLoaded={!loading} w="100%" alignSelf="stretch">
            <Flex
              h="100%"
              alignItems="center"
              lineHeight="130%"
              color="text200"
            >
              <Translation id="last-edit" />:{" "}
              {lastContributor.user && (
                <Link to={lastContributor.user.url}>
                  @{lastContributor.user.login}
                </Link>
              )}
              {!lastContributor.user && <span>{lastContributor.name}</span>},{" "}
              {getLocaleTimestamp(language as Lang, lastCommit.committedDate)}
            </Flex>
          </Skeleton>
        </LeftContent>

        <Flex direction="column" alignContent="center">
          <Skeleton
            isLoaded={!loading}
            my={{
              base: "1rem",
              md: 0,
            }}
          >
            <ContributorsButton onClick={() => setModalOpen(true)} w="100%">
              <Translation id="see-contributors" />
            </ContributorsButton>
          </Skeleton>

          {editPath && (
            <GithubButton to={editPath} hideArrow variant="outline">
              <Flex
                h="100%"
                alignItems="center"
                justifyContent="center"
                gap="2"
              >
                <Icon as={FaGithub} />
                <span>
                  <Translation id="edit-page" />
                </span>
              </Flex>
            </GithubButton>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default FileContributors
