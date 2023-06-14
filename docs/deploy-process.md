# Ethereum.org deploy process

Ethereum.org follows a [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow for managing and deploying the codebase.

## Deploy process

The current process for deployment involves a 2-day QA cycle to test a release candidate. A release candidate is created on Tuesday, will have 2 days of testing, and then released to production on Thursday assuming no blocking bugs are found.

The typical workflow will be as follows:

1. A branch is created off of the `dev` branch, and pull requests for the branch are created into `dev`
2. Pull requests are reviewed, and merged into `dev`
3. On Tuesday, a pull request is created into the `staging` branch
   - At this point, the `staging` branch will be the release candidate. At this point, no new features are added into staging for the release, only release blocking bugfixes.
4. During the next 2 days (Tuesday - Thursday) QA testing on the release candidate takes place
   - During QA testing, any bugs found will be filed under two categories:
     - Release blocking: if a bug is considered blocking for the release, create an issue and triage for a pull request to fix before release
     - Non-release blocking: if a bug is not blocking a release, create an issue and triage normally
5. If any release blocking bugfixes are merged into `staging`, bring those changes into `dev`
6. When a release candidate is ready for release, merge into `master` and deploy to production on Thursday
7. Create a tag for the new version in master
8. Merge tag into `staging` and `dev`

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

In the event that a bug was found in `staging` during the QA cycle that blocks a release, the following steps will take place to address the bug:

1. Create an issue in GitHub documenting the bug
2. Triage issue to a developer
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

## Hotfix process

In the event that a hotfix is found in production and needs to be addressed before the next release

1. Create an issue in GitHub documenting the bug
2. Triage issue to a developer
3. Developer will create a branch off of `master`
4. Work on hotfix
5. Create a pull request into `master`
6. After review, merge hotfix pull request into `master` and release into production
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
