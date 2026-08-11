# Ethereum.org deploy process

Ethereum.org follows a [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow for managing and deploying the codebase.

## Release cadence

We release twice a week, on **Tuesday and Thursday at 14:00 UTC**. Each release is prepared, reviewed and shipped on the same day — a release is normally live within a couple of hours of being cut.

Releases are driven by the `Release` GitHub Actions workflow (`.github/workflows/weekly-release.yml`), which can also be triggered manually via `workflow_dispatch` if a release needs to go out off-schedule.

If a deploy PR from a previous run is still open when the next run fires, the new run **skips itself** and posts a note to Discord rather than stacking a second release on top. In practice that means an unmerged Tuesday release pushes its contents into the Thursday one.

## Deploy process

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
master  O (tag) - - - - - - - - - - - - O (tag)

        |                             /

staging O - - - - - - - - - O - - - O

        |                 /          \

dev     O - - - - O - - - - O - - O - O

          \       \        /      /

feature1    \   _  \ _ _ O     /

feature 2             \ _ _  O
```

## Release blocking bugfix process

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

## Hotfix process

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

## More about the QA process

The main idea behind the community QA process is to focus on the [current release changelog](https://github.com/ethereum/ethereum-org-website/releases) and check that new features or fixes applied are working as expected. The deploy preview linked from the deploy PR is the right place to check — it is always built from the PR's head commit. Note that `staging.ethereum.org` lags the deploy PR by a full Netlify branch-deploy build, so shortly after a release is cut it still serves the previous one.

QA is not limited to the release window. Because releases go out twice a week, anything reported against `dev` or a deploy preview at any point in the week will typically ship within a few days.

If you find any bug, please report it on the [#website-bugs](https://discord.com/channels/714888181740339261/727898649006309377) Discord channel.
