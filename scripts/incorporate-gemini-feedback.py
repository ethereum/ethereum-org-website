#!/usr/bin/env python3
"""
Incorporate Gemini's feedback into the cleaned glossary term list.

Adds:
1. 45 missing terms from Round 1
2. Script decision metadata (Category A/B/C/D) from Round 3
3. Morphological form annotations from Round 4
4. Context-dependent translation notes from Round 2
"""

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
INPUT_PATH = REPO_ROOT / "scripts" / "glossary-terms-cleaned.json"
OUTPUT_PATH = REPO_ROOT / "scripts" / "glossary-terms-enhanced.json"
SUMMARY_PATH = REPO_ROOT / "scripts" / "glossary-terms-enhanced.md"

# -------------------------------------------------------------------------
# NEW TERMS FROM GEMINI ROUND 1
# -------------------------------------------------------------------------

GEMINI_NEW_TERMS = {
    # accounts-keys
    "hardware wallet": {
        "category": "accounts-keys",
        "definition": "",
        "translation_note": "Often mistranslated as 'physical wallet' or 'cold wallet'; needs specific term to distinguish from software-based security",
    },
    "hot wallet": {
        "category": "accounts-keys",
        "definition": "",
        "translation_note": "Frequently translated literally as 'warm'; loses technical context of internet connectivity",
    },
    "cold wallet": {
        "category": "accounts-keys",
        "definition": "",
        "translation_note": "Frequently translated literally as 'chilled'; loses technical context of offline storage",
    },
    "derivation path": {
        "category": "accounts-keys",
        "definition": "",
        "translation_note": "Often mistranslated as 'route' or 'way'; critical for wallet recovery guides",
    },
    "passkey": {
        "category": "accounts-keys",
        "definition": "",
        "translation_note": "Newer WebAuthn standard; needs distinction from passwords and seed phrases",
    },
    # consensus
    "inactivity leak": {
        "category": "consensus",
        "definition": "",
        "translation_note": "Gradual loss of stake, not a one-time penalty; must convey progressive nature",
    },
    "churn limit": {
        "category": "consensus",
        "definition": "",
        "translation_note": "Validator entry/exit queue rate; 'movement limit' or 'rotation limit' too vague",
    },
    "re-org": {
        "category": "consensus",
        "definition": "Chain reorganization -- when the canonical chain changes and previously included blocks are removed",
        "translation_note": "'Rearrangement' doesn't capture the removal of blocks; aliases: chain reorganization, reorg",
    },
    # cryptography
    "trusted setup": {
        "category": "cryptography",
        "definition": "",
        "translation_note": "One-time initialization phase (e.g., KZG ceremony); needs consistent term",
    },
    "commitment": {
        "category": "cryptography",
        "definition": "",
        "translation_note": "Mathematical binding (e.g., KZG commitment); 'promise' or 'obligation' misses the cryptographic meaning",
    },
    "precompile": {
        "category": "smart-contracts",
        "definition": "Specialized contract built into the EVM at a fixed address",
        "translation_note": "Must avoid confusion with 'pre-compiled code' in general software development",
    },
    # defi
    "slippage": {
        "category": "defi",
        "definition": "",
        "translation_note": "One of the most inconsistently translated terms; 'sliding' or 'deviation' common but wrong",
    },
    "price impact": {
        "category": "defi",
        "definition": "",
        "translation_note": "Distinct from slippage but often conflated in translations",
    },
    "peg": {
        "category": "defi",
        "definition": "A fixed exchange rate between a token and a reference asset (e.g., 1 USDC = 1 USD)",
        "translation_note": "Highly idiomatic; translating as physical 'hook' or 'pin' is confusing in financial context",
    },
    "de-peg": {
        "category": "defi",
        "definition": "When a stablecoin loses its fixed exchange rate to its reference asset",
        "translation_note": "Must relate clearly to 'peg' translation",
    },
    "overcollateralization": {
        "category": "defi",
        "definition": "",
        "translation_note": "A mouthful in most languages; 'too much security' is common but wrong",
    },
    # general/ecosystem
    "on-ramp": {
        "category": "general",
        "definition": "A service that converts fiat currency to cryptocurrency",
        "translation_note": "One of the hardest metaphors to translate; literal 'ramp' translations are confusing",
    },
    "off-ramp": {
        "category": "general",
        "definition": "A service that converts cryptocurrency to fiat currency",
        "translation_note": "Must pair with 'on-ramp' translation",
    },
    "onboarding": {
        "category": "general",
        "definition": "",
        "translation_note": "Often translated as 'training' or 'hiring'; in crypto means user's first wallet/app interaction",
    },
    "self-sovereignty": {
        "category": "general",
        "definition": "",
        "translation_note": "'Independence' doesn't capture the ownership-of-identity/assets meaning",
    },
    "trust-minimized": {
        "category": "general",
        "definition": "",
        "translation_note": "More precise than 'trustless'; 'low trust' sounds like a negative attribute",
    },
    "state bloat": {
        "category": "general",
        "definition": "Growth of the Ethereum state database making it harder for nodes to store and process",
        "translation_note": "'Bloat' translated as 'swelling' or 'illness' in many languages",
    },
    "statelessness": {
        "category": "general",
        "definition": "A design goal where nodes don't need to store the full state to validate blocks",
        "translation_note": "Must not imply 'no status' or 'no country'",
    },
    "permissioned": {
        "category": "general",
        "definition": "",
        "translation_note": "Must contrast clearly with 'permissionless'; pair should be standardized together",
    },
    # scaling
    "throughput": {
        "category": "scaling",
        "definition": "The number of transactions a network can process per unit of time",
        "translation_note": "'Performance' or 'yield' too broad; must convey transactions-per-second specifically",
    },
    "settlement": {
        "category": "scaling",
        "definition": "The process by which L2 transactions achieve finality on L1",
        "translation_note": "'Payment' or 'agreement' miss the finality meaning; L2-specific context",
    },
    "batching": {
        "category": "scaling",
        "definition": "Grouping multiple L2 transactions together for submission to L1",
        "translation_note": "'Stacking' or 'grouping' miss the technical efficiency aspect",
    },
    "fault proof": {
        "category": "scaling",
        "definition": "Modern term for fraud proof used by optimistic rollups",
        "translation_note": "Needs standardization alongside existing 'fraud proof' entry",
    },
    "escape hatch": {
        "category": "scaling",
        "definition": "Mechanism allowing users to withdraw from an L2 if the sequencer fails",
        "translation_note": "Literal translations sound like a physical emergency exit",
    },
    "forced withdrawal": {
        "category": "scaling",
        "definition": "An L2-to-L1 withdrawal that bypasses the sequencer",
        "translation_note": "Must sound like a 'protocol right' not an 'aggressive act'",
    },
    # smart-contracts
    "reentrancy guard": {
        "category": "smart-contracts",
        "definition": "A mechanism to prevent reentrancy attacks in smart contracts",
        "translation_note": "Often translated as 're-entry shield'; needs precise security term",
    },
    "self-destruct": {
        "category": "smart-contracts",
        "definition": "An opcode that removes a contract from the blockchain",
        "translation_note": "Old term was 'suicide'; needs standard 'delete/remove' framing",
    },
    "call data": {
        "category": "smart-contracts",
        "definition": "Data sent along with a transaction to a smart contract",
        "translation_note": "'Phone data' or 'shouting data' mistranslations in some languages",
    },
    "gas optimization": {
        "category": "smart-contracts",
        "definition": "The practice of writing efficient smart contract code to minimize gas costs",
        "translation_note": "'Making gas better' is a common mistranslation; means reducing costs",
    },
    # tokens
    "vesting": {
        "category": "tokens",
        "definition": "A schedule by which tokens are gradually released to their owners over time",
        "translation_note": "Often translated as 'clothing' (from Latin root) or 'investment'",
    },
    "cliff": {
        "category": "tokens",
        "definition": "The initial period in a vesting schedule before any tokens are released",
        "translation_note": "Literal 'geographical cliff' translations are very common and confusing",
    },
    "fractionalization": {
        "category": "tokens",
        "definition": "Dividing a single NFT or asset into multiple smaller, tradeable units",
        "translation_note": "'Breaking' or 'division' miss the 'creating fractions' meaning",
    },
    # additional morphological terms from round 4
    "claim": {
        "category": "tokens",
        "definition": "The act of collecting tokens from an airdrop, reward, or vesting contract",
        "translation_note": "Transitions from action (verb) to right (noun) to status (adjective); requires distinct forms",
    },
}

