# A/B Testing Implementation Guide

This guide explains how to implement server-side A/B tests on ethereum.org using our Matomo API integration.

## Overview

Our A/B testing system provides:

- **Server-side rendering** - Users see consistent variants on first page load with no layout shifts
- **Matomo API integration** - Tests configured entirely in Matomo dashboard, no code deployments needed
- **GDPR compliance** - Cookie-less tracking using deterministic fingerprinting (IP + User-Agent)
- **Multi-variant support** - Test 2+ variations with configurable weights / traffic splits
- **Real-time updates** - Adjust experiment weights instantly via Matomo dashboard
- **Type safety** - Full TypeScript support with compile-time checks
- **Automatic fallbacks** - Graceful degradation when API fails (shows original variant)

## Quick Start

### 1. Set Up Goals in Matomo (Design/Product Team)

Before creating experiments, ensure you have proper **Goals** configured in Matomo to measure test success:

1. Go to **Goals** → **Manage Goals** in your Matomo dashboard
2. Create relevant goals for your test (e.g., "Newsletter Signup", "Wallet Connection", "Page Engagement")
3. Define conversion criteria (URL visits, events, etc.)

This step is important for measuring experiment effectiveness and should be done by the design/product team before technical implementation.

### 2. Create Experiment in Matomo

1. Go to your Matomo dashboard → **A/B Tests** → **Manage A/B tests**
2. Click **Create new A/B test**
3. Define your experiment:
   - **Name**: Choose a clear name (e.g., "HomepageHero", "WalletCardLayout")
   - **Hypothesis**: Explain what you predict to happen when you run the A/B test, what the outcome will be and why it will happen.
   - **Description**: Provide details about the test and its purpose
   - **Variations**: Add your variants (e.g., "NewDesign", "AlternativeLayout")
4. Define remainder of config:
   - **Success metrics**: Goals you want to track (select from previously created goals)
   - **Success conditions**: Statistical thresholds
   - **Target pages**: Specify the pages where this test will run (e.g., `/`, `/wallet`, etc.)
   - **Traffic allocation**: Set percentage weights for each variant
   - **Schedule**: Optionally set start/end dates

### 3. Implement in Your Component (Development Team)

```tsx
import ABTestWrapper from "@/components/AB/TestWrapper"

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>

      <ABTestWrapper
        testKey="HomepageHero" // Must match your Matomo experiment name exactly
        variants={[
          <OriginalComponent key="current-design" />, // Index 0: Original (matches Matomo order)
          <NewDesignComponent key="hero-redesign" />, // Index 1: Variation (matches Matomo order)
        ]}
      />
    </div>
  )
}
```

**Important Notes:**

- Variants are matched by **array index**, not by name
- Array order must match the exact order of variations in your Matomo experiment
- JSX `key` props serve as array keys, and human-readable labels in the debug panel (parsed from kebab-case to Title Case)

### 4. Experiment Activation

The experiment will automatically start running when:

1. **Your code is deployed** with the `ABTestWrapper` component
2. **The first user visits** the page where the component is implemented
3. **Matomo detects the experiment** and begins tracking

**Manual Control:**

- Use the **Schedule** settings in Matomo to control start/end dates
- Experiments respect their configured schedule automatically
- You can pause/resume experiments anytime in the Matomo dashboard

## Multi-Variant Testing

Support for 3+ variants:

```tsx
// Matomo experiment configured with variations in this exact order:
// Index 0: Original (implicit) - 40% weight
// Index 1: List Layout - 30% weight
// Index 2: Grid Layout - 20% weight
// Index 3: Carousel Layout - 10% weight

<ABTestWrapper
  testKey="WalletLayout"
  variants={[
    <OriginalLayout key="original-layout" />, // Index 0
    <ListLayout key="list-layout" />, // Index 1
    <GridLayout key="grid-layout" />, // Index 2
    <CarouselLayout key="carousel-layout" />, // Index 3
  ]}
/>
```

**Important**:

- Variant array order must exactly **match the order in your Matomo experiment**
- Assignment is by index (0, 1, 2, 3...), not by name matching
- Debug panel shows formatted key names: `"list-layout"` → `"List Layout"`

## How It Works

### Cookie-less Tracking

- Uses deterministic assignment based on IP address + User-Agent fingerprint
- Same user always gets same variant (consistent experience)
- GDPR compliant - no cookies or personal data storage required
- Users can't manually switch variants (prevents data pollution)

### API Integration

