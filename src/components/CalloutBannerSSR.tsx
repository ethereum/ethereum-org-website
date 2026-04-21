import { Image, type ImageProps } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

export type CalloutBannerProps = React.HTMLAttributes<HTMLDivElement> & {
  image: ImageProps["src"]
  imageWidth?: number
  title: string
  description: string
  alt: string
}

const CalloutBannerSSR = ({
  image,
  imageWidth,
  title,
  description,
  alt,
  children,
  className,
  ...props
}: CalloutBannerProps) => (
  <aside
    className={cn(
      "flex flex-col rounded p-8 sm:p-12 lg:flex-row-reverse",
      "from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20 bg-linear-to-r",
      className
    )}
    {...props}
  >
    <div className="flex">
      <Image
        src={image}
        alt={alt}
        width={imageWidth}
        className="mx-auto -my-24 object-contain max-lg:mb-0"
      />
    </div>

    <div className="flex w-full shrink-0 grow basis-1/2 flex-col justify-center sm:ps-4 lg:w-[inherit] lg:ps-8">
      <h2 className="leading-xs mb-8 text-2xl sm:text-[2rem]">{title}</h2>
      <p className="text-body-medium mb-8 w-[90%] text-xl">{description}</p>
      {children}
    </div>
  </aside>
)

export default CalloutBannerSSR
