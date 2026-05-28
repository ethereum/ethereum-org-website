import ButtonDropdown, {
  type ButtonDropdownProps,
} from "@/components/ButtonDropdown"

const MobileButtonDropdown = (props: ButtonDropdownProps) => {
  return (
    <div className="sticky bottom-0 z-sticky w-full bg-background p-8 shadow-md lg:hidden">
      <ButtonDropdown {...props} className="w-full lg:w-auto" />
    </div>
  )
}

export default MobileButtonDropdown
