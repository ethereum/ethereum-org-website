---
title: "إضافة منتجات أو خدمات تجميد العملات "
description: السياسة التي نتبعها عند إضافة منتجات أو خدمات تجميد العملات إلى موقع ethereum.org
lang: ar
---

# إضافة منتجات أو خدمات تجميد العملات {#adding-staking-products-or-services}

نرغب في التأكد من إدراج أفضل الموارد الممكنة مع الحفاظ على أمان المستخدمين وثقتهم.

يُمكن لأي شخص اقتراح إضافة منتج أو خدمة تجميد عملات على موقع ethereum.org. إذا كان هناك منتج أو خدمة لم ندرجها، **[يُرجى اقتراحها](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

نحن ندرج حاليًا منتجات وخدمات تجميد العملات في الصفحات التالية:

- [التجميد الفردي للعملات](/staking/solo/)
- [تجميد العملات كخدمة](/staking/saas/)
- [تجمعات تجميد العملات](/staking/pools/)

يعمل إثبات الحصة على شبكة Beacon Chain منذ 1 ديسمبر 2020. على الرغم من أن تجميد العملات لا يزال جديدًا نسبيًا، فقد حاولنا إنشاء إطار عمل عادل وشفاف للنظر في الإدراج على موقع ethereum.org، إلا أن معايير الإدراج قد تتغير وتتطور مع مرور الوقت، وتبقى الكلمة النهائية لفريق موقع ethereum.org.

## إطار اتخاذ القرار {#the-decision-framework}

لا يعتمد قرار إدراج منتج على موقع ethereum.org على عامل واحد فقط. يُؤخذ في الاعتبار مجموعة من المعايير معًا عند اتخاذ قرار إدراج منتج أو خدمة. كلما تم استيفاء عدد أكبر من هذه المعايير، زادت احتمالية إدراجه.

**أولاً، ما هي فئة المنتج أو الخدمة؟**

- أدوات العُقد أو العملاء
- إدارة المفاتيح
- تجميد العملات كخدمة)
- تجمع عمادا

حاليًا، نحن ندرج المنتجات أو الخدمات ضمن هذه الفئات فقط.

### معايير الإدراج {#criteria-for-inclusion}

سيتم تقييم طلبات إدراج منتجات أو خدمات تجميد العملات وفقًا للمعايير التالية:

**متى أُطلق المشروع أو الخدمة؟**

- هل هناك دليل يوضح متى أصبح هذا المنتج أو الخدمة متاحًا للعامة؟
- يُستخدم ذلك لتحديد مدى موثوقية المنتج أو ما يُعرف بتقييم "اختباره ميدانيًا".

**هل تتم صيانة المشروع بفاعلية؟**

- هل هناك فريق نشط يعمل على تطوير المشروع؟ من هم المساهمين؟
- سيتم أخذ المنتجات التي تتم صيانتها بنشاط فقط في الاعتبار.

**هل المنتج أو الخدمة خالية من الوسطاء الموثوقين/البشريين؟**

- ما المراحل في تجربة المستخدم التي تستلزم الاعتماد على أشخاص موثوقين، سواء لحفظ مفاتيح أموالهم أو لضمان توزيع المكافآت بشكل عادل وصحيح؟
- يُستخدم هذا لتحديد درجة "عدم الحاجة إلى الثقة" الخاصة بالمنتج أو الخدمة.

**هل يقدم المشروع معلومات دقيقة وموثوقة؟**

- من الضروري أن يحتوي موقع المنتج على معلومات حديثة ودقيقة وغير مضللة، خاصة إذا كانت تتعلق ببروتوكول إيثريوم أو التقنيات المرتبطة به.
- لن يتم إدراج الطلبات التي تحتوي على معلومات مضللة أو تفاصيل قديمة أو بيانات قد تكون خادعة حول إيثريوم أو مواضيع ذات صلة، وإذا كانت مدرجة بالفعل فسيتم حذفها.

**ما المنصات المدعومة؟**

- أي، Linux، وmacOS، وWindows، وiOS، وAndroid

#### البرامج والعقود الذكية {#software-and-smart-contracts}

For any custom software or smart contracts involved:

**هل كل شيء مفتوح المصدر؟**

- Open source projects should have a publicly available source code repository
- This is used to determine the products "open source" score.

**هل المنتج تخطى مرحلة التطوير _التجريبية (beta)_؟**

- Where is the product at in its development cycle؟
- Products in the beta stage are not considered for inclusion on ethereum.org

