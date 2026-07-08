---
title: "Dart ডেভেলপারদের জন্য ইথেরিয়াম"
description: "Dart ভাষা ব্যবহার করে ইথেরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন"
lang: bn
incomplete: true
---

## স্মার্ট কন্ট্রাক্ট এবং Solidity ভাষার সাথে শুরু করা {#getting-started-with-smart-contracts-and-solidity}

## টিউটোরিয়াল {#tutorials}

- [Flutter এবং ব্লকচেইন – Hello World Dapp](https://www.geeksforgeeks.org/flutter-and-blockchain-hello-world-dapp/) আপনাকে শুরু করার জন্য সমস্ত ধাপের মধ্য দিয়ে নিয়ে যায়:
  1.  [Solidity](https://soliditylang.org/)-তে একটি স্মার্ট কন্ট্রাক্ট লেখা
  2.  Dart-এ একটি ইউজার ইন্টারফেস লেখা
- [Flutter দিয়ে একটি মোবাইল dapp তৈরি করা](https://medium.com/dash-community/building-a-mobile-dapp-with-flutter-be945c80315a) অনেক ছোট, যা আপনার জন্য ভালো হতে পারে যদি আপনি ইতিমধ্যে বেসিক বিষয়গুলো জানেন
- আপনি যদি ভিডিও দেখে শিখতে পছন্দ করেন, তবে আপনি [Build Your First Blockchain Flutter App](https://www.youtube.com/watch?v=3Eeh3pJ6PeA) দেখতে পারেন, যা প্রায় এক ঘণ্টা দীর্ঘ
- আপনি যদি অধৈর্য হন, তবে আপনি [Building a Blockchain Decentralized-app with Flutter and Dart on Ethereum](https://www.youtube.com/watch?v=jaMFEOCq_1s) পছন্দ করতে পারেন, যা মাত্র বিশ মিনিটের মতো
- [Integrating MetaMask in Flutter application with Web3Modal by WalletConnect](https://www.youtube.com/watch?v=v_M2buHCpc4) - এই ছোট ভিডিওটি আপনাকে WalletConnect-এর [Web3Modal](https://pub.dev/packages/web3modal_flutter) লাইব্রেরি দিয়ে আপনার Flutter অ্যাপ্লিকেশনগুলোতে মেটামাস্ক ইন্টিগ্রেট করার ধাপগুলোর মধ্য দিয়ে নিয়ে যায়
- [Mobile Blockchain Developer Bootcamp Course With Solidity & Flutter](https://youtube.com/playlist?list=PL4V4Unlk5luhQ26ERO6hWEbcUwHDSSmVH) - ফুল স্ট্যাক মোবাইল ব্লকচেইন ডেভেলপার কোর্সের প্লেলিস্ট

## ইথেরিয়াম ক্লায়েন্ট নিয়ে কাজ করা {#working-with-ethereum-clients}

আপনি ইথেরিয়াম ব্যবহার করে বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) তৈরি করতে পারেন যা ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলো কাজে লাগায়।
ইথেরিয়ামের জন্য [জেসন-আরপিসি API](/developers/docs/apis/json-rpc/) ব্যবহার করতে Dart-এর জন্য বর্তমানে রক্ষণাবেক্ষণ করা অন্তত দুটি লাইব্রেরি রয়েছে।

1. [pwa.ir থেকে Web3dart](https://pub.dev/packages/web3dart)
1. [darticulate.com থেকে Ethereum 5.0.0](https://pub.dev/packages/ethereum)

এছাড়াও অতিরিক্ত লাইব্রেরি রয়েছে যা আপনাকে নির্দিষ্ট ইথেরিয়াম ঠিকানাগুলো ম্যানিপুলেট করতে দেয়, অথবা যা আপনাকে বিভিন্ন ক্রিপ্টোকারেন্সির দাম পুনরুদ্ধার করতে দেয়।
[আপনি এখানে সম্পূর্ণ তালিকা দেখতে পারেন](https://pub.dev/dart/packages?q=ethereum)।