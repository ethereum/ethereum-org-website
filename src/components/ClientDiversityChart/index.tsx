"use client"

import React from "react"
import type { ReactNode } from "react"

import Translation from "../Translation"

interface ClientDiversityChartProps {
  children: ReactNode
}

const ClientDiversityChart = ({ children }: ClientDiversityChartProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:flex lg:flex-col">
      <div className="grid grid-cols-1 xl:flex">{children}</div>

      <div className="text-center text-sm italic text-gray-600 dark:text-white">
        <Translation
          id="client-diversity-chart-disclaimer"
          ns="page-developers-docs"
        />
      </div>
    </div>
  )
}

export default ClientDiversityChart
