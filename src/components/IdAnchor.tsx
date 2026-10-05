import { BaseLink } from "@/components/ui/Link"

// The link icon comes from the `id-anchor` utility (src/styles/utilities.css)
const IdAnchor = ({ id }: { id?: string }) => {
  if (!id) return null
  return (
    <BaseLink
      className="id-anchor"
      aria-label={id.replaceAll("-", " ") + " permalink"}
      href={"#" + id}
    />
  )
}

export default IdAnchor
