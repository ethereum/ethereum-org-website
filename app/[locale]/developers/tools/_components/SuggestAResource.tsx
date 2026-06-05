import { ButtonLink } from "@/components/ui/buttons/Button"

interface SuggestAResourceProps {
  title: string
  description: string
  buttonLabel: string
}

const SUGGEST_RESOURCE_ISSUE_URL =
  "https://github.com/ethereum/builder-resources/issues/new?template=add-resource.yml"

const SuggestAResource = ({
  title,
  description,
  buttonLabel,
}: SuggestAResourceProps) => (
  <div className="flex flex-col items-center gap-4 rounded-2xl bg-radial-a p-12">
    <h2>{title}</h2>
    <p>{description}</p>
    <ButtonLink
      href={SUGGEST_RESOURCE_ISSUE_URL}
      variant="outline"
      className="w-fit"
      hideArrow
    >
      {buttonLabel}
    </ButtonLink>
  </div>
)

export default SuggestAResource
