import { FilterOption } from "@/lib/types"

import {
  DevelopingIcon,
  EmergingIcon,
  MaturingIcon,
  RobustIcon,
} from "@/components/icons/layer-2"
import NetworksWalletSelectInput from "@/components/Layer2NetworksTable/NetworksWalletSelectInput"
import SwitchFilterInput from "@/components/ProductTable/FilterInputs/SwitchFilterInput"

import { trackCustomEvent } from "@/lib/utils/matomo"

import useTranslation from "@/hooks/useTranslation"

export const useNetworkFilters = (): FilterOption[] => {
  const { t } = useTranslation("page-layer-2-networks")

  return [
    {
      title: t("page-layer-2-networks-wallet-support"),
      showFilterOption: true,
      items: [
        {
          filterKey: "wallets_supported",
          filterLabel: "wallets_supported",
          description: "",
          inputState: "",
          ignoreFilterReset: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <NetworksWalletSelectInput
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "l2_networks",
                    eventAction: "wallet",
                    eventName: newInputState as string,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
      ],
    },
    {
      title: t("page-layer-2-networks-network-maturity"),
      showFilterOption: true,
      items: [
        {
          filterKey: "robust",
          filterLabel: t("page-layer-2-networks-robust-label"),
          description: t("page-layer-2-networks-robust-description-1"),
          inputState: true,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={RobustIcon}
                label={t("page-layer-2-networks-robust-label")}
                description={
                  <>
                    {t("page-layer-2-networks-robust-description-1")}
                    <br />
                    <br />
                    {t("page-layer-2-networks-robust-description-2")}
                  </>
                }
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "l2_networks",
                    eventAction: "filter",
                    eventName: `robust ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "maturing",
          filterLabel: t("page-layer-2-networks-maturing-label"),
          description: t("page-layer-2-networks-maturing-description"),
          inputState: true,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={MaturingIcon}
                label={t("page-layer-2-networks-maturing-label")}
                description={
                  <>{t("page-layer-2-networks-maturing-description")}</>
                }
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "l2_networks",
                    eventAction: "filter",
                    eventName: `maturing ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "developing",
          filterLabel: t("page-layer-2-networks-developing-label"),
          description: t("page-layer-2-networks-developing-description-1"),
          inputState: true,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={DevelopingIcon}
                label={t("page-layer-2-networks-developing-label")}
                description={
                  <>{t("page-layer-2-networks-developing-description")}</>
                }
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "l2_networks",
                    eventAction: "filter",
                    eventName: `developing ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "emerging",
          filterLabel: t("page-layer-2-networks-emerging-label"),
          description: t("page-layer-2-networks-emerging-description-1"),
          inputState: true,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={EmergingIcon}
                label={t("page-layer-2-networks-emerging-label")}
                description={
                  <>{t("page-layer-2-networks-emerging-description")}</>
                }
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "l2_networks",
                    eventAction: "filter",
                    eventName: `emerging ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
      ],
    },
  ]
}
