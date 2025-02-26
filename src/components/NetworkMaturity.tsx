import InlineLink from "./ui/Link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import ExpandableCard from "./ExpandableCard"

import DevelopingImage from "@/public/images/network-maturity/developing.svg"
import EmergingImage from "@/public/images/network-maturity/emerging.svg"
import MaturingImage from "@/public/images/network-maturity/maturing.svg"
import RobustImage from "@/public/images/network-maturity/robust.svg"

const NetworkMaturity = () => {
  return (
    <div className="mx-9 mt-10">
      <ExpandableCard title="Network maturity explained">
        <div>
          <div className="space-y-4">
            <p>
              We review the network’s progress towards{" "}
              <InlineLink href="https://medium.com/l2beat/introducing-stages-a-framework-to-evaluate-rollups-maturity-d290bb22befe">
                Ethereum alignment
              </InlineLink>{" "}
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

          <Table className="mt-4 w-full max-w-[760px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Maturity</TableHead>
                <TableHead className="w-1/2">Requirements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-none bg-[#3C4CEB] align-middle text-white">
                  <div className="flex items-center gap-2">
                    <RobustImage />
                    <strong>Robust</strong>
                  </div>
                </TableCell>
                <TableCell>
                  • Stage 2<br />• At least $1B TVL
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="bg-[#6995F7] align-middle text-white">
                  <div className="flex items-center gap-2">
                    <MaturingImage />
                    <strong>Maturing</strong>
                  </div>
                </TableCell>
                <TableCell>
                  • Stage 1<br />• At least $150M TVL
                  <br />• 6+ months live in production
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="bg-[#CADFFB] align-middle text-black">
                  <div className="flex items-center gap-2">
                    <DevelopingImage />
                    <strong>Developing</strong>
                  </div>
                </TableCell>
                <TableCell>
                  • Stage 0<br />• Risk assessment: 3/5 (L2beat)
                  <br />• At least $150M TVL
                  <br />• 6+ months live in production
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="bg-[#E8F1FF] align-middle text-black">
                  <div className="flex items-center gap-2">
                    <EmergingImage />
                    <strong>Emerging</strong>
                  </div>
                </TableCell>
                <TableCell>
                  • Stage 0<br />• Risk assessment: 2/5 (L2beat)
                  <br />• At least $150M TVL or 6+ months live in production
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ExpandableCard>
    </div>
  )
}

export default NetworkMaturity
