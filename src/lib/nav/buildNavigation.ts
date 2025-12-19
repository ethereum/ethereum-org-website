import type { NavSections } from "@/components/Nav/types"

type TranslateFn = (key: string) => string

export const buildNavigation = (t: TranslateFn): NavSections => {
  return {
    learn: {
      label: t("learn"),
      ariaLabel: t("learn-menu"),
      items: [
        {
          id: "learn/overview",
          label: t("nav-overview-label"),
          description: t("nav-overview-description"),
          href: "/learn/",
        },
        {
          id: "learn/quizzes",
          label: t("nav-quizzes-label"),
          description: t("nav-quizzes-description"),
          href: "/quizzes/",
        },
      ],
    },
    use: {
      label: t("use"),
      ariaLabel: t("use-menu"),
      items: [
        {
          id: "use/get-started",
          label: t("get-started"),
          description: t("nav-get-started-description"),
          items: [
            {
              label: t("nav-start-with-crypto-title"),
              description: t("nav-start-with-crypto-description"),
              href: "/start/",
            },
            {
              label: t("application-explorer"),
              description: t("nav-apps-description"),
              href: "/apps/",
            },
          ],
        },
      ],
    },
    build: {
      label: t("build"),
      ariaLabel: t("build-menu"),
      items: [
        {
          id: "build/home",
          label: t("nav-builders-home-label"),
          description: t("nav-builders-home-description"),
          href: "/developers/",
        },
        {
          id: "build/get-started",
          label: t("get-started"),
          description: t("nav-start-building-description"),
          items: [
            {
              label: t("tutorials"),
              description: t("nav-tutorials-description"),
              href: "/developers/tutorials/",
            },
            {
              label: t("learn-by-coding"),
              description: t("nav-learn-by-coding-description"),
              href: "/developers/learning-tools/",
            },
            {
              label: t("set-up-local-env"),
              description: t("nav-local-env-description"),
              href: "/developers/local-environment/",
            },
          ],
        },
        {
          id: "build/docs",
          label: t("documentation"),
          description: t("nav-docs-description"),
          items: [
            {
              label: t("nav-overview-label"),
              description: t("nav-docs-overview-description"),
              href: "/developers/docs/",
            },
          ],
        },
      ],
    },
    participate: {
      label: t("participate"),
      ariaLabel: t("participate-menu"),
      items: [
        {
          id: "participate/community-hub",
          label: t("community-hub"),
          description: t("nav-participate-overview-description"),
          href: "/community/",
        },
        {
          id: "participate/resources",
          label: t("resources"),
          description: t("nav-resources-description"),
          href: "/resources/",
        },
        {
          id: "participate/site",
          label: t("site-title"),
          description: t("nav-ethereum-org-description"),
          items: [
            {
              label: t("nav-contribute-label"),
              description: t("nav-contribute-description"),
              href: "/contributing/",
            },
            {
              label: t("about-ethereum-org"),
              description: t("nav-about-description"),
              href: "/about/",
            },
          ],
        },
      ],
    },
  }
}
