import { useTranslation } from "next-i18next"

import type { TranslationKey } from "@/lib/types"

import Image from "next/image"

export type CalloutBannerProps = {
  children?: React.ReactNode
  image: any
  imageWidth?: number
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  alt: string
}

const CalloutBanner = ({
  image,
  imageWidth,
  titleKey,
  descriptionKey,
  alt,
  children,
  ...props
}: CalloutBannerProps) => {
  const { t } = useTranslation("page-staking")

  return (
    <div
      className="flex flex-col lg:flex-row-reverse bg-layer2Gradient p-8 sm:p-12 rounded-base"
      {...props}
    >
      {image && (
        <div className="flex">
          <Image
            src={image}
            alt={alt}
            width={imageWidth}
            className="mx-auto mt-[-6rem] lg:mt-0 lg:mb-[-6rem]"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      )}
      <div className="flex-grow flex-shrink-0 basis-1/2 flex flex-col justify-center ps-0 sm:ps-4 lg:ps-8 w-full lg:w-auto">
        <h2 className="text-2xl sm:text-[2rem] mt-0 leading-[1.4]">
          {t(titleKey)}
        </h2>
        <p className="text-xl w-9/10 leading-[140%] mb-8 text-text200">
          {t(descriptionKey)}
        </p>
        {children}
      </div>
    </div>
  )
}

export default CalloutBanner
