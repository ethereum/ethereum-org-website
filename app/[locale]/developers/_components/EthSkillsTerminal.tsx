"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils/cn"

const COMMANDS = [
  "launch a coin for my community",
  "build a fan club that pays me when people join",
  "let my art earn royalties every time it resells",
  "create a DAO and let my fans vote on what I build",
  "set up a vault that grows my ETH while I sleep",
]

const TYPING_MS = 60
const DELETE_MS = 28
const PAUSE_MS = 2000
const NEXT_MS = 350

type Phase = "typing" | "paused" | "deleting"

export function EthSkillsTerminal() {
  const [cmdIdx, setCmdIdx] = useState(0)
  const [text, setText] = useState("")
  const [phase, setPhase] = useState<Phase>("typing")
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const cmd = COMMANDS[cmdIdx]
    let id: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (text.length < cmd.length) {
        id = setTimeout(() => setText(cmd.slice(0, text.length + 1)), TYPING_MS)
      } else {
        id = setTimeout(() => setPhase("paused"), 50)
      }
    } else if (phase === "paused") {
      id = setTimeout(() => setPhase("deleting"), PAUSE_MS)
    } else {
      if (text.length > 0) {
        id = setTimeout(() => setText((t) => t.slice(0, -1)), DELETE_MS)
      } else {
        id = setTimeout(() => {
          setCmdIdx((i) => (i + 1) % COMMANDS.length)
          setPhase("typing")
        }, NEXT_MS)
      }
    }

    return () => clearTimeout(id)
  }, [text, phase, cmdIdx])

  return (
    <div className="w-full max-w-2xl">
      <div className="dark rounded-lg border bg-background-highlight px-5 py-4">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-red-500/90" />
          <span className="size-3 rounded-full bg-yellow-400/90" />
          <span className="size-3 rounded-full bg-green-500/90" />
        </div>
        <div className="flex items-center overflow-hidden font-['Courier_New',_Courier,_monospace] text-sm">
          <span className="shrink-0 select-none self-start text-green-400">
            {"$\u00a0"}
          </span>
          <span className="text-start text-amber-100 max-sm:h-[2lh]">
            {text}
            <span
              className={cn(
                "text-amber-100",
                cursorOn ? "opacity-100" : "opacity-0"
              )}
            >
              {"█"}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
