import * as React from "react"
import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertProps as ChakraAlertProps,
  AlertStatus,
  CloseButton,
  forwardRef,
} from "@chakra-ui/react"

export type AlertStatusType = Exclude<AlertStatus, "loading">

interface AlertProps extends Omit<ChakraAlertProps, "status"> {
  /**
   * Should the alert icon show?
   *
   * @default true
   */
  hasIcon?: boolean
  /**
   * The description of the alert
   */
  description: string
  status?: AlertStatusType
  /**
   * Function to handle closing of the Alert
   *
   * If this prop is present, a `CloseButton` component is rendered
   */
  onClose?: () => void
}

const Alert = forwardRef<AlertProps, "div">((props, ref) => {
  const {
    hasIcon = true,
    description,
    onClose,
    status = "info",
    ...rest
  } = props

  const isCloseable = !!onClose

  const closeButtonStateStyles = {
    borderRadius: "base",
    _active: {
      boxShadow: "none",
      transform: "translate(0)",
      transitionDuration: "20ms",
    },
  }

  return (
    <ChakraAlert ref={ref} position="relative" status={status} {...rest}>
      <>
        {hasIcon ? <AlertIcon ms={isCloseable ? "auto" : undefined} /> : null}
        <AlertDescription>{description}</AlertDescription>
        {isCloseable ? (
          <CloseButton
            onClick={onClose}
            ms="auto"
            {...closeButtonStateStyles}
          />
        ) : null}
      </>
    </ChakraAlert>
  )
})

export default Alert
