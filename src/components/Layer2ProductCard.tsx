import { StaticImageData } from "next/image"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import { RiExternalLinkLine } from "react-icons/ri"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { Button } from "./ui/button"

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
    <Card className="text-foreground flex flex-col justify-between rounded-md border-0 p-2 shadow-lg transition-transform duration-100 hover:scale-[1.02] dark:bg-background-medium">
      <div
        className="mb-4 flex min-h-[200px] items-center justify-center border-b"
        style={{ backgroundColor: background }}
      >
        <Image
          src={image}
          alt={alt}
          width={100}
          height={100}
          className="max-h-[257px] object-contain"
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
            <Link
              href={bridge}
              className="block text-primary underline hover:text-primary/80"
            >
              {name} {t("layer-2-bridge")}
            </Link>
          )}

          {ecosystemPortal && (
            <Link
              href={ecosystemPortal}
              className="block text-primary underline hover:text-primary/80"
            >
              {name} {t("layer-2-ecosystem-portal")}
            </Link>
          )}

          {tokenLists && (
            <Link
              href={tokenLists}
              className="block text-primary underline hover:text-primary/80"
            >
              {name} {t("layer-2-token-lists")}
            </Link>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-2 p-2">
        {url && (
          <Button
            variant={"default"}
            asChild
            className="w-full rounded-sm hover:text-white hover:shadow-[4px_4px_4px_rgba(147,51,234,0.25)] dark:bg-primary-action dark:hover:bg-primary/90 dark:hover:shadow-[4px_4px_4px_rgba(0,0,0,0.9)]"
          >
            <Link
              href={url}
              className="flex items-center gap-0 text-lg text-white no-underline"
            >
              {t("layer-2-explore")} {name} <RiExternalLinkLine />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default Layer2ProductCard
