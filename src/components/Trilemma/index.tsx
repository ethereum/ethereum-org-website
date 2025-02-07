import { useTranslation } from "next-i18next"

import Card from "@/components/Card"
import { Flex, Stack, VStack } from "@/components/ui/flex"
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet"

import { TriangleSVG, TriangleSVGProps } from "./Triangle"
import { useTrilemma } from "./useTrilemma"

const Trilemma = () => {
  const { t } = useTranslation("page-roadmap-vision")

  const {
    trilemmaChecks,
    mobileModalOpen,
    handleClick,
    handleModalClose,
    cardDetail,
  } = useTrilemma()

  const triangleSVGProps: TriangleSVGProps = {
    handleClick,
    ...trilemmaChecks,
  }

  return (
    <Flex className="flex-col items-center justify-between space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <Stack className="mt-16 space-y-8 md:mx-12 md:mt-20 lg:mb-20 lg:mr-0 lg:flex-[0_1_500px]">
        <h2>{t("page-roadmap-vision-trilemma-h2")}</h2>
        <VStack className="space-y-6">
          <p>{t("page-roadmap-vision-trilemma-p")}</p>
          <p>{t("page-roadmap-vision-trilemma-p-1")}</p>
          <p>{t("page-roadmap-vision-trilemma-p-2")}</p>
          <p className="font-semibold lg:hidden">
            {t("page-roadmap-vision-trilemma-modal-tip")}:
          </p>
        </VStack>
        <Card {...cardDetail} className="mt-6 hidden min-h-[300px] lg:block" />
      </Stack>
      <Sheet open={mobileModalOpen} onOpenChange={handleModalClose}>
        <SheetContent side="bottom" className="rounded-t-[16px]">
          <Card {...cardDetail} className="my-8 border-none bg-transparent" />
          <SheetClose className="absolute right-3 top-5">
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </SheetClose>
        </SheetContent>
      </Sheet>

      <div>
        <TriangleSVG {...triangleSVGProps} />
      </div>
    </Flex>
  )
}

export default Trilemma
