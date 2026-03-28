#!/usr/bin/env python3
"""
Glossary lookup index and source-file filtering utility.

Builds a trie-based index from the glossary that maps all surface forms
(term, aliases, morphological variants) to entry IDs. Then filters the
glossary to only terms that appear in a given source file.

Outputs either:
- Rich format (full entry context for LLM prompt injection)
- Flat format (Map<string, string> for simple lookups)

Usage:
  # Build index and filter for a source file
  python3 glossary-lookup.py --source path/to/file.md --lang ja --format rich

  # Dump the full lookup index
  python3 glossary-lookup.py --dump-index

  # Test: show what terms match in a given file
  python3 glossary-lookup.py --source path/to/file.md --test
"""

import argparse
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
GLOSSARY_PATH = REPO_ROOT / "scripts" / "glossary-terms-enhanced.json"
TRANSLATIONS_DIR = REPO_ROOT / "scripts" / "translations"


def build_lookup_index(glossary_data):
    """
    Build a mapping from every surface form to its entry ID.

    Surface forms include:
    - The entry key itself
    - en.term (canonical English)
    - All aliases (both plain strings and objects with .term)
    - Morphological forms (noun.singular, verb.infinitive, verb.participle,
      adjective, agent, negation)
    - Compound values

    Returns: dict[surface_form_lowercase] -> entry_id
    """
    index = {}
    terms = glossary_data.get("confirmed_terms", {})

    for entry_id, entry in terms.items():
        forms_to_index = set()

        # Entry key itself
        forms_to_index.add(entry_id)

        # Term display form
        term = entry.get("term", "")
        if term:
            forms_to_index.add(term)

        # Aliases
        for alias in entry.get("aliases", []):
            if isinstance(alias, str):
                forms_to_index.add(alias)
            elif isinstance(alias, dict) and "term" in alias:
                forms_to_index.add(alias["term"])

        # Morphological forms from the extraction data
        forms = entry.get("forms", {})
        if isinstance(forms, dict):
            for key, val in forms.items():
                if key == "compounds" and isinstance(val, dict):
                    for comp_val in val.values():
                        if isinstance(comp_val, str):
                            forms_to_index.add(comp_val)
                elif isinstance(val, str):
                    forms_to_index.add(val)

        # Translation note might mention the term differently
        # (not indexing this -- too noisy)

        # Add all forms to index (lowercased for matching)
        for form in forms_to_index:
            if form and len(form) >= 2:
                normalized = form.lower().strip()
                # Don't override a more specific entry with a generic one
                if normalized not in index:
                    index[normalized] = entry_id

    return index


def build_regex_patterns(index):
    """
    Build compiled regex patterns for efficient matching.
    Groups patterns by length (longer patterns first to avoid partial matches).
    """
    # Sort by length descending so "proof of stake" matches before "stake"
    sorted_forms = sorted(index.keys(), key=len, reverse=True)

    # Build a single combined pattern with word boundaries
    # Escape each form for regex safety
    escaped = [re.escape(form) for form in sorted_forms]

    # Combine into one pattern (much faster than individual searches)
    combined = re.compile(
        r'\b(' + '|'.join(escaped) + r')\b',
        re.IGNORECASE
    )

    return combined, sorted_forms


def extract_source_text(file_path):
    """Read and clean a source file for term matching."""
    path = Path(file_path)
    if not path.exists():
        print("Error: file not found: %s" % file_path, file=sys.stderr)
        sys.exit(1)

    text = path.read_text(encoding="utf-8")

    # Strip frontmatter
    if text.startswith("---"):
        end = text.find("---", 3)
        if end != -1:
            text = text[end + 3:]

    # Strip code blocks (don't match terms inside code)
    text = re.sub(r'```[\s\S]*?```', ' ', text)
    text = re.sub(r'`[^`]+`', ' ', text)

    # Strip HTML/MDX tags
    text = re.sub(r'<[^>]+>', ' ', text)

    # Keep markdown link text, strip URLs
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)

    return text


def filter_glossary_for_source(source_text, index, pattern):
    """
    Find all glossary terms that appear in the source text.

    Returns: dict[entry_id] -> list of matched surface forms
    """
    matches = {}

    for match in pattern.finditer(source_text):
        surface_form = match.group(0).lower()
        if surface_form in index:
            entry_id = index[surface_form]
            if entry_id not in matches:
                matches[entry_id] = set()
            matches[entry_id].add(surface_form)

    # Convert sets to sorted lists
    return {k: sorted(v) for k, v in sorted(matches.items())}


