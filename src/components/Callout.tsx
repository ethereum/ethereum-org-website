import { useTranslation } from "next-i18next"

import type { TranslationKey } from "@/lib/types"

import Emoji from "@/components/Emoji"
import { type ImageProps, TwImage } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

export type CalloutProps = {
  children?: React.ReactNode
  image?: ImageProps["src"]
  emoji?: string
  alt?: string
  titleKey?: TranslationKey
  descriptionKey?: TranslationKey
  title?: string
  description?: string
  className?: string
  headerClassName?: string
}

const Callout = ({
  image,
  emoji,
  alt,
  titleKey,
  descriptionKey,
  title,
  description,
  children,
  className,
  headerClassName,
}: CalloutProps) => {
  const { t } = useTranslation("common")

  return (
    <aside
      className={cn(
        "m-4 mb-16 mt-32 flex flex-1 flex-col rounded bg-gradient-to-br from-[rgba(127,127,213,0.2)] via-[rgba(134,168,231,0.2)] to-[rgba(145,234,228,0.2)] p-6 sm:p-12 lg:mb-4",
        className
      )}
    >
      {image && (
        <div className="-mt-40 self-center">
          <TwImage
            src={image}
            alt={alt || ""}
            className="max-h-[263px] min-h-[200px] max-w-[263px] object-contain"
          />
        </div>
      )}
      <div className="flex h-full flex-col justify-between">
        <div>
          {emoji && <Emoji text={emoji} className="text-5xl" />}
          {titleKey && (
            <h3
              className={cn(
                "mb-8 mt-10 text-2xl leading-[1.4]",
                headerClassName
              )}
            >
              {t(titleKey)}
            </h3>
          )}
          {title && (
            <h3
              className={cn(
                "mb-8 mt-10 text-2xl leading-[1.4]",
                headerClassName
              )}
            >
              {title}
            </h3>
          )}
          {descriptionKey && (
            <p className="mb-6 text-xl leading-[140%] text-body-medium">
              {t(descriptionKey)}
            </p>
          )}
          {description && (
            <p className="mb-6 text-xl leading-[140%] text-body-medium">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </aside>
  )
}

export default Callout
