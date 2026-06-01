import type { ReactNode } from "react"

import type { MatomoEventOptions } from "@/lib/types"

import { Image, type ImageProps } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

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
          isReverse ? "pt-0 pb-8" : "pt-8 pb-0",
          "lg:pt-16 lg:pb-32",
          "ps-0 lg:ps-8",
          "me-0 lg:me-4"
        )}
      >
        <h1 className="mt-0 mb-4 text-md !leading-xs font-normal uppercase lg:mt-8">
          {title}
        </h1>

        <h2 className="mt-8 mb-0 max-w-full text-[2.5rem] !leading-xs font-bold lg:mt-12 lg:text-5xl">
          {header}
        </h2>
        <p className="mt-4 mb-8 text-xl !leading-xs lg:text-2xl">{subtitle}</p>

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
        <Image
          src={image}
          sizes="(max-width: 624px) calc(100vw - 64px), (max-width: 992px) 560px, 624px"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
          alt={alt}
          preload
        />
      </Center>
    </Flex>
  </div>
)

export default PageHero
