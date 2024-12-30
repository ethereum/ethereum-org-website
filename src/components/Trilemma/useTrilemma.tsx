import { useState } from "react"
import { useTranslation } from "next-i18next"

import { isMobile } from "@/lib/utils/isMobile"

import { CardProps } from "../Card"

/**
 * The `selection` param accepted values for the click handler
 */
export type HandleClickParam =
  | "isEthereum"
  | "isDecentralizedAndSecure"
  | "isDecentralizedAndScalable"
  | "isScalableAndSecure"

export const useTrilemma = () => {
  const { t } = useTranslation("page-roadmap-vision")

  const [state, setState] = useState({
    isDecentralizedAndSecure: false,
    isDecentralizedAndScalable: false,
    isScalableAndSecure: false,
    mobileModalOpen: false,
  })

  const setTrilemmaState = (newState: Partial<typeof state>) => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  const isDecentralized =
    state.isDecentralizedAndScalable || state.isDecentralizedAndSecure
  const isScalable =
    state.isDecentralizedAndScalable || state.isScalableAndSecure
  const isSecure = state.isScalableAndSecure || state.isDecentralizedAndSecure
  const isEthereum = isDecentralized && isScalable && isSecure

  const handleClick = (selection: HandleClickParam) => {
    if (selection === "isEthereum") {
      return setTrilemmaState({
        isDecentralizedAndSecure: true,
        isDecentralizedAndScalable: true,
        isScalableAndSecure: true,
        mobileModalOpen: true,
      })
    }
    if (selection === "isDecentralizedAndSecure") {
      return setTrilemmaState({
        isDecentralizedAndSecure: true,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: false,
        mobileModalOpen: true,
      })
    }

    if (selection === "isDecentralizedAndScalable") {
      return setTrilemmaState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: true,
        isScalableAndSecure: false,
        mobileModalOpen: true,
      })
    }
    if (selection === "isScalableAndSecure") {
      return setTrilemmaState({
        isDecentralizedAndSecure: false,
        isDecentralizedAndScalable: false,
        isScalableAndSecure: true,
        mobileModalOpen: true,
      })
    }
  }

  const handleModalClose = () => {
    setTrilemmaState({
      mobileModalOpen: false,
    })
  }

  let cardTitle = t("page-roadmap-vision-trilemma-title-1")
  let cardText = t("page-roadmap-vision-trilemma-press-button")
  if (isEthereum) {
    cardTitle = t("page-roadmap-vision-trilemma-title-2")
    cardText = t("page-roadmap-vision-trilemma-cardtext-1")
  } else if (state.isDecentralizedAndSecure) {
    cardTitle = t("page-roadmap-vision-trilemma-title-3")
    cardText = t("page-roadmap-vision-trilemma-cardtext-2")
  } else if (state.isDecentralizedAndScalable) {
    cardTitle = t("page-roadmap-vision-trilemma-title-4")
    cardText = t("page-roadmap-vision-trilemma-cardtext-3")
  } else if (state.isScalableAndSecure) {
    cardTitle = t("page-roadmap-vision-trilemma-title-5")
    cardText = t("page-roadmap-vision-trilemma-cardtext-4")
  }

  return {
    trilemmaChecks: {
      isDecentralizedAndSecure: state.isDecentralizedAndSecure,
      isScalableAndSecure: state.isScalableAndSecure,
      isDecentralizedAndScalable: state.isDecentralizedAndScalable,
      isEthereum,
      isDecentralized,
      isSecure,
      isScalable,
    },
    mobileModalOpen: state.mobileModalOpen && isMobile(),
    handleClick,
    handleModalClose,
    cardDetail: {
      title: cardTitle,
      description: cardText,
    } as Pick<CardProps, "title" | "description">,
  }
}
