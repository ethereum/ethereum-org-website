import { createIconBase } from "@/components/icons/icon-base"
import { commonIconDefaultAttrs } from "@/components/icons/utils"

export const EmergingIcon = createIconBase({
  displayName: "EmergingIcon",
  viewBox: "0 0 16 24",
  className: "w-4 h-auto",
  ...commonIconDefaultAttrs,
  children: (
    <>
      <path
        d="M0.640625 18.3252L10.6406 18.3252"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.64063 18.8902L5.64063 1.4502"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4714 6.99996C8.6822 7.09798 5.64062 10.2004 5.64062 14.0132C5.64062 14.5661 5.70459 15.1041 5.82552 15.6201C9.61468 15.5221 12.6562 12.4197 12.6562 8.60688C12.6562 8.05397 12.5923 7.51599 12.4714 6.99996Z"
        fill="currentColor"
      />
    </>
  ),
})
