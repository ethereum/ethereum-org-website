---
title: ডটনেট ডেভেলপারদের জন্য ইথেরিয়াম
description: শিখুন কীভাবে ডটনেটভিত্তিক প্রজেক্ট ও টুলিঙ ব্যবহার করে ইথেরিয়ামের জন্য ডেভেলপ করা যায়
lang: bn
incomplete: true
---

<FeaturedText>.NET-ভিত্তিক প্রজেক্ট ও টুলিং ব্যবহার করে কীভাবে ইথেরিয়ামের জন্য ডেভেলপ করা যায় তা শিখুন</FeaturedText>

ইথেরিয়াম ব্যবহার করে বিকেন্দ্রীভূত অ্যাপ্লিকেশন (বা "ড্যাপস") তৈরি করুন যেগুলো ক্রিপ্টোকারেন্সি এবং ব্লকচেইন প্রযুক্তির সুবিধাগুলোকে কাজে লাগায়।. এই ড্যাপগুলো বিশ্বাসযোগ্য হতে পারে, অর্থাৎ এগুলোকে একবার ইথেরিয়ামে প্রয়োগ করা হয়ে গেলে, এগুলো সবসময় প্রোগ্রামড হিসেবে চলতে থাকবে।. নতুন ধরণের আর্থিক অ্যাপ্লিকেশন তৈরি করার জন্য এগুলো ডিজিটাল সম্পদকে নিয়ন্ত্রণ করতে পারে।. এগুলো বিকেন্দ্রীভূত হতে পারে, যার মানে কোন একক সত্ত্বা বা ব্যক্তি এগুলো নিয়ন্ত্রণ করেনা এবং এগুলো সেন্সর করা প্রায় অসম্ভব।.

মাইক্রোসফট প্রযুক্তি স্ট্যাকের বিভিন্ন টুলস ও ল্যাঙ্গুয়েজ ব্যবহার করে ইথেরিয়ামে বিকেন্দ্রীভূত অ্যাপ্লিকেশন তৈরি করুন এবং স্মার্ট কন্ট্র্যাক্টগুলোর সাথে ইন্টারেক্ট করুন - C#, # ভিজুয়াল ব্যাসিক .NET, F#-কে সমর্থন করে, .NET ফ্রেমওয়ার্ক/.NET Core/.NET স্ট্যান্ডার্ড জুড়ে VSCode ও ভিজুয়াল স্টুডিওর মতো টুলিং-এ।. মাইক্রোসফট অ্যাজিওর ব্লকচেইন ব্যবহার করে কয়েক মিনিটের মধ্যে অ্যাজিওর-এ একটি ইথেরিয়াম ব্লকচেইন ডেপ্লয় করুন।. .NET এর প্রতি ভালবাসাকে ইথেরিয়ামে নিয়ে আসুন!

## স্মার্ট কন্ট্র্যাক্ট এবং সলিডিটি ভাষা দিয়ে শুরু করা {#getting-started-with-smart-contracts-and-the-solidity-language}

**ডটনেটের সাথে ইথেরিয়ামকে যুক্ত করার প্রথম পদক্ষেপ নিন**

একদম প্রথম থেকে শুরু করতে চান? [ethereum.org/learn](/learn/) বা [ethereum.org/developers](/developers/) দেখুন।

