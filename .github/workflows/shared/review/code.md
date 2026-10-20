# Lane: code

Run `/code-review` at **medium** effort.

Then check these repo rules on the changed lines:

- Chain names match a `name` in `src/data/chains.ts` exactly ("OP Mainnet", not "Optimism").
- No unused variables or params; a bare `_` is the only allowed unused arg. The build fails on them.
- `numberFormat()` / `dateTimeFormat()` from `src/lib/utils` instead of raw `Intl.*` or `.toLocale*String()`.
- New component variants use `tailwind-variants` (`tv`).
- User-facing strings are translatable, not hard-coded English.
- RTL: logical classes (`text-start`, `ms-*`), not `text-left`, `ml-*`.

Do not report what lint, type-check or Prettier already catch.
