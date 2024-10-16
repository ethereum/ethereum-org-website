// eslint-disable-next-line no-restricted-imports
import { getI18n } from "react-i18next"

import { ns as exposedNs } from "./i18next"

/**
 * Get translations using the `getI18n` method.
 *
 * Only requires the key and optionally the namespace.
 *
 * Used for Stories where it is invalid to use the `useTranslation` hook in
 * the `render` function.
 *
 * The `ns` param is also typed with the namespaces that are exposed in
 * storybook.
 *
 * @param key - The key to translate.
 * @param ns - The exposed namespace.
 * @returns The translated string.
 */
export const getTranslation = (
  key: string,
  ns?: (typeof exposedNs)[number]
) => {
  const { t } = getI18n()
  return t(key, { ns })
}
