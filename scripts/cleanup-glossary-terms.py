#!/usr/bin/env python3
"""
Cleanup pass on extracted glossary terms.

Filter principle: Include any term that carries Ethereum-specific meaning
OR that benefits from consistent translation across Ethereum content.
Exclude noise: proper names, product names, UI strings, phrases that
aren't terms.

Also: deduplicate, re-categorize, and split into
  - confirmed terms
  - manual review list
"""

import json
import re
from collections import defaultdict
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
INPUT_PATH = REPO_ROOT / "scripts" / "glossary-term-extraction.json"

# ---------------------------------------------------------------------------
# EXCLUSION LISTS
# ---------------------------------------------------------------------------

# Proper names of people -- not glossary terms
PEOPLE = {
    "vitalik buterin", "dankrad feist", "satoshi nakamoto", "piper merriam",
    "austin", "finematics", "gavin wood", "juan benet", "nick szabo",
}

# Product/brand names that don't need translation guidance
# (They stay as-is in all languages)
PRODUCTS_NO_TRANSLATION = {
    "visual studio code", "raspberry pi", "alchemy", "alchemy dashboard",
    "alchemy discord", "infura", "truffle", "create hardhat",
    "hardhat network", "sepolia faucet", "install ethers",
    "react query", "optimism goerli", "crust network", "all that node",
    "tether gold", "dune analytics", "rocket pool", "pool together",
    "review slither", "use slither", "run echidna",
    "gnosis pay", "gnosis safe", "matomo analytics", "microsoft learn",
    "hyperledger besu", "eigenlayer",
    "gdpr",  # legal term, not Ethereum-specific
}

# UI/website strings, not Ethereum terms
UI_NOISE = {
    "cookie policy", "privacy policy", "data protection", "related topics",
    "community forum", "development platform", "visual direction",
    "product ordering", "view your", "your wallet", "connect wallet",
    "send request", "translation memory", "translation program",
    "translation style guide", "academic grants", "tooling developers",
    "protocol developers", "bill total income", "view key",
    "create app", "watch austin", "watch finematics",
    "connecting delphi", "block explorers",
    "first smart contract", "understanding smart contracts",
    "deploy solidity", "alice nonce", "alice transaction",
    "bill nonce", "bill transaction", "gas network",
    "blockchain explained",
    "smart contracts",  # plural of an existing entry
    "ethereum governance",  # just a page title
    "enshrined proposer",  # too niche / still theoretical
    # Sentence fragments / tutorial phrases
    "if alice", "if bob", "like bitcoin", "hello world",
    "learn how", "further reading", "getting started",
    "no action required", "level access lists",
    "interactive argument", "knowledge succinct non",
    "execution clients",  # plural of existing
    "contract creation",  # subset of existing
    "token standard",  # generic phrase
    "fungible tokens",  # plural
    "token contract",  # generic
    "query language",  # general CS
    "file system",  # general CS
    "ecosystem support program",  # org name
    "muir glacier",  # historical fork, very niche
    "spurious dragon",  # historical fork, very niche
    "deterministic factory predeploy",  # too niche
    "pectra upgrade",  # redundant with pectra
    "london upgrade",  # redundant with london
    "merge ethereum",  # fragment
}

# Phrases that are just "X Ethereum" or "Ethereum X" fragments
ETHEREUM_FRAGMENTS = {
    "how ethereum", "many ethereum", "since ethereum", "when ethereum",
    "while ethereum", "with ethereum", "use ethereum", "using ethereum",
    "merge ethereum", "mainnet ethereum", "ethereum layer",
    "upgrading ethereum", "mastering ethereum",
}

# General tech acronyms that are NOT Ethereum-specific
# and appear in standard dictionaries/glossaries
GENERAL_TECH_ACRONYMS = {
    "arm", "aws", "os", "ui", "ux", "pr", "vs", "tb", "db",
    "vm",  # too generic alone -- but "EVM" is kept
    "post", "push", "apply", "data", "cl", "sp",
    "tls", "wss", "saml", "aes", "wasm",
    "bat",  # browser token, but too ambiguous
    "tm", "vb", "jsx", "npm", "ipc", "ndi", "mud", "net",
    "must", "eur", "eql", "sqd",
    "esp",  # Ecosystem Support Program acronym
}

