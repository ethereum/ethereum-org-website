import type { ReactNode } from "react"

type SectionIntroProps = {
  title: ReactNode
  description?: ReactNode
}

/** Renders a fragment so the parent `<Section>` owns the `.flow` rhythm */
const SectionIntro = ({ title, description }: SectionIntroProps) => (
  <>
    <h2 className="text-center">{title}</h2>
    {description && (
      <p className="mx-auto max-w-3xl text-center text-lg text-pretty text-body-medium">
        {description}
      </p>
    )}
  </>
)

export default SectionIntro
