#!/usr/bin/env python3
"""
Extract Ethereum-specific terminology from ethereum.org content.

Crawls:
1. public/content/**/*.md (excluding translations)
2. src/intl/en/*.json
3. Existing glossary.json terms

Outputs a structured term list with categories and morphological variants.
"""

import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

# ---------------------------------------------------------------------------
# 1. Known Ethereum/crypto term seeds
#    These are terms we KNOW are Ethereum-specific, to help with extraction
#    and to catch things that might not appear in content verbatim.
# ---------------------------------------------------------------------------

SEED_TERMS = {
    # Core blockchain
    "blockchain", "block", "block explorer", "block header", "block reward",
    "block time", "block proposer", "block propagation", "block validation",
    "genesis block", "chain", "mainnet", "testnet", "devnet",
    "node", "full node", "light node", "archive node", "bootnode",
    "peer", "peer-to-peer", "gossip protocol",

    # Consensus
    "consensus", "consensus mechanism", "consensus client", "consensus layer",
    "proof of stake", "proof of work", "validator", "staking", "staker",
    "stake", "staked", "unstaking", "restaking", "liquid staking",
    "attestation", "epoch", "slot", "committee", "sync committee",
    "finality", "finalized", "justified", "checkpoint",
    "slashing", "slasher", "proposer", "builder",
    "beacon chain", "Casper FFG", "LMD-GHOST",
    "fork choice", "fork", "hard fork", "soft fork",
    "mining", "miner", "hash rate", "difficulty", "difficulty bomb",
    "merge", "the merge",

    # Accounts & keys
    "account", "address", "wallet", "externally owned account", "EOA",
    "contract account", "smart account", "account abstraction",
    "private key", "public key", "seed phrase", "recovery phrase",
    "mnemonic", "keystore", "signing", "signature", "digital signature",
    "multisig", "multi-signature",

    # Transactions
    "transaction", "transaction fee", "gas", "gas fee", "gas limit",
    "gas price", "base fee", "priority fee", "tip", "max fee",
    "nonce", "mempool", "transaction pool", "pending transaction",
    "confirmed", "confirmation", "receipt", "transaction hash",

    # Smart contracts & EVM
    "smart contract", "contract", "Solidity", "Vyper",
    "EVM", "Ethereum Virtual Machine", "bytecode", "opcode",
    "ABI", "application binary interface",
    "deploy", "deployment", "constructor", "fallback function",
    "event", "log", "revert", "require", "assert",
    "library", "proxy contract", "upgradeable contract",
    "reentrancy", "overflow", "underflow",

    # Ether & denominations
    "ether", "ETH", "wei", "gwei", "finney", "szabo",
    "wrapped ether", "WETH",

    # Token standards
    "token", "ERC-20", "ERC-721", "ERC-1155", "ERC-4626",
    "fungible token", "non-fungible token", "NFT",
    "mint", "minting", "burn", "burning",
    "transfer", "approve", "allowance",
    "stablecoin", "governance token", "utility token",

    # DeFi
    "DeFi", "decentralized finance",
    "DEX", "decentralized exchange", "AMM", "automated market maker",
    "liquidity", "liquidity pool", "liquidity provider", "LP token",
    "yield", "yield farming", "APR", "APY",
    "swap", "slippage", "impermanent loss",
    "lending", "borrowing", "collateral", "liquidation",
    "flash loan", "oracle", "price feed",
    "TVL", "total value locked",
    "vault", "strategy",

    # Layer 2 & scaling
    "layer 1", "layer 2", "L1", "L2",
    "rollup", "optimistic rollup", "zero-knowledge rollup", "ZK rollup",
    "ZK-SNARK", "ZK-STARK", "zero-knowledge proof",
    "validity proof", "fraud proof",
    "data availability", "blob", "blobspace",
    "proto-danksharding", "danksharding", "EIP-4844",
    "sidechain", "plasma", "state channel",
    "bridge", "cross-chain", "interoperability",
    "sequencer", "prover", "verifier",

    # DAOs & governance
    "DAO", "decentralized autonomous organization",
    "governance", "proposal", "vote", "voting",
    "quadratic voting", "delegation", "delegate",
    "treasury", "multisig",
    "on-chain governance", "off-chain governance",

    # Identity & privacy
    "decentralized identity", "DID", "verifiable credential",
    "zero-knowledge", "ZK", "privacy",
    "mixer", "anonymity set",
    "ENS", "Ethereum Name Service",

    # Development
    "dapp", "decentralized application",
    "Web3", "Web 3.0",
    "RPC", "JSON-RPC", "API",
    "Etherscan", "block explorer",
    "testnet faucet", "faucet",
    "Remix", "Hardhat", "Foundry", "Truffle",
    "Infura", "Alchemy",
    "IPFS", "Swarm",
    "The Graph", "subgraph",

    # Protocol upgrades & EIPs
    "EIP", "Ethereum Improvement Proposal",
    "ERC", "Ethereum Request for Comments",
    "Homestead", "Byzantium", "Constantinople", "Istanbul",
    "Berlin", "London", "Shanghai", "Cancun", "Dencun", "Pectra",
    "Frontier",

    # MEV
    "MEV", "maximal extractable value", "miner extractable value",
    "front-running", "back-running", "sandwich attack",
    "searcher", "block builder", "proposer-builder separation", "PBS",

    # Cryptography
    "hash", "hashing", "hash function",
    "Keccak-256", "SHA-3",
    "Merkle tree", "Merkle proof", "Merkle root",
    "ECDSA", "elliptic curve",
    "encryption", "decryption", "cryptography",
    "entropy", "randomness",

    # NFTs & collectibles
    "NFT", "non-fungible token", "collectible",
    "metadata", "token URI", "royalty",
    "marketplace", "auction",
    "soulbound token", "SBT",
    "POAP", "proof of attendance",

    # Staking specifics
    "solo staking", "pooled staking", "staking as a service",
    "staking pool", "staking deposit", "deposit contract",
    "withdrawal", "exit", "activation",
    "effective balance", "validator lifecycle",
    "liquid staking token", "LST", "liquid staking derivative", "LSD",
    "DVT", "distributed validator technology",

    # Newer concepts
    "account abstraction", "ERC-4337",
    "intent", "solver",
    "restaking", "EigenLayer",
    "data availability layer", "DA layer",
    "modular blockchain", "monolithic blockchain",
    "real world assets", "RWA", "tokenization",
    "decentralized science", "DeSci",
    "regenerative finance", "ReFi",
    "decentralized physical infrastructure", "DePIN",
    "AI agent", "autonomous agent",
    "prediction market",
    "social recovery", "guardian",
    "paymaster", "bundler", "UserOperation",

    # General crypto
    "cryptocurrency", "crypto", "digital asset",
    "decentralization", "decentralized",
    "trustless", "permissionless", "censorship resistant",
    "immutable", "immutability",
    "interoperable", "composable", "composability",
    "self-custody", "non-custodial", "custodial",
    "on-chain", "off-chain", "onchain", "offchain",
    "mainnet", "testnet",
    "whitepaper", "yellow paper",
    "public good", "public goods",
    "airdrop", "retroactive public goods funding", "RPGF",
    "quadratic funding",
}


