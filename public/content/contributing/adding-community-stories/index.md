---
title: Adding Community Stories
description: How to submit a community story about your experience with Ethereum to ethereum.org
lang: en
---

# Adding community stories {#adding-community-stories}

## How to contribute a story {#how-to-contribute}

Community stories appear at [ethereum.org/stories/](/stories/) and highlight personal experiences with open-source and sanctuary technologies, how the Ethereum ecosystem has impacted people's lives, and how communities around the world use Ethereum. Anyone can suggest or submit a story.

There are three ways to contribute a story:

1. **Featured stories** - Full-length written stories published as their own page on the site.
2. **Short-form stories** - Brief testimonials displayed as cards on the stories landing page.
3. **Video stories** - Videos submitted through the [video gallery](/videos/) and featured on the stories page.

### Listing policy {#listing-policy}

Ethereum.org is a neutral, educational resource. The stories page is curated to:

- **Humanize** Ethereum's purpose and technology through genuine personal and community experiences
- **Highlight** how open-source and sanctuary technologies make a real difference in people's lives
- **Celebrate** the diversity of the global Ethereum community

The site does not list stories that primarily promote a specific product, token, or commercial service. All submissions are reviewed by the ethereum.org team.

### Criteria for inclusion {#criteria-for-inclusion}

#### Must-haves {#must-haves}

- **Real human story** - The story must describe a genuine personal or community experience. This can include your experiences with open-source and sanctuary technologies, how the Ethereum ecosystem has impacted your life, or how you and your community use Ethereum. Fictional, hypothetical, or purely technical content belongs in other sections (e.g., `/latest/` for technical builder landscape articles).
- **Ethereum connection** - The story must involve Ethereum, Ethereum-based applications (including L2s, stablecoins on Ethereum, dapps, etc.), or the broader open-source and sanctuary tech ecosystem in a meaningful way. General stories about crypto and blockchains, with no specific Ethereum focus, are not accepted.
- **Non-promotional** - The story should not primarily promote a specific product, token, company, or commercial service. Mentioning tools used is acceptable; framing the story as a product testimonial is not.
- **Appropriate content** - Stories must comply with ethereum.org's [code of conduct](/community/code-of-conduct/). Content that is hateful, misleading, or illegal will not be accepted.
- **English first** - Stories may be submitted in any [supported language](/contributing/translation-program/). Set the `lang` field to match the language the story is written in (e.g., `en` for English, `es` for Spanish). English submissions will be translated to other languages, and non-English submissions can be translated to English, through the [translation program](/contributing/translation-program/).

#### Nice-to-haves {#nice-to-haves}

- **Geographic and thematic diversity** - Stories from underrepresented regions and covering underrepresented use cases receive priority.
- **Multimedia** - Stories accompanied by video, audio, or photography are encouraged.
- **Open-source and sanctuary values** - Stories that illustrate how open-source or sanctuary technologies enable censorship resistance, open access, financial inclusion, privacy, or security are particularly valued.

### How to add a featured story {#how-to-add-featured-story}

#### Option 1: Submit via the intake form {#submit-via-intake-form}

The stories page includes a "Submit your story" CTA linking to the Paperform intake at `https://ethereumstory.paperform.co/`. This is the recommended path for community members who are not familiar with GitHub.

#### Option 2: Open a pull request {#open-a-pull-request}

1. **Create the story directory and file:**

   ```
   public/content/stories/{your-story-slug}/index.md
   ```

   The slug should be URL-safe, lowercase, and use hyphens (e.g., `escaping-dictatorship`).

2. **Add frontmatter:**

   ```yaml
   ---
   title: "Your Story Title"
   description: "A 1–2 sentence summary of the story."
   author: "Author Name"
   team: "Human Stories"
   tags:
     - "relevant-tag-1"
     - "relevant-tag-2"
   published: 2026-06-01
   image: /images/stories/your-story-image.png
   breadcrumb: Short Label
   lang: en
   ---
   ```

   **Field reference:**

   | Field | Required | Description |
   |---|---|---|
   | `title` | Yes | Story title |
   | `description` | Yes | 1–2 sentence summary |
   | `author` | Yes | Author or storyteller name |
   | `team` | Yes | Use `"Human Stories"` for community stories |
   | `tags` | Yes | Array of topic tags (e.g., `stablecoins`, `censorship resistance`, `donations`, `financial inclusion`) |
   | `published` | Yes | Publication date in `YYYY-MM-DD` format |
   | `image` | No | Path to story header image in `/public/images/stories/`, or site default will be used |
   | `breadcrumb` | Yes | Short label for breadcrumb navigation |
   | `lang` | Yes | Language code matching the language the story is written in (e.g., `en`, `es`, `zh`). See [supported languages](/contributing/translation-program/). |

3. **Write the story body:**
   - Use `## Heading {#heading-id}` format for all h2–h4 headings (required by markdownlint).
   - Write in a personal, narrative voice. First-person or third-person perspectives are both acceptable.
   - Focus on the human experience - why Ethereum or its open-source ecosystem mattered in this situation, what problem it solved, and what it meant to the people involved.

4. **Submit your PR** to the `dev` branch.

### How to add a short-form story {#how-to-add-short-form-story}

Short-form community stories and links to stories published on Twitter appear as cards on the `/stories/` landing page.

To add a new short-form story:

1. **Add an entry to the stories data file** (`src/data/tenYearStories.ts`). Each entry includes:
   - `name` - The storyteller's display name.
   - `country` - Country or region.
   - `storyEnglish` - The story text in English.
   - `storyOriginal` - (Optional) The story in the author's original language, if different from English.
   - `twitter` - (Optional) Link to the storyteller's Twitter/X profile.
   - `date` - Display date string.

2. **Submit your PR** to the `dev` branch.

### How to add a video story {#how-to-add-video-story}

Video stories are videos tagged with the `community-stories` category in the [video gallery](/videos/). To add one, follow the existing [adding videos](/contributing/adding-videos/) contribution guide and **include `community-stories` in the `topic` tags array**.

### Maintenance {#maintenance}

- Featured stories may be updated if factual details change.
- Short-form stories are reviewed for appropriateness and accuracy.
- The stories page automatically picks up new video entries tagged `community-stories`.
