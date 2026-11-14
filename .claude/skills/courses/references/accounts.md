# Accounts and verified progress

Optional accounts on top of browser progress. Lessons stay open to everyone, signed in or not. Course Mastery needs an account, because it is the one thing an attestation vouches for.

## What the server can and can't vouch for

The repo is public, so lesson answers can't be secret, and the protection doesn't rely on them. It relies on what the server controls:

| Measure                                                                                                                                                                                                                                                                                                                                                                       | Where                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Course Mastery is graded by the server. The questions and options are public; which option is right is not (an encrypted key, see below).                                                                                                                                                                                                                                     | `src/lib/courses/server/exams.ts`    |
| Answers are saved without a verdict, in the server's shuffled order (going back to change one is allowed), at least `MIN_ANSWER_MS` (3s) apart. The whole check is graded at the end. A pass reveals each result, the right options and the explanations; a fail gives the score only, since naming the misses would hand the next attempt the answers by elimination.        | same                                 |
| `EXAM_ATTEMPTS_PER_DAY` (2) per course per calendar day in the learner's time zone (the browser sends it on every request; the account keeps the last one, `user.time_zone`), and no more than `EXAM_ATTEMPTS_PER_24H` (4) in any 24 hours, so switching zones can't stack days. Starting counts, so walking away mid-check buys no free look; an unfinished attempt resumes. | same                                 |
| A lesson counts as verified only with the token from its own start, used once, after `MIN_STEP_MS` per step. Widget answers run in the browser and aren't checked.                                                                                                                                                                                                            | `src/lib/courses/server/lessons.ts`  |
| Browser progress synced to the account is stored `verified: false`. It shows in the UI and never counts toward XP rankings or completion records.                                                                                                                                                                                                                             | `src/lib/courses/server/progress.ts` |
| A proof-of-work challenge (ALTCHA, self-hosted, about a second of compute) before any sign-in that can create an account. No per-IP limits: a school or office shares one address.                                                                                                                                                                                            | `src/lib/auth/challenge.ts`          |
| Completion records (planned, below) carry no economic value and live offchain. Anything claimable gets farmed by scripts, whatever the quiz design.                                                                                                                                                                                                                           | (planned)                            |

What it can't stop: someone looking answers up (roughly an open-book exam), sharing them, or running several accounts to learn the key. The aim is to make the trophy mean "completed the course and passed its check while signed in", not a proctored exam. The UI says "Completed", never "Certified".

## The answer key

