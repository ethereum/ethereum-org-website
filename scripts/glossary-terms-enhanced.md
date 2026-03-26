# Ethereum Translation Glossary - Enhanced Term List

**Generated:** 2026-03-26

Incorporates Gemini feedback: new terms, script rules,
morphological families, and translation notes.

## Summary

| Metric | Count |
|--------|-------|
| Total terms | 453 |
| New terms from Gemini | 38 |
| Terms with script rules | 34 |
| Terms with morph families | 36 |
| Terms with translation notes | 38 |
| Morphological families | 20 |

## Categories

| Category | Count |
|----------|-------|
| accounts-keys | 32 |
| consensus | 56 |
| cryptography | 26 |
| defi | 32 |
| development | 12 |
| ether | 9 |
| general | 114 |
| governance | 15 |
| identity | 5 |
| mev | 5 |
| protocol-upgrades | 14 |
| scaling | 39 |
| smart-contracts | 41 |
| tokens | 31 |
| transactions | 22 |

## New Terms Added (from Gemini)

| Term | Category | Translation Note |
|------|----------|------------------|
| batching | scaling | 'Stacking' or 'grouping' miss the technical efficiency aspect |
| call data | smart-contracts | 'Phone data' or 'shouting data' mistranslations in some languages |
| churn limit | consensus | Validator entry/exit queue rate; 'movement limit' or 'rotation limit' too vague |
| claim | tokens | Transitions from action (verb) to right (noun) to status (adjective); requires d |
| cliff | tokens | Literal 'geographical cliff' translations are very common and confusing |
| cold wallet | accounts-keys | Frequently translated literally as 'chilled'; loses technical context of offline |
| commitment | cryptography | Mathematical binding (e.g., KZG commitment); 'promise' or 'obligation' misses th |
| de-peg | defi | Must relate clearly to 'peg' translation |
| derivation path | accounts-keys | Often mistranslated as 'route' or 'way'; critical for wallet recovery guides |
| escape hatch | scaling | Literal translations sound like a physical emergency exit |
| fault proof | scaling | Needs standardization alongside existing 'fraud proof' entry |
| forced withdrawal | scaling | Must sound like a 'protocol right' not an 'aggressive act' |
| fractionalization | tokens | 'Breaking' or 'division' miss the 'creating fractions' meaning |
| gas optimization | smart-contracts | 'Making gas better' is a common mistranslation; means reducing costs |
| hardware wallet | accounts-keys | Often mistranslated as 'physical wallet' or 'cold wallet'; needs specific term t |
| hot wallet | accounts-keys | Frequently translated literally as 'warm'; loses technical context of internet c |
| inactivity leak | consensus | Gradual loss of stake, not a one-time penalty; must convey progressive nature |
| off-ramp | general | Must pair with 'on-ramp' translation |
| on-ramp | general | One of the hardest metaphors to translate; literal 'ramp' translations are confu |
| onboarding | general | Often translated as 'training' or 'hiring'; in crypto means user's first wallet/ |
| overcollateralization | defi | A mouthful in most languages; 'too much security' is common but wrong |
| passkey | accounts-keys | Newer WebAuthn standard; needs distinction from passwords and seed phrases |
| peg | defi | Highly idiomatic; translating as physical 'hook' or 'pin' is confusing in financ |
| permissioned | general | Must contrast clearly with 'permissionless'; pair should be standardized togethe |
| precompile | smart-contracts | Must avoid confusion with 'pre-compiled code' in general software development |
| price impact | defi | Distinct from slippage but often conflated in translations |
| re-org | consensus | 'Rearrangement' doesn't capture the removal of blocks; aliases: chain reorganiza |
| reentrancy guard | smart-contracts | Often translated as 're-entry shield'; needs precise security term |
| self-destruct | smart-contracts | Old term was 'suicide'; needs standard 'delete/remove' framing |
| self-sovereignty | general | 'Independence' doesn't capture the ownership-of-identity/assets meaning |
| settlement | scaling | 'Payment' or 'agreement' miss the finality meaning; L2-specific context |
| slippage | defi | One of the most inconsistently translated terms; 'sliding' or 'deviation' common |
| state bloat | general | 'Bloat' translated as 'swelling' or 'illness' in many languages |
| statelessness | general | Must not imply 'no status' or 'no country' |
| throughput | scaling | 'Performance' or 'yield' too broad; must convey transactions-per-second specific |
| trust-minimized | general | More precise than 'trustless'; 'low trust' sounds like a negative attribute |
| trusted setup | cryptography | One-time initialization phase (e.g., KZG ceremony); needs consistent term |
| vesting | tokens | Often translated as 'clothing' (from Latin root) or 'investment' |

