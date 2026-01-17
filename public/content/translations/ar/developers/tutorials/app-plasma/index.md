---
title: كتابة Plasma خاصة بالتطبيق تحافظ على الخصوصية
description: في هذا البرنامج التعليمي، سنبني بنكًا شبه سري للإيداعات. البنك هو مكون مركزي؛ فهو يعرف رصيد كل مستخدم. ولكن، لا يتم تخزين هذه المعلومات على السلسلة. بدلًا من ذلك، ينشر البنك تجزئة (هاش) للحالة. في كل مرة تحدث فيها معاملة، ينشر البنك التجزئة (الهاش) الجديدة، بالإضافة إلى إثبات المعرفة الصفرية بأنه يمتلك معاملة موقعة تُغيِّر حالة التجزئة (الهاش) إلى الحالة الجديدة. بعد قراءة هذا البرنامج التعليمي، لن تفهم فقط كيفية استخدام إثباتات المعرفة الصفرية، بل ستفهم أيضًا سبب استخدامها وكيفية القيام بذلك بأمان.
author: Ori Pomerantz
tags: [ "المعرفة الصفرية", "خادم", "خارج السلسلة", "الخصوصية" ]
skill: advanced
lang: ar
published: 2025-10-15
---

## مقدمة {#مقدمة}

على عكس [الرول أبس](/developers/docs/scaling/zk-rollups/)، تستخدم [البلازما](/developers/docs/scaling/plasma) شبكة إيثريوم الرئيسية للنزاهة، ولكن ليس للتوافر. في هذا المقال، نكتب تطبيقًا يتصرف مثل Plasma، حيث تضمن إيثريوم النزاهة (عدم وجود تغييرات غير مصرح بها) ولكن ليس التوافر (يمكن أن يتعطل مكون مركزي ويعطل النظام بأكمله).

التطبيق الذي نكتبه هنا هو بنك يحافظ على الخصوصية. تمتلك العناوين المختلفة حسابات ذات أرصدة، ويمكنها إرسال الأموال (ETH) إلى حسابات أخرى. ينشر البنك تجزئات (هاشات) الحالة (الحسابات وأرصدتها) والمعاملات، لكنه يحتفظ بالأرصدة الفعلية خارج السلسلة حيث يمكن أن تظل خاصة.

## التصميم {#design}

هذا ليس نظامًا جاهزًا للإنتاج، بل أداة تعليمية. على هذا النحو، تمت كتابته مع عدة افتراضات تبسيطية.

- مجمع حسابات ثابت. هناك عدد محدد من الحسابات، وكل حساب ينتمي إلى عنوان محدد مسبقًا. هذا يجعل النظام أبسط بكثير لأنه من الصعب التعامل مع هياكل البيانات متغيرة الحجم في إثباتات المعرفة الصفرية. بالنسبة لنظام جاهز للإنتاج، يمكننا استخدام [جذر Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) كتجزئة (هاش) للحالة وتقديم إثباتات Merkle للأرصدة المطلوبة.

- تخزين الذاكرة. في نظام الإنتاج، نحتاج إلى كتابة جميع أرصدة الحسابات على القرص للحفاظ عليها في حالة إعادة التشغيل. هنا، لا بأس إذا فقدت المعلومات ببساطة.

- التحويلات فقط. سيتطلب نظام الإنتاج طريقة لإيداع الأصول في البنك وسحبها. لكن الغرض هنا هو فقط توضيح المفهوم، لذا فإن هذا البنك يقتصر على التحويلات.

### إثباتات المعرفة الصفرية {#zero-knowledge-proofs}

على المستوى الأساسي، يوضح إثبات المعرفة الصفرية أن المُثبِت يعرف بعض البيانات، _البيانات<sub>الخاصة</sub>_ بحيث توجد علاقة _العلاقة_ بين بعض البيانات العامة، _البيانات<sub>العامة</sub>_، و_البيانات<sub>الخاصة</sub>_. يعرف المُحقِّق _العلاقة_ و_البيانات<sub>العامة</sub>_.

