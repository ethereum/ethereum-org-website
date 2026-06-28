---
title: "الهندسة العكسية لعقد"
description: "كيفية فهم عقد عندما لا يكون لديك كود المصدر"
author: "أوري بوميرانتس"
lang: ar
tags: ["evm", "رموز التشغيل"]
skill: advanced
breadcrumb: "الهندسة العكسية"
published: 2021-12-30
---
## المقدمة {#introduction}

_لا توجد أسرار على سلسلة الكتل_، كل ما يحدث يكون متسقًا، وقابلاً للتحقق، ومتاحًا للجمهور. في الوضع المثالي، [يجب أن تكون العقود قد نُشر كود المصدر الخاص بها وتم التحقق منه على <span dir="ltr">Etherscan</span>](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). ومع ذلك، [ليس هذا هو الحال دائمًا](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). في هذه المقالة ستتعلم كيفية إجراء الهندسة العكسية للعقود من خلال النظر إلى عقد بدون كود المصدر، [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

توجد مترجمات عكسية، لكنها لا تنتج دائمًا [نتائج قابلة للاستخدام](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). في هذه المقالة ستتعلم كيفية إجراء الهندسة العكسية يدويًا وفهم عقد من خلال [رموز التشغيل](https://github.com/wolflo/evm-opcodes)، بالإضافة إلى كيفية تفسير نتائج المترجم العكسي.

لتتمكن من فهم هذه المقالة، يجب أن تكون على دراية بأساسيات <span dir="ltr">EVM</span>، وأن تكون ملمًا إلى حد ما بلغة التجميع الخاصة بـ <span dir="ltr">EVM</span>. [يمكنك القراءة عن هذه المواضيع هنا](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## إعداد الكود القابل للتنفيذ {#prepare-the-executable-code}

يمكنك الحصول على رموز التشغيل بالانتقال إلى <span dir="ltr">Etherscan</span> للعقد، والنقر على علامة التبويب **<span dir="ltr">Contract</span>** ثم **<span dir="ltr">Switch to Opcodes View</span>**. ستحصل على عرض يحتوي على رمز تشغيل واحد في كل سطر.

![Opcode View from Etherscan](opcode-view.png)

ولكن لتتمكن من فهم القفزات، تحتاج إلى معرفة موقع كل رمز تشغيل في الكود. للقيام بذلك، إحدى الطرق هي فتح جدول بيانات <span dir="ltr">Google</span> ولصق رموز التشغيل في العمود <span dir="ltr">C</span>. [يمكنك تخطي الخطوات التالية عن طريق إنشاء نسخة من جدول البيانات المُعد مسبقًا هذا](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

الخطوة التالية هي الحصول على مواقع الكود الصحيحة حتى نتمكن من فهم القفزات. سنضع حجم رمز التشغيل في العمود <span dir="ltr">B</span>، والموقع (بالنظام السداسي عشري) في العمود <span dir="ltr">A</span>. اكتب هذه الدالة في الخلية `B1` ثم انسخها والصقها لبقية العمود <span dir="ltr">B</span>، حتى نهاية الكود. بعد القيام بذلك، يمكنك إخفاء العمود <span dir="ltr">B</span>.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

أولاً، تضيف هذه الدالة بايتًا واحدًا لرمز التشغيل نفسه، ثم تبحث عن `PUSH`. تعتبر رموز التشغيل <span dir="ltr">PUSH</span> خاصة لأنها تحتاج إلى بايتات إضافية للقيمة التي يتم دفعها. إذا كان رمز التشغيل هو `PUSH`، فإننا نستخرج عدد البايتات ونضيفه.

في `A1` ضع الإزاحة الأولى، صفر. ثم، في `A2`، ضع هذه الدالة وانسخها والصقها مرة أخرى لبقية العمود <span dir="ltr">A</span>:

```
=dec2hex(hex2dec(A1)+B1)
```

نحتاج إلى هذه الدالة لتعطينا القيمة السداسية العشرية لأن القيم التي يتم دفعها قبل القفزات (`JUMP` و `JUMPI`) تُعطى لنا بالنظام السداسي عشري.

## نقطة الدخول (<span dir="ltr">0x00</span>) {#the-entry-point-0x00}

يتم تنفيذ العقود دائمًا من البايت الأول. هذا هو الجزء الأولي من الكود:

| الإزاحة | رمز التشغيل | المكدس (بعد رمز التشغيل) |
| -----: | ------------ | ------------------------ |
| 0 | PUSH1 0x80 | <span dir="ltr">0x80</span> |
| 2 | PUSH1 0x40 | <span dir="ltr">0x40, 0x80</span> |
| 4 | MSTORE | فارغ |
| 5 | PUSH1 0x04 | <span dir="ltr">0x04</span> |
| 7 | CALLDATASIZE | <span dir="ltr">CALLDATASIZE 0x04</span> |
| 8 | LT | <span dir="ltr">CALLDATASIZE\<4</span> |
| 9 | PUSH2 0x005e | <span dir="ltr">0x5E CALLDATASIZE\<4</span> |
| C | JUMPI | فارغ |

يقوم هذا الكود بشيئين:

1. كتابة <span dir="ltr">0x80</span> كقيمة بحجم <span dir="ltr">32 byte</span> في مواقع الذاكرة <span dir="ltr">0x40-0x5F</span> (يتم تخزين <span dir="ltr">0x80</span> في <span dir="ltr">0x5F</span>، وتكون المواقع <span dir="ltr">0x40-0x5E</span> كلها أصفارًا).
2. قراءة حجم بيانات الاستدعاء. عادةً ما تتبع بيانات الاستدعاء لعقد إيثريوم [واجهة التطبيق الثنائية (ABI)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)، والتي تتطلب كحد أدنى أربعة بايتات لمُحدد الدالة. إذا كان حجم بيانات الاستدعاء أقل من أربعة، انتقل إلى <span dir="ltr">0x5E</span>.

![Flowchart for this portion](flowchart-entry.png)

### المعالج عند <span dir="ltr">0x5E</span> (لبيانات الاستدعاء غير التابعة لـ ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| الإزاحة | رمز التشغيل |
| -----: | ------------ |
| 5E | JUMPDEST |
| 5F | CALLDATASIZE |
| 60 | PUSH2 0x007c |
| 63 | JUMPI |

تبدأ هذه المقتطفة بـ `JUMPDEST`. تُلقي برامج آلة إيثريوم الافتراضية (EVM) استثناءً إذا انتقلت إلى رمز تشغيل ليس `JUMPDEST`. ثم تنظر إلى CALLDATASIZE، وإذا كانت "صحيحة" (أي ليست صفرًا) تنتقل إلى <span dir="ltr">0x7C</span>. سنصل إلى ذلك أدناه.

| الإزاحة | رمز التشغيل | المكدس (بعد رمز التشغيل) |
| -----: | ---------- | -------------------------------------------------------------------------- |
| 64 | CALLVALUE | [Wei](/glossary/#wei) المقدمة بواسطة الاستدعاء. تُسمى `msg.value` في Solidity |
| 65 | PUSH1 0x06 | <span dir="ltr">6 CALLVALUE</span> |
| 67 | PUSH1 0x00 | <span dir="ltr">0 6 CALLVALUE</span> |
| 69 | DUP3 | <span dir="ltr">CALLVALUE 0 6 CALLVALUE</span> |
| 6A | DUP3 | <span dir="ltr">6 CALLVALUE 0 6 CALLVALUE</span> |
| 6B | SLOAD | <span dir="ltr">Storage[6] CALLVALUE 0 6 CALLVALUE</span> |

لذا عندما لا توجد بيانات استدعاء، نقرأ قيمة <span dir="ltr">Storage[6]</span>. لا نعرف ما هي هذه القيمة بعد، ولكن يمكننا البحث عن المعاملات التي تلقاها العقد بدون بيانات استدعاء. المعاملات التي تقوم فقط بتحويل ETH بدون أي بيانات استدعاء (وبالتالي بدون طريقة) تظهر في Etherscan بالطريقة `Transfer`. في الواقع، [أول معاملة تلقاها العقد على الإطلاق](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) هي تحويل.

إذا نظرنا في تلك المعاملة ونقرنا على **Click to see More** (انقر لرؤية المزيد)، نرى أن بيانات الاستدعاء، والتي تسمى بيانات الإدخال، فارغة بالفعل (`0x`). لاحظ أيضًا أن القيمة هي <span dir="ltr">1.559 ETH</span>، وسيكون ذلك ذا صلة لاحقًا.

![The call data is empty](calldata-empty.png)

بعد ذلك، انقر فوق علامة التبويب **State** (الحالة) وقم بتوسيع العقد الذي نقوم بهندسته العكسية (<span dir="ltr">0x2510...</span>). يمكنك أن ترى أن `Storage[6]` قد تغيرت بالفعل أثناء المعاملة، وإذا قمت بتغيير Hex (النظام السداسي عشري) إلى **Number** (رقم)، فسترى أنها أصبحت <span dir="ltr">1,559,000,000,000,000,000</span>، وهي القيمة المحولة بوحدة wei (أضفت الفواصل للتوضيح)، والتي تتوافق مع قيمة العقد التالية.

![التغيير في Storage[6]](storage6.png)

إذا نظرنا في تغييرات الحالة الناتجة عن [معاملات `Transfer` أخرى من نفس الفترة](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)، نرى أن `Storage[6]` تتبعت قيمة العقد لفترة من الوقت. في الوقت الحالي سنسميها `Value*`. تذكرنا العلامة النجمية (`*`) بأننا لا _نعرف_ ما يفعله هذا المتغير بعد، ولكن لا يمكن أن يكون مجرد تتبع لقيمة العقد لأنه لا توجد حاجة لاستخدام التخزين، وهو مكلف للغاية، عندما يمكنك الحصول على رصيد حساباتك باستخدام `ADDRESS BALANCE`. يدفع رمز التشغيل الأول عنوان العقد نفسه. ويقرأ الثاني العنوان الموجود في أعلى المكدس ويستبدله برصيد ذلك العنوان.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | ------------------------------------------- |
| 6C | PUSH2 0x0075 | <span dir="ltr">0x75 Value\* CALLVALUE 0 6 CALLVALUE</span> |
| 6F | SWAP2 | <span dir="ltr">CALLVALUE Value\* 0x75 0 6 CALLVALUE</span> |
| 70 | SWAP1 | <span dir="ltr">Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 71 | PUSH2 0x01a7 | <span dir="ltr">0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 74 | JUMP |

سنستمر في تتبع هذا الكود عند وجهة الانتقال.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ---------- | ----------------------------------------------------------- |
| 1A7 | JUMPDEST | <span dir="ltr">Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1A8 | PUSH1 0x00 | <span dir="ltr">0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1AA | DUP3 | <span dir="ltr">CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1AB | NOT | <span dir="ltr">2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |

العملية `NOT` هي عملية على مستوى البت (bitwise)، لذا فهي تعكس قيمة كل بت في قيمة الاستدعاء.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | --------------------------------------------------------------------------- |
| 1AC | DUP3 | <span dir="ltr">Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1AD | GT | <span dir="ltr">Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1AE | ISZERO | <span dir="ltr">Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1AF | PUSH2 0x01df | <span dir="ltr">0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1B2 | JUMPI |

ننتقل إذا كانت `Value*` أصغر من <span dir="ltr">2^256-CALLVALUE-1</span> أو تساويها. يبدو هذا كمنطق لمنع تجاوز السعة (overflow). وبالفعل، نرى أنه بعد بضع عمليات غير منطقية (الكتابة في الذاكرة على وشك أن تُحذف، على سبيل المثال) عند الإزاحة <span dir="ltr">0x01DE</span>، يتراجع العقد إذا تم اكتشاف تجاوز السعة، وهو سلوك طبيعي.

لاحظ أن حدوث مثل هذا التجاوز في السعة مستبعد للغاية، لأنه سيتطلب أن تكون قيمة الاستدعاء بالإضافة إلى `Value*` قابلة للمقارنة بـ <span dir="ltr">2^256 wei</span>، أي حوالي <span dir="ltr">10^59 ETH</span>. [إجمالي المعروض من ETH، وقت الكتابة، أقل من مائتي مليون](https://etherscan.io/stat/supply).

| الإزاحة | رمز التشغيل | المكدس |
| -----: | -------- | ----------------------------------------- |
| 1DF | JUMPDEST | <span dir="ltr">0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1E0 | POP | <span dir="ltr">Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1E1 | ADD | <span dir="ltr">Value\*+CALLVALUE 0x75 0 6 CALLVALUE</span> |
| 1E2 | SWAP1 | <span dir="ltr">0x75 Value\*+CALLVALUE 0 6 CALLVALUE</span> |
| 1E3 | JUMP |

إذا وصلنا إلى هنا، احصل على `Value* + CALLVALUE` وانتقل إلى الإزاحة <span dir="ltr">0x75</span>.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | -------- | ------------------------------- |
| 75 | JUMPDEST | <span dir="ltr">Value\*+CALLVALUE 0 6 CALLVALUE</span> |
| 76 | SWAP1 | <span dir="ltr">0 Value\*+CALLVALUE 6 CALLVALUE</span> |
| 77 | SWAP2 | <span dir="ltr">6 Value\*+CALLVALUE 0 CALLVALUE</span> |
| 78 | SSTORE | <span dir="ltr">0 CALLVALUE</span> |

إذا وصلنا إلى هنا (وهو ما يتطلب أن تكون بيانات الاستدعاء فارغة) فإننا نضيف إلى `Value*` قيمة الاستدعاء. هذا يتوافق مع ما نقوله عن ما تفعله معاملات `Transfer`.

| الإزاحة | رمز التشغيل |
| -----: | ------ |
| 79 | POP |
| 7A | POP |
| 7B | STOP |

أخيرًا، قم بمسح المكدس (وهو أمر غير ضروري) وأشر إلى النهاية الناجحة للمعاملة.

لتلخيص كل ذلك، إليك مخطط انسيابي للكود الأولي.

![Entry point flowchart](flowchart-entry.png)

## المعالج عند <span dir="ltr">0x7C</span> {#the-handler-at-0x7c}

لم أضع عمدًا في العنوان ما يفعله هذا المعالج. الهدف ليس تعليمك كيف يعمل هذا العقد المحدد، بل كيفية الهندسة العكسية للعقود. ستتعلم ما يفعله بنفس الطريقة التي تعلمت بها، من خلال تتبع الكود.

نصل إلى هنا من عدة أماكن:

- إذا كانت هناك بيانات استدعاء بحجم 1 أو 2 أو 3 بايت (من الإزاحة <span dir="ltr">0x63</span>)
- إذا كان توقيع الطريقة غير معروف (من الإزاحات <span dir="ltr">0x42</span> و <span dir="ltr">0x5D</span>)

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

هذه خلية تخزين أخرى، لم أتمكن من العثور عليها في أي معاملات، لذا من الصعب معرفة ما تعنيه. الكود أدناه سيوضح ذلك.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

تقوم رموز التشغيل هذه باقتطاع القيمة التي قرأناها من <span dir="ltr">Storage[3]</span> إلى 160 بت، وهو طول عنوان إيثريوم.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

هذه القفزة زائدة عن الحاجة، لأننا سننتقل إلى رمز التشغيل التالي. هذا الكود ليس فعالاً من حيث استهلاك الغاز كما ينبغي أن يكون.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

في بداية الكود تمامًا، قمنا بتعيين <span dir="ltr">Mem[0x40]</span> إلى <span dir="ltr">0x80</span>. إذا بحثنا عن <span dir="ltr">0x40</span> لاحقًا، فسنرى أننا لم نقم بتغييره - لذا يمكننا افتراض أنه <span dir="ltr">0x80</span>.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

انسخ جميع بيانات الاستدعاء إلى الذاكرة، بدءًا من <span dir="ltr">0x80</span>.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

الآن أصبحت الأمور أكثر وضوحًا. يمكن أن يعمل هذا العقد كـ [وكيل](https://blog.openzeppelin.com/proxy-patterns/)، حيث يستدعي العنوان الموجود في <span dir="ltr">Storage[3]</span> للقيام بالعمل الحقيقي. يستدعي `DELEGATE_CALL` عقدًا منفصلاً، ولكنه يبقى في نفس مساحة التخزين. هذا يعني أن العقد المفوض، الذي نعمل كوكيل له، يصل إلى نفس مساحة التخزين. معلمات الاستدعاء هي:

- _الغاز_: كل الغاز المتبقي
- _العنوان المستدعى_: <span dir="ltr">Storage[3]-as-address</span>
- _بيانات الاستدعاء_: بايتات <span dir="ltr">CALLDATASIZE</span> بدءًا من <span dir="ltr">0x80</span>، وهو المكان الذي وضعنا فيه بيانات الاستدعاء الأصلية
- _بيانات الإرجاع_: لا شيء (<span dir="ltr">0x00 - 0x00</span>) سنحصل على بيانات الإرجاع بوسائل أخرى (انظر أدناه)

| الإزاحة | رمز التشغيل | المكدس |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

هنا نقوم بنسخ جميع بيانات الإرجاع إلى المخزن المؤقت للذاكرة بدءًا من <span dir="ltr">0x80</span>.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

لذا بعد الاستدعاء، نقوم بنسخ بيانات الإرجاع إلى المخزن المؤقت <span dir="ltr">0x80 - 0x80+RETURNDATASIZE</span>، وإذا كان الاستدعاء ناجحًا، فإننا نقوم بـ `RETURN` باستخدام هذا المخزن المؤقت بالضبط.

### فشل <span dir="ltr">DELEGATECALL</span> {#delegatecall-failed}

إذا وصلنا إلى هنا، إلى <span dir="ltr">0xC0</span>، فهذا يعني أن العقد الذي استدعيناه قد تراجع. وبما أننا مجرد وكيل لهذا العقد، فإننا نريد إرجاع نفس البيانات والتراجع أيضًا.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |

لذا نقوم بـ `REVERT` بنفس المخزن المؤقت الذي استخدمناه لـ `RETURN` سابقًا: <span dir="ltr">0x80 - 0x80+RETURNDATASIZE</span>

![Call to proxy flowchart](flowchart-proxy.png)

## استدعاءات <span dir="ltr">ABI</span> {#abi-calls}

إذا كان حجم بيانات الاستدعاء أربعة بايتات أو أكثر، فقد يكون هذا استدعاء <span dir="ltr">ABI</span> صالحًا.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | ------------------------------------------------- |
| <span dir="ltr">D</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0x00</span> |
| <span dir="ltr">F</span> | <span dir="ltr">CALLDATALOAD</span> | (((الكلمة الأولى (256 بت) من بيانات الاستدعاء))) |
| <span dir="ltr">10</span> | <span dir="ltr">PUSH1 0xe0</span> | <span dir="ltr">0xE0</span> (((الكلمة الأولى (256 بت) من بيانات الاستدعاء))) |
| <span dir="ltr">12</span> | <span dir="ltr">SHR</span> | (((أول 32 بت (4 بايتات) من بيانات الاستدعاء))) |

يخبرنا Etherscan أن `1C` هو رمز تشغيل غير معروف، لأنه [تمت إضافته بعد أن برمج Etherscan هذه الميزة](https://eips.ethereum.org/EIPS/eip-145) ولم يقوموا بتحديثها. يوضح لنا [جدول رموز التشغيل المُحدَّث](https://github.com/wolflo/evm-opcodes) أن هذا يعني إزاحة لليمين.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
| <span dir="ltr">13</span> | <span dir="ltr">DUP1</span> | (((أول 32 بت (4 بايتات) من بيانات الاستدعاء))) (((أول 32 بت (4 بايتات) من بيانات الاستدعاء))) |
| <span dir="ltr">14</span> | <span dir="ltr">PUSH4 0x3cd8045e</span> | <span dir="ltr">0x3CD8045E</span> (((أول 32 بت (4 بايتات) من بيانات الاستدعاء))) (((أول 32 بت (4 بايتات) من بيانات الاستدعاء))) |
| <span dir="ltr">19</span> | <span dir="ltr">GT</span> | <span dir="ltr">0x3CD8045E>first-32-bits-of-the-call-data</span> (((أول 32 بت (4 بايتات) من بيانات الاستدعاء))) |
| <span dir="ltr">1A</span> | <span dir="ltr">PUSH2 0x0043</span> | <span dir="ltr">0x43 0x3CD8045E>first-32-bits-of-the-call-data</span> (((أول 32 بت (4 بايتات) من بيانات الاستدعاء))) |
| <span dir="ltr">1D</span> | <span dir="ltr">JUMPI</span> | (((أول 32 بت (4 بايتات) من بيانات الاستدعاء))) |

من خلال تقسيم اختبارات مطابقة توقيع الطريقة إلى قسمين بهذا الشكل، يتم توفير نصف الاختبارات في المتوسط. يتبع الكود الذي يلي هذا مباشرة والكود الموجود في <span dir="ltr">0x43</span> نفس النمط: `DUP1` أول 32 بت من بيانات الاستدعاء، `PUSH4 (((method signature>`، ثم تشغيل `EQ` للتحقق من التطابق، وبعد ذلك `JUMPI` إذا كان توقيع الطريقة متطابقًا. إليك تواقيع الطرق، وعناوينها، و[تعريف الطريقة المقابل](https://www.4byte.directory/) إذا كان معروفًا:

| الطريقة | توقيع الطريقة | الإزاحة للانتقال إليها |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [<span dir="ltr">splitter()</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e) | <span dir="ltr">0x3cd8045e</span> | <span dir="ltr">0x0103</span> |
| ??? | <span dir="ltr">0x81e580d3</span> | <span dir="ltr">0x0138</span> |
| [<span dir="ltr">currentWindow()</span>](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | <span dir="ltr">0xba0bafb4</span> | <span dir="ltr">0x0158</span> |
| ??? | <span dir="ltr">0x1f135823</span> | <span dir="ltr">0x00C4</span> |
| [<span dir="ltr">merkleRoot()</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab) | <span dir="ltr">0x2eb4a7ab</span> | <span dir="ltr">0x00ED</span> |

إذا لم يتم العثور على تطابق، ينتقل الكود إلى [معالج الوكيل عند <span dir="ltr">0x7C</span>](#the-handler-at-0x7c)، على أمل أن يكون لدى العقد الذي نعمل كوكيل له تطابق.

![ABI calls flowchart](flowchart-abi.png)

## <span dir="ltr">splitter()</span> {#splitter}

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | ----------------------------- |
| 103 | JUMPDEST | |
| 104 | CALLVALUE | CALLVALUE |
| 105 | DUP1 | CALLVALUE CALLVALUE |
| 106 | ISZERO | <span dir="ltr">CALLVALUE==0</span> CALLVALUE |
| 107 | PUSH2 0x010f | 0x010F <span dir="ltr">CALLVALUE==0</span> CALLVALUE |
| 10A | JUMPI | CALLVALUE |
| 10B | PUSH1 0x00 | 0x00 CALLVALUE |
| 10D | DUP1 | 0x00 0x00 CALLVALUE |
| 10E | REVERT | |

أول شيء تفعله هذه الدالة هو التحقق من أن الاستدعاء لم يرسل أي ETH. هذه الدالة ليست [`payable`](https://solidity-by-example.org/payable/). إذا أرسل لنا شخص ما ETH، فلا بد أن يكون ذلك خطأ ونريد التراجع (`REVERT`) لتجنب بقاء ETH في مكان لا يمكنهم استرداده منه.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
| 10F | JUMPDEST | |
| 110 | POP | |
| 111 | PUSH1 0x03 | 0x03 |
| 113 | SLOAD | (((Storage[3] المعروف أيضًا باسم العقد الذي نعتبر عقد وكيل له))) |
| 114 | PUSH1 0x40 | 0x40 (((Storage[3] المعروف أيضًا باسم العقد الذي نعتبر عقد وكيل له))) |
| 116 | MLOAD | 0x80 (((Storage[3] المعروف أيضًا باسم العقد الذي نعتبر عقد وكيل له))) |
| 117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] المعروف أيضًا باسم العقد الذي نعتبر عقد وكيل له))) |
| 12C | SWAP1 | 0x80 0xFF...FF (((Storage[3] المعروف أيضًا باسم العقد الذي نعتبر عقد وكيل له))) |
| 12D | SWAP2 | (((Storage[3] المعروف أيضًا باسم العقد الذي نعتبر عقد وكيل له))) 0xFF...FF 0x80 |
| 12E | AND | ProxyAddr 0x80 |
| 12F | DUP2 | 0x80 ProxyAddr 0x80 |
| 130 | MSTORE | 0x80 |

ويحتوي 0x80 الآن على عنوان الوكيل

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | --------- |
| 131 | PUSH1 0x20 | 0x20 0x80 |
| 133 | ADD | 0xA0 |
| 134 | PUSH2 0x00e4 | 0xE4 0xA0 |
| 137 | JUMP | 0xA0 |

### كود <span dir="ltr">E4</span> {#the-e4-code}

هذه هي المرة الأولى التي نرى فيها هذه الأسطر، لكنها مشتركة مع طرق أخرى (انظر أدناه). لذلك سنطلق على القيمة في المكدس اسم <span dir="ltr">X</span>، وتذكر فقط أنه في `splitter()` تكون قيمة <span dir="ltr">X</span> هذه هي 0xA0.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ---------- | ----------- |
| E4 | JUMPDEST | <span dir="ltr">X</span> |
| E5 | PUSH1 0x40 | 0x40 <span dir="ltr">X</span> |
| E7 | MLOAD | 0x80 <span dir="ltr">X</span> |
| E8 | DUP1 | 0x80 0x80 <span dir="ltr">X</span> |
| E9 | SWAP2 | <span dir="ltr">X</span> 0x80 0x80 |
| EA | SUB | <span dir="ltr">X-0x80</span> 0x80 |
| EB | SWAP1 | 0x80 <span dir="ltr">X-0x80</span> |
| EC | RETURN | |

إذن، يتلقى هذا الكود مؤشر ذاكرة في المكدس (<span dir="ltr">X</span>)، ويجعل العقد ينفذ `RETURN` مع مخزن مؤقت بحجم <span dir="ltr">0x80 - X</span>.

في حالة `splitter()`، يُرجع هذا العنوان الذي نعتبر عقد وكيل له. يُرجع `RETURN` المخزن المؤقت في النطاق <span dir="ltr">0x80-0x9F</span>، وهو المكان الذي كتبنا فيه هذه البيانات (الإزاحة 0x130 أعلاه).

## currentWindow() {#currentwindow}

الكود في الإزاحات <span dir="ltr">0x158-0x163</span> مطابق لما رأيناه في <span dir="ltr">0x103-0x10E</span> في `splitter()` (باستثناء وجهة `JUMPI`)، لذلك نعلم أن `currentWindow()` ليس أيضًا `payable`.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### كود DA {#the-da-code}

هذا الكود مشترك أيضًا مع دوال أخرى. لذلك سنسمي القيمة في المكدس Y، ونتذكر فقط أنه في `currentWindow()` قيمة Y هذه هي <span dir="ltr">Storage[1]</span>.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

اكتب Y في <span dir="ltr">0x80-0x9F</span>.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

والباقي مشروح بالفعل [أعلاه](#the-e4-code). لذا فإن القفزات إلى <span dir="ltr">0xDA</span> تكتب أعلى المكدس (Y) في <span dir="ltr">0x80-0x9F</span>، وتُرجع تلك القيمة. في حالة `currentWindow()`، فإنها تُرجع <span dir="ltr">Storage[1]</span>.

## <span dir="ltr">merkleRoot()</span> {#merkleroot}

الكود في الإزاحات <span dir="ltr">0xED-0xF8</span> مطابق لما رأيناه في <span dir="ltr">0x103-0x10E</span> في `splitter()` (باستثناء وجهة `JUMPI`)، لذا نعلم أن `merkleRoot()` ليس أيضًا `payable`.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | -------------------- |
| <span dir="ltr">F9</span> | JUMPDEST     |
| <span dir="ltr">FA</span> | POP          |
| <span dir="ltr">FB</span> | <span dir="ltr">PUSH2 0x00da</span> | <span dir="ltr">0xDA</span>                 |
| <span dir="ltr">FE</span> | <span dir="ltr">PUSH1 0x00</span>   | <span dir="ltr">0x00 0xDA</span>            |
| <span dir="ltr">100</span> | SLOAD        | <span dir="ltr">Storage[0] 0xDA</span>      |
| <span dir="ltr">101</span> | DUP2         | <span dir="ltr">0xDA Storage[0] 0xDA</span> |
| <span dir="ltr">102</span> | JUMP         | <span dir="ltr">Storage[0] 0xDA</span>      |

ما يحدث بعد القفزة [اكتشفناه بالفعل](#the-da-code). لذا يُرجع `merkleRoot()` القيمة <span dir="ltr">Storage[0]</span>.

## <span dir="ltr">0x81e580d3</span> {#0x81e580d3}

الرمز في الإزاحات <span dir="ltr">0x138-0x143</span> مطابق لما رأيناه في <span dir="ltr">0x103-0x10E</span> في `splitter()` (باستثناء الوجهة `JUMPI`)، لذلك نعلم أن هذه الدالة ليست `payable` أيضًا.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

يبدو أن هذه الدالة تأخذ <span dir="ltr">32</span> بايت (كلمة واحدة) على الأقل من بيانات الاستدعاء.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

إذا لم تحصل على بيانات الاستدعاء، تتراجع المعاملة دون أي بيانات إرجاع.

دعونا نرى ما يحدث إذا _حصلت_ الدالة بالفعل على بيانات الاستدعاء التي تحتاجها.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` هي الكلمة الأولى من بيانات الاستدعاء _بعد_ توقيع الطريقة

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

إذا لم تكن الكلمة الأولى أقل من <span dir="ltr">Storage[4]</span>، تفشل الدالة. وتتراجع دون أي قيمة مُرجعة:

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

إذا كانت <span dir="ltr">calldataload(4)</span> أقل من <span dir="ltr">Storage[4]</span>، نحصل على هذا الرمز:

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

وتحتوي مواقع الذاكرة <span dir="ltr">0x00-0x1F</span> الآن على البيانات <span dir="ltr">0x04</span> (جميع <span dir="ltr">0x00-0x1E</span> أصفار، و <span dir="ltr">0x1F</span> هي أربعة)

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

لذا يوجد جدول بحث في التخزين، والذي يبدأ عند SHA3 لـ <span dir="ltr">0x000...0004</span> ويحتوي على إدخال لكل قيمة بيانات استدعاء مشروعة (القيمة أقل من <span dir="ltr">Storage[4]</span>).

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

نحن نعلم بالفعل ما يفعله [الرمز عند الإزاحة <span dir="ltr">0xDA</span>](#the-da-code)، فهو يُرجع القيمة العليا للمكدس إلى المستدعي. لذا تُرجع هذه الدالة القيمة من جدول البحث إلى المستدعي.

## <span dir="ltr">0x1f135823</span> {#0x1f135823}

الكود في الإزاحات <span dir="ltr">0xC4-0xCF</span> مطابق لما رأيناه في <span dir="ltr">0x103-0x10E</span> في `splitter()` (باستثناء الوجهة `JUMPI`)، لذلك نعلم أن هذه الدالة ليست `payable` أيضًا.

| الإزاحة | رمز التشغيل | المكدس |
| -----: | ------------ | ----------------- |
| <span dir="ltr">D0</span> | <span dir="ltr">JUMPDEST</span> |
| <span dir="ltr">D1</span> | <span dir="ltr">POP</span> |
| <span dir="ltr">D2</span> | <span dir="ltr">PUSH2 0x00da</span> | <span dir="ltr">0xDA</span> |
| <span dir="ltr">D5</span> | <span dir="ltr">PUSH1 0x06</span> | <span dir="ltr">0x06 0xDA</span> |
| <span dir="ltr">D7</span> | <span dir="ltr">SLOAD</span> | <span dir="ltr">Value\* 0xDA</span> |
| <span dir="ltr">D8</span> | <span dir="ltr">DUP2</span> | <span dir="ltr">0xDA Value\* 0xDA</span> |
| <span dir="ltr">D9</span> | <span dir="ltr">JUMP</span> | <span dir="ltr">Value\* 0xDA</span> |

نحن نعلم بالفعل ما يفعله [الكود عند الإزاحة <span dir="ltr">0xDA</span>](#the-da-code)، فهو يُرجع القيمة العليا في المكدس إلى المستدعي. لذلك تُرجع هذه الدالة `Value*`.

### ملخص الطرق {#method-summary}

هل تشعر أنك تفهم العقد في هذه المرحلة؟ أنا لا أشعر بذلك. حتى الآن لدينا هذه الطرق:

| الطريقة | المعنى |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| تحويل | قبول القيمة المقدمة بواسطة الاستدعاء وزيادة `Value*` بهذا المقدار |
| [<span dir="ltr">splitter()</span>](#splitter) | إرجاع <span dir="ltr">Storage[3]</span>، عنوان العقد الوكيل |
| [<span dir="ltr">currentWindow()</span>](#currentwindow) | إرجاع <span dir="ltr">Storage[1]</span> |
| [<span dir="ltr">merkleRoot()</span>](#merkleroot) | إرجاع <span dir="ltr">Storage[0]</span> |
| [<span dir="ltr">0x81e580d3</span>](#0x81e580d3) | إرجاع القيمة من جدول بحث، بشرط أن تكون المعلمة أقل من <span dir="ltr">Storage[4]</span> |
| [<span dir="ltr">0x1f135823</span>](#0x1f135823) | إرجاع <span dir="ltr">Storage[6]</span>، والمعروف أيضًا باسم <span dir="ltr">Value\*</span> |

لكننا نعلم أن أي وظيفة أخرى يتم توفيرها بواسطة العقد في <span dir="ltr">Storage[3]</span>. ربما إذا عرفنا ما هو هذا العقد، فسيعطينا ذلك دليلًا. لحسن الحظ، هذه هي سلسلة الكتل وكل شيء معروف، على الأقل نظريًا. لم نر أي طرق تقوم بتعيين <span dir="ltr">Storage[3]</span>، لذلك لابد أنه تم تعيينه بواسطة المُنشئ.

## المُنشئ {#the-constructor}

عندما [ننظر إلى عقد](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)، يمكننا أيضًا رؤية المعاملة التي أنشأته.

![Click the create transaction](create-tx.png)

إذا نقرنا على تلك المعاملة، ثم على علامة التبويب **الحالة**، يمكننا رؤية القيم الأولية للمعلمات. على وجه التحديد، يمكننا أن نرى أن <span dir="ltr">Storage[3]</span> يحتوي على [<span dir="ltr">0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761</span>](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). يجب أن يحتوي ذلك العقد على الوظيفة المفقودة. يمكننا فهمه باستخدام نفس الأدوات التي استخدمناها للعقد الذي نحقق فيه.

## العقد الوكيل {#the-proxy-contract}

باستخدام نفس التقنيات التي استخدمناها للعقد الأصلي أعلاه، يمكننا أن نرى أن العقد يتراجع في الحالات التالية:

- إذا كان هناك أي <span dir="ltr">ETH</span> مرفق بالاستدعاء (<span dir="ltr">0x05-0x0F</span>)
- إذا كان حجم بيانات الاستدعاء أقل من أربعة (<span dir="ltr">0x10-0x19</span> و <span dir="ltr">0xBE-0xC2</span>)

وأن الطرق التي يدعمها هي:

| الطريقة | توقيع الطريقة | إزاحة القفز إليها |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [<span dir="ltr">scaleAmountByPercentage(uint256,uint256)</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | <span dir="ltr">0x8ffb5c97</span>                   | <span dir="ltr">0x0135</span>              |
| [<span dir="ltr">isClaimed(uint256,address)</span>](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | <span dir="ltr">0xd2ef0795</span>                   | <span dir="ltr">0x0151</span>              |
| [<span dir="ltr">claim(uint256,address,uint256,bytes32[])</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | <span dir="ltr">0x2e7ba6ef</span>                   | <span dir="ltr">0x00F4</span>              |
| [<span dir="ltr">incrementWindow()</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | <span dir="ltr">0x338b1d31</span>                   | <span dir="ltr">0x0110</span>              |
| ???                                                                                                             | <span dir="ltr">0x3f26479e</span>                   | <span dir="ltr">0x0118</span>              |
| ???                                                                                                             | <span dir="ltr">0x1e7df9d3</span>                   | <span dir="ltr">0x00C3</span>              |
| [<span dir="ltr">currentWindow()</span>](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [<span dir="ltr">0xba0bafb4</span>](#currentwindow) | <span dir="ltr">0x0148</span>              |
| [<span dir="ltr">merkleRoot()</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [<span dir="ltr">0x2eb4a7ab</span>](#merkleroot)    | <span dir="ltr">0x0107</span>              |
| ???                                                                                                             | [<span dir="ltr">0x81e580d3</span>](#0x81e580d3)    | <span dir="ltr">0x0122</span>              |
| ???                                                                                                             | [<span dir="ltr">0x1f135823</span>](#0x1f135823)    | <span dir="ltr">0x00D8</span>              |

يمكننا تجاهل الطرق الأربع السفلية لأننا لن نصل إليها أبدًا. تواقيعها تجعل العقد الأصلي الخاص بنا يتولى أمرها بنفسه (يمكنك النقر على التواقيع لرؤية التفاصيل أعلاه)، لذا يجب أن تكون [طرقًا تم تجاوزها](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

إحدى الطرق المتبقية هي `claim(<params>)`، وأخرى هي `isClaimed(<params>)`، لذا يبدو أنه عقد إسقاط جوي. بدلاً من المرور عبر الباقي رمز تشغيل برمز تشغيل، يمكننا [تجربة أداة فك التجميع](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)، والتي تنتج نتائج قابلة للاستخدام لثلاث دوال من هذا العقد. تُترك الهندسة العكسية للدوال الأخرى كتمرين للقارئ.

### <span dir="ltr">scaleAmountByPercentage</span> {#scaleamountbypercentage}

هذا ما تقدمه لنا أداة فك التجميع لهذه الدالة:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

يختبر `require` الأول أن بيانات الاستدعاء تحتوي، بالإضافة إلى البايتات الأربعة لتوقيع الدالة، على <span dir="ltr">64</span> بايت على الأقل، وهو ما يكفي للمعلمتين. إذا لم يكن الأمر كذلك، فمن الواضح أن هناك خطأ ما.

يبدو أن عبارة `if` تتحقق من أن `_param1` ليس صفرًا، وأن `_param1 * _param2` ليس سالبًا. من المحتمل أن يكون هذا لمنع حالات الالتفاف (wrap around).

أخيرًا، تُرجع الدالة قيمة متناسبة.

### <span dir="ltr">claim</span> {#claim}

الكود الذي تنشئه أداة فك التجميع معقد، وليس كله ذا صلة بنا. سأتخطى بعضًا منه للتركيز على الأسطر التي أعتقد أنها توفر معلومات مفيدة

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

نرى هنا شيئين مهمين:

- `_param2`، على الرغم من الإعلان عنه كـ `uint256`، هو في الواقع عنوان
- `_param1` هي النافذة التي تتم المطالبة بها، والتي يجب أن تكون `currentWindow` أو أقدم.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

لذا نعلم الآن أن <span dir="ltr">Storage[5]</span> عبارة عن مصفوفة من النوافذ والعناوين، وما إذا كان العنوان قد طالب بالمكافأة لتلك النافذة.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

نعلم أن `unknown2eb4a7ab` هي في الواقع الدالة `merkleRoot()`، لذا يبدو أن هذا الكود يتحقق من [إثبات ميركل](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). هذا يعني أن `_param4` هو إثبات ميركل.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

هذه هي الطريقة التي يقوم بها العقد بتحويل <span dir="ltr">ETH</span> الخاص به إلى عنوان آخر (عقد أو مملوك خارجيًا). يقوم باستدعائه بقيمة تمثل المبلغ المراد تحويله. لذا يبدو أن هذا إسقاط جوي لـ <span dir="ltr">ETH</span>.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

يخبرنا السطران السفليان أن <span dir="ltr">Storage[2]</span> هو أيضًا عقد نقوم باستدعائه. إذا [نظرنا إلى معاملة المُنشئ](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) نرى أن هذا العقد هو [<span dir="ltr">0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2</span>](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)، وهو عقد إيثر مغلف (<span dir="ltr">WETH</span>) [تم رفع كود المصدر الخاص به إلى <span dir="ltr">Etherscan</span>](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

لذا يبدو أن العقد يحاول إرسال <span dir="ltr">ETH</span> إلى `_param2`. إذا تمكن من ذلك، فهذا رائع. وإذا لم يتمكن، فإنه يحاول إرسال [<span dir="ltr">WETH</span>](https://weth.tkn.eth.limo/). إذا كان `_param2` حسابًا مملوكًا خارجيًا (<span dir="ltr">EOA</span>) فيمكنه دائمًا تلقي <span dir="ltr">ETH</span>، لكن العقود يمكنها رفض تلقي <span dir="ltr">ETH</span>. ومع ذلك، فإن <span dir="ltr">WETH</span> هو <span dir="ltr">ERC-20</span> ولا يمكن للعقود رفض قبوله.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

في نهاية الدالة نرى أنه يتم إنشاء إدخال سجل. [انظر إلى إدخالات السجل التي تم إنشاؤها](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) وقم بالتصفية حسب الموضوع الذي يبدأ بـ `0xdbd5...`. إذا [نقرنا على إحدى المعاملات التي أنشأت مثل هذا الإدخال](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) نرى أنه يبدو بالفعل كمطالبة - أرسل الحساب رسالة إلى العقد الذي نقوم بهندسته عكسيًا، وفي المقابل حصل على <span dir="ltr">ETH</span>.

![A claim transaction](claim-tx.png)

### <span dir="ltr">1e7df9d3</span> {#1e7df9d3}

هذه الدالة مشابهة جدًا لـ [`claim`](#claim) أعلاه. كما أنها تتحقق من إثبات ميركل، وتحاول تحويل <span dir="ltr">ETH</span> إلى الأول، وتنتج نفس النوع من إدخال السجل.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

الفرق الرئيسي هو أن المعلمة الأولى، وهي النافذة المراد سحبها، غير موجودة. بدلاً من ذلك، هناك حلقة تكرار عبر جميع النوافذ التي يمكن المطالبة بها.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

لذا يبدو أنه متغير من `claim` يطالب بجميع النوافذ.

## الخاتمة {#conclusion}

بحلول الآن، يجب أن تكون قد عرفت كيفية فهم العقود التي لا يتوفر كودها المصدري، باستخدام إما رموز التشغيل أو (عندما تنجح) أداة فك التجميع. وكما هو واضح من طول هذا المقال، فإن الهندسة العكسية لعقد ليست أمراً بسيطاً، ولكن في نظام يكون فيه الأمان أمراً بالغ الأهمية، فإن القدرة على التحقق من أن العقود تعمل كما هو موعود تعد مهارة مهمة.

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).