---
title: "كيفية تطوير واختبار تطبيق لامركزي على شبكة اختبار محلية ومتعددة العملاء"
description: "سيرشدك هذا الدليل أولاً إلى كيفية إنشاء وتكوين شبكة اختبار إيثريوم محلية متعددة العملاء قبل استخدام شبكة الاختبار لنشر واختبار تطبيق لامركزي."
author: "Tedi Mitiku"
tags:
  [
    "العملاء",
    "العُقَد",
    "العقود الذكيه ",
    "قابلية التركيب",
    "طبقة الإجماع",
    "طبقة التنفيذ",
    "الاختبار"
  ]
skill: intermediate
lang: ar
published: 2023-04-11
---

## مقدمة {#مقدمة}

يرشدك هذا الدليل خلال عملية إنشاء شبكة اختبار إيثريوم محلية قابلة للتكوين، ونشر عقد ذكي عليها، واستخدام شبكة الاختبار لإجراء اختبارات على تطبيقك اللامركزي. هذا الدليل مصمم لمطوري التطبيقات اللامركزية الذين يرغبون في تطوير واختبار تطبيقاتهم اللامركزية محلياً مقابل تكوينات الشبكة المختلفة قبل النشر على شبكة اختبار حية أو الشبكة الرئيسية.

في هذا الدليل، ستقوم بما يلي:

