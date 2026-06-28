---
title: "لغات العقود الذكية"
description: "نظرة عامة ومقارنة بين لغتي العقود الذكية الرئيسيتين – ⁦Solidity⁩ و⁦Vyper⁩."
lang: ar
---

من الجوانب الرائعة في [إيثيريوم](/) أنه يمكن برمجة العقود الذكية باستخدام لغات صديقة للمطورين نسبيًا. إذا كانت لديك خبرة في لغة <span dir="ltr">Python</span> أو أي [لغة تستخدم الأقواس المعقوفة](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)، فيمكنك العثور على لغة ذات بنية مألوفة.

اللغتان الأكثر نشاطًا وصيانة هما:

- <span dir="ltr">Solidity</span>
- <span dir="ltr">Vyper</span>

توفر بيئة التطوير المتكاملة <span dir="ltr">Remix</span> بيئة تطوير شاملة لإنشاء واختبار العقود في كل من <span dir="ltr">Solidity</span> و<span dir="ltr">Vyper</span>. [جرب بيئة التطوير المتكاملة Remix في المتصفح](https://remix.ethereum.org) لبدء البرمجة.

قد يرغب المطورون الأكثر خبرة أيضًا في استخدام <span dir="ltr">Yul</span>، وهي لغة وسيطة لـ [آلة إيثيريوم الافتراضية (EVM)](/developers/docs/evm/)، أو <span dir="ltr">Yul+</span>، وهي امتداد للغة <span dir="ltr">Yul</span>.

إذا كنت فضوليًا وترغب في المساعدة في اختبار لغات جديدة لا تزال قيد التطوير المكثف، فيمكنك تجربة <span dir="ltr">Fe</span>، وهي لغة عقود ذكية ناشئة لا تزال حاليًا في مهدها.

## المتطلبات الأساسية {#prerequisites}

يمكن أن تساعدك المعرفة السابقة بلغات البرمجة، وخاصة <span dir="ltr">JavaScript</span> أو <span dir="ltr">Python</span>، في فهم الاختلافات في لغات العقود الذكية. نوصي أيضًا بفهم العقود الذكية كمفهوم قبل التعمق في مقارنات اللغات. [مقدمة عن العقود الذكية](/developers/docs/smart-contracts/).

## <span dir="ltr">Solidity</span> {#solidity}

- لغة عالية المستوى وموجهة للكائنات لتنفيذ العقود الذكية.
- لغة تستخدم الأقواس المعقوفة وتأثرت بشدة بلغة <span dir="ltr">C++</span>.
- مكتوبة بشكل ثابت (يُعرف نوع المتغير في وقت الترجمة).
- تدعم:
  - الوراثة (يمكنك توسيع عقود أخرى).
  - المكتبات (يمكنك إنشاء كود قابل لإعادة الاستخدام يمكنك استدعاؤه من عقود مختلفة – مثل الدوال الثابتة في فئة ثابتة في لغات البرمجة الموجهة للكائنات الأخرى).
  - أنواع معقدة يحددها المستخدم.

### روابط مهمة {#important-links}

- [التوثيق](https://docs.soliditylang.org/en/latest/)
- [بوابة لغة Solidity](https://soliditylang.org/)
- [Solidity بالأمثلة](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [غرفة دردشة Solidity على Gitter](https://gitter.im/ethereum/solidity) متصلة بـ [غرفة دردشة Solidity على Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [ورقة مرجعية (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [مدونة Solidity](https://blog.soliditylang.org/)
- [تويتر Solidity](https://twitter.com/solidity_lang)

### مثال على عقد {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // تجعل الكلمة المفتاحية "public" المتغيرات
    // قابلة للوصول من عقود أخرى
    address public minter;
    mapping (address => uint) public balances;

    // تسمح الأحداث للعملاء بالتفاعل مع
    // تغييرات محددة في العقد تعلن عنها
    event Sent(address from, address to, uint amount);

    // يتم تشغيل كود المُنشئ فقط عندما
    // يتم إنشاء العقد
    constructor() {
        minter = msg.sender;
    }

    // يرسل كمية من العملات المنشأة حديثًا إلى عنوان
    // يمكن استدعاؤه فقط من قبل منشئ العقد
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // يرسل كمية من العملات الحالية
    // من أي متصل إلى عنوان
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

يجب أن يمنحك هذا المثال فكرة عن شكل بنية عقد <span dir="ltr">Solidity</span>. للحصول على وصف أكثر تفصيلاً للدوال والمتغيرات، [راجع التوثيق](https://docs.soliditylang.org/en/latest/contracts.html).

## <span dir="ltr">Vyper</span> {#vyper}

- لغة برمجة مبنية على أسلوب <span dir="ltr">Python</span>
- كتابة قوية (Strong typing)
- كود مترجم (compiler) صغير ومفهوم
- توليد فعال لرمز البايت
- تحتوي عمدًا على ميزات أقل من <span dir="ltr">Solidity</span> بهدف جعل العقود أكثر أمانًا وأسهل في التدقيق. لا تدعم <span dir="ltr">Vyper</span>:
  - المُعدِّلات (Modifiers)
  - الوراثة
  - لغة التجميع المضمنة (Inline assembly)
  - التحميل الزائد للدوال (Function overloading)
  - التحميل الزائد للعوامل (Operator overloading)
  - الاستدعاء العودي (Recursive calling)
  - الحلقات اللانهائية
  - النقاط الثابتة الثنائية (Binary fixed points)

لمزيد من المعلومات، [اقرأ الأساس المنطقي لـ Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### روابط مهمة {#important-links-1}

- [التوثيق](https://vyper.readthedocs.io)
- [Vyper بالأمثلة](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [المزيد من Vyper بالأمثلة](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [دردشة مجتمع Vyper على ديسكورد](https://discord.gg/SdvKC79cJk)
- [ورقة مرجعية (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [أطر عمل وأدوات تطوير العقود الذكية لـ Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - تعلم كيفية تأمين واختراق العقود الذكية المكتوبة بـ Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [مركز Vyper للتطوير](https://github.com/zcor/vyper-dev)
- [أفضل أمثلة العقود الذكية المكتوبة بـ Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [موارد رائعة ومنسقة لـ Vyper](https://github.com/spadebuilders/awesome-vyper)

### مثال {#example}

```python
# مزاد مفتوح

# معلمات المزاد
# يتلقى المستفيد الأموال من صاحب أعلى عطاء
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# الحالة الحالية للمزاد
highestBidder: public(address)
highestBid: public(uint256)

# يتم تعيينه إلى true في النهاية، ويمنع أي تغيير
ended: public(bool)

# تتبع العطاءات المستردة حتى نتمكن من اتباع نمط السحب
pendingReturns: public(HashMap[address, uint256])

# إنشاء مزاد بسيط بوقت مزايدة `_bidding_time`
# ثانية نيابة عن
# عنوان المستفيد `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# المزايدة في المزاد بالقيمة المرسلة
# مع هذه المعاملة.
# سيتم استرداد القيمة فقط إذا
# لم يتم الفوز بالمزاد.
@external
@payable
def bid():
    # تحقق مما إذا كانت فترة المزايدة قد انتهت.
    assert block.timestamp < self.auctionEnd
    # تحقق مما إذا كان العطاء مرتفعًا بما يكفي
    assert msg.value > self.highestBid
    # تتبع الاسترداد لصاحب أعلى عطاء سابق
    self.pendingReturns[self.highestBidder] += self.highestBid
    # تتبع أعلى عطاء جديد
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# سحب عطاء تم استرداده مسبقًا. يُستخدم نمط السحب
# هنا لتجنب مشكلة أمنية. إذا تم إرسال المبالغ المستردة مباشرة
# كجزء من bid()، يمكن لعقد مزايدة خبيث حظر
# تلك المبالغ المستردة وبالتالي منع دخول عطاءات جديدة أعلى.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# إنهاء المزاد وإرسال أعلى عطاء
# إلى المستفيد.
@external
def endAuction():
    # من الإرشادات الجيدة هيكلة الدوال التي تتفاعل
    # مع عقود أخرى (أي أنها تستدعي دوال أو ترسل إيثر)
    # إلى ثلاث مراحل:
    # 1. التحقق من الشروط
    # 2. تنفيذ الإجراءات (والتي قد تغير الشروط)
    # 3. التفاعل مع عقود أخرى
    # إذا تم خلط هذه المراحل، يمكن للعقد الآخر معاودة الاتصال
    # بالعقد الحالي وتعديل الحالة أو التسبب في
    # تنفيذ التأثيرات (دفع الإيثر) عدة مرات.
    # إذا كانت الدوال المستدعاة داخليًا تتضمن تفاعلًا مع عقود
    # خارجية، فيجب اعتبارها أيضًا تفاعلًا مع
    # عقود خارجية.

    # 1. الشروط
    # تحقق مما إذا كان قد تم الوصول إلى وقت نهاية المزاد
    assert block.timestamp >= self.auctionEnd
    # تحقق مما إذا كانت هذه الدالة قد تم استدعاؤها بالفعل
    assert not self.ended

    # 2. التأثيرات
    self.ended = True

    # 3. التفاعل
    send(self.beneficiary, self.highestBid)
```

يجب أن يمنحك هذا المثال فكرة عن شكل بنية عقد <span dir="ltr">Vyper</span>. للحصول على وصف أكثر تفصيلاً للدوال والمتغيرات، [راجع التوثيق](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## <span dir="ltr">Yul</span> و<span dir="ltr">Yul+</span> {#yul}

إذا كنت جديدًا على إيثيريوم ولم تقم بأي برمجة باستخدام لغات العقود الذكية بعد، فنوصيك بالبدء باستخدام <span dir="ltr">Solidity</span> أو <span dir="ltr">Vyper</span>. لا تنظر في <span dir="ltr">Yul</span> أو <span dir="ltr">Yul+</span> إلا بعد أن تكون على دراية بأفضل ممارسات أمان العقود الذكية وتفاصيل العمل مع آلة إيثيريوم الافتراضية (<span dir="ltr">EVM</span>).

**<span dir="ltr">Yul</span>**

- لغة وسيطة لإيثيريوم.
- تدعم [آلة إيثيريوم الافتراضية (EVM)](/developers/docs/evm) و[Ewasm](https://github.com/ewasm)، وهي نسخة من <span dir="ltr">WebAssembly</span> مخصصة لإيثيريوم، ومصممة لتكون قاسمًا مشتركًا قابلاً للاستخدام لكلا المنصتين.
- هدف جيد لمراحل التحسين عالية المستوى التي يمكن أن تفيد منصتي <span dir="ltr">EVM</span> و<span dir="ltr">Ewasm</span> على حد سواء.

**<span dir="ltr">Yul+</span>**

- امتداد منخفض المستوى وعالي الكفاءة للغة <span dir="ltr">Yul</span>.
- صُممت في البداية لعقد [رول أب متفائل](/developers/docs/scaling/optimistic-rollups/).
- يمكن النظر إلى <span dir="ltr">Yul+</span> على أنها مقترح ترقية تجريبي للغة <span dir="ltr">Yul</span>، حيث تضيف ميزات جديدة إليها.

### روابط مهمة {#important-links-2}

- [توثيق Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [توثيق Yul+](https://github.com/fuellabs/yulp)
- [منشور تعريفي عن Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### مثال على عقد {#example-contract-2}

ينفذ المثال البسيط التالي دالة القوة (الأس). يمكن تجميعه باستخدام `solc --strict-assembly --bin input.yul`. يجب تخزين المثال في ملف <span dir="ltr">input.yul</span>.

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

إذا كنت تتمتع بخبرة جيدة بالفعل في العقود الذكية، فيمكن العثور على تنفيذ كامل لـ <span dir="ltr">ERC-20</span> بلغة <span dir="ltr">Yul</span> [هنا](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## <span dir="ltr">Fe</span> {#fe}

- لغة مكتوبة بشكل ثابت لآلة إيثيريوم الافتراضية (<span dir="ltr">EVM</span>).
- مستوحاة من <span dir="ltr">Python</span> و<span dir="ltr">Rust</span>.
- تهدف إلى أن تكون سهلة التعلم -- حتى للمطورين الجدد في نظام إيثيريوم البيئي.
- لا يزال تطوير <span dir="ltr">Fe</span> في مراحله الأولى، وقد تم إصدار النسخة الأولية (alpha) من اللغة في يناير 2021.

### روابط مهمة {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [إعلان Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [خارطة طريق Fe لعام 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [دردشة Fe على ديسكورد](https://discord.com/invite/ywpkAXFjZH)
- [تويتر Fe](https://twitter.com/official_fe)

### مثال على عقد {#example-contract-3}

فيما يلي عقد بسيط تم تنفيذه بلغة <span dir="ltr">Fe</span>.

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

## كيفية الاختيار {#how-to-choose}

كما هو الحال مع أي لغة برمجة أخرى، يتعلق الأمر في الغالب باختيار الأداة المناسبة للمهمة المناسبة بالإضافة إلى التفضيلات الشخصية.

إليك بعض الأشياء التي يجب مراعاتها إذا لم تجرب أيًا من اللغات بعد:

### ما الرائع في <span dir="ltr">Solidity</span>؟ {#solidity-advantages}

- إذا كنت مبتدئًا، فهناك العديد من البرامج التعليمية وأدوات التعلم المتاحة. تعرف على المزيد حول ذلك في قسم [التعلم من خلال البرمجة](/developers/learning-tools/).
- تتوفر أدوات تطوير جيدة.
- تمتلك <span dir="ltr">Solidity</span> مجتمع مطورين كبير، مما يعني أنك ستجد على الأرجح إجابات لأسئلتك بسرعة كبيرة.

### ما الرائع في <span dir="ltr">Vyper</span>؟ {#vyper-advatages}

- طريقة رائعة للبدء لمطوري <span dir="ltr">Python</span> الذين يرغبون في كتابة العقود الذكية.
- تحتوي <span dir="ltr">Vyper</span> على عدد أقل من الميزات مما يجعلها رائعة للنماذج الأولية السريعة للأفكار.
- تهدف <span dir="ltr">Vyper</span> إلى أن تكون سهلة التدقيق وقابلة للقراءة من قبل البشر إلى أقصى حد.

### ما الرائع في <span dir="ltr">Yul</span> و<span dir="ltr">Yul+</span>؟ {#yul-advantages}

- لغة منخفضة المستوى مبسطة ووظيفية.
- تتيح الاقتراب أكثر من آلة إيثيريوم الافتراضية (<span dir="ltr">EVM</span>) الخام، مما يمكن أن يساعد في تحسين استخدام الغاز في عقودك.

## مقارنات اللغات {#language-comparisons}

لمقارنات البنية الأساسية، ودورة حياة العقد، والواجهات، والعوامل، وهياكل البيانات، والدوال، وتدفق التحكم، والمزيد، تحقق من [الورقة المرجعية هذه بواسطة Auditless](https://reference.auditless.com/cheatsheet/)

## قراءة إضافية {#further-reading}

- [مكتبة عقود Solidity بواسطة أوبن زبلن](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity بالأمثلة](https://solidity-by-example.org)