---
title: "جولة إرشادية في عقد ⁦ERC-721⁩ بلغة ⁦Vyper⁩"
description: "عقد ⁦ERC-721⁩ الخاص بـ ⁦Ryuya Nakamura⁩ وكيفية عمله"
author: "أوري بوميرانتس"
lang: ar
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "⁦Vyper ERC-721⁩"
published: 2021-04-01
---

## مقدمة {#introduction}

يُستخدم معيار [<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/) للاحتفاظ بملكية الرموز غير القابلة للاستبدال (NFT).
تتصرف الرموز المميزة [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) كسلعة، لأنه لا يوجد فرق بين الرموز المميزة الفردية.
على النقيض من ذلك، تم تصميم الرموز المميزة <span dir="ltr">ERC-721</span> للأصول المتشابهة ولكن غير المتطابقة، مثل [الرسوم المتحركة المختلفة للقطط](https://www.cryptokitties.co/)
أو سندات الملكية لقطع عقارية مختلفة.

في هذه المقالة سنقوم بتحليل [عقد <span dir="ltr">ERC-721</span> الخاص بـ Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
هذا العقد مكتوب بلغة [Vyper](https://vyper.readthedocs.io/en/latest/index.html)، وهي لغة عقود تشبه لغة Python مصممة لجعل
كتابة التعليمات البرمجية غير الآمنة أكثر صعوبة مما هي عليه في لغة Solidity.

## العقد {#contract}

```python
#pragma version >0.3.10
```

يخبر السطر `#pragma version` المترجم بإصدارات Vyper التي كُتب العقد من أجلها. يقبل `>0.3.10` أي
إصدار أحدث من <span dir="ltr">0.3.10</span>، ولكن هذا العقد يحتاج في الواقع إلى إصدار Vyper <span dir="ltr">0.4.1</span> أو أحدث: فهو يسجل الأحداث باستخدام وسيطات الكلمات الرئيسية
(على سبيل المثال `log IERC721.Transfer(...)`)، وهي ميزة تمت إضافتها في إصدار Vyper <span dir="ltr">0.4.1</span>، لذلك لا يتم تجميعه على الإصدار <span dir="ltr">0.4.0</span>.

```python
# @dev تنفيذ معيار رمز غير قابل للاستبدال (NFT) ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# مُعدل من: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

تبدأ التعليقات في لغة Vyper، كما هو الحال في لغة Python، بعلامة التجزئة (`#`) وتستمر حتى نهاية السطر. التعليقات التي تتضمن
`@<keyword>` تُستخدم بواسطة [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) لإنتاج وثائق قابلة للقراءة من قبل البشر.

```python
from ethereum.ercs import IERC165
from ethereum.ercs import IERC721

implements: IERC721
implements: IERC165
```

تأتي واجهات <span dir="ltr">ERC-165</span> و <span dir="ltr">ERC-721</span> مع مترجم Vyper، لذلك نقوم باستيرادها من `ethereum.ercs` بدلاً من
كتابتها بأنفسنا. [يمكنك رؤية تعريف واجهة <span dir="ltr">ERC-721</span> هنا](https://github.com/vyperlang/vyper/blob/master/vyper/builtins/interfaces/IERC721.vyi).
تعلن أسطر `implements:` أن هذا العقد يوفر كلتا الواجهتين، ويتحقق المترجم من أن كل دالة
تتطلبها محددة أدناه.

### واجهة ERC721Receiver {#receiver-interface}

```python
# واجهة العقد الذي يتم استدعاؤه بواسطة safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

يدعم <span dir="ltr">ERC-721</span> نوعين من التحويل:

- `transferFrom`، والذي يتيح للمرسل تحديد أي عنوان وجهة ويضع مسؤولية
  التحويل على المرسل. هذا يعني أنه يمكنك التحويل إلى عنوان غير صالح، وفي هذه الحالة
  يُفقد الرمز غير القابل للاستبدال (NFT) إلى الأبد.
- `safeTransferFrom`، والذي يتحقق مما إذا كان عنوان الوجهة عبارة عن عقد. إذا كان الأمر كذلك، يسأل عقد <span dir="ltr">ERC-721</span>
  العقد المتلقي عما إذا كان يريد استلام الرمز غير القابل للاستبدال (NFT).

للرد على طلبات `safeTransferFrom`، يجب أن ينفذ العقد المتلقي `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

العنوان `_from` هو المالك الحالي للرمز المميز. العنوان `_operator` هو العنوان الذي
طلب التحويل (قد لا يكون هذان العنوانان متطابقين، بسبب السماحيات). حسب العرف، تبدأ معظم معلمات
الدوال في هذا العقد بشرطة سفلية (`_`).

```python
            _tokenId: uint256,
```

معرفات الرموز المميزة <span dir="ltr">ERC-721</span> هي <span dir="ltr">256 bits</span>. عادةً ما يتم إنشاؤها عن طريق إجراء عملية التجزئة لوصف ما
يمثله الرمز المميز.

```python
            _data: Bytes[1024]
```

يمكن أن يحتوي الطلب على ما يصل إلى <span dir="ltr">1024 bytes</span> من بيانات المستخدم.

```python
        ) -> bytes4: nonpayable
```

لمنع الحالات التي يقبل فيها العقد تحويلاً عن طريق الخطأ، فإن القيمة المرجعة ليست قيمة منطقية (boolean)،
بل قيمة محددة مكونة من أربعة بايتات، وهي محدد الدالة لـ `onERC721Received`. الدالة هي `nonpayable` لأن
العقد المتلقي قد يغير حالته الخاصة عندما يقبل رمزًا مميزًا.

### الأحداث {#events}

يتم إصدار [الأحداث](/developers/docs/smart-contracts/anatomy/#events-and-logs)
لإعلام المستخدمين والخوادم خارج سلسلة الكتل بالأحداث. لاحظ أن محتوى الأحداث
غير متاح للعقود الموجودة على سلسلة الكتل. يتم تعريف أحداث <span dir="ltr">ERC-721</span> الثلاثة بواسطة واجهة `IERC721` التي
قمنا باستيرادها، لذلك لا يعلن هذا العقد عنها بنفسه؛ بل يصدرها باستخدام `log IERC721.<Event>(...)`، كما سنرى
في دوال التحويل أدناه.

يُبلغ `Transfer` (`sender`، `receiver`، `token_id`) عن تغيير في ملكية الرمز غير القابل للاستبدال (NFT). هذا مشابه لحدث
التحويل في <span dir="ltr">ERC-20</span>، باستثناء أننا نبلغ عن `token_id` بدلاً من المبلغ. لا أحد يمتلك العنوان الصفري، لذلك حسب
العرف نستخدمه للإبلاغ عن إنشاء وتدمير الرموز المميزة. الاستثناء الوحيد هو إنشاء العقد، والذي
يمكن خلاله إنشاء وتعيين أي عدد من الرموز غير القابلة للاستبدال (NFTs) دون إصدار `Transfer`.

تشبه الموافقة في <span dir="ltr">ERC-721</span> السماحية في <span dir="ltr">ERC-20</span>: يُسمح لعنوان محدد بتحويل رمز مميز محدد،
ويتم إصدار `Approval` (`owner`، `approved`، `token_id`) كلما تم تعيين هذا العنوان المعتمد أو إعادة تأكيده.
يوفر هذا آلية للعقود للاستجابة عندما تقبل رمزًا مميزًا. لا يمكن للعقود الاستماع إلى الأحداث، لذلك إذا
قمت بتحويل الرمز المميز إليها فقط، فلن "تعرف" بذلك. بهذه الطريقة، يقدم المالك أولاً موافقة
ثم يرسل طلبًا إلى العقد: "لقد وافقت لك على تحويل الرمز المميز X، يرجى القيام بـ ...". هذا خيار تصميمي
لجعل معيار <span dir="ltr">ERC-721</span> مشابهًا لمعيار <span dir="ltr">ERC-20</span>. نظرًا لأن الرموز المميزة <span dir="ltr">ERC-721</span> غير قابلة للاستبدال، يمكن
للعقد أيضًا تحديد أنه حصل على رمز مميز محدد من خلال النظر إلى ملكية الرمز المميز.

أخيرًا، يتم إصدار `ApprovalForAll` (`owner`، `operator`، `approved`) عند تمكين أو تعطيل _مشغل_
لمالك. من المفيد أحيانًا أن يكون لديك مشغل يمكنه إدارة جميع الرموز المميزة لحساب من نوع معين
(تلك التي يديرها عقد محدد)، على غرار التوكيل الرسمي. على سبيل المثال، قد أرغب في منح
مثل هذه الصلاحية لعقد يتحقق مما إذا كنت لم أتصل به لمدة ستة أشهر، وإذا كان الأمر كذلك، يوزع أصولي على
ورثتي (إذا طلب أحدهم ذلك، لا يمكن للعقود أن تفعل أي شيء دون أن يتم استدعاؤها بواسطة معاملة). في <span dir="ltr">ERC-20</span>
يمكننا فقط إعطاء سماحية عالية لعقد الميراث، ولكن هذا لا ينجح مع <span dir="ltr">ERC-721</span> لأن الرموز المميزة
غير قابلة للاستبدال. هذا هو المعادل لذلك. تخبرنا القيمة `approved` ما إذا كان الحدث مخصصًا لموافقة، أو
لسحب موافقة.

### متغيرات الحالة {#state-vars}

تحتوي هذه المتغيرات على الحالة الحالية للرموز المميزة: أي منها متاح ومن يمتلكها. معظم هذه
الكائنات هي كائنات `HashMap`، وهي [تعيينات أحادية الاتجاه موجودة بين نوعين](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev تعيين من معرف رمز غير قابل للاستبدال (NFT) إلى العنوان الذي يملكه.
idToOwner: HashMap[uint256, address]

# @dev تعيين من معرف رمز غير قابل للاستبدال (NFT) إلى العنوان المعتمد.
idToApprovals: HashMap[uint256, address]
```

يتم تمثيل هويات المستخدمين والعقود في إيثيريوم بواسطة عناوين بحجم <span dir="ltr">160-bit</span>. يقوم هذان المتغيران بالتعيين
من معرفات الرموز المميزة إلى مالكيها وأولئك المعتمدين لتحويلها (بحد أقصى واحد لكل منهما). في إيثيريوم،
تكون البيانات غير المهيأة دائمًا صفرًا، لذلك إذا لم يكن هناك مالك أو محول معتمد، فإن القيمة لذلك الرمز المميز
هي صفر.

```python
# @dev تعيين من عنوان المالك إلى عدد رموزه المميزة.
ownerToNFTokenCount: HashMap[address, uint256]
```

يحتفظ هذا المتغير بعدد الرموز المميزة لكل مالك. لا يوجد تعيين من المالكين إلى الرموز المميزة، لذا
فإن الطريقة الوحيدة لتحديد الرموز المميزة التي يمتلكها مالك معين هي الرجوع إلى سجل أحداث سلسلة الكتل
ورؤية أحداث `Transfer` المناسبة. يمكننا استخدام هذا المتغير لمعرفة متى يكون لدينا جميع الرموز غير القابلة للاستبدال (NFTs) ولا
نحتاج إلى البحث أكثر في الماضي.

لاحظ أن هذه الخوارزمية تعمل فقط مع واجهات المستخدم والخوادم الخارجية. لا يمكن للتعليمات البرمجية التي تعمل على سلسلة الكتل
نفسها قراءة الأحداث الماضية.

```python
# @dev تعيين من عنوان المالك إلى تعيين عناوين المشغلين.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

قد يكون للحساب أكثر من مشغل واحد. لا يكفي `HashMap` بسيط
لتتبعهم، لأن كل مفتاح يؤدي إلى قيمة واحدة. بدلاً من ذلك، يمكنك استخدام
`HashMap[address, bool]` كقيمة. افتراضيًا، تكون القيمة لكل عنوان هي `False`، مما يعني أنه
ليس مشغلاً. يمكنك تعيين القيم إلى `True` حسب الحاجة.

```python
# @dev عنوان الساك، الذي يمكنه سك رمز مميز
minter: address
```

يجب إنشاء رموز مميزة جديدة بطريقة ما. في هذا العقد، هناك كيان واحد فقط يُسمح له بالقيام بذلك، وهو
`minter`. من المحتمل أن يكون هذا كافيًا للعبة، على سبيل المثال. لأغراض أخرى، قد يكون من الضروري
إنشاء منطق أعمال أكثر تعقيدًا.

```python
# @dev قائمة ثابتة بمعرفات واجهة ERC-165 المدعومة
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # معرف واجهة ERC-165 لـ ERC-165
    0x01ffc9a7,
    # معرف واجهة ERC-165 لـ ERC-721
    0x80ac58cd,
]
```

يحدد [<span dir="ltr">ERC-165</span>](https://eips.ethereum.org/EIPS/eip-165) آلية للعقد للكشف عن كيفية تواصل التطبيقات
معه، وإلى أي معايير ERC يتوافق. `SUPPORTED_INTERFACES` هي قائمة ثابتة لمعرفي الواجهة
المكونين من أربعة بايتات واللذين يتوافق معهما هذا العقد: <span dir="ltr">ERC-165</span> نفسه و <span dir="ltr">ERC-721</span>.

### الدوال {#functions}

هذه هي الدوال التي تنفذ فعليًا <span dir="ltr">ERC-721</span>.

#### المُنشئ {#constructor}

```python
@deploy
def __init__():
```

في لغة Vyper، كما هو الحال في لغة Python، تُسمى دالة المُنشئ `__init__`. يتم تمييزها بالزخرفة `@deploy`،
مما يعني أنها تعمل مرة واحدة، عند نشر العقد.

```python
    """
    @dev مُنشئ العقد.
    """
```

في لغة Python، وفي لغة Vyper، يمكنك أيضًا إنشاء تعليق عن طريق تحديد سلسلة متعددة الأسطر (والتي تبدأ وتنتهي
بـ `"""`)، وعدم استخدامها بأي شكل من الأشكال. يمكن أن تتضمن هذه التعليقات أيضًا
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.minter = msg.sender
```

للوصول إلى متغيرات الحالة، تستخدم `self.<variable name>` (مرة أخرى، كما هو الحال في لغة Python). يسجل المُنشئ
الحساب الذي قام بنشر العقد كـ `minter`.

#### دوال العرض (View Functions) {#views}

هذه هي الدوال التي لا تعدل حالة سلسلة الكتل، وبالتالي يمكن تنفيذها
مجانًا إذا تم استدعاؤها خارجيًا. إذا تم استدعاء دوال العرض بواسطة عقد، فلا يزال يتعين تنفيذها على
كل عقدة وبالتالي تكلف غاز.

```python
@view
@external
```

تُسمى هذه الكلمات الرئيسية التي تسبق تعريف الدالة والتي تبدأ بعلامة @ (`@`) _الزخارف_ (decorations).
وهي تحدد الظروف التي يمكن فيها استدعاء الدالة.

- يحدد `@view` أن هذه الدالة هي دالة عرض (view).
- يحدد `@external` أنه يمكن استدعاء هذه الدالة المعينة بواسطة المعاملات وبواسطة العقود الأخرى.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

على النقيض من لغة Python، فإن لغة Vyper هي [لغة ذات كتابة ثابتة (static typed language)](https://wikipedia.org/wiki/Type_system#Static_type_checking).
لا يمكنك الإعلان عن متغير، أو معلمة دالة، دون تحديد [نوع البيانات](https://vyper.readthedocs.io/en/latest/types.html). في هذه الحالة، معلمة الإدخال هي `bytes4`، وهي قيمة مكونة من أربعة بايتات، والمخرجات هي قيمة منطقية (boolean).

```python
    """
    @dev تم تحديد تعريف الواجهة في ERC-165.
    @param interface_id معرف الواجهة
    """
    return interface_id in SUPPORTED_INTERFACES
```

إرجاع `True` إذا كان `interface_id` هو أحد معرفات الواجهة في قائمة `SUPPORTED_INTERFACES`.

```python
### دوال العرض ###
```

هذه هي دوال العرض التي تجعل المعلومات حول الرموز المميزة متاحة للمستخدمين والعقود الأخرى.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev يُرجع عدد الرموز غير القابلة للاستبدال (NFT) المملوكة لـ `_owner`.
         يطرح خطأ إذا كان `_owner` هو العنوان الصفري. تعتبر الرموز غير القابلة للاستبدال (NFT) المخصصة للعنوان الصفري غير صالحة.
    @param _owner العنوان المراد الاستعلام عن رصيده.
    """
    assert _owner != empty(address)
```

[يؤكد](https://vyper.readthedocs.io/en/latest/statements.html#assert) هذا السطر أن `_owner` ليس
العنوان الصفري، المكتوب كـ `empty(address)`. إذا كان كذلك، فهناك خطأ ويتم التراجع عن العملية.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev يُرجع عنوان مالك رمز غير قابل للاستبدال (NFT).
         يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح.
    @param _tokenId معرف رمز غير قابل للاستبدال (NFT).
    """
    owner: address = self.idToOwner[_tokenId]
    # يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح
    assert owner != empty(address)
    return owner
```

في آلة إيثريوم الافتراضية (EVM)، أي مساحة تخزين لا تحتوي على قيمة مخزنة فيها تكون صفرًا.
إذا لم يكن هناك رمز مميز في `_tokenId` فإن قيمة `self.idToOwner[_tokenId]` هي صفر. في هذه
الحالة تتراجع الدالة.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev الحصول على العنوان المعتمد لرمز غير قابل للاستبدال (NFT) واحد.
         يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح.
    @param _tokenId معرف رمز غير قابل للاستبدال (NFT) المراد الاستعلام عن اعتماده.
    """
    # يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

لاحظ أن `getApproved` _يمكن_ أن ترجع صفرًا. إذا كان الرمز المميز صالحًا، فإنها ترجع `self.idToApprovals[_tokenId]`.
إذا لم يكن هناك معتمد، فإن هذه القيمة تكون صفرًا.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev يتحقق مما إذا كان `_operator` مشغلاً معتمداً لـ `_owner`.
    @param _owner العنوان الذي يملك الرموز غير القابلة للاستبدال (NFT).
    @param _operator العنوان الذي يتصرف نيابة عن المالك.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

تتحقق هذه الدالة مما إذا كان يُسمح لـ `_operator` بإدارة جميع الرموز المميزة الخاصة بـ `_owner` في هذا العقد.
نظرًا لأنه يمكن أن يكون هناك عدة مشغلين، فهذه خريطة تجزئة (HashMap) ذات مستويين.

#### دوال المساعدة في التحويل {#transfer-helpers}

تنفذ هذه الدوال العمليات التي تعد جزءًا من تحويل أو إدارة الرموز المميزة.

```python

### مساعدات دوال التحويل ###

@view
@internal
```

تعني هذه الزخرفة، `@internal`، أنه لا يمكن الوصول إلى الدالة إلا من دوال أخرى داخل
نفس العقد. حسب العرف، تبدأ أسماء هذه الدوال أيضًا بشرطة سفلية (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev يُرجع ما إذا كان المنفق المحدد يمكنه تحويل معرف رمز مميز محدد
    @param spender عنوان المنفق المراد الاستعلام عنه
    @param tokenId uint256 معرف الرمز المميز المراد تحويله
    @return bool ما إذا كان msg.sender معتمداً لمعرف الرمز المميز المحدد،
        أو مشغلاً للمالك، أو مالك الرمز المميز
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

هناك ثلاث طرق يمكن من خلالها السماح لعنوان بتحويل رمز مميز:

1. العنوان هو مالك الرمز المميز
2. العنوان معتمد لإنفاق ذلك الرمز المميز
3. العنوان هو مشغل لمالك الرمز المميز

يمكن أن تكون الدالة أعلاه دالة عرض (view) لأنها لا تغير الحالة. لتقليل تكاليف التشغيل، أي
دالة _يمكن_ أن تكون دالة عرض _يجب_ أن تكون دالة عرض.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev إضافة رمز غير قابل للاستبدال (NFT) إلى عنوان محدد
         يطرح خطأ إذا كان `_tokenId` مملوكاً لشخص ما.
    """
    # يطرح خطأ إذا كان `_tokenId` مملوكاً لشخص ما
    assert self.idToOwner[_tokenId] == empty(address)
    # تغيير المالك
    self.idToOwner[_tokenId] = _to
    # تغيير تتبع العدد
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev إزالة رمز غير قابل للاستبدال (NFT) من عنوان محدد
         يطرح خطأ إذا لم يكن `_from` هو المالك الحالي.
    """
    # يطرح خطأ إذا لم يكن `_from` هو المالك الحالي
    assert self.idToOwner[_tokenId] == _from
    # تغيير المالك
    self.idToOwner[_tokenId] = empty(address)
    # تغيير تتبع العدد
    self.ownerToNFTokenCount[_from] -= 1
```

عندما تكون هناك مشكلة في التحويل، فإننا نتراجع عن الاستدعاء.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev مسح اعتماد عنوان محدد
         يطرح خطأ إذا لم يكن `_owner` هو المالك الحالي.
    """
    # يطرح خطأ إذا لم يكن `_owner` هو المالك الحالي
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # إعادة تعيين الاعتمادات
        self.idToApprovals[_tokenId] = empty(address)
```

قم بتغيير القيمة فقط إذا لزم الأمر. تعيش متغيرات الحالة في التخزين. الكتابة في التخزين هي
واحدة من أكثر العمليات تكلفة التي تقوم بها آلة إيثريوم الافتراضية (EVM) (من حيث
[الغاز](/developers/docs/gas/)). لذلك، من الجيد تقليلها إلى الحد الأدنى، فحتى كتابة
القيمة الحالية لها تكلفة عالية.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev تنفيذ تحويل رمز غير قابل للاستبدال (NFT).
         يطرح خطأ ما لم يكن `msg.sender` هو المالك الحالي، أو مشغلاً مصرحاً له، أو العنوان
         المعتمد لهذا الرمز غير القابل للاستبدال (NFT). (ملاحظة: `msg.sender` غير مسموح به في دالة خاصة لذا قم بتمرير `_sender`.)
         يطرح خطأ إذا كان `_to` هو العنوان الصفري.
         يطرح خطأ إذا لم يكن `_from` هو المالك الحالي.
         يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح.
    """
```

لدينا هذه الدالة الداخلية لأن هناك طريقتين لتحويل الرموز المميزة (عادية وآمنة)، لكننا
نريد موقعًا واحدًا فقط في التعليمات البرمجية حيث نقوم بذلك لجعل التدقيق أسهل.

```python
    # التحقق من المتطلبات
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # يطرح خطأ إذا كان `_to` هو العنوان الصفري
    assert _to != empty(address)
    # مسح الاعتماد. يطرح خطأ إذا لم يكن `_from` هو المالك الحالي
    self._clearApproval(_from, _tokenId)
    # إزالة رمز غير قابل للاستبدال (NFT). يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح
    self._removeTokenFrom(_from, _tokenId)
    # إضافة رمز غير قابل للاستبدال (NFT)
    self._addTokenTo(_to, _tokenId)
    # تسجيل التحويل
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

لإصدار حدث في لغة Vyper، تستخدم عبارة `log` ([انظر هنا لمزيد من التفاصيل](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).
نظرًا لأن الأحداث تنتمي إلى الواجهة المستوردة، فإننا نشير إليها كـ `IERC721.Transfer` ونمرر حقولها بواسطة
الكلمة الرئيسية.

#### دوال التحويل {#transfer-funs}

```python

### دوال التحويل ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev يطرح خطأ ما لم يكن `msg.sender` هو المالك الحالي، أو مشغلاً مصرحاً له، أو العنوان
         المعتمد لهذا الرمز غير القابل للاستبدال (NFT).
         يطرح خطأ إذا لم يكن `_from` هو المالك الحالي.
         يطرح خطأ إذا كان `_to` هو العنوان الصفري.
         يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح.
    @notice المتصل مسؤول عن تأكيد أن `_to` قادر على استقبال الرموز غير القابلة للاستبدال (NFT) وإلا
            فقد تُفقد بشكل دائم.
    @param _from المالك الحالي لرمز غير قابل للاستبدال (NFT).
    @param _to المالك الجديد.
    @param _tokenId رمز غير قابل للاستبدال (NFT) المراد تحويله.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

تتيح لك هذه الدالة التحويل إلى عنوان عشوائي. ما لم يكن العنوان مستخدمًا، أو عقدًا
يعرف كيفية تحويل الرموز المميزة، فإن أي رمز مميز تقوم بتحويله سيعلق في ذلك العنوان ويصبح عديم الفائدة.

الزخرفة `@payable` موجودة هنا لأن واجهة `IERC721` تعلن أن `transferFrom` و `safeTransferFrom` و
`approve` قابلة للدفع (payable)، لذلك يجب أن يتطابق العقد الذي ينفذ الواجهة مع تلك التوقيعات.

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev يحول ملكية رمز غير قابل للاستبدال (NFT) من عنوان إلى عنوان آخر.
         يطرح خطأ ما لم يكن `msg.sender` هو المالك الحالي، أو مشغلاً مصرحاً له، أو
         العنوان المعتمد لهذا الرمز غير القابل للاستبدال (NFT).
         يطرح خطأ إذا لم يكن `_from` هو المالك الحالي.
         يطرح خطأ إذا كان `_to` هو العنوان الصفري.
         يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح.
         إذا كان `_to` عقد ذكي، فإنه يستدعي `onERC721Received` على `_to` ويطرح خطأ إذا
         لم تكن القيمة المرجعة هي `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    @param _from المالك الحالي لرمز غير قابل للاستبدال (NFT).
    @param _to المالك الجديد.
    @param _tokenId رمز غير قابل للاستبدال (NFT) المراد تحويله.
    @param _data بيانات إضافية بدون تنسيق محدد، يتم إرسالها في الاستدعاء إلى `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

لا بأس من إجراء التحويل أولاً لأنه إذا كانت هناك مشكلة فسوف نتراجع على أي حال،
لذلك سيتم إلغاء كل ما تم القيام به في الاستدعاء.

```python
    if _to.is_contract: # التحقق مما إذا كان `_to` عنوان عقد
```

تحقق أولاً لمعرفة ما إذا كان العنوان عبارة عن عقد (إذا كان يحتوي على تعليمات برمجية). إذا لم يكن كذلك، فافترض أنه عنوان مستخدم
وسيكون المستخدم قادرًا على استخدام الرمز المميز أو تحويله. لكن لا تدع ذلك يخدعك
بشعور زائف بالأمان. يمكنك فقدان الرموز المميزة، حتى مع `safeTransferFrom`، إذا قمت بتحويلها
إلى عنوان لا يعرف أحد مفتاحه الخاص.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

استدعِ العقد المستهدف لمعرفة ما إذا كان يمكنه استقبال الرموز المميزة <span dir="ltr">ERC-721</span>. يتطلب إصدار Vyper <span dir="ltr">0.4</span> تمييز الاستدعاءات للعقود الأخرى،
لذلك يتم إضافة بادئة `extcall` للاستدعاء.

```python
        # يطرح خطأ إذا كانت وجهة التحويل عقد لا ينفذ 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

إذا كانت الوجهة عبارة عن عقد، ولكنه لا يقبل الرموز المميزة <span dir="ltr">ERC-721</span> (أو قرر عدم قبول هذا
التحويل المعين)، فتراجع.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev تعيين أو إعادة تأكيد العنوان المعتمد لرمز غير قابل للاستبدال (NFT). يشير العنوان الصفري إلى عدم وجود عنوان معتمد.
         يطرح خطأ ما لم يكن `msg.sender` هو المالك الحالي لرمز غير قابل للاستبدال (NFT)، أو مشغلاً مصرحاً له للمالك الحالي.
         يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح. (ملاحظة: هذا غير مكتوب في EIP)
         يطرح خطأ إذا كان `_approved` هو المالك الحالي. (ملاحظة: هذا غير مكتوب في EIP)
    @param _approved العنوان المراد اعتماده لمعرف رمز غير قابل للاستبدال (NFT) المحدد.
    @param _tokenId معرف الرمز المميز المراد اعتماده.
    """
    owner: address = self.idToOwner[_tokenId]
    # يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح
    assert owner != empty(address)
    # يطرح خطأ إذا كان `_approved` هو المالك الحالي
    assert _approved != owner
```

حسب العرف، إذا كنت لا ترغب في وجود معتمد، فإنك تعين العنوان الصفري، وليس نفسك.

```python
    # التحقق من المتطلبات
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

لتعيين موافقة، يمكنك إما أن تكون المالك، أو مشغلاً مفوضًا من قبل المالك.

```python
    # تعيين الاعتماد
    self.idToApprovals[_tokenId] = _approved
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev تمكين أو تعطيل الاعتماد لطرف ثالث ("المشغل") لإدارة جميع
         أصول `msg.sender`. كما أنه يصدر حدث ApprovalForAll.
         يطرح خطأ إذا كان `_operator` هو `msg.sender`. (ملاحظة: هذا غير مكتوب في EIP)
    @notice يعمل هذا حتى إذا لم يكن المرسل يملك أي رموز مميزة في ذلك الوقت.
    @param _operator العنوان المراد إضافته إلى مجموعة المشغلين المصرح لهم.
    @param _approved صحيح إذا كان المشغلون معتمدين، خطأ لإلغاء الاعتماد.
    """
    # يطرح خطأ إذا كان `_operator` هو `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```

#### سك رموز مميزة جديدة وتدمير الرموز الحالية {#mint-burn}

الحساب الذي أنشأ العقد هو `minter`، وهو المستخدم المتميز المخول لسك
رموز غير قابلة للاستبدال (NFTs) جديدة. ومع ذلك، حتى هو غير مسموح له بحرق الرموز المميزة الحالية. فقط المالك، أو كيان
مفوض من قبل المالك، يمكنه القيام بذلك.

```python
### دوال السك والحرق ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

تُرجع هذه الدالة دائمًا `True`، لأنه إذا فشلت العملية يتم التراجع عنها.

```python
    """
    @dev دالة لسك الرموز المميزة
         يطرح خطأ إذا لم يكن `msg.sender` هو الساك.
         يطرح خطأ إذا كان `_to` هو العنوان الصفري.
         يطرح خطأ إذا كان `_tokenId` مملوكاً لشخص ما.
    @param _to العنوان الذي سيتلقى الرموز المميزة المسكوكة.
    @param _tokenId معرف الرمز المميز المراد سكه.
    @return قيمة منطقية تشير إلى ما إذا كانت العملية ناجحة.
    """
    # يطرح خطأ إذا لم يكن `msg.sender` هو الساك
    assert msg.sender == self.minter
```

فقط الساك (الحساب الذي أنشأ عقد <span dir="ltr">ERC-721</span>) يمكنه سك رموز مميزة جديدة. قد يمثل هذا
مشكلة في المستقبل إذا أردنا تغيير هوية الساك. في
عقد الإنتاج، ربما ترغب في وجود دالة تسمح للساك بنقل
امتيازات السك إلى شخص آخر.

```python
    # يطرح خطأ إذا كان `_to` هو العنوان الصفري
    assert _to != empty(address)
    # إضافة رمز غير قابل للاستبدال (NFT). يطرح خطأ إذا كان `_tokenId` مملوكاً لشخص ما
    self._addTokenTo(_to, _tokenId)
    log IERC721.Transfer(sender=empty(address), receiver=_to, token_id=_tokenId)
    return True
```

حسب العرف، يُعد سك الرموز المميزة الجديدة بمثابة تحويل من العنوان الصفري.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev يحرق رمز ERC-721 مميز محدد.
         يطرح خطأ ما لم يكن `msg.sender` هو المالك الحالي، أو مشغلاً مصرحاً له، أو العنوان
         المعتمد لهذا الرمز غير القابل للاستبدال (NFT).
         يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح.
    @param _tokenId uint256 معرف رمز ERC-721 المميز المراد حرقه.
    """
    # التحقق من المتطلبات
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # يطرح خطأ إذا لم يكن `_tokenId` رمز غير قابل للاستبدال (NFT) صالح
    assert owner != empty(address)
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log IERC721.Transfer(sender=owner, receiver=empty(address), token_id=_tokenId)
```

يُسمح لأي شخص يُسمح له بتحويل رمز مميز بحرقه. في حين أن الحرق يبدو مكافئًا
للتحويل إلى العنوان الصفري، فإن العنوان الصفري لا يتلقى الرمز المميز فعليًا. يتيح لنا ذلك
تحرير كل مساحة التخزين التي تم استخدامها للرمز المميز، مما قد يقلل من تكلفة الغاز للمعاملة.

## استخدام هذا العقد {#using-contract}

على النقيض من لغة Solidity، لا تحتوي لغة Vyper على الوراثة (inheritance). هذا خيار تصميمي متعمد لجعل
التعليمات البرمجية أكثر وضوحًا وبالتالي أسهل في التأمين. لذلك لإنشاء عقد <span dir="ltr">ERC-721</span> الخاص بك بلغة Vyper، فإنك تأخذ [هذا
العقد](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) وتقوم بتعديله
لتنفيذ منطق الأعمال الذي تريده.

## الخاتمة {#conclusion}

للمراجعة، إليك بعض أهم الأفكار في هذا العقد:

- لاستقبال الرموز المميزة <span dir="ltr">ERC-721</span> بتحويل آمن، يجب أن تنفذ العقود واجهة `ERC721Receiver`.
- حتى إذا كنت تستخدم التحويل الآمن، فلا يزال من الممكن أن تعلق الرموز المميزة إذا أرسلتها إلى عنوان مفتاحه الخاص
  غير معروف.
- عندما تكون هناك مشكلة في عملية ما، فمن الجيد `revert` الاستدعاء، بدلاً من مجرد إرجاع
  قيمة فشل.
- توجد الرموز المميزة <span dir="ltr">ERC-721</span> عندما يكون لها مالك.
- هناك ثلاث طرق لتكون مخولاً بتحويل رمز غير قابل للاستبدال (NFT). يمكنك أن تكون المالك، أو أن تكون معتمدًا لرمز مميز محدد،
  أو أن تكون مشغلاً لجميع الرموز المميزة للمالك.
- الأحداث الماضية مرئية فقط خارج سلسلة الكتل. لا يمكن للتعليمات البرمجية التي تعمل داخل سلسلة الكتل عرضها.

اذهب الآن وقم بتنفيذ عقود Vyper آمنة.

[انظر هنا لمزيد من أعمالي](https://cryptodocguy.pro/).
