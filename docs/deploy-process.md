# Ethereum.org deploy process {#ethereumorg-deploy-process}

Ethereum.org follows a [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow for managing and deploying the codebase.

## Deploy process {#deploy-process}

The current process for deployment involves a 2-day QA cycle to test a release candidate. A release candidate is created on Tuesday, will have 2 days of testing, and then released to production on Thursday assuming no blocking bugs are found.

The typical workflow is as follows:

1. A branch is created off of the `dev` branch, and pull requests for the branch are created into `dev`
2. Pull requests are reviewed and merged into `dev`
3. On Tuesday, a pull request is created into the `staging` branch
   - At this point, the `staging` branch will be the release candidate. At this point, no new features are added into staging for the release, only release blocking bugfixes.
4. During the next 2 days (Tuesday - Thursday) QA testing on the release candidate takes place
   - During QA testing, any bugs found will be filed under two categories:
     - Release blocking: if a bug is considered blocking for the release, create an issue and triage for a pull request to fix before release
     - Non-release blocking: if a bug is not blocking a release, create an issue and triage normally
5. If any release blocking bugfixes are merged into `staging`, bring those changes into `dev`
6. When a release candidate is ready for release, merge into `master` and deploy to production on Thursday
7. Create a tag for the new version in master
8. Merge the tag into `staging` and `dev`

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
4. If automated release review fails, leave the deploy PR open and treat it as
   unreviewed. A maintainer must run the checklist in
   `.claude/commands/review-release.md`, post the result on the PR, and complete
   the preview and Chromatic review manually. The automation failure is not an
   approval and must never be bypassed by merging with admin privileges.

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

In the event that a bug was found in `staging` during the QA cycle that blocks a release, the following steps will take place to address the bug:

1. Create an issue in GitHub documenting the bug
2. Triage the issue to a developer
3. Developer will create a branch off of `staging`
4. Work on bugfix
5. Create a pull request into `staging`
6. Merge into `staging` after review
7. Merge `staging` back into `dev` after the bugfix has been merged

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

```
    hotfix O - - - O

         /           \

master  O - - - - - - - O (tag)

        |               |

staging O - - - - - - - O

        |               |

dev     O - - O - - - - O
```

## More about the Release Candidate QA process {#release-candidate-qa-process}

The main idea behind the community QA process is to focus on the [current release changelog](https://github.com/ethereum/ethereum-org-website/releases) and check that new features or fixes applied are working as expected. During QA sessions, some notes could also be shared if we're looking for specific things to be tested.

If you find any bug, please report it on the [#website-bugs](https://discord.com/channels/714888181740339261/727898649006309377) Discord channel.
