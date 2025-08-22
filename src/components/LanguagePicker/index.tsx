import DesktopLanguagePicker from "./Desktop"

import { getLanguagesDisplayInfo } from "@/lib/nav/links"

type LanguagePickerProps = {
  children: React.ReactNode
  className?: string
  handleClose?: () => void
  dialog?: boolean
}

const LanguagePicker = async ({
  children,
  handleClose,
  className,
}: LanguagePickerProps) => {
  const languages = await getLanguagesDisplayInfo()

  return (
    <DesktopLanguagePicker
      languages={languages}
      handleClose={handleClose}
      className={className}
    >
      {children}
    </DesktopLanguagePicker>
  )
}

export default LanguagePicker
