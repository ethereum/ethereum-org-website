# E2E Testing with Playwright

## Overview

This project uses [Playwright](https://playwright.dev/) for end-to-end testing with [Chromatic](https://www.chromatic.com/) integration for visual regression testing.

## Quick Start

### Running Tests Locally

```bash
# Install dependencies (if not already done)
pnpm install

# Install Playwright browsers
npx playwright install

# Run all e2e tests
pnpm test:e2e

# Run tests with UI (interactive mode)
pnpm test:e2e:ui

# Run tests in debug mode
pnpm test:e2e:debug

# View test report
pnpm test:e2e:report
```

### Development Server: Choosing the Best Mode for E2E Testing

By default, Playwright tests run against `http://localhost:3000`. Before running tests, ensure your development server is up and running. You can start it in development mode with:

```bash
pnpm dev
```

**Note:** Running in dev mode (`pnpm dev`) is convenient for rapid iteration, but it can be significantly slower than production builds. As a result, you may encounter Playwright timeout errors if pages take too long to load or build on demand.

#### Tips to Avoid Timeout Issues

- **Preload pages:** Manually visit the routes you plan to test in your browser before running the tests. This triggers Next.js to build those pages ahead of time, reducing load times during testing.
- **Increase Playwright timeouts:** If you must use dev mode, consider increasing Playwright's default timeouts to accommodate slower builds (see Playwright config docs).
- **Use a production build for reliability:** For the fastest and most stable E2E test runs, use a production build. This ensures all pages are prebuilt and served at optimal speed:

```bash
pnpm build
pnpm start
```

This will serve your app at `http://localhost:3000` in production mode, minimizing the risk of timeouts and making your tests more reliable.

> **Summary:**
>
> - Use `pnpm dev` for quick local development and debugging, but expect slower performance and possible timeouts.
> - For CI or full test runs, prefer `pnpm build && pnpm start` for best results.

## Directory Layout

```
tests/e2e/
├── __results__/          # Test results (gitignored)
├── __report__/           # HTML reports (gitignored)
├── fixtures/             # Test data and fixtures
├── pages/                # Page Object Model classes
├── utils/                # Test utilities and helpers
├── *.spec.ts             # Test files
└── .gitignore
```

## Writing Tests

### Best Practices

#### 1. Use Page Object Model

Create reusable page objects for common interactions. For more details, see the [Playwright Page Object Model documentation](https://playwright.dev/docs/pom):

```typescript
// pages/HomePage.ts
export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/")
  }

  async searchFor(query: string) {
    const isMobile = await this.isMobileViewport()
    if (isMobile) {
      await this.page.getByTestId("search-button").first().click()
    } else {
      await this.page.getByTestId("search-input-button").first().click()
    }
    await this.page.getByPlaceholder("Search").fill(query)
  }

  private async isMobileViewport() {
    const viewport = this.page.viewportSize()
    return viewport && viewport.width <= 768
  }
}
```

#### 2. Robust Selectors

Prefer `data-testid` attributes over CSS selectors:

```typescript
// Good
await page.getByTestId("search-button")

// Better for accessibility
await page.getByRole("button", { name: "Search" })

// Avoid fragile selectors
await page.locator(".search-btn-class") // Fragile
```

#### 3. Responsive Testing

Handle different viewport sizes appropriately:

```typescript
test("search functionality", async ({ page }) => {
  const viewport = page.viewportSize()
  const isMobile = viewport && viewport.width <= breakpointAsNumber.md

  if (isMobile) {
    // Mobile-specific logic
  } else {
    // Desktop-specific logic
  }
})
```

#### 4. Visual Testing

Use Chromatic snapshots for visual regression testing:

```typescript
import { takeSnapshot } from "@chromatic-com/playwright"

test("visual regression", async ({ page }, testInfo) => {
  await page.goto("/")
  await takeSnapshot(page, "homepage-initial", testInfo)
})
```
