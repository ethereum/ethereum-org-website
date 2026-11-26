# Lane: listing

No `/code-review`. A request to list a third-party product, service or resource. If the PR doesn't add one, say so and skip this lane.

**Without saved research** (`/tmp/gh-aw/agent/listing/` is missing): check only duplicates (`grep` `public/content` outside `translations/`, and `src/data`) and the entry's format, leave the listing fields empty, and route with `needs product review 🕵️`. Everything you submit is public: no verdict on listing the product.

**With saved research**, follow the "Listing research" instructions in your prompt for the listing fields of `submit_review`. When a referenced issue in `pr.json` already has a check (`issues[].research`) from the last 30 days for the same site, reuse it as those instructions say, and state in `summary` that the product was researched in that issue.

**The entry itself.** Problems in the added text are normal findings at `pr-head` lines, citing your evidence: inaccurate, miscredited, duplicated, promotional, or unlike its neighbouring entries. The `fix` is a plain-text rewrite or removal, with no links or URLs (they are redacted in transit and break the text). Route with `needs product review 🕵️`.
