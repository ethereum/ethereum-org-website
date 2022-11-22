import React from "react"
import styled from "@emotion/styled"
import { useIntl } from "react-intl"
import CopyToClipboard from "./CopyToClipboard"
import Pill from "./Pill"
import Link from "./Link"
import TutorialTags from "./TutorialTags"
import { getLocaleTimestamp } from "../utils/time"
import { FakeLink } from "./SharedStyledComponents"
import Emoji from "./Emoji"
import Translation from "./Translation"
import { Lang } from "../utils/languages"
import { TranslationKey } from "../utils/translations"
import { Box, Flex, Text } from "@chakra-ui/react"

const Code = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${(props) => props.theme.fonts.monospace};
  background: ${(props) => props.theme.colors.ednBackground};
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  font-size: 0.875rem;

  &:hover {
    background: ${(props) => props.theme.colors.primary100};
  }
`

export interface IProps {
  tutorial: any
}

export enum Skill {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const getSkillTranslationId = (skill: Skill): TranslationKey =>
  `page-tutorial-${Skill[skill.toUpperCase() as keyof typeof Skill]}`

const TutorialMetadata: React.FC<IProps> = ({ tutorial }) => {
  const intl = useIntl()

  const frontmatter = tutorial.frontmatter
  const hasSource = frontmatter.source && frontmatter.sourceUrl
  const published = frontmatter.published
  const author = frontmatter.author
  const address = frontmatter.address

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      borderBottomWidth={{ base: 0, lg: "1px" }}
      borderBottomStyle={{ lg: "solid" }}
      borderBottomColor={{ lg: "border" }}
    >
      <Flex justifyContent="space-between" alignItems="center" w="full" mb={8}>
        <Flex flexWrap="wrap" w="full">
          <TutorialTags tags={frontmatter.tags} />
        </Flex>
        <Flex
          as={Pill}
          alignSelf="flex-start"
          mb={2}
          whiteSpace="nowrap"
          isSecondary={true}
          className=""
          color=""
        >
          <Translation id={getSkillTranslationId(frontmatter.skill)} />
        </Flex>
      </Flex>
      <Flex
        mb={6}
        flexWrap="wrap"
        mt={-4}
        fontSize="sm"
        color="text300"
        justifyContent="flex-start"
      >
        {author && (
          <Box mr={4}>
            <Emoji fontSize="sm" mr={2} text=":writing_hand:" />
            {author}
          </Box>
        )}
        {hasSource && (
          <Box mr={4}>
            <Emoji fontSize="sm" mr={2} text=":books:" />
            <Link to={frontmatter.sourceUrl}>{frontmatter.source}</Link>
          </Box>
        )}
        {published && (
          <Box mr={4}>
            <Emoji fontSize="sm" mr={2} text=":calendar:" />
            {getLocaleTimestamp(intl.locale as Lang, published)}
          </Box>
        )}
        <Box mr={4}>
          <Emoji fontSize="sm" mr={2} text=":stopwatch:" />
          {Math.round(tutorial.fields.readingTime.minutes)}{" "}
          <Translation id="comp-tutorial-metadata-minute-read" />
        </Box>
      </Flex>
      <Flex
        mb={6}
        flexWrap="wrap"
        mt={-4}
        fontSize="sm"
        color="text300"
        justifyContent="flex-start"
      >
        {address && (
          <Flex flexWrap="wrap" w="full" mr={4}>
            <CopyToClipboard text={frontmatter.address}>
              {(isCopied) => (
                <FakeLink>
                  {!isCopied ? (
                    <Code>
                      <Text
                        as={Translation}
                        textTransform="uppercase"
                        id="comp-tutorial-metadata-tip-author"
                      />{" "}
                      {frontmatter.address}
                    </Code>
                  ) : (
                    <Code>
                      <Text
                        as={Translation}
                        textTransform="uppercase"
                        id="comp-tutorial-metadata-tip-author"
                      />{" "}
                      {frontmatter.address} <Translation id="copied" />
                      <Emoji
                        fontSize="sm"
                        ml={2}
                        mr={2}
                        text=":white_check_mark:"
                      />
                    </Code>
                  )}
                </FakeLink>
              )}
            </CopyToClipboard>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default TutorialMetadata
