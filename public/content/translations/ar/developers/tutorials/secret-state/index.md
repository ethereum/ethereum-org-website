---
title: "استخدام المعرفة الصفرية لحالة سرية"
description: "الألعاب على السلسلة محدودة لأنها لا تستطيع الاحتفاظ بأي معلومات مخفية. بعد قراءة هذا البرنامج التعليمي، سيتمكن القارئ من الجمع بين إثباتات المعرفة الصفرية ومكونات الخادم لإنشاء ألعاب قابلة للتحقق باستخدام مكون حالة سرية خارج السلسلة. سيتم توضيح تقنية القيام بذلك من خلال إنشاء لعبة كاسحة الألغام."
author: "أوري بوميرانتس"
tags:
  - خادم
  - خارج السلسلة
  - مركزي
  - المعرفة الصفرية
  - zokrates
  - mud
  - الخصوصية
skill: advanced
breadcrumb: "حالة سرية ⁦ZK⁩"
lang: ar
published: 2025-03-15
---

_لا توجد أسرار على سلسلة الكتل_. كل ما يتم نشره على سلسلة الكتل متاح للجميع لقراءته. هذا ضروري، لأن سلسلة الكتل تعتمد على قدرة أي شخص على التحقق منها. ومع ذلك، تعتمد الألعاب غالبًا على حالة سرية. على سبيل المثال، لعبة [كاسحة الألغام](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) لا معنى لها على الإطلاق إذا كان بإمكانك ببساطة الذهاب إلى مستكشف الكتل ورؤية الخريطة.

الحل الأبسط هو استخدام [مكون خادم](/developers/tutorials/server-components/) للاحتفاظ بالحالة السرية. ومع ذلك، فإن السبب الذي يجعلنا نستخدم سلسلة الكتل هو منع الغش من قبل مطور اللعبة. نحتاج إلى ضمان نزاهة مكون الخادم. يمكن للخادم توفير تجزئة للحالة، واستخدام [إثباتات المعرفة الصفرية](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) لإثبات أن الحالة المستخدمة لحساب نتيجة الحركة هي الحالة الصحيحة.

بعد قراءة هذه المقالة، ستعرف كيفية إنشاء هذا النوع من الخوادم التي تحتفظ بحالة سرية، وعميل لعرض الحالة، ومكون على السلسلة للتواصل بينهما. الأدوات الرئيسية التي سنستخدمها ستكون:

