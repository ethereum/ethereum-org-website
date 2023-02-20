# Deploy and review process

This documentation outlines our current processes for how we deploy the latest changes to ethereum.org, and how we prioritize items in our review process.

## Deploy process

Anything merged into the `dev` branch of [ethereum.org](http://ethereum.org) will go live on ethereum.org at the next release. Currently, we deploy the latest changes to [ethereum.org](http://ethereum.org) twice per week (Monday and Thursday). When deploying, we merge the `dev` branch into the `master` branch. The `master` branch is the latest live version of [ethereum.org](https://ethereum.org).

Occasionally, we’ll also do a patch deploy to fix an urgent or widespread issue.

## Review process

### General review process

We use a first-in, first-out system for reviewing pull requests. The longer a pull request has been open, the higher priority it is for our team to review. In some cases—for example, fixing a high-priority issue or merging low-hanging fruit for a deploy—we will stray from this process and use our best judgement to get higher-impact changes deployed more quickly.

We aim to have every new PR merged or closed within 30 days of opening. As outlined in the following sections, different types of pull requests do have different levels of priority, and this may influence how promptly a pull request is acted on.

### Translations

Translation pull requests are considered high priority. These are when the translated and reviewed files from our translation management platform are submitted as a pull request. They are important to our core value of bringing Ethereum education to as many languages as possible. They also are the accumulation of months of work by translators and reviewers, and any delay to this already long process is undesirable.

**Timeline:** PRs should be merged within 1-4 days of opening (by the next release).

### Feature and bug fixes

Any new feature correlated to an approved issue or bug fix is high-priority. Similar to translators, code contributors dedicate a large amount of their time to improving [ethereum.org](http://ethereum.org) as a resource and addressing their efforts quickly is desirable. All bug fixes should be handled swiftly, but new features that were not discussed, requested or approved do not fall under this timeline.

**Timeline:** Features or bug fixes should be reviewed within 1-12 days. In the case of bugs, more severe bugs will be reviewed more promptly.

### Content

Content PRs are considered medium-priority. Depending on their content, they can be very high-impact but also a high effort to go through the various stages of content review to ensure the content meets the standards we aim for. Content PRs can be broken into two categories: major content (e.g. a new page) and minor content changes (e.g. a new section to an existing page). Typo or grammar fixes are considered separately.

**Timeline:** Major content should be merged within 15-30 days of opening. Minor content changes within 5-15 days of opening.

### Typographical and grammatical errors

Typographical and grammatical errors are medium-priority as small errors of this kind can have second-order ramifications for the linguists of the ~50 languages we currently translate to. Though technically a subgroup of ‘content PRs’, typos and grammar errors take significantly less time to review and, as a result, are treated differently.

**Timeline:** Typo or grammar pull requests should be merged within 1-8 days of opening.

### Adding products

Adding new products is currently a low-to-medium priority (depending on the type of product). These pull requests often take a long time to review as we must extensively research products to ensure we not sending our users to any dubious or unsafe products.

**Timeline:** PRs should be closed or merged within 30 days of opening.

### Adding tutorials

Adding new tutorials to [ethereum.org](http://ethereum.org) is currently low-priority. We are currently in the middle of an epic to revamp our tutorials. As part of this, we’ll be reviewing our existing tutorials, purging outdated or low-quality tutorials, and refining our listing criteria for future tutorials to meet our increased standards. Please always create an issue to discuss the usefulness of your proposed tutorial before opening a PR.

**Timeline:** PRs should be closed or merged within 30 days of opening.
