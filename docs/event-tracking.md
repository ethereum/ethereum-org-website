# Event tracking on ethereum.org

This is a guide on how to prepare event tracking when creating a new page or redesigning an existing page.

## What are events?

Events are user interactions on the application that cannot be tracked by standard pageviews within a session. We create custom code snippets in the application in order to trigger these events.

Events are useful for measuring user engagement on the website. Tracking events lets us know when users interact with elements and forms and can help us understand how successful users are at accomplishing their goals.

Event tracking is a great way to validate our design decisions and assumptions. We can create reports in Matomo to gather insights and improve our product.

[View the Matomo guide on event tracking](https://matomo.org/guide/reports/event-tracking/).

## How is event tracking implemented?

ethereum.org uses Matomo, an open-source alternative to Google Analytics that allows to protect user privacy by not sharing any analytics with third parties.

We implmented Matomo using the [JavaScript tracking client](https://developer.matomo.org/guides/tracking-javascript-guide) via the [`gatsby-matomo-plugin`](https://github.com/kremalicious/gatsby-plugin-matomo) Gatsby plugin.

## What to measure?

Ideally, ask yourself what design decision/assumptions have been made on the page and should/could be validated by measured performance:

- clicks
- downloads
- site searches
- popups viewed/dismissed
- form fields abandoned
- scroll behavior down a page

This data can be later used to decide whether a feature is being used or is underperforming.

It's helpful to ask yourself how the results of what we track and measure might influence our decision making. If measuring something won't help us make concrete product decisions, it's probably not worth tracking.

# How to name events?

Broadly, events should be grouped by specific topic (e.g. L2 page external links, selected bridge, selected cex).

## Each event comprises of 4 hierarchical values:

1. Category (other events may share the same category if one feature has several actions)
2. Action
3. Name (optional)
4. Value (optional, can be number or text)

## Category

Please consider the visual position on the page, when deciding on which events should be grouped together (under the same category). Ideally, all events related to one feature should be grouped together under the same category only if there is also a single position on the page where the event can be triggered. If in doubt, always use different category when a feature is repeated on the page.

Example:
Find wallets page redirects to external links (wallets) in two positions: A) through the main list of wallets B) Through a modal window with detailed info about a specific wallet. In this case we would like to have 2 separate categories for external links instead of one:

- Matomo list view
  - Category: WalletExternalLinkList
  - Action: Go to wallet
  - eventName: WalletName
  - Value: position
- Matomo modal view
  - Category: WalletExternalLinkModal
  - Action: Go to wallet
  - eventName: WalletName
  - Value: position

Such division allows to specifically identify where user clicked on the page, if all external links were under one category "ExternalLink", we would not be able to measure the performance difference between the list and the modal window.

## Hidden gem of tracking: Value

Can be used to get more info on the UX.

Examples:

- Use it to track the average position of clicked search result
- What terms are entered into search field
- Which option is chosen from a dropdown menu
- How many or what filters are applied when filtering list of wallets
