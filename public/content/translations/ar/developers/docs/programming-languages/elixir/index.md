---
title: "إيثريوم لمطوري Elixir"
description: "تعرف على كيفية التطوير لإيثريوم باستخدام المشاريع والأدوات المعتمدة على Elixir."
lang: ar
incomplete: false
---

<FeaturedText>تعرف على كيفية التطوير لإيثريوم باستخدام المشاريع والأدوات المعتمدة على Elixir.</FeaturedText>

استخدم إيثريوم لإنشاء تطبيقات لامركزية (أو "التطبيقات اللامركزية") التي تستفيد من مزايا العملة الرقمية وتكنولوجيا البلوك تشين. يمكن أن تكون هذه التطبيقات اللامركزية لا تتطلب الثقة، مما يعني أنه بمجرد نشرها على إيثريوم، فإنها ستعمل دائمًا كما تمت برمجتها. يمكنها التحكم في الأصول الرقمية لإنشاء أنواع جديدة من التطبيقات المالية. يمكن أن تكون لامركزية، مما يعني أنه لا يوجد كيان أو شخص واحد يتحكم فيها ومن المستحيل تقريبًا فرض رقابة عليها.

## البدء مع العقود الذكية ولغة Solidity {#getting-started-with-smart-contracts-and-solidity}

**اتخذ خطواتك الأولى لدمج Elixir مع إيثريوم**

هل تحتاج إلى مقدمة أساسية أولاً؟ تحقق من [ethereum.org/learn](/learn/) أو [ethereum.org/developers](/developers/).

- [شرح البلوك تشين](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [كتابة عقدك الذكي الأول](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعلم كيفية تجميع ونشر Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## مقالات للمبتدئين {#beginner-articles}

- [فهم حسابات إيثريوم أخيرًا](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — مكتبة ويب 3 من الدرجة الأولى لإيثريوم في Elixir](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## مقالات للمستوى المتوسط {#intermediate-articles}

- [كيفية توقيع معاملات عقود إيثريوم الخام باستخدام Elixir](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [عقود إيثريوم الذكية وElixir](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## مشاريع وأدوات Elixir {#elixir-projects-and-tools}

### نشطة {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _تنفيذ BIP32 وBIP44 في Elixir (تسلسل هرمي متعدد الحسابات للمحافظ الحتمية)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _عميل JSON-RPC في Elixir لشبكة البلوك تشين الخاصة بإيثريوم_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _مكتبة ويب 3 شاملة للتفاعل مع العقود الذكية على إيثريوم باستخدام Elixir_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _مكتبة توقيع KMS لـ Ethers (توقيع المعاملات باستخدام AWS KMS)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _تنفيذ محلل/مفكك/مشفر ABI لإيثريوم في Elixir_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _مكتبة Elixir لحساب تجزئات Keccak SHA3-256 باستخدام حزمة tiny-keccak Rust المبنية على NIF_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _تنفيذ Elixir لتشفير RLP (بادئة الطول العودية) الخاص بإيثريوم_

### مؤرشفة / لم تعد مدعومة {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _أدوات إيثريوم المساعدة لـ Elixir_
- [exw3](https://github.com/hswick/exw3) - _عميل RPC عالي المستوى لإيثريوم في Elixir_
- [mana](https://github.com/mana-ethereum/mana) - _تنفيذ عقدة كاملة لإيثريوم مكتوب بلغة Elixir_

هل تبحث عن المزيد من الموارد؟ تحقق من [الصفحة الرئيسية للمطورين](/developers/).

## مساهمو مجتمع Elixir {#elixir-community-contributors}

تستضيف [قناة #ethereum على Slack الخاصة بـ Elixir](https://elixir-lang.slack.com/archives/C5RPZ3RJL) مجتمعًا سريع النمو وهي المورد المخصص للمناقشات حول أي من المشاريع المذكورة أعلاه والمواضيع ذات الصلة.