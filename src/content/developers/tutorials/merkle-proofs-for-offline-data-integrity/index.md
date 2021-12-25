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
fashion](https://ethereum.org/en/developers/docs/storage/). Usually they involve a tradeoff between availability
and price. However, integrity is usually assured.

In this article you learn **how** to ensure data integrity without storing the data on the blockchain, using
[merkle proofs](https://computersciencewiki.org/index.php/Merkle_proof). 

## How does it work?

In theory we could just store the hash of the data on chain, and send all the data in transactions that
require it. However, this is still too expensive. A byte of data to a transaction costs about 16 gas, 
currently about half a cent, or about $5 per kilobyte. At $5000 per megabyte, this is still too expensive
for many uses.

The solution is to repeatedly hash different subsets of the data, so for the data that you don't need to 
send you can just send a hash. You do this using a Merkle tree, a tree data structure where each node is a hash
of the nodes below it:

![Merkle Tree](tree.png)

The root hash is the only part that needs to be stored on chain. To prove a certain value, for example C, you
provide all the hashes that need to be combined with it to obtain the root: `D`, `H(A-B)`, and `H(E-H)`.

![Proof of the value of C](proof-c.png)


## Creating the Merkle Root

First we need a trusted source to provide the Merkle Root. Let's write it in JavaScript using [Node](https://nodejs.org/en/).

```javascript
const ethers = require('ethers')
```

[We use the hash function from the ethers package](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. This code
// is an airdrop, with the first two bytes a one time password to identify
// the user, and the last two bytes the amount of tokens the user
// gets. 
//
// Two bytes is ridiculously low for a password, but this is sample code.
// DO NOT USE IN PRODUCTION SYSTEMS
const dataArray = [
    0x0BAD0010, 0x60A70020, 0xBEEF0030, 0xDEAD0040, 0xCA110050,
    0x0E660060, 0xFACE0070, 0xBAD00080, 0x060D0091
]
```

Encoding each entry into a single 256 bit integer results in less readable code than using JSON, for example. However, this means significantly less processing to retrieve the data in the contract, so much lower gas costs. [You can read JSON on chain](https://github.com/chrisdotn/jsmnSol), but your users would prefer you didn't.

```javascript
const hashArray = dataArray.map(val => val.toString(16).padStart(64, "0"))
```

The data array is an array of integers. However, to hash values we need hexadecimal strings (without the `0x` prefix for now). This code fragment converts the values into hexadecimal strings and then pads the to make sure we don't have an odd number of hexadecimal digits (which is a problem when converting the value to bytes).

```javascript
// The hash function, which also handles adding 0x to the input and 
// chopping it from the output
const hash = x => ethers.utils.keccak256("0x" + x).slice(2)
```

The ethers hash function expects to get a Javascript string with a hexadecimal number, such as `0x60A7`, and responds with another string with the same structure. However, in this code it is easier to use hexadecimal strings without the `0x` prefix, because we need to [concatenate](https://en.wikipedia.org/wiki/Concatenation) values so often. This function converts between the two formats.

```javascript
// The hash of an empty value, useful when the array size is not 2^n
const hashEmpty = hash("")
```

When the number of values is not an integer power of two we need to handle empty branches. The way this program does it is to put the hash of the empty value as a place holder.


```javascript
// Calculate one level up the tree of a hash array by taking the hash of 
// each pair in sequence
const oneLevelUp = inputArray => {
    var result = []
    var inp = [...inputArray]    // To avoid over writing the input

    // Add an empty value if necessary (we need all the leaves to be
    // paired)
    if (inp.length % 2 === 1)
        inp.push(hashEmpty)

    for(var i=0; i<inp.length; i+=2)
        result.push(hash(inp[i] + inp[i+1]))

    return result
}    // oneLevelUp


// Get the merkle root of a hashArray
const getMerkleRoot = inputArray => {
    var result

    result = [...inputArray]

    // Climb up the tree until there is only one value, that is the
    // root. 
    //
    // Note that if a layer has an odd number of entries the
    // code in oneLevelUp adds an empty value, so if we have, for example,
    // 10 leaves we'll have 5 branches in the second layer, 3
    // branches in the third, 2 in the fourth and the root is the fifth       
    while(result.length > 1)
        result = oneLevelUp(result)

    return result[0]
}

const merkleRoot = getMerkleRoot(hashArray)
console.log(`Merkle Root: ${merkleRoot}`)

// A merkle proof for the n'th value of an array consists of the value of n
// and a list of entries to hash with, going all the way to the top.
//
// We need the value of n to tell us whether the current value should be before
// or after the value from the proof when hashed
const getMerkleProof = (inputArray, n) => {
    var result = [n], currentLayer = [...inputArray], currentN = n

    // Until we reach the top
    while (currentLayer.length > 1) {
        // No odd length layers
        if (currentLayer.length % 2)
            currentLayer.push(hashEmpty)

        result.push(currentN % 2    
               // If currentN is odd, add the value before it and hash
            ? currentLayer[currentN-1] 
               // If it is even, add the value after it and hash
            : currentLayer[currentN+1])

        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof



// Verify a merkle proof that the value hashes to nValueHash, for 
// a given merkle root. This code needs to be run by the contract, so we'll 
// translate it to Solidity. We do not need n as a separate parameter,
// because it is part of the proof.
const verifyMerkleProof = (root, nValueHash, proof) => {
    var branchLoc = proof[0] // The branch's location within the current layer
    var hashVal = nValueHash // The hash for this layer

    // Tree layer
    for(layer=1; layer<proof.length; layer++) {

        // If the location is odd, hash with the previous location
        if (branchLoc % 2)
            // Because the first value is the item being proved, we 
            // the proof for a layer is in proof[layer]
            hashVal = hash(proof[layer] + hashVal)
        else   // Hash with the next location
            hashVal = hash(hashVal + proof[layer])

        // Get ready for the next layer
        branchLoc = Math.floor(branchLoc/2)
    }

    return root === hashVal
}  // verifyMerkleProof




const itemProved = 5
const proof = getMerkleProof(hashArray, itemProved)
console.log(`Merkle proof for item ${itemProved}: ${proof}`)



console.log(`Should succeed: ${
      verifyMerkleProof(merkleRoot, hashArray[itemProved], proof)}`)


console.log(`Should fail: ${
      verifyMerkleProof(merkleRoot, hashArray[itemProved % 2], proof)}`)


```




## Conclusion
