import { StaticImageData } from "next/image"
import { useTranslation } from "next-i18next"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { ButtonLink } from "./ui/buttons/Button"
import InlineLink from "./ui/Link"
import { TwImage } from "./Image"

export type Layer2ProductCardProps = {
  children?: React.ReactNode
  url?: string
  background: string
  image: StaticImageData
  name: string
  description: string
  note?: string
  alt?: string
  bridge?: string
  tokenLists?: string
  ecosystemPortal?: string
}

const Layer2ProductCard = ({
  url,
  background,
  image,
  name,
  description,
  note = "",
  alt = "",
  children,
  bridge,
  tokenLists,
  ecosystemPortal,
}: Layer2ProductCardProps) => {
  const { t } = useTranslation("page-layer-2")

  return (
    <Card className="flex flex-col justify-between rounded-md border-0 bg-background-highlight p-2 shadow-lg transition-transform duration-100 hover:scale-[1.02]">
      <div
        className="mb-4 flex min-h-[200px] items-center justify-center border-b"
        style={{ backgroundColor: background }}
      >
        <TwImage
          src={image}
          alt={alt}
          width={100}
          className="max-h-[257px] object-cover"
        />
      </div>

      <CardHeader className="py-0">
        <div className="space-y-4">
          <h3 className="mb-3 text-xl font-semibold md:text-2xl">{name}</h3>
          {children && <div>{children}</div>}
        </div>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col gap-0 space-y-1 px-6 py-4">
        <div className="space-y-2">
          <p className="text-sm leading-snug">{description}</p>

          {note && (
            <p className="text-sm leading-snug">
              {t("layer-2-note")} {note}
            </p>
          )}
        </div>

        <div className="space-y-1">
          {bridge && (
            <InlineLink
              href={bridge}
              className="block text-primary underline hover:text-primary/80"
            >
              {name} {t("layer-2-bridge")}
            </InlineLink>
          )}

          {ecosystemPortal && (
            <InlineLink
              href={ecosystemPortal}
              className="block text-primary underline hover:text-primary/80"
            >
              {name} {t("layer-2-ecosystem-portal")}
            </InlineLink>
          )}

          {tokenLists && (
            <InlineLink
              href={tokenLists}
              className="block text-primary underline hover:text-primary/80"
            >
              {name} {t("layer-2-token-lists")}
            </InlineLink>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-2 p-2">
        {url && (
          <ButtonLink className="w-full" href={url}>
            {t("layer-2-explore")} {name}
          </ButtonLink>
        )}
      </CardFooter>
    </Card>
  )
}

export default Layer2ProductCard