# Terms that are real but too generic without Ethereum context
# These go to "maybe" list
MAYBE_TERMS = {
    "activation", "allowance", "approve", "auction", "borrowing",
    "chain", "confirmation", "confirmed", "constructor", "contract",
    "crypto", "custodial", "deploy", "deployment", "exit",
    "lending", "overflow", "privacy", "randomness", "receipt",
    "require", "revert", "royalty", "slippage", "solver",
    "strategy", "tip", "transfer", "underflow", "vault",
    "withdrawal", "yield",
    # Ambiguous or very niche
    "log", "event", "metadata", "marketplace", "mixer",
    "ibft", "mpc", "formal verification",
    "maci",  # specific project
    "enr",  # Ethereum Node Records -- niche protocol detail
    "ffg",  # subset of Casper FFG (which is included)
    "lmd",  # subset of LMD-GHOST (which is included)
    "ghost",  # subset of LMD-GHOST
    "spv",  # Bitcoin concept mainly
}

# ---------------------------------------------------------------------------
# DEDUPLICATION MAP
# Canonical form -> aliases that should merge into it
# ---------------------------------------------------------------------------

DEDUP_MAP = {
    "account": ["account"],
    "address": ["address"],
    "externally owned account (eoa)": [
        "externally owned account", "eoa",
        "externally owned account (eoa)",
    ],
    "smart contract": ["smart contract", "smart contracts"],
    "ethereum virtual machine (evm)": [
        "ethereum virtual machine", "evm",
        "ethereum virtual machine (evm)",
    ],
    "ethereum name service (ens)": [
        "ethereum name service", "ens",
        "ethereum name service (ens)",
    ],
    "decentralized autonomous organization (dao)": [
        "decentralized autonomous organization", "dao",
        "decentralized autonomous organization (dao)",
    ],
    "decentralized exchange (dex)": [
        "decentralized exchange", "dex",
        "decentralized exchange (dex)",
    ],
    "non-fungible token (nft)": [
        "non-fungible token", "nft",
        "non-fungible token (nft)",
    ],
    "ethereum improvement proposal (eip)": [
        "ethereum improvement proposal", "eip",
        "ethereum improvement proposal (eip)",
        "ethereum improvement proposals",
    ],
    "ethereum request for comments (erc)": [
        "ethereum request for comments", "erc",
        "ethereum request for comments (erc)",
    ],
    "maximal extractable value (mev)": [
        "maximal extractable value", "mev",
        "maximal extractable value (mev)",
        "miner extractable value",
    ],
    "application binary interface (abi)": [
        "application binary interface", "abi",
        "application binary interface (abi)",
    ],
    "elliptic curve digital signature algorithm (ecdsa)": [
        "elliptic curve digital signature algorithm", "ecdsa",
        "elliptic curve digital signature algorithm (ecdsa)",
    ],
    "decentralized finance (defi)": [
        "decentralized finance", "defi",
    ],
    "decentralized application (dapp)": [
        "decentralized application", "dapp",
    ],
    "proof-of-stake (pos)": [
        "proof-of-stake", "proof of stake", "pos",
        "proof-of-stake (pos)",
    ],
    "proof-of-work (pow)": [
        "proof-of-work", "proof of work", "pow",
        "proof-of-work (pow)",
    ],
    "automated market maker (amm)": [
        "automated market maker", "amm",
    ],
    "distributed validator technology (dvt)": [
        "distributed validator technology", "dvt",
    ],
    "zero-knowledge proof": [
        "zero-knowledge proof", "zkp",
    ],
    "zero-knowledge rollup": [
        "zero-knowledge rollup", "zk rollup",
    ],
    "total value locked (tvl)": [
        "total value locked", "tvl",
    ],
    "layer 1 (l1)": [
        "layer 1", "l1",
    ],
    "layer 2 (l2)": [
        "layer 2", "l2",
    ],
    "proposer-builder separation (pbs)": [
        "proposer-builder separation", "pbs",
    ],
    "decentralized identity (did)": [
        "decentralized identity", "did",
    ],
    "recursive length prefix (rlp)": [
        "recursive length prefix", "rlp",
        "recursive length prefix (rlp)",
    ],
    "soulbound token (sbt)": [
        "soulbound token", "sbt",
    ],
    "real world assets (rwa)": [
        "real world assets", "rwa",
    ],
    "decentralized science (desci)": [
        "decentralized science", "desci",
    ],
    "regenerative finance (refi)": [
        "regenerative finance", "refi",
    ],
    "decentralized physical infrastructure (depin)": [
        "decentralized physical infrastructure", "depin",
    ],
    "retroactive public goods funding (rpgf)": [
        "retroactive public goods funding", "rpgf",
    ],
    "liquid staking token (lst)": [
        "liquid staking token", "lst",
        "liquid staking derivative", "lsd",
        "liquid staking tokens",
    ],
    "merkle patricia trie": [
        "merkle patricia trie", "merkle patricia tree (mpt)",
        "merkle patricia",
    ],
    "wrapped ether (weth)": [
        "wrapped ether", "weth",
    ],
    "seed phrase": [
        "seed phrase", "recovery phrase", "mnemonic",
        "seed phrase/recovery phrase",
    ],
    "json-rpc": [
        "json-rpc", "rpc",
        "remote procedure call (rpc)",
    ],
    "keccak-256": [
        "keccak-256", "sha-3",
    ],
    "fork choice algorithm": [
        "fork choice algorithm", "fork choice",
    ],
    "the merge": [
        "the merge", "merge",
    ],
    "casper ffg": [
        "casper ffg", "friendly finality gadget",
    ],
    "ethereum classic": ["ethereum classic"],
    "ethereum foundation": ["ethereum foundation"],
    "ethereum mainnet": ["ethereum mainnet"],
    "go ethereum (geth)": ["go ethereum", "geth"],
    "eth": ["eth"],
    "ether": ["ether"],
    "stablecoin": ["stablecoin"],
    "fungible token": ["fungible token", "fungible tokens"],
    "verifiable credential": ["verifiable credential", "verifiable credentials"],
    "london upgrade": ["london upgrade", "london"],
    "pectra upgrade": ["pectra upgrade", "pectra"],
    "dencun upgrade": ["dencun"],
    "builder separation": ["builder separation"],
}

