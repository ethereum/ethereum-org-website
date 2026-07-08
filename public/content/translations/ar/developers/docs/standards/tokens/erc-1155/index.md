---
title: "معيار الرموز المميزة المتعددة ⁦ERC-1155⁩"
description: "تعرف على ⁦ERC-1155⁩، وهو معيار للرموز المميزة المتعددة يجمع بين الرموز القابلة للاستبدال وغير القابلة للاستبدال في عقد واحد."
lang: ar
---

## مقدمة {#introduction}

واجهة قياسية للعقود التي تدير أنواعًا متعددة من الرموز المميزة. قد يتضمن أي عقد منشور مجموعة من الرموز القابلة للاستبدال، أو الرموز غير القابلة للاستبدال، أو تكوينات أخرى (مثل الرموز شبه القابلة للاستبدال).

**ما المقصود بمعيار الرموز المميزة المتعددة؟**

الفكرة بسيطة وتسعى إلى إنشاء واجهة عقد ذكي يمكنها تمثيل والتحكم في أي عدد من أنواع الرموز القابلة للاستبدال وغير القابلة للاستبدال. بهذه الطريقة، يمكن للرمز المميز <span dir="ltr">ERC-1155</span> أداء نفس وظائف الرمز المميز [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) و[<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/)، وحتى كليهما في نفس الوقت. إنه يحسن وظائف كل من معايير <span dir="ltr">ERC-20</span> و<span dir="ltr">ERC-721</span>، مما يجعله أكثر كفاءة ويصحح أخطاء التنفيذ الواضحة.