def extract_existing_glossary_terms(repo_root: Path) -> dict:
    """Parse glossary.json to get existing term definitions."""
    glossary_path = repo_root / "src" / "intl" / "en" / "glossary.json"
    terms = {}
    with open(glossary_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    for key, value in data.items():
        if key.endswith("-term"):
            term_id = key[:-5]  # strip "-term"
            definition_key = f"{term_id}-definition"
            terms[term_id] = {
                "term": value,
                "definition": data.get(definition_key, ""),
                "source": "glossary.json",
            }
    return terms


def extract_tooltip_terms(repo_root: Path) -> set:
    """Get term IDs that have tooltip versions."""
    tooltip_path = repo_root / "src" / "intl" / "en" / "glossary-tooltip.json"
    tooltip_ids = set()
    with open(tooltip_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    for key in data:
        if key.endswith("-term"):
            tooltip_ids.add(key[:-5])
    return tooltip_ids


def extract_terms_from_markdown(repo_root: Path) -> dict:
    """
    Crawl public/content/**/*.md (excluding translations) for
    Ethereum-specific terminology.
    """
    content_dir = repo_root / "public" / "content"
    term_occurrences = defaultdict(lambda: {"count": 0, "files": set()})

    # Build regex patterns from seed terms (case-insensitive matching)
    # Sort by length descending so longer phrases match first
    sorted_seeds = sorted(SEED_TERMS, key=len, reverse=True)
    # Escape for regex and create pattern
    patterns = []
    for term in sorted_seeds:
        escaped = re.escape(term)
        patterns.append(escaped)

    combined_pattern = re.compile(
        r'\b(' + '|'.join(patterns) + r')(?:s|ing|ed|er|ers|tion|ment)?\b',
        re.IGNORECASE
    )

    md_files = list(content_dir.rglob("*.md"))
    # Exclude translations
    md_files = [
        f for f in md_files
        if "translations" not in str(f.relative_to(content_dir))
    ]

    for md_file in md_files:
        try:
            text = md_file.read_text(encoding="utf-8")
        except Exception:
            continue

        # Strip frontmatter
        if text.startswith("---"):
            end = text.find("---", 3)
            if end != -1:
                text = text[end + 3:]

        # Strip HTML/MDX tags for cleaner matching
        clean = re.sub(r'<[^>]+>', ' ', text)
        # Strip markdown links syntax but keep text
        clean = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', clean)
        # Strip code blocks
        clean = re.sub(r'```[\s\S]*?```', '', clean)
        clean = re.sub(r'`[^`]+`', '', clean)

        matches = combined_pattern.findall(clean)
        rel_path = str(md_file.relative_to(content_dir))

        for match in matches:
            normalized = match.lower().strip()
            term_occurrences[normalized]["count"] += 1
            term_occurrences[normalized]["files"].add(rel_path)

    # Convert sets to sorted lists for JSON serialization
    result = {}
    for term, data in term_occurrences.items():
        result[term] = {
            "count": data["count"],
            "files": sorted(data["files"]),
            "file_count": len(data["files"]),
        }
    return result


def extract_terms_from_intl(repo_root: Path) -> dict:
    """
    Parse src/intl/en/*.json for Ethereum-specific terms used in UI strings.
    """
    intl_dir = repo_root / "src" / "intl" / "en"
    found_terms = defaultdict(lambda: {"keys": [], "contexts": []})

    sorted_seeds = sorted(SEED_TERMS, key=len, reverse=True)
    patterns = [re.escape(t) for t in sorted_seeds]
    combined_pattern = re.compile(
        r'\b(' + '|'.join(patterns) + r')(?:s|ing|ed|er|ers)?\b',
        re.IGNORECASE
    )

    for json_file in intl_dir.glob("*.json"):
        if json_file.name in ("glossary.json", "glossary-tooltip.json"):
            continue  # Already handled separately

        try:
            with open(json_file, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            continue

        for key, value in data.items():
            if not isinstance(value, str):
                continue
            # Strip HTML
            clean = re.sub(r'<[^>]+>', ' ', value)
            matches = combined_pattern.findall(clean)
            for match in matches:
                normalized = match.lower().strip()
                found_terms[normalized]["keys"].append(
                    f"{json_file.name}:{key}"
                )
                # Capture a snippet of context
                idx = clean.lower().find(normalized)
                if idx >= 0:
                    start = max(0, idx - 30)
                    end = min(len(clean), idx + len(normalized) + 30)
                    snippet = clean[start:end].strip()
                    found_terms[normalized]["contexts"].append(snippet)

    # Deduplicate
    result = {}
    for term, data in found_terms.items():
        result[term] = {
            "intl_key_count": len(set(data["keys"])),
            "sample_keys": sorted(set(data["keys"]))[:5],
            "sample_contexts": list(set(data["contexts"]))[:3],
        }
    return result


def extract_additional_terms_from_content(repo_root: Path) -> dict:
    """
    Find terms NOT in seed list that look like Ethereum jargon.
    Uses heuristics: capitalized multi-word phrases, terms near
    known Ethereum words, acronyms, etc.
    """
    content_dir = repo_root / "public" / "content"
    candidate_terms = defaultdict(int)

    # Patterns for likely technical terms
    acronym_pattern = re.compile(r'\b([A-Z]{2,6})\b')
    capitalized_phrase = re.compile(r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b')

    # Terms that appear near Ethereum context
    ethereum_context = re.compile(
        r'(?:ethereum|blockchain|crypto|defi|web3|smart\s+contract|'
        r'decentralized|on-?chain|layer\s*[12])',
        re.IGNORECASE
    )

    md_files = list(content_dir.rglob("*.md"))
    md_files = [
        f for f in md_files
        if "translations" not in str(f.relative_to(content_dir))
    ]

    known_noise = {
        "THE", "AND", "FOR", "NOT", "ARE", "BUT", "ALL", "CAN", "HAS",
        "HER", "WAS", "ONE", "OUR", "OUT", "DAY", "GET", "USE", "WAY",
        "NEW", "NOW", "OLD", "SEE", "WHO", "HOW", "ITS", "LET", "SAY",
        "SHE", "TOO", "MAY", "DIY", "FAQ", "URL", "CSS", "HTML", "JSON",
        "HTTP", "HTTPS", "USD", "RGB", "PNG", "SVG", "PDF", "CEO",
        "CTO", "CFO", "USA", "CDN", "VPN", "DNS", "TCP", "UDP",
        "IDE", "SDK", "CLI", "GUI", "SSD", "RAM", "CPU", "GPU",
        "MIT", "BSD", "GPL", "ISO", "USB", "SSH", "SQL", "XML",
        "BTC", "MORE", "THIS", "THAT", "WITH", "FROM", "YOUR",
        "THEY", "WILL", "HAVE", "BEEN", "SOME", "WHEN", "WHAT",
        "EACH", "MUCH", "MANY", "ALSO", "VERY", "JUST", "THAN",
        "THEM", "INTO", "OVER", "ONLY", "SUCH", "LIKE", "MOST",
        "HERE", "WHERE", "WHICH", "ABOUT", "THESE", "THOSE",
        "WOULD", "COULD", "SHOULD", "EVERY", "AFTER", "BEFORE",
        "OTHER", "BECAUSE", "BETWEEN", "THROUGH",
        "NOTE", "TIPS", "TODO", "IMPORTANT",
    }

    for md_file in md_files:
        try:
            text = md_file.read_text(encoding="utf-8")
        except Exception:
            continue

        # Strip frontmatter
        if text.startswith("---"):
            end = text.find("---", 3)
            if end != -1:
                text = text[end + 3:]

        # Strip code blocks and HTML
        text = re.sub(r'```[\s\S]*?```', '', text)
        text = re.sub(r'<[^>]+>', ' ', text)
        text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)

        # Find acronyms
        for match in acronym_pattern.finditer(text):
            acr = match.group(1)
            if acr not in known_noise and len(acr) >= 2:
                # Check if near Ethereum context (within 200 chars)
                start = max(0, match.start() - 200)
                end = min(len(text), match.end() + 200)
                context = text[start:end]
                if ethereum_context.search(context):
                    candidate_terms[acr] += 1

        # Find capitalized phrases
        for match in capitalized_phrase.finditer(text):
            phrase = match.group(1)
            # Filter out obvious non-terms
            words = phrase.split()
            if len(words) <= 4 and not any(
                w.lower() in {"the", "a", "an", "of", "in", "on", "to", "for", "and", "or", "by", "at", "is", "it"}
                for w in words
            ):
                candidate_terms[phrase] += 1

    # Filter to terms appearing 3+ times
    result = {
        term: count for term, count in candidate_terms.items()
        if count >= 3
    }
    return dict(sorted(result.items(), key=lambda x: -x[1]))


def categorize_term(term: str) -> str:
    """Assign a category to a term based on keywords."""
    t = term.lower()

    consensus_terms = {
        "consensus", "validator", "staking", "stake", "staker", "attestation",
        "epoch", "slot", "committee", "finality", "checkpoint", "slashing",
        "beacon chain", "proof of stake", "proof of work", "mining", "miner",
        "merge", "proposer", "builder", "casper", "lmd-ghost", "fork choice",
        "sync committee", "dvt", "distributed validator",
    }
    if any(kw in t for kw in consensus_terms):
        return "consensus"

    defi_terms = {
        "defi", "dex", "amm", "liquidity", "yield", "swap", "lending",
        "borrowing", "collateral", "liquidation", "flash loan", "oracle",
        "tvl", "vault", "stablecoin", "apr", "apy", "impermanent loss",
    }
    if any(kw in t for kw in defi_terms):
        return "defi"

    scaling_terms = {
        "layer 2", "l2", "rollup", "optimistic", "zero-knowledge", "zk",
        "blob", "danksharding", "sidechain", "plasma", "state channel",
        "bridge", "cross-chain", "sequencer", "prover", "verifier",
        "data availability", "4844",
    }
    if any(kw in t for kw in scaling_terms):
        return "scaling"

    contract_terms = {
        "smart contract", "contract", "solidity", "vyper", "evm",
        "bytecode", "opcode", "abi", "deploy", "constructor",
        "fallback", "proxy", "upgradeable", "reentrancy",
    }
    if any(kw in t for kw in contract_terms):
        return "smart-contracts"

    token_terms = {
        "token", "erc-20", "erc-721", "erc-1155", "nft", "fungible",
        "mint", "burn", "soulbound", "poap", "collectible",
    }
    if any(kw in t for kw in token_terms):
        return "tokens"

    key_terms = {
        "account", "address", "wallet", "key", "seed phrase", "mnemonic",
        "signing", "signature", "multisig", "eoa", "recovery",
    }
    if any(kw in t for kw in key_terms):
        return "accounts-keys"

    tx_terms = {
        "transaction", "gas", "fee", "nonce", "mempool", "receipt",
        "base fee", "priority fee", "tip", "max fee", "gwei", "wei",
    }
    if any(kw in t for kw in tx_terms):
        return "transactions"

    governance_terms = {
        "dao", "governance", "proposal", "vote", "voting", "delegation",
        "delegate", "treasury", "quadratic",
    }
    if any(kw in t for kw in governance_terms):
        return "governance"

    crypto_terms = {
        "hash", "keccak", "sha", "merkle", "ecdsa", "elliptic",
        "encryption", "cryptography", "entropy",
    }
    if any(kw in t for kw in crypto_terms):
        return "cryptography"

    mev_terms = {"mev", "front-running", "back-running", "sandwich", "searcher", "pbs"}
    if any(kw in t for kw in mev_terms):
        return "mev"

    identity_terms = {"identity", "did", "verifiable", "ens", "name service"}
    if any(kw in t for kw in identity_terms):
        return "identity"

    eip_terms = {"eip", "erc", "homestead", "byzantium", "constantinople",
                 "istanbul", "berlin", "london", "shanghai", "cancun", "dencun", "pectra"}
    if any(kw in t for kw in eip_terms):
        return "protocol-upgrades"

    if any(kw in t for kw in {"ether", "eth", "weth", "cryptocurrency", "digital asset"}):
        return "ether"

    if any(kw in t for kw in {"dapp", "web3", "rpc", "ipfs", "api", "subgraph",
                               "hardhat", "foundry", "remix", "faucet"}):
        return "development"

    return "general"


def identify_morphological_forms(term: str) -> dict:
    """Identify likely morphological variants for a term."""
    forms = {"base": term}
    t = term.lower()

    # Common verb/gerund/agent patterns
    if t.endswith("ing"):
        base = t[:-3]
        if base + "e" in SEED_TERMS:
            forms["verb_base"] = base + "e"
        elif base in SEED_TERMS:
            forms["verb_base"] = base
        forms["gerund"] = t
        # Check for agent form
        if base + "er" in SEED_TERMS or (base + "er") in {s.lower() for s in SEED_TERMS}:
            forms["agent"] = base + "er"

    elif t.endswith("er") or t.endswith("or"):
        base = t[:-2]
        if base in SEED_TERMS or base + "e" in SEED_TERMS:
            forms["agent"] = t
            forms["verb_base"] = base if base in SEED_TERMS else base + "e"
        if base + "ing" in SEED_TERMS:
            forms["gerund"] = base + "ing"

    elif t.endswith("ed"):
        base = t[:-2]
        if base in SEED_TERMS or base + "e" in SEED_TERMS:
            forms["past"] = t
            forms["verb_base"] = base if base in SEED_TERMS else base + "e"

    elif t.endswith("tion") or t.endswith("ment"):
        forms["nominalization"] = t

    # Check if plural exists
    if t + "s" in {s.lower() for s in SEED_TERMS}:
        forms["plural"] = t + "s"

    return forms


def build_term_groups() -> dict:
    """Group related terms together (e.g., stake/staking/staker/staked)."""
    groups = defaultdict(set)

    # Manual groupings for important term families
    manual_groups = {
        "stake": {"stake", "staking", "staked", "staker", "unstaking",
                  "restaking", "solo staking", "pooled staking",
                  "liquid staking", "staking pool", "staking deposit",
                  "proof of stake"},
        "validate": {"validator", "validation", "validated", "block validation"},
        "mine": {"mining", "miner", "mined"},
        "mint": {"mint", "minting", "minted"},
        "burn": {"burn", "burning", "burned"},
        "swap": {"swap", "swapping", "swapped"},
        "bridge": {"bridge", "bridging", "bridged"},
        "fork": {"fork", "forking", "forked", "hard fork", "soft fork"},
        "hash": {"hash", "hashing", "hashed", "hash rate", "hash function"},
        "sign": {"signing", "signed", "signature", "digital signature"},
        "deploy": {"deploy", "deployment", "deployed", "deploying"},
        "govern": {"governance", "governing", "governor"},
        "vote": {"vote", "voting", "voted", "voter"},
        "delegate": {"delegate", "delegation", "delegating", "delegated"},
        "encrypt": {"encryption", "encrypting", "encrypted", "decryption"},
        "transact": {"transaction", "transactions", "transacting"},
        "decentralize": {"decentralization", "decentralized", "decentralize"},
        "finalize": {"finality", "finalized", "finalizing", "finalization"},
        "attest": {"attestation", "attesting", "attested"},
        "slash": {"slashing", "slashed", "slasher"},
        "liquidate": {"liquidation", "liquidated", "liquidating"},
        "collateralize": {"collateral", "collateralized", "collateralizing"},
    }

    return manual_groups


def main():
    print("=" * 70)
    print("ETHEREUM GLOSSARY TERM EXTRACTION")
    print("=" * 70)

    # Step 1: Existing glossary
    print("\n[1/5] Parsing existing glossary.json...")
    existing = extract_existing_glossary_terms(REPO_ROOT)
    tooltip_ids = extract_tooltip_terms(REPO_ROOT)
    print(f"  Found {len(existing)} existing glossary terms")
    print(f"  Of those, {len(tooltip_ids)} have tooltip versions")

    # Step 2: Content markdown
    print("\n[2/5] Crawling public/content/**/*.md...")
    content_terms = extract_terms_from_markdown(REPO_ROOT)
    print(f"  Found {len(content_terms)} seed terms in content")

    # Step 3: Intl JSON
    print("\n[3/5] Parsing src/intl/en/*.json...")
    intl_terms = extract_terms_from_intl(REPO_ROOT)
    print(f"  Found {len(intl_terms)} seed terms in intl files")

    # Step 4: Additional terms (heuristic)
    print("\n[4/5] Discovering additional terms via heuristics...")
    additional = extract_additional_terms_from_content(REPO_ROOT)
    print(f"  Found {len(additional)} candidate terms (3+ occurrences)")

    # Step 5: Merge and build comprehensive list
    print("\n[5/5] Merging, deduplicating, and categorizing...")

    all_terms = {}

    # Add existing glossary terms
    for term_id, data in existing.items():
        term_text = data["term"]
        normalized = term_text.lower()
        all_terms[normalized] = {
            "id": term_id,
            "term": term_text,
            "category": categorize_term(term_text),
            "definition": data["definition"][:200] + "..." if len(data["definition"]) > 200 else data["definition"],
            "has_tooltip": term_id in tooltip_ids,
            "in_glossary": True,
            "content_occurrences": content_terms.get(normalized, {}).get("count", 0),
            "content_files": content_terms.get(normalized, {}).get("file_count", 0),
            "intl_keys": intl_terms.get(normalized, {}).get("intl_key_count", 0),
            "sources": ["glossary.json"],
        }

    # Add seed terms not in glossary
    for seed in SEED_TERMS:
        normalized = seed.lower()
        if normalized not in all_terms:
            all_terms[normalized] = {
                "id": re.sub(r'[^a-z0-9]+', '-', normalized).strip('-'),
                "term": seed,
                "category": categorize_term(seed),
                "definition": "",
                "has_tooltip": False,
                "in_glossary": False,
                "content_occurrences": content_terms.get(normalized, {}).get("count", 0),
                "content_files": content_terms.get(normalized, {}).get("file_count", 0),
                "intl_keys": intl_terms.get(normalized, {}).get("intl_key_count", 0),
                "sources": ["seed"],
            }

    # Add heuristically discovered terms not already captured
    for term, count in additional.items():
        normalized = term.lower()
        if normalized not in all_terms:
            all_terms[normalized] = {
                "id": re.sub(r'[^a-z0-9]+', '-', normalized).strip('-'),
                "term": term,
                "category": categorize_term(term),
                "definition": "",
                "has_tooltip": False,
                "in_glossary": False,
                "content_occurrences": count,
                "content_files": 0,
                "intl_keys": 0,
                "sources": ["heuristic"],
            }

    # Build term family groups
    term_groups = build_term_groups()

    # Assign forms to terms
    for normalized, data in all_terms.items():
        forms = identify_morphological_forms(normalized)
        data["forms"] = forms

        # Check if this term belongs to a family
        for family_root, family_members in term_groups.items():
            if normalized in {m.lower() for m in family_members}:
                data["term_family"] = family_root
                break

    # Sort by category then term
    sorted_terms = dict(
        sorted(all_terms.items(), key=lambda x: (x[1]["category"], x[0]))
    )

    # Generate output
    output = {
        "metadata": {
            "generated": "2026-03-26",
            "total_terms": len(sorted_terms),
            "terms_in_existing_glossary": sum(
                1 for t in sorted_terms.values() if t["in_glossary"]
            ),
            "terms_not_in_glossary": sum(
                1 for t in sorted_terms.values() if not t["in_glossary"]
            ),
            "terms_with_definitions": sum(
                1 for t in sorted_terms.values() if t["definition"]
            ),
            "terms_needing_definitions": sum(
                1 for t in sorted_terms.values() if not t["definition"]
            ),
            "categories": {},
            "term_families": len(term_groups),
        },
        "terms": sorted_terms,
        "term_families": {k: sorted(v) for k, v in term_groups.items()},
        "heuristic_discoveries": additional,
    }

    # Count by category
    cat_counts = defaultdict(int)
    for t in sorted_terms.values():
        cat_counts[t["category"]] += 1
    output["metadata"]["categories"] = dict(sorted(cat_counts.items()))

    # Write output
    output_path = REPO_ROOT / "scripts" / "glossary-term-extraction.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"\n  Written full output to: {output_path}")

    # Also write a human-readable summary
    summary_path = REPO_ROOT / "scripts" / "glossary-term-summary.md"
    with open(summary_path, "w", encoding="utf-8") as f:
        f.write("# Ethereum Glossary Term Extraction Summary\n\n")
        f.write(f"**Generated:** 2026-03-26\n\n")
        f.write(f"## Overview\n\n")
        f.write(f"| Metric | Count |\n")
        f.write(f"|--------|-------|\n")
        f.write(f"| Total unique terms | {output['metadata']['total_terms']} |\n")
        f.write(f"| Already in glossary | {output['metadata']['terms_in_existing_glossary']} |\n")
        f.write(f"| NOT in glossary (new) | {output['metadata']['terms_not_in_glossary']} |\n")
        f.write(f"| Have definitions | {output['metadata']['terms_with_definitions']} |\n")
        f.write(f"| Need definitions | {output['metadata']['terms_needing_definitions']} |\n")
        f.write(f"| Term families | {output['metadata']['term_families']} |\n\n")

        f.write("## Terms by Category\n\n")
        f.write("| Category | Count |\n")
        f.write("|----------|-------|\n")
        for cat, count in sorted(cat_counts.items()):
            f.write(f"| {cat} | {count} |\n")

        f.write("\n## All Terms\n\n")
        current_cat = None
        for normalized, data in sorted_terms.items():
            if data["category"] != current_cat:
                current_cat = data["category"]
                f.write(f"\n### {current_cat.replace('-', ' ').title()}\n\n")
                f.write("| Term | In Glossary | Content Hits | Has Definition | Family |\n")
                f.write("|------|------------|-------------|----------------|--------|\n")

            family = data.get("term_family", "-")
            f.write(
                f"| {data['term']} "
                f"| {'Yes' if data['in_glossary'] else '**No**'} "
                f"| {data['content_occurrences']} "
                f"| {'Yes' if data['definition'] else 'No'} "
                f"| {family} |\n"
            )

        f.write("\n## Term Families\n\n")
        f.write("These terms share a root and should be translated as a coherent group:\n\n")
        for family_root, members in sorted(term_groups.items()):
            f.write(f"### {family_root}\n")
            for member in sorted(members):
                in_glossary = member.lower() in {
                    t for t, d in sorted_terms.items() if d["in_glossary"]
                }
                f.write(f"- {member} {'(in glossary)' if in_glossary else '(NEW)'}\n")
            f.write("\n")

        f.write("\n## Heuristically Discovered Terms\n\n")
        f.write("These terms were found via pattern matching (not in seed list):\n\n")
        f.write("| Term | Occurrences |\n")
        f.write("|------|------------|\n")
        for term, count in sorted(additional.items(), key=lambda x: -x[1])[:100]:
            f.write(f"| {term} | {count} |\n")

    print(f"  Written summary to: {summary_path}")
    print(f"\n{'=' * 70}")
    print(f"DONE. {output['metadata']['total_terms']} terms extracted.")
    print(f"{'=' * 70}")


if __name__ == "__main__":
    main()
