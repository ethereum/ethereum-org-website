---
title: How Ethereum Addresses Are Generated.
description: A beginner-friendly explanation of how Ethereum addresses are generated from private keys using elliptic curve cryptography and Keccak-256 hashing.
author: Ndubuisi Ugwuja
tags: ["elliptic-curve", "secp256k1", "keccak-256", "wallet address"]
skill: beginner
lang: en
published: 2025-10-10
---

# Where does an Ethereum address come from?
An Ethereum address comes from a private key → turned into a public key using elliptic-curve math → hashed with Keccak-256 → take the last 20 bytes (40 hex characters) of that hash. Prepend 0x and you have the address.

## What’s a private key?
A private key is like a super-secret password, but much longer and much harder to guess — think of it as a 256-bit secret number written in hexadecimal. Instead of words you can remember, it’s a string of random bytes (often shown as 0x followed by 64 hex characters) that only you should know. In the world of cryptocurrencies, that secret number is what proves you own an account: when you want to send money or sign a message, you use the private key to create a digital signature that proves you authorized the action without ever revealing the secret itself. The private key is generated so that it’s practically impossible for anyone else to recreate it by luck; if someone gets your private key they can impersonate you and control your funds, so it must be kept private and stored safely.

## How do we get a public key from the private key?
We use elliptic curve cryptography (ECC). Ethereum uses a curve called secp256k1 (the same curve Bitcoin uses).

The math idea (simple picture):
- Think of a curve drawn on a plane. Pick a fixed point on that curve (call it G).

- Multiply that fixed point by your secret number (the private key). Multiplication here means repeated addition on the curve (it’s special math, not normal multiplication).

- The result is another point on the curve — that point is the public key.

The public key is a point with two coordinates (x, y). Each coordinate is 32 bytes (256 bits). When written raw (uncompressed) the public key is 64 bytes = x || y. Some encodings add a 0x04 prefix making 65 bytes, but for hashing we use the 64-byte x || y (no prefix).

## Why is this safe?
ECC is one-way: it’s easy to compute the public key from the private key (do the point multiplication), but extremely hard to go backward (given the public key, find the private key). This one-way property protects your private key.

## From public key to address: hashing
Ethereum does not use the whole public key as the address. It hashes the public key:
- Take the 64-byte public key (the x and y coordinates concatenated).

- Compute Keccak-256 hash of that 64-byte value.

- The Keccak-256 output is 32 bytes (256 bits).

- Take the last 20 bytes (rightmost 20 bytes) of that hash. That 20-byte value is the address.

Converting bytes to hex: 20 bytes → 40 hex characters. Ethereum addresses are commonly shown as 0x + those 40 hex chars.

Example (abstract):
```bash
private key  ->  public key (64 bytes: x||y)
public key   ->  keccak256(public key) = 32 bytes
keccak hash  ->  take last 20 bytes = 20 bytes
address hex  ->  "0x" + hex(last 20 bytes)  // 40 hex chars after 0x
```
### A small concrete (toy) example
These values are illustrative (not a real private key you should use).

Suppose public_key (x || y) bytes hash with Keccak-256 gives:
```bash
keccak256(public_key) = 0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```
The last 20 bytes (rightmost 40 hex chars) are:
```bash
0x0123456789abcdef0123456789abcdef01234567
```
That 0x0123...4567 is the Ethereum address (40 hex chars after 0x).

## Checksum addresses (EIP-55) — optional but recommended
- Ethereum addresses are case-insensitive if all lowercased, but a checksum format makes typing mistakes easier to spot.

- EIP-55 defines a checksum: mix uppercase and lowercase hex letters depending on the Keccak-256 of the address.

- Example: 0xAbC... instead of 0xabc.... Many wallets display the checksummed form.

- Important: checksumming does not change the address value — it only changes the casing for human error detection.

## Important technical details (short)
- Private key size: 32 bytes (256 bits).

- Public key: 64 bytes (uncompressed x || y) — do not include the 0x04 prefix when hashing for an address.

- Hash function: Ethereum uses Keccak-256 (this is very close to SHA-3, but Ethereum uses the original Keccak implementation).

- Address length: 20 bytes → 40 hex characters (plus 0x prefix when shown).

- Address bytes chosen: the last 20 bytes of the Keccak-256(public_key) output.

## Simple code snippets you can paste and try JavaScript (using ethers library)
```bash
// npm install ethers
const { ethers } = require("ethers");

// create random wallet
const wallet = ethers.Wallet.createRandom();

console.log("Private key:", wallet.privateKey);
console.log("Public key: ", wallet._signingKey().publicKey); // includes 0x04 prefix
console.log("Address:    ", wallet.address); // checksummed address (EIP-55)
```

## Quick checklist (for someone generating an address)
- Generate a secure 32-byte private key. Keep it secret.

- Compute public key by performing ECC point multiplication (secp256k1): public = private * G.

- Take the public key without any 0x04 prefix (64 bytes).

- Do keccak256(public_key).

- Take the last 20 bytes of the hash → hex → prepend 0x.

- (Optionally) apply EIP-55 checksum casing for safer display.

## Final friendly note
- The private key is the magic secret. If someone else gets it, they control the funds.

- The steps are deterministic: the same private key always gives the same address.

- Don’t hand out your private key — share your address instead.