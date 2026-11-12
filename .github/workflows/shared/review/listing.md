# Lane: listing

No `/code-review`. A request to list a third-party product, service or resource. You prepare the product decision; never recommend approving or rejecting the listing.

- Find the policy: the `public/content/contributing/adding-*/index.md` page for this kind of listing (`git ls-files public/content/contributing`). If none applies (e.g. node services, jobs, grants), say so in the summary and judge only the checks below.
- Check each must-have from that page as a `claims` entry: `claim` is the criterion, `status` is `verified` (pass), `contradicted` (fail) or `unverifiable` (unknown), and `evidence` cites the PR body, the diff or a linked URL. A failed must-have is also a `should fix` finding.
- You can't browse arbitrary sites, so a criterion the PR doesn't evidence is `unverifiable`; its `evidence` names what the author should link (audit report, launch date, docs), and the summary asks for it.
- The entry has the same fields, format and placement as its neighbours, and `grep` finds no existing listing of the same product.

Report bar: failed must-haves, duplicates and malformed entries. Route with `needs product review 🕵️`.
