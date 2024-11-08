import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Badge } from "@chakra-ui/react";

import type { Lang, TranslationKey } from "@/lib/types";
import { TutorialFrontmatter } from "@/lib/interfaces";

import CopyToClipboard from "@/components/CopyToClipboard";
import Emoji from "@/components/Emoji";
import InlineLink from "@/components/Link";
import Translation from "@/components/Translation";
import TutorialTags from "@/components/TutorialTags";

import { getLocaleTimestamp } from "@/lib/utils/time";
import { Flex } from "./ui/flex";

export type TutorialMetadataProps = {
  frontmatter: TutorialFrontmatter;
  timeToRead: number;
};

export enum Skill {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const getSkillTranslationId = (skill: Skill): TranslationKey =>
  `page-developers-tutorials:page-tutorial-${Skill[skill.toUpperCase() as keyof typeof Skill]
  }`;

const TutorialMetadata = ({
  frontmatter,
  timeToRead,
}: TutorialMetadataProps) => {
  const { locale } = useRouter();
  const { t } = useTranslation("page-developers-tutorials");

  const hasSource = frontmatter.source && frontmatter.sourceUrl;
  const published = frontmatter.published;
  const author = frontmatter.author;
  const address = frontmatter.address;

  return (
    <Flex className=" flex-col justify-between pb-2  border-b-0 lg:border-b border-border">
      <Flex className=" justify-between items-center w-full mb-8">
        <div className="flex flex-wrap w-full">
          <TutorialTags tags={frontmatter.tags} />
        </div>
        <Badge variant="secondary" className="self-start mb-2 whitespace-nowrap">
          {t(getSkillTranslationId(frontmatter.skill as Skill))}
        </Badge>
      </Flex>
      <div className="flex flex-wrap gap-4 mt-[-1rem] text-sm text-text300 mb-6">
        {author && (
          <div>
            <Emoji className="me-2 text-sm" text=":writing_hand:" />
            {author}
          </div>
        )}
        {hasSource && (
          <div >
            <Emoji className="me-2 text-sm" text=":books:" />
            <InlineLink href={frontmatter.sourceUrl}>
              {frontmatter.source}
            </InlineLink>
          </div>
        )}
        {published && (
          <div >
            <Emoji className="me-2 text-sm" text=":calendar:" />{" "}
            {getLocaleTimestamp(locale! as Lang, published)}
          </div>
        )}
        <div >
          <Emoji className="me-2  text-sm" text=":stopwatch:" />
          {timeToRead} {t("comp-tutorial-metadata-minute-read")} minute read
        </div>
      </div>
      {address && (
        <div className="flex flex-wrap mt-[-1rem] text-sm text-text300 mb-6">
          <CopyToClipboard text={address}>
            {(isCopied) => (
              <div
                className="text-primary cursor-pointer overflow-hidden text-ellipsis font-mono bg-ednBackground px-1 text-sm hover:bg-primary100"
              >
                <div className="uppercase">
                  <Translation
                    id="comp-tutorial-metadata-tip-author"
                  />{" "}
                </div>
                {address} {isCopied && <Translation id="copied" />}
                {isCopied && (
                  <Emoji className="mr-2 text-sm" text=":white_check_mark:" />
                )}
              </div>
            )}
          </CopyToClipboard>
        </div>
      )}
    </Flex>
  );
};

export default TutorialMetadata;
