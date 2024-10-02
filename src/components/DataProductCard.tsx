import React from "react"
import { StaticImageData } from "next/image"
import { LinkBox, LinkOverlay, useColorModeValue } from "@chakra-ui/react"

import { TwImage } from "@/components/Image"
import { Flex } from "@/components/ui/flex"

export interface DataRow {
  logo: StaticImageData
  coin: string
  apy: string
}

export type DataProductCardProps = {
  url: string
  background: string
  image: StaticImageData
  imgWidth: number
  alt?: string
  name: string
  description?: string
  data?: Array<DataRow>
}

const DataProductCard = ({
  url,
  background,
  image,
  imgWidth,
  alt,
  name,
  description,
  data,
}: DataProductCardProps) => {
  const boxShadow = useColorModeValue("tableBox.light", "tableBox.dark")

  return (
    <LinkBox
      color="text"
      background="searchBackground"
      border="1px solid"
      borderColor="lightBorder"
      borderRadius="base"
      overflow="hidden"
      boxShadow={boxShadow}
      display="flex"
      flexDirection="column"
      _hover={{
        background: "tableBackgroundHover",
        boxShadow: boxShadow,
        transition: "transform 0.1s ease 0s",
        transform: "scale(1.02)",
      }}
    >
      <Flex
        className={
          "min-h-[200px] items-center justify-center shadow-[rgb(0_0_0/_10%)_0px_-1px_0px_inset]"
        }
        style={{ background }}
      >
        <TwImage
          alt={alt ? alt : `${name} logo`}
          className="max-h-[257px] max-w-[311px] self-center object-cover sm:max-w-[372px]"
          src={image}
          width={imgWidth}
        />
      </Flex>
      <Flex className="flex-col justify-between text-left">
        <div>
          <h3 className="mx-4 my-8 mb-4 text-2xl font-semibold leading-[1.4]">
            <LinkOverlay href={url} isExternal>
              {name}
            </LinkOverlay>
          </h3>
          <p className="mx-4 mb-4 text-sm leading-[140%]">{description}</p>
        </div>
        {data && (
          <div className="mb-4 max-h-[160px] overflow-y-scroll border-t border-border-light">
            {data.map(({ logo, coin, apy }, idx) => (
              <Flex
                key={idx}
                className="flex justify-between border border-x-0 border-border-light p-4 text-sm uppercase"
                // color="text300"
              >
                <Flex className="items-center">
                  {logo && (
                    <TwImage
                      className="me-2 min-w-6 object-cover"
                      src={logo}
                      alt=""
                    />
                  )}
                  {coin}
                </Flex>
                <Flex className="items-center">{apy}% APY</Flex>
              </Flex>
            ))}
          </div>
        )}
      </Flex>
    </LinkBox>
  )
}

export default DataProductCard
