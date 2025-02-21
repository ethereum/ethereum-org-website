import { useState } from "react"

import DevelopingImage from "@/public/images/network-maturity/developing.svg"
import EmergingImage from "@/public/images/network-maturity/emerging.svg"
import MaturingImage from "@/public/images/network-maturity/maturing.svg"
import Button from "@/public/images/network-maturity/network-maturity-icon.svg"
import RobustImage from "@/public/images/network-maturity/robust.svg"

const NetworkMaturity = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="network-maturity-card mx-9 mt-10 rounded-lg border bg-white p-6">
      {/* Header with toggle button */}
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold">Network maturity explained</h2>
        <button aria-label="Toggle section">
          <Button
            className={`transform transition-transform ${isExpanded ? "" : "rotate-180"}`}
          ></Button>
        </button>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="mt-4 border-t py-6">
          <div className="space-y-4">
            {" "}
            <p>
              We review the network’s progress towards{" "}
              <a href="https://medium.com/l2beat/introducing-stages-a-framework-to-evaluate-rollups-maturity-d290bb22befe">
                Ethereum alignment
              </a>
              (<strong>rollup stages 0-2</strong>),{" "}
              <strong>total value locked (TVL)</strong>,
              <strong> time live in production</strong>, and{" "}
              <strong>risk considerations</strong>. These levels help track
              network development and provide a standardized way for the
              community to evaluate progress.
            </p>
            <p>
              Technical progress alone is not enough, user adoption and age are
              essential part of the overall strength and maturity on any
              network.
            </p>
          </div>

          <table className="mt-4 w-full max-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th className="w-1/2 bg-[#F7F7F7] p-3 text-left font-semibold">
                  Maturity
                </th>
                <th className="w-1/2 border-l border-white bg-[#F7F7F7] p-3 text-left font-semibold">
                  Requirements
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-[60px]">
                <td className="border-none bg-[#3C4CEB] p-3 align-middle text-white">
                  <div className="flex items-center gap-2">
                    <RobustImage />
                    <strong>Robust</strong>
                  </div>
                </td>
                <td className="border-none p-3">
                  • Stage 2<br />• At least $1B TVL
                </td>
              </tr>

              <tr className="h-[60px]">
                <td className="border-none bg-[#6995F7] p-3 align-middle text-white">
                  <div className="flex items-center gap-2">
                    <MaturingImage />
                    <strong>Maturing</strong>
                  </div>
                </td>
                <td className="border-none p-3">
                  • Stage 1<br />• At least $150M TVL
                  <br />• 6+ months live in production
                </td>
              </tr>

              <tr className="h-[60px]">
                <td className="border-none bg-[#CADFFB] p-3 align-middle">
                  <div className="flex items-center gap-2">
                    <DevelopingImage />
                    <strong>Developing</strong>
                  </div>
                </td>
                <td className="border-none p-3">
                  • Stage 0<br />• Risk assessment: 3/5 (L2beat)
                  <br />• At least $150M TVL
                  <br />• 6+ months live in production
                </td>
              </tr>

              <tr className="h-[60px]">
                <td className="border-none bg-[#E8F1FF] p-3 align-middle">
                  <div className="flex items-center gap-2">
                    <EmergingImage />
                    <strong>Emerging</strong>
                  </div>
                </td>
                <td className="border-none p-3">
                  • Stage 0<br />• Risk assessment: 2/5 (L2beat)
                  <br />• At least $150M TVL or 6+ months live in production
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default NetworkMaturity
