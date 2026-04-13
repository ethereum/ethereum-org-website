import { useLocale } from "next-intl"

import Github from "@/components/icons/github.svg"
import { Center, Flex } from "@/components/ui/flex"
import { BaseLink, LinkProps } from "@/components/ui/Link"

import { numberFormat } from "@/lib/utils/numbers"

import Emoji from "./Emoji"

type GitHubRepo = {
  stargazerCount: number
  url: string
}

type GitStarsProps = Omit<LinkProps, "href" | "href"> & {
  gitHubRepo: GitHubRepo
  hideStars: boolean
}

const GitStars = ({ gitHubRepo, hideStars, ...props }: GitStarsProps) => {
  const locale = useLocale()
  // Use numberFormat to format the number for locale
  const starsString = numberFormat(locale, {
    compactDisplay: "short",
  }).format(gitHubRepo.stargazerCount)

  return (
    <BaseLink
      className="text-body ms-auto no-underline hover:underline"
      href={gitHubRepo.url}
      hideArrow
      {...props}
    >
      <Flex className="bg-background-medium items-stretch overflow-hidden rounded">
        {hideStars ? (
          <Github className="m-1 text-2xl" />
        ) : (
          <>
            <Center className="mx-1.5 w-9 justify-between text-2xl">
              <Github />
              <Emoji text=":star:" />
            </Center>
            <Flex className="bg-background-highlight items-center px-1.5">
              <p className="text-body my-0 text-xs">{starsString}</p>
            </Flex>
          </>
        )}
      </Flex>
    </BaseLink>
  )
}

export default GitStars
