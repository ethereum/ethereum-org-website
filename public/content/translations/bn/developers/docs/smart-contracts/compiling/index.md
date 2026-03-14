---
title: "স্মার্ট কন্ট্র্যাক্ট কম্পাইল করা"
description: "স্মার্ট কন্ট্র্যাক্ট কেন কম্পাইল করতে হবে এবং কম্পাইলেশন আসলে কী করে তার একটি ব্যাখ্যা।"
lang: bn
incomplete: true
---

আপনার কন্ট্র্যাক্টটি আপনাকে কম্পাইল করতে হবে যাতে আপনার ওয়েব অ্যাপ এবং ইথিরিয়াম ভার্চুয়াল মেশিন (EVM) এটি বুঝতে পারে।

## পূর্বশর্ত {#prerequisites}

কম্পাইলেশন সম্পর্কে পড়ার আগে আমাদের [স্মার্ট কন্ট্র্যাক্ট](/developers/docs/smart-contracts/) এবং [ইথিরিয়াম ভার্চুয়াল মেশিন](/developers/docs/evm/) এর পরিচিতি পড়ে নেওয়াটা আপনার জন্য সহায়ক হতে পারে।

## EVM {#the-evm}

আপনার কন্ট্র্যাক্টটি চালানোর জন্য [EVM](/developers/docs/evm/)-এর কাছে এটি **বাইটকোডে** থাকা প্রয়োজন। কম্পাইলেশন এটিকে পরিবর্তন করে:

```solidity
pragma solidity 0.4.24;

contract Greeter {

    function greet() public view returns (string memory) {
        return "Hello";
    }

}
```

**এইরূপে**

```
PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xCFAE3217 EQ PUSH2 0x46 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x5B PUSH2 0xD6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x48656C6C6F000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SLT 0xec 0xe 0xf5 0xf8 SLT 0xc7 0x2d STATICCALL ADDRESS SHR 0xdb COINBASE 0xb1 BALANCE 0xe8 0xf8 DUP14 0xda 0xad DUP13 LOG1 0x4c 0xb4 0x26 0xc2 DELEGATECALL PUSH7 0x8994D3E002900
```

এগুলোকে **অপকোড** বলা হয়। EVM অপকোডগুলি হল নিম্ন-স্তরের নির্দেশাবলী যা ইথিরিয়াম ভার্চুয়াল মেশিন (EVM) এক্সিকিউট করতে পারে। প্রতিটি অপকোড একটি নির্দিষ্ট অপারেশনকে প্রতিনিধিত্ব করে, যেমন গাণিতিক অপারেশন, লজিক্যাল অপারেশন, ডেটা ম্যানিপুলেশন, কন্ট্রোল ফ্লো ইত্যাদি।

[অপকোড সম্পর্কে আরও](/developers/docs/evm/opcodes/)

## ওয়েব অ্যাপ্লিকেশন {#web-applications}

কম্পাইলার **অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI)**-ও তৈরি করবে, যা আপনার অ্যাপ্লিকেশনের কন্ট্র্যাক্ট বুঝতে এবং কন্ট্র্যাক্টের ফাংশন কল করার জন্য প্রয়োজন।

ABI হল একটি JSON ফাইল যা ডেপ্লয়েড কন্ট্র্যাক্ট এবং এর স্মার্ট কন্ট্র্যাক্টের ফাংশনগুলিকে বর্ণনা করে। এটি web2 এবং web3-এর মধ্যে সেতুবন্ধন করতে সাহায্য করে।

আপনার ওয়েব অ্যাপের ইন্টারফেস থেকে আপনার স্মার্ট কন্ট্র্যাক্ট কল করার জন্য একটি [জাভাস্ক্রিপ্ট ক্লায়েন্ট লাইব্রেরি](/developers/docs/apis/javascript/) **ABI** রিড করবে।

নিচে ERC-20 টোকেন কন্ট্র্যাক্টের জন্য ABI দেওয়া হল। একটি ERC-20 হল একটি টোকেন যা আপনি ইথেরিয়াম-এ ট্রেড করতে পারেন।

```json
[
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
]
```

## আরও পড়ুন {#further-reading}

- [ABI স্পেক](https://solidity.readthedocs.io/en/v0.7.0/abi-spec.html) _– Solidity_

## সম্পর্কিত বিষয় {#related-topics}

- [জাভাস্ক্রিপ্ট ক্লায়েন্ট লাইব্রেরি](/developers/docs/apis/javascript/)
- [ইথিরিয়াম ভার্চুয়াল মেশিন](/developers/docs/evm/)
