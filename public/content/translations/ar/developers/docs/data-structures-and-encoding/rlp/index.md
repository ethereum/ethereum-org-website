---
title: "تسلسل البادئة ذات الطول المتكرر (RLP)"
description: "تعريف ترميز rlp في طبقة تنفيذ Ethereum."
lang: ar
sidebarDepth: 2
---

يتم استخدام التسلسل ذي الطول المتكرر (RLP) على نطاق واسع في عملاء تنفيذ Ethereum. يقوم RLP بتوحيد نقل البيانات بين العقد بتنسيق فعال من حيث المساحة. الغرض من RLP هو ترميز مجموعات متداخلة بشكل تعسفي من البيانات الثنائية، وRLP هي طريقة الترميز الأساسية المستخدمة لتسلسل الكائنات في طبقة تنفيذ Ethereum. الغرض الرئيسي من RLP هو ترميز البنية؛ وباستثناء الأعداد الصحيحة الموجبة، يفوض RLP ترميز أنواع بيانات محددة (مثل السلاسل والأعداد العشرية) إلى البروتوكولات الأعلى مرتبة. يجب تمثيل الأعداد الصحيحة الموجبة في شكل ثنائي كبير بدون أصفار بادئة (مما يجعل قيمة العدد الصحيح صفرًا مكافئة لمجموعة البايتات الفارغة). يجب التعامل مع الأعداد الصحيحة الموجبة غير التسلسلية ذات الأصفار الأولية على أنها غير صالحة بواسطة أي بروتوكول من الدرجة الأعلى يستخدم RLP.