# -------------------------------------------------------------------------
# SCRIPT DECISION METADATA (Round 3)
# -------------------------------------------------------------------------

# Category A: Always keep Latin
ALWAYS_LATIN = {
    "eth", "erc-20", "erc-721", "erc-1155", "web3", "gwei", "ipfs",
    "ens", "solidity", "defi", "wei", "weth", "nft", "dao",
}

# Category B: Always translate/transliterate
ALWAYS_TRANSLATE = {
    "ethereum", "blockchain", "wallet", "node", "validator", "address",
    "private key", "public key", "seed phrase", "mining", "smart contract",
    "token", "consensus", "decentralized", "governance", "liquidity",
    "bridge", "oracle", "mainnet",
}

# Category C: Context-dependent
CONTEXT_DEPENDENT_SCRIPT = {
    "nft", "dao", "dapp", "stablecoin", "rollup", "sharding",
    "yield farming", "hash", "beacon chain", "the merge",
}

# Category D: Hybrid (Latin acronym + native full name)
HYBRID_SCRIPT = {
    "evm", "pos", "pow", "layer 2", "l2", "zk-rollup",
    "optimistic rollup", "tvl", "eip", "mev", "dex",
}

# -------------------------------------------------------------------------
# MORPHOLOGICAL FAMILIES (Round 4)
# -------------------------------------------------------------------------

