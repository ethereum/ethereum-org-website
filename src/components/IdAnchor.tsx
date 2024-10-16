import { CiLink } from "react-icons/ci"

import { BaseLink } from "@/components/ui/Link"

const IdAnchor = ({ id }: { id?: string }) => {
  if (!id) return null
  return (
    <BaseLink
      className="absolute end-full flex h-full items-center opacity-0 transition-opacity duration-100 ease-in-out focus:opacity-100 group-hover:opacity-100"
      aria-label={id.replaceAll("-", " ") + " permalink"}
      href={"#" + id}
    >
      <CiLink className="me-1 text-xl" />
    </BaseLink>
  )
}

export default IdAnchor
