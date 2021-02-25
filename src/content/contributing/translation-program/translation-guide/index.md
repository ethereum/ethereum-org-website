---
title: A guide to translating ethereum.org
lang: en
description: How to help with ethereum.org translations
sidebar: true
---

# Translating ethereum.org guide {#translating-ethereum-guide}

If you're new to the translation program and are hesitant to jump in, here are some FAQs that can help you begin. Use this guide to find answers to the most common queries.

## How do I translate strings with `<HTML tags>`? {#tags}

Not every string is written in pure text form. There are some strings that consist of mixed scripts like HTML tags (`<0>`, `</0>`).This is usually for hyperlinks or alternative styling in the middle of a sentence.

- Translate the text inside the tags but not the tags themselves. Anything in the `<` and `>` must not be translated or removed.
- To keep the string safe, we recommend that you click the "Copy Source" button on the bottom left. This will copy the original string and paste it into the text box. This lets you clarify where the tags are and helps you avoid mistakes.

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

You can move the position of the tags within the string to make it more natural in your language – just be sure to move the whole tag.

## Where do the strings live? {#strings}

Often the source strings alone might not be enough for you to provide an accurate translation.

- Take a look at "screenshots" and "context" for more information. In the source string section, you will see the screenshot image attached which will show you how we're using the string in context.
- If you are still unsure, raise a flag in the "comment section". [Not sure how to leave a comment?](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## How can I leave comments or ask questions? I would like to flag an issue or typos... {#comment}

If you want to raise a flag on a particular string that needs attention, feel free to submit a comment.

- Click the second button of the top-right bar. The hidden tab will appear on your right. Leave a new comment and click the "Issue" checkbox on the bottom. You can specify the type of issue by choosing one of the options from the drop-down menu.
- Once submitted, it will be reported to our team. We will fix the issue and let you know by replying to your comment and closing the issue.

![Showing how to make comments and issues](./comment-issue.png)

## What is Translation Memory (TM)? {#translation-memory}

Translation Memory (TM) is a feature of Crowdin that stores all the previously translated strings across [ethereum.org](http://ethereum.org/). When a string is translated, it is automatically saved into our project TM. This could be a useful tool to help you save your time!

- Look at the "TM and MT Suggestions" section and you will see how other translators translated the same or similar string. If you find a suggestion with a high matching rate, feel free to refer to the translation by clicking it.
- If there is nothing on the list, you can search the TM for previously made translations and reuse them for consistency.

![A screenshot of the translation memory](./translation-memory.png)

## How do I use the Crowdin glossary? {#glossary}

Ethereum terminology is another crucial part of our translation work as often new tech terms will not be localized in many languages yet. Also, there are terms that have different meanings in different contexts. [More on translating Ethereum terminology](#terminology)

The Crowdin glossary is the best place for clarification of terms and definitions. There are two ways to refer to the glossary.

- First, when you find an underlined term on the source string, you can mouse over and see a brief definition of it.

![An example glossary definition](./glossary-definition.png)

- Second, If you see a term that is not familiar to you but not underlined, you can search in the glossary tab (the third button of the right column). You will find explanations of specific terms and ones frequently used in the project.

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- If you still can't find it, it's your chance to add a new term! We encourage you to look it up on a search engine and add the description to the glossary. It will be of great help to other translators to better understand the term.

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### Terminology translation policy {#terminology}

_For names (brands, companies, people) and new tech terms (Eth2, beacon chain, etc.)_

Ethereum presents a lot of new terms that have been coined recently. Some terms will vary from translator to translator as there is no official translation in their respective language. Such inconsistencies can cause misunderstanding and decrease readability.

Due to the linguistic diversity and different standardizations in each language, it has been nearly impossible to come up with a unified terminology translation policy that can be adapted in all supported languages.

After careful consideration, we have reached the decision to leave the most frequently used terminology up to you, the translators.

Here is what we suggest, when you find a term that's unfamiliar to you:

- Refer to the [Glossary of terms](#glossary), you may find how other translators have previously translated it. If you think the previously translated term is not appropriate, feel free to restore your translation by adding a new term to Crowdin Glossary.
- If such a previous translation doesn't exist in the Glossary, we encourage you to look it up on a search engine or media article that shows how the term is actually used in your community.
- If you don't find any references at all, feel free to trust your intuition and suggest a new translation to your language!
- If you feel less confident to do so, leave the term untranslated. Sometimes, English terms are more than adequate in delivering accurate definitions.

We recommend you leave names of brands, companies, and personnel untranslated as a translation might cause unnecessary confusion and SEO difficulties.

## Get in touch {#contact}

Thank you for reading through all of these. We hope this helps you to onboard our program. Feel free to join our [Discord translation channel](https://discord.gg/TkJFaewsaM) to ask questions and collaborate with other translators!
