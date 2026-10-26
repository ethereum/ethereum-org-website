import { useId } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "@/components/ui/buttons/Button"

import { DiagramHoverProvider, useHoverTargets } from "../diagram-hover"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  DIAGRAM_SVG_FALLBACKS,
  DiagramStage,
  ISO_SVG_CLASS,
  IsoCylinder,
  IsoDefs,
  isoDetail,
  IsoPipe,
  IsoPlate,
  isoProjection,
  isoShadow,
  IsoSolid,
} from "."

const W = 420
const H = 260
const PROJECTION = isoProjection(170, 60)
const { P, path, box, cylinder, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "anatomy-story-shadow"

const PLATE = box(0, 0, -8, 260, 90, 8)
const ACCOUNT = box(16, 24, 0, 40, 40, 50)
const TANK = cylinder(130, 44, 0, 24, 50)
const CONTRACT = box(196, 22, 0, 48, 44, 36)
const PIPE = path(16, [56, 44], [196, 44])

// Static detail and shadows: built once, at module level.
const GROUND_SHADOW = isoShadow(footprint(-4, 4, 268, 96, -22, 6), SHADOW)
const CONTACT_SHADOWS = (
  <>
    {isoShadow(footprint(18, 26, 42, 42, 0, 4), SHADOW)}
    {isoShadow(footprint(108, 22, 50, 50, 0, 4), SHADOW)}
    {isoShadow(footprint(198, 24, 50, 48, 0, 4), SHADOW)}
  </>
)
const PLATE_DETAIL = D.inset([0, 0, 0, 260, 90], 5)
const ACCOUNT_DETAIL = (
  <>
    {D.seams([16, 24, 0, 40, 40, 50], { end: [0.5], ring: 0.12 })}
    {D.plate(64, 22, 40, 28, 36)}
  </>
)
const TANK_DETAIL = D.cylinderMarks(TANK)
const CONTRACT_DETAIL = D.seams([196, 22, 0, 48, 44, 36], {
  end: [0.33, 0.66],
  ring: 0.85,
})

const SPOTS: AnatomyLabelSpot[] = [
  {
    id: "account",
    tone: "entity",
    target: P(16, 64, 30),
    anchor: [P(16, 64, 30)[0] - 12, P(16, 64, 30)[1]],
    placement: "start",
  },
  {
    id: "tank",
    tone: "gas",
    target: [P(130, 44, 50)[0], P(130, 44, 50)[1] - 17],
    anchor: [P(130, 44, 50)[0], 40],
    placement: "above",
  },
  {
    id: "contract",
    tone: "entity",
    target: P(230, 22, 36),
    anchor: [P(230, 22, 36)[0], 110],
    placement: "above",
  },
  {
    id: "plate",
    tone: "neutral",
    target: P(260, 90, -8),
    anchor: [P(260, 90, -8)[0], 238],
    placement: "below",
  },
]

function Scene({
  flowing,
  level,
  lit,
}: {
  flowing: boolean
  level: number
  lit: boolean
}) {
  return (
    <DiagramHoverProvider>
      <SceneDrawing flowing={flowing} level={level} lit={lit} />
    </DiagramHoverProvider>
  )
}

function SceneDrawing({
  flowing,
  level,
  lit,
}: {
  flowing: boolean
  level: number
  lit: boolean
}) {
  const id = useId()
  const hoverTargets = useHoverTargets()
  return (
    <div className="relative" {...hoverTargets}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        <IsoDefs id={SHADOW} />
        {GROUND_SHADOW}
        <IsoPlate box={PLATE} />
        {PLATE_DETAIL}
        {CONTACT_SHADOWS}
        <IsoPipe d={PIPE} flowing={flowing} />
        <g data-part="account">
          <IsoSolid box={ACCOUNT} hue="entity" />
          {ACCOUNT_DETAIL}
        </g>
        <g data-part="tank">
          <IsoCylinder
            geometry={TANK}
            hue="gas"
            clipId={`${id}-tank`}
            level={level}
          />
          {TANK_DETAIL}
        </g>
        <g data-part="contract">
          <IsoSolid box={CONTRACT} hue="entity" state={lit ? "lit" : "rest"} />
          {CONTRACT_DETAIL}
        </g>
      </svg>
      <AnatomyLabels
        width={W}
        height={H}
        spots={SPOTS}
        labels={{
          account: "Account",
          tank: "Gas",
          contract: "Contract",
          plate: "World state",
        }}
        definitions={{
          account: "Blue: accounts and contracts.",
          tank: "Orange: gas and value.",
          contract: "The active part takes its role colour.",
          plate: "Neutral: the plate, pipes at rest and leader lines.",
        }}
        litId={lit ? "contract" : null}
      />
    </div>
  )
}

const meta = {
  title: "Components / Data Viz / Diagrams / Anatomy",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Shared pieces for isometric anatomy diagrams (`Diagrams/anatomy/`): `isoProjection`, `IsoPlate`, `IsoSolid`, `IsoCylinder`, `IsoPipe`, `AnatomyLabels` and `DiagramStage`, coloured by the `--diagram-*` tokens. 1px outlines with hierarchy by colour (`--diagram-line-faint`, `--diagram-line`, `--diagram-line-strong`); faces are light `color-mix(in oklab, hue N%, background)` tints at rest and stronger when active or hovered, so the same drawing adapts to dark mode. Static detail (`isoDetail`) and soft gradient shadows (`isoShadow`, no filters) are built once at module level. Labels are single-line concept names outside the plate; any label that wouldn't fit, would sit on a shape or would touch another label or leader is dropped. See Overview for the full rules.",
      },
    },
  },
  args: { flowing: false, level: 0.6, lit: false },
  render: (args) => (
    <div>
      <DiagramStage
        illustration={<Scene {...args} />}
        panel={
          <>
            <p className="m-0 text-sm text-body-medium">Controls panel</p>
            <Button size="sm">Run</Button>
            <p className="m-0 text-sm">The step caption and readout go here.</p>
          </>
        }
      />
    </div>
  ),
} satisfies Meta<typeof Scene>

export default meta

type Story = StoryObj<typeof meta>

export const AtRest: Story = {}

export const GasFlowing: Story = {
  args: { flowing: true, level: 0.9, lit: true },
  parameters: {
    docs: {
      description: {
        story:
          "While gas flows, an orange dash runs along the pipe; the active part takes its role colour (stronger tints and a role-coloured hairline).",
      },
    },
  },
}

export const Dark: Story = { globals: { theme: "dark" } }

export const Rtl: Story = { globals: { locale: "ar" } }

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
}
