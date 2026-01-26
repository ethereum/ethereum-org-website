/**
 * Server-only MDX Components
 *
 * This module provides locale-aware MDX components that use filesystem
 * operations. It must only be imported in Server Components.
 */

import { createLocalizedImage } from "@/components/Image/LocalizedImage.server"

import { htmlElements, reactComponents } from "./index"

import "server-only"

/**
 * Factory function to create MDX components with locale-aware image handling.
 * The locale and slug are baked into the img handler for automatic path resolution.
 *
 * This function uses filesystem operations and must only be called from
 * Server Components.
 *
 * @param locale - Current locale (e.g., "en", "es", "zh")
 * @param slug - Content slug (e.g., "about" or "developers/docs/accounts")
 */
export function createMdComponents(locale: string, slug: string) {
  return {
    ...htmlElements,
    ...reactComponents,
    img: createLocalizedImage(locale, slug),
  }
}
