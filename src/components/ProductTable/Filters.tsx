import { useTranslation } from "next-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"

import { FilterOption } from "@/lib/types"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/../tailwind/ui/accordion"

interface PresetFiltersProps {
  activeFilters: unknown
  filters: FilterOption[]
  setActiveFilters: () => void
}

const PresetFilters = ({
  // activeFilters,
  filters,
  // setActiveFilters,
}: PresetFiltersProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <div className={`w-full md:w-80`}>
      <div className="width-full flex flex-row justify-between border-b border-b-primary px-6 py-2">
        <p className="font-bold">Filters ({0})</p>
        <div
          className="flex cursor-pointer flex-row items-center gap-1 text-primary hover:text-primary-hover"
          onClick={() => {
            console.log("RESET FILTERS")
          }}
        >
          <BsArrowCounterclockwise />
          <p className="text-xs uppercase leading-none">
            {t("page-find-wallet-reset-filters")}
          </p>
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        className="width-full flex flex-col gap-2"
      >
        {filters.map((filter, idx) => {
          return (
            <AccordionItem
              key={idx}
              value={`item ${idx}`}
              className="bg-background-highlight p-6"
            >
              <AccordionTrigger className="border-b border-b-border-accordion">
                <p className="text-base text-body">{filter.title}</p>
              </AccordionTrigger>
              <AccordionContent>Content</AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default PresetFilters
