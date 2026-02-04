import Emoji from "react-emoji-render"

import type { GHIssue } from "@/lib/types"

import { Flex, HStack, Stack } from "@/components/atoms/flex"
import InlineLink from "@/components/atoms/Link"
import { Tag } from "@/components/atoms/tag"
import { Avatar } from "@/components/ui/avatar"

import { cn } from "@/lib/utils/cn"

type IssuesListProps = {
  issues: GHIssue[]
  className?: string
}

const IssuesList = ({ issues, className }: IssuesListProps) => {
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
