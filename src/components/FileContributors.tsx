import { BaseHTMLAttributes, useState } from "react"

import type { ChildOnlyProp, FileContributor } from "@/lib/types"

import Translation from "@/components/Translation"
import { Button } from "@/components/ui/buttons/Button"
import { Flex, VStack } from "@/components/ui/flex"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { ScrollArea } from "@/components/ui/scroll-area"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { Avatar } from "./ui/avatar"
import Modal from "./ui/dialog-modal"
import InlineLink from "./ui/Link"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

const ContributorList = ({ children }: Required<ChildOnlyProp>) => (
  <ScrollArea className="h-64 w-full">
    <UnorderedList className="m-0">{children}</UnorderedList>
  </ScrollArea>
)

const ContributorAvatar = ({
  contributor,
  label,
}: ContributorProps & { label?: string }) => (
  <Avatar
    src={contributor.avatar_url}
    name={contributor.login}
    href={`https://github.com/${contributor.login}`}
    // `size-10` is not part of the "size" variants
    className="me-2 size-10"
    label={label}
  />
)

type ContributorProps = { contributor: FileContributor }
const Contributor = ({ contributor }: ContributorProps) => (
  <ListItem className="flex items-center p-2">
    <ContributorAvatar
      contributor={contributor}
      label={"@" + contributor.login}
    />
  </ListItem>
)

type FlexProps = BaseHTMLAttributes<HTMLDivElement> & { asChild?: boolean }
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

  const modalSize = useBreakpointValue({ base: "xl", md: "md" } as const)

  return (
    <>
      <Modal
        open={isModalOpen}
        onOpenChange={(open) => setModalOpen(open)}
        size={modalSize}
        title={<Translation id="contributors" />}
      >
        <div className="space-y-4">
          <p>
            <Translation id="contributors-thanks" />
          </p>
          <ContributorList>
            {contributors.map((contributor) => (
              <Contributor contributor={contributor} key={contributor.login} />
            ))}
          </ContributorList>
        </div>
      </Modal>

      <Flex className="flex-col p-0 md:flex-row md:p-2" {...props}>
        <Flex className="invisible me-4 flex-1 items-center md:visible md:flex">
          <ContributorAvatar contributor={lastContributor} />

          <p className="m-0 text-body-medium">
            <Translation id="last-edit" />:{" "}
            <InlineLink href={"https://github.com/" + lastContributor.login}>
              @{lastContributor.login}
            </InlineLink>
            , {lastEditLocaleTimestamp}
          </p>
        </Flex>

        <VStack className="items-stretch justify-between space-y-2">
          <Button
            className="md:w-inherit mb-4 w-full border-none bg-background md:mb-0"
            variant="outline"
            onClick={() => {
              setModalOpen(true)
              trackCustomEvent({
                eventCategory: "see contributors",
                eventAction: "click",
                eventName: "click",
              })
            }}
          >
            <Translation id="see-contributors" />
          </Button>
        </VStack>
      </Flex>
    </>
  )
}

export default FileContributors
