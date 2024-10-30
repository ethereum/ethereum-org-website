import { FilterOption } from "@/lib/types"

export const useNetworkFilters = (): FilterOption[] => {
  return [
    {
      title: "Network maturity",
      showFilterOption: true,
      items: [
        {
          filterKey: "robust",
          filterLabel: "Robust",
          description:
            "Fully decentralized and secure network that cannot be tampered with or stopped by any individual or group.",
          inputState: false,
          input: () => {
            return <></>
          },
          options: [],
        },
      ],
    },
  ]
}
