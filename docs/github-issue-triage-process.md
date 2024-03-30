# GitHub issue triage process

This documentation outlines the current process for how issues are triaged for the ethereum.org GitHub repository.

## Issue creation process

Whenever a new issue is opened, it will automatically be labeled with a `needs triage 📥` label. The `needs triage 📥` label means that the core team needs to look at the issue, and nobody should work on it yet to avoid unnecessary work. This label will be removed after the issue has been triaged by a core contributor.

## Triage process

The core team will review issues with the `needs triage 📥` label within 5 days. In order for an issue to be considered triaged, one of the following will need to happen:

1. The issue will be closed if it is not needed, a duplicate, or spam.
2. If an issue needs more discussion, the `GH grooming` tag will be added, and the issue will be discussed next GitHub grooming. After this call, action items will be recorded and the issue will be considered triaged.
3. The issue is labeled with the appropriate tags for work needed (ex: `design required`, `dev required`, etc.) and open it up for assignment. More on this below.

After an issue has been triaged, the `needs triage 📥` label will be removed from the issue.

## Assignment process

After an issue has been triaged, it is ready to be assigned to someone to work on. Priority for assignment will be given in the following order:

1. A core team member
2. The person who opened the issue if they want to be assigned
3. Anyone in the community. A `help-wanted` tag will be added to the issue in this case.
