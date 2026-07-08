---
title: "كيفية تطوير واختبار تطبيق لامركزي (⁦dapp⁩) على شبكة اختبار محلية متعددة العملاء"
description: "سيرشدك هذا الدليل أولاً إلى كيفية إنشاء وتكوين شبكة اختبار إيثيريوم محلية متعددة العملاء قبل استخدام شبكة الاختبار لنشر واختبار تطبيق لامركزي (⁦dapp⁩)."
author: "تيدي ميتيكو"
tags:
  [
    "العملاء",
    "العقد",
    "العقود الذكية",
    "قابلية التركيب",
    "طبقة الإجماع",
    "طبقة التنفيذ",
    "الاختبار",
  ]
skill: intermediate
breadcrumb: "شبكة اختبار متعددة العملاء"
lang: ar
published: 2023-04-11
---

## مقدمة {#introduction}

يرشدك هذا الدليل خلال عملية إنشاء شبكة اختبار إيثيريوم محلية قابلة للتكوين، ونشر عقد ذكي عليها، واستخدام شبكة الاختبار لإجراء اختبارات على تطبيقك اللامركزي (dapp). صُمم هذا الدليل لمطوري التطبيقات اللامركزية الذين يرغبون في تطوير واختبار تطبيقاتهم اللامركزية محليًا مقابل تكوينات شبكة مختلفة قبل النشر على شبكة اختبار حية أو الشبكة الرئيسية.

في هذا الدليل، ستقوم بما يلي:

