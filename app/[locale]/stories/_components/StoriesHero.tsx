import { useTranslations } from "next-intl"

import { ButtonLink } from "@/components/ui/buttons/Button"

const STORY_SUBMISSION_URL = "https://ethereumstory.paperform.co/"

const StoriesHero = () => {
  const t = useTranslations("page-stories")

  return (
    <section className="flex flex-col items-center gap-6 px-4 py-16 text-center md:px-8 md:py-24">
      <h1 className="text-4xl font-black md:text-5xl lg:text-6xl">
        {t("page-stories-title")}
      </h1>
      <p className="text-xl text-body-medium md:text-2xl">
        {t("page-stories-subtitle")}
      </p>
      <p className="max-w-3xl text-lg leading-relaxed text-body-medium">
        {t("page-stories-description")}
      </p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <ButtonLink href={STORY_SUBMISSION_URL} variant="solid">
          {t("page-stories-share-cta")}
        </ButtonLink>
      </div>
    </section>
  )
}

export default StoriesHero
