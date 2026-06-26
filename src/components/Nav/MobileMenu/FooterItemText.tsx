import { ChildOnlyProp } from "@/lib/types"

const FooterItemText = (props: ChildOnlyProp) => (
  <p
    className="mt-2 text-center text-sm leading-base font-normal tracking-wider uppercase opacity-70 hover:opacity-100"
    {...props}
  />
)

export default FooterItemText
