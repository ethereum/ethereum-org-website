---
title: "استخدام العناوين المتخفية"
description: "تتيح العناوين المتخفية للمستخدمين تحويل الأصول بشكل مجهول. بعد قراءة هذا المقال، ستتمكن من: شرح ماهية العناوين المتخفية وكيفية عملها، وفهم كيفية استخدام العناوين المتخفية بطريقة تحافظ على إخفاء الهوية، وكتابة تطبيق ويب يستخدم العناوين المتخفية."
author: "أوري بوميرانتس"
tags: ["عنوان متخفي", "الخصوصية", "علم التشفير", "Rust", "wasm"]
skill: intermediate
breadcrumb: "العناوين المتخفية"
published: 2025-11-30
lang: ar
sidebarDepth: 3
---

أنت بيل. لأسباب لن نخوض فيها، تريد التبرع لحملة "أليس لملكة العالم" وتريد أن تعرف أليس أنك تبرعت حتى تمنحك مكافأة إذا فازت. لسوء الحظ، فوزها ليس مضمونًا. هناك حملة منافسة، "كارول لإمبراطورة النظام الشمسي". إذا فازت كارول، واكتشفت أنك تبرعت لأليس، فستكون في ورطة. لذلك لا يمكنك ببساطة تحويل <span dir="ltr">200 ETH</span> من حسابك إلى حساب أليس.

