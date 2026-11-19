# Lane: content

No `/code-review`. Check the changed lines for:

- Links: internal pages and `#anchors` exist, and the destination matches what the link text promises — a "Docs" link should not land on a generic support page. The content checks only warn on dead added external links; report each dead one.
- English strings (`src/intl/en/**`): a renamed ICU argument shows the raw key in every locale until the Intl Pipeline re-translates it (`blocking` unless the same PR updates the locales); a renamed key or an edit to a value the PR didn't mean to change (quotes, whitespace) throws away 24 translations; a new key that duplicates an existing translated one should reuse it.
- Images referenced from markdown must be co-located and use `./` relative paths; absolute `/images/` paths break the MDX render.
- Factual errors, and sentences that are ambiguous or contradict another page on the site that states the same fact.

Report bar: factual errors, broken or misleading links, broken rendering, and string edits that break or discard translations. Do not nitpick style or wording.
