---
title: "رعاية رسوم الغاز: كيفية تغطية تكاليف المعاملات لمستخدميك"
description: "من السهل إنشاء مفتاح خاص وعنوان؛ كل ما في الأمر هو تشغيل البرنامج المناسب. لكن هناك العديد من الأماكن في العالم حيث يكون الحصول على ETH لإرسال المعاملات أصعب بكثير. في هذا البرنامج التعليمي، ستتعلم كيفية تغطية تكاليف الغاز على السلسلة لتنفيذ بيانات منظمة خارج السلسلة وموقعة من المستخدم في عقدك الذكي. تجعل المستخدم يوقع على بنية تحتوي على معلومات المعاملة، والتي يقوم كودك خارج السلسلة بتقديمه إلى البلوكتشين كمعاملة."
author: Ori Pomerantz
tags: [ "بدون-غاز", "الصلابة", "eip-712", "معاملات-وصفية" ]
skill: intermediate
lang: ar
published: 2026-02-27
---

## مقدمة {#مقدمة}

إذا أردنا أن تخدم Ethereum [مليار شخص إضافي](https://blog.ethereum.org/category/next-billion)، فنحن بحاجة إلى إزالة العوائق وجعلها سهلة الاستخدام قدر الإمكان. أحد مصادر هذه العوائق هو الحاجة إلى ETH لدفع رسوم الغاز.

إذا كان لديك تطبيق لامركزي يدر عليك المال من المستخدمين، فقد يكون من المنطقي السماح للمستخدمين بتقديم المعاملات من خلال الخادم الخاص بك ودفع رسوم المعاملات بنفسك. نظرًا لأن المستخدمين لا يزالون يوقعون على [رسالة تفويض EIP-712](https://eips.ethereum.org/EIPS/eip-712) في محافظهم، فإنهم يحتفظون بضمانات سلامة Ethereum. يعتمد التوفر على الخادم الذي ينقل المعاملات، لذلك فهو محدود أكثر. ومع ذلك، يمكنك إعداد الأمور بحيث يمكن للمستخدمين أيضًا الوصول إلى العقد الذكي مباشرة (إذا حصلوا على ETH)، والسماح للآخرين بإعداد خوادمهم الخاصة إذا كانوا يريدون رعاية المعاملات.

لا تعمل التقنية في هذا البرنامج التعليمي إلا عندما تتحكم في العقد الذكي. هناك تقنيات أخرى، بما في ذلك [تجريد الحساب](https://eips.ethereum.org/EIPS/eip-4337) الذي يتيح لك رعاية المعاملات إلى عقود ذكية أخرى، والتي آمل أن أغطيها في برنامج تعليمي مستقبلي.

ملاحظة: هذا _ليس_ كودًا على مستوى الإنتاج. إنه عرضة لهجمات كبيرة ويفتقر إلى ميزات رئيسية. تعرف على المزيد في [قسم الثغرات الأمنية في هذا الدليل](#vulnerabilities).

### المتطلبات الأساسية {#prerequisites}

لفهم هذا البرنامج التعليمي، يجب أن تكون على دراية بما يلي:

- لغة برمجة Solidity
- JavaScript
- React وWAGMI. إذا لم تكن على دراية بأدوات واجهة المستخدم هذه، [فلدينا برنامج تعليمي لذلك](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## التطبيق النموذجي {#sample-app}

التطبيق النموذجي هنا هو نسخة مختلفة من عقد `Greeter` الخاص بـ Hardhat. يمكنك رؤيته [على GitHub](https://github.com/qbzzt/260301-gasless). تم بالفعل نشر العقد الذكي على [Sepolia](https://sepolia.dev/)، على العنوان [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

لرؤيته أثناء العمل، اتبع هذه الخطوات.

1. استنسخ المستودع وقم بتثبيت البرامج اللازمة.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. حرر `.env` لتعيين `PRIVATE_KEY` إلى محفظة بها ETH على Sepolia. إذا كنت بحاجة إلى ETH من Sepolia، [فاستخدم صنبورًا](/developers/docs/networks/#sepolia). من الناحية المثالية، يجب أن يكون هذا المفتاح الخاص مختلفًا عن المفتاح الموجود في محفظة متصفحك.

3. ابدأ الخادم.

   ```sh
   npm run dev
   ```

4. تصفح التطبيق على عنوان URL [`http://localhost:5173`](http://localhost:5173).

5. انقر فوق **الاتصال بالمحفظة المُضافة** للاتصال بمحفظة. وافق في المحفظة، ووافق على التغيير إلى Sepolia إذا لزم الأمر.

6. اكتب تحية جديدة وانقر على **تحديث التحية عبر الراعي**.

7. وقّع على الرسالة.

8. انتظر حوالي 12 ثانية (وقت الكتلة على Sepolia). أثناء الانتظار، يمكنك إلقاء نظرة على عنوان URL في وحدة تحكم الخادم لرؤية المعاملة.

9. سترى أن التحية قد تغيرت، وأن قيمة العنوان الأخير الذي تم التحديث بواسطته هي الآن عنوان محفظة متصفحك.

لفهم كيفية عمل ذلك، نحتاج إلى إلقاء نظرة على كيفية إنشاء الرسالة في واجهة المستخدم، وكيفية ترحيلها بواسطة الخادم، وكيفية معالجتها بواسطة العقد الذكي.

### واجهة المستخدم {#ui-changes}

تعتمد واجهة المستخدم على [WAGMI](https://wagmi.sh/)؛ يمكنك القراءة عنها [في هذا البرنامج التعليمي](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

إليك كيفية توقيع الرسالة:

```js
const signGreeting = useCallback(
```

يتيح لنا خطاف React [`useCallback`](https://react.dev/reference/react/useCallback) تحسين الأداء عن طريق إعادة استخدام نفس الوظيفة عند إعادة رسم المكون.

```js
    async (greeting) => {
        if (!account) throw new Error("المحفظة غير متصلة")
```

إذا لم يكن هناك حساب، فقم برفع خطأ. لا ينبغي أن يحدث هذا أبدًا لأن زر واجهة المستخدم الذي يبدأ العملية التي تستدعي `signGreeting` يتم تعطيله في هذه الحالة. ومع ذلك، قد يقوم المبرمجون المستقبليون بإزالة هذا الإجراء الوقائي، لذا فمن الجيد التحقق من هذا الشرط هنا أيضًا.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

معلمات لـ [فاصل النطاق](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). هذه القيمة ثابتة، لذلك في تنفيذ مُحسَّن بشكل أفضل، قد نحسبها مرة واحدة بدلاً من إعادة حسابها في كل مرة يتم فيها استدعاء الدالة.

- `name` هو اسم يمكن للمستخدم قراءته، مثل اسم التطبيق اللامركزي الذي نُصدر له التوقيعات.
- `version` هو الإصدار. الإصدارات المختلفة غير متوافقة.
- `chainId` هو السلسلة التي نستخدمها، كما هو مقدم [بواسطة WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` هو عنوان العقد الذي سيتحقق من هذا التوقيع. لا نريد أن يتم تطبيق نفس التوقيع على عقود متعددة، في حال وجود العديد من عقود `Greeter` ونريد أن يكون لها تحيات مختلفة.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

نوع البيانات الذي نوقعه. هنا، لدينا معلمة واحدة، `greeting`، لكن الأنظمة الواقعية عادة ما تحتوي على المزيد.

```js
        const message = { greeting }
```

الرسالة الفعلية التي نريد توقيعها وإرسالها. `greeting` هو اسم الحقل واسم المتغير الذي يملؤه.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

احصل فعليًا على التوقيع. هذه الدالة غير متزامنة لأن المستخدمين يستغرقون وقتًا طويلاً (من منظور الكمبيوتر) لتوقيع البيانات.

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

ترجع الدالة قيمة سداسية عشرية واحدة. هنا نقسمها إلى حقول.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

إذا تغير أي من هذه المتغيرات، فأنشئ مثيلاً جديدًا للدالة. يمكن للمستخدم تغيير معلمتي `account` و `chainId` في المحفظة. `contractAddr` هي دالة لمعرف السلسلة. لا ينبغي أن تتغير `signTypedDataAsync`، لكننا نستوردها من [خطاف](https://wagmi.sh/react/api/hooks/useSignTypedData)، لذا لا يمكننا التأكد، ومن الأفضل إضافتها هنا.

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

استخدم `POST` لإرسال المعلومات بترميز JSON.

```js
      const data = await response.json()
      console.log("استجابة الخادم:", data)
    } catch (err) {
      console.error("خطأ:", err)
    }
  }
```

إخراج الاستجابة. في نظام الإنتاج، سنعرض أيضًا الاستجابة للمستخدم.

### الخادم {#server}

أحب استخدام [Vite](https://vite.dev/) كواجهتي الأمامية. يخدم تلقائيًا مكتبات React ويحدّث المتصفح عند تغيير كود الواجهة الأمامية. ومع ذلك، لا يتضمن Vite أدوات الواجهة الخلفية.

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

أولاً، نسجل معالجًا للطلبات التي نتعامل معها بأنفسنا (`POST` إلى `/server/sponsor`). ثم نقوم بإنشاء واستخدام خادم Vite للتعامل مع جميع عناوين URL الأخرى.

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

هذه مجرد مكالمة بلوكتشين قياسية لـ [viem](https://viem.sh/).

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

ينشئ المُنشئ [فاصل النطاق](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)، على غرار كود واجهة المستخدم أعلاه. تنفيذ البلوكتشين أكثر تكلفة بكثير، لذلك نحسبه مرة واحدة فقط.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

هذه هي البنية التي يتم توقيعها. هنا لدينا حقل واحد فقط.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

هذا هو [معرف البنية](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). يتم حسابه في كل مرة في واجهة المستخدم.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

تتلقى هذه الدالة طلبًا موقعًا وتحدّث التحية.

```solidity
        // حساب خلاصة EIP-712
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

أنشئ الخلاصة وفقًا لـ [EIP 712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // استعادة الموقّع
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "توقيع غير صالح");
```

استخدم [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) للحصول على عنوان الموقّع. لاحظ أن التوقيع السيئ لا يزال من الممكن أن ينتج عنه عنوان صالح، ولكنه عشوائي.

```solidity
        // تطبيق التحية كما لو أن الموقّع استدعاها
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

تحديث التحية.

## الثغرات الأمنية {#vulnerabilities}

هذا _ليس_ كودًا على مستوى الإنتاج. إنه عرضة لهجمات كبيرة ويفتقر إلى ميزات رئيسية. إليك بعضها، بالإضافة إلى كيفية حلها.

لرؤية بعض هذه الهجمات، انقر فوق الأزرار الموجودة أسفل عنوان _الهجمات_ وشاهد ما يحدث. بالنسبة لزر **توقيع غير صالح**، تحقق من وحدة تحكم الخادم لرؤية استجابة المعاملة.

### رفض الخدمة على الخادم {#dos-on-server}

أسهل هجوم هو هجوم [رفض الخدمة](https://en.wikipedia.org/wiki/Denial-of-service_attack) على الخادم. يتلقى الخادم طلبات من أي مكان على الإنترنت وبناءً على تلك الطلبات يرسل معاملات. لا يوجد شيء على الإطلاق يمنع المهاجم من إصدار مجموعة من التوقيعات، صالحة أو غير صالحة. سيؤدي كل منها إلى معاملة. في النهاية، سينفد ETH من الخادم لدفع ثمن الغاز.

أحد الحلول لهذه المشكلة هو تحديد المعدل بمعاملة واحدة لكل كتلة. إذا كان الغرض هو إظهار التحيات [للحسابات المملوكة خارجيًا](/developers/docs/accounts/#key-differences)، فلا يهم ما هي التحية في منتصف الكتلة على أي حال.

حل آخر هو تتبع العناوين والسماح فقط بالتوقيعات من العملاء الصالحين.

### توقيعات تحية خاطئة {#wrong-greeting-sigs}

عندما تنقر على **توقيع لتحية خاطئة**، فإنك ترسل توقيعًا صالحًا لعنوان محدد (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) وتحية (`Hello`). لكنه يرسلها مع تحية مختلفة. هذا يربك `ecrecover`، الذي يغير التحية ولكن لديه عنوان خاطئ.

لحل هذه المشكلة، أضف العنوان إلى [البنية الموقعة](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). بهذه الطريقة، لن يتطابق العنوان العشوائي لـ `ecrecover` مع العنوان الموجود في التوقيع، وسيرفض العقد الذكي الرسالة.

### هجمات إعادة الإرسال {#replay-attack}

عندما تنقر على **هجوم إعادة الإرسال**، فإنك ترسل نفس توقيع "أنا 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e، وأرغب في أن تكون التحية `Hello`"، ولكن مع التحية الصحيحة. نتيجة لذلك، يعتقد العقد الذكي أن العنوان (الذي ليس لك) قام بتغيير التحية مرة أخرى إلى `Hello`. المعلومات للقيام بذلك متاحة للجمهور في [معلومات المعاملة](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

إذا كانت هذه مشكلة، فإن أحد الحلول هو إضافة [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). احصل على [تعيين](https://docs.soliditylang.org/en/latest/types.html#mapping-types) بين العناوين والأرقام، وأضف حقل nonce إلى التوقيع. إذا تطابق حقل nonce مع التعيين للعنوان، فاقبل التوقيع وقم بزيادة التعيين للمرة القادمة. إذا لم يكن كذلك، فارفض المعاملة.

حل آخر هو إضافة ختم زمني إلى البيانات الموقعة وقبول التوقيع على أنه صالح فقط لبضع ثوان بعد ذلك الختم الزمني. هذا أبسط وأرخص، لكننا نخاطر بهجمات إعادة الإرسال خلال النافذة الزمنية، وفشل المعاملات المشروعة إذا تم تجاوز النافذة الزمنية.

## ميزات أخرى مفقودة {#other-missing-features}

هناك ميزات إضافية سنضيفها في إعداد الإنتاج.

### الوصول من خوادم أخرى {#other-servers}

حاليًا، نسمح لأي عنوان بتقديم `sponsorSetGreeting`. قد يكون هذا هو بالضبط ما نريده، من أجل اللامركزية. أو ربما نريد التأكد من أن المعاملات المدعومة تمر عبر خادمنا _الخاص_، وفي هذه الحالة سنتحقق من `msg.sender` في العقد الذكي.

في كلتا الحالتين، يجب أن يكون هذا قرار تصميم واعيًا، وليس مجرد نتيجة لعدم التفكير في المشكلة.

### معالجة الأخطاء {#error-handling}

يقدم المستخدم تحية. ربما يتم تحديثها في الكتلة التالية. وربما لا. الأخطاء غير مرئية. في نظام الإنتاج، يجب أن يكون المستخدم قادرًا على التمييز بين هذه الحالات:

- لم يتم تقديم التحية الجديدة بعد
- تم تقديم التحية الجديدة، وهي قيد المعالجة
- تم رفض التحية الجديدة

## الخلاصة {#conclusion}

في هذه المرحلة، يجب أن تكون قادرًا على إنشاء تجربة بدون غاز لمستخدمي تطبيقك اللامركزي، على حساب بعض المركزية.

ومع ذلك، هذا يعمل فقط مع العقود الذكية التي تدعم ERC-712. لنقل رمز ERC-20، على سبيل المثال، من الضروري أن يتم توقيع المعاملة من قبل المالك بدلاً من مجرد رسالة. الحل هو [تجريد الحساب (ERC-4337)](https://docs.erc4337.io/index.html). آمل أن أكتب برنامجًا تعليميًا مستقبليًا عنه.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).
