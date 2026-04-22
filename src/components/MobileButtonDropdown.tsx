import ButtonDropdown, { type ButtonDropdownProps } from "./ButtonDropdown"

const MobileButtonDropdown = (props: ButtonDropdownProps) => {
  return (
    <div className="z-sticky bg-background sticky bottom-0 w-full p-8 shadow-md lg:hidden">
      <ButtonDropdown {...props} className="w-full lg:w-auto" />
    </div>
  )
}

export default MobileButtonDropdown
