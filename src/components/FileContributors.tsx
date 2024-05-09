import { useState } from "react"
import { useRouter } from "next/router"
import {
  Avatar,
  Flex,
  FlexProps,
  Heading,
  ListItem,
  ModalBody,
  ModalHeader,
  SkeletonText,
  UnorderedList,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"

import type { Author, Lang } from "@/lib/types"

import { Button } from "@/components/Buttons"
import InlineLink from "@/components/Link"
import Modal from "@/components/Modal"
import Text from "@/components/OldText"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"

// TODO: skeletons are not part of the DS, so these should be replaced once we
// implement the new designs. Thats the reason we haven't define these styles in
// the theme config file
const skeletonColorProps = {
  startColor: "lightBorder",
  endColor: "searchBackgroundEmpty",
}

const Skeleton = (props) => <SkeletonText {...skeletonColorProps} {...props} />

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
        me={2}
      />
      {contributor.user && (
        <InlineLink href={contributor.user.url}>
          @{contributor.user.login}
        </InlineLink>
      )}
      {!contributor.user && <span>{contributor.name}</span>}
    </ListItem>
  )
}

export type FileContributorsProps = FlexProps & {
  editPath?: string
  contributors: Author[]
  loading: boolean
  error?: boolean
  lastEdit: string
}

const FileContributors = ({
  contributors,
  loading,
  error,
  lastEdit,
  ...props
}: FileContributorsProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { locale } = useRouter()

  const isDesktop = useBreakpointValue({ base: false, md: true })

  if (error) return null
  const lastContributor: Author = contributors.length
    ? contributors[0]
    : {
        name: "",
        email: "",
        avatarUrl: "",
        user: {
          login: "",
          url: "",
        },
      }

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
          <Skeleton noOfLines="4" mt="4" isLoaded={!loading}>
            {contributors ? (
              <ContributorList>
                {contributors.map((contributor) => (
                  <Contributor
                    contributor={contributor}
                    key={contributor.email}
                  />
                ))}
              </ContributorList>
            ) : null}
          </Skeleton>
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
        <Flex me={4} alignItems="center" flex="1">
          {isDesktop && (
            <>
              <Avatar
                height="40px"
                width="40px"
                src={lastContributor.avatarUrl}
                name={lastContributor.name}
                me={2}
              />

              <Text m={0} color="text200">
                <Translation id="last-edit" />:{" "}
                {lastContributor.user?.url && (
                  <InlineLink href={lastContributor.user.url}>
                    @{lastContributor.user.login}
                  </InlineLink>
                )}
                {!lastContributor.user && <span>{lastContributor.name}</span>},{" "}
                {getLocaleTimestamp(locale as Lang, lastEdit)}
              </Text>
            </>
          )}
        </Flex>

        <VStack align="stretch" justifyContent="space-between" spacing={2}>
          <Button
            variant="outline"
            bg="background.base"
            border={0}
            mb={{ base: 4, md: 0 }}
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
        </VStack>
      </Flex>
    </>
  )
}

export default FileContributors
