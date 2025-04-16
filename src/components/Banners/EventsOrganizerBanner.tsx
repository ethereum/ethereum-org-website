import { cn } from "@/lib/utils/cn"

import { Image } from "../Image"
import { ButtonLink } from "../ui/buttons/Button"
import { Flex, Stack } from "../ui/flex"

import PeopleLearning from "@/public/images/people-learning.png"

// TODO: refactor to use CalloutBanner component
function EventsOrganizerBanner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside
      className={cn(
        "flex flex-col rounded md:flex-row",
        "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20",
        className
      )}
      {...props}
    >
      <Flex
        className={cn(
          "relative flex-[1_1_50%]",
          "justify-center md:justify-end",
          "items-end",
          "md:min-h-auto min-h-[200px]",
          "px-8 md:px-0"
        )}
      >
        <Image
          className="absolute max-h-[120%] w-full object-contain"
          src={PeopleLearning}
          alt="People learning about Ethereum"
        />
        <div className="w-full border-b border-[#D3C5F1] md:hidden" />
      </Flex>
      <Stack
        className={cn("flex-[1_1_50%]", "gap-8 py-8 ps-8", "pe-8 lg:pe-0")}
      >
        <Stack className="px-2">
          <h2>Planning an Ethereum event?</h2>
          <p className="text-lg text-body">
            Check out the Ethereum event guide built by the community, for the
            community.
          </p>
        </Stack>
        <div>
          <ButtonLink href="/community/events/organizing">
            Read the guide
          </ButtonLink>
        </div>
      </Stack>
    </aside>
  )
}

export default EventsOrganizerBanner
