import * as React from "react"
import { MdClose } from "react-icons/md"
import { tv, type VariantProps } from "tailwind-variants"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils/cn"

import { Button } from "./buttons/Button"
import { Center, Flex } from "./flex"

import { useDisclosure } from "@/hooks/useDisclosure"

const dialogVariant = tv({
  slots: {
    content:
      "data-[state=open]:animate-contentShow w-full fixed left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 gap-4 rounded-md bg-white p-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-modal",
    overlay:
      "data-[state=open]:animate-overlayShow fixed inset-0 bg-black/70 z-overlay",
    header: "relative pe-12",
    title: "text-2xl",
    footer: "pt-8",
    close: "text-md size-8 z-10 absolute end-0 top-0",
  },
  variants: {
    size: {
      md: {
        content: "max-w-xl",
      },
      xl: {
        content: "max-w-[1004px]",
      },
    },
    isSimulator: {
      true: {
        close: "static ms-auto",
        header: "pe-0",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type DialogVariants = VariantProps<typeof dialogVariant>

const DialogStylesContext = React.createContext(dialogVariant())

const useDialogStyles = () => React.useContext(DialogStylesContext)

type DialogProps = DialogPrimitive.DialogProps & DialogVariants

const Dialog = ({ size, isSimulator, ...props }: DialogProps) => {
  const styles = dialogVariant({ size, isSimulator })
  return (
    <DialogStylesContext.Provider value={styles}>
      <DialogPrimitive.Root {...props} />
    </DialogStylesContext.Provider>
  )
}

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const { overlay } = useDialogStyles()
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(overlay(), className)}
      {...props}
    />
  )
})
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
>

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, ...props }, ref) => {
  const { content } = useDialogStyles()
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(content(), className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { header, close } = useDialogStyles()
  return (
    <div className={cn(header(), className)} {...props}>
      {children}
      <Center className={close()} asChild>
        <DialogPrimitive.Close>
          <MdClose />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </Center>
    </div>
  )
}
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { footer } = useDialogStyles()
  return <div className={cn(footer(), className)} {...props} />
}
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  const { title } = useDialogStyles()
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(title(), className)}
      {...props}
    />
  )
})
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export type ModalProps = DialogProps & {
  children?: React.ReactNode
  title?: React.ReactNode
  onClose?: () => void
  actionButton?: {
    label: string
    onClick: () => void
  }
  contentProps?: DialogContentProps
}

const Modal = ({
  children,
  title,
  actionButton,
  contentProps,
  defaultOpen,
  onClose,
  ...restProps
}: ModalProps) => {
  const {
    onClose: onDisclosureClose,
    isOpen,
    setValue,
  } = useDisclosure(defaultOpen)

  const handleClose = () => {
    onClose?.()
    onDisclosureClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setValue} {...restProps}>
      <DialogContent {...contentProps}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{children}</DialogDescription>
        {actionButton && (
          <DialogFooter>
            <Flex className="justify-end gap-2">
              <DialogClose asChild>
                <Button onClick={handleClose} variant="outline" isSecondary>
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={actionButton.onClick}>
                {actionButton.label}
              </Button>
            </Flex>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Modal

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
