import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import CourseAppRegistration from "@/components/Courses/course-app-registration"
import { HAS_PROGRESS_SCRIPT } from "@/components/Courses/progress-storage"

import { courseAppManifestHref, courseAppScope } from "@/data/courses"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params
  return (
    // Course tints need more colour to show over the dark background (see theme.ts)
    <div className="contents dark:[--course-soft-amount:30%] dark:[--course-softer-amount:15%]">
      {/* Flags saved progress on <html> before paint (see progress-storage) */}
      <script dangerouslySetInnerHTML={{ __html: HAS_PROGRESS_SCRIPT }} />
      {children}
      <CourseAppRegistration scope={courseAppScope(locale)} />
    </div>
  )
}

/** Swaps the site-wide manifest for the courses app's own */
export const generateMetadata = async ({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "page-courses" })
  return {
    manifest: courseAppManifestHref(locale),
    icons: { apple: "/images/courses/app-icon-180.png" },
    appleWebApp: {
      capable: true,
      title: t("page-courses-app-short-name"),
      statusBarStyle: "default",
    },
  }
}

export default Layout
