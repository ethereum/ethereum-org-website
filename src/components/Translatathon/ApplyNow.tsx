import CalloutSSR from "@/components/CalloutSSR"

import { isDateReached } from "@/lib/utils/date"

import { Button } from "../ui/buttons/Button"
import { Flex } from "../ui/flex"

import { APPLICATION_END_DATE } from "./constants"
import PaperformModal from "./PaperformModal"

import { useTranslation } from "@/hooks/useTranslation"
import DolphinImage from "@/public/images/translatathon/translatathon_dolphin.png"

// TODO: Confirm deadline for applying

export const ApplyNow = () => {
  const { t } = useTranslation("page-translatathon")

  if (isDateReached(APPLICATION_END_DATE)) {
    return (
      <div className="pt-12">
        <CalloutSSR
          image={DolphinImage}
          title={t("translatathon-apply-now")}
          description={t("translatathon-apply-now-desc")}
          className="flex-1 basis-[416px] items-center text-center"
        >
          <Flex className="m-auto">
            <PaperformModal
              trigger={<Button>Apply now</Button>}
              title="Apply to Translate"
            />
          </Flex>
        </CalloutSSR>
      </div>
    )
  } else {
    return <></>
  }
}
