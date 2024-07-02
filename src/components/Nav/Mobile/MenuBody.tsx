import { useRouter } from "next/router"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { SECTION_LABELS } from "@/lib/constants"

import type { Level, NavSections } from "../types"

import ExpandIcon from "./ExpandIcon"
import LvlAccordion from "./LvlAccordion"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type MenuBodyProps = {
  onToggle: () => void
  linkSections: NavSections
}

const MenuBody = ({ linkSections, onToggle }: MenuBodyProps) => {
  const { locale } = useRouter()
  const menuColors = useNavMenuColors()

  return (
    <nav>
      <Accordion type="single" collapsible className="w-full">
        {SECTION_LABELS.map((key) => {
          const { label, items } = linkSections[key]
          return (
            <AccordionItem
              key={label}
              value={label}
              className="border-t border-border _last:border-0"
            >
              <>
                <h2
                  className={`py-0 border-disabled`}
                  style={{ color: menuColors.body }}
                >
                  <AccordionTrigger className="justify-start gap-2 hover:bg-none px-4 py-4">
                    <ExpandIcon isOpen />
                    <span className="flex-1 text-start font-bold text-lg">
                      {label}
                    </span>
                  </AccordionTrigger>
                </h2>

                <AccordionContent className="p-0 mt-0">
                  <LvlAccordion
                    lvl={2 as Level}
                    items={items}
                    activeSection={key}
                    onToggle={onToggle}
                  />
                </AccordionContent>
              </>
            </AccordionItem>
          )
        })}
      </Accordion>
    </nav>
  )
}

export default MenuBody
