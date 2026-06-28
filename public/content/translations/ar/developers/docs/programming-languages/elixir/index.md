---
title: "إيثيريوم لمطوري ⁦Elixir⁩"
description: "تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على ⁦Elixir⁩."
lang: ar
incomplete: false
---

<FeaturedText>تعلم كيفية التطوير لإيثيريوم باستخدام المشاريع والأدوات المعتمدة على <span dir="ltr">Elixir</span>.</FeaturedText>

استخدم إيثيريوم لإنشاء تطبيقات لامركزية (أو "dapps") تستفيد من مزايا العملات المشفرة وتكنولوجيا سلسلة الكتل. يمكن أن تكون هذه التطبيقات اللامركزية (dapps) منزوعة الثقة، مما يعني أنه بمجرد نشرها على إيثيريوم، فإنها ستعمل دائمًا كما تمت برمجتها. يمكنها التحكم في الأصول الرقمية لإنشاء أنواع جديدة من التطبيقات المالية. يمكن أن تكون لامركزية، مما يعني أنه لا يوجد كيان أو شخص واحد يتحكم فيها ويكاد يكون من المستحيل فرض رقابة عليها.

## البدء مع العقود الذكية ولغة <span dir="ltr">Solidity</span> {#getting-started-with-smart-contracts-and-solidity}

**اتخذ خطواتك الأولى لدمج <span dir="ltr">Elixir</span> مع إيثيريوم**

هل تحتاج إلى مقدمة أساسية أولاً؟ تحقق من [<span dir="ltr">ethereum.org/learn</span>](/learn/) أو [<span dir="ltr">ethereum.org/developers</span>](/developers/).

- [شرح سلسلة الكتل](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [فهم العقود الذكية](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [كتابة عقدك الذكي الأول](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [تعلم كيفية تجميع ونشر <span dir="ltr">Solidity</span>](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## مقالات للمبتدئين {#beginner-articles}

- [فهم حسابات إيثيريوم أخيرًا](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [<span dir="ltr">Ethers</span> — مكتبة <span dir="ltr">Web3</span> من الدرجة الأولى لإيثيريوم لـ <span dir="ltr">Elixir</span>](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## مقالات للمستوى المتوسط {#intermediate-articles}

- [كيفية توقيع معاملات عقود إيثيريوم الخام باستخدام <span dir="ltr">Elixir</span>](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [عقود إيثيريوم الذكية و <span dir="ltr">Elixir</span>](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## مشاريع وأدوات <span dir="ltr">Elixir</span> {#elixir-projects-and-tools}

### نشطة {#active}

- [<span dir="ltr">block_keys</span>](https://github.com/ExWeb3/block_keys) - _تنفيذ <span dir="ltr">BIP32</span> و <span dir="ltr">BIP44</span> في <span dir="ltr">Elixir</span> (تسلسل هرمي متعدد الحسابات للمحافظ الحتمية)_
- [<span dir="ltr">ethereumex</span>](https://github.com/mana-ethereum/ethereumex) - _عميل <span dir="ltr">JSON-RPC</span> في <span dir="ltr">Elixir</span> لسلسلة كتل إيثيريوم_
- [<span dir="ltr">ethers</span>](https://github.com/ExWeb3/elixir_ethers) - _مكتبة <span dir="ltr">Web3</span> شاملة للتفاعل مع العقود الذكية على إيثيريوم باستخدام <span dir="ltr">Elixir</span>_
- [<span dir="ltr">ethers_kms</span>](https://github.com/ExWeb3/elixir_ethers_kms) - _مكتبة توقيع <span dir="ltr">KMS</span> لـ <span dir="ltr">Ethers</span> (توقيع المعاملات باستخدام <span dir="ltr">AWS KMS</span>)_
- [<span dir="ltr">ex_abi</span>](https://github.com/poanetwork/ex_abi) - _تنفيذ محلل/مفكك/مشفر <span dir="ltr">ABI</span> لإيثيريوم في <span dir="ltr">Elixir</span>_
- [<span dir="ltr">ex_keccak</span>](https://github.com/ExWeb3/ex_keccak) - _مكتبة <span dir="ltr">Elixir</span> لحساب تجزئات <span dir="ltr">Keccak SHA3-256</span> باستخدام حزمة <span dir="ltr">tiny-keccak</span> مبنية بـ <span dir="ltr">Rust</span> عبر <span dir="ltr">NIF</span>_
- [<span dir="ltr">ex_rlp</span>](https://github.com/mana-ethereum/ex_rlp) - _تنفيذ <span dir="ltr">Elixir</span> لتشفير <span dir="ltr">RLP</span> (بادئة الطول العودية) الخاص بإيثيريوم_

### مؤرشفة / لم تعد مدعومة {#archived--no-longer-maintained}

- [<span dir="ltr">eth</span>](https://hex.pm/packages/eth) - _أدوات إيثيريوم لـ <span dir="ltr">Elixir</span>_
- [<span dir="ltr">exw3</span>](https://github.com/hswick/exw3) - _عميل <span dir="ltr">RPC</span> عالي المستوى لإيثيريوم لـ <span dir="ltr">Elixir</span>_
- [<span dir="ltr">mana</span>](https://github.com/mana-ethereum/mana) - _تنفيذ عقدة كاملة لإيثيريوم مكتوب بـ <span dir="ltr">Elixir</span>_

هل تبحث عن المزيد من الموارد؟ تحقق من [الصفحة الرئيسية للمطورين](/developers/).

## مساهمو مجتمع <span dir="ltr">Elixir</span> {#elixir-community-contributors}

تستضيف [قناة <span dir="ltr">#ethereum</span> على <span dir="ltr">Slack</span> الخاص بـ <span dir="ltr">Elixir</span>](https://elixir-lang.slack.com/archives/C5RPZ3RJL) مجتمعًا سريع النمو وهي المورد المخصص للمناقشات حول أي من المشاريع المذكورة أعلاه والمواضيع ذات الصلة.