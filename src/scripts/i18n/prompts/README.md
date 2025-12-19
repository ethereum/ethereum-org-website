# Translation Prompt Modules

This folder contains modular prompt segments for AI-powered translation workflows. Prompts are composed dynamically based on file paths and target languages.

## Architecture

```
prompts/
├── segments/           # Individual prompt modules (named by purpose)
│   ├── base.md         # Role definition, critical rules, consistency
│   ├── terminology.md  # Glossary usage, compound terms
│   ├── tone-formal.md  # Formal address (T-V: usted/Sie/vous)
│   ├── tone-informal.md # Informal address (T-V: tú/du/tu)
│   ├── formatting.md   # Unicode CLDR, tags, placeholders, technical content
│   └── crowdin.md      # Crowdin-specific: JSON escaping, TM handling
├── prompt-routing.json # Maps file paths → required segments
└── README.md           # This file
```

## How It Works

1. **Segments are named by purpose**, not by the files they affect
2. **Routing config** maps file path patterns to tone segments
3. **Prompt composer** assembles segments + glossary for each job
4. **Ephemeral prompts** are created in Crowdin per (language, tone) combination

## Segment Composition

For each translation job, segments are composed in this order:

1. `base.md` - Always included first (role, critical rules)
2. `terminology.md` - Always included (glossary handling)
3. `formatting.md` - Always included (technical content, tags)
4. `tone-*.md` - One tone segment based on routing config
5. `crowdin.md` - Only for Crowdin jobs (excluded for Gemini JSX translation)
6. **Glossary appendix** - Language-specific terms from EthGlossary

## Routing Rules

The `prompt-routing.json` file defines which tone segment applies to which paths:

```json
{
  "routes": [
    { "patterns": ["/developers/docs/**"], "segments": ["tone-formal"] },
    { "patterns": ["**"], "segments": ["tone-informal"] }
  ],
  "baseSegments": ["base", "terminology", "formatting"],
  "crowdinOnlySegments": ["crowdin"]
}
```

- Routes are evaluated in order; first match wins
- `patterns` is an array, allowing multiple patterns per route
- Paths are normalized: `public/content` and `src/intl/en` prefixes are stripped automatically
- Use simplified paths like `/developers/docs/**` instead of full paths

## Adding New Segments

1. Create a new `.md` file in `segments/`
2. Name it by its purpose (e.g., `tone-technical.md`, `audience-beginner.md`)
3. Update `prompt-routing.json` to reference the new segment
4. Segments should be self-contained and not assume other segment content

## Glossary Integration

The glossary is appended dynamically at runtime:

```markdown
## GLOSSARY (Community-Approved Translations)

Use these exact translations. When a term appears in compounds or phrases,
use the glossary translation as the base component.

| English | Translation |
|---------|-------------|
| staking | staking |
| validator | validador |
...
```

## Testing Changes

Run with `VERBOSE=true` to log the full composed prompt:

```bash
VERBOSE=true pnpm run i18n:translate
```