يتم وصف الرمز المميز <span dir="ltr">ERC-1155</span> بالكامل في [<span dir="ltr">EIP-1155</span>](https://eips.ethereum.org/EIPS/eip-1155).

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصيك بقراءة [معايير الرموز المميزة](/developers/docs/standards/tokens/)، و[<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)، و[<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/) أولاً.

## وظائف وميزات <span dir="ltr">ERC-1155</span>: {#body}

- [التحويل المجمع](#batch-transfers): تحويل أصول متعددة في استدعاء واحد.
- [الرصيد المجمع](#batch-balance): الحصول على أرصدة أصول متعددة في استدعاء واحد.
- [الموافقة المجمعة](#batch-approval): الموافقة على جميع الرموز المميزة لعنوان معين.
- [الخطافات (Hooks)](#receive-hook): خطاف استلام الرموز المميزة.
- [دعم الرموز غير القابلة للاستبدال (NFT)](#nft-support): إذا كان المعروض هو 1 فقط، يتم التعامل معه كرمز غير قابل للاستبدال.
- [قواعد التحويل الآمن](#safe-transfer-rule): مجموعة من القواعد للتحويل الآمن.

### التحويلات المجمعة {#batch-transfers}

يعمل التحويل المجمع بشكل مشابه جدًا لتحويلات <span dir="ltr">ERC-20</span> العادية. دعونا نلقي نظرة على دالة `transferFrom` العادية في <span dir="ltr">ERC-20</span>:

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

الفرق الوحيد في <span dir="ltr">ERC-1155</span> هو أننا نمرر القيم كمصفوفة ونمرر أيضًا مصفوفة من المعرفات (ids). على سبيل المثال، بالنظر إلى `ids=[3, 6, 13]` و`values=[100, 200, 5]`، ستكون التحويلات الناتجة كالتالي:

1. تحويل 100 رمز مميز بالمعرف 3 من `_from` إلى `_to`.
2. تحويل 200 رمز مميز بالمعرف 6 من `_from` إلى `_to`.
3. تحويل 5 رموز مميزة بالمعرف 13 من `_from` إلى `_to`.

في <span dir="ltr">ERC-1155</span> لدينا فقط `transferFrom`، ولا يوجد `transfer`. لاستخدامها مثل `transfer` العادية، ما عليك سوى تعيين عنوان المرسل (from) إلى العنوان الذي يستدعي الدالة.

### الرصيد المجمع {#batch-balance}

وبالمثل، فإن استدعاء `balanceOf` الخاص بـ <span dir="ltr">ERC-20</span> له دالة شريكة تدعم التجميع. للتذكير، هذه هي نسخة <span dir="ltr">ERC-20</span>:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

الأمر أبسط بالنسبة لاستدعاء الرصيد، حيث يمكننا استرداد أرصدة متعددة في استدعاء واحد. نمرر مصفوفة الملاك، تليها مصفوفة معرفات الرموز المميزة.

على سبيل المثال، بالنظر إلى `_ids=[3, 6, 13]` و`_owners=[0xbeef..., 0x1337..., 0x1111...]`، ستكون القيمة المرجعة

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### الموافقة المجمعة {#batch-approval}

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

تختلف الموافقات قليلاً عن <span dir="ltr">ERC-20</span>. بدلاً من الموافقة على مبالغ محددة، تقوم بتعيين مشغل (operator) كموافق عليه أو غير موافق عليه عبر `setApprovalForAll`.

يمكن قراءة الحالة الحالية عبر `isApprovedForAll`. كما ترى، إنها عملية إما كل شيء أو لا شيء. لا يمكنك تحديد عدد الرموز المميزة التي يجب الموافقة عليها أو حتى فئة الرمز المميز.

تم تصميم هذا عن قصد مع وضع البساطة في الاعتبار. يمكنك فقط الموافقة على كل شيء لعنوان واحد.

### خطاف الاستلام (Receive Hook) {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

نظرًا لدعم [<span dir="ltr">EIP-165</span>](https://eips.ethereum.org/EIPS/eip-165)، يدعم <span dir="ltr">ERC-1155</span> خطافات الاستلام للعقود الذكية فقط. يجب أن تُرجع دالة الخطاف قيمة <span dir="ltr">bytes4</span> سحرية محددة مسبقًا والتي تُعطى كالتالي:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

عندما يُرجع العقد المستلم هذه القيمة، يُفترض أن العقد يقبل التحويل ويعرف كيفية التعامل مع الرموز المميزة <span dir="ltr">ERC-1155</span>. رائع، لا مزيد من الرموز المميزة العالقة في العقد!

### دعم الرموز غير القابلة للاستبدال (NFT) {#nft-support}

عندما يكون المعروض واحدًا فقط، يكون الرمز المميز في الأساس رمزًا غير قابل للاستبدال (NFT). وكما هو معتاد في <span dir="ltr">ERC-721</span>، يمكنك تحديد عنوان URL للبيانات الوصفية. يمكن قراءة عنوان URL وتعديله بواسطة العملاء، انظر [هنا](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### قاعدة التحويل الآمن {#safe-transfer-rule}

لقد تطرقنا بالفعل إلى بعض قواعد التحويل الآمن في التفسيرات السابقة. ولكن دعونا نلقي نظرة على أهم هذه القواعد:

1. يجب أن يكون المتصل (caller) قد حصل على موافقة لإنفاق الرموز المميزة لعنوان `_from` أو يجب أن يكون المتصل هو نفسه `_from`.
2. يجب أن يتراجع استدعاء التحويل إذا:
   1. كان عنوان `_to` هو 0.
   2. لم يكن طول `_ids` مساويًا لطول `_values`.
   3. كان أي من رصيد (أرصدة) الحامل (الحاملين) للرمز (الرموز) المميزة في `_ids` أقل من المبلغ (المبالغ) المقابلة في `_values` المرسلة إلى المستلم.
   4. حدث أي خطأ آخر.

_ملاحظة_: جميع الدوال المجمعة بما في ذلك الخطاف موجودة أيضًا كإصدارات بدون تجميع. يتم ذلك من أجل كفاءة الغاز، مع الأخذ في الاعتبار أن تحويل أصل واحد فقط سيظل على الأرجح الطريقة الأكثر استخدامًا. لقد تركناها جانبًا للتبسيط في التفسيرات، بما في ذلك قواعد التحويل الآمن. الأسماء متطابقة، فقط قم بإزالة كلمة 'Batch'.

## قراءة إضافية {#further-reading}

- [<span dir="ltr">EIP-1155</span>: معيار الرموز المميزة المتعددة](https://eips.ethereum.org/EIPS/eip-1155)
- [<span dir="ltr">ERC-1155</span>: مستندات أوبن زبلن](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [<span dir="ltr">ERC-1155</span>: مستودع GitHub](https://github.com/enjin/erc-1155)
- [<span dir="ltr">Alchemy NFT API</span>](https://www.alchemy.com/docs/reference/nft-api-quickstart)