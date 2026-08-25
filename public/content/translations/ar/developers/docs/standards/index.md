---
title: "معايير تطوير إيثيريوم"
description: "تعرف على معايير إيثيريوم بما في ذلك مقترحات تحسين إيثيريوم (⁦EIPs⁩)، ومعايير الرموز المميزة مثل ⁦ERC-20⁩ و⁦ERC-721⁩، واتفاقيات التطوير."
lang: ar
incomplete: true
---

## نظرة عامة على المعايير {#standards-overview}

اعتمد مجتمع إيثيريوم العديد من المعايير التي تساعد في الحفاظ على المشاريع (مثل [عملاء إيثيريوم](/developers/docs/nodes-and-clients/) والمحافظ) قابلة للتشغيل البيني عبر التطبيقات المختلفة، وتضمن بقاء العقود الذكية والتطبيقات اللامركزية <span dir="ltr">(dapps)</span> قابلة للتركيب.

عادةً ما يتم تقديم المعايير على شكل [مقترحات تحسين إيثيريوم](/eips/) <span dir="ltr">(EIPs)</span>، والتي يناقشها أعضاء المجتمع من خلال [عملية قياسية](https://eips.ethereum.org/EIPS/eip-1).

- [مقدمة إلى مقترحات تحسين إيثيريوم <span dir="ltr">(EIPs)</span>](/eips/)
- [قائمة مقترحات تحسين إيثيريوم <span dir="ltr">(EIPs)</span>](https://eips.ethereum.org/)
- [مستودع <span dir="ltr">GitHub</span> لمقترحات تحسين إيثيريوم <span dir="ltr">(EIPs)</span>](https://github.com/ethereum/EIPs)
- [لوحة مناقشة مقترحات تحسين إيثيريوم <span dir="ltr">(EIPs)</span>](https://ethereum-magicians.org/c/eips)
- [مقدمة إلى حوكمة إيثيريوم](/governance/)
- [نظرة عامة على حوكمة إيثيريوم](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 مارس 2019 - بوريس مان_
- [حوكمة تطوير بروتوكول إيثيريوم وتنسيق ترقية الشبكة](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 مارس 2020 - هدسون جيمسون_
- [قائمة تشغيل لجميع اجتماعات المطورين الأساسيين لإيثيريوم](https://www.youtube.com/@EthereumProtocol) _(قائمة تشغيل يوتيوب)_

## أنواع المعايير {#types-of-standards}

هناك 3 أنواع من مقترحات تحسين إيثيريوم <span dir="ltr">(EIPs)</span>:

- مسار المعايير: يصف أي تغيير يؤثر على معظم أو كل تطبيقات إيثيريوم
- [المسار الوصفي (Meta Track)](https://eips.ethereum.org/meta): يصف عملية محيطة بإيثيريوم أو يقترح تغييرًا على عملية ما
- [المسار المعلوماتي](https://eips.ethereum.org/informational): يصف مشكلة في تصميم إيثيريوم أو يوفر إرشادات أو معلومات عامة لمجتمع إيثيريوم

علاوة على ذلك، ينقسم مسار المعايير إلى 4 فئات:

- [الأساسية (Core)](https://eips.ethereum.org/core): التحسينات التي تتطلب تفرع إجماع
- [الشبكات (Networking)](https://eips.ethereum.org/networking): التحسينات حول <span dir="ltr">devp2p</span> والبروتوكول الفرعي الخفيف لإيثيريوم، بالإضافة إلى التحسينات المقترحة لمواصفات بروتوكول الشبكة الخاصة بـ <span dir="ltr">whisper</span> وسرب.
- [الواجهة (Interface)](https://eips.ethereum.org/interface): التحسينات حول مواصفات ومعايير <span dir="ltr">API/RPC</span> للعميل، وبعض المعايير على مستوى اللغة مثل أسماء الطرق وواجهات التطبيق الثنائية للعقود <span dir="ltr">(ABIs)</span>.
- [<span dir="ltr">ERC</span>](https://eips.ethereum.org/erc): معايير واتفاقيات على مستوى التطبيق

يمكن العثور على معلومات أكثر تفصيلاً حول هذه الأنواع والفئات المختلفة في [<span dir="ltr">EIP-1</span>](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### معايير الرموز المميزة {#token-standards}

- [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) - واجهة قياسية للرموز المميزة القابلة للاستبدال (القابلة للتبادل)، مثل رموز التصويت المميزة، أو رموز التخزين المميزة، أو العملات الافتراضية.
  - [<span dir="ltr">ERC-223</span>](/developers/docs/standards/tokens/erc-223/) - معيار للرموز المميزة القابلة للاستبدال يجعل الرموز المميزة تتصرف بشكل مطابق لعملة إيثر ويدعم معالجة تحويلات الرموز المميزة على جانب المستلمين.
  - [<span dir="ltr">ERC-1363</span>](/developers/docs/standards/tokens/erc-1363/) - واجهة امتداد لرموز <span dir="ltr">ERC-20</span> المميزة تدعم تنفيذ الاستدعاء على عقود المستلمين في معاملة واحدة.
- [<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/) - واجهة قياسية للرموز المميزة غير القابلة للاستبدال، مثل صك لعمل فني أو أغنية.
  - [<span dir="ltr">ERC-2309</span>](https://eips.ethereum.org/EIPS/eip-2309) - حدث قياسي يتم إصداره عند إنشاء/نقل رمز مميز واحد أو العديد من الرموز المميزة غير القابلة للاستبدال باستخدام معرفات رموز مميزة متتالية.
  - [<span dir="ltr">ERC-4400</span>](https://eips.ethereum.org/EIPS/eip-4400) - امتداد واجهة لدور المستهلك في <span dir="ltr">EIP-721</span>.
  - [<span dir="ltr">ERC-4907</span>](https://eips.ethereum.org/EIPS/eip-4907) - إضافة دور محدد بوقت مع أذونات مقيدة لرموز <span dir="ltr">ERC-721</span> المميزة.
- [<span dir="ltr">ERC-777</span>](/developers/docs/standards/tokens/erc-777/) - **(غير موصى به)** معيار رمز مميز يحسن من <span dir="ltr">ERC-20</span>.
- [<span dir="ltr">ERC-1155</span>](/developers/docs/standards/tokens/erc-1155/) - معيار رمز مميز يمكن أن يحتوي على أصول قابلة للاستبدال وغير قابلة للاستبدال.
- [<span dir="ltr">ERC-4626</span>](/developers/docs/standards/tokens/erc-4626/) - معيار قبو مرمز مصمم لتحسين وتوحيد المعلمات الفنية للأقبية المدرة للعائد.

تعرف على المزيد حول [معايير الرموز المميزة](/developers/docs/standards/tokens/).

## قراءة إضافية {#further-reading}

- [مقترحات تحسين إيثيريوم <span dir="ltr">(EIPs)</span>](/eips/)

_هل تعرف موردًا مجتمعيًا ساعدك؟ قم بتعديل هذه الصفحة وأضفه!_