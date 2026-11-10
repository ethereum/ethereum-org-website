import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import CourseAppRegistration from "@/components/Courses/course-app-registration"

import { courseAppManifestHref, courseAppScope } from "@/data/courses"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params
  return (
    <>
      {children}
      <CourseAppRegistration scope={courseAppScope(locale)} />
    </>
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
    appleWebApp: {
      capable: true,
      title: t("page-courses-app-short-name"),
      statusBarStyle: "default",
    },
  }
}

export default Layout
