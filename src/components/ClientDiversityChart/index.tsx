"use client";

import React from "react";
import Link from "next/link";
import type { ReactNode } from "react";

interface ClientDiversityChartProps {
  children: ReactNode;
}

const ClientDiversityChart = ({ children }: ClientDiversityChartProps) => {
  return (
    <div className="w-full grid grid-cols-1 lg:flex lg:flex-col gap-4">
      <div className="grid grid-cols-1 xl:flex">{children}</div>

      <div className="text-sm text-center italic text-gray-600 dark:text-white">
        This diagram may be outdated — go to{" "}
        <Link
          href="https://ethernodes.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ethernodes.org
        </Link>{" "}
        and{" "}
        <Link
          href="https://clientdiversity.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          clientdiversity.org
        </Link>{" "}
        for up-to-date information.
      </div>
    </div>
  );
};

export default ClientDiversityChart;
