import type { GHIssue } from "@/lib/types"

import Emoji from "@/components/Emoji"

import { cn } from "@/lib/utils/cn"

import { getGFIs } from "@/data-layer"

import { Avatar } from "../ui/avatar"
import { Flex, HStack, Stack } from "../ui/flex"
import InlineLink from "../ui/Link"
import { Tag } from "../ui/tag"

type IssuesListProps = {
  className?: string
}

const IssuesList = async ({ className }: IssuesListProps) => {
  let issues: GHIssue[] = []
  try {
    issues = (await getGFIs()) ?? []
  } catch (error) {
    console.warn("Failed to fetch GFIs for IssuesList:", error)
  }

  return (
    <div
      className={cn("my-7 grid gap-4 sm:grid-cols-1 lg:grid-cols-2", className)}
    >
      {issues.map((issue) => (
        <Stack
          className="gap-4 rounded-md border border-border p-4"
          key={issue.title}
        >
          <Stack className="gap-2">
            <HStack className="gap-2">
              <Avatar
                name={issue.user.login}
                src={issue.user.avatar_url}
                size="sm"
                href={`https://github.com/${issue.user.login}`}
              />
              <p className="text-sm">by {issue.user.login}</p>
            </HStack>

            <InlineLink
              href={issue.html_url}
              className="no-underline hover:underline"
            >
              {issue.title}
            </InlineLink>
          </Stack>
          <Flex className="flex-wrap gap-1">
            {issue.labels.map((label) => {
              return (
                <Tag key={label.id} variant="outline">
                  <Emoji text={label.name} />
                </Tag>
              )
            })}
          </Flex>
        </Stack>
      ))}
    </div>
  )
}

export default IssuesList
