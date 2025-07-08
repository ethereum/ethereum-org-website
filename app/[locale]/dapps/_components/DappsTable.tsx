"use client"

import { useState } from "react"

import { DappData } from "@/lib/types"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import DappCard from "./DappCard"

const DappsTable = ({ dapps }: { dapps: DappData[] }) => {
  const [filterBy, setFilterBy] = useState("All")

  const subCategories = [...new Set(dapps.flatMap((dapp) => dapp.subCategory))]

  const filteredDapps = dapps.filter((dapp) => {
    if (filterBy === "All") return true
    return dapp.subCategory.includes(filterBy)
  })

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between border-b pb-2">
        <div className="flex flex-row items-center gap-2">
          <p className="whitespace-nowrap">Filter by</p>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="min-w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {subCategories.map((subCategory) => (
                <SelectItem key={subCategory} value={subCategory}>
                  {subCategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-body-medium">
            Showing <span className="text-body">({dapps.length})</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDapps.map((dapp) => (
          <div key={dapp.name}>
            <DappCard dapp={dapp} imageSize={14} hideTag />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DappsTable
