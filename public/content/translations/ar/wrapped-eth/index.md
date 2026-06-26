---
title: "إيثر مغلف (⁦WETH⁩)"
metaTitle: "ما هو الإيثر المغلف (⁦WETH⁩)"
description: "مقدمة عن الإيثر المغلف (⁦WETH⁩) — غلاف متوافق مع ⁦ERC-20⁩ للإيثر (⁦ETH⁩)."
lang: ar
---

<Alert variant="update">
<Emoji text="🎁" />
<div>قم بتوصيل محفظتك لتغليف أو فك تغليف <span dir="ltr">ETH</span> على أي سلسلة في [<span dir="ltr">WrapETH.com</span>](https://www.wrapeth.com/)</div>
</Alert>

الإيثر (<span dir="ltr">ETH</span>) هو العملة الرئيسية لشبكة إيثيريوم. يُستخدم لعدة أغراض مثل التخزين، وكعملة، ولدفع رسوم الغاز للعمليات الحسابية. **<span dir="ltr">WETH</span> هو فعليًا شكل مطور من <span dir="ltr">ETH</span> مع بعض الوظائف الإضافية التي تتطلبها العديد من التطبيقات و[الرموز المميزة <span dir="ltr">ERC-20</span>](/glossary/#erc-20)**، وهي أنواع أخرى من الأصول الرقمية على إيثيريوم. للعمل مع هذه الرموز المميزة، يجب أن يتبع <span dir="ltr">ETH</span> نفس القواعد التي تتبعها، والمعروفة باسم معيار <span dir="ltr">ERC-20</span>.

لسد هذه الفجوة، تم إنشاء الإيثر المغلف (<span dir="ltr">WETH</span>). **الإيثر المغلف هو عقد ذكي يتيح لك إيداع أي مبلغ من <span dir="ltr">ETH</span> في العقد والحصول على نفس المبلغ من <span dir="ltr">WETH</span> المسكوك** والذي يتوافق مع معيار الرمز المميز <span dir="ltr">ERC-20</span>. <span dir="ltr">WETH</span> هو تمثيل لـ <span dir="ltr">ETH</span> يسمح لك بالتفاعل معه كرمز مميز <span dir="ltr">ERC-20</span>، وليس كالأصل الأصلي <span dir="ltr">ETH</span>. ستظل بحاجة إلى <span dir="ltr">ETH</span> الأصلي لدفع رسوم الغاز، لذا تأكد من الاحتفاظ ببعضه عند الإيداع. 

يمكنك فك تغليف <span dir="ltr">WETH</span> للحصول على <span dir="ltr">ETH</span> باستخدام العقد الذكي لـ <span dir="ltr">WETH</span>. يمكنك استرداد أي مبلغ من <span dir="ltr">WETH</span> باستخدام العقد الذكي لـ <span dir="ltr">WETH</span>، وستتلقى نفس المبلغ من <span dir="ltr">ETH</span>. يتم بعد ذلك حرق <span dir="ltr">WETH</span> المودع وإخراجه من العرض المتداول لـ <span dir="ltr">WETH</span>.

**يتم قفل ما يقرب من <span dir="ltr">~3%</span> من العرض المتداول لـ <span dir="ltr">ETH</span> في عقد الرمز المميز <span dir="ltr">WETH</span>** مما يجعله واحدًا من أكثر [العقود الذكية](/glossary/#smart-contract) استخدامًا. يعتبر <span dir="ltr">WETH</span> مهمًا بشكل خاص للمستخدمين الذين يتفاعلون مع التطبيقات في التمويل اللامركزي (<span dir="ltr">DeFi</span>).

## لماذا نحتاج إلى تغليف <span dir="ltr">ETH</span> كـ <span dir="ltr">ERC-20</span>؟ {#why-do-we-need-to-wrap-eth}

يحدد [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) واجهة قياسية للرموز المميزة القابلة للتحويل، بحيث يمكن لأي شخص إنشاء رموز مميزة تتفاعل بسلاسة مع التطبيقات والرموز المميزة التي تستخدم هذا المعيار في نظام إيثيريوم البيئي. نظرًا لأن **<span dir="ltr">ETH</span> يسبق معيار <span dir="ltr">ERC-20</span>**، فإن <span dir="ltr">ETH</span> لا يتوافق مع هذه المواصفات. هذا يعني أنه **لا يمكنك بسهولة** استبدال <span dir="ltr">ETH</span> برموز مميزة أخرى من نوع <span dir="ltr">ERC-20</span> أو **استخدام <span dir="ltr">ETH</span> في التطبيقات التي تستخدم معيار <span dir="ltr">ERC-20</span>**. يمنحك تغليف <span dir="ltr">ETH</span> الفرصة للقيام بما يلي:

- **استبدال <span dir="ltr">ETH</span> برموز مميزة <span dir="ltr">ERC-20</span>**: لا يمكنك استبدال <span dir="ltr">ETH</span> مباشرة برموز مميزة أخرى من نوع <span dir="ltr">ERC-20</span>. <span dir="ltr">WETH</span> هو تمثيل للإيثر يتوافق مع معيار الرمز القابل للاستبدال <span dir="ltr">ERC-20</span> ويمكن استبداله برموز مميزة أخرى من نوع <span dir="ltr">ERC-20</span>. 

- **استخدام <span dir="ltr">ETH</span> في التطبيقات اللامركزية (<span dir="ltr">dapps</span>)**: نظرًا لأن <span dir="ltr">ETH</span> غير متوافق مع <span dir="ltr">ERC-20</span>، سيحتاج المطورون إلى إنشاء واجهات منفصلة (واحدة لـ <span dir="ltr">ETH</span> وأخرى للرموز المميزة <span dir="ltr">ERC-20</span>) في التطبيقات اللامركزية. يزيل تغليف <span dir="ltr">ETH</span> هذه العقبة ويمكّن المطورين من التعامل مع <span dir="ltr">ETH</span> والرموز المميزة الأخرى داخل نفس التطبيق اللامركزي. تستخدم العديد من تطبيقات التمويل اللامركزي هذا المعيار، وتنشئ أسواقًا لتبادل هذه الرموز المميزة.

## الإيثر المغلف (<span dir="ltr">WETH</span>) مقابل الإيثر (<span dir="ltr">ETH</span>): ما هو الفرق؟ {#weth-vs-eth-differences}


|            | **الإيثر (<span dir="ltr">ETH</span>)**                                                                                                                                                                                                                 | **الإيثر المغلف (<span dir="ltr">WETH</span>)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| العرض     | تتم إدارة [عرض <span dir="ltr">ETH</span>](/eth/supply/) بواسطة بروتوكول [إيثيريوم](/). يتم التعامل مع [الإصدار](/roadmap/merge/issuance) الخاص بـ <span dir="ltr">ETH</span> بواسطة مدققي إيثيريوم عند معالجة المعاملات وإنشاء الكتل.                           | <span dir="ltr">WETH</span> هو رمز مميز <span dir="ltr">ERC-20</span> تتم إدارة عرضه بواسطة عقد ذكي. يتم إصدار وحدات جديدة من <span dir="ltr">WETH</span> بواسطة العقد بعد تلقيه إيداعات <span dir="ltr">ETH</span> من المستخدمين، أو يتم حرق وحدات من <span dir="ltr">WETH</span> عندما يرغب المستخدم في استرداد <span dir="ltr">WETH</span> مقابل <span dir="ltr">ETH</span>.                                                                                                                                        |
| الملكية  | تتم إدارة الملكية بواسطة بروتوكول إيثيريوم من خلال رصيد حسابك.  | تتم إدارة ملكية <span dir="ltr">WETH</span> بواسطة العقد الذكي للرمز المميز <span dir="ltr">WETH</span>، والمؤمن بواسطة بروتوكول إيثيريوم.                                                                                                                                         |
| الغاز        | الإيثر (<span dir="ltr">ETH</span>) هو وحدة الدفع المقبولة للعمليات الحسابية على شبكة إيثيريوم. يتم تقييم رسوم الغاز بـ <span dir="ltr">Gwei</span> (وحدة من الإيثر).                                                                                    | دفع الغاز باستخدام الرموز المميزة <span dir="ltr">WETH</span> غير مدعوم بشكل أصلي.                                                                                                                                                                                              |

## الأسئلة الشائعة {#faq}
 
<ExpandableCard title="هل تدفع مقابل تغليف/فك تغليف ETH؟" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

أنت تدفع رسوم الغاز لتغليف أو فك تغليف <span dir="ltr">ETH</span> باستخدام عقد <span dir="ltr">WETH</span>.

</ExpandableCard>

<ExpandableCard title="هل WETH آمن؟" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

يُعتبر <span dir="ltr">WETH</span> آمنًا بشكل عام لأنه يعتمد على عقد ذكي بسيط ومُختبر في الواقع. كما خضع عقد <span dir="ltr">WETH</span> لعملية تحقق شكلي، وهو أعلى معيار أمان للعقود الذكية على إيثيريوم.

</ExpandableCard>

<ExpandableCard title="لماذا أرى رموز WETH مميزة مختلفة؟" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

إلى جانب [التنفيذ الأساسي لـ <span dir="ltr">WETH</span>](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) الموصوف في هذه الصفحة، هناك متغيرات أخرى في الاستخدام الفعلي. قد تكون هذه رموزًا مميزة مخصصة أنشأها مطورو التطبيقات أو إصدارات تم إصدارها على سلاسل كتل أخرى، وقد تتصرف بشكل مختلف أو تمتلك خصائص أمان مختلفة. **تحقق دائمًا من معلومات الرمز المميز لمعرفة تنفيذ <span dir="ltr">WETH</span> الذي تتفاعل معه.**

</ExpandableCard>

<ExpandableCard title="ما هي عقود WETH على الشبكات الأخرى؟" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [شبكة إيثيريوم الرئيسية](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [أربيتروم](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [أوبتيميزم](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## قراءة إضافية {#further-reading}

- [ما هو <span dir="ltr">WETH</span>؟](https://weth.tkn.eth.limo/)
- [معلومات الرمز المميز <span dir="ltr">WETH</span> على <span dir="ltr">Blockscout</span>](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [التحقق الشكلي لـ <span dir="ltr">WETH</span>](https://zellic.io/blog/formal-verification-weth)