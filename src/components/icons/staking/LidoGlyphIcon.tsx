import { commonIconDefaultAttrs } from "@/components/icons/utils"

import { createIconBase } from "../icon-base"

export const LidoGlyphIcon = createIconBase({
  displayName: "LidoGlyphIcon",
  viewBox: "0 0 23 32",
  className: "size-[1em]",
  ...commonIconDefaultAttrs,
  children: (
    <path d="M19.1999 12.4363L11.3777 0L3.55546 12.4362L11.3777 17.0667L19.1999 12.4363ZM11.3777 3.2189L5.9499 11.8481L11.3777 15.0611L16.8055 11.8481L11.3777 3.2189ZM1.98046 14.2223L11.0221 19.6253L20.0638 14.2222L20.311 14.6186C23.0943 19.0877 22.4749 24.9406 18.8166 28.6907C14.511 33.1031 7.53323 33.1031 3.22768 28.6907C-0.430652 24.9406 -1.0501 19.0877 1.73324 14.6186L1.98046 14.2223Z" />
  ),
})
