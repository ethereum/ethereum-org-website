---
title: "Key pair — ETH.BUILD"
description: "A demonstration of public-private key pairs using the ETH.BUILD educational tool. Understand how cryptographic key pairs secure Ethereum accounts and enable transaction signing."
lang: en
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Key Pairs (ETH.BUILD)"
---

A tutorial by **Austin Griffith** demonstrating how public-private key pairs work using the ETH.BUILD visual programming tool, covering private key generation, public key derivation, message signing, and signature recovery.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=9LtBDy67Tho) published by Austin Griffith. It has been lightly edited for readability.*

### The private key (0:00) {#the-private-key-000}

In the first video we used a hash, and hashes will be important moving forward. But the next most important piece is a key pair. The most important piece of a key pair is the private key. Let's go ahead and generate one — it's basically a random 64-character hexadecimal string, the same size as the hash we were just working with.

You start with that as your private key, and then using elliptic curve cryptography — check it out on Wikipedia as a side quest — we derive a public key. So now we've got a private key and a public key. We've just generated a private key out of the blue, and the public key gives us an address. This is where people could actually send money. When someone says "send to my Ethereum address," that's what this is.

If I wanted to create an account at Wells Fargo, I would have to drive down to the bank and give them a bunch of information. It would take a while. But to generate an account within a cryptographic system like this, where I can send and receive money, I just generate this private key. This 64-character hexadecimal private key derives everything else.

### Signing and recovering messages (1:54) {#signing-and-recovering-messages-154}

There's a really neat property about this key pair that we should explore, and that is signing and recovering messages. Basically, you take your private key and you use it to sign some kind of message. Let's type a message — "the bear is sticky with honey."

We plug that in as our message, and with auto-sign enabled it gives us back a signature. Kind of like the hash, our signature is basically taking the message and our private key and signing something. What we get out of that is a signature.

I can send this out to the world — I could send this publicly to everyone — this signature string along with the message. What anybody can do with math is verify that I'm specifically the one who signed it.

### Recovering the signer's address (3:17) {#recovering-the-signers-address-317}

Let me show you how that works. We use a "recover" method. We need two inputs: the message — "the bear is sticky with honey" — and the signature. What comes out of that is the address that was used to sign it. We can visually see that the account signed that message using the Blockie identicons.

There's no way to tamper with this. If anyone changes even a single word — like swapping "bear" to "badger" — everything changes. Even with the same signature, a different message spits out a different address, not the correct one.

This message can't be tampered with. We could throw a timestamp in there — we could say "on this day I predict that something will happen," sign it, put out the signature and the message, and anyone for the rest of time can mathematically prove that you signed that message at that time.

### The key property of a key pair (4:58) {#the-key-property-of-a-key-pair-458}

This is the key property of a key pair. A key pair generated from nothing more than a 64-character hexadecimal random string can be used to sign a message, and then that message can be recovered.

- Private key + message = signature
- Signature + message = public address

We can sign data with our private key, and people can prove that it was us who signed it. That'll be an important piece for the next step.