- إنشاء شبكة اختبار إيثريوم محلية باستخدام [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) باستخدام [Kurtosis](https://www.kurtosis.com/)،
- ربط بيئة تطوير التطبيقات اللامركزية Hardhat الخاصة بك بشبكة الاختبار المحلية لتجميع ونشر واختبار تطبيق لامركزي، و
- تكوين شبكة الاختبار المحلية، بما في ذلك المعلمات مثل عدد العقد وأزواج عملاء EL/CL المحددة، لتمكين عمليات التطوير والاختبار مقابل تكوينات الشبكة المختلفة.

### ما هو Kurtosis؟ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) هو نظام بناء قابل للتكوين مصمم لتكوين بيئات اختبار متعددة الحاويات. إنه يمكّن المطورين على وجه التحديد من إنشاء بيئات قابلة للتكرار تتطلب منطق إعداد ديناميكي، مثل شبكات اختبار البلوك تشين.

في هذا الدليل، تقوم حزمة Kurtosis eth-network-package بإنشاء شبكة اختبار إيثريوم محلية مع دعم لعميل طبقة التنفيذ (EL) [`geth`](https://geth.ethereum.org/)، بالإضافة إلى عملاء طبقة الإجماع (CL) [`teku`](https://consensys.io/teku)، و[`lighthouse`](https://lighthouse.sigmaprime.io/)، و[`lodestar`](https://lodestar.chainsafe.io/). تعمل هذه الحزمة كبديل قابل للتكوين والتأليف للشبكات في أطر العمل مثل Hardhat Network وGanache وAnvil. يوفر Kurtosis للمطورين تحكماً ومرونة أكبر على شبكات الاختبار التي يستخدمونها، وهو سبب رئيسي لاستخدام [مؤسسة إيثريوم لـ Kurtosis لاختبار الدمج](https://www.kurtosis.com/blog/testing-the-ethereum-merge) واستمرارها في استخدامه لاختبار ترقيات الشبكة.

## إعداد Kurtosis {#setting-up-kurtosis}

قبل المتابعة، تأكد من أن لديك:

- [تثبيت وتشغيل محرك Docker](https://docs.kurtosis.com/install/#i-install--start-docker) على جهازك المحلي
- [تثبيت واجهة سطر أوامر Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (أو ترقيته إلى أحدث إصدار، إذا كان لديك واجهة سطر الأوامر مثبتة بالفعل)
- تثبيت [Node.js](https://nodejs.org/en) و[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) و[npx](https://www.npmjs.com/package/npx) (لبيئة تطبيقك اللامركزي)

## إنشاء شبكة اختبار إيثريوم محلية {#instantiate-testnet}

لتشغيل شبكة اختبار إيثريوم محلية، قم بتشغيل:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

ملاحظة: يقوم هذا الأمر بتسمية شبكتك: "local-eth-testnet" باستخدام علامة `--enclave`.

سيطبع Kurtosis الخطوات التي يتخذها في الخلفية أثناء عمله على تفسير التعليمات والتحقق منها ثم تنفيذها. في النهاية، يجب أن ترى مخرجات تشبه ما يلي:

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

تهانينا! لقد استخدمت Kurtosis لإنشاء شبكة اختبار إيثريوم محلية، مع عميل CL (`lighthouse`) وعميل EL (`geth`)، عبر Docker.

### المراجعة {#review-instantiate-testnet}

في هذا القسم، قمت بتنفيذ أمر وجه Kurtosis لاستخدام [`eth-network-package` المستضافة عن بعد على GitHub](https://github.com/kurtosis-tech/eth-network-package) لتشغيل شبكة اختبار إيثريوم محلية داخل [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) الخاص بـ Kurtosis. داخل enclave الخاص بك، ستجد كلاً من "مصنوعات الملفات" و "خدمات المستخدم".

تتضمن [مصنوعات الملفات](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) الموجودة في enclave الخاص بك جميع البيانات التي تم إنشاؤها واستخدامها لتشغيل عملاء EL وCL. تم إنشاء البيانات باستخدام خدمة `prelaunch-data-generator` التي تم إنشاؤها من [صورة Docker هذه](https://github.com/ethpandaops/ethereum-genesis-generator)

تعرض خدمات المستخدم جميع الخدمات المعبأة في حاويات والتي تعمل في enclave الخاص بك. ستلاحظ أنه تم إنشاء عقدة واحدة، تضم عميل EL وعميل CL.

## ربط بيئة تطوير التطبيقات اللامركزية الخاصة بك بشبكة اختبار إيثريوم المحلية {#connect-your-dapp}

### إعداد بيئة تطوير التطبيقات اللامركزية {#set-up-dapp-env}

الآن بعد أن أصبح لديك شبكة اختبار محلية قيد التشغيل، يمكنك ربط بيئة تطوير التطبيقات اللامركزية الخاصة بك لاستخدام شبكة الاختبار المحلية. سيتم استخدام إطار عمل Hardhat في هذا الدليل لنشر تطبيق بلاك جاك اللامركزي على شبكة الاختبار المحلية الخاصة بك.

لإعداد بيئة تطوير التطبيقات اللامركزية الخاصة بك، استنسخ المستودع الذي يحتوي على نموذج التطبيق اللامركزي الخاص بنا وقم بتثبيت تبعياته، ثم قم بتشغيل:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

يحتوي مجلد [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) المستخدم هنا على الإعداد النموذجي لمطور التطبيقات اللامركزية الذي يستخدم إطار عمل [Hardhat](https://hardhat.org/):

- يحتوي [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) على بعض العقود الذكية البسيطة لتطبيق بلاك جاك اللامركزي
- يحتوي [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) على برنامج نصي لنشر عقد رمزي إلى شبكة إيثريوم المحلية الخاصة بك
- يحتوي [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) على اختبار .js بسيط لعقد الرمز المميز الخاص بك للتأكد من أن كل لاعب في تطبيق Blackjack اللامركزي الخاص بنا قد تم إصدار 1000 له
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) يقوم بتكوين إعداد Hardhat الخاص بك

### تكوين Hardhat لاستخدام شبكة الاختبار المحلية {#configure-hardhat}

بعد إعداد بيئة تطوير التطبيقات اللامركزية الخاصة بك، ستقوم الآن بتوصيل Hardhat لاستخدام شبكة اختبار إيثريوم المحلية التي تم إنشاؤها باستخدام Kurtosis. لتحقيق ذلك، استبدل `<$YOUR_PORT>` في بنية `localnet` في ملف التكوين `hardhat.config.ts` الخاص بك بمنفذ مخرجات rpc uri من أي خدمة `el-client-<num>`. في هذه الحالة النموذجية، سيكون المنفذ `64248`. سيكون المنفذ الخاص بك مختلفًا.

مثال في `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: استبدل $YOUR_PORT بمنفذ URI للعقدة الذي أنتجته حزمة شبكة ETH KURTOSIS

// هذه مفاتيح خاصة مرتبطة بحسابات اختبار ممولة مسبقًا تم إنشاؤها بواسطة حزمة شبكة eth
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

بمجرد حفظ ملفك، يتم الآن توصيل بيئة تطوير التطبيقات اللامركزية Hardhat الخاصة بك بشبكة اختبار إيثريوم المحلية! يمكنك التحقق من أن شبكة الاختبار الخاصة بك تعمل عن طريق تشغيل:

```python
npx hardhat balances --network localnet
```

يجب أن يبدو الناتج شيئًا كهذا:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

يؤكد هذا أن Hardhat يستخدم شبكة الاختبار المحلية الخاصة بك ويكتشف الحسابات الممولة مسبقًا التي أنشأتها `eth-network-package`.

### نشر واختبار تطبيقك اللامركزي محليًا {#deploy-and-test-dapp}

مع توصيل بيئة تطوير التطبيقات اللامركزية بالكامل بشبكة اختبار إيثريوم المحلية، يمكنك الآن تشغيل مهام التطوير والاختبار على تطبيقك اللامركزي باستخدام شبكة الاختبار المحلية.

لتجميع ونشر العقد الذكي `ChipToken.sol` للنماذج الأولية والتطوير المحلي، قم بتشغيل:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

يجب أن يبدو الناتج شيئًا مثل:

```python
تم نشر ChipToken إلى: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

الآن حاول تشغيل اختبار `simple.js` على تطبيقك اللامركزي المحلي للتأكد من أنه قد تم إصدار 1000 لكل لاعب في تطبيق Blackjack اللامركزي الخاص بنا:

يجب أن يبدو الناتج شيئًا كهذا:

```python
npx hardhat test --network localnet
```

يجب أن يبدو الناتج شيئًا كهذا:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### المراجعة {#review-dapp-workflows}

في هذه المرحلة، لقد قمت الآن بإعداد بيئة تطوير للتطبيقات اللامركزية، وربطها بشبكة إيثريوم محلية تم إنشاؤها بواسطة Kurtosis، وقمت بتجميع تطبيقك اللامركزي ونشره وتشغيل اختبار بسيط عليه.

الآن دعنا نستكشف كيف يمكنك تكوين الشبكة الأساسية لاختبار تطبيقاتنا اللامركزية تحت تكوينات شبكة مختلفة.

## تكوين شبكة اختبار إيثريوم المحلية {#configure-testnet}

### تغيير تكوينات العميل وعدد العقد {#configure-client-config-and-num-nodes}

يمكن تكوين شبكة اختبار إيثريوم المحلية الخاصة بك لاستخدام أزواج عملاء EL و CL مختلفة، بالإضافة إلى عدد متغير من العقد، اعتمادًا على السيناريو وتكوين الشبكة المحدد الذي تريد تطويره أو اختباره. هذا يعني أنه بمجرد الإعداد، يمكنك تشغيل شبكة اختبار محلية مخصصة واستخدامها لتشغيل نفس مسارات العمل (النشر، الاختبارات، إلخ). تحت تكوينات الشبكة المختلفة لضمان عمل كل شيء كما هو متوقع. لمعرفة المزيد حول المعلمات الأخرى التي يمكنك تعديلها، تفضل بزيارة هذا الرابط.

جرّب ذلك! يمكنك تمرير خيارات تكوين مختلفة إلى `eth-network-package` عبر ملف JSON. يوفر ملف JSON الخاص بمعلمات الشبكة هذا التكوينات المحددة التي سيستخدمها Kurtosis لإعداد شبكة إيثريوم المحلية.

خذ ملف التكوين الافتراضي وقم بتحريره لتشغيل ثلاث عقد بأزواج EL/CL مختلفة:

- العقدة 1 مع `geth`/`lighthouse`
- العقدة 2 مع `geth`/`lodestar`
- العقدة 3 مع `geth`/`teku`

ينشئ هذا التكوين شبكة غير متجانسة من تطبيقات عقدة إيثريوم لاختبار تطبيقك اللامركزي. يجب أن يبدو ملف التكوين الخاص بك الآن كما يلي:

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

تتوافق كل بنية `participants` مع عقدة في الشبكة، لذلك ستخبر 3 بنيات `participants` برنامج Kurtosis بتشغيل 3 عقد في شبكتك. ستسمح لك كل بنية `participants` بتحديد زوج EL و CL المستخدم لتلك العقدة المحددة.

تقوم بنية `network_params` بتكوين إعدادات الشبكة التي يتم استخدامها لإنشاء ملفات التكوين الأولية لكل عقدة بالإضافة إلى إعدادات أخرى مثل الثواني لكل فترة زمنية للشبكة.

احفظ ملف المعلمات الذي تم تحريره في أي دليل تريده (في المثال أدناه، يتم حفظه على سطح المكتب) ثم استخدمه لتشغيل حزمة Kurtosis الخاصة بك عن طريق تشغيل:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

ملاحظة: يُستخدم الأمر `kurtosis clean -a` هنا لتوجيه Kurtosis لتدمير شبكة الاختبار القديمة ومحتوياتها قبل بدء تشغيل شبكة جديدة.

مرة أخرى، سيعمل Kurtosis قليلاً ويطبع الخطوات الفردية التي تحدث. في النهاية، يجب أن يبدو الناتج شيئًا مثل:

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

تهانينا! لقد نجحت في تكوين شبكة الاختبار المحلية الخاصة بك لتحتوي على 3 عقد بدلاً من 1. لتشغيل نفس مهام سير العمل التي قمت بها من قبل على تطبيقك اللامركزي (النشر والاختبار)، قم بتنفيذ نفس العمليات التي قمنا بها من قبل عن طريق استبدال `<$YOUR_PORT>` في بنية `localnet` في ملف التكوين `hardhat.config.ts` الخاص بك بمنفذ إخراج uri rpc من أي خدمة `el-client-<num>` في شبكة الاختبار المحلية الجديدة المكونة من 3 عقد.

## الخلاصة {#conclusion}

وهذا كل شيء! لتلخيص هذا الدليل القصير، قمت بما يلي:

- إنشاء شبكة اختبار إيثريوم محلية عبر Docker باستخدام Kurtosis
- توصيل بيئة تطوير التطبيقات اللامركزية المحلية الخاصة بك بشبكة إيثريوم المحلية
- نشر تطبيق لامركزي وتشغيل اختبار بسيط عليه على شبكة إيثريوم المحلية
- تكوين شبكة إيثريوم الأساسية لتحتوي على 3 عقد

يسعدنا أن نسمع منك حول ما سار على ما يرام بالنسبة لك، وما الذي يمكن تحسينه، أو للإجابة على أي من أسئلتك. لا تتردد في التواصل معنا عبر [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) أو [مراسلتنا عبر البريد الإلكتروني](mailto:feedback@kurtosistech.com)!

### أمثلة وأدلة أخرى {#other-examples-guides}

نشجعك على الاطلاع على [البداية السريعة](https://docs.kurtosis.com/quickstart) (حيث ستقوم بإنشاء قاعدة بيانات Postgres وواجهة برمجة تطبيقات فوقها) وأمثلتنا الأخرى في [مستودع awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) حيث ستجد بعض الأمثلة الرائعة، بما في ذلك حزم لـ:

- تشغيل نفس شبكة اختبار إيثريوم المحلية، ولكن مع خدمات إضافية متصلة مثل مرسل المعاملات المزعجة (لمحاكاة المعاملات)، ومراقب الانقسام، ومثيل Grafana وPrometheus متصل
- إجراء [اختبار شبكة فرعية](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) على نفس شبكة إيثريوم المحلية
