# Adding Wallets to ethereum.org

This guide provides implementation instructions for adding or updating wallet listings on ethereum.org. It is designed for both human contributors and AI agents implementing wallet changes.

## Overview

Wallet listings on ethereum.org consist of two components:
1. **Wallet image** - A PNG logo file in `public/images/wallets/`
2. **Wallet data** - A TypeScript object in `src/data/wallets/wallet-data.ts`

Both components are **required** for a wallet to display correctly.

## Prerequisites

Before implementing a wallet addition:
- Verify the wallet meets [listing criteria](https://ethereum.org/contributing/adding-wallets/)
- Ensure you have all required information from the wallet suggestion issue
- Confirm you have a high-quality logo image

## Step 1: Add the Wallet Image

### Image Requirements

| Requirement | Specification |
|-------------|---------------|
| Format | PNG (strongly preferred) or SVG |
| Background | Transparent |
| Dimensions | Square aspect ratio, minimum 128x128px |
| File size | Under 150KB recommended |
| Quality | Clear, crisp logo without artifacts |

### File Naming Convention

- Use lowercase
- No spaces or special characters
- Match the wallet name (simplified)
- Examples: `metamask.png`, `trustwallet.png`, `rainbow.png`

### File Location

Place the image at:
```
public/images/wallets/{wallet-name}.png
```

### Obtaining the Image

The image should be provided in the wallet suggestion issue (attached or linked). If not available:
1. Check the wallet's official website or press kit
2. Request the image from the wallet team via the issue
3. **Never** use placeholder images or screenshots

## Step 2: Add Wallet Data

### Import the Image

Add an import statement at the top of `src/data/wallets/wallet-data.ts`:

```typescript
import WalletNameImage from "@/public/images/wallets/walletname.png"
```

Import statements are ordered alphabetically by variable name.

### Add the Wallet Entry

Add a new object to the `walletsData` array. Here's a complete template:

```typescript
{
  last_updated: "YYYY-MM-DD",  // Today's date
  name: "Wallet Name",
  image: WalletNameImage,  // The imported image
  twBackgroundColor: "bg-[#HEXCODE]",  // Brand color from issue
  twGradiantBrandColor: "from-[#HEXCODE]",  // Same as background
  url: "https://wallet-website.com/",
  active_development_team: true,
  languages_supported: ["en", "es", "zh"],  // ISO 639-1 codes
  twitter: "https://x.com/wallethandle",
  discord: "https://discord.gg/invite",
  reddit: "",  // Empty string if not available
  telegram: "",
  ios: true,  // true/false for platform support
  android: true,
  linux: false,
  windows: false,
  macOS: false,
  firefox: false,
  chromium: false,
  hardware: false,
  open_source: true,
  repo_url: "https://github.com/org/repo",
  non_custodial: true,
  security_audit: [
    "https://audit-url-1.com",
    "https://audit-url-2.com",
  ],
  scam_protection: false,
  hardware_support: false,
  rpc_importing: false,
  nft_support: true,
  connect_to_dapps: true,
  staking: false,
  swaps: true,
  layer_2: true,
  gas_fee_customization: true,
  ens_support: true,
  erc_20_support: true,
  buy_crypto: false,
  withdraw_crypto: false,
  multisig: false,
  social_recovery: false,
  onboard_documentation: "https://docs.wallet.com/",
  documentation: "https://docs.wallet.com/developers",
  supported_chains: ["Ethereum Mainnet", "Base", "Arbitrum One"],  // Optional
},
```

### Supported Chains

The optional `supported_chains` field must use **exact chain names** from `src/data/chains.ts`. Common examples:
- `"Ethereum Mainnet"` (chainId: 1)
- `"OP Mainnet"` (chainId: 10) - Note: NOT "Optimism"
- `"Arbitrum One"` (chainId: 42161)
- `"Base"` (chainId: 8453)
- `"Polygon zkEVM"` (chainId: 1101)
- `"zkSync Mainnet"` (chainId: 324)
- `"Linea"` (chainId: 59144)
- `"Scroll"` (chainId: 534352)

Always verify chain names against `src/data/chains.ts` before adding.

### Languages Supported

Use ISO 639-1 two-letter codes. Common codes:
- `en` - English
- `zh` - Chinese
- `es` - Spanish
- `ko` - Korean
- `ja` - Japanese
- `fr` - French
- `de` - German
- `pt` - Portuguese
- `tr` - Turkish
- `ru` - Russian

## Step 3: Verify the Implementation

### TypeScript Validation

Run the build to check for type errors:
```bash
pnpm build
```

Common errors:
- Missing image file (import fails)
- Incorrect field names or types
- Missing required fields

### Visual Verification

1. Start the dev server: `pnpm dev`
2. Navigate to the wallets page
3. Verify:
   - Wallet appears in the list
   - Logo displays correctly
   - Background color matches brand
   - All feature flags are accurate

## Common Mistakes to Avoid

### 1. Missing Image
**Wrong**: Adding wallet data without the image file
```typescript
image: WalletNameImage,  // Will fail if image file doesn't exist
```
**Fix**: Always add the image file first

### 2. Incorrect Chain Names
**Wrong**: Using unofficial names
```typescript
supported_chains: ["Optimism", "Polygon", "Gnosis"],
```
**Correct**: Using exact names from chains.ts
```typescript
supported_chains: ["OP Mainnet", "Polygon zkEVM", "Gnosis"],
```

### 3. Wrong Platform Flags
**Wrong**: Marking browser extension as mobile app
```typescript
ios: true,      // Browser extension is NOT an iOS app
chromium: true,
```
**Correct**: Set only accurate platform flags
```typescript
ios: false,
chromium: true,  // Chromium-based browser extension
```

### 4. Empty vs Missing Fields
- Use empty string `""` for optional text fields without values
- Use empty array `[]` for optional array fields
- Never omit required fields

## Updating an Existing Wallet

When updating a wallet (e.g., rebrand):

1. **Update the image if changed**:
   - Add new image file with new name
   - Update the import statement
   - Remove old image file if name changed

2. **Update wallet data**:
   - Change `name` field
   - Update `last_updated` to today's date
   - Update URLs, social links, features as needed
   - Update `image` reference if filename changed

3. **Clean up**:
   - Remove old image file if replaced
   - Remove old import statement

## Example: Complete Wallet Addition

Here's a real example based on actual wallet data:

### 1. Add image
Save logo to: `public/images/wallets/rainbow.png`

### 2. Add import
```typescript
import RainbowImage from "@/public/images/wallets/rainbow.png"
```

### 3. Add data entry
```typescript
{
  last_updated: "2024-10-30",
  name: "Rainbow",
  image: RainbowImage,
  twBackgroundColor: "bg-[#001E59]",
  twGradiantBrandColor: "from-[#001E59]",
  url: "https://rainbow.me/",
  active_development_team: true,
  languages_supported: ["en", "zh", "es", "fr", "de", "ja", "ko", "pt", "ru"],
  twitter: "https://x.com/rainbow",
  discord: "https://discord.gg/rainbow",
  reddit: "",
  telegram: "",
  ios: true,
  android: true,
  linux: false,
  windows: false,
  macOS: false,
  firefox: false,
  chromium: true,
  hardware: false,
  open_source: true,
  repo_url: "https://github.com/rainbow-me/rainbow",
  non_custodial: true,
  security_audit: [],
  scam_protection: true,
  hardware_support: true,
  rpc_importing: true,
  nft_support: true,
  connect_to_dapps: true,
  staking: false,
  swaps: true,
  layer_2: true,
  gas_fee_customization: true,
  ens_support: true,
  erc_20_support: true,
  buy_crypto: true,
  withdraw_crypto: false,
  multisig: false,
  social_recovery: false,
  onboard_documentation: "https://learn.rainbow.me/",
  documentation: "",
  supported_chains: ["Ethereum Mainnet", "Base", "Arbitrum One", "OP Mainnet"],
},
```

## Checklist

Before submitting a PR:

- [ ] Image file exists at `public/images/wallets/{name}.png`
- [ ] Image is PNG format with transparent background
- [ ] Import statement added and alphabetically ordered
- [ ] All required fields populated in wallet data object
- [ ] `last_updated` set to today's date
- [ ] Chain names match exactly with `src/data/chains.ts`
- [ ] Platform flags accurately reflect wallet availability
- [ ] `pnpm build` succeeds without errors
- [ ] Visual verification in dev server confirms correct display
