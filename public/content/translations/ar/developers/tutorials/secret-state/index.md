---
title: "استخدام المعرفة الصفرية لحالة سرية"
description: "الألعاب على السلسلة محدودة لأنه لا يمكنها الاحتفاظ بأي معلومات مخفية. بعد قراءة هذا البرنامج التعليمي، سيتمكن القارئ من الجمع بين إثباتات المعرفة الصفرية ومكونات الخادم لإنشاء ألعاب يمكن التحقق منها ذات حالة سرية، ومكون خارج السلسلة. سيتم إثبات التقنية للقيام بذلك عن طريق إنشاء لعبة كاسحة ألغام."
author: Ori Pomerantz
tags:
  [
    "خادم",
    "خارج السلسلة",
    "مركزي",
    "المعرفة الصفرية",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: ar
published: 2025-03-15
---

_There are no secrets on the blockchain_. كل شيء يُنشر على البلوك تشين مفتوح ليقرأه الجميع. هذا ضروري، لأن البلوك تشين يعتمد على قدرة أي شخص على التحقق منه. ومع ذلك، غالبًا ما تعتمد الألعاب على الحالة السرية. على سبيل المثال، لعبة [كاسحة الألغام](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) لا معنى لها على الإطلاق إذا كان بإمكانك فقط الانتقال إلى مستكشف البلوك تشين ورؤية الخريطة.

الحل الأبسط هو استخدام [مكون خادم](/developers/tutorials/server-components/) للاحتفاظ بالحالة السرية. ومع ذلك، فإن سبب استخدامنا للبلوك تشين هو منع الغش من قبل مطور اللعبة. نحن بحاجة إلى ضمان صدق مكون الخادم. يمكن للخادم توفير تجزئة (هاش) للحالة، واستخدام [إثباتات المعرفة الصفرية](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) لإثبات أن الحالة المستخدمة لحساب نتيجة الحركة هي الحالة الصحيحة.

بعد قراءة هذا المقال، ستعرف كيفية إنشاء هذا النوع من الخادم الذي يحتفظ بالحالة السرية، وعميل لعرض الحالة، ومكون على السلسلة للتواصل بين الاثنين. الأدوات الرئيسية التي سنستخدمها هي:

| أدوات                                         | الغرض                                |                    تم التحقق من الإصدار |
| --------------------------------------------- | ------------------------------------ | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | إثباتات المعرفة الصفرية والتحقق منها |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | لغة برمجة لكل من الخادم والعميل      |   5.4.2 |
| [Node](https://nodejs.org/en)                 | تشغيل الخادم                         | 20.18.2 |
| [Viem](https://viem.sh/)                      | التواصل مع البلوك تشين               |  2.9.20 |
| [MUD](https://mud.dev/)                       | إدارة البيانات على السلسلة           |  2.0.12 |
| [React](https://react.dev/)                   | واجهة مستخدم العميل                  |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | تقديم النص البرمجي للعميل            |   4.2.1 |

## مثال كاسحة الألغام {#minesweeper}

[كاسحة الألغام](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) هي لعبة تتضمن خريطة سرية بها حقل ألغام. يختار اللاعب الحفر في مكان معين. إذا كان هذا الموقع يحتوي على لغم، تنتهي اللعبة. وإلا، يحصل اللاعب على عدد الألغام في المربعات الثمانية المحيطة بذلك الموقع.

هذا التطبيق مكتوب باستخدام [MUD](https://mud.dev/)، وهو إطار عمل يتيح لنا تخزين البيانات على السلسلة باستخدام [قاعدة بيانات القيمة الرئيسية](https://aws.amazon.com/nosql/key-value/) ومزامنة تلك البيانات تلقائيًا مع المكونات خارج السلسلة. بالإضافة إلى المزامنة، يسهل MUD توفير التحكم في الوصول، وللمستخدمين الآخرين [توسيع](https://mud.dev/guides/extending-a-world) تطبيقنا دون إذن.

### تشغيل مثال كاسحة الألغام {#running-minesweeper-example}

لتشغيل مثال كاسحة الألغام:

1. تأكد من [تثبيت المتطلبات الأساسية](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites) و [Foundry](https://book.getfoundry.sh/getting-started/installation) و [`git`](https://git-scm.com/downloads) و [`pnpm`](https://git-scm.com/downloads) و [`mprocs`](https://github.com/pvolok/mprocs).

2. استنسخ المستودع.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. ثبّت الحزم.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   إذا تم تثبيت Foundry كجزء من `pnpm install`، فأنت بحاجة إلى إعادة تشغيل واجهة سطر الأوامر.

4. تجميع العقود

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. ابدأ البرنامج (بما في ذلك بلوك تشين [anvil](https://book.getfoundry.sh/anvil/)) وانتظر.

   ```sh copy
   mprocs
   ```

   لاحظ أن بدء التشغيل يستغرق وقتًا طويلاً. لرؤية التقدم، استخدم أولاً السهم لأسفل للتمرير إلى علامة التبويب _contracts_ لرؤية عقود MUD التي يتم نشرها. عندما تحصل على الرسالة _Waiting for file changes…_، يتم نشر العقود وسيحدث المزيد من التقدم في علامة التبويب _server_. هناك، تنتظر حتى تحصل على الرسالة _Verifier address: 0x...._.

   إذا نجحت هذه الخطوة، فسترى شاشة `mprocs`، مع العمليات المختلفة على اليسار ومخرجات وحدة التحكم للعملية المحددة حاليًا على اليمين.

   ![شاشة mprocs](./mprocs.png)

   إذا كانت هناك مشكلة في `mprocs`، يمكنك تشغيل العمليات الأربع يدويًا، كل منها في نافذة سطر أوامر خاصة بها:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **العقود**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **الخادم**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **العميل**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. يمكنك الآن التصفح إلى [العميل](http://localhost:3000)، والنقر فوق **لعبة جديدة**، والبدء في اللعب.

### الجداول {#tables}

نحن بحاجة إلى [عدة جداول](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) على السلسلة.

- `Configuration`: هذا الجدول هو جدول أحادي، ليس له مفتاح وسجل واحد. يستخدم للاحتفاظ بمعلومات تكوين اللعبة:
  - `height`: ارتفاع حقل الألغام
  - `width`: عرض حقل الألغام
  - `numberOfBombs`: عدد القنابل في كل حقل ألغام

- `VerifierAddress`: هذا الجدول هو أيضًا جدول أحادي. يتم استخدامه للاحتفاظ بجزء واحد من التكوين، وهو عنوان عقد المدقق (`verifier`). كان بإمكاننا وضع هذه المعلومات في جدول `Configuration`، ولكن يتم تعيينها بواسطة مكون مختلف، وهو الخادم، لذلك من الأسهل وضعها في جدول منفصل.

- `PlayerGame`: المفتاح هو عنوان اللاعب. البيانات هي:

  - `gameId`: قيمة 32 بايت وهي تجزئة (هاش) الخريطة التي يلعب عليها اللاعب (معرّف اللعبة).
  - `win`: قيمة منطقية تشير إلى ما إذا كان اللاعب قد فاز باللعبة.
  - `lose`: قيمة منطقية تشير إلى ما إذا كان اللاعب قد خسر اللعبة.
  - `digNumber`: عدد عمليات الحفر الناجحة في اللعبة.

- `GamePlayer`: يحتفظ هذا الجدول بالربط العكسي، من `gameId` إلى عنوان اللاعب.

- `Map`: المفتاح عبارة عن مجموعة من ثلاث قيم:

  - `gameId`: قيمة 32 بايت وهي تجزئة (هاش) الخريطة التي يلعب عليها اللاعب (معرّف اللعبة).
  - إحداثي `x`
  - إحداثي `y`

  القيمة هي رقم واحد. يكون 255 إذا تم الكشف عن قنبلة. وإلا، فهو عدد القنابل حول هذا الموقع زائد واحد. لا يمكننا فقط استخدام عدد القنابل، لأنه بشكل افتراضي تكون كل مساحة التخزين في آلة إيثريوم الافتراضية (EVM) وجميع قيم الصفوف في MUD صفرًا. نحن بحاجة إلى التمييز بين "لم يحفر اللاعب هنا بعد" و "حفر اللاعب هنا، ووجد أن هناك صفر قنابل حوله".

بالإضافة إلى ذلك، يحدث الاتصال بين العميل والخادم من خلال المكون الموجود على السلسلة. يتم تنفيذ هذا أيضًا باستخدام الجداول.

- `PendingGame`: طلبات غير مخدومة لبدء لعبة جديدة.
- `PendingDig`: طلبات غير مخدومة للحفر في مكان محدد في لعبة معينة. هذا [جدول خارج السلسلة](https://mud.dev/store/tables#types-of-tables)، مما يعني أنه لا يتم كتابته في تخزين آلة إيثريوم الافتراضية (EVM)، بل يمكن قراءته فقط خارج السلسلة باستخدام الأحداث.

### تدفقات التنفيذ والبيانات {#execution-data-flows}

تقوم هذه التدفقات بتنسيق التنفيذ بين العميل والمكون الموجود على السلسلة والخادم.

#### التهيئة {#initialization-flow}

عند تشغيل `mprocs`، تحدث هذه الخطوات:

1. [`mprocs`](https://github.com/pvolok/mprocs) يشغل أربعة مكونات:

   - [Anvil](https://book.getfoundry.sh/anvil/)، الذي يشغل بلوك تشين محلي
   - [العقود](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)، التي تجمع (إذا لزم الأمر) وتنشر العقود لـ MUD
   - [العميل](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)، الذي يشغل [Vite](https://vitejs.dev/) لخدمة واجهة المستخدم والنص البرمجي للعميل لمتصفحات الويب.
   - [الخادم](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)، الذي يقوم بإجراءات الخادم

2. تنشر حزمة `contracts` عقود MUD ثم تشغل [البرنامج النصي `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). يحدد هذا البرنامج النصي التكوين. يحدد النص البرمجي من github [حقل ألغام بحجم 10x5 مع ثمانية ألغام فيه](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. يبدأ [الخادم](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) بـ [إعداد MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). من بين أمور أخرى، هذا ينشط مزامنة البيانات، بحيث توجد نسخة من الجداول ذات الصلة في ذاكرة الخادم.

4. يشترك الخادم في وظيفة يتم تنفيذها [عندما يتغير جدول `Configuration`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). يتم استدعاء [هذه الوظيفة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) بعد تنفيذ `PostDeploy.s.sol` وتعديل الجدول.

5. عندما تحصل وظيفة تهيئة الخادم على التكوين، [فإنها تستدعي `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) لتهيئة [جزء المعرفة الصفرية من الخادم](#using-zokrates-from-typescript). لا يمكن أن يحدث هذا حتى نحصل على التكوين لأن وظائف المعرفة الصفرية يجب أن يكون لديها عرض وارتفاع حقل الألغام كثوابت.

6. بعد تهيئة جزء المعرفة الصفرية من الخادم، فإن الخطوة التالية هي [نشر عقد التحقق من المعرفة الصفرية إلى البلوك تشين](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) وتعيين عنوان الشخص الذي يتم التحقق منه في MUD.

7. أخيرًا، نشترك في التحديثات حتى نرى متى يطلب اللاعب إما [بدء لعبة جديدة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) أو [الحفر في لعبة موجودة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### لعبة جديدة {#new-game-flow}

هذا ما يحدث عندما يطلب اللاعب لعبة جديدة.

1. إذا لم تكن هناك لعبة قيد التقدم لهذا اللاعب، أو كانت هناك لعبة ولكن بمعرّف لعبة صفري، يعرض العميل [زر لعبة جديدة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). عندما يضغط المستخدم على هذا الزر، [يشغل React وظيفة `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) هو استدعاء `System`. في MUD، يتم توجيه جميع المكالمات من خلال عقد `World`، وفي معظم الحالات تستدعي `<namespace>__<function name>`. في هذه الحالة، يكون الاستدعاء إلى `app__newGame`، والذي يقوم MUD بعد ذلك بتوجيهه إلى [`newGame` في `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. تتحقق الوظيفة الموجودة على السلسلة من أن اللاعب ليس لديه لعبة قيد التقدم، وإذا لم تكن هناك لعبة، [تضيف الطلب إلى جدول `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. يكتشف الخادم التغيير في `PendingGame` و[يشغل الوظيفة المشتركة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). تستدعي هذه الوظيفة [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)، والتي بدورها تستدعي [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. أول شيء تفعله `createGame` هو [إنشاء خريطة عشوائية بالعدد المناسب من الألغام](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). بعد ذلك، يستدعي [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) لإنشاء خريطة بحدود فارغة، وهو أمر ضروري لـ Zokrates. أخيرًا، تستدعي `createGame` [`calculateMapHash`](#calculateMapHash)، للحصول على تجزئة (هاش) الخريطة، والتي تُستخدم كمعرّف للعبة.

6. تضيف وظيفة `newGame` اللعبة الجديدة إلى `gamesInProgress`.

7. آخر شيء يفعله الخادم هو استدعاء [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)، الموجود على السلسلة. توجد هذه الوظيفة في `System` مختلف، [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)، لتمكين التحكم في الوصول. يتم تعريف التحكم في الوصول في [ملف تكوين MUD](https://mud.dev/config)، [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   تسمح قائمة الوصول فقط لعنوان واحد باستدعاء `System`. هذا يقيد الوصول إلى وظائف الخادم إلى عنوان واحد، لذلك لا يمكن لأحد انتحال شخصية الخادم.

8. يقوم المكون على السلسلة بتحديث الجداول ذات الصلة:

   - إنشاء اللعبة في `PlayerGame`.
   - تعيين التعيين العكسي في `GamePlayer`.
   - إزالة الطلب من `PendingGame`.

9. يحدد الخادم التغيير في `PendingGame`، لكنه لا يفعل أي شيء لأن `wantsGame` ([`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60)) خطأ.

10. على العميل، يتم تعيين [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) إلى إدخال `PlayerGame` لعنوان اللاعب. عندما يتغير `PlayerGame`، يتغير `gameRecord` أيضًا.

11. إذا كانت هناك قيمة في `gameRecord`، ولم يتم الفوز باللعبة أو خسارتها، يعرض العميل [الخريطة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### حفر {#dig-flow}

1. [ينقر اللاعب على زر خلية الخريطة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)، والذي يستدعي [وظيفة `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). تستدعي هذه الوظيفة [`dig` على السلسلة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. [يقوم المكون الموجود على السلسلة بعدد من عمليات التحقق من السلامة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)، وإذا نجحت، يضيف طلب الحفر إلى [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. [يكتشف الخادم التغيير في `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [إذا كان صالحًا](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)، فإنه [يستدعي النص البرمجي للمعرفة الصفرية](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (الموضح أدناه) لإنشاء النتيجة وإثبات صحتها.

4. [الخادم](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) يستدعي [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) على السلسلة.

5. `digResponse` يفعل شيئين. أولاً، يتحقق من [إثبات المعرفة الصفرية](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). بعد ذلك، إذا تم التحقق من الإثبات، فإنه يستدعي [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) لمعالجة النتيجة فعليًا.

6. `processDigResult` يتحقق مما إذا كانت اللعبة قد [خُسرت](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) أو [تم الفوز بها](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86)، و[يحدّث `Map`، الخريطة على السلسلة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. يلتقط العميل التحديثات تلقائيًا و[يحدّث الخريطة المعروضة للاعب](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)، وإذا كان ذلك ممكنًا يخبر اللاعب إذا كان فوزًا أو خسارة.

## استخدام Zokrates {#using-zokrates}

في التدفقات الموضحة أعلاه، تخطينا أجزاء المعرفة الصفرية، وتعاملنا معها كصندوق أسود. الآن دعنا نفتحه ونرى كيف تمت كتابة هذا النص البرمجي.

### تجزئة الخريطة {#hashing-map}

يمكننا استخدام [هذا النص البرمجي لجافا سكريبت](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) لتطبيق [Poseidon](https://www.poseidon-hash.info)، وهي دالة التجزئة (هاش) في Zokrates التي نستخدمها. ومع ذلك، في حين أن هذا سيكون أسرع، إلا أنه سيكون أكثر تعقيدًا من مجرد استخدام دالة التجزئة (هاش) في Zokrates للقيام بذلك. هذا برنامج تعليمي، وبالتالي تم تحسين النص البرمجي من أجل البساطة، وليس من أجل الأداء. لذلك، نحتاج إلى برنامجين مختلفين من Zokrates، أحدهما لحساب التجزئة (هاش) لخريطة (`hash`) والآخر لإنشاء إثبات المعرفة الصفرية لنتيجة الحفر في موقع على الخريطة (`dig`).

### دالة التجزئة {#hash-function}

هذه هي الوظيفة التي تحسب تجزئة (هاش) الخريطة. سنستعرض هذا النص البرمجي سطرًا بسطر.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

يستورد هذان السطران وظيفتين من [مكتبة Zokrates القياسية](https://zokrates.github.io/toolbox/stdlib.html). [الوظيفة الأولى](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) هي [تجزئة (هاش) Poseidon](https://www.poseidon-hash.info/). يأخذ مصفوفة من عناصر [`field`](https://zokrates.github.io/language/types.html#field) ويعيد `field`.

عادة ما يكون عنصر الحقل في Zokrates أقل من 256 بت، ولكن ليس بكثير. لتبسيط النص البرمجي، نقصر الخريطة على 512 بت، ونجزئ مصفوفة من أربعة حقول، وفي كل حقل نستخدم 128 بت فقط. [تقوم وظيفة `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) بتغيير مصفوفة من 128 بت إلى `field` لهذا الغرض.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

يبدأ هذا السطر تعريف دالة. `hashMap` يحصل على معلمة واحدة تسمى `map`، وهي مصفوفة `bool`(ean) ثنائية الأبعاد. حجم الخريطة هو `width+2` في `height+2` لأسباب [موضحة أدناه](#why-map-border).

يمكننا استخدام `${width+2}` و`${height+2}` لأن برامج Zokrates مخزنة في هذا التطبيق كـ[سلاسل قوالب](https://www.w3schools.com/js/js_string_templates.asp). يتم تقييم النص البرمجي بين `${` و`}` بواسطة JavaScript، وبهذه الطريقة يمكن استخدام البرنامج لأحجام خرائط مختلفة. تحتوي معلمة الخريطة على حد بعرض موقع واحد حولها بدون أي قنابل، وهو السبب الذي يجعلنا بحاجة إلى إضافة اثنين إلى العرض والارتفاع.

القيمة المرتجعة هي `field` يحتوي على التجزئة (الهاش).

```
   bool[512] mut map1d = [false; 512];
```

الخريطة ثنائية الأبعاد. ومع ذلك، لا تعمل وظيفة `pack128` مع المصفوفات ثنائية الأبعاد. لذلك نقوم أولاً بتسوية الخريطة إلى مصفوفة بحجم 512 بايت، باستخدام `map1d`. بشكل افتراضي، متغيرات Zokrates هي ثوابت، لكننا نحتاج إلى تعيين قيم لهذه المصفوفة في حلقة، لذلك نعرّفها على أنها [`mut`](https://zokrates.github.io/language/variables.html#mutability).

نحتاج إلى تهيئة المصفوفة لأن Zokrates لا يحتوي على `undefined`. يعني التعبير `[false; 512]` [مصفوفة من 512 قيمة `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

نحتاج أيضًا إلى عداد للتمييز بين البتات التي قمنا بملئها بالفعل في `map1d` وتلك التي لم نقم بها.

```
   for u32 x in 0..${width+2} {
```

هذه هي طريقة الإعلان عن حلقة [`for`](https://zokrates.github.io/language/control_flow.html#for-loops) في Zokrates. يجب أن يكون لحلقة `for` في Zokrates حدود ثابتة، لأنه بينما يبدو أنها حلقة، فإن المجمع يقوم فعليًا "بفكها". التعبير `${width+2}` هو ثابت وقت التجميع لأن `width` يتم تعيينه بواسطة النص البرمجي TypeScript قبل أن يستدعي المجمع.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

لكل موقع في الخريطة، ضع هذه القيمة في مصفوفة `map1d` وزد العداد.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

يُنشئ `pack128` مصفوفة من أربع قيم `field` من `map1d`. في Zokrates `array[a..b]` تعني شريحة المصفوفة التي تبدأ من `a` وتنتهي عند `b-1`.

```
    return poseidon(hashMe);
}
```

استخدم `poseidon` لتحويل هذه المصفوفة إلى تجزئة (هاش).

### برنامج التجزئة {#hash-program}

يحتاج الخادم إلى استدعاء `hashMap` مباشرة لإنشاء معرّفات اللعبة. ومع ذلك، يمكن لـ Zokrates فقط استدعاء وظيفة `main` في برنامج للبدء، لذلك نقوم بإنشاء برنامج بوظيفة `main` تستدعي دالة التجزئة (هاش).

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### برنامج الحفر {#dig-program}

هذا هو قلب جزء المعرفة الصفرية من التطبيق، حيث ننتج البراهين المستخدمة للتحقق من نتائج الحفر.

```
${hashFragment}

// The number of mines in location (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### لماذا حدود الخريطة {#why-map-border}

تستخدم إثباتات المعرفة الصفرية [الدوائر الحسابية](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)، والتي ليس لها مكافئ سهل لعبارة `if`. بدلاً من ذلك، يستخدمون ما يعادل [المعامل الشرطي](https://en.wikipedia.org/wiki/Ternary_conditional_operator). إذا كان `a` يمكن أن يكون صفرًا أو واحدًا، يمكنك حساب `if a { b } else { c }` على النحو التالي `ab+(1-a)c`.

لهذا السبب، تقوم عبارة `if` في Zokrates دائمًا بتقييم كلا الفرعين. على سبيل المثال، إذا كان لديك هذا النص البرمجي:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

سيحدث خطأ، لأنه يحتاج إلى حساب `arr[10]`، على الرغم من أن هذه القيمة سيتم ضربها لاحقًا بصفر.

هذا هو السبب الذي يجعلنا بحاجة إلى حد بعرض موقع واحد حول الخريطة. نحتاج إلى حساب العدد الإجمالي للألغام حول موقع ما، وهذا يعني أننا بحاجة إلى رؤية الموقع في الصف العلوي والسفلي، إلى اليسار وإلى اليمين، من الموقع الذي نحفر فيه. مما يعني أن تلك المواقع يجب أن تكون موجودة في مصفوفة الخريطة التي يتم توفيرها لـ Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

بشكل افتراضي، تتضمن براهين Zokrates مدخلاتها. لا فائدة من معرفة وجود خمسة ألغام حول بقعة ما ما لم تكن تعرف بالفعل أي بقعة هي (ولا يمكنك فقط مطابقتها مع طلبك، لأن المثبت يمكنه استخدام قيم مختلفة وعدم إخبارك بذلك). ومع ذلك، نحن بحاجة إلى الحفاظ على سرية الخريطة، مع توفيرها لـ Zokrates. الحل هو استخدام معلمة `private`، وهي معلمة _لا_ يكشفها الإثبات.

يفتح هذا طريقًا آخر لسوء الاستخدام. يمكن للمثبت استخدام الإحداثيات الصحيحة، ولكن إنشاء خريطة بها أي عدد من الألغام حول الموقع، وربما في الموقع نفسه. لمنع هذا سوء الاستخدام، نجعل إثبات المعرفة الصفرية يتضمن تجزئة (هاش) الخريطة، وهو معرّف اللعبة.

```
   return (hashMap(map),
```

القيمة المرتجعة هنا هي مجموعة تتضمن مصفوفة تجزئة (هاش) الخريطة بالإضافة إلى نتيجة الحفر.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

نستخدم 255 كقيمة خاصة في حالة وجود قنبلة في الموقع نفسه.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

إذا لم يصب اللاعب لغمًا، أضف أعداد الألغام للمنطقة المحيطة بالموقع وأعد ذلك.

### استخدام Zokrates من TypeScript {#using-zokrates-from-typescript}

لدى Zokrates واجهة سطر أوامر، ولكن في هذا البرنامج نستخدمه في [النص البرمجي TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

المكتبة التي تحتوي على تعريفات Zokrates تسمى [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

استيراد [روابط JavaScript لـ Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). نحتاج فقط إلى وظيفة [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) لأنها تعيد وعدًا يتم حله إلى جميع تعريفات Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

على غرار Zokrates نفسه، نقوم أيضًا بتصدير وظيفة واحدة فقط، وهي أيضًا [غير متزامنة](https://www.w3schools.com/js/js_async.asp). عندما تعود في النهاية، فإنها توفر العديد من الوظائف كما سنرى أدناه.

```typescript
const zokrates = await zokratesInitialize()
```

تهيئة Zokrates، احصل على كل ما نحتاجه من المكتبة.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

بعد ذلك لدينا دالة التجزئة (هاش) وبرنامجان من Zokrates رأيناهما أعلاه.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

هنا نقوم بتجميع تلك البرامج.

```typescript
// Create the keys for zero knowledge verification.
// On a production system you'd want to use a setup ceremony.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

على نظام إنتاج، قد نستخدم [حفل إعداد](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) أكثر تعقيدًا، ولكن هذا جيد بما يكفي للعرض التوضيحي. لا توجد مشكلة في أن يعرف المستخدمون مفتاح الإثبات - فلا يزالون لا يستطيعون استخدامه لإثبات الأشياء ما لم تكن صحيحة. نظرًا لأننا نحدد الإنتروبيا (المعلمة الثانية، `""`)، ستكون النتائج دائمًا هي نفسها.

**ملاحظة:** تجميع برامج Zokrates وإنشاء المفاتيح هي عمليات بطيئة. لا حاجة لتكرارها في كل مرة، فقط عند تغيير حجم الخريطة. على نظام إنتاج، ستفعل ذلك مرة واحدة، ثم تخزن المخرجات. السبب الوحيد الذي يجعلني لا أفعل ذلك هنا هو من أجل البساطة.

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

تقوم وظيفة [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) بتشغيل برنامج Zokrates بالفعل. يعيد بنية ذات حقلين: `output`، وهو مخرج البرنامج كسلسلة JSON، و`witness`، وهو المعلومات اللازمة لإنشاء إثبات المعرفة الصفرية للنتيجة. هنا نحتاج فقط إلى المخرجات.

المخرج عبارة عن سلسلة نصية بالشكل `"31337"`، وهو رقم عشري محاط بعلامات اقتباس. لكن المخرجات التي نحتاجها لـ `viem` هي رقم سداسي عشري بالشكل `0x60A7`. لذا نستخدم `.slice(1,-1)` لإزالة علامات الاقتباس ثم `BigInt` لتشغيل السلسلة المتبقية، وهي رقم عشري، إلى [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` يحول هذا `BigInt` إلى سلسلة سداسية عشرية، و`"0x"+` يضيف علامة الأرقام السداسية العشرية.

```typescript
// Dig and return a zero knowledge proof of the result
// (server-side code)
```

يتضمن إثبات المعرفة الصفرية المدخلات العامة (`x` و `y`) والنتائج (تجزئة الخريطة وعدد القنابل).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

من الصعب التحقق مما إذا كان الفهرس خارج الحدود في Zokrates، لذلك نقوم بذلك هنا.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

تنفيذ برنامج الحفر.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

استخدم [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) وأعد الإثبات.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

مدقق سوليديتي، وهو عقد ذكي يمكننا نشره على البلوك تشين واستخدامه للتحقق من البراهين التي تم إنشاؤها بواسطة `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

أخيرًا، أعد كل ما قد يحتاجه نص برمجي آخر.

## الاختبارات الأمنية {#security-tests}

اختبارات الأمان مهمة لأن خطأ في الوظيفة سيكشف عن نفسه في النهاية. ولكن إذا كان التطبيق غير آمن، فمن المرجح أن يظل ذلك مخفيًا لفترة طويلة قبل أن يكشفه شخص يغش ويفلت من العقاب بموارد تخص الآخرين.

### الأذونات {#permissions}

هناك كيان واحد ذو امتيازات في هذه اللعبة، وهو الخادم. إنه المستخدم الوحيد المسموح له باستدعاء الوظائف في [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). يمكننا استخدام [`cast`](https://book.getfoundry.sh/cast/) للتحقق من أن استدعاءات الوظائف المصرح بها مسموح بها فقط كحساب الخادم.

[المفتاح الخاص بالخادم موجود في `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. على الكمبيوتر الذي يشغل `anvil` (البلوك تشين)، قم بتعيين متغيرات البيئة هذه.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. استخدم `cast` لمحاولة تعيين عنوان المدقق كعنوان غير مصرح به.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   لا يبلغ `cast` عن فشل فحسب، بل يمكنك أيضًا فتح **أدوات مطوري MUD** في اللعبة على المتصفح، والنقر على **الجداول**، واختيار **app\_\_VerifierAddress**. لاحظ أن العنوان ليس صفرًا.

3. قم بتعيين عنوان المدقق كعنوان الخادم.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   يجب أن يكون العنوان في **app\_\_VerifiedAddress** الآن صفرًا.

تمر جميع وظائف MUD في نفس `System` من خلال نفس التحكم في الوصول، لذلك أعتبر هذا الاختبار كافياً. إذا لم تكن كذلك، يمكنك التحقق من الوظائف الأخرى في [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### إساءات استخدام المعرفة الصفرية {#zero-knowledge-abuses}

الرياضيات للتحقق من Zokrates خارج نطاق هذا البرنامج التعليمي (وقدراتي). ومع ذلك، يمكننا إجراء فحوصات مختلفة على النص البرمجي للمعرفة الصفرية للتحقق من أنه إذا لم يتم بشكل صحيح فإنه يفشل. ستتطلب كل هذه الاختبارات منا تغيير [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) وإعادة تشغيل التطبيق بأكمله. لا يكفي إعادة تشغيل عملية الخادم، لأن ذلك يضع التطبيق في حالة مستحيلة (لدى اللاعب لعبة قيد التقدم، ولكن اللعبة لم تعد متاحة للخادم).

#### إجابة خاطئة {#wrong-answer}

أبسط احتمال هو تقديم إجابة خاطئة في إثبات المعرفة الصفرية. للقيام بذلك، نذهب إلى `zkDig` و[نعدّل السطر 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

هذا يعني أننا سنزعم دائمًا وجود قنبلة واحدة، بغض النظر عن الإجابة الصحيحة. حاول اللعب بهذا الإصدار، وسترى في علامة تبويب **الخادم** من شاشة `pnpm dev` هذا الخطأ:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

لذلك يفشل هذا النوع من الغش.

#### إثبات خاطئ {#wrong-proof}

ماذا يحدث إذا قدمنا المعلومات الصحيحة، ولكن لدينا بيانات إثبات خاطئة؟ الآن، استبدل السطر 91 بما يلي:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

لا يزال يفشل، ولكنه الآن يفشل بدون سبب لأنه يحدث أثناء استدعاء المدقق.

### كيف يمكن للمستخدم التحقق من النص البرمجي للثقة الصفرية؟ {#user-verify-zero-trust}

العقود الذكية سهلة التحقق نسبيًا. عادةً، ينشر المطور النص البرمجي المصدر إلى مستكشف كتل، ويتحقق مستكشف الكتل من أن النص البرمجي المصدر يتم تجميعه بالفعل إلى النص البرمجي في [معاملة نشر العقد](/developers/docs/smart-contracts/deploying/). في حالة MUD `System`s، يكون الأمر [أكثر تعقيدًا قليلاً](https://mud.dev/cli/verify)، ولكن ليس كثيرًا.

هذا أصعب مع المعرفة الصفرية. يتضمن المدقق بعض الثوابت ويجري بعض الحسابات عليها. هذا لا يخبرك بما يتم إثباته.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

الحل، على الأقل حتى يقوم مستكشفو الكتل بإضافة التحقق من Zokrates إلى واجهات المستخدم الخاصة بهم، هو أن يقوم مطورو التطبيق بإتاحة برامج Zokrates، وأن يقوم بعض المستخدمين على الأقل بتجميعها بأنفسهم باستخدام مفتاح التحقق المناسب.

للقيام بذلك:

1. [تثبيت Zokrates](https://zokrates.github.io/gettingstarted.html).

2. أنشئ ملفًا، `dig.zok`، مع برنامج Zokrates. يفترض النص البرمجي أدناه أنك احتفظت بحجم الخريطة الأصلي، 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // The number of mines in location (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. قم بتجميع النص البرمجي Zokrates وإنشاء مفتاح التحقق. يجب إنشاء مفتاح التحقق بنفس الإنتروبيا المستخدمة في الخادم الأصلي، [في هذه الحالة سلسلة فارغة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. أنشئ مدقق Solidity بنفسك، وتحقق من أنه متطابق وظيفيًا مع المدقق الموجود على البلوك تشين (يضيف الخادم تعليقًا، لكن هذا ليس مهمًا).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## قرارات التصميم {#design}

في أي تطبيق معقد بما فيه الكفاية، هناك أهداف تصميم متنافسة تتطلب مقايضات. دعونا نلقي نظرة على بعض المقايضات ولماذا الحل الحالي أفضل من الخيارات الأخرى.

### لماذا المعرفة الصفرية {#why-zero-knowledge}

بالنسبة لكاسحة الألغام، لا تحتاج حقًا إلى المعرفة الصفرية. يمكن للخادم دائمًا الاحتفاظ بالخريطة، ثم الكشف عنها بالكامل عند انتهاء اللعبة. بعد ذلك، في نهاية اللعبة، يمكن للعقد الذكي حساب تجزئة (هاش) الخريطة، والتحقق من تطابقه، وإذا لم يتطابق، يعاقب الخادم أو يتجاهل اللعبة تمامًا.

لم أستخدم هذا الحل الأبسط لأنه يعمل فقط للألعاب القصيرة ذات حالة نهاية محددة جيدًا. عندما تكون اللعبة لا نهائية (كما هو الحال مع [العوالم المستقلة](https://0xparc.org/blog/autonomous-worlds))، تحتاج إلى حل يثبت الحالة _دون_ الكشف عنها.

كتعليق تعليمي، احتاج هذا المقال إلى لعبة قصيرة سهلة الفهم، لكن هذه التقنية أكثر فائدة للألعاب الأطول.

### لماذا Zokrates؟ {#why-zokrates}

[Zokrates](https://zokrates.github.io/) ليست مكتبة المعرفة الصفرية الوحيدة المتاحة، لكنها تشبه لغة برمجة عادية [حتمية](https://en.wikipedia.org/wiki/Imperative_programming) وتدعم المتغيرات المنطقية.

لتطبيقك، مع متطلبات مختلفة، قد تفضل استخدام [Circum](https://docs.circom.io/getting-started/installation/) أو [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### متى يتم تجميع Zokrates {#when-compile-zokrates}

في هذا البرنامج، نقوم بتجميع برامج Zokrates [في كل مرة يبدأ فيها الخادم](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). من الواضح أن هذا إهدار للموارد، لكن هذا برنامج تعليمي، تم تحسينه من أجل البساطة.

إذا كنت أكتب تطبيقًا على مستوى الإنتاج، فسأتحقق مما إذا كان لدي ملف به برامج Zokrates المجمعة بحجم حقل الألغام هذا، وإذا كان الأمر كذلك، استخدمه. الشيء نفسه ينطبق على نشر عقد مدقق على السلسلة.

### إنشاء مفاتيح المدقق والمثبت {#key-creation}

[إنشاء المفاتيح](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) هو حساب خالص آخر لا يلزم القيام به أكثر من مرة لحجم معين من حقل الألغام. مرة أخرى، يتم ذلك مرة واحدة فقط من أجل البساطة.

بالإضافة إلى ذلك، يمكننا استخدام [حفل إعداد](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). ميزة حفل الإعداد هي أنك تحتاج إما إلى الإنتروبيا أو بعض النتائج المتوسطة من كل مشارك للغش في إثبات المعرفة الصفرية. إذا كان مشارك واحد على الأقل في الحفل نزيهًا وحذف هذه المعلومات، فإن إثباتات المعرفة الصفرية تكون آمنة من هجمات معينة. ومع ذلك، لا توجد _آلية_ للتحقق من حذف المعلومات من كل مكان. إذا كانت إثباتات المعرفة الصفرية مهمة للغاية، فأنت تريد المشاركة في حفل الإعداد.

هنا نعتمد على [قوى تاو الدائمة](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)، التي شارك فيها العشرات. من المحتمل أن يكون آمنًا بما فيه الكفاية، وأبسط بكثير. نحن أيضًا لا نضيف الإنتروبيا أثناء إنشاء المفاتيح، مما يسهل على المستخدمين [التحقق من تكوين المعرفة الصفرية](#user-verify-zero-trust).

### أين يتم التحقق {#where-verification}

يمكننا التحقق من إثباتات المعرفة الصفرية إما على السلسلة (مما يكلف غاز) أو في العميل (باستخدام [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). اخترت الأول، لأن هذا يتيح لك [التحقق من المدقق](#user-verify-zero-trust) مرة واحدة ثم تثق في أنه لا يتغير طالما بقي عنوان العقد الخاص به كما هو. إذا تم التحقق على العميل، فسيتعين عليك التحقق من النص البرمجي الذي تتلقاه في كل مرة تقوم فيها بتنزيل العميل.

أيضًا، في حين أن هذه اللعبة فردية، فإن الكثير من ألعاب البلوك تشين متعددة اللاعبين. التحقق على السلسلة يعني أنك تتحقق فقط من إثبات المعرفة الصفرية مرة واحدة. القيام بذلك في العميل سيتطلب من كل عميل التحقق بشكل مستقل.

### تسوية الخريطة في TypeScript أو Zokrates؟ {#where-flatten}

بشكل عام، عندما يمكن إجراء المعالجة إما في TypeScript أو Zokrates، فمن الأفضل القيام بها في TypeScript، وهو أسرع بكثير، ولا يتطلب إثباتات المعرفة الصفرية. هذا هو السبب، على سبيل المثال، أننا لا نوفر لـ Zokrates التجزئة (الهاش) ونجعله يتحقق من صحتها. يجب أن يتم التجزئة داخل Zokrates، ولكن يمكن أن تتم المطابقة بين التجزئة المرتجعة والتجزئة على السلسلة خارجه.

ومع ذلك، ما زلنا [نسوّي الخريطة في Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)، بينما كان بإمكاننا القيام بذلك في TypeScript. السبب هو أن الخيارات الأخرى، في رأيي، أسوأ.

- توفير مصفوفة أحادية البعد من القيم المنطقية للنص البرمجي Zokrates، واستخدام تعبير مثل `x*(height+2)
  +y` للحصول على الخريطة ثنائية الأبعاد. هذا من شأنه أن يجعل [النص البرمجي](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) أكثر تعقيدًا إلى حد ما، لذلك قررت أن مكاسب الأداء لا تستحق العناء في برنامج تعليمي.

- أرسل إلى Zokrates كلاً من المصفوفة أحادية البعد والمصفوفة ثنائية الأبعاد. ومع ذلك، هذا الحل لا يكسبنا أي شيء. سيتعين على النص البرمجي Zokrates التحقق من أن المصفوفة أحادية البعد التي تم تزويدها بها هي بالفعل التمثيل الصحيح للمصفوفة ثنائية الأبعاد. لذلك لن يكون هناك أي مكسب في الأداء.

- تسوية المصفوفة ثنائية الأبعاد في Zokrates. هذا هو أبسط خيار، لذلك اخترته.

### أين تخزن الخرائط {#where-store-maps}

في هذا التطبيق، [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) هو ببساطة متغير في الذاكرة. هذا يعني أنه إذا تعطل الخادم الخاص بك واحتاج إلى إعادة تشغيله، فستفقد جميع المعلومات التي خزنها. لا يقتصر الأمر على عدم قدرة اللاعبين على مواصلة لعبتهم، بل لا يمكنهم حتى بدء لعبة جديدة لأن المكون الموجود على السلسلة يعتقد أن لديهم لعبة قيد التقدم.

من الواضح أن هذا تصميم سيء لنظام إنتاج، حيث يمكنك تخزين هذه المعلومات في قاعدة بيانات. السبب الوحيد الذي جعلني أستخدم متغيرًا هنا هو أن هذا برنامج تعليمي والبساطة هي الاعتبار الرئيسي.

## الخلاصة: تحت أي ظروف تكون هذه التقنية مناسبة؟ {#conclusion}

إذن، أنت تعرف الآن كيفية كتابة لعبة باستخدام خادم يخزن حالة سرية لا تنتمي إلى السلسلة. لكن في أي الحالات يجب أن تفعل ذلك؟ هناك اعتباران رئيسيان.

- _لعبة طويلة الأمد_: [كما ذكرنا أعلاه](#why-zero-knowledge)، في لعبة قصيرة، يمكنك فقط نشر الحالة بمجرد انتهاء اللعبة والتحقق من كل شيء بعد ذلك. ولكن هذا ليس خيارًا عندما تستغرق اللعبة وقتًا طويلاً أو غير محدد، وتحتاج الحالة إلى البقاء سرية.

- _بعض المركزية مقبولة_: يمكن لإثباتات المعرفة الصفرية التحقق من النزاهة، وأن الكيان لا يزيف النتائج. ما لا يمكنهم فعله هو ضمان أن الكيان سيظل متاحًا ويجيب على الرسائل. في الحالات التي تحتاج فيها التوافر أيضًا إلى أن يكون لامركزيًا، لا تعد إثباتات المعرفة الصفرية حلاً كافيًا، وتحتاج إلى [حساب متعدد الأطراف](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).

### شكر وتقدير {#acknowledgements}

- قرأ ألفارو ألونسو مسودة من هذا المقال وأوضح بعض سوء فهمي حول Zokrates.

أي أخطاء متبقية هي مسؤوليتي.
