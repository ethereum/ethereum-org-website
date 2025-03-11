import { createIconBase } from "../icon-base"
import { commonIconDefaultAttrs } from "../utils"

export const StakingGlyphEtherCircleIcon = createIconBase({
  displayName: "StakingGlyphEtherCircleIcon",
  viewBox: "0 0 32 32",
  ...commonIconDefaultAttrs,
  children: (
    <>
      <path
        id="transparentBackground"
        fillRule="nonzero"
        fill="transparent"
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16.1395 4.17392L8.90476 16.4383L16.1395 20.6261L23.3743 16.4383L16.1395 4.17392ZM8.90476"
      />
      <path
        fillRule="evenodd"
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM16.1395 4.17392L8.90476 16.4383L16.1395 20.6261L23.3743 16.4383L16.1395 4.17392ZM8.90476 17.6348L16.1395 22.1217L23.3743 17.6348L16.1395 28.1044L8.90476 17.6348Z"
        fill="currentColor"
      />
    </>
  ),
})