# ---------------------------------------------------------------------------
# RE-CATEGORIZATION
# Terms that ended up in wrong category
# ---------------------------------------------------------------------------

RECATEGORIZE = {
    "blob": "scaling",
    "blobspace": "scaling",
    "withdrawal": "consensus",
    "exit": "consensus",
    "activation": "consensus",
    "shanghai": "protocol-upgrades",
    "the merge": "protocol-upgrades",
    "merge": "protocol-upgrades",
    "ethereum classic": "general",
    "ethereum foundation": "general",
    "ethereum mainnet": "general",
    "restaking": "consensus",
    "client": "general",
    "software": "general",
    "execution": "general",
    "state": "smart-contracts",
    "randomness": "cryptography",
    "eip-4844": "scaling",
    "spurious dragon": "protocol-upgrades",
    "ssz": "development",
    "ssle": "consensus",
    "siwe": "identity",
    "utxo": "general",
    "wbtc": "tokens",
    "usdc": "tokens",
    "dai": "tokens",
    "quadratic funding": "governance",
    "public good": "governance",
    "airdrop": "tokens",
    "tokenization": "tokens",
    "composable": "smart-contracts",
    "composability": "smart-contracts",
    "interoperability": "scaling",
    "self-custody": "accounts-keys",
    "non-custodial": "accounts-keys",
    "custodial": "accounts-keys",
    "on-chain": "general",
    "off-chain": "general",
    "onchain": "general",
    "offchain": "general",
    "whitepaper": "general",
    "yellow paper": "general",
    "trustless": "general",
    "permissionless": "general",
    "censorship resistant": "general",
    "immutable": "smart-contracts",
    "immutability": "smart-contracts",
    "account abstraction": "accounts-keys",
    "erc-4337": "accounts-keys",
    "paymaster": "accounts-keys",
    "bundler": "accounts-keys",
    "useroperation": "accounts-keys",
    "social recovery": "accounts-keys",
    "guardian": "accounts-keys",
    "prediction market": "defi",
    "price feed": "defi",
    "ai agent": "general",
    "autonomous agent": "general",
    "verkle trees": "protocol-upgrades",
    # Round 2 recategorizations
    "automated market maker (amm)": "defi",
    "beacon node": "consensus",
    "effective balance": "consensus",
    "justified": "consensus",
    "equivocation": "consensus",
    "issuance": "consensus",
    "supermajority": "consensus",
    "da": "scaling",
    "da layer": "scaling",
    "dac": "scaling",
    "das": "scaling",
    "validity proof": "scaling",
    "validium": "scaling",
    "require": "smart-contracts",
    "revert": "smart-contracts",
    "overflow": "smart-contracts",
    "sstore": "smart-contracts",
    "singleton": "smart-contracts",
    "library": "smart-contracts",
    "event": "smart-contracts",
    "events": "smart-contracts",
    "log": "smart-contracts",
    "kzg": "cryptography",
    "bls": "cryptography",
    "ecc": "cryptography",
    "tee": "cryptography",
    "kyc": "identity",
    "intent": "transactions",
    "solver": "transactions",
    "strategy": "defi",
    "approve": "tokens",
    "allowance": "tokens",
    "transfer": "tokens",
}

