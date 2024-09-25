import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "../Buttons"
import { Stack } from "../ui/flex"

// TODO: refactor to use CalloutBanner component
function ContributorsQuizBanner(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside
      className={cn(
        "flex flex-col rounded md:flex-row",
        "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20"
      )}
      {...props}
    >
      {/* TODO: fix image */}
      {/* <Flex
        className={cn(
          "relative flex-[1_1_50%]",
          "justify-center md:justify-end",
          "items-end",
          "md:min-h-auto min-h-[100px]",
          "px-8 md:px-0",
          "w-20"
        )}
      >
        <TwImage
          src={PeopleLearning}
          alt="People learning about Ethereum"
          className="absolute max-h-[120%] w-full object-contain"
        />
        <div className="w-full border-b border-[#D3C5F1] md:hidden" />
      </Flex> */}
      <Stack
        className={cn("flex-[1_1_50%]", "gap-8 py-8 ps-8", "pe-8 lg:pe-0")}
      >
        <Stack>
          <h2>Unsure where to start?</h2>
          <p className="text-lg text-body">
            Take a quick quiz and find out how you can contribute on
            ethereum.org.
          </p>
        </Stack>
        <div>
          <ButtonLink href="https://ethdotorg.typeform.com/contributor">
            Take a quiz
          </ButtonLink>
        </div>
      </Stack>
    </aside>
  )
}

export default ContributorsQuizBanner
