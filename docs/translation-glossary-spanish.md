# Spanish Translation Glossary

This document provides guidelines for translating ethereum.org content into Spanish. It aims to ensure consistency across translations and help both human translators and AI translation tools produce high-quality localized content.

## Universal Rules (Apply to All Languages)

These rules apply broadly across translations and should be considered when creating glossaries for other languages.

### Never Translate

The following categories should **never** be translated:

1. **Programming Languages & Frameworks**
   - Solidity, Vyper, Rust, Python, JavaScript, TypeScript, etc.
   - React, Node.js, Hardhat, Foundry, etc.

2. **Company & Product Names**
   - Alchemy, Infura, QuickNode, Chainlink, etc.
   - MetaMask, Ledger, Trezor, Rainbow, etc.
   - OpenZeppelin, Consensys, etc.

3. **Protocol & Network Names**
   - Ethereum, Bitcoin, Polygon, Arbitrum, Optimism, etc.
   - IPFS, Swarm, etc.

4. **Technical Standards**
   - ERC-20, ERC-721, ERC-1155, EIP-1559, etc.

5. **Code Elements**
   - Function names, variable names, file paths
   - Code snippets, command-line instructions

6. **Acronyms (Keep Original)**
   - NFT, DAO, DeFi, DEX, CEX, TVL, APY, APR
   - EVM, RPC, API, SDK, JSON, HTTP
   - Note: Provide translated expansion on first use, e.g., "tokens no fungibles (NFT)"

### Always Translate

These should always be localized:

1. **Common Technical Concepts**
   - wallet → billetera/cartera
   - blockchain → cadena de bloques (or "blockchain" if widely used)
   - smart contract → contrato inteligente
   - transaction → transaccion
   - block → bloque
   - node → nodo
   - mining → mineria
   - staking → staking (or participacion, see notes)

---

## Spanish-Specific Guidelines

### Terms That Should NOT Be Translated

| English | Keep As | Reason |
|---------|---------|--------|
| Solidity | Solidity | Programming language name (NOT "Solidez") |
| Vyper | Vyper | Programming language name |
| Alchemy | Alchemy | Company name (NOT "Alquimia") |
| Infura | Infura | Company name |
| MetaMask | MetaMask | Product name |
| Rollup / Rollups | Rollup / Rollups | Technical term widely used in Spanish crypto community |
| Mainnet | Mainnet | Standard network terminology |
| Testnet | Testnet | Standard network terminology |
| Gas | Gas | Standard Ethereum terminology |
| Gwei | Gwei | Unit of measurement |
| Wei | Wei | Unit of measurement |
| Ether / ETH | Ether / ETH | Currency name |
| Beacon Chain | Beacon Chain | Protocol name |
| Merge | Merge | Historical event name |
| Dencun | Dencun | Upgrade name |
| Pectra | Pectra | Upgrade name |
| Blob | Blob | Technical term |
| Shard / Sharding | Shard / Sharding | Technical term (or "fragmentacion" with explanation) |

### Terms That SHOULD Be Translated

| English | Spanish | Notes |
|---------|---------|-------|
| wallet | billetera / cartera | Both acceptable, be consistent within document |
| smart contract | contrato inteligente | |
| blockchain | cadena de bloques | Can also use "blockchain" if context is technical |
| proof-of-work | prueba de trabajo | |
| proof-of-stake | prueba de participacion | |
| validator | validador | |
| block | bloque | |
| transaction | transaccion | |
| account | cuenta | |
| address | direccion | |
| private key | clave privada | |
| public key | clave publica | |
| seed phrase | frase semilla / frase de recuperacion | |
| node | nodo | |
| consensus | consenso | |
| finality | finalidad | |
| attestation | atestacion | NOT "certificacion" |
| withdrawal | retiro | |
| deposit | deposito | |
| layer 2 | capa 2 | |
| bridge | puente | |
| oracle | oraculo | |
| governance | gobernanza | |
| treasury | tesoreria | |
| fee | tarifa / comision | |
| liquidity | liquidez | |
| collateral | colateral / garantia | |
| slashing | penalizacion / slashing | Can use either with context |
| epoch | epoca | |
| slot | ranura / slot | "Slot" acceptable in technical contexts |

