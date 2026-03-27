---
title: "Privacy is existential"
description: "Peter Van Valkenburgh of Coin Center makes the case at Devconnect that privacy is not merely a feature but an existential requirement for Ethereum's neutrality and trustlessness, drawing on legal battles over Tornado Cash, MEV, and validator liability."
lang: en
youtubeId: "GQML0c1_4Gs"
uploadDate: 2025-03-10
duration: "0:22:45"
educationLevel: intermediate
topic:
  - "privacy"
  - "security"
format: presentation
author: Devconnect
breadcrumb: "Privacy"
---

A presentation by **Peter Van Valkenburgh**, Executive Director of Coin Center, at Devconnect on why privacy is existential for Ethereum — tracing the legal history from ICO warnings through Tornado Cash sanctions to MEV and validator liability, and arguing that base-layer privacy is required for truly neutral infrastructure.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=GQML0c1_4Gs) published by Ethereum Foundation. It has been lightly edited for readability.*

### A decade of defending crypto (0:00)

A little over 9 years ago today, I stood on the stage in Shanghai at Ethereum's second DevCon and I warned about the dangers of doing ICOs. It was the leadoff presentation at the second DevCon. This was 2016, right at the start of the so-called ICO boom. That was long before Gary Gensler was at the SEC. It was before anyone had received a Wells notice. It was even before the DAO hack, which — if you remember or were around at the time — triggered the DAO report from the SEC and the beginning of their investigation and prosecution of people in crypto.

Three years ago, I stood on stage at Zcash's ZCon 3 and gave an impromptu speech about the Tornado Cash sanctions, which had just been announced that morning, and Alexey Pertsev's arrest in the Netherlands. Coin Center immediately analyzed the legality of those sanctions and concluded they were inappropriate.

The US is still mostly a country of laws, not men. The sanctions law — the International Emergency Economic Powers Act, or IEEPA — only allows the president to sanction people or the property of people. An immutable smart contract on the Ethereum blockchain, like the Tornado Cash pools, is neither. We sued the government, and ultimately our legal theories won in court. The administration removed the Tornado Cash sanctions. Americans can use the technology. And perhaps even more importantly, courts set a binding precedent that you can't use sanctions laws to tell Americans what software they can and cannot use.

### The fight continues (2:45)

But it's not all good news. The developers continue to fight for their liberty. We are supporting them with amicus briefings. Coin Center is also supporting a civil plaintiff — Michael Llewellyn, a software developer — who is suing the Department of Justice in a Texas court to get a declaratory judgment that publishing software for privacy is not a crime and does not require a license in the United States.

So, you may not know a lot about me or Coin Center, but hopefully you know that you should trust me when I raise an alarm — when an alarm is warranted. If we're going to succeed in building and maintaining free and open financial infrastructure, we need to tread carefully. And that's why I want to talk today about privacy.

### Privacy is existential for neutrality (3:30)

Privacy is not merely a feature. It is existential for the network's claim to neutrality and trustlessness. If every transaction is public, every validator can see the economic realities of the transactions they're processing. And this creates enormous legal liability.

The DOJ's larger gambit in the Perreira-Bueno case is that validators have legally enforceable duties to one another due to the public nature of the transactions they validate. If those duties are breached, validators should sue one another. And if they do not, the state — the Southern District of New York — should prosecute dishonest validators for crimes.

This doesn't just stop with wire fraud. If you can see a money-laundering transaction — or could have seen it using blockchain analysis — then how are you not complicit in that money laundering? If you build on a version of the chain that has sanctioned transactions in it, are you not complicit in sanctions evasion? If you put multi-billion-dollar fraudulent transactions into the ledger, maybe you should be made to roll them back.

### MEV and the case for base-layer privacy (14:50)

MEV — maximal extractable value — also has its genesis in a lack of privacy. It is the public nature of DEX transactions that allows them to be easily sandwiched by validators. It is much harder to sandwich transactions if you can't see their economic fundamentals.

But I don't just want base-layer privacy as a way to discourage MEV. I want it as a way to defend validators. Willful blindness is not a defense — you can't simply say that you decided not to use a widely available tool like chain analysis. Willfully ignoring all the knowledge inherent in the public blockchain may still lead to potential criminal charges.

Willful blindness is not a defense — but actual blindness is. If you really want trustlessness, if you truly want neutral infrastructure, if you want dumb pipes, then the pipes need to be actually blind to what flows through them.

### The SWIFT analogy (17:20)

A good criticism of all this: you might say, "Peter, we already have dumb pipes in the traditional financial system, and the operators of those dumb pipes are not cryptographically blind." The biggest of those pipes is called SWIFT.

In our amicus brief in defense of Roman Storm, we quoted: "The Society for Worldwide Interbank Financial Telecommunication — SWIFT — is a Belgian banking cooperative that helps banks across the world settle over $150 trillion in financial transactions each year. While SWIFT's tools are often used to move substantial amounts of money in violation of sanctions, they are nonetheless at pains to stress that they are not an obligated entity under US sanctions laws."

Responsibility for ensuring that individual financial transactions comply with sanctions lies with the financial institutions that actually process those transactions — not with the messaging infrastructure.

### A safe harbor for developers (27:50)

The single biggest policy goal Coin Center has had in its 10-year history is to create a safe harbor for software developers — like Roman Storm — saying you're not going to be prosecuted for unlicensed money transmission if you didn't actually control people's money. If you just made software that other people used to move money for themselves, that's the safe harbor. We got it passed in the House. We've got to pass it in the Senate and lock it down.

**Moderator:** What is something you wish more people knew about what you do?

**Peter Van Valkenburgh:** I'm just glad for people to learn about our mission. Our mission is to defend the freedom to innovate using open blockchain technologies and the ability for people to use these technologies privately. If that's a mission you care about, please visit coincenter.org. We are a donor-funded nonprofit, and we rely on the goodwill of people who believe in our mission. Thank you for listening to my talk on neutrality.

**Moderator:** Thank you so much, Peter.
