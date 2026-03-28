#!/usr/bin/env python3
"""
Generate Ethereum translation glossary entries via Gemini CLI.

Strategy:
- Single language per call (highest quality, no cross-contamination)
- ~10 terms per batch, term families grouped together
- Exponential backoff on rate limits
- Auto-normalization of known Gemini drift patterns
- Schema validation after each batch
- Incremental saving (no lost progress on failures)
"""

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
TERMS_PATH = REPO_ROOT / "scripts" / "glossary-terms-enhanced.json"
OUTPUT_DIR = REPO_ROOT / "scripts" / "translations"
PROGRESS_PATH = REPO_ROOT / "scripts" / "translations" / "progress.json"

MIN_HITS = 75  # Tier 1 threshold

LANGUAGES = [
    {"code": "ar", "name": "Arabic", "script": "Arabic", "notes": "RTL. Use Western Arabic numerals. Broken plural system (zero/one/two/few/many/other)."},
    {"code": "bn", "name": "Bengali", "script": "Bengali", "notes": "Indic script. Transliterate technical terms to Bengali script."},
    {"code": "cs", "name": "Czech", "script": "Latin", "notes": "Slavic. 7 grammatical cases. Complex plurals (one/few/many/other). Gender: masculine/feminine/neuter."},
    {"code": "de", "name": "German", "script": "Latin", "notes": "Capitalize all nouns. Gender: masculine/feminine/neuter. Compound words common."},
    {"code": "es", "name": "Spanish", "script": "Latin", "notes": "Gender: masculine/feminine. Use Latin American neutral Spanish."},
    {"code": "fr", "name": "French", "script": "Latin", "notes": "Gender: masculine/feminine. English loanwords take masculine by default unless root word is feminine."},
    {"code": "hi", "name": "Hindi", "script": "Devanagari", "notes": "Full Devanagari transliteration. Gender: masculine/feminine. URLs and domains stay Latin."},
    {"code": "id", "name": "Indonesian", "script": "Latin", "notes": "Latin script. No grammatical gender. No plural inflection (use context or 'beberapa')."},
    {"code": "it", "name": "Italian", "script": "Latin", "notes": "Gender: masculine/feminine. Similar to French for loanword handling."},
    {"code": "ja", "name": "Japanese", "script": "Katakana/Kanji", "notes": "Transliterate loanwords to katakana. Use middle dot for multi-word compounds. No plural inflection."},
    {"code": "ko", "name": "Korean", "script": "Hangul", "notes": "Transliterate loanwords to Hangul. Formal/neutral register. No grammatical gender."},
    {"code": "mr", "name": "Marathi", "script": "Devanagari", "notes": "Indic script. Gender: masculine/feminine/neuter. Similar to Hindi for transliteration."},
    {"code": "pl", "name": "Polish", "script": "Latin", "notes": "Slavic. 7 grammatical cases. Complex plurals (one/few/many/other). Gender + animacy distinction."},
    {"code": "pt-br", "name": "Portuguese (Brazilian)", "script": "Latin", "notes": "Gender: masculine/feminine. Brazilian Portuguese, not European."},
    {"code": "ru", "name": "Russian", "script": "Cyrillic", "notes": "Cyrillic script. 6 cases. Complex plurals. Gender + animacy. Transliterate loanwords to Cyrillic."},
    {"code": "sw", "name": "Swahili", "script": "Latin", "notes": "Latin script. Bantu noun class system. No grammatical gender in European sense."},
    {"code": "ta", "name": "Tamil", "script": "Tamil", "notes": "Dravidian script. Agglutinative. Transliterate technical terms to Tamil script."},
    {"code": "te", "name": "Telugu", "script": "Telugu", "notes": "Dravidian script. Transliterate technical terms to Telugu script."},
    {"code": "tr", "name": "Turkish", "script": "Latin", "notes": "Agglutinative. Vowel harmony. No grammatical gender. Suffixes change based on last vowel."},
    {"code": "uk", "name": "Ukrainian", "script": "Cyrillic", "notes": "Cyrillic. Similar to Russian but distinct orthography. 7 cases. Gender + animacy."},
    {"code": "ur", "name": "Urdu", "script": "Nastaliq/Arabic", "notes": "RTL. Nastaliq script. Use native Urdu numerals in prose. Gender: masculine/feminine."},
    {"code": "vi", "name": "Vietnamese", "script": "Latin", "notes": "Latin script with diacritics. Classifier system for nouns. No inflection."},
    {"code": "zh", "name": "Chinese Simplified", "script": "Simplified Chinese", "notes": "Simplified characters. No inflection, no plurals, no gender. Semantic translation preferred over transliteration."},
    {"code": "zh-tw", "name": "Chinese Traditional", "script": "Traditional Chinese", "notes": "Traditional characters. May differ from Simplified in terminology choices."},
]

