---
title: "একটি স্থানীয়, মাল্টি-ক্লায়েন্ট টেস্টনেটে কীভাবে একটি dApp ডেভেলপ এবং পরীক্ষা করা যায়"
description: "এই গাইডটি আপনাকে প্রথমে একটি মাল্টি-ক্লায়েন্ট স্থানীয় Ethereum টেস্টনেটকে কীভাবে ইনস্ট্যানশিয়েট এবং কনফিগার করতে হয় তা দেখাবে এবং তারপরে dApp স্থাপন এবং পরীক্ষা করার জন্য টেস্টনেট ব্যবহার করবে।"
author: "Tedi Mitiku"
tags:
  [
    "ক্লায়েন্ট",
    "নোড",
    "স্মার্ট কন্ট্র্যাক্ট",
    "কম্পোজেবিলিটি",
    "কনসেন্সাস লেয়ার",
    "এক্সিকিউশন লেয়ার",
    "পরীক্ষা"
  ]
skill: intermediate
lang: bn
published: 2023-04-11
---

## ভূমিকা {#introduction}

এই গাইডটি আপনাকে একটি কনফিগারযোগ্য স্থানীয় Ethereum টেস্টনেট ইনস্ট্যানশিয়েট করার, এতে একটি স্মার্ট কন্ট্র্যাক্ট স্থাপন করার এবং আপনার dApp-এর বিরুদ্ধে পরীক্ষা চালানোর জন্য টেস্টনেট ব্যবহার করার প্রক্রিয়াটি দেখায়। এই গাইডটি dApp ডেভেলপারদের জন্য ডিজাইন করা হয়েছে যারা একটি লাইভ টেস্টনেট বা মেইননেটে স্থাপন করার আগে বিভিন্ন নেটওয়ার্ক কনফিগারেশনের বিরুদ্ধে স্থানীয়ভাবে তাদের dApps ডেভেলপ এবং পরীক্ষা করতে চান।

এই গাইডে, আপনি যা যা করবেন:

