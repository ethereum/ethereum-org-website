import { FilterOption } from "@/lib/types"

import Filters from "@/components/ProductTable/Filters"

interface MobileFiltersProps {
  filters: FilterOption[]
  setFilters: React.Dispatch<React.SetStateAction<FilterOption[]>>
}

const MobileFilters = ({ filters, setFilters }: MobileFiltersProps) => {
  return (
    <>
      MobileFilters
      <Filters filters={filters} setFilters={setFilters} />
    </>
  )
}

export default MobileFilters
