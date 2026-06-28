---
title: "كتابة بلازما خاصة بتطبيق تحافظ على الخصوصية"
description: "في هذا البرنامج التعليمي، سنقوم ببناء بنك شبه سري للودائع. البنك هو مكون مركزي؛ فهو يعرف رصيد كل مستخدم. ومع ذلك، لا يتم تخزين هذه المعلومات على السلسلة. بدلاً من ذلك، ينشر البنك تجزئة للحالة. في كل مرة تحدث فيها معاملة، ينشر البنك التجزئة الجديدة، إلى جانب إثبات المعرفة الصفرية بأنه يمتلك معاملة موقعة تغير حالة التجزئة إلى الحالة الجديدة. بعد قراءة هذا البرنامج التعليمي، لن تفهم فقط كيفية استخدام إثباتات المعرفة الصفرية، بل ستفهم أيضًا سبب استخدامك لها وكيفية القيام بذلك بشكل آمن."
author: "أوري بوميرانتس"
tags:
  - المعرفة الصفرية
  - خادم
  - خارج السلسلة
  - الخصوصية
skill: advanced
breadcrumb: "بلازما خاصة بتطبيق"
lang: ar
published: 2025-10-15
---
## المقدمة {#introduction}

على النقيض من [التجميعات](/developers/docs/scaling/zk-rollups/)، تستخدم [البلازما](/developers/docs/scaling/plasma) شبكة إيثيريوم الرئيسية لضمان النزاهة، ولكن ليس التوافر. في هذه المقالة، نكتب تطبيقًا يتصرف مثل البلازما، حيث تضمن إيثيريوم النزاهة (عدم وجود تغييرات غير مصرح بها) ولكن ليس التوافر (يمكن أن يتعطل مكون مركزي ويعطل النظام بأكمله).

التطبيق الذي نكتبه هنا هو بنك يحافظ على الخصوصية. تمتلك العناوين المختلفة حسابات بأرصدة، ويمكنها إرسال الأموال (<span dir="ltr">ETH</span>) إلى حسابات أخرى. ينشر البنك تجزئات للحالة (الحسابات وأرصدتها) والمعاملات، لكنه يحتفظ بالأرصدة الفعلية خارج السلسلة حيث يمكن أن تظل خاصة.

## التصميم {#design}

هذا ليس نظامًا جاهزًا للإنتاج، بل أداة تعليمية. ولذلك، تمت كتابته مع عدة افتراضات تبسيطية.

- مجموعة حسابات ثابتة. يوجد عدد محدد من الحسابات، وكل حساب ينتمي إلى عنوان محدد مسبقًا. هذا يجعل النظام أبسط بكثير لأنه من الصعب التعامل مع هياكل بيانات متغيرة الحجم في إثباتات المعرفة الصفرية. بالنسبة لنظام جاهز للإنتاج، يمكننا استخدام [جذر ميركل](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) كتجزئة للحالة وتقديم إثباتات ميركل للأرصدة المطلوبة.

- التخزين في الذاكرة. في نظام الإنتاج، نحتاج إلى كتابة جميع أرصدة الحسابات على القرص للحفاظ عليها في حالة إعادة التشغيل. هنا، لا بأس إذا فُقدت المعلومات ببساطة.

- التحويلات فقط. سيتطلب نظام الإنتاج طريقة لإيداع الأصول في البنك وسحبها. لكن الغرض هنا هو مجرد توضيح المفهوم، لذا يقتصر هذا البنك على التحويلات.

### إثباتات المعرفة الصفرية {#zero-knowledge-proofs}

على المستوى الأساسي، يُظهر إثبات المعرفة الصفرية أن المُثبِت يعرف بعض البيانات، <span dir="ltr">_Data<sub>private</sub>_</span> بحيث توجد علاقة <span dir="ltr">_Relationship_</span> بين بعض البيانات العامة، <span dir="ltr">_Data<sub>public</sub>_</span>، و<span dir="ltr">_Data<sub>private</sub>_</span>. يعرف المتحقق <span dir="ltr">_Relationship_</span> و<span dir="ltr">_Data<sub>public</sub>_</span>.

