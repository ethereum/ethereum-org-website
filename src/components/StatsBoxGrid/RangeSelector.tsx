import React from "react"
import { Button } from "@chakra-ui/react"
import { ranges } from "./useStatsBoxGrid"

import { MatomoEventOptions, trackCustomEvent } from "../../utils/matomo"

interface IRangeSelectorProps {
  state: string
  setState: (state: string) => void
  matomo: MatomoEventOptions
}

export const RangeSelector: React.FC<IRangeSelectorProps> = ({
  state,
  setState,
  matomo,
}) => (
  <div>
    {ranges.map((range, idx) => (
      <Button
        onClick={() => {
          setState(ranges[idx])
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
        backgroundColor={state === ranges[idx] ? "homeBoxPurple" : ""}
      >
        {range}
      </Button>
    ))}
  </div>
)
