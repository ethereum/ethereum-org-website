# Ethereum.org deploy process {#ethereumorg-deploy-process}

Ethereum.org follows a [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow for managing and deploying the codebase.

## Release cadence {#release-cadence}

We release twice a week, on **Tuesday and Thursday at 14:00 UTC**. Each release is prepared, reviewed and shipped on the same day — a release is normally live within a couple of hours of being cut.

Releases are driven by the `Release` GitHub Actions workflow (`.github/workflows/weekly-release.yml`), which can also be triggered manually via `workflow_dispatch` if a release needs to go out off-schedule.

If a deploy PR from a previous run is still open when the next run fires, the new run **skips itself** and posts a note to Discord rather than stacking a second release on top. For example, if Tuesday's deploy PR is still open on Thursday, the Tuesday release remains pending and no Thursday release is prepared; the next release is deferred until that PR is closed.

## Deploy process {#deploy-process}

The typical workflow is as follows:

1. A branch is created off of the `dev` branch, and pull requests for the branch are created into `dev`
2. Pull requests are reviewed and merged into `dev`
3. On Tuesday and Thursday, the release workflow runs and:
   - Back-merges `master` → `staging` → `dev` so all three branches are in sync before anything is cut
   - Bumps the version on `dev` (`pnpm version`), creating the version commit and the `vX.Y.Z` tag
   - Merges `dev` into `staging` directly — at this point `staging` is the release candidate, and only release-blocking bugfixes should land on it
   - Publishes the [GitHub Release](https://github.com/ethereum/ethereum-org-website/releases) from the Release Drafter draft, after stripping automated/bot noise from the notes
   - Opens a `Deploy vX.Y.Z` pull request from `staging` into `master`
4. CI runs the extended suite on the deploy PR (build, e2e, Lighthouse, and Chromatic visual snapshots for both components and full pages), and an automated review checks the changes against the deploy preview and posts its summary as a PR comment
5. A maintainer then completes the remaining manual steps:
   - Accept or reject the Chromatic visual changes on both projects
   - Review the automated summary and the deploy preview
   - Approve and merge the deploy PR into `master`, which deploys to production
6. Progress and outcomes are posted to the release channel in Discord at each stage

Note that the `vX.Y.Z` tag is cut on `dev` during step 3, and the GitHub Release is published before the deploy PR merges. Merging into `master` is what puts the release live.

```
master  O - - - - - - - - - - - - - - - O

        |                             /

staging O - - - - - - - - - O - - - O

        |                 /          \

dev     O (tag) - O - - - - O - - O - O (tag)

          \       \        /      /

feature1    \   _  \ _ _ O     /

feature 2             \ _ _  O
```

## Production release gate {#production-release-gate}

Every `staging` to `master` deploy pull request must pass the `Release gate`
status check. This stable check aggregates the following CI jobs:

- Lint, type-check, and changed-English Markdown checks
- Unit tests
- The deterministic four-locale production build (`en`, `es`, `zh`, and `ar`)
- The critical Playwright E2E suite against the Netlify deploy preview

The weekly release workflow waits for both `Release gate` and
`netlify/ethereumorg/deploy-preview` before starting automated review. A skipped,
cancelled, timed-out, or failed aggregate job blocks the gate.

Repository administrators must configure the `master` branch ruleset to require
both status checks. The `Release gate` context becomes selectable only after this
workflow has run on at least one pull request into `master`. Do not enable an
"expected" check before the workflow change is present on the pull request's base
branch, or all release PRs will be blocked without a job able to report it.

### Failure diagnosis and human takeover {#failure-diagnosis-and-human-takeover}

1. Open the failed `Release gate` job. Its annotations identify every required
   job that did not finish successfully.
2. Inspect the underlying job. For E2E failures, download the
   `playwright-report` artifact and confirm the Netlify preview check succeeded.
   For build failures, search the build log for the first error rather than the
   final route summary.
3. Rerun a failed job once only when the failure is demonstrably transient. Code,
   content, and deterministic test failures require a release-blocking fix from a
   branch based on `staging`, followed by a back-merge into `dev`.
4. If automated release review fails, download the
   `review-release-execution-log` artifact from the weekly release run and leave
   the deploy PR open. CI may still be green, but the release remains unreviewed.
   A maintainer must run the checklist in `.claude/commands/review-release.md`,
   post the result on the PR, and complete the preview and Chromatic review
   manually. An automation failure is neither a release failure nor an approval,
   and must never be bypassed by merging with admin privileges.

### Rollback {#rollback}

Before merge, close or leave the deploy PR open and fix `staging`; do not reset or
force-push a shared release branch. The preparation workflow publishes the GitHub
Release before it creates the deploy PR, so an abandoned candidate also requires
an administrator to return that release to draft status and record why it was
withdrawn. Do not delete or move its tag.

After merge, an administrator may immediately republish the last known-good
Netlify production deploy to restore service. This is temporary mitigation: also
create a pull request into `master` that reverts the release merge, pass the
production release checks, merge it, and then merge `master` back into `staging`
and `dev`. Never force-push any of the three shared branches.

## Release blocking bugfix process {#release-blocking-bugfix-process}

Because a release ships the same day it is cut, the window for catching problems is the time between the deploy PR opening and it being merged. Anything found in that window that is serious enough to block the release is handled as follows:

1. Create an issue in GitHub documenting the bug
2. Triage the issue to a developer
3. Developer will create a branch off of `staging`
4. Work on bugfix
5. Create a pull request into `staging`
6. Merge into `staging` after review
7. Merge `staging` back into `dev` after the bugfix has been merged

Holding the deploy PR while a blocking fix lands is always an option — the next scheduled release is only a couple of days away, so letting a non-blocking bug ride to Tuesday or Thursday is usually cheaper than rushing a fix or a hotfix.

```
master O (tag) - - - - - - - - - - - - - - - - - - - O (tag)

        |                                         /

        |                bugfix O - O           /

        |                     /      \        /

staging O - - - - - - - - - O - - - - O - -  O

        |                 /                   \

dev     O - - - - O - - O - O - - - O - - - - - O
```

## Hotfix process {#hotfix-process}

In the event that a hotfix is found in production and needs to be addressed before the next release.

1. Create an issue in GitHub documenting the bug
2. Triage issue to a developer
3. Developer will create a branch off of `master`
4. Work on hotfix
5. Create a pull request into `master`
6. After review, merge the hotfix pull request into `master` and release into production
7. Merge `master` into `staging` and `dev` branches

Step 7 also happens automatically as part of the next scheduled release's back-merge, but doing it promptly keeps `dev` from drifting.

```
    hotfix O - - - O

         /           \

master  O - - - - - - - O (tag)

        |               |

staging O - - - - - - - O

        |               |

dev     O - - O - - - - O
```

## More about the QA process {#qa-process}

The main idea behind the community QA process is to focus on the [current release changelog](https://github.com/ethereum/ethereum-org-website/releases) and check that new features or fixes applied are working as expected. The deploy preview linked from the deploy PR is the right place to check — it is always built from the PR's head commit. Note that `staging.ethereum.org` lags the deploy PR by a full Netlify branch-deploy build, so shortly after a release is cut it still serves the previous one.

QA is not limited to the release window. Because releases go out twice a week, anything reported against `dev` or a deploy preview at any point in the week will typically ship within a few days.

If you find any bug, please report it on the [#website-bugs](https://discord.com/channels/714888181740339261/727898649006309377) Discord channel.