للحفاظ على الخصوصية، نحتاج إلى أن تكون الحالات والمعاملات خاصة. ولكن لضمان النزاهة، نحتاج إلى أن تكون [التجزئة (الهاش) المشفرة](https://en.wikipedia.org/wiki/Cryptographic_hash_function) للحالات عامة. لإثبات للأشخاص الذين يقدمون المعاملات أن تلك المعاملات قد حدثت بالفعل، نحتاج أيضًا إلى نشر تجزئات (هاشات) المعاملات.

في معظم الحالات، تكون _البيانات<sub>الخاصة</sub>_ هي المُدخَل لبرنامج إثبات المعرفة الصفرية، وتكون _البيانات<sub>العامة</sub>_ هي المُخرَج.

هذه الحقول في _البيانات<sub>الخاصة</sub>_:

- _الحالة<sub>n</sub>_، الحالة القديمة
- _الحالة<sub>n+1</sub>_، الحالة الجديدة
- _المعاملة_، معاملة تتغير من الحالة القديمة إلى الحالة الجديدة. تحتاج هذه المعاملة إلى تضمين هذه الحقول:
  - _عنوان الوجهة_ الذي يستقبل التحويل
  - _المبلغ_ الذي يتم تحويله
  - _Nonce_ لضمان إمكانية معالجة كل معاملة مرة واحدة فقط.
    لا يلزم أن يكون عنوان المصدر في المعاملة، لأنه يمكن استرداده من التوقيع.
- _التوقيع_، وهو توقيع مصرح به لإجراء المعاملة. في حالتنا، العنوان الوحيد المصرح له بإجراء معاملة هو عنوان المصدر. نظرًا لأن نظام المعرفة الصفرية لدينا يعمل بالطريقة التي يعمل بها، فإننا نحتاج أيضًا إلى المفتاح العام للحساب، بالإضافة إلى توقيع إيثريوم.

هذه هي الحقول في _البيانات<sub>العامة</sub>_:

- _تجزئة(الحالة<sub>n</sub>)_ تجزئة (هاش) الحالة القديمة
- _تجزئة(الحالة<sub>n+1</sub>)_ تجزئة (هاش) الحالة الجديدة
- _تجزئة(المعاملة)_ تجزئة (هاش) المعاملة التي تغير الحالة من _الحالة<sub>n</sub>_ إلى _الحالة<sub>n+1</sub>_.

تتحقق العلاقة من عدة شروط:

- التجزئات (الهاشات) العامة هي بالفعل التجزئات (الهاشات) الصحيحة للحقول الخاصة.
- المعاملة، عند تطبيقها على الحالة القديمة، تؤدي إلى الحالة الجديدة.
- يأتي التوقيع من عنوان مصدر المعاملة.

بسبب خصائص دوال التجزئة (الهاش) المشفرة، فإن إثبات هذه الشروط يكفي لضمان النزاهة.

### هياكل البيانات {#data-structures}

هيكل البيانات الأساسي هو الحالة التي يحتفظ بها الخادم. لكل حساب، يتتبع الخادم رصيد الحساب و[nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)، المستخدم لمنع [هجمات إعادة الإرسال](https://en.wikipedia.org/wiki/Replay_attack).

### المكونات {#components}

يتطلب هذا النظام مكونين:

- _الخادم_ الذي يستقبل المعاملات، ويعالجها، وينشر التجزئات (الهاشات) على السلسلة إلى جانب إثباتات المعرفة الصفرية.
- _عقد ذكي_ يخزن التجزئات (الهاشات) ويتحقق من إثباتات المعرفة الصفرية لضمان شرعية انتقالات الحالة.

### تدفق البيانات والتحكم {#flows}

هذه هي الطرق التي تتواصل بها المكونات المختلفة للتحويل من حساب إلى آخر.

1. يُقدِّم متصفح الويب معاملة موقعة تطلب تحويلاً من حساب الموقِّع إلى حساب مختلف.

2. يتحقق الخادم من أن المعاملة صالحة:

   - يمتلك الموقِّع حسابًا في البنك برصيد كافٍ.
   - يمتلك المستلم حسابًا في البنك.

3. يحسب الخادم الحالة الجديدة عن طريق طرح المبلغ المحوَّل من رصيد الموقِّع وإضافته إلى رصيد المستلم.

4. يحسب الخادم إثبات المعرفة الصفرية بأن تغيير الحالة صالح.

5. يقدم الخادم إلى إيثريوم معاملة تتضمن:

   - تجزئة (هاش) الحالة الجديدة
   - تجزئة (هاش) المعاملة (حتى يتمكن مرسل المعاملة من معرفة أنه قد تمت معالجتها)
   - إثبات المعرفة الصفرية الذي يثبت أن الانتقال إلى الحالة الجديدة صالح

6. يتحقق العقد الذكي من إثبات المعرفة الصفرية.

7. إذا تم التحقق من إثبات المعرفة الصفرية، يقوم العقد الذكي بتنفيذ هذه الإجراءات:
   - تحديث تجزئة (هاش) الحالة الحالية إلى تجزئة (هاش) الحالة الجديدة
   - إصدار إدخال سجل بتجزئة (هاش) الحالة الجديدة وتجزئة (هاش) المعاملة

### أدوات {#tools}

بالنسبة لرمز العميل، سوف نستخدم [Vite](https://vite.dev/) و [React](https://react.dev/) و [Viem](https://viem.sh/) و [Wagmi](https://wagmi.sh/). هذه أدوات قياسية في الصناعة؛ إذا لم تكن على دراية بها، يمكنك استخدام [هذا البرنامج التعليمي](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

غالبية الخادم مكتوبة بلغة JavaScript باستخدام [Node](https://nodejs.org/en). جزء المعرفة الصفرية مكتوب بلغة [Noir](https://noir-lang.org/). نحن بحاجة إلى الإصدار `1.0.0-beta.10`، لذا بعد [تثبيت Noir حسب التعليمات](https://noir-lang.org/docs/getting_started/quick_start)، قم بتشغيل:

```
noirup -v 1.0.0-beta.10
```

البلوكتشين الذي نستخدمه هو `anvil`، وهو بلوكتشين اختبار محلي وهو جزء من [Foundry](https://getfoundry.sh/introduction/installation).

## التنفيذ {#implementation}

لأن هذا نظام معقد، سننفذه على مراحل.

### المرحلة 1 - المعرفة الصفرية اليدوية {#stage-1}

في المرحلة الأولى، سنقوم بتوقيع معاملة في المتصفح ثم نقدم المعلومات يدويًا إلى إثبات المعرفة الصفرية. يتوقع رمز المعرفة الصفرية الحصول على هذه المعلومات في `server/noir/Prover.toml` (موثقة [هنا](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

لرؤيته أثناء العمل:

1. تأكد من تثبيت [Node](https://nodejs.org/en/download) و [Noir](https://noir-lang.org/install). يفضل تثبيتها على نظام UNIX مثل macOS أو Linux أو [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. قم بتنزيل رمز المرحلة 1 وابدأ خادم الويب لخدمة رمز العميل.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   السبب الذي يجعلك تحتاج إلى خادم ويب هنا هو أنه لمنع أنواع معينة من الاحتيال، لا تقبل العديد من المحافظ (مثل MetaMask) الملفات التي يتم تقديمها مباشرة من القرص

3. افتح متصفحًا به محفظة.

4. في المحفظة، أدخل عبارة مرور جديدة. لاحظ أن هذا سيؤدي إلى حذف عبارة المرور الحالية الخاصة بك، لذا _تأكد من أن لديك نسخة احتياطية_.

   عبارة المرور هي `test test test test test test test test test test test junk`، وهي عبارة مرور الاختبار الافتراضية لـ anvil.

5. تصفح [رمز العميل](http://localhost:5173/).

6. اتصل بالمحفظة وحدد حساب الوجهة والمبلغ.

7. انقر على **توقيع** وقم بتوقيع المعاملة.

8. تحت عنوان **Prover.toml**، ستجد نصًا. استبدل `server/noir/Prover.toml` بهذا النص.

9. نفذ إثبات المعرفة الصفرية.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   يجب أن يكون الإخراج مشابهًا لـ

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. قارن بين آخر قيمتين والتجزئة (الهاش) التي تراها على متصفح الويب لترى ما إذا كانت الرسالة قد تم تجزئتها بشكل صحيح.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

يعرض [هذا الملف](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) تنسيق المعلومات الذي تتوقعه Noir.

```toml
message="إرسال 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

الرسالة بصيغة نصية، مما يسهل على المستخدم فهمها (وهو أمر ضروري عند التوقيع) وعلى رمز Noir تحليلها. يُذكر المبلغ بوحدة Finney لتمكين التحويلات الكسرية من ناحية، وليكون سهل القراءة من ناحية أخرى. الرقم الأخير هو [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

يبلغ طول السلسلة 100 حرف. لا تتعامل إثباتات المعرفة الصفرية بشكل جيد مع البيانات متغيرة الحجم، لذلك غالبًا ما يكون من الضروري حشو البيانات.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

هذه المعلمات الثلاث هي مصفوفات بايت ثابتة الحجم.

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

هذه هي طريقة تحديد مصفوفة من الهياكل. لكل إدخال، نحدد العنوان، الرصيد (بالميلي إيثر المعروف أيضًا باسم [finney](https://cryptovalleyjournal.com/glossary/finney/))، وقيمة nonce التالية.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

ينفذ [هذا الملف](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) المعالجة من جانب العميل وينشئ ملف `server/noir/Prover.toml` (الملف الذي يتضمن معلمات المعرفة الصفرية).

فيما يلي شرح للأجزاء الأكثر إثارة للاهتمام.

```tsx
export default attrs =>  {
```

تنشئ هذه الدالة مكون `Transfer` React، الذي يمكن للملفات الأخرى استيراده.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

هذه هي عناوين الحسابات، العناوين التي أنشأتها عبارة المرور `test ... test junk`. إذا كنت تريد استخدام العناوين الخاصة بك، فما عليك سوى تعديل هذا التعريف.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

تتيح لنا [خطافات Wagmi](https://wagmi.sh/react/api/hooks) هذه الوصول إلى مكتبة [viem](https://viem.sh/) والمحفظة.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

هذه هي الرسالة، محشوة بالمسافات. في كل مرة يتغير فيها أحد متغيرات [`useState`](https://react.dev/reference/react/useState)، تتم إعادة رسم المكون وتحديث `message`.

```tsx
  const sign = async () => {
```

يتم استدعاء هذه الدالة عندما ينقر المستخدم على زر **توقيع**. يتم تحديث الرسالة تلقائيًا، ولكن التوقيع يتطلب موافقة المستخدم في المحفظة، ولا نريد أن نطلبها إلا عند الحاجة.

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

احصل على تجزئة (هاش) الرسالة. من المفيد توفيره للمستخدم لتصحيح الأخطاء (في رمز Noir).

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[احصل على المفتاح العام](https://viem.sh/docs/utilities/recoverPublicKey). هذا مطلوب لدالة [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

عيّن متغيرات الحالة. يؤدي القيام بذلك إلى إعادة رسم المكون (بعد خروج دالة `sign`) ويعرض للمستخدم القيم المحدثة.

```tsx
    let proverToml = `
```

نص `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

يزودنا Viem بالمفتاح العام كسلسلة سداسية عشرية مكونة من 65 بايت. البايت الأول هو `0x04`، وهو علامة إصدار. يتبع ذلك 32 بايت لـ `x` من المفتاح العام ثم 32 بايت لـ `y` من المفتاح العام.

ومع ذلك، تتوقع Noir الحصول على هذه المعلومات كمصفوفتي بايت، واحدة لـ `x` والأخرى لـ `y`. من الأسهل تحليلها هنا على العميل بدلاً من أن تكون جزءًا من إثبات المعرفة الصفرية.

لاحظ أن هذه ممارسة جيدة في المعرفة الصفرية بشكل عام. الرمز داخل إثبات المعرفة الصفرية مكلف، لذا فإن أي معالجة يمكن إجراؤها خارج إثبات المعرفة الصفرية _يجب_ أن تتم خارج إثبات المعرفة الصفرية.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

يتم توفير التوقيع أيضًا كسلسلة سداسية عشرية مكونة من 65 بايت. ومع ذلك، فإن البايت الأخير ضروري فقط لاستعادة المفتاح العام. نظرًا لأنه سيتم بالفعل توفير المفتاح العام لرمز Noir، فلن نحتاج إليه للتحقق من التوقيع، ولا يتطلبه رمز Noir.

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

هذا هو تنسيق HTML (بتعبير أدق، [JSX](https://react.dev/learn/writing-markup-with-jsx)) للمكون.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[هذا الملف](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) هو رمز المعرفة الصفرية الفعلي.

```
use std::hash::pedersen_hash;
```

يتم توفير [تجزئة (هاش) Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) مع [مكتبة Noir القياسية](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). تستخدم إثباتات المعرفة الصفرية دالة التجزئة (الهاش) هذه بشكل شائع. من الأسهل بكثير حسابها داخل [الدوائر الحسابية](https://rareskills.io/post/arithmetic-circuit) مقارنة بدوال التجزئة (الهاش) القياسية.

```
use keccak256::keccak256;
use dep::ecrecover;
```

هاتان الدالتان هما مكتبتان خارجيتان، معرفتان في [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). هما بالضبط ما سُميتا به، دالة تحسب [تجزئة keccak256](https://emn178.github.io/online-tools/keccak_256.html) ودالة تتحقق من توقيعات إيثريوم وتستعيد عنوان إيثريوم الخاص بالموقِّع.

```
global ACCOUNT_NUMBER : u32 = 5;
```

لغة Noir مستوحاة من [Rust](https://www.rust-lang.org/). المتغيرات، بشكل افتراضي، هي ثوابت. هذه هي الطريقة التي نعرّف بها ثوابت التكوين العامة. على وجه التحديد، `ACCOUNT_NUMBER` هو عدد الحسابات التي نخزنها.

أنواع البيانات المسماة `u<number>` هي ذلك العدد من البتات، غير الموقعة. الأنواع المدعومة الوحيدة هي `u8` و`u16` و`u32` و`u64` و`u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

يستخدم هذا المتغير لتجزئة Pedersen للحسابات، كما هو موضح أدناه.

```
global MESSAGE_LENGTH : u32 = 100;
```

كما هو موضح أعلاه، طول الرسالة ثابت. يتم تحديده هنا.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

تتطلب [توقيعات EIP-191](https://eips.ethereum.org/EIPS/eip-191) مخزنًا مؤقتًا ببادئة 26 بايت، متبوعًا بطول الرسالة في ASCII، وأخيرًا الرسالة نفسها.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

المعلومات التي نخزنها عن الحساب. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) هو رقم، عادة ما يصل إلى 253 بت، يمكن استخدامه مباشرة في [الدائرة الحسابية](https://rareskills.io/post/arithmetic-circuit) التي تنفذ إثبات المعرفة الصفرية. هنا نستخدم `Field` لتخزين عنوان إيثريوم مكون من 160 بت.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

المعلومات التي نخزنها لمعاملة تحويل.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

تعريف دالة. المعلمة هي معلومات `Account`. النتيجة هي مصفوفة من متغيرات `Field`، طولها `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

القيمة الأولى في المصفوفة هي عنوان الحساب. تتضمن القيمة الثانية كلاً من الرصيد والـ nonce. تغير استدعاءات `.into()` رقمًا إلى نوع البيانات الذي يجب أن يكون عليه. `account.nonce` هي قيمة `u32`، ولكن لإضافتها إلى `account.balance << 32`، وهي قيمة `u128`، يجب أن تكون `u128`. هذا هو أول استدعاء `.into()`. الاستدعاء الثاني يحول نتيجة `u128` إلى `Field` حتى تتناسب مع المصفوفة.

```
    flat
}
```

في لغة Noir، لا يمكن للدوال إرجاع قيمة إلا في النهاية (لا يوجد إرجاع مبكر). لتحديد القيمة المرجعة، تقوم بتقييمها مباشرة قبل القوس الختامي للدالة.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

تحول هذه الدالة مصفوفة الحسابات إلى مصفوفة `Field`، والتي يمكن استخدامها كمدخل لتجزئة (هاش) Petersen.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

هذه هي طريقة تحديد متغير قابل للتغيير، أي _ليس_ ثابتًا. يجب أن تحتوي المتغيرات في Noir دائمًا على قيمة، لذلك نقوم بتهيئة هذا المتغير إلى كل الأصفار.

```
    for i in 0..ACCOUNT_NUMBER {
```

هذه حلقة `for`. لاحظ أن الحدود هي ثوابت. يجب أن تكون حدود حلقات Noir معروفة في وقت الترجمة. والسبب هو أن الدوائر الحسابية لا تدعم التحكم في التدفق. عند معالجة حلقة `for`، يضع المترجم ببساطة الرمز الموجود بداخلها عدة مرات، مرة لكل تكرار.

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

أخيرًا، وصلنا إلى الدالة التي تجزئ مصفوفة الحسابات.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

تبحث هذه الدالة عن الحساب الذي له عنوان محدد. ستكون هذه الدالة غير فعالة بشكل فظيع في الرمز القياسي لأنها تتكرر على جميع الحسابات، حتى بعد أن تجد العنوان.

ومع ذلك، في إثباتات المعرفة الصفرية، لا يوجد تحكم في التدفق. إذا احتجنا في أي وقت إلى التحقق من شرط، فعلينا التحقق منه في كل مرة.

يحدث شيء مماثل مع عبارات `if`. تُترجم عبارة `if` في الحلقة أعلاه إلى هذه العبارات الرياضية.

_نتيجة<sub>الشرط</sub> = accounts[i].address == address_ // واحد إذا كانا متساويين، صفر بخلاف ذلك

_الحساب<sub>الجديد</sub> = نتيجة<sub>الشرط</sub>\*i + (1-نتيجة<sub>الشرط</sub>)\*الحساب<sub>القديم</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

تتسبب دالة [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) في تعطل إثبات المعرفة الصفرية إذا كان التأكيد خاطئًا. في هذه الحالة، إذا لم نتمكن من العثور على حساب بالعنوان ذي الصلة. للإبلاغ عن العنوان، نستخدم [سلسلة تنسيق](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

تطبق هذه الدالة معاملة تحويل وترجع مصفوفة الحسابات الجديدة.

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

أنشئ مصفوفة الحسابات الجديدة ثم أرجعها.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

تقرأ هذه الدالة العنوان من الرسالة.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

العنوان دائمًا ما يكون 20 بايت (المعروف أيضًا باسم 40 رقمًا سداسيًا عشريًا) ويبدأ عند الحرف رقم 7.

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

اقرأ المبلغ والـ nonce من الرسالة.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

في الرسالة، الرقم الأول بعد العنوان هو مبلغ Finney (المعروف أيضًا باسم جزء من ألف من ETH) للتحويل. الرقم الثاني هو الـ nonce. يتم تجاهل أي نص بينهما.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
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

إرجاع [tuple](https://noir-lang.org/docs/noir/concepts/data_types/tuples) هو طريقة Noir لإرجاع قيم متعددة من دالة.

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

تحول هذه الدالة الرسالة إلى بايتات، ثم تحول المبالغ إلى `TransferTxn`.

```rust
// The equivalent to Viem's hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

تمكنا من استخدام تجزئة (هاش) Pedersen للحسابات لأنها لا يتم تجزئتها إلا داخل إثبات المعرفة الصفرية. ولكن، في هذا الرمز، نحتاج إلى التحقق من توقيع الرسالة، والذي يتم إنشاؤه بواسطة المتصفح. لذلك، نحتاج إلى اتباع تنسيق توقيع إيثريوم في [EIP 191](https://eips.ethereum.org/EIPS/eip-191). هذا يعني أننا بحاجة إلى إنشاء مخزن مؤقت مدمج ببادئة قياسية، وطول الرسالة في ASCII، والرسالة نفسها، واستخدام keccak256 القياسي لإيثريوم لتجزئتها.

```rust
    // ASCII prefix
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

لتجنب الحالات التي يطلب فيها تطبيق من المستخدم توقيع رسالة يمكن استخدامها كمعاملة أو لغرض آخر، يحدد EIP 191 أن جميع الرسائل الموقعة تبدأ بالحرف 0x19 (ليس حرف ASCII صالحًا) متبوعًا بـ `Ethereum Signed Message:` وسطر جديد.

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

تعامل مع أطوال الرسائل التي تصل إلى 999 وفشل إذا كانت أكبر. لقد أضفت هذا الرمز، على الرغم من أن طول الرسالة ثابت، لأنه يسهل تغييره. في نظام الإنتاج، من المحتمل أن تفترض فقط أن `MESSAGE_LENGTH` لا يتغير من أجل أداء أفضل.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

استخدم دالة `keccak256` القياسية لإيثريوم.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

تتحقق هذه الدالة من التوقيع، والذي يتطلب تجزئة (هاش) الرسالة. ثم تزودنا بالعنوان الذي وقّعها وتجزئة (هاش) الرسالة. يتم توفير تجزئة (هاش) الرسالة في قيمتي `Field` لأنه من الأسهل استخدامها في بقية البرنامج من مصفوفة بايت.

نحتاج إلى استخدام قيمتي `Field` لأن حسابات الحقل تتم [باقي قسمة](https://en.wikipedia.org/wiki/Modulo) عدد كبير، ولكن هذا الرقم عادة ما يكون أقل من 256 بت (وإلا فسيكون من الصعب إجراء تلك الحسابات في آلة إيثريوم الافتراضية).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

حدد `hash1` و`hash2` كمتغيرات قابلة للتغيير، واكتب التجزئة (الهاش) فيها بايتًا ببايت.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

هذا مشابه لـ [`ecrecover` في Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions)، مع اختلافين مهمين:

- إذا لم يكن التوقيع صالحًا، يفشل استدعاء `assert` ويتم إحباط البرنامج.
- في حين يمكن استعادة المفتاح العام من التوقيع والتجزئة (الهاش)، فهذه معالجة يمكن إجراؤها خارجيًا وبالتالي لا تستحق القيام بها داخل إثبات المعرفة الصفرية. إذا حاول شخص ما خداعنا هنا، فسيفشل التحقق من التوقيع.

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
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

أخيرًا، نصل إلى الدالة `main`. نحتاج إلى إثبات أن لدينا معاملة تغير بشكل صحيح تجزئة (هاش) الحسابات من القيمة القديمة إلى القيمة الجديدة. نحتاج أيضًا إلى إثبات أن لديها تجزئة (هاش) المعاملة المحددة هذه حتى يعرف الشخص الذي أرسلها أن معاملته قد تمت معالجتها.

```rust
{
    let mut txn = readTransferTxn(message);
```

نحتاج إلى أن يكون `txn` قابلاً للتغيير لأننا لا نقرأ عنوان "من" من الرسالة، بل نقرأه من التوقيع.

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

في المرحلة الثانية، نضيف خادمًا يستقبل وينفذ معاملات التحويل من المتصفح.

لرؤيته أثناء العمل:

1. أوقف Vite إذا كان قيد التشغيل.

2. قم بتنزيل الفرع الذي يتضمن الخادم وتأكد من أن لديك جميع الوحدات النمطية اللازمة.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   ليست هناك حاجة لترجمة رمز Noir، فهو نفس الرمز الذي استخدمته للمرحلة 1.

3. ابدأ الخادم.

   ```sh
   npm run start
   ```

4. في نافذة سطر أوامر منفصلة، قم بتشغيل Vite لخدمة رمز المتصفح.

   ```sh
   cd client
   npm run dev
   ```

5. تصفح رمز العميل على [http://localhost:5173](http://localhost:5173)

6. قبل أن تتمكن من إصدار معاملة، تحتاج إلى معرفة الـ nonce، بالإضافة إلى المبلغ الذي يمكنك إرساله. للحصول على هذه المعلومات، انقر فوق **تحديث بيانات الحساب** وقم بتوقيع الرسالة.

   لدينا معضلة هنا. من ناحية، لا نريد توقيع رسالة يمكن إعادة استخدامها ([هجوم إعادة الإرسال](https://en.wikipedia.org/wiki/Replay_attack))، ولهذا السبب نريد nonce في المقام الأول. ولكن، ليس لدينا nonce بعد. الحل هو اختيار nonce يمكن استخدامه مرة واحدة فقط ولدينا بالفعل على كلا الجانبين، مثل الوقت الحالي.

   المشكلة في هذا الحل هي أن الوقت قد لا يكون متزامنًا تمامًا. لذلك بدلاً من ذلك، نوقع قيمة تتغير كل دقيقة. هذا يعني أن نافذة تعرضنا لهجمات إعادة الإرسال هي دقيقة واحدة على الأكثر. بالنظر إلى أنه في الإنتاج سيتم حماية الطلب الموقع بواسطة TLS، وأن الجانب الآخر من النفق - الخادم - يمكنه بالفعل الكشف عن الرصيد والـ nonce (يجب أن يعرفهما للعمل)، فهذا خطر مقبول.

7. بمجرد أن يستعيد المتصفح الرصيد والـ nonce، فإنه يعرض نموذج التحويل. حدد عنوان الوجهة والمبلغ وانقر فوق **تحويل**. قم بتوقيع هذا الطلب.

8. لرؤية التحويل، إما **تحديث بيانات الحساب** أو انظر في النافذة التي تقوم فيها بتشغيل الخادم. يسجل الخادم الحالة في كل مرة تتغير فيها.

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

يحتوي [هذا الملف](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) على عملية الخادم، ويتفاعل مع رمز Noir في [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). فيما يلي شرح للأجزاء المثيرة للاهتمام.

```js
import { Noir } from '@noir-lang/noir_js'
```

تتفاعل مكتبة [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) بين رمز JavaScript ورمز Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

قم بتحميل الدائرة الحسابية - برنامج Noir المترجم الذي أنشأناه في المرحلة السابقة - واستعد لتنفيذه.

```js
// We only provide account information in return to a signed request
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

لتوفير معلومات الحساب، نحتاج فقط إلى التوقيع. والسبب هو أننا نعرف بالفعل ما ستكون عليه الرسالة، وبالتالي تجزئة (هاش) الرسالة.

```js
const processMessage = async (message, signature) => {
```

معالجة رسالة وتنفيذ المعاملة التي تقوم بتشفيرها.

```js
    // Get the public key
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

`noir.execute` يقوم بتشغيل برنامج Noir. المعلمات تعادل تلك المتوفرة في [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). لاحظ أنه يتم توفير القيم الطويلة كمصفوفة من السلاسل السداسية العشرية (`["0x60", "0xA7"]`)، وليس كقيمة سداسية عشرية واحدة (`0x60A7`)، بالطريقة التي يفعلها Viem.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

إذا كان هناك خطأ، قم بالتقاطه ثم قم بنقل نسخة مبسطة إلى العميل.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

قم بتطبيق المعاملة. لقد فعلنا ذلك بالفعل في رمز Noir، ولكن من الأسهل القيام به مرة أخرى هنا بدلاً من استخراج النتيجة من هناك.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

هيكل `Accounts` الأولي.

### المرحلة 3 - عقود إيثريوم الذكية {#stage-3}

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

4. قم بإنشاء مفتاح التحقق ومحقق Solidity، ثم انسخ رمز المحقق إلى مشروع Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. اذهب إلى العقود الذكية وقم بتعيين متغيرات البيئة لاستخدام بلوكتشين `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. قم بنشر `Verifier.sol` وقم بتخزين العنوان في متغير بيئة.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. قم بنشر عقد `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   القيمة `0x199..67b` هي تجزئة (هاش) Pederson للحالة الأولية لـ `Accounts`. إذا قمت بتعديل هذه الحالة الأولية في `server/index.mjs`، يمكنك تشغيل معاملة لرؤية التجزئة (الهاش) الأولية التي أبلغ عنها إثبات المعرفة الصفرية.

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

11. للتحقق من أن الحالة قد تغيرت على السلسلة، أعد تشغيل عملية الخادم. لاحظ أن `ZkBank` لم يعد يقبل المعاملات، لأن قيمة التجزئة (الهاش) الأصلية في المعاملات تختلف عن قيمة التجزئة (الهاش) المخزنة على السلسلة.

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

تتعلق التغييرات في هذا الملف في الغالب بإنشاء الإثبات الفعلي وتقديمه على السلسلة.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

نحتاج إلى استخدام [حزمة Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) لإنشاء الإثبات الفعلي لإرساله على السلسلة. يمكننا استخدام هذه الحزمة إما عن طريق تشغيل واجهة سطر الأوامر (`bb`) أو عن طريق استخدام [مكتبة JavaScript، `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). مكتبة JavaScript أبطأ بكثير من تشغيل الرمز محليًا، لذلك نستخدم [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) هنا لاستخدام سطر الأوامر.

لاحظ أنه إذا قررت استخدام `bb.js`، فأنت بحاجة إلى استخدام إصدار متوافق مع إصدار Noir الذي تستخدمه. في وقت كتابة هذا التقرير، يستخدم الإصدار الحالي من Noir (1.0.0-beta.11) إصدار `bb.js` رقم 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

العنوان هنا هو الذي تحصل عليه عندما تبدأ بـ `anvil` نظيف وتتبع التوجيهات أعلاه.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

هذا المفتاح الخاص هو أحد الحسابات الممولة مسبقًا الافتراضية في `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

أنشئ إثباتًا باستخدام الملف التنفيذي `bb`.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

اكتب الشاهد في ملف.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

أنشئ الإثبات فعليًا. تنشئ هذه الخطوة أيضًا ملفًا به المتغيرات العامة، لكننا لا نحتاج إليه. لقد حصلنا بالفعل على تلك المتغيرات من `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

الإثبات هو مصفوفة JSON من قيم `Field`، يتم تمثيل كل منها بقيمة سداسية عشرية. ومع ذلك، نحتاج إلى إرسالها في المعاملة كقيمة `bytes` واحدة، والتي يمثلها Viem بسلسلة سداسية عشرية كبيرة. هنا نغير التنسيق عن طريق ربط جميع القيم، وإزالة كل `0x`، ثم إضافة واحدة في النهاية.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

تنظيف وإرجاع الإثبات.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

يجب أن تكون الحقول العامة مصفوفة من قيم 32 بايت. ولكن، بما أننا احتجنا إلى تقسيم تجزئة (هاش) المعاملة بين قيمتي `Field`، فإنها تظهر كقيمة 16 بايت. هنا نضيف أصفارًا حتى يفهم Viem أنها في الواقع 32 بايت.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

يستخدم كل عنوان كل nonce مرة واحدة فقط حتى نتمكن من استخدام مزيج من `fromAddress` و`nonce` كمعرّف فريد لملف الشاهد ودليل الإخراج.

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

هذا هو الرمز الموجود على السلسلة الذي يستقبل المعاملة.

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

يحتاج الرمز الموجود على السلسلة إلى تتبع متغيرين: المحقق (عقد منفصل يتم إنشاؤه بواسطة `nargo`) وتجزئة (هاش) الحالة الحالية.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

في كل مرة تتغير فيها الحالة، نصدر حدث `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

تعالج هذه الدالة المعاملات. تحصل على الإثبات (كـ `bytes`) والمدخلات العامة (كمصفوفة `bytes32`)، بالتنسيق الذي يتطلبه المحقق (لتقليل المعالجة على السلسلة وبالتالي تكاليف الغاز).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

يجب أن يكون إثبات المعرفة الصفرية هو أن المعاملة تتغير من التجزئة (الهاش) الحالية إلى تجزئة (هاش) جديدة.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

استدعِ عقد المحقق للتحقق من إثبات المعرفة الصفرية. تعيد هذه الخطوة المعاملة إذا كان إثبات المعرفة الصفرية خاطئًا.

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

إذا تم التحقق من كل شيء، قم بتحديث تجزئة (هاش) الحالة إلى القيمة الجديدة وأصدر حدث `TransactionProcessed`.

## إساءة استخدام المكون المركزي {#abuses}

يتكون أمن المعلومات من ثلاث سمات:

- _السرية_، لا يمكن للمستخدمين قراءة المعلومات التي لم يتم التصريح لهم بقراءتها.
- _النزاهة_، لا يمكن تغيير المعلومات إلا من قبل المستخدمين المصرح لهم بطريقة مصرح بها.
- _التوافر_، يمكن للمستخدمين المصرح لهم استخدام النظام.

في هذا النظام، يتم توفير النزاهة من خلال إثباتات المعرفة الصفرية. من الصعب جدًا ضمان التوافر، والسرية مستحيلة، لأن البنك يجب أن يعرف رصيد كل حساب وجميع المعاملات. لا توجد طريقة لمنع كيان لديه معلومات من مشاركة تلك المعلومات.

قد يكون من الممكن إنشاء بنك سري حقًا باستخدام [العناوين الخفية](https://vitalik.eth.limo/general/2023/01/20/stealth.html)، ولكن هذا خارج نطاق هذا المقال.

### معلومات خاطئة {#false-info}

إحدى الطرق التي يمكن بها للخادم انتهاك النزاهة هي توفير معلومات خاطئة عند [طلب البيانات](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

لحل هذه المشكلة، يمكننا كتابة برنامج Noir ثانٍ يتلقى الحسابات كمدخل خاص والعنوان الذي تُطلب معلومات عنه كمدخل عام. الناتج هو الرصيد والـ nonce لهذا العنوان، وتجزئة (هاش) الحسابات.

بالطبع، لا يمكن التحقق من هذا الإثبات على السلسلة، لأننا لا نريد نشر nonces والأرصدة على السلسلة. ومع ذلك، يمكن التحقق منه بواسطة رمز العميل الذي يعمل في المتصفح.

### المعاملات القسرية {#forced-txns}

الآلية المعتادة لضمان التوافر ومنع الرقابة على L2s هي [المعاملات القسرية](https://docs.optimism.io/stack/transactions/forced-transaction). لكن المعاملات القسرية لا تتحد مع إثباتات المعرفة الصفرية. الخادم هو الكيان الوحيد الذي يمكنه التحقق من المعاملات.

يمكننا تعديل `smart-contracts/src/ZkBank.sol` لقبول المعاملات القسرية ومنع الخادم من تغيير الحالة حتى تتم معالجتها. ومع ذلك، هذا يفتحنا على هجوم بسيط لرفض الخدمة. ماذا لو كانت المعاملة القسرية غير صالحة وبالتالي من المستحيل معالجتها؟

الحل هو الحصول على إثبات المعرفة الصفرية بأن المعاملة القسرية غير صالحة. وهذا يمنح الخادم ثلاثة خيارات:

- معالجة المعاملة القسرية، وتوفير إثبات المعرفة الصفرية بأنه قد تمت معالجتها وتجزئة (هاش) الحالة الجديدة.
- رفض المعاملة القسرية، وتوفير إثبات المعرفة الصفرية للعقد بأن المعاملة غير صالحة (عنوان غير معروف، nonce سيئ، أو رصيد غير كافٍ).
- تجاهل المعاملة القسرية. لا توجد طريقة لإجبار الخادم على معالجة المعاملة فعليًا، ولكن هذا يعني أن النظام بأكمله غير متاح.

#### سندات التوافر {#avail-bonds}

في التنفيذ الواقعي، من المحتمل أن يكون هناك نوع من دافع الربح للحفاظ على تشغيل الخادم. يمكننا تعزيز هذا الحافز من خلال جعل الخادم ينشر سند توافر يمكن لأي شخص حرقه إذا لم تتم معالجة معاملة قسرية خلال فترة معينة.

### رمز Noir سيئ {#bad-noir-code}

عادة، لجعل الناس يثقون في عقد ذكي، نقوم بتحميل الرمز المصدري إلى [مستكشف كتل](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). ولكن، في حالة إثباتات المعرفة الصفرية، هذا غير كافٍ.

يحتوي `Verifier.sol` على مفتاح التحقق، وهو دالة لبرنامج Noir. ولكن، هذا المفتاح لا يخبرنا بما كان عليه برنامج Noir. للحصول على حل موثوق به فعليًا، تحتاج إلى تحميل برنامج Noir (والإصدار الذي أنشأه). خلاف ذلك، قد تعكس إثباتات المعرفة الصفرية برنامجًا مختلفًا، برنامجًا به باب خلفي.

حتى يبدأ مستكشفو الكتل في السماح لنا بتحميل برامج Noir والتحقق منها، يجب عليك القيام بذلك بنفسك (ويفضل أن يكون ذلك على [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). بعد ذلك، سيتمكن المستخدمون المتطورون من تنزيل الرمز المصدري، وتجميعه بأنفسهم، وإنشاء `Verifier.sol`، والتحقق من أنه مطابق للرمز الموجود على السلسلة.

## الخلاصة {#conclusion}

تتطلب التطبيقات من نوع Plasma مكونًا مركزيًا لتخزين المعلومات. يفتح هذا ثغرات أمنية محتملة ولكن، في المقابل، يسمح لنا بالحفاظ على الخصوصية بطرق غير متوفرة على البلوكتشين نفسه. باستخدام إثباتات المعرفة الصفرية، يمكننا ضمان النزاهة وربما جعلها مفيدة اقتصاديًا لمن يدير المكون المركزي للحفاظ على التوافر.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).

## شكر وتقدير {#acknowledgements}

- قرأ Josh Crites مسودة هذا المقال وساعدني في حل مشكلة شائكة في Noir.

أي أخطاء متبقية هي مسؤوليتي.
