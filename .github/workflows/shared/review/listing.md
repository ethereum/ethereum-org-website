# Lane: listing

No `/code-review`. A request to list a third-party product, service or resource. If the PR doesn't add one (e.g. it only fixes an existing entry), say so and skip this lane's checks.

Check only what the diff shows:

- `grep` finds no existing listing of the same product or domain elsewhere in `public/content` (outside `translations/`) or `src/data`.
- A misplaced or out-of-order entry is at most a `nit`.

Don't judge the product, its eligibility or the listing policy, and don't add policy `claims`. If `listing.txt` says `yes`, the Listing Research workflow posts its own "Listing check": end the summary with "The listing policy check is posted separately." Otherwise say in the summary that the listing is a product decision and route it with `needs product review 🕵️`.

Report bar: malformed entries and duplicates.
