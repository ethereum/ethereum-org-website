import InterceptedToolDetail from "../../../_components/InterceptedToolDetail"

// Intercepts a tool opened from the catalog index (`/developers/tools/`).
const Page = async (props: {
  params: Promise<{ locale: string; category: string; tool: string }>
}) => {
  const { locale, category, tool } = await props.params
  return (
    <InterceptedToolDetail locale={locale} category={category} tool={tool} />
  )
}

export default Page
