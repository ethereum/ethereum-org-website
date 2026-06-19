---
title: "تعلم موضوعات إيثيريوم الأساسية باستخدام ⁦SQL⁩"
description: "يساعد هذا البرنامج التعليمي القراء على فهم مفاهيم إيثيريوم الأساسية بما في ذلك المعاملات والكتل والغاز من خلال الاستعلام عن البيانات على السلسلة باستخدام لغة الاستعلام المهيكلة (⁦SQL⁩)."
author: "بول أبيفات"
tags:
  - "SQL"
  - "الاستعلام"
  - "المعاملات"
  - "البيانات والتحليلات"
skill: beginner
breadcrumb: "إيثيريوم مع ⁦SQL⁩"
lang: ar
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

تستهدف العديد من البرامج التعليمية الخاصة بإيثيريوم المطورين، ولكن هناك نقص في الموارد التعليمية لمحللي البيانات أو للأشخاص الذين يرغبون في رؤية البيانات على السلسلة دون تشغيل عميل أو عقدة.

يساعد هذا البرنامج التعليمي القراء على فهم مفاهيم إيثيريوم الأساسية بما في ذلك المعاملات والكتل والغاز من خلال الاستعلام عن البيانات على السلسلة باستخدام لغة الاستعلام المهيكلة (<span dir="ltr">SQL</span>) من خلال واجهة توفرها [Dune Analytics](https://dune.com/).

يمكن أن تساعدنا البيانات على السلسلة في فهم إيثيريوم، والشبكة، وكاقتصاد لقوة الحوسبة، ويجب أن تكون بمثابة أساس لفهم التحديات التي تواجه إيثيريوم اليوم (أي ارتفاع أسعار الغاز)، والأهم من ذلك، المناقشات حول حلول التوسع.

### المعاملات {#transactions}

تبدأ رحلة المستخدم على إيثيريوم بتهيئة حساب يتحكم فيه المستخدم أو كيان برصيد <span dir="ltr">ETH</span>. هناك نوعان من الحسابات - حساب يتحكم فيه المستخدم أو عقد ذكي (انظر [ethereum.org](/developers/docs/accounts/)).

يمكن عرض أي حساب على مستكشف الكتل مثل [Etherscan](https://etherscan.io/) أو [Blockscout](https://eth.blockscout.com/). مستكشفات الكتل هي بوابة لبيانات إيثيريوم. فهي تعرض، في الوقت الفعلي، بيانات حول الكتل والمعاملات والمُعَدِّنين والحسابات والأنشطة الأخرى على السلسلة (انظر [هنا](/developers/docs/data-and-analytics/block-explorers/)).

ومع ذلك، قد يرغب المستخدم في الاستعلام عن البيانات مباشرة لمطابقة المعلومات التي توفرها مستكشفات الكتل الخارجية. توفر [Dune Analytics](https://dune.com/) هذه الإمكانية لأي شخص لديه بعض المعرفة بلغة <span dir="ltr">SQL</span>.

كمرجع، يمكن عرض حساب العقد الذكي الخاص بمؤسسة إيثيريوم (<span dir="ltr">EF</span>) على [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe).

الشيء الوحيد الذي يجب ملاحظته هو أن جميع الحسابات، بما في ذلك حساب مؤسسة إيثيريوم، لها عنوان عام يمكن استخدامه لإرسال واستقبال المعاملات.

يتكون رصيد الحساب على Etherscan من المعاملات العادية والمعاملات الداخلية. المعاملات الداخلية، على الرغم من اسمها، ليست معاملات _فعلية_ تغير حالة السلسلة. إنها تحويلات قيمة يتم إجراؤها عن طريق تنفيذ عقد ([المصدر](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). نظرًا لأن المعاملات الداخلية ليس لها توقيع، فهي **غير** مدرجة في سلسلة الكتل ولا يمكن الاستعلام عنها باستخدام Dune Analytics.

لذلك، سيركز هذا البرنامج التعليمي على المعاملات العادية. يمكن الاستعلام عن ذلك على النحو التالي:

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

سينتج عن ذلك نفس المعلومات المقدمة في صفحة المعاملات الخاصة بـ Etherscan. للمقارنة، إليك المصدرين:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[صفحة عقد مؤسسة إيثيريوم على Blockscout.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

يمكنك العثور على لوحة المعلومات [هنا](https://dune.com/paulapivat/Learn-Ethereum). انقر على الجدول لرؤية الاستعلام (انظر أيضًا أعلاه).

### تفصيل المعاملات {#breaking-down-transactions}

تتضمن المعاملة المُقدمة عدة أجزاء من المعلومات بما في ذلك ([المصدر](/developers/docs/transactions/)):

- **المستلم**: عنوان الاستلام (يُستعلم عنه كـ "to")
- **التوقيع**: بينما تقوم المفاتيح الخاصة للمرسل بتوقيع معاملة، فإن ما يمكننا الاستعلام عنه باستخدام <span dir="ltr">SQL</span> هو العنوان العام للمرسل ("from").
- **القيمة**: هذا هو مقدار <span dir="ltr">ETH</span> المحول (انظر عمود `ether`).
- **البيانات**: هذه بيانات عشوائية تم إجراء تجزئة لها (انظر عمود `data`)
- **حد الغاز (gasLimit)** – الحد الأقصى لعدد وحدات الغاز التي يمكن أن تستهلكها المعاملة. تمثل وحدات الغاز خطوات حسابية
- **الحد الأقصى لرسوم الأولوية لكل غاز (maxPriorityFeePerGas)** - الحد الأقصى لمقدار الغاز الذي سيتم تضمينه كإكرامية للمُعَدِّن
- **الحد الأقصى للرسوم لكل غاز (maxFeePerGas)** - الحد الأقصى لمقدار الغاز الذي يُرغب في دفعه مقابل المعاملة (شاملاً baseFeePerGas و maxPriorityFeePerGas)

يمكننا الاستعلام عن هذه الأجزاء المحددة من المعلومات للمعاملات المرسلة إلى العنوان العام لمؤسسة إيثيريوم:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### الكتل {#blocks}

ستغير كل معاملة حالة آلة إيثيريوم الافتراضية ([EVM](/developers/docs/evm/)) ([المصدر](/developers/docs/transactions/)). يتم بث المعاملات إلى الشبكة ليتم التحقق منها وتضمينها في كتلة. ترتبط كل معاملة برقم كتلة. لرؤية البيانات، يمكننا الاستعلام عن رقم كتلة محدد: <span dir="ltr">12396854</span> (أحدث كتلة بين معاملات مؤسسة إيثيريوم حتى وقت كتابة هذا التقرير، <span dir="ltr">11/5/21</span>).

علاوة على ذلك، عندما نستعلم عن الكتلتين التاليتين، يمكننا أن نرى أن كل كتلة تحتوي على تجزئة الكتلة السابقة (أي تجزئة الأصل)، مما يوضح كيف تتشكل سلسلة الكتل.

تحتوي كل كتلة على إشارة إلى كتلتها الأصلية. يظهر هذا أدناه بين عمودي `hash` و `parent_hash` ([المصدر](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

إليك [الاستعلام](https://dune.com/queries/44856/88292) على Dune Analytics:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

يمكننا فحص كتلة من خلال الاستعلام عن الوقت ورقم الكتلة والصعوبة والتجزئة وتجزئة الأصل والرقم الفريد.

الشيء الوحيد الذي لا يغطيه هذا الاستعلام هو _قائمة المعاملات_ والتي تتطلب استعلامًا منفصلاً أدناه و _جذر الحالة_. ستقوم العقدة الكاملة أو الأرشيفية بتخزين جميع المعاملات وانتقالات الحالة، مما يسمح للعملاء بالاستعلام عن حالة السلسلة في أي وقت. نظرًا لأن هذا يتطلب مساحة تخزين كبيرة، يمكننا فصل بيانات السلسلة عن بيانات الحالة:

- بيانات السلسلة (قائمة الكتل والمعاملات)
- بيانات الحالة (نتيجة انتقال حالة كل معاملة)

يقع جذر الحالة في الفئة الأخيرة وهو بيانات _ضمنية_ (غير مخزنة على السلسلة)، بينما بيانات السلسلة صريحة ومخزنة على السلسلة نفسها ([المصدر](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

في هذا البرنامج التعليمي، سنركز على البيانات على السلسلة التي _يمكن_ الاستعلام عنها باستخدام <span dir="ltr">SQL</span> عبر Dune Analytics.

كما ذكرنا أعلاه، تحتوي كل كتلة على قائمة بالمعاملات، ويمكننا الاستعلام عن ذلك عن طريق التصفية لكتلة معينة. سنجرب أحدث كتلة، <span dir="ltr">12396854</span>:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

إليك مخرجات <span dir="ltr">SQL</span> على Dune:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

تؤدي إضافة هذه الكتلة الواحدة إلى السلسلة إلى تغيير حالة آلة إيثيريوم الافتراضية ([EVM](/developers/docs/evm/)). يتم التحقق من العشرات وأحيانًا المئات من المعاملات في وقت واحد. في هذه الحالة المحددة، تم تضمين <span dir="ltr">222</span> معاملة.

لمعرفة عدد المعاملات الناجحة فعليًا، سنضيف عامل تصفية آخر لحساب المعاملات الناجحة:

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

بالنسبة للكتلة <span dir="ltr">12396854</span>، من إجمالي <span dir="ltr">222</span> معاملة، تم التحقق بنجاح من <span dir="ltr">204</span> معاملة:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

تحدث طلبات المعاملات عشرات المرات في الثانية، ولكن يتم الالتزام بالكتل مرة واحدة تقريبًا كل <span dir="ltr">15</span> ثانية ([المصدر](/developers/docs/blocks/)).

لمعرفة أنه يتم إنتاج كتلة واحدة تقريبًا كل <span dir="ltr">15</span> ثانية، يمكننا أخذ عدد الثواني في اليوم (<span dir="ltr">86400</span>) مقسومًا على <span dir="ltr">15</span> للحصول على متوسط تقديري لعدد الكتل في اليوم (حوالي <span dir="ltr">~ 5760</span>).

المخطط البياني لكتل إيثيريوم المنتجة يوميًا (<span dir="ltr">2016</span> - الحاضر) هو:

![Chart showing daily Ethereum block production](./daily_blocks.png)

متوسط عدد الكتل المنتجة يوميًا خلال هذه الفترة الزمنية هو <span dir="ltr">~5,874</span>:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

الاستعلامات هي:

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

متوسط عدد الكتل المنتجة يوميًا منذ عام <span dir="ltr">2016</span> أعلى قليلاً من هذا الرقم عند <span dir="ltr">5,874</span>. بدلاً من ذلك، فإن قسمة <span dir="ltr">86400</span> ثانية على <span dir="ltr">5874</span> متوسط الكتل ينتج عنه <span dir="ltr">14.7</span> ثانية أو ما يقرب من كتلة واحدة كل <span dir="ltr">15</span> ثانية.

### الغاز {#gas}

الكتل محدودة الحجم. الحد الأقصى لحجم الكتلة ديناميكي ويختلف وفقًا لطلب الشبكة بين <span dir="ltr">12,500,000</span> و <span dir="ltr">25,000,000</span> وحدة. الحدود مطلوبة لمنع أحجام الكتل الكبيرة بشكل عشوائي من الضغط على العقد الكاملة من حيث مساحة القرص ومتطلبات السرعة ([المصدر](/developers/docs/blocks/)).

تتمثل إحدى طرق تصور حد الغاز للكتلة في التفكير فيه على أنه **المعروض** من مساحة الكتلة المتاحة لتجميع المعاملات. يمكن الاستعلام عن حد الغاز للكتلة وتصوره من عام <span dir="ltr">2016</span> حتى يومنا هذا:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

ثم هناك الغاز الفعلي المستخدم يوميًا لدفع تكاليف الحوسبة التي تتم على سلسلة إيثيريوم (أي إرسال معاملة، أو استدعاء عقد ذكي، أو سك رمز غير قابل للاستبدال). هذا هو **الطلب** على مساحة كتلة إيثيريوم المتاحة:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

يمكننا أيضًا وضع هذين المخططين معًا لمعرفة كيف يتوافق **الطلب والعرض**:

![gas_demand_supply](./gas_demand_supply.png)

لذلك يمكننا فهم أسعار الغاز كدالة للطلب على مساحة كتلة إيثيريوم، بالنظر إلى العرض المتاح.

أخيرًا، قد نرغب في الاستعلام عن متوسط أسعار الغاز اليومية لسلسلة إيثيريوم، ومع ذلك، فإن القيام بذلك سيؤدي إلى وقت استعلام طويل بشكل خاص، لذلك سنقوم بتصفية استعلامنا إلى متوسط كمية الغاز المدفوعة لكل معاملة بواسطة مؤسسة إيثيريوم.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

يمكننا أن نرى أسعار الغاز المدفوعة لجميع المعاملات التي تمت إلى عنوان مؤسسة إيثيريوم على مر السنين. إليك الاستعلام:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### الخلاصة {#summary}

من خلال هذا البرنامج التعليمي، نفهم مفاهيم إيثيريوم الأساسية وكيف تعمل سلسلة كتل إيثيريوم من خلال الاستعلام والتعرف على البيانات على السلسلة.

يمكن العثور على لوحة المعلومات التي تحتوي على جميع التعليمات البرمجية المستخدمة في هذا البرنامج التعليمي [هنا](https://dune.com/paulapivat/Learn-Ethereum).

لمزيد من استخدام البيانات لاستكشاف Web3 [تواصل معي على تويتر](https://twitter.com/paulapivat).