import { ChildOnlyProp } from "@/lib/types"

const FooterItemText = (props: ChildOnlyProp) => (
  <p
    className="mt-2 text-center text-sm font-normal uppercase leading-base tracking-wider opacity-70 hover:opacity-100"
    {...props}
  />
)

export default FooterItemText
