import { cn } from "@/lib/utils/cn"

/*
 * The lesson node: a rounded rhombus in a 100x100 box, with stacked copies
 * underneath as its side wall. Pressing slides the face down over the wall,
 * the same "chunky" press as the course buttons.
 */

const FACE = "M50,6 L92,46 L50,86 L8,46 Z"
/** Rounds the corners by stroking the path in its own colour */
const ROUND = 10
const WALL = [2, 4, 6, 8]

/** How far the face travels when pressed, in box units */
export const NODE_PRESS = 6
/** Vertical centre of the face, as a share of the box, for placing the icon */
export const NODE_FACE_CENTRE = 0.46

const TONES = {
  lit: {
    face: "fill-(--course) stroke-(--course)",
    wall: "fill-(--course-strong) stroke-(--course-strong)",
  },
  muted: {
    face: "fill-background-highlight stroke-background-highlight",
    wall: "fill-border stroke-border",
  },
}

/** The node's body; sits behind the icon inside a `group` button */
export const NodeBody = ({ lit }: { lit: boolean }) => {
  const tones = TONES[lit ? "lit" : "muted"]
  return (
    // Wrapped so Button's `[&>svg]` icon sizing can't shrink it
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <svg
        viewBox="0 0 100 100"
        className="size-full overflow-visible"
        strokeWidth={ROUND}
        strokeLinejoin="round"
      >
        {WALL.map((dy) => (
          <path
            key={dy}
            d={FACE}
            transform={`translate(0 ${dy})`}
            className={tones.wall}
          />
        ))}
        <path
          d={FACE}
          className={cn(
            tones.face,
            "transition-transform duration-75 group-active:translate-y-(--press)"
          )}
          style={{ "--press": `${NODE_PRESS}px` } as React.CSSProperties}
        />
      </svg>
    </span>
  )
}

/**
 * Soft halo in the node's silhouette, for the "up next" breathing loop.
 * Centred on face plus wall (y 50), not the face alone (y 46).
 */
export const NodeHalo = () => (
  <svg aria-hidden viewBox="0 0 100 100" className="size-full overflow-visible">
    <path
      d={FACE}
      transform="translate(50 50) scale(1.22) translate(-50 -46)"
      className="fill-(--course-soft) stroke-(--course-soft)"
      strokeWidth={ROUND + 6}
      strokeLinejoin="round"
    />
  </svg>
)
