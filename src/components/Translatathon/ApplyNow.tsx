import Callout from "@/components/Callout"

import { ButtonLink } from "../ui/buttons/Button"
import { Flex } from "../ui/flex"

import { APPLICATION_END_DATE, APPLICATION_URL } from "./constants"

import DolphinImage from "@/public/images/translatathon/translatathon_dolphin.png"

// TODO: Confirm deadline for applying

export const ApplyNow = () => {
  const dateToday = new Date()
  const deadline = new Date(APPLICATION_END_DATE)

  if (dateToday < deadline) {
    return (
      <div className="pt-12">
        <Callout
          className="flex-1 flex-shrink basis-[416px]"
          image={DolphinImage}
          titleKey="page-translatathon:translatathon-apply-now"
          descriptionKey="page-translatathon:translatathon-apply-now-desc"
          alignItems="center"
          textAlign="center"
        >
          <Flex className="m-auto">
            <ButtonLink href={APPLICATION_URL}>Apply now</ButtonLink>
          </Flex>
        </Callout>
      </div>
    )
  } else {
    return <></>
  }
}
