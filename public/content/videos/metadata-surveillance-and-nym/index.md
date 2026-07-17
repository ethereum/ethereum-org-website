---
title: "Data Privacy Day special - Metadata surveillance and Nym"
description: "A Data Privacy Day conversation on metadata surveillance: what metadata reveals about you even when message contents are encrypted, and how network-level privacy tools like Nym work to protect it."
lang: en
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Privacy"
---

A feature from **Nym** with Nym Chief Scientist Claudia Diaz, exploring the mechanics of metadata, its critical role in modern surveillance, the personal details it exposes, and the steps we can take to take back our privacy.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=QBX5AK3DXqw) published by Nym. It has been lightly edited for readability.*

#### Intro (0:04) {#intro-004}

What is communications metadata? It refers to everything about a communication that is not the content of what is actually being said. This includes, for example, the origin of the communication, the destination, the time at which the information is sent, how much information is sent, and any detectable patterns, including the timings and sizes of the packets being exchanged.

#### Communications metadata (0:27) {#communications-metadata-027}

Communications metadata is exposed by default in all the internet protocols: TCP/IP, HTTP, UDP, FTP. Even secure protocols such as TLS or secure DNS, which protect the content with end-to-end encryption, still show the communications metadata: the origin, destination, timing, length, and so on.

So this information is exposed, but to whom? Who can get it?

#### Who gets access to metadata (1:10) {#who-gets-access-to-metadata-110}

There are a number of entities that are intermediaries in internet communications that are able to access this communications metadata. This includes big players in the internet infrastructure, such as internet service providers, exchanges, autonomous systems, BGP routers, and internet backbone participants generally; they can get access to a lot of communications metadata. 

But even small players, such as whoever is running the Wi-Fi router or a local area network, or somebody who is able to eavesdrop locally, also get access to the communications metadata. And of course, nation-state-level adversaries such as the NSA have been known to collect metadata at a large scale and to analyze it in order to extract all kinds of intelligence.

#### Why is metadata important (2:00) {#why-is-metadata-important-200}

There are more reasons why metadata is a very interesting type of data to collect and exploit. It is machine readable, because it speaks the language of computers; it's basically language for computers to be able to route communications from their source to their destination in a proper manner. So it is machine readable, and that means that machines can make sense of it at a large scale very easily, as opposed to natural human language, which is much more difficult to interpret, because maybe people are using words in a certain way, or they have nuances, and this is a lot harder to interpret. Metadata, on the other hand, is really easy.

It also has a lot lower volume than the content. If you think about a YouTube video, for example, the content itself can be multiple gigabytes, but the metadata would just include what the URL of the video is, how many bytes it contains, and at what time it was watched. So it can be a lot less than the actual content, and it's also manageable in terms of size.

Metadata also has a lot lower protection than content. It's not lawful to just intercept people's communications and look into the content, this is protected by law. But metadata, because it's not considered quite as sensitive, has a lot lower protection. So many entities can lawfully collect this metadata and analyze it in order to learn information about what people are doing on the internet.

So is this a big deal? We can say, "Well, it's just metadata. As long as you don't know what I'm saying, should I really worry about you knowing who I talk to and at what time?" 

There are a few quotes that show how metadata is actually considered extremely valuable. The NSA general counsel Stewart Baker said that metadata absolutely tells you everything about somebody's life—if you have enough metadata, you don't really need content. This is how powerful it is in being able to understand what somebody is interested in, who their social network is, what their hobbies are, what their intentions are, what their interests are. You don't actually need to hear what they are saying; it is enough that you're able to observe all the metadata.

And Whitfield Diffie and Susan Landau, in their book *Privacy on the Line*, say that traffic analysis, not cryptanalysis, is the backbone of communications intelligence. This is because you can collect it at large scale, you can analyze it at large scale, and it will give you all the big patterns, all the big picture, that then allows you to zoom in in order to break into the specific targets that you find most interesting. But you find them first with traffic analysis on the metadata.

The traffic analysis of metadata can even be used to recover encrypted content without breaking cryptography. Let's assume we have perfect cryptography: no amount of cryptanalysis is able to break it, and the secret keys are perfectly secret. We should have confidence that this content is protected and an adversary is not able to learn about this content. 

However, there are many situations where the traffic analysis of communications metadata can act as a side channel that reveals this encrypted content.

#### Metadata surveillance (5:15) {#metadata-surveillance-515}

One example is when you're browsing to a website with HTTPS. In principle, because the communication with this website is encrypted, somebody who is observing your communication cannot tell which specific page you're accessing on the website. For example, if you're going to WebMD to check diseases, an observer or eavesdropper will be able to see, "Okay, you're checking WebMD medical information," but they cannot tell which specific disease you're looking for.

However, the way to learn what somebody is doing in this scenario would be for an adversary to first download all the pages on the site and record, for each page, the pattern of packets that are seen on the communication line. Basically, what number of packets goes in which direction, what the sizes of these packets are, and what the inter-packet period is between one packet and the next. 

By doing this, you can build a fingerprint of each of these pages, such that when the target is downloading a page from the encrypted site, you're able to match the number of packets in each direction and their sizes in order to guess which specific web page they are looking at, even though the web page itself is encrypted and you shouldn't be able to learn this content.

This is obviously concerning. Even though we can have end-to-end encryption, we are very far from being done in terms of protecting the privacy of our communications.

#### A wish list for private communications (6:40) {#a-wish-list-for-private-communications-640}

So if we wanted to have a wish list of what a perfectly secure communication network would offer, what are the properties that we want? 

Obviously, we want to protect what a user is saying over the encrypted channel, and end-to-end encryption is already a very important step to achieve that. But not only that, we also want to conceal who the user is communicating with, so who the communication partner is, from whom you're receiving packets or to whom you're sending packets. Also the location, so from where you're communicating; when and how long you're communicating; how many bytes of data you're exchanging; and any other patterns in the communication. And you could even go as far as to say that we want to conceal whether somebody is communicating at all or not.

These are all properties that anonymous communication systems aim to provide, and in the solution space, mixnets are one of the best solutions that we have to provide these kinds of properties.
