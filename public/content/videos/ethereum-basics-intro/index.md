---
title: "Ethereum basics: intro"
description: "An introductory lecture on Ethereum fundamentals, covering what Ethereum is, how it differs from Bitcoin, and the core concepts that underpin the Ethereum network."
lang: en
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "intro"
format: presentation
author: Quezar
breadcrumb: "Ethereum Basics"
---

An introductory lecture by **Quezar** covering the fundamentals of Ethereum, including what blockchains are, how they work under the hood, and the key components that make up the Ethereum network.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=j78ZcIIpi0Q) published by Quezar. It has been lightly edited for readability.*

#### Welcome and series overview (0:03) {#welcome-and-series-overview-003}

Welcome back to another part of the Ethereum series. If you've been looking for a good resource to understand how Ethereum works under the hood, we've got you covered. In our previous part we covered how to read and write basic Solidity contracts and briefly discussed a few things about the various components of the Ethereum network. In this part we'll take a deeper dive into Ethereum's architecture and discuss each component in much more detail. We have many more videos coming soon, so if you like this kind of content, hit the like button and subscribe so that you get notified when the new video goes live.

#### Goals and prerequisites (0:40) {#goals-and-prerequisites-040}

The goal of this part of the series is to give you a good understanding of Ethereum's architecture within a week. As with the previous part, I have structured it so that within seven days you'll be much more comfortable with everything that happens on the Ethereum network whenever someone does an activity on it.

Talking about prerequisites — there's nothing as such that you should know already. If you're watching this video, then most likely you know enough about the Ethereum network as far as this part is concerned. But I would recommend completing the previous part of the series — Solidity Basics — because that part is much more hands-on in nature. You get to run code on Remix IDE and see how things actually work on the Ethereum network. This part is mostly going to be on the theoretical side, and if you've already covered the previous part, you'll find it much easier to go through.

#### What we'll cover (1:41) {#what-well-cover-141}

In this part we'll cover what blockchains are and see how they work under the hood. We'll also see what components make up the Ethereum network, and then we'll move ahead and discuss each component in much more detail.

For this part, I've used the official Ethereum documentation as a base. Once you're through with this part, you'll be mostly covered with the foundational topics of this documentation. You'll have a much easier time going through it. Obviously not everything is in the videos, but I've tried to cover all of the things at a higher level. You can consider this part as a primer for the documentation, which is much more in-depth.

#### Tools and approach (2:30) {#tools-and-approach-230}

We'll also be using Etherscan to see how each component is working in real time. Don't worry if you cannot understand everything in one go — you can always revisit specific topics again whenever you feel like. I would recommend taking short breaks after every topic so that you are able to digest them better. So let's get started by understanding what blockchains are.
