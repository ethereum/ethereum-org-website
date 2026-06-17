---
title: "التسلسل ببادئة الطول العودية (⁦RLP⁩)"
description: "تعريف لتشفير ⁦rlp⁩ في طبقة التنفيذ الخاصة بإيثيريوم."
lang: ar
sidebarDepth: 2
---

يُستخدم التسلسل ببادئة الطول العودية (<span dir="ltr">RLP</span>) على نطاق واسع في عملاء التنفيذ الخاصة بإيثيريوم. يوحد `<span dir="ltr">RLP</span>` تحويل البيانات بين العقد بتنسيق موفر للمساحة. الغرض من `<span dir="ltr">RLP</span>` هو تشفير مصفوفات متداخلة بشكل عشوائي من البيانات الثنائية، ويُعد `<span dir="ltr">RLP</span>` طريقة التشفير الأساسية المستخدمة لتسلسل الكائنات في طبقة التنفيذ الخاصة بإيثيريوم. الغرض الرئيسي من `<span dir="ltr">RLP</span>` هو تشفير البنية؛ وباستثناء الأعداد الصحيحة الموجبة، يفوض `<span dir="ltr">RLP</span>` تشفير أنواع بيانات محددة (مثل السلاسل النصية والأرقام العشرية) إلى بروتوكولات ذات ترتيب أعلى. يجب تمثيل الأعداد الصحيحة الموجبة بصيغة ثنائية بنظام النهاية الكبرى بدون أصفار بادئة (مما يجعل قيمة العدد الصحيح صفرًا مكافئة لمصفوفة البايتات الفارغة). يجب أن تُعامل الأعداد الصحيحة الموجبة التي تم إلغاء تسلسلها وتحتوي على أصفار بادئة على أنها غير صالحة بواسطة أي بروتوكول ذي ترتيب أعلى يستخدم `<span dir="ltr">RLP</span>`.

