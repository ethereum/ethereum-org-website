import InterceptedToolDetail from "../../_components/InterceptedToolDetail"

// Intercepts a tool opened from the catalog index (`/developers/tools/`).
const Page = async (props: {
  params: Promise<{ locale: string; tool: string }>
}) => {
  const { locale, tool } = await props.params
  return <InterceptedToolDetail locale={locale} toolKey={tool} />
}

export default Page
