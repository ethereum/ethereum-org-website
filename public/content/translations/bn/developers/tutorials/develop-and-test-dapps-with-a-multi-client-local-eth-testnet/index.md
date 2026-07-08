---
title: "কীভাবে একটি লোকাল, মাল্টি-ক্লায়েন্ট টেস্টনেটে একটি dapp তৈরি এবং টেস্ট করবেন"
description: "এই গাইডটি প্রথমে আপনাকে দেখাবে কীভাবে একটি মাল্টি-ক্লায়েন্ট লোকাল ইথেরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট এবং কনফিগার করতে হয়, এবং তারপর সেই টেস্টনেট ব্যবহার করে একটি dapp ডিপ্লয় ও টেস্ট করতে হয়।"
author: "টেডি মিতিকু"
tags:
  - ক্লায়েন্ট
  - নোড
  - স্মার্ট কন্ট্রাক্ট
  - সংযোজনযোগ্যতা
  - কনসেনসাস লেয়ার
  - এক্সিকিউশন লেয়ার
  - টেস্টিং
skill: intermediate
breadcrumb: "মাল্টি-ক্লায়েন্ট টেস্টনেট"
lang: bn
published: 2023-04-11
---

## ভূমিকা {#introduction}

এই গাইডটি আপনাকে একটি কনফিগারযোগ্য লোকাল ইথেরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট করার, এতে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করার এবং আপনার বিকেন্দ্রীকৃত অ্যাপ্লিকেশন (dapp)-এর বিরুদ্ধে টেস্ট চালানোর জন্য টেস্টনেটটি ব্যবহার করার প্রক্রিয়া সম্পর্কে জানাবে। এই গাইডটি সেইসব dapp ডেভেলপারদের জন্য তৈরি করা হয়েছে যারা একটি লাইভ টেস্টনেট বা মেইননেটে ডিপ্লয় করার আগে বিভিন্ন নেটওয়ার্ক কনফিগারেশনের বিপরীতে স্থানীয়ভাবে তাদের dapp তৈরি এবং টেস্ট করতে চান।

এই গাইডে, আপনি যা করবেন:

