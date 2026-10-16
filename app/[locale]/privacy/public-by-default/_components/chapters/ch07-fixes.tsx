import { getTranslations } from "next-intl/server"

import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"

import FixesCards from "./fixes/fixes-cards"
import FixesMeter from "./fixes/fixes-meter"
import NextChapterLink from "./fixes/next-link"
import PrivateMode from "./fixes/private-mode"

const NS = "page-privacy-public-by-default"
const key = (suffix: string) => `${NS}-${suffix}`

// Chapter 07, #fixes: what each fix protects and costs, as switches that
// redact the dossier. LEGAL-REVIEW copy: rendered exactly as written.
const ChapterFixes = async () => {
  const t = await getTranslations(NS)
  return (
    <div className="flow">
      <Alert variant="warning">
        <AlertContent>
          <AlertDescription>{t(key("fixes-not-advice"))}</AlertDescription>
        </AlertContent>
      </Alert>

      <FixesMeter />

      <div className="space-y-2 rounded-base bg-background-highlight p-6">
        <h3 className="mt-0">{t(key("fixes-rule-title"))}</h3>
        <p className="m-0">{t(key("fixes-rule-body"))}</p>
        <p className="m-0 text-body-medium">{t(key("fixes-order-note"))}</p>
      </div>

      <FixesCards />

      <h3>{t(key("fixes-private-title"))}</h3>
      <p>{t(key("fixes-private-body-1"))}</p>
      <p>{t(key("fixes-private-body-2"))}</p>
      <PrivateMode />

      <h3>{t(key("fixes-default-title"))}</h3>
      <p>{t(key("fixes-default-body-1"))}</p>
      <p>{t(key("fixes-default-body-2"))}</p>

      <h3>{t(key("fixes-invisibility-title"))}</h3>
      <p>{t(key("fixes-invisibility-body"))}</p>

      <h3>{t(key("fixes-crowd-title"))}</h3>
      <p>{t(key("fixes-crowd-body"))}</p>

      <NextChapterLink id="today" />
    </div>
  )
}

export default ChapterFixes
