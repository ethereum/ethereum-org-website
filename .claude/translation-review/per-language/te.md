# Telugu (te) Translation Review Findings

> **PR:** #18739 (intl/pending-privacy-page)
> **Date:** 2026-07-09
> **Quality Score:** 8.3/10 (pre-fix) -> ~9.5 (post-fix, semantic fidelity restored)
> **Files reviewed:** 1 (page-privacy.json, 71 keys)

## Critical (fixed)

- **Reported-speech negation inversion (known-patterns #26):** `page-privacy-targeting-example-1` -- "Uber says it does not use this to set fares" was rendered `...దీనిని ఉపయోగించమని Uber చెబుతోంది`, whose default parse via the `-మని` reported-directive suffix is "Uber says TO use this to set fares" (the opposite of the source). Fixed to `...దీనిని ఉపయోగించడం లేదని Uber చెబుతోంది` ("is not using"). In future te reviews, scrutinize any negated reported-speech / denial for this suffix collision.

## Clean / verified

- Ethereum correctly transliterated `ఎథీరియం` throughout (incl. locative `ఎథీరియంలో`). Glossary terms compliant: గోప్యత (privacy), మెటాడేటా (metadata), అనుమతి రహిత (permissionless), శూన్య-జ్ఞాన (zero-knowledge), గూఢలిపి శాస్త్రం (cryptography), నెట్‌వర్క్ (network).
- All named entities preserved/localized (FTC + US Federal Trade Commission gloss, Clearview AI, Uber, Orbitz, Mac, Google, WhoTracks.me, ICCL, ICE + full gloss, Norwegian Consumer Council, US Supreme Court). Statistics, rich-text tags, and `{value}` placeholder intact.
- Consistent formal మీరు register; no untranslated English, no cross-script contamination.
- Apart from the Uber sentence, semantics were faithful: nothing-to-hide framing, dynamic/surge pricing, medical-diagnosis aggregation, Orbitz/Mac, warrant vs open-market location data, and the crowd/anonymity-set argument all intact.