- [ব্লকচেইনের ব্যাখ্যা](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [স্মার্ট কন্ট্র্যাক্ট বোঝা](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [আপনার প্রথম স্মার্ট কন্ট্র্যাক্টটি লিখুন](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [কীভাবে Solidity কম্পাইল এবং ডিপ্লয় করতে হয় তা শিখুন](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## নতুনদের জন্য রেফারেন্স এবং লিঙ্ক {#beginner-references-and-links}

**Nethereum লাইব্রেরি এবং VS কোড সলিডিটির পরিচিতি**

- [Nethereum, শুরু করা](https://docs.nethereum.com/en/latest/getting-started/)
- [VS কোড সলিডিটি ইনস্টল করা](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [ইথেরিয়াম স্মার্ট কন্ট্র্যাক্ট তৈরি এবং কল করার জন্য একজন .NET ডেভেলপারের ওয়ার্কফ্লো](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Nethereum-এর সাথে স্মার্ট কন্ট্র্যাক্টের ইন্টিগ্রেশন](https://kauri.io/#collections/Getting%20Started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereumm)
- [Nethereum-এর সাথে .NET এবং ইথেরিয়াম ব্লকচেইন স্মার্ট কন্ট্র্যাক্ট ইন্টারফেস করা](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), এছাড়াও [中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1)
- [Nethereum - ব্লকচেইনের জন্য একটি ওপেন সোর্স .NET ইন্টিগ্রেশন লাইব্রেরি](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [Nethereum ব্যবহার করে SQL ডেটাবেসে ইথেরিয়াম ট্রানজ্যাকশন লেখা](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [C# এবং VisualStudio ব্যবহার করে কীভাবে সহজে ইথেরিয়াম স্মার্ট কন্ট্র্যাক্ট ডেপ্লয় করা যায় তা দেখুন](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**এখন সেটআপ বাদ দিয়ে সরাসরি কিছু নমুনা দেখতে চান?**

- [প্লেগ্রাউন্ড](http://playground.nethereum.com/) - ইথেরিয়ামের সাথে ইন্টারঅ্যাক্ট করুন এবং ব্রাউজারের মাধ্যমে কীভাবে Nethereum ব্যবহার করতে হয় তা শিখুন।
  - অ্যাকাউন্ট ব্যালেন্স কোয়েরি করুন [C#](http://playground.nethereum.com/csharp/id/1001) [VB.NET](http://playground.nethereum.com/vb/id/2001)
  - ERC20 স্মার্ট কন্ট্র্যাক্ট ব্যালেন্স কোয়েরি করুন [C#](http://playground.nethereum.com/csharp/id/1005) [VB.NET](http://playground.nethereum.com/vb/id/2004)
  - একটি অ্যাকাউন্টে ইথার ট্রান্সফার করুন [C#](http://playground.nethereum.com/csharp/id/1003) [VB.NET](http://playground.nethereum.com/vb/id/2003)
  - ... এবং আরো!

## মধ্যবর্তী স্তরের নিবন্ধ {#intermediate-articles}

- [Nethereum ওয়ার্কবুক/নমুনা লিস্ট](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [আপনার নিজস্ব ডেভেলপমেন্ট টেস্টচেইন ডেপ্লয় করুন](https://github.com/Nethereum/Testchains)
- [সলিডিটির জন্য VSCode কোডজেন প্লাগইন](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [ইউনিটি এবং ইথেরিয়াম: কেন এবং কীভাবে](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [ইথেরিয়াম ডিএ্যাপস-এর জন্য ASP.NET Core ওয়েব API তৈরি করুন](https://tech-mint.com/blockchain/create-asp-net-core-web-api-for-ethereum-dapps/)
- [একটি সাপ্লাই চেইন ট্র্যাকিং সিস্টেম বাস্তবায়নের জন্য Nethereum Web3 ব্যবহার করা](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [Nethereum ব্লক প্রসেসিং](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/), সাথে [C# প্লেগ্রাউন্ড নমুনা](http://playground.nethereum.com/csharp/id/1025)
- [Nethereum ওয়েবসকেট স্ট্রিমিং](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [Kaleido এবং Nethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum এবং Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## উন্নত ব্যবহারের প্যাটার্ন {#advanced-use-patterns}

- [Azure Key Vault এবং Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Ujo Nethereum ব্যাকএন্ড রেফারেন্স আর্কিটেকচার](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## .NET প্রজেক্ট, টুলস এবং অন্যান্য মজার জিনিস {#dot-net-projects-tools-and-other-fun-stuff}

- [Nethereum প্লেগ্রাউন্ড](http://playground.nethereum.com/) - _ব্রাউজারে Nethereum কোড স্নিপেট কম্পাইল, তৈরি এবং রান করুন_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Blazor-এ UI সহ Nethereum কোডজেন_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _একটি .NET Wasm SPA লাইট ব্লকচেইন এক্সপ্লোরার এবং একটি সাধারণ ওয়ালেট_
- [Wonka Business Rules Engine](https://docs.nethereum.com/en/latest/wonka/) - _একটি বিজনেস রুলস ইঞ্জিন (.NET প্ল্যাটফর্ম এবং ইথেরিয়াম প্ল্যাটফর্ম উভয়ের জন্য) যা অন্তর্নিহিতভাবে মেটাডেটা-চালিত_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Linux, Windows, MacOS-এর জন্য একটি .NET কোর ইথেরিয়াম ক্লায়েন্ট_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _Ethereum সম্পর্কিত কোডবেসের সাথে কাজ করার জন্য ইউটিলিটি ফাংশন_
- [TestChains](https://github.com/Nethereum/TestChains) - _দ্রুত প্রতিক্রিয়ার জন্য আগে থেকে কনফিগার করা .NET ডেভচেইনস (PoA)_

আরও সংস্থান খুঁজছেন? [ethereum.org/developers](/developers/) দেখুন।

## .NET কমিউনিটি কন্ট্রিবিউটর {#dot-net-community-contributors}

Nethereum-এ আমরা বেশিরভাগ সময় [Gitter](https://gitter.im/Nethereum/Nethereum)-এ কাটাই, যেখানে সবাই প্রশ্ন জিজ্ঞাসা করতে/উত্তর দিতে, সাহায্য নিতে, বা শুধু আড্ডা দিতে পারেন। নির্দ্বিধায় [Nethereum GitHub রিপোজিটরি](https://github.com/Nethereum)-তে একটি PR করুন বা একটি ইস্যু খুলুন, অথবা আমাদের অনেক সাইড/নমুনা প্রজেক্ট ব্রাউজ করুন। আমাদেরকে [Discord](https://discord.gg/jQPrR58FxX)-এও পাবেন!

আপনি যদি Nethermind-এ নতুন হন এবং শুরু করার জন্য সাহায্যের প্রয়োজন হয়, তাহলে আমাদের [Discord](http://discord.gg/PaCMRFdvWT)-এ যোগ দিন। আপনার প্রশ্নের উত্তর দেওয়ার জন্য আমাদের ডেভেলপাররা প্রস্তুত আছেন। [Nethermind GitHub রিপোজিটরি](https://github.com/NethermindEth/nethermind)-তে একটি PR খুলতে বা কোনো ইস্যু জানাতে দ্বিধা করবেন না।

## অন্যান্য একত্রিত তালিকা {#other-aggregated-lists}

[অফিসিয়াল Nethereum সাইট](https://nethereum.com/)  
[অফিসিয়াল Nethermind সাইট](https://nethermind.io/)
