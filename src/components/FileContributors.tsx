import { useState } from "react"
import {
  Avatar,
  Flex,
  FlexProps,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"

import type { ChildOnlyProp, FileContributor } from "@/lib/types"

import { Button } from "@/components/Buttons"
import InlineLink from "@/components/Link"
import Modal from "@/components/Modal"
import Text from "@/components/OldText"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

const ContributorList = ({ children }: Required<ChildOnlyProp>) => (
  <UnorderedList maxH="2xs" m={0} mt={6} overflowY="scroll">
    {children}
  </UnorderedList>
)

type ContributorProps = { contributor: FileContributor }
const Contributor = ({ contributor }: ContributorProps) => (
  <ListItem p={2} display="flex" alignItems="center">
    <Avatar
      height="40px"
      width="40px"
      src={contributor.avatar_url}
      name={contributor.login}
      me={2}
    />
    <InlineLink href={"https://github.com/" + contributor.login}>
      @{contributor.login}
    </InlineLink>
  </ListItem>
)

export type FileContributorsProps = FlexProps & {
  contributors: FileContributor[]
  lastEditLocaleTimestamp: string
}

const FileContributors = ({
  contributors,
  lastEditLocaleTimestamp,
  ...props
}: FileContributorsProps) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const lastContributor: FileContributor = contributors.length
    ? contributors[0]
    : ({
        avatar_url: "",
        login: "",
        html_url: "",
        date: Date.now().toString(),
      } as FileContributor)

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        size={{ base: "full", md: "xl" }}
        title={<Translation id="contributors" />}
      >
        <Translation id="contributors-thanks" />
        <ContributorList>
          {contributors.map((contributor) => (
            <Contributor contributor={contributor} key={contributor.login} />
          ))}
        </ContributorList>
      </Modal>

      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        p={{ base: 0, md: 2 }}
        {...props}
      >
        <Flex me={4} alignItems="center" flex="1" hideBelow="md">
          <Avatar
            height="40px"
            width="40px"
            src={lastContributor.avatar_url}
            name={lastContributor.login}
            me={2}
          />

          <Text m={0} color="text200">
            <Translation id="last-edit" />:{" "}
            <InlineLink href={"https://github.com/" + lastContributor.login}>
              @{lastContributor.login}
            </InlineLink>
            , {lastEditLocaleTimestamp}
          </Text>
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
