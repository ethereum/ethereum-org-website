---
title: لغات العقد الذكي
description: نظرة عامة ومقارنة بين لغتي العقود الذكية الرئيسيتين – Solidity وVyper.
lang: ar
---

أحد الجوانب الرائعة في Ethereum هو أنه يمكن برمجة العقود الذكية باستخدام لغات صديقة للمطورين نسبيًا. إذا كنت من ذوي الخبرة في لغة Python أو أي [لغة تستخدم الأقواس المتعرجة](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)، يمكنك إيجاد لغة ذات صياغة مألوفة.

اللغتان الأكثر نشاطًا والحفاظ عليهما هما:

- لغة برمجة Solidity
- لغة برمجة Vyper

يوفر Remix IDE بيئة تطوير شاملة لإنشاء واختبار العقود في كل من Solidity وVyper. [جرب بيئة التطوير المتكاملة Remix IDE في المتصفح](https://remix.ethereum.org) لبدء البرمجة.

قد يرغب المطورون الأكثر خبرة أيضًا في استخدام لغة Yul، وهي لغة وسيطة لـ [آلة إيثريوم الافتراضية](/developers/docs/evm/)، أو Yul+، وهو امتداد للغة Yul.

إذا كنت فضوليًا وترغب في المساعدة في اختبار اللغات الجديدة التي لا تزال قيد التطوير المكثف، فيمكنك تجربة Fe، وهي لغة عقود ذكية ناشئة لا تزال حاليًا في مهدها.

## المتطلبات الأساسية {#prerequisites}

يمكن أن تساعدك المعرفة السابقة بلغات البرمجة، وخاصة JavaScript أو Python، على فهم الاختلافات في لغات العقود الذكية. نوصيك أيضًا بفهم العقود الذكية كمفهوم قبل التعمق في المقارنات اللغوية. [مقدمة إلى العقود الذكية](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- لغة كائنية عالية المستوى لتنفيذ العقود الذكية.
- لغة القوس المتعرج التي تأثرت بشدة بـ C++.
- مكتوب بشكل ثابت (نوع المتغير معروف في وقت الترجمة).
- يدعم:
  - الميراث (يمكنك تمديد عقود أخرى).
  - المكتبات (يمكنك إنشاء تعليمات برمجية قابلة لإعادة الاستخدام يمكنك استدعاؤها من عقود مختلفة - مثل الوظائف الثابتة في فئة ثابتة في لغات البرمجة الموجهة للكائنات الأخرى).
  - أنواع معقدة محددة من قبل المستخدم.

### روابط مهمة {#important-links}

- [التوثيق](https://docs.soliditylang.org/en/latest/)
- [بوابة لغة Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [يجتبه](https://github.com/ethereum/solidity/)
- [غرفة محادثة Solidity على Gitter](https://gitter.im/ethereum/solidity) مرتبطة بـ [غرفة محادثة Solidity على Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [ورقة الغش](https://reference.auditless.com/cheatsheet)
- [مدونة Solidity](https://blog.soliditylang.org/)
- [حساب Solidity على تويتر](https://twitter.com/solidity_lang)

### عقد مثال {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // الكلمة الرئيسية "public" تجعل المتغيرات
    // قابلة للوصول من العقود الأخرى
    address public minter;
    mapping (address => uint) public balances;

    // تسمح الأحداث للعملاء بالتفاعل مع
    // تغييرات معينة في العقد تعلن عنها
    event Sent(address from, address to, uint amount);

    // يتم تشغيل كود المنشئ فقط عند إنشاء
    // العقد
    constructor() {
        minter = msg.sender;
    }

    // يرسل كمية من العملات التي تم إنشاؤها حديثًا إلى عنوان
    // لا يمكن استدعاؤه إلا من قبل منشئ العقد
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // يرسل كمية من العملات الموجودة
    // من أي مستدعٍ إلى عنوان
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "رصيد غير كافٍ.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

يجب أن يمنحك هذا المثال فكرة عن صيغة عقد Solidity. للحصول على وصف أكثر تفصيلاً للوظائف والمتغيرات، [انظر التوثيق](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- لغة البرمجة Pythonic
- صياغة قوية
- رمز مترجم صغير ومفهوم
- توليد رمز بايت فعال
- تحتوي عمدًا على ميزات أقل من Solidity بهدف جعل العقود أكثر أمانًا وأسهل للتدقيق. Vyper لا يدعم:
  - المعدلون
  - الميراث
  - التجميع المضمن
  - التحميل الزائد للوظيفة
  - التحميل الزائد على المشغل
  - الدعوة العودية
  - حلقات لا نهائية الطول
  - النقاط الثابتة الثنائية

لمزيد من المعلومات، [اقرأ منطق Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### روابط مهمة {#important-links-1}

- [التوثيق](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [يجتبه](https://github.com/vyperlang/vyper)
- [محادثة مجتمع Vyper على Discord](https://discord.gg/SdvKC79cJk)
- [ورقة الغش](https://reference.auditless.com/cheatsheet)
- [أطر وأدوات تطوير العقود الذكية للغة Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - تعلم كيفية تأمين واختراق عقود Vyper الذكية](https://github.com/SupremacyTeam/VyperPunk)
- [مركز Vyper للتطوير](https://github.com/zcor/vyper-dev)
- [أفضل أمثلة عقود Vyper الذكية](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [موارد منسقة رائعة للغة Vyper](https://github.com/spadebuilders/awesome-vyper)

### مثال {#example}

```python
# مزاد مفتوح

# معلمات المزاد
# يتلقى المستفيد الأموال من صاحب أعلى عرض
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# الحالة الحالية للمزاد
highestBidder: public(address)
highestBid: public(uint256)

# يتم تعيينه إلى "true" في النهاية، ويمنع أي تغيير
ended: public(bool)

# تتبع العروض المستردة حتى نتمكن من اتباع نمط السحب
pendingReturns: public(HashMap[address, uint256])

# إنشاء مزاد بسيط مع وقت مزايدة `_bidding_time` بالثواني
# نيابة عن عنوان المستفيد `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# المزايدة على المزاد بالقيمة المرسلة
# مع هذه المعاملة.
# سيتم استرداد القيمة فقط في حالة
# عدم الفوز بالمزاد.
@external
@payable
def bid():
    # تحقق مما إذا كانت فترة المزايدة قد انتهت.
    assert block.timestamp < self.auctionEnd
    # تحقق مما إذا كان العرض مرتفعًا بما فيه الكفاية
    assert msg.value > self.highestBid
    # تتبع المبلغ المسترد لمقدم العطاء الأعلى السابق
    self.pendingReturns[self.highestBidder] += self.highestBid
    # تتبع العرض الأعلى الجديد
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# سحب عرض تم استرداده مسبقًا. يتم استخدام نمط السحب
# هنا لتجنب مشكلة أمنية. إذا تم إرسال المبالغ المستردة مباشرة
# كجزء من bid()، يمكن لعقد مزايدة ضار أن يمنع
# تلك المبالغ المستردة وبالتالي يمنع وصول عروض أعلى جديدة.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# إنهاء المزاد وإرسال أعلى عرض
# إلى المستفيد.
@external
def endAuction():
    # من الإرشادات الجيدة تنظيم الوظائف التي تتفاعل
    # مع العقود الأخرى (أي، تستدعي وظائف أو ترسل الإيثر)
    # في ثلاث مراحل:
    # 1. التحقق من الشروط
    # 2. تنفيذ الإجراءات (من المحتمل تغيير الشروط)
    # 3. التفاعل مع العقود الأخرى
    # إذا تم خلط هذه المراحل، يمكن للعقد الآخر
    # أن يستدعي مرة أخرى العقد الحالي ويعدل الحالة أو يتسبب
    # في تنفيذ التأثيرات (دفع الإيثر) عدة مرات.
    # إذا كانت الوظائف التي يتم استدعاؤها داخليًا تتضمن تفاعلاً مع عقود
    # خارجية، فيجب أيضًا اعتبارها تفاعلاً مع
    # عقود خارجية.

    # 1. الشروط
    # تحقق مما إذا كان وقت انتهاء المزاد قد حان
    assert block.timestamp >= self.auctionEnd
    # تحقق مما إذا كانت هذه الوظيفة قد تم استدعاؤها بالفعل
    assert not self.ended

    # 2. التأثيرات
    self.ended = True

    # 3. التفاعل
    send(self.beneficiary, self.highestBid)
```

يجب أن يمنحك هذا المثال فكرة عن صيغة عقد Vyper. للحصول على وصف أكثر تفصيلاً للوظائف والمتغيرات، [انظر التوثيق](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul و Yul+ {#yul}

إذا كنت جديدًا على Ethereum ولم تقم بأي تشفير باستخدام لغات العقود الذكية حتى الآن، فنوصيك بالبدء في استخدام Solidity أو Vyper. لا تنظر إلى Yul أو Yul+ إلا بعد أن تتعرف على أفضل ممارسات أمان العقود الذكية وتفاصيل العمل مع EVM.

**Yul**

- لغة وسيطة للإيثيريوم.
- تدعم [EVM](/developers/docs/evm) و[Ewasm](https://github.com/ewasm)، وهي مجموعة ويب بنكهة الإيثريوم، ومصممة لتكون قاسمًا مشتركًا قابلاً للاستخدام لكلا المنصتين.
- هدف جيد لمراحل التحسين عالية المستوى التي يمكن أن تفيد منصات EVM وEwasm على حد سواء.

**Yul+**

- امتداد منخفض المستوى وعالي الكفاءة لـ Yul.
- صُممت في البداية لعقد [الرول أب التفائلي](/developers/docs/scaling/optimistic-rollups/).
- يمكن النظر إلى Yul+ على أنه اقتراح ترقية تجريبي لـ Yul، مما يضيف ميزات جديدة إليه.

### روابط مهمة {#important-links-2}

- [توثيق Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [توثيق Yul+](https://github.com/fuellabs/yulp)
- [منشور مقدمة عن Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### عقد مثال {#example-contract-2}

المثال البسيط التالي يطبق دالة الطاقة. يمكن تجميعه باستخدام `solc --strict-assembly --bin input.yul`. يجب أن يتم تخزين المثال في ملف input.yul.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

إذا كنت من ذوي الخبرة الجيدة في العقود الذكية، فيمكن العثور على تنفيذ ERC20 الكامل في لغة Yul [هنا](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- اللغة المكتوبة بشكل ثابت لجهاز Ethereum الظاهري (EVM).
- مستوحاة من بايثون والصدأ.
- تهدف إلى أن تكون سهلة التعلم - حتى للمطورين الجدد في نظام Ethereum البيئي.
- لا يزال تطوير Fe في مراحله الأولى، وقد صدرت اللغة ألفا في يناير 2021.

### روابط مهمة {#important-links-3}

- [يجتبه](https://github.com/ethereum/fe)
- [إعلان لغة Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [خارطة طريق Fe لعام 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [محادثة Fe على Discord](https://discord.com/invite/ywpkAXFjZH)
- [حساب Fe على تويتر](https://twitter.com/official_fe)

### عقد مثال {#example-contract-3}

فيما يلي عقد بسيط تم تنفيذه في Fe.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## كيف تختار {#how-to-choose}

كما هو الحال مع أي لغة برمجة أخرى، يتعلق الأمر في الغالب باختيار الأداة المناسبة للوظيفة المناسبة بالإضافة إلى التفضيلات الشخصية.

إليك بعض الأشياء التي يجب مراعاتها إذا لم تجرب أيًا من اللغات بعد:

### ما هو المفضل عن  Solidity؟ {#solidity-advantages}

- إذا كنت مبتدئًا، فهناك العديد من البرامج التعليمية وأدوات التعلم المتاحة. انظر المزيد عن ذلك في قسم [التعلم عن طريق البرمجة](/developers/learning-tools/).
- أدوات المطور الجيدة المتاحة.
- تمتلك Solidity مجتمعًا كبيرًا من المطورين، مما يعني أنك ستجد على الأرجح إجابات لأسئلتك بسرعة كبيرة.

### ما هو المفضل عن   Vyper؟ {#vyper-advatages}

- طريقة رائعة لبدء مطوري Python الذين يرغبون في كتابة عقود ذكية.
- يحتوي Vyper على عدد أقل من الميزات مما يجعله رائعًا للنماذج الأولية السريعة للأفكار.
- يهدف Vyper إلى أن يكون سهل التدقيق ويمكن قراءته إلى أقصى حد من قبل الإنسان.

### ما هو المفضل عب Yul و Yul+ ؟ {#yul-advantages}

- لغة مبسطة وعملية ذات مستوى منخفض.
- يسمح بالاقتراب كثيرًا من EVM الخام، مما يمكن أن يساعد في تحسين استخدام الغاز في العقود الخاصة بك.

## مقارنات اللغات {#language-comparisons}

لإجراء مقارنات بين الصيغة الأساسية ودورة حياة العقد والواجهات والمشغلات وهياكل البيانات والوظائف وتدفق التحكم والمزيد، راجع [ورقة الغش هذه من Auditless](https://reference.auditless.com/cheatsheet/)

## قراءة إضافية{#further-reading}

- [مكتبة عقود Solidity من OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)
