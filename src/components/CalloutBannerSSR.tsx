import { cva, type VariantProps } from "class-variance-authority"

import { Image, type ImageProps } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

const variants = cva(
  cn(
    "flex flex-col rounded-xl p-8 sm:p-12 lg:flex-row-reverse",
    "from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20 bg-linear-to-r",
    "[&_[data-label='description']]:text-body-medium"
  ),
  {
    variants: {
      variant: {
        large: cn(
          "[&_[data-label='container']]:flex [&_[data-label='container']]:w-full [&_[data-label='container']]:flex-shrink-0 [&_[data-label='container']]:flex-grow [&_[data-label='container']]:basis-1/2 [&_[data-label='container']]:flex-col [&_[data-label='container']]:justify-center [&_[data-label='container']]:sm:ps-4 [&_[data-label='container']]:lg:w-[inherit] [&_[data-label='container']]:lg:ps-8",
          "[&_h2]:mb-8 [&_h2]:text-2xl [&_h2]:leading-xs [&_h2]:sm:text-[2rem]",
          "[&_[data-label='description']]:mb-8 [&_[data-label='description']]:w-[90%] [&_[data-label='description']]:text-xl"
        ),
        medium: cn(
          "[&_[data-label='container']]:space-y-8",
          "[&_h2]:mb-8 [&_h2]:text-2xl [&_h2]:leading-xs [&_h2]:sm:text-[2rem]",
          "[&_[data-label='description']]:text-inherit"
        ),
        small: cn(
          "[&_[data-label='container']]:space-y-4",
          "[&_h2]:text-xl [&_h2]:text-body [&_h2]:md:text-2xl",
          "[&_img]:max-w-64"
        ),
      },
    },
    defaultVariants: {
      variant: "large",
    },
  }
)

export type CalloutBannerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof variants> & {
    image?: ImageProps["src"]
    imageWidth?: number
    title: string
    description: string
    alt?: string
  }

const CalloutBannerSSR = ({
  image,
  imageWidth,
  title,
  description,
  alt = "",
  children,
  className,
  variant,
  ...props
}: CalloutBannerProps) => (
  <aside className={cn(variants({ variant }), className)} {...props}>
    {image && (
      <div className="flex">
        <Image
          src={image}
          alt={alt}
          width={imageWidth}
          className="mx-auto -my-24 object-contain max-lg:mb-0"
        />
      </div>
    )}

    <div data-label="container">
      <h2>{title}</h2>
      <p data-label="description">{description}</p>

      {children}
    </div>
  </aside>
)

export default CalloutBannerSSR
