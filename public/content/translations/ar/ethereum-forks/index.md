---
title: الجدول الزمني لجميع انقسامات إيثريوم (2014 حتى الآن)
description: تاريخ بلوكشين إيثيريوم بما في ذلك المعالم الرئيسية والإصدارات والشوارك.
lang: ar
sidebarDepth: 1
---

# الجدول الزمني لجميع انقسامات إيثريوم (2014 حتى الآن) {#the-history-of-ethereum}

جدول زمني لجميع التغيرات الرئيسية والانقسامات "Forks" والتحديثات على بلوكتشين الايثيريوم.

<ExpandableCard title="ما هي الانقسامات؟" contentPreview="تغييرات في قواعد بروتوكول إيثريوم تتضمن غالبًا ترقيات فنية مخططًا لها.">

الانقسامات "Forks" هي عندما يلزم إجراء ترقيات أو تغييرات تقنية رئيسية على الشبكة - تنبع عادةً من [اقتراحات تحسين Ethereum (EIPs)] (/ eips /) وتغيير "قواعد" البروتوكول.

وعندما تكون هناك حاجة إلى تحسينات في البرمجيات التقليدية الخاضعة للرقابة المركزية، ستكتفي الشركة بنشر نسخة جديدة للمستخدم النهائي. تعمل سلاسل الكتل"البلوكتشين" بشكل مختلف لأنه لا توجد ملكية مركزية. [عملاء إيثيريوم] (/developers/docs/nodes-and-clients/) يجب أن يحدّثوا برامجياتهم لتنفيذ قواعد الشوكات الجديدة. يجب على صانعوا بلوك بلس (عمال المناجم في عالم إثبات العمل, المصححون في عالم إثبات الحصة) والعقد إنشاء كتل برمجية والتحقق من صحة القواعد الجديدة. [المزيد عن آليات الإجماع](/developers/docs/consensus-mechanisms/)

قد تؤدي هذه التغييرات في القواعد إلى انقسام مؤقت في الشبكة. يمكن إنتاج كتل جديدة وفقاً للقواعد الجديدة أو القديمة. عادةً ما يتم الإتفاق على التَفَرُّعات في وقت مبكر بحيث يعتمد العملاء التغيرات في الوحدة و يصبح التَفَرُّع مع التحديثات السلسلة الرئيسية. ومع ذلك، في حالات نادرة، يمكن أن تؤدي الخلافات حول الشوكات إلى انقسام الشبكة بشكل دائم - وأبرزها إنشاء Ethereum Classic مع <a href="#dao-fork">شوكة DAO</a>.

</ExpandableCard>

<ExpandableCard title="لماذا تحمل بعض الترقيات أسماء متعددة؟" contentPreview="أسماء الترقيات تتبع نمطًا معينًا">

