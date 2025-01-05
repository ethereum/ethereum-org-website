export async function generateStaticParams() {
  return [{ locale: "en" }]
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: "en" }
}>) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  )
}
