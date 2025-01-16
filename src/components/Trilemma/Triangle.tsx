import React from "react"
import { useTranslation } from "next-i18next"

import { cn } from "@/lib/utils/cn"

import { HandleClickParam } from "./useTrilemma"

export type TriangleSVGProps = {
  handleClick: (selection: HandleClickParam) => void
  isDecentralizedAndSecure: boolean
  isScalableAndSecure: boolean
  isDecentralizedAndScalable: boolean
  isEthereum: boolean
  isDecentralized: boolean
  isSecure: boolean
  isScalable: boolean
}

export const TriangleSVG = ({
  handleClick,
  isDecentralizedAndSecure,
  isScalableAndSecure,
  isDecentralizedAndScalable,
  isEthereum,
  isDecentralized,
  isSecure,
  isScalable,
}: TriangleSVGProps) => {
  const { t } = useTranslation("page-roadmap-vision")

  const Path = () => (
    <path
      d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
      className="stroke-border stroke-2"
    />
  )

  const CircleSelect: React.FC<React.ComponentPropsWithoutRef<"g">> = ({
    children,
    ...props
  }) => (
    <g className="cursor-pointer" {...props}>
      {children}
    </g>
  )

  const FillCircle: React.FC<
    {
      isEthereum?: boolean
      isActive: boolean
    } & React.ComponentPropsWithoutRef<"circle">
  > = ({ isEthereum = false, isActive, ...rest }) => {
    return (
      <circle
        className={cn(
          "transition-colors",
          isActive
            ? isEthereum
              ? "fill-primary opacity-50"
              : "fill-primary"
            : "fill-background",
          "hover:fill-primary"
        )}
        {...rest}
      />
    )
  }

  const Text: React.FC<
    { isActive: boolean } & React.ComponentPropsWithoutRef<"text">
  > = ({ isActive, children, ...rest }) => (
    <text
      className={cn(
        "uppercase",
        isActive ? "fill-primary font-bold" : "fill-body-menu-high font-medium",
        isActive ? "opacity-100" : "opacity-60",
        "text-[2rem] sm:text-[1.4rem]",
        "-translate-x-20 transform sm:translate-x-0"
      )}
      {...rest}
    >
      {children}
    </text>
  )

  const commonCircleStyles = {
    stroke: "black",
    strokeOpacity: "0.12",
  }

  const topCircleStyles = {
    cx: "337.5",
    cy: "326.5",
    ...commonCircleStyles,
  }
  const centerCircleStyles = {
    cx: "400",
    cy: "480",
    ...commonCircleStyles,
  }
  const bottomCircleStyles = {
    cx: "321.5",
    cy: "611.501",
    ...commonCircleStyles,
  }
  const rightCircleStyles = {
    cx: "582.5",
    cy: "460.5",
    ...commonCircleStyles,
  }
  const OUTER_CIRCLE_RADIUS = "27"
  const INNER_CIRCLE_RADIUS = "21"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="620"
      viewBox="-100 100 850 915"
      className="w-full fill-background lg:mr-32 lg:mt-32 lg:w-auto"
    >
      <Path />
      <Path />
      <Path />
      <CircleSelect onClick={() => handleClick("isDecentralizedAndSecure")}>
        <circle r={OUTER_CIRCLE_RADIUS} fill="white" {...topCircleStyles} />
        <FillCircle
          isEthereum={isEthereum}
          isActive={isDecentralizedAndSecure}
          r={INNER_CIRCLE_RADIUS}
          {...topCircleStyles}
        />
      </CircleSelect>
      <CircleSelect onClick={() => handleClick("isEthereum")}>
        <circle r={OUTER_CIRCLE_RADIUS} fill="white" {...centerCircleStyles} />
        <FillCircle
          isActive={isEthereum}
          r={INNER_CIRCLE_RADIUS}
          {...centerCircleStyles}
        />
      </CircleSelect>
      <CircleSelect onClick={() => handleClick("isScalableAndSecure")}>
        <circle r={OUTER_CIRCLE_RADIUS} fill="white" {...bottomCircleStyles} />
        <FillCircle
          isEthereum={isEthereum}
          isActive={isScalableAndSecure}
          r={INNER_CIRCLE_RADIUS}
          {...bottomCircleStyles}
        />
      </CircleSelect>
      <CircleSelect onClick={() => handleClick("isDecentralizedAndScalable")}>
        <circle r={OUTER_CIRCLE_RADIUS} fill="white" {...rightCircleStyles} />
        <FillCircle
          isEthereum={isEthereum}
          isActive={isDecentralizedAndScalable}
          r={INNER_CIRCLE_RADIUS}
          {...rightCircleStyles}
        />
      </CircleSelect>
      <Text x="400" y="540" isActive={isEthereum}>
        {t("ethereum")}
      </Text>
      <Text x="460" y="150" isActive={isDecentralized}>
        {t("page-roadmap-vision-trilemma-text-1")}
      </Text>
      <Text x="-24" y="486" isActive={isSecure}>
        {t("page-roadmap-vision-trilemma-text-2")}
      </Text>
      <Text x="540" y="835" isActive={isScalable}>
        {t("page-roadmap-vision-trilemma-text-3")}
      </Text>
    </svg>
  )
}
