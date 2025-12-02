# Contributing without a local environment

This document describes how to make small contributions to ethereum.org **only using the GitHub web UI**, without cloning the repository or running the site locally.

This workflow is useful for:

- Fixing typos, grammar, or broken links
- Improving explanations in existing docs
- Adding or updating small pieces of content
- Updating internal documentation files in the `docs/` directory

For larger changes (new pages, refactors, or code changes), we still recommend setting up a local environment as described in the main README and CONTRIBUTING.md for this repo.

## When this workflow is appropriate

Use the web-only workflow when:

- Your change is limited to **Markdown or text files**
- You don't need to run tests or `pnpm dev` locally
- The change is small and easy to review in a single pull request (PR)

Avoid this workflow when:

- You are changing TypeScript/React components in `src/` or `app/`
- You are touching configuration files (e.g. `next.config.js`, `tailwind.config.ts`, `package.json`)
- Your PR includes many files or wide content changes

In those cases, please follow the standard local setup described in the repository README.

## Step-by-step: editing a file via GitHub

1. Open the file you want to edit in the `ethereum/ethereum-org-website` repository.
2. Click the pencil icon (**Edit this file**) in the top-right corner of the file view.
3. Make your changes directly in the GitHub editor.
4. Scroll down to the **Commit changes** section:
   - Write a short, descriptive commit message (e.g. `Fix typo in nodes and clients docs`).
   - Optionally add a longer description explaining what you changed and why.
5. Choose **“Commit directly to this branch”** (or create a new branch if you are working from your fork).
6. Click **Commit changes**.

After that, you can open a pull request to the upstream `ethereum/ethereum-org-website` repo targeting the `dev` branch.

## Step-by-step: creating a new Markdown file

To add a new documentation file (for example, in the `docs/` directory):

1. Navigate to the folder where the file should live (e.g. `docs/`).
2. Click **Add file → Create new file**.
3. Enter a file name, such as `docs/my-new-guide.md` or `my-new-guide.md` if you are already inside the `docs/` folder.
4. Paste your Markdown content into the editor.
5. Write a short commit message describing the change.
6. Commit to your feature branch.
7. Open a pull request to the upstream `dev` branch.

For content that appears on ethereum.org (not just internal docs), we usually keep Markdown files under `public/content/` and follow the structure explained in `docs/best-practices.md`. This document is meant to complement that guide, not replace it.

## Tips for safe web-only contributions

- Prefer **small, focused PRs** that do one thing well.
- Double-check that you didn't accidentally edit unrelated lines when using the web editor.
- Use the **Preview** tab in the GitHub editor to verify Markdown formatting.
- If you are unsure whether a change is appropriate, open an issue first and ask for feedback.
- Always link your PR to the issue it solves when possible (for example: `Fixes #1234` in the PR description).

## Limitations of the web-only workflow

Editing via GitHub is convenient but has limitations:

- You cannot run the site locally to verify complex UI changes.
- You cannot run automated tests before pushing changes.
- Large refactors are harder to review and reason about.

For frequent contributors or more complex work, we recommend switching to a full local development environment using `pnpm`, as documented in the main repository README.