- `/api/ab-config` endpoint fetches experiment data from Matomo API
- Caches results for 1 hour to reduce API calls
- Real-time cache busting in development environment
- Automatic fallback to original variant when API fails

## Development Workflow

### Local Development

1. Create your experiment in Matomo (set to "running")
2. Implement `ABTestWrapper` in your component
3. Test locally - the debug panel shows current assignment
4. Adjust weights in Matomo dashboard to test different scenarios

### Preview Mode

- Preview deployments show debug panel with variant selector
- No tracking occurs in preview mode
- Allows manual testing of all variants

### Production

1. Deploy your component with `ABTestWrapper`
2. Monitor experiment in Matomo dashboard
3. Adjust traffic allocation as needed
4. Analyze results and implement winning variant

## Environment Variables

Required for Matomo integration:

```bash
# Matomo instance URL
NEXT_PUBLIC_MATOMO_URL=https://your-instance.matomo.cloud/

# Matomo site ID
NEXT_PUBLIC_MATOMO_SITE_ID=4

# Matomo API token (with experiments access)
MATOMO_API_TOKEN=your_api_token_here

# Preview mode flag
IS_PREVIEW_DEPLOY=false
```

## Best Practices

### Experiment Naming

- Use clear, descriptive names that match your component purpose
- Be consistent: `testKey` in code must match Matomo experiment name exactly
- Examples: "HomepageHero", "WalletCardLayout", "CheckoutFlow"

### Component Design

- Keep variants as similar as possible (same props, structure)
- Always provide a meaningful fallback component
- Use descriptive kebab-case keys: `key="simplified-checkout"` becomes `"Simplified Checkout"` in debug panel
- Ensure variant array order matches Matomo experiment order exactly
- Test all variants in Storybook before deploying

### Testing Strategy

1. **Local Development**: Test with different weights to verify all variants work
2. **Preview**: Verify Matomo tracking integration
3. **Production**: Start with small traffic allocation (10-20%), then scale up

### Performance

- Server-side rendering prevents layout shifts
- Minimal JavaScript overhead (only tracking code)
- API responses are cached to reduce latency
- Automatic fallback ensures site never breaks

## Troubleshooting

### Test Not Showing Variants

1. **Check Matomo**: Ensure experiment status is "running"
2. **Check naming**: Verify `testKey` matches Matomo experiment name exactly
3. **Check API**: Visit `/api/ab-config` to see if your experiment appears
4. **Check console**: Look for AB testing errors in browser dev tools

### Same Variant Always Shows

1. **Fingerprint consistency**: Same IP + User-Agent = same variant (this is intentional)
2. **Test from different devices/networks** to see other variants
3. **Use preview mode** to manually test all variants
4. **Check weights**: Ensure all variants have weight > 0 in Matomo

### Matomo Not Tracking

1. **Verify experiment ID**: Check that Matomo experiment ID is being used
2. **Check experiment name**: Must match exactly between code and Matomo
3. **Verify user hasn't opted out** of tracking
4. **Preview mode**: No tracking occurs in preview deployments (intentional)

### API Issues

1. **Check environment variables**: Ensure all Matomo config is set
2. **Verify API token**: Must have "experiments" permission in Matomo
3. **Check cache**: API responses cached for 1 hour, use dev mode for real-time updates
4. **Fallback behavior**: When API fails, all tests show original variant (safe default)

## Debug Panel

In development and preview environments, a debug panel appears showing:

- Current test assignment
- Available variants
- Manual variant selector (preview mode only)
- Assignment metadata (experiment ID, fingerprint hash)

The panel helps verify your test is working correctly before production deployment.

## Architecture

### Core Files

- `app/api/ab-config/route.ts` - Matomo API integration
- `src/lib/ab-testing/server.ts` - Assignment logic and fingerprinting (index-based)
- `src/components/AB/TestWrapper.tsx` - Main React component
- `src/components/AB/TestDebugPanel.tsx` - Development debug interface
- `src/components/AB/ClientABTestWrapper.tsx` - Client-side rendering with localStorage overrides

### Data Flow

1. Component renders with `ABTestWrapper`
2. Server fetches user fingerprint (IP + User-Agent)
3. System checks cache, then fetches experiment config from Matomo API
4. Deterministic assignment based on fingerprint and experiment weights
5. Appropriate variant component renders
6. Tracking data sent to Matomo (production only)

This architecture ensures consistent, performant, and privacy-compliant A/B testing across the entire site.
