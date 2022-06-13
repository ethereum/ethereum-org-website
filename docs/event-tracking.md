# Event tracking on ethereum.org

This is a guide how to prepare event tracking when creating a new page or redesigning an existing page.

Events are useful for measuring user engagement on the website. It's a great way to validate our design decisions and assumptions. We can create custom reports in Matomo to view events of specific URL. Events should be grouped by specific topic + position on the page. (Ex: L2 page external links, selected bridge, selected cex)

## What to measure?

Ideally, ask yourself what design decision/assumptions have been made on the page and should/could be validated by measured performance:

- clicks
- downloads
- Popup viewed
- Form field abandons
- Scrolling down a page

This data can be later used to decide whether a feature is being used or is underperforming.

# How to name events?

## Each event comprises of 4 hierarchical values:

1. Category (other events may share the same category if one feature has several actions)
2. Action
3. Label (optional)
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
