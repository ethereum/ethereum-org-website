---
title: ".NET ডেভেলপারদের জন্য ইথেরিয়াম"
description: ".NET-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথেরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন"
lang: bn
incomplete: true
---

<FeaturedText>.NET-ভিত্তিক প্রজেক্ট এবং টুলিং ব্যবহার করে ইথেরিয়ামের জন্য কীভাবে ডেভেলপ করতে হয় তা শিখুন</FeaturedText>

ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলো কাজে লাগায় এমন বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) তৈরি করতে ইথেরিয়াম ব্যবহার করুন। এই dapp-গুলো নির্ভরযোগ্য হতে পারে, যার মানে হলো একবার এগুলো ইথেরিয়ামে ডিপ্লয় করা হলে, এগুলো সবসময় প্রোগ্রাম করা নিয়ম অনুযায়ী চলবে। নতুন ধরনের আর্থিক অ্যাপ্লিকেশন তৈরি করার জন্য এগুলো ডিজিটাল সম্পদ নিয়ন্ত্রণ করতে পারে। এগুলো বিকেন্দ্রীকৃত হতে পারে, যার মানে হলো কোনো একক সত্তা বা ব্যক্তি এগুলোকে নিয়ন্ত্রণ করে না এবং এগুলো সেন্সর করা প্রায় অসম্ভব।

মাইক্রোসফট টেকনোলজি স্ট্যাকের টুল এবং ভাষা ব্যবহার করে ইথেরিয়ামের ওপর বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp) তৈরি করুন এবং স্মার্ট কন্ট্রাক্ট-এর সাথে ইন্টারঅ্যাক্ট করুন - যা C#, # Visual Basic .NET, F# সমর্থন করে, VSCode এবং Visual Studio-এর মতো টুলিংয়ে, .NET Framework/.NET Core/.NET Standard জুড়ে। মাইক্রোসফট অ্যাজিউর ব্লকচেইন (Microsoft Azure Blockchain) ব্যবহার করে কয়েক মিনিটের মধ্যে অ্যাজিউরে (Azure) একটি ইথেরিয়াম ব্লকচেইন ডিপ্লয় করুন। .NET-এর প্রতি ভালোবাসাকে ইথেরিয়ামে নিয়ে আসুন!

## স্মার্ট কন্ট্রাক্ট এবং Solidity ভাষার সাথে শুরু করা {#getting-started-with-smart-contracts-and-the-solidity-language}

**ইথেরিয়ামের সাথে .NET ইন্টিগ্রেট করার প্রথম পদক্ষেপ নিন**

প্রথমে আরও প্রাথমিক নির্দেশিকা প্রয়োজন? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইন ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্রাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্রাক্ট লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## নতুনদের জন্য রেফারেন্স এবং লিংক {#beginner-references-and-links}

**Nethereum লাইব্রেরি এবং VS Code Solidity-এর পরিচিতি**

