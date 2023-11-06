import { useColorModeValue } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import darkImage from "@/public/ef-logo.png"
import lightImage from "@/public/ef-logo-white.png"

const Logo = () => {
  // TODO: Re-enable intl
  // const { t } = useTranslation()
  const image = useColorModeValue(darkImage, lightImage)
  // return <Image src={image} alt={t("ethereum-foundation-logo")} />
  return <Image src={image} h={100} w="auto" alt="Ethereum Foundation logo" />
}

export default Logo