# Schema instruction template - sent with every Gemini call
SCHEMA_INSTRUCTIONS = """You MUST output valid JSON conforming EXACTLY to this structure for each term:
{
  "term": "primary canonical translation",
  "aliases": ["alternative valid translations, or empty array []"],
  "transliteration": "Latin-script phonetic rendering (non-Latin scripts only, null for Latin-script languages)",
  "morphology": {
    "noun": { "singular": "lemma/dictionary form" },
    "verb": { "infinitive": "infinitive form", "participle": "active participle" },
    "adjective": "adjectival form or null",
    "agent": "person/entity performing action or null",
    "negation": "negated/reversed form or null",
    "compounds": { "compound-slug-id": "translated compound term" }
  },
  "contexts": {
    "prose": { "term": "inflected form for flowing text", "example": "Full example sentence using the term" },
    "heading": { "term": "standalone heading form" },
    "tag": { "term": "short metadata label form" },
    "ui": { "term": "button/menu/tooltip form" },
    "code": { "term": "Latin/ASCII technical form" }
  },
  "grammar": {
    "gender": "masculine/feminine/neuter/common or null",
    "animacy": "animate/inanimate or null",
    "part_of_speech": "noun/verb/adjective/abbreviation/proper_noun",
    "formality": "formal/neutral/casual or null"
  },
  "plurals": { "one": "...", "two": "...", "few": "...", "many": "...", "other": "..." },
  "source": "llm",
  "confidence": "high/medium/low",
  "notes": "any translation caveats or null"
}

STRICT RULES:
- Use null for non-applicable fields (do NOT omit them)
- aliases MUST always be present (use [] if empty)
- Every context MUST be an object with at least a "term" key: { "term": "..." }
- contexts.code MUST be an object: { "term": "stake" } NOT a bare string
- contexts.prose MUST include an "example" sentence
- morphology.verb = null if no verb form exists
- plurals = null for languages without complex plural rules
- transliteration = null for Latin-script languages
- "onchain" and "offchain" are written WITHOUT hyphens (like "online"/"offline")
"""


