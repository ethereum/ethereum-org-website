---
title: Adding Videos
description: The policy for adding videos to ethereum.org
lang: en
---

# Adding Videos {#adding-videos}

The [ethereum.org video gallery](/videos/) features videos about Ethereum and the Ethereum ecosystem from community creators and trusted sources. Anyone can suggest a video to be added.

## Listing policy {#listing-policy}

Ethereum.org is a neutral, educational resource. The video gallery is curated to:

- **Educate** users about Ethereum technology, ecosystem, and community
- **Remain accurate** in its technical content
- **Stay relevant** to the Ethereum community

The site does not list videos that primarily promote a specific product, token, or commercial service.

## Criteria for inclusion {#criteria-for-inclusion}

### Must-haves {#must-haves}

- **Ethereum-focused** – The video must be primarily about Ethereum, its technology, ecosystem, or community. Videos about general blockchain topics are acceptable only if they substantially support or relate to an educational page on the site, or reference Ethereum.
- **Educational value** – The video should teach viewers something about Ethereum, or celebrate the global Ethereum community. Promotional or marketing content will not be accepted.
- **Accurate information** – The technical content must be factually correct and up to date. Outdated videos about deprecated features may be removed.
- **Quality production** – The video should have reasonably clear audio and video quality.
- **Publicly available** – The video must be hosted on an open resource or accessible platform like YouTube, and be freely accessible without a paywall or sign-up requirement.

### Nice-to-haves {#nice-to-haves}

- **Has a transcript** – Videos with transcripts improve accessibility and SEO. If you don't have one, the ethereum.org team can help generate one.
- **From a credible source** – Content from established educators, researchers, and sources receives priority.
- **Timely and evergreen** – Content that remains relevant over time is preferred over time-sensitive material.

## How to add a video {#how-to-add-a-video}

### Option 1: Open an issue {#open-an-issue}

If you'd like to suggest a video but don't want to create the files yourself, open a GitHub issue with the video details and a contributor can help add it for you.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Suggest a video
</ButtonLink>

### Option 2: Open a pull request {#open-a-pull-request}

If you'd like to add the video yourself, follow these steps:

#### Step 1: Create the video file {#step-1}

Create a new directory and `index.md` file at:

```
public/content/videos/{your-video-slug}/index.md
```

The slug should be URL-safe, lowercase, and use hyphens (e.g., `blockchain-101-visual-demo`).

#### Step 2: Add frontmatter {#step-2}

Add the following YAML frontmatter to your `index.md`:

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**Field reference:**

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Video title |
| `description` | Yes | 1–3 sentence summary |
| `lang` | Yes | Always `en` for now |
| `youtubeId` | Yes | The YouTube video ID (from the URL after `v=`) |
| `uploadDate` | Yes | Original upload date in `YYYY-MM-DD` format |
| `duration` | Yes | Video length as `H:MM:SS` or `M:SS` |
| `educationLevel` | Yes | `beginner`, `intermediate`, or `advanced` |
| `topic` | Yes | Array of topic tags for gallery filtering |
| `format` | Yes | `explainer`, `presentation`, `interview`, `tutorial`, or `panel` |
| `author` | Yes | Creator or channel name |
| `breadcrumb` | No | Custom short label for breadcrumb navigation |
| `customThumbnailUrl` | No | Custom thumbnail URL (defaults to YouTube thumbnail) |

#### Step 3: Add a transcript (recommended) {#step-3}

Below the frontmatter `---`, add the video transcript in markdown format:

```markdown
---
title: "..."
# ... rest of frontmatter
---

A brief introduction to the video content.

### Section Title (0:00)

Transcript text for this section...

### Next Section (5:30)

More transcript text...
```

Use `###` headings with timestamps to mark major sections. This makes the transcript scannable and improves SEO.

If you don't have a transcript, you can leave the body empty and the team will generate one.

#### Step 4: Choose topic tags {#step-4}

Pick topic tags that match the existing categories used in the gallery. Current categories and their tags include:

- **How Ethereum Works**: `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **Network Upgrades**: `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **Roadmap & Priorities**: `roadmap-and-priorities`, `pbs`, `mev`
- **Scaling & Layer 2**: `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **Use Cases**: `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **Privacy & Security**: `privacy-and-security`, `privacy`, `authentication`
- **Community Stories**: `community-stories`, `contributing`, `translations`, `community`

To ensure your video appears in a gallery category shelf, include at least one category key tag (the bold name in kebab-case, e.g. `use-cases` or `scaling-and-layer-2`). Videos without a recognized category tag will only appear in the "All" view and search results.

You can also use new tags — they will be available for future category groupings.

#### Step 5: Submit your PR {#step-5}

Open a pull request with your changes to the `dev` branch. The team will review your submission and provide feedback.

## Maintenance {#maintenance}

Listed videos are routinely reviewed to ensure they:

- Still meet the listing criteria
- Contain accurate, up-to-date information
- Have working hosting/YouTube links

If you notice an issue with a listed video, [create an issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) or send an email to [website@ethereum.org](mailto:website@ethereum.org).

## Terms of use {#terms-of-use}

Please refer to ethereum.org's [terms of use](/terms-of-use/). Information on ethereum.org is provided solely for general information purposes.