يتكون البرنامج الذي يقوم عليه الإيثريوم من نصفين، يُعرفان باسم [طبقة التنفيذ](/glossary/#execution-layer) و[طبقة الإجماع](/glossary/#consensus-layer).

**تسمية ترقيات التنفيذ**

منذ عام 2021، تمت تسمية ترقيات **طبقة التنفيذ** وفقًا لأسماء مدن [مواقع ديفكون السابقة](https://devcon.org/en/past-events/) بالترتيب الزمني:

| اسم الترقية | سنة ديفكون          | رقم ديفكون | تاريخ الترقية         |
| ----------- | ------------------- | ---------- | --------------------- |
| برلين       | ألفين وأربعة عشر    | 0          | 15 أبريل 2021         |
| لندن        | ألفين وخمسة عشر     | أنا        | 5 أغسطس 2021          |
| Shanghai    | ألفين وستة عشر      | II         | 12 أبريل 2023         |
| Cancun      | ألفين وسبعة عشر     | III        | 13 مارس 2024          |
| **Prague**  | 2018                | IV         | يُحدد لاحقًا - التالي |
| _Osaka_     | ألفين وتسعة عشر     | V          | يُحدد لاحقًا          |
| _Bogota_    | 2022                | VI         | يُحدد لاحقًا          |
| _Bangkok_   | ألفين وأربعة وعشرون | VII        | يُحدد لاحقًا          |

**تسمية ترقيات الإجماع**

منذ إطلاق [سلسلة المنارة](/glossary/#beacon-chain)، تتم تسمية الترقيات التي تجرى على **طبقة الإجماع** بأسماء النجوم السماوية التي تبدأ بحروف تتقدم بالترتيب الأبجدي:

| اسم الترقية                                                   | تاريخ الترقية         |
| ------------------------------------------------------------- | --------------------- |
| نشأة سلسلة المنارات                                           | 1 ديسمبر 2020         |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27 أكتوبر 2021        |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6 سبتمبر 2022         |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12 أبريل 2023         |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13 مارس 2024          |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | يُحدد لاحقًا - التالي |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | يُحدد لاحقًا          |

**التسمية المدمجة**

تم طرح ترقيات التنفيذ والإجماع في البداية في أوقات مختلفة، ولكن بعد [الدمج](/roadmap/merge/) في عام 2022 تم نشرها في وقت واحد. ومن ثم، ظهرت مصطلحات عامية لتبسيط الإشارة إلى هذه الترقيات باستخدام مصطلح متصل واحد. بدأ هذا الأمر مع ترقية خط شنغهاي-كابيلا، والمعروف عادةً باسم "شابيلا"، واستمر مع ترقيات خط كانكون-دينيب (دينكون)، وخط براغ-إلكترا (بيكترا).

| ترقية التنفيذ | ترقية الإجماع | الاسم المختصر |
| ------------- | ------------- | ------------- |
| Shanghai      | Capella       | "Shapella"    |
| Cancun        | Deneb         | "Dencun"      |
| Prague        | Electra       | "Pectra"      |
| Osaka         | Fulu          | "Fusaka"      |

</ExpandableCard>

انتقل مباشرة إلى المعلومات حول بعض الترقيات السابقة ذات الأهمية الخاصة: [سلسلة المنارة](/roadmap/beacon-chain/)؛ [الدمج](/roadmap/merge/)؛ و[EIP-1559](#london)

هل تبحث عن تحديثات البروتوكول المستقبلية؟ [تعرف على الترقيات القادمة على خارطة طريق إيثريوم](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[المزيد عن Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

تضمنت ترقية Prague-Electra ("Pectra") العديد من التحسينات على بروتوكول Ethereum بهدف تحسين تجربة جميع المستخدمين وشبكات الطبقة 2 والمشاركين ومشغلي العقد.

حصل التخزين على ترقية مع حسابات التحقق المركبة، وتحسين التحكم في الأموال المخزنة باستخدام عنوان سحب التنفيذ. أدى EIP-7251 إلى زيادة الحد الأقصى للرصيد الفعال لمحقق واحد إلى 2048، مما أدى إلى تحسين كفاءة رأس المال للمساهمين. مكّن EIP-7002 حساب التنفيذ من تشغيل إجراءات التحقق بشكل آمن، بما في ذلك الخروج أو سحب أجزاء من الأموال، مما أدى إلى تحسين تجربة المشاركين في ETH، مع المساعدة في تعزيز المساءلة لمشغلي العقد.

ركزت أجزاء أخرى من الترقية على تحسين تجربة المستخدمين العاديين. جلب EIP-7702 القدرة لحساب عادي ليس عقدًا ذكيًا ([EOA](/glossary/#eoa)) على تنفيذ نص برمجي مشابه لعقد ذكي. أدى هذا إلى فتح وظائف جديدة غير محدودة لحسابات Ethereum التقليدية، مثل تجميع المعاملات، ورعاية الغاز، والمصادقة البديلة، وضوابط الإنفاق القابلة للبرمجة، وآليات استرداد الحساب والمزيد.

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Pectra" contentPreview="التحسينات الرسمية المُضمّنة في هذه الترقية.">

تجربة مستخدم أفضل:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>تعيين رمز حساب EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>زيادة إنتاجية الكتلة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>زيادة تكلفة بيانات المكالمات</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>إضافة جدول الكائنات إلى ملفات تكوين EL</em></li>
</ul>

تجربة مشاركة أفضل:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>زيادة الحد الأقصى للتوازن الفعال</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>مخارج قابلة للتفعيل في طبقة التنفيذ</em></li>
  <li>a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>طلبات طبقة التنفيذ للأغراض العامة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>إيداعات مُصدِّق العرض على السلسلة</em></li>
</ul>

تحسينات كفاءة البروتوكول والأمان:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>التجميع المسبق لعمليات منحنى BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>حفظ تجزئات الكتل التاريخية في الحالة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>نقل مؤشر اللجنة خارج نطاق التصديق</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [كيف ستعزز ترقية Pectra تجربة تجميد العملات](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [اقرأ مواصفات ترقية Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [الأسئلة الشائعة حول Prague-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### ملخص Cancun {#cancun-summary}

تحتوي ترقية Cancun على مجموعة من التحسينات على _تنفيذ_ إيثريوم بهدف تحسين قابلية التوسع، جنبًا إلى جنب مع ترقيات إجماع Deneb.

والجدير بالذكر أن هذا يتضمن EIP-4844، المعروف باسم **Proto-Danksharding**، والذي يقلل بشكل كبير من تكلفة تخزين البيانات لرول أبز الطبقة الثانية. ويتم تحقيق ذلك من خلال تقديم "كتل" البيانات التي تمكن التجميعات من نشر البيانات على الشبكة الرئيسية لفترة قصيرة من الزمن. ويؤدي هذا إلى انخفاض رسوم المعاملات بشكل كبير بالنسبة لمستخدمي عمليات التجميع من الطبقة 2.

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Cancun" contentPreview="التحسينات الرسمية المُضمّنة في هذه الترقية.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>رموز عمليات التخزين المؤقتة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>جذر كتلة المنارة في EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>معاملات شارد بلووب (تجزئة دانكشاردينج الأولية)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - تعليمات نسخ الذاكرة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> فقط في نفس المعاملة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - رمز تشغيل <em><code>BLOBBBASEFEE</code></li>
</ul>

</ExpandableCard>

- [رول أبز الطبقة الثانية](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [اقرأ مواصفات ترقية Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### ملخص Deneb {#deneb-summary}

تحتوي ترقية Deneb على مجموعة من التحسينات على _إجماع_ إيثريوم بهدف تحسين قابلية التوسع. يأتي هذا الترقية بالتزامن مع ترقيات تنفيذ Cancun لتمكين Proto-Danksharding (EIP-4844)، إلى جانب تحسينات أخرى لسلسلة Beacon.

لم تعد "رسائل الخروج الطوعي" الموقعة والمولدة مسبقًا تنتهي صلاحيتها، مما يمنح المزيد من التحكم للمستخدمين الذين يراهنون بأموالهم مع مشغل عقدة تابع لجهة خارجية. من خلال رسالة الخروج الموقعة هذه، يمكن للمستثمرين تفويض تشغيل العقدة مع الحفاظ على القدرة على الخروج وسحب أموالهم بأمان في أي وقت، دون الحاجة إلى طلب إذن من أي شخص.

يؤدي EIP-7514 إلى تشديد إصدار ETH من خلال تحديد معدل "التحويل" الذي يمكن للمحققين الانضمام إلى الشبكة إلى ثمانية (8) لكل حقبة. نظرًا لأن إصدار ETH يتناسب مع إجمالي ETH المجمّد، فإن الحد من عدد المدققين المنضمين يحد من _معدل نمو_ ETH المصدر حديثًا، مع تقليل متطلبات الأجهزة لمشغلي العقد، مما يساعد على اللامركزية.

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Deneb" contentPreview="التحسينات الرسمية المُضمّنة في هذه الترقية">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>جذر كتلة المنارة في EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>معاملات كائنات شارد</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>خروج طوعي موقع صالح دائمًا</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>زيادة الحد الأقصى لمساحة إدراج الشهادة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>إضافة حد أقصى لوقت التغيير</em></li>
</ul>

</ExpandableCard>

- [اقرأ مواصفات ترقية Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [الأسئلة الشائعة حول Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### ملخص Shanghai {#shanghai-summary}

أدى ترقية شنغهاي إلى جلب عمليات سحب الرهان إلى طبقة التنفيذ. بالتزامن مع ترقية Capella، مكّن هذا الكتل من قبول عمليات السحب، مما يسمح للمشاركين بسحب ETH الخاص بهم من Beacon Chain إلى طبقة التنفيذ.

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Shanghai" contentPreview="التحسينات الرسمية المُضمّنة في هذه الترقية.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>يبدأ تدفئة عنوان <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>تعليمات PUSH0 جديدة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>رمز بدء الحد والعداد</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – عمليات سحب من Beacon Chain كعمليات</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>إهمال <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [اقرأ مواصفات ترقية Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### ملخص Capella {#capella-summary}

كان ترقية Capella هي الترقية الرئيسية الثالثة لطبقة الإجماع (Beacon Chain) ومكنت من سحب المراهنة. حدث Capella بشكل متزامن مع ترقية طبقة التنفيذ، شنغهاي، وتمكين وظيفة سحب الرهان.

أدى ترقية طبقة الإجماع هذه إلى تمكين المشاركين الذين لم يقدموا بيانات اعتماد السحب مع إيداعهم الأولي من القيام بذلك، وبالتالي تمكين عمليات السحب.

كما قدم الترقية وظيفة المسح التلقائي للحسابات، والتي تقوم بمعالجة حسابات التحقق بشكل مستمر بحثًا عن أي مدفوعات مكافآت متاحة أو عمليات سحب كاملة.

- [المزيد عن عمليات سحب الرهان](/staking/withdrawals/).
- [اقرأ مواصفات ترقية Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (الدمج) {#paris}

<NetworkUpgradeSummary name="paris" />

#### ملخص {#paris-summary}

تم تفعيل ترقية Paris من خلال بلوكتشين إثبات العمل التي تجاوزت [الصعوبة الإجمالية النهائية](/glossary/#terminal-total-difficulty) البالغة 58750000000000000000000. لقد حدث هذا في الكتلة 15537393 في 15 سبتمبر 2022، مما أدى إلى ترقية باريس إلى الكتلة التالية. كانت ترقية Paris هي مرحلة انتقال [الدمج](/roadmap/merge/) - كانت ميزتها الرئيسية هي إيقاف خوارزمية تعدين [إثبات العمل](/developers/docs/consensus-mechanisms/pow) ومنطق الإجماع المرتبط بها والتحول إلى [إثبات الحصة](/developers/docs/consensus-mechanisms/pos) بدلاً من ذلك. كانت Paris نفسها ترقية لـ[عملاء التنفيذ](/developers/docs/nodes-and-clients/#execution-clients) (ما يعادل Bellatrix على طبقة الإجماع) التي مكنتهم من تلقي التعليمات من [عملاء الإجماع](/developers/docs/nodes-and-clients/#consensus-clients) المتصلين بهم. تطلب هذا تفعيل مجموعة جديدة من أساليب واجهة برمجة التطبيقات الداخلية، والمعروفة مجتمعة باسم [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). يمكن القول إن هذه كانت أهم ترقية في تاريخ إيثريوم منذ [Homestead](#homestead)!

- [اقرأ مواصفات ترقية Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Paris" contentPreview="التحسينات الرسمية المُضمّنة في هذه الترقية.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>ترقية الإجماع إلى إثبات الحصة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>استبدل كود التشغيل الصعب بـ PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### ملخص {#bellatrix-summary}

كانت ترقية Bellatrix هي الترقية الثانية المجدولة لـ [سلسلة المنارة](/roadmap/beacon-chain)، لإعداد السلسلة لـ [الدمج](/roadmap/merge/). إنه يرفع عقوبات المحقق إلى قيمها الكاملة في حالة عدم النشاط والمخالفات القابلة للتخفيض. يتضمن Bellatrix أيضًا تحديثًا لقواعد اختيار الشوكة لإعداد السلسلة لعملية الدمج والانتقال من كتلة إثبات العمل الأخيرة إلى كتلة إثبات الحصة الأولى. يتضمن هذا جعل عملاء الإجماع على دراية بـ [الصعوبة الإجمالية النهائية](/glossary/#terminal-total-difficulty) البالغة 58750000000000000000000.

- [اقرأ مواصفات ترقية Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### ملخص {#gray-glacier-summary}

أدت ترقية شبكة Gray Glacier إلى تأجيل [قنبلة الصعوبة](/glossary/#difficulty-bomb) لمدة ثلاثة أشهر. هذا هو التغيير الوحيد الذي تم إدخاله في هذه الترقية، وهو مشابه في طبيعته لترقيات [Arrow Glacier](#arrow-glacier) و [Muir Glacier](#muir-glacier). تم إجراء تغييرات مماثلة على ترقيات شبكة [Byzantium](#byzantium) و [Constantinople](#constantinople) و [London](#london).

- [مدونة EF - إعلان ترقية Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Gray Glacier" contentPreview="التحسينات الرسمية المُضمّنة في هذه الترقية.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>يؤجل إصدار قنبلة الصعوبة حتى سبتمبر 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### ملخص {#arrow-glacier-summary}

أدت ترقية شبكة Arrow Glacier إلى تأجيل [قنبلة الصعوبة](/glossary/#difficulty-bomb) لعدة أشهر. هذا هو التغيير الوحيد الذي تم إدخاله في هذه الترقية، وهو مشابه في طبيعته لترقية [Muir Glacier](#muir-glacier). تم إجراء تغييرات مماثلة على ترقيات شبكة [Byzantium](#byzantium) و [Constantinople](#constantinople) و [London](#london).

- [مدونة EF - إعلان ترقية Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - ترقية Arrow Glacier لإيثريوم](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Arrow Glacier" contentPreview="التحسينات الرسمية المُضمّنة في هذه الترقية.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>يؤجل إصدار قنبلة الصعوبة حتى يونيو 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### ملخص {#altair-summary}

كانت ترقية Altair أول ترقية مجدولة لـ [سلسلة المنارة](/roadmap/beacon-chain). لقد أضاف الدعم لـ "لجان المزامنة" - مما يتيح للعملاء الخفيفين، ويزيد من عدم نشاط المحققين ويخفض العقوبات مع تقدم التطوير نحو الدمج.

- [اقرأ مواصفات ترقية Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />حقيقة ممتعة! {#altair-fun-fact}

وكان Altair أول تطوير رئيسي للشبكة لديه وقت تنفيذ واضح. كل تحديث سابق كان يستند إلى عدد كتل blocks معلن عنه في سلسلة إثبات العمل Pow، حيث تختلف أوقات الكتل. سلسلة Beacon لا تتطلب ايجاد حلول لنظام إثبات العملPow، وبدلا من ذلك تعمل على نظام زمني يتكون من 32 فتحة زمنية تتكون من 12 ثانية لكل منها والذي يمكّن للمتحققين اقتراح الكتل. هذا هو السبب الذي جعلنا نعرف بالضبط انه عندما نصل الى الزمن 74,240 سيطلق Altair مباشرة!

- [وقت الكتلة](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### ملخص {#london-summary}

قدمت ترقية London [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)، الذي أصلح سوق رسوم المعاملات، إلى جانب تغييرات في كيفية التعامل مع استرداد رسوم الغاز وجدول [Ice Age](/glossary/#ice-age).

#### ما هو ترقية لندن / EIP-1559؟ {#eip-1559}

Before the London Upgrade, Ethereum had fixed-sized blocks. In times of high network demand, these blocks operated at full capacity. As a result, users often had to wait for demand to reduce to get included in a block, which led to a poor user experience. The London Upgrade introduced variable-sized blocks to Ethereum.

تغيرت طريقة حساب رسوم المعاملات على شبكة إيثريوم مع [ترقية London](/ethereum-forks/#london) في أغسطس 2021. قبل ترقية London، كانت الرسوم تُحسب دون فصل رسوم `base` و`priority`، على النحو التالي:

Let's say Alice had to pay Bob 1 ETH. In the transaction, the gas limit is 21,000 units, and the gas price is 200 gwei.

كانت الرسوم الإجمالية ستكون: `وحدات الغاز (الحد) * سعر الغاز لكل وحدة` أي `21,000 * 200 = 4,200,000 gwei` أو 0.0042 ETH

أدى تطبيق [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) في ترقية London إلى جعل آلية رسوم المعاملات أكثر تعقيدًا، ولكنه جعل رسوم الغاز أكثر قابلية للتنبؤ، مما أدى إلى سوق رسوم معاملات أكثر كفاءة. يمكن للمستخدمين إرسال المعاملات مع `maxFeePerGas` بما يتوافق مع المبلغ الذي يرغبون في دفعه لتنفيذ المعاملة، مع العلم أنهم لن يدفعوا أكثر من سعر السوق للغاز (`baseFeePerGas`)، ويستردون أي مبلغ إضافي، مطروحًا منه إكراميتهم.

[يشرح هذا الفيديو EIP-1559 والفوائد التي يجلبها: [شرح EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)]

- [هل أنت مطور تطبيقات لامركزية؟ تأكد من ترقية مكتباتك وأدواتك.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [اقرأ شرح Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية London" contentPreview="التحسينات الرسمية المُضمّنة في هذه الترقية.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>يُحسّن سوق رسوم المعاملات</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>يُرجع <code>BASEFEE</code> من كتلة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>يُخفِّض استردادات الغاز لعمليات آلات التصويت الإلكترونية</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>يمنع نشر العقود التي تبدأ بـ <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>يؤخر العصر الجليدي حتى ديسمبر 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### ملخص {#berlin-summary}

أدى تحديث برلين إلى تحسين تكلفة الغاز لبعض إجراءات EVM، وزيادة الدعم لأنواع المعاملات المتعددة.

- [اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [اقرأ شرح Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Berlin" contentPreview="التحسينات الرسمية المُضمّنة في هذه الترقية.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>يخفض تكلفة غاز ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>يتيح دعمًا أسهل لأنواع المعاملات المتعددة</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>gas cost increases for state access opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>يضيف قوائم وصول اختيارية</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### تكوين سلسلة المنارة {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### ملخص {#beacon-chain-genesis-summary}

احتاجت [سلسلة المنارة](/roadmap/beacon-chain/) إلى 16384 وديعة بقيمة 32 من عملة ETH المجمّدة للإطلاق بأمان. حدث هذا في 27 نوفمبر، وبدأت سلسلة المنارة في إنتاج الكتل في 1 ديسمبر 2020.

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  سلسلة المنارة
</DocLink>

---

### تم نشر عقد إيداع التجميد {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### ملخص {#deposit-contract-summary}

قدم عقد إيداع التجميد [التجميد](/glossary/#staking) إلى نظام إيثريوم البيئي. على الرغم من كونه عقدًا على [الشبكة الرئيسية](/glossary/#mainnet)، إلا أنه كان له تأثير مباشر على الجدول الزمني لإطلاق [سلسلة المنارة](/roadmap/beacon-chain/)، وهي [ترقية هامة لإيثريوم](/roadmap/).

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  التجميد
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### ملخص {#muir-glacier-summary}

أدى انقسام Muir Glacier إلى تأخير [قنبلة الصعوبة](/glossary/#difficulty-bomb). هددت الزيادات في صعوبة الكتلة لآلية إجماع [إثبات العمل](/developers/docs/consensus-mechanisms/pow/) بتقليل قابلية استخدام إيثريوم عن طريق زيادة أوقات الانتظار لإرسال المعاملات واستخدام التطبيقات اللامركزية.

- [اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [اقرأ شرح Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Muir Glacier" contentPreview="التحسينات الرسمية المُضمّنة في هذا الانقسام.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>يؤخر قنبلة الصعوبة لمدة 4,000,000 كتلة أخرى، أو حوالي 611 يومًا.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### ملخص {#istanbul-summary}

شوكة اسطنبول:

- حسّن تكلفة [الغاز](/glossary/#gas) لإجراءات معينة في [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- تحسين القدرة على مقاومة هجوم رفض الخدمة.
- جعل حلول [توسيع الطبقة الثانية](/developers/docs/scaling/#layer-2-scaling) المستندة إلى SNARKs وSTARKs أكثر أداءً.
- تمكين Ethereum و Zcash من التفاعل.
- سمح للعقود بتقديم المزيد من الوظائف الإبداعية.

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Istanbul" contentPreview="التحسينات الرسمية المُضمّنة في هذا الانقسام.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>السماح لعملة Ethereum بالعمل مع العملات التي تحافظ على الخصوصية مثل Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>تشفير أقل تكلفة لتحسين تكاليف الغاز.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>يحمي الإيثيريوم من هجمات الإعادة عن طريق إضافة <code>CHAINID</code> [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>تحسين أسعار الغاز بناءً على الاستهلاك.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>يُخفِّض تكلفة CallData للسماح بالمزيد من البيانات في الكتل – وهو أمر جيد لتوسيع الطبقة 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>other opcode gas price alterations.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### ملخص {#constantinople-summary}

شوكة القسطنطينية:

- خفض مكافآت [تعدين](/developers/docs/consensus-mechanisms/pow/mining/) الكتل من 3 إلى 2 ETH.
- ضمن أن البلوكتشين لم يتجمد قبل [تنفيذ إثبات الحصة](#beacon-chain-genesis).
- حسّن تكلفة [الغاز](/glossary/#gas) لإجراءات معينة في [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Added the ability to interact with addresses that haven't been created yet.

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Constantinople" contentPreview="التحسينات الرسمية المُضمّنة في هذا الانقسام.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>يُحسِّن تكلفة بعض إجراءات السلسلة.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>يسمح لك بالتفاعل مع العناوين التي لم يتم إنشاؤها بعد.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>يقدم تعليمات <code>EXTCODEHASH</code> لاسترداد تجزئة كود عقد آخر.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>يتأكد من عدم تجميد blockchain قبل إثبات الحصة ويقلل مكافأة الكتلة من 3 إلى 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### ملخص {#byzantium-summary}

شوكة بيزنطة:

- خفض مكافآت [تعدين](/developers/docs/consensus-mechanisms/pow/mining/) الكتل من 5 إلى 3 ETH.
- أخر [قنبلة الصعوبة](/glossary/#difficulty-bomb) لمدة عام.
- تمت إضافة القدرة على إجراء مكالمات غير متغيرة الحالة لعقود أخرى.
- أضاف بعض أساليب التشفير للسماح بـ [توسيع الطبقة الثانية](/developers/docs/scaling/#layer-2-scaling).

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Byzantium" contentPreview="التحسينات الرسمية المُضمّنة في هذا الانقسام.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>يضيف رمز التشغيل <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>تمت إضافة حقل الحالة إلى إيصالات المعاملات للإشارة إلى النجاح أو الفشل.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>يضيف منحنى إهليلجيًا وضربًا قياسيًا للسماح بـ [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>يضيف منحنى إهليلجيًا وضربًا قياسيًا للسماح بـ [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>يُمكّن التحقق من توقيع RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>يضيف دعمًا لقيم الإرجاع ذات الطول المتغير.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>يضيف رمز التشغيل <code>STATICCALL</code>، مما يسمح بإجراء مكالمات غير متغيرة الحالة إلى عقود أخرى.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>تغيير صيغة تعديل الصعوبة.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>يؤخر [قنبلة الصعوبة](/glossary/#difficulty-bomb) لمدة عام واحد ويقلل مكافأة الكتلة من 5 إلى 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### ملخص {#spurious-dragon-summary}

كان شوكة التنين الزائفة هي الاستجابة الثانية لهجمات رفض الخدمة (DoS) على الشبكة (سبتمبر/أكتوبر 2016) بما في ذلك:

- ضبط تسعير التعليمات البرمجية لمنع الهجمات المستقبلية على الشبكة.
- تمكين "إزالة الانتفاخ" من حالة blockchain.
- إضافة حماية من هجوم الإعادة.

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Spurious Dragon" contentPreview="التحسينات الرسمية المُضمّنة في هذا الانقسام.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>يمنع إعادة بث المعاملات من سلسلة إيثريوم واحدة على سلسلة بديلة، على سبيل المثال، معاملة شبكة اختبار يتم إعادة تشغيلها على سلسلة إيثريوم الرئيسية.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>يضبط أسعار رمز العملية EXP</code> – مما يجعل إبطاء الشبكة أكثر صعوبة من خلال عمليات العقد المكلفة حسابيًا.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>يسمح بإزالة الحسابات الفارغة المضافة عبر هجمات الحرمان من الخدمة.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>يغير الحد الأقصى لحجم الكود الذي يمكن أن يحتوي عليه العقد على blockchain – إلى 24576 بايت.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### ملخص {#tangerine-whistle-summary}

كان شوكة Tangerine Whistle بمثابة الاستجابة الأولى لهجمات رفض الخدمة (DoS) على الشبكة (سبتمبر/أكتوبر 2016) بما في ذلك:

- معالجة مشكلات صحة الشبكة العاجلة المتعلقة برموز التشغيل منخفضة السعر.

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Tangerine Whistle" contentPreview="التحسينات الرسمية المُضمّنة في هذا الانقسام.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>يزيد من تكاليف الغاز للرموز التشغيلية التي يمكن استخدامها في هجمات البريد العشوائي.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>يقلل حجم الحالة عن طريق إزالة عدد كبير من الحسابات الفارغة التي تم وضعها في الحالة بتكلفة منخفضة للغاية بسبب العيوب في الإصدارات السابقة من بروتوكول Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### انقسام DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### ملخص {#dao-fork-summary}

كان انقسام DAO استجابة لـ [هجوم DAO عام 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/) حيث تم استنزاف عقد [DAO](/glossary/#dao) غير آمن لأكثر من 3.6 مليون ETH في عملية اختراق. نقل الانقسام الأموال من العقد المعيب إلى [عقد جديد](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) بوظيفة واحدة: السحب. أي شخص فقد أموالاً يمكنه سحب 1 ETH مقابل كل 100 رمز DAO في محفظته.

تم التصويت على هذا الإجراء من قبل مجتمع إيثريوم. كان بإمكان أي حامل لعملة ETH التصويت عبر معاملة على [منصة تصويت](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). حصل قرار إجراء التفرُّع على %85 من الأصوات.

رفض بعض عمال المناجم التفرع لأن حادثة DAO لم تكن عيبًا في البروتوكول. لقد قاموا بتشكيل [إيثريوم كلاسيك](https://ethereumclassic.org/).

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### ملخص {#homestead-summary}

شوكة المزرعة التي تتطلع إلى المستقبل. وقد تضمنت العديد من التغييرات في البروتوكول وتغييرًا في الشبكة أعطى Ethereum القدرة على إجراء المزيد من ترقيات الشبكة.

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="اقتراحات تحسين إيثريوم (EIPs) في ترقية Homestead" contentPreview="التحسينات الرسمية المُضمّنة في هذا الانقسام.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>يُجري تعديلات على عملية إنشاء العقد.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>يضيف رمز تشغيل جديد: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>يُقدّم متطلبات التوافق الأمامي devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### إذابة Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### ملخص {#frontier-thawing-summary}

رفع انقسام إذابة Frontier حد [الغاز](/glossary/#gas) البالغ 5000 لكل [كتلة](/glossary/#block) وحدد سعر الغاز الافتراضي إلى 51 [gwei](/glossary/#gwei). سمح هذا بإجراء المعاملات - تتطلب المعاملات 21000 غاز. تم تقديم [قنبلة الصعوبة](/glossary/#difficulty-bomb) لضمان انقسام الشبكة مستقبلاً إلى [إثبات الحصة](/glossary/#pos).

- [اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [اقرأ تحديث بروتوكول إيثريوم 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### ملخص {#frontier-summary}

كانت Frontier عبارة عن تنفيذ حي، ولكن بسيط، لمشروع Ethereum. وجاء ذلك بعد مرحلة الاختبار الأولمبية الناجحة. كان مخصصًا للمستخدمين الفنيين، والمطورين على وجه التحديد. كان [للكتل](/glossary/#block) [حد غاز](/glossary/#gas) يبلغ 5,000. لقد أتاحت فترة "الذوبان" هذه للمعدنين بدء عملياتهم وللمستخدمين الأوائل تثبيت عملائهم دون الحاجة إلى "التسرع".

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### بيع Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

تم طرح الأثير للبيع رسميًا لمدة 42 يومًا. يمكنك شرائه باستخدام BTC.

[اقرأ إعلان مؤسسة إيثريوم](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### إصدار الورقة الصفراء {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

والورقة الصفراء التي كتبها الدكتور غافين وود هي تعريف تقني لبروتوكول إيثيريوم.

[عرض الورقة الصفراء](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### إصدار الورقة البيضاء {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

الورقة التمهيدية، التي نشرها فيتاليك بوتيرين، مؤسس الإيثريوم، في عام 2013، قبل إطلاق المشروع في عام 2015.

<DocLink href="/whitepaper/">
  الورقة البيضاء
</DocLink>
