"use client"

import BrowserFingerprintLazy from "@/components/PrivacyWidgets/BrowserFingerprint/lazy"

import { useLesson } from "../../lesson-provider"

/** The live fingerprint in lesson mode: what it reads goes into the dossier */
const SendLive = () => {
  const { collect } = useLesson()
  return (
    <BrowserFingerprintLazy
      variant="lesson"
      onCollect={(ids) => collect(...ids)}
    />
  )
}

export default SendLive
