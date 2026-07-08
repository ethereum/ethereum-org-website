"use client"

import { Image } from "@/components/Image"

import useColorModeValue from "@/hooks/useColorModeValue"
import darkThemeCertificateImg from "@/public/images/certificates/dark-certificate.png"
import lightThemeCertificateImg from "@/public/images/certificates/light-certificate.png"

export const ThemedCertificate = () => {
  const themedCertificateImage = useColorModeValue(
    lightThemeCertificateImg,
    darkThemeCertificateImg
  )
  return (
    <Image
      src={themedCertificateImage}
      alt="translator certificate"
      sizes="(max-width: 880px) calc(100vw - 80px), 720px"
    />
  )
}

export default ThemedCertificate