MORPH_FAMILIES = {
    "stake": {
        "forms": ["stake(n)", "stake(v)", "staking", "staked(adj)", "staker", "unstake", "restake", "proof-of-stake"],
        "note": "Arabic: verbal noun vs agent noun use distinct patterns. JP/KO: noun is loanword, verb needs native helper",
    },
    "sign": {
        "forms": ["sign(v)", "signature(n)", "signed(adj)", "signer", "multisig", "co-sign"],
        "note": "Romance languages require gender agreement for signed/signature",
    },
    "validate": {
        "forms": ["validate(v)", "validation(n)", "validator", "valid(adj)", "validity", "invalidated"],
        "note": "CN/VI: technical 'validation' vs 'validator' role uses different semantic registers",
    },
    "bridge": {
        "forms": ["bridge(n)", "bridge(v)", "bridging", "bridged", "cross-bridge"],
        "note": "Physical bridge noun vs functional/computing verb; HU/FI agglutinative suffixes change",
    },
    "mint": {
        "forms": ["mint(v)", "minting", "minted(adj)", "minter", "premint"],
        "note": "Lacks direct financial equivalent in non-Western languages",
    },
    "burn": {
        "forms": ["burn(v)", "burning", "burnt/burned(adj)", "burn(n)", "burn rate"],
        "note": "Literal 'fire' vs 'permanent removal from circulation'",
    },
    "swap": {
        "forms": ["swap(n)", "swap(v)", "swapping", "swapper"],
        "note": "DE/NL: noun (Tausch) and verb (tauschen) differ; DeFi context needs technical synonyms",
    },
    "fork": {
        "forms": ["fork(n)", "fork(v)", "forking", "hard fork", "soft fork"],
        "note": "Often loanword as noun but translated as 'divergence' as verb in RU/PL",
    },
    "vote": {
        "forms": ["vote(n)", "vote(v)", "voting", "voter"],
        "note": "Governance: 'ballot'(n) vs 'act of voting'(v) use different stems in Finno-Ugric",
    },
    "hash": {
        "forms": ["hash(n)", "hash(v)", "hashing", "hashed(adj)", "hash rate"],
        "note": "Usually loanword noun; verb often 'calculate the checksum' in formal docs",
    },
    "sync": {
        "forms": ["sync(v)", "synchronization(n)", "syncing", "out-of-sync(adj)"],
        "note": "Long formal word for noun vs short English-derived slang for verb/action",
    },
    "attest": {
        "forms": ["attest(v)", "attestation(n)", "attester", "attested(adj)"],
        "note": "Ethereum 'attestation' is a specific object; general verb confuses with legal witnessing",
    },
    "propose": {
        "forms": ["propose(v)", "proposal(n)", "proposer", "proposed(adj)"],
        "note": "'Block proposer' translates differently than general 'to propose an idea'",
    },
    "verify": {
        "forms": ["verify(v)", "verification(n)", "verifier", "verified(adj)", "verifiable"],
        "note": "ZK contexts distinguish heavily between prover and verifier; must be non-interchangeable",
    },
    "slash": {
        "forms": ["slash(v)", "slashing(n/gerund)", "slashed(adj)"],
        "note": "Metaphorical penalty; action vs state require different idioms in TH/HI",
    },
    "build": {
        "forms": ["build(v)", "builder", "building", "block building"],
        "note": "'Block builder' is specialized MEV role; 'constructing' vs 'software building' differ",
    },
    "withdraw": {
        "forms": ["withdraw(v)", "withdrawal(n)", "withdrawing", "withdrawn(adj)"],
        "note": "Action vs resulting transaction are grammatically distinct in Arabic",
    },
    "finalize": {
        "forms": ["finalize(v)", "finality(n)", "finalized(adj)"],
        "note": "'Finality' is chain property; 'finalized' is block state; must distinguish from 'finishing'",
    },
    "chain": {
        "forms": ["chain(n)", "on-chain(adj)", "off-chain(adj)", "sidechain", "multichain"],
        "note": "Prefixes 'on-'/'off-' become complex prepositional phrases in TR/HU",
    },
    "claim": {
        "forms": ["claim(n)", "claim(v)", "claiming", "claimable(adj)"],
        "note": "Action(v) to right(n) to status(adj); each needs specific phrasing in Asian languages",
    },
}


def main():
    with open(INPUT_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    confirmed = data["confirmed_terms"]
    families = data["term_families"]

    # 1. Add new terms from Gemini
    added = []
    for term_key, info in GEMINI_NEW_TERMS.items():
        normalized = term_key.lower()
        if normalized not in confirmed:
            confirmed[normalized] = {
                "id": normalized.replace(" ", "-").replace("(", "").replace(")", ""),
                "term": term_key,
                "category": info["category"],
                "definition": info.get("definition", ""),
                "has_tooltip": False,
                "in_glossary": False,
                "content_occurrences": 0,
                "content_files": 0,
                "intl_keys": 0,
                "sources": ["gemini"],
                "translation_note": info.get("translation_note", ""),
                "forms": {"base": term_key},
            }
            added.append(term_key)
        else:
            # Add translation_note to existing entry
            if info.get("translation_note"):
                confirmed[normalized]["translation_note"] = info["translation_note"]

    # 2. Add script decision metadata
    for term_key, term_data in confirmed.items():
        t = term_key.lower()
        if t in ALWAYS_LATIN:
            term_data["script_rule"] = "A_always_latin"
        elif t in ALWAYS_TRANSLATE:
            term_data["script_rule"] = "B_always_translate"
        elif t in CONTEXT_DEPENDENT_SCRIPT:
            term_data["script_rule"] = "C_context_dependent"
        elif t in HYBRID_SCRIPT:
            term_data["script_rule"] = "D_hybrid"
        # else: no explicit rule yet

    # 3. Add morphological family data
    for family_root, morph_data in MORPH_FAMILIES.items():
        for term_key, term_data in confirmed.items():
            t = term_key.lower()
            # Check if this term belongs to this morphological family
            for form in morph_data["forms"]:
                base_form = form.split("(")[0].strip()
                if t == base_form or t == family_root:
                    term_data["morph_family"] = family_root
                    term_data["morph_note"] = morph_data["note"]
                    break

    # 4. Update term families with new entries from morphological analysis
    for family_root, morph_data in MORPH_FAMILIES.items():
        if family_root not in families:
            families[family_root] = []
        for form in morph_data["forms"]:
            base_form = form.split("(")[0].strip()
            if base_form not in families[family_root]:
                families[family_root].append(base_form)
        families[family_root] = sorted(set(families[family_root]))

    # Re-sort
    confirmed = dict(sorted(
        confirmed.items(),
        key=lambda x: (x[1].get("category", "zzz"), x[0])
    ))

    # Count categories
    cat_counts = {}
    for t in confirmed.values():
        cat = t.get("category", "general")
        cat_counts[cat] = cat_counts.get(cat, 0) + 1

    # Build output
    output = {
        "metadata": {
            "generated": "2026-03-26",
            "total_confirmed": len(confirmed),
            "total_with_script_rule": sum(1 for t in confirmed.values() if "script_rule" in t),
            "total_with_morph_family": sum(1 for t in confirmed.values() if "morph_family" in t),
            "total_with_translation_note": sum(1 for t in confirmed.values() if t.get("translation_note")),
            "new_terms_from_gemini": len(added),
            "categories": dict(sorted(cat_counts.items())),
            "term_families": len(families),
        },
        "confirmed_terms": confirmed,
        "term_families": families,
        "morphological_families": MORPH_FAMILIES,
    }

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"Written: {OUTPUT_PATH}")

    # Write summary
    with open(SUMMARY_PATH, "w", encoding="utf-8") as f:
        f.write("# Ethereum Translation Glossary - Enhanced Term List\n\n")
        f.write(f"**Generated:** 2026-03-26\n\n")
        f.write("Incorporates Gemini feedback: new terms, script rules,\n")
        f.write("morphological families, and translation notes.\n\n")

        f.write("## Summary\n\n")
        f.write("| Metric | Count |\n")
        f.write("|--------|-------|\n")
        f.write(f"| Total terms | {len(confirmed)} |\n")
        f.write(f"| New terms from Gemini | {len(added)} |\n")
        f.write(f"| Terms with script rules | {output['metadata']['total_with_script_rule']} |\n")
        f.write(f"| Terms with morph families | {output['metadata']['total_with_morph_family']} |\n")
        f.write(f"| Terms with translation notes | {output['metadata']['total_with_translation_note']} |\n")
        f.write(f"| Morphological families | {len(MORPH_FAMILIES)} |\n\n")

        f.write("## Categories\n\n")
        f.write("| Category | Count |\n")
        f.write("|----------|-------|\n")
        for cat, count in sorted(cat_counts.items()):
            f.write(f"| {cat} | {count} |\n")

        f.write("\n## New Terms Added (from Gemini)\n\n")
        f.write("| Term | Category | Translation Note |\n")
        f.write("|------|----------|------------------|\n")
        for term in sorted(added):
            info = GEMINI_NEW_TERMS.get(term, {})
            cat = info.get("category", "?")
            note = info.get("translation_note", "")[:80]
            f.write(f"| {term} | {cat} | {note} |\n")

        f.write("\n## Script Decision Rules\n\n")
        f.write("For non-Latin script languages (Arabic, Urdu, Bengali, Hindi, etc.):\n\n")
        f.write("| Rule | Description | Count |\n")
        f.write("|------|------------|-------|\n")
        script_counts = {}
        for t in confirmed.values():
            r = t.get("script_rule", "unassigned")
            script_counts[r] = script_counts.get(r, 0) + 1
        for rule, count in sorted(script_counts.items()):
            labels = {
                "A_always_latin": "Always keep Latin script",
                "B_always_translate": "Always translate/transliterate to native script",
                "C_context_dependent": "Latin in tags/headers, native in prose",
                "D_hybrid": "Latin acronym + native full name",
                "unassigned": "No rule assigned yet",
            }
            f.write(f"| {rule} | {labels.get(rule, '?')} | {count} |\n")

        f.write("\n## Morphological Families\n\n")
        for family_root, morph_data in sorted(MORPH_FAMILIES.items()):
            f.write(f"### {family_root}\n")
            f.write(f"**Forms:** {', '.join(morph_data['forms'])}\n\n")
            f.write(f"**Translation challenge:** {morph_data['note']}\n\n")

    print(f"Written: {SUMMARY_PATH}")

    print(f"\n{'='*60}")
    print(f"ENHANCEMENT COMPLETE")
    print(f"  Total terms:          {len(confirmed)}")
    print(f"  New from Gemini:      {len(added)}")
    print(f"  With script rules:    {output['metadata']['total_with_script_rule']}")
    print(f"  With morph families:  {output['metadata']['total_with_morph_family']}")
    print(f"  With translation notes: {output['metadata']['total_with_translation_note']}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