- [Kurtosis](https://www.kurtosis.com/) ব্যবহার করে [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)-এর সাথে একটি স্থানীয় Ethereum টেস্টনেট ইনস্ট্যানশিয়েট করুন,
- একটি dApp কম্পাইল, স্থাপন এবং পরীক্ষা করার জন্য আপনার Hardhat dApp ডেভেলপমেন্ট পরিবেশকে স্থানীয় টেস্টনেটের সাথে সংযুক্ত করুন, এবং
- বিভিন্ন নেটওয়ার্ক কনফিগারেশনের বিরুদ্ধে ডেভেলপমেন্ট এবং পরীক্ষার কর্মপ্রবাহ সক্রিয় করতে, স্থানীয় টেস্টনেট কনফিগার করুন, যার মধ্যে নোডের সংখ্যা এবং নির্দিষ্ট EL/CL ক্লায়েন্ট পেয়ারিং-এর মতো প্যারামিটার অন্তর্ভুক্ত রয়েছে।

### Kurtosis কী? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) একটি কম্পোজেবল বিল্ড সিস্টেম যা মাল্টি-কন্টেইনার পরীক্ষার পরিবেশ কনফিগার করার জন্য ডিজাইন করা হয়েছে। এটি বিশেষভাবে ডেভেলপারদের পুনরুৎপাদনযোগ্য পরিবেশ তৈরি করতে সক্ষম করে যার জন্য ডাইনামিক সেটআপ লজিক প্রয়োজন, যেমন ব্লকচেইন টেস্টনেট।

এই গাইডে, Kurtosis eth-network-package [`geth`](https://geth.ethereum.org/) এক্সিকিউশন লেয়ার (EL) ক্লায়েন্ট, সেইসাথে [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), এবং [`lodestar`](https://lodestar.chainsafe.io/) কনসেন্সাস লেয়ার (CL) ক্লায়েন্টগুলির জন্য সমর্থন সহ একটি স্থানীয় Ethereum টেস্টনেট চালু করে। এই প্যাকেজটি Hardhat Network, Ganache, এবং Anvil-এর মতো ফ্রেমওয়ার্কের নেটওয়ার্কগুলির জন্য একটি কনফিগারযোগ্য এবং কম্পোজেবল বিকল্প হিসেবে কাজ করে। Kurtosis ডেভেলপারদের ব্যবহৃত টেস্টনেটের উপর অধিক নিয়ন্ত্রণ এবং নমনীয়তা প্রদান করে, যা [Ethereum Foundation-এর the Merge পরীক্ষা করার জন্য Kurtosis ব্যবহার করার](https://www.kurtosis.com/blog/testing-the-ethereum-merge) একটি প্রধান কারণ এবং নেটওয়ার্ক আপগ্রেড পরীক্ষার জন্য এটি ব্যবহার করা অব্যাহত রয়েছে।

## Kurtosis সেট আপ করা {#setting-up-kurtosis}

এগিয়ে যাওয়ার আগে, নিশ্চিত করুন আপনার কাছে আছে:

- আপনার স্থানীয় মেশিনে [Docker ইঞ্জিন ইনস্টল এবং শুরু করেছেন](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI ইনস্টল করেছেন](https://docs.kurtosis.com/install#ii-install-the-cli) (অথবা যদি আপনার কাছে CLI আগে থেকেই ইনস্টল করা থাকে তবে এটিকে সর্বশেষ রিলিজে আপগ্রেড করেছেন)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), এবং [npx](https://www.npmjs.com/package/npx) ইনস্টল করেছেন (আপনার dApp পরিবেশের জন্য)

## একটি স্থানীয় Ethereum টেস্টনেট ইনস্ট্যানশিয়েট করা {#instantiate-testnet}

একটি স্থানীয় Ethereum টেস্টনেট চালু করতে, রান করুন:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

দ্রষ্টব্য: এই কমান্ডটি `--enclave` ফ্ল্যাগ ব্যবহার করে আপনার নেটওয়ার্কের নাম দেয়: "local-eth-testnet"।

Kurtosis নির্দেশাবলী ব্যাখ্যা, যাচাই এবং তারপর কার্যকর করার জন্য কাজ করার সময় যে পদক্ষেপগুলি নিচ্ছে তা প্রিন্ট করবে। শেষে, আপনার নিম্নলিখিতটির মতো একটি আউটপুট দেখা উচিত:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

অভিনন্দন! আপনি Docker-এর উপর একটি CL (`lighthouse`) এবং EL ক্লায়েন্ট (`geth`) সহ একটি স্থানীয় Ethereum টেস্টনেট ইনস্ট্যানশিয়েট করতে Kurtosis ব্যবহার করেছেন।

### পর্যালোচনা {#review-instantiate-testnet}

এই বিভাগে, আপনি একটি কমান্ড কার্যকর করেছেন যা Kurtosis-কে একটি Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/)-এর মধ্যে একটি স্থানীয় Ethereum টেস্টনেট চালু করতে GitHub-এ দূরবর্তীভাবে হোস্ট করা [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) ব্যবহার করতে নির্দেশ দিয়েছে। আপনার এনক্লেভের ভিতরে, আপনি "ফাইল আর্টিফ্যাক্ট" এবং "ব্যবহারকারী পরিষেবা" উভয়ই পাবেন।

আপনার এনক্লেভে থাকা [ফাইল আর্টিফ্যাক্ট](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) EL এবং CL ক্লায়েন্টদের বুটস্ট্র্যাপ করার জন্য তৈরি এবং ব্যবহৃত সমস্ত ডেটা অন্তর্ভুক্ত করে। এই [ডকার ইমেজ](https://github.com/ethpandaops/ethereum-genesis-generator) থেকে তৈরি `prelaunch-data-generator` পরিষেবা ব্যবহার করে ডেটা তৈরি করা হয়েছিল

ব্যবহারকারী পরিষেবাগুলি আপনার এনক্লেভে পরিচালিত সমস্ত কন্টেইনারাইজড পরিষেবা প্রদর্শন করে। আপনি লক্ষ্য করবেন যে একটি একক নোড, যেখানে একটি EL ক্লায়েন্ট এবং একটি CL ক্লায়েন্ট উভয়ই রয়েছে, তৈরি করা হয়েছে।

## আপনার dApp ডেভেলপমেন্ট পরিবেশকে স্থানীয় Ethereum টেস্টনেটের সাথে সংযুক্ত করুন {#connect-your-dapp}

### dApp ডেভেলপমেন্ট পরিবেশ সেটআপ করুন {#set-up-dapp-env}

এখন যেহেতু আপনার একটি চলমান স্থানীয় টেস্টনেট আছে, আপনি আপনার dApp ডেভেলপমেন্ট পরিবেশকে আপনার স্থানীয় টেস্টনেট ব্যবহার করার জন্য সংযুক্ত করতে পারেন। এই গাইডে আপনার স্থানীয় টেস্টনেটে একটি ব্ল্যাকজ্যাক dApp স্থাপন করতে Hardhat ফ্রেমওয়ার্ক ব্যবহার করা হবে।

আপনার dApp ডেভেলপমেন্ট পরিবেশ সেট আপ করতে, আমাদের স্যাম্পল dApp ধারণকারী রিপোজিটরিটি ক্লোন করুন এবং এর নির্ভরতাগুলি ইনস্টল করুন, রান করুন:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

এখানে ব্যবহৃত [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) ফোল্ডারে [Hardhat](https://hardhat.org/) ফ্রেমওয়ার্ক ব্যবহারকারী একজন dApp ডেভেলপারের জন্য সাধারণ সেটআপ রয়েছে:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts)-এ একটি Blackjack dApp-এর জন্য কয়েকটি সহজ স্মার্ট কন্ট্র্যাক্ট রয়েছে
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts)-এ আপনার স্থানীয় Ethereum নেটওয়ার্কে একটি টোকেন কন্ট্র্যাক্ট স্থাপন করার জন্য একটি স্ক্রিপ্ট রয়েছে
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test)-এ আপনার টোকেন কন্ট্র্যাক্টের জন্য একটি সহজ .js পরীক্ষা রয়েছে যা নিশ্চিত করে যে আমাদের Blackjack dApp-এর প্রতিটি খেলোয়াড়ের জন্য 1000 মিন্ট করা হয়েছে
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) আপনার Hardhat সেটআপ কনফিগার করে

### স্থানীয় টেস্টনেট ব্যবহার করার জন্য Hardhat কনফিগার করুন {#configure-hardhat}

আপনার dApp ডেভেলপমেন্ট পরিবেশ সেট আপ করার সাথে, আপনি এখন Kurtosis ব্যবহার করে তৈরি স্থানীয় Ethereum টেস্টনেট ব্যবহার করতে Hardhat-কে সংযুক্ত করবেন। এটি সম্পন্ন করতে, আপনার `hardhat.config.ts` কনফিগারেশন ফাইলের `localnet` স্ট্রাক্টে `<$YOUR_PORT>` কে যেকোনো `el-client-<num>` পরিষেবা থেকে rpc uri আউটপুটের পোর্ট দিয়ে প্রতিস্থাপন করুন। এই স্যাম্পল ক্ষেত্রে, পোর্ট হবে `64248`। আপনার পোর্ট ভিন্ন হবে।

`hardhat.config.ts`-এ উদাহরণ:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORT-কে ETH নেটওয়ার্ক কার্টোসিস প্যাকেজ দ্বারা উৎপাদিত একটি নোড URI-এর পোর্ট দিয়ে প্রতিস্থাপন করুন

// এগুলি হল eth-নেটওয়ার্ক-প্যাকেজ দ্বারা তৈরি প্রিফান্ডেড টেস্ট অ্যাকাউন্টের সাথে যুক্ত প্রাইভেট কী
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

একবার আপনি আপনার ফাইলটি সংরক্ষণ করলে, আপনার Hardhat dApp ডেভেলপমেন্ট পরিবেশ এখন আপনার স্থানীয় Ethereum টেস্টনেটের সাথে সংযুক্ত! আপনি রান করে যাচাই করতে পারেন যে আপনার টেস্টনেট কাজ করছে:

```python
npx hardhat balances --network localnet
```

আউটপুটটি এইরকম দেখতে হবে:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

এটি নিশ্চিত করে যে Hardhat আপনার স্থানীয় টেস্টনেট ব্যবহার করছে এবং `eth-network-package` দ্বারা তৈরি প্রি-ফান্ডেড অ্যাকাউন্টগুলি সনাক্ত করছে।

### স্থানীয়ভাবে আপনার dApp স্থাপন এবং পরীক্ষা করুন {#deploy-and-test-dapp}

dApp ডেভেলপমেন্ট পরিবেশটি স্থানীয় Ethereum টেস্টনেটের সাথে সম্পূর্ণরূপে সংযুক্ত থাকায়, আপনি এখন স্থানীয় টেস্টনেট ব্যবহার করে আপনার dApp-এর বিরুদ্ধে ডেভেলপমেন্ট এবং পরীক্ষার কর্মপ্রবাহ চালাতে পারেন।

স্থানীয় প্রোটোটাইপিং এবং ডেভেলপমেন্টের জন্য `ChipToken.sol` স্মার্ট কন্ট্র্যাক্ট কম্পাইল এবং স্থাপন করতে, রান করুন:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

আউটপুটটি এইরকম দেখতে হবে:

```python
ChipToken এখানে স্থাপন করা হয়েছে: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

এখন আপনার স্থানীয় dApp-এর বিরুদ্ধে `simple.js` পরীক্ষাটি চালিয়ে চেষ্টা করুন এটি নিশ্চিত করতে যে আমাদের Blackjack dApp-এর প্রতিটি খেলোয়াড়ের জন্য 1000 মিন্ট করা হয়েছে:

আউটপুটটি এইরকম দেখতে হবে:

```python
npx hardhat test --network localnet
```

আউটপুটটি এইরকম দেখতে হবে:

```python
ChipToken
    mint
      ✔ প্লেয়ার ওয়ানের জন্য 1000 চিপ মিন্ট করা উচিত

  1 পাসিং (654ms)
```

### পর্যালোচনা {#review-dapp-workflows}

এই মুহূর্তে, আপনি একটি dApp ডেভেলপমেন্ট পরিবেশ সেট আপ করেছেন, এটিকে Kurtosis দ্বারা তৈরি একটি স্থানীয় Ethereum নেটওয়ার্কের সাথে সংযুক্ত করেছেন, এবং আপনার dApp-এর বিরুদ্ধে একটি সহজ পরীক্ষা কম্পাইল, স্থাপন এবং চালিয়েছেন।

এখন আসুন অন্বেষণ করা যাক কীভাবে আপনি বিভিন্ন নেটওয়ার্ক কনফিগারেশনের অধীনে আমাদের ডিএ্যাপস পরীক্ষা করার জন্য অন্তর্নিহিত নেটওয়ার্ক কনফিগার করতে পারেন।

## স্থানীয় Ethereum টেস্টনেট কনফিগার করা {#configure-testnet}

### ক্লায়েন্ট কনফিগারেশন এবং নোডের সংখ্যা পরিবর্তন করা {#configure-client-config-and-num-nodes}

আপনার স্থানীয় Ethereum টেস্টনেটটি বিভিন্ন EL এবং CL ক্লায়েন্ট পেয়ার, সেইসাথে বিভিন্ন সংখ্যক নোড ব্যবহার করার জন্য কনফিগার করা যেতে পারে, যা আপনি যে পরিস্থিতি এবং নির্দিষ্ট নেটওয়ার্ক কনফিগারেশন ডেভেলপ বা পরীক্ষা করতে চান তার উপর নির্ভর করে। এর মানে হল যে, একবার সেট আপ হয়ে গেলে, আপনি একটি কাস্টমাইজড স্থানীয় টেস্টনেট চালু করতে পারেন এবং একই কর্মপ্রবাহ (স্থাপন, পরীক্ষা, ইত্যাদি) চালানোর জন্য এটি ব্যবহার করতে পারেন। সবকিছু প্রত্যাশিতভাবে কাজ করে তা নিশ্চিত করার জন্য বিভিন্ন নেটওয়ার্ক কনফিগারেশনের অধীনে। আপনি যে অন্যান্য প্যারামিটারগুলি পরিবর্তন করতে পারেন সে সম্পর্কে আরও জানতে, এই লিঙ্কটি দেখুন।

একবার চেষ্টা করে দেখুন! আপনি একটি JSON ফাইলের মাধ্যমে `eth-network-package`-এ বিভিন্ন কনফিগারেশন বিকল্প পাস করতে পারেন। এই নেটওয়ার্ক প্যারামস JSON ফাইলটি নির্দিষ্ট কনফিগারেশন সরবরাহ করে যা Kurtosis স্থানীয় Ethereum নেটওয়ার্ক সেট আপ করতে ব্যবহার করবে।

ডিফল্ট কনফিগারেশন ফাইলটি নিন এবং বিভিন্ন EL/CL পেয়ার সহ দুটি নোড চালু করতে এটি সম্পাদনা করুন:

- নোড 1 `geth`/`lighthouse` সহ
- নোড 2 `geth`/`lodestar` সহ
- নোড 3 `geth`/`teku` সহ

এই কনফিগারেশনটি আপনার dApp পরীক্ষা করার জন্য Ethereum নোড বাস্তবায়নের একটি ভিন্নধর্মী নেটওয়ার্ক তৈরি করে। আপনার কনফিগারেশন ফাইলটি এখন এইরকম দেখতে হবে:

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

প্রতিটি `participants` স্ট্রাক্ট নেটওয়ার্কের একটি নোডের সাথে ম্যাপ করে, তাই 3টি `participants` স্ট্রাক্ট Kurtosis-কে আপনার নেটওয়ার্কে 3টি নোড চালু করতে বলবে। প্রতিটি `participants` স্ট্রাক্ট আপনাকে সেই নির্দিষ্ট নোডের জন্য ব্যবহৃত EL এবং CL পেয়ার নির্দিষ্ট করার অনুমতি দেবে।

`network_params` স্ট্রাক্টটি নেটওয়ার্ক সেটিংস কনফিগার করে যা প্রতিটি নোডের জন্য জেনেসিস ফাইল তৈরি করতে ব্যবহৃত হয় এবং সেইসাথে নেটওয়ার্কের প্রতি স্লটে সেকেন্ডের মতো অন্যান্য সেটিংস।

আপনার সম্পাদিত প্যারামস ফাইলটি আপনার ইচ্ছামত যেকোনো ডিরেক্টরিতে সংরক্ষণ করুন (নীচের উদাহরণে, এটি ডেস্কটপে সংরক্ষণ করা হয়েছে) এবং তারপর রান করে আপনার Kurtosis প্যাকেজ চালানোর জন্য এটি ব্যবহার করুন:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

দ্রষ্টব্য: `kurtosis clean -a` কমান্ডটি এখানে Kurtosis-কে নতুন একটি শুরু করার আগে পুরানো টেস্টনেট এবং এর বিষয়বস্তু ধ্বংস করার নির্দেশ দেওয়ার জন্য ব্যবহৃত হয়।

আবার, Kurtosis কিছুক্ষণ কাজ করবে এবং যে পৃথক পদক্ষেপগুলি ঘটছে তা প্রিন্ট করবে। অবশেষে, আউটপুটটি এইরকম দেখতে হবে:

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

অভিনন্দন! আপনি সফলভাবে আপনার স্থানীয় টেস্টনেটকে 1টির পরিবর্তে 3টি নোড থাকার জন্য কনফিগার করেছেন। আপনার dApp-এর বিরুদ্ধে (স্থাপন ও পরীক্ষা) আপনি আগে যে কর্মপ্রবাহগুলি করেছিলেন তা চালাতে, আপনার `hardhat.config.ts` কনফিগারেশন ফাইলের `localnet` স্ট্রাক্টে `<$YOUR_PORT>`-কে আপনার নতুন, 3-নোড স্থানীয় টেস্টনেটের যেকোনো `el-client-<num>` পরিষেবা থেকে rpc uri আউটপুটের পোর্ট দিয়ে প্রতিস্থাপন করে আমরা আগে যে একই অপারেশনগুলি করেছিলাম তা সম্পাদন করুন।

## উপসংহার {#conclusion}

এবং এটাই সব! এই সংক্ষিপ্ত গাইডটি সংক্ষেপে বলতে গেলে, আপনি:

- Kurtosis ব্যবহার করে Docker-এর উপর একটি স্থানীয় Ethereum টেস্টনেট তৈরি করেছেন
- আপনার স্থানীয় dApp ডেভেলপমেন্ট পরিবেশকে স্থানীয় Ethereum নেটওয়ার্কের সাথে সংযুক্ত করেছেন
- স্থানীয় Ethereum নেটওয়ার্কে একটি dApp স্থাপন করেছেন এবং এর বিরুদ্ধে একটি সহজ পরীক্ষা চালিয়েছেন
- অন্তর্নিহিত Ethereum নেটওয়ার্ককে 3টি নোড থাকার জন্য কনফিগার করেছেন

আপনার জন্য কী ভালো হয়েছে, কী উন্নত করা যেতে পারে, বা আপনার যেকোনো প্রশ্নের উত্তর দিতে আমরা আপনার কাছ থেকে শুনতে আগ্রহী। [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)-এর মাধ্যমে যোগাযোগ করতে বা [আমাদের ইমেল করতে](mailto:feedback@kurtosistech.com) দ্বিধা করবেন না!

### অন্যান্য উদাহরণ এবং গাইড {#other-examples-guides}

আমরা আপনাকে আমাদের [কুইকস্টার্ট](https://docs.kurtosis.com/quickstart) (যেখানে আপনি একটি Postgres ডাটাবেস এবং এর উপরে API তৈরি করবেন) এবং আমাদের [awesome-kurtosis রিপোজিটরি](https://github.com/kurtosis-tech/awesome-kurtosis)-তে আমাদের অন্যান্য উদাহরণগুলি দেখতে উৎসাহিত করি যেখানে আপনি প্যাকেজ সহ কিছু দুর্দান্ত উদাহরণ পাবেন:

- [একই স্থানীয় Ethereum টেস্টনেট চালু করা](https://github.com/kurtosis-tech/eth2-package), কিন্তু অতিরিক্ত পরিষেবা সংযুক্ত সহ যেমন একটি লেনদেন স্প্যামার (লেনদেন সিমুলেট করতে), একটি ফর্ক মনিটর, এবং একটি সংযুক্ত Grafana এবং Prometheus ইনস্ট্যান্স
- একই স্থানীয় Ethereum নেটওয়ার্কের বিরুদ্ধে একটি [সাব-নেটওয়ার্কিং পরীক্ষা](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) সম্পাদন করা
