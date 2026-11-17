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

يرشدك هذا الدليل خلال عملية إنشاء شبكة اختبار إيثيريوم محلية قابلة للتكوين، ونشر عقد ذكي عليها، واستخدام شبكة الاختبار لإجراء اختبارات على تطبيقك اللامركزي (dapp). صُمم هذا الدليل لمطوري التطبيقات اللامركزية (dapps) الذين يرغبون في تطوير واختبار تطبيقاتهم محليًا مقابل تكوينات شبكة مختلفة قبل النشر على شبكة اختبار حية أو الشبكة الرئيسية.

في هذا الدليل، ستقوم بما يلي:

- إنشاء شبكة اختبار إيثيريوم محلية باستخدام [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) عبر [Kurtosis](https://www.kurtosis.com/)،
- ربط بيئة تطوير التطبيق اللامركزي (dapp) الخاصة بك على Hardhat بشبكة الاختبار المحلية لتجميع ونشر واختبار تطبيق لامركزي، و
- تكوين شبكة الاختبار المحلية، بما في ذلك المعلمات مثل عدد العقد واقترانات محددة لعملاء طبقة التنفيذ/طبقة الإجماع (<span dir="ltr">EL/CL</span>)، لتمكين سير عمل التطوير والاختبار مقابل تكوينات الشبكة المختلفة.

### ما هو Kurtosis؟ {#what-is-kurtosis}

يُعد [Kurtosis](https://www.kurtosis.com/) نظام بناء قابل للتركيب مصمم لتكوين بيئات اختبار متعددة الحاويات. وهو يمكّن المطورين تحديدًا من إنشاء بيئات قابلة لإعادة الإنتاج تتطلب منطق إعداد ديناميكي، مثل شبكات اختبار سلسلة الكتل.

في هذا الدليل، تقوم حزمة Kurtosis `ethereum-package`، التي تديرها [ethPandaOps](https://ethpandaops.io/)، بتشغيل شبكة اختبار إيثيريوم محلية. وهي تدعم جميع عملاء طبقة التنفيذ (<span dir="ltr">EL</span>) الرئيسيين، مثل [`geth`](https://geth.ethereum.org/)، وعملاء طبقة الإجماع (<span dir="ltr">CL</span>)، مثل [`teku`](https://consensys.io/teku)، و[`lighthouse`](https://lighthouse.sigmaprime.io/)، و[`lodestar`](https://lodestar.chainsafe.io/). تعمل هذه الحزمة كبديل قابل للتكوين والتركيب للشبكات في أطر العمل مثل Hardhat Network وAnvil. يوفر Kurtosis للمطورين تحكمًا ومرونة أكبر في شبكات الاختبار التي يستخدمونها، وهو سبب رئيسي لاستخدام فرق عملاء إيثيريوم له لاختبار ترقيات الشبكة.

## إعداد Kurtosis {#setting-up-kurtosis}

قبل المتابعة، تأكد من أن لديك:

- [قمت بتثبيت وتشغيل محرك Docker](https://docs.kurtosis.com/install/#i-install--start-docker) على جهازك المحلي
- [قمت بتثبيت واجهة سطر أوامر Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (أو ترقيتها إلى أحدث إصدار، إذا كانت مثبتة لديك بالفعل)
- قمت بتثبيت [Node.js](https://nodejs.org/en) (لبيئة تطبيقك اللامركزي)

## إنشاء شبكة اختبار إيثيريوم محلية {#instantiate-testnet}

لتشغيل شبكة اختبار إيثيريوم محلية، قم بتشغيل:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

ملاحظة: يقوم هذا الأمر بتسمية شبكتك باسم "<span dir="ltr">local-eth-testnet</span>" باستخدام العلامة `--enclave`.

سيطبع Kurtosis الخطوات التي يتخذها داخليًا أثناء عمله على تفسير التعليمات والتحقق من صحتها ثم تنفيذها. في النهاية، يطبع ملخصًا للبيئة المعزولة (enclave) التي أنشأها. يتضمن الملخص قائمة بـ **عناصر الملفات (files artifacts)** وقائمة بـ **خدمات المستخدم (user services)**. مع التكوين الافتراضي، تتضمن خدمات المستخدم عقدة واحدة:

- `el-1-geth-lighthouse`، عميل التنفيذ `geth`
- `cl-1-lighthouse-geth`، عقدة المنارة `lighthouse`
- `vc-1-geth-lighthouse`، عميل المُدَقِّق `lighthouse`

يتم سرد كل خدمة مع المنافذ التي تكشفها والمنفذ المحلي الذي يتم تعيين كل منها إليه. على سبيل المثال، منفذ `rpc` لخدمة `el-1-geth-lighthouse` هو نقطة نهاية JSON-RPC التي ستستخدمها أدوات تطبيقك اللامركزي. ستكون الخدمات وأرقام المنافذ الدقيقة مختلفة على جهازك.

يمكنك عرض هذا الملخص مرة أخرى في أي وقت عن طريق تشغيل:

```sh
kurtosis enclave inspect local-eth-testnet
```

تهانينا! لقد استخدمت Kurtosis لإنشاء شبكة اختبار إيثيريوم محلية، مع عميل طبقة إجماع (`lighthouse`) وعميل طبقة تنفيذ (`geth`)، عبر Docker.

### مراجعة {#review-instantiate-testnet}

في هذا القسم، قمت بتنفيذ أمر وجه Kurtosis لاستخدام [`ethereum-package` المستضافة عن بُعد على GitHub](https://github.com/ethpandaops/ethereum-package) لتشغيل شبكة اختبار إيثيريوم محلية داخل [بيئة معزولة (Enclave)](https://docs.kurtosis.com/advanced-concepts/enclaves/) في Kurtosis. داخل بيئتك المعزولة، ستجد كلاً من "عناصر الملفات" و"خدمات المستخدم".

تتضمن [عناصر الملفات](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) في بيئتك المعزولة جميع البيانات التي تم إنشاؤها واستخدامها لتمهيد عملاء طبقة التنفيذ وطبقة الإجماع، مثل ملفات التكوين (genesis) ومفاتيح المُدَقِّق. تم إنشاء بيانات التكوين باستخدام [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

تعرض خدمات المستخدم جميع الخدمات المعبأة في حاويات والتي تعمل في بيئتك المعزولة. ستلاحظ أنه تم إنشاء عقدة واحدة، تتميز بكل من عميل طبقة التنفيذ وعميل طبقة الإجماع.

## ربط بيئة تطوير تطبيقك اللامركزي بشبكة اختبار إيثيريوم المحلية {#connect-your-dapp}

### إعداد بيئة تطوير التطبيق اللامركزي {#set-up-dapp-env}

الآن بعد أن أصبح لديك شبكة اختبار محلية قيد التشغيل، يمكنك ربط بيئة تطوير تطبيقك اللامركزي لاستخدام شبكة الاختبار المحلية الخاصة بك. سيتم استخدام إطار عمل Hardhat في هذا الدليل لنشر تطبيق لامركزي للعبة البلاك جاك (blackjack) على شبكة الاختبار المحلية الخاصة بك.

لإعداد بيئة تطوير تطبيقك اللامركزي، قم باستنساخ المستودع الذي يحتوي على نموذج التطبيق اللامركزي الخاص بنا وتثبيت تبعياته، قم بتشغيل:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

العلامة `--legacy-peer-deps` مطلوبة لأن بعض المكونات الإضافية لـ Hardhat في المشروع النموذجي تعلن عن إصدارات تبعيات نظيرة (peer dependency) متعارضة.

يحتوي مجلد [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) المستخدم هنا على الإعداد النموذجي لمطور التطبيقات اللامركزية الذي يستخدم إطار عمل [Hardhat](https://hardhat.org/):

- يحتوي [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) على بعض العقود الذكية البسيطة لتطبيق لامركزي للعبة البلاك جاك
- يحتوي [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) على برنامج نصي لنشر عقد رمز مميز على شبكة إيثيريوم المحلية الخاصة بك
- يحتوي [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) على اختبار <span dir="ltr">.js</span> بسيط لعقد الرمز المميز الخاص بك للتأكد من أن كل لاعب في تطبيق البلاك جاك اللامركزي الخاص بنا قد تم سك <span dir="ltr">1000</span> رمز له
- يقوم [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) بتكوين إعداد Hardhat الخاص بك

### تكوين Hardhat لاستخدام شبكة الاختبار المحلية {#configure-hardhat}

مع إعداد بيئة تطوير تطبيقك اللامركزي، ستقوم الآن بربط Hardhat لاستخدام شبكة اختبار إيثيريوم المحلية التي تم إنشاؤها باستخدام Kurtosis. أولاً، ابحث عن العنوان المحلي لنقطة نهاية JSON-RPC لعميل التنفيذ:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

الناتج هو عنوان URL مثل `http://127.0.0.1:32769`. سيكون المنفذ الخاص بك مختلفًا. استبدل `<PORT>` في بنية `localnet` في ملف التكوين `hardhat.config.ts` الخاص بك بهذا المنفذ.

مثال في `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: استبدل <PORT> بمنفذ URI لعقدة تم إنشاؤه بواسطة حزمة Kurtosis لشبكة ETH
  // هذه مفاتيح خاصة مرتبطة بحسابات اختبار ممولة مسبقًا تم إنشاؤها بواسطة حزمة eth-network-package
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

هذه المفاتيح الخاصة هي مفاتيح اختبار معروفة للجمهور. لا تستخدمها أبدًا على الشبكة الرئيسية أو أي شبكة عامة.

بمجرد حفظ ملفك، تصبح بيئة تطوير تطبيقك اللامركزي على Hardhat متصلة الآن بشبكة اختبار إيثيريوم المحلية الخاصة بك! يمكنك التحقق من أن شبكة الاختبار الخاصة بك تعمل عن طريق تشغيل:

```sh
npx hardhat balances --network localnet
```

يسرد الناتج عنوان ورصيد كل من الحسابات المذكورة أعلاه. على سبيل المثال، يجب أن يبدو السطر الأول هكذا:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

يؤكد هذا أن Hardhat يستخدم شبكة الاختبار المحلية الخاصة بك ويكتشف الحسابات الممولة مسبقًا التي أنشأتها `ethereum-package`.

### نشر واختبار تطبيقك اللامركزي محليًا {#deploy-and-test-dapp}

مع اتصال بيئة تطوير التطبيق اللامركزي بالكامل بشبكة اختبار إيثيريوم المحلية، يمكنك الآن تشغيل سير عمل التطوير والاختبار على تطبيقك اللامركزي باستخدام شبكة الاختبار المحلية.

لتجميع ونشر العقد الذكي `ChipToken.sol` للنماذج الأولية والتطوير المحلي، قم بتشغيل:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

يجب أن يبدو الناتج شيئًا مثل:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

حاول الآن تشغيل اختبار `ChipToken.js` على تطبيقك اللامركزي المحلي للتأكد من أن كل لاعب في تطبيق البلاك جاك اللامركزي الخاص بنا قد تم سك <span dir="ltr">1000</span> رمز له. لا يزال الاختبار النموذجي يستخدم دالة `deployed()` من <span dir="ltr">ethers v5</span>، والتي استبدلتها <span dir="ltr">ethers v6</span> بـ `waitForDeployment()`، لذا قم بتحديثها أولاً:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

ثم قم بتشغيل الاختبار:

```sh
npx hardhat test --network localnet
```

يجب أن يبدو الناتج شيئًا مثل هذا:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### مراجعة {#review-dapp-workflows}

في هذه المرحلة، قمت الآن بإعداد بيئة تطوير تطبيق لامركزي، وربطها بشبكة إيثيريوم محلية أنشأها Kurtosis، وقمت بتجميع ونشر وتشغيل اختبار بسيط على تطبيقك اللامركزي.

دعنا الآن نستكشف كيف يمكنك تكوين الشبكة الأساسية لاختبار تطبيقاتنا اللامركزية في ظل تكوينات شبكة مختلفة.

## تكوين شبكة اختبار إيثيريوم المحلية {#configure-testnet}

### تغيير تكوينات العميل وعدد العقد {#configure-client-config-and-num-nodes}

يمكن تكوين شبكة اختبار إيثيريوم المحلية الخاصة بك لاستخدام أزواج مختلفة من عملاء طبقة التنفيذ وطبقة الإجماع، بالإضافة إلى عدد متفاوت من العقد، اعتمادًا على السيناريو وتكوين الشبكة المحدد الذي تريد تطويره أو اختباره. هذا يعني أنه بمجرد الإعداد، يمكنك تشغيل شبكة اختبار محلية مخصصة واستخدامها لتشغيل نفس سير العمل (النشر، الاختبارات، إلخ) في ظل تكوينات شبكة مختلفة لضمان عمل كل شيء كما هو متوقع. لمعرفة المزيد حول المعلمات الأخرى التي يمكنك تعديلها، راجع [وثائق تكوين `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

جربها! يمكنك تمرير خيارات تكوين مختلفة إلى `ethereum-package` عبر ملف YAML. يوفر ملف معلمات الشبكة هذا التكوينات المحددة التي سيستخدمها Kurtosis لإعداد شبكة إيثيريوم المحلية.

قم بإنشاء ملف يسمى `network_params.yaml` يقوم بتشغيل ثلاث عقد بأزواج مختلفة من طبقة التنفيذ/طبقة الإجماع:

- العقدة <span dir="ltr">1</span> مع `geth`/`lighthouse`
- العقدة <span dir="ltr">2</span> مع `geth`/`lodestar`
- العقدة <span dir="ltr">3</span> مع `geth`/`teku`

ينشئ هذا التكوين شبكة غير متجانسة من تطبيقات عقد إيثيريوم لاختبار تطبيقك اللامركزي. يجب أن يبدو ملف التكوين الخاص بك هكذا:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

يتم تعيين كل إدخال في `participants` إلى عقدة في الشبكة، لذا فإن <span dir="ltr">3</span> إدخالات `participants` ستخبر Kurtosis بتشغيل <span dir="ltr">3</span> عقد في شبكتك. يتيح لك كل إدخال تحديد زوج طبقة التنفيذ وطبقة الإجماع المستخدم لتلك العقدة المحددة. تحتفظ أي معلمات لا تحددها بقيمها الافتراضية.

تقوم بنية `network_params` بتكوين إعدادات الشبكة التي تُستخدم لإنشاء ملفات التكوين (genesis) لكل عقدة بالإضافة إلى إعدادات أخرى مثل الثواني لكل خانة في الشبكة.

احفظ ملف المعلمات الخاص بك ثم استخدمه لتشغيل حزمة Kurtosis الخاصة بك عن طريق تشغيل:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

ملاحظة: يُستخدم الأمر `kurtosis clean -a` هنا لتوجيه Kurtosis لتدمير شبكة الاختبار القديمة ومحتوياتها قبل بدء تشغيل شبكة جديدة.

مرة أخرى، سيعمل Kurtosis لفترة من الوقت ويطبع الخطوات الفردية التي تحدث. في النهاية، يطبع ملخص البيئة المعزولة. هذه المرة، تتضمن خدمات المستخدم ثلاث عقد، على سبيل المثال `el-1-geth-lighthouse`، و`el-2-geth-lodestar`، و`el-3-geth-teku` لعملاء التنفيذ، إلى جانب عملاء الإجماع والمُدَقِّق المطابقين.

تهانينا! لقد نجحت في تكوين شبكة الاختبار المحلية الخاصة بك ليكون بها <span dir="ltr">3</span> عقد بدلاً من <span dir="ltr">1</span>. لتشغيل نفس سير العمل الذي قمت به من قبل على تطبيقك اللامركزي (النشر والاختبار)، قم بإجراء نفس العمليات التي قمنا بها من قبل عن طريق استبدال `<PORT>` في بنية `localnet` في ملف التكوين `hardhat.config.ts` الخاص بك بمنفذ `rpc` لأي خدمة `el-<num>-...` في شبكة الاختبار المحلية الجديدة المكونة من <span dir="ltr">3</span> عقد.

## الخاتمة {#conclusion}

وهذا كل شيء! لتلخيص هذا الدليل القصير، قمت بـ:

- إنشاء شبكة اختبار إيثيريوم محلية عبر Docker باستخدام Kurtosis
- ربط بيئة تطوير تطبيقك اللامركزي المحلية بشبكة إيثيريوم المحلية
- نشر تطبيق لامركزي وتشغيل اختبار بسيط عليه على شبكة إيثيريوم المحلية
- تكوين شبكة إيثيريوم الأساسية ليكون بها <span dir="ltr">3</span> عقد

نود أن نسمع منك عما سار بشكل جيد بالنسبة لك، وما يمكن تحسينه، أو للإجابة على أي من أسئلتك. لا تتردد في التواصل عبر [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### أمثلة وأدلة أخرى {#other-examples-guides}

نشجعك على التحقق من [البدء السريع](https://docs.kurtosis.com/quickstart) الخاص بنا وأمثلتنا الأخرى في [مستودع awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) الخاص بنا.

يمكن لـ `ethereum-package` أيضًا بدء خدمات إضافية إلى جانب شبكتك، مثل مرسل المعاملات العشوائية (لمحاكاة المعاملات)، ومستكشف الكتل، ومثيلات Grafana وPrometheus المتصلة. لتمكينها، قم بإدراجها ضمن `additional_services` في ملف المعلمات الخاص بك، كما هو موضح في [وثائق الحزمة](https://github.com/ethpandaops/ethereum-package#configuration).
