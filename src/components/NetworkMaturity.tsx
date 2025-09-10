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

import useTranslation from "@/hooks/useTranslation"
import DevelopingImage from "@/public/images/network-maturity/developing.svg"
import EmergingImage from "@/public/images/network-maturity/emerging.svg"
import MaturingImage from "@/public/images/network-maturity/maturing.svg"
import RobustImage from "@/public/images/network-maturity/robust.svg"

const NetworkMaturity = () => {
  const { t } = useTranslation("page-layer-2-networks")

  return (
    <div className="mx-9 mt-10">
      <ExpandableCard title="Network maturity explained">
        <div>
          <div className="space-y-4">
            <p>
              {t("page-layer-2-network-maturity-component-1")}{" "}
              <InlineLink href="https://medium.com/l2beat/introducing-stages-a-framework-to-evaluate-rollups-maturity-d290bb22befe">
                {t("page-layer-2-network-maturity-component-2")}
              </InlineLink>{" "}
              (<strong>{t("page-layer-2-network-maturity-component-3")}</strong>
              ),{" "}
              <strong>
                {t("page-layer-2-network-maturity-component-4")}
              </strong>,{" "}
              <strong>{t("page-layer-2-network-maturity-component-5")}</strong>.{" "}
              {t("page-layer-2-network-maturity-component-6")}
            </p>
            <p>{t("page-layer-2-network-maturity-component-7")}</p>
          </div>

          <Table className="mt-4 w-full max-w-[760px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">
                  {t("page-layer-2-network-maturity-component-8")}
                </TableHead>
                <TableHead className="w-1/2">
                  {t("page-layer-2-network-maturity-component-9")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-none bg-[#3C4CEB] align-middle text-white">
                  <div className="flex items-center gap-2">
                    <RobustImage />
                    <strong>{t("page-layer-2-networks-robust-label")}</strong>
                  </div>
                </TableCell>
                <TableCell>
                  {t("page-layer-2-network-maturity-component-10")}
                  <br />
                  {t("page-layer-2-network-maturity-component-11")}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="bg-[#6995F7] align-middle text-white">
                  <div className="flex items-center gap-2">
                    <MaturingImage />
                    <strong>{t("page-layer-2-networks-maturing-label")}</strong>
                  </div>
                </TableCell>
                <TableCell>
                  {t("page-layer-2-network-maturity-component-12")}
                  <br />
                  {t("page-layer-2-network-maturity-component-13")}
                  <br />
                  {t("page-layer-2-network-maturity-component-14")}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="bg-[#CADFFB] align-middle text-black">
                  <div className="flex items-center gap-2">
                    <DevelopingImage />
                    <strong>
                      {t("page-layer-2-networks-developing-label")}
                    </strong>
                  </div>
                </TableCell>
                <TableCell>
                  {t("page-layer-2-network-maturity-component-15")}
                  <br />
                  {t("page-layer-2-network-maturity-component-16")}
                  <br />
                  {t("page-layer-2-network-maturity-component-13")}
                  <br />
                  {t("page-layer-2-network-maturity-component-14")}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="bg-[#E8F1FF] align-middle text-black">
                  <div className="flex items-center gap-2">
                    <EmergingImage />
                    <strong>{t("page-layer-2-networks-emerging-label")}</strong>
                  </div>
                </TableCell>
                <TableCell>
                  {t("page-layer-2-network-maturity-component-15")}
                  <br />
                  {t("page-layer-2-network-maturity-component-17")}
                  <br />
                  {t("page-layer-2-network-maturity-component-18")}
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
