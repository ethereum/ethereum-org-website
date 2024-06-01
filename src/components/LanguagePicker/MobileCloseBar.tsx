import { MouseEventHandler } from "react"
import { useTranslation } from "next-i18next"
import { Flex } from "@chakra-ui/react"

import { Button } from "@/components/Buttons"

type MobileCloseBarProps = {
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export const MobileCloseBar = ({ handleClick }: MobileCloseBarProps) => {
  const { t } = useTranslation()

  return (
    <Flex
      justifyContent="end"
      hideFrom="md"
      position="sticky"
      zIndex="sticky"
      top="0"
      bg="background.base"
    >
      <Button p="4" variant="ghost" alignSelf="end" onClick={handleClick}>
        {t("close")}
      </Button>
    </Flex>
  )
}
