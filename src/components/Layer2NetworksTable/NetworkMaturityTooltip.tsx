import { MaturityLevel } from "@/lib/types"

import Tooltip from "@/components/Tooltip"
import { Tag } from "@/components/ui/tag"

import useTranslation from "@/hooks/useTranslation"

const NetworkMaturityTooltip = ({ maturity }: { maturity: MaturityLevel }) => {
  const { t } = useTranslation("page-layer-2-networks")

  const maturityDescription = {
    "n/a": {
      label: t("page-layer-2-networks-n/a-label"),
      description: t("page-layer-2-networks-n/a-description"),
      tag: {
        variant: "outline",
      },
    },
    robust: {
      label: t("page-layer-2-networks-robust-label"),
      description: t("page-layer-2-networks-robust-description"),
      tag: {
        className: "bg-blue-600 text-white border-none",
      },
    },
    maturing: {
      label: t("page-layer-2-networks-maturing-label"),
      description: t("page-layer-2-networks-maturing-description"),
      tag: {
        className: "bg-blue-400 text-white border-none",
      },
    },
    developing: {
      label: t("page-layer-2-networks-developing-label"),
      description: t("page-layer-2-networks-developing-description"),
      tag: {
        className: "bg-blue-200 text-black border-none",
      },
    },
    emerging: {
      label: t("page-layer-2-networks-emerging-label"),
      description: t("page-layer-2-networks-emerging-description"),
      tag: {
        className: "bg-blue-100 text-black border-none",
      },
    },
  } as const

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">
            {t("page-layer-2-networks-network-maturity-with-colon")}{" "}
            {maturityDescription[maturity].label}
          </p>
          <p className="whitespace-pre-wrap">
            {maturityDescription[maturity].description}
          </p>
        </div>
      }
    >
      <Tag variant="solid" {...maturityDescription[maturity].tag}>
        {t(`page-layer-2-networks-${maturity}-label`).toUpperCase()}
      </Tag>
    </Tooltip>
  )
}

export default NetworkMaturityTooltip
