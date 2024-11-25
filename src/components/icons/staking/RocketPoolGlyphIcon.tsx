import { commonIconDefaultAttrs } from "@/components/icons/utils"

import { createIconBase } from "../icon-base"

export const RocketPoolGlyphIcon = createIconBase({
  displayName: "RocketPoolGlyphIcon",
  viewBox: "0 0 50 50",
  className: "size-[1em]",
  ...commonIconDefaultAttrs,
  children: (
    <>
      <mask
        id="a"
        width="50"
        height="50"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <path d="M50 25c0 13.8071-11.1929 25-25 25S0 38.8071 0 25 11.1929 0 25 0s25 11.1929 25 25Z" />
      </mask>

      <g mask="url(#a)">
        <path d="m18.0999 22.4093 3.3579-.7358s2.7827-3.9978 7.8996-6.2368c3.3817-1.4797 5.6606-.928 5.6606-.928s.4287 2.4117-1.1198 5.4687c-2.4949 4.9251-6.1409 7.4839-6.1409 7.4839l-.6718 3.2939-2.9744 2.6546-1.119-3.5496s-.6034.1726-1.1349.153c-.5316-.0197-1.1898-.1946-1.1898-.1946l-1.1932 1.2571-1.2471-1.2471 1.1888-1.3117s-.2842-.4153-.3937-.945c-.1096-.5297.0367-1.0053.0367-1.0053l-3.6456-1.1509 2.6866-3.0064Zm10.3933 1.1823c-.8125.8125-2.1297.8127-2.9421.0003-.1016-.1016-.1904-.211-.2666-.3263-.5331-.8075-.4441-1.9049.2669-2.6159.8125-.8125 2.1297-.8126 2.9421-.0002.8124.8124.8123 2.1296-.0003 2.9421Z" />
        <path d="M18.2804 31.9141c.1895-.1794.2144-.4607.0558-.6284-.1587-.1676-.441-.1582-.6305.0211l-9.28948 8.791c-.18948.1793-.21444.4606-.05574.6283.15869.1677.44094.1583.63042-.021l9.2895-8.791ZM15.0713 32.1175c.1894-.1793.2144-.4606.0557-.6283-.1587-.1677-.4409-.1583-.6304.021l-9.28954 8.791c-.18948.1793-.21443.4606-.05574.6283.15869.1677.44094.1583.63042-.021l9.28956-8.791ZM17.9562 34.4788c.1587.1677.1337.449-.0558.6283l-9.28947 8.791c-.18948.1793-.47173.1888-.63042.0211s-.13374-.449.05574-.6283l9.28955-8.791c.1894-.1794.4717-.1888.6304-.0211Z" />
        <g filter="url(#b)">
          <path d="M50 25c0 13.8071-11.1929 25-25 25S0 38.8071 0 25 11.1929 0 25 0s25 11.1929 25 25ZM25 48c12.7025 0 23-10.2975 23-23S37.7025 2 25 2 2 12.2975 2 25s10.2975 23 23 23Z" />
        </g>
      </g>

      <defs>
        <filter
          id="b"
          width="60"
          height="60"
          x="-6"
          y="-4"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="-1" dy="1" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1413_8107"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1413_8107"
            result="shape"
          />
        </filter>
      </defs>
    </>
  ),
})