# ---------------------------------------------------------------------------
# COMMON-WORD ETHEREUM TERMS
# Regular English words that carry specific Ethereum meaning
# and benefit from consistent translation guidance
# ---------------------------------------------------------------------------

COMMON_WORDS_WITH_ETH_MEANING = {
    "block", "chain", "state", "gas", "slot", "epoch", "node",
    "client", "receipt", "oracle", "bridge", "fork", "vault",
    "mint", "burn", "stake", "swap", "pool", "whale",
    "finality", "execution", "consensus", "sequencer", "prover",
    "verifier", "proposer", "builder", "searcher", "solver",
    "blob", "shard", "peer", "testnet", "mainnet", "devnet",
    "token", "wallet", "contract", "deploy", "revert",
    "nonce", "hash", "withdrawal", "exit", "activation",
    "slashing", "attestation", "committee",
    "collateral", "liquidation", "lending", "borrowing",
    "staking", "validator", "miner", "mining",
    "governance", "proposal", "delegate", "delegation",
    "privacy", "transfer", "approval", "allowance",
    "tip", "mempool", "rollup", "layer",
}


def should_exclude(term_key: str, term_data: dict) -> str | None:
    """
    Returns exclusion reason or None if term should be kept.
    """
    t = term_key.lower().strip()

    # Check explicit exclusion lists
    for person in PEOPLE:
        if person in t:
            return "person_name"

    for product in PRODUCTS_NO_TRANSLATION:
        if t == product:
            return "product_name"

    for noise in UI_NOISE:
        if t == noise:
            return "ui_noise"

    for frag in ETHEREUM_FRAGMENTS:
        if t == frag:
            return "ethereum_fragment"

    for acr in GENERAL_TECH_ACRONYMS:
        if t == acr:
            return "general_tech"

    # Short acronyms (2 chars) that aren't known Ethereum terms
    known_short_acronyms = {
        "zk", "l1", "l2", "da", "tx",
    }
    if len(t) <= 2 and t not in known_short_acronyms:
        return "short_acronym"

    # Ethereum Cat Herders, Ethereum Magicians -- org names
    org_patterns = [
        "ethereum cat herder", "ethereum magicians",
        "ethereum node records", "ethereum whitepaper",
        "ethereum yellowpaper", "ethereum yellow paper",
        "robust incentives group", "portal network",
        "ultrasound money", "world wide web",
        "common reference string",  # math term not eth-specific
        "united states",
        "dagger hashimoto",  # deprecated, historical only
        "the graph",  # product name
        "deploy solidity",  # tutorial fragment
    ]
    for org in org_patterns:
        if t == org or t == org + "s":
            return "org_or_proper_name"

    return None


def should_maybe(term_key: str, term_data: dict) -> bool:
    """
    Returns True if term should go to manual review list.
    """
    t = term_key.lower().strip()

    # Terms in MAYBE_TERMS that don't have high content occurrences
    # AND aren't common words with known Ethereum meaning
    if t in MAYBE_TERMS and t not in COMMON_WORDS_WITH_ETH_MEANING:
        if term_data.get("content_occurrences", 0) < 20:
            return True

    return False


def find_canonical(term_key: str) -> str | None:
    """
    If this term is an alias in the dedup map, return the canonical form.
    Returns None if this IS the canonical form or not in the map.
    """
    t = term_key.lower().strip()
    for canonical, aliases in DEDUP_MAP.items():
        if t in [a.lower() for a in aliases] and t != canonical.lower():
            return canonical
    return None


