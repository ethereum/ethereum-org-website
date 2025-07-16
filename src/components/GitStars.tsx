import { useLocale } from "next-intl"

import Github from "@/components/icons/github.svg"
import { Center, Flex } from "@/components/ui/flex"
import { BaseLink, LinkProps } from "@/components/ui/Link"

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
  // Use Intl.NumberFormat to format the number for locale
  const starsString = Intl.NumberFormat(locale, {
    compactDisplay: "short",
  }).format(gitHubRepo.stargazerCount)

  return (
    <BaseLink
      className="ms-auto text-body no-underline hover:underline"
      href={gitHubRepo.url}
      hideArrow
      {...props}
    >
      <Flex className="items-stretch overflow-hidden rounded bg-background-medium">
        {hideStars ? (
          <Github className="m-1 text-2xl" />
        ) : (
          <>
            <Center className="mx-1.5 w-9 justify-between text-2xl">
              <Github />
              <Emoji text=":star:" />
            </Center>
            <Flex className="items-center bg-background-highlight px-1.5">
              <p className="my-0 text-xs text-body">{starsString}</p>
            </Flex>
          </>
        )}
      </Flex>
    </BaseLink>
  )
}

export default GitStars
