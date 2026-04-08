---
title: "Zero-knowledge proofs explained in 5 levels of difficulty"
description: "A computer scientist explains zero-knowledge proofs at five different levels of complexity, from a child to an expert."
lang: en
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacy-and-security"
  - "zero-knowledge-proofs"
  - "cryptography"
format: explainer
author: WIRED
breadcrumb: "Zero-Knowledge Proofs"
---

Computer scientist **Amit Sahai**, a professor at the UCLA Samueli School of Engineering, explains zero-knowledge proofs at five levels of complexity, from a child to an expert, in this **WIRED** production. The concept is demonstrated through physical analogies and discussed in increasing technical depth, making one of cryptography's most important concepts accessible to everyone.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=fOGdb1CTu5c) published by WIRED. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

**Amit Sahai:** Hi, my name is Amit Sahai, and I'm a professor of computer science at the UCLA Samueli School of Engineering. Today, I've been asked to explain zero-knowledge proofs in five levels of increasing complexity.

A zero-knowledge proof is a way for a prover to convince a verifier that some statement is true, and yet reveal no additional information beyond the fact that the statement is true. Zero-knowledge proofs are being used in blockchains and cryptocurrencies. Cryptographers are excited about zero-knowledge because of its amazing mathematical properties, but also because of its incredible applicability to so many different scenarios.

#### Level 1: child (0:41) {#level-1-child-041}

**Amit Sahai:** What's your favorite subject?

**Chelsea:** I'd say math. Some of the small problems can actually be really big and complicated. It's like a puzzle.

**Amit Sahai:** I love math for the same reason. Today, I'm gonna tell you about a thing called zero-knowledge proof. In a zero-knowledge proof, there are two people — there's a prover and a verifier. I want to prove that something is true to you, but the weird thing is, I want to prove to you that it's true without telling you any reasons why. I remember when I first heard about it, I was like, wait, what? How can that possibly be?

So what do you see in this photo?

**Chelsea:** A lot of penguins.

**Amit Sahai:** Yeah. Hidden along all these penguins is a puffin. Do you want to try to look for it? Do you see where it is? I know where it is, but I don't want to tell you. Do you believe me?

**Chelsea:** Yeah.

**Amit Sahai:** But what if I could prove to you that I know where the puffin is without revealing to you where it is? Let me show you. I took that photo and put it behind this poster here. Why don't you go take a look through that hole?

**Chelsea:** I see the puffin.

**Amit Sahai:** So when you look at this board, we don't know where the photo was, right? Was the photo with the corner here, in which case the puffin would be all the way on this side? Or was the photo with the corner here, in which case the puffin would be on the other side? So this is a really simple example of a zero-knowledge proof. I convinced you that I knew where the puffin was, but you didn't learn anything else.

**Chelsea:** Why do you study zero-knowledge proof?

**Amit Sahai:** When I first learned about them, I just thought they were so cool. But it turns out they're also really useful — not just for finding puffins. If you just type in your password and the hacker hacks into the computer, they can just get your password. What if instead, we could somehow use a zero-knowledge proof to log in? You would just be able to prove that you're Chelsea, without revealing anything to them. If you could do that, then it would be amazing, because even if the hacker hacked into the computer, they wouldn't learn anything — because even the computer doesn't learn anything.

So Chelsea, in your own words, what is a zero-knowledge proof?

**Chelsea:** Zero-knowledge proof is proof to a statement. You don't show them why or what. You just show them a tiny segment, or just do some sort of weird magic trick that's not really a magic trick, and they will be convinced. And you didn't show them why, or anything like that.

#### Level 2: teen (3:31) {#level-2-teen-331}

**Amit Sahai:** So have you ever heard the term zero-knowledge proof before?

**Teen:** I have not, no.

**Amit Sahai:** It's a way for a prover to convince a verifier that something is true without revealing anything about why it's true, which sounds totally bizarre. What I want to do is prove to you that I know this combination without revealing the combination to you. And what you could do is write a little note, a secret that I definitely wouldn't know. Fold it up, stick it in here. And then, if I know the combination, I should be able to open it and tell you what you wrote.

All right. "My dog is named Doug."

**Teen:** Did you figure out what the combination was?

**Amit Sahai:** No. So nowhere in this interaction did you see any information that you didn't already know. And yet I convinced you that I know the combination.

**Teen:** So what's the exact purpose of a zero-knowledge proof? Is it like proving something but without giving enough information that could endanger whatever it is that you're proving?

**Amit Sahai:** People don't trust each other. And if I was able to prove that I've done something correctly to someone without having to reveal my secrets, then that person would trust me more.

**Teen:** How does this relate to computer technology? Is it an in-person interaction?

**Amit Sahai:** Suppose you wanted to exchange messages with someone that you knew. You'd probably first get together and figure out some secret code, right? And then write messages to each other in that code. But what if you've never met the person before? What if you want to exchange secret messages with me and we've never met each other before? How could we possibly do that?

**Teen:** I have no idea.

**Amit Sahai:** It sounds impossible, right? But it's not. You wouldn't use a physical lock or a physical box. We would instead use mathematics to do these kinds of things. You could take a message and encrypt it using mathematics. And then I could prove to you that I know the key, open it up, and send it back to you. That way I would be proving to you that I know the mathematical key to the mathematical lockbox.

So based on what we've discussed today, in your own words, what is a zero-knowledge proof?

**Teen:** It's like if you have this really important secret that you want somebody to know about, but you don't want to tell them everything. You can use a zero-knowledge proof to prove to them that secret, but not give away all of it.

#### Level 3: college student (6:13) {#level-3-college-student-613}

**Amit Sahai:** What are you studying?

**College Student:** I'm a first-year computer science student at USC Viterbi. I'm interested in all things like data, internet, blockchain, and cryptocurrency.

**Amit Sahai:** Have you ever heard of zero-knowledge proofs?

**College Student:** Only in passing.

**Amit Sahai:** Actually, in the blockchain space is one of the spaces where we are seeing zero-knowledge proofs being implemented — and I think it's just the beginning. At its core, a zero-knowledge proof is an interaction between two people. I should be able to convince you that some statement is true, but you won't have any idea why it's true.

The way we're going to approach this is through something called NP-completeness. An NP-complete problem is a problem that's really hard to solve. But if you can solve it, you can solve any problem that's in the class NP — and that includes a vast number of problems. We're going to use an NP-complete problem to actually prove an incredible variety of statements through a zero-knowledge proof. The specific NP-complete problem we're going to look at is called map three-coloring.

Here we have a map with a bunch of countries, arranged so that no countries that have the same color share a border. That's what makes a map like this validly colored. It turns out that whether or not a map can be three-colored in this way is an example of an NP-complete problem.

Maybe what you really want to do is give a zero-knowledge proof that you have at least 0.3 Bitcoin, without revealing the address of your account. It turns out I can take that statement and convert it into a map of countries. That map of countries will be three-colorable only if you have at least 0.2 Bitcoin.

**College Student:** How would we turn something like this into a zero-knowledge proof?

**Amit Sahai:** Of course, the first step is we have to erase all the colors. I've put a color inside each of these envelopes. Now, how do you know that it's a valid coloring? You don't. You have to pick any two neighboring countries — you can pick them however you like, at random.

**College Student:** Can I get these two?

**Amit Sahai:** Here we have green, and over here we have blue. As you can see, they're two different colors. So you have a little bit of confidence that I have managed to color this correctly — but not that much confidence, because I've only shown you two of the countries. One way to get more confidence is to open up more of them, but that would be revealing information to you. I don't want to do that.

So instead, I'm going to ask you to please turn around. And now, let's change up these colors.

Can you pick two countries at random, and we'll reveal two of the colors again.

**College Student:** I'll take this one and this one.

**Amit Sahai:** That's smart of you to check with the same one you already had. But as you'll see, now it's not green — it's blue. And this one on the other hand, is green. The colors I showed you last time don't work with these new colors. But it works for this coloring that I'm showing you right now. So what we've done is we've made it impossible for you to put the pieces together. And if you do this a thousand times, and I correctly show you different colors each time, you'd be really convinced. And that's it — that's the entire zero-knowledge proof.

**College Student:** So is it like a probabilistic proof?

**Amit Sahai:** Yeah. In actual implementations we wouldn't use envelopes — you would use encryption. But this is the protocol.

**College Student:** So what are the broader implications of zero-knowledge proofs? Are they supposed to be more practical for implementation, or are they supposed to structurally prove something?

**Amit Sahai:** It's not about making something more efficient. It's about doing things that we just didn't know how to do before. I can actually prove to you, without revealing any of my secrets, that I'm behaving honestly. I could prove to you that I signed some encrypted document correctly without revealing what that secret document was. That ability to change the game — to really change what we can do — is what zero-knowledge brings to the table.

**College Student:** Where do you think we could build more trust using zero-knowledge proofs?

**Amit Sahai:** One great example is elections. If you could prove that an election was correctly conducted — that every vote was counted and it all added up to one person winning with a particular total — in zero-knowledge, then you don't have to give up the actual votes of any person. And yet everyone could see that it was done correctly.

#### Level 4: grad student (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** It's so great to have you here and to talk with you, Eli. Can you tell me a little bit about your research?

**Eli:** My research is in cryptography. Specifically, I'm working on some multi-party computation protocols. The one I'm working on right now is a system for computing aggregate statistics, so that service providers like Google Chrome or Tesla can collect those statistics without learning anything about individual users' data. I, as a user, don't have to let Firefox know that my favorite website is mylittlepony.com. But they can know how many users go to mylittlepony.com every day.

**Amit Sahai:** That's awesome. Multi-party computation is near and dear to my heart. Obviously, zero-knowledge proofs are about proving things to another person without revealing the details of what it is that you're proving. But in my mind, zero-knowledge actually goes even further beyond that. It's this overarching concept that you can see a lot in multi-party computation, where you want to accomplish some task without revealing anything more than exactly what you need to accomplish that task.

**Eli:** Right, and it allows you to prove that you've been behaving honestly, without revealing any of the secrets involved that you use to actually behave honestly. We know that zero-knowledge proofs for NP-complete languages play such a huge role in cryptography. What was your first experience with NP-completeness like?

**Amit Sahai:** My first encounter was in my very first algorithms class as an undergraduate. An NP-complete language is this amazing problem that not only tells you about itself, but solving this problem can actually tell you about an entire class of really interesting problems.

**Eli:** When you first start to think about proofs as an interactive game where we're talking to each other, did that make zero-knowledge possible?

**Amit Sahai:** Absolutely. And the idea that randomness could be useful for proving something — again, seems so counter-intuitive if we think about the platonic ideal of a proof. There's no randomness, no non-determinism present there.

**Eli:** It has to do with this whole idea of flipping a proof on its head. In an old classical proof, randomness is specifically against the goal of what you're trying to do, because you're trying to make everything obvious and reveal the flow of information. But once you flip that on its head and you're no longer trying to do that, suddenly all the bad properties of randomness become good.

**Amit Sahai:** Exactly. Random is unpredictable, and that's what we want. We want that unpredictability to actually hide the information that we want to hide. How have you used zero-knowledge in the projects you've worked on? What are the challenges that you find?

**Eli:** Usually the hardest part is figuring out exactly where the best place is to use it. I've written some papers that have used zero-knowledge in a more theoretical way, but when it comes to applications, some of the most exciting applications I've seen so far have been in the blockchain space.

**Amit Sahai:** What are some of the efficiency bottlenecks?

**Eli:** One of the coolest things about zero-knowledge proofs is that there's so many kinds — I like to call them flavors. In general, when you're using zero-knowledge proofs in application, the main bottleneck tends to lie on the prover.

**Amit Sahai:** Can you take the prover's job and split it up into lots of parallel computations?

**Eli:** That's such a fun question. I think we still don't know the answer to that as a field. One of the coolest things I've seen over the past three or four years is the transition from theoretical to applied — seeing all of these amazing systems that people have thought of in the past 30 years start to actually get efficient enough to be made.

**Amit Sahai:** No doubt. And especially with cloud computing — exploiting the power of the cloud to enable zero-knowledge proofs would be amazing. Also in the blockchain space, if you want to speed up the generation of proofs, if that could be done in a distributed way, that would be great. One of the hopes I have is that the power of multi-party computation is about bringing people together who are mutually distrustful. Can we take that power in the cryptography and use it to help with the tremendous level of mistrust that exists in society right now?

**Eli:** I think that's one of the reasons I was so drawn to multi-party computation. One of the most important problems in the world is the fact that so many people don't trust each other. To be able to use math to create technology that allows people to work together without having to trust each other is a really cool and awesome mission.

#### Level 5: expert (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, it's so great to see you again. I think last time we met was in 2017 or something like that.

**Shang-Hua:** I think we Zoomed once during the pandemic, but it's good to see you in person. Actually, in '86 I was taking a crypto class with Professor Leonard Adleman, the A of RSA. He assigned me the paper by Goldwasser, Micali, and Charlie Rackoff on zero-knowledge proof. So that's indeed my first-ever presentation, ever, in this country — about zero-knowledge.

**Amit Sahai:** That's awesome. It's such an almost hypnotic concept.

**Shang-Hua:** It's also interesting how mathematically to formulate those concepts. For example, we have data. Eventually from data, through data mining, you can get information. And then you have this word called "knowledge." Knowledge has been long debated even in philosophy. What is knowledge? But here is a very fascinating way mathematicians or computer scientists want to capture this knowledge. It didn't say "zero-information proof." So what's your take on why "knowledge" rather than "information," or "zero-data proof?" Clearly there's data there, so it can't be zero-data.

**Amit Sahai:** Absolutely. I don't think we still have a completely satisfactory answer to that question. What was such a beautiful insight is the idea of zero-knowledge being something that you can already predict. If you can already predict the answer, then you must not be gaining any knowledge by that interaction. This insight — of being able to predict the future accurately and that being evidence of a lack of new knowledge — was such a beautiful, amazing insight.

**Shang-Hua:** Well, there's not zero-information here. Fundamentally, from a computing and security perspective, what matters is how much knowledge you're gaining, more than how much information you've gained and how much data you have. Data doesn't immediately imply knowledge. But people can't always distinguish.

**Amit Sahai:** Right. For example, in medical research — how amazing would it be to have a drug and prove that it works in this model, without having to reveal the structure of the compound?

**Shang-Hua:** What would you say are the next directions in this space?

**Amit Sahai:** This concept of zero-knowledge programs would allow you to carry out completely arbitrary computations in a zero-knowledge way, without any interaction. I can just take the program, convert it to a zero-knowledge program — or an obfuscated program — and then just send it to you. You can run it and gain the benefit of that computation without having to talk to me anymore.

**Shang-Hua:** That's right. There's a non-interactive nature. But there's verifiability in it. In blockchain, they also began to incorporate a more general zero-knowledge proof in the ledger.

**Amit Sahai:** We're definitely at this moment now where zero-knowledge is going to be used more and more. There are so many conferences and meetings in the zero-knowledge space where you and I are not invited — because it's for the people who are developing, the people who are programming, not us mathematicians. And I think that's a sign. That's a sign that our baby has grown up, and it's time for it to be developed.

**Shang-Hua:** I think profoundly, the students often ask me what are the future directions — both in terms of crypto, zero-knowledge proof, in the real world and in mathematical computing.

**Amit Sahai:** It's a great question. I wish I could see the future. I can't, but let me try. I think we've done so much in cryptography over the last few decades, but we understand so little. The most fundamental aspect is understanding hardness — how do we get hard problems? How do we actually build mathematically hard problems so we can then use them to build efficient zero-knowledge programs and proofs?

**Shang-Hua:** I guess also, in quantum computing, you need even harder problems.

**Amit Sahai:** Indeed. Now that we have the specter of quantum computing coming at us, we all know that quantum computers can break a lot of cryptographic systems. It's a profound challenge. So can we find new sources of hardness that are quantum-resistant — that even quantum computers can't break? That's something I've been working on for the last several years.

**Shang-Hua:** But I'm sure they will motivate beautiful mathematics.

**Amit Sahai:** Yes, that's right. One of the great things about the real world is that people in the real world have demands. And those demands often sound impossible. And that's where we come in — it's our job to make the impossible possible.