مزيد من المعلومات في [الورقة الصفراء لإيثريوم (الملحق ب)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

لاستخدام RLP لترميز القاموس، هناك نموذجان أساسيان مقترحان هما:

- استخدم `[[k1,v1],[k2,v2]...]` مع المفاتيح بالترتيب المعجمي
- استخدم ترميز شجرة باتريشيا عالي المستوى كما يفعل الإيثريوم

## التعريف {#definition}

تستقبل وظيفة ترميز RLP عنصرًا. يتم تعريف العنصر على النحو التالي:

- السلسلة (أي مصفوفة بايت) هي عنصر
- قائمة العناصر هي عنصر
- عدد صحيح موجب هو عنصر

على سبيل المثال، كل ما يلي عبارة عن عناصر:

- سلسلة فارغة؛
- السلسلة التي تحتوي على كلمة "قطة"؛
- قائمة تحتوي على أي عدد من السلاسل؛
- وهياكل البيانات الأكثر تعقيدًا مثل `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- الرقم `100`

لاحظ أنه في سياق بقية هذه الصفحة، تعني كلمة "سلسلة" "عدد معين من بايتات البيانات الثنائية"؛ لا يتم استخدام أي ترميزات خاصة، ولا يتم ضمناً أي معرفة حول محتوى السلاسل (باستثناء ما تقتضيه القاعدة ضد الأعداد الصحيحة الموجبة غير الدنيا).

يتم تعريف ترميز RLP على النحو التالي:

- بالنسبة لعدد صحيح موجب، يتم تحويله إلى أقصر مجموعة بايتات يكون تفسيرها الكبير هو العدد الصحيح، ثم يتم ترميزها كسلسلة وفقًا للقواعد أدناه.
- بالنسبة لبايت واحد تكون قيمته في النطاق `[0x00, 0x7f]` (عشري `[0, 127]`)، فإن هذا البايت هو ترميز RLP الخاص به.
- بخلاف ذلك، إذا كان طول السلسلة من 0-55 بايت، فإن ترميز RLP يتكون من بايت واحد بقيمة **0x80** (عشري 128) بالإضافة إلى طول السلسلة متبوعًا بالسلسلة. وبالتالي فإن نطاق البايت الأول هو `[0x80, 0xb7]` (عشري `[128, 183]`).
- إذا كان طول السلسلة أكثر من 55 بايت، فإن ترميز RLP يتكون من بايت واحد بقيمة **0xb7** (عشري 183) بالإضافة إلى الطول بالبايت لطول السلسلة في شكل ثنائي، متبوعًا بطول السلسلة، متبوعًا بالسلسلة. على سبيل المثال، سيتم ترميز سلسلة طولها 1024 بايت على هيئة `\xb9\x04\x00` (عشري `185, 4, 0`) متبوعة بالسلسلة. هنا، `0xb9` (183 + 2 = 185) هو البايت الأول، متبوعًا بالبايتين `0x0400` (عشري 1024) اللذين يشيران إلى طول السلسلة الفعلية. وبالتالي فإن نطاق البايت الأول هو `[0xb8, 0xbf]` (عشري `[184, 191]`).
- إذا كان طول السلسلة 2^64 بايت أو أكثر، فقد لا يتم ترميزها.
- إذا كان إجمالي حمولة القائمة (أي، الطول المجمع لجميع عناصرها المشفرة بـ RLP) يتراوح من 0 إلى 55 بايت، فإن ترميز RLP يتكون من بايت واحد بقيمة **0xc0** بالإضافة إلى طول الحمولة متبوعًا بسلسلة ترميزات RLP للعناصر. وبالتالي فإن نطاق البايت الأول هو `[0xc0, 0xf7]` (عشري `[192, 247]`).
- إذا كان إجمالي حمولة القائمة أكثر من 55 بايت، فإن ترميز RLP يتكون من بايت واحد بقيمة **0xf7** بالإضافة إلى الطول بالبايت لطول الحمولة في شكل ثنائي، متبوعًا بطول الحمولة، متبوعًا بسلسلة ترميزات RLP للعناصر. وبالتالي فإن نطاق البايت الأول هو `[0xf8, 0xff]` (عشري `[248, 255]`).

في الكود، هذا هو:

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## أمثلة {#examples}

- السلسلة "dog" = [0x83، 'd'، 'o'، 'g']
- القائمة [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- السلسلة الفارغة ('null') = `[ 0x80 ]`
- القائمة الفارغة = `[ 0xc0 ]`
- العدد الصحيح 0 = `[ 0x80 ]`
- البايت '\\x00' = `[ 0x00 ]`
- البايت '\\x0f' = `[ 0x0f ]`
- البايتات '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- [التمثيل بنظرية المجموعات للرقم ثلاثة](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)، `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- السلسلة "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ...` , 'e', 'l', 'i', 't' ]`

## فك ترميز RLP {#rlp-decoding}

وفقًا لقواعد وعملية ترميز RLP، يُعتبر إدخال فك تشفير RLP بمثابة مجموعة من البيانات الثنائية. تتم عملية فك تشفير RLP على النحو التالي:

1. وفقًا للبايت الأول (أي البادئة) لبيانات الإدخال، وفك ترميز نوع البيانات، وطول البيانات الفعلية، والإزاحة؛

2. وفقًا لنوع البيانات وإزاحتها، قم بفك تشفير البيانات وفقًا لذلك، مع مراعاة قاعدة الترميز الأدنى للأعداد الصحيحة الموجبة؛

3. استمر في فك تشفير بقية المدخلات؛

ومن بينها قواعد فك تشفير أنواع البيانات والإزاحة على النحو التالي:

1. البيانات عبارة عن سلسلة إذا كان نطاق البايت الأول (أي البادئة) هو [0x00, 0x7f]، والسلسلة هي البايت الأول نفسه بالضبط؛

2. البيانات عبارة عن سلسلة إذا كان نطاق البايت الأول هو [0x80، 0xb7]، والسلسلة التي يساوي طولها البايت الأول ناقص 0x80 تتبع البايت الأول؛

3. تكون البيانات عبارة عن سلسلة إذا كان نطاق البايت الأول هو [0xb8، 0xbf]، وطول السلسلة التي يكون طولها بالبايتات مساويًا للبايت الأول ناقص 0xb7 يتبع البايت الأول، وتتبع السلسلة طول السلسلة؛

4. البيانات عبارة عن قائمة إذا كان نطاق البايت الأول هو [0xc0، 0xf7]، وتسلسل ترميزات RLP لجميع عناصر القائمة التي يكون إجمالي الحمولة فيها مساويًا للبايت الأول ناقص 0xc0 يتبع البايت الأول؛

5. البيانات عبارة عن قائمة إذا كان نطاق البايت الأول هو [0xf8، 0xff]، والحمولة الإجمالية للقائمة التي يساوي طولها البايت الأول ناقص 0xf7 تتبع البايت الأول، وتسلسل ترميزات RLP لجميع عناصر القائمة يتبع الحمولة الإجمالية للقائمة؛

في الكود، هذا هو:

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## قراءة إضافية {#further-reading}

- [RLP في إيثريوم](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [إيثريوم من الداخل: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [كوجليو، أ. (2020). بادئة الطول التكراري لـ Ethereum في ACL2. نسخة arXiv الأولية arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## المواضيع ذات الصلة {#related-topics}

- [شجرة باتريشيا ميركل](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
