import {
  Icon,
  Link as ChakraLink,
  LinkProps,
  useTheme,
  VisuallyHidden,
} from "@chakra-ui/react"
import { RxExternalLink } from "react-icons/rx"
import { useRouter } from "next/router"
// import { navigate as gatsbyNavigate } from "gatsby"
// import { Link as IntlLink } from "gatsby-plugin-react-i18next"
// import { NavigateOptions } from "@reach/router"

// import { Lang } from "../utils/languages"
// import { trackCustomEvent, MatomoEventOptions } from "../utils/matomo"
import * as url from "@/lib/utils/url"
import { getRelativePath } from "@/lib/utils/relativePath"

import { DISCORD_PATH, SITE_URL } from "@/lib/constants"
// import { Direction } from "../types"

export interface IBaseProps {
  to?: string
  href?: string
  // language?: Lang
  hideArrow?: boolean
  isPartiallyActive?: boolean
  // customEventOptions?: MatomoEventOptions
  activeStyle?: object
}

export interface IProps extends IBaseProps, LinkProps {
  // dir?: Direction // TODO: remove this prop once we use the native Chakra RTL support
}

/**
 * Link wrapper which handles:
 *
 * - Hashed links
 * e.g. <Link href="/page-2/#specific-section">
 *
 * - External links
 * e.g. <Link href="https://example.com/">
 *
 * - PDFs & static files (which open in a new tab)
 * e.g. <Link href="/eth-whitepaper.pdf">
 *
 * - Intl links
 * e.g. <Link href="/page-2/" language="de">
 */
export const BaseLink: React.FC<IProps> = ({
  to: toProp,
  href,
  // language,
  dir = "ltr",
  children,
  hideArrow = false,
  isPartiallyActive = true,
  // customEventOptions,
  activeStyle = null,
  ...restProps
}) => {
  const theme = useTheme()
  const router = useRouter()

  // TODO: in the next PR we are going to deprecate the `to` prop and just use `href`
  // this is to support the ButtonLink component which uses the `to` prop
  let to = (toProp ?? href)!

  const isDiscordInvite = url.isDiscordInvite(to)
  if (isDiscordInvite) to = new URL(DISCORD_PATH, SITE_URL).href
  const isExternal = url.isExternal(to)
  const isHash = url.isHash(to)
  const isStatic = url.isStatic(to)
  const isPdf = url.isPdf(to)

  const commonProps = {
    dir,
    ...restProps,
  }

  // Must use Chakra's native <Link> for anchor links
  // Otherwise the Gatsby <Link> functionality will navigate to homepage
  // See https://github.com/gatsbyjs/gatsby/issues/21909
  // TODO: review the comments above for NextJS version
  if (isHash) {
    return (
      <ChakraLink href={to} {...commonProps}>
        {children}
      </ChakraLink>
    )
  }

  // Get proper download link for internally hosted PDF's & static files (ex: whitepaper)
  // Opens in separate window.
  if ((isPdf && !isExternal) || isStatic) {
    const relativePath = getRelativePath(router.asPath, to)

    return (
      <ChakraLink href={relativePath} isExternal {...commonProps}>
        <>
          {children}
          <VisuallyHidden>(opens in a new tab)</VisuallyHidden>
          {!hideArrow && (
            <Icon
              as={RxExternalLink}
              boxSize="6"
              p="1"
              verticalAlign="middle"
              me="-1"
            />
          )}
        </>
      </ChakraLink>
    )
  }

  if (isExternal) {
    return (
      <ChakraLink href={to} isExternal {...commonProps}>
        <>
          {children}
          <VisuallyHidden>(opens in a new tab)</VisuallyHidden>
          {!hideArrow && (
            <Icon
              as={RxExternalLink}
              boxSize="6"
              p="1"
              verticalAlign="middle"
              me="-1"
            />
          )}
        </>
      </ChakraLink>
    )
  }

  return (
    <ChakraLink
      to={to}
      // as={IntlLink}
      // language={language}
      partiallyActive={isPartiallyActive}
      activeStyle={activeStyle ? activeStyle : { color: theme.colors.primary }}
      whiteSpace={"normal"}
      {...commonProps}
    >
      {children}
    </ChakraLink>
  )
}

// export function navigate(to: string, language: Lang, options?: NavigateOptions<{}>) {
//   if (typeof window === "undefined") {
//     return
//   }

//   const link = `/${language}${to}`
//   gatsbyNavigate(link, options)
// }

const InlineLink = (props: IProps) => <BaseLink data-inline-link {...props} />

export default InlineLink
