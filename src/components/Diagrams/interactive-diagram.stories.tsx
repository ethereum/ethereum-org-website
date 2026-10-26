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
    intro: "Caption: what the diagram shows, under the card.",
    presets: "Example values",
    presetA: "Light call",
    presetB: "Heavy call",
    presetC: "Out of gas",
    run: "Run",
    captions: [
      "Pick an example and run it.",
      "Step 1: something happens.",
      "Step 2: something else happens, with a longer sentence to show the caption keeps the height of its longest step.",
      "Step 3: done.",
    ],
    limit: "Gas limit",
    used: "Gas used",
    fig: "Fig. 1",
    title: "Message call",
    status: "Ready: pick an example and run it",
    part: "Illustration",
    definition: "Hovering a part shows its one-line definition here.",
    accounts: "Accounts",
    gas: "Gas",
    structure: "Structure",
  },
  de: {
    intro:
      "Einführungstext: was das Diagramm zeigt, oberhalb der Karte, deutlich länger als im Englischen.",
    presets: "Beispielwerte",
    presetA: "Leichter Aufruf",
    presetB: "Schwerer Aufruf",
    presetC: "Gas aufgebraucht",
    run: "Transaktion senden",
    captions: [
      "Wählen Sie ein Beispiel und führen Sie es aus.",
      "Schritt 1: Etwas passiert.",
      "Schritt 2: Etwas anderes passiert, mit einem längeren Satz, damit die Beschriftung die Höhe ihres längsten Schritts behält.",
      "Schritt 3: Fertig.",
    ],
    limit: "Gaslimit",
    used: "Verbrauchtes Gas",
    fig: "Abb. 1",
    title: "Nachrichtenaufruf",
    status: "Bereit: Beispiel wählen und ausführen",
    part: "Illustration",
    definition:
      "Beim Überfahren eines Teils erscheint hier seine einzeilige Definition.",
    accounts: "Konten",
    gas: "Gas",
    structure: "Struktur",
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
      figLabel={s.fig}
      title={s.title}
      status={s.status}
      parts={{
        box: { label: s.part, definition: s.definition },
      }}
      legend={[
        { hue: "entity", label: s.accounts },
        { hue: "gas", label: s.gas },
        { hue: "neutral", label: s.structure },
      ]}
      illustration={
        <div
          data-part="box"
          className="flex aspect-[3/2] w-full items-center justify-center rounded-base border border-dashed border-border text-sm text-body-medium"
        >
          Illustration (hover me)
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
          current={step}
          total={total}
          onPrevious={() => setStep(Math.max(0, step - 1))}
          onNext={() => setStep(Math.min(total, step + 1))}
          onReset={() => setStep(0)}
          canGoPrevious={step > 0}
          canGoNext={step < total}
          canReset={step > 0}
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
          "The shell every interactive diagram uses, so controls and framing sit in the same places everywhere. The illustration column reads: figure header (`figLabel` and `title` in small caps), the drawing, a status line (the step at rest, the hovered part's definition on hover or focus) and a legend of role colours. Hover and focus are built in: parts opt in with `data-part`. One card holds the illustration and a panel: from a 640px card width the panel (15rem) sits on the inline-end side, vertically centred; narrower, it stacks under the illustration. The panel always reads presets, transport (primary action, then previous / Step x of n / next / reset), caption (sized to its longest step, polite live region), readout (two columns, tabular numbers). Slots: `illustration`, `presets` (`DiagramPresets`), `transport` (`DiagramTransport`), `stepCaption` (`DiagramCaption`), `readout` (`DiagramReadout`).",
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
