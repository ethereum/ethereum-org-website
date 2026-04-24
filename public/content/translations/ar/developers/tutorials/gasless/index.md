---
title: "رعاية رسوم الغاز: كيفية تغطية تكاليف المعاملات لمستخدميك"
description: من السهل إنشاء مفتاح خاص وعنوان؛ فالأمر مجرد مسألة تشغيل البرنامج المناسب. ولكن هناك العديد من الأماكن في العالم حيث يكون الحصول على الإيثر (ETH) لإرسال المعاملات أصعب بكثير. في هذا البرنامج التعليمي، ستتعلم كيفية تغطية تكاليف الغاز على السلسلة لتنفيذ البيانات المهيكلة خارج السلسلة والموقعة من المستخدم في عقدك الذكي. ستجعل المستخدم يوقع على هيكل يحتوي على معلومات المعاملة، والذي يقوم الكود الخاص بك خارج السلسلة بإرساله بعد ذلك إلى سلسلة الكتل كمعاملة.
author: أوري بوميرانتس
tags: ["بدون غاز", "solidity", "eip-712", "المعاملات الوصفية"]
skill: intermediate
breadcrumb: رعاية الغاز
lang: ar
published: 2026-02-27
---

## المقدمة {#introduction}

إذا أردنا أن تخدم إيثيريوم [مليار شخص إضافي](https://blog.ethereum.org/category/next-billion)، فنحن بحاجة إلى إزالة العقبات وجعلها سهلة الاستخدام قدر الإمكان. أحد مصادر هذه العقبات هو الحاجة إلى <span dir="ltr">ETH</span> لدفع رسوم الغاز.

إذا كان لديك تطبيق لامركزي (dapp) يدر أرباحًا من المستخدمين، فقد يكون من المنطقي السماح للمستخدمين بإرسال المعاملات من خلال خادمك ودفع رسوم المعاملة بنفسك. نظرًا لأن المستخدمين لا يزالون يوقعون على [رسالة تفويض <span dir="ltr">EIP-712</span>](https://eips.ethereum.org/EIPS/eip-712) في محافظهم، فإنهم يحتفظون بضمانات النزاهة الخاصة بإيثيريوم. يعتمد التوافر على الخادم الذي ينقل المعاملات، لذا فهو محدود أكثر. ومع ذلك، يمكنك إعداد الأمور بحيث يمكن للمستخدمين أيضًا الوصول إلى العقد الذكي مباشرة (إذا حصلوا على <span dir="ltr">ETH</span>)، والسماح للآخرين بإعداد خوادمهم الخاصة إذا أرادوا رعاية المعاملات.

التقنية الموضحة في هذا البرنامج التعليمي تعمل فقط عندما تتحكم في العقد الذكي. هناك تقنيات أخرى، بما في ذلك [تجريد الحساب](https://eips.ethereum.org/EIPS/eip-4337) التي تتيح لك رعاية المعاملات لعقود ذكية أخرى، والتي آمل أن أغطيها في برنامج تعليمي مستقبلي.

ملاحظة: هذا _ليس_ كودًا جاهزًا للإنتاج. إنه عرضة لهجمات كبيرة ويفتقر إلى ميزات رئيسية. تعرف على المزيد في [قسم نقاط الضعف في هذا الدليل](#vulnerabilities).

### المتطلبات الأساسية {#prerequisites}

لفهم هذا البرنامج التعليمي، يجب أن تكون على دراية مسبقة بما يلي:

- Solidity
- JavaScript
- React و WAGMI. إذا لم تكن على دراية بأدوات واجهة المستخدم هذه، [فلدينا برنامج تعليمي لذلك](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## التطبيق النموذجي {#sample-app}

التطبيق النموذجي هنا هو متغير من عقد `Greeter` الخاص بـ Hardhat. يمكنك رؤيته [على GitHub](https://github.com/qbzzt/260301-gasless). تم نشر العقد الذكي بالفعل على [Sepolia](https://sepolia.dev/)، على العنوان [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

لرؤيته قيد العمل، اتبع هذه الخطوات.

1. استنسخ المستودع وقم بتثبيت البرامج اللازمة.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. قم بتحرير `.env` لتعيين `PRIVATE_KEY` إلى محفظة تحتوي على <span dir="ltr">ETH</span> على Sepolia. إذا كنت بحاجة إلى <span dir="ltr">Sepolia ETH</span>، [استخدم صنبورًا](/developers/docs/networks/#sepolia). من الناحية المثالية، يجب أن يكون هذا المفتاح الخاص مختلفًا عن المفتاح الموجود في محفظة متصفحك.

3. ابدأ تشغيل الخادم.

   ```sh
   npm run dev
   ```

4. تصفح التطبيق على الرابط [`http://localhost:5173`](http://localhost:5173).

5. انقر على **Connect with Injected** للاتصال بمحفظة. قم بالموافقة في المحفظة، ووافق على التغيير إلى Sepolia إذا لزم الأمر.

6. اكتب تحية جديدة وانقر على **Update greeting via sponsor**.

7. وقع الرسالة.

8. انتظر حوالي 12 ثانية (وقت الكتلة على Sepolia). أثناء الانتظار، يمكنك إلقاء نظرة على الرابط في وحدة تحكم الخادم لرؤية المعاملة.

9. لاحظ أن التحية قد تغيرت، وأن قيمة العنوان الذي قام بآخر تحديث أصبحت الآن عنوان محفظة متصفحك.

لفهم كيفية عمل ذلك، نحتاج إلى إلقاء نظرة على كيفية إنشاء الرسالة في واجهة المستخدم، وكيف يتم نقلها بواسطة الخادم، وكيف يعالجها العقد الذكي.

### واجهة المستخدم {#ui-changes}

تعتمد واجهة المستخدم على [WAGMI](https://wagmi.sh/)؛ يمكنك القراءة عنها [في هذا البرنامج التعليمي](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

إليك كيفية توقيع الرسالة:

```js
const signGreeting = useCallback(
```

يتيح لنا خطاف React (React hook) [`useCallback`](https://react.dev/reference/react/useCallback) تحسين الأداء عن طريق إعادة استخدام نفس الدالة عند إعادة رسم المكون.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

إذا لم يكن هناك حساب، قم بإثارة خطأ. لا ينبغي أن يحدث هذا أبدًا لأن زر واجهة المستخدم الذي يبدأ العملية التي تستدعي `signGreeting` يكون معطلاً في هذه الحالة. ومع ذلك، قد يقوم المبرمجون المستقبليون بإزالة هذا الإجراء الوقائي، لذا من الجيد التحقق من هذا الشرط هنا أيضًا.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

معلمات [فاصل النطاق (domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). هذه القيمة ثابتة، لذا في تنفيذ محسّن بشكل أفضل، قد نحسبها مرة واحدة بدلاً من إعادة حسابها في كل مرة يتم فيها استدعاء الدالة.

- `name` هو اسم يمكن للمستخدم قراءته، مثل اسم التطبيق اللامركزي (dapp) الذي ننتج التوقيعات من أجله.
- `version` هو الإصدار. الإصدارات المختلفة غير متوافقة.
- `chainId` هي السلسلة التي نستخدمها، كما توفرها [WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` هو عنوان العقد الذي سيتحقق من هذا التوقيع. لا نريد أن ينطبق نفس التوقيع على عقود متعددة، في حال كان هناك عدة عقود `Greeter` ونريد أن يكون لها تحيات مختلفة.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

نوع البيانات الذي نوقعه. هنا، لدينا معلمة واحدة، `greeting`، ولكن الأنظمة في الحياة الواقعية عادة ما تحتوي على المزيد.

```js
        const message = { greeting }
```

الرسالة الفعلية التي نريد توقيعها وإرسالها. `greeting` هو اسم الحقل واسم المتغير الذي يملأه في نفس الوقت.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

الحصول على التوقيع فعليًا. هذه الدالة غير متزامنة (asynchronous) لأن المستخدمين يستغرقون وقتًا طويلاً (من منظور الكمبيوتر) لتوقيع البيانات.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

تُرجع الدالة قيمة سداسية عشرية واحدة. هنا نقسمها إلى حقول.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

إذا تغير أي من هذه المتغيرات، قم بإنشاء مثيل جديد للدالة. يمكن للمستخدم تغيير المعلمتين `account` و `chainId` في المحفظة. `contractAddr` هي دالة لمعرف السلسلة (chain Id). لا ينبغي أن يتغير `signTypedDataAsync`، لكننا نستورده من [خطاف (hook)](https://wagmi.sh/react/api/hooks/useSignTypedData)، لذلك لا يمكننا التأكد، ومن الأفضل إضافته هنا.

الآن بعد أن تم توقيع التحية الجديدة، نحتاج إلى إرسالها إلى الخادم.

```js
  const sponsoredGreeting = async () => {
    try {
```

تأخذ هذه الدالة توقيعًا وترسله إلى الخادم.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

أرسل إلى المسار `/server/sponsor` في الخادم الذي أتينا منه.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

استخدم `POST` لإرسال المعلومات مشفرة بتنسيق JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

إخراج الاستجابة. في نظام الإنتاج، سنعرض الاستجابة للمستخدم أيضًا.

### الخادم {#server}

أحب استخدام [Vite](https://vite.dev/) كواجهة أمامية. فهو يخدم مكتبات React تلقائيًا ويحدث المتصفح عندما يتغير كود الواجهة الأمامية. ومع ذلك، لا يتضمن Vite أدوات الواجهة الخلفية.

الحل موجود في [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // دع Vite يتعامل مع كل شيء آخر
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

أولاً، نقوم بتسجيل معالج للطلبات التي نتعامل معها بأنفسنا (`POST` إلى `/server/sponsor`). ثم نقوم بإنشاء واستخدام خادم Vite للتعامل مع جميع الروابط الأخرى.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

هذا مجرد استدعاء قياسي لسلسلة الكتل باستخدام [viem](https://viem.sh/).

### العقد الذكي {#smart-contract}

أخيرًا، يحتاج [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) إلى التحقق من التوقيع.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

يقوم المُنشئ بإنشاء [فاصل النطاق](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)، على غرار كود واجهة المستخدم أعلاه. التنفيذ على سلسلة الكتل أكثر تكلفة بكثير، لذا نحسبه مرة واحدة فقط.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

هذا هو الهيكل الذي يتم توقيعه. هنا لدينا حقل واحد فقط.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

هذا هو [معرف الهيكل](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). يتم حسابه في كل مرة في واجهة المستخدم.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

تتلقى هذه الدالة طلبًا موقعًا وتقوم بتحديث التحية.

```solidity
        // حساب ملخص EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

قم بإنشاء الملخص (digest) وفقًا لـ [<span dir="ltr">EIP 712</span>](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // استرداد المُوقّع
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

استخدم [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) للحصول على عنوان المُوقّع. لاحظ أن التوقيع السيئ يمكن أن يؤدي إلى عنوان صالح، ولكنه سيكون عنوانًا عشوائيًا.

```solidity
        // تطبيق التحية كما لو أن المُوقّع استدعاها
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

تحديث التحية.

## نقاط الضعف {#vulnerabilities}

هذا _ليس_ كودًا جاهزًا للإنتاج. إنه عرضة لهجمات كبيرة ويفتقر إلى ميزات رئيسية. إليك بعضها، إلى جانب كيفية حلها.

لرؤية بعض هذه الهجمات، انقر على الأزرار الموجودة أسفل عنوان _الهجمات (Attacks)_ وشاهد ما يحدث. بالنسبة لزر **توقيع غير صالح (Invalid signature)**، تحقق من وحدة تحكم الخادم لرؤية استجابة المعاملة.

### حجب الخدمة على الخادم {#dos-on-server}

أسهل هجوم هو هجوم [حجب الخدمة (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) على الخادم. يتلقى الخادم طلبات من أي مكان على الإنترنت وبناءً على تلك الطلبات يرسل المعاملات. لا يوجد أي شيء يمنع المهاجم من إصدار مجموعة من التوقيعات، سواء كانت صالحة أو غير صالحة. كل منها سيتسبب في معاملة. في النهاية، سينفد <span dir="ltr">ETH</span> من الخادم لدفع ثمن الغاز.

أحد الحلول لهذه المشكلة هو الحد من المعدل إلى معاملة واحدة لكل كتلة. إذا كان الغرض هو إظهار التحيات إلى [الحسابات المملوكة خارجيًا](/developers/docs/accounts/#key-differences)، فلا يهم ما هي التحية في منتصف الكتلة على أي حال.

حل آخر هو تتبع العناوين والسماح فقط بالتوقيعات من العملاء الصالحين.

### توقيعات التحية الخاطئة {#wrong-greeting-sigs}

عندما تنقر على **توقيع لتحية خاطئة (Signature for wrong greeting)**، فإنك ترسل توقيعًا صالحًا لعنوان معين (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) وتحية (`Hello`). لكنه يرسله مع تحية مختلفة. هذا يربك `ecrecover`، والذي يغير التحية ولكن بعنوان خاطئ.

لحل هذه المشكلة، أضف العنوان إلى [الهيكل الموقع](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). بهذه الطريقة، لن يتطابق العنوان العشوائي لـ `ecrecover` مع العنوان الموجود في التوقيع، وسيرفض العقد الذكي الرسالة.

### هجمات إعادة الإرسال {#replay-attack}

عندما تنقر على **هجوم إعادة الإرسال (Replay attack)**، فإنك ترسل نفس التوقيع "أنا <span dir="ltr">0xaA92c5d426430D4769c9E878C1333BDe3d689b3e</span>، وأود أن تكون التحية `Hello`"، ولكن مع التحية الصحيحة. نتيجة لذلك، يعتقد العقد الذكي أن العنوان (الذي ليس لك) قد أعاد تغيير التحية إلى `Hello`. المعلومات اللازمة للقيام بذلك متاحة للجمهور في [معلومات المعاملة](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

إذا كانت هذه مشكلة، فإن أحد الحلول هو إضافة [رقم فريد](https://en.wikipedia.org/wiki/Cryptographic_nonce). قم بإنشاء [تخطيط (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) بين العناوين والأرقام، وأضف حقل رقم فريد إلى التوقيع. إذا كان حقل الرقم الفريد يتطابق مع التخطيط للعنوان، فاقبل التوقيع وقم بزيادة التخطيط للمرة القادمة. إذا لم يتطابق، ارفض المعاملة.

حل آخر هو إضافة طابع زمني إلى البيانات الموقعة وقبول التوقيع كصالح فقط لبضع ثوانٍ بعد ذلك الطابع الزمني. هذا أبسط وأرخص، لكننا نخاطر بهجمات إعادة الإرسال ضمن النافذة الزمنية، وفشل المعاملات المشروعة إذا تم تجاوز النافذة الزمنية.

## ميزات أخرى مفقودة {#other-missing-features}

هناك ميزات إضافية سنضيفها في بيئة الإنتاج.

### الوصول من خوادم أخرى {#other-servers}

حاليًا، نسمح لأي عنوان بإرسال `sponsorSetGreeting`. قد يكون هذا بالضبط ما نريده، من أجل اللامركزية. أو ربما نريد التأكد من أن المعاملات المدعومة تمر عبر خادمنا _نحن_، وفي هذه الحالة سنتحقق من `msg.sender` في العقد الذكي.

في كلتا الحالتين، يجب أن يكون هذا قرار تصميم واعيًا، وليس مجرد نتيجة لعدم التفكير في المشكلة.

### معالجة الأخطاء {#error-handling}

يرسل المستخدم تحية. ربما يتم تحديثها في الكتلة التالية. ربما لا. الأخطاء غير مرئية. في نظام الإنتاج، يجب أن يكون المستخدم قادرًا على التمييز بين هذه الحالات:

- لم يتم إرسال التحية الجديدة بعد
- تم إرسال التحية الجديدة، وهي قيد المعالجة
- تم رفض التحية الجديدة

## الخاتمة {#conclusion}

في هذه المرحلة، يجب أن تكون قادرًا على إنشاء تجربة بدون غاز لمستخدمي تطبيقك اللامركزي (dapp)، على حساب بعض المركزية.

ومع ذلك، يعمل هذا فقط مع العقود الذكية التي تدعم <span dir="ltr">ERC-712</span>. لتحويل رمز مميز <span dir="ltr">ERC-20</span>، على سبيل المثال، من الضروري أن يتم توقيع المعاملة من قبل المالك بدلاً من مجرد رسالة. الحل هو [تجريد الحساب (<span dir="ltr">ERC-4337</span>)](https://docs.erc4337.io/index.html). آمل أن أكتب برنامجًا تعليميًا مستقبليًا حول هذا الموضوع.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).