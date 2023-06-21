import React, { useState } from "react"

import { useI18next } from "gatsby-plugin-react-i18next"
import { useQuery, gql } from "@apollo/client"

import {
  Avatar,
  Flex,
  FlexProps,
  Heading,
  Icon,
  ListItem,
  ModalBody,
  ModalHeader,
  Show,
  Skeleton as ChakraSkeleton,
  SkeletonCircle as ChakraSkeletonCircle,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"

import { getLocaleTimestamp } from "../utils/time"
import { trackCustomEvent } from "../utils/matomo"
import { Lang } from "../utils/languages"

import ButtonLink from "./ButtonLink"
import Link from "./Link"
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

// TODO: skeletons are not part of the DS, so these should be replaced once we
// implement the new designs. Thats the reason we haven't define these styles in
// the theme config file
const skeletonColorProps = {
  startColor: "lightBorder",
  endColor: "searchBackgroundEmpty",
}

const Skeleton = (props) => (
  <ChakraSkeleton {...skeletonColorProps} borderRadius="md" {...props} />
)

const SkeletonCircle = (props) => (
  <ChakraSkeletonCircle {...skeletonColorProps} {...props} />
)

const ContributorList = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnorderedList maxH="2xs" m={0} mt={6} overflowY="scroll">
      {children}
    </UnorderedList>
  )
}

const Contributor = ({ contributor }: { contributor: Author }) => {
  return (
    <ListItem p={2} display="flex" alignItems="center">
      <Avatar
        height="40px"
        width="40px"
        src={contributor.avatarUrl}
        name={contributor.name}
        mr={2}
      />
      {contributor.user && (
        <Link to={contributor.user.url}>@{contributor.user.login}</Link>
      )}
      {!contributor.user && <span>{contributor.name}</span>}
    </ListItem>
  )
}

export interface IProps extends FlexProps {
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
      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <ModalHeader py={0}>
          <Heading m={0}>
            <Translation id="contributors" />
          </Heading>
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
        direction={{
          base: "column",
          md: "row",
        }}
        p={{ base: 0, md: 2 }}
        {...props}
      >
        <Flex mr={4} alignItems="center" flex="1">
          <SkeletonCircle size="10" mr={2} isLoaded={!loading}>
            <Avatar
              height="40px"
              width="40px"
              src={lastContributor.avatarUrl}
              name={lastContributor.name}
              mr={2}
            />
          </SkeletonCircle>

          <Skeleton isLoaded={!loading}>
            <Text m={0} color="text200">
              <Translation id="last-edit" />:{" "}
              {lastContributor.user && (
                <Link to={lastContributor.user.url}>
                  @{lastContributor.user.login}
                </Link>
              )}
              {!lastContributor.user && <span>{lastContributor.name}</span>},{" "}
              {getLocaleTimestamp(language as Lang, lastCommit.committedDate)}
            </Text>
          </Skeleton>
        </Flex>

        <VStack align="stretch" justifyContent="space-between" spacing={2}>
          <Skeleton isLoaded={!loading} mt={{ base: 4, md: 0 }}>
            <Button
              variant="outline"
              bg="background.base"
              border={0}
              onClick={() => {
                setModalOpen(true)
                trackCustomEvent({
                  eventCategory: "see contributors",
                  eventAction: "click",
                  eventName: "click",
                })
              }}
              w={{ base: "full", md: "inherit" }}
            >
              <Translation id="see-contributors" />
            </Button>
          </Skeleton>

          {editPath && (
            <Show below="l">
              {/* TODO: switch `l` to `lg` after UI migration and use `hideBelow` prop */}
              <ButtonLink to={editPath} hideArrow variant="outline">
                <Flex
                  h="100%"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Icon as={FaGithub} fontSize="2xl" />
                  <span>
                    <Translation id="edit-page" />
                  </span>
                </Flex>
              </ButtonLink>
            </Show>
          )}
        </VStack>
      </Flex>
    </>
  )
}

export default FileContributors
