import { useId } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "@/components/ui/buttons/Button"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  DIAGRAM_SVG_FALLBACKS,
  DiagramStage,
  ISO_SVG_CLASS,
  IsoCylinder,
  IsoPipe,
  IsoPlate,
  isoProjection,
  IsoSolid,
} from "."

const W = 420
const H = 260
const { P, path, box, cylinder } = isoProjection(170, 60)

const PLATE = box(0, 0, -8, 260, 90, 8)
const ACCOUNT = box(16, 24, 0, 40, 40, 50)
const TANK = cylinder(130, 44, 0, 24, 50)
const CONTRACT = box(196, 22, 0, 48, 44, 36)
const PIPE = path(16, [56, 44], [196, 44])

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
  const id = useId()
  return (
    <div className="relative">
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        <IsoPlate box={PLATE} />
        <IsoPipe d={PIPE} flowing={flowing} />
        <IsoSolid box={ACCOUNT} hue="entity" />
        <IsoCylinder
          geometry={TANK}
          hue="gas"
          clipId={`${id}-tank`}
          level={level}
        />
        <IsoSolid box={CONTRACT} hue="entity" lit={lit} />
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
        tooltips={{
          account: "Blue: accounts and contracts.",
          tank: "Orange: gas and value.",
          contract: "The active part keeps its role colour at 2px.",
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
          "Shared pieces for isometric anatomy diagrams (`Diagrams/anatomy/`): `isoProjection`, `IsoPlate`, `IsoSolid`, `IsoCylinder`, `IsoPipe`, `AnatomyLabels` and `DiagramStage`, coloured by the `--diagram-*` tokens. Faces are `color-mix(in oklab, hue 15/30/45%, background)`, so the same drawing adapts to dark mode. Labels are single-line concept names outside the plate; any label that wouldn't fit, would sit on a shape or would touch another label or leader is dropped. See Overview for the full rules.",
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
          "While gas flows, the pipe turns orange; the active part keeps its role colour with a heavier outline.",
      },
    },
  },
}

export const Dark: Story = { globals: { theme: "dark" } }

export const Rtl: Story = { globals: { locale: "ar" } }

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
}
