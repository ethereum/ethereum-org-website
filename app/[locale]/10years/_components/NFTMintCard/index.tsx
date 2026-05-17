import { getTranslations } from "next-intl/server"

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import Link from "@/components/ui/Link"

import Curved10YearsText from "@/public/images/10-year-anniversary/10y-curved-heading.svg"

const TORCH_CONTRACT_ADDRESS = "0x26d85a13212433fe6a8381969c2b0db390a0b0ae"

const NFTMintCard = async () => {
  const t = await getTranslations("page-10-year-anniversary")

  return (
    <Card className="text-center shadow-lg" background="radial-a" spacing="lg">
      <CardHeader>
        <div className="relative">
          {/* Torch/flame video */}
          <div className="flex items-center justify-center pt-12">
            <div className="relative max-h-[200px] max-w-[200px] overflow-hidden rounded-full border-4 border-white bg-white">
              <video
                className="pointer-events-none h-full w-full rounded-full object-cover select-none"
                src="/videos/10y-video.mp4"
                aria-label={t("page-10-year-video-aria-label")}
                autoPlay
                loop
                muted
                poster="/images/10-year-anniversary/10y-cover.png"
                controlsList="nodownload"
                disablePictureInPicture
                playsInline
              />
            </div>
          </div>

          {/* Curved text */}
          <Curved10YearsText
            viewBox="0 0 313 186"
            className="absolute top-0 left-1/2 h-min w-full max-w-[300px] -translate-x-1/2 fill-primary"
            width="100%"
            height="auto"
          />
        </div>
      </CardHeader>

      <CardContent spacing="lg">
        <CardTitle>{t("page-10-year-mint-card-title")}</CardTitle>

        <CardParagraph variant="light">
          {t("page-10-year-mint-card-description")}
        </CardParagraph>
      </CardContent>

      <CardFooter>
        <Alert
          variant="update"
          className="rounded-[max(0px,calc(var(--card-radius)-var(--card-pad)))] border-none"
        >
          <AlertContent>
            <AlertTitle>{t("page-10-year-mint-card-ended-title")}</AlertTitle>
            <AlertDescription className="text-primary">
              {t("page-10-year-mint-card-ended-description")}
            </AlertDescription>
            <Link
              href={`https://opensea.io/item/ethereum/${TORCH_CONTRACT_ADDRESS}`}
              title={TORCH_CONTRACT_ADDRESS}
            >
              {t("page-10-year-nft-link-label")}
            </Link>
          </AlertContent>
        </Alert>
      </CardFooter>
    </Card>
  )
}

export default NFTMintCard