- إنشاء شبكة اختبار إيثيريوم محلية باستخدام [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) عبر [Kurtosis](https://www.kurtosis.com/)،
- ربط بيئة تطوير التطبيق اللامركزي (dapp) الخاصة بك في Hardhat بشبكة الاختبار المحلية لتجميع ونشر واختبار تطبيق لامركزي، و
- تكوين شبكة الاختبار المحلية، بما في ذلك المعلمات مثل عدد العقد واقترانات عملاء طبقة التنفيذ/طبقة الإجماع (EL/CL) المحددة، لتمكين مسارات عمل التطوير والاختبار مقابل تكوينات الشبكة المختلفة.

### ما هو Kurtosis؟ {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) هو نظام بناء قابل للتركيب مصمم لتكوين بيئات اختبار متعددة الحاويات. وهو يمكّن المطورين تحديدًا من إنشاء بيئات قابلة لإعادة الإنتاج تتطلب منطق إعداد ديناميكي، مثل شبكات اختبار سلسلة الكتل.

في هذا الدليل، تقوم حزمة `eth-network-package` من Kurtosis بتشغيل شبكة اختبار إيثيريوم محلية مع دعم لعميل طبقة التنفيذ (EL) [`geth`](https://geth.ethereum.org/)، بالإضافة إلى عملاء طبقة الإجماع (CL) [`teku`](https://consensys.io/teku) و[`lighthouse`](https://lighthouse.sigmaprime.io/) و[`lodestar`](https://lodestar.chainsafe.io/). تعمل هذه الحزمة كبديل قابل للتكوين وقابل للتركيب للشبكات في أطر العمل مثل Hardhat Network وGanache وAnvil. يوفر Kurtosis للمطورين تحكمًا ومرونة أكبر في شبكات الاختبار التي يستخدمونها، وهو سبب رئيسي وراء [استخدام مؤسسة إيثيريوم لـ Kurtosis لاختبار الدمج](https://www.kurtosis.com/blog/testing-the-ethereum-merge) واستمرارها في استخدامه لاختبار ترقيات الشبكة.

## إعداد Kurtosis {#setting-up-kurtosis}

قبل المتابعة، تأكد من أن لديك:

- [تثبيت وتشغيل محرك Docker](https://docs.kurtosis.com/install/#i-install--start-docker) على جهازك المحلي
- [تثبيت واجهة سطر أوامر Kurtosis (CLI)](https://docs.kurtosis.com/install#ii-install-the-cli) (أو ترقيتها إلى أحدث إصدار، إذا كانت مثبتة لديك بالفعل)
- تثبيت [Node.js](https://nodejs.org/en) و[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) و[npx](https://www.npmjs.com/package/npx) (لبيئة التطبيق اللامركزي الخاصة بك)

## إنشاء شبكة اختبار إيثيريوم محلية {#instantiate-testnet}

لتشغيل شبكة اختبار إيثيريوم محلية، قم بتشغيل:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

ملاحظة: يقوم هذا الأمر بتسمية شبكتك: <span dir="ltr">"local-eth-testnet"</span> باستخدام العلامة `--enclave`.

سيطبع Kurtosis الخطوات التي يتخذها داخليًا أثناء عمله على تفسير التعليمات والتحقق من صحتها ثم تنفيذها. في النهاية، يجب أن ترى مخرجات تشبه ما يلي:

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

تهانينا! لقد استخدمت Kurtosis لإنشاء شبكة اختبار إيثيريوم محلية، مع عميل طبقة إجماع (CL) (`lighthouse`) وعميل طبقة تنفيذ (EL) (`geth`)، عبر Docker.

### مراجعة {#review-instantiate-testnet}

في هذا القسم، قمت بتنفيذ أمر يوجه Kurtosis لاستخدام [`eth-network-package` المستضافة عن بُعد على GitHub](https://github.com/kurtosis-tech/eth-network-package) لتشغيل شبكة اختبار إيثيريوم محلية داخل [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) الخاص بـ Kurtosis. داخل الـ Enclave الخاص بك، ستجد كلاً من "القطع الأثرية للملفات" (file artifacts) و"خدمات المستخدم" (user services).

تتضمن [القطع الأثرية للملفات](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) في الـ Enclave الخاص بك جميع البيانات التي تم إنشاؤها واستخدامها لتمهيد عملاء طبقة التنفيذ (EL) وطبقة الإجماع (CL). تم إنشاء البيانات باستخدام خدمة `prelaunch-data-generator` المبنية من [صورة Docker](https://github.com/ethpandaops/ethereum-genesis-generator) هذه.

تعرض خدمات المستخدم جميع الخدمات المعبأة في حاويات والتي تعمل في الـ Enclave الخاص بك. ستلاحظ أنه تم إنشاء عقدة واحدة، تتميز بكل من عميل طبقة التنفيذ (EL) وعميل طبقة الإجماع (CL).

## ربط بيئة تطوير التطبيق اللامركزي (dapp) بشبكة اختبار إيثيريوم المحلية {#connect-your-dapp}

### إعداد بيئة تطوير التطبيق اللامركزي {#set-up-dapp-env}

الآن بعد أن أصبح لديك شبكة اختبار محلية قيد التشغيل، يمكنك ربط بيئة تطوير التطبيق اللامركزي الخاصة بك لاستخدام شبكة الاختبار المحلية. سيتم استخدام إطار عمل Hardhat في هذا الدليل لنشر تطبيق لامركزي للعبة البلاك جاك (blackjack) على شبكة الاختبار المحلية الخاصة بك.

لإعداد بيئة تطوير التطبيق اللامركزي الخاصة بك، قم باستنساخ المستودع الذي يحتوي على نموذج التطبيق اللامركزي الخاص بنا وتثبيت تبعياته، عن طريق تشغيل:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

يحتوي مجلد [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) المستخدم هنا على الإعداد النموذجي لمطور التطبيقات اللامركزية الذي يستخدم إطار عمل [Hardhat](https://hardhat.org/):

- يحتوي [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) على بعض العقود الذكية البسيطة لتطبيق لامركزي للعبة البلاك جاك
- يحتوي [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) على برنامج نصي لنشر عقد رمز مميز على شبكة إيثيريوم المحلية الخاصة بك
- يحتوي [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) على اختبار <span dir="ltr">.js</span> بسيط لعقد الرمز المميز الخاص بك لتأكيد أن كل لاعب في تطبيق البلاك جاك اللامركزي الخاص بنا قد تم سك <span dir="ltr">1000</span> رمز له
- يقوم [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) بتكوين إعداد Hardhat الخاص بك

### تكوين Hardhat لاستخدام شبكة الاختبار المحلية {#configure-hardhat}

مع إعداد بيئة تطوير التطبيق اللامركزي الخاصة بك، ستقوم الآن بربط Hardhat لاستخدام شبكة اختبار إيثيريوم المحلية التي تم إنشاؤها باستخدام Kurtosis. لتحقيق ذلك، استبدل `<$YOUR_PORT>` في بنية `localnet` في ملف التكوين `hardhat.config.ts` الخاص بك بمنفذ مخرجات rpc uri من أي خدمة `el-client-<num>`. في حالة هذا النموذج، سيكون المنفذ `64248`. سيكون المنفذ الخاص بك مختلفًا.

مثال في `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: استبدل $YOUR_PORT بمنفذ URI لعقدة تم إنتاجها بواسطة حزمة Kurtosis لشبكة ETH

// هذه مفاتيح خاصة مرتبطة بحسابات اختبار ممولة مسبقًا تم إنشاؤها بواسطة eth-network-package
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

بمجرد حفظ ملفك، ستكون بيئة تطوير التطبيق اللامركزي في Hardhat متصلة الآن بشبكة اختبار إيثيريوم المحلية الخاصة بك! يمكنك التحقق من أن شبكة الاختبار الخاصة بك تعمل عن طريق تشغيل:

```python
npx hardhat balances --network localnet
```

يجب أن تبدو المخرجات مشابهة لما يلي:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

يؤكد هذا أن Hardhat يستخدم شبكة الاختبار المحلية الخاصة بك ويكتشف الحسابات الممولة مسبقًا التي تم إنشاؤها بواسطة `eth-network-package`.

### نشر واختبار تطبيقك اللامركزي محليًا {#deploy-and-test-dapp}

مع اتصال بيئة تطوير التطبيق اللامركزي بالكامل بشبكة اختبار إيثيريوم المحلية، يمكنك الآن تشغيل مسارات عمل التطوير والاختبار على تطبيقك اللامركزي باستخدام شبكة الاختبار المحلية.

لتجميع ونشر العقد الذكي `ChipToken.sol` للنماذج الأولية والتطوير المحلي، قم بتشغيل:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

يجب أن تبدو المخرجات مشابهة لما يلي:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

حاول الآن تشغيل اختبار `simple.js` على تطبيقك اللامركزي المحلي لتأكيد أن كل لاعب في تطبيق البلاك جاك اللامركزي الخاص بنا قد تم سك <span dir="ltr">1000</span> رمز له:

يجب أن تبدو المخرجات مشابهة لما يلي:

```python
npx hardhat test --network localnet
```

يجب أن تبدو المخرجات مشابهة لما يلي:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### مراجعة {#review-dapp-workflows}

في هذه المرحلة، تكون قد قمت بإعداد بيئة تطوير تطبيق لامركزي، وربطتها بشبكة إيثيريوم محلية تم إنشاؤها بواسطة Kurtosis، وقمت بتجميع ونشر وتشغيل اختبار بسيط على تطبيقك اللامركزي.

دعنا نستكشف الآن كيف يمكنك تكوين الشبكة الأساسية لاختبار تطبيقاتنا اللامركزية في ظل تكوينات شبكة مختلفة.

## تكوين شبكة اختبار إيثيريوم المحلية {#configure-testnet}

### تغيير تكوينات العميل وعدد العقد {#configure-client-config-and-num-nodes}

يمكن تكوين شبكة اختبار إيثيريوم المحلية الخاصة بك لاستخدام أزواج مختلفة من عملاء طبقة التنفيذ (EL) وطبقة الإجماع (CL)، بالإضافة إلى عدد متفاوت من العقد، اعتمادًا على السيناريو وتكوين الشبكة المحدد الذي تريد تطويره أو اختباره. هذا يعني أنه بمجرد الإعداد، يمكنك تشغيل شبكة اختبار محلية مخصصة واستخدامها لتشغيل نفس مسارات العمل (النشر، الاختبارات، إلخ) في ظل تكوينات شبكة مختلفة لضمان عمل كل شيء كما هو متوقع. لمعرفة المزيد حول المعلمات الأخرى التي يمكنك تعديلها، قم بزيارة هذا الرابط.

جرب ذلك! يمكنك تمرير خيارات تكوين مختلفة إلى `eth-network-package` عبر ملف JSON. يوفر ملف JSON لمعلمات الشبكة هذا التكوينات المحددة التي سيستخدمها Kurtosis لإعداد شبكة إيثيريوم المحلية.

خذ ملف التكوين الافتراضي وقم بتحريره لتشغيل عقدتين بأزواج مختلفة من طبقة التنفيذ/طبقة الإجماع (EL/CL):

- العقدة <span dir="ltr">1</span> مع `geth`/`lighthouse`
- العقدة <span dir="ltr">2</span> مع `geth`/`lodestar`
- العقدة <span dir="ltr">3</span> مع `geth`/`teku`

ينشئ هذا التكوين شبكة غير متجانسة من تطبيقات عقدة إيثيريوم لاختبار تطبيقك اللامركزي. يجب أن يبدو ملف التكوين الخاص بك الآن كما يلي:

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

ترتبط كل بنية `participants` بعقدة في الشبكة، لذا فإن <span dir="ltr">3</span> بنيات `participants` ستخبر Kurtosis بتشغيل <span dir="ltr">3</span> عقد في شبكتك. ستسمح لك كل بنية `participants` بتحديد زوج طبقة التنفيذ (EL) وطبقة الإجماع (CL) المستخدم لتلك العقدة المحددة.

تقوم بنية `network_params` بتكوين إعدادات الشبكة التي تُستخدم لإنشاء ملفات التكوين (genesis files) لكل عقدة بالإضافة إلى إعدادات أخرى مثل الثواني لكل خانة (slot) في الشبكة.

احفظ ملف المعلمات المحرر في أي دليل تريده (في المثال أدناه، تم حفظه على سطح المكتب) ثم استخدمه لتشغيل حزمة Kurtosis الخاصة بك عن طريق تشغيل:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

ملاحظة: يُستخدم الأمر `kurtosis clean -a` هنا لتوجيه Kurtosis لتدمير شبكة الاختبار القديمة ومحتوياتها قبل بدء تشغيل شبكة جديدة.

مرة أخرى، سيعمل Kurtosis لفترة من الوقت ويطبع الخطوات الفردية التي تحدث. في النهاية، يجب أن تبدو المخرجات مشابهة لما يلي:

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

تهانينا! لقد نجحت في تكوين شبكة الاختبار المحلية الخاصة بك ليكون بها <span dir="ltr">3</span> عقد بدلاً من <span dir="ltr">1</span>. لتشغيل نفس مسارات العمل التي قمت بها من قبل على تطبيقك اللامركزي (النشر والاختبار)، قم بإجراء نفس العمليات التي قمنا بها من قبل عن طريق استبدال `<$YOUR_PORT>` في بنية `localnet` في ملف التكوين `hardhat.config.ts` الخاص بك بمنفذ مخرجات rpc uri من أي خدمة `el-client-<num>` في شبكة الاختبار المحلية الجديدة المكونة من <span dir="ltr">3</span> عقد.

## الخاتمة {#conclusion}

وهذا كل شيء! لتلخيص هذا الدليل القصير، قمت بما يلي:

- إنشاء شبكة اختبار إيثيريوم محلية عبر Docker باستخدام Kurtosis
- ربط بيئة تطوير التطبيق اللامركزي المحلية الخاصة بك بشبكة إيثيريوم المحلية
- نشر تطبيق لامركزي وتشغيل اختبار بسيط عليه على شبكة إيثيريوم المحلية
- تكوين شبكة إيثيريوم الأساسية ليكون بها <span dir="ltr">3</span> عقد

نود أن نسمع منك عما سار بشكل جيد بالنسبة لك، وما يمكن تحسينه، أو للإجابة على أي من أسئلتك. لا تتردد في التواصل معنا عبر [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) أو [مراسلتنا عبر البريد الإلكتروني](mailto:feedback@kurtosistech.com)!

### أمثلة وأدلة أخرى {#other-examples-guides}

نشجعك على التحقق من [البدء السريع](https://docs.kurtosis.com/quickstart) الخاص بنا (حيث ستقوم ببناء قاعدة بيانات Postgres وواجهة برمجة تطبيقات (API) فوقها) وأمثلتنا الأخرى في [مستودع awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) الخاص بنا حيث ستجد بعض الأمثلة الرائعة، بما في ذلك حزم لـ:

- [تشغيل نفس شبكة اختبار إيثيريوم المحلية](https://github.com/kurtosis-tech/eth2-package)، ولكن مع خدمات إضافية متصلة مثل مرسل المعاملات العشوائية (لمحاكاة المعاملات)، ومراقب التفرع (fork monitor)، ومثيل Grafana وPrometheus متصل
- إجراء [اختبار شبكة فرعية](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) على نفس شبكة إيثيريوم المحلية