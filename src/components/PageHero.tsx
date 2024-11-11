import type { ReactNode } from "react"

import { type ImageProps, TwImage } from "@/components/Image"

import { cn } from "@/lib/utils/cn"
import { type MatomoEventOptions } from "@/lib/utils/matomo"

import {
  Button,
  ButtonLink,
  ButtonLinkProps,
  ButtonProps,
} from "./ui/buttons/Button"
import { Center, Flex } from "./ui/flex"

type ButtonLinkType = Omit<ButtonLinkProps, "content"> & {
  content: ReactNode
  matomo: MatomoEventOptions
}

type ButtonType = Omit<ButtonProps, "content"> & {
  content: ReactNode
  matomo: MatomoEventOptions
}

export type ContentType = {
  buttons?: (ButtonLinkType | ButtonType)[]
  title: ReactNode
  header: ReactNode
  subtitle: ReactNode
  image: ImageProps["src"]
  alt: string
}

type PageHeroProps = {
  content: ContentType
  isReverse?: boolean
  children?: ReactNode
  className?: string
}

const isButtonLink = (
  button: ButtonType | ButtonLinkType
): button is ButtonLinkType => (button as ButtonLinkType).href !== undefined

const PageHero = ({
  content: { buttons, title, header, subtitle, image, alt },
  isReverse = false,
  children,
  className,
}: PageHeroProps) => (
  <div className="w-full px-8 py-4">
    <Flex
      className={cn(
        "mt-8 justify-between px-0 lg:px-16",
        isReverse ? "flex-col" : "flex-col-reverse",
        "lg:flex-row",
        className
      )}
    >
      <div
        className={cn(
          "max-w-full lg:max-w-[640px]",
          isReverse ? "pb-8 pt-0" : "pb-0 pt-8",
          "lg:pb-32 lg:pt-16",
          "ps-0 lg:ps-8",
          "me-0 lg:me-4"
        )}
      >
        <h1 className="mb-4 mt-0 text-md font-normal uppercase !leading-xs lg:mt-8">
          {title}
        </h1>

        <h2 className="mb-0 mt-8 max-w-full text-[2.5rem] font-bold !leading-xs lg:mt-12 lg:text-5xl">
          {header}
        </h2>
        <p className="mb-8 mt-4 text-xl !leading-xs lg:text-2xl">{subtitle}</p>

        {buttons && (
          <Flex className="gap-2 overflow-visible [&_ul]:m-0">
            {buttons.map((button, idx) => {
              const isSecondary = idx !== 0
              if (isButtonLink(button)) {
                return (
                  <div key={idx}>
                    <ButtonLink
                      variant={button.variant}
                      href={button.href}
                      customEventOptions={{
                        eventCategory: button.matomo.eventCategory,
                        eventAction: button.matomo.eventAction,
                        eventName: button.matomo.eventName,
                      }}
                      isSecondary={isSecondary}
                    >
                      {button.content}
                    </ButtonLink>
                  </div>
                )
              }

              if (button.toId) {
                return (
                  <div key={idx}>
                    <Button
                      variant={button.variant}
                      toId={button.toId}
                      customEventOptions={{
                        eventCategory: button.matomo.eventCategory,
                        eventAction: button.matomo.eventAction,
                        eventName: button.matomo.eventName,
                      }}
                      isSecondary={isSecondary}
                    >
                      {button.content}
                    </Button>
                  </div>
                )
              }
            })}
          </Flex>
        )}
        {children}
      </div>
      <Center
        className={cn(
          "flex-[1_1_50%]",
          "max-w-[560px] lg:max-w-[624px]",
          "mt-0 lg:mt-12",
          "ms-0 lg:ms-12",
          "w-full self-center"
        )}
      >
        <TwImage
          src={image}
          // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
          sizes="(max-width: 992px) 100vw, 624px"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
          alt={alt}
          priority
        />
      </Center>
    </Flex>
  </div>
)

export default PageHero
