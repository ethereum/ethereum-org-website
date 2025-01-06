import { DEFAULT_LOCALE } from "@/lib/constants"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  let Markdown
  if (locale === DEFAULT_LOCALE) {
    Markdown = await import(`../../../content/${slug}/index.md`)
  } else {
    Markdown = await import(
      `../../../content/translations/${locale}/${slug}/index.md`
    )
  }

  console.log("Markdown", Markdown)

  //   const { content, frontmatter } = await compileMDX({
  //     source: markdown,
  //     options: {
  //       parseFrontmatter: true,
  //       mdxOptions: {
  //         remarkPlugins: [
  //           remarkGfm,
  //           [remarkInferToc, { callback: (toc) => console.log("toc", toc) }],
  //         ],
  //         rehypePlugins: [rehypeHeadingIds],
  //       },
  //     },
  //   })

  return (
    <div>
      <Markdown.default />
    </div>
  )
}

export function generateStaticParams() {
  return [
    { locale: "en", slug: "bridges" },
    { locale: "en", slug: "about" },
  ]
}

export const dynamicParams = false
