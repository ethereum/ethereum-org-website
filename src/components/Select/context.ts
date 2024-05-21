import { createStylesContext, type SystemStyleObject } from "@chakra-ui/react"

import { reactSelectAnatomyKeys } from "./innerComponents"

const [ReactSelectStylesProvider, useReactSelectStyles] =
  createStylesContext("ReactSelect")

export const SelectStylesProvider = ReactSelectStylesProvider

export const useSelectStyles = useReactSelectStyles as () => Record<
  (typeof reactSelectAnatomyKeys)[number],
  SystemStyleObject
>
