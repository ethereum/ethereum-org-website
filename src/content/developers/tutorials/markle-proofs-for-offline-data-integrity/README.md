---
title: Merkle Proofs for Offline Data Integrity
description: Ensuring data integrity on chain for data that is stored, mostly, off chain
author: Ori Pomerantz
tags: ["merke", "integrity", "storage"]
skill: advanced
lang: en
sidebar: true
published: 2021-12-30
---

## Introduction

Ideally we'd like to store everything in Ethereum storage, which is stored across thousands of computers and has
extremely high availability (the data cannot be censored) and integrity (the data cannot be modified by in an
unauthorized manner), but storing a 32 byte word typically costs 20,000 gas. As I'm writing this, that cost is
equivalent to $6.60. At 21 cents a byte this is too expensive for most uses.

To solve this problem the Ethereum ecosystem developed [many alternative ways to store data in a decentralized 
fashion](https://ethereum.org/en/developers/docs/storage/). 
