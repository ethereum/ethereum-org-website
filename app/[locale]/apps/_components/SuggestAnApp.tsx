import { ButtonLink } from "@/components/ui/buttons/Button"

const SuggestAnApp = () => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-radial-a p-12">
      <h2>Suggest an app</h2>
      <p>
        We&apos;re always looking for new apps to add to our list. If you know
        of an app that you think should be on the list, please let us know.
      </p>
      <ButtonLink href="/" variant="outline" className="w-fit" hideArrow>
        Suggest an app
      </ButtonLink>
    </div>
  )
}

export default SuggestAnApp
