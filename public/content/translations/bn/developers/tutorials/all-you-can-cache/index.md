---
title: "আপনি যা কিছু ক্যাশ করতে পারেন"
description: সস্তা রোলআপ লেনদেনের জন্য কীভাবে একটি ক্যাশিং চুক্তি তৈরি এবং ব্যবহার করতে হয় তা শিখুন
author: Ori Pomerantz
tags: [ "লেয়ার 2", "ক্যাশিং", "সংগ্রহস্থল" ]
skill: intermediate
published: 2022-09-15
lang: bn
---

রোলআপ ব্যবহার করার সময়, ট্রানজ্যাকশনের একটি বাইটের খরচ একটি স্টোরেজ স্লটের খরচের চেয়ে অনেক বেশি ব্যয়বহুল। অতএব, অনচেইনে যতটা সম্ভব তথ্য ক্যাশ করা যুক্তিযুক্ত।

এই আর্টিকেলে আপনি শিখবেন কীভাবে এমনভাবে একটি ক্যাশিং কন্ট্রাক্ট তৈরি এবং ব্যবহার করতে হয়, যাতে যে কোনো প্যারামিটার ভ্যালু যা একাধিকবার ব্যবহৃত হওয়ার সম্ভাবনা থাকে, তা ক্যাশ করা হবে এবং (প্রথমবার ব্যবহারের পরে) অনেক কম সংখ্যক বাইট দিয়ে ব্যবহারের জন্য উপলব্ধ থাকবে, এবং এই ক্যাশ ব্যবহারকারী অফচেইন কোড কীভাবে লিখতে হয়।

