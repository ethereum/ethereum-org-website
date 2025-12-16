// Common utilities for i18n workflows

/**
 * Delay execution for specified milliseconds
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

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
