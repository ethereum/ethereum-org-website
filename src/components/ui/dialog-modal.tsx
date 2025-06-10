import * as React from "react"
import { MdClose } from "react-icons/md"
import { tv, type VariantProps } from "tailwind-variants"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils/cn"

import { Button } from "./buttons/Button"
import { Center, Flex } from "./flex"

const dialogVariant = tv({
  slots: {
    content:
      "data-[state=open]:animate-contentShow w-full grid gap-4 rounded-md bg-background p-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-modal",
    overlay:
      "data-[state=open]:animate-overlayShow overflow-y-auto p-4 grid place-items-center fixed inset-0 bg-black/70 z-overlay",
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
      <DialogOverlay>
        <DialogPrimitive.Content
          ref={ref}
          className={cn(content(), className)}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogOverlay>
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
          <MdClose size="20" />
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
  ...restProps
}: ModalProps) => {
  return (
    <Dialog {...restProps}>
      <DialogContent {...contentProps}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div>{children}</div>
        </DialogDescription>
        {actionButton && (
          <DialogFooter>
            <Flex className="justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline" isSecondary>
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