def load_tier1_terms():
    """Load terms with 75+ content occurrences."""
    with open(TERMS_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    tier1 = {}
    for key, t in data["confirmed_terms"].items():
        if t.get("content_occurrences", 0) >= MIN_HITS:
            tier1[key] = t
    return tier1


def group_into_batches(terms, batch_size=10):
    """
    Group terms into batches of ~batch_size, keeping term families together.
    """
    # Build family groups
    families = {}
    standalone = []

    for key, t in terms.items():
        family = t.get("term_family", "")
        if family:
            if family not in families:
                families[family] = []
            families[family].append(key)
        else:
            standalone.append(key)

    # Build batches: families first, then fill with standalone
    batches = []
    current_batch = []

    # Add family groups
    for family, members in sorted(families.items()):
        family_keys = [k for k in members if k in terms]
        if len(current_batch) + len(family_keys) > batch_size and current_batch:
            batches.append(current_batch)
            current_batch = []
        current_batch.extend(family_keys)
        if len(current_batch) >= batch_size:
            batches.append(current_batch)
            current_batch = []

    # Fill remaining with standalone terms
    for key in sorted(standalone, key=lambda k: -terms[k].get("content_occurrences", 0)):
        current_batch.append(key)
        if len(current_batch) >= batch_size:
            batches.append(current_batch)
            current_batch = []

    if current_batch:
        batches.append(current_batch)

    return batches


def build_term_descriptions(terms, batch_keys):
    """Build the term description block for a Gemini prompt."""
    descriptions = []
    for i, key in enumerate(batch_keys, 1):
        t = terms[key]
        term_name = t.get("term", key)
        category = t.get("category", "general")
        note = t.get("translation_note", "") or t.get("note", "") or ""
        family = t.get("term_family", "")

        # Build compounds list from morphological families
        forms = t.get("forms", {})
        compounds = ""
        if isinstance(forms, dict) and forms.get("compounds"):
            compounds = " Compounds: " + ", ".join(forms["compounds"].values()) + "."

        # Usage note
        usage = ""
        if note:
            usage = " " + note

        family_note = ""
        if family:
            family_note = " [term family: %s]" % family

        descriptions.append(
            "%d. **%s** (%s) -%s%s%s%s" % (
                i, term_name, category, usage, compounds, family_note,
                " Translation context: " + t.get("translation_note", "") if t.get("translation_note") else ""
            )
        )

    return "\n\n".join(descriptions)


def build_prompt(terms, batch_keys, lang):
    """Build the full Gemini prompt for a batch."""
    lang_name = lang["name"]
    lang_code = lang["code"]
    lang_notes = lang["notes"]

    term_block = build_term_descriptions(terms, batch_keys)

    prompt = (
        "Answer directly and concisely. Do not attempt to use any tools or access any codebase.\n\n"
        "Produce Ethereum glossary translations for the following terms.\n\n"
        "TARGET LANGUAGE: %s (%s)\n"
        "Language notes: %s\n\n"
        "%s\n\n"
        "THE TERMS:\n\n%s\n\n"
        "Output as a single JSON object. Keys are the term slug IDs: %s\n"
        "Each value is a single translation entry object for %s (%s)."
    ) % (
        lang_name, lang_code,
        lang_notes,
        SCHEMA_INSTRUCTIONS,
        term_block,
        ", ".join('"%s"' % k for k in batch_keys),
        lang_name, lang_code,
    )

    return prompt


def call_gemini(prompt, max_retries=5):
    """Call Gemini CLI with exponential backoff."""
    for attempt in range(max_retries):
        try:
            result = subprocess.run(
                ["gemini", "-p", prompt],
                capture_output=True,
                text=True,
                timeout=300,
            )

            output = result.stdout + result.stderr

            # Check for rate limiting
            if "429" in output or "RESOURCE_EXHAUSTED" in output or "capacity" in output.lower():
                wait = min(2 ** attempt * 10, 120)  # 10s, 20s, 40s, 80s, 120s
                print("    Rate limited (attempt %d/%d), waiting %ds..." % (attempt + 1, max_retries, wait))
                time.sleep(wait)
                continue

            return output

        except subprocess.TimeoutExpired:
            print("    Timeout (attempt %d/%d)" % (attempt + 1, max_retries))
            time.sleep(10)
            continue

    return None


def extract_json(output):
    """Extract JSON from Gemini output (may be wrapped in code fences)."""
    if not output:
        return None

    # Try code-fenced JSON first
    match = re.search(r'```json\s*\n(.*?)\n```', output, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError:
            pass

    # Try bare JSON
    match = re.search(r'\{[\s\S]*\}', output)
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            pass

    return None


def normalize_entry(entry):
    """Fix known Gemini drift patterns."""
    if not isinstance(entry, dict):
        return entry

    # Fix 1: missing aliases -> empty array
    if "aliases" not in entry:
        entry["aliases"] = []

    # Fix 2: context values as strings -> wrap in object
    if "contexts" in entry and isinstance(entry["contexts"], dict):
        for ctx_name in ["prose", "heading", "tag", "ui", "code"]:
            if ctx_name in entry["contexts"]:
                val = entry["contexts"][ctx_name]
                if isinstance(val, str):
                    entry["contexts"][ctx_name] = {"term": val}

    # Fix 3: ensure null fields are present
    for field in ["transliteration", "morphology", "grammar", "plurals", "notes"]:
        if field not in entry:
            entry[field] = None

    if "source" not in entry:
        entry["source"] = "llm"
    if "confidence" not in entry:
        entry["confidence"] = "medium"

    return entry


def validate_entry(entry, term_key, lang_code):
    """Validate a single entry against schema. Returns list of issues."""
    issues = []

    required = {"term", "aliases", "transliteration", "morphology", "contexts",
                 "grammar", "plurals", "source", "confidence", "notes"}
    missing = required - set(entry.keys())
    if missing:
        issues.append("missing fields: %s" % missing)

    if "contexts" in entry and isinstance(entry["contexts"], dict):
        for ctx in ["prose", "heading", "tag", "ui", "code"]:
            if ctx in entry["contexts"] and entry["contexts"][ctx] is not None:
                if not isinstance(entry["contexts"][ctx], dict):
                    issues.append("contexts.%s not object" % ctx)
                elif "term" not in entry["contexts"][ctx]:
                    issues.append("contexts.%s missing term" % ctx)
                if ctx == "prose" and isinstance(entry["contexts"][ctx], dict):
                    if "example" not in entry["contexts"][ctx]:
                        issues.append("contexts.prose missing example")

    return issues


def load_progress():
    """Load progress tracker."""
    if PROGRESS_PATH.exists():
        with open(PROGRESS_PATH, "r") as f:
            return json.load(f)
    return {"completed": {}, "failed": [], "stats": {"total_calls": 0, "total_entries": 0}}


def save_progress(progress):
    """Save progress tracker."""
    with open(PROGRESS_PATH, "w") as f:
        json.dump(progress, f, indent=2)


def save_language_data(lang_code, data):
    """Save/update translations for a single language."""
    path = OUTPUT_DIR / ("glossary-%s.json" % lang_code)

    existing = {}
    if path.exists():
        with open(path, "r", encoding="utf-8") as f:
            existing = json.load(f)

    existing.update(data)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)


def main():
    # Setup
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Load terms and create batches
    terms = load_tier1_terms()
    batches = group_into_batches(terms)
    progress = load_progress()

    print("=" * 60)
    print("ETHEREUM GLOSSARY TRANSLATION GENERATOR")
    print("=" * 60)
    print("Terms: %d (Tier 1, %d+ occurrences)" % (len(terms), MIN_HITS))
    print("Languages: %d" % len(LANGUAGES))
    print("Batches per language: %d" % len(batches))
    print("Total calls needed: %d" % (len(batches) * len(LANGUAGES)))
    print("Batch sizes: %s" % [len(b) for b in batches])
    print()

    # Show batch contents
    for i, batch in enumerate(batches):
        print("Batch %d (%d terms): %s" % (i + 1, len(batch), ", ".join(batch)))
    print()

    # Check what's already done
    already_done = set()
    for key in progress.get("completed", {}):
        already_done.add(key)

    total_calls = len(batches) * len(LANGUAGES)
    remaining = total_calls - len(already_done)
    print("Already completed: %d / %d calls" % (len(already_done), total_calls))
    print("Remaining: %d calls" % remaining)
    print()

    if remaining == 0:
        print("All calls complete!")
        return

    # Confirm before starting
    if "--yes" not in sys.argv:
        print("Ready to start. Run with --yes to begin, or --dry-run to preview prompts.")
        if "--dry-run" in sys.argv:
            # Show first prompt as example
            lang = LANGUAGES[0]
            batch = batches[0]
            prompt = build_prompt(terms, batch, lang)
            print("\n--- EXAMPLE PROMPT (batch 1, %s) ---" % lang["name"])
            print(prompt[:2000])
            print("... (%d chars total)" % len(prompt))
        return

    # Main generation loop
    call_num = 0
    for lang in LANGUAGES:
        lang_code = lang["code"]
        lang_name = lang["name"]

        for batch_idx, batch_keys in enumerate(batches):
            progress_key = "%s_batch_%d" % (lang_code, batch_idx)

            if progress_key in already_done:
                continue

            call_num += 1
            print("[%d/%d] %s batch %d/%d (%d terms: %s)" % (
                call_num, remaining, lang_name, batch_idx + 1, len(batches),
                len(batch_keys), ", ".join(batch_keys[:3]) + ("..." if len(batch_keys) > 3 else "")
            ))

            # Build and send prompt
            prompt = build_prompt(terms, batch_keys, lang)
            output = call_gemini(prompt)

            if output is None:
                print("    FAILED: no output after retries")
                progress["failed"].append({"key": progress_key, "reason": "no_output"})
                save_progress(progress)
                continue

            # Parse JSON
            data = extract_json(output)
            if data is None:
                print("    FAILED: could not parse JSON")
                # Save raw output for debugging
                fail_path = OUTPUT_DIR / ("failed_%s.txt" % progress_key)
                with open(fail_path, "w") as f:
                    f.write(output)
                progress["failed"].append({"key": progress_key, "reason": "json_parse_error"})
                save_progress(progress)
                continue

            # Normalize and validate each entry
            valid = 0
            issues_total = 0
            lang_entries = {}

            for term_key in batch_keys:
                if term_key not in data:
                    print("    WARNING: missing term '%s' in response" % term_key)
                    progress["failed"].append({"key": progress_key, "reason": "missing_term", "term": term_key})
                    continue

                entry = normalize_entry(data[term_key])
                entry_issues = validate_entry(entry, term_key, lang_code)

                if entry_issues:
                    print("    WARN %s: %s" % (term_key, "; ".join(entry_issues)))
                    issues_total += len(entry_issues)

                lang_entries[term_key] = entry
                valid += 1

            # Save language data
            save_language_data(lang_code, lang_entries)

            # Update progress
            progress["completed"][progress_key] = {
                "terms": len(lang_entries),
                "valid": valid,
                "issues": issues_total,
            }
            progress["stats"]["total_calls"] += 1
            progress["stats"]["total_entries"] += valid
            save_progress(progress)

            print("    OK: %d/%d terms, %d issues" % (valid, len(batch_keys), issues_total))

            # Brief pause between calls to be nice to the API
            time.sleep(2)

    # Summary
    print("\n" + "=" * 60)
    print("GENERATION COMPLETE")
    print("=" * 60)
    stats = progress["stats"]
    print("Total API calls: %d" % stats["total_calls"])
    print("Total entries generated: %d" % stats["total_entries"])
    print("Failed batches: %d" % len(progress["failed"]))

    if progress["failed"]:
        print("\nFailed batches:")
        for f in progress["failed"]:
            print("  - %s: %s" % (f["key"], f.get("reason", "unknown")))


if __name__ == "__main__":
    main()
