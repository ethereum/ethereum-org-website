import { createIconBase } from "@/components/icons/icon-base"
import { commonIconDefaultAttrs } from "@/components/icons/utils"

export const MaturingIcon = createIconBase({
  displayName: "MaturingIcon",
  viewBox: "0 0 16 24",
  className: "w-4 h-auto",
  ...commonIconDefaultAttrs,
  children: (
    <>
      <path
        d="M3 18.375L13 18.375"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17.94L8 0.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.81509 15.67C4.02594 15.572 0.984375 12.4696 0.984375 8.65679C0.984375 8.10386 1.04834 7.56586 1.16928 7.0498C4.95844 7.14784 8 10.2502 8 14.063C8 14.616 7.93603 15.154 7.81509 15.67Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.84928 8.11767C4.76056 8.03776 2.28125 5.50885 2.28125 2.40087C2.28125 1.95015 2.33339 1.5116 2.43197 1.09094C5.52068 1.17086 8 3.69976 8 6.80774C8 7.25847 7.94786 7.69701 7.84928 8.11767Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.8307 7.04976C11.0416 7.14779 8 10.2502 8 14.063C8 14.6159 8.06396 15.1539 8.18489 15.6699C11.9741 15.5719 15.0156 12.4695 15.0156 8.65669C15.0156 8.10377 14.9517 7.5658 14.8307 7.04976Z"
        fill="currentColor"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.568 1.09083C10.4793 1.17074 8 3.69965 8 6.80763C8 7.25835 8.05214 7.69689 8.15072 8.11755C11.2394 8.03764 13.7188 5.50873 13.7188 2.40075C13.7188 1.95003 13.6666 1.51149 13.568 1.09083Z"
        fill="currentColor"
      />
    </>
  ),
})
