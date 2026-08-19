# Incident fixtures: run 31149083965

`src/intl/en/learn-quizzes.json` and `src/intl/ar/learn-quizzes.json` exactly as they
stood at commit `3c76f545357f4d2d02a6f906d4b647d531be7088` -- the tree the 2026-08-07
pipeline run checked out before spending $1,108 to translate 42KB of new text.

Vendored (gzipped, ~60KB total) rather than read from git history: CI checks out
shallow, so `git show` on a commit that old fails there. Snapshots on purpose -- they
must not track the live files.

Consumed by `../../cost-incident.spec.ts`.
