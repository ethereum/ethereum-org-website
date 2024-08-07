import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils/cn"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "../../../../tailwind/ui/accordion"

type AccordionTriggerProps = {
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
} & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>

const AccordionTrigger = ({
  heading = "h2",
  className,
  ...props
}: AccordionTriggerProps) => {
  const Heading = heading

  return (
    <AccordionPrimitive.Header className="flex" asChild>
      <Heading>
        <AccordionPrimitive.Trigger
          className={cn(
            "group flex flex-1 items-center justify-start gap-2 rounded px-4 py-4 text-start font-medium transition-all hover:bg-background-highlight focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover md:px-4 [&[data-state=open]]:bg-background-highlight [&[data-state=open]]:text-primary-high-contrast",
            className
          )}
          {...props}
        />
      </Heading>
    </AccordionPrimitive.Header>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