مزيد من المعلومات في [الورقة الصفراء لإيثيريوم (الملحق ب)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

لاستخدام `<span dir="ltr">RLP</span>` لتشفير قاموس، فإن الصيغتين الأساسيتين المقترحتين هما:

- استخدام `[[k1,v1],[k2,v2]...]` مع المفاتيح بترتيب معجمي
- استخدام تشفير شجرة باتريشيا (Patricia Tree) عالي المستوى كما تفعل [إيثيريوم](/)

## التعريف {#definition}

تأخذ دالة تشفير `<span dir="ltr">RLP</span>` عنصرًا. يُعرّف العنصر على النحو التالي:

- السلسلة النصية (أي مصفوفة البايتات) هي عنصر
- قائمة العناصر هي عنصر
- العدد الصحيح الموجب هو عنصر

على سبيل المثال، كل ما يلي عبارة عن عناصر:

- سلسلة نصية فارغة؛
- السلسلة النصية التي تحتوي على الكلمة <span dir="ltr">"cat"</span>؛
- قائمة تحتوي على أي عدد من السلاسل النصية؛
- وهياكل بيانات أكثر تعقيدًا مثل `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- الرقم `100`

لاحظ أنه في سياق بقية هذه الصفحة، تعني كلمة "سلسلة نصية" "عددًا معينًا من بايتات البيانات الثنائية"؛ لا تُستخدم أي تشفيرات خاصة، ولا يُفترض أي معرفة بمحتوى السلاسل النصية (باستثناء ما تتطلبه القاعدة ضد الأعداد الصحيحة الموجبة غير المصغرة).

يُعرّف تشفير `<span dir="ltr">RLP</span>` على النحو التالي:

- بالنسبة للعدد الصحيح الموجب، يتم تحويله إلى أقصر مصفوفة بايتات يكون تفسيرها بنظام النهاية الكبرى هو العدد الصحيح، ثم يتم تشفيره كسلسلة نصية وفقًا للقواعد أدناه.
- بالنسبة لبايت واحد تقع قيمته في النطاق `[0x00, 0x7f]` (عشري `[0, 127]`)، فإن هذا البايت هو تشفير `<span dir="ltr">RLP</span>` الخاص به.
- بخلاف ذلك، إذا كان طول السلسلة النصية يتراوح بين <span dir="ltr">0-55</span> بايت، فإن تشفير `<span dir="ltr">RLP</span>` يتكون من بايت واحد بقيمة **<span dir="ltr">0x80</span>** (عشري 128) زائد طول السلسلة النصية متبوعًا بالسلسلة النصية. وبالتالي فإن نطاق البايت الأول هو `[0x80, 0xb7]` (عشري `[128, 183]`).
- إذا كان طول السلسلة النصية أكثر من 55 بايت، فإن تشفير `<span dir="ltr">RLP</span>` يتكون من بايت واحد بقيمة **<span dir="ltr">0xb7</span>** (عشري 183) زائد الطول بالبايتات لطول السلسلة النصية بالصيغة الثنائية، متبوعًا بطول السلسلة النصية، متبوعًا بالسلسلة النصية. على سبيل المثال، سيتم تشفير سلسلة نصية بطول 1024 بايت على أنها `\xb9\x04\x00` (عشري `185, 4, 0`) متبوعة بالسلسلة النصية. هنا، `0xb9` (<span dir="ltr">183 + 2 = 185</span>) كبايت أول، متبوعًا بالبايتين `0x0400` (عشري 1024) اللذين يشيران إلى طول السلسلة النصية الفعلية. وبالتالي فإن نطاق البايت الأول هو `[0xb8, 0xbf]` (عشري `[184, 191]`).
- إذا كان طول السلسلة النصية <span dir="ltr">2^64</span> بايت أو أطول، فقد لا يتم تشفيرها.
- إذا كانت الحمولة الإجمالية لقائمة (أي الطول المجمع لجميع عناصرها التي يتم تشفيرها بـ `<span dir="ltr">RLP</span>`) تتراوح بين <span dir="ltr">0-55</span> بايت، فإن تشفير `<span dir="ltr">RLP</span>` يتكون من بايت واحد بقيمة **<span dir="ltr">0xc0</span>** زائد طول الحمولة متبوعًا بتسلسل تشفيرات `<span dir="ltr">RLP</span>` للعناصر. وبالتالي فإن نطاق البايت الأول هو `[0xc0, 0xf7]` (عشري `[192, 247]`).
- إذا كانت الحمولة الإجمالية لقائمة أكثر من 55 بايت، فإن تشفير `<span dir="ltr">RLP</span>` يتكون من بايت واحد بقيمة **<span dir="ltr">0xf7</span>** زائد الطول بالبايتات لطول الحمولة بالصيغة الثنائية، متبوعًا بطول الحمولة، متبوعًا بتسلسل تشفيرات `<span dir="ltr">RLP</span>` للعناصر. وبالتالي فإن نطاق البايت الأول هو `[0xf8, 0xff]` (عشري `[248, 255]`).

بشكل موجز:

| النطاق       | البايت 1     | البايت 2     | ...        | البايت 9                | البايت 10    | المعنى                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | سلسلة نصية من بايت واحد                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | سلسلة نصية قصيرة (<span dir="ltr">0-55</span> بايت)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | سلسلة نصية طويلة، <span dir="ltr">N+1</span> بايت للطول، ثم الحمولة |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | قائمة قصيرة (<span dir="ltr">0-55</span> بايت)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | قائمة طويلة، <span dir="ltr">N+1</span> بايت للطول، ثم الحمولة |

- `p` = الحمولة
- `n` = الطول (عدد بايتات الحمولة)
- `N` = إزاحة طول الطول (يتبعها <span dir="ltr">N+1</span> بايت من `n`)

في الكود، يبدو هذا كالتالي:

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

- السلسلة النصية <span dir="ltr">"dog"</span> = <span dir="ltr">[ 0x83, 'd', 'o', 'g' ]</span>
- القائمة <span dir="ltr">[ "cat", "dog" ]</span> = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- السلسلة النصية الفارغة (<span dir="ltr">'null'</span>) = `[ 0x80 ]`
- القائمة الفارغة = `[ 0xc0 ]`
- العدد الصحيح 0 = `[ 0x80 ]`
- البايت <span dir="ltr">'\x00'</span> = `[ 0x00 ]`
- البايت <span dir="ltr">'\x0f'</span> = `[ 0x0f ]`
- البايتات <span dir="ltr">'\x04\x00'</span> = `[ 0x82, 0x04, 0x00 ]`
- [التمثيل النظري للمجموعة](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) للرقم ثلاثة، `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- السلسلة النصية <span dir="ltr">"Lorem ipsum dolor sit amet, consectetur adipisicing elit"</span> = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## فك تشفير <span dir="ltr">RLP</span> {#rlp-decoding}

وفقًا لقواعد وعملية تشفير `<span dir="ltr">RLP</span>`، يُعتبر إدخال فك تشفير `<span dir="ltr">RLP</span>` بمثابة مصفوفة من البيانات الثنائية. عملية فك تشفير `<span dir="ltr">RLP</span>` هي كما يلي:

1.  وفقًا للبايت الأول (أي البادئة) لبيانات الإدخال وفك تشفير نوع البيانات، يتم تحديد طول البيانات الفعلية والإزاحة؛

2.  وفقًا لنوع البيانات وإزاحتها، يتم فك تشفير البيانات بشكل متوافق، مع احترام قاعدة التشفير الأدنى للأعداد الصحيحة الموجبة؛

3.  الاستمرار في فك تشفير بقية الإدخال؛

من بينها، قواعد فك تشفير أنواع البيانات والإزاحة هي كما يلي:

1.  البيانات عبارة عن سلسلة نصية إذا كان نطاق البايت الأول (أي البادئة) هو <span dir="ltr">[0x00, 0x7f]</span>، والسلسلة النصية هي البايت الأول نفسه بالضبط؛

2.  البيانات عبارة عن سلسلة نصية إذا كان نطاق البايت الأول هو <span dir="ltr">[0x80, 0xb7]</span>، والسلسلة النصية التي يساوي طولها البايت الأول ناقص <span dir="ltr">0x80</span> تتبع البايت الأول؛

3.  البيانات عبارة عن سلسلة نصية إذا كان نطاق البايت الأول هو <span dir="ltr">[0xb8, 0xbf]</span>، وطول السلسلة النصية الذي يساوي طولها بالبايتات البايت الأول ناقص <span dir="ltr">0xb7</span> يتبع البايت الأول، والسلسلة النصية تتبع طول السلسلة النصية؛

4.  البيانات عبارة عن قائمة إذا كان نطاق البايت الأول هو <span dir="ltr">[0xc0, 0xf7]</span>، وتسلسل تشفيرات `<span dir="ltr">RLP</span>` لجميع عناصر القائمة التي تساوي حمولتها الإجمالية البايت الأول ناقص <span dir="ltr">0xc0</span> يتبع البايت الأول؛

5.  البيانات عبارة عن قائمة إذا كان نطاق البايت الأول هو <span dir="ltr">[0xf8, 0xff]</span>، والحمولة الإجمالية للقائمة التي يساوي طولها البايت الأول ناقص <span dir="ltr">0xf7</span> تتبع البايت الأول، وتسلسل تشفيرات `<span dir="ltr">RLP</span>` لجميع عناصر القائمة يتبع الحمولة الإجمالية للقائمة؛

في الكود، يبدو هذا كالتالي:

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

- [<span dir="ltr">RLP</span> في إيثيريوم](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [إيثيريوم من الداخل: <span dir="ltr">RLP</span>](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## مواضيع ذات صلة {#related-topics}

- [شجرة باتريشيا ميركل (Patricia merkle trie)](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)