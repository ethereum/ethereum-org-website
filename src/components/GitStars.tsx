import { useRouter } from "next/router"
import { FaGithub } from "react-icons/fa"

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
  const { locale } = useRouter()
  // Use Intl.NumberFormat to format the number for locale
  const starsString = Intl.NumberFormat(locale, {
    compactDisplay: "short",
  }).format(gitHubRepo.stargazerCount)

  return (
    <BaseLink
      className="text-decoration-none ms-auto"
      href={gitHubRepo.url}
      hideArrow
      {...props}
    >
      <Flex className="rounded border bg-background-medium no-underline hover:fill-primary hover:shadow-table-item-box-hover">
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