def load_translation(lang_code, entry_id):
    """Load a single translation entry from per-language files."""
    lang_file = TRANSLATIONS_DIR / ("glossary-%s.json" % lang_code)
    if not lang_file.exists():
        return None

    with open(lang_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    return data.get(entry_id)


def format_rich(entry_id, glossary_entry, translation, matched_forms):
    """
    Format a glossary match as a rich object for LLM prompt injection.

    Returns a dict with enough context for Gemini to use the term correctly.
    """
    result = {
        "id": entry_id,
        "english": glossary_entry.get("term", entry_id),
        "matched_forms": matched_forms,
    }

    # Translation data
    if translation:
        result["translation"] = translation.get("term", "")

        # Aliases from the translation
        aliases = translation.get("aliases", [])
        if aliases:
            result["translation_aliases"] = aliases

        # Example sentence
        contexts = translation.get("contexts", {})
        if contexts and isinstance(contexts, dict):
            prose = contexts.get("prose", {})
            if isinstance(prose, dict) and "example" in prose:
                result["example"] = prose["example"]

        # Key morphological forms
        morph = translation.get("morphology", {})
        if morph and isinstance(morph, dict):
            rich_morph = {}
            if morph.get("verb") and isinstance(morph["verb"], dict):
                inf = morph["verb"].get("infinitive")
                if inf:
                    rich_morph["verb"] = inf
            if morph.get("noun") and isinstance(morph["noun"], dict):
                plural_or_singular = morph["noun"].get("singular")
                if plural_or_singular:
                    rich_morph["noun"] = plural_or_singular
            if morph.get("agent"):
                rich_morph["agent"] = morph["agent"]
            if rich_morph:
                result["morphology"] = rich_morph

        # Grammar notes
        grammar = translation.get("grammar", {})
        if grammar and isinstance(grammar, dict):
            if grammar.get("gender"):
                result["gender"] = grammar["gender"]

        # Translation notes
        notes = translation.get("notes")
        if notes:
            result["note"] = notes

    # English context for the translator
    translation_context = glossary_entry.get("translation_note", "")
    if translation_context:
        result["context"] = translation_context

    return result


def format_flat(entry_id, glossary_entry, translation):
    """
    Format as simple english -> translation string pair.
    """
    english = glossary_entry.get("term", entry_id)
    translated = ""
    if translation:
        translated = translation.get("term", english)
    return english, translated


def main():
    parser = argparse.ArgumentParser(description="Glossary lookup and filtering")
    parser.add_argument("--source", help="Source file to filter terms for")
    parser.add_argument("--lang", help="Target language code (e.g., ja, ar, fr)")
    parser.add_argument("--format", choices=["rich", "flat"], default="rich",
                        help="Output format: rich (full context) or flat (term pairs)")
    parser.add_argument("--dump-index", action="store_true",
                        help="Dump the full lookup index")
    parser.add_argument("--test", action="store_true",
                        help="Test mode: show matched terms without translations")
    parser.add_argument("--json", action="store_true",
                        help="Output as JSON instead of human-readable")
    args = parser.parse_args()

    # Load glossary
    with open(GLOSSARY_PATH, "r", encoding="utf-8") as f:
        glossary_data = json.load(f)

    terms = glossary_data.get("confirmed_terms", {})

    # Build index
    index = build_lookup_index(glossary_data)
    pattern, _ = build_regex_patterns(index)

    if args.dump_index:
        print("Lookup index: %d surface forms -> %d entries" % (
            len(index), len(set(index.values()))
        ))
        if args.json:
            print(json.dumps(index, indent=2))
        else:
            for form, entry_id in sorted(index.items()):
                print("  %-40s -> %s" % (form, entry_id))
        return

    if not args.source:
        parser.print_help()
        return

    # Extract and filter
    source_text = extract_source_text(args.source)
    matches = filter_glossary_for_source(source_text, index, pattern)

    matched_count = len(matches)
    total_terms = len(terms)

    if args.test:
        print("Matched %d/%d glossary terms in %s\n" % (
            matched_count, total_terms, args.source
        ))
        for entry_id, forms in matches.items():
            entry = terms.get(entry_id, {})
            term = entry.get("term", entry_id)
            cat = entry.get("category", "?")
            print("  %-35s [%s] (matched: %s)" % (term, cat, ", ".join(forms)))
        return

    if not args.lang:
        print("Error: --lang required for translation output", file=sys.stderr)
        sys.exit(1)

    # Build output
    if args.format == "rich":
        output = {
            "source_file": args.source,
            "language": args.lang,
            "matched_count": matched_count,
            "total_glossary_terms": total_terms,
            "entries": []
        }

        for entry_id, forms in matches.items():
            entry = terms.get(entry_id, {})
            translation = load_translation(args.lang, entry_id)
            rich = format_rich(entry_id, entry, translation, forms)
            output["entries"].append(rich)

        if args.json:
            print(json.dumps(output, indent=2, ensure_ascii=False))
        else:
            print("Glossary filter: %d/%d terms matched for %s -> %s\n" % (
                matched_count, total_terms, args.source, args.lang
            ))
            for entry in output["entries"]:
                print("  %s -> %s" % (entry["english"], entry.get("translation", "?")))
                if "example" in entry:
                    print("    example: %s" % entry["example"])
                if "note" in entry:
                    print("    note: %s" % entry["note"])

    elif args.format == "flat":
        flat_map = {}
        for entry_id, forms in matches.items():
            entry = terms.get(entry_id, {})
            translation = load_translation(args.lang, entry_id)
            eng, trans = format_flat(entry_id, entry, translation)
            flat_map[eng] = trans

        if args.json:
            output = {
                "source_file": args.source,
                "language": args.lang,
                "matched_count": matched_count,
                "terms": flat_map,
            }
            print(json.dumps(output, indent=2, ensure_ascii=False))
        else:
            print("Glossary filter: %d/%d terms matched\n" % (
                matched_count, total_terms
            ))
            for eng, trans in sorted(flat_map.items()):
                print("  %s -> %s" % (eng, trans))


if __name__ == "__main__":
    main()
