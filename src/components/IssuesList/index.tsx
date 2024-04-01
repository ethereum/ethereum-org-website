import Emoji from "react-emoji-render"
import {
  Avatar,
  ColorMode,
  Flex,
  HStack,
  SimpleGrid,
  SimpleGridProps,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react"

import type { GHIssue } from "@/lib/types"

import { getContrastYIQ } from "@/lib/utils/getContrastYIQ"

import InlineLink from "../Link"
import Tag from "../Tag"

type IssuesListProps = SimpleGridProps & {
  issues: GHIssue[]
}

function pickTagColorsByColorMode(color: string, colorMode: ColorMode) {
  if (colorMode === "dark") {
    return {
      color: getContrastYIQ(`#${color}`),
      bgColor: `#${color}90`,
    }
  } else {
    return {
      color: getContrastYIQ(`#${color}`),
      bgColor: `#${color}`,
    }
  }
}

const IssuesList = ({ issues, ...props }: IssuesListProps) => {
  const { colorMode } = useColorMode()

  return (
    <SimpleGrid columns={[1, null, 2]} spacing={4} {...props}>
      {issues.map((issue) => (
        <Stack
          key={issue.title}
          p={4}
          spacing={4}
          border="1px solid"
          borderColor="body.light"
          borderRadius="md"
        >
          <Stack spacing={2}>
            <HStack spacing={2}>
              <Avatar
                name={issue.user.login}
                src={issue.user.avatar_url}
                w="32px"
                h="32px"
              />
              <Text>by {issue.user.login}</Text>
            </HStack>

            <InlineLink href={issue.html_url} textDecor="none">
              {issue.title}
            </InlineLink>
          </Stack>
          <Flex flexWrap="wrap" gap="1">
            {issue.labels.map((label) => {
              return (
                <Tag
                  key={label.id}
                  label={<Emoji text={label.name} />}
                  {...pickTagColorsByColorMode(label.color, colorMode)}
                />
              )
            })}
          </Flex>
        </Stack>
      ))}
    </SimpleGrid>
  )
}

export default IssuesList
