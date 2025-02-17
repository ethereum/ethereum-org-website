---
title: سریال سازی پیشوند با طول بازگشتی (RLP)
description: تعریف رمزگذاری rlp در لایه اجرایی اتریوم.
lang: fa
sidebarDepth: 2
---

سریال سازی پیشوند طول بازگشتی (RLP) به طور گسترده در کلاینت های اجرایی اتریوم استفاده می شود. RLP انتقال داده ها بین گره ها را در یک فرمت فضا-کارا استاندارد می کند. هدف RLP کدگذاری آرایه های تو در تو دلخواه از داده های دوتایی است و RLP روش رمزگذاری اولیه است که برای سریال سازی اشیاء در لایه اجرای اتریوم استفاده می شود. هدف اصلی RLP کدگذاری ساختار است. به استثنای اعداد صحیح مثبت، RLP کدگذاری انواع داده های خاص (مانند رشته ها، شناورها) را به پروتکل های مرتبه بالاتر واگذار می کند. اعداد صحیح مثبت باید به شکل دوتایی با اندین بزرگ و بدون صفرهای ابتدایی نمایش داده شوند (بنابراین مقدار عدد صحیح صفر معادل آرایه بایت خالی می شود). اعداد صحیح مثبت غیر سریالی شده با صفرهای ابتدایی باید توسط هر پروتکل مرتبه بالاتر با استفاده از RLP نامعتبر تلقی شوند.

