import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import mdComponents from "@/components/MdComponents"

import { tutorialsComponents } from "@/layouts/Tutorial"
import { contentSource } from "@/lib/poc-fumadocs/source"

type Params = { locale: string; slug: string[] }

// PoC cutover: this catch-all is served entirely by Fumadocs for English.
// Non-English locales 404 here until the i18n adapter lands — see
// docs/poc/fumadocs-evaluation.md for the open i18n question.
export default async function Page(props: { params: Promise<Params> }) {
  const { locale, slug } = await props.params

  if (locale !== "en") notFound()

  const page = contentSource.getPage(slug)
  if (!page) notFound()

  const MDXContent = page.data.body
  const toc = page.data.toc

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8">
        <h1 className="mt-2 text-4xl font-bold">
          {page.data.title ?? slug.join("/")}
        </h1>
        {page.data.description ? (
          <p className="text-muted-foreground mt-3 text-lg">
            {page.data.description}
          </p>
        ) : null}
      </header>

      {toc?.length ? (
        <aside className="mb-8 rounded-md border p-4 text-sm">
          <p className="mb-2 font-semibold">On this page</p>
          <ol className="ml-4 list-decimal space-y-1">
            {toc.map((item) => (
              <li key={item.url}>
                <a href={item.url} className="text-primary underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>
      ) : null}

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXContent components={{ ...mdComponents, ...tutorialsComponents }} />
      </article>
    </main>
  )
}

export async function generateStaticParams() {
  // English only; non-EN locales return notFound() above.
  return contentSource.generateParams().map((p) => ({
    ...p,
    locale: "en",
  }))
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { locale, slug } = await props.params
  if (locale !== "en") {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
  const page = contentSource.getPage(slug)
  if (!page) {
    const t = await getTranslations("common")
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
  return {
    title: page.data.title,
    description: page.data.description,
  }
}
