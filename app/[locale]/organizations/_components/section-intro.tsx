import type { ReactNode } from "react"

type SectionIntroProps = {
  title: ReactNode
  description?: ReactNode
}

/**
 * Centered section opener used across the /organizations/ pages: an `<h2>`
 * plus an optional lead paragraph. Renders a fragment so the parent
 * `<Section>` (inside a `.flow` article) owns the vertical rhythm.
 */
const SectionIntro = ({ title, description }: SectionIntroProps) => (
  <>
    <h2 className="text-center">{title}</h2>
    {description && (
      <p className="mx-auto max-w-3xl text-center text-lg text-body-medium">
        {description}
      </p>
    )}
  </>
)

export default SectionIntro
