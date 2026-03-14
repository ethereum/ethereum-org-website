---
title: "استخدام عناوين التخفي"
description: "تسمح عناوين التخفي للمستخدمين بنقل الأصول بشكل مجهول. بعد قراءة هذا المقال، ستكون قادرًا على: شرح ماهية عناوين التخفي وكيفية عملها، وفهم كيفية استخدام عناوين التخفي بطريقة تحافظ على الخصوصية، وكتابة تطبيق ويب يستخدم عناوين التخفي."
author: Ori Pomerantz
tags:
  [
    "عنوان التخفي",
    "الخصوصية",
    "علم التشفير",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: ar
sidebarDepth: 3
---

أنت بيل. لأسباب لن نخوض فيها، تريد التبرع لحملة "أليس من أجل ملكة العالم" وأن تعلم أليس أنك تبرعت حتى تكافئك إذا فازت. لسوء الحظ، فوزها غير مضمون. هناك حملة منافسة، "كارول من أجل إمبراطورة النظام الشمسي". إذا فازت كارول، واكتشفت أنك تبرعت لأليس، فستقع في ورطة. لذلك لا يمكنك ببساطة تحويل 200 ETH من حسابك إلى حساب أليس.

لدى [ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) الحل. يشرح ERC هذا كيفية استخدام [عناوين التخفي](https://nerolation.github.io/stealth-utils) للتحويل المجهول.

**تحذير**: علم التشفير وراء عناوين التخفي، على حد علمنا، سليم. ومع ذلك، هناك هجمات محتملة عبر القنوات الجانبية. [أدناه](#go-wrong)، سترى ما يمكنك فعله لتقليل هذا الخطر.

## كيفية عمل عناوين التخفي {#how}

سيحاول هذا المقال شرح عناوين التخفي بطريقتين. الأولى هي [كيفية استخدامها](#how-use). هذا الجزء كافٍ لفهم بقية المقال. ثم، هناك [شرح للرياضيات التي تقف وراءها](#how-math). إذا كنت مهتمًا بعلم التشفير، فاقرأ هذا الجزء أيضًا.

### النسخة المبسطة (كيفية استخدام عناوين التخفي) {#how-use}

تنشئ أليس مفتاحين خاصين وتنشر المفاتيح العامة المقابلة (والتي يمكن دمجها في عنوان meta-address واحد مزدوج الطول). ينشئ بيل أيضًا مفتاحًا خاصًا وينشر المفتاح العام المقابل.

باستخدام المفتاح العام لأحد الطرفين والمفتاح الخاص للطرف الآخر، يمكنك اشتقاق سر مشترك لا يعرفه سوى أليس وبيل (لا يمكن اشتقاقه من المفاتيح العامة وحدها). باستخدام هذا السر المشترك، يحصل بيل على عنوان التخفي ويمكنه إرسال الأصول إليه.

تحصل أليس أيضًا على العنوان من السر المشترك، ولكن لأنها تعرف المفاتيح الخاصة للمفاتيح العامة التي نشرتها، يمكنها أيضًا الحصول على المفتاح الخاص الذي يسمح لها بالسحب من هذا العنوان.

### الرياضيات (لماذا تعمل عناوين التخفي بهذه الطريقة) {#how-math}

تستخدم عناوين التخفي القياسية [تشفير المنحنى الإهليلجي (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) للحصول على أداء أفضل مع عدد أقل من بتات المفتاح، مع الحفاظ على نفس مستوى الأمان. ولكن في معظم الأحيان يمكننا تجاهل ذلك والتظاهر بأننا نستخدم الحساب العادي.

هناك رقم يعرفه الجميع، _G_. يمكنك الضرب في _G_. ولكن بسبب طبيعة ECC، من المستحيل عمليًا القسمة على _G_. الطريقة التي يعمل بها تشفير المفتاح العام بشكل عام في إيثريوم هي أنه يمكنك استخدام مفتاح خاص، _P<sub>priv</sub>_، لتوقيع المعاملات التي يتم التحقق منها بعد ذلك بواسطة مفتاح عام، _P<sub>pub</sub> = GP<sub>priv</sub>_.

تنشئ أليس مفتاحين خاصين، _K<sub>priv</sub>_ و _V<sub>priv</sub>_. سيتم استخدام _K<sub>priv</sub>_ لإنفاق الأموال من عنوان التخفي، و_V<sub>priv</sub>_ لعرض العناوين التي تنتمي إلى أليس. ثم تنشر أليس المفاتيح العامة: _K<sub>pub</sub> = GK<sub>priv</sub>_ و _V<sub>pub</sub> = GV<sub>priv</sub>_

ينشئ بيل مفتاحًا خاصًا ثالثًا، _R<sub>priv</sub>_، وينشر _R<sub>pub</sub> = GR<sub>priv</sub>_ في سجل مركزي (كان بإمكان بيل أيضًا إرساله إلى أليس، لكننا نفترض أن كارول تستمع).

يحسب بيل _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_، وهو ما يتوقع أن تعرفه أليس أيضًا (مشروح أدناه). تسمى هذه القيمة _S_، السر المشترك. هذا يعطي بيل مفتاحًا عامًا، _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_. من هذا المفتاح العام، يمكنه حساب عنوان وإرسال أي موارد يريدها إليه. في المستقبل، إذا فازت أليس، يمكن لبيل أن يخبرها بـ _R<sub>priv</sub>_ لإثبات أن الموارد جاءت منه.

تحسب أليس _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. وهذا يعطيها نفس السر المشترك، _S_. لأنها تعرف المفتاح الخاص، _K<sub>priv</sub>_، يمكنها حساب _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_. يسمح لها هذا المفتاح بالوصول إلى الأصول الموجودة في العنوان الناتج عن _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_.

لدينا مفتاح عرض منفصل للسماح لأليس بالتعاقد من الباطن مع خدمات حملة Dave للسيطرة على العالم. أليس على استعداد لإبلاغ Dave بالعناوين العامة وإبلاغها عند توفر المزيد من الأموال، لكنها لا تريده أن ينفق أموال حملتها.

لأن العرض والإنفاق يستخدمان مفاتيح منفصلة، يمكن لأليس أن تعطي Dave _V<sub>priv</sub>_. ثم يمكن لـ Dave حساب _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ وبهذه الطريقة يحصل على المفاتيح العامة (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_). ولكن بدون _K<sub>priv</sub>_ لا يستطيع Dave الحصول على المفتاح الخاص.

للتلخيص، هذه هي القيم التي يعرفها المشاركون المختلفون.

| أليس                                                                      | منشور             | بيل                                                                       | ديف                                                                         |                                                 |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                 |
| _K<sub>priv</sub>_                                                        | ـ                 | ـ                                                                         | ـ                                                                           |                                                 |
| _V<sub>priv</sub>_                                                        | ـ                 | ـ                                                                         | _V<sub>priv</sub>_                                                          |                                                 |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                 |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                 |
| ـ                                                                         | ـ                 | _R<sub>priv</sub>_                                                        | ـ                                                                           |                                                 |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                 |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | ـ                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                 |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | ـ                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                                 |
| _Address=f(P<sub>pub</sub>)_                           | ـ                 | _Address=f(P<sub>pub</sub>)_                           | _Address=f(P<sub>pub</sub>)_                             | _Address=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | ـ                 | ـ                                                                         | ـ                                                                           |                                                 |

## عندما تسوء عناوين التخفي {#go-wrong}

_لا توجد أسرار على البلوكتشين_. بينما يمكن أن توفر لك عناوين التخفي الخصوصية، فإن هذه الخصوصية عرضة لتحليل حركة المرور. لاختيار مثال تافه، تخيل أن بيل يمول عنوانًا ويرسل على الفور معاملة لنشر قيمة _R<sub>pub</sub>_. بدون _V<sub>priv</sub>_ الخاص بأليس، لا يمكننا التأكد من أن هذا عنوان تخفي، ولكن هذا هو الرهان الأرجح. بعد ذلك، نرى معاملة أخرى تحول كل ETH من هذا العنوان إلى عنوان صندوق حملة أليس. قد لا نتمكن من إثبات ذلك، ولكن من المحتمل أن بيل قد تبرع للتو لحملة أليس. بالتأكيد ستفكر كارول كذلك.

من السهل على بيل فصل نشر _R<sub>pub</sub>_ عن تمويل عنوان التخفي (القيام بهما في أوقات مختلفة، ومن عناوين مختلفة). ومع ذلك، هذا غير كاف. النمط الذي تبحث عنه كارول هو أن بيل يمول عنوانًا، ثم يسحب صندوق حملة أليس منه.

أحد الحلول هو ألا تسحب حملة أليس الأموال مباشرة، بل تستخدمها للدفع لطرف ثالث. إذا أرسلت حملة أليس 10 ETH إلى خدمات حملة Dave للسيطرة على العالم، فإن كارول تعرف فقط أن بيل تبرع لأحد عملاء Dave. إذا كان لدى Dave عدد كافٍ من العملاء، فلن تتمكن كارول من معرفة ما إذا كان بيل قد تبرع لأليس التي تتنافس معها، أو لآدم أو ألبرت أو أبيجيل الذين لا تهتم بهم كارول. يمكن لأليس تضمين قيمة مجزأة مع الدفعة، ثم تزويد Dave بالصورة الأولية، لإثبات أنها كانت تبرعها. بدلاً من ذلك، كما هو مذكور أعلاه، إذا أعطت أليس لـ Dave مفتاحها _V<sub>priv</sub>_، فهو يعرف بالفعل من أين جاءت الدفعة.

المشكلة الرئيسية في هذا الحل هي أنه يتطلب من أليس الاهتمام بالسرية عندما تفيد هذه السرية بيل. قد ترغب أليس في الحفاظ على سمعتها حتى يتبرع لها صديق بيل، بوب، أيضًا. ولكن من الممكن أيضًا ألا تمانع في فضح بيل، لأنه حينها سيخاف مما سيحدث إذا فازت كارول. قد ينتهي الأمر ببيل بتقديم المزيد من الدعم لأليس.

### استخدام طبقات تخفي متعددة {#multi-layer}

بدلاً من الاعتماد على أليس للحفاظ على خصوصية بيل، يمكن لبيل أن يفعل ذلك بنفسه. يمكنه إنشاء عناوين meta-addresses متعددة لأشخاص وهميين، بوب وبيلا. ثم يرسل بيل ETH إلى بوب، و"بوب" (وهو في الواقع بيل) يرسله إلى بيلا. "بيلا" (وهي أيضًا بيل) ترسلها إلى أليس.

لا يزال بإمكان كارول إجراء تحليل لحركة المرور ورؤية خط أنابيب بيل-إلى-بوب-إلى-بيلا-إلى-أليس. ومع ذلك، إذا استخدم "بوب" و"بيلا" أيضًا ETH لأغراض أخرى، فلن يظهر أن بيل قد حول أي شيء إلى أليس، حتى لو سحبت أليس على الفور من عنوان التخفي إلى عنوان حملتها المعروف.

## كتابة تطبيق عنوان تخفي {#write-app}

يشرح هذا المقال تطبيق عنوان تخفي [متوفر على GitHub](https://github.com/qbzzt/251022-stealth-addresses.git).

### أدوات {#tools}

هناك [مكتبة عناوين تخفي typescript](https://github.com/ScopeLift/stealth-address-sdk) يمكننا استخدامها. ومع ذلك، يمكن أن تكون العمليات المشفرة كثيفة الاستخدام لوحدة المعالجة المركزية. أفضل تنفيذها بلغة مجمعة، مثل [Rust](https://rust-lang.org/)، واستخدام [WASM](https://webassembly.org/) لتشغيل النص البرمجي في المتصفح.

سنستخدم [Vite](https://vite.dev/) و [React](https://react.dev/). هذه أدوات قياسية في الصناعة؛ إذا لم تكن على دراية بها، يمكنك استخدام [هذا البرنامج التعليمي](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). لاستخدام Vite، نحتاج إلى Node.

### شاهد عناوين التخفي أثناء العمل {#in-action}

1. قم بتثبيت الأدوات اللازمة: [Rust](https://rust-lang.org/tools/install/) و [Node](https://nodejs.org/en/download).

2. استنسخ مستودع GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. قم بتثبيت المتطلبات الأساسية وتجميع كود Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. ابدأ خادم الويب.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. تصفح [التطبيق](http://localhost:5173/). تحتوي صفحة التطبيق هذه على إطارين: أحدهما لواجهة مستخدم أليس والآخر لواجهة مستخدم بيل. لا يتواصل الإطاران؛ إنهما على نفس الصفحة فقط للراحة.

6. بصفتك أليس، انقر فوق **إنشاء عنوان Meta-Address للتخفي**. سيعرض هذا عنوان التخفي الجديد والمفاتيح الخاصة المقابلة. انسخ عنوان meta-address التخفي إلى الحافظة.

7. بصفتك بيل، الصق عنوان meta-address التخفي الجديد وانقر فوق **إنشاء عنوان**. يمنحك هذا العنوان لتمويل أليس.

8. انسخ العنوان والمفتاح العام لبيل والصقهما في منطقة "المفتاح الخاص للعنوان الذي أنشأه بيل" في واجهة مستخدم أليس. بمجرد ملء هذه الحقول، سترى المفتاح الخاص للوصول إلى الأصول الموجودة في ذلك العنوان.

9. يمكنك استخدام [آلة حاسبة عبر الإنترنت](https://iancoleman.net/ethereum-private-key-to-address/) للتأكد من أن المفتاح الخاص يتوافق مع العنوان.

### كيفية عمل البرنامج {#how-the-program-works}

#### مكون WASM {#wasm}

كود المصدر الذي يتم تجميعه في WASM مكتوب بلغة [Rust](https://rust-lang.org/). يمكنك رؤيته في [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). هذا الكود هو في المقام الأول واجهة بين كود JavaScript و [مكتبة `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) في Rust يشبه [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) في JavaScript. يحتوي على معلومات الحزمة، وإعلانات التبعية، وما إلى ذلك.

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

تحتاج حزمة [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) إلى إنشاء قيم عشوائية. لا يمكن القيام بذلك بوسائل خوارزمية بحتة؛ فهو يتطلب الوصول إلى عملية مادية كمصدر للإنتروبيا. يحدد هذا التعريف أننا سنحصل على تلك الإنتروبيا عن طريق سؤال المتصفح الذي نعمل فيه.

```toml
console_error_panic_hook = "0.1.7"
```

تمنحنا [هذه المكتبة](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) رسائل خطأ ذات مغزى أكبر عندما يصاب كود WASM بالذعر ولا يمكنه المتابعة.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

نوع الإخراج المطلوب لإنتاج كود WASM.

**`lib.rs`**

هذا هو كود Rust الفعلي.

```rust
use wasm_bindgen::prelude::*;
```

التعريفات لإنشاء حزمة WASM من Rust. وهي موثقة [هنا](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

الوظائف التي نحتاجها من [مكتبة `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

تستخدم Rust عادةً [مصفوفات](https://doc.rust-lang.org/std/primitive.array.html) بايت (`[u8; <size>]`) للقيم. ولكن في JavaScript، نستخدم عادةً سلاسل سداسية عشرية. تترجم لنا [مكتبة `hex`](https://docs.rs/hex/latest/hex/) من تمثيل إلى آخر.

```rust
#[wasm_bindgen]
```

قم بإنشاء روابط WASM لتتمكن من استدعاء هذه الوظيفة من JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

أسهل طريقة لإرجاع كائن بحقول متعددة هي إرجاع سلسلة JSON.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

تُرجع [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) ثلاثة حقول:

- العنوان الوصفي (_K<sub>pub</sub>_ و _V<sub>pub</sub>_)
- مفتاح العرض الخاص (_V<sub>priv</sub>_)
- مفتاح الإنفاق الخاص (_K<sub>priv</sub>_)

يسمح لنا بناء جملة [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) بفصل هذه القيم مرة أخرى.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

استخدم ماكرو [`format!`](https://doc.rust-lang.org/std/fmt/index.html) لإنشاء السلسلة المشفرة بـ JSON. استخدم [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) لتغيير المصفوفات إلى سلاسل سداسية عشرية.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

تحول هذه الدالة سلسلة سداسية عشرية (مقدمة من JavaScript) إلى مصفوفة بايت. نستخدمها لتحليل القيم المقدمة من كود JavaScript. هذه الدالة معقدة بسبب كيفية تعامل Rust مع المصفوفات والمتجهات.

يُطلق على التعبير `<const N: usize>` اسم [عام](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` هي معلمة تتحكم في طول المصفوفة المرتجعة. الدالة تسمى في الواقع `str_to_array::<n>`، حيث `n` هو طول المصفوفة.

القيمة المرتجعة هي `Option<[u8; N]>`، مما يعني أن المصفوفة المرتجعة [اختيارية](https://doc.rust-lang.org/std/option/). هذا نمط نموذجي في Rust للوظائف التي قد تفشل.

على سبيل المثال، إذا استدعينا `str_to_array::10("bad060a7")`، فمن المفترض أن ترجع الدالة مصفوفة من عشر قيم، لكن الإدخال هو أربعة بايت فقط. يجب أن تفشل الدالة، وهي تفعل ذلك عن طريق إرجاع `None`. القيمة المرتجعة لـ `str_to_array::4("bad060a7")` ستكون `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

تُرجع الدالة [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) `Result<Vec<u8>, FromHexError>`. يمكن أن يحتوي نوع [`Result`](https://doc.rust-lang.org/std/result/) إما على نتيجة ناجحة (`Ok(value)`) أو خطأ (`Err(error)`).

يحول الأسلوب `.ok()` `Result` إلى `Option`، وقيمته هي إما قيمة `Ok()` إذا نجحت أو `None` إذا لم تنجح. أخيرًا، يقوم [عامل علامة الاستفهام](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) بإيقاف الوظائف الحالية وإرجاع `None` إذا كان `Option` فارغًا. خلاف ذلك، فإنه يفك القيمة ويعيدها (في هذه الحالة، لتعيين قيمة لـ `vec`).

تبدو هذه طريقة معقدة بشكل غريب للتعامل مع الأخطاء، لكن `Result` و`Option` يضمنان معالجة جميع الأخطاء، بطريقة أو بأخرى.

```rust
    if vec.len() != N { return None; }
```

إذا كان عدد البايتات غير صحيح، فهذا فشل، ونقوم بإرجاع `None`.

```rust
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

لدى Rust نوعان من المصفوفات. [المصفوفات](https://doc.rust-lang.org/std/primitive.array.html) لها حجم ثابت. يمكن أن تنمو [المتجهات](https://doc.rust-lang.org/std/vec/index.html) وتتقلص. تُرجع `hex::decode` متجهًا، لكن مكتبة `eth_stealth_addresses` تريد استقبال مصفوفات. يحول [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) قيمة إلى نوع آخر، على سبيل المثال، متجه إلى مصفوفة.

```rust
    Some(array)
}
```

لا تتطلب منك Rust استخدام الكلمة المفتاحية [`return`](https://doc.rust-lang.org/std/keyword.return.html) عند إرجاع قيمة في نهاية دالة.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

تتلقى هذه الدالة عنوان meta-address عامًا، والذي يتضمن كلاً من _V<sub>pub</sub>_ و _K<sub>pub</sub>_. ترجع عنوان التخفي، والمفتاح العام للنشر (_R<sub>pub</sub>_)، وقيمة مسح من بايت واحد تسرع من تحديد العناوين المنشورة التي قد تنتمي إلى أليس.

قيمة المسح جزء من السر المشترك (_S = GR<sub>priv</sub>V<sub>priv</sub>_). هذه القيمة متاحة لأليس، والتحقق منها أسرع بكثير من التحقق مما إذا كانت _f(K<sub>pub</sub>+G\*hash(S))_ تساوي العنوان المنشور.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

نستخدم [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) الخاصة بالمكتبة.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

قم بإعداد سلسلة الإخراج المشفرة بـ JSON.

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

تستخدم هذه الدالة [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) من المكتبة لحساب المفتاح الخاص للسحب من العنوان (_R<sub>priv</sub>_). يتطلب هذا الحساب القيم التالية:

- العنوان (_Address=f(P<sub>pub</sub>)_)
- المفتاح العام الذي أنشأه بيل (_R<sub>pub</sub>_)
- مفتاح العرض الخاص (_V<sub>priv</sub>_)
- مفتاح الإنفاق الخاص (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

يحدد [`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) أن الدالة يتم تنفيذها عند تهيئة كود WASM.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

يحدد هذا الكود إرسال مخرجات الذعر إلى وحدة تحكم JavaScript. لرؤيته أثناء العمل، استخدم التطبيق وأعط بيل عنوانًا غير صالح لـ meta-address (فقط قم بتغيير رقم سداسي عشري واحد). سترى هذا الخطأ في وحدة تحكم JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

يتبعها تتبع المكدس. ثم أعط بيل عنوان meta-address صالحًا، وأعط أليس إما عنوانًا غير صالح أو مفتاحًا عامًا غير صالح. سترى هذا الخطأ:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

مرة أخرى، يتبعها تتبع المكدس.

#### واجهة المستخدم {#ui}

واجهة المستخدم مكتوبة باستخدام [React](https://react.dev/) ويتم تقديمها بواسطة [Vite](https://vite.dev/). يمكنك التعرف عليها باستخدام [هذا البرنامج التعليمي](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). ليست هناك حاجة لـ [WAGMI](https://wagmi.sh/) هنا لأننا لا نتفاعل مباشرة مع بلوكتشين أو محفظة.

الجزء الوحيد غير الواضح في واجهة المستخدم هو اتصال WASM. إليك كيفية عمله.

**`vite.config.js`**

يحتوي هذا الملف على [تكوين Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

نحتاج إلى مكونين إضافيين لـ Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) و [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

هذا الملف هو المكون الرئيسي للتطبيق. إنه حاوية تتضمن مكونين: `Alice` و `Bill`، واجهات المستخدم لهؤلاء المستخدمين. الجزء ذو الصلة بـ WASM هو كود التهيئة.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

عندما نستخدم [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/)، فإنه ينشئ ملفين نستخدمهما هنا: ملف wasm يحتوي على الكود الفعلي (هنا، `src/rust-wasm/pkg/rust_wasm_bg.wasm`) وملف JavaScript يحتوي على التعريفات اللازمة لاستخدامه (هنا، `src/rust_wasm/pkg/rust_wasm.js`). التصدير الافتراضي لملف JavaScript هذا هو الكود الذي يجب تشغيله لبدء WASM.

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

يتيح لك [خطاف `useEffect`](https://react.dev/reference/react/useEffect) تحديد دالة يتم تنفيذها عند تغيير متغيرات الحالة. هنا، قائمة متغيرات الحالة فارغة (`[]`)، لذلك يتم تنفيذ هذه الدالة مرة واحدة فقط عند تحميل الصفحة.

يجب أن تعود دالة التأثير على الفور. لاستخدام كود غير متزامن، مثل `init` الخاص بـ WASM (الذي يجب عليه تحميل ملف `.wasm` وبالتالي يستغرق وقتًا) ، نحدد دالة [`async`](https://en.wikipedia.org/wiki/Async/await) داخلية ونقوم بتشغيلها بدون `await`.

**`Bill.jsx`**

هذه هي واجهة المستخدم لبيل. لديها إجراء واحد، وهو إنشاء عنوان بناءً على عنوان meta-address التخفي الذي قدمته أليس.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

بالإضافة إلى التصدير الافتراضي، يصدر كود JavaScript الذي تم إنشاؤه بواسطة `wasm-pack` دالة لكل دالة في كود WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

لاستدعاء دوال WASM، نستدعي ببساطة الدالة التي تم تصديرها بواسطة ملف JavaScript الذي أنشأه `wasm-pack`.

**`Alice.jsx`**

الكود في `Alice.jsx` مشابه، باستثناء أن أليس لديها إجراءان:

- إنشاء عنوان meta-address
- الحصول على المفتاح الخاص لعنوان نشره بيل

## الخلاصة {#conclusion}

عناوين التخفي ليست حلاً سحريًا؛ يجب [استخدامها بشكل صحيح](#go-wrong). ولكن عند استخدامها بشكل صحيح، يمكنها تمكين الخصوصية على بلوكتشين عام.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).