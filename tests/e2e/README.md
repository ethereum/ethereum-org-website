# E2E Tests

This directory contains end-to-end tests for the Ethereum.org website using Playwright.

## Structure

```
tests/e2e/
├── pages/              # Page Object Model classes
│   ├── BasePage.ts     # Base page with common functionality
│   ├── HomePage.ts     # Homepage interactions
│   └── FindWalletPage.ts # Wallet finder page interactions
├── utils/              # Test utilities and helpers
│   └── testHelpers.ts  # Common test functions
├── fixtures/           # Test data and fixtures
│   └── testData.ts     # Static test data
├── *.spec.ts           # Test files
├── __results__/        # Test execution results (gitignored)
├── __report__/         # HTML test reports (gitignored)
└── .gitignore
```

## Test Files

- `home.spec.ts` - Homepage functionality tests
- `find-wallet.spec.ts` - Wallet finder page tests  
- `critical-flows.spec.ts` - End-to-end user journey tests

## Running Tests

See the main [E2E Testing documentation](../../docs/e2e-testing.md) for detailed instructions.

## Quick Commands

```bash
# Run all tests
pnpm test:e2e

# Run specific test file
pnpm test:e2e tests/e2e/home.spec.ts

# Run with UI
pnpm test:e2e:ui

# Debug tests
pnpm test:e2e:debug
```