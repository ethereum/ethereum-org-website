---
title: "ডার্ট ডেভেলপারদের জন্য ইথিরিয়াম"
description: "ডার্ট ভাষা ব্যবহার করে ইথিরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন"
lang: bn
incomplete: true
---

## স্মার্ট কন্ট্রাক্ট এবং সলিডিটি (Solidity) ভাষার সাথে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

## টিউটোরিয়াল {#tutorials}

- [ফ্লাটার এবং ব্লকচেইন – হ্যালো ওয়ার্ল্ড ডিএ্যাপ (Flutter and Blockchain – Hello World Dapp)](https://www.geeksforgeeks.org/flutter-and-blockchain-hello-world-dapp/) আপনাকে শুরু করার জন্য সমস্ত ধাপের মধ্য দিয়ে নিয়ে যায়:
  1.  [Solidity](https://soliditylang.org/)-তে একটি স্মার্ট কন্ট্রাক্ট লেখা
  2.  ডার্ট (Dart)-এ একটি ইউজার ইন্টারফেস লেখা
- [ফ্লাটার দিয়ে একটি মোবাইল ডিএ্যাপ তৈরি করা (Building a Mobile dapp with Flutter)](https://medium.com/dash-community/building-a-mobile-dapp-with-flutter-be945c80315a) অনেক ছোট, যা আপনার জন্য ভালো হতে পারে যদি আপনি ইতিমধ্যে বেসিক বিষয়গুলো জানেন
- আপনি যদি ভিডিও দেখে শিখতে পছন্দ করেন, তবে আপনি [আপনার প্রথম ব্লকচেইন ফ্লাটার অ্যাপ তৈরি করুন (Build Your First Blockchain Flutter App)](https://www.youtube.com/watch?v=3Eeh3pJ6PeA) দেখতে পারেন, যা প্রায় এক ঘণ্টা দীর্ঘ
- আপনি যদি অধৈর্য হন, তবে আপনি [ইথিরিয়ামে ফ্লাটার এবং ডার্ট দিয়ে একটি ব্লকচেইন ডিসেন্ট্রালাইজড এপ্লিকেশন তৈরি করা (Building a Blockchain Decentralized-app with Flutter and Dart on Ethereum)](https://www.youtube.com/watch?v=jaMFEOCq_1s) পছন্দ করতে পারেন, যা মাত্র বিশ মিনিটের মতো
- [WalletConnect-এর Web3Modal দিয়ে ফ্লাটার অ্যাপ্লিকেশনে MetaMask ইন্টিগ্রেট করা (Integrating MetaMask in Flutter application with Web3Modal by WalletConnect)](https://www.youtube.com/watch?v=v_M2buHCpc4) - এই ছোট ভিডিওটি আপনাকে WalletConnect-এর [Web3Modal](https://pub.dev/packages/web3modal_flutter) লাইব্রেরি দিয়ে আপনার ফ্লাটার অ্যাপ্লিকেশনগুলোতে MetaMask ইন্টিগ্রেট করার ধাপগুলোর মধ্য দিয়ে নিয়ে যায়
- [সলিডিটি এবং ফ্লাটার সহ মোবাইল ব্লকচেইন ডেভেলপার বুটক্যাম্প কোর্স (Mobile Blockchain Developer Bootcamp Course With Solidity & Flutter)](https://youtube.com/playlist?list=PL4V4Unlk5luhQ26ERO6hWEbcUwHDSSmVH) - ফুল স্ট্যাক মোবাইল ব্লকচেইন ডেভেলপার কোর্সের প্লেলিস্ট

## ইথিরিয়াম ক্লায়েন্ট নিয়ে কাজ করা {#working-with-ethereum-clients}

আপনি ইথিরিয়াম ব্যবহার করে ডিসেন্ট্রালাইজড এপ্লিকেশন (বা "ডিএ্যাপস") তৈরি করতে পারেন যা ক্রিপটোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলো কাজে লাগায়।
ইথিরিয়ামের জন্য [JSON-RPC API](/developers/docs/apis/json-rpc/) ব্যবহার করতে ডার্টের জন্য বর্তমানে রক্ষণাবেক্ষণ করা অন্তত দুটি লাইব্রেরি রয়েছে।

1. [pwa.ir থেকে Web3dart](https://pub.dev/packages/web3dart)
1. [darticulate.com থেকে Ethereum 5.0.0](https://pub.dev/packages/ethereum)

এছাড়াও অতিরিক্ত লাইব্রেরি রয়েছে যা আপনাকে নির্দিষ্ট ইথিরিয়াম এডড্রেস ম্যানিপুলেট করতে দেয়, বা যা আপনাকে বিভিন্ন ক্রিপটোকারেন্সি-এর দাম পুনরুদ্ধার করতে দেয়।
[আপনি এখানে সম্পূর্ণ তালিকা দেখতে পারেন](https://pub.dev/dart/packages?q=ethereum)।