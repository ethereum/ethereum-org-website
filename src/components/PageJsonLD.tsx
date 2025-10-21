interface PageJsonLDProps {
  structuredData: Record<string, unknown> | Record<string, unknown>[]
}

export default function PageJsonLD({ structuredData }: PageJsonLDProps) {
  const jsonLdArray = Array.isArray(structuredData)
    ? structuredData
    : [structuredData]

  return (
    <>
      {jsonLdArray.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  )
}
