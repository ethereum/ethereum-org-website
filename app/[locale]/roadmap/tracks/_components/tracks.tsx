"use client"

import { cloneElement, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ReactFlow } from "@xyflow/react"

import BannerNotification from "@/components/Banners/BannerNotification"
import FeedbackCard from "@/components/FeedbackCard"
import { ContentHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import {
  EndGoalNode,
  FeatureResearchNode,
  FeatureScheduledNode,
  FeatureShippedNode,
  TaskIdeaNode,
  TaskResearchNode,
  TaskScheduledNode,
  TaskShippedNode,
} from "./CustomNodes"
import { useTracks } from "./useTracks"

import "@xyflow/react/dist/style.css"

import { useActiveHash } from "@/hooks/useActiveHash"
import { useTranslation } from "@/hooks/useTranslation"

const RoadmapTracksPage = () => {
  const { t } = useTranslation("page-roadmap-tracks")
  const tracks = useTracks()
  const [openItems, setOpenItems] = useState<string[]>(() =>
    tracks.map(({ key }) => key)
  )
  const nodeTypes = useMemo(
    () => ({
      endGoal: EndGoalNode,
      featureResearch: FeatureResearchNode,
      featureScheduled: FeatureScheduledNode,
      featureShipped: FeatureShippedNode,
      taskIdea: TaskIdeaNode,
      taskResearch: TaskResearchNode,
      taskScheduled: TaskScheduledNode,
      taskShipped: TaskShippedNode,
    }),
    []
  )
  const activeSection = useActiveHash(
    tracks.map(({ key }) => key),
    "0% 0% -70% 0%"
  ).replace(/^#/, "")

  return (
    <MainArticle className="relative flex flex-col">
      <BannerNotification shouldShow>
        <p>
          Ethereum&apos;s development is community-driven and subject to change.
        </p>
      </BannerNotification>
      <ContentHero
        title="Roadmap tracks"
        description="The Ethereum roadmap, like Ethereum itself, doesn't have a single person or group in charge. One interpretation comes from Ethereum co-founder Vitalik Buterin's 2022 vision, with development shaped by contributions from across the Ethereum community."
        heroImg={"/images/roadmap/roadmap-tracks-hero.png"}
        blurDataURL={""}
        breadcrumbs={{ slug: "roadmap/tracks", startDepth: 1 }}
      />

      <div className="sticky top-1 my-8 flex flex-col items-center gap-3 py-4 text-center md:top-6 md:px-2">
        <div className="my-2 text-body-medium">
          {t("page-roadmap-tracks-whats-on-this-page")}
        </div>
        <nav className="z-sticky mx-4 flex max-w-full gap-1 overflow-x-auto bg-background p-2 shadow md:max-w-[calc(100%-2rem)] md:rounded-2xl md:border md:p-0.5 md:shadow-lg">
          {tracks.map(({ key, title, icon }) => (
            <ButtonLink
              key={key}
              href={`#${key}`}
              variant="ghost"
              isSecondary
              className={cn(
                "relative text-nowrap rounded-xl px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
                activeSection === key && "!text-primary"
              )}
            >
              {activeSection === key && (
                <motion.div
                  layoutId="active-section-highlight"
                  className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast"
                />
              )}
              {icon && <span className="z-10 text-lg">{icon}</span>}
              <span className="relative z-10">{title}</span>
            </ButtonLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-6 px-4 2xl:px-0">
        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
          className="flex w-full flex-col items-start gap-4 px-0"
        >
          {tracks.map(({ key, icon, contentData }) => (
            <AccordionItem
              key={key}
              id={key}
              value={key}
              className="flex w-full scroll-mt-40 flex-col items-start rounded-2xl border bg-background px-0 shadow-lg hover:bg-background-highlight"
            >
              <AccordionTrigger
                hideIcon
                className="w-full flex-col items-start gap-3 rounded-2xl hover:!text-inherit [&[data-state=open]]:!bg-transparent [&[data-state=open]]:!text-inherit [&[data-state=open]]:hover:!bg-background-highlight [&]:!p-4 [&]:hover:!bg-background-highlight sm:[&]:!p-6"
              >
                <div className="flex flex-row items-center gap-3">
                  <div className="flex items-center justify-center rounded-2xl border bg-background-highlight p-2">
                    <span className="flex h-9 w-9 items-center justify-center lg:h-10 lg:w-10">
                      {cloneElement(icon as React.ReactElement, {
                        className: "w-full h-full",
                      })}
                    </span>
                  </div>
                  <h2>{contentData.title}</h2>
                </div>
                <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
                  <div className="flex flex-row gap-8">
                    <div className="w-full text-start lg:w-[360px]">
                      <p className="font-bold">Goals:</p>
                      <p>{contentData.goalDescription}</p>
                    </div>
                    <div className="hidden flex-col gap-2 text-start lg:flex">
                      <p className="font-bold">Benefits:</p>
                      <div className="flex flex-col gap-2">
                        {contentData.benefits.map((benefit) => (
                          <div
                            key={benefit.title}
                            className="flex flex-row items-center gap-2 text-primary"
                          >
                            <div className="flex items-center justify-center rounded-full border p-1">
                              <span className="flex h-[15px] w-[15px]">
                                {cloneElement(
                                  benefit.icon as React.ReactElement,
                                  {
                                    className: "w-full h-full",
                                  }
                                )}
                              </span>
                            </div>
                            <span>{benefit.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="min-w-[98px] rounded-full border border-primary px-4 py-2 text-primary">
                      <span>
                        {openItems.includes(key) ? "CLOSE -" : "OPEN +"}
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="!pt-0">
                <div className="h-[400px] w-full overflow-hidden rounded-2xl border bg-background">
                  <ReactFlow
                    nodes={contentData.nodes.nodes}
                    edges={contentData.nodes.edges}
                    preventScrolling={false}
                    nodeTypes={nodeTypes}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <FeedbackCard />
    </MainArticle>
  )
}

export default RoadmapTracksPage