আপনি যদি আর্টিকেলটি এড়িয়ে যেতে চান এবং শুধু সোর্স কোড দেখতে চান, [এটি এখানে](https://github.com/qbzzt/20220915-all-you-can-cache)। ডেভেলপমেন্ট স্ট্যাকটি হলো [Foundry](https://getfoundry.sh/introduction/installation/)।

## সামগ্রিক ডিজাইন {#overall-design}

সরলতার জন্য আমরা ধরে নেব যে সমস্ত ট্রানজ্যাকশন প্যারামিটার `uint256` এবং 32 বাইট দীর্ঘ। যখন আমরা একটি ট্রানজ্যাকশন পাব, আমরা প্রতিটি প্যারামিটার এইভাবে পার্স করব:

1. যদি প্রথম বাইট `0xFF` হয়, তাহলে পরবর্তী 32 বাইটকে একটি প্যারামিটার ভ্যালু হিসাবে নিন এবং এটি ক্যাশে লিখুন।

2. যদি প্রথম বাইট `0xFE` হয়, তাহলে পরবর্তী 32 বাইটকে একটি প্যারামিটার ভ্যালু হিসাবে নিন কিন্তু ক্যাশে লিখবেন _না_।

3. অন্য যেকোনো ভ্যালুর জন্য, উপরের চারটি বিটকে অতিরিক্ত বাইটের সংখ্যা হিসাবে এবং নীচের চারটি বিটকে ক্যাশ কী-এর সবচেয়ে তাৎপর্যপূর্ণ বিট হিসাবে নিন। এখানে কয়েকটি উদাহরণ দেওয়া হল:

   | কলডেটায় বাইট   | ক্যাশ কী |
   | :-------------- | -------: |
   | 0x0F            |     0x0F |
   | 0x10,0x10       |     0x10 |
   | 0x12,0xAC       |   0x02AC |
   | 0x2D,0xEA, 0xD6 | 0x0DEAD6 |

## ক্যাশ ম্যানিপুলেশন {#cache-manipulation}

ক্যাশটি [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol)-এ প্রয়োগ করা হয়েছে। আসুন এটি লাইন বাই লাইন পর্যালোচনা করা যাক।

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

এই কনস্ট্যান্টগুলো সেই বিশেষ ক্ষেত্রগুলো ব্যাখ্যা করার জন্য ব্যবহৃত হয় যেখানে আমরা সমস্ত তথ্য প্রদান করি এবং চাই যে এটি ক্যাশে লেখা হোক বা না হোক। ক্যাশে লেখার জন্য, পূর্বে অব্যবহৃত স্টোরেজ স্লটে দুটি [`SSTORE`](https://www.evm.codes/#55) অপারেশন প্রয়োজন হয়, যার প্রতিটির খরচ ২২,১০০ গ্যাস। তাই আমরা এটিকে ঐচ্ছিক করে দিয়েছি।

```solidity

    mapping(uint => uint) public val2key;
```

ভ্যালু এবং তাদের কী-এর মধ্যে একটি [ম্যাপিং](https://www.geeksforgeeks.org/solidity/solidity-mappings/)। ট্রানজ্যাকশন পাঠানোর আগে ভ্যালু এনকোড করার জন্য এই তথ্যটি প্রয়োজন।

```solidity
    // অবস্থান n-এ কী n+1 এর ভ্যালু থাকে, কারণ আমাদের শূন্যকে "ক্যাশে নেই" হিসাবে
    // সংরক্ষণ করতে হবে।
    uint[] public key2val;
```

আমরা কী থেকে ভ্যালু ম্যাপিংয়ের জন্য একটি অ্যারে ব্যবহার করতে পারি, কারণ আমরা কীগুলো বরাদ্দ করি এবং সরলতার জন্য আমরা এটি ক্রমানুসারে করি।

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "প্রাথমিকীকরণ না করা ক্যাশ এন্ট্রি পড়া হচ্ছে");
        return key2val[_key-1];
    }  // ক্যাশরিড
```

ক্যাশ থেকে একটি ভ্যালু পড়ুন।

```solidity
    // যদি ক্যাশে কোনো ভ্যালু আগে থেকে না থাকে তবে সেটি লিখুন
    // শুধুমাত্র টেস্ট কাজ করার জন্য পাবলিক করা হয়েছে
    function cacheWrite(uint _value) public returns (uint) {
        // যদি ভ্যালুটি ইতিমধ্যে ক্যাশে থাকে, তাহলে বর্তমান কী রিটার্ন করুন
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

একই ভ্যালু একাধিকবার ক্যাশে রাখার কোনো মানে হয় না। যদি ভ্যালুটি ইতিমধ্যে সেখানে থাকে, তবে বিদ্যমান কী-টি রিটার্ন করুন।

```solidity
        // যেহেতু 0xFE একটি বিশেষ ক্ষেত্র, ক্যাশ যে সবচেয়ে বড় কী ধারণ করতে
        // পারে তা হলো 0x0D এবং এর পরে ১৫টি 0xFF। যদি ক্যাশের দৈর্ঘ্য ইতিমধ্যে ততটা
        // বড় হয়, তাহলে ব্যর্থ হবে।
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "ক্যাশ ওভারফ্লো");
```

আমার মনে হয় না আমরা কখনও এত বড় একটি ক্যাশ পাব (প্রায় 1.8\*10<sup>37</sup>টি এন্ট্রি, যা সঞ্চয় করতে প্রায় 10<sup>27</sup> টিবি প্রয়োজন হবে)। তবে, ["640kB সবসময় যথেষ্ট হবে"](https://quoteinvestigator.com/2011/09/08/640k-enough/) এই কথাটা মনে করার মতো যথেষ্ট বয়স আমার হয়েছে। এই টেস্টটির খরচ খুব কম।

```solidity
        // পরবর্তী কী ব্যবহার করে ভ্যালুটি লিখুন
        val2key[_value] = key2val.length+1;
```

রিভার্স লুকআপ যোগ করুন (ভ্যালু থেকে কী-তে)।

```solidity
        key2val.push(_value);
```

ফরওয়ার্ড লুকআপ যোগ করুন (কী থেকে ভ্যালু-তে)। যেহেতু আমরা ক্রমানুসারে ভ্যালু বরাদ্দ করি, তাই আমরা এটিকে শেষ অ্যারে ভ্যালুর পরে যোগ করতে পারি।

```solidity
        return key2val.length;
    }  // ক্যাশরাইট
```

`key2val`-এর নতুন দৈর্ঘ্য রিটার্ন করুন, যা হলো সেই সেল যেখানে নতুন ভ্যালুটি সংরক্ষণ করা হয়েছে।

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

এই ফাংশনটি কলডেটা থেকে যেকোনো দৈর্ঘ্যের (৩২ বাইট পর্যন্ত, যা একটি ওয়ার্ড সাইজ) একটি ভ্যালু পড়ে।

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal দৈর্ঘ্যের সীমা 32 বাইট");
        require(length + startByte <= msg.data.length,
            "_calldataVal কলডেটাসাইজের বাইরে পড়ার চেষ্টা করছে");
```

এই ফাংশনটি ইন্টারনাল, তাই যদি বাকি কোড সঠিকভাবে লেখা হয় তবে এই টেস্টগুলো প্রয়োজন নেই। তবে, এগুলোর খরচ বেশি নয় তাই আমরা এগুলো রাখতেই পারি।

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

এই কোডটি [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html)-এ লেখা। এটি কলডেটা থেকে একটি 32 বাইটের ভ্যালু পড়ে। `startByte+32`-এর আগে কলডেটা শেষ হয়ে গেলেও এটি কাজ করে, কারণ EVM-এ ইনিশিয়ালাইজ না করা স্পেসকে শূন্য হিসাবে বিবেচনা করা হয়।

```solidity
        _retVal = _retVal >> (256-length*8);
```

আমাদের যে সবসময় একটি 32 বাইটের ভ্যালু প্রয়োজন, তা নয়। এটি অতিরিক্ত বাইটগুলো সরিয়ে দেয়।

```solidity
        return _retVal;
    } // _কলডেটাভ্যাল


    // _fromByte থেকে শুরু করে কলডেটা থেকে একটি একক প্যারামিটার পড়ুন
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

কলডেটা থেকে একটি একক প্যারামিটার পড়ুন। লক্ষ্য করুন যে আমাদের শুধুমাত্র পড়া ভ্যালুটিই নয়, পরবর্তী বাইটের অবস্থানও রিটার্ন করতে হবে, কারণ প্যারামিটারগুলো 1 বাইট থেকে 33 বাইট দীর্ঘ হতে পারে।

```solidity
        // প্রথম বাইটটি আমাদের বলে দেয় বাকি অংশ কীভাবে ব্যাখ্যা করতে হবে
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity সম্ভাব্য বিপজ্জনক [অন্তর্নিহিত টাইপ রূপান্তর](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) নিষিদ্ধ করে বাগের সংখ্যা কমানোর চেষ্টা করে। একটি ডাউনগ্রেড, উদাহরণস্বরূপ 256 বিট থেকে 8 বিটে, সুস্পষ্ট হতে হবে।

```solidity

        // Read the value, but do not write it to the cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Read the value, and write it to the cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // If we got here it means that we need to read from the cache

        // Number of extra bytes to read
        uint8 _extraBytes = _firstByte / 16;
```

নিচের [নিবল](https://en.wikipedia.org/wiki/Nibble)টি নিন এবং ক্যাশ থেকে ভ্যালুটি পড়ার জন্য এটিকে অন্য বাইটগুলির সাথে একত্রিত করুন।

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

আমরা কলডেটা থেকেই আমাদের প্যারামিটারের সংখ্যা জানতে পারতাম, কিন্তু যে ফাংশনগুলো আমাদের কল করে তারা জানে যে তারা কতগুলো প্যারামিটার আশা করে। তাদের কাছ থেকে জেনে নেওয়া সহজ।

```solidity
        // The parameters we read
        uint[] memory params = new uint[](_paramNum);

        // Parameters start at byte 4, before that it's the function signature
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

আপনার প্রয়োজনীয় সংখ্যক প্যারামিটার না পাওয়া পর্যন্ত সেগুলো পড়তে থাকুন। আমরা যদি কলডেটার শেষ অতিক্রম করি, তাহলে `_readParams` কলটি বাতিল করে দেবে।

```solidity

        return(params);
    }   // readParams

    // For testing _readParams, test reading four parameters
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry-এর একটি বড় সুবিধা হলো এটি আপনাকে Solidity-তে টেস্ট লিখতে দেয় ([নিচে ক্যাশের টেস্টিং দেখুন](#testing-the-cache))। এটি ইউনিট টেস্টকে অনেক সহজ করে তোলে। এটি একটি ফাংশন যা চারটি প্যারামিটার পড়ে এবং সেগুলোকে রিটার্ন করে যাতে টেস্টটি যাচাই করতে পারে যে সেগুলো সঠিক ছিল।

```solidity
    // Get a value, return bytes that will encode it (using the cache if possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` একটি ফাংশন যা অফচেইন কোডকে কল করে ক্যাশ ব্যবহার করে এমন কলডেটা তৈরি করতে সাহায্য করে। এটি একটি একক ভ্যালু গ্রহণ করে এবং এটিকে এনকোড করা বাইটগুলো রিটার্ন করে। এই ফাংশনটি একটি `view`, তাই এটির জন্য কোনো ট্রানজ্যাকশনের প্রয়োজন হয় না এবং বাইরে থেকে কল করা হলে কোনো গ্যাস খরচ হয় না।

```solidity
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/)-এ সমস্ত ইনিশিয়ালাইজ না করা স্টোরেজকে শূন্য বলে ধরে নেওয়া হয়। তাই যদি আমরা এমন একটি ভ্যালুর কী খুঁজি যা সেখানে নেই, আমরা একটি শূন্য পাই। সেই ক্ষেত্রে, এটিকে এনকোড করা বাইটগুলো হলো `INTO_CACHE` (যাতে এটি পরেরবার ক্যাশ করা হবে), যার পরে আসল ভ্যালুটি থাকে।

```solidity
        // If the key is <0x10, return it as a single byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

একক বাইট সবচেয়ে সহজ। আমরা কেবল [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) ব্যবহার করে একটি `bytes<n>` টাইপকে একটি বাইট অ্যারেতে পরিণত করি যা যেকোনো দৈর্ঘ্যের হতে পারে। নাম সত্ত্বেও, এটি শুধুমাত্র একটি আর্গুমেন্ট প্রদান করা হলেও ঠিকঠাক কাজ করে।

```solidity
        // Two byte value, encoded as 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

যখন আমাদের কাছে 16<sup>3</sup> এর চেয়ে কম একটি কী থাকে, তখন আমরা এটিকে দুটি বাইটে প্রকাশ করতে পারি। আমরা প্রথমে `_key`, যা একটি 256 বিটের ভ্যালু, কে একটি 16 বিটের ভ্যালুতে রূপান্তর করি এবং প্রথম বাইটে অতিরিক্ত বাইটের সংখ্যা যোগ করার জন্য লজিক্যাল or ব্যবহার করি। তারপর আমরা এটিকে একটি `bytes2` ভ্যালুতে পরিণত করি, যা `bytes`-এ রূপান্তরিত হতে পারে।

```solidity
        // There is probably a clever way to do the following lines as a loop,
        // but it's a view function so I'm optimizing for programmer time and
        // simplicity.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

অন্যান্য ভ্যালুগুলো (3 বাইট, 4 বাইট, ইত্যাদি) একইভাবে পরিচালনা করা হয়, শুধুমাত্র বিভিন্ন ফিল্ড আকারের সাথে।

```solidity
        // If we get here, something is wrong.
        revert("Error in encodeVal, should not happen");
```

যদি আমরা এখানে আসি তার মানে আমরা একটি কী পেয়েছি যা 16\*256<sup>15</sup> এর চেয়ে কম নয়। কিন্তু `cacheWrite` কীগুলোকে সীমিত করে যাতে আমরা 14\*256<sup>16</sup> পর্যন্তও পৌঁছাতে পারি না (যার প্রথম বাইট হবে 0xFE, তাই এটি `DONT_CACHE` এর মতো দেখাবে)। তবে ভবিষ্যতের কোনো প্রোগ্রামার যদি কোনো বাগ তৈরি করে তবে তার জন্য একটি পরীক্ষা যোগ করতে আমাদের বেশি খরচ হবে না।

```solidity
    } // encodeVal

}  // Cache
```

### ক্যাশের টেস্টিং {#testing-the-cache}

Foundry-এর একটি সুবিধা হলো [এটি আপনাকে Solidity-তে টেস্ট লিখতে দেয়](https://getfoundry.sh/forge/tests/overview/), যা ইউনিট টেস্ট লেখা সহজ করে তোলে। `Cache` ক্লাসের জন্য টেস্টগুলো [এখানে](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol) আছে। যেহেতু টেস্টিং কোডটি পুনরাবৃত্তিমূলক, যেমনটা টেস্টে হয়ে থাকে, তাই এই নিবন্ধে শুধুমাত্র আকর্ষণীয় অংশগুলো ব্যাখ্যা করা হয়েছে।

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console.
import "forge-std/console.sol";
```

এটি শুধুমাত্র একটি বয়লারপ্লেট যা টেস্ট প্যাকেজ এবং `console.log` ব্যবহারের জন্য প্রয়োজন।

```solidity
import "src/Cache.sol";
```

আমরা যে কন্ট্রাক্টটি পরীক্ষা করছি তা আমাদের জানতে হবে।

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp` ফাংশনটি প্রতিটি পরীক্ষার আগে কল করা হয়। এই ক্ষেত্রে আমরা কেবল একটি নতুন ক্যাশ তৈরি করি, যাতে আমাদের পরীক্ষাগুলো একে অপরকে প্রভাবিত না করে।

```solidity
    function testCaching() public {
```

টেস্টগুলো হলো সেই ফাংশন যাদের নাম `test` দিয়ে শুরু হয়। এই ফাংশনটি মৌলিক ক্যাশ কার্যকারিতা পরীক্ষা করে, ভ্যালু লিখে এবং সেগুলো আবার পড়ে।

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

এইভাবে আপনি [`assert...` ফাংশন](https://getfoundry.sh/reference/forge-std/std-assertions/) ব্যবহার করে আসল পরীক্ষাটি করেন। এই ক্ষেত্রে, আমরা পরীক্ষা করি যে আমরা যে মানটি লিখেছি সেটিই আমরা পড়েছি। আমরা `cache.cacheWrite`-এর ফলাফল বাতিল করতে পারি কারণ আমরা জানি যে ক্যাশ কীগুলি রৈখিকভাবে নির্ধারিত হয়।

```solidity
        }
    }    // testCaching


    // Cache the same value multiple times, ensure that the key stays
    // the same
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

প্রথমে আমরা প্রতিটি মান ক্যাশে দুইবার লিখি এবং নিশ্চিত করি যে কীগুলি একই আছে (অর্থাৎ দ্বিতীয় লেখাটি আসলে ঘটেনি)।

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

তাত্ত্বিকভাবে এমন একটি বাগ থাকতে পারে যা পরপর ক্যাশ লেখাকে প্রভাবিত করে না। সুতরাং এখানে আমরা কিছু লেখা করি যা পরপর নয় এবং দেখি যে মানগুলি এখনও পুনরায় লেখা হয়নি।

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters
    // we sent out)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

একটি `bytes memory` বাফার থেকে একটি 256 বিটের শব্দ পড়ুন। এই ইউটিলিটি ফাংশনটি আমাদের যাচাই করতে দেয় যে আমরা যখন ক্যাশ ব্যবহার করে একটি ফাংশন কল চালাই তখন আমরা সঠিক ফলাফল পাই।

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul `uint256` এর বাইরে ডেটা কাঠামো সমর্থন করে না, তাই যখন আপনি একটি আরও পরিশীলিত ডেটা কাঠামো উল্লেখ করেন, যেমন মেমরি বাফার `_bytes`, আপনি সেই কাঠামোর অ্যাড্রেস পান। Solidity `bytes memory` মানগুলিকে একটি 32 বাইটের শব্দ হিসাবে সংরক্ষণ করে যার মধ্যে দৈর্ঘ্য থাকে, যার পরে আসল বাইটগুলি থাকে, তাই `_start` নম্বর বাইট পেতে আমাদের `_bytes+32+_start` গণনা করতে হবে।

```solidity

        return tempUint;
    }     // toUint256

    // Function signature for fourParams(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Just some constant values to see we're getting the correct values back
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

পরীক্ষার জন্য আমাদের কিছু ধ্রুবক প্রয়োজন।

```solidity
    function testReadParam() public {
```

`readParams` ব্যবহার করে এমন একটি ফাংশন `fourParams()` কল করুন, যাতে আমরা প্যারামিটারগুলি সঠিকভাবে পড়তে পারি কিনা তা পরীক্ষা করা যায়।

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

আমরা ক্যাশ ব্যবহার করে একটি ফাংশন কল করার জন্য সাধারণ ABI মেকানিজম ব্যবহার করতে পারি না, তাই আমাদের নিম্ন স্তরের [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) মেকানিজম ব্যবহার করতে হবে। সেই মেকানিজম ইনপুট হিসাবে একটি `bytes memory` নেয়, এবং আউটপুট হিসাবে সেটি (পাশাপাশি একটি বুলিয়ান মান) ফেরত দেয়।

```solidity
        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

একই চুক্তির জন্য ক্যাশ করা ফাংশন (লেনদেন থেকে সরাসরি কলের জন্য) এবং নন-ক্যাশ করা ফাংশন (অন্যান্য স্মার্ট চুক্তি থেকে কলের জন্য) উভয়ই সমর্থন করা দরকারী। এটি করার জন্য আমাদের সঠিক ফাংশন কল করার জন্য Solidity মেকানিজমের উপর নির্ভর করা চালিয়ে যেতে হবে, সবকিছু একটি [ফলব্যাক ফাংশনে](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function) রাখার পরিবর্তে। এটি করা কম্পোজেবিলিটিকে অনেক সহজ করে তোলে। একটি একক বাইট বেশিরভাগ ক্ষেত্রে ফাংশন সনাক্ত করার জন্য যথেষ্ট হবে, তাই আমরা তিনটি বাইট (16\*3=48 গ্যাস) অপচয় করছি। তবে, আমি যখন এটি লিখছি তখন সেই 48 গ্যাসের দাম 0.07 সেন্ট, যা সহজ, কম বাগ প্রবণ কোডের জন্য একটি যুক্তিসঙ্গত খরচ।

```solidity
            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

প্রথম মান: একটি ফ্ল্যাগ যা বলে যে এটি একটি সম্পূর্ণ মান যা ক্যাশে লিখতে হবে, যার পরে মানের 32 বাইট থাকে। অন্য তিনটি মান একই রকম, তবে `VAL_B` ক্যাশে লেখা হয় না এবং `VAL_C` তৃতীয় এবং চতুর্থ উভয় প্যারামিটার।

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

এখানে আমরা আসলে `Cache` চুক্তি কল করি।

```solidity
        assertEq(_success, true);
```

আমরা আশা করি কলটি সফল হবে।

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

আমরা একটি খালি ক্যাশ দিয়ে শুরু করি এবং তারপর `VAL_A` এবং তারপর `VAL_C` যোগ করি। আমরা আশা করব প্রথমটির কী 1 হবে, এবং দ্বিতীয়টির 2 হবে।

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

আউটপুট হল চারটি প্যারামিটার। এখানে আমরা যাচাই করি যে এটি সঠিক।

```solidity
        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value in the Cache
            bytes1(0x01),
```

১৬ এর নিচে ক্যাশ কীগুলি মাত্র এক বাইটের হয়।

```solidity
            // Second value, don't add it to the cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Third and fourth values, same value
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

কল করার পরের পরীক্ষাগুলি প্রথম কলের পরের পরীক্ষাগুলির মতোই।

```solidity
    function testEncodeVal() public {
```

এই ফাংশনটি `testReadParam` এর মতোই, তবে এখানে প্যারামিটারগুলি স্পষ্টভাবে লেখার পরিবর্তে আমরা `encodeVal()` ব্যবহার করি।

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

`testEncodeVal()`-এ একমাত্র অতিরিক্ত পরীক্ষা হলো `_callInput`-এর দৈর্ঘ্য সঠিক কিনা তা যাচাই করা। প্রথম কলের জন্য এটি 4+33_4। দ্বিতীয়টির জন্য, যেখানে প্রতিটি মান ইতিমধ্যে ক্যাশে রয়েছে, এটি 4+1_4।

```solidity
    // Test encodeVal when the key is more than a single byte
    // Maximum three bytes because filling the cache to four bytes takes
    // too long.
    function testEncodeValBig() public {
        // Put a number of values in the cache.
        // To keep things simple, use key n for value n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

উপরের `testEncodeVal` ফাংশনটি ক্যাশে কেবল চারটি মান লেখে, তাই [ফাংশনের যে অংশটি মাল্টি-বাইট মানগুলির সাথে কাজ করে](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) তা পরীক্ষা করা হয় না। কিন্তু সেই কোডটি জটিল এবং ভুল-প্রবণ।

এই ফাংশনের প্রথম অংশটি একটি লুপ যা 1 থেকে 0x1FFF পর্যন্ত সমস্ত মান ক্যাশে ক্রমানুসারে লেখে, যাতে আমরা সেই মানগুলিকে এনকোড করতে পারি এবং জানতে পারি যে সেগুলি কোথায় যাচ্ছে।

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // One byte        0x0F
            cache.encodeVal(0x0010),   // Two bytes     0x1010
            cache.encodeVal(0x0100),   // Two bytes     0x1100
            cache.encodeVal(0x1000)    // Three bytes 0x201000
        );
```

এক বাইট, দুই বাইট, এবং তিন বাইটের মান পরীক্ষা করুন। আমরা এর বাইরে পরীক্ষা করি না কারণ পর্যাপ্ত স্ট্যাক এন্ট্রি (অন্তত 0x10000000, প্রায় এক চতুর্থাংশ বিলিয়ন) লিখতে অনেক সময় লাগবে।

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Test what with an excessively small buffer we get a revert
    function testShortCalldata() public {
```

যখন পর্যাপ্ত প্যারামিটার না থাকে তখন অস্বাভাবিক ক্ষেত্রে কী ঘটে তা পরীক্ষা করুন।

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

যেহেতু এটি রিভার্ট হয়, তাই আমাদের যে ফলাফল পাওয়া উচিত তা হলো `false`।

```
    // Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

এই ফাংশনটি চারটি সম্পূর্ণ বৈধ প্যারামিটার পায়, তবে ক্যাশটি খালি হওয়ায় সেখানে পড়ার জন্য কোনো মান নেই।

```solidity
        .
        .
        .
    // Test what with an excessively long buffer everything works file
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Second value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Third value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Fourth value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // And another value for "good luck"
            bytes4(0x31112233)
        );
```

এই ফাংশনটি পাঁচটি মান পাঠায়। আমরা জানি যে পঞ্চম মানটি উপেক্ষা করা হয় কারণ এটি একটি বৈধ ক্যাশ এন্ট্রি নয়, যা অন্তর্ভুক্ত না হলে একটি রিভার্ট ঘটাত।

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## একটি নমুনা অ্যাপ্লিকেশন {#a-sample-app}

Solidity-তে টেস্ট লেখা খুবই ভালো, কিন্তু দিনের শেষে একটি dapp-কে চেইনের বাইরে থেকে অনুরোধ প্রক্রিয়া করতে সক্ষম হতে হবে যাতে এটি কার্যকর হয়। এই নিবন্ধটি `WORM` দিয়ে একটি dapp-এ ক্যাশিং কীভাবে ব্যবহার করতে হয় তা প্রদর্শন করে, যার অর্থ "Write Once, Read Many"। যদি একটি কী এখনও লেখা না থাকে, আপনি তাতে একটি মান লিখতে পারেন। যদি কীটি ইতিমধ্যে লেখা থাকে, আপনি একটি রিভার্ট পাবেন।

### চুক্তিটি {#the-contract}

[এটি হলো চুক্তি](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)। এটি মূলত `Cache` এবং `CacheTest` দিয়ে আমরা যা করেছি তার পুনরাবৃত্তি করে, তাই আমরা কেবল আকর্ষণীয় অংশগুলি কভার করব।

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache` ব্যবহার করার সবচেয়ে সহজ উপায় হল আমাদের নিজস্ব চুক্তিতে এটি ইনহেরিট করা।

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

এই ফাংশনটি উপরের `CacheTest`-এর `fourParam`-এর মতোই। যেহেতু আমরা ABI স্পেসিফিকেশন অনুসরণ করি না, তাই ফাংশনে কোনো প্যারামিটার ঘোষণা না করাই ভালো।

```solidity
    // Make it easier to call us
    // Function signature for writeEntryCached(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

`writeEntryCached` কল করা বাহ্যিক কোডকে ম্যানুয়ালি কলডেটা তৈরি করতে হবে, `worm.writeEntryCached` ব্যবহার করার পরিবর্তে, কারণ আমরা ABI স্পেসিফিকেশন অনুসরণ করি না। এই ধ্রুবক মানটি কেবল এটি লেখা সহজ করে তোলে।

মনে রাখবেন যে যদিও আমরা `WRITE_ENTRY_CACHED`-কে একটি স্টেট ভেরিয়েবল হিসাবে সংজ্ঞায়িত করি, তবে এটি বাহ্যিকভাবে পড়ার জন্য এটির জন্য গেটার ফাংশন ব্যবহার করা প্রয়োজন, `worm.WRITE_ENTRY_CACHED()`।

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

পড়ার ফাংশনটি একটি `view`, তাই এটির জন্য কোনো লেনদেনের প্রয়োজন হয় না এবং কোনো গ্যাস খরচ হয় না। ফলস্বরূপ, প্যারামিটারের জন্য ক্যাশ ব্যবহার করার কোনো সুবিধা নেই। ভিউ ফাংশনগুলির সাথে স্ট্যান্ডার্ড মেকানিজম ব্যবহার করা ভালো যা সহজতর।

### টেস্টিং কোড {#the-testing-code}

[এটি হলো চুক্তির জন্য টেস্টিং কোড](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)। আবার, চলুন কেবল যা আকর্ষণীয় তা দেখি।

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[এটি (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) হলো যেভাবে আমরা একটি Foundry টেস্টে নির্দিষ্ট করি যে পরবর্তী কলটি ব্যর্থ হওয়া উচিত, এবং ব্যর্থতার জন্য রিপোর্ট করা কারণ। এটি প্রযোজ্য যখন আমরা `<contract>.<function name>` সিনট্যাক্স ব্যবহার করি।()` কলডেটা তৈরি করে এবং নিম্ন স্তরের ইন্টারফেস (`<contract>.call()\`, ইত্যাদি) ব্যবহার করে চুক্তি কল করার পরিবর্তে।

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

এখানে আমরা এই সত্যটি ব্যবহার করি যে `cacheWrite` ক্যাশ কী ফেরত দেয়। এটি এমন কিছু নয় যা আমরা উৎপাদনে ব্যবহার করার আশা করব, কারণ `cacheWrite` স্টেট পরিবর্তন করে, এবং তাই কেবল একটি লেনদেনের সময় কল করা যেতে পারে। লেনদেনের কোনো রিটার্ন মান থাকে না, যদি তাদের ফলাফল থাকে তবে সেই ফলাফলগুলি ইভেন্ট হিসাবে নির্গত হওয়ার কথা। তাই `cacheWrite` রিটার্ন মান কেবল অনচেইন কোড থেকে অ্যাক্সেসযোগ্য, এবং অনচেইন কোডের জন্য প্যারামিটার ক্যাশিংয়ের প্রয়োজন নেই।

```solidity
        (_success,) = address(worm).call(_callInput);
```

এইভাবে আমরা Solidity-কে বলি যে যদিও `<contract address>.call()`-এর দুটি রিটার্ন মান রয়েছে, আমরা কেবল প্রথমটির প্রতি যত্নশীল।

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

যেহেতু আমরা নিম্ন স্তরের `<address>.call()` ফাংশন ব্যবহার করি, আমরা `vm.expectRevert()` ব্যবহার করতে পারি না এবং কল থেকে পাওয়া বুলিয়ান সাফল্য মানের দিকে তাকাতে হবে।

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

এটি সেই উপায় যা আমরা যাচাই করি যে কোডটি Foundry-তে [সঠিকভাবে একটি ইভেন্ট নির্গত করে](https://getfoundry.sh/reference/cheatcodes/expect-emit/)।

### ক্লায়েন্ট {#the-client}

একটি জিনিস যা আপনি Solidity পরীক্ষার সাথে পান না তা হল JavaScript কোড যা আপনি আপনার নিজের অ্যাপ্লিকেশনে কাট এবং পেস্ট করতে পারেন। সেই কোডটি লেখার জন্য আমি WORM-কে [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)-তে ডিপ্লয় করেছি, যা [Optimism](https://www.optimism.io/)-এর নতুন টেস্টনেট। এটি ঠিকানা [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a)-এ রয়েছে।

[আপনি ক্লায়েন্টের জন্য JavaScript কোড এখানে দেখতে পারেন](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)। এটি ব্যবহার করতে:

1. গিট রিপোজিটরি ক্লোন করুন:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. প্রয়োজনীয় প্যাকেজ ইনস্টল করুন:

   ```sh
   cd javascript
   yarn
   ```

3. কনফিগারেশন ফাইলটি অনুলিপি করুন:

   ```sh
   cp .env.example .env
   ```

4. আপনার কনফিগারেশনের জন্য `.env` সম্পাদনা করুন:

   | প্যারামিটার                                                   | মান                                                                                                                                                                                               |
   | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | স্মৃতিচিহ্ন                                                   | একটি অ্যাকাউন্টের জন্য নেমোনিক যার একটি লেনদেনের জন্য অর্থ প্রদানের জন্য পর্যাপ্ত ETH আছে। [আপনি এখানে Optimism Goerli নেটওয়ার্কের জন্য বিনামূল্যে ETH পেতে পারেন](https://optimismfaucet.xyz/)। |
   | OPTIMISM_GOERLI_URL | Optimism Goerli-এর URL। পাবলিক এন্ডপয়েন্ট, `https://goerli.optimism.io`, রেট সীমিত কিন্তু আমাদের এখানে যা প্রয়োজন তার জন্য যথেষ্ট                                                               |

5. `index.js` চালান।

   ```sh
   node index.js
   ```

   এই নমুনা অ্যাপ্লিকেশনটি প্রথমে WORM-এ একটি এন্ট্রি লেখে, কলডেটা এবং Etherscan-এ লেনদেনের একটি লিঙ্ক প্রদর্শন করে। তারপরে এটি সেই এন্ট্রিটি আবার পড়ে, এবং এটি যে কী ব্যবহার করে এবং এন্ট্রিতে থাকা মানগুলি (মান, ব্লক নম্বর এবং লেখক) প্রদর্শন করে।

ক্লায়েন্টের বেশিরভাগই সাধারণ Dapp জাভাস্ক্রিপ্ট। তাই আবার আমরা কেবল আকর্ষণীয় অংশগুলি নিয়ে আলোচনা করব।

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Need a new key every time
    const key = await worm.encodeVal(Number(new Date()))
```

একটি প্রদত্ত স্লটে কেবল একবারই লেখা যায়, তাই আমরা স্লটগুলি পুনরায় ব্যবহার না করার জন্য টাইমস্ট্যাম্প ব্যবহার করি।

```javascript
const val = await worm.encodeVal("0x600D")

// Write an entry
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers আশা করে যে কল ডেটা একটি হেক্স স্ট্রিং হবে, `0x` যার পরে একটি জোড় সংখ্যক হেক্সাডেসিমেল ডিজিট থাকবে। যেহেতু `key` এবং `val` উভয়ই `0x` দিয়ে শুরু হয়, তাই আমাদের সেই হেডারগুলি সরাতে হবে।

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidity টেস্টিং কোডের মতোই, আমরা সাধারণত একটি ক্যাশ করা ফাংশন কল করতে পারি না। পরিবর্তে, আমাদের একটি নিম্ন স্তরের প্রক্রিয়া ব্যবহার করতে হবে।

```javascript
    .
    .
    .
    // Read the entry just written
    const realKey = '0x' + key.slice(4)  // remove the FF flag
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

এন্ট্রি পড়ার জন্য আমরা সাধারণ প্রক্রিয়া ব্যবহার করতে পারি। `view` ফাংশনগুলির সাথে প্যারামিটার ক্যাশিং ব্যবহার করার কোনো প্রয়োজন নেই।

## উপসংহার {#conclusion}

এই নিবন্ধের কোডটি একটি ধারণার প্রমাণ, উদ্দেশ্য হলো ধারণাটি বোঝা সহজ করা। একটি উৎপাদন-প্রস্তুত সিস্টেমের জন্য আপনি কিছু অতিরিক্ত কার্যকারিতা প্রয়োগ করতে চাইতে পারেন:

- `uint256` নয় এমন মানগুলি হ্যান্ডেল করুন। উদাহরণস্বরূপ, স্ট্রিং।
- একটি গ্লোবাল ক্যাশের পরিবর্তে, ব্যবহারকারী এবং ক্যাশের মধ্যে একটি ম্যাপিং থাকতে পারে। বিভিন্ন ব্যবহারকারী বিভিন্ন মান ব্যবহার করেন।
- ঠিকানার জন্য ব্যবহৃত মানগুলি অন্যান্য উদ্দেশ্যে ব্যবহৃত মানগুলি থেকে পৃথক। শুধুমাত্র ঠিকানাগুলির জন্য একটি পৃথক ক্যাশ থাকা বুদ্ধিমানের কাজ হতে পারে।
- বর্তমানে, ক্যাশ কীগুলি একটি "প্রথম আসা, সবচেয়ে ছোট কী" অ্যালগরিদমে রয়েছে। প্রথম ষোলটি মান একটি একক বাইট হিসাবে পাঠানো যেতে পারে। পরবর্তী 4080টি মান দুটি বাইট হিসাবে পাঠানো যেতে পারে। পরবর্তী প্রায় মিলিয়ন মান তিন বাইটের, ইত্যাদি। একটি প্রোডাকশন সিস্টেমের ক্যাশ এন্ট্রিগুলিতে ব্যবহারের কাউন্টার রাখা উচিত এবং সেগুলিকে পুনর্গঠন করা উচিত যাতে ষোলটি _সবচেয়ে সাধারণ_ মান এক বাইট, পরবর্তী 4080টি সবচেয়ে সাধারণ মান দুই বাইট ইত্যাদি হয়।

  তবে, এটি একটি সম্ভাব্য বিপজ্জনক অপারেশন। নিম্নলিখিত ঘটনাগুলির ক্রম কল্পনা করুন:

  1. নোয়াম নাইভ `encodeVal` কল করে যে ঠিকানায় সে টোকেন পাঠাতে চায় তা এনকোড করার জন্য। সেই ঠিকানাটি অ্যাপ্লিকেশনে ব্যবহৃত প্রথমগুলির মধ্যে একটি, তাই এনকোড করা মানটি হলো 0x06। এটি একটি `view` ফাংশন, কোনো লেনদেন নয়, তাই এটি নোয়াম এবং সে যে নোড ব্যবহার করে তার মধ্যে, এবং অন্য কেউ এ সম্পর্কে জানে না

  2. ওয়েন ওনার ক্যাশ পুনর্বিন্যাস অপারেশন চালায়। খুব কম লোকই আসলে সেই ঠিকানাটি ব্যবহার করে, তাই এটি এখন 0x201122 হিসাবে এনকোড করা হয়েছে। একটি ভিন্ন মান, 10<sup>18</sup>, 0x06 বরাদ্দ করা হয়েছে।

  3. নোয়াম নাইভ তার টোকেনগুলি 0x06-এ পাঠায়। সেগুলো `0x0000000000000000000000000de0b6b3a7640000` অ্যাড্রেসে চলে যায়, এবং যেহেতু সেই অ্যাড্রেসের প্রাইভেট কী কেউ জানে না, তাই সেগুলো সেখানেই আটকে থাকে। নোয়াম _খুশি নয়_।

  এই সমস্যা এবং এর সাথে সম্পর্কিত ক্যাশ রিঅর্ডারের সময় মেমপুলে থাকা ট্রানজ্যাকশনের সমস্যা সমাধানের উপায় আছে, কিন্তু আপনাকে এ বিষয়ে সচেতন থাকতে হবে।

আমি এখানে Optimism-এর সাথে ক্যাশিং প্রদর্শন করেছি, কারণ আমি একজন Optimism কর্মচারী এবং এটিই আমার সবচেয়ে পরিচিত রোলআপ। কিন্তু এটি যেকোনো রোলআপের সাথে কাজ করা উচিত যা অভ্যন্তরীণ প্রক্রিয়াকরণের জন্য একটি ন্যূনতম খরচ নেয়, যাতে তুলনায় লেনদেন ডেটা L1-এ লেখা প্রধান ব্যয় হয়।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।