### Debatable Terms (Choose Consistently)

These terms have multiple acceptable translations. Choose one and be consistent:

| English | Options | Recommendation |
|---------|---------|----------------|
| staking | staking / participacion | Use "staking" (widely adopted) |
| token | token | Keep as "token" |
| hash | hash | Keep as "hash" |
| fork | bifurcacion / fork | Use "bifurcacion" for concept, "fork" for specific events |
| mining | mineria | |
| miner | minero | |
| dapp | dapp / aplicacion descentralizada | Write out on first use, then "dapp" |
| DeFi | DeFi / finanzas descentralizadas | Write out on first use, then "DeFi" |
| airdrop | airdrop / lanzamiento aereo | "Airdrop" is more common |
| whitepaper | whitepaper / libro blanco | "Whitepaper" is more common in crypto |

### Formality: Use Usted (Formal)

Spanish translations should consistently use the formal "usted" form, not the informal "tu":

| Incorrect (Informal) | Correct (Formal) |
|---------------------|------------------|
| Recuerda que... | Recuerde que... |
| Tu billetera | Su billetera |
| Conecta tu wallet | Conecte su wallet |
| Obten mas informacion | Obtenga mas informacion |
| Asegurate de... | Asegurese de... |

### Regional Considerations

The site uses Latin American Spanish conventions:

| Spain Spanish | Latin American Spanish | Use |
|--------------|----------------------|-----|
| ordenador | computadora | computadora |
| movil | celular | celular |
| aplicacion | aplicacion | aplicacion |

### Common Translation Mistakes to Avoid

1. **Solidity as "Solidez"**
   - WRONG: "Escrito en Solidez"
   - CORRECT: "Escrito en Solidity"

2. **Alchemy as "Alquimia"**
   - WRONG: "Usar Alquimia para conectar"
   - CORRECT: "Usar Alchemy para conectar"

3. **Rollups as "Agrupaciones"**
   - WRONG: "Las Agrupaciones de capa 2"
   - CORRECT: "Los Rollups de capa 2"

4. **Mixing tu/usted**
   - WRONG: "Conecta su billetera y recuerda..."
   - CORRECT: "Conecte su billetera y recuerde..."

5. **Translating code/technical paths**
   - WRONG: `/desarrolladores/documentos/`
   - CORRECT: `/developers/docs/`

### Formatting Notes

1. **Numbers**: Use period for thousands, comma for decimals
   - English: 1,000.50
   - Spanish: 1.000,50

2. **Quotation marks**: Use angular quotes
   - English: "example"
   - Spanish: <<ejemplo>> or "ejemplo"

3. **Lists**: Capitalize first word, use period at end if complete sentence

---

## AI Translation Guidance

When using AI translation tools (like Gemini, GPT, Claude), configure the following rules:

### Pre-translation Checklist

1. Mark proper nouns as "do not translate":
   - All programming language names
   - All company/product names
   - All protocol names
   - All upgrade/event names (Merge, Dencun, Pectra, etc.)

2. Set formality to "formal" (usted)

3. Set regional variant to "Latin American Spanish"

### Post-translation Review Checklist

- [ ] Verify proper nouns were NOT translated
- [ ] Check for duplicate headings (AI artifact)
- [ ] Verify markdown links have no space before URL
- [ ] Confirm consistent use of usted (formal)
- [ ] Check technical terms match glossary

---

## Contributing to This Glossary

If you identify inconsistencies or have suggestions:

1. Open an issue with the `translation` label
2. Reference the specific term and proposed change
3. Provide context for why the change improves consistency

This glossary should be reviewed quarterly and updated based on:
- Community feedback
- New terminology in the Ethereum ecosystem
- Common errors found in translation reviews
