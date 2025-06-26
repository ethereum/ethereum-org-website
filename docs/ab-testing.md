# A/B Testing Implementation Guide

This guide explains how to implement server-side A/B tests on ethereum.org using our Matomo integration.

## Overview

Our A/B testing system provides:
- **Server-side rendering** - Users see consistent variants on first page load
- **Matomo integration** - Automatic tracking of test participation and conversions
- **Multi-variant support** - Test 2+ variations with configurable weights
- **Cookie persistence** - Users stay in the same test group across sessions (30 days)
- **Type safety** - Full TypeScript support with compile-time checks

## Quick Start

### 1. Configure Your Test

Add environment variables to `.env.local`:

```bash
# Enable the test
ABTEST_MY_TEST_NAME_ENABLED=true
# Matomo experiment ID (from your Matomo dashboard)
ABTEST_MY_TEST_NAME_ID=1
# Variant weights (can be any positive numbers)
ABTEST_MY_TEST_NAME_VARIANTS="original:50,variant_b:50"
```

### 2. Add the Test Config

Update `src/lib/ab-testing/config.ts`:

```typescript
export const getABTestConfigs = (): Record<string, ABTestConfig> => {
  return {
    // ...existing tests
    myTestName: {
      name: "MyTestName", // Must match Matomo experiment name
      id: getEnvVar("ABTEST_MY_TEST_NAME_ID", "1"),
      enabled: getEnvVar("ABTEST_MY_TEST_NAME_ENABLED") === "true",
      variants: parseVariantWeights("ABTEST_MY_TEST_NAME_VARIANTS")
    }
  }
}
```

### 3. Implement in Your Component

```tsx
import ABTestWrapper from "@/components/ABTestWrapper"

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      
      <ABTestWrapper
        testKey="myTestName"
        variants={[
          <OriginalComponent key="original" />,
          <NewComponent key="variant" />
        ]}
        fallback={<OriginalComponent />} // Optional: shown if test is disabled
      />
    </div>
  )
}
```

## Environment Variable Naming Convention

- `ABTEST_[TEST_NAME]_ENABLED` - Boolean to enable/disable test
- `ABTEST_[TEST_NAME]_ID` - Matomo experiment ID (number or string)
- `ABTEST_[TEST_NAME]_VARIANTS` - Comma-separated variant definitions

**Test name format:** Use UPPERCASE_SNAKE_CASE for env vars, but camelCase for the testKey.

Example:
- Env var: `ABTEST_HOMEPAGE_CTA_BUTTON_ENABLED`
- Config key: `homepageCtaButton`
- testKey: `"homepageCtaButton"`

## Multi-Variant Testing

Support for 3+ variants:

```typescript
// Environment variable
ABTEST_WALLET_LAYOUT_VARIANTS="original:40,list:30,grid:20,carousel:10"

// Component usage
<ABTestWrapper
  testKey="walletLayout"
  variants={[
    <OriginalLayout />,    // original (40% weight)
    <ListLayout />,        // list (30% weight)  
    <GridLayout />,        // grid (20% weight)
    <CarouselLayout />     // carousel (10% weight)
  ]}
/>
```

## Matomo Setup

### 1. Create Experiment in Matomo
1. Go to your Matomo dashboard
2. Navigate to "Experiments" → "Manage Experiments"
3. Create new experiment with:
   - **Name**: Exact match to your config name (e.g., "MyTestName")
   - **Variations**: Match your variant names (e.g., "original", "variant_b")
   - **Traffic allocation**: Can be different from your code weights

### 2. Get Experiment ID
- Copy the experiment ID from Matomo
- Use it in your `ABTEST_[TEST_NAME]_ID` env var

## Best Practices

### Component Design
- Keep variants as similar as possible (same props, structure)
- Use consistent naming between Matomo and code
- Always provide a fallback for when tests are disabled

### Variant Weights
- Use meaningful numbers (50:50, 70:30, etc.)
- Weights don't need to sum to 100
- Can adjust without code changes

### Testing Strategy
1. **Local Development**: Test with `ENABLED=true` and different weights
2. **Staging**: Verify Matomo tracking works
3. **Production**: Start with small traffic allocation (10-20%)

### Performance
- Server-side rendering means no layout shifts
- Minimal JavaScript overhead (only tracking)
- Cookies are lightweight and scoped

## Troubleshooting

### Test Not Showing Variants
1. Check `ENABLED=true` in env vars
2. Verify test name matches config key exactly
3. Check browser console for errors

### Matomo Not Tracking
1. Verify Matomo experiment ID matches
2. Check experiment name matches exactly
3. Ensure user hasn't opted out of tracking
4. Check browser console for Matomo debug logs

### Same Variant Always Shows
1. Clear cookies: `_pk_abtest_[testname]`
2. Check variant weights are > 0
3. Verify random assignment logic

## Architecture Notes

- **Cookies**: Uses `_pk_abtest_[testKey]` following Matomo naming conventions
- **Persistence**: 30 days (compliant with existing cookie policy)
- **SSR**: True server-side rendering with no hydration mismatches
- **Fallbacks**: Graceful degradation when tests are disabled or fail
