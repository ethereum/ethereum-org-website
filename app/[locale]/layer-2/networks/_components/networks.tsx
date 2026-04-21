"use client"

import Layer2NetworksTable from "@/components/Layer2NetworksTable"

const Layer2Networks = ({ layer2Data, locale, mainnetData }) => {
  return (
    <Layer2NetworksTable
      layer2Data={layer2Data}
      locale={locale}
      mainnetData={mainnetData}
    />
  )
}

export default Layer2Networks
