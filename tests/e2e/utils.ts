import { expect, type Page } from "@playwright/test"

export async function openLanguagePickerDesktop(page: Page) {
  const nav = page.getByRole("navigation", { name: /primary/i })
  const langButton = nav.getByRole("button", { name: /languages/i })
  await expect(langButton).toBeVisible()
  await langButton.click()
  return page
}

export async function openLanguagePickerMobile(page: Page) {
  const nav = page.getByRole("navigation", { name: /primary/i })
  const menuButton = nav.getByRole("button", {
    name: /toggle menu button/i,
  })
  await expect(menuButton).toBeVisible()
  await menuButton.click()
  const sidebar = page.getByRole("dialog", { name: /ethereum.org/i })
  await expect(sidebar).toBeVisible()
  const langButton = sidebar.getByRole("button", { name: /languages/i })
  await expect(langButton).toBeVisible()
  await langButton.click()
  return page
}

export async function switchToLanguage(
  page: Page,
  langFilter: string,
  langOptionRegex: RegExp
) {
  const searchInput = page.getByPlaceholder(/type to filter/i)
  await expect(searchInput).toBeVisible()
  await searchInput.fill(langFilter)
  const langOption = page.getByRole("option", { name: langOptionRegex })
  await expect(langOption).toBeVisible()
  await langOption.click()
}
