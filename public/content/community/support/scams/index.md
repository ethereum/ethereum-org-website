---
title: Scam help & reporting
description: What to do if you have been scammed, how to secure your remaining assets, and where to report fraud.
lang: en
---

# I was scammed or lost funds {#scam-help}

Cryptocurrency scams target people of all experience levels, including professionals in finance and technology. You are not alone, and being here is the right first step.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**No one can reverse blockchain transactions.** If someone contacts you claiming they can recover your funds for a fee, that is almost certainly a second scam. See [recovery scams](#recovery-scams) below.

</AlertDescription>
</AlertContent>
</Alert>

## Secure your remaining assets {#secure-assets}

If you interacted with a scammer or suspect your wallet is compromised, take these steps immediately:

1. **Move remaining funds** to a new, secure wallet that the scammer does not have access to
2. **Revoke token approvals.** Scammers often trick you into approving unlimited token spending. Revoking these permissions prevents further draining of your wallet
3. **Change passwords** on any exchange accounts that may be linked
4. **Enable two-factor authentication (2FA)** on all crypto-related accounts

### How to revoke token approvals {#revoke-approvals}

When you interact with a dapp or smart contract, you may have granted it permission to spend your tokens. If a scammer tricked you into approving a malicious contract, they can continue draining your tokens even after the initial scam.

Use these tools to check and revoke approvals:

- [Revoke.cash](https://revoke.cash/): connect your wallet to see all active approvals and revoke them
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): check and revoke approvals via Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Step-by-step guide: How to revoke token access
</DocLink>

## Report scam addresses and websites {#report}

Reporting helps warn other users and may assist law enforcement investigations. Document everything: transaction hashes, wallet addresses, screenshots, and any communication with the scammer.

### Report a scam address {#report-address}

- [Chainabuse](https://www.chainabuse.com/): community-driven scam and fraud reporting database. Submit reports and search for known scam addresses
- [Etherscan report](https://info.etherscan.com/report-address/): flag an address on the most-used Ethereum block explorer
- [CryptoScamDB](https://cryptoscamdb.org/): open-source database tracking cryptocurrency scams

### Report a scam website or social media account {#report-website}

- [PhishTank](https://phishtank.org/): submit and verify phishing URLs
- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_phish/): report phishing sites to Google so they get blocked in Chrome and other browsers
- [Netcraft](https://report.netcraft.com/report/mistake): report malicious and fraudulent websites
- Report directly on the social media platform where the scam occurred (Twitter/X, Discord, Telegram all have reporting features)

### Report to law enforcement {#report-law-enforcement}

- **United States:** [FBI Internet Crime Complaint Center (IC3)](https://www.ic3.gov/)
- **United Kingdom:** [Action Fraud](https://www.actionfraud.police.uk/)
- **European Union:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Other countries:** file a report with your local police. Cryptocurrency fraud is a crime in most jurisdictions

## Analyze what happened {#analyze}

Understanding where your funds went can help with reports and may support recovery efforts if the funds land on a centralized exchange.

- [Etherscan](https://etherscan.io/): look up any transaction hash or wallet address to see where funds were sent
- [Chainabuse lookup](https://www.chainabuse.com/): check if an address has already been reported by other victims
- [MetaSleuth](https://metasleuth.io/) by BlockSec: visual transaction tracing tool that maps fund flows
- [Breadcrumbs](https://www.breadcrumbs.app/): blockchain investigation and fund tracing tool

**If funds were sent to a centralized exchange** (like Coinbase, Binance, Kraken), contact their support team immediately with the transaction details. Exchanges can sometimes freeze accounts flagged for fraud.

## The hard truth {#hard-truth}

Because Ethereum is decentralized, no central authority can reverse transactions or recover stolen funds. Once a transaction is confirmed on the blockchain, it is final.

Reporting is still valuable. Reports help law enforcement track organized fraud rings, and flagging addresses on Chainabuse and Etherscan warns future potential victims.

## Types of scams to watch for {#scam-types}

<ExpandableCard
title="Giveaway and airdrop scams"
contentPreview="No one is giving away free ETH. These offers are always scams."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

Scammers create fake giveaways promising to multiply your ETH or give you free tokens. They often impersonate well-known figures like Vitalik Buterin. If you send ETH to a "giveaway" address, you will not receive anything back.

**Remember:** Vitalik and other prominent figures will never ask you to send them ETH.

[More on common scams](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Impersonation and fake support"
contentPreview="No one from Ethereum or ethereum.org will ever contact you first."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

Scammers impersonate Ethereum team members, moderators, or support agents on Discord, Telegram, and social media. They may send you direct messages offering help or claiming there is a problem with your account.

**Remember:**

- There is no "Ethereum support team"
- Real moderators will never DM you first
- Never share your seed phrase or private keys with anyone, for any reason
- Never click links sent in unsolicited messages

</ExpandableCard>

<ExpandableCard
title="Recovery scams"
contentPreview="After being scammed, watch out for fake 'crypto recovery experts.'"
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Recovery scams specifically target people who have already lost funds. Scammers monitor social media for people talking about being scammed, then reach out posing as "blockchain investigators" or "crypto recovery experts."

They promise to trace and recover your stolen crypto for an upfront fee. After you pay, they disappear.

**No legitimate service can reverse blockchain transactions.** Anyone promising this is lying. This is one of the most common follow-up scams.

</ExpandableCard>

<ExpandableCard
title="Phishing websites and fake apps"
contentPreview="Scam sites mimic real wallets and exchanges to steal your credentials."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

Phishing sites look identical to real wallet apps, exchanges, or DeFi platforms. They trick you into entering your seed phrase or connecting your wallet, then drain your funds.

**Protect yourself:**

- Always verify the URL before connecting your wallet
- Bookmark the official sites you use regularly
- Never enter your seed phrase on any website. Legitimate apps never ask for it
- Use [PhishTank](https://phishtank.org/) to check suspicious URLs

<DocLink href="/guides/how-to-id-scam-tokens/">
  How to identify scam tokens
</DocLink>

</ExpandableCard>

<DocLink href="/security/">
  Full guide to Ethereum security and scam prevention
</DocLink>
