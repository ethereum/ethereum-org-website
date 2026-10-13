import { useState } from "react"
import { Play } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  DiagramCaption,
  DiagramPresets,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
} from "./interactive-diagram"

const STRINGS = {
  en: {
    intro: "Intro text: what the diagram shows, above the card.",
    presets: "Example values",
    presetA: "Light call",
    presetB: "Heavy call",
    presetC: "Out of gas",
    run: "Run",
    step: (n: number, total: number) => `Step ${n} of ${total}`,
    captions: [
      "Pick an example and run it.",
      "Step 1: something happens.",
      "Step 2: something else happens, with a longer sentence to show the caption keeps the height of its longest step.",
      "Step 3: done.",
    ],
    limit: "Gas limit",
    used: "Gas used",
  },
  de: {
    intro:
      "Einführungstext: was das Diagramm zeigt, oberhalb der Karte, deutlich länger als im Englischen.",
    presets: "Beispielwerte",
    presetA: "Leichter Aufruf",
    presetB: "Schwerer Aufruf",
    presetC: "Gas aufgebraucht",
    run: "Transaktion senden",
    step: (n: number, total: number) => `Schritt ${n} von ${total}`,
    captions: [
      "Wählen Sie ein Beispiel und führen Sie es aus.",
      "Schritt 1: Etwas passiert.",
      "Schritt 2: Etwas anderes passiert, mit einem längeren Satz, damit die Beschriftung die Höhe ihres längsten Schritts behält.",
      "Schritt 3: Fertig.",
    ],
    limit: "Gaslimit",
    used: "Verbrauchtes Gas",
  },
}

function Demo({ lang = "en" }: { lang?: keyof typeof STRINGS }) {
  const s = STRINGS[lang]
  const [preset, setPreset] = useState<"a" | "b" | "c">("a")
  const [step, setStep] = useState(0)
  const total = s.captions.length - 1
  return (
    <InteractiveDiagram
      caption={s.intro}
      description="A placeholder illustration."
      illustration={
        <div className="flex aspect-[3/2] w-full items-center justify-center rounded-base border border-dashed border-border text-sm text-body-medium">
          Illustration
        </div>
      }
      presets={
        <DiagramPresets
          label={s.presets}
          options={[
            { id: "a", label: s.presetA },
            { id: "b", label: s.presetB },
            { id: "c", label: s.presetC },
          ]}
          value={preset}
          onChange={(id) => {
            setPreset(id)
            setStep(0)
          }}
          eventAction="story preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: s.run,
            icon: <Play />,
            onClick: () => setStep(1),
          }}
          counter={s.step(step, total)}
          onPrevious={() => setStep(Math.max(0, step - 1))}
          onNext={() => setStep(Math.min(total, step + 1))}
          onReset={() => setStep(0)}
          canGoPrevious={step > 0}
          canGoNext={step < total}
          canReset={step > 0}
          labels={{
            previous: "Previous step",
            next: "Next step",
            reset: "Reset",
          }}
          eventAction="story transport"
        />
      }
      stepCaption={
        <DiagramCaption current={s.captions[step]} all={s.captions} />
      }
      readout={
        <DiagramReadout
          label="Readout"
          rows={[
            { label: s.limit, value: "100,000" },
            { label: s.used, value: step >= 2 ? "46,000" : "0" },
          ]}
        />
      }
    />
  )
}

const meta = {
  title: "Components / Data Viz / Diagrams / InteractiveDiagram",
  component: Demo,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The shell every interactive diagram uses, so controls sit in the same places everywhere. One card holds the illustration and a panel: from a 640px card width the panel (15rem) sits on the inline-end side, vertically centred; narrower, it stacks under the illustration. The panel always reads presets, transport (primary action, then previous / Step x of n / next / reset), caption (sized to its longest step, polite live region), readout (two columns, tabular numbers). Slots: `illustration`, `presets` (`DiagramPresets`), `transport` (`DiagramTransport`), `stepCaption` (`DiagramCaption`), `readout` (`DiagramReadout`).",
      },
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <div style={{ maxWidth: parameters.frameWidth ?? 820 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Demo>

export default meta

type Story = StoryObj<typeof meta>

export const Side: Story = {}

export const Stacked: Story = { parameters: { frameWidth: 380 } }

export const Dark: Story = { globals: { theme: "dark" } }

export const Rtl: Story = { globals: { locale: "ar" } }

export const LongGerman: Story = {
  args: { lang: "de" },
  parameters: {
    docs: {
      description: {
        story:
          "German-length strings: presets wrap inside their rows, the caption area keeps the height of its longest step.",
      },
    },
  },
}
