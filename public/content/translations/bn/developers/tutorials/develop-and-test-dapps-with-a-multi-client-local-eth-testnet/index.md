---
title: "কীভাবে একটি লোকাল, মাল্টি-ক্লায়েন্ট টেস্টনেট-এ একটি ডিএ্যাপ ডেভেলপ এবং টেস্ট করবেন"
description: "এই গাইডটি প্রথমে আপনাকে দেখাবে কীভাবে একটি মাল্টি-ক্লায়েন্ট লোকাল ইথিরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট এবং কনফিগার করতে হয়, এরপর সেই টেস্টনেট ব্যবহার করে একটি ডিএ্যাপ ডিপ্লয় এবং টেস্ট করার প্রক্রিয়া বর্ণনা করবে।"
author: "টেডি মিতিকু"
tags:
  [
    "ক্লায়েন্টস",
    "নোডস",
    "স্মার্ট কন্ট্রাক্ট",
    "কম্পোজেবিলিটি",
    "কনসেন্সাস লেয়ার",
    "এক্সিকিউশন লেয়ার",
    "টেস্টিং",
  ]
skill: intermediate
breadcrumb: "মাল্টি-ক্লায়েন্ট টেস্টনেট"
lang: bn
published: 2023-04-11
---

## ভূমিকা {#introduction}

এই গাইডটি আপনাকে একটি কনফিগারযোগ্য লোকাল ইথিরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট করা, এতে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করা এবং আপনার ডিএ্যাপ-এর বিরুদ্ধে টেস্ট চালানোর জন্য টেস্টনেট ব্যবহার করার প্রক্রিয়ার মধ্য দিয়ে নিয়ে যাবে। এই গাইডটি সেইসব ডিএ্যাপ ডেভেলপারদের জন্য তৈরি করা হয়েছে যারা একটি লাইভ টেস্টনেট বা মেইননেট-এ ডিপ্লয় করার আগে বিভিন্ন নেটওয়ার্ক কনফিগারেশনের বিপরীতে লোকালি তাদের ডিএ্যাপস ডেভেলপ এবং টেস্ট করতে চান।

এই গাইডে, আপনি যা করবেন:

- [Kurtosis](https://www.kurtosis.com/) ব্যবহার করে [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)-এর সাহায্যে একটি লোকাল ইথিরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট করবেন,
- একটি ডিএ্যাপ কম্পাইল, ডিপ্লয় এবং টেস্ট করার জন্য আপনার Hardhat ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্টকে লোকাল টেস্টনেট-এর সাথে কানেক্ট করবেন, এবং
- বিভিন্ন নেটওয়ার্ক কনফিগারেশনের বিপরীতে ডেভেলপমেন্ট এবং টেস্টিং ওয়ার্কফ্লো সক্ষম করতে নোড-এর সংখ্যা এবং নির্দিষ্ট EL/CL ক্লায়েন্ট পেয়ারিংয়ের মতো প্যারামিটারসহ লোকাল টেস্টনেট কনফিগার করবেন।

### Kurtosis কী? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) হলো একটি কম্পোজেবল বিল্ড সিস্টেম যা মাল্টি-কন্টেইনার টেস্ট এনভায়রনমেন্ট কনফিগার করার জন্য ডিজাইন করা হয়েছে। এটি বিশেষভাবে ডেভেলপারদের এমন রিপ্রোডিউসিবল এনভায়রনমেন্ট তৈরি করতে সক্ষম করে যার জন্য ডাইনামিক সেটআপ লজিক প্রয়োজন, যেমন ব্লকচেইন টেস্টনেট।

এই গাইডে, Kurtosis eth-network-package একটি লোকাল ইথিরিয়াম টেস্টনেট চালু করে যা [`geth`](https://geth.ethereum.org/) এক্সিকিউশন লেয়ার (EL) ক্লায়েন্ট, সেইসাথে [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), এবং [`lodestar`](https://lodestar.chainsafe.io/) কনসেন্সাস লেয়ার (CL) ক্লায়েন্ট সমর্থন করে। এই প্যাকেজটি Hardhat Network, Ganache, এবং Anvil-এর মতো ফ্রেমওয়ার্কের নেটওয়ার্কগুলোর একটি কনফিগারযোগ্য এবং কম্পোজেবল বিকল্প হিসেবে কাজ করে। Kurtosis ডেভেলপারদের তাদের ব্যবহৃত টেস্টনেটগুলোর ওপর আরও বেশি নিয়ন্ত্রণ এবং ফ্লেক্সিবিলিটি প্রদান করে, যা একটি প্রধান কারণ যে কেন [ইথিরিয়াম ফাউন্ডেশন Merge টেস্ট করার জন্য Kurtosis ব্যবহার করেছিল](https://www.kurtosis.com/blog/testing-the-ethereum-merge) এবং নেটওয়ার্ক আপগ্রেড টেস্টিংয়ের জন্য এটি ব্যবহার করা চালিয়ে যাচ্ছে।

## Kurtosis সেটআপ করা {#setting-up-kurtosis}

এগিয়ে যাওয়ার আগে, নিশ্চিত করুন যে আপনার কাছে আছে:

- আপনার লোকাল মেশিনে [Docker ইঞ্জিন ইনস্টল এবং চালু করা আছে](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI ইনস্টল করা আছে](https://docs.kurtosis.com/install#ii-install-the-cli) (অথবা যদি আপনার কাছে আগে থেকেই CLI ইনস্টল করা থাকে, তবে এটি লেটেস্ট রিলিজে আপগ্রেড করা আছে)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), এবং [npx](https://www.npmjs.com/package/npx) ইনস্টল করা আছে (আপনার ডিএ্যাপ এনভায়রনমেন্টের জন্য)

## একটি লোকাল ইথিরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট করা {#instantiate-testnet}

একটি লোকাল ইথিরিয়াম টেস্টনেট চালু করতে, রান করুন:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

নোট: এই কমান্ডটি `--enclave` ফ্ল্যাগ ব্যবহার করে আপনার নেটওয়ার্কের নাম দেয়: "local-eth-testnet”।

Kurtosis নির্দেশাবলী ইন্টারপ্রেট, ভ্যালিডেট এবং তারপর এক্সিকিউট করার জন্য কাজ করার সময় এর ভেতরের পদক্ষেপগুলো প্রিন্ট করবে। শেষে, আপনার নিচের মতো একটি আউটপুট দেখা উচিত:

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

অভিনন্দন! আপনি Docker-এর ওপর একটি CL (`lighthouse`) এবং EL ক্লায়েন্ট (`geth`) সহ একটি লোকাল ইথিরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট করতে Kurtosis ব্যবহার করেছেন।

### পর্যালোচনা {#review-instantiate-testnet}

এই সেকশনে, আপনি একটি কমান্ড এক্সিকিউট করেছেন যা Kurtosis-কে একটি Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/)-এর মধ্যে একটি লোকাল ইথিরিয়াম টেস্টনেট চালু করতে [GitHub-এ রিমোটলি হোস্ট করা `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) ব্যবহার করার নির্দেশ দিয়েছে। আপনার এনক্লেভের ভেতরে, আপনি "file artifacts" এবং "user services" উভয়ই পাবেন।

আপনার এনক্লেভের [File Artifacts](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)-এ EL এবং CL ক্লায়েন্ট বুটস্ট্র্যাপ করার জন্য জেনারেট করা এবং ব্যবহৃত সমস্ত ডাটা অন্তর্ভুক্ত রয়েছে। এই ডাটাটি এই [Docker ইমেজ](https://github.com/ethpandaops/ethereum-genesis-generator) থেকে তৈরি `prelaunch-data-generator` সার্ভিস ব্যবহার করে তৈরি করা হয়েছিল।

ইউজার সার্ভিসগুলো আপনার এনক্লেভে পরিচালিত সমস্ত কন্টেইনারাইজড সার্ভিস প্রদর্শন করে। আপনি লক্ষ্য করবেন যে একটি একক নোড তৈরি করা হয়েছে, যাতে একটি EL ক্লায়েন্ট এবং একটি CL ক্লায়েন্ট উভয়ই রয়েছে।

## আপনার ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্টকে লোকাল ইথিরিয়াম টেস্টনেট-এর সাথে কানেক্ট করুন {#connect-your-dapp}

### ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্ট সেটআপ করুন {#set-up-dapp-env}

এখন যেহেতু আপনার একটি চলমান লোকাল টেস্টনেট আছে, আপনি আপনার লোকাল টেস্টনেট ব্যবহার করার জন্য আপনার ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্ট কানেক্ট করতে পারেন। এই গাইডে আপনার লোকাল টেস্টনেট-এ একটি ব্ল্যাকজ্যাক ডিএ্যাপ ডিপ্লয় করতে Hardhat ফ্রেমওয়ার্ক ব্যবহার করা হবে।

আপনার ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্ট সেট আপ করতে, আমাদের স্যাম্পল ডিএ্যাপ ধারণকারী রিপোজিটরিটি ক্লোন করুন এবং এর ডিপেন্ডেন্সিগুলো ইনস্টল করুন, রান করুন:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

এখানে ব্যবহৃত [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) ফোল্ডারে [Hardhat](https://hardhat.org/) ফ্রেমওয়ার্ক ব্যবহারকারী একজন ডিএ্যাপ ডেভেলপারের জন্য সাধারণ সেটআপ রয়েছে:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts)-এ একটি ব্ল্যাকজ্যাক ডিএ্যাপ-এর জন্য কয়েকটি সাধারণ স্মার্ট কন্ট্রাক্ট রয়েছে
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts)-এ আপনার লোকাল ইথিরিয়াম নেটওয়ার্ক-এ একটি টোকেন কন্ট্রাক্ট ডিপ্লয় করার জন্য একটি স্ক্রিপ্ট রয়েছে
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test)-এ আপনার টোকেন কন্ট্রাক্টের জন্য একটি সাধারণ .js টেস্ট রয়েছে যা নিশ্চিত করে যে আমাদের ব্ল্যাকজ্যাক ডিএ্যাপ-এর প্রতিটি প্লেয়ারের জন্য 1000 মিন্ট করা হয়েছে
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) আপনার Hardhat সেটআপ কনফিগার করে

### লোকাল টেস্টনেট ব্যবহার করার জন্য Hardhat কনফিগার করুন {#configure-hardhat}

আপনার ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্ট সেট আপ হওয়ার পর, আপনি এখন Kurtosis ব্যবহার করে জেনারেট করা লোকাল ইথিরিয়াম টেস্টনেট ব্যবহার করার জন্য Hardhat কানেক্ট করবেন। এটি সম্পন্ন করতে, আপনার `hardhat.config.ts` কনফিগ ফাইলের `localnet` স্ট্রাক্টে থাকা `<$YOUR_PORT>`-কে যেকোনো `el-client-<num>` সার্ভিস থেকে পাওয়া rpc uri আউটপুটের পোর্ট দিয়ে রিপ্লেস করুন। এই স্যাম্পল ক্ষেত্রে, পোর্টটি হবে `64248`। আপনার পোর্ট ভিন্ন হবে।

`hardhat.config.ts`-এ উদাহরণ:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>', // TODO: ETH NETWORK KURTOSIS PACKAGE দ্বারা তৈরি একটি NODE URI এর পোর্ট দিয়ে $YOUR_PORT প্রতিস্থাপন করুন

// এগুলো হলো eth-network-package দ্বারা তৈরি প্রিফান্ডেড টেস্ট অ্যাকাউন্টগুলোর সাথে যুক্ত প্রাইভেট কী
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

একবার আপনি আপনার ফাইল সেভ করলে, আপনার Hardhat ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্ট এখন আপনার লোকাল ইথিরিয়াম টেস্টনেট-এর সাথে কানেক্ট হয়ে যাবে! আপনি নিচের কমান্ডটি রান করে যাচাই করতে পারেন যে আপনার টেস্টনেট কাজ করছে:

```python
npx hardhat balances --network localnet
```

আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

এটি নিশ্চিত করে যে Hardhat আপনার লোকাল টেস্টনেট ব্যবহার করছে এবং `eth-network-package` দ্বারা তৈরি প্রি-ফান্ডেড একাউন্টগুলো ডিটেক্ট করছে।

### লোকালি আপনার ডিএ্যাপ ডিপ্লয় এবং টেস্ট করুন {#deploy-and-test-dapp}

ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্ট লোকাল ইথিরিয়াম টেস্টনেট-এর সাথে সম্পূর্ণভাবে কানেক্ট হওয়ার পর, আপনি এখন লোকাল টেস্টনেট ব্যবহার করে আপনার ডিএ্যাপ-এর বিপরীতে ডেভেলপমেন্ট এবং টেস্টিং ওয়ার্কফ্লো রান করতে পারেন।

লোকাল প্রোটোটাইপিং এবং ডেভেলপমেন্টের জন্য `ChipToken.sol` স্মার্ট কন্ট্রাক্ট কম্পাইল এবং ডিপ্লয় করতে, রান করুন:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

এখন আমাদের ব্ল্যাকজ্যাক ডিএ্যাপ-এর প্রতিটি প্লেয়ারের জন্য 1000 মিন্ট করা হয়েছে তা নিশ্চিত করতে আপনার লোকাল ডিএ্যাপ-এর বিপরীতে `simple.js` টেস্ট রান করার চেষ্টা করুন:

আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

```python
npx hardhat test --network localnet
```

আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### পর্যালোচনা {#review-dapp-workflows}

এই পর্যায়ে, আপনি এখন একটি ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্ট সেট আপ করেছেন, এটিকে Kurtosis দ্বারা তৈরি একটি লোকাল ইথিরিয়াম নেটওয়ার্ক-এর সাথে কানেক্ট করেছেন এবং আপনার ডিএ্যাপ-এর বিপরীতে একটি সাধারণ টেস্ট কম্পাইল, ডিপ্লয় এবং রান করেছেন।

এখন চলুন দেখি কীভাবে আপনি বিভিন্ন নেটওয়ার্ক কনফিগারেশনের অধীনে আমাদের ডিএ্যাপস টেস্ট করার জন্য আন্ডারলাইং নেটওয়ার্ক কনফিগার করতে পারেন।

## লোকাল ইথিরিয়াম টেস্টনেট কনফিগার করা {#configure-testnet}

### ক্লায়েন্ট কনফিগারেশন এবং নোড-এর সংখ্যা পরিবর্তন করা {#configure-client-config-and-num-nodes}

আপনি যে সিনারিও এবং নির্দিষ্ট নেটওয়ার্ক কনফিগারেশন ডেভেলপ বা টেস্ট করতে চান তার ওপর নির্ভর করে আপনার লোকাল ইথিরিয়াম টেস্টনেট বিভিন্ন EL এবং CL ক্লায়েন্ট পেয়ার, সেইসাথে বিভিন্ন সংখ্যক নোড ব্যবহার করার জন্য কনফিগার করা যেতে পারে। এর মানে হলো, একবার সেট আপ হয়ে গেলে, আপনি একটি কাস্টমাইজড লোকাল টেস্টনেট চালু করতে পারেন এবং সবকিছু প্রত্যাশা অনুযায়ী কাজ করছে তা নিশ্চিত করতে বিভিন্ন নেটওয়ার্ক কনফিগারেশনের অধীনে একই ওয়ার্কফ্লো (ডিপ্লয়মেন্ট, টেস্ট ইত্যাদি) রান করতে এটি ব্যবহার করতে পারেন। আপনি পরিবর্তন করতে পারেন এমন অন্যান্য প্যারামিটার সম্পর্কে আরও জানতে, এই লিঙ্কে ভিজিট করুন।

চেষ্টা করে দেখুন! আপনি একটি JSON ফাইলের মাধ্যমে `eth-network-package`-এ বিভিন্ন কনফিগারেশন অপশন পাস করতে পারেন। এই নেটওয়ার্ক প্যারামস JSON ফাইলটি নির্দিষ্ট কনফিগারেশন প্রদান করে যা Kurtosis লোকাল ইথিরিয়াম নেটওয়ার্ক সেট আপ করতে ব্যবহার করবে।

ডিফল্ট কনফিগারেশন ফাইলটি নিন এবং বিভিন্ন EL/CL পেয়ারসহ দুটি নোড চালু করতে এটি এডিট করুন:

- নোড 1 `geth`/`lighthouse` সহ
- নোড 2 `geth`/`lodestar` সহ
- নোড 3 `geth`/`teku` সহ

এই কনফিগারেশনটি আপনার ডিএ্যাপ টেস্ট করার জন্য ইথিরিয়াম নোড ইমপ্লিমেন্টেশনের একটি হেটেরোজিনিয়াস নেটওয়ার্ক তৈরি করে। আপনার কনফিগারেশন ফাইলটি এখন দেখতে এরকম হওয়া উচিত:

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

প্রতিটি `participants` স্ট্রাক্ট নেটওয়ার্ক-এর একটি নোড-এ ম্যাপ করে, তাই 3টি `participants` স্ট্রাক্ট Kurtosis-কে আপনার নেটওয়ার্ক-এ 3টি নোড চালু করতে বলবে। প্রতিটি `participants` স্ট্রাক্ট আপনাকে সেই নির্দিষ্ট নোড-এর জন্য ব্যবহৃত EL এবং CL পেয়ার নির্দিষ্ট করার অনুমতি দেবে।

`network_params` স্ট্রাক্ট নেটওয়ার্ক সেটিংস কনফিগার করে যা প্রতিটি নোড-এর জন্য জেনেসিস ফাইল তৈরি করতে ব্যবহৃত হয়, সেইসাথে নেটওয়ার্ক-এর সেকেন্ডস পার স্লট-এর মতো অন্যান্য সেটিংসও কনফিগার করে।

আপনার এডিট করা প্যারামস ফাইলটি আপনার ইচ্ছামতো যেকোনো ডিরেক্টরিতে সেভ করুন (নিচের উদাহরণে, এটি ডেস্কটপে সেভ করা হয়েছে) এবং তারপর নিচের কমান্ডটি রান করে আপনার Kurtosis প্যাকেজ রান করতে এটি ব্যবহার করুন:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

নোট: `kurtosis clean -a` কমান্ডটি এখানে Kurtosis-কে একটি নতুন টেস্টনেট শুরু করার আগে পুরানো টেস্টনেট এবং এর কন্টেন্টগুলো ধ্বংস করার নির্দেশ দিতে ব্যবহৃত হয়।

আবারও, Kurtosis কিছুক্ষণ কাজ করবে এবং যে পৃথক পদক্ষেপগুলো নেওয়া হচ্ছে তা প্রিন্ট করবে। শেষ পর্যন্ত, আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

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

অভিনন্দন! আপনি সফলভাবে আপনার লোকাল টেস্টনেট-এ 1টির পরিবর্তে 3টি নোড থাকার জন্য কনফিগার করেছেন। আপনার ডিএ্যাপ-এর বিপরীতে আগের মতো একই ওয়ার্কফ্লো (ডিপ্লয় এবং টেস্ট) রান করতে, আপনার নতুন, 3-নোড লোকাল টেস্টনেট-এর যেকোনো `el-client-<num>` সার্ভিস থেকে পাওয়া rpc uri আউটপুটের পোর্ট দিয়ে আপনার `hardhat.config.ts` কনফিগ ফাইলের `localnet` স্ট্রাক্টে থাকা `<$YOUR_PORT>` রিপ্লেস করে আগের মতো একই অপারেশনগুলো সম্পাদন করুন।

## উপসংহার {#conclusion}

আর এভাবেই শেষ হলো! এই সংক্ষিপ্ত গাইডটির সারসংক্ষেপ হিসেবে, আপনি:

- Kurtosis ব্যবহার করে Docker-এর ওপর একটি লোকাল ইথিরিয়াম টেস্টনেট তৈরি করেছেন
- আপনার লোকাল ডিএ্যাপ ডেভেলপমেন্ট এনভায়রনমেন্টকে লোকাল ইথিরিয়াম নেটওয়ার্ক-এর সাথে কানেক্ট করেছেন
- লোকাল ইথিরিয়াম নেটওয়ার্ক-এ একটি ডিএ্যাপ ডিপ্লয় করেছেন এবং এর বিপরীতে একটি সাধারণ টেস্ট রান করেছেন
- আন্ডারলাইং ইথিরিয়াম নেটওয়ার্ক-এ 3টি নোড থাকার জন্য কনফিগার করেছেন

আপনার জন্য কোনটি ভালো কাজ করেছে, কী উন্নত করা যেতে পারে, বা আপনার যেকোনো প্রশ্নের উত্তর দিতে আমরা আপনার কাছ থেকে শুনতে চাই। [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)-এর মাধ্যমে যোগাযোগ করতে বা [আমাদের ইমেইল করতে](mailto:feedback@kurtosistech.com) দ্বিধা করবেন না!

### অন্যান্য উদাহরণ এবং গাইড {#other-examples-guides}

আমরা আপনাকে আমাদের [কুইকস্টার্ট](https://docs.kurtosis.com/quickstart) (যেখানে আপনি একটি Postgres ডাটাবেস এবং এর ওপর API তৈরি করবেন) এবং আমাদের [awesome-kurtosis রিপোজিটরি](https://github.com/kurtosis-tech/awesome-kurtosis)-তে থাকা অন্যান্য উদাহরণগুলো চেক করার জন্য উৎসাহিত করছি, যেখানে আপনি কিছু চমৎকার উদাহরণ পাবেন, যার মধ্যে রয়েছে নিচের প্যাকেজগুলো:

- [একই লোকাল ইথিরিয়াম টেস্টনেট চালু করা](https://github.com/kurtosis-tech/eth2-package), তবে অতিরিক্ত সার্ভিস কানেক্ট করা যেমন একটি ট্রানজেকশন স্প্যামার (লেনদেন সিমুলেট করার জন্য), একটি ফর্ক মনিটর, এবং একটি কানেক্টেড Grafana ও Prometheus ইনস্ট্যান্স
- একই লোকাল ইথিরিয়াম নেটওয়ার্ক-এর বিপরীতে একটি [সাব-নেটওয়ার্কিং টেস্ট](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) সম্পাদন করা