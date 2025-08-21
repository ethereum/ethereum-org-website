import ClientLanguagePicker from "./ClientLanguagePicker"

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
  dialog,
}: LanguagePickerProps) => {
  const languages = await getLanguagesDisplayInfo()

  return (
    <ClientLanguagePicker
      languages={languages}
      handleClose={handleClose}
      className={className}
      dialog={dialog}
    >
      {children}
    </ClientLanguagePicker>
  )
}

export default LanguagePicker
