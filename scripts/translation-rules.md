# Ethereum.org Translation Rules

Rules for what should NEVER be translated, and conditional translation guidance.
Separate from the translation glossary (which covers HOW to translate terms).
These rules cover WHEN NOT TO translate.

## Never Translate

### Technical Identifiers
- **EVM opcodes**: SSTORE, CALL, PUSH, DELEGATECALL, etc.
- **Token tickers**: ETH, DAI, USDC, WBTC, etc.
- **Standard identifiers**: ERC-20, EIP-1559, ERC-721, ERC-4337, etc.
- **Cryptographic primitive names**: SHA-256, Keccak-256, ECDSA, BLS, zk-SNARKs, zk-STARKs
- **Unit denominations**: Gwei, Wei (always Latin)
- **Network names**: Mainnet, Sepolia, Holesky, Goerli (proper nouns)
- **License identifiers**: MIT, Apache-2.0, CC-BY-SA 4.0

### Code & Technical Artifacts
- **Code snippets / variable names / function names**: always Latin/ASCII
- **File paths and CLI commands**: always Latin
- **Hexadecimal values and addresses**: 0x1234... always Latin
- **JSON/data structure keys**: e.g., `"status": "pending"` -- keys stay English
- **Solidity event/log names**: `Transfer`, `Approval`, `LogDeposit`
- **Mathematical notations and formulas**: keep as-is

### Names & References
- **Usernames / contributor names**: never translate or transliterate
- **Email addresses**: always Latin
- **URLs and domains**: always Latin
- **Brand/product names**: MetaMask, Etherscan, Remix, Uniswap, etc.
- **Client implementation names**: Geth, Prysm, Lighthouse, Teku, Nimbus, Besu, etc.
- **Standards body acronyms**: W3C, IETF, NIST, IEEE

### External Content
- **Publication/article titles**: Keep English when the destination content is English. Optionally add a localized note like [English] for reader expectation.

## Conditional Rules

### First Mention Rule
For technical acronyms (DAO, PoS, AMM, etc.): translate the full expansion on first occurrence with the English acronym in parentheses. Use only the English acronym thereafter.

Example in Spanish: *Organizacion Autonoma Descentralizada (DAO)*. Subsequent uses: just "DAO".

### UI Reference Rule
Only translate a button/menu label (e.g., "Click 'Connect Wallet'") if the target application actually has a localized version. If the app is English-only, the instruction must match the English UI text.

### Placeholder Rule
Content inside angle brackets or square brackets in examples (e.g., `[your_address]`, `<amount>`) should be translated so the user understands what to input. Keep the brackets themselves.

### Composite Names Rule
Descriptive component names like "Beacon Chain", "Execution Layer", "Consensus Layer" are translated as concepts, even though they function as names of system components. The glossary provides the standard translation for each.

### Onchain / Offchain
Write WITHOUT hyphens: "onchain", "offchain" (analogous to "online", "offline"). "On-chain" and "off-chain" are recognized aliases but not preferred in ethereum.org English content.

## Language-Specific Notes

### CJK (Chinese, Japanese, Korean)
- Prefer localized translations of descriptive technical terms (e.g., "smart contract" -> Chinese semantic translation)
- Keep pure brand names in Latin script
- Japanese: use katakana for loanword transliteration

### German / French
- English technical loanwords ("Staking", "Slashing", "Gas") are frequently kept as-is when no natural translation exists
- Do not force awkward translations when the English term is already standard in the community

### RTL Languages (Arabic, Urdu)
- Mixed-direction strings (English URL in Arabic sentence) require bidi handling
- Punctuation and brackets can flip in RTL context -- test rendering
- Arabic: use Western Arabic numerals (0-9)
- Urdu: use native numerals in prose; Western Arabic numerals in technical/code contexts

### Slavic Languages (Russian, Ukrainian, Polish, Czech)
- English loanwords may need to be declined through grammatical cases
- Plurals follow CLDR categories (one/few/many/other), not simple singular/plural

### Indic Languages (Hindi, Bengali, Marathi, Tamil, Telugu)
- Full script transliteration for technical terms
- URLs and domains always stay Latin
- Hindi/Marathi: Western Arabic numerals are standard (not Devanagari numerals)
