import NotFoundPage from "@/components/NotFoundPage"

import { DEFAULT_LOCALE } from "@/lib/constants"

import LocaleLayout from "./[locale]/layout"

export default async function GlobalNotFound() {
  return (
    <LocaleLayout params={Promise.resolve({ locale: DEFAULT_LOCALE })}>
      <NotFoundPage />
    </LocaleLayout>
  )
}