- [Kurtosis](https://www.kurtosis.com/) ব্যবহার করে [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package)-এর সাথে একটি লোকাল ইথেরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট করবেন,
- একটি dapp কম্পাইল, ডিপ্লয় এবং টেস্ট করার জন্য আপনার Hardhat dapp ডেভেলপমেন্ট এনভায়রনমেন্টকে লোকাল টেস্টনেটের সাথে সংযুক্ত করবেন, এবং
- বিভিন্ন নেটওয়ার্ক কনফিগারেশনের বিপরীতে ডেভেলপমেন্ট এবং টেস্টিং ওয়ার্কফ্লো সক্ষম করতে নোডের সংখ্যা এবং নির্দিষ্ট EL/CL ক্লায়েন্ট পেয়ারিংয়ের মতো প্যারামিটারগুলি সহ লোকাল টেস্টনেট কনফিগার করবেন।

### Kurtosis কী? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) হলো একটি সংযোজনযোগ্য বিল্ড সিস্টেম যা মাল্টি-কন্টেইনার টেস্ট এনভায়রনমেন্ট কনফিগার করার জন্য ডিজাইন করা হয়েছে। এটি বিশেষভাবে ডেভেলপারদের এমন রিপ্রোডিউসিবল এনভায়রনমেন্ট তৈরি করতে সক্ষম করে যার জন্য ডায়নামিক সেটআপ লজিক প্রয়োজন, যেমন ব্লকচেইন টেস্টনেট।

এই গাইডে, Kurtosis eth-network-package একটি লোকাল ইথেরিয়াম টেস্টনেট চালু করে যা [`geth`](https://geth.ethereum.org/) এক্সিকিউশন লেয়ার (EL) ক্লায়েন্ট, এবং সেইসাথে [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), এবং [`lodestar`](https://lodestar.chainsafe.io/) কনসেনসাস লেয়ার (CL) ক্লায়েন্টগুলিকে সমর্থন করে। এই প্যাকেজটি Hardhat Network, Ganache, এবং Anvil-এর মতো ফ্রেমওয়ার্কের নেটওয়ার্কগুলির একটি কনফিগারযোগ্য এবং সংযোজনযোগ্য বিকল্প হিসেবে কাজ করে। Kurtosis ডেভেলপারদের তাদের ব্যবহৃত টেস্টনেটগুলির উপর আরও বেশি নিয়ন্ত্রণ এবং নমনীয়তা প্রদান করে, যা একটি প্রধান কারণ যে কেন [ইথেরিয়াম ফাউন্ডেশন দ্য মার্জ টেস্ট করার জন্য Kurtosis ব্যবহার করেছিল](https://www.kurtosis.com/blog/testing-the-ethereum-merge) এবং নেটওয়ার্ক আপগ্রেডগুলি টেস্ট করার জন্য এটি ব্যবহার করা চালিয়ে যাচ্ছে।

## Kurtosis সেট আপ করা {#setting-up-kurtosis}

এগিয়ে যাওয়ার আগে, নিশ্চিত করুন যে আপনার কাছে আছে:

- আপনার লোকাল মেশিনে [Docker ইঞ্জিন ইনস্টল এবং চালু করা আছে](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI ইনস্টল করা আছে](https://docs.kurtosis.com/install#ii-install-the-cli) (অথবা যদি আপনার কাছে ইতিমধ্যেই CLI ইনস্টল করা থাকে, তবে এটি লেটেস্ট রিলিজে আপগ্রেড করা আছে)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), এবং [npx](https://www.npmjs.com/package/npx) ইনস্টল করা আছে (আপনার dapp এনভায়রনমেন্টের জন্য)

## একটি লোকাল ইথেরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট করা {#instantiate-testnet}

একটি লোকাল ইথেরিয়াম টেস্টনেট চালু করতে, রান করুন:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

দ্রষ্টব্য: এই কমান্ডটি `--enclave` ফ্ল্যাগ ব্যবহার করে আপনার নেটওয়ার্কের নাম দেয়: "local-eth-testnet”।

Kurtosis নির্দেশাবলী ইন্টারপ্রেট, ভ্যালিডেট এবং তারপর এক্সিকিউট করার জন্য কাজ করার সময় অভ্যন্তরীণভাবে যে পদক্ষেপগুলি নিচ্ছে তা প্রিন্ট করবে। শেষে, আপনার নিচের মতো একটি আউটপুট দেখা উচিত:

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

অভিনন্দন! আপনি Docker-এর উপর একটি CL (`lighthouse`) এবং EL ক্লায়েন্ট (`geth`) সহ একটি লোকাল ইথেরিয়াম টেস্টনেট ইনস্ট্যানশিয়েট করতে Kurtosis ব্যবহার করেছেন।

### পর্যালোচনা {#review-instantiate-testnet}

এই বিভাগে, আপনি একটি কমান্ড এক্সিকিউট করেছেন যা Kurtosis-কে একটি Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/)-এর মধ্যে একটি লোকাল ইথেরিয়াম টেস্টনেট চালু করতে [GitHub-এ রিমোটলি হোস্ট করা `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) ব্যবহার করার নির্দেশ দিয়েছে। আপনার এনক্লেভের ভিতরে, আপনি "file artifacts" এবং "user services" উভয়ই পাবেন।

আপনার এনক্লেভের [File Artifacts](https://docs.kurtosis.com/advanced-concepts/files-artifacts/)-এর মধ্যে EL এবং CL ক্লায়েন্টগুলিকে বুটস্ট্র্যাপ করার জন্য জেনারেট করা এবং ব্যবহৃত সমস্ত ডেটা অন্তর্ভুক্ত রয়েছে। এই [Docker ইমেজ](https://github.com/ethpandaops/ethereum-genesis-generator) থেকে তৈরি `prelaunch-data-generator` সার্ভিস ব্যবহার করে ডেটা তৈরি করা হয়েছিল।

ইউজার সার্ভিসগুলি আপনার এনক্লেভে কাজ করা সমস্ত কন্টেইনারাইজড সার্ভিস প্রদর্শন করে। আপনি লক্ষ্য করবেন যে একটি একক নোড তৈরি করা হয়েছে, যাতে একটি EL ক্লায়েন্ট এবং একটি CL ক্লায়েন্ট উভয়ই রয়েছে।

## আপনার dapp ডেভেলপমেন্ট এনভায়রনমেন্টকে লোকাল ইথেরিয়াম টেস্টনেটের সাথে সংযুক্ত করুন {#connect-your-dapp}

### dapp ডেভেলপমেন্ট এনভায়রনমেন্ট সেট আপ করুন {#set-up-dapp-env}

যেহেতু এখন আপনার কাছে একটি চলমান লোকাল টেস্টনেট রয়েছে, আপনি আপনার লোকাল টেস্টনেট ব্যবহার করার জন্য আপনার dapp ডেভেলপমেন্ট এনভায়রনমেন্টকে সংযুক্ত করতে পারেন। আপনার লোকাল টেস্টনেটে একটি ব্ল্যাকজ্যাক dapp ডিপ্লয় করার জন্য এই গাইডে Hardhat ফ্রেমওয়ার্ক ব্যবহার করা হবে।

আপনার dapp ডেভেলপমেন্ট এনভায়রনমেন্ট সেট আপ করতে, আমাদের নমুনা dapp ধারণকারী রিপোজিটরিটি ক্লোন করুন এবং এর ডিপেন্ডেন্সিগুলি ইনস্টল করুন, রান করুন:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

এখানে ব্যবহৃত [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) ফোল্ডারটিতে [Hardhat](https://hardhat.org/) ফ্রেমওয়ার্ক ব্যবহারকারী একজন dapp ডেভেলপারের জন্য সাধারণ সেটআপ রয়েছে:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts)-এ একটি ব্ল্যাকজ্যাক dapp-এর জন্য কয়েকটি সাধারণ স্মার্ট কন্ট্রাক্ট রয়েছে
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts)-এ আপনার লোকাল ইথেরিয়াম নেটওয়ার্কে একটি টোকেন কন্ট্রাক্ট ডিপ্লয় করার জন্য একটি স্ক্রিপ্ট রয়েছে
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test)-এ আপনার টোকেন কন্ট্রাক্টের জন্য একটি সাধারণ .js টেস্ট রয়েছে যা নিশ্চিত করে যে আমাদের ব্ল্যাকজ্যাক dapp-এর প্রতিটি খেলোয়াড়ের জন্য 1000 মিন্ট করা হয়েছে
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) আপনার Hardhat সেটআপ কনফিগার করে

### লোকাল টেস্টনেট ব্যবহার করার জন্য Hardhat কনফিগার করুন {#configure-hardhat}

আপনার dapp ডেভেলপমেন্ট এনভায়রনমেন্ট সেট আপ করার সাথে, আপনি এখন Kurtosis ব্যবহার করে জেনারেট করা লোকাল ইথেরিয়াম টেস্টনেট ব্যবহার করার জন্য Hardhat-কে সংযুক্ত করবেন। এটি সম্পন্ন করতে, আপনার `hardhat.config.ts` কনফিগ ফাইলে `localnet` স্ট্রাক্টের `<$YOUR_PORT>`-কে যেকোনো `el-client-<num>` সার্ভিস থেকে rpc uri আউটপুটের পোর্ট দিয়ে প্রতিস্থাপন করুন। এই নমুনার ক্ষেত্রে, পোর্টটি হবে `64248`। আপনার পোর্টটি ভিন্ন হবে।

`hardhat.config.ts`-এ উদাহরণ:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ETH নেটওয়ার্ক Kurtosis প্যাকেজ দ্বারা তৈরি একটি নোড URI এর পোর্ট দিয়ে $YOUR_PORT প্রতিস্থাপন করুন

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

একবার আপনি আপনার ফাইলটি সেভ করলে, আপনার Hardhat dapp ডেভেলপমেন্ট এনভায়রনমেন্ট এখন আপনার লোকাল ইথেরিয়াম টেস্টনেটের সাথে সংযুক্ত হয়ে যাবে! আপনি রান করে যাচাই করতে পারেন যে আপনার টেস্টনেট কাজ করছে কিনা:

```python
npx hardhat balances --network localnet
```

আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

এটি নিশ্চিত করে যে Hardhat আপনার লোকাল টেস্টনেট ব্যবহার করছে এবং `eth-network-package` দ্বারা তৈরি প্রি-ফান্ডেড অ্যাকাউন্টগুলি শনাক্ত করছে।

### স্থানীয়ভাবে আপনার dapp ডিপ্লয় এবং টেস্ট করুন {#deploy-and-test-dapp}

dapp ডেভেলপমেন্ট এনভায়রনমেন্ট লোকাল ইথেরিয়াম টেস্টনেটের সাথে সম্পূর্ণভাবে সংযুক্ত হওয়ার পর, আপনি এখন লোকাল টেস্টনেট ব্যবহার করে আপনার dapp-এর বিপরীতে ডেভেলপমেন্ট এবং টেস্টিং ওয়ার্কফ্লো চালাতে পারেন।

লোকাল প্রোটোটাইপিং এবং ডেভেলপমেন্টের জন্য `ChipToken.sol` স্মার্ট কন্ট্রাক্ট কম্পাইল এবং ডিপ্লয় করতে, রান করুন:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

এখন আমাদের ব্ল্যাকজ্যাক dapp-এর প্রতিটি খেলোয়াড়ের জন্য 1000 মিন্ট করা হয়েছে তা নিশ্চিত করতে আপনার লোকাল dapp-এর বিপরীতে `simple.js` টেস্ট চালানোর চেষ্টা করুন:

আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

```python
npx hardhat test --network localnet
```

আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### পর্যালোচনা {#review-dapp-workflows}

এই পর্যায়ে, আপনি এখন একটি dapp ডেভেলপমেন্ট এনভায়রনমেন্ট সেট আপ করেছেন, এটিকে Kurtosis দ্বারা তৈরি একটি লোকাল ইথেরিয়াম নেটওয়ার্কের সাথে সংযুক্ত করেছেন এবং আপনার dapp-এর বিপরীতে একটি সাধারণ টেস্ট কম্পাইল, ডিপ্লয় এবং রান করেছেন।

এখন আসুন দেখি কীভাবে আপনি বিভিন্ন নেটওয়ার্ক কনফিগারেশনের অধীনে আমাদের dapp-গুলি টেস্ট করার জন্য অন্তর্নিহিত নেটওয়ার্ক কনফিগার করতে পারেন।

## লোকাল ইথেরিয়াম টেস্টনেট কনফিগার করা {#configure-testnet}

### ক্লায়েন্ট কনফিগারেশন এবং নোডের সংখ্যা পরিবর্তন করা {#configure-client-config-and-num-nodes}

আপনি যে দৃশ্যপট এবং নির্দিষ্ট নেটওয়ার্ক কনফিগারেশন ডেভেলপ বা টেস্ট করতে চান তার উপর নির্ভর করে আপনার লোকাল ইথেরিয়াম টেস্টনেটকে বিভিন্ন EL এবং CL ক্লায়েন্ট পেয়ার, সেইসাথে বিভিন্ন সংখ্যক নোড ব্যবহার করার জন্য কনফিগার করা যেতে পারে। এর মানে হলো, একবার সেট আপ হয়ে গেলে, আপনি একটি কাস্টমাইজড লোকাল টেস্টনেট চালু করতে পারেন এবং সবকিছু প্রত্যাশা অনুযায়ী কাজ করছে তা নিশ্চিত করতে বিভিন্ন নেটওয়ার্ক কনফিগারেশনের অধীনে একই ওয়ার্কফ্লো (ডিপ্লয়মেন্ট, টেস্ট ইত্যাদি) চালানোর জন্য এটি ব্যবহার করতে পারেন। আপনি পরিবর্তন করতে পারেন এমন অন্যান্য প্যারামিটার সম্পর্কে আরও জানতে, এই লিঙ্কে যান।

এটি চেষ্টা করে দেখুন! আপনি একটি JSON ফাইলের মাধ্যমে `eth-network-package`-এ বিভিন্ন কনফিগারেশন অপশন পাস করতে পারেন। এই নেটওয়ার্ক প্যারামস JSON ফাইলটি নির্দিষ্ট কনফিগারেশন প্রদান করে যা Kurtosis লোকাল ইথেরিয়াম নেটওয়ার্ক সেট আপ করতে ব্যবহার করবে।

ডিফল্ট কনফিগারেশন ফাইলটি নিন এবং বিভিন্ন EL/CL পেয়ার সহ দুটি নোড চালু করতে এটি এডিট করুন:

- `geth`/`lighthouse` সহ নোড 1
- `geth`/`lodestar` সহ নোড 2
- `geth`/`teku` সহ নোড 3

এই কনফিগারেশনটি আপনার dapp টেস্ট করার জন্য ইথেরিয়াম নোড ইমপ্লিমেন্টেশনের একটি হেটেরোজেনাস নেটওয়ার্ক তৈরি করে। আপনার কনফিগারেশন ফাইলটি এখন দেখতে এরকম হওয়া উচিত:

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

`network_params` স্ট্রাক্ট নেটওয়ার্ক সেটিংস কনফিগার করে যা প্রতিটি নোডের জন্য জেনেসিস ফাইল তৈরি করতে ব্যবহৃত হয় এবং সেইসাথে নেটওয়ার্কের প্রতি স্লটে সেকেন্ডের মতো অন্যান্য সেটিংস।

আপনার এডিট করা প্যারামস ফাইলটি আপনার ইচ্ছামতো যেকোনো ডিরেক্টরিতে সেভ করুন (নিচের উদাহরণে, এটি ডেস্কটপে সেভ করা হয়েছে) এবং তারপর রান করে আপনার Kurtosis প্যাকেজ চালাতে এটি ব্যবহার করুন:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

দ্রষ্টব্য: একটি নতুন টেস্টনেট শুরু করার আগে পুরানো টেস্টনেট এবং এর বিষয়বস্তু ধ্বংস করার জন্য Kurtosis-কে নির্দেশ দিতে এখানে `kurtosis clean -a` কমান্ডটি ব্যবহার করা হয়েছে।

আবার, Kurtosis কিছুক্ষণ কাজ করবে এবং যে পৃথক পদক্ষেপগুলি নেওয়া হচ্ছে তা প্রিন্ট করবে। শেষ পর্যন্ত, আউটপুটটি দেখতে অনেকটা এরকম হওয়া উচিত:

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

অভিনন্দন! আপনি সফলভাবে আপনার লোকাল টেস্টনেটকে 1টির পরিবর্তে 3টি নোড থাকার জন্য কনফিগার করেছেন। আপনার dapp-এর বিপরীতে আপনি আগে যে ওয়ার্কফ্লো করেছিলেন (ডিপ্লয় এবং টেস্ট) তা চালানোর জন্য, আপনার নতুন, 3-নোড লোকাল টেস্টনেটের যেকোনো `el-client-<num>` সার্ভিস থেকে rpc uri আউটপুটের পোর্ট দিয়ে আপনার `hardhat.config.ts` কনফিগ ফাইলে `localnet` স্ট্রাক্টের `<$YOUR_PORT>`-কে প্রতিস্থাপন করে আমরা আগে যে অপারেশনগুলি করেছিলাম তা সম্পাদন করুন।

## উপসংহার {#conclusion}

আর এটাই সব! এই সংক্ষিপ্ত গাইডটির সারসংক্ষেপ করতে, আপনি:

- Kurtosis ব্যবহার করে Docker-এর উপর একটি লোকাল ইথেরিয়াম টেস্টনেট তৈরি করেছেন
- আপনার লোকাল dapp ডেভেলপমেন্ট এনভায়রনমেন্টকে লোকাল ইথেরিয়াম নেটওয়ার্কের সাথে সংযুক্ত করেছেন
- লোকাল ইথেরিয়াম নেটওয়ার্কে একটি dapp ডিপ্লয় করেছেন এবং এর বিপরীতে একটি সাধারণ টেস্ট চালিয়েছেন
- অন্তর্নিহিত ইথেরিয়াম নেটওয়ার্ককে 3টি নোড থাকার জন্য কনফিগার করেছেন

আপনার জন্য কী ভালো কাজ করেছে, কী উন্নত করা যেতে পারে, বা আপনার যেকোনো প্রশ্নের উত্তর দিতে আমরা আপনার কাছ থেকে শুনতে পছন্দ করব। [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)-এর মাধ্যমে যোগাযোগ করতে বা [আমাদের ইমেল করতে](mailto:feedback@kurtosistech.com) দ্বিধা করবেন না!

### অন্যান্য উদাহরণ এবং গাইড {#other-examples-guides}

আমরা আপনাকে আমাদের [কুইকস্টার্ট](https://docs.kurtosis.com/quickstart) (যেখানে আপনি উপরে একটি Postgres ডেটাবেস এবং API তৈরি করবেন) এবং আমাদের [awesome-kurtosis রিপোজিটরিতে](https://github.com/kurtosis-tech/awesome-kurtosis) আমাদের অন্যান্য উদাহরণগুলি দেখার জন্য উৎসাহিত করছি যেখানে আপনি কিছু দুর্দান্ত উদাহরণ পাবেন, যার মধ্যে প্যাকেজগুলি অন্তর্ভুক্ত রয়েছে:

- [একই লোকাল ইথেরিয়াম টেস্টনেট চালু করা](https://github.com/kurtosis-tech/eth2-package), তবে অতিরিক্ত সার্ভিস সংযুক্ত করে যেমন একটি ট্রানজ্যাকশন স্প্যামার (ট্রানজ্যাকশন সিমুলেট করতে), একটি ফর্ক মনিটর, এবং একটি সংযুক্ত Grafana এবং Prometheus ইনস্ট্যান্স
- একই লোকাল ইথেরিয়াম নেটওয়ার্কের বিপরীতে একটি [সাব-নেটওয়ার্কিং টেস্ট](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) সম্পাদন করা