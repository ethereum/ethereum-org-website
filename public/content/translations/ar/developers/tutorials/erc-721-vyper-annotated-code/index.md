---
title: "إرشادات تفصيلية لعقد ERC-721 الخاص بـ Vyper"
description: "عقد ERC-721 الخاص بـ Ryuya Nakamura وكيفية عمله"
author: Ori Pomerantz
lang: ar
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## مقدمة {#introduction}

يُستخدم معيار [ERC-721](/developers/docs/standards/tokens/erc-721/) للاحتفاظ بملكية الرموز غير القابلة للاستبدال (NFT).
تتصرف رموز [ERC-20](/developers/docs/standards/tokens/erc-20/) كسلعة، لأنه لا يوجد فرق بين الرموز الفردية.
على النقيض من ذلك، صُممت رموز ERC-721 للأصول المتشابهة ولكن غير المتطابقة، مثل [رسوم القطط المتحركة](https://www.cryptokitties.co/) المختلفة أو صكوك ملكية العقارات المختلفة.

في هذه المقالة، سنحلل [عقد ERC-721 الخاص بـ Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
هذا العقد مكتوب بلغة [Vyper](https://vyper.readthedocs.io/en/latest/index.html)، وهي لغة عقود شبيهة بلغة Python مصممة لجعل كتابة نصوص برمجية غير آمنة أصعب مما هي عليه في لغة Solidity.

## العقد {#contract}

```python
# @dev تنفيذ معيار الرمز غير القابل للاستبدال ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# مُعدَّل من: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

تبدأ التعليقات في لغة Vyper، كما في Python، برمز الهاش (`#`) وتستمر حتى نهاية السطر. تُستخدم التعليقات التي تتضمن `@<keyword>` بواسطة [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) لإنتاج توثيق يمكن للبشر قراءته.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

واجهة ERC-721 مدمجة في لغة Vyper.
[يمكنك رؤية تعريف النص البرمجي هنا](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
تعريف الواجهة مكتوب بلغة Python، وليس Vyper، لأن الواجهات لا تُستخدم فقط داخل البلوكتشين، ولكن أيضًا عند إرسال معاملة إلى البلوكتشين من عميل خارجي، والذي قد يكون مكتوبًا بلغة Python.

السطر الأول يستورد الواجهة، والثاني يحدد أننا نقوم بتنفيذها هنا.

### واجهة ERC721Receiver {#receiver-interface}

```python
# واجهة للعقد الذي تستدعيه safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

يدعم ERC-721 نوعين من التحويل:

- `transferFrom`، التي تتيح للمرسل تحديد أي عنوان وجهة وتضع مسؤولية التحويل على المرسل. هذا يعني أنه يمكنك التحويل إلى عنوان غير صالح، وفي هذه الحالة يُفقد الرمز غير القابل للاستبدال (NFT) إلى الأبد.
- `safeTransferFrom`، التي تتحقق مما إذا كان عنوان الوجهة عقدًا. إذا كان الأمر كذلك، يسأل عقد ERC-721 العقد المُستقبِل ما إذا كان يريد استلام الرمز غير القابل للاستبدال (NFT).

للإجابة على طلبات `safeTransferFrom`، يجب على العقد المستقبِل تنفيذ `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

عنوان `_from` هو المالك الحالي للرمز. عنوان `_operator` هو الذي طلب التحويل (قد لا يكونان متماثلين، بسبب المخصصات).

```python
            _tokenId: uint256,
```

معرفات رموز ERC-721 هي 256 بت. عادةً ما يتم إنشاؤها عن طريق تجزئة (هاش) وصف لما يمثله الرمز.

```python
            _data: Bytes[1024]
```

يمكن أن يحتوي الطلب على ما يصل إلى 1024 بايت من بيانات المستخدم.

```python
        ) -> bytes32: view
```

لمنع الحالات التي يقبل فيها العقد عن طريق الخطأ عملية تحويل، فإن القيمة المرجعة ليست قيمة منطقية (boolean)، ولكنها 256 بت بقيمة محددة.

هذه الدالة هي `view`، مما يعني أنها تستطيع قراءة حالة البلوكتشين، ولكن لا يمكنها تعديلها.

### الأحداث {#events}

يتم إصدار [الأحداث](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) لإبلاغ المستخدمين والخوادم خارج البلوكتشين بالأحداث. لاحظ أن محتوى الأحداث غير متاح للعقود على البلوكتشين.

```python
# @dev يتم إصداره عند تغيير ملكية أي رمز غير قابل للاستبدال (NFT) بأي آلية. يتم إصدار هذا الحدث عند إنشاء رموز NFT (`from` == 0) وتدميرها (`to` == 0). استثناء: أثناء إنشاء العقد، يمكن إنشاء وتعيين أي عدد من رموز NFT دون إصدار حدث Transfer. في وقت أي تحويل، تتم إعادة تعيين العنوان المعتمد لهذا الرمز (إن وجد) إلى لا شيء.
# @param _from مرسل الرمز غير القابل للاستبدال (NFT) (إذا كان العنوان هو العنوان الصفري فهذا يشير إلى إنشاء الرمز).
# @param _to مستلم الرمز غير القابل للاستبدال (NFT) (إذا كان العنوان هو العنوان الصفري فهذا يشير إلى تدمير الرمز).
# @param _tokenId الرمز غير القابل للاستبدال (NFT) الذي تم تحويله.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

هذا مشابه لحدث التحويل الخاص بمعيار ERC-20، باستثناء أننا نبلغ عن `tokenId` بدلاً من مبلغ.
لا أحد يمتلك العنوان الصفري، لذلك حسب العرف نستخدمه للإبلاغ عن إنشاء وتدمير الرموز.

```python
# @dev يصدر هذا عند تغيير العنوان المعتمد لرمز غير قابل للاستبدال (NFT) أو إعادة تأكيده. يشير العنوان الصفري إلى عدم وجود عنوان معتمد. عندما يصدر حدث Transfer، يشير هذا أيضًا إلى أن العنوان المعتمد لهذا الرمز (إن وجد) تتم إعادة تعيينه إلى لا شيء.
# @param _owner مالك الرمز غير القابل للاستبدال (NFT).
# @param _approved العنوان الذي نوافق عليه.
# @param _tokenId الرمز غير القابل للاستبدال (NFT) الذي نوافق عليه.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

الموافقة في ERC-721 مشابهة للمخصصات في ERC-20. يُسمح لعنوان معين بتحويل رمز معين. وهذا يعطي آلية للعقود للاستجابة عندما تقبل رمزًا. لا يمكن للعقود الاستماع للأحداث، لذلك إذا قمت فقط بتحويل الرمز إليها، فإنها لا "تعرف" عنه. بهذه الطريقة، يقدم المالك أولاً موافقة ثم يرسل طلبًا إلى العقد: "لقد وافقت على قيامك بتحويل الرمز X، من فضلك افعل ...".

هذا خيار تصميم لجعل معيار ERC-721 مشابهًا لمعيار ERC-20. لأن رموز ERC-721 غير قابلة للاستبدال، يمكن للعقد أيضًا تحديد أنه حصل على رمز معين من خلال النظر في ملكية الرمز.

```python
# @dev يصدر هذا الحدث عند تمكين أو تعطيل مشغل لمالك. يمكن للمشغل إدارة جميع رموز NFT الخاصة بالمالك.
# @param _owner مالك الرمز غير القابل للاستبدال (NFT).
# @param _operator العنوان الذي نقوم بتعيين حقوق المشغل له.
# @param _approved حالة حقوق المشغل (true إذا تم منح حقوق المشغل و false إذا تم إلغاؤها).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

من المفيد أحيانًا وجود مشغل يمكنه إدارة جميع رموز حساب من نوع معين (تلك التي يديرها عقد معين)، على غرار التوكيل الرسمي. على سبيل المثال، قد أرغب في منح مثل هذه السلطة لعقد يتحقق مما إذا كنت لم أتصل به لمدة ستة أشهر، وإذا كان الأمر كذلك، فإنه يوزع أصولي على ورثتي (إذا طلب أحدهم ذلك، فلا يمكن للعقود فعل أي شيء دون أن يتم استدعاؤها من خلال معاملة). في ERC-20، يمكننا فقط منح مخصصات عالية لعقد ميراث، ولكن هذا لا يعمل مع ERC-721 لأن الرموز ليست قابلة للاستبدال. هذا هو المعادل.

تخبرنا قيمة `approved` ما إذا كان الحدث للموافقة، أو لسحب الموافقة.

### متغيرات الحالة {#state-vars}

تحتوي هذه المتغيرات على الحالة الحالية للرموز: أيها متاح ومن يمتلكها. معظمها عبارة عن كائنات `HashMap`، وهي [تعيينات أحادية الاتجاه موجودة بين نوعين](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev تعيين من معرف الرمز غير القابل للاستبدال (NFT) إلى العنوان الذي يمتلكه.
idToOwner: HashMap[uint256, address]

# @dev تعيين من معرف الرمز غير القابل للاستبدال (NFT) إلى العنوان المعتمد.
idToApprovals: HashMap[uint256, address]
```

يتم تمثيل هويات المستخدمين والعقود في إيثريوم بعناوين 160 بت. يقوم هذان المتغيران بالتعيين من معرّفات الرموز إلى مالكيها وأولئك المعتمدين لتحويلها (بحد أقصى واحد لكل منهما). في إيثريوم، تكون البيانات غير المهيأة دائمًا صفرًا، لذلك إذا لم يكن هناك مالك أو محوّل معتمد، فإن قيمة هذا الرمز تكون صفرًا.

```python
# @dev تعيين من عنوان المالك إلى عدد رموزه.
ownerToNFTokenCount: HashMap[address, uint256]
```

يحمل هذا المتغير عدد الرموز لكل مالك. لا يوجد تعيين من المالكين إلى الرموز، لذا فإن الطريقة الوحيدة لتحديد الرموز التي يمتلكها مالك معين هي الرجوع إلى سجل أحداث البلوكتشين ورؤية أحداث `Transfer` المناسبة. يمكننا استخدام هذا المتغير لمعرفة متى يكون لدينا كل رموز NFT ولا نحتاج إلى النظر أبعد من ذلك في الوقت.

لاحظ أن هذه الخوارزمية تعمل فقط مع واجهات المستخدم والخوادم الخارجية. لا يمكن للنص البرمجي الذي يعمل على البلوكتشين نفسه قراءة الأحداث الماضية.

```python
# @dev تعيين من عنوان المالك إلى تعيين عناوين المشغلين.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

قد يكون للحساب أكثر من مشغل واحد. `HashMap` بسيط غير كافٍ لتتبعها، لأن كل مفتاح يؤدي إلى قيمة واحدة. بدلاً من ذلك، يمكنك استخدام `HashMap[address, bool]` كقيمة. بشكل افتراضي، تكون القيمة لكل عنوان هي `False`، مما يعني أنه ليس مشغلاً. يمكنك تعيين القيم على `True` حسب الحاجة.

```python
# @dev عنوان الساك، الذي يمكنه سك رمز
minter: address
```

يجب إنشاء الرموز الجديدة بطريقة ما. في هذا العقد، هناك كيان واحد مسموح له بالقيام بذلك، وهو `minter`. من المحتمل أن يكون هذا كافيًا للعبة، على سبيل المثال. لأغراض أخرى، قد يكون من الضروري إنشاء منطق أعمال أكثر تعقيدًا.

```python
# @dev تعيين من معرّف الواجهة إلى قيمة منطقية حول ما إذا كانت مدعومة أم لا
supportedInterfaces: HashMap[bytes32, bool]

# @dev معرّف واجهة ERC165 الخاص بـ ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev معرّف واجهة ERC165 الخاص بـ ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

يحدد [ERC-165](https://eips.ethereum.org/EIPS/eip-165) آلية للعقد للكشف عن كيفية تواصل التطبيقات معه، وإلى أي من معايير ERC يتوافق. في هذه الحالة، يتوافق العقد مع ERC-165 و ERC-721.

### الدوال {#functions}

هذه هي الدوال التي تنفذ بالفعل ERC-721.

#### الدالة الإنشائية {#constructor}

```python
@external
def __init__():
```

في Vyper، كما هو الحال في Python، تُسمى الدالة الإنشائية `__init__`.

```python
    """
    @dev الدالة الإنشائية للعقد.
    """
```

في Python، وفي Vyper، يمكنك أيضًا إنشاء تعليق عن طريق تحديد سلسلة نصية متعددة الأسطر (تبدأ وتنتهي بـ `"""`)، وعدم استخدامها بأي طريقة. يمكن أن تتضمن هذه التعليقات أيضًا [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

للوصول إلى متغيرات الحالة، استخدم `self.<variable name>` (مرة أخرى، كما هو الحال في Python).

#### دوال العرض {#views}

هذه هي الدوال التي لا تعدل حالة البلوكتشين، وبالتالي يمكن تنفيذها مجانًا إذا تم استدعاؤها خارجيًا. إذا تم استدعاء دوال العرض بواسطة عقد، فلا يزال يتعين تنفيذها على كل عقدة وبالتالي تكلف غازًا.

```python
@view
@external
```

هذه الكلمات المفتاحية التي تسبق تعريف الدالة والتي تبدأ بعلامة @ (`@`) تسمى _الديكورات_. إنها تحدد الظروف التي يمكن فيها استدعاء الدالة.

- `@view` تحدد أن هذه الدالة هي دالة عرض.
- `@external` تحدد أنه يمكن استدعاء هذه الدالة المعينة عن طريق المعاملات ومن خلال العقود الأخرى.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

على عكس Python، فإن Vyper هي [لغة ذات أنواع ثابتة](https://wikipedia.org/wiki/Type_system#Static_type_checking).
لا يمكنك الإعلان عن متغير، أو معلمة دالة، دون تحديد [نوع البيانات](https://vyper.readthedocs.io/en/latest/types.html). في هذه الحالة، معلمة الإدخال هي `bytes32`، وهي قيمة 256 بت (256 بت هو حجم الكلمة الأصلي لـ[آلة إيثريوم الافتراضية](/developers/docs/evm/)). الناتج هو قيمة منطقية. حسب العرف، تبدأ أسماء معلمات الدالة بشرطة سفلية (`_`).

```python
    """
    @dev يتم تحديد تعريف الواجهة في ERC-165.
    @param _interfaceID معرّف الواجهة
    """
    return self.supportedInterfaces[_interfaceID]
```

إرجاع القيمة من `self.supportedInterfaces` HashMap، والتي يتم تعيينها في الدالة الإنشائية (`__init__`).

```python
### دوال العرض ###

```

هذه هي دوال العرض التي توفر معلومات حول الرموز للمستخدمين والعقود الأخرى.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev ترجع عدد رموز NFT المملوكة لـ `_owner`.
         تطلق خطأ إذا كان `_owner` هو العنوان الصفري. تعتبر رموز NFT المخصصة للعنوان الصفري غير صالحة.
    @param _owner العنوان المراد الاستعلام عن رصيده.
    """
    assert _owner != ZERO_ADDRESS
```

[يؤكد](https://vyper.readthedocs.io/en/latest/statements.html#assert) هذا السطر أن `_owner` ليس صفرًا. إذا كان الأمر كذلك، يحدث خطأ ويتم إرجاع العملية.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev ترجع عنوان مالك الرمز غير القابل للاستبدال (NFT).
         تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا.
    @param _tokenId المعرف لرمز NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا
    assert owner != ZERO_ADDRESS
    return owner
```

في آلة إيثريوم الافتراضية (EVM)، أي مساحة تخزين لا تحتوي على قيمة مخزنة فيها تكون صفرًا.
إذا لم يكن هناك رمز في `_tokenId`، فإن قيمة `self.idToOwner[_tokenId]` هي صفر. في هذه الحالة، ترجع الدالة.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev الحصول على العنوان المعتمد لرمز NFT واحد.
         تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا.
    @param _tokenId معرّف الرمز غير القابل للاستبدال (NFT) المراد الاستعلام عن موافقته.
    """
    # تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

لاحظ أن `getApproved` _يمكن_ أن ترجع صفرًا. إذا كان الرمز صالحًا، فإنه يرجع `self.idToApprovals[_tokenId]`.
إذا لم يكن هناك موافِق، فإن هذه القيمة تكون صفرًا.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev تتحقق مما إذا كان `_operator` مشغلًا معتمدًا لـ `_owner`.
    @param _owner العنوان الذي يمتلك رموز NFT.
    @param _operator العنوان الذي يعمل نيابة عن المالك.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

تتحقق هذه الدالة مما إذا كان مسموحًا لـ `_operator` بإدارة جميع رموز `_owner` في هذا العقد.
نظرًا لأنه يمكن أن يكون هناك العديد من المشغلين، فهذا HashMap من مستويين.

#### الدوال المساعدة للتحويل {#transfer-helpers}

تنفذ هذه الدوال العمليات التي هي جزء من تحويل أو إدارة الرموز.

```python

### الدوال المساعدة لدالة التحويل ###

@view
@internal
```

هذا الديكور، `@internal`، يعني أن الدالة يمكن الوصول إليها فقط من دوال أخرى داخل نفس العقد. حسب العرف، تبدأ أسماء هذه الدوال أيضًا بشرطة سفلية (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev ترجع ما إذا كان المُنفِق المحدد يمكنه تحويل معرّف رمز معين
    @param spender عنوان المُنفِق للاستعلام عنه
    @param tokenId معرّف الرمز uint256 المراد تحويله
    @return bool ما إذا كان msg.sender معتمدًا لمعرّف الرمز المحدد،
        أو كان مشغلًا للمالك، أو مالك الرمز
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

هناك ثلاث طرق يمكن من خلالها السماح لعنوان ما بتحويل رمز:

1. العنوان هو مالك الرمز
2. العنوان معتمد لإنفاق هذا الرمز
3. العنوان هو مشغل لمالك الرمز

يمكن أن تكون الدالة أعلاه دالة عرض لأنها لا تغير الحالة. لتقليل تكاليف التشغيل، أي دالة _يمكن_ أن تكون دالة عرض _يجب_ أن تكون دالة عرض.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev إضافة رمز NFT إلى عنوان معين
         تطلق خطأ إذا كان `_tokenId` مملوكًا لشخص ما.
    """
    # تطلق خطأ إذا كان `_tokenId` مملوكًا لشخص ما
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # تغيير المالك
    self.idToOwner[_tokenId] = _to
    # تغيير تتبع العدد
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev إزالة رمز NFT من عنوان معين
         تطلق خطأ إذا لم يكن `_from` هو المالك الحالي.
    """
    # تطلق خطأ إذا لم يكن `_from` هو المالك الحالي
    assert self.idToOwner[_tokenId] == _from
    # تغيير المالك
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # تغيير تتبع العدد
    self.ownerToNFTokenCount[_from] -= 1
```

عندما تكون هناك مشكلة في التحويل، نقوم بإرجاع الاستدعاء.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev مسح موافقة على عنوان معين
         تطلق خطأ إذا لم يكن `_owner` هو المالك الحالي.
    """
    # تطلق خطأ إذا لم يكن `_owner` هو المالك الحالي
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # إعادة تعيين الموافقات
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

غيّر القيمة فقط إذا لزم الأمر. متغيرات الحالة موجودة في التخزين. الكتابة إلى التخزين هي إحدى أغلى العمليات التي تقوم بها آلة إيثريوم الافتراضية (EVM) (من حيث [الغاز](/developers/docs/gas/)). لذلك، من الجيد تقليلها، حتى كتابة القيمة الحالية لها تكلفة عالية.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev تنفيذ تحويل رمز NFT.
         تطلق خطأ ما لم يكن `msg.sender` هو المالك الحالي، أو مشغلًا معتمدًا، أو العنوان المعتمد لهذا الرمز NFT. (ملاحظة: `msg.sender` غير مسموح به في الدالة الخاصة لذا مرر `_sender`.)
         تطلق خطأ إذا كان `_to` هو العنوان الصفري.
         تطلق خطأ إذا لم يكن `_from` هو المالك الحالي.
         تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا.
    """
```

لدينا هذه الدالة الداخلية لأن هناك طريقتين لتحويل الرموز (عادية وآمنة)، ولكننا نريد موقعًا واحدًا فقط في النص البرمجي حيث نقوم بذلك لتسهيل المراجعة.

```python
    # تحقق من المتطلبات
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # تطلق خطأ إذا كان `_to` هو العنوان الصفري
    assert _to != ZERO_ADDRESS
    # مسح الموافقة. تطلق خطأ إذا لم يكن `_from` هو المالك الحالي
    self._clearApproval(_from, _tokenId)
    # إزالة الرمز غير القابل للاستبدال (NFT). تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا
    self._removeTokenFrom(_from, _tokenId)
    # إضافة الرمز غير القابل للاستبدال (NFT)
    self._addTokenTo(_to, _tokenId)
    # تسجيل التحويل
    log Transfer(_from, _to, _tokenId)
```

لإصدار حدث في Vyper، استخدم عبارة `log` ([انظر هنا لمزيد من التفاصيل](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### دوال التحويل {#transfer-funs}

```python

### دوال التحويل ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev تطلق خطأ ما لم يكن `msg.sender` هو المالك الحالي، أو مشغلًا معتمدًا، أو العنوان المعتمد لهذا الرمز NFT.
         تطلق خطأ إذا لم يكن `_from` هو المالك الحالي.
         تطلق خطأ إذا كان `_to` هو العنوان الصفري.
         تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا.
    @notice المتصل هو المسؤول عن التأكد من أن `_to` قادر على استلام رموز NFT وإلا فقد تُفقد بشكل دائم.
    @param _from المالك الحالي لرمز NFT.
    @param _to المالك الجديد.
    @param _tokenId الرمز غير القابل للاستبدال (NFT) المراد تحويله.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

تتيح لك هذه الدالة التحويل إلى عنوان عشوائي. ما لم يكن العنوان مستخدمًا، أو عقدًا يعرف كيفية تحويل الرموز، فإن أي رمز تقوم بتحويله سيبقى عالقًا في ذلك العنوان وعديم الفائدة.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev تحويل ملكية رمز NFT من عنوان إلى آخر.
         تطلق خطأ ما لم يكن `msg.sender` هو المالك الحالي، أو مشغلًا معتمدًا، أو العنوان المعتمد لهذا الرمز NFT.
         تطلق خطأ إذا لم يكن `_from` هو المالك الحالي.
         تطلق خطأ إذا كان `_to` هو العنوان الصفري.
         تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا.
         إذا كان `_to` عقدًا ذكيًا، فإنه يستدعي `onERC721Received` على `_to` ويطلق خطأ إذا لم تكن القيمة المرجعة هي `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         ملاحظة: يتم تمثيل bytes4 بـ bytes32 مع حشو
    @param _from المالك الحالي لرمز NFT.
    @param _to المالك الجديد.
    @param _tokenId الرمز غير القابل للاستبدال (NFT) المراد تحويله.
    @param _data بيانات إضافية بدون تنسيق محدد، يتم إرسالها في استدعاء إلى `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

لا بأس من إجراء التحويل أولاً لأنه إذا كانت هناك مشكلة فسنقوم بإرجاع العملية على أي حال، لذلك سيتم إلغاء كل ما تم في الاستدعاء.

```python
    if _to.is_contract: # تحقق مما إذا كان `_to` عنوان عقد
```

تحقق أولاً لمعرفة ما إذا كان العنوان عقدًا (إذا كان لديه نص برمجي). إذا لم يكن كذلك، افترض أنه عنوان مستخدم وأن المستخدم سيكون قادرًا على استخدام الرمز أو تحويله. لكن لا تدع ذلك يخدعك ويوهمك بشعور زائف بالأمان. يمكنك أن تفقد الرموز، حتى مع `safeTransferFrom`، إذا قمت بتحويلها إلى عنوان لا يعرف أحد مفتاحه الخاص.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

استدعِ العقد المستهدف لمعرفة ما إذا كان يمكنه استلام رموز ERC-721.

```python
        # تطلق خطأ إذا كانت وجهة التحويل عقدًا لا ينفذ 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

إذا كانت الوجهة عقدًا، ولكنها لا تقبل رموز ERC-721 (أو قررت عدم قبول هذا التحويل بالذات)، فسيتم إرجاع العملية.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev تعيين أو إعادة تأكيد العنوان المعتمد لرمز NFT. يشير العنوان الصفري إلى عدم وجود عنوان معتمد.
         تطلق خطأ ما لم يكن `msg.sender` هو مالك الرمز NFT الحالي، أو مشغلًا معتمدًا للمالك الحالي.
         تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا. (ملاحظة: هذا ليس مكتوبًا في EIP)
         تطلق خطأ إذا كان `_approved` هو المالك الحالي. (ملاحظة: هذا ليس مكتوبًا في EIP)
    @param _approved العنوان المراد اعتماده لمعرّف الرمز NFT المحدد.
    @param _tokenId معرّف الرمز المراد اعتماده.
    """
    owner: address = self.idToOwner[_tokenId]
    # تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا
    assert owner != ZERO_ADDRESS
    # تطلق خطأ إذا كان `_approved` هو المالك الحالي
    assert _approved != owner
```

حسب العرف، إذا كنت لا تريد أن يكون لديك موافِق، فأنت تعين العنوان الصفري، وليس نفسك.

```python
    # تحقق من المتطلبات
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

لتعيين موافقة، يمكنك إما أن تكون المالك، أو مشغلًا معتمدًا من قبل المالك.

```python
    # تعيين الموافقة
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev تمكين أو تعطيل الموافقة لطرف ثالث ("مشغل") لإدارة جميع أصول `msg.sender`.
         كما أنه يصدر حدث ApprovalForAll.
         يطلق خطأ إذا كان `_operator` هو `msg.sender`. (ملاحظة: هذا ليس مكتوبًا في EIP)
    @notice يعمل هذا حتى لو لم يكن المرسل يمتلك أي رموز في ذلك الوقت.
    @param _operator العنوان المراد إضافته إلى مجموعة المشغلين المعتمدين.
    @param _approved True إذا تمت الموافقة على المشغلين، وfalse لإلغاء الموافقة.
    """
    # يطلق خطأ إذا كان `_operator` هو `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### سك الرموز الجديدة وتدمير الرموز الحالية {#mint-burn}

الحساب الذي أنشأ العقد هو `minter`، المستخدم الخارق المعتمد لسك رموز NFT جديدة. ومع ذلك، حتى هو غير مسموح له بحرق الرموز الحالية. فقط المالك، أو كيان معتمد من المالك، يمكنه القيام بذلك.

```python
### دوال السك والحرق ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

ترجع هذه الدالة دائمًا `True`، لأنه إذا فشلت العملية فسيتم إرجاعها.

```python
    """
    @dev دالة لسك الرموز
         تطلق خطأ إذا لم يكن `msg.sender` هو الساك.
         تطلق خطأ إذا كان `_to` هو العنوان الصفري.
         تطلق خطأ إذا كان `_tokenId` مملوكًا لشخص ما.
    @param _to العنوان الذي سيستقبل الرموز المسكوكة.
    @param _tokenId معرّف الرمز المراد سكه.
    @return قيمة منطقية تشير إلى ما إذا كانت العملية ناجحة.
    """
    # تطلق خطأ إذا لم يكن `msg.sender` هو الساك
    assert msg.sender == self.minter
```

فقط الساك (الحساب الذي أنشأ عقد ERC-721) يمكنه سك رموز جديدة. قد تكون هذه مشكلة في المستقبل إذا أردنا تغيير هوية الساك. في عقد الإنتاج، قد ترغب على الأرجح في وجود دالة تسمح للساك بنقل امتيازات السك إلى شخص آخر.

```python
    # تطلق خطأ إذا كان `_to` هو العنوان الصفري
    assert _to != ZERO_ADDRESS
    # إضافة الرمز غير القابل للاستبدال (NFT). تطلق خطأ إذا كان `_tokenId` مملوكًا لشخص ما
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

حسب العرف، يعتبر سك الرموز الجديدة بمثابة تحويل من العنوان الصفري.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev يحرق رمز ERC721 محدد.
         تطلق خطأ ما لم يكن `msg.sender` هو المالك الحالي، أو مشغلًا معتمدًا، أو العنوان المعتمد لهذا الرمز NFT.
         تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا.
    @param _tokenId معرّف uint256 لرمز ERC721 المراد حرقه.
    """
    # تحقق من المتطلبات
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # تطلق خطأ إذا لم يكن `_tokenId` رمز NFT صالحًا
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

أي شخص مسموح له بتحويل رمز مسموح له بحرقه. في حين يبدو الحرق مكافئًا للتحويل إلى العنوان الصفري، إلا أن العنوان الصفري لا يتلقى الرمز فعليًا. هذا يسمح لنا بتحرير كل مساحة التخزين التي تم استخدامها للرمز، مما يمكن أن يقلل من تكلفة الغاز للمعاملة.

## استخدام هذا العقد {#using-contract}

على عكس Solidity، لا تملك Vyper ميزة الوراثة. هذا خيار تصميم متعمد لجعل النص البرمجي أوضح وبالتالي أسهل في التأمين. لذلك لإنشاء عقد Vyper ERC-721 خاص بك، خذ [هذا العقد](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) وقم بتعديله لتنفيذ منطق الأعمال الذي تريده.

## الخلاصة {#conclusion}

للمراجعة، إليك بعض أهم الأفكار في هذا العقد:

- لاستلام رموز ERC-721 مع تحويل آمن، يجب على العقود تنفيذ واجهة `ERC721Receiver`.
- حتى إذا كنت تستخدم التحويل الآمن، فلا يزال من الممكن أن تعلق الرموز إذا أرسلتها إلى عنوان لا يُعرف مفتاحه الخاص.
- عندما تكون هناك مشكلة في عملية ما، فمن الجيد `إرجاع` الاستدعاء، بدلاً من مجرد إرجاع قيمة فشل.
- توجد رموز ERC-721 عندما يكون لها مالك.
- هناك ثلاث طرق لتكون معتمدًا لتحويل رمز NFT. يمكنك أن تكون المالك، أو معتمدًا لرمز معين، أو أن تكون مشغلًا لجميع رموز المالك.
- الأحداث الماضية مرئية فقط خارج البلوكتشين. لا يمكن للنص البرمجي الذي يعمل داخل البلوكتشين عرضها.

اذهب الآن ونفذ عقود Vyper آمنة.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).