| الأداة                                          | الغرض                                                 | تم التحقق منه على الإصدار |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | إثباتات المعرفة الصفرية والتحقق منها            |               <span dir="ltr">1.1.9</span> |
| [TypeScript](https://www.typescriptlang.org/) | لغة برمجة لكل من الخادم والعميل |               <span dir="ltr">5.4.2</span> |
| [Node](https://nodejs.org/en)                 | تشغيل الخادم                                      |             <span dir="ltr">20.18.2</span> |
| [Viem](https://viem.sh/)                      | التواصل مع سلسلة الكتل                       |              <span dir="ltr">2.9.20</span> |
| [MUD](https://mud.dev/)                       | إدارة البيانات على السلسلة                                 |              <span dir="ltr">2.0.12</span> |
| [React](https://react.dev/)                   | واجهة مستخدم العميل                                   |              <span dir="ltr">18.2.0</span> |
| [Vite](https://vitejs.dev/)                   | تقديم كود العميل                                 |               <span dir="ltr">4.2.1</span> |

## مثال كاسحة الألغام {#minesweeper}

[كاسحة الألغام (Minesweeper)](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) هي لعبة تتضمن خريطة سرية تحتوي على حقل ألغام. يختار اللاعب الحفر في موقع معين. إذا كان هذا الموقع يحتوي على لغم، تنتهي اللعبة. بخلاف ذلك، يحصل اللاعب على عدد الألغام الموجودة في المربعات الثمانية المحيطة بهذا الموقع.

تمت كتابة هذا التطبيق باستخدام [<span dir="ltr">MUD</span>](https://mud.dev/)، وهو إطار عمل يتيح لنا تخزين البيانات على السلسلة باستخدام [قاعدة بيانات المفتاح والقيمة (key-value database)](https://aws.amazon.com/nosql/key-value/) ومزامنة تلك البيانات تلقائيًا مع المكونات خارج السلسلة. بالإضافة إلى المزامنة، يسهل <span dir="ltr">MUD</span> توفير التحكم في الوصول، ويتيح للمستخدمين الآخرين [توسيع](https://mud.dev/guides/extending-a-world) تطبيقنا بدون إذن.

### تشغيل مثال كاسحة الألغام {#running-minesweeper-example}

لتشغيل مثال كاسحة الألغام:

1. تأكد من [تثبيت المتطلبات الأساسية](https://mud.dev/quickstart#prerequisites): [<span dir="ltr">Node</span>](https://mud.dev/quickstart#prerequisites)، و[<span dir="ltr">Foundry</span>](https://book.getfoundry.sh/getting-started/installation)، و[`git`](https://git-scm.com/downloads)، و[`pnpm`](https://git-scm.com/downloads)، و[`mprocs`](https://github.com/pvolok/mprocs).

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

   إذا تم تثبيت <span dir="ltr">Foundry</span> كجزء من `pnpm install`، فستحتاج إلى إعادة تشغيل واجهة سطر الأوامر.

4. صرّف (Compile) العقود

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. ابدأ تشغيل البرنامج (بما في ذلك سلسلة كتل [<span dir="ltr">anvil</span>](https://book.getfoundry.sh/anvil/)) وانتظر.

   ```sh copy
   mprocs
   ```

   لاحظ أن بدء التشغيل يستغرق وقتًا طويلاً. لرؤية التقدم، استخدم أولاً السهم لأسفل للتمرير إلى علامة التبويب <span dir="ltr">_contracts_</span> لرؤية عقود <span dir="ltr">MUD</span> التي يتم نشرها. عندما تتلقى رسالة <span dir="ltr">_Waiting for file changes…_</span>، تكون العقود قد نُشرت وسيحدث المزيد من التقدم في علامة التبويب <span dir="ltr">_server_</span>. هناك، انتظر حتى تتلقى رسالة <span dir="ltr">_Verifier address: 0x...._</span>.

   إذا نجحت هذه الخطوة، فسترى شاشة `mprocs`، مع العمليات المختلفة على اليسار ومخرجات وحدة التحكم للعملية المحددة حاليًا على اليمين.

   ![The mprocs screen](./mprocs.png)

   إذا كانت هناك مشكلة في `mprocs`، يمكنك تشغيل العمليات الأربع يدويًا، كل منها في نافذة سطر أوامر خاصة بها:

   - **<span dir="ltr">Anvil</span>**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **العقود (Contracts)** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **الخادم (Server)**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **العميل (Client)**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. الآن يمكنك تصفح [العميل](http://localhost:3000)، والنقر على **New Game**، والبدء في اللعب.

### الجداول {#tables}

نحتاج إلى [عدة جداول](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) على السلسلة.

- `Configuration`: هذا الجدول عبارة عن نمط أحادي، وليس له مفتاح ويحتوي على سجل واحد. يُستخدم للاحتفاظ بمعلومات تكوين اللعبة:
  - `height`: ارتفاع حقل الألغام
  - `width`: عرض حقل الألغام
  - `numberOfBombs`: عدد القنابل في كل حقل ألغام
- `VerifierAddress`: هذا الجدول هو أيضًا نمط أحادي. يُستخدم للاحتفاظ بجزء واحد من التكوين، وهو عنوان عقد المتحقق (`verifier`). كان بإمكاننا وضع هذه المعلومات في جدول `Configuration`، ولكن يتم تعيينها بواسطة مكون مختلف، وهو الخادم، لذلك من الأسهل وضعها في جدول منفصل.

- `PlayerGame`: المفتاح هو عنوان اللاعب. البيانات هي:

  - `gameId`: قيمة بحجم <span dir="ltr">32-byte</span> تمثل تجزئة الخريطة التي يلعب عليها اللاعب (معرف اللعبة).
  - `win`: قيمة منطقية (<span dir="ltr">boolean</span>) تحدد ما إذا كان اللاعب قد فاز باللعبة.
  - `lose`: قيمة منطقية تحدد ما إذا كان اللاعب قد خسر اللعبة.
  - `digNumber`: عدد عمليات الحفر الناجحة في اللعبة.

- `GamePlayer`: يحتفظ هذا الجدول بالتعيين العكسي، من `gameId` إلى عنوان اللاعب.

- `Map`: المفتاح عبارة عن صف (<span dir="ltr">tuple</span>) من ثلاث قيم:

  - `gameId`: قيمة بحجم <span dir="ltr">32-byte</span> تمثل تجزئة الخريطة التي يلعب عليها اللاعب (معرف اللعبة).
  - إحداثي `x`
  - إحداثي `y`

  القيمة عبارة عن رقم واحد. تكون 255 إذا تم اكتشاف قنبلة. بخلاف ذلك، فهي تمثل عدد القنابل حول ذلك الموقع زائد واحد. لا يمكننا استخدام عدد القنابل فقط، لأنه افتراضيًا تكون جميع مساحات التخزين في آلة الإيثيريوم الافتراضية (<span dir="ltr">EVM</span>) وجميع قيم الصفوف في <span dir="ltr">MUD</span> صفرًا. نحتاج إلى التمييز بين "اللاعب لم يحفر هنا بعد" و"اللاعب حفر هنا، ووجد أنه لا توجد قنابل حوله".

بالإضافة إلى ذلك، يتم الاتصال بين العميل والخادم من خلال المكون الموجود على السلسلة. يتم تنفيذ ذلك أيضًا باستخدام الجداول.

- `PendingGame`: الطلبات غير المخدومة لبدء لعبة جديدة.
- `PendingDig`: الطلبات غير المخدومة للحفر في مكان معين في لعبة معينة. هذا [جدول خارج السلسلة](https://mud.dev/store/tables#types-of-tables)، مما يعني أنه لا يُكتب في تخزين آلة الإيثيريوم الافتراضية (<span dir="ltr">EVM</span>)، بل يمكن قراءته فقط خارج السلسلة باستخدام الأحداث.

### تدفقات التنفيذ والبيانات {#execution-data-flows}

تنسق هذه التدفقات التنفيذ بين العميل، والمكون الموجود على السلسلة، والخادم.

#### التهيئة (Initialization) {#initialization-flow}

عند تشغيل `mprocs`، تحدث هذه الخطوات:

1. يُشغل [`mprocs`](https://github.com/pvolok/mprocs) أربعة مكونات:

   - [<span dir="ltr">Anvil</span>](https://book.getfoundry.sh/anvil/)، والذي يُشغل سلسلة كتل محلية
   - [العقود (Contracts)](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)، والتي تقوم بتصريف (إذا لزم الأمر) ونشر العقود لـ <span dir="ltr">MUD</span>
   - [العميل (Client)](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)، والذي يُشغل [<span dir="ltr">Vite</span>](https://vitejs.dev/) لتقديم واجهة المستخدم وكود العميل لمتصفحات الويب.
   - [الخادم (Server)](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)، والذي ينفذ إجراءات الخادم

2. تقوم حزمة `contracts` بنشر عقود <span dir="ltr">MUD</span> ثم تُشغل [البرنامج النصي `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). يحدد هذا البرنامج النصي التكوين. يحدد الكود من <span dir="ltr">GitHub</span> [حقل ألغام بحجم <span dir="ltr">10x5</span> يحتوي على ثمانية ألغام](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. يبدأ [الخادم](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) بـ [إعداد <span dir="ltr">MUD</span>](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). من بين أمور أخرى، يؤدي هذا إلى تنشيط مزامنة البيانات، بحيث توجد نسخة من الجداول ذات الصلة في ذاكرة الخادم.

4. يشترك الخادم في دالة ليتم تنفيذها [عندما يتغير جدول `Configuration`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). يتم استدعاء [هذه الدالة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) بعد تنفيذ `PostDeploy.s.sol` وتعديل الجدول.

5. عندما تحصل دالة تهيئة الخادم على التكوين، [فإنها تستدعي `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) لتهيئة [جزء المعرفة الصفرية من الخادم](#using-zokrates-from-typescript). لا يمكن أن يحدث هذا حتى نحصل على التكوين لأن دوال المعرفة الصفرية يجب أن تحتوي على عرض وارتفاع حقل الألغام كثوابت.

6. بعد تهيئة جزء المعرفة الصفرية من الخادم، الخطوة التالية هي [نشر عقد التحقق من المعرفة الصفرية على سلسلة الكتل](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) وتعيين عنوان المتحقق في <span dir="ltr">MUD</span>.

7. أخيرًا، نشترك في التحديثات حتى نرى متى يطلب اللاعب إما [بدء لعبة جديدة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) أو [الحفر في لعبة حالية](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### لعبة جديدة {#new-game-flow}

هذا ما يحدث عندما يطلب اللاعب لعبة جديدة.

1. إذا لم تكن هناك لعبة قيد التقدم لهذا اللاعب، أو كانت هناك لعبة ولكن بمعرف لعبة (<span dir="ltr">gameId</span>) يساوي صفرًا، يعرض العميل [زر لعبة جديدة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). عندما يضغط المستخدم على هذا الزر، [يُشغل <span dir="ltr">React</span> دالة `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) هو استدعاء `System`. في <span dir="ltr">MUD</span>، يتم توجيه جميع الاستدعاءات من خلال عقد `World`، وفي معظم الحالات تقوم باستدعاء `<namespace>__<function name>`. في هذه الحالة، يكون الاستدعاء إلى `app__newGame`، والذي يوجهه <span dir="ltr">MUD</span> بعد ذلك إلى [`newGame` في `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. تتحقق الدالة الموجودة على السلسلة من أن اللاعب ليس لديه لعبة قيد التقدم، وإذا لم تكن هناك لعبة، [تضيف الطلب إلى جدول `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. يكتشف الخادم التغيير في `PendingGame` و[يُشغل الدالة المشتركة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). تستدعي هذه الدالة [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)، والتي بدورها تستدعي [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. أول شيء تفعله `createGame` هو [إنشاء خريطة عشوائية بالعدد المناسب من الألغام](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). بعد ذلك، تستدعي [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) لإنشاء خريطة بحدود فارغة، وهو أمر ضروري لـ <span dir="ltr">Zokrates</span>. أخيرًا، تستدعي `createGame` [`calculateMapHash`](#calculatemaphash)، للحصول على تجزئة الخريطة، والتي تُستخدم كمعرف للعبة.

6. تضيف دالة `newGame` اللعبة الجديدة إلى `gamesInProgress`.

7. آخر شيء يفعله الخادم هو استدعاء [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)، والموجودة على السلسلة. توجد هذه الدالة في `System` مختلف، [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)، لتمكين التحكم في الوصول. يتم تعريف التحكم في الوصول في [ملف تكوين <span dir="ltr">MUD</span>](https://mud.dev/config)، [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   تسمح قائمة الوصول لعنوان واحد فقط باستدعاء `System`. يقيد هذا الوصول إلى دوال الخادم بعنوان واحد، بحيث لا يمكن لأحد انتحال شخصية الخادم.

8. يقوم المكون الموجود على السلسلة بتحديث الجداول ذات الصلة:

   - إنشاء اللعبة في `PlayerGame`.
   - تعيين التعيين العكسي في `GamePlayer`.
   - إزالة الطلب من `PendingGame`.

9. يحدد الخادم التغيير في `PendingGame`، لكنه لا يفعل أي شيء لأن [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) خاطئة (false).

10. على العميل، يتم تعيين [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) إلى إدخال `PlayerGame` لعنوان اللاعب. عندما يتغير `PlayerGame`، يتغير `gameRecord` أيضًا.

11. إذا كانت هناك قيمة في `gameRecord`، ولم يتم الفوز باللعبة أو خسارتها، فإن العميل [يعرض الخريطة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### الحفر (Dig) {#dig-flow}

1. ينقر اللاعب [على زر خلية الخريطة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)، مما يستدعي [دالة `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). تستدعي هذه الدالة [`dig` على السلسلة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. يقوم المكون الموجود على السلسلة [بإجراء عدد من فحوصات السلامة (<span dir="ltr">sanity checks</span>)](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)، وإذا نجحت، يضيف طلب الحفر إلى [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. يكتشف الخادم [التغيير في `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [إذا كان صالحًا](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)، فإنه [يستدعي كود المعرفة الصفرية](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (الموضح أدناه) لإنشاء كل من النتيجة وإثبات صحتها.

4. يستدعي [الخادم](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) على السلسلة.

5. تقوم `digResponse` بشيئين. أولاً، تتحقق من [إثبات المعرفة الصفرية](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). ثم، إذا كان الإثبات صحيحًا، فإنها تستدعي [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) لمعالجة النتيجة فعليًا.

6. تتحقق `processDigResult` مما إذا كانت اللعبة قد [خُسرت](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) أو [رُبحت](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86)، و[تُحدث `Map`، وهي الخريطة الموجودة على السلسلة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. يلتقط العميل التحديثات تلقائيًا و[يُحدث الخريطة المعروضة للاعب](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)، وإذا لزم الأمر، يخبر اللاعب ما إذا كان قد فاز أو خسر.

## استخدام Zokrates {#using-zokrates}

في التدفقات المشروحة أعلاه، تخطينا أجزاء المعرفة الصفرية، وتعاملنا معها كصندوق أسود. الآن دعونا نفتحه ونرى كيف تتم كتابة هذا الكود.

### تجزئة الخريطة {#hashing-map}

يمكننا استخدام [كود JavaScript هذا](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) لتنفيذ [Poseidon](https://www.poseidon-hash.info)، وهي دالة تجزئة Zokrates التي نستخدمها. ومع ذلك، على الرغم من أن هذا سيكون أسرع، إلا أنه سيكون أيضًا أكثر تعقيدًا من مجرد استخدام دالة تجزئة Zokrates للقيام بذلك. هذا دليل تعليمي، ولذلك تم تحسين الكود من أجل البساطة، وليس من أجل الأداء. لذلك، نحتاج إلى برنامجين مختلفين من Zokrates، أحدهما لمجرد حساب تجزئة خريطة (`hash`) والآخر لإنشاء إثبات المعرفة الصفرية فعليًا لنتيجة الحفر في موقع على الخريطة (`dig`).

### دالة التجزئة {#hash-function}

هذه هي الدالة التي تحسب تجزئة الخريطة. سنستعرض هذا الكود سطرًا بسطر.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

يستورد هذان السطران دالتين من [مكتبة Zokrates القياسية](https://zokrates.github.io/toolbox/stdlib.html). [الدالة الأولى](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) هي [تجزئة Poseidon](https://www.poseidon-hash.info/). تأخذ مصفوفة من [عناصر `field`](https://zokrates.github.io/language/types.html#field) وتُرجع `field`.

عادةً ما يكون عنصر الحقل في Zokrates أقل من <span dir="ltr">256 bits</span>، ولكن ليس بكثير. لتبسيط الكود، نقصر الخريطة على أن تصل إلى <span dir="ltr">512 bits</span>، ونقوم بتجزئة مصفوفة من أربعة حقول، وفي كل حقل نستخدم <span dir="ltr">128 bits</span> فقط. تقوم [دالة `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) بتغيير مصفوفة مكونة من <span dir="ltr">128 bits</span> إلى `field` لهذا الغرض.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

يبدأ هذا السطر تعريف دالة. تحصل `hashMap` على معلمة واحدة تسمى `map`، وهي مصفوفة `bool`(ean) ثنائية الأبعاد. حجم الخريطة هو `width+2` في `height+2` لأسباب [مشروحة أدناه](#why-map-border).

يمكننا استخدام `${width+2}` و `${height+2}` لأن برامج Zokrates مخزنة في هذا التطبيق كـ [سلاسل قوالب (template strings)](https://www.w3schools.com/js/js_string_templates.asp). يتم تقييم الكود بين `${` و `}` بواسطة JavaScript، وبهذه الطريقة يمكن استخدام البرنامج لأحجام خرائط مختلفة. تحتوي معلمة الخريطة على حدود بعرض موقع واحد في جميع أنحائها بدون أي قنابل، وهو السبب في أننا بحاجة إلى إضافة اثنين إلى العرض والارتفاع.

القيمة المرجعة هي `field` تحتوي على التجزئة.

```
bool[512] mut map1d = [false; 512];
```

الخريطة ثنائية الأبعاد. ومع ذلك، لا تعمل دالة `pack128` مع المصفوفات ثنائية الأبعاد. لذلك نقوم أولاً بتسوية الخريطة إلى مصفوفة بحجم <span dir="ltr">512-byte</span>، باستخدام `map1d`. افتراضيًا، متغيرات Zokrates هي ثوابت، لكننا بحاجة إلى تعيين قيم لهذه المصفوفة في حلقة تكرار، لذلك نعرّفها كـ [`mut`](https://zokrates.github.io/language/variables.html#mutability).

نحتاج إلى تهيئة المصفوفة لأن Zokrates لا يحتوي على `undefined`. التعبير `[false; 512]` يعني [مصفوفة من 512 قيمة `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
u32 mut counter = 0;
```

نحتاج أيضًا إلى عداد للتمييز بين البتات التي ملأناها بالفعل في `map1d` وتلك التي لم نملأها.

```
for u32 x in 0..${width+2} {
```

هذه هي الطريقة التي تعلن بها عن [حلقة `for`](https://zokrates.github.io/language/control_flow.html#for-loops) في Zokrates. يجب أن يكون لحلقة `for` في Zokrates حدود ثابتة، لأنه على الرغم من أنها تبدو كحلقة، إلا أن المترجم يقوم فعليًا بـ "فكها" (unrolls). التعبير `${width+2}` هو ثابت في وقت الترجمة لأن `width` يتم تعيينه بواسطة كود TypeScript قبل أن يستدعي المترجم.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

لكل موقع في الخريطة، ضع تلك القيمة في مصفوفة `map1d` وقم بزيادة العداد.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

تُستخدم `pack128` لإنشاء مصفوفة من أربع قيم `field` من `map1d`. في Zokrates، تعني `array[a..b]` شريحة المصفوفة التي تبدأ عند `a` وتنتهي عند `b-1`.

```
return poseidon(hashMe);
}
```

استخدم `poseidon` لتحويل هذه المصفوفة إلى تجزئة.

### برنامج التجزئة {#hash-program}

يحتاج الخادم إلى استدعاء `hashMap` مباشرة لإنشاء معرفات اللعبة. ومع ذلك، يمكن لـ Zokrates فقط استدعاء دالة `main` في برنامج للبدء، لذلك نقوم بإنشاء برنامج يحتوي على `main` يستدعي دالة التجزئة.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### برنامج الحفر {#dig-program}

هذا هو قلب جزء المعرفة الصفرية من التطبيق، حيث ننتج الإثباتات التي تُستخدم للتحقق من نتائج الحفر.

```
${hashFragment}

// عدد الألغام في الموقع (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### لماذا حدود الخريطة {#why-map-border}

تستخدم إثباتات المعرفة الصفرية [الدوائر الحسابية](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)، والتي لا تحتوي على مكافئ سهل لعبارة `if`. بدلاً من ذلك، يستخدمون ما يعادل [المعامل الشرطي (conditional operator)](https://en.wikipedia.org/wiki/Ternary_conditional_operator). إذا كان `a` يمكن أن يكون إما صفرًا أو واحدًا، فيمكنك حساب `if a { b } else { c }` كـ `ab+(1-a)c`.

بسبب هذا، تقوم عبارة `if` في Zokrates دائمًا بتقييم كلا الفرعين. على سبيل المثال، إذا كان لديك هذا الكود:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

سيؤدي ذلك إلى حدوث خطأ، لأنه يحتاج إلى حساب `arr[10]`، على الرغم من أن هذه القيمة سيتم ضربها لاحقًا في صفر.

هذا هو السبب في أننا نحتاج إلى حدود بعرض موقع واحد في جميع أنحاء الخريطة. نحتاج إلى حساب العدد الإجمالي للألغام حول موقع ما، وهذا يعني أننا بحاجة إلى رؤية الموقع بصف واحد أعلى وأسفل، وإلى اليسار واليمين، من الموقع الذي نحفر فيه. مما يعني أن هذه المواقع يجب أن تكون موجودة في مصفوفة الخريطة التي يتم توفيرها لـ Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

افتراضيًا، تتضمن إثباتات Zokrates مدخلاتها. لا يفيد معرفة وجود خمسة ألغام حول بقعة ما ما لم تكن تعرف بالفعل أي بقعة هي (ولا يمكنك فقط مطابقتها مع طلبك، لأنه حينها يمكن للمُثبِت استخدام قيم مختلفة وعدم إخبارك بذلك). ومع ذلك، نحتاج إلى إبقاء الخريطة سرية، مع توفيرها لـ Zokrates. الحل هو استخدام معلمة `private`، وهي معلمة _لا_ يتم الكشف عنها بواسطة الإثبات.

يفتح هذا مجالًا آخر لإساءة الاستخدام. يمكن للمُثبِت استخدام الإحداثيات الصحيحة، ولكن إنشاء خريطة بأي عدد من الألغام حول الموقع، وربما في الموقع نفسه. لمنع هذه الإساءة، نجعل إثبات المعرفة الصفرية يتضمن تجزئة الخريطة، وهو معرف اللعبة.

```
return (hashMap(map),
```

القيمة المرجعة هنا هي صف (tuple) يتضمن مصفوفة تجزئة الخريطة بالإضافة إلى نتيجة الحفر.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

نستخدم 255 كقيمة خاصة في حالة احتواء الموقع نفسه على قنبلة.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

إذا لم يصطدم اللاعب بلغم، أضف أعداد الألغام للمنطقة المحيطة بالموقع وأرجع ذلك.

### استخدام Zokrates من TypeScript {#using-zokrates-from-typescript}

يحتوي Zokrates على واجهة سطر أوامر، ولكن في هذا البرنامج نستخدمه في [كود TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

المكتبة التي تحتوي على تعريفات Zokrates تسمى [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

استورد [روابط JavaScript الخاصة بـ Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). نحتاج فقط إلى دالة [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) لأنها تُرجع وعدًا (promise) يتم حله إلى جميع تعريفات Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

على غرار Zokrates نفسه، نقوم أيضًا بتصدير دالة واحدة فقط، وهي أيضًا [غير متزامنة (asynchronous)](https://www.w3schools.com/js/js_async.asp). عندما تعود في النهاية، فإنها توفر العديد من الدوال كما سنرى أدناه.

```typescript
const zokrates = await zokratesInitialize()
```

قم بتهيئة Zokrates، واحصل على كل ما نحتاجه من المكتبة.

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

بعد ذلك لدينا دالة التجزئة وبرنامجي Zokrates اللذين رأيناهما أعلاه.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

هنا نقوم بترجمة (compile) تلك البرامج.

```typescript
// إنشاء المفاتيح للتحقق من المعرفة الصفرية.
// في نظام الإنتاج، سترغب في استخدام مراسم الإعداد.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

في نظام الإنتاج، قد نستخدم [مراسم إعداد (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) أكثر تعقيدًا، ولكن هذا جيد بما يكفي للتوضيح. لا توجد مشكلة في أن يتمكن المستخدمون من معرفة مفتاح المُثبِت - فلا يزال بإمكانهم عدم استخدامه لإثبات الأشياء ما لم تكن صحيحة. نظرًا لأننا نحدد الإنتروبيا (المعلمة الثانية، `""`)، فستكون النتائج دائمًا هي نفسها.

**ملاحظة:** تعد ترجمة برامج Zokrates وإنشاء المفاتيح عمليات بطيئة. ليست هناك حاجة لتكرارها في كل مرة، فقط عندما يتغير حجم الخريطة. في نظام الإنتاج، ستقوم بها مرة واحدة، ثم تقوم بتخزين المخرجات. السبب الوحيد لعدم قيامي بذلك هنا هو من أجل البساطة.

#### `calculateMapHash` {#calculatemaphash}

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

تقوم دالة [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) فعليًا بتشغيل برنامج Zokrates. تُرجع بنية تحتوي على حقلين: `output`، وهو مخرجات البرنامج كسلسلة JSON، و `witness`، وهي المعلومات اللازمة لإنشاء إثبات المعرفة الصفرية للنتيجة. هنا نحتاج فقط إلى المخرجات.

المخرجات عبارة عن سلسلة بالصيغة `"31337"`، وهو رقم عشري محاط بعلامات اقتباس. لكن المخرجات التي نحتاجها لـ `viem` هي رقم سداسي عشري بالصيغة `0x60A7`. لذلك نستخدم `.slice(1,-1)` لإزالة علامات الاقتباس ثم `BigInt` لتشغيل السلسلة المتبقية، وهي رقم عشري، إلى [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). تقوم `.toString(16)` بتحويل `BigInt` هذا إلى سلسلة سداسية عشرية، وتضيف `"0x"+` العلامة الخاصة بالأرقام السداسية العشرية.

```typescript
// احفر وأرجع إثبات المعرفة الصفرية للنتيجة
// (كود جهة الخادم)
```

يتضمن إثبات المعرفة الصفرية المدخلات العامة (`x` و `y`) والنتائج (تجزئة الخريطة وعدد القنابل).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

تعتبر مشكلة التحقق مما إذا كان المؤشر خارج الحدود في Zokrates، لذلك نقوم بذلك هنا.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

قم بتنفيذ برنامج الحفر.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

استخدم [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) وأرجع الإثبات.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

متحقق Solidity، وهو عقد ذكي يمكننا نشره على سلسلة الكتل واستخدامه للتحقق من الإثباتات التي تم إنشاؤها بواسطة `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

أخيرًا، أرجع كل ما قد يحتاجه الكود الآخر.

## اختبارات الأمان {#security-tests}

تعتبر اختبارات الأمان مهمة لأن أي خطأ وظيفي سيظهر في النهاية. ولكن إذا كان التطبيق غير آمن، فمن المحتمل أن يظل ذلك مخفيًا لفترة طويلة قبل أن ينكشف بواسطة شخص يغش ويستولي على موارد تخص الآخرين.

### الأذونات {#permissions}

يوجد كيان واحد يتمتع بامتيازات في هذه اللعبة، وهو الخادم. إنه المستخدم الوحيد المسموح له باستدعاء الدوال في [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). يمكننا استخدام [`cast`](https://book.getfoundry.sh/cast/) للتحقق من أن استدعاءات الدوال المصرح بها مسموحة فقط لحساب الخادم.

[المفتاح الخاص بالخادم موجود في `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. على جهاز الكمبيوتر الذي يُشغل `anvil` (سلسلة الكتل)، قم بتعيين متغيرات البيئة هذه.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. استخدم `cast` لمحاولة تعيين عنوان المتحقق كعنوان غير مصرح به.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   لا يقتصر الأمر على إبلاغ `cast` عن فشل، بل يمكنك فتح **MUD Dev Tools** في اللعبة على المتصفح، والنقر على **Tables**، وتحديد **app\_\_VerifierAddress**. لاحظ أن العنوان ليس صفرًا.

3. قم بتعيين عنوان المتحقق كعنوان الخادم.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   يجب أن يكون العنوان في **app\_\_VerifiedAddress** الآن صفرًا.

تمر جميع دوال MUD في نفس الـ `System` عبر نفس التحكم في الوصول، لذا أعتبر هذا الاختبار كافيًا. إذا لم تكن تعتقد ذلك، يمكنك التحقق من الدوال الأخرى في [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### إساءة استخدام المعرفة الصفرية {#zero-knowledge-abuses}

الرياضيات اللازمة للتحقق من Zokrates تقع خارج نطاق هذا البرنامج التعليمي (وقدراتي). ومع ذلك، يمكننا إجراء فحوصات مختلفة على كود المعرفة الصفرية للتحقق من أنه إذا لم يتم بشكل صحيح فإنه يفشل. ستتطلب منا جميع هذه الاختبارات تغيير [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) وإعادة تشغيل التطبيق بأكمله. لا يكفي إعادة تشغيل عملية الخادم، لأن ذلك يضع التطبيق في حالة مستحيلة (اللاعب لديه لعبة قيد التقدم، لكن اللعبة لم تعد متاحة للخادم).

#### إجابة خاطئة {#wrong-answer}

الاحتمال الأبسط هو تقديم إجابة خاطئة في إثبات المعرفة الصفرية. للقيام بذلك، ندخل إلى `zkDig` و[نعدل السطر <span dir="ltr">91</span>](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

هذا يعني أننا سنطالب دائمًا بوجود قنبلة واحدة، بغض النظر عن الإجابة الصحيحة. حاول اللعب بهذه النسخة، وسترى في علامة التبويب **server** على شاشة `pnpm dev` هذا الخطأ:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

لذا فإن هذا النوع من الغش يفشل.

#### إثبات خاطئ {#wrong-proof}

ماذا يحدث إذا قدمنا المعلومات الصحيحة، ولكن كانت بيانات الإثبات خاطئة؟ الآن، استبدل السطر <span dir="ltr">91</span> بـ:

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

لا يزال يفشل، ولكنه الآن يفشل بدون سبب لأن ذلك يحدث أثناء استدعاء المتحقق.

### كيف يمكن للمستخدم التحقق من كود انعدام الثقة؟ {#user-verify-zero-trust}

من السهل نسبيًا التحقق من العقود الذكية. عادةً، ينشر المطور الكود المصدري على مستكشف الكتل، ويتحقق مستكشف الكتل من أن الكود المصدري يُترجم بالفعل إلى الكود الموجود في [معاملة نشر العقد](/developers/docs/smart-contracts/deploying/). في حالة الـ `System` الخاصة بـ MUD، يكون هذا [أكثر تعقيدًا بعض الشيء](https://mud.dev/cli/verify)، ولكن ليس كثيرًا.

هذا أصعب مع المعرفة الصفرية. يتضمن المتحقق بعض الثوابت ويجري بعض الحسابات عليها. هذا لا يخبرك بما يتم إثباته.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

الحل، على الأقل حتى تقوم مستكشفات الكتل بإضافة التحقق من Zokrates إلى واجهات المستخدم الخاصة بها، هو أن يقوم مطورو التطبيقات بتوفير برامج Zokrates، وأن يقوم بعض المستخدمين على الأقل بتجميعها بأنفسهم باستخدام مفتاح التحقق المناسب.

للقيام بذلك:

1. [قم بتثبيت Zokrates](https://zokrates.github.io/gettingstarted.html).
2. قم بإنشاء ملف، `dig.zok`، يحتوي على برنامج Zokrates. يفترض الكود أدناه أنك احتفظت بحجم الخريطة الأصلي، <span dir="ltr">10x5</span>.

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


    // عدد الألغام في الموقع (x,y)
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

3. قم بتجميع كود Zokrates وإنشاء مفتاح التحقق. يجب إنشاء مفتاح التحقق بنفس الإنتروبيا المستخدمة في الخادم الأصلي، [وهي في هذه الحالة سلسلة فارغة](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. قم بإنشاء متحقق Solidity بنفسك، وتحقق من أنه متطابق وظيفيًا مع ذلك الموجود على سلسلة الكتل (يضيف الخادم تعليقًا، لكن هذا ليس مهمًا).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## قرارات التصميم {#design}

في أي تطبيق معقد بما فيه الكفاية، توجد أهداف تصميم متنافسة تتطلب إجراء مقايضات. دعونا نلقي نظرة على بعض هذه المقايضات ولماذا يعتبر الحل الحالي مفضلاً على الخيارات الأخرى.

### لماذا المعرفة الصفرية {#why-zero-knowledge}

بالنسبة للعبة كاسحة الألغام، لست بحاجة حقًا إلى المعرفة الصفرية. يمكن للخادم دائمًا الاحتفاظ بالخريطة، ثم الكشف عنها بالكامل عند انتهاء اللعبة. بعد ذلك، في نهاية اللعبة، يمكن للعقد الذكي حساب تجزئة الخريطة، والتحقق من تطابقها، وإذا لم تتطابق، فإنه يعاقب الخادم أو يتجاهل اللعبة تمامًا.

لم أستخدم هذا الحل الأبسط لأنه يعمل فقط مع الألعاب القصيرة ذات الحالة النهائية المحددة جيدًا. عندما تكون اللعبة لا نهائية محتملة (كما هو الحال مع [العوالم المستقلة](https://0xparc.org/blog/autonomous-worlds))، فإنك تحتاج إلى حل يثبت الحالة _دون_ الكشف عنها.

باعتباره برنامجًا تعليميًا، احتاج هذا المقال إلى لعبة قصيرة يسهل فهمها، ولكن هذه التقنية تكون أكثر فائدة للألعاب الأطول.

### لماذا Zokrates؟ {#why-zokrates}

لا تعتبر [Zokrates](https://zokrates.github.io/) مكتبة المعرفة الصفرية الوحيدة المتاحة، ولكنها تشبه لغة برمجة [حتمية](https://en.wikipedia.org/wiki/Imperative_programming) عادية وتدعم المتغيرات المنطقية.

بالنسبة لتطبيقك، بمتطلبات مختلفة، قد تفضل استخدام [Circum](https://docs.circom.io/getting-started/installation/) أو [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### متى يتم تجميع Zokrates {#when-compile-zokrates}

في هذا البرنامج، نقوم بتجميع برامج Zokrates [في كل مرة يبدأ فيها الخادم](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). من الواضح أن هذا إهدار للموارد، ولكن هذا برنامج تعليمي، تم تحسينه من أجل البساطة.

إذا كنت أكتب تطبيقًا على مستوى الإنتاج، فسأتحقق مما إذا كان لدي ملف يحتوي على برامج Zokrates المجمعة بحجم حقل الألغام هذا، وإذا كان الأمر كذلك، فسأستخدمه. ينطبق الشيء نفسه على نشر عقد متحقق على السلسلة.

### إنشاء مفاتيح المتحقق والمُثبِت {#key-creation}

يعد [إنشاء المفتاح](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) عملية حسابية بحتة أخرى لا يلزم إجراؤها أكثر من مرة لحجم حقل ألغام معين. مرة أخرى، يتم إجراؤها مرة واحدة فقط من أجل البساطة.

بالإضافة إلى ذلك، يمكننا استخدام [مراسم الإعداد](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). ميزة مراسم الإعداد هي أنك تحتاج إما إلى الإنتروبيا أو بعض النتائج الوسيطة من كل مشارك للغش في إثبات المعرفة الصفرية. إذا كان مشارك واحد على الأقل في المراسم صادقًا وحذف تلك المعلومات، فإن إثباتات المعرفة الصفرية تكون آمنة من هجمات معينة. ومع ذلك، _لا توجد آلية_ للتحقق من حذف المعلومات من كل مكان. إذا كانت إثباتات المعرفة الصفرية بالغة الأهمية، فستحتاج إلى المشاركة في مراسم الإعداد.

هنا نعتمد على [قوى تاو الدائمة (perpetual powers of tau)](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)، والتي كان بها العشرات من المشاركين. من المحتمل أن تكون آمنة بما فيه الكفاية، وأبسط بكثير. كما أننا لا نضيف إنتروبيا أثناء إنشاء المفتاح، مما يسهل على المستخدمين [التحقق من تكوين المعرفة الصفرية](#user-verify-zero-trust).

### أين يتم التحقق {#where-verification}

يمكننا التحقق من إثباتات المعرفة الصفرية إما على السلسلة (مما يكلف غاز) أو في العميل (باستخدام [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). اخترت الخيار الأول، لأن هذا يتيح لك [التحقق من المتحقق](#user-verify-zero-trust) مرة واحدة ثم الوثوق بأنه لن يتغير طالما ظل عنوان العقد الخاص به كما هو. إذا تم التحقق على العميل، فسيتعين عليك التحقق من الكود الذي تتلقاه في كل مرة تقوم فيها بتنزيل العميل.

أيضًا، في حين أن هذه اللعبة مخصصة للاعب واحد، فإن الكثير من ألعاب سلسلة الكتل متعددة اللاعبين. التحقق على السلسلة يعني أنك تتحقق من إثبات المعرفة الصفرية مرة واحدة فقط. القيام بذلك في العميل سيتطلب من كل عميل التحقق بشكل مستقل.

### تسطيح الخريطة في TypeScript أو Zokrates؟ {#where-flatten}

بشكل عام، عندما يمكن إجراء المعالجة إما في TypeScript أو Zokrates، فمن الأفضل القيام بذلك في TypeScript، وهو أسرع بكثير، ولا يتطلب إثباتات المعرفة الصفرية. هذا هو السبب، على سبيل المثال، في أننا لا نزود Zokrates بالتجزئة ونجعله يتحقق من صحتها. يجب أن تتم عملية التجزئة داخل Zokrates، ولكن التطابق بين التجزئة المرجعة والتجزئة على السلسلة يمكن أن يحدث خارجه.

ومع ذلك، ما زلنا [نسطح الخريطة في Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)، بينما كان بإمكاننا القيام بذلك في TypeScript. السبب هو أن الخيارات الأخرى، في رأيي، أسوأ.

- توفير مصفوفة أحادية البعد من القيم المنطقية لكود Zokrates، واستخدام تعبير مثل `x*(height+2)
+y` للحصول على الخريطة ثنائية الأبعاد. هذا من شأنه أن يجعل [الكود](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) أكثر تعقيدًا إلى حد ما، لذلك قررت أن مكاسب الأداء لا تستحق العناء بالنسبة لبرنامج تعليمي.

- إرسال كل من المصفوفة أحادية البعد والمصفوفة ثنائية الأبعاد إلى Zokrates. ومع ذلك، فإن هذا الحل لا يكسبنا أي شيء. سيتعين على كود Zokrates التحقق من أن المصفوفة أحادية البعد المقدمة له هي بالفعل التمثيل الصحيح للمصفوفة ثنائية الأبعاد. لذلك لن يكون هناك أي مكاسب في الأداء.

- تسطيح المصفوفة ثنائية الأبعاد في Zokrates. هذا هو الخيار الأبسط، لذلك اخترته.

### أين يتم تخزين الخرائط {#where-store-maps}

في هذا التطبيق، [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) هو ببساطة متغير في الذاكرة. هذا يعني أنه إذا توقف الخادم عن العمل واحتاج إلى إعادة التشغيل، فستفقد جميع المعلومات التي قام بتخزينها. لن يتمكن اللاعبون من مواصلة لعبتهم فحسب، بل لن يتمكنوا حتى من بدء لعبة جديدة لأن المكون الموجود على السلسلة يعتقد أن لديهم لعبة لا تزال قيد التقدم.

من الواضح أن هذا تصميم سيء لنظام إنتاج، حيث ستقوم بتخزين هذه المعلومات في قاعدة بيانات. السبب الوحيد لاستخدامي متغيرًا هنا هو أن هذا برنامج تعليمي والبساطة هي الاعتبار الرئيسي.

## الخلاصة: ما هي الظروف التي تجعل هذه التقنية مناسبة؟ {#conclusion}

إذن، أنت تعرف الآن كيفية كتابة لعبة بخادم يخزن حالة سرية لا يجب أن تكون على السلسلة. ولكن في أي الحالات يجب عليك القيام بذلك؟ هناك اعتباران رئيسيان.

- _لعبة طويلة الأمد_: [كما ذكرنا أعلاه](#why-zero-knowledge)، في اللعبة القصيرة يمكنك ببساطة نشر الحالة بمجرد انتهاء اللعبة والتحقق من كل شيء حينها. ولكن هذا ليس خيارًا عندما تستغرق اللعبة وقتًا طويلاً أو غير محدد، وتحتاج الحالة إلى البقاء سرية.

- _بعض المركزية مقبولة_: يمكن لإثباتات المعرفة الصفرية التحقق من النزاهة، أي أن الكيان لا يزيف النتائج. ما لا يمكنها فعله هو ضمان أن الكيان سيظل متاحًا ويرد على الرسائل. في المواقف التي يجب أن يكون فيها التوافر لامركزيًا أيضًا، لا تعد إثباتات المعرفة الصفرية حلاً كافيًا، وتحتاج إلى [حوسبة متعددة الأطراف](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).

### شكر وتقدير {#acknowledgements}

- قرأ ألفارو ألونسو مسودة هذا المقال وأوضح بعض المفاهيم الخاطئة لدي حول <span dir="ltr">Zokrates</span>.

أي أخطاء متبقية هي مسؤوليتي.