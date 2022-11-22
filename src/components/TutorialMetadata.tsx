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
import { Flex, Text } from "@chakra-ui/react"

const HorizontalContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  margin-top: -1rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text300};
  justify-content: flex-start;
`

const DataContainer = styled.div`
  margin-right: 1rem;
`

const AddressContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-right: 1rem;
`

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
      <HorizontalContainer>
        {author && (
          <DataContainer>
            <Emoji fontSize="sm" mr={2} text=":writing_hand:" />
            {author}
          </DataContainer>
        )}
        {hasSource && (
          <DataContainer>
            <Emoji fontSize="sm" mr={2} text=":books:" />
            <Link to={frontmatter.sourceUrl}>{frontmatter.source}</Link>
          </DataContainer>
        )}
        {published && (
          <DataContainer>
            <Emoji fontSize="sm" mr={2} text=":calendar:" />
            {getLocaleTimestamp(intl.locale as Lang, published)}
          </DataContainer>
        )}
        <DataContainer>
          <Emoji fontSize="sm" mr={2} text=":stopwatch:" />
          {Math.round(tutorial.fields.readingTime.minutes)}{" "}
          <Translation id="comp-tutorial-metadata-minute-read" />
        </DataContainer>
      </HorizontalContainer>
      <HorizontalContainer>
        {address && (
          <AddressContainer>
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
          </AddressContainer>
        )}
      </HorizontalContainer>
    </Flex>
  )
}

export default TutorialMetadata
