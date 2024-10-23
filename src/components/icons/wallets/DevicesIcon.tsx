import { createIconBase } from "../icon-base"
import { commonIconDefaultAttrs } from "../utils"

export const DevicesIcon = createIconBase({
  displayName: "DevicesIcon",
  viewBox: "0 0 24 25",
  className: "w-[24px] h-auto",
  ...commonIconDefaultAttrs,
  children: (
    <>
      <g fill="#8C8C8C" clipPath="url(#a)">
        <path d="M21.335 9.167H16a1.333 1.333 0 0 0-1.333 1.333v10a1.333 1.333 0 0 0 1.333 1.333h5.334a1.333 1.333 0 0 0 1.333-1.333v-10a1.333 1.333 0 0 0-1.333-1.333Zm0 1.333v8.667H16V10.5h5.334Z" />
        <path d="M18.665 3.167h-16A1.333 1.333 0 0 0 1.332 4.5v10.667A1.333 1.333 0 0 0 2.665 16.5H8v1.333H6.212a.8.8 0 0 0-.88.667.8.8 0 0 0 .88.667h7.067v-.247h.053v-3.753H2.665V4.5h16v3.333H20V4.5a1.334 1.334 0 0 0-1.334-1.333Z" />
      </g>
    </>
  ),
})