- [Nethereum, শুরু করা](https://docs.nethereum.com/docs/getting-started/welcome/)
- [VS Code Solidity ইনস্টল করা](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [ইথেরিয়াম স্মার্ট কন্ট্রাক্ট তৈরি এবং কল করার জন্য একজন .NET ডেভেলপারের ওয়ার্কফ্লো](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Nethereum-এর সাথে স্মার্ট কন্ট্রাক্ট ইন্টিগ্রেশন](https://kauri.io/#collections/Getting%20Started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereumm)
- [Nethereum-এর মাধ্যমে .NET এবং ইথেরিয়াম ব্লকচেইন স্মার্ট কন্ট্রাক্ট-এর ইন্টারফেসিং](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), এছাড়াও [中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1)-এ উপলব্ধ
- [Nethereum - ব্লকচেইন-এর জন্য একটি ওপেন সোর্স .NET ইন্টিগ্রেশন লাইব্রেরি](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [Nethereum ব্যবহার করে SQL ডেটাবেসে ইথেরিয়াম ট্রানজ্যাকশন লেখা](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [C# এবং VisualStudio ব্যবহার করে কীভাবে সহজে ইথেরিয়াম স্মার্ট কন্ট্রাক্ট ডিপ্লয় করা যায় তা দেখুন](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**আপাতত সেটআপ এড়িয়ে সরাসরি স্যাম্পলগুলোতে যেতে চান?**

- [Nethereum Playground](https://playground.nethereum.com/) - ইথেরিয়াম-এর সাথে ইন্টারঅ্যাক্ট করুন এবং ব্রাউজারের মাধ্যমে কীভাবে Nethereum ব্যবহার করতে হয় তা শিখুন।
  - [অ্যাকাউন্ট ব্যালেন্স কোয়েরি করুন](https://docs.nethereum.com/docs/core-foundation/guide-query-balance)
  - [ERC-20 স্মার্ট কন্ট্রাক্ট ব্যালেন্স কোয়েরি করুন](https://docs.nethereum.com/docs/smart-contracts/erc20)
  - [একটি অ্যাকাউন্ট-এ ইথার হস্তান্তর করুন](https://docs.nethereum.com/docs/core-foundation/guide-send-eth)
  - ... এবং আরও অনেক কিছু!
## ইন্টারমিডিয়েট আর্টিকেল {#intermediate-articles}

- [Nethereum শুরু করা এবং প্রথম প্রজেক্ট](https://docs.nethereum.com/docs/getting-started/first-project)
- [আপনার নিজস্ব ডেভেলপমেন্ট টেস্টচেইন ডিপ্লয় করুন](https://github.com/Nethereum/Testchains)
- [Nethereum এবং VS Code-এর মাধ্যমে কোড জেনারেশন](https://docs.nethereum.com/docs/smart-contracts/code-generation/)
- [Unity এবং ইথেরিয়াম: কেন এবং কীভাবে](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [ইথেরিয়াম বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp)-এর জন্য ASP.NET Core Web API তৈরি করুন](https://tech-mint.com/blockchain/create-asp-net-core-web-api-for-ethereum-dapps/)
- [স্ট্রাকচার্ড অনচেইন অ্যাপ্লিকেশন-এর জন্য Nethereum MUD ফ্রেমওয়ার্ক](https://docs.nethereum.com/docs/mud-framework/overview/)
- [Nethereum ব্লকচেইন প্রসেসিং](https://docs.nethereum.com/docs/data-and-indexing/guide-blockchain-processing)
- [Nethereum রিয়েল-টাইম স্ট্রিমিং](https://docs.nethereum.com/docs/core-foundation/guide-realtime-streaming/)
- [Kaleido এবং Nethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum এবং Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)
## অ্যাডভান্সড ব্যবহারের প্যাটার্ন {#advanced-use-patterns}

- [Azure কী ভল্ট এবং Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Ujo Nethereum ব্যাকএন্ড রেফারেন্স আর্কিটেকচার](https://github.com/Nethereum/ujo-backend)
## .NET প্রজেক্ট, টুল এবং অন্যান্য মজার জিনিস {#dot-net-projects-tools-and-other-fun-stuff}

- [Nethereum Playground](https://playground.nethereum.com/) - _ব্রাউজারে Nethereum কোড স্নিপেট কম্পাইল, তৈরি এবং রান করুন_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Blazor-এ UI সহ Nethereum কোডজেন_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _একটি .NET Wasm SPA লাইট ব্লকচেইন এক্সপ্লোরার এবং সাধারণ ওয়ালেট_
- [Wonka Business Rules Engine](https://github.com/Nethereum/Wonka) - _একটি বিজনেস রুলস ইঞ্জিন (.NET প্ল্যাটফর্ম এবং ইথেরিয়াম প্ল্যাটফর্ম উভয়ের জন্য) যা মূলত মেটাডেটা-চালিত_
- [নেদারমাইন্ড](https://github.com/NethermindEth/nethermind) - _Linux, Windows, MacOS-এর জন্য একটি .NET Core ইথেরিয়াম ক্লায়েন্ট_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _ইথেরিয়াম সম্পর্কিত কোডবেস নিয়ে কাজ করার জন্য ইউটিলিটি ফাংশন_
- [TestChains](https://github.com/Nethereum/TestChains) - _দ্রুত রেসপন্সের জন্য প্রি-কনফিগার করা .NET ডেভচেইন (প্রুফ-অফ-অথরিটি (PoA))_

আরও রিসোর্স খুঁজছেন? [ethereum.org/developers](/developers/) দেখুন।
## .NET কমিউনিটি কন্ট্রিবিউটর {#dot-net-community-contributors}

Nethereum-এ, আমরা বেশিরভাগ সময় [Gitter](https://gitter.im/Nethereum/Nethereum)-এ আড্ডা দিই, যেখানে যে কেউ প্রশ্ন করতে/উত্তর দিতে, সাহায্য পেতে বা শুধু সময় কাটাতে আসতে পারেন। নির্দ্বিধায় একটি PR করুন বা [Nethereum GitHub রিপোজিটরিতে](https://github.com/Nethereum) একটি ইস্যু খুলুন, অথবা আমাদের অনেক সাইড/স্যাম্পল প্রজেক্টগুলো ঘুরে দেখুন। আপনি আমাদের [ডিসকর্ড](https://discord.gg/jQPrR58FxX)-এও খুঁজে পেতে পারেন!

আপনি যদি নেদারমাইন্ড-এ নতুন হয়ে থাকেন এবং শুরু করার জন্য সাহায্যের প্রয়োজন হয়, তবে আমাদের [ডিসকর্ড](https://discord.gg/PaCMRFdvWT)-এ যোগ দিন। আপনার প্রশ্নের উত্তর দেওয়ার জন্য আমাদের ডেভেলপাররা প্রস্তুত আছেন। [নেদারমাইন্ড GitHub রিপোজিটরিতে](https://github.com/NethermindEth/nethermind) একটি PR খুলতে বা কোনো ইস্যু উত্থাপন করতে দ্বিধা করবেন না।

## অন্যান্য অ্যাগ্রিগেটেড তালিকা {#other-aggregated-lists}

[অফিসিয়াল Nethereum সাইট](https://nethereum.com/)  
[অফিসিয়াল নেদারমাইন্ড সাইট](https://nethermind.io/)
