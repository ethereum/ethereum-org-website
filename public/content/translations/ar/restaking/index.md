---
title: "إعادة التخزين"
metaTitle: "ما هي إعادة التخزين؟ | فوائد واستخدامات إعادة التخزين"
description: "استخدم ⁦ETH⁩ المخزن لتأمين خدمات لامركزية أخرى وكسب مكافآت إضافية."
lang: ar
template: use-cases
image: /images/use-cases/restaking.png
alt: "تمثيل مرئي لإعادة التخزين على إيثيريوم."
sidebarDepth: 2
summaryPoints:
  - "استخدم ⁦ETH⁩ المخزن لتأمين خدمات لامركزية أخرى وكسب مكافآت إضافية."
buttons:
  - content: ما هي إعادة التخزين؟
    toId: what-is-restaking
  - content: كيف تعمل؟
    toId: how-does-restaking-work
    isSecondary: false
---

تؤمن شبكة إيثيريوم مليارات الدولارات من القيمة على مدار الساعة طوال أيام الأسبوع، <span dir="ltr">365</span> يومًا في السنة. كيف؟

يقوم الأشخاص في جميع أنحاء العالم بقفل (أو "تخزين") [إيثر (<span dir="ltr">ETH</span>)](/what-is-ether/) في عقود ذكية لتشغيل البرامج التي تعالج معاملات إيثيريوم وتؤمن شبكة إيثيريوم. في المقابل، يحصلون على مكافآت بالمزيد من <span dir="ltr">ETH</span>.

إعادة التخزين هي تقنية مصممة [للمخزنين](/staking/) لتوسيع هذا الأمان ليشمل خدمات أو تطبيقات أو شبكات أخرى. في المقابل، يكسبون مكافآت إعادة تخزين إضافية. ومع ذلك، فإنهم يعرضون أيضًا <span dir="ltr">ETH</span> المخزن الخاص بهم لمزيد من المخاطر.

**شرح إعادة التخزين في <span dir="ltr">18</span> دقيقة**

<VideoWatch slug="restaking-explained" />

## ما هي إعادة التخزين؟ {#what-is-restaking}

إعادة التخزين هي عندما يستخدم المخزنون <span dir="ltr">ETH</span> المخزن بالفعل لتأمين خدمات لامركزية أخرى. في المقابل، يمكن لمن يقومون بإعادة التخزين الحصول على مكافآت إضافية من تلك الخدمات الأخرى علاوة على مكافآت تخزين <span dir="ltr">ETH</span> العادية الخاصة بهم.

تُعرف الخدمات اللامركزية المؤمنة عن طريق إعادة التخزين باسم "الخدمات الموثقة نشطًا" (<span dir="ltr">AVSs</span>).
بنفس الطريقة التي يقوم بها العديد من مخزني <span dir="ltr">ETH</span> بتشغيل برامج تدقيق إيثيريوم، يقوم العديد من القائمين بإعادة التخزين بتشغيل برامج <span dir="ltr">AVS</span> متخصصة.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>من الجيد معرفة ذلك</strong></p>
  <p className="mt-2">في حين أن "الخدمات الموثقة نشطًا" (<span dir="ltr">AVSs</span>) هي الأكثر شيوعًا، قد تستخدم منصات إعادة التخزين المختلفة أسماء أخرى للخدمات اللامركزية التي تساعد في تأمينها، مثل "الخدمات الموثقة ذاتيًا" أو "الخدمات الآمنة الموزعة" أو "الشبكات".</p>
</AlertDescription>
</AlertContent>
</Alert>

## التخزين مقابل إعادة التخزين {#staking-vs-restaking}

| التخزين | إعادة التخزين |
| ------------------------------ | ------------------------------------------------- |
| كسب مكافآت <span dir="ltr">ETH</span> | كسب مكافآت <span dir="ltr">ETH</span> + مكافآت <span dir="ltr">AVS</span> |
| تأمين شبكة إيثيريوم | تأمين شبكة إيثيريوم + <span dir="ltr">AVSs</span> |
| لا يوجد حد أدنى من <span dir="ltr">ETH</span> | لا يوجد حد أدنى من <span dir="ltr">ETH</span> |
| مستوى مخاطر منخفض | مستوى مخاطر منخفض إلى مرتفع |
| يعتمد وقت السحب على قائمة الانتظار | يعتمد وقت السحب على قائمة الانتظار + فترة فك الارتباط |

## لماذا نحتاج إلى إعادة التخزين؟ {#why-do-we-need-restaking}

تخيل عالمين؛ أحدهما به إعادة تخزين والآخر بدونه.

 <TabbedSection />

في هذا العالم الذي يحتوي على إعادة التخزين، يستفيد كل من <span dir="ltr">AVS</span> والمخزن من القدرة على العثور على بعضهما البعض وتبادل الأمان مقابل مكافآت إضافية.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>فائدة إضافية لإعادة التخزين</strong></p>
  <p className="mt-2">يمكن لـ <span dir="ltr">AVSs</span> صب جميع مواردها في بناء وتسويق خدماتها، بدلاً من التشتت باللامركزية والأمان.</p>
</AlertDescription>
</AlertContent>
</Alert>

## كيف تعمل إعادة التخزين؟ {#how-does-restaking-work}

هناك العديد من الكيانات المشاركة في إعادة التخزين — يلعب كل منها دورًا مهمًا.

| **المصطلح** | **الوصف** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **منصات إعادة التخزين** | منصة إعادة التخزين هي خدمة تربط بين <span dir="ltr">AVSs</span> ومخزني <span dir="ltr">ETH</span> والمشغلين. يقومون ببناء تطبيقات لامركزية للمخزنين لإعادة تخزين <span dir="ltr">ETH</span> الخاص بهم، وأسواق حيث يمكن للمخزنين و <span dir="ltr">AVSs</span> والمشغلين العثور على بعضهم البعض. |
| **القائمون بإعادة التخزين الأصليون** | يمكن للأشخاص الذين يخزنون <span dir="ltr">ETH</span> الخاص بهم عن طريق تشغيل مُدَقِّقات إيثيريوم الخاصة بهم ربط <span dir="ltr">ETH</span> المخزن الخاص بهم بمنصة إعادة تخزين، بما في ذلك <span dir="ltr">EigenLayer</span> وغيرها، لكسب مكافآت إعادة التخزين علاوة على مكافآت مُدَقِّق <span dir="ltr">ETH</span>. |
| **القائمون بإعادة التخزين السائل** | يحصل الأشخاص الذين يخزنون <span dir="ltr">ETH</span> الخاص بهم عبر مزود تخزين سائل تابع لجهة خارجية، مثل ليدو أو <span dir="ltr">Rocket Pool</span>، على رموز التخزين السائل (<span dir="ltr">LSTs</span>) التي تمثل <span dir="ltr">ETH</span> المخزن الخاص بهم. يمكنهم إعادة تخزين هذه الـ <span dir="ltr">LSTs</span> لكسب مكافآت إعادة التخزين مع الاحتفاظ بـ <span dir="ltr">ETH</span> الأصلي الخاص بهم مخزنًا. |
| **المشغلون** | يقوم المشغلون بتشغيل برامج إعادة التخزين الخاصة بـ <span dir="ltr">AVSs</span>، وأداء مهام التدقيق التي يتطلبها كل <span dir="ltr">AVS</span>. عادة ما يكون المشغلون مزودي خدمات محترفين يضمنون أشياء مثل وقت التشغيل والأداء. مثل القائمين بإعادة التخزين من غير المشغلين، يستخدم المشغلون <span dir="ltr">ETH</span> المخزن لتأمين <span dir="ltr">AVSs</span>، لكن المشغلين يتلقون أيضًا مكافآت إضافية مقابل عملهم. |
| **<span dir="ltr">AVSs</span>** | هذه هي الخدمات اللامركزية — مثل أوراكل الأسعار، وجسور الرموز المميزة، وأنظمة البيانات — التي تتلقى الأمان من القائمين بإعادة التخزين وتقدم مكافآت بالرموز المميزة في المقابل. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>من الجيد معرفة ذلك</strong></p>
  <p className="mt-2">غالبًا ما يقوم القائمون بإعادة التخزين الأصليون والسائلون بتفويض <span dir="ltr">ETH</span> المخزن الخاص بهم إلى مشغل، بدلاً من تشغيل البرنامج لتأمين <span dir="ltr">AVSs</span> بأنفسهم.</p>
  <p className="mt-2">بهذه الطريقة لا يحتاجون إلى القلق بشأن المتطلبات الفنية المعقدة من <span dir="ltr">AVSs</span>، على الرغم من أنهم يتلقون معدل مكافأة أقل من المشغلين.</p>
</AlertDescription>
</AlertContent>
</Alert>

## ما هي بعض الأمثلة على إعادة التخزين؟ {#what-are-some-examples-of-restaking}

على الرغم من كونها فكرة جديدة، فقد ظهرت بعض المشاريع لاستكشاف إمكانيات إعادة التخزين.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>تنبيه بشأن تسمية خاطئة</strong></p>
  <p className="mt-2">يخلط بعض الأشخاص بين "إعادة التخزين" وإقراض واقتراض <span dir="ltr">LSTs</span> في التمويل اللامركزي (<span dir="ltr">DeFi</span>). كلاهما يضع <span dir="ltr">ETH</span> المخزن في العمل، لكن إعادة التخزين تعني تأمين <span dir="ltr">AVSs</span>، وليس مجرد كسب عائد على <span dir="ltr">LSTs</span>.</p>
</AlertDescription>
</AlertContent>
</Alert>

## كم يمكنني أن أكسب من إعادة التخزين؟ {#how-much-can-i-make-from-restaking}

بينما تقدم <span dir="ltr">AVSs</span> معدلات مختلفة، تمنحك رموز إعادة التخزين السائل (<span dir="ltr">LRTs</span>) مثل <span dir="ltr">eETH</span> فكرة عن مقدار ما يمكنك كسبه. بنفس الطريقة التي تحصل بها على <span dir="ltr">LSTs</span> مثل <span dir="ltr">stETH</span> لتخزين <span dir="ltr">ETH</span> الخاص بك، يمكنك الحصول على <span dir="ltr">LRTs</span> مثل <span dir="ltr">eETH</span> لإعادة تخزين <span dir="ltr">stETH</span>. تكسب هذه الرموز المميزة مكافآت تخزين وإعادة تخزين <span dir="ltr">ETH</span>.

**من المهم الاعتراف بالمخاطر المرتبطة بإعادة التخزين. يمكن أن تكون المكافآت المحتملة جذابة، لكنها ليست خالية من المخاطر.**

## ما هي مخاطر إعادة التخزين؟ {#what-are-the-risks-of-restaking}

| **المخاطر** | **الوصف** |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **العقوبات (أو "الاقتطاع")** | مثل تخزين <span dir="ltr">ETH</span>، إذا أصبح القائمون بإعادة التخزين/المشغلون غير متصلين بالإنترنت، أو قاموا بفرض رقابة على الرسائل أو حاولوا إفساد الشبكة، فيمكن اقتطاع (حرق) حصة التخزين الخاصة بهم جزئيًا أو كليًا. |
| **المركزية** | إذا سيطر عدد قليل من المشغلين على معظم عمليات إعادة التخزين، فقد يكون لهم تأثير كبير على القائمين بإعادة التخزين و <span dir="ltr">AVSs</span> وحتى منصات إعادة التخزين. |
| **التفاعلات المتسلسلة** | إذا تعرض القائم بإعادة التخزين للاقتطاع أثناء تأمين عدة <span dir="ltr">AVSs</span>، فقد يؤدي ذلك إلى خفض الأمان لـ <span dir="ltr">AVSs</span> الأخرى، مما يجعلها عرضة للخطر. |
| **الوصول الفوري إلى الأموال** | هناك وقت انتظار (أو "فترة فك الارتباط") لسحب <span dir="ltr">ETH</span> المعاد تخزينه، لذلك قد لا تتمكن دائمًا من الوصول إليه على الفور. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>المؤسس المشارك لإيثيريوم يكتب…</strong></p>
  <p className="mt-2">
    حذر فيتاليك، المؤسس المشارك لإيثيريوم، من المخاطر المحتملة لإعادة التخزين في منشور مدونة عام <span dir="ltr">2021</span> بعنوان <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">لا تفرط في تحميل الإجماع.</a>
  </p>

</AlertDescription>
</AlertContent>
</Alert>

## كيف تبدأ مع إعادة التخزين؟ {#how-to-get-started-with-restaking}

| 🫡 المبتدئون | 🤓 المستخدمون المتقدمون |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. قم بتخزين <span dir="ltr">ETH</span> على منصات مثل ليدو أو <span dir="ltr">Rocket Pool</span> للحصول على <span dir="ltr">LSTs</span>. | 1. قم بتخزين <span dir="ltr">ETH</span> الخاص بك كمُدَقِّق على إيثيريوم. |
| 2. استخدم هذه الـ <span dir="ltr">LSTs</span> لبدء إعادة التخزين على خدمة إعادة تخزين. | 2. قارن بين خدمات إعادة التخزين مثل <span dir="ltr">EigenLayer</span> و <span dir="ltr">Symbiotic</span> وغيرها. |
|                                                                 | 3. اتبع التعليمات لربط المُدَقِّق الخاص بك بعقد إعادة التخزين الذكي. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>تخزين إيثيريوم:</strong> كيف يعمل؟</p>
  <ButtonLink href="/staking/">
    معرفة المزيد
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## متقدم {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## قراءة إضافية {#further-reading}

1. [ethereum.org - دليل تخزين <span dir="ltr">ETH</span>](/staking/)
2. [أكاديمية ليدجر - ما هي إعادة تخزين إيثيريوم؟](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [كونسينسيس - <span dir="ltr">EigenLayer</span>: شرح بروتوكول إعادة تخزين إيثيريوم اللامركزي](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [فيتاليك بوتيرين - لا تفرط في تحميل إجماع إيثيريوم](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [كوينتيليغراف - ما هو <span dir="ltr">EigenLayer</span>؟ شرح بروتوكول إعادة تخزين إيثيريوم](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [أبحاث <span dir="ltr">a16z crypto</span> - <span dir="ltr">EigenLayer</span>: إضافة ميزة غير مقيدة بإذن إلى إيثيريوم مع سريرام كانان](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [جونيون - شرح <span dir="ltr">EigenLayer</span>: ما هي إعادة التخزين؟](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [ذا بلوك - لوحة بيانات إعادة التخزين](https://www.theblock.co/data/decentralized-finance/restaking)