def main():
    with open(INPUT_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    raw_terms = data["terms"]
    term_families = data["term_families"]

    confirmed = {}
    maybe_review = {}
    excluded = {}
    merged_into = {}  # track what got deduped

    # Pass 1: Exclude obvious noise
    for term_key, term_data in raw_terms.items():
        reason = should_exclude(term_key, term_data)
        if reason:
            excluded[term_key] = {
                "reason": reason,
                "term": term_data.get("term", term_key),
            }
            continue

        # Check if this should merge into a canonical form
        canonical = find_canonical(term_key)
        if canonical:
            merged_into[term_key] = canonical
            # Accumulate content occurrences into canonical
            if canonical.lower() not in raw_terms:
                # The canonical might not exist yet as a key
                pass
            continue

        # Check if it's a maybe
        if should_maybe(term_key, term_data):
            maybe_review[term_key] = term_data
            continue

        # It's confirmed
        confirmed[term_key] = term_data

    # Pass 2: Re-categorize
    for term_key, term_data in confirmed.items():
        t = term_key.lower()
        if t in RECATEGORIZE:
            term_data["category"] = RECATEGORIZE[t]

    for term_key, term_data in maybe_review.items():
        t = term_key.lower()
        if t in RECATEGORIZE:
            term_data["category"] = RECATEGORIZE[t]

    # Pass 3: Ensure canonical forms from dedup map exist
    for canonical, aliases in DEDUP_MAP.items():
        canonical_lower = canonical.lower()
        if canonical_lower not in confirmed and canonical_lower not in maybe_review:
            # Find best data from aliases
            best_data = None
            for alias in aliases:
                alias_lower = alias.lower()
                if alias_lower in raw_terms:
                    candidate = raw_terms[alias_lower]
                    if best_data is None or (
                        candidate.get("definition", "") and not best_data.get("definition", "")
                    ):
                        best_data = dict(candidate)
                    elif not best_data.get("definition", ""):
                        # Merge content occurrences
                        best_data["content_occurrences"] = max(
                            best_data.get("content_occurrences", 0),
                            candidate.get("content_occurrences", 0),
                        )

            if best_data:
                best_data["term"] = canonical
                best_data["id"] = re.sub(r'[^a-z0-9]+', '-', canonical_lower).strip('-')
                best_data["aliases"] = [a for a in aliases if a.lower() != canonical_lower]

                # Re-categorize if needed
                if canonical_lower in RECATEGORIZE:
                    best_data["category"] = RECATEGORIZE[canonical_lower]

                # Check exclusion on canonical
                reason = should_exclude(canonical_lower, best_data)
                if not reason:
                    confirmed[canonical_lower] = best_data

    # Pass 4: Remove terms that were merged into canonicals
    for merged_key in merged_into:
        confirmed.pop(merged_key, None)
        maybe_review.pop(merged_key, None)

    # Pass 5: Add merged occurrence counts to canonicals
    for merged_key, canonical in merged_into.items():
        canonical_lower = canonical.lower()
        if canonical_lower in confirmed and merged_key in raw_terms:
            confirmed[canonical_lower]["content_occurrences"] = max(
                confirmed[canonical_lower].get("content_occurrences", 0),
                raw_terms[merged_key].get("content_occurrences", 0),
            )

    # Pass 6: Sort by category then term
    confirmed = dict(sorted(
        confirmed.items(),
        key=lambda x: (x[1].get("category", "zzz"), x[0])
    ))
    maybe_review = dict(sorted(
        maybe_review.items(),
        key=lambda x: (x[1].get("category", "zzz"), x[0])
    ))

    # Count categories
    cat_counts = defaultdict(int)
    for t in confirmed.values():
        cat_counts[t.get("category", "general")] += 1

    # Build output
    output = {
        "metadata": {
            "generated": "2026-03-26",
            "total_confirmed": len(confirmed),
            "total_maybe": len(maybe_review),
            "total_excluded": len(excluded),
            "total_merged": len(merged_into),
            "categories": dict(sorted(cat_counts.items())),
            "term_families": len(term_families),
        },
        "confirmed_terms": confirmed,
        "manual_review": maybe_review,
        "excluded": excluded,
        "merged_aliases": merged_into,
        "term_families": term_families,
    }

    # Write JSON
    output_path = REPO_ROOT / "scripts" / "glossary-terms-cleaned.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"Written: {output_path}")

    # Write human-readable summary
    summary_path = REPO_ROOT / "scripts" / "glossary-terms-cleaned.md"
    with open(summary_path, "w", encoding="utf-8") as f:
        f.write("# Ethereum Translation Glossary - Cleaned Term List\n\n")
        f.write(f"**Generated:** 2026-03-26\n\n")

        f.write("## Summary\n\n")
        f.write("| Metric | Count |\n")
        f.write("|--------|-------|\n")
        f.write(f"| Confirmed terms | {len(confirmed)} |\n")
        f.write(f"| Needs manual review | {len(maybe_review)} |\n")
        f.write(f"| Excluded (noise) | {len(excluded)} |\n")
        f.write(f"| Merged (deduped) | {len(merged_into)} |\n")
        f.write(f"| Term families | {len(term_families)} |\n\n")

        f.write("## Categories\n\n")
        f.write("| Category | Count |\n")
        f.write("|----------|-------|\n")
        for cat, count in sorted(cat_counts.items()):
            f.write(f"| {cat} | {count} |\n")

        f.write("\n---\n\n")
        f.write("## Confirmed Terms\n\n")
        f.write("These terms are confirmed for inclusion in the translation glossary.\n\n")

        current_cat = None
        for term_key, term_data in confirmed.items():
            cat = term_data.get("category", "general")
            if cat != current_cat:
                current_cat = cat
                f.write(f"\n### {cat.replace('-', ' ').title()}\n\n")
                f.write("| # | Term | In Glossary | Content Hits | Has Definition | Family | Aliases |\n")
                f.write("|---|------|------------|-------------|----------------|--------|--------|\n")
                row_num = 0

            row_num += 1
            family = term_data.get("term_family", "-")
            aliases = ", ".join(term_data.get("aliases", [])) or "-"
            in_g = "Yes" if term_data.get("in_glossary") else "No"
            has_def = "Yes" if term_data.get("definition") else "No"
            hits = term_data.get("content_occurrences", 0)

            f.write(
                f"| {row_num} | **{term_data.get('term', term_key)}** "
                f"| {in_g} | {hits} | {has_def} | {family} | {aliases} |\n"
            )

        f.write("\n---\n\n")
        f.write("## Manual Review Needed\n\n")
        f.write("These terms are common English words that *may* benefit from\n")
        f.write("Ethereum-specific translation guidance. Include if the Ethereum\n")
        f.write("usage differs meaningfully from the everyday meaning.\n\n")

        f.write("| Term | Content Hits | Category | Reason |\n")
        f.write("|------|-------------|----------|--------|\n")
        for term_key, term_data in maybe_review.items():
            hits = term_data.get("content_occurrences", 0)
            cat = term_data.get("category", "general")
            f.write(
                f"| {term_data.get('term', term_key)} "
                f"| {hits} | {cat} | Common word, low content hits |\n"
            )

        f.write("\n---\n\n")
        f.write("## Excluded Terms\n\n")
        f.write("These were removed as noise.\n\n")
        f.write("| Term | Reason |\n")
        f.write("|------|--------|\n")
        for term_key, info in sorted(excluded.items()):
            reason_labels = {
                "person_name": "Person name",
                "product_name": "Product/brand (keep as-is)",
                "ui_noise": "UI/website string",
                "ethereum_fragment": "Sentence fragment",
                "general_tech": "General tech acronym",
                "short_acronym": "Ambiguous short acronym",
                "org_or_proper_name": "Org/proper name",
            }
            label = reason_labels.get(info["reason"], info["reason"])
            f.write(f"| {info['term']} | {label} |\n")

        f.write("\n---\n\n")
        f.write("## Term Families\n\n")
        f.write("Related terms that should be translated as coherent groups:\n\n")
        for family_root, members in sorted(term_families.items()):
            f.write(f"**{family_root}**: ")
            f.write(", ".join(sorted(members)))
            f.write("\n\n")

    print(f"Written: {summary_path}")

    print(f"\n{'='*60}")
    print(f"CLEANUP COMPLETE")
    print(f"  Confirmed:      {len(confirmed)}")
    print(f"  Manual review:  {len(maybe_review)}")
    print(f"  Excluded:       {len(excluded)}")
    print(f"  Merged/deduped: {len(merged_into)}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
