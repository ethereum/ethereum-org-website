"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils/cn"

const COLORS = [
  "var(--course)",
  "var(--color-yellow-400)",
  "var(--color-pink-400)",
  "var(--color-teal-400)",
  "var(--color-orange-400)",
]

// Deterministic spread: no Math.random, so renders are stable
const PIECES = Array.from({ length: 40 }, (_, i) => {
  const angle = (i / 40) * Math.PI * 2 + (i % 3) * 0.3
  const distance = 140 + ((i * 37) % 120)
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance * 0.7 - 60,
    rotate: (i * 47) % 360,
    color: COLORS[i % COLORS.length],
    round: i % 4 === 0,
    delay: (i % 5) * 0.03,
  }
})

/** One burst from the centre of its positioned parent. Skip under reduced motion. */
const Confetti = () => (
  <div aria-hidden className="absolute top-1/2 left-1/2">
    {PIECES.map((piece, i) => (
      <motion.span
        key={i}
        className={cn(
          "absolute block size-2.5",
          piece.round ? "rounded-full" : "rounded-[2px]"
        )}
        style={{ backgroundColor: piece.color }}
        initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
        animate={{
          x: piece.x,
          y: [0, piece.y, piece.y + 140],
          opacity: [1, 1, 0],
          scale: 1,
          rotate: piece.rotate + 360,
        }}
        transition={{ duration: 1.6, delay: piece.delay, ease: "easeOut" }}
      />
    ))}
  </div>
)

export default Confetti
