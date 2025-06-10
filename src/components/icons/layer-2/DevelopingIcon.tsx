import { createIconBase } from "@/components/icons/icon-base"
import { commonIconDefaultAttrs } from "@/components/icons/utils"

export const DevelopingIcon = createIconBase({
  displayName: "DevelopingIcon",
  viewBox: "0 0 16 24",
  className: "w-4 h-auto",
  ...commonIconDefaultAttrs,
  children: (
    <>
      <path
        d="M3 19.3252L13 19.3252"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 18.8902L8 1.4502"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.81509 16.6202C4.02594 16.5222 0.984375 13.4198 0.984375 9.60699C0.984375 9.05405 1.04834 8.51606 1.16928 8C4.95844 8.09804 8 11.2004 8 15.0132C8 15.5662 7.93603 16.1042 7.81509 16.6202Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.8307 7.99996C11.0416 8.09798 8 11.2004 8 15.0132C8 15.5661 8.06396 16.1041 8.18489 16.6201C11.9741 16.5221 15.0156 13.4197 15.0156 9.60688C15.0156 9.05397 14.9517 8.51599 14.8307 7.99996Z"
        fill="currentColor"
      />
    </>
  ),
})
