---
title: عناوين الشبكة
description: مقدمة عن عناوين الشبكة.
lang: ar
sidebarDepth: 2
---

يجب أن تعرّف عقد [إيثيريوم](/) عن نفسها ببعض المعلومات الأساسية للاتصال بالنظراء. لضمان قدرة أي نظير محتمل على تفسير هذه المعلومات، يتم نقلها بأحد التنسيقات الثلاثة الموحدة التي يمكن لأي عقدة إيثيريوم فهمها: <span dir="ltr">multiaddr</span>، أو <span dir="ltr">enode</span>، أو سجلات عقدة إيثيريوم (<span dir="ltr">ENRs</span>). تعتبر <span dir="ltr">ENRs</span> المعيار الحالي لعناوين شبكة إيثيريوم.

## المتطلبات الأساسية {#prerequisites}

يلزم بعض الفهم لـ [طبقة الشبكة](/developers/docs/networking-layer/) الخاصة بإيثيريوم لفهم هذه الصفحة.

## <span dir="ltr">Multiaddr</span> {#multiaddr}

كان تنسيق عنوان عقدة إيثيريوم الأصلي هو "<span dir="ltr">multiaddr</span>" (اختصار لـ "<span dir="ltr">multi-addresses</span>"). <span dir="ltr">Multiaddr</span> هو تنسيق عالمي مصمم لشبكات نظير إلى نظير. يتم تمثيل العناوين كأزواج مفتاح-قيمة مع فصل المفاتيح والقيم بشرطة مائلة. على سبيل المثال، يبدو <span dir="ltr">multiaddr</span> لعقدة بعنوان <span dir="ltr">IPv4</span> `192.168.22.27` تستمع إلى منفذ <span dir="ltr">TCP</span> `33000` كما يلي:

`/ip4/192.168.22.27/tcp/33000`

بالنسبة لعقدة إيثيريوم، يحتوي <span dir="ltr">multiaddr</span> على معرف العقدة (<span dir="ltr">node-ID</span>) (وهو تجزئة لمفتاحها العام):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## <span dir="ltr">Enode</span> {#enode}

<span dir="ltr">enode</span> هي طريقة لتعريف عقدة إيثيريوم باستخدام تنسيق عنوان <span dir="ltr">URL</span>. يتم تشفير معرف العقدة السداسي العشري في جزء اسم المستخدم من عنوان <span dir="ltr">URL</span> مفصولاً عن المضيف باستخدام علامة <span dir="ltr">@</span>. لا يمكن إعطاء اسم المضيف إلا كعنوان <span dir="ltr">IP</span>؛ ولا يُسمح بأسماء <span dir="ltr">DNS</span>. المنفذ في قسم اسم المضيف هو منفذ استماع <span dir="ltr">TCP</span>. إذا اختلف منفذ <span dir="ltr">TCP</span> عن منفذ <span dir="ltr">UDP</span> (الاكتشاف)، يتم تحديد منفذ <span dir="ltr">UDP</span> كمعلمة استعلام "<span dir="ltr">discport</span>".

في المثال التالي، يصف عنوان <span dir="ltr">URL</span> للعقدة عقدة بعنوان <span dir="ltr">IP</span> `10.3.58.6`، ومنفذ <span dir="ltr">TCP</span> `30303`، ومنفذ اكتشاف <span dir="ltr">UDP</span> `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## سجلات عقدة إيثيريوم (<span dir="ltr">ENRs</span>) {#enr}

سجلات عقدة إيثيريوم (<span dir="ltr">ENRs</span>) هي تنسيق موحد لعناوين الشبكة على إيثيريوم. وهي تحل محل <span dir="ltr">multiaddr</span> و <span dir="ltr">enode</span>. وهي مفيدة بشكل خاص لأنها تسمح بتبادل معلومات أكبر بين العقد. يحتوي <span dir="ltr">ENR</span> على توقيع، ورقم تسلسلي، وحقول تفصل مخطط الهوية المستخدم لإنشاء التواقيع والتحقق من صحتها. يمكن أيضًا ملء <span dir="ltr">ENR</span> ببيانات عشوائية منظمة كأزواج مفتاح-قيمة. تحتوي أزواج المفتاح-القيمة هذه على عنوان <span dir="ltr">IP</span> الخاص بالعقدة ومعلومات حول البروتوكولات الفرعية التي يمكن للعقدة استخدامها. تستخدم عملاء الإجماع [هيكل <span dir="ltr">ENR</span> محدد](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) لتحديد عقد التمهيد وتتضمن أيضًا حقل `eth2` يحتوي على معلومات حول تفرع إيثيريوم الحالي والشبكة الفرعية لنشر التصديقات (gossip) (وهذا يربط العقدة بمجموعة معينة من النظراء الذين يتم تجميع تصديقاتهم معًا).

## قراءة إضافية {#further-reading}

- [<span dir="ltr">EIP-778</span>: سجلات عقدة إيثيريوم (<span dir="ltr">ENR</span>)](https://eips.ethereum.org/EIPS/eip-778)
- [<span dir="ltr">LibP2P: Multiaddr-Enode-ENR?!</span>](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)