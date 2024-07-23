import { useCallback, useEffect, useState } from "react"

type UseDisclosureProps = {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?(): void
  onOpen?(): void
  id?: string
}

type GetButtonPropsProps = Record<string, string | undefined> & {
  onClick?: () => void
}

type GetDisclosurePropsProps = Record<string, string | undefined> & {
  id?: string
}

type UseDisclosureReturn = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
  getButtonProps: (props?: GetButtonPropsProps) => {
    "aria-expanded": boolean
    "aria-controls"?: string
    onClick: () => void
  }
  getDisclosureProps: (props?: GetDisclosurePropsProps) => {
    hidden: boolean
    id: string
  }
}

const generateId = (prefix = "id") =>
  `${prefix}-${Math.random().toString(36).slice(2, 11)}`

const useId = (idProp?: string, prefix?: string) => {
  const [dynamicId, setDynamicId] = useState(idProp || generateId(prefix))

  useEffect(() => {
    if (!idProp) {
      setDynamicId(generateId(prefix))
    }
  }, [idProp, prefix])

  return dynamicId
}

const useDisclosure = ({
  onClose: onCloseProp,
  onOpen: onOpenProp,
  isOpen: isOpenProp,
  defaultIsOpen: defaultIsOpenProp,
  id: idProp,
}: UseDisclosureProps = {}): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(isOpenProp || !!defaultIsOpenProp)
  const id = useId(idProp, "disclosure")

  const onClose = useCallback(() => {
    setIsOpen(false)
    onCloseProp == null ? void 0 : onCloseProp()
  }, [onCloseProp])

  const onOpen = useCallback(() => {
    setIsOpen(true)
    onOpenProp == null ? void 0 : onOpenProp()
  }, [onOpenProp])

  const onToggle = useCallback(() => {
    const action = isOpen ? onClose : onOpen
    action()
  }, [isOpen, onClose, onOpen])

  const getButtonProps = (props: GetButtonPropsProps = {}) => ({
    ...props,
    "aria-expanded": isOpen,
    "aria-controls": id,
    onClick: () => {
      props.onClick?.()
      onToggle()
    },
  })

  const getDisclosureProps = (props: GetDisclosurePropsProps = {}) => ({
    ...props,
    hidden: !isOpen,
    id,
  })

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    getButtonProps,
    getDisclosureProps,
  }
}

export { useDisclosure, type UseDisclosureProps, type UseDisclosureReturn }
