import { Button } from "../ui/buttons/Button"
import { Flex } from "../ui/flex"

import type { SimulatorPathSummary } from "./interfaces"

type PathButtonProps = {
  pathSummary: SimulatorPathSummary
  handleClick: () => void
}
export const PathButton = ({ pathSummary, handleClick }: PathButtonProps) => {
  const { primaryText, secondaryText, Icon } = pathSummary
  // TODO: Convert this component to use ButtonLinkTwoLines
  return (
    <Button
      variant="outline"
      className="w-full justify-start gap-3 py-6 text-start"
      onClick={handleClick}
    >
      <span className="me-2">
        <Icon />
      </span>
      <Flex className="flex-col" asChild>
        <span>
          <span className="m-0 font-bold leading-6 tracking-[-1.1%]">
            {primaryText}
          </span>
          {secondaryText && (
            <span className="m-0 text-xs leading-5 text-body-medium">
              {secondaryText}
            </span>
          )}
        </span>
      </Flex>
    </Button>
  )
}
