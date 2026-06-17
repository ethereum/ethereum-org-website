---
title: "هياكل البيانات والترميز"
description: "نظرة عامة على هياكل البيانات الأساسية في إيثيريوم."
lang: ar
sidebarDepth: 2
---

تقوم إيثيريوم بإنشاء وتخزين ونقل كميات كبيرة من البيانات. يجب تنسيق هذه البيانات بطرق موحدة وفعالة من حيث الذاكرة للسماح لأي شخص بـ [تشغيل عقدة](/run-a-node/) على أجهزة استهلاكية متواضعة نسبيًا. لتحقيق ذلك، يتم استخدام العديد من هياكل البيانات المحددة في حزمة إيثيريوم.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم أساسيات إيثيريوم و[برامج العميل](/developers/docs/nodes-and-clients/). يوصى بالإلمام بطبقة الشبكات و[الورقة البيضاء لإيثيريوم](/whitepaper/).

## هياكل البيانات {#data-structures}

### أشجار باتريشيا ميركل {#patricia-merkle-tries}

أشجار باتريشيا ميركل (<span dir="ltr">Patricia Merkle Tries</span>) هي هياكل تقوم بترميز أزواج المفتاح والقيمة في شجرة حتمية وموثقة تشفيريًا. تُستخدم هذه الأشجار على نطاق واسع عبر طبقة التنفيذ في إيثيريوم.

[المزيد عن أشجار باتريشيا ميركل](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### بادئة الطول العودية {#recursive-length-prefix}

بادئة الطول العودية (<span dir="ltr">RLP</span>) هي طريقة للتسلسل تُستخدم على نطاق واسع عبر طبقة التنفيذ في إيثيريوم.

[المزيد عن <span dir="ltr">RLP</span>](/developers/docs/data-structures-and-encoding/rlp)

### التسلسل البسيط {#simple-serialize}

التسلسل البسيط (<span dir="ltr">SSZ</span>) هو تنسيق التسلسل السائد في طبقة الإجماع في إيثيريوم بسبب توافقه مع عملية الميركلة (<span dir="ltr">merklelization</span>).

[المزيد عن <span dir="ltr">SSZ</span>](/developers/docs/data-structures-and-encoding/ssz)