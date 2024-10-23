import React from "react"
import { StaticImageData } from "next/image"

import { TwImage } from "@/components/Image"
import { Flex } from "@/components/ui/flex"

import InlineLink from "./ui/Link"
import { LinkBox, LinkOverlay } from "./ui/link-box"

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
  return (
    <LinkBox className="flex flex-col overflow-hidden rounded border shadow-table-box transition-transform duration-100 ease-linear hover:scale-[1.02] hover:bg-background-highlight focus:scale-[1.02] focus:bg-background-highlight">
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
          <h3 className="mx-4 my-8 mb-4 text-2xl font-semibold">
            <LinkOverlay asChild>
              <InlineLink href={url} hideArrow>
                {name}
              </InlineLink>
            </LinkOverlay>
          </h3>
          <p className="mx-4 mb-4 text-sm leading-[140%]">{description}</p>
        </div>
        {data && (
          <div className="mb-4 max-h-[160px] overflow-y-scroll border-t">
            {data.map(({ logo, coin, apy }, idx) => (
              <Flex
                key={idx}
                className="justify-between border border-x-0 p-4 text-sm uppercase"
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
