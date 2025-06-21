"use client";
import React from "react";
import Link from "next/link";

import { PieChart } from "./PieChart";

const PieChartContainer = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:flex lg:flex-col gap-4">
      <div className="grid grid-cols-1 lg:flex">
        <PieChart
          data={[
            { name: "Geth", value: 41 },
            { name: "Nethermind", value: 38 },
            { name: "Besu", value: 16 },
            { name: "Erigon", value: 3 },
            { name: "Reth", value: 2 },
            { name: "Other", value: 0 },
          ]}
          title="Execution Clients"
        />
        <PieChart
          data={[
            { name: "Lighthouse", value: 42.71 },
            { name: "Prysm", value: 30.91 },
            { name: "Teku", value: 13.86 },
            { name: "Nimbus", value: 8.74 },
            { name: "Lodestar", value: 2.67 },
            { name: "Grandine", value: 1.04 },
            { name: "Others", value: 0.07 },
          ]}
          title="Consensus Clients"
        />
      </div>
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

export default PieChartContainer;
