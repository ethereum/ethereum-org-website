---
title: "معايير تطوير إيثريوم"
description: "تعرف على معايير Ethereum بما في ذلك EIPs ومعايير الرموز مثل ERC-20 وERC-721 واتفاقيات التطوير."
lang: ar
incomplete: true
---

## نظرة عامة على المعايير {#standards-overview}

لقد تبنى مجتمع إيثريوم العديد من المعايير التي تساعد في الحفاظ على المشاريع (مثل [عملاء إيثريوم](/developers/docs/nodes-and-clients/) والمحافظ) قابلة للتشغيل البيني عبر عمليات التنفيذ المختلفة، وتضمن أن تظل العقود الذكية والتطبيقات اللامركزية قابلة للتركيب.

عادةً ما يتم تقديم المعايير كـ [مقترحات تحسين إيثريوم](/eips/) (EIPs)، والتي يناقشها أعضاء المجتمع من خلال [عملية معيارية](https://eips.ethereum.org/EIPS/eip-1).

- [مقدمة عن مقترحات تحسين إيثريوم (EIPs)](/eips/)
- [قائمة مقترحات تحسين إيثريوم (EIPs)](https://eips.ethereum.org/)
- [مستودع EIP على GitHub](https://github.com/ethereum/EIPs)
- [منتدى مناقشة EIP](https://ethereum-magicians.org/c/eips)
- [مقدمة إلى حوكمة إيثريوم](/governance/)
- [نظرة عامة على حوكمة إيثريوم](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 مارس 2019 - بوريس مان_
- [حوكمة تطوير بروتوكول إيثريوم وتنسيق ترقية الشبكة](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 مارس 2020 - هدسون جيمسون_
- [قائمة تشغيل لجميع اجتماعات مطوري إيثريوم الأساسيين](https://www.youtube.com/@EthereumProtocol) _(قائمة تشغيل يوتيوب)_

## أنواع المعايير {#types-of-standards}

هناك ثلاثة أنواع من مقترحات تحسين إيثريوم (EIPs):

- مسار المعايير (Standards Track): يصف أي تغيير يؤثر على معظم أو جميع تطبيقات إيثريوم.
- [المسار التعريفي (Meta)](https://eips.ethereum.org/meta): يصف عملية متعلقة بإيثريوم أو يقترح تغييرًا في إحدى العمليات
- [المسار المعلوماتي (Informational)](https://eips.ethereum.org/informational): يصف مسألة تصميمية في إيثريوم أو يقدم إرشادات عامة أو معلومات لمجتمع إيثريوم

علاوة على ذلك، يُقسَّم مسار المعايير (Standard Track) إلى أربع فئات:

- [أساسي](https://eips.ethereum.org/core): التحسينات التي تتطلب انقسام الإجماع
- [الشبكات](https://eips.ethereum.org/networking): تحسينات حول devp2p وبروتوكول إيثريوم الفرعي الخفيف، بالإضافة إلى التحسينات المقترحة لمواصفات بروتوكول الشبكة لـ whisper و swarm.
- [الواجهة](https://eips.ethereum.org/interface): تحسينات حول مواصفات ومعايير واجهة برمجة التطبيقات/استدعاء الإجراء عن بعد (API/RPC) للعميل، ومعايير معينة على مستوى اللغة مثل أسماء الطرق وواجهات التطبيق الثنائية (ABI) للعقود.
- [ERC](https://eips.ethereum.org/erc): معايير واتفاقيات على مستوى التطبيق

يمكن العثور على معلومات أكثر تفصيلاً حول هذه الأنواع والفئات المختلفة في [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### معايير الرموز {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - واجهة قياسية للرموز القابلة للاستبدال (التبادلية)، مثل رموز التصويت أو رموز التخزين أو العملات الافتراضية.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - معيار للرموز القابلة للاستبدال يجعل الرموز تتصرف بشكل مماثل للإيثر ويدعم معالجة تحويلات الرموز من جانب المستلمين.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - واجهة امتداد لرموز ERC-20 تدعم تنفيذ رد النداء على عقود المستلمين في معاملة واحدة.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - واجهة قياسية للرموز غير القابلة للاستبدال، مثل سند لعمل فني أو أغنية.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - حدث معياري يتم إصداره عند إنشاء/تحويل رمز واحد أو عدة رموز غير قابلة للاستبدال باستخدام معرفات رموز متتالية.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - امتداد واجهة لدور المستهلك في EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - إضافة دور محدود زمنيًا بأذونات مقيدة إلى رموز ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(غير موصى به)** معيار رموز يحسن من ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - معيار رموز يمكن أن يحتوي على أصول قابلة للاستبدال وغير قابلة للاستبدال.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - معيار للخزائن المرمزة مصمم لتحسين وتوحيد المعلمات التقنية للخزائن المدرة للعائد.

تعرف على المزيد حول [معايير الرموز](/developers/docs/standards/tokens/).

## قراءة إضافية{#further-reading}

- [مقترحات تحسين إيثريوم (EIPs)](/eips/)

_هل تعرف أحد الموارد المجتمعية التي ساعدتك؟ عدّل هذه الصفحة وأضفه!_