## Script Decision Rules

For non-Latin script languages (Arabic, Urdu, Bengali, Hindi, etc.):

| Rule | Description | Count |
|------|------------|-------|
| A_always_latin | Always keep Latin script | 9 |
| B_always_translate | Always translate/transliterate to native script | 18 |
| C_context_dependent | Latin in tags/headers, native in prose | 6 |
| D_hybrid | Latin acronym + native full name | 1 |
| unassigned | No rule assigned yet | 419 |

## Morphological Families

### attest
**Forms:** attest(v), attestation(n), attester, attested(adj)

**Translation challenge:** Ethereum 'attestation' is a specific object; general verb confuses with legal witnessing

### bridge
**Forms:** bridge(n), bridge(v), bridging, bridged, cross-bridge

**Translation challenge:** Physical bridge noun vs functional/computing verb; HU/FI agglutinative suffixes change

### build
**Forms:** build(v), builder, building, block building

**Translation challenge:** 'Block builder' is specialized MEV role; 'constructing' vs 'software building' differ

### burn
**Forms:** burn(v), burning, burnt/burned(adj), burn(n), burn rate

**Translation challenge:** Literal 'fire' vs 'permanent removal from circulation'

### chain
**Forms:** chain(n), on-chain(adj), off-chain(adj), sidechain, multichain

**Translation challenge:** Prefixes 'on-'/'off-' become complex prepositional phrases in TR/HU

### claim
**Forms:** claim(n), claim(v), claiming, claimable(adj)

**Translation challenge:** Action(v) to right(n) to status(adj); each needs specific phrasing in Asian languages

### finalize
**Forms:** finalize(v), finality(n), finalized(adj)

**Translation challenge:** 'Finality' is chain property; 'finalized' is block state; must distinguish from 'finishing'

### fork
**Forms:** fork(n), fork(v), forking, hard fork, soft fork

**Translation challenge:** Often loanword as noun but translated as 'divergence' as verb in RU/PL

### hash
**Forms:** hash(n), hash(v), hashing, hashed(adj), hash rate

**Translation challenge:** Usually loanword noun; verb often 'calculate the checksum' in formal docs

### mint
**Forms:** mint(v), minting, minted(adj), minter, premint

**Translation challenge:** Lacks direct financial equivalent in non-Western languages

### propose
**Forms:** propose(v), proposal(n), proposer, proposed(adj)

**Translation challenge:** 'Block proposer' translates differently than general 'to propose an idea'

### sign
**Forms:** sign(v), signature(n), signed(adj), signer, multisig, co-sign

**Translation challenge:** Romance languages require gender agreement for signed/signature

### slash
**Forms:** slash(v), slashing(n/gerund), slashed(adj)

**Translation challenge:** Metaphorical penalty; action vs state require different idioms in TH/HI

### stake
**Forms:** stake(n), stake(v), staking, staked(adj), staker, unstake, restake, proof-of-stake

**Translation challenge:** Arabic: verbal noun vs agent noun use distinct patterns. JP/KO: noun is loanword, verb needs native helper

### swap
**Forms:** swap(n), swap(v), swapping, swapper

**Translation challenge:** DE/NL: noun (Tausch) and verb (tauschen) differ; DeFi context needs technical synonyms

### sync
**Forms:** sync(v), synchronization(n), syncing, out-of-sync(adj)

**Translation challenge:** Long formal word for noun vs short English-derived slang for verb/action

### validate
**Forms:** validate(v), validation(n), validator, valid(adj), validity, invalidated

**Translation challenge:** CN/VI: technical 'validation' vs 'validator' role uses different semantic registers

### verify
**Forms:** verify(v), verification(n), verifier, verified(adj), verifiable

**Translation challenge:** ZK contexts distinguish heavily between prover and verifier; must be non-interchangeable

### vote
**Forms:** vote(n), vote(v), voting, voter

**Translation challenge:** Governance: 'ballot'(n) vs 'act of voting'(v) use different stems in Finno-Ugric

### withdraw
**Forms:** withdraw(v), withdrawal(n), withdrawing, withdrawn(adj)

**Translation challenge:** Action vs resulting transaction are grammatically distinct in Arabic

