---
title: هياكل البيانات والترميز
description: نظرة عامة على هياكل البيانات الأساسية لإيثريوم.
lang: ar
sidebarDepth: 2
---

يقوم الإيثريوم بإنشاء وتخزين ونقل كميات كبيرة من البيانات. يجب تنسيق هذه البيانات بطرق موحدة وفعالة في استخدام الذاكرة للسماح لأي شخص [بتشغيل عقدة](/run-a-node/) على أجهزة متواضعة نسبيًا مخصصة للمستهلكين. لتحقيق ذلك، يتم استخدام العديد من هياكل البيانات المحددة على مجموعة Ethereum.

## المتطلبات الأساسية {#prerequisites}

يجب أن تفهم أساسيات إيثريوم و[برنامج العميل](/developers/docs/nodes-and-clients/). يوصى بالإلمام بطبقة الشبكات و[الورقة البيضاء لإيثريوم](/whitepaper/).

## هياكل البيانات {#data-structures}

### Patricia merkle tries {#patricia-merkle-tries}

المحاولات هي هياكل تقوم بتشفير أزواج القيمة الرئيسية في محاولة حتمية وموثوقة تشفيريًا. يتم استخدامها على نطاق واسع في طبقة تنفيذ Ethereum.

[المزيد عن Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) هي طريقة تسلسل تستخدم على نطاق واسع عبر طبقة تنفيذ Ethereum.

[المزيد عن RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

التسلسل البسيط (SSZ) هو تنسيق التسلسل السائد على طبقة إجماع Ethereum بسبب توافقه مع Merklelization.

[المزيد عن SSZ](/developers/docs/data-structures-and-encoding/ssz)
