"use client"

import Image from "next/image"

import type { ChildOnlyProp } from "@/lib/types"

import { Center } from "@/components/ui/flex"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import withRestakingDark from "@/public/images/use-cases/with-restaking-dark.png"
import withRestakingLight from "@/public/images/use-cases/with-restaking-light.png"
import withoutRestakingDark from "@/public/images/use-cases/without-restaking-dark.png"
import withoutRestakingLight from "@/public/images/use-cases/without-restaking-light.png"

const Width60 = (props: ChildOnlyProp) => (
  <div className="w-full flex-[3]" {...props} />
)

const Width40 = (props: ChildOnlyProp) => (
  <Center className="w-full flex-[2]" {...props} />
)

export default function TabbedSection() {
  return (
    <>
      <Width60>
        <Tabs defaultValue="withRestaking" className="w-full max-w-4xl">
          <TabsList className="mb-6 flex">
            <TabsTrigger value="withRestaking">
              A world with restaking
            </TabsTrigger>
            <TabsTrigger value="withoutRestaking">
              A world without restaking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="withRestaking">
            <div className="flex justify-center">
              {/* Light Mode Image */}
              <Image
                src={withRestakingLight}
                alt="Restaking diagram light mode"
                className="block dark:hidden"
              />
              {/* Dark Mode Image */}
              <Image
                src={withRestakingDark}
                alt="Restaking diagram dark mode"
                className="hidden dark:block"
              />
            </div>
          </TabsContent>

          <TabsContent value="withoutRestaking">
            <div className="flex justify-center">
              {/* Light Mode Image */}
              <Image
                src={withoutRestakingLight}
                alt="Restaking diagram light mode"
                className="block dark:hidden"
              />
              {/* Dark Mode Image */}
              <Image
                src={withoutRestakingDark}
                alt="Restaking diagram dark mode"
                className="hidden dark:block"
              />
            </div>
          </TabsContent>
        </Tabs>
      </Width60>
      <Width40 />
    </>
  )
}
