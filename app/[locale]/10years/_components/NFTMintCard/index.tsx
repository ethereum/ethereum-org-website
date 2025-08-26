import { useTranslations } from "next-intl"

import { Alert, AlertContent, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

import Curved10YearsText from "@/public/images/10-year-anniversary/10y-curved-heading.svg"

interface NFTMintCardProps {
  className?: string
}

const NFTMintCard = ({ className }: NFTMintCardProps) => {
  const t = useTranslations("page-10-year-anniversary")

  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#A66BFF20] to-[#EED9FE16] shadow-lg",
        className
      )}
    >
      <CardHeader className="gap-4 pb-0">
        <div className="relative">
          {/* Torch/flame video */}
          <div className="flex items-center justify-center pt-12">
            <div className="relative max-h-[200px] max-w-[200px] overflow-hidden rounded-full border-4 border-white bg-white">
              <video
                className="pointer-events-none h-full w-full select-none rounded-full object-cover"
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
            className="absolute left-1/2 top-0 h-min w-full max-w-[300px] -translate-x-1/2 fill-primary"
            width="100%"
            height="auto"
          />
        </div>

        <CardTitle className="text-center">
          {t("page-10-year-mint-card-title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6 text-center">
        <p className="text-body-medium">
          {t("page-10-year-mint-card-description")}
        </p>

        <Alert
          variant="update"
          className="w-full rounded-none border-none text-center"
        >
          <AlertContent>
            <AlertTitle className="!text-primary">
              {t("page-10-year-mint-card-ended-title")}
            </AlertTitle>
            <p className="text-primary">
              {t("page-10-year-mint-card-ended-description")}
            </p>
          </AlertContent>
        </Alert>
      </CardContent>
    </Card>
  )
}

export default NFTMintCard
