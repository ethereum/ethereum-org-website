---
title: "⁦IPFS⁩ لواجهات المستخدم اللامركزية"
description: "يعلم هذا البرنامج التعليمي القارئ كيفية استخدام ⁦IPFS⁩ لتخزين واجهة المستخدم لتطبيق لامركزي (⁦dapp⁩). على الرغم من أن بيانات التطبيق ومنطق الأعمال لامركزية، إلا أنه بدون واجهة مستخدم مقاومة للرقابة، قد يفقد المستخدمون الوصول إليه على أي حال."
author: "أوري بوميرانتس"
tags: ["ipfs", "التطبيقات اللامركزية", "الواجهة الأمامية"]
skill: beginner
breadcrumb: "⁦IPFS⁩ لواجهات مستخدم التطبيقات اللامركزية (⁦dapps⁩)"
lang: ar
published: 2024-06-29
---

لقد كتبت تطبيقًا لامركزيًا (<span dir="ltr">dapp</span>) جديدًا ومذهلًا. لقد كتبت حتى [واجهة مستخدم](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) له. ولكنك الآن تخشى أن يحاول شخص ما فرض الرقابة عليه عن طريق إسقاط واجهة المستخدم الخاصة بك، والتي هي مجرد خادم واحد في السحابة. في هذا البرنامج التعليمي، ستتعلم كيفية تجنب الرقابة عن طريق وضع واجهة المستخدم الخاصة بك على **[نظام الملفات بين الكواكب (<span dir="ltr">IPFS</span>)](https://ipfs.tech/developers/)** بحيث يتمكن أي شخص مهتم من تثبيتها على خادم للوصول إليها في المستقبل.

يمكنك استخدام خدمة تابعة لجهة خارجية مثل [<span dir="ltr">Fleek</span>](https://resources.fleek.xyz/docs/) للقيام بكل العمل. هذا البرنامج التعليمي مخصص للأشخاص الذين يرغبون في القيام بما يكفي لفهم ما يفعلونه حتى لو كان ذلك يتطلب المزيد من العمل.

## البدء محليًا {#getting-started-locally}

هناك العديد من [مزودي <span dir="ltr">IPFS</span> من جهات خارجية](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service)، ولكن من الأفضل البدء بتشغيل <span dir="ltr">IPFS</span> محليًا للاختبار.

1. قم بتثبيت [واجهة مستخدم <span dir="ltr">IPFS</span>](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. قم بإنشاء دليل يحتوي على موقع الويب الخاص بك. إذا كنت تستخدم [<span dir="ltr">Vite</span>](https://vite.dev/)، فاستخدم هذا الأمر:

   ```sh
   pnpm vite build
   ```

3. في تطبيق <span dir="ltr">IPFS Desktop</span>، انقر على **<span dir="ltr">Import > Folder</span>** (استيراد > مجلد) وحدد الدليل الذي أنشأته في الخطوة السابقة.

4. حدد المجلد الذي قمت بتحميله للتو وانقر على **<span dir="ltr">Rename</span>** (إعادة تسمية). امنحه اسمًا ذا معنى أكبر.

5. حدده مرة أخرى وانقر على **<span dir="ltr">Share link</span>** (مشاركة الرابط). انسخ عنوان <span dir="ltr">URL</span> إلى الحافظة. سيكون الرابط مشابهًا لـ `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. انقر على **<span dir="ltr">Status</span>** (الحالة). قم بتوسيع علامة التبويب **<span dir="ltr">Advanced</span>** (متقدم) لرؤية عنوان البوابة. على سبيل المثال، العنوان على نظامي هو `http://127.0.0.1:8080`.

7. اجمع المسار من خطوة الرابط مع عنوان البوابة للعثور على عنوانك. على سبيل المثال، بالنسبة للمثال أعلاه، عنوان <span dir="ltr">URL</span> هو `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. افتح عنوان <span dir="ltr">URL</span> هذا في متصفح لرؤية موقعك.

## التحميل {#uploading}

لذا يمكنك الآن استخدام <span dir="ltr">IPFS</span> لتقديم الملفات محليًا، وهو أمر ليس مثيرًا للغاية. الخطوة التالية هي جعلها متاحة للعالم عندما تكون غير متصل بالإنترنت.

هناك عدد من [خدمات التثبيت](https://docs.ipfs.tech/concepts/persistence/#pinning-services) المعروفة. اختر واحدة منها. أيًا كانت الخدمة التي تستخدمها، ستحتاج إلى إنشاء حساب وتزويده بـ **معرف المحتوى (<span dir="ltr">CID</span>)** الموجود في تطبيق <span dir="ltr">IPFS Desktop</span> الخاص بك.

شخصيًا، وجدت أن [<span dir="ltr">4EVERLAND</span>](https://docs.4everland.org/storage/4ever-pin/guides) هي الأسهل في الاستخدام. إليك التوجيهات الخاصة بها:

1. تصفح إلى [لوحة التحكم](https://dashboard.4everland.org/overview) وسجل الدخول باستخدام محفظتك.

2. في الشريط الجانبي الأيسر، انقر على **<span dir="ltr">Storage > 4EVER Pin</span>**.

3. انقر على **<span dir="ltr">Upload > Selected CID</span>**. امنح محتواك اسمًا وقدم معرف المحتوى (<span dir="ltr">CID</span>) من تطبيق <span dir="ltr">IPFS Desktop</span>. في الوقت الحاضر، معرف المحتوى (<span dir="ltr">CID</span>) عبارة عن سلسلة تبدأ بـ `Qm` متبوعة بـ <span dir="ltr">44</span> حرفًا ورقمًا تمثل تجزئة [مشفرة بـ <span dir="ltr">base-58</span>](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524)، مثل `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`، ولكن [من المرجح أن يتغير ذلك](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. الحالة الأولية هي **<span dir="ltr">Queued</span>** (في قائمة الانتظار). أعد التحميل حتى تتغير إلى **<span dir="ltr">Pinned</span>** (مثبت).

5. انقر على معرف المحتوى (<span dir="ltr">CID</span>) الخاص بك للحصول على الرابط. يمكنك رؤية تطبيقي [هنا](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. قد تحتاج إلى تفعيل حسابك لإبقائه مثبتًا لأكثر من شهر. تبلغ تكلفة تفعيل الحساب حوالي <span dir="ltr">$1</span>. إذا قمت بإغلاقه، فقم بتسجيل الخروج وتسجيل الدخول مرة أخرى ليُطلب منك التفعيل مرة أخرى.

## الاستخدام من <span dir="ltr">IPFS</span> {#using-from-ipfs}

في هذه المرحلة، لديك رابط لبوابة مركزية تقدم محتوى <span dir="ltr">IPFS</span> الخاص بك. باختصار، قد تكون واجهة المستخدم الخاصة بك أكثر أمانًا قليلًا ولكنها لا تزال غير مقاومة للرقابة. للحصول على مقاومة حقيقية للرقابة، يحتاج المستخدمون إلى استخدام <span dir="ltr">IPFS</span> [مباشرة من المتصفح](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

بمجرد تثبيت ذلك (وعمل تطبيق <span dir="ltr">IPFS Desktop</span>)، يمكنك الانتقال إلى [<span dir="ltr">/ipfs/</span>`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) على أي موقع وستحصل على هذا المحتوى، مقدمًا بطريقة لامركزية.

## العيوب {#drawbacks}

لا يمكنك حذف ملفات <span dir="ltr">IPFS</span> بشكل موثوق، لذلك طالما أنك تقوم بتعديل واجهة المستخدم الخاصة بك، فمن الأفضل على الأرجح إما تركها مركزية، أو استخدام [نظام الأسماء بين الكواكب (<span dir="ltr">IPNS</span>)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs)، وهو نظام يوفر قابلية التغيير فوق <span dir="ltr">IPFS</span>. بالطبع، يمكن فرض الرقابة على أي شيء قابل للتغيير، وفي حالة <span dir="ltr">IPNS</span> يتم ذلك عن طريق الضغط على الشخص الذي يمتلك المفتاح الخاص الذي يتوافق معه.

بالإضافة إلى ذلك، تواجه بعض الحزم مشكلة مع <span dir="ltr">IPFS</span>، لذلك إذا كان موقع الويب الخاص بك معقدًا للغاية، فقد لا يكون هذا حلًا جيدًا. وبالطبع، لا يمكن جعل أي شيء يعتمد على تكامل الخادم لامركزيًا بمجرد وجود جانب العميل على <span dir="ltr">IPFS</span>.

## قابلية الاكتشاف عبر <span dir="ltr">ENS</span> {#discoverability}

إذا قمت بتوجيه اسم <span dir="ltr">ENS</span> (مثل <span dir="ltr">vitalik.eth</span>) إلى موقع الويب الخاص بك، فسيتم اعتباره صفحة ويب لامركزية بالكامل وسيتم تثبيته تلقائيًا بواسطة خدمة [<span dir="ltr">dweb3.wtf</span>](https://dweb3.wtf)، بالإضافة إلى جعله قابلاً للبحث من خلال محرك بحث [<span dir="ltr">web3compass.net</span>](https://web3compass.net)، تمامًا كما تفعل محركات بحث <span dir="ltr">DuckDuckGo</span> أو <span dir="ltr">Brave Search</span> أو <span dir="ltr">Google</span> للويب التقليدي.

## الخاتمة {#conclusion}

تمامًا كما تتيح لك إيثيريوم جعل جوانب قاعدة البيانات ومنطق الأعمال في تطبيقك اللامركزي (<span dir="ltr">dapp</span>) لامركزية، يتيح لك <span dir="ltr">IPFS</span> جعل واجهة المستخدم لامركزية. يتيح لك هذا إغلاق ناقل هجوم آخر ضد تطبيقك اللامركزي (<span dir="ltr">dapp</span>).

[انظر هنا للمزيد من أعمالي](https://cryptodocguy.pro/).