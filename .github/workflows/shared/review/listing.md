# Lane: listing

No `/code-review`. A request to list a third-party product, service or resource. The Listing Research workflow checks it against the listing policy, researches the product and posts its own "Listing check" comment, so don't judge the product, its eligibility or the policy criteria here, and don't add policy `claims`.

Check only what the diff shows:

- The entry has the same fields, format, ordering and placement as its neighbours.
- `grep` finds no existing listing of the same product or domain elsewhere in `public/content` (outside `translations/`) or `src/data`.
- No other open PR adds the same product.

End the summary with: "The listing policy check is posted separately."

Report bar: malformed or misplaced entries and duplicates.
