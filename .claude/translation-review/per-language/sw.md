# Swahili (sw) -- Translation Review Findings

## PR #18772 (community-stories.json, 2026-07-10) -- 9.1/10
- CRIT fixed: passive-voice agency reversal in story-casio: "benki zote zilikataliwa maombi yangu" (banks WERE denied) -> "benki zote zilikataa maombi yangu" (banks denied my applications). Passive constructions are an inversion vector -- check polarity of passive renderings on every sw import.
- WARN: "took for granted" -> "tulivichukulia poa" (considered them cool) weakens the idiom (story-yamille).

## PR #18937 -- 2026-07-29 -- Score 7.8/10 pre-fix
- **The regeneration fixed a translated code identifier that was live on dev:** `nonsi` -> `nonce` inside the code example whose own caption reads "Non-translatable text". Note the tension -- ETHGlossary sw maps `nonce -> nonsi`, but that entry governs prose; a verbatim code span must stay English. Do not "correct" it back.
- It also retired the two-names-for-the-Program problem logged previously, consolidating `Mpango wa Utafsiri` -> `Programu ya Kutafsiri` on the resources page. One split survives: translators-guide still says `Programu ya Utafsiri` twice, including in a cross-ref label pointing at the page that now uses the other name.
- **Word-sense errors fixed:** `kambi ya maarifa` ("knowledge camp") for "knowledge base" -> dev's `kumbukumbu ya maarifa`; `Mada` ("topics") where English means article *titles* -> `Vichwa` (heading + body + the capitalization bullet); and `wazungumzaji bilioni 6 wasiozungumza Kiingereza` ("6 billion speakers who do not speak English", self-contradictory) -> `watu bilioni 6`. The correct `bilioni 6` numeral fix that landed alongside it was preserved.
- **Concord error fixed:** `inafanya` -> `hufanya`; the subject is the KU-infinitive `Kutumia namna rasmi...`, and habitual `hu-` takes no subject concord.
- **UNRESOLVED, needs a native speaker:** the semicolon term at translators-guide L237. dev had `nuktapeta`, this run produced `nuktapindu`, and the reviewer's recollection was `nuktamkato` -- none verifiable against an authoritative source. Left as-is deliberately rather than guessed at on a punctuation-terminology page.
