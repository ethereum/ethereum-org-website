"use client"

import { BaseHTMLAttributes, useState } from "react"

import type { ChildOnlyProp, FileContributor } from "@/lib/types"

import Translation from "@/components/Translation"
import { Button } from "@/components/ui/buttons/Button"
import { Center, Flex } from "@/components/ui/flex"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { ScrollArea } from "@/components/ui/scroll-area"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { Avatar } from "./ui/avatar"
import Modal from "./ui/dialog-modal"
import { LinkBox, LinkOverlay } from "./ui/link-box"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

const ContributorList = ({ children }: Required<ChildOnlyProp>) => (
  <ScrollArea className="h-64 w-full">
    <UnorderedList className="m-0">{children}</UnorderedList>
  </ScrollArea>
)

const ContributorAvatar = ({
  contributor,
  label,
  className,
}: ContributorProps & { label?: string; className?: string }) => (
  <Avatar
    src={contributor.avatar_url}
    name={contributor.login}
    href={
      contributor.html_url.includes("crowdin.com")
        ? contributor.html_url
        : "https://github.com/" + contributor.login
    }
    // `size-10` is not part of the "size" variants
    className={cn("size-10", className)}
    label={label}
  />
)

const ContributorAvatarGroup = ({
  contributors,
}: {
  contributors: FileContributor[]
}) => {
  if (!contributors.length) return null

  const maxVisibleAvatars = contributors.length >= 3 ? 3 : contributors.length
  const remainingCount = contributors.length > 3 ? contributors.length - 3 : 0

  return (
    <Flex className="items-center">
      {contributors.slice(0, maxVisibleAvatars).map((contributor, index) => (
        <div
          key={contributor.login}
          className="pointer-events-none -me-3 flex"
          style={{ zIndex: maxVisibleAvatars - index }}
        >
          <ContributorAvatar contributor={contributor} />
        </div>
      ))}
      {remainingCount > 0 && (
        <Center className="-me-2 size-10 rounded-full bg-primary ps-1 text-sm text-body-inverse">
          +{remainingCount}
        </Center>
      )}
    </Flex>
  )
}

type ContributorProps = { contributor: FileContributor }
const Contributor = ({ contributor }: ContributorProps) => (
  <ListItem className="flex items-center p-2">
    <ContributorAvatar
      contributor={contributor}
      label={"@" + contributor.login}
    />
    {contributor.html_url.includes("crowdin.com") && (
      <p className="ms-5 text-body-medium">
        <Translation id="translator" />
      </p>
    )}
  </ListItem>
)

type FlexProps = BaseHTMLAttributes<HTMLDivElement> & { asChild?: boolean }
export type FileContributorsProps = FlexProps & {
  contributors: FileContributor[]
  lastEditLocaleTimestamp: string
  className?: string
}

const FileContributors = ({
  contributors,
  lastEditLocaleTimestamp,
  className,
  ...props
}: FileContributorsProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
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

      <Flex
        className={cn("flex-col p-0 md:flex-row md:p-2", className)}
        {...props}
      >
        <Flex className="my-4 me-4 flex-1 flex-col items-start lg:mb-0">
          <p className="mb-2 text-body-medium">
            <Translation id="page-last-update" /> {lastEditLocaleTimestamp}
          </p>
          <LinkBox className="flex">
            <ContributorAvatarGroup contributors={contributors} />
            <LinkOverlay asChild>
              <Button
                variant="ghost"
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
            </LinkOverlay>
          </LinkBox>
        </Flex>
      </Flex>
    </>
  )
}

export default FileContributors
