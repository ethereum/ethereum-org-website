import { Image } from "@/components/Image"
import ParallaxImage from "@/components/Image/ParallaxImage"

import TenYearBackgroundImage from "@/public/images/10-year-anniversary/10-year-background.png"
import TenYearGraphicImage from "@/public/images/10-year-anniversary/10-year-graphic.png"

const TenYearHero = () => {
  return (
    <div className="relative">
      <Image src={TenYearBackgroundImage} alt="10 Year Anniversary" />
      <ParallaxImage
        src={TenYearGraphicImage}
        alt="10 Year Anniversary"
        className="absolute left-0 top-0 transition-transform duration-200 ease-out"
      />
    </div>
  )
}

export default TenYearHero
