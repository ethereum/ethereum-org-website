import { getTranslations } from "next-intl/server"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"
import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"

import NextChapterLink from "./fixes/next-link"
import Assessment from "./today/assessment"
import SpotTheLeaks from "./today/spot-the-leaks"

const NS = "page-privacy-public-by-default"
const key = (suffix: string) => `${NS}-${suffix}`

// Shown as a code value, not translated
const EXTENSIONS_PAGE = "chrome://extensions"

// Chapter 08, #today: a self-assessment, its leak report and plan, and how to
// check what a wallet really sends. LEGAL-REVIEW copy: rendered as written.
const ChapterToday = async () => {
  const t = await getTranslations(NS)

  const methods = [
    {
      id: "extension",
      body: (
        <>
          <ol className="m-0 space-y-1 ps-5">
            {[1, 2, 3, 4].map((step) => (
              <li key={step}>
                {t.rich(key(`today-verify-extension-step-${step}`), {
                  ...richTags(),
                  extensionsPage: EXTENSIONS_PAGE,
                })}
              </li>
            ))}
          </ol>
          <p className="m-0 text-sm text-body-medium">
            {t(key("today-verify-extension-note"))}
          </p>
        </>
      ),
    },
    {
      id: "desktop",
      body: (
        <>
          <p className="m-0">{t(key("today-verify-desktop-body-1"))}</p>
          <p className="m-0">{t(key("today-verify-desktop-body-2"))}</p>
        </>
      ),
    },
    {
      id: "phone",
      body: (
        <>
          <p className="m-0">
            {t.rich(key("today-verify-phone-body-1"), richTags())}
          </p>
          <p className="m-0">{t(key("today-verify-phone-body-2"))}</p>
        </>
      ),
    },
  ]

  return (
    <div className="flow">
      <Alert variant="warning">
        <AlertContent>
          <AlertDescription>{t(key("today-not-advice"))}</AlertDescription>
        </AlertContent>
      </Alert>

      <p>{t(key("today-intro"))}</p>

      <Assessment />

      <section aria-labelledby="today-verify-title" className="flow">
        <h3 id="today-verify-title">{t(key("today-verify-title"))}</h3>
        <p>{t(key("today-verify-intro"))}</p>
        <ul className="m-0 grid list-none gap-4 md:grid-cols-3">
          {methods.map(({ id, body }) => (
            <li key={id} className="m-0 space-y-3 rounded-base border p-4">
              <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
                {t(key(`today-verify-${id}-label`))}
              </p>
              <h4 className="m-0">{t(key(`today-verify-${id}-title`))}</h4>
              {body}
            </li>
          ))}
        </ul>

        <h4>{t(key("today-look-title"))}</h4>
        <ul>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <li key={item}>{t(key(`today-look-item-${item}`))}</li>
          ))}
        </ul>
      </section>

      <SpotTheLeaks />

      <NextChapterLink id="default" />
    </div>
  )
}

export default ChapterToday
