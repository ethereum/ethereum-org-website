import type { CourseArtId } from "@/data/courses"

import Blocks from "./course/blocks"
import Coins from "./course/coins"
import Contract from "./course/contract"
import Crate from "./course/crate"
import Diamond from "./course/diamond"
import Frame from "./course/frame"
import Lure from "./course/lure"
import Mailbox from "./course/mailbox"
import Notebook from "./course/notebook"
import Platform from "./course/platform"
import Rollup from "./course/rollup"
import Scale from "./course/scale"
import SmartAccount from "./course/smart-account"
import Stamp from "./course/stamp"
import Tank from "./course/tank"
import Tanks from "./course/tanks"
import Upgrade from "./course/upgrade"
import Validators from "./course/validators"
import Vault from "./course/vault"
import Vending from "./course/vending"
import { ArtFrame, type ArtTone } from "./shared"

/**
 * One hero illustration per course, one module each under `course/`; see
 * `scenery.tsx` for path decorations. Static, for server components: client
 * components use `lazy-course-art.tsx`, which loads only the pieces shown.
 */
const ART: Record<CourseArtId, () => React.JSX.Element> = {
  upgrade: Upgrade,
  "smart-account": SmartAccount,
  diamond: Diamond,
  blocks: Blocks,
  coins: Coins,
  vault: Vault,
  tank: Tank,
  validators: Validators,
  contract: Contract,
  notebook: Notebook,
  mailbox: Mailbox,
  stamp: Stamp,
  vending: Vending,
  crate: Crate,
  rollup: Rollup,
  scale: Scale,
  frame: Frame,
  tanks: Tanks,
  lure: Lure,
  platform: Platform,
}

export interface CourseArtProps {
  id: CourseArtId
  tone?: ArtTone
  className?: string
}

const CourseArt = ({ id, tone, className }: CourseArtProps) => {
  const Art = ART[id]
  return (
    <ArtFrame tone={tone} className={className}>
      <Art />
    </ArtFrame>
  )
}

export default CourseArt
