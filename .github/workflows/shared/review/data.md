# Lane: data

Run `/code-review` at **low** effort.

Then check these rules on the changed lines:

- `chainName` / `supported_chains` values match a `name` in `src/data/chains.ts` exactly.
- A new or edited entry has the same shape as its neighbors (fields, types, ordering).
- A new listing (wallet, exchange, L2, dapp) is a product decision: say so in the summary sentence.
