"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils/cn"

const TYPING_MS = 60
const DELETE_MS = 28
const PAUSE_MS = 2000
const NEXT_MS = 350

type Phase = "typing" | "paused" | "deleting"

interface TerminalTypewriterProps {
  messages: string[]
  className?: string
}

export function TerminalTypewriter({
  messages,
  className,
}: TerminalTypewriterProps) {
  const [msgIdx, setMsgIdx] = useState(0)
  const [text, setText] = useState("")
  const [phase, setPhase] = useState<Phase>("typing")
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (messages.length === 0) return

    const msg = messages[msgIdx]
    let id: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (text.length < msg.length) {
        id = setTimeout(() => setText(msg.slice(0, text.length + 1)), TYPING_MS)
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
          setMsgIdx((i) => (i + 1) % messages.length)
          setPhase("typing")
        }, NEXT_MS)
      }
    }

    return () => clearTimeout(id)
  }, [text, phase, msgIdx, messages])

  if (messages.length === 0) return null

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      <div
        dir="ltr"
        className="dark rounded-lg border bg-background-highlight px-5 py-4"
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-red-500/90" />
          <span className="size-3 rounded-full bg-yellow-400/90" />
          <span className="size-3 rounded-full bg-green-500/90" />
        </div>
        <div className="flex items-center overflow-hidden font-mono text-sm">
          <span className="shrink-0 select-none self-start text-green-400">
            {"$\u00a0"}
          </span>
          <span
            dir="auto"
            data-label="cli"
            className="text-start text-amber-100 max-sm:h-[2lh]"
          >
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
