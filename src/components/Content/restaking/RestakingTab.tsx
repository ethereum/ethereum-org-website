"use client"

import Image from "next/image"

import type { ChildOnlyProp } from "@/lib/types"

import { Center } from "@/components/ui/flex"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
                src="/images/use-cases/with_restaking-light.png"
                alt="Restaking diagram light mode"
                width={400}
                height={400}
                className="block dark:hidden"
              />
              {/* Dark Mode Image */}
              <Image
                src="/images/use-cases/with_restaking-dark.png"
                alt="Restaking diagram dark mode"
                width={400}
                height={400}
                className="hidden dark:block"
              />
            </div>
          </TabsContent>

          <TabsContent value="withoutRestaking">
            <div className="flex justify-center">
              {/* Light Mode Image */}
              <Image
                src="/images/use-cases/without_restaking-light.png"
                alt="Restaking diagram light mode"
                width={400}
                height={400}
                className="block dark:hidden"
              />
              {/* Dark Mode Image */}
              <Image
                src="/images/use-cases/without_restaking-dark.png"
                alt="Restaking diagram dark mode"
                width={400}
                height={400}
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
