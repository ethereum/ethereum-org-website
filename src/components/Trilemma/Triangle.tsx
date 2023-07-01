import React, { ReactNode } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import { HandleClickParam } from "./useTrilemma"

export interface IProps {
  handleClick: (selection: HandleClickParam) => void
  isDecentralizedAndSecure: boolean
  isScalableAndSecure: boolean
  isDecentralizedAndScalable: boolean
  isEthereum: boolean
  isDecentralized: boolean
  isSecure: boolean
  isScalable: boolean
}

export const TriangleSVG: React.FC<IProps> = ({
  handleClick,
  isDecentralizedAndSecure,
  isScalableAndSecure,
  isDecentralizedAndScalable,
  isEthereum,
  isDecentralized,
  isSecure,
  isScalable,
}) => {
  const { t } = useTranslation()

  const Path = () => (
    <chakra.path
      d="M111.183 479.532L566.904 181.217L598.824 787.211L111.183 479.532Z"
      stroke="border"
      strokeWidth="2"
    />
  )

  const CircleSelect = ({ children, onClick }) => (
    <chakra.g
      cursor="pointer"
      sx={{
        "circle:first-of-type": {
          fill: "white",
        },
      }}
      onClick={onClick}
    >
      {children}
    </chakra.g>
  )

  const FillCircle = ({ isEthereum = false, isActive, ...rest }) => {
    return (
      <chakra.circle
        fill={
          (isActive && (isEthereum ? "primary300" : "primary.base")) ||
          "background.base"
        }
        _hover={{
          fill: isActive ? "primary.base" : "primary100",
        }}
        {...rest}
      />
    )
  }

  const Text = ({
    isActive,
    children,
    ...rest
  }: { isActive: boolean; children: ReactNode } & HTMLChakraProps<"text">) => (
    <chakra.text
      fill={isActive ? "primary400" : "text200"}
      fontWeight={isActive ? 700 : 500}
      opacity={isActive ? 1.0 : 0.6}
      fontSize={{ base: "2rem", sm: "1.4rem" }}
      textTransform="uppercase"
      transform={{ base: "translate(-80px, 0px)", sm: "none" }}
      {...rest}
    >
      {children}
    </chakra.text>
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
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      height="620px"
      viewBox="-100 100 850 915"
      fill="background.base"
      width={{ base: "full", lg: "auto" }}
      my={{ base: -28, sm: -16, lg: 0 }}
      mt={{ lg: 32 }}
      mr={{ lg: 32 }}
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
    </chakra.svg>
  )
}
