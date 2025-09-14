import type { TranslationKey } from "@/lib/types"

import { Image, type ImageProps } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

import { useTranslation } from "@/hooks/useTranslation"

export type CalloutBannerProps = React.HTMLAttributes<HTMLDivElement> & {
  image: ImageProps["src"]
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
  className,
  ...props
}: CalloutBannerProps) => {
  const { t } = useTranslation("page-staking")

  return (
    <aside
      className={cn(
        "flex flex-col rounded p-8 sm:p-12 lg:flex-row-reverse",
        "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20",
        className
      )}
      {...props}
    >
      <div className="flex">
        <Image
          src={image}
          alt={alt}
          width={imageWidth}
          className="-my-24 mx-auto object-contain max-lg:mb-0"
        />
      </div>

      <div className="flex w-full flex-shrink-0 flex-grow basis-1/2 flex-col justify-center sm:ps-4 lg:w-[inherit] lg:ps-8">
        <h2 className="mb-8 text-2xl leading-xs sm:text-[2rem]">
          {t(titleKey)}
        </h2>
        <p className="mb-8 w-[90%] text-xl text-body-medium">
          {t(descriptionKey)}
        </p>
        {children}
      </div>
    </aside>
  )
}

export default CalloutBanner