للحفاظ على الخصوصية، نحتاج إلى أن تكون الحالات والمعاملات خاصة. ولكن لضمان النزاهة، نحتاج إلى أن تكون [التجزئة التشفيرية](https://en.wikipedia.org/wiki/Cryptographic_hash_function) للحالات عامة. ولإثبات للأشخاص الذين يرسلون المعاملات أن تلك المعاملات قد حدثت بالفعل، نحتاج أيضًا إلى نشر تجزئات المعاملات.

في معظم الحالات، تكون <span dir="ltr">_Data<sub>private</sub>_</span> هي المدخلات لبرنامج إثبات المعرفة الصفرية، وتكون <span dir="ltr">_Data<sub>public</sub>_</span> هي المخرجات.

هذه الحقول في <span dir="ltr">_Data<sub>private</sub>_</span>:

- <span dir="ltr">_State<sub>n</sub>_</span>، الحالة القديمة
- <span dir="ltr">_State<sub>n+1</sub>_</span>، الحالة الجديدة
- <span dir="ltr">_Transaction_</span>، معاملة تُغيّر من الحالة القديمة إلى الحالة الجديدة. تحتاج هذه المعاملة إلى تضمين هذه الحقول:
  - _عنوان الوجهة_ الذي يتلقى التحويل
  - _المبلغ_ الذي يتم تحويله
  - _رقم فريد_ لضمان إمكانية معالجة كل معاملة مرة واحدة فقط.
    لا يحتاج عنوان المصدر إلى أن يكون في المعاملة، لأنه يمكن استعادته من التوقيع.
- _التوقيع_، توقيع مُصرح له بتنفيذ المعاملة. في حالتنا، العنوان الوحيد المُصرح له بتنفيذ معاملة هو عنوان المصدر. نظرًا لأن نظام المعرفة الصفرية الخاص بنا يعمل بهذه الطريقة، فإننا نحتاج أيضًا إلى المفتاح العام للحساب، بالإضافة إلى توقيع إيثيريوم.

هذه هي الحقول في <span dir="ltr">_Data<sub>public</sub>_</span>:

- <span dir="ltr">_Hash(State<sub>n</sub>)_</span> تجزئة الحالة القديمة
- <span dir="ltr">_Hash(State<sub>n+1</sub>)_</span> تجزئة الحالة الجديدة
- <span dir="ltr">_Hash(Transaction)_</span> تجزئة المعاملة التي تُغيّر الحالة من <span dir="ltr">_State<sub>n</sub>_</span> إلى <span dir="ltr">_State<sub>n+1</sub>_</span>.

تتحقق العلاقة من عدة شروط:

- التجزئات العامة هي بالفعل التجزئات الصحيحة للحقول الخاصة.
- المعاملة، عند تطبيقها على الحالة القديمة، تؤدي إلى الحالة الجديدة.
- التوقيع يأتي من عنوان مصدر المعاملة.

بسبب خصائص دوال التجزئة التشفيرية، فإن إثبات هذه الشروط يكفي لضمان النزاهة.

### هياكل البيانات {#data-structures}

هيكل البيانات الأساسي هو الحالة التي يحتفظ بها الخادم. لكل حساب، يتتبع الخادم رصيد الحساب و[رقمًا فريدًا](https://en.wikipedia.org/wiki/Cryptographic_nonce)، يُستخدم لمنع [هجمات إعادة الإرسال](https://en.wikipedia.org/wiki/Replay_attack).

### المكونات {#components}

يتطلب هذا النظام مكونين:

- _الخادم_ الذي يتلقى المعاملات، ويعالجها، وينشر التجزئات على السلسلة جنبًا إلى جنب مع إثباتات المعرفة الصفرية.
- _عقد ذكي_ يخزن التجزئات ويتحقق من إثباتات المعرفة الصفرية لضمان شرعية انتقالات الحالة.

### تدفق البيانات والتحكم {#flows}

هذه هي الطرق التي تتواصل بها المكونات المختلفة للتحويل من حساب إلى آخر.

1. يرسل متصفح الويب معاملة موقعة تطلب تحويلاً من حساب المُوقّع إلى حساب مختلف.

2. يتحقق الخادم من صحة المعاملة:

   - لدى المُوقّع حساب في البنك برصيد كافٍ.
   - لدى المستلم حساب في البنك.

3. يحسب الخادم الحالة الجديدة عن طريق طرح المبلغ المُحوّل من رصيد المُوقّع وإضافته إلى رصيد المستلم.

4. يحسب الخادم إثبات المعرفة الصفرية بأن تغيير الحالة صحيح.

5. يرسل الخادم إلى إيثيريوم معاملة تتضمن:

   - تجزئة الحالة الجديدة
   - تجزئة المعاملة (حتى يتمكن مرسل المعاملة من معرفة أنه تمت معالجتها)
   - إثبات المعرفة الصفرية الذي يثبت أن الانتقال إلى الحالة الجديدة صحيح

6. يتحقق العقد الذكي من إثبات المعرفة الصفرية.

7. إذا كان إثبات المعرفة الصفرية صحيحًا، ينفذ العقد الذكي هذه الإجراءات:
   - تحديث تجزئة الحالة الحالية إلى تجزئة الحالة الجديدة
   - إصدار إدخال سجل مع تجزئة الحالة الجديدة وتجزئة المعاملة

### الأدوات {#tools}

بالنسبة لرمز جانب العميل، سنستخدم [Vite](https://vite.dev/)، و[React](https://react.dev/)، و[Viem](https://viem.sh/)، و[Wagmi](https://wagmi.sh/). هذه أدوات قياسية في الصناعة؛ إذا لم تكن على دراية بها، يمكنك استخدام [هذا البرنامج التعليمي](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

تتم كتابة غالبية الخادم بلغة JavaScript باستخدام [Node](https://nodejs.org/en). الجزء الخاص بالمعرفة الصفرية مكتوب بلغة [Noir](https://noir-lang.org/). نحن بحاجة إلى الإصدار `1.0.0-beta.10`، لذلك بعد [تثبيت Noir كما هو موضح](https://noir-lang.org/docs/getting_started/quick_start)، قم بتشغيل:

```
noirup -v 1.0.0-beta.10
```

سلسلة الكتل التي نستخدمها هي `anvil`، وهي سلسلة كتل اختبار محلية تعد جزءًا من [Foundry](https://getfoundry.sh/introduction/installation).

## التنفيذ {#implementation}

نظرًا لأن هذا نظام معقد، سنقوم بتنفيذه على مراحل.

### المرحلة 1 - المعرفة الصفرية اليدوية {#stage-1}

في المرحلة الأولى، سنقوم بتوقيع معاملة في المتصفح ثم تقديم المعلومات يدويًا إلى إثبات المعرفة الصفرية. يتوقع كود المعرفة الصفرية الحصول على هذه المعلومات في `server/noir/Prover.toml` (موثق [هنا](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

لرؤية ذلك عمليًا:

1. تأكد من تثبيت [Node](https://nodejs.org/en/download) و[Noir](https://noir-lang.org/install). يُفضل تثبيتهما على نظام UNIX مثل macOS أو Linux أو [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. قم بتنزيل كود المرحلة 1 وابدأ خادم الويب لتقديم كود العميل.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   السبب في أنك بحاجة إلى خادم ويب هنا هو أنه لمنع أنواع معينة من الاحتيال، فإن العديد من المحافظ (مثل ميتاماسك) لا تقبل الملفات المقدمة مباشرة من القرص

3. افتح متصفحًا يحتوي على محفظة.

4. في المحفظة، أدخل عبارة مرور جديدة. لاحظ أن هذا سيؤدي إلى حذف عبارة المرور الحالية الخاصة بك، لذا _تأكد من وجود نسخة احتياطية لديك_.

   عبارة المرور هي `test test test test test test test test test test test junk`، وهي عبارة المرور الافتراضية للاختبار في anvil.

5. تصفح إلى [كود جانب العميل](http://localhost:5173/).

6. اتصل بالمحفظة وحدد حساب الوجهة والمبلغ.

7. انقر على **توقيع** (Sign) وقم بتوقيع المعاملة.

8. تحت عنوان **Prover.toml**، ستجد نصًا. استبدل `server/noir/Prover.toml` بهذا النص.

9. قم بتنفيذ إثبات المعرفة الصفرية.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   يجب أن يكون الناتج مشابهًا لـ

      ```
ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
      ```

10. قارن آخر قيمتين مع التجزئة التي تراها على متصفح الويب لمعرفة ما إذا كانت الرسالة قد تم تجزئتها بشكل صحيح.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

يوضح [هذا الملف](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) تنسيق المعلومات الذي يتوقعه Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

الرسالة بتنسيق نصي، مما يسهل على المستخدم فهمها (وهو أمر ضروري عند التوقيع) وعلى كود Noir تحليلها. يتم تحديد المبلغ بوحدة فيني لتمكين التحويلات الجزئية من ناحية، ولتكون سهلة القراءة من ناحية أخرى. الرقم الأخير هو [الرقم الفريد](https://en.wikipedia.org/wiki/Cryptographic_nonce).

يبلغ طول السلسلة <span dir="ltr">100</span> حرف. لا تتعامل إثباتات المعرفة الصفرية مع البيانات ذات الحجم المتغير بشكل جيد، لذلك غالبًا ما يكون من الضروري حشو البيانات.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

هذه المعلمات الثلاث عبارة عن مصفوفات بايتات ثابتة الحجم.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

هذه هي الطريقة لتحديد مصفوفة من الهياكل. لكل إدخال، نحدد العنوان، والرصيد (بوحدة <span dir="ltr">milliETH</span> والمعروفة أيضًا باسم [فيني](https://cryptovalleyjournal.com/glossary/finney/))، وقيمة الرقم الفريد التالية.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

ينفذ [هذا الملف](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) المعالجة من جانب العميل ويُنشئ ملف `server/noir/Prover.toml` (الملف الذي يتضمن معلمات المعرفة الصفرية).

إليك شرح للأجزاء الأكثر أهمية.

```tsx
export default attrs =>  {
```

تُنشئ هذه الدالة مكون React `Transfer`، والذي يمكن للملفات الأخرى استيراده.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

هذه هي عناوين الحسابات، وهي العناوين التي تم إنشاؤها بواسطة عبارة المرور `test ... test junk`. إذا كنت ترغب في استخدام عناوينك الخاصة، فما عليك سوى تعديل هذا التعريف.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

تتيح لنا [خطافات Wagmi](https://wagmi.sh/react/api/hooks) هذه الوصول إلى مكتبة [Viem](https://viem.sh/) والمحفظة.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

هذه هي الرسالة، محشوة بمسافات. في كل مرة يتغير فيها أحد متغيرات [`useState`](https://react.dev/reference/react/useState)، يتم إعادة رسم المكون وتحديث `message`.

```tsx
  const sign = async () => {
```

يتم استدعاء هذه الدالة عندما ينقر المستخدم على زر **توقيع** (Sign). يتم تحديث الرسالة تلقائيًا، ولكن التوقيع يتطلب موافقة المستخدم في المحفظة، ولا نريد طلب ذلك إلا عند الحاجة.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

اطلب من المحفظة [توقيع الرسالة](https://viem.sh/docs/accounts/local/signMessage). 

```tsx
    const hash = hashMessage(message)
```

احصل على تجزئة الرسالة. من المفيد تقديمها للمستخدم لأغراض تصحيح الأخطاء (لكود Noir). 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[احصل على المفتاح العام](https://viem.sh/docs/utilities/recoverPublicKey). هذا مطلوب لدالة [`ecrecover` في Noir](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

قم بتعيين متغيرات الحالة. يؤدي القيام بذلك إلى إعادة رسم المكون (بعد خروج دالة `sign`) ويعرض للمستخدم القيم المحدثة.

```tsx
    let proverToml = `
```

النص الخاص بـ `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

توفر لنا Viem المفتاح العام كسلسلة سداسية عشرية بحجم <span dir="ltr">65</span> بايت. البايت الأول هو `0x04`، وهو علامة إصدار. يتبع ذلك <span dir="ltr">32</span> بايت لـ `x` من المفتاح العام ثم <span dir="ltr">32</span> بايت لـ `y` من المفتاح العام.

ومع ذلك، يتوقع Noir الحصول على هذه المعلومات كمصفوفتي بايتات، واحدة لـ `x` والأخرى لـ `y`. من الأسهل تحليلها هنا على العميل بدلاً من أن تكون جزءًا من إثبات المعرفة الصفرية.

لاحظ أن هذه ممارسة جيدة في المعرفة الصفرية بشكل عام. الكود داخل إثبات المعرفة الصفرية مكلف، لذا فإن أي معالجة يمكن إجراؤها خارج إثبات المعرفة الصفرية _يجب_ إجراؤها خارج إثبات المعرفة الصفرية.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

يتم توفير التوقيع أيضًا كسلسلة سداسية عشرية بحجم <span dir="ltr">65</span> بايت. ومع ذلك، فإن البايت الأخير ضروري فقط لاستعادة المفتاح العام. نظرًا لأنه سيتم توفير المفتاح العام بالفعل لكود Noir، فإننا لا نحتاجه للتحقق من التوقيع، ولا يتطلبه كود Noir.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

قم بتوفير الحسابات.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

هذا هو تنسيق HTML (وبشكل أكثر دقة، [JSX](https://react.dev/learn/writing-markup-with-jsx)) للمكون.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[هذا الملف](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) هو كود المعرفة الصفرية الفعلي.

```
use std::hash::pedersen_hash;
```

يتم توفير [تجزئة Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) مع [مكتبة Noir القياسية](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). تستخدم إثباتات المعرفة الصفرية دالة التجزئة هذه بشكل شائع. من الأسهل بكثير حسابها داخل [الدوائر الحسابية](https://rareskills.io/post/arithmetic-circuit) مقارنة بدوال التجزئة القياسية.

```
use keccak256::keccak256;
use dep::ecrecover;
```

هاتان الدالتان عبارة عن مكتبات خارجية، محددة في [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). وهما بالضبط كما يوحي اسماهما، دالة تحسب [تجزئة keccak256](https://emn178.github.io/online-tools/keccak_256.html) ودالة تتحقق من توقيعات إيثيريوم وتستعيد عنوان إيثيريوم الخاص بالمُوقِّع.

```
global ACCOUNT_NUMBER : u32 = 5;
```

لغة Noir مستوحاة من [Rust](https://www.rust-lang.org/). المتغيرات، بشكل افتراضي، هي ثوابت. هذه هي الطريقة التي نحدد بها ثوابت التكوين العامة. على وجه التحديد، `ACCOUNT_NUMBER` هو عدد الحسابات التي نقوم بتخزينها.

أنواع البيانات المسماة `u<number>` تمثل هذا العدد من البتات، بدون إشارة. الأنواع المدعومة الوحيدة هي `u8` و`u16` و`u32` و`u64` و`u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

يُستخدم هذا المتغير لتجزئة Pedersen للحسابات، كما هو موضح أدناه.

```
global MESSAGE_LENGTH : u32 = 100;
```

كما هو موضح أعلاه، طول الرسالة ثابت. يتم تحديده هنا.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

تتطلب [توقيعات <span dir="ltr">EIP-191</span>](https://eips.ethereum.org/EIPS/eip-191) مخزنًا مؤقتًا ببادئة بحجم <span dir="ltr">26</span> بايت، متبوعًا بطول الرسالة بتنسيق ASCII، وأخيرًا الرسالة نفسها.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

المعلومات التي نقوم بتخزينها حول حساب. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) هو رقم، يصل عادةً إلى <span dir="ltr">253</span> بت، يمكن استخدامه مباشرة في [الدائرة الحسابية](https://rareskills.io/post/arithmetic-circuit) التي تنفذ إثبات المعرفة الصفرية. هنا نستخدم `Field` لتخزين عنوان إيثيريوم بحجم <span dir="ltr">160</span> بت.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

المعلومات التي نقوم بتخزينها لمعاملة تحويل.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

تعريف دالة. المعلمة هي معلومات `Account`. النتيجة هي مصفوفة من متغيرات `Field`، والتي يبلغ طولها `FLAT_ACCOUNT_FIELDS`

```
let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

القيمة الأولى في المصفوفة هي عنوان الحساب. تتضمن القيمة الثانية كلاً من الرصيد والرقم الفريد. تقوم استدعاءات `.into()` بتغيير رقم إلى نوع البيانات الذي يحتاج أن يكون عليه. `account.nonce` هي قيمة `u32`، ولكن لإضافتها إلى `account.balance << 32`، وهي قيمة `u128`، يجب أن تكون `u128`. هذا هو الاستدعاء الأول لـ `.into()`. يقوم الاستدعاء الثاني بتحويل نتيجة `u128` إلى `Field` بحيث تتناسب مع المصفوفة.

```
flat
}
```

في Noir، لا يمكن للدوال إرجاع قيمة إلا في النهاية (لا يوجد إرجاع مبكر). لتحديد القيمة المرجعة، تقوم بتقييمها قبل قوس الإغلاق الخاص بالدالة مباشرة.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

تحول هذه الدالة مصفوفة الحسابات إلى مصفوفة `Field`، والتي يمكن استخدامها كمدخل لتجزئة Petersen.

```
let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

هذه هي الطريقة التي تحدد بها متغيرًا قابلاً للتغيير، أي _ليس_ ثابتًا. يجب أن تحتوي المتغيرات في Noir دائمًا على قيمة، لذلك نقوم بتهيئة هذا المتغير بجميع الأصفار.

```
for i in 0..ACCOUNT_NUMBER {
```

هذه حلقة `for`. لاحظ أن الحدود عبارة عن ثوابت. يجب أن تكون حدود حلقات Noir معروفة في وقت الترجمة. السبب هو أن الدوائر الحسابية لا تدعم التحكم في التدفق. عند معالجة حلقة `for`، يقوم المترجم ببساطة بوضع الكود بداخلها عدة مرات، مرة واحدة لكل تكرار.

```
let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

أخيرًا، وصلنا إلى الدالة التي تقوم بتجزئة مصفوفة الحسابات.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

تجد هذه الدالة الحساب بعنوان محدد. ستكون هذه الدالة غير فعالة بشكل رهيب في الكود القياسي لأنها تتكرر عبر جميع الحسابات، حتى بعد العثور على العنوان.

ومع ذلك، في إثباتات المعرفة الصفرية، لا يوجد تحكم في التدفق. إذا احتجنا في أي وقت إلى التحقق من شرط ما، فعلينا التحقق منه في كل مرة.

يحدث شيء مشابه مع عبارات `if`. تُترجم عبارة `if` في الحلقة أعلاه إلى هذه العبارات الرياضية.

_condition<sub>result</sub> = accounts[i].address == address_ // واحد إذا كانا متساويين، وصفر بخلاف ذلك

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

تتسبب دالة [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) في تعطل إثبات المعرفة الصفرية إذا كان التأكيد خاطئًا. في هذه الحالة، إذا لم نتمكن من العثور على حساب بالعنوان ذي الصلة. للإبلاغ عن العنوان، نستخدم [سلسلة تنسيق](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

تطبق هذه الدالة معاملة تحويل وتُرجع مصفوفة الحسابات الجديدة.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

لا يمكننا الوصول إلى عناصر الهيكل داخل سلسلة تنسيق في Noir، لذلك نقوم بإنشاء نسخة قابلة للاستخدام.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

هذان شرطان يمكن أن يجعلا المعاملة غير صالحة.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

قم بإنشاء مصفوفة الحسابات الجديدة ثم قم بإرجاعها.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

تقرأ هذه الدالة العنوان من الرسالة. 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

يبلغ طول العنوان دائمًا <span dir="ltr">20</span> بايت (أي <span dir="ltr">40</span> رقمًا سداسيًا عشريًا)، ويبدأ عند الحرف رقم <span dir="ltr">7</span>.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

اقرأ المبلغ والرقم الفريد من الرسالة. 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

في الرسالة، الرقم الأول بعد العنوان هو مبلغ فيني (أي جزء من الألف من ETH) المراد تحويله. الرقم الثاني هو الرقم الفريد. يتم تجاهل أي نص بينهما.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // لقد وجدناه للتو
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

إرجاع [مجموعة (tuple)](https://noir-lang.org/docs/noir/concepts/data_types/tuples) هي طريقة Noir لإرجاع قيم متعددة من دالة.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

تقوم هذه الدالة بتحويل الرسالة إلى بايتات، ثم تحول المبالغ إلى `TransferTxn`.

```rust
// المكافئ لـ hashMessage في Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

تمكنا من استخدام تجزئة Pedersen للحسابات لأنها تُجزأ فقط داخل إثبات المعرفة الصفرية. ومع ذلك، في هذا الكود نحتاج إلى التحقق من توقيع الرسالة، والذي يتم إنشاؤه بواسطة المتصفح. لذلك، نحتاج إلى اتباع تنسيق توقيع إيثيريوم في [<span dir="ltr">EIP-191</span>](https://eips.ethereum.org/EIPS/eip-191). هذا يعني أننا بحاجة إلى إنشاء مخزن مؤقت مدمج ببادئة قياسية، وطول الرسالة بتنسيق ASCII، والرسالة نفسها، واستخدام keccak256 القياسي في إيثيريوم لتجزئتها.

```rust
    // بادئة ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

لتجنب الحالات التي يطلب فيها التطبيق من المستخدم توقيع رسالة يمكن استخدامها كمعاملة أو لغرض آخر، يحدد <span dir="ltr">EIP-191</span> أن جميع الرسائل الموقعة تبدأ بالحرف <span dir="ltr">0x19</span> (ليس حرف ASCII صالحًا) متبوعًا بـ `Ethereum Signed Message:` وسطر جديد.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

تعامل مع أطوال الرسائل التي تصل إلى <span dir="ltr">999</span> وتفشل إذا كانت أكبر. لقد أضفت هذا الكود، على الرغم من أن طول الرسالة ثابت، لأنه يسهل تغييره. في نظام الإنتاج، من المحتمل أن تفترض فقط أن `MESSAGE_LENGTH` لا يتغير من أجل أداء أفضل.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

استخدم دالة `keccak256` القياسية في إيثيريوم.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // عنوان، أول 16 بايت من التجزئة، آخر 16 بايت من التجزئة        
{
```

تتحقق هذه الدالة من التوقيع، والذي يتطلب تجزئة الرسالة. ثم تزودنا بالعنوان الذي وقعها وتجزئة الرسالة. يتم توفير تجزئة الرسالة في قيمتي `Field` لأن استخدامها أسهل في بقية البرنامج من مصفوفة البايتات.

نحتاج إلى استخدام قيمتي `Field` لأن حسابات الحقل تتم [باقي قسمة (modulo)](https://en.wikipedia.org/wiki/Modulo) رقم كبير، ولكن هذا الرقم عادة ما يكون أقل من <span dir="ltr">256</span> بت (وإلا سيكون من الصعب إجراء هذه الحسابات في جهاز إيثيريوم الظاهري).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

حدد `hash1` و`hash2` كمتغيرات قابلة للتغيير، واكتب التجزئة فيها بايتًا تلو الآخر.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
هذا مشابه لـ [`ecrecover` في Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)، مع اختلافين مهمين:

- إذا لم يكن التوقيع صالحًا، يفشل الاستدعاء في `assert` ويتم إحباط البرنامج.
- بينما يمكن استعادة المفتاح العام من التوقيع والتجزئة، فإن هذه معالجة يمكن إجراؤها خارجيًا، وبالتالي لا تستحق القيام بها داخل إثبات المعرفة الصفرية. إذا حاول شخص ما خداعنا هنا، فسيفشل التحقق من التوقيع.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // تجزئة مصفوفة الحسابات القديمة
        Field,  // تجزئة مصفوفة الحسابات الجديدة
        Field,  // أول 16 بايت من تجزئة الرسالة
        Field,  // آخر 16 بايت من تجزئة الرسالة
    )
```

أخيرًا، نصل إلى دالة `main`. نحتاج إلى إثبات أن لدينا معاملة تغير بشكل صالح تجزئة الحسابات من القيمة القديمة إلى القيمة الجديدة. نحتاج أيضًا إلى إثبات أن لديها تجزئة المعاملة المحددة هذه حتى يعرف الشخص الذي أرسلها أن معاملته قد تمت معالجتها.

```rust
{
    let mut txn = readTransferTxn(message);
```

نحتاج إلى أن يكون `txn` قابلاً للتغيير لأننا لا نقرأ عنوان المرسل من الرسالة، بل نقرأه من التوقيع. 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### المرحلة 2 - إضافة خادم {#stage-2}

في المرحلة الثانية، نضيف خادمًا يتلقى وينفذ معاملات التحويل من المتصفح.

لرؤية ذلك عمليًا:

1. أوقف Vite إذا كان قيد التشغيل.

2. قم بتنزيل الفرع الذي يتضمن الخادم وتأكد من أن لديك جميع الوحدات النمطية اللازمة.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   ليست هناك حاجة لتجميع كود Noir، فهو نفس الكود الذي استخدمته للمرحلة 1.

3. ابدأ الخادم.

   ```sh
   npm run start
   ```

4. في نافذة سطر أوامر منفصلة، قم بتشغيل Vite لتقديم كود المتصفح.

   ```sh
   cd client
   npm run dev
   ```

5. تصفح إلى كود العميل على [<span dir="ltr">http://localhost:5173</span>](http://localhost:5173)

6. قبل أن تتمكن من إصدار معاملة، تحتاج إلى معرفة الرقم الفريد، بالإضافة إلى المبلغ الذي يمكنك إرساله. للحصول على هذه المعلومات، انقر على **تحديث بيانات الحساب** (Update account data) وقم بتوقيع الرسالة.

   لدينا معضلة هنا. من ناحية، لا نريد توقيع رسالة يمكن إعادة استخدامها ([هجوم إعادة الإرسال](https://en.wikipedia.org/wiki/Replay_attack))، وهذا هو السبب في أننا نريد رقمًا فريدًا في المقام الأول. ومع ذلك، ليس لدينا رقم فريد بعد. الحل هو اختيار رقم فريد يمكن استخدامه مرة واحدة فقط ولدينا بالفعل على كلا الجانبين، مثل الوقت الحالي.

   المشكلة في هذا الحل هي أن الوقت قد لا يكون متزامنًا تمامًا. لذا بدلاً من ذلك، نقوم بتوقيع قيمة تتغير كل دقيقة. هذا يعني أن نافذة تعرضنا لهجمات إعادة الإرسال هي دقيقة واحدة على الأكثر. بالنظر إلى أنه في بيئة الإنتاج سيتم حماية الطلب الموقع بواسطة TLS، وأن الجانب الآخر من النفق - الخادم - يمكنه بالفعل الكشف عن الرصيد والرقم الفريد (يجب أن يعرفهما ليعمل)، فهذه مخاطرة مقبولة.

7. بمجرد أن يستعيد المتصفح الرصيد والرقم الفريد، فإنه يعرض نموذج التحويل. حدد عنوان الوجهة والمبلغ وانقر على **تحويل** (Transfer). قم بتوقيع هذا الطلب.

8. لرؤية التحويل، إما أن تقوم بـ **تحديث بيانات الحساب** (Update account data) أو تنظر في النافذة التي تقوم بتشغيل الخادم فيها. يسجل الخادم الحالة في كل مرة تتغير فيها.

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
        ```

#### `server/index.mjs` {#server-index-mjs-1}

يحتوي [هذا الملف](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) على عملية الخادم، ويتفاعل مع كود Noir في [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). إليك شرح للأجزاء المهمة.

```js
import { Noir } from '@noir-lang/noir_js'
```

تُعد مكتبة [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) واجهة بين كود JavaScript وكود Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

قم بتحميل الدائرة الحسابية - برنامج Noir المُجمَّع الذي أنشأناه في المرحلة السابقة - واستعد لتنفيذه.

```js
// نحن نقدم معلومات الحساب فقط استجابة لطلب موقع
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

لتوفير معلومات الحساب، نحتاج فقط إلى التوقيع. السبب هو أننا نعرف بالفعل ما ستكون عليه الرسالة، وبالتالي تجزئة الرسالة.

```js
const processMessage = async (message, signature) => {
```

قم بمعالجة رسالة وتنفيذ المعاملة التي تشفرها.

```js
    // الحصول على المفتاح العام
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

الآن بعد أن قمنا بتشغيل JavaScript على الخادم، يمكننا استرداد المفتاح العام هناك بدلاً من العميل.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

يقوم `noir.execute` بتشغيل برنامج Noir. المعلمات تعادل تلك المقدمة في [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). لاحظ أنه يتم توفير القيم الطويلة كمصفوفة من السلاسل السداسية العشرية (`["0x60", "0xA7"]`)، وليس كقيمة سداسية عشرية واحدة (`0x60A7`)، بالطريقة التي تقوم بها Viem.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

إذا كان هناك خطأ، التقطه ثم انقل نسخة مبسطة إلى العميل.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

قم بتطبيق المعاملة. لقد قمنا بذلك بالفعل في كود Noir، ولكن من الأسهل القيام بذلك مرة أخرى هنا بدلاً من استخراج النتيجة من هناك.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

هيكل `Accounts` الأولي.

### المرحلة 3 - العقود الذكية لإيثيريوم {#stage-3}

1. أوقف عمليات الخادم والعميل.

2. قم بتنزيل الفرع الذي يحتوي على العقود الذكية وتأكد من أن لديك جميع الوحدات النمطية اللازمة.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. قم بتشغيل `anvil` في نافذة سطر أوامر منفصلة.

4. قم بإنشاء مفتاح التحقق ومتحقق Solidity، ثم انسخ كود المتحقق إلى مشروع Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. انتقل إلى العقود الذكية وقم بتعيين متغيرات البيئة لاستخدام سلسلة كتل `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. قم بنشر `Verifier.sol` وتخزين العنوان في متغير بيئة.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. قم بنشر عقد `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   قيمة `0x199..67b` هي تجزئة Pederson للحالة الأولية لـ `Accounts`. إذا قمت بتعديل هذه الحالة الأولية في `server/index.mjs`، يمكنك تشغيل معاملة لرؤية التجزئة الأولية التي أبلغ عنها إثبات المعرفة الصفرية.

8. قم بتشغيل الخادم.

   ```sh
   cd ../server
   npm run start
   ```

9. قم بتشغيل العميل في نافذة سطر أوامر مختلفة.

   ```sh
   cd client
   npm run dev
   ```

10. قم بتشغيل بعض المعاملات.

11. للتحقق من تغير الحالة على السلسلة، أعد تشغيل عملية الخادم. لاحظ أن `ZkBank` لم يعد يقبل المعاملات، لأن قيمة التجزئة الأصلية في المعاملات تختلف عن قيمة التجزئة المخزنة على السلسلة.

    هذا هو نوع الخطأ المتوقع.

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
        ```

#### `server/index.mjs` {#server-index-mjs-2}

تتعلق التغييرات في هذا الملف في الغالب بإنشاء الإثبات الفعلي وإرساله على السلسلة.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

نحتاج إلى استخدام [حزمة Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) لإنشاء الإثبات الفعلي لإرساله على السلسلة. يمكننا استخدام هذه الحزمة إما عن طريق تشغيل واجهة سطر الأوامر (`bb`) أو باستخدام [مكتبة JavaScript، `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). مكتبة JavaScript أبطأ بكثير من تشغيل الكود محليًا، لذلك نستخدم [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) هنا لاستخدام سطر الأوامر.

لاحظ أنه إذا قررت استخدام `bb.js`، فأنت بحاجة إلى استخدام إصدار متوافق مع إصدار Noir الذي تستخدمه. في وقت كتابة هذا التقرير، يستخدم إصدار Noir الحالي (<span dir="ltr">1.0.0-beta.11</span>) الإصدار <span dir="ltr">0.87</span> من `bb.js`.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

العنوان هنا هو العنوان الذي تحصل عليه عندما تبدأ بـ `anvil` نظيف وتتبع التوجيهات أعلاه.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

هذا المفتاح الخاص هو أحد الحسابات الافتراضية الممولة مسبقًا في `anvil`. 

```js
const generateProof = async (witness, fileID) => {
```

قم بإنشاء إثبات باستخدام الملف القابل للتنفيذ `bb`.

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

اكتب الشاهد في ملف.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

قم بإنشاء الإثبات فعليًا. تنشئ هذه الخطوة أيضًا ملفًا بالمتغيرات العامة، لكننا لا نحتاج إلى ذلك. لقد حصلنا بالفعل على هذه المتغيرات من `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

الإثبات عبارة عن مصفوفة JSON من قيم `Field`، كل منها ممثلة كقيمة سداسية عشرية. ومع ذلك، نحتاج إلى إرسالها في المعاملة كقيمة `bytes` واحدة، والتي تمثلها Viem بسلسلة سداسية عشرية كبيرة. هنا نقوم بتغيير التنسيق عن طريق تسلسل جميع القيم، وإزالة جميع `0x`، ثم إضافة واحدة في النهاية.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

قم بالتنظيف وإرجاع الإثبات.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

يجب أن تكون الحقول العامة مصفوفة من قيم بحجم <span dir="ltr">32</span> بايت. ومع ذلك، نظرًا لأننا احتجنا إلى تقسيم تجزئة المعاملة بين قيمتي `Field`، فإنها تظهر كقيمة بحجم <span dir="ltr">16</span> بايت. هنا نضيف أصفارًا حتى تفهم Viem أنها في الواقع <span dir="ltr">32</span> بايت.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

يستخدم كل عنوان كل رقم فريد مرة واحدة فقط حتى نتمكن من استخدام مزيج من `fromAddress` و`nonce` كمعرف فريد لملف الشاهد ودليل الإخراج.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

أرسل المعاملة إلى السلسلة.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

هذا هو الكود على السلسلة الذي يتلقى المعاملة.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

يحتاج الكود على السلسلة إلى تتبع متغيرين: المتحقق (عقد منفصل يتم إنشاؤه بواسطة `nargo`) وتجزئة الحالة الحالية.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

في كل مرة تتغير فيها الحالة، نُصدر حدث `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

تقوم هذه الدالة بمعالجة المعاملات. تحصل على الإثبات (كـ `bytes`) والمدخلات العامة (كمصفوفة `bytes32`)، بالتنسيق الذي يتطلبه المتحقق (لتقليل المعالجة على السلسلة وبالتالي تكاليف الغاز).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

يجب أن يكون إثبات المعرفة الصفرية هو أن المعاملة تتغير من التجزئة الحالية لدينا إلى تجزئة جديدة.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

استدعِ عقد المتحقق للتحقق من إثبات المعرفة الصفرية. تعكس هذه الخطوة المعاملة إذا كان إثبات المعرفة الصفرية خاطئًا.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

إذا كان كل شيء صحيحًا، فقم بتحديث تجزئة الحالة إلى القيمة الجديدة وأصدر حدث `TransactionProcessed`.

## الانتهاكات من قبل المكون المركزي {#abuses}

يتكون أمن المعلومات من ثلاث سمات:

- _السرية_، لا يمكن للمستخدمين قراءة المعلومات التي غير مصرح لهم بقراءتها.
- _النزاهة_، لا يمكن تغيير المعلومات إلا من قبل المستخدمين المصرح لهم وبطريقة مصرح بها.
- _التوافر_، يمكن للمستخدمين المصرح لهم استخدام النظام.

في هذا النظام، يتم توفير النزاهة من خلال إثباتات المعرفة الصفرية. من الصعب جدًا ضمان التوافر، والسرية مستحيلة، لأن البنك يجب أن يعرف رصيد كل حساب وجميع المعاملات. لا توجد طريقة لمنع كيان يمتلك معلومات من مشاركة تلك المعلومات.

قد يكون من الممكن إنشاء بنك سري حقًا باستخدام [العناوين المخفية](https://vitalik.eth.limo/general/2023/01/20/stealth.html)، ولكن هذا خارج نطاق هذه المقالة.

### معلومات خاطئة {#false-info}

إحدى الطرق التي يمكن للخادم من خلالها انتهاك النزاهة هي تقديم معلومات خاطئة عند [طلب البيانات](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

لحل هذه المشكلة، يمكننا كتابة برنامج Noir ثانٍ يتلقى الحسابات كمدخل خاص والعنوان الذي تُطلب معلوماته كمدخل عام. المخرجات هي الرصيد والرقم الفريد لذلك العنوان، وتجزئة الحسابات.

بالطبع، لا يمكن التحقق من هذا الإثبات على السلسلة، لأننا لا نريد نشر الأرقام الفريدة والأرصدة على السلسلة. ومع ذلك، يمكن التحقق منه بواسطة كود العميل الذي يعمل في المتصفح.

### المعاملات الإجبارية {#forced-txns}

الآلية المعتادة لضمان التوافر ومنع الرقابة على الطبقة الثانية (<span dir="ltr">L2s</span>) هي [المعاملات الإجبارية](https://docs.optimism.io/stack/transactions/forced-transaction). لكن المعاملات الإجبارية لا تتوافق مع إثباتات المعرفة الصفرية. الخادم هو الكيان الوحيد الذي يمكنه التحقق من المعاملات.

يمكننا تعديل `smart-contracts/src/ZkBank.sol` لقبول المعاملات الإجبارية ومنع الخادم من تغيير الحالة حتى تتم معالجتها. ومع ذلك، فإن هذا يعرضنا لهجوم بسيط لرفض الخدمة. ماذا لو كانت المعاملة الإجبارية غير صالحة وبالتالي من المستحيل معالجتها؟

الحل هو الحصول على إثبات المعرفة الصفرية بأن المعاملة الإجبارية غير صالحة. هذا يمنح الخادم ثلاثة خيارات:

- معالجة المعاملة الإجبارية، مع تقديم إثبات المعرفة الصفرية بأنه تمت معالجتها وتجزئة الحالة الجديدة.
- رفض المعاملة الإجبارية، وتقديم إثبات المعرفة الصفرية للعقد بأن المعاملة غير صالحة (عنوان غير معروف، أو رقم فريد غير صالح، أو رصيد غير كافٍ).
- تجاهل المعاملة الإجبارية. لا توجد طريقة لإجبار الخادم على معالجة المعاملة فعليًا، ولكن هذا يعني أن النظام بأكمله غير متاح.

#### سندات التوافر {#avail-bonds}

في التنفيذ على أرض الواقع، من المحتمل أن يكون هناك نوع من دافع الربح للحفاظ على تشغيل الخادم. يمكننا تعزيز هذا الحافز من خلال جعل الخادم ينشر سند توافر يمكن لأي شخص حرقه إذا لم تتم معالجة معاملة إجبارية خلال فترة معينة.

### كود Noir سيئ {#bad-noir-code}

عادةً، لجعل الناس يثقون في عقد ذكي، نقوم برفع الكود المصدري إلى [مستكشف الكتل](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). ومع ذلك، في حالة إثباتات المعرفة الصفرية، فإن ذلك غير كافٍ.

يحتوي `Verifier.sol` على مفتاح التحقق، وهو دالة لبرنامج Noir. ومع ذلك، فإن هذا المفتاح لا يخبرنا بما كان عليه برنامج Noir. للحصول على حل موثوق به فعليًا، تحتاج إلى رفع برنامج Noir (والإصدار الذي أنشأه). بخلاف ذلك، قد تعكس إثباتات المعرفة الصفرية برنامجًا مختلفًا، برنامجًا يحتوي على باب خلفي.

حتى تبدأ مستكشفات الكتل في السماح لنا برفع برامج Noir والتحقق منها، يجب عليك القيام بذلك بنفسك (ويفضل أن يكون ذلك على [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). بعد ذلك، سيتمكن المستخدمون المتمرسون من تنزيل الكود المصدري، وتجميعه بأنفسهم، وإنشاء `Verifier.sol`، والتحقق من أنه مطابق لذلك الموجود على السلسلة.

## الخاتمة {#conclusion}

تتطلب التطبيقات من نوع بلازما مكونًا مركزيًا لتخزين المعلومات. يفتح هذا الباب أمام نقاط ضعف محتملة، ولكن في المقابل، يتيح لنا الحفاظ على الخصوصية بطرق غير متاحة على سلسلة الكتل نفسها. باستخدام إثباتات المعرفة الصفرية، يمكننا ضمان سلامة البيانات وربما جعله مجديًا اقتصاديًا لأي شخص يدير المكون المركزي للحفاظ على التوافر.

[اطلع هنا على المزيد من أعمالي](https://cryptodocguy.pro/).

## شكر وتقدير {#acknowledgements}

- قرأ جوش كريتس مسودة هذه المقالة وساعدني في مشكلة شائكة في Noir.

أي أخطاء متبقية هي مسؤوليتي.