---
title: "Surveillance, silence, and reclaiming privacy"
description: "Naomi Brockwell delivers a keynote at Devcon SEA on the erosion of digital privacy, the infrastructure of mass surveillance, and practical tools everyone can use to reclaim their right to privacy."
lang: en
youtubeId: "nvJSFR1Q_JE"
uploadDate: 2024-11-15
duration: "0:44:45"
educationLevel: beginner
topic:
  - "privacy-and-security"
  - "privacy"
format: presentation
author: Ethereum Foundation
breadcrumb: "Reclaiming Privacy"
---

A keynote by **Naomi Brockwell** at Devcon SEA on the erosion of digital privacy, the infrastructure of mass surveillance, and practical tools everyone can use to build a more private digital life — from VPNs and encrypted email to GrapheneOS and decentralized mixnets.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=nvJSFR1Q_JE) published by Ethereum Foundation. It has been lightly edited for readability.*

### The surveillance landscape (0:00)

I want to talk about what's happening in terms of surveillance of your digital communications, and I want to give you some really practical tools that you can go home and start using today. Because I think one of the problems with the privacy movement right now is that talking about mass surveillance kind of feels like a bummer — like, we all care but it can feel really overwhelming. I want to give you things that are tangible that you can actually go and do today.

Let's start with the problem. A lot of people don't realize, in the United States for example, there is a law — it's called ECPA, the Electronic Communications Privacy Act. This was written in 1986. Back then, what the technology was able to do was extraordinarily limited. The law grandfathered in the surveillance capabilities of the time. What that means is that if you store your emails on a server for more than 180 days, the government doesn't need a warrant to access them. They just need a subpoena, which has a much lower threshold.

Now, think about how many of your emails are older than 180 days. That is the legal framework under which your private communications are protected — or rather, not protected.

### The third-party doctrine (5:00)

This is where the third-party doctrine comes in. It's a legal concept that says if you voluntarily share information with a third party — like your email provider, your ISP, your social media platform — you've relinquished your expectation of privacy in that information. The government argues that because you gave your email to Google, you don't really have a privacy interest in it. They can just ask Google.

This doctrine was established in the 1970s in the case of Smith v. Maryland, when the Supreme Court said that phone numbers you dialed — not the content of calls, just the numbers — weren't private because you gave them to the phone company. That reasoning has now been extended to cover vast categories of digital data.

### How tracking works today (10:00)

Every device you own is running trackers and SDKs that are sending information about you to hundreds of companies. Your phone, when it connects to Wi-Fi, broadcasts what's called probe requests that contain the MAC addresses of every Wi-Fi network you've previously connected to. That means just by walking into a room, your phone is broadcasting your location history.

The advertising ecosystem has created the most sophisticated mass surveillance apparatus in human history, and they did it voluntarily. Governments didn't even have to build it. They just had to tap into what already existed. The advertising industry built the perfect surveillance infrastructure and then governments got access through the backdoor.

### Data brokers and the surveillance marketplace (15:00)

Data brokers aggregate information from apps, from public records, from loyalty programs, from credit card transactions — and they create profiles that are shockingly detailed. They know your health conditions, your political affiliations, your religious beliefs, your financial situation. And they sell this information to anyone who wants it, including government agencies.

There have been multiple documented cases where government agencies that would need a warrant to access your data directly instead purchased that same data from data brokers. This is a massive loophole in our legal system. The Fourth Amendment was designed to protect you from unreasonable searches by the government. But if the government simply buys the data from a commercial entity, they argue that no search occurred.

### The smartphone as surveillance device (20:00)

Your phone is the most powerful surveillance tool ever created. Not just because of what it sends, but because of the sensors it contains. GPS, accelerometers, gyroscopes, barometers, ambient light sensors, microphones, cameras, Bluetooth, NFC, Wi-Fi — all of these are constantly operating and producing data about you.

GrapheneOS is one of the most important projects in the privacy space right now. It's a hardened version of Android that gives you real control over your device. It sandboxes Google Play Services so they don't have system-level access. It removes most of the telemetry that stock Android sends to Google. If you're serious about mobile privacy, this is where you start.

### VPNs, Tor, and mixnets (25:00)

Let's talk about network-level privacy. A VPN is a great first step — it hides your IP address from the websites you visit and encrypts your traffic from your ISP. But a VPN shifts trust from your ISP to the VPN provider. You need to trust them not to log or share your data.

Tor is the gold standard for network anonymity. It routes your traffic through multiple nodes so that no single entity can connect you to your destination. But Tor is slow — that's the tradeoff. It sends the highest privacy for the highest-value transactions. It's not designed for streaming Netflix.

Mixnets are an exciting newer development. They're using secure enclaves and TEEs to protect data so that whoever is running a node can't see the content passing through. You've got a lot of these popping up right now. General VPN for everything — you put it on your home router, put it on every device. The function is so that every website you visit doesn't get your IP address as a tracking and fingerprinting tool.

### Supporting privacy tools (30:00)

There are a lot of premium services out there. I love the idea of everyone getting access to privacy. I don't want people getting priced out of something that's really important. That means that if you can afford to pay, you should — because these places aren't going to be sustainable unless we support them. They usually have free tiers, which is great for trying out. But if you find you're using something valuable, even if it's a free tool, write to the developers, find a way to donate to them. If you're using GrapheneOS, see if you can donate something. These teams work really hard for your benefit.

Proton is a great ecosystem. They're trying to be a Google competitor — they offer Drive, collaborative docs, spreadsheets, VPN, calendar, and email. We use it for our company. Now obviously, some of these tools might not be as polished as Google, because Google has 85 billion people working on the emoji feature. But most of the people at Google are really focused on the ad side and exploitative behavior.

A lot of us probably signed up for Gmail not understanding that Google is an advertising company. We just thought this was a free thing on the internet. Why would you need to pay for something that's just ones and zeros? We all signed up and inertia got us. You have tools to replace that now. Don't feel you need to switch immediately — just set up an account. Just create it and it's there. Take the first step.

### Encrypted messaging (35:00)

Try to think about the tiny little choices you can make that help build a more private future. Someone says, "Hey, let's DM. Are you on Telegram?" Say, "Actually, let's connect on Signal." Someone says they're on WhatsApp or SMS — try to redirect to a more private option. These small choices matter because every time you make one, you're either fueling the ecosystem that's exploiting people, or you're supporting the companies that are trying to protect you.

### The future we're building (40:00)

Right now, we are at that juncture in the road where we have to make some choices about the world we want to see. If the people in this room are not the ones being trailblazers, the mainstream is not doing this. You are the ones who will create that quorum, create the new norm that moves people over.

Do you want to live in a world where whistleblowers can no longer exist? Do you want to live in a world where investigative journalists can no longer do their job safely? Do you want to live in a world where opposition parties can no longer form? Do you want to live in a world where dissent is no longer possible? Because that is the current world we're building.

It is not about you, actually. It's not about whether you personally have something to hide. It's whether you want to live in a world where none of that stuff is possible anymore. That's the future we're currently building. That's the infrastructure of surveillance that has taken hold.

We have to think about what world we are building for future generations. And are we actually fueling a world where we can no longer undo this stuff — where it becomes so embedded that we can no longer walk it back, because governments have outlawed it, because no one spoke up for it, because businesses have gone out of business because no one supported the tools?

Even if it's a small change — even if it's one tiny choice you make differently — try to think about those choices that can help build a more private future and support the tools that are trying to support us. Thank you so much for being here. I believe in all of you. We've got this. We can build a better future.
