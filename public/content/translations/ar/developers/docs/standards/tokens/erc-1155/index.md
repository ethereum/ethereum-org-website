---
title: "معيار الرموز المتعددة ERC-1155"
description: "تعرف على ERC-1155، وهو معيار متعدد الرموز يجمع بين الرموز القابلة للاستبدال والرموز غير القابلة للاستبدال في عقد واحد."
lang: ar
---

## مقدمة {#مقدمة}

واجهة قياسية للعقود التي تدير أنواعًا متعددة من الرموز. قد يتضمن عقد واحد منشور أي مجموعة من الرموز القابلة للاستبدال، أو الرموز غير القابلة للاستبدال أو التكوينات الأخرى (على سبيل المثال، الرموز شبه القابلة للاستبدال).

**ماذا يعني معيار الرموز المتعددة؟**

الفكرة بسيطة وتسعى إلى إنشاء واجهة عقد ذكية يمكنها تمثيل والتحكم في أي عدد من أنواع الرموز القابلة للاستبدال وغير القابلة للاستبدال. وبهذه الطريقة، يمكن لرمز ERC-1155 أن يؤدي نفس وظائف رمز [ERC-20](/developers/docs/standards/tokens/erc-20/) ورمز [ERC-721](/developers/docs/standards/tokens/erc-721/)، وحتى كليهما في نفس الوقت. إنه يحسن وظائف كل من معايير ERC-20 وERC-721، مما يجعلها أكثر كفاءة ويصحح أخطاء التنفيذ الواضحة.

تم وصف رمز ERC-1155 بالكامل في [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصيك أولاً بالقراءة عن [معايير الرموز](/developers/docs/standards/tokens/)، و[ERC-20](/developers/docs/standards/tokens/erc-20/)، و[ERC-721](/developers/docs/standards/tokens/erc-721/).

## وظائف وميزات ERC-1155: {#body}

- [التحويل المجمّع](#batch_transfers): تحويل أصول متعددة في استدعاء واحد.
- [الرصيد المجمّع](#batch_balance): الحصول على أرصدة أصول متعددة في استدعاء واحد.
- [الموافقة المجمّعة](#batch_approval): الموافقة على جميع الرموز لعنوان ما.
- [الخطافات](#receive_hook): خطاف استلام الرموز.
- [دعم NFT](#nft_support): إذا كان المعروض 1 فقط، يتم التعامل معه على أنه NFT.
- [قواعد التحويل الآمن](#safe_transfer_rule): مجموعة من القواعد للتحويل الآمن.

### التحويلات المجمّعة {#batch-transfers}

تعمل عملية نقل الدفعة بشكل مشابه جدًا لعمليات نقل ERC-20 العادية. دعونا نلقي نظرة على دالة `transferFrom` العادية في ERC-20:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

الفرق الوحيد في ERC-1155 هو أننا نمرر القيم كمصفوفة ونمرر أيضًا مصفوفة من المعرفات. على سبيل المثال، عند إعطاء `ids=[3, 6, 13]` و`values=[100, 200, 5]`، ستكون التحويلات الناتجة

1. تحويل 100 رمز بمعرف 3 من `_from` إلى `_to`.
2. تحويل 200 رمز بمعرف 6 من `_from` إلى `_to`.
3. تحويل 5 رموز بمعرف 13 من `_from` إلى `_to`.

في ERC-1155، لدينا فقط `transferFrom`، وليس `transfer`. لاستخدامه كدالة `transfer` عادية، ما عليك سوى تعيين عنوان `from` إلى عنوان مستدعي الدالة.

### الرصيد المجمّع {#batch-balance}

استدعاء `balanceOf` الخاص بـ ERC-20 له بالمثل دالته الشريكة مع الدعم المجمّع. كتذكير، هذه هي نسخة ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

الأمر الأكثر بساطة بالنسبة لمكالمة الرصيد هو أنه يمكننا استرداد أرصدة متعددة في مكالمة واحدة. نقوم بتمرير مجموعة المالكين، متبوعة بمجموعة معرفات الرموز.

على سبيل المثال، عند إعطاء `_ids=[3, 6, 13]` و `_owners=[0xbeef..., 0x1337..., 0x1111...]`، ستكون القيمة المُرجعة

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### الموافقة المجمّعة {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

الموافقات مختلفة قليلا عن ERC-20. بدلاً من الموافقة على مبالغ محددة، يمكنك تعيين مُشغِّل (operator) إلى موافق عليه أو غير موافق عليه عبر `setApprovalForAll`.

يمكن قراءة الحالة الحالية عبر `isApprovedForAll`. كما ترون، إنها عملية إما كل شيء أو لا شيء. لا يمكنك تحديد عدد الرموز التي يجب الموافقة عليها أو حتى فئة الرمز.

تم تصميم هذا عمدا مع وضع البساطة في الاعتبار يمكنك الموافقة على كل شيء لعنوان واحد فقط.

### خطاف الاستلام {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

بفضل دعم [EIP-165](https://eips.ethereum.org/EIPS/eip-165)، يدعم ERC-1155 خطافات الاستلام للعقود الذكية فقط. يجب أن تقوم دالة الخطاف بإرجاع قيمة bytes4 محددة مسبقًا والتي يتم إعطاؤها على النحو التالي:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

عندما يقوم العقد المستلم بإرجاع هذه القيمة، يُفترض أن العقد يقبل التحويل ويعرف كيفية التعامل مع رموز ERC-1155. رائع، لا مزيد من الرموز العالقة في العقد!

### دعم NFT ‏{#nft-support}

عندما يكون العرض واحدًا فقط، يكون الرمز في الأساس رمزًا غير قابل للاستبدال (NFT). وكما هو معيار ERC-721، يمكنك تحديد عنوان URL للبيانات الوصفية. يمكن للعملاء قراءة عنوان URL وتعديله، انظر [هنا](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### قاعدة التحويل الآمن {#safe-transfer-rule}

لقد تطرقنا إلى بعض قواعد النقل الآمن في الشروحات السابقة. ولكن دعونا نلقي نظرة على أهم القواعد:

1. يجب أن يكون المستدعي موافقًا عليه لإنفاق الرموز لعنوان `_from` أو يجب أن يكون المستدعي مساويًا لـ `_from`.
2. يجب أن يتم إرجاع مكالمة التحويل إذا
   1. عنوان `_to` هو 0.
   2. طول `_ids` ليس هو نفسه طول `_values`.
   3. أي من رصيد (أرصدة) الحامل (الحاملين) للرمز (الرموز) في `_ids` أقل من المبلغ (المبالغ) المقابل في `_values` المرسلة إلى المستلم.
   4. يحدث أي خطأ آخر.

_ملاحظة_: جميع الدوال المجمّعة بما في ذلك الخطاف موجودة أيضًا كإصدارات غير مجمّعة. يتم ذلك من أجل كفاءة الغاز، مع الأخذ في الاعتبار أن نقل أحد الأصول فقط من المرجح أن يظل الطريقة الأكثر استخدامًا. لقد تركنا هذه الأمور جانباً من أجل تبسيط التفسيرات، بما في ذلك قواعد النقل الآمن. الأسماء متطابقة، فقط قم بإزالة "الدفعة".

## قراءة إضافية{#further-reading}

- [EIP-1155: معيار الرموز المتعددة](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: وثائق Openzeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: مستودع GitHub](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
