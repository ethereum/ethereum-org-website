import { Button } from "@chakra-ui/react"

import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

import { RANGES } from "@/lib/constants"

type RangeSelectorProps = {
  state: string
  setState: (state: string) => void
  matomo: MatomoEventOptions
}

export const RangeSelector = ({
  state,
  setState,
  matomo,
}: RangeSelectorProps) => (
  <div>
    {RANGES.map((range, idx) => (
      <Button
        onClick={() => {
          setState(RANGES[idx])
          trackCustomEvent(matomo)
        }}
        key={idx}
        color={""}
        background="background.base"
        fontFamily="monospace"
        fontSize="xl"
        padding="2px 15px"
        borderRadius="1px"
        border="1px solid"
        cursor="pointer"
        _focus={{ outline: "none" }}
        _hover={{ color: "" }}
        _active={{ color: "" }}
        _disabled={{
          cursor: "default",
          opacity: "0.7",
        }}
        size="sm"
        backgroundColor={state === RANGES[idx] ? "homeBoxPurple" : ""}
      >
        {range}
      </Button>
    ))}
  </div>
)