**هل خضع البرنامج لمراجعة أمنية خارجية؟**

- If not, are there plans to conduct an external audit؟
- This is used to determine the products "audited" score.

**هل لدى المشروع برنامج مكافآت لاكتشاف الأخطاء البرمجية؟**

- If not, are there plans to create a security bug bounty؟
- This is used to determine the products "bug bounty" score.

#### أدوات العُقد أو العملاء {#node-or-client-tooling}

For software products related to node or client setup, management or migration:

**ما هي عملاء طبقة الإجماع (أي، Lighthouse، وTeku، وNimbus، وPrysm، وGrandine) المدعومة؟**

- Which clients are supported؟ Can the user choose؟
- This is used to determine the products "multi-client" score.

#### تجميد العملات كخدمة {#staking-as-a-service}

بالنسبة [لقوائم تجميد العملات كخدمة](/staking/saas/) (أي، تشغيل العقدة المفوضة):

**ما الرسوم المرتبطة باستخدام الخدمة؟**

- ما هو هيكل الرسوم، على سبيل المثال، هل هناك رسوم شهرية للخدمة؟
- Any additional staking requirements؟

**هل يُطلب من المستخدمين إنشاء حساب؟**

- Can someone use the service without permission or KYC؟
- This is used to determine the products "permissionless" score.

**من يمتلك مفاتيح التوقيع ومفاتيح السحب؟**

- What keys does the user maintain access to؟ What keys does the service gain access to؟
- This is used to determine the products "trustless" score.

**ما مدى تنوع العملاء في العُقد التي يتم تشغيلها؟**

- ما النسبة المئوية لمفاتيح المصدّقين التي يتم تشغيلها بواسطة عميل أغلبية في طبقة الإجماع (CL)؟
- As of last edit, Prysm is the consensus layer client being run by a majority of node operators, which is dangerous for the network. If any CL client is currently being used by over 33% of the network, we request data related to its usage.
- This is used to determine the products "diverse clients" score.

#### تجمع تجميد العملات {#staking-pool}

بالنسبة [لخدمات تجميد العملات المجمعة](/staking/pools/):

**ما هو الحد الأدنى من عملة ETH المطلوب لتجميدها؟**

- على سبيل المثال، 0.01 ETH

**ما هي الرسوم أو متطلبات تجميد العملات المعنية؟**

- What percentage of rewards are removed as fees؟
- Any additional staking requirements؟

**هل يوجد رمز سيولة؟**

- What are the tokens involved؟ How do they work؟ What are the contract addresses؟
- This is used to determine the products "liquidity token" score.

**هل يمكن للمستخدمين المشاركة كمشغلي عُقد؟**

- What is required to run validator clients using the pooled funds؟
- Does this require permission from an individual, company or DAO؟
- This is used to determine the products "permissionless nodes" score.

**ما هو مدى تنوع العملاء لدى مشغلي عُقد المجمع؟**

- What percent of node operators are running a majority consensus layer (CL) client؟
- As of last edit, Prysm is the consensus layer client being run by a majority of node operators, which is dangerous for the network. If any CL client is currently being used by over 33% of the network, we request data related to its usage.
- This is used to determine the products "diverse clients" score.

### معايير أخرى: الميزات الإضافية {#other-criteria}

**ما هي واجهات المستخدم المدعومة؟**

- أي، تطبيق المتصفح، وتطبيق سطح المكتب، وتطبيق الجوال، وواجهة سطر الأوامر (CLI)

**بالنسبة لأدوات العُقد، هل يوفر البرنامج طريقة سهلة للتبديل بين العملاء؟**

- Can the user easily and safely change clients using the tool؟

**بالنسبة لخدمة SaaS، كم عدد المدققين الذين تشغلهم الخدمة حاليًا؟**

- This gives us an idea of the reach of your service so far.

## كيفية عرض النتائج {#product-ordering}

تُستخدم [معايير الإدراج](#criteria-for-inclusion) المذكورة أعلاه لحساب درجة تراكمية لكل منتج أو خدمة. This is used as a means of sorting and showcasing products that meet certain objective criteria. The more criteria that evidence is provided for, the higher a product will be sorted, with ties being randomized on load.

يوجد المنطق البرمجي والأوزان لهذه المعايير حاليًا في [مكون JavaScript هذا](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) في مستودعنا.

## أضف منتجك أو خدمتك {#add-product}

If you want to add a staking product or service to ethereum.org, create an issue on GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
أنشئ قضية
</ButtonLink>
