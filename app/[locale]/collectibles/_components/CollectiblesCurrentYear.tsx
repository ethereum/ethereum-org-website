import React from "react"
import { CircleCheckIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"

import Link from "@/components/ui/Link"

import { Badge } from "../page"

import lightningImg from "@/public/images/collectibles/lightning-charge-fill.png"
import socialImg from "@/public/images/collectibles/social.png"
import toolsImg from "@/public/images/collectibles/tools.png"
import translateImg from "@/public/images/collectibles/translate.png"

interface CollectiblesCurrentYearProps {
  badges: Badge[]
  locale: string
  currentYear: string
}

const CollectiblesCurrentYear: React.FC<CollectiblesCurrentYearProps> = async ({
  badges,
  locale,
  currentYear,
}) => {
  const t = await getTranslations({ locale, namespace: "page-collectibles" })
  const currentYearBadges = badges.filter(
    (badge: unknown) => String(badge.year) === currentYear
  )
  const socialBadges = currentYearBadges.filter(
    (b: unknown) => b.category === "Events/Calls"
  )
  const developerBadge = currentYearBadges.find(
    (b: unknown) => b.category === "Github" && b.name.startsWith("1 PR merged")
  )
  const writingBadge = currentYearBadges.find(
    (b: unknown) =>
      b.category === "Github" && b.name.startsWith("Content contributor")
  )
  const designBadge = currentYearBadges.find(
    (b: unknown) =>
      b.category === "Design" && b.name.startsWith("Design contributor")
  )
  const gitpoapBadge = currentYearBadges.find(
    (b: unknown) => b.category === "Github" && b.name.startsWith("GitPOAP")
  )
  const translationBadge = currentYearBadges.find(
    (b: unknown) =>
      b.category === "Translation" && b.name.startsWith("250 words translated")
  )
  if (!currentYearBadges.length) return null
  return (
    <section className="mx-auto p-2">
      {/* Custom Code & Content block */}
      <div className="mt-8">
        <div className="mb-2 flex items-center">
          <img src={toolsImg.src} alt="Tools" className="mr-2 h-6 w-auto" />
          <span className="text-left text-2xl font-bold text-[#3B2C4A]">
            {t("page-collectibles-code-content-title")}
          </span>
        </div>
        <div className="mb-6 text-left text-sm text-gray-500">
          {t("page-collectibles-code-content-desc")}
        </div>
        <div className="flex flex-col gap-6">
          {/* First row: Developer & Writing */}
          <div className="mt-4 flex flex-col gap-6 md:flex-row">
            {/* Developer */}
            <div className="flex w-[50%] flex-col">
              <div className="flex h-full flex-1 flex-row items-start rounded-xl bg-white">
                {developerBadge && (
                  <a
                    href={developerBadge.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4"
                  >
                    <img
                      src={developerBadge.image}
                      alt="Developer"
                      className="w-32 md:w-40"
                    />
                  </a>
                )}
                <div className="flex w-full flex-col justify-start">
                  <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base">
                    {t("page-collectibles-code-content-developer-title")}
                  </div>
                  <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm">
                    {t("page-collectibles-code-content-developer-desc")}
                  </div>
                  <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs">
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-code-content-developer-1pr")}
                    </li>
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-code-content-developer-5pr")}
                    </li>
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-code-content-developer-10pr")}
                    </li>
                  </ul>
                </div>
              </div>
              <Link
                href="https://github.com/ethereum/ethereum-org-website/issues"
                className="w-full rounded-lg bg-[#F5F6FA] px-4 py-1.5 text-xs font-bold text-[#A259FF] no-underline shadow transition-colors hover:bg-[#E5E7EB] md:text-sm"
              >
                <img
                  src={lightningImg.src}
                  alt="Lightning"
                  className="mr-2 inline h-4 w-auto align-middle"
                />
                {t("page-collectibles-get-started")}
              </Link>
            </div>
            {/* Writing */}
            <div className="flex w-[50%] flex-col">
              <div className="flex h-full flex-1 flex-row items-start rounded-xl bg-white">
                {writingBadge && (
                  <a
                    href={writingBadge.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4"
                  >
                    <img
                      src={writingBadge.image}
                      alt="Writing"
                      className="w-32 md:w-40"
                    />
                  </a>
                )}
                <div className="flex w-full flex-col justify-between">
                  <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base">
                    {t("page-collectibles-code-content-writing-title")}
                  </div>
                  <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm">
                    {t("page-collectibles-code-content-writing-desc")}
                  </div>
                  <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs">
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-code-content-writing-1pr")}
                    </li>
                  </ul>
                </div>
              </div>
              <Link
                href="/contributing/#how-to-update-content"
                className="w-full rounded-lg bg-[#F5F6FA] px-4 py-1.5 text-xs font-bold text-[#A259FF] no-underline shadow transition-colors hover:bg-[#E5E7EB] md:text-sm"
              >
                <img
                  src={lightningImg.src}
                  alt="Lightning"
                  className="mr-2 inline h-4 w-auto align-middle"
                />
                {t("page-collectibles-get-started")}
              </Link>
            </div>
          </div>
          {/* Second row: Design & GitPOAP */}
          <div className="mt-4 flex flex-col gap-6 md:flex-row">
            {/* Design */}
            <div className="flex w-[50%] flex-col">
              <div className="flex h-full flex-1 flex-row items-start rounded-xl bg-white">
                {designBadge && (
                  <a
                    href={designBadge.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4"
                  >
                    <img
                      src={designBadge.image}
                      alt="Design"
                      className="w-32 md:w-40"
                    />
                  </a>
                )}
                <div className="flex w-full flex-col justify-between">
                  <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base">
                    {t("page-collectibles-code-content-design-title")}
                  </div>
                  <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm">
                    {t("page-collectibles-code-content-design-desc")}
                  </div>
                  <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs">
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-code-content-design-1issue")}
                    </li>
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-code-content-design-user-testing")}
                    </li>
                  </ul>
                </div>
              </div>
              <Link
                href="/contributing/design/"
                className="w-full rounded-lg bg-[#F5F6FA] px-4 py-1.5 text-xs font-bold text-[#A259FF] no-underline shadow transition-colors hover:bg-[#E5E7EB] md:text-sm"
              >
                <img
                  src={lightningImg.src}
                  alt="Lightning"
                  className="mr-2 inline h-4 w-auto align-middle"
                />
                {t("page-collectibles-get-started")}
              </Link>
            </div>
            {/* GitPOAP */}
            <div className="flex w-[50%] flex-col">
              <div className="flex h-full flex-1 flex-row items-start rounded-xl bg-white">
                {gitpoapBadge && (
                  <a
                    href={gitpoapBadge.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4"
                  >
                    <img
                      src={gitpoapBadge.image}
                      alt="GitPOAP"
                      className="w-32 md:w-40"
                    />
                  </a>
                )}
                <div className="flex w-full flex-col justify-between">
                  <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base">
                    {t("page-collectibles-code-content-gitpoap-title")}
                  </div>
                  <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm">
                    {t("page-collectibles-code-content-gitpoap-desc")}
                  </div>
                  <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs">
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-code-content-gitpoap-1pr")}
                    </li>
                  </ul>
                </div>
              </div>
              <Link
                href="https://github.com/ethereum/ethereum-org-website/issues"
                className="w-full rounded-lg bg-[#F5F6FA] px-4 py-1.5 text-xs font-bold text-[#A259FF] no-underline shadow transition-colors hover:bg-[#E5E7EB] md:text-sm"
              >
                <img
                  src={lightningImg.src}
                  alt="Lightning"
                  className="mr-2 inline h-4 w-auto align-middle"
                />
                {t("page-collectibles-get-started")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Translations section */}
      {translationBadge && (
        <div className="mt-8">
          <div className="mb-2 flex items-center">
            <img
              src={translateImg.src}
              alt="Translate"
              className="mr-2 h-6 w-auto"
            />
            <span className="text-left text-2xl font-bold text-[#3B2C4A]">
              {t("page-collectibles-translations-title")}
            </span>
          </div>
          <div className="mb-6 text-left text-sm text-gray-500">
            {t("page-collectibles-translations-desc")}
          </div>
          <div className="mt-4 flex flex-col gap-6 md:flex-row">
            <div className="flex w-[50%] flex-col">
              <div className="flex h-full flex-1 flex-row items-start rounded-xl bg-white">
                <a
                  href={translationBadge.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4"
                >
                  <img
                    src={translationBadge.image}
                    alt="Translations"
                    className="w-32 md:w-40"
                  />
                </a>
                <div className="flex w-full flex-col justify-start">
                  <div className="mb-1 mt-1 text-left text-sm font-bold text-[#3B2C4A] md:text-base">
                    {t("page-collectibles-translations-title")}
                  </div>
                  <div className="mb-1 text-left text-[10px] text-gray-500 md:text-sm">
                    {t("page-collectibles-translations-badge-desc")}
                  </div>
                  <ul className="mb-4 ml-0 list-none text-left text-[10px] text-gray-500 md:text-xs">
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-translations-250")}
                    </li>
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-translations-1000")}
                    </li>
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-translations-10000")}
                    </li>
                    <li className="mb-1">
                      <CircleCheckIcon className="mr-2 inline h-4 w-auto align-middle text-gray-300" />
                      {t("page-collectibles-translations-50000")}
                    </li>
                  </ul>
                </div>
              </div>
              <Link
                href="/contributing/translation-program/"
                className="w-full rounded-lg bg-[#F5F6FA] px-4 py-1.5 text-xs font-bold text-[#A259FF] no-underline shadow transition-colors hover:bg-[#E5E7EB] md:text-sm"
              >
                <img
                  src={lightningImg.src}
                  alt="Lightning"
                  className="mr-2 inline h-4 w-auto align-middle"
                />
                {t("page-collectibles-get-started")}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Social section */}
      <div className="mt-8">
        <div className="mb-2 flex items-center">
          <img src={socialImg.src} alt="Social" className="mr-2 h-6 w-auto" />
          <span className="text-left text-2xl font-bold text-[#3B2C4A]">
            {t("page-collectibles-social-title")}
          </span>
        </div>
        <div className="mb-6 text-left text-sm text-gray-500">
          {t("page-collectibles-social-desc")}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {socialBadges.map((badge: unknown) => {
            return (
              <div
                key={badge.id}
                className="flex h-full w-full min-w-[220px] flex-col items-center rounded-xl bg-white p-4 sm:w-[48%] md:w-[32%] lg:w-[24%] xl:w-[18%]"
              >
                <a
                  href={badge.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2"
                >
                  <img
                    src={badge.image}
                    alt={badge.name}
                    className="h-24 w-24 md:h-32 md:w-32"
                  />
                </a>
                <div className="mb-1 mt-1 text-center text-sm font-bold text-[#3B2C4A] md:text-base">
                  {badge.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CollectiblesCurrentYear
