---
title: "Hash function — ETH.BUILD"
description: "A demonstration of cryptographic hash functions using the ETH.BUILD educational tool. Learn how hash functions work and why they are fundamental to Ethereum's account and data integrity model."
lang: en
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Hash Functions (ETH.BUILD)"
---

A tutorial by **Austin Griffith** demonstrating how cryptographic hash functions work using the ETH.BUILD visual programming tool, covering determinism, fixed-length output, one-directional properties, and Merkle trees.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=QJ010l-pBpE) published by Austin Griffith. It has been lightly edited for readability.*

### Introduction to hash functions (0:00) {#introduction-to-hash-functions-000}

This is the first video of a series called ETH.BUILD. You can go to eth.build to use this tooling, but it's just to play around and get an idea of how things work when building on Ethereum.

The first module we're going to look at is a hash function. What the heck is a hash function? Well, it's kind of like a fingerprint. You have an input — it can be anything — but for now we'll just go with the text "hello world." On the other side you're going to have an output, and that output is a 64-character hexadecimal string. It says 66 characters because of the "0x" prefix, but it's really a 64-character hex string.

### Visualizing hashes as colors (0:50) {#visualizing-hashes-as-colors-050}

If you're looking at hex, it kind of looks like a color, and it might be easier to describe what we're seeing here if we just make it the color. So what we're going to do is grab the first six characters of whatever the string is and display it as a color. If we look at that, we see it's a nice purple color.

Let's see what color my name is — there we go, a nice forest green. Now let's go back to "hello world" — it's that purple again.

### Determinism and fixed-length output (1:38) {#determinism-and-fixed-length-output-138}

What we just discovered is that it's deterministic. Basically, whatever we put in as our input, we're always going to get the same thing out on the other side.

The second property is that you could put in anything of any arbitrary size. I can mash on the keyboard and see the color change, but that string stays at that 66-character length. No matter what you put in here — even a file — I could drop in this file of Leo, my boy, and put that in as a hash and get a nice orange color. Then I could drop in a BIP word list text document and it's this nice light blue. If I bring Leo back, guess what color it's going to be? We know it's going to be that orange. You get this deterministic fingerprint of the thing that you put in.

### One-directional property (2:37) {#one-directional-property-237}

The next most important property is that it's one-directional. If I put in "hello world" again, we're going to get this "4717" hash. If we take that hash and send it to someone and say "here is the hash of my secret — if you can guess my secret, I'll give you a hundred bucks," they're not going to be able to get close.

Let's say the hash starts with "4717" and they start poking around trying to find a match. You can't just change little characters and get close — you either get it or you don't. You basically have to brute-force guess it. If they happen to guess "hello world," they'll get the answer, but if they don't guess it, they're never going to get it. There's no way to tell if you're getting closer.

You'll find with cryptography that it's sometimes frustrating as a developer because it either works or it doesn't — you don't get any hints about whether you're getting close. But that's a good thing. That's the property we want of a hash function.

### Summary of hash function properties (3:43) {#summary-of-hash-function-properties-343}

So we've got: anything of any size can be fed into a hash function, and it's going to spit out an exact 64-character hexadecimal fingerprint of what that data is. It's deterministic. It's one-directional — you can't go back the other way. It's really easy to make a hash, but really hard to guess the secret of the hash.

### Merkle trees and combining hashes (4:06) {#merkle-trees-and-combining-hashes-406}

What we can do with this is some really neat stuff, like a Merkle tree. We've got our three inputs, and we could join those together. We can combine all of those hashes and then hash the combination.

This color right here — that purple — represents the hash of all of these hashes. If I change "hello world" to "hello world one," that purple is going to change. Any little change to any of these inputs is going to cause the final hash to change. You can bring in all sorts of data in all sorts of different ways — even have a tree of hashes, a Merkle tree — or have a bunch of blocks in a row, and this final hash is going to be based on all of these things. If any little thing changes anywhere along the way, the final hash is going to change.

### Key takeaway (5:53) {#key-takeaway-553}

The key takeaway is that a hash function is basically like a fingerprint. If I type in something, it's going to deterministically give me the output that I expect. That is a hash function — welcome to ETH.BUILD. Let's make some cool stuff and learn a lot along the way.
