"use client"

import { cloneElement, useMemo, useState } from "react"
import { motion } from "framer-motion"
import isEqual from "lodash/isEqual"
import { MdClose } from "react-icons/md"
import {
  ControlButton,
  Controls,
  Node,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react"

import FeedbackCard from "@/components/FeedbackCard"
import { ContentHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils/cn"

import {
  EndGoalNode,
  FeatureResearchNode,
  FeatureScheduledNode,
  FeatureShippedNode,
  GroupNode,
  RollupStageNode,
  TaskIdeaNode,
  TaskResearchNode,
  TaskScheduledNode,
  TaskShippedNode,
  TrackNode,
} from "./CustomNodes"
import { useTracks } from "./useTracks"

import "@xyflow/react/dist/style.css"

import { useActiveHash } from "@/hooks/useActiveHash"

type NodeData = {
  label?: string
  track?: string
  description?: string[]
  releaseDate?: string
  sublabel?: string
  stage?: string
  percentage?: number
  topNode?: boolean
  leftNode?: boolean
  rightNode?: boolean
  bottomNode?: boolean
  releaseLabel?: string
  releasePageURL?: string
  benefits?: string[]
  furtherReading?: {
    title: string
    url: string
  }[]
}

const RoadmapTracksPage = () => {
  const tracks = useTracks()
  const [openItems, setOpenItems] = useState<string[]>(() =>
    tracks.map(({ key }) => key)
  )
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null)
  const nodeTypes = useMemo(
    () => ({
      endGoal: EndGoalNode,
      featureResearch: FeatureResearchNode,
      featureScheduled: FeatureScheduledNode,
      featureShipped: FeatureShippedNode,
      group: GroupNode,
      rollupStage: RollupStageNode,
      taskIdea: TaskIdeaNode,
      taskResearch: TaskResearchNode,
      taskScheduled: TaskScheduledNode,
      taskShipped: TaskShippedNode,
      track: TrackNode,
    }),
    []
  )
  const activeSection = useActiveHash(
    tracks.map(({ key }) => key),
    "0% 0% -70% 0%"
  ).replace(/^#/, "")

  const popoverConfig = {
    endGoal: {
      border: "border-primary",
      background: "bg-gradient-to-b from-primary-high-contrast/10",
      pillStyles: "bg-primary text-body-inverse",
      pillText: "END GOAL",
    },
    featureResearch: {
      border: "border-border",
      background: "bg-gradient-to-b from-background-medium/10",
      pillStyles: "bg-background-medium",
      pillText: "RESEARCH",
    },
    featureScheduled: {
      border: "border-warning",
      background: "bg-gradient-to-b from-warning/10",
      pillStyles: "bg-warning",
      pillText: "SCHEDULED",
    },
    featureShipped: {
      border: "border-success",
      background: "bg-gradient-to-b from-success/10",
      pillStyles: "bg-success",
      pillText: "SHIPPED",
    },
    rollupStage: {
      border: "border-primary-high-contrast",
      background: "bg-gradient-to-b from-primary-high-contrast/10",
      pillStyles: "bg-primary-high-contrast text-body-inverse",
      pillText: "STAGE",
    },
    taskIdea: {
      border: "border-background-highlight",
      background: "bg-gradient-to-b from-background-high/10",
      pillStyles: "bg-background-high",
      pillText: "IDEA",
    },
    taskResearch: {
      border: "border-border",
      background: "bg-gradient-to-b from-medium/10",
      pillStyles: "bg-background-medium",
      pillText: "RESEARCH",
    },
    taskScheduled: {
      border: "border-warning",
      background: "bg-gradient-to-b from-warning/10",
      pillStyles: "bg-warning",
      pillText: "SCHEDULED",
    },
    taskShipped: {
      border: "border-success",
      background: "bg-gradient-to-b from-success/10",
      pillStyles: "bg-success",
      pillText: "SHIPPED",
    },
    track: {
      border: "border-primary",
      background: "bg-gradient-to-b from-primary-high-contrast/10",
      pillStyles: "bg-primary-high-contrast text-body-inverse",
      pillText: "TRACK",
    },
  }

  const progressBar = (track) => {
    const nodes = track.nodes.nodes.filter(
      (node) =>
        node.type !== "track" &&
        node.type !== "group" &&
        node.type !== "featureResearch"
    )
    const completionPercentage =
      nodes.reduce((acc, node) => {
        if (node.type.includes("Shipped")) {
          return acc + 100
        }
        if (node.type.includes("Scheduled")) {
          return acc + 100
        }
        if (node.type.includes("Research")) {
          return acc + node.data.percentage
        }
        return acc
      }, 0) / nodes.length

    return {
      percentage: Math.round(completionPercentage),
      textColor: completionPercentage >= 50 ? "text-success" : "text-warning",
      backgroundColor:
        completionPercentage >= 50 ? "bg-success/20" : "bg-warning/20",
      progressColor: completionPercentage >= 50 ? "bg-success" : "bg-warning",
    }
  }

  const CustomControls = () => {
    const { zoomIn, zoomOut } = useReactFlow()

    return (
      <Controls
        showInteractive={false}
        showFitView={false}
        showZoom={false}
        orientation="horizontal"
        className="flex gap-2 !shadow-none"
      >
        <ControlButton
          onClick={() => zoomOut()}
          className="rounded-full !border-r-0 !bg-background-highlight p-2 !shadow-none hover:!bg-background-low active:!bg-background-low"
        >
          <p className="text-sm !text-body-medium">-</p>
        </ControlButton>
        <ControlButton
          onClick={() => zoomIn()}
          className="rounded-full !border-r-0 !bg-background-highlight p-2 !shadow-none hover:!bg-background-low active:!bg-background-low"
        >
          <p className="text-sm !text-body-medium">+</p>
        </ControlButton>
      </Controls>
    )
  }

  return (
    <MainArticle className="relative flex flex-col">
      <ContentHero
        title="Roadmap tracks"
        description="The Ethereum roadmap, like Ethereum itself, doesn't have a single person or group in charge. One interpretation comes from Ethereum co-founder Vitalik Buterin's 2022 vision, with development shaped by contributions from across the Ethereum community."
        heroImg={"/images/roadmap/roadmap-tracks-hero.png"}
        blurDataURL={""}
        breadcrumbs={{ slug: "roadmap/tracks", startDepth: 1 }}
      />

      <div className="mb-4 mt-8 flex flex-col items-center pt-4 text-center md:top-6 md:px-2">
        View the tracks
      </div>

      <div className="sticky top-1 top-[70px] z-50 mb-8 flex flex-col items-center pb-4 text-center md:top-24 md:px-2">
        <nav className="z-50 mx-4 flex max-w-full gap-1 overflow-x-auto bg-background p-2 shadow md:max-w-[calc(100%-2rem)] md:rounded-2xl md:border md:p-0.5 md:shadow-lg">
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
                  className="absolute inset-0 z-sticky rounded-xl bg-primary-low-contrast"
                />
              )}
              {icon && <span className="z-sticky text-lg">{icon}</span>}
              <span className="relative z-sticky">{title}</span>
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
          {tracks.map(({ key, icon, contentData }) => {
            const progressData = progressBar(contentData)
            return (
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
                    <div className="box-border flex items-center justify-center rounded-2xl border bg-background-highlight p-2">
                      <span className="flex aspect-square h-9 w-9 items-center justify-center lg:h-10 lg:w-10">
                        {cloneElement(icon as React.ReactElement, {
                          className: "w-8 h-8",
                          style: { overflow: "visible" },
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
                    <hr className="flex lg:hidden" />
                    <div className="flex items-center">
                      <div className="min-w-[98px] rounded-full border border-primary px-4 py-2 text-primary">
                        <span>
                          {openItems.includes(key) ? "CLOSE -" : "OPEN +"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center gap-2 text-start lg:flex-row">
                    <div className="flex w-full text-start lg:w-fit">
                      <p
                        className={cn(
                          progressData.textColor,
                          "whitespace-nowrap text-start font-mono"
                        )}
                      >
                        {progressData.percentage}% completed
                      </p>
                    </div>
                    <div
                      className={cn(
                        progressData.backgroundColor,
                        "relative h-3 w-full rounded-full"
                      )}
                    >
                      <div
                        className={cn(
                          progressData.progressColor,
                          "absolute left-0 top-0 h-full rounded-full"
                        )}
                        style={{
                          width: `${progressData.percentage}%`,
                        }}
                      />
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
                      nodesDraggable={false}
                      nodesConnectable={false}
                      panOnDrag={true}
                      proOptions={{ hideAttribution: true }}
                      onNodeClick={(_, node) => {
                        if (node.type === "group") return

                        if (isEqual(node, selectedNode)) {
                          setSelectedNode(null)
                        } else {
                          setSelectedNode({
                            ...node,
                            data: node.data as NodeData,
                          })
                        }
                      }}
                    >
                      <CustomControls />
                    </ReactFlow>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      <Popover
        open={!!selectedNode}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedNode(null)
          }
        }}
      >
        <PopoverTrigger asChild>
          <div className="fixed right-4 top-24" />
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "mt-0 max-h-[calc(100vh-7rem)] min-h-64 w-64 overflow-scroll rounded-2xl border p-0 shadow-lg sm:w-72 md:w-96",
            popoverConfig[selectedNode?.type as keyof typeof popoverConfig]
              ?.border
          )}
          side="right"
          align="start"
          sideOffset={0}
        >
          <div
            className={cn(
              "flex flex-col p-4 lg:p-8",
              popoverConfig[selectedNode?.type as keyof typeof popoverConfig]
                ?.background
            )}
          >
            <div className="h sticky top-4 z-10 mb-2 w-full bg-inherit text-end">
              <Button
                variant="ghost"
                className="text-body-medium"
                onClick={() => setSelectedNode(null)}
              >
                <MdClose />
              </Button>
            </div>
            <div
              className={cn(
                "mb-4 w-fit rounded-full px-2 py-1 text-xs",
                popoverConfig[selectedNode?.type as keyof typeof popoverConfig]
                  ?.pillStyles
              )}
            >
              {
                popoverConfig[selectedNode?.type as keyof typeof popoverConfig]
                  ?.pillText
              }
            </div>
            <div className="mb-5">
              <p className="font-mono text-body-medium">
                {selectedNode?.data.track}
              </p>
              <p className="text-2xl font-bold">{selectedNode?.data.label}</p>
            </div>
            <div className="flex flex-col gap-2">
              {selectedNode?.data?.description?.map((description) => (
                <p key={description} className="text-md">
                  {description}
                </p>
              ))}
            </div>
            <hr className="my-5" />
            <div className="mb-8 flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <p className="text-md font-bold">
                  {popoverConfig[
                    selectedNode?.type as keyof typeof popoverConfig
                  ]?.pillText === "SHIPPED"
                    ? "Shipped:"
                    : "Estimated release:"}
                </p>
                <p className="text-md">{selectedNode?.data?.releaseDate}</p>
              </div>
              {selectedNode?.data?.releaseLabel && (
                <div className="flex flex-col gap-1">
                  <p className="text-md font-bold">Related upgrade:</p>
                  <Link href={selectedNode?.data?.releasePageURL}>
                    {selectedNode?.data?.releaseLabel}
                  </Link>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <p className="text-md font-bold">Benefits:</p>
                <ul className="mb-0">
                  {selectedNode?.data?.benefits?.map((benefit) => (
                    <li key={benefit} className="last:mb-0">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-md font-bold">Further reading:</p>
                <ul className="mb-0">
                  {selectedNode?.data?.furtherReading?.map((reading) => (
                    <li key={reading.title} className="last:mb-0">
                      <Link href={reading.url}>{reading.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <FeedbackCard />
    </MainArticle>
  )
}

export default RoadmapTracksPage
