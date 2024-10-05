import { useRouter } from "next/router"
import { FaGithub } from "react-icons/fa"

import { Center, Flex } from "./ui/flex"
import Emoji from "./Emoji"
import { BaseLink, LinkProps } from "./Link"

type GitHubRepo = {
  stargazerCount: number
  url: string
}

type GitStarsProps = Omit<LinkProps, "href" | "href"> & {
  gitHubRepo: GitHubRepo
  hideStars: boolean
}

const GitStars = ({ gitHubRepo, hideStars, ...props }: GitStarsProps) => {
  const { locale } = useRouter()
  // Use Intl.NumberFormat to format the number for locale
  const starsString = Intl.NumberFormat(locale, {
    compactDisplay: "short",
  }).format(gitHubRepo.stargazerCount)

  return (
    <BaseLink
      href={gitHubRepo.url}
      hideArrow
      ms="auto"
      textDecoration="none"
      {...props}
    >
      <Flex className="rounded border border-border bg-background-medium no-underline hover:fill-primary hover:shadow-table-item-box-hover">
        {hideStars ? (
          <FaGithub className="m-1 text-2xl" />
        ) : (
          <>
            <Center className="mx-1.5 w-9 justify-between text-sm">
              <FaGithub className="text-2xl" />
              <Emoji text=":star:" />
            </Center>
            <p className="my-0 bg-background-medium px-1.5 text-sm">
              {starsString}
            </p>
          </>
        )}
      </Flex>
    </BaseLink>
  )
}

export default GitStars
