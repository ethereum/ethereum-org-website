import type { Root } from "@/lib/types"

import FeedbackWidget from "@/components/FeedbackWidget/lazy"
import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import { SkipLink } from "@/components/SkipLink"
import TranslationBanner from "@/components/TranslationBanner"

export const BaseLayout = async ({
  children,
  lastDeployLocaleTimestamp,
}: Root) => (
  <>
    {/**
     * The Skip Link is positioned above the container to ensure it is not affecting the
     * layout on initial load.
     */}
    <SkipLink />
    <div className="mx-auto max-w-screen-2xl">
      <Nav />

      <TranslationBanner />

      {children}

      <Footer lastDeployLocaleTimestamp={lastDeployLocaleTimestamp} />
    </div>
    {/**
     * The Feedback Widget is positioned below the container to ensure it is not affecting the
     * layout on initial load.
     */}

    <FeedbackWidget />
  </>
)
