"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

import { Heading2 } from "@/components/MdComponents"

import { breakpointAsNumber } from "@/lib/utils/screen"

import heroImage from "@/public/images/home/hero.png"

export default function HeroQualityDemo() {
  const t = useTranslations("page-index")
  const [selectedQualities, setSelectedQualities] = useState<number[]>([100, 5])
  const [customHeight, setCustomHeight] = useState(300) // Default height in px
  const [isMobile, setIsMobile] = useState(false)
  const [useCustomHeight, setUseCustomHeight] = useState(false) // Toggle for custom height

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const alt = t("page-index-hero-image-alt")

  // Generate quality values from 100% to 5% in 5% decrements
  const qualityValues = Array.from({ length: 20 }, (_, i) => 100 - i * 5)

  const toggleQuality = (quality: number) => {
    setSelectedQualities(
      (prev) =>
        prev.includes(quality)
          ? prev.filter((q) => q !== quality)
          : [...prev, quality].sort((a, b) => b - a) // Keep sorted descending
    )
  }

  const handleMouseResize = (
    e: React.MouseEvent,
    direction: "top" | "bottom"
  ) => {
    if (isMobile) return

    const startY = e.clientY
    const startHeight = customHeight

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY =
        direction === "top"
          ? startY - moveEvent.clientY
          : moveEvent.clientY - startY
      const newHeight = Math.max(100, Math.min(600, startHeight + deltaY))
      setCustomHeight(newHeight)
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "default"
      document.body.style.userSelect = "auto"
    }

    document.body.style.cursor = direction === "top" ? "n-resize" : "s-resize"
    document.body.style.userSelect = "none"
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const ImageContainer = ({
    quality,
    isComparison = false,
  }: {
    quality: number
    isComparison?: boolean
  }) => (
    <div className="relative mx-auto w-full max-w-[1536px]">
      {!isMobile && useCustomHeight && (
        <>
          <div
            className="absolute left-0 right-0 top-0 z-10 h-2 cursor-n-resize hover:bg-primary/20"
            onMouseDown={(e) => handleMouseResize(e, "top")}
          />
          <div
            className="absolute bottom-0 left-0 right-0 z-10 h-2 cursor-s-resize hover:bg-primary/20"
            onMouseDown={(e) => handleMouseResize(e, "bottom")}
          />
        </>
      )}
      <div
        className={
          useCustomHeight
            ? "overflow-hidden"
            : "h-[240px] overflow-hidden md:h-[380px] lg:h-[480px]"
        }
        style={useCustomHeight ? { height: `${customHeight}px` } : undefined}
      >
        <Image
          src={heroImage}
          alt={`${alt} (Quality: ${quality}%)`}
          width={1536}
          height={480}
          quality={quality}
          sizes={`(max-width: ${breakpointAsNumber["2xl"]}px) 100vw, ${breakpointAsNumber["2xl"]}px`}
          className="h-full w-full object-cover"
          priority={!isComparison && quality >= 80}
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">
          Hero Image Quality Comparison
        </h1>
        <p className="text-body-medium">
          Comparing the homepage hero image at different quality settings (100%
          to 5% in 5% decrements). Check the boxes below to compare selected
          qualities side-by-side.
        </p>
      </div>
      <div className="sticky inset-x-auto top-20 z-sticky mx-auto mb-8 flex w-fit flex-col items-center rounded-2xl border bg-background/90 px-3 py-2">
        {/* Custom Height Toggle */}
        <div className="mb-4 flex items-center justify-center gap-4">
          <label
            htmlFor="custom-height-toggle"
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="block text-sm font-medium">Prod</span>
            <div className="relative">
              <input
                id="custom-height-toggle"
                type="checkbox"
                checked={useCustomHeight}
                onChange={(e) => setUseCustomHeight(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`h-6 w-11 rounded-full transition-colors ${useCustomHeight ? "bg-primary" : "bg-gray-300"}`}
              >
                <div
                  className={`h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${useCustomHeight ? "translate-x-5" : "translate-x-0"} ml-0.5 mt-0.5`}
                ></div>
              </div>
            </div>
            <span className="block text-sm font-medium">Play with height</span>
          </label>
        </div>

        {useCustomHeight && (
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="text-sm text-body-medium">
              Height: {customHeight}px
            </span>
            {!isMobile && (
              <span className="text-xs text-body-medium">
                (Hover top/bottom edges to resize)
              </span>
            )}
          </div>
        )}

        {!useCustomHeight && (
          <div className="text-center text-sm text-body-medium">
            Using responsive breakpoint heights: 240px (mobile) • 380px (tablet)
            • 480px (desktop)
          </div>
        )}
      </div>

      {/* Comparison Section */}
      {selectedQualities.length > 0 && (
        <div className="mb-24">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Selected Qualities Comparison ({selectedQualities.length} selected)
          </h2>
          <div className="space-y-6">
            {selectedQualities.map((quality) => (
              <div key={`comparison-${quality}`} className="w-full">
                <div className="relative">
                  <div className="absolute start-4 top-4 z-20 text-center">
                    <span className="inline-block rounded bg-primary px-3 py-1 text-sm font-semibold text-primary-high-contrast">
                      Quality: {quality}%
                    </span>
                  </div>
                  <ImageContainer quality={quality} isComparison={true} />
                </div>
              </div>
            ))}
          </div>
          <hr className="my-8" />
        </div>
      )}

      <div className="space-y-8">
        {qualityValues.map((quality) => (
          <div key={quality} className="w-full">
            <div className="flex items-center gap-4 px-6 pb-4">
              <input
                type="checkbox"
                id={`quality-${quality}`}
                checked={selectedQualities.includes(quality)}
                onChange={() => toggleQuality(quality)}
                className="-ms-4 h-4 w-4 flex-shrink-0 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <Heading2
                  id={quality.toString()}
                  className="m-0 ms-4 text-xl font-semibold"
                >
                  Quality: {quality}%
                </Heading2>
              </div>
            </div>
            <ImageContainer quality={quality} />
          </div>
        ))}
      </div>

      {/* Mobile Height Slider */}
      {isMobile && useCustomHeight && (
        <div className="fixed bottom-4 left-4 right-4 z-30 rounded-lg border border-border bg-background p-4 shadow-lg">
          <div className="flex items-center gap-4">
            <label
              htmlFor="height-slider"
              className="flex-shrink-0 text-sm font-medium"
            >
              Height:
            </label>
            <input
              id="height-slider"
              type="range"
              min="100"
              max="600"
              value={customHeight}
              onChange={(e) => setCustomHeight(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-12 flex-shrink-0 text-sm text-body-medium">
              {customHeight}px
            </span>
          </div>
        </div>
      )}

      <div className="mx-auto mt-12 max-w-4xl px-8">
        <div className="rounded-lg bg-background-highlight p-6">
          <h3 className="mb-4 text-lg font-semibold">Usage Notes:</h3>
          <ul className="space-y-2 text-sm text-body-medium">
            <li>
              • Lower quality (5-20%) = smaller file size, faster loading, but
              visible compression artifacts
            </li>
            <li>
              • Medium quality (25-50%) = balanced file size and visual quality
            </li>
            <li>
              • Higher quality (55-100%) = larger file size, slower loading, but
              better visual fidelity
            </li>
            <li>
              • The optimal quality depends on your performance vs visual
              quality requirements
            </li>
            <li>• Use the height controls to test different viewport sizes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
