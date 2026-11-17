const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  return <p>{slug}</p>
}

export default Page
