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

## PR #18937 -- 2026-07-29 -- Score 6.8/10 pre-fix (weakest of the 24)
- **Program renamed unilaterally on one page of four.** The regeneration switched `అనువాద ప్రోగ్రామ్` -> `అనువాద కార్యక్రమం` across the program page (16 occurrences) while resources, translators-guide and playbook all kept `ప్రోగ్రామ్`, and the translators-guide cross-ref label `[అనువాద ప్రోగ్రామ్ స్థితి]` stopped matching the heading it points at. Reverted to `ప్రోగ్రామ్` (15 lines, 6 of them inflected). Note `ప్రోగ్రామ్` is an unassimilated loanword that never takes the Telugu neuter `-ం` nominative, so it needs no stem reduction before a following noun -- `ప్రోగ్రామ్ స్థితి` is correct as-is, and the `కార్యక్రమ` compounding problem dissolves with the revert.
- **Garbled sentence, fixed:** `మొదలైన` ("such as") had reattached to an inserted `పేజీలో`, so the metadata examples modified "pages" instead of "metadata". Fixed with the adjectival locative `పేజీలోని`, which also restores the English "metadata on the page" nuance that dev's line had dropped.
- **Instruction-level semantic error, fixed:** grammatical "imperative" rendered as `అత్యవసరంగా` ("urgent"), i.e. "button translations should be urgent". Now `ఆజ్ఞార్థకంగా`.
- Left for follow-up: `నవీకరణలు`/`అప్‌డేట్‌లు`/`అప్‌డేట్` three-way split for "updates" on the resources page, and `Proz term search` left in English where id/vi/sw all localize it.
- Watch item for future te patches: inflected forms carry ZWNJ (U+200C) invisibly -- `ప్రోగ్రామ్‌లో`, `‌కు`, `‌ను`, `‌లను`. Copy lines verbatim, never retype. See known-patterns #36.
