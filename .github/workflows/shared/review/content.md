# Lane: content

No `/code-review`. Check the changed lines for:

- Links: the target exists (internal pages and `#anchors`), and the destination matches what the link text promises — a "Docs" link should not land on a generic support page.
- Images referenced from markdown must be co-located and use `./` relative paths; absolute `/images/` paths break the MDX render.
- Factual errors, and sentences that are ambiguous or contradict another page on the site that states the same fact.

Report bar: factual errors, broken or misleading links, and broken rendering. Do not nitpick style or wording.
