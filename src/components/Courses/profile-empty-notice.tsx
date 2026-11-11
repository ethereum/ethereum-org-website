import { UserRound } from "lucide-react"
import { getTranslations } from "next-intl/server"

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import InlineLink from "@/components/ui/Link"

import { COURSES_HUB, NO_PROFILE_PARAM } from "@/data/courses"

import { HAS_PROGRESS_SCRIPT } from "./progress-storage"

/**
 * In the server HTML so it paints at once, while the profile redirects
 * someone with no progress back to the hub. The inline script runs before
 * paint and flags saved progress, which hides this notice instead.
 */
const ProfileEmptyNotice = async () => {
  const t = await getTranslations("page-courses")
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: HAS_PROGRESS_SCRIPT }} />
      <Alert
        variant="info"
        role="status"
        // Literal for Tailwind's scanner; must match HAS_PROGRESS_ATTR
        className="[[data-has-course-progress]_&]:hidden"
      >
        <AlertIcon>
          <UserRound />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>{t("page-courses-profile-redirect-title")}</AlertTitle>
          <AlertDescription>
            {t("page-courses-profile-redirect-description")}{" "}
            <InlineLink href={`${COURSES_HUB}?${NO_PROFILE_PARAM}`}>
              {t("page-courses-profile-redirect-link")}
            </InlineLink>
          </AlertDescription>
        </AlertContent>
      </Alert>
    </>
  )
}

export default ProfileEmptyNotice
