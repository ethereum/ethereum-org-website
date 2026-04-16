---
title: "Security through obscurity: using microdots to store secrets"
description: "Presenting an unconventional approach to key custody using physical microdot technology, obfuscating seed phrases in printed images invisible to the naked eye."
lang: en
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "privacy-and-security"
  - "privacy"
  - "authentication"
format: presentation
author: Ethereum Foundation
breadcrumb: "Microdot Security"
---

A lightning talk by **jseam** at Devcon SEA exploring an unconventional approach to key custody using physical microdot technology, historically used in espionage to obfuscate seed phrases in printed images that are virtually invisible to the naked eye.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=k9Dfg19JPEw) published by Ethereum Foundation. It has been lightly edited for readability.*

#### Why microdots? (0:00) {#why-microdots-000}

Hi guys, welcome to Thailand. For my talk, I'm going to talk about microdots — what exactly they are, why you'd want them, and how you can actually make them. I have some samples, so after the talk you can check them out.

There are a lot of questions about OpSec and how you can hide seed phrases. A lot of the existing processes are all digital. But what if there are physical processes? What if you can obfuscate stuff? Key custody remains a huge problem. We have secret sharing, social recovery — but I know a lot of crypto people are kind of asocial, so social recovery might be hard.

Look at this graph: we have the loneliness epidemic happening right now. So key custody and social recovery are going to be huge problems. What if there are physical approaches to obfuscating information?

#### The history of microdot steganography (2:00) {#the-history-of-microdot-steganography-200}

This is a steganography technique called microdots. The reason I'm showing this today is because this has historically been used in espionage. The goal is to essentially hide messages in plain sight.

All the documentation around this is so limited. You're probably asking Claude and it's saying, "Sorry, no info for you." I was reverse-engineering this information myself. The slides document everything. I won't be able to cover every detail, but I'll go through the interesting parts. I've also created a GitHub repo documenting the processes.

#### Analog photography for security (3:30) {#analog-photography-for-security-330}

We're going to revive analog photography for this use case. Why analog? There's basically no chance for someone to hack an analog camera unless they physically steal it from you.

One of the main issues with analog photography is ISO. On a digital camera, this is not a big deal — you can adjust it. But with film, ISO is a function of the film grains. This becomes a problem when you want to miniaturize the image. The smaller the ISO, the smaller the grains in general.

There are two phases. First, you take a photo, develop it, and fix it. The second phase is where, instead of expanding the image, we do the opposite — we shrink it down to microscopic scale.

#### The British process (5:00) {#the-british-process-500}

Here's how you do it. You write your seed phrase. Normally a MetaMask tutorial asks you to write the seed phrase — but then where do you put it? This is one way: you take a photo of the seed phrase, roll in the film, develop the film. The interesting thing — these are all heavy metals, silver metals. You shouldn't put them in your toilet. I accidentally poured some in my toilet, so I might have committed some environmental offenses. It will probably corrode my pipes in the worst case.

You take the photo again, and tada — you have this tiny little dot. This is called the British process.

#### The dichromated process (7:00) {#the-dichromated-process-700}

The next, even more extreme process is the dichromated process. This is how you can get microscopic magnifications like 1000x. The goal is to find a chemical substrate for this, and this is where what I call the "Forbidden Orange Juice" comes in — ammonium dichromate. It is very toxic. I did spill some of it, and I almost died when I inhaled the dust. I probably need to go for cancer screening after this.

You project the image and you get these tiny little dots on a piece of paper. The dots are so small you definitely need a microscope. The one using the British process you can see with the naked eye, but the dichromated process produces something really tiny — I'm not even sure whether it's an actual image without a microscope.

#### Q&A (8:00) {#qa-800}

How small are the microdots? You can see the one made using the British process with the naked eye, but the dichromated process produces something really tiny — you definitely need a microscope. It's hard to tell whether it's even an actual image without one.

**Question:** How long does it last? Is there a half-life?

**jseam:** It's not radioactive. We'll find out in 20 years.

**Question:** Have you reversed the process — encoded and then decoded to see if you can recover it?

**jseam:** I think you could. You'd probably need some kind of optical projection setup.

Thank you very much. If you guys want to see the samples, I'll be somewhere around here. Thank you for your time, guys.