يقدم [<span dir="ltr">ERC-5564</span>](https://eips.ethereum.org/EIPS/eip-5564) الحل. يشرح هذا الـ ERC كيفية استخدام [العناوين المتخفية](https://nerolation.github.io/stealth-utils) من أجل تحويل مجهول الهوية.

**تحذير**: علم التشفير وراء العناوين المتخفية سليم، على حد علمنا. ومع ذلك، هناك هجمات قناة جانبية محتملة. [أدناه](#go-wrong)، سترى ما يمكنك القيام به لتقليل هذه المخاطر.

## كيف تعمل العناوين المتخفية {#how}

سيحاول هذا المقال شرح العناوين المتخفية بطريقتين. الأولى هي [كيفية استخدامها](#how-use). هذا الجزء كافٍ لفهم بقية المقال. ثم، هناك [شرح للرياضيات وراءها](#how-math). إذا كنت مهتمًا بـ علم التشفير، فاقرأ هذا الجزء أيضًا. 

### النسخة المبسطة (كيفية استخدام العناوين المتخفية) {#how-use}

تنشئ أليس مفتاحين خاصين وتنشر المفاتيح العامة المقابلة (والتي يمكن دمجها في عنوان وصفي واحد مزدوج الطول). ينشئ بيل أيضًا مفتاحًا خاصًا وينشر المفتاح العام المقابل.

باستخدام مفتاح عام لأحد الأطراف ومفتاح خاص للطرف الآخر، يمكنك استنتاج سر مشترك لا يعرفه سوى أليس وبيل (لا يمكن استنتاجه من المفاتيح العامة وحدها). باستخدام هذا السر المشترك، يحصل بيل على عنوان متخفي ويمكنه إرسال الأصول إليه.

تحصل أليس أيضًا على العنوان من السر المشترك، ولكن لأنها تعرف المفاتيح الخاصة للمفاتيح العامة التي نشرتها، يمكنها أيضًا الحصول على مفتاح خاص الذي يتيح لها السحب من ذلك العنوان.

### الرياضيات (لماذا تعمل العناوين المتخفية بهذا الشكل) {#how-math}

تستخدم العناوين المتخفية القياسية [تشفير المنحنى الإهليلجي (<span dir="ltr">ECC</span>)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) للحصول على أداء أفضل مع عدد أقل من بتات المفاتيح، مع الحفاظ على نفس مستوى الأمان. ولكن في الغالب يمكننا تجاهل ذلك والتظاهر بأننا نستخدم الحساب العادي.

هناك رقم يعرفه الجميع، *<span dir="ltr">G</span>*. يمكنك الضرب في *<span dir="ltr">G</span>*. ولكن بسبب طبيعة <span dir="ltr">ECC</span>، من المستحيل عمليًا القسمة على *<span dir="ltr">G</span>*. الطريقة التي يعمل بها تشفير المفتاح العام بشكل عام في إيثيريوم هي أنه يمكنك استخدام مفتاح خاص، *<span dir="ltr">P<sub>priv</sub></span>*، لتوقيع المعاملات التي يتم التحقق منها بعد ذلك بواسطة مفتاح عام، *<span dir="ltr">P<sub>pub</sub> = GP<sub>priv</sub></span>*. 

تنشئ أليس مفتاحين خاصين، *<span dir="ltr">K<sub>priv</sub></span>* و *<span dir="ltr">V<sub>priv</sub></span>*. سيتم استخدام *<span dir="ltr">K<sub>priv</sub></span>* لإنفاق الأموال من العنوان المتخفي، و *<span dir="ltr">V<sub>priv</sub></span>* لعرض العناوين التي تنتمي إلى أليس. ثم تنشر أليس المفاتيح العامة: *<span dir="ltr">K<sub>pub</sub> = GK<sub>priv</sub></span>* و *<span dir="ltr">V<sub>pub</sub> = GV<sub>priv</sub></span>*

ينشئ بيل مفتاحًا خاصًا ثالثًا، *<span dir="ltr">R<sub>priv</sub></span>*، وينشر *<span dir="ltr">R<sub>pub</sub> = GR<sub>priv</sub></span>* في سجل مركزي (كان بإمكان بيل أيضًا إرساله إلى أليس، لكننا نفترض أن كارول تستمع).

يحسب بيل *<span dir="ltr">R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>*، والذي يتوقع أن تعرفه أليس أيضًا (موضح أدناه). تسمى هذه القيمة *<span dir="ltr">S</span>*، السر المشترك. يمنح هذا بيل مفتاحًا عامًا، *<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>*. من هذا المفتاح العام، يمكنه حساب عنوان وإرسال أي موارد يريدها إليه. في المستقبل، إذا فازت أليس، يمكن لبيل أن يخبرها بـ *<span dir="ltr">R<sub>priv</sub></span>* لإثبات أن الموارد جاءت منه.

تحسب أليس *<span dir="ltr">R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>*. هذا يمنحها نفس السر المشترك، *<span dir="ltr">S</span>*. ولأنها تعرف المفتاح الخاص، *<span dir="ltr">K<sub>priv</sub></span>*، يمكنها حساب *<span dir="ltr">P<sub>priv</sub> = K<sub>priv</sub>+hash(S)</span>*. يتيح لها هذا المفتاح الوصول إلى الأصول في العنوان الذي ينتج عن *<span dir="ltr">P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)</span>*.

لدينا مفتاح عرض منفصل للسماح لأليس بالتعاقد من الباطن مع خدمات حملة ديف للسيطرة على العالم. أليس مستعدة للسماح لديف بمعرفة العناوين العامة وإبلاغها عند توفر المزيد من الأموال، لكنها لا تريده أن ينفق أموال حملتها.

نظرًا لأن العرض والإنفاق يستخدمان مفاتيح منفصلة، يمكن لأليس إعطاء ديف *<span dir="ltr">V<sub>priv</sub></span>*. ثم يمكن لديف حساب *<span dir="ltr">S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>* وبهذه الطريقة يحصل على المفاتيح العامة (*<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>*). ولكن بدون *<span dir="ltr">K<sub>priv</sub></span>* لا يمكن لديف الحصول على المفتاح الخاص.

باختصار، هذه هي القيم التي يعرفها المشاركون المختلفون.

| أليس | منشور | بيل | ديف |
| - | - | - | - |
| <span dir="ltr">G</span> | <span dir="ltr">G</span> | <span dir="ltr">G</span> | <span dir="ltr">G</span> |
| *<span dir="ltr">K<sub>priv</sub></span>* | - | - | - | 
| *<span dir="ltr">V<sub>priv</sub></span>* | - | - | *<span dir="ltr">V<sub>priv</sub></span>* |
| *<span dir="ltr">K<sub>pub</sub> = GK<sub>priv</sub></span>* | *<span dir="ltr">K<sub>pub</sub></span>* | *<span dir="ltr">K<sub>pub</sub></span>* | *<span dir="ltr">K<sub>pub</sub></span>* |
| *<span dir="ltr">V<sub>pub</sub> = GV<sub>priv</sub></span>* | *<span dir="ltr">V<sub>pub</sub></span>* | *<span dir="ltr">V<sub>pub</sub></span>* | *<span dir="ltr">V<sub>pub</sub></span>* |
| - | - | *<span dir="ltr">R<sub>priv</sub></span>* | - |
| *<span dir="ltr">R<sub>pub</sub></span>* | *<span dir="ltr">R<sub>pub</sub></span>* | *<span dir="ltr">R<sub>pub</sub> = GR<sub>priv</sub></span>* | *<span dir="ltr">R<sub>pub</sub></span>* |
| *<span dir="ltr">S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>* | - | *<span dir="ltr">S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub></span>* | *<span dir="ltr">S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub></span>* |
| *<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>* | - | *<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>* | *<span dir="ltr">P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)</span>* |
| *<span dir="ltr">Address=f(P<sub>pub</sub>)</span>* | - | *<span dir="ltr">Address=f(P<sub>pub</sub>)</span>* | *<span dir="ltr">Address=f(P<sub>pub</sub>)</span>* | *<span dir="ltr">Address=f(P<sub>pub</sub>)</span>*
| *<span dir="ltr">P<sub>priv</sub> = K<sub>priv</sub>+hash(S)</span>* | - | - | - |

## عندما تسير الأمور بشكل خاطئ مع العناوين المتخفية {#go-wrong}

*لا توجد أسرار على سلسلة الكتل*. في حين أن العناوين المتخفية يمكن أن توفر لك الخصوصية، فإن هذه الخصوصية عرضة لتحليل حركة المرور. لنأخذ مثالاً بسيطًا، تخيل أن بيل يمول عنوانًا ويرسل على الفور معاملة لنشر قيمة *<span dir="ltr">R<sub>pub</sub></span>*. بدون *<span dir="ltr">V<sub>priv</sub></span>* الخاص بـ أليس، لا يمكننا التأكد من أن هذا عنوان متخفي، ولكن هذا هو الاحتمال الأرجح. ثم، نرى معاملة أخرى تقوم بـ تحويل كل الـ <span dir="ltr">ETH</span> من ذلك العنوان إلى عنوان صندوق حملة أليس. قد لا نتمكن من إثبات ذلك، ولكن من المحتمل أن بيل قد تبرع للتو لحملة أليس. من المؤكد أن كارول ستعتقد ذلك.

من السهل على بيل فصل نشر *<span dir="ltr">R<sub>pub</sub></span>* عن تمويل العنوان المتخفي (القيام بهما في أوقات مختلفة، ومن عناوين مختلفة). ومع ذلك، هذا غير كافٍ. النمط الذي تبحث عنه كارول هو أن بيل يمول عنوانًا، ثم يسحب صندوق حملة أليس منه. 

أحد الحلول هو ألا تسحب حملة أليس الأموال مباشرة، بل تستخدمها للدفع لطرف ثالث. إذا أرسلت حملة أليس <span dir="ltr">10 ETH</span> إلى خدمات حملة ديف للسيطرة على العالم، فإن كارول تعرف فقط أن بيل تبرع لأحد عملاء ديف. إذا كان لدى ديف عدد كافٍ من العملاء، فلن تتمكن كارول من معرفة ما إذا كان بيل قد تبرع لأليس التي تتنافس معها، أو لآدم أو ألبرت أو أبيجيل الذين لا تهتم بهم كارول. يمكن لأليس تضمين قيمة تجزئة مع الدفعة، ثم تزويد ديف بالصورة المسبقة (preimage)، لإثبات أنها كانت تبرعها. بدلاً من ذلك، كما لوحظ أعلاه، إذا أعطت أليس ديف *<span dir="ltr">V<sub>priv</sub></span>* الخاص بها، فهو يعرف بالفعل من أين جاءت الدفعة.

المشكلة الرئيسية في هذا الحل هي أنه يتطلب من أليس الاهتمام بالسرية عندما تفيد هذه السرية بيل. قد ترغب أليس في الحفاظ على سمعتها حتى يتبرع لها بوب صديق بيل أيضًا. ولكن من الممكن أيضًا ألا تمانع في فضح بيل، لأنه حينها سيخاف مما سيحدث إذا فازت كارول. قد ينتهي الأمر ببيل بتقديم المزيد من الدعم لأليس.

### استخدام طبقات تخفي متعددة {#multi-layer}

بدلاً من الاعتماد على أليس للحفاظ على الخصوصية الخاصة بـ بيل، يمكن لبيل القيام بذلك بنفسه. يمكنه إنشاء عناوين وصفية متعددة لأشخاص خياليين، بوب وبيلا. ثم يرسل بيل <span dir="ltr">ETH</span> إلى بوب، و"بوب" (وهو في الواقع بيل) يرسله إلى بيلا. "بيلا" (وهي أيضًا بيل) ترسله إلى أليس.

لا يزال بإمكان كارول إجراء تحليل لحركة المرور ورؤية مسار بيل-إلى-بوب-إلى-بيلا-إلى-أليس. ومع ذلك، إذا استخدم "بوب" و"بيلا" أيضًا <span dir="ltr">ETH</span> لأغراض أخرى، فلن يبدو أن بيل قد قام بـ تحويل أي شيء إلى أليس، حتى لو سحبت أليس على الفور من العنوان المتخفي إلى عنوان حملتها المعروف.

## كتابة تطبيق للعنوان المتخفي {#write-app}

يشرح هذا المقال تطبيقًا للعنوان المتخفي [متاحًا على <span dir="ltr">GitHub</span>](https://github.com/qbzzt/251022-stealth-addresses.git). 

### الأدوات {#tools}

هناك [مكتبة عناوين متخفية بـ <span dir="ltr">TypeScript</span>](https://github.com/ScopeLift/stealth-address-sdk) يمكننا استخدامها. ومع ذلك، يمكن أن تكون عمليات علم التشفير مكثفة لوحدة المعالجة المركزية. أفضل تنفيذها بلغة مجمعة، مثل [<span dir="ltr">Rust</span>](https://rust-lang.org/)، واستخدام [<span dir="ltr">WASM</span>](https://webassembly.org/) لتشغيل الكود في المتصفح.

سنستخدم [<span dir="ltr">Vite</span>](https://vite.dev/) و [<span dir="ltr">React</span>](https://react.dev/). هذه أدوات متوافقة مع معايير الصناعة؛ إذا لم تكن على دراية بها، يمكنك استخدام [هذا البرنامج التعليمي](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). لاستخدام <span dir="ltr">Vite</span>، نحتاج إلى <span dir="ltr">Node</span>.

### رؤية العناوين المتخفية أثناء العمل {#in-action}

1. قم بتثبيت الأدوات اللازمة: [<span dir="ltr">Rust</span>](https://rust-lang.org/tools/install/) و [<span dir="ltr">Node</span>](https://nodejs.org/en/download).

2. استنسخ مستودع <span dir="ltr">GitHub</span>.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. قم بتثبيت المتطلبات الأساسية وتجميع كود <span dir="ltr">Rust</span>.

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

5. تصفح إلى [التطبيق](http://localhost:5173/). تحتوي صفحة التطبيق هذه على إطارين: أحدهما لواجهة مستخدم أليس والآخر لواجهة بيل. الإطاران لا يتواصلان؛ هما فقط في نفس الصفحة للراحة.

6. بصفتك أليس، انقر فوق **Generate a Stealth Meta-Address** (إنشاء عنوان وصفي متخفي). سيعرض هذا العنوان المتخفي الجديد والمفاتيح الخاصة المقابلة. انسخ العنوان الوصفي المتخفي إلى الحافظة.

7. بصفتك بيل، الصق العنوان الوصفي المتخفي الجديد وانقر فوق **Generate an address** (إنشاء عنوان). يمنحك هذا العنوان لتمويله لأليس. 

8. انسخ العنوان والمفتاح العام الخاص بـ بيل والصقهما في منطقة "Private key for address generated by Bill" (المفتاح الخاص للعنوان الذي أنشأه بيل) في واجهة مستخدم أليس. بمجرد ملء هذه الحقول، سترى المفتاح الخاص للوصول إلى الأصول في ذلك العنوان.

9. يمكنك استخدام [آلة حاسبة عبر الإنترنت](https://iancoleman.net/ethereum-private-key-to-address/) للتأكد من أن المفتاح الخاص يتوافق مع العنوان.

### كيف يعمل البرنامج {#how-the-program-works}

#### مكون WASM {#wasm}

الكود المصدري الذي يتم تجميعه في <span dir="ltr">WASM</span> مكتوب بلغة [<span dir="ltr">Rust</span>](https://rust-lang.org/). يمكنك رؤيته في [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). هذا الكود هو في الأساس واجهة بين كود <span dir="ltr">JavaScript</span> و [مكتبة `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) في <span dir="ltr">Rust</span> يشبه [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) في <span dir="ltr">JavaScript</span>. يحتوي على معلومات الحزمة، وإعلانات التبعية، إلخ.

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

تحتاج حزمة [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) إلى إنشاء قيم عشوائية. لا يمكن القيام بذلك بوسائل خوارزمية بحتة؛ فهو يتطلب الوصول إلى عملية فيزيائية كمصدر لـ إنتروبيا. يحدد هذا التعريف أننا سنحصل على هذه الـ إنتروبيا عن طريق سؤال المتصفح الذي نعمل فيه.

```toml
console_error_panic_hook = "0.1.7"
```

تمنحنا [هذه المكتبة](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) رسائل خطأ ذات مغزى أكبر عندما يصاب كود <span dir="ltr">WASM</span> بالذعر (panics) ولا يمكنه الاستمرار.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

نوع المخرجات المطلوب لإنتاج كود <span dir="ltr">WASM</span>.

**`lib.rs`**

هذا هو كود <span dir="ltr">Rust</span> الفعلي.

```rust
use wasm_bindgen::prelude::*;
```

التعريفات لإنشاء حزمة <span dir="ltr">WASM</span> من <span dir="ltr">Rust</span>. وهي موثقة [هنا](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

الدوال التي نحتاجها من [مكتبة `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

تستخدم <span dir="ltr">Rust</span> عادةً [مصفوفات](https://doc.rust-lang.org/std/primitive.array.html) البايت (`[u8; <size>]`) للقيم. ولكن في <span dir="ltr">JavaScript</span>، نستخدم عادةً السلاسل السداسية العشرية. تترجم [مكتبة `hex`](https://docs.rs/hex/latest/hex/) لنا من تمثيل إلى آخر.

```rust
#[wasm_bindgen]
```

قم بإنشاء روابط <span dir="ltr">WASM</span> لتتمكن من استدعاء هذه الدالة من <span dir="ltr">JavaScript</span>.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

أسهل طريقة لإرجاع كائن بحقول متعددة هي إرجاع سلسلة <span dir="ltr">JSON</span>. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

تُرجع [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) ثلاثة حقول:

- العنوان الوصفي (*<span dir="ltr">K<sub>pub</sub></span>* و *<span dir="ltr">V<sub>pub</sub></span>*)
- المفتاح الخاص للعرض (*<span dir="ltr">V<sub>priv</sub></span>*)
- المفتاح الخاص للإنفاق (*<span dir="ltr">K<sub>priv</sub></span>*)

تتيح لنا صيغة [الصفوف (tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) فصل هذه القيم مرة أخرى.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

استخدم ماكرو [`format!`](https://doc.rust-lang.org/std/fmt/index.html) لإنشاء السلسلة المشفرة بـ <span dir="ltr">JSON</span>. استخدم [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) لتغيير المصفوفات إلى سلاسل سداسية عشرية.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

تحول هذه الدالة سلسلة سداسية عشرية (مقدمة من <span dir="ltr">JavaScript</span>) إلى مصفوفة بايت. نستخدمها لتحليل القيم المقدمة بواسطة كود <span dir="ltr">JavaScript</span>. هذه الدالة معقدة بسبب كيفية تعامل <span dir="ltr">Rust</span> مع المصفوفات والمتجهات.

يُطلق على تعبير `<const N: usize>` اسم [عام (generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` هو معلمة تتحكم في طول المصفوفة المرجعة. تسمى الدالة في الواقع `str_to_array::<n>`، حيث `n` هو طول المصفوفة.

القيمة المرجعة هي `Option<[u8; N]>`، مما يعني أن المصفوفة المرجعة [اختيارية](https://doc.rust-lang.org/std/option/). هذا نمط نموذجي في <span dir="ltr">Rust</span> للدوال التي قد تفشل.

على سبيل المثال، إذا استدعينا `str_to_array::10("bad060a7")`، فمن المفترض أن تُرجع الدالة مصفوفة من عشر قيم، لكن الإدخال هو أربعة بايتات فقط. يجب أن تفشل الدالة، وتفعل ذلك عن طريق إرجاع `None`. ستكون القيمة المرجعة لـ `str_to_array::4("bad060a7")` هي `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // تُرجع decode Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

تُرجع دالة [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) `Result<Vec<u8>, FromHexError>`. يمكن أن يحتوي نوع [`Result`](https://doc.rust-lang.org/std/result/) إما على نتيجة ناجحة (`Ok(value)`) أو خطأ (`Err(error)`).

تحول طريقة `.ok()` الـ `Result` إلى `Option`، والتي تكون قيمتها إما قيمة `Ok()` إذا نجحت أو `None` إذا لم تنجح. أخيرًا، يقوم [عامل علامة الاستفهام](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) بإحباط الدوال الحالية وإرجاع `None` إذا كان `Option` فارغًا. بخلاف ذلك، فإنه يفك تغليف القيمة ويرجعها (في هذه الحالة، لتعيين قيمة لـ `vec`).

تبدو هذه طريقة معقدة بشكل غريب للتعامل مع الأخطاء، لكن `Result` و `Option` يضمنان التعامل مع جميع الأخطاء، بطريقة أو بأخرى.

```rust
    if vec.len() != N { return None; }
```

إذا كان عدد البايتات غير صحيح، فهذا فشل، ونرجع `None`.

```rust
    // تستهلك try_into vec وتحاول إنشاء [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

تحتوي <span dir="ltr">Rust</span> على نوعين من المصفوفات. [المصفوفات (Arrays)](https://doc.rust-lang.org/std/primitive.array.html) لها حجم ثابت. يمكن أن تنمو [المتجهات (Vectors)](https://doc.rust-lang.org/std/vec/index.html) وتتقلص. تُرجع `hex::decode` متجهًا، لكن مكتبة `eth_stealth_addresses` تريد تلقي مصفوفات. تقوم [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) بتحويل قيمة إلى نوع آخر، على سبيل المثال، متجه إلى مصفوفة.

```rust
    Some(array)
}
```

لا تتطلب منك <span dir="ltr">Rust</span> استخدام الكلمة الأساسية [`return`](https://doc.rust-lang.org/std/keyword.return.html) عند إرجاع قيمة في نهاية الدالة.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

تتلقى هذه الدالة عنوانًا وصفيًا عامًا، والذي يتضمن كلاً من *<span dir="ltr">V<sub>pub</sub></span>* و *<span dir="ltr">K<sub>pub</sub></span>*. تُرجع العنوان المتخفي، والمفتاح العام المراد نشره (*<span dir="ltr">R<sub>pub</sub></span>*)، وقيمة مسح ضوئي من بايت واحد تسرع من تحديد العناوين المنشورة التي قد تنتمي إلى أليس.

قيمة المسح الضوئي هي جزء من السر المشترك (*<span dir="ltr">S = GR<sub>priv</sub>V<sub>priv</sub></span>*). هذه القيمة متاحة لأليس، والتحقق منها أسرع بكثير من التحقق مما إذا كان *<span dir="ltr">f(K<sub>pub</sub>+G\*hash(S))</span>* يساوي العنوان المنشور.

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

قم بإعداد سلسلة المخرجات المشفرة بـ <span dir="ltr">JSON</span>.

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

تستخدم هذه الدالة [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) الخاصة بالمكتبة لحساب المفتاح الخاص للسحب من العنوان (*<span dir="ltr">R<sub>priv</sub></span>*). يتطلب هذا الحساب هذه القيم:

- العنوان (*<span dir="ltr">Address=f(P<sub>pub</sub>)</span>*)
- المفتاح العام الذي أنشأه بيل (*<span dir="ltr">R<sub>pub</sub></span>*)
- المفتاح الخاص للعرض (*<span dir="ltr">V<sub>priv</sub></span>*)
- المفتاح الخاص للإنفاق (*<span dir="ltr">K<sub>priv</sub></span>*)

```rust
#[wasm_bindgen(start)]
```

يحدد [`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) أنه يتم تنفيذ الدالة عند تهيئة كود <span dir="ltr">WASM</span>.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

يحدد هذا الكود إرسال مخرجات الذعر (panic) إلى وحدة تحكم <span dir="ltr">JavaScript</span>. لرؤية ذلك أثناء العمل، استخدم التطبيق وامنح بيل عنوانًا وصفيًا غير صالح (فقط قم بتغيير رقم سداسي عشري واحد). سترى هذا الخطأ في وحدة تحكم <span dir="ltr">JavaScript</span>:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

متبوعًا بتتبع المكدس (stack trace). ثم امنح بيل العنوان الوصفي الصالح، وامنح أليس إما عنوانًا غير صالح أو مفتاحًا عامًا غير صالح. سترى هذا الخطأ:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

مرة أخرى، متبوعًا بتتبع المكدس.

#### واجهة المستخدم {#ui}

واجهة المستخدم مكتوبة باستخدام [<span dir="ltr">React</span>](https://react.dev/) ويتم تقديمها بواسطة [<span dir="ltr">Vite</span>](https://vite.dev/). يمكنك التعرف عليها باستخدام [هذا البرنامج التعليمي](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). ليست هناك حاجة لـ [<span dir="ltr">Wagmi</span>](https://wagmi.sh/) هنا لأننا لا نتفاعل مباشرة مع سلسلة الكتل أو محفظة.

الجزء الوحيد غير الواضح في واجهة المستخدم هو اتصال <span dir="ltr">WASM</span>. إليك كيف يعمل.

**`vite.config.js`**

يحتوي هذا الملف على [تكوين <span dir="ltr">Vite</span>](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

نحتاج إلى إضافتين لـ <span dir="ltr">Vite</span>: [react](https://www.npmjs.com/package/@vitejs/plugin-react) و [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

هذا الملف هو المكون الرئيسي للتطبيق. إنه حاوية تتضمن مكونين: `Alice` و `Bill`، وهما واجهتا المستخدم لهؤلاء المستخدمين. الجزء ذو الصلة بـ <span dir="ltr">WASM</span> هو كود التهيئة.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

عندما نستخدم [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/)، فإنه ينشئ ملفين نستخدمهما هنا: ملف <span dir="ltr">wasm</span> يحتوي على الكود الفعلي (هنا، `src/rust-wasm/pkg/rust_wasm_bg.wasm`) وملف <span dir="ltr">JavaScript</span> يحتوي على التعريفات لاستخدامه (هنا، `src/rust_wasm/pkg/rust_wasm.js`). التصدير الافتراضي لملف <span dir="ltr">JavaScript</span> هذا هو الكود الذي يجب تشغيله لبدء <span dir="ltr">WASM</span>.

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

يتيح لك [خطاف (hook) `useEffect`](https://react.dev/reference/react/useEffect) تحديد دالة يتم تنفيذها عندما تتغير متغيرات الحالة (state). هنا، قائمة متغيرات الحالة فارغة (`[]`)، لذلك يتم تنفيذ هذه الدالة مرة واحدة فقط عند تحميل الصفحة.

يجب أن تعود دالة التأثير (effect) على الفور. لاستخدام كود غير متزامن، مثل `init` الخاص بـ <span dir="ltr">WASM</span> (والذي يجب أن يحمل ملف `.wasm` وبالتالي يستغرق وقتًا) نحدد دالة [`async`](https://en.wikipedia.org/wiki/Async/await) داخلية ونقوم بتشغيلها بدون `await`.

**`Bill.jsx`**

هذه هي واجهة المستخدم الخاصة بـ بيل. لها إجراء واحد، وهو إنشاء عنوان بناءً على العنوان الوصفي المتخفي الذي قدمته أليس.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

بالإضافة إلى التصدير الافتراضي، يقوم كود <span dir="ltr">JavaScript</span> الذي تم إنشاؤه بواسطة `wasm-pack` بتصدير دالة لكل دالة في كود <span dir="ltr">WASM</span>.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

لاستدعاء دوال <span dir="ltr">WASM</span>، نقوم فقط باستدعاء الدالة المصدرة بواسطة ملف <span dir="ltr">JavaScript</span> الذي تم إنشاؤه بواسطة `wasm-pack`.

**`Alice.jsx`**

الكود في `Alice.jsx` مشابه، باستثناء أن أليس لديها إجراءان:

- إنشاء عنوان وصفي
- الحصول على المفتاح الخاص لعنوان نشره بيل

## الخاتمة {#conclusion}

العناوين المتخفية ليست حلاً سحريًا؛ يجب [استخدامها بشكل صحيح](#go-wrong). ولكن عند استخدامها بشكل صحيح، يمكنها تمكين الخصوصية على سلسلة الكتل العامة.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).