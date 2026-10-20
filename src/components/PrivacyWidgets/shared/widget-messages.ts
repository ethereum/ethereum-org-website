import { pick } from "lodash"
import { getMessages } from "next-intl/server"

/**
 * Messages for a standalone widget's own I18nProvider. A nested provider
 * replaces the outer messages, so `common` (Link's assistive text) and
 * `glossary-tooltip` (<glossary> tags) always come along.
 */
export const getWidgetMessages = async (locale: string, namespace: string) =>
  pick(await getMessages({ locale }), ["common", "glossary-tooltip", namespace])