اطلاعات بیشتر در [مقاله زرد اتریوم (پیوست B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

برای استفاده از RLP برای رمزگذاری یک فرهنگ لغت، دو شکل متعارف پیشنهادی عبارتند از:

- از `[[k1,v1],[k2,v2]...]` با کلیدها به ترتیب واژگان استفاده کنید
- از رمزگذاری درخت پاتریشیا در سطح بالاتر مانند اتریوم استفاده کنید

## تعریف {#definition}

تابع رمزگذاری RLP یک آیتم را می گیرد. یک آیتم به صورت زیر تعریف می شود:

- یک رشته (یعنی آرایه بایت) یک آیتم است
- لیست اقلام، یک آیتم است
- یک عدد صحیح مثبت یک آیتم است

به عنوان مثال، همه موارد زیر عبارتند از:

- یک رشته خالی؛
- رشته حاوی کلمه "گربه"؛
- لیستی حاوی هر تعداد رشته؛
- و ساختارهای داده پیچیده تری مانند `["گربه"، ["توله سگ"، "گاو"]، "اسب"، [[]]، "خوک"، [""]، "گوسفند"]`.
- عدد `100`

توجه داشته باشید که در زمینه بقیه این صفحه، "رشته" به معنای "تعداد معینی از بایت داده های دوتایی" است. هیچ کدگذاری خاصی استفاده نمی شود، توجه داشته باشید که در زمینه بقیه این صفحه، "رشته" به معنای "تعداد معینی از بایت داده های دوتایی" است. هیچ کدگذاری خاصی استفاده نمی شود، و هیچ دانشی در مورد محتوای رشته ها وجود ندارد (به جز مواردی که توسط قانون در مورد اعداد صحیح مثبت غیر حداقلی لازم است).

رمزگذاری RLP به صورت زیر تعریف می شود:

- برای یک عدد صحیح مثبت، به کوتاه‌ترین آرایه بایتی که تفسیر آن عدد صحیح است، تبدیل می‌شود و سپس طبق قوانین زیر به عنوان یک رشته کدگذاری می‌شود.
- برای یک بایت که مقدار آن در محدوده `[0x00, 0x7f]` (اعشاری `[0, 127]`) است، آن بایت رمزگذاری RLP خودش است.
- در غیر این صورت، اگر یک رشته 0-55 بایت طول داشته باشد، رمزگذاری RLP از یک بایت با مقدار **0x80** (اعشار 128) به اضافه طول رشته و به دنبال آن رشته تشکیل شده است. بنابراین، محدوده اولین بایت `[0x80, 0xb7]` است (dec. `[128, 183]`).
- اگر یک رشته بیش از 55 بایت طول داشته باشد، رمزگذاری RLP شامل یک بایت منفرد با مقدار **0xb7** (اعشار 183) به اضافه طول بر حسب بایت طول رشته به صورت دوتایی است و به دنبال آن طول رشته و به دنبال آن رشته است. به عنوان مثال، یک رشته 1024 بایتی به صورت `\xb9\x04\x00` (dec. `185, 4, 0`) و به دنبال آن رشته رمزگذاری می‌شود. در اینجا، `0xb9` (183 + 2 = 185) به عنوان اولین بایت، به دنبال آن 2 بایت `0x0400` (اعشار 1024) که طول رشته واقعی را نشان می دهد. بنابراین، محدوده اولین بایت `[0xb8, 0xbf]` است (اعشار `[184، 191]`).
- اگر یک رشته 2^64 بایت یا بیشتر باشد، ممکن است رمزگذاری نشود.
- اگر مجموع بار یک لیست (یعنی طول ترکیبی همه موارد آن که با RLP کدگذاری شده اند) 0-55 بایت باشد، رمزگذاری RLP از یک بایت با مقدار **0xc0** به اضافه طول بار و به دنبال آن الحاق رمزگذاری های RLP اقلام تشکیل می‌شود. بنابراین، محدوده اولین بایت `[0xc0, 0xf7]` است (اعشار `[192, 247] `).
- اگر حجم کل یک لیست بیش از 55 بایت باشد، رمزگذاری RLP شامل یک بایت منفرد با مقدار **0xf7** به اضافه طول بر حسب بایت طول بار به صورت دوتایی است و به دنبال آن طول بار، و به دنبال آن الحاق رمزگذاری های RLP اقلام است. بنابراین، محدوده اولین بایت `[0xf8, 0xff]` است (اعشار `[248, 255] `).

در کد، این عبارت است از:

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

## مثال ها {#examples}

- the string "dog" = [ 0x83, 'd', 'o', 'g' ]
- the list [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- the empty string ('null') = `[ 0x80 ]`
- the empty list = `[ 0xc0 ]`
- the integer 0 = `[ 0x80 ]`
- the byte '\\x00' = `[ 0x00 ]`
- the byte '\\x0f' = `[ 0x0f ]`
- the bytes '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- [نمایش تئوری مجموعه](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) سه، `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- رشته "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## رمزگشایی RLP {#rlp-decoding}

با توجه به قوانین و فرآیند رمزگذاری RLP، ورودی رمزگشایی RLP به عنوان آرایه ای از داده های دوتایی در نظر گرفته می شود. فرآیند رمزگشایی RLP به شرح زیر است:

1.  با توجه به اولین بایت (یعنی پیشوند) داده های ورودی و رمزگشایی نوع داده، طول داده واقعی و افست؛

2.  با توجه به نوع و افست داده، داده ها را به ترتیب رمزگشایی کنید، با رعایت حداقل قانون رمزگذاری برای اعداد صحیح مثبت.

3.  به رمزگشایی بقیه ورودی ادامه دهید؛

در میان آنها، قوانین رمزگشایی انواع داده و افست به شرح زیر است:

1.  اگر محدوده اولین بایت (یعنی پیشوند) [0x00, 0x7f] باشد و رشته دقیقاً خود اولین بایت باشد، داده یک رشته است.

2.  اگر محدوده اولین بایت [0x80, 0xb7] باشد، و رشته ای که طول آن برابر با بایت اول منهای 0x80 است از بایت اول پیروی کند، داده یک رشته است؛

3.  اگر محدوده اولین بایت [0xb8, 0xbf] باشد، و طول رشته ای که طول آن بر حسب بایت برابر بایت اول منهای 0xb7 است از بایت اول پیروی می کند و رشته از طول رشته پیروی می کند، داده یک رشته است؛

4.  اگر محدوده اولین بایت [0xc0, 0xf7] باشد، و الحاق رمزگذاری های RLP همه آیتم های لیست که کل بار بار برابر با بایت اول منهای 0xc0 است، از بایت اول پیروی می کند، داده یک لیست است؛

5.  اگر محدوده اولین بایت [0xf8, 0xff] باشد، و کل محموله فهرستی که طول آن برابر با بایت اول منهای 0xf7 است، از اولین بایت پیروی می کند، و الحاق رمزگذاری های RLP همه آیتم های لیست از کل بار فهرست پیروی می کنند، داده یک لیست است؛

در کد، این عبارت است از:

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

## بیشتر بخوانید {#further-reading}

- [RLP در اتریوم](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [اتریوم زیر سقف: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). پیشوند طول مکرر اتریوم در ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## موضوعات مرتبط {#related-topics}

- [درخت مرکل پاتریشیا](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