`ExamStep` has no `correct`: the key is `{ [courseId]: { [questionId]: optionIds[] } }`, committed encrypted in `src/data/courses/exam-key.ts` (AES-256-GCM over gzipped JSON), so it ships in the same PR and deploy as the questions it answers. The server decrypts it with `LEARNER_EXAM_KEY_SECRET` (Functions scope, the same value in every context; also in each maintainer's `.env.local`). Without the secret, or with an empty key, Course Mastery shows as unavailable. Locally the plain JSON is `.learner-exam-key.json`, which is gitignored; anyone with the secret can recreate it with `decrypt`.

```bash
pnpm courses:exam-key check [file]    # key vs questions: every question answered, ids valid
pnpm courses:exam-key encrypt [file]  # JSON -> src/data/courses/exam-key.ts (commit it)
pnpm courses:exam-key decrypt         # committed key -> JSON on stdout
```

Adding or changing a mastery question means updating the key file, then `check` and `encrypt`, and committing `exam-key.ts` with the question change. The `strings.spec` key test runs wherever the secret or the key file exists. A leaked secret means a new one: re-encrypt and replace the env var. Answers committed in plain text before the key was encrypted are in git history; that's accepted (the explanations state the answers anyway).

## Accounts

Better Auth (MIT) with the SIWE and passkey plugins, Drizzle and postgres.js. Site-wide, not courses-only: `src/lib/auth/`, `src/lib/db/`, `app/api/auth/`, and the UI in `src/components/Account/` (strings in `component-account.json`). Another feature (quizzes, say) adds its own `quiz_*` tables referencing `user.id` and reuses the sign-in dialog.

- **Sign-in methods**: passkeys and wallets. A passkey can start an account (`registration.requireSession: false`). SIWE signs in by wallet and creates an account for a new one, so adding a backup wallet to a signed-in account is a custom endpoint (`/api/auth/wallet/link`, `wallet-linking.ts`). Backup passkeys use the plugin as-is. Removing the last method is refused.
- **Privacy**: no email or password; users get placeholder emails (`...@siwe.placeholder.invalid`, `...@passkey.placeholder.invalid`). Sessions store no IP address or user agent. Better Auth telemetry is off. Plain wallets are verified locally; smart accounts (ERC-1271) need an RPC call and only mainnet ones work.
- **Leaderboard**: opt-out (`user.showOnLeaderboard`, pre-checked at sign-up, a switch on the profile). Ranking is verified XP, under display names.
- **Display names** (`user.name`, `src/lib/auth/display-name.ts`): editable on the profile and shown in the course header and on the leaderboard. Defaults: a wallet account's address (stored whole, shown truncated), a passkey account's random short tag. 2-24 characters of letters, marks, numbers and `. _ ' -` in any script; nothing that reads as a link or email (a leaderboard is a scammer's billboard); nothing that passes for ethereum.org or its team. The server re-checks on `/update-user` and adds the `obscenity` word filter (English only), also on the name with spaces removed. A refusal's message is the problem code, which the client words.
- **Sign-in dialog**: opens on signing in (passkey, then wallet), with "Create an account" a link away; only creating shows the leaderboard choice. The profile's "Save to an account" opens on creating. A new wallet gets an account from either view, since SIWE can't tell them apart.
- **Progress sync** (`account-sync.ts`, `src/lib/courses/progress.ts`): besides the lesson and trophy rows, the account keeps the browser's whole progress record (`course_progress_state`: XP, streak, answer history), so a new browser starts where the last one stopped. Sync merges both ways with `mergeProgress`, on the server and in the browser alike: records join keeping the better or later of each, the streak extended last wins, and XP is the higher total plus whatever only the other copy has, so merging twice changes nothing. A signed-in page syncs once on load; after a lesson or exam the new record uploads (a page that hadn't synced yet, like a lesson, syncs then).
- **Whose progress**: synced progress is tagged with its account. Signing out clears it from the browser (it lives in the account); deleting the account keeps it as plain browser progress. Signing in to a different account replaces tagged progress instead of merging it, so one browser can't copy an account's progress into another. Untagged progress (from before signing in) joins whichever account signs in.
- **Profile**: shown with progress or an account, so a new account has a profile before its first lesson. `ethereum-org-course-account` in localStorage marks a signed-in browser for the pre-paint check, which can't read the session cookie. Signing out (or resetting with nothing left) goes to the hub.
- **Static pages**: course pages never read the session on the server. The browser reads it through `/api/auth/*`; a 404 there means the deploy has no database, and account UI hides.

## Planned: completion records

Not built; the profile shows "Coming soon". The idea: a downloadable, signed record for each course mastered while signed in, which anyone can verify without trusting the site. A draft (EIP-712 typed data `CourseCompletion { learner, course, score, passedAt }`, signed by a key used for nothing else, verified with any EIP-712 library such as viem's `verifyTypedData`) was removed before merge, because the key comes first. To decide before building it again:

- **Custody**: who generates and holds the signing key, and where it lives (a Netlify secret, or something stronger).
- **Publication**: where the signer's address is published so people can trust it: a page on ethereum.org, the repo, an ENS name.
- **Rotation and revocation**: what happens to existing records if the key changes or leaks.
- **Checking**: a way for anyone, not only developers, to verify a record.
- **Format**: plain EIP-712, or EAS-compatible offchain attestations.

The leaderboard is planned too ("Coming soon" on the profile): it opens once enough learners have joined for a ranking to mean something. `/api/courses/leaderboard` and the opt-out switch are in place for it.

## Databases per deploy

`pnpm learner-db:prepare` runs before `next build` on Netlify (`src/scripts/learner-db/prepare.ts`) and writes its decision to `.netlify/learner-db.json`, which `next.config.js` inlines:

| Deploy                                      | Database                                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Production; branch deploys `dev`, `staging` | their own, migrated at build; a failed migration fails the deploy                                             |
| Other branch deploys (`feat/*`...)          | none: they'd share dev's credentials and run unmerged migrations on it                                        |
| Deploy previews                             | `preview_<PR>`, created and migrated at build, when the PR touches learner code or has the `preview-db` label |
| Fork previews                               | none: the untrusted deploys policy strips the secrets                                                         |

`.github/workflows/learner-db-previews.yml` drops a preview's database when its PR closes, and sweeps daily for any left behind. Env vars and scopes: `.env.example`.

## Local

```bash
pnpm db:up && pnpm db:migrate   # Postgres 18 on port 5433 (LEARNER_DB_PORT)
pnpm db:reset                   # wipe and re-migrate
pnpm db:generate                # migration from a schema change
```

`auth-schema.ts` is generated: after changing the auth config, run `pnpm dlx auth@<better-auth version> generate` against a file exporting `auth = getAuth()`, then Prettier and `pnpm db:generate`.
