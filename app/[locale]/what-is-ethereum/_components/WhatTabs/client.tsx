"use client"

import Translation from "@/components/Translation"
import { Stack } from "@/components/ui/flex"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { trackCustomEvent } from "@/lib/utils/matomo"

import useTranslation from "@/hooks/useTranslation"

const WhatTabs = () => {
  const { t } = useTranslation("page-what-is-ethereum")
  const tabs = [
    {
      title: t("page-what-is-ethereum-blockchain-tab-title"),
      eventName: "Blockchain tab",
      content: (
        <p>
          <Translation id="page-what-is-ethereum:page-what-is-ethereum-blockchain-tab-content" />
        </p>
      ),
    },
    {
      title: t("page-what-is-ethereum-cryptocurrency-tab-title"),
      eventName: "Cryptocurrency tab",
      content: (
        <Stack className="gap-6">
          <p>
            <Translation id="page-what-is-ethereum:page-what-is-ethereum-cryptocurrency-tab-content-1" />
          </p>
          <p>
            <Translation id="page-what-is-ethereum:page-what-is-ethereum-cryptocurrency-tab-content-2" />
          </p>
          <p>
            <Translation id="page-what-is-ethereum:page-what-is-ethereum-cryptocurrency-tab-content-3" />
          </p>
        </Stack>
      ),
    },
  ] as const

  return (
    <Tabs
      defaultValue="0"
      onValueChange={(index) => {
        trackCustomEvent({
          eventCategory: `Blockchain/crypto tab`,
          eventAction: `Clicked`,
          eventName: tabs[index].eventName,
        })
      }}
    >
      <TabsList>
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={index.toString()}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={index} value={index.toString()}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default WhatTabs
