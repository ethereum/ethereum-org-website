import { cssVarPrefix } from "../constants"

const shadows = {
  // using css variables bc shadows do not support color tokens yet
  primary: `4px 4px 0px 0px var(--${cssVarPrefix}-colors-primaryLight)`,
}

export default shadows
