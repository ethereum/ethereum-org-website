// Common utilities for i18n workflows

import { config } from "../../config"

/**
 * Delay execution for specified milliseconds
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Log debug message (only when verbose mode is enabled)
 */
export function debugLog(message: string): void {
  if (!config.verbose) return
  console.log(`[DEBUG] ${message}`)
}

/**
 * Log a section header with consistent formatting
 */
export function logSection(title: string): void {
  console.log(`\n========== ${title} ==========`)
}

/**
 * Log a subsection with lighter formatting
 */
export function logSubsection(title: string): void {
  console.log(`\n--- ${title} ---`)
}
