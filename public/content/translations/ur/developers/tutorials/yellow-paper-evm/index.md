---
title: "یلو پیپر کی ⁦EVM⁩ تفصیلات کو سمجھنا"
description: "یلو پیپر کے اس حصے کو سمجھنا، جو ایتھیریم کی باضابطہ تفصیلات ہیں، اور جو ایتھیریم ورچوئل مشین (⁦EVM⁩) کی وضاحت کرتا ہے۔"
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: "یلو پیپر ⁦EVM⁩"
lang: ur
published: 2022-05-15
---

[یلو پیپر](https://ethereum.github.io/yellowpaper/paper.pdf) ایتھیریم کے لیے باضابطہ تفصیلات ہے۔ سوائے ان جگہوں کے جہاں [<span dir="ltr">EIP</span> عمل](/eips/) کے ذریعے ترمیم کی گئی ہو، اس میں ہر چیز کے کام کرنے کے طریقے کی قطعی وضاحت موجود ہے۔ یہ ایک ریاضیاتی مقالے کے طور پر لکھا گیا ہے، جس میں ایسی اصطلاحات شامل ہیں جن سے پروگرامرز شاید واقف نہ ہوں۔ اس مقالے میں آپ اسے پڑھنا سیکھیں گے، اور اس کی توسیع کے طور پر دیگر متعلقہ ریاضیاتی مقالے بھی۔

## کون سا یلو پیپر؟ {#which-yellow-paper}

ایتھیریم میں تقریباً ہر دوسری چیز کی طرح، یلو پیپر بھی وقت کے ساتھ ساتھ تیار ہوتا ہے۔ کسی مخصوص ورژن کا حوالہ دینے کے قابل ہونے کے لیے، میں نے [وہ ورژن اپ لوڈ کیا جو لکھتے وقت موجود تھا](yellow-paper-berlin.pdf) (برلن ورژن، 2022)۔ اس ٹیوٹوریل میں سیکشن، صفحہ، اور مساوات کے نمبر اسی ورژن کا حوالہ دیتے ہیں۔ [تازہ ترین ورژن](https://ethereum.github.io/yellowpaper/paper.pdf) کو اس کے بعد سے اپ ڈیٹ کیا گیا ہے، اس لیے اس کے نمبر مختلف ہو سکتے ہیں۔ اس دستاویز کو پڑھتے وقت اسے ایک مختلف ونڈو میں کھلا رکھنا ایک اچھا خیال ہے۔

### EVM کیوں؟ {#why-the-evm}

اصل یلو پیپر ایتھیریم کی ترقی کے بالکل آغاز میں لکھا گیا تھا۔ یہ اصل ثبوتِ کار (PoW) پر مبنی اتفاق رائے کا طریقہ کار بیان کرتا ہے جو ابتدائی طور پر نیٹ ورک کو محفوظ بنانے کے لیے استعمال کیا گیا تھا۔ تاہم، ایتھیریم نے ثبوتِ کار (PoW) کو بند کر دیا اور ستمبر <span dir="ltr">2022</span> میں حصہ داری کا ثبوت (PoS) پر مبنی اتفاق رائے کا استعمال شروع کر دیا۔ یہ ٹیوٹوریل یلو پیپر کے ان حصوں پر توجہ مرکوز کرے گا جو ایتھیریم ورچوئل مشین (EVM) کی وضاحت کرتے ہیں۔ حصہ داری کا ثبوت (PoS) کی طرف منتقلی نے EVM کو بمشکل ہی تبدیل کیا: `DIFFICULTY` آپ کوڈ (<span dir="ltr">0x44</span>) کا نام بدل کر [`PREVRANDAO`](https://eips.ethereum.org/EIPS/eip-4399) رکھ دیا گیا اور اب یہ بیکن چین سے ایک بے ترتیب قدر واپس کرتا ہے۔

بعد میں نیٹ ورک اپ گریڈز نے EVM کو تبدیل کیا۔ انہوں نے آپ کوڈز شامل کیے جیسے [`PUSH0`](https://eips.ethereum.org/EIPS/eip-3855)، [`TLOAD` اور `TSTORE`](https://eips.ethereum.org/EIPS/eip-1153) (عارضی اسٹوریج)، [`MCOPY`](https://eips.ethereum.org/EIPS/eip-5656)، [`BLOBHASH`](https://eips.ethereum.org/EIPS/eip-4844)، اور [`BLOBBASEFEE`](https://eips.ethereum.org/EIPS/eip-7516)، اور [`SELFDESTRUCT`](https://eips.ethereum.org/EIPS/eip-6780) کے برتاؤ کو تبدیل کیا۔ یلو پیپر ان تمام تبدیلیوں کا احاطہ نہیں کرتا ہے۔ سب سے تازہ ترین تفصیلات [Python عمل درآمد کی تہہ کی تفصیلات](https://github.com/ethereum/execution-specs) ہیں۔

## 9 Execution model {#9-execution-model}

This section (p. 14-16) includes most of the definition of the EVM.

The term _system state_ includes everything you need to know about the system to run it. In a typical computer, this means the memory, content of registers, etc.

A [Turing machine](https://en.wikipedia.org/wiki/Turing_machine) is a computational model. Essentially, it is a simplified version of a computer, which is proved to have the same ability to run computations that a normal computer can (everything that a computer can calculate a Turing machine can calculate and vice versa). This model makes it easier to prove various theorems about what is and what isn't computable.

The term [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) means a computer that can run the same calculations as a Turing machine. Turing machines can get into infinite loops, and the EVM cannot because it would run out of gas, so it's only quasi-Turing-complete.
## <span dir="ltr">9.1</span> بنیادی باتیں {#91-basics}

یہ سیکشن EVM کی بنیادی باتیں بتاتا ہے اور یہ کہ اس کا دیگر کمپیوٹیشنل ماڈلز سے کیسے موازنہ کیا جاتا ہے۔

ایک [اسٹیک مشین](https://en.wikipedia.org/wiki/Stack_machine) ایک ایسا کمپیوٹر ہے جو درمیانی ڈیٹا کو رجسٹرز میں نہیں، بلکہ ایک [**اسٹیک**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>) میں اسٹور کرتا ہے۔ ورچوئل مشینوں کے لیے یہ ترجیحی فن تعمیر ہے کیونکہ اسے نافذ کرنا آسان ہے جس کا مطلب ہے کہ بگز، اور سیکیورٹی کے خطرات کا امکان بہت کم ہوتا ہے۔ اسٹیک میں میموری کو <span dir="ltr">256-bit</span> الفاظ میں تقسیم کیا گیا ہے۔ اسے اس لیے منتخب کیا گیا کیونکہ یہ ایتھیریم کے بنیادی کرپٹوگرافک آپریشنز جیسے کیچاک-۲۵۶ ہیشنگ اور بیضوی منحنی کی گنتی کے لیے آسان ہے۔ اسٹیک کا زیادہ سے زیادہ سائز 1024 آئٹمز (<span dir="ltr">1024 x 256 bits</span>) ہے۔ جب آپ کوڈز پر عمل درآمد کیا جاتا ہے تو وہ عام طور پر اپنے پیرامیٹرز اسٹیک سے حاصل کر رہے ہوتے ہیں۔ اسٹیک میں عناصر کو دوبارہ ترتیب دینے کے لیے خاص طور پر آپ کوڈز موجود ہیں جیسے `POP` (اسٹیک کے اوپری حصے سے آئٹم کو ہٹاتا ہے)، `DUP_N` (اسٹیک میں Nویں آئٹم کی نقل بناتا ہے)، وغیرہ۔

EVM میں ایک غیر مستحکم (volatile) جگہ بھی ہوتی ہے جسے **میموری** کہا جاتا ہے جو عمل درآمد کے دوران ڈیٹا کو اسٹور کرنے کے لیے استعمال ہوتی ہے۔ اس میموری کو <span dir="ltr">32-byte</span> الفاظ میں منظم کیا گیا ہے۔ تمام میموری کے مقامات کو صفر پر شروع کیا جاتا ہے۔ اگر آپ میموری میں ایک لفظ شامل کرنے کے لیے اس [Yul](https://docs.soliditylang.org/en/latest/yul.html) کوڈ پر عمل درآمد کرتے ہیں، تو یہ لفظ میں خالی جگہ کو صفر سے بھر کر میموری کے 32 بائٹس کو بھر دے گا، یعنی، یہ ایک لفظ بناتا ہے - جس میں <span dir="ltr">0-29</span> مقامات پر صفر، 30 پر <span dir="ltr">0x60</span>، اور 31 پر <span dir="ltr">0xA7</span> ہوتا ہے۔

```yul
mstore(0, 0x60A7)
```

`mstore` ان تین آپ کوڈز میں سے ایک ہے جو EVM میموری کے ساتھ تعامل کے لیے فراہم کرتا ہے - یہ میموری میں ایک لفظ لوڈ کرتا ہے۔ دیگر دو `mstore8` ہیں جو میموری میں ایک بائٹ لوڈ کرتا ہے، اور `mload` جو میموری سے اسٹیک میں ایک لفظ منتقل کرتا ہے۔

EVM میں ایک الگ پائیدار (non-volatile) **اسٹوریج** ماڈل بھی ہے جسے سسٹم کی حالت کے حصے کے طور پر برقرار رکھا جاتا ہے - یہ میموری <span dir="ltr">256-bit</span> کلیدوں کو <span dir="ltr">256-bit</span> اقدار سے میپ کرتی ہے (میموری کے برعکس، جو ایک بائٹ-ایڈریس ایبل سرنی ہے)۔ یہ اسٹوریج وہ جگہ ہے جہاں کنٹریکٹس مستقل ڈیٹا رکھتے ہیں - ایک کنٹریکٹ صرف اپنے اسٹوریج کے ساتھ تعامل کر سکتا ہے۔ اسٹوریج کو کلید-قدر (key-value) میپنگز میں منظم کیا گیا ہے۔

کینکون اپ گریڈ کے بعد سے، **عارضی اسٹوریج** ([<span dir="ltr">EIP-1153</span>](https://eips.ethereum.org/EIPS/eip-1153)) بھی موجود ہے۔ اس تک اسٹوریج کی طرح رسائی حاصل کی جاتی ہے، `TLOAD` اور `TSTORE` آپ کوڈز کا استعمال کرتے ہوئے، لیکن اسے ہر ٹرانزیکشن کے اختتام پر صاف کر دیا جاتا ہے۔

اگرچہ یلو پیپر کے اس حصے میں اس کا ذکر نہیں کیا گیا ہے، لیکن یہ جاننا بھی مفید ہے کہ میموری کی ایک اور قسم بھی ہے۔ **کال ڈیٹا** بائٹ-ایڈریس ایبل ریڈ-اونلی میموری ہے جو ٹرانزیکشن کے `data` پیرامیٹر کے ساتھ پاس کی گئی قدر کو اسٹور کرنے کے لیے استعمال ہوتی ہے۔ EVM میں `calldata` کو منظم کرنے کے لیے مخصوص آپ کوڈز ہیں۔ `calldatasize` ڈیٹا کا سائز واپس کرتا ہے۔ `calldataload` ڈیٹا کو اسٹیک میں لوڈ کرتا ہے۔ `calldatacopy` ڈیٹا کو میموری میں کاپی کرتا ہے۔

معیاری [Von Neumann فن تعمیر](https://en.wikipedia.org/wiki/Von_Neumann_architecture) کوڈ اور ڈیٹا کو ایک ہی میموری میں اسٹور کرتا ہے۔ EVM سیکیورٹی وجوہات کی بنا پر اس معیار کی پیروی نہیں کرتا - غیر مستحکم میموری کا اشتراک پروگرام کوڈ کو تبدیل کرنا ممکن بناتا ہے۔ اس کے بجائے، کوڈ کو دنیا کی حالت میں کنٹریکٹ کے اکاؤنٹ کے حصے کے طور پر ناقابل تغیر طور پر اسٹور کیا جاتا ہے، جو میموری اور کنٹریکٹ کے اسٹوریج دونوں سے الگ ہوتا ہے۔

صرف دو صورتیں ہیں جن میں کوڈ کو میموری سے عمل میں لایا جاتا ہے:

- جب ایک کنٹریکٹ دوسرا کنٹریکٹ بناتا ہے ([`CREATE`](https://www.evm.codes/#f0) یا [`CREATE2`](https://www.evm.codes/#f5) کا استعمال کرتے ہوئے)، تو کنٹریکٹ کنسٹرکٹر کا کوڈ میموری سے آتا ہے۔
- _کسی بھی_ کنٹریکٹ کی تخلیق کے دوران، کنسٹرکٹر کوڈ چلتا ہے اور پھر اصل کنٹریکٹ کے کوڈ کے ساتھ واپس آتا ہے، وہ بھی میموری سے۔

غیر معمولی عمل درآمد (exceptional execution) کی اصطلاح کا مطلب ایک ایسی استثنا (exception) ہے جو موجودہ کنٹریکٹ کے عمل درآمد کو روکنے کا سبب بنتی ہے۔

## <span dir="ltr">9.2</span> فیس کا جائزہ {#92-fees-overview}

یہ سیکشن بتاتا ہے کہ گیس کی فیس کا حساب کیسے لگایا جاتا ہے۔ اس کی تین لاگتیں ہیں:

### Opcode cost {#opcode-cost}

The inherent cost of the specific opcode. To get this value, find the cost group of the opcode in Appendix H (p. 29, under equation (329)), and find the cost group in equation (326). This gives you a cost function, which in most cases uses parameters from Appendix G (p. 28).

For example, the opcode [`CALLDATACOPY`](https://www.evm.codes/#37) is a member of group _W<sub>copy</sub>_. The opcode cost for that group is _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Looking at Appendix G, we see that both constants are 3, which gives us _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

We still need to decipher the expression _⌈μ<sub>s</sub>[2]÷32⌉_. The outmost part, _⌈ \<value\> ⌉_ is the ceiling function, a function that given a value returns the smallest integer that is still not smaller than the value. For example, _⌈2.5⌉ = ⌈3⌉ = 3_. The inner part is _μ<sub>s</sub>[2]÷32_. Looking at section 3 (Conventions) on p. 3, _μ_ is the machine state. The machine state is defined in section 9.4.1 on p. 15. According to that section, one of the machine state parameters is _s_ for the stack. Putting it all together, it seems that _μ<sub>s</sub>[2]_ is location #2 in the stack. Looking at [the opcode](https://www.evm.codes/#37), location #2 in the stack is the size of the data in bytes. Looking at the other opcodes in group W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) and [`RETURNDATACOPY`](https://www.evm.codes/#3e), they also have a size of data in the same location. So _⌈μ<sub>s</sub>[2]÷32⌉_ is the number of 32 byte words required to store the data being copied. Putting everything together, the inherent cost of [`CALLDATACOPY`](https://www.evm.codes/#37) is 3 gas plus 3 per word of data being copied.
### چلانے کی لاگت {#running-cost}

اس کوڈ کو چلانے کی لاگت جسے ہم کال کر رہے ہیں۔

- [`CREATE`](https://www.evm.codes/#f0) اور [`CREATE2`](https://www.evm.codes/#f5) کے معاملے میں، نئے کنٹریکٹ کے لیے کنسٹرکٹر۔
- [`CALL`](https://www.evm.codes/#f1)، [`CALLCODE`](https://www.evm.codes/#f2)، [`STATICCALL`](https://www.evm.codes/#fa)، یا [`DELEGATECALL`](https://www.evm.codes/#f4) کے معاملے میں، وہ کنٹریکٹ جسے ہم کال کرتے ہیں۔

### Expanding memory cost {#expanding-memory-cost}

The cost of expanding memory (if necessary).

In equation 326, this value is written as _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Looking at section 9.4.1 again, we see that _μ<sub>i</sub>_ is the number of words in memory. So _μ<sub>i</sub>_ is the number of words in memory before the opcode and _μ<sub>i</sub>'_ is the number of words in memory after the opcode.

The function _C<sub>mem</sub>_ is defined in equation 328: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ is the floor function, a function that given a value returns the largest integer that is still not larger than the value. For example, _⌊2.5⌋ = ⌊2⌋ = 2._ When _a < √512_, _a<sup>2</sup> < 512_, and the result of the floor function is zero. So for the first 22 words (704 bytes), the cost rises linearly with the number of memory words required. Beyond that point _⌊a<sup>2</sup> ÷ 512⌋_ is positive. When the memory required is high enough the gas cost is proportional to the square of the amount of memory.

**Note** that these factors only influence the _inherent_ gas cost - it does not take into account the fee market or tips to validators that determine how much an end user is required to pay - this is just the raw cost of running a particular operation on the EVM.

[Read more about gas](/developers/docs/gas/).
## <span dir="ltr">9.3</span> عمل درآمد کا ماحول {#93-execution-env}

عمل درآمد کا ماحول ایک ٹوپل (tuple)، _I_ ہے، جس میں وہ معلومات شامل ہیں جو بلاک چین کی حالت یا EVM کا حصہ نہیں ہیں۔

| پیرامیٹر | ڈیٹا تک رسائی کے لیے آپ کوڈ | ڈیٹا تک رسائی کے لیے Solidity کوڈ |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30) | `address(this)` |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32) | `tx.origin` |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a) | `tx.gasprice` |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35)، وغیرہ۔ | `msg.data` |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33) | `msg.sender` |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34) | `msg.value` |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39) | `address(this).code` |
| _I<sub>H</sub>_ | بلاک ہیڈر فیلڈز، جیسے [`NUMBER`](https://www.evm.codes/#43) اور [`PREVRANDAO`](https://www.evm.codes/#44) | `block.number`، `block.prevrandao`، وغیرہ۔ |
| _I<sub>e</sub>_ | کنٹریکٹس کے درمیان کالز کے لیے کال اسٹیک کی گہرائی (بشمول کنٹریکٹ کی تخلیق) |
| _I<sub>w</sub>_ | کیا EVM کو حالت تبدیل کرنے کی اجازت ہے، یا یہ جامد (statically) طور پر چل رہا ہے |

سیکشن 9 کے باقی حصے کو سمجھنے کے لیے کچھ اور پیرامیٹرز ضروری ہیں:

| پیرامیٹر | سیکشن میں بیان کردہ | معنی |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_ | 2 (صفحہ 2، مساوات 1) | بلاک چین کی حالت |
| _g_ | <span dir="ltr">9.3</span> (صفحہ 14) | باقی ماندہ گیس |
| _A_ | <span dir="ltr">6.1</span> (صفحہ 9) | جمع شدہ ذیلی حالت (ٹرانزیکشن ختم ہونے پر شیڈول کی گئی تبدیلیاں) |
| _o_ | <span dir="ltr">9.3</span> (صفحہ 14) | آؤٹ پٹ - اندرونی ٹرانزیکشن کی صورت میں واپس کیا گیا نتیجہ (جب ایک کنٹریکٹ دوسرے کو کال کرتا ہے) اور ویو فنکشنز (view functions) کو کالز (جب آپ صرف معلومات مانگ رہے ہوں، اس لیے ٹرانزیکشن کا انتظار کرنے کی ضرورت نہیں ہے) |

## 9.4 Execution overview {#94-execution-overview}

Now that have all the preliminaries, we can finally start working on how the EVM works.

Equations 146-151 give us the initial conditions for running the EVM:

| Symbol           | Initial value | Meaning                                                                                                                                                                                                                                                     |
| ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_           | Gas remaining                                                                                                                                                                                                                                               |
| _μ<sub>pc</sub>_ | _0_           | Program counter, the address of the next instruction to execute                                                                                                                                                                                             |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memory, initialized to all zeros                                                                                                                                                                                                                            |
| _μ<sub>i</sub>_  | _0_           | Highest memory location used                                                                                                                                                                                                                                |
| _μ<sub>s</sub>_  | _()_          | The stack, initially empty                                                                                                                                                                                                                                  |
| _μ<sub>o</sub>_  | _∅_           | The output, empty set until and unless we stop either with return data ([`RETURN`](https://www.evm.codes/#f3) or [`REVERT`](https://www.evm.codes/#fd)) or without it ([`STOP`](https://www.evm.codes/#00) or [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Equation 152 tells us there are four possible conditions at each point in time during execution, and what to do with them:

1.  `Z(σ,μ,A,I)`. Z represents a function that tests whether an operation creates an invalid state transition (see [exceptional halting](#942-exceptional-halt)). If it evaluates to True, the new state is identical to the old one (except gas gets burned) because the changes have not been implemented.
2.  If the opcode being executed is [`REVERT`](https://www.evm.codes/#fd), the new state is the same as the old state, some gas is lost.
3.  If the sequence of operations is finished, as signified by a [`RETURN`](https://www.evm.codes/#f3)), the state is updated to the new state.
4.  If we aren't at one of the end conditions 1-3, continue running.
## <span dir="ltr">9.4.1</span> مشین کی حالت {#941-machine-state}

یہ سیکشن مشین کی حالت کو مزید تفصیل سے بیان کرتا ہے۔ یہ بتاتا ہے کہ _w_ موجودہ آپ کوڈ ہے۔ اگر _μ<sub>pc</sub>_ کوڈ کی لمبائی _||I<sub>b</sub>||_ سے کم ہے، تو وہ بائٹ (_I<sub>b</sub>[μ<sub>pc</sub>]_) آپ کوڈ ہے۔ بصورت دیگر، آپ کوڈ کو [`STOP`](https://www.evm.codes/#00) کے طور پر بیان کیا جاتا ہے۔

چونکہ یہ ایک [اسٹیک مشین](https://en.wikipedia.org/wiki/Stack_machine) ہے، اس لیے ہمیں ہر آپ کوڈ کے ذریعے نکالے گئے (_δ_) اور ڈالے گئے (_α_) آئٹمز کی تعداد کا ٹریک رکھنے کی ضرورت ہے۔

## <span dir="ltr">9.4.2</span> غیر معمولی رکاوٹ (Exceptional Halting) {#942-exceptional-halt}

یہ سیکشن _Z_ فنکشن کی وضاحت کرتا ہے، جو یہ بتاتا ہے کہ کب ہمارا غیر معمولی اختتام ہوتا ہے۔ یہ ایک [بولین (Boolean)](https://en.wikipedia.org/wiki/Boolean_data_type) فنکشن ہے، اس لیے یہ [منطقی 'یا' (logical or) کے لیے _∨_](https://en.wikipedia.org/wiki/Logical_disjunction) اور [منطقی 'اور' (logical and) کے لیے _∧_](https://en.wikipedia.org/wiki/Logical_conjunction) کا استعمال کرتا ہے۔

اگر ان میں سے کوئی بھی شرط درست ہو تو ہمارے پاس ایک غیر معمولی رکاوٹ ہوتی ہے:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  جیسا کہ ہم نے سیکشن <span dir="ltr">9.2</span> میں دیکھا، _C_ وہ فنکشن ہے جو گیس کی لاگت کی وضاحت کرتا ہے۔ اگلے آپ کوڈ کو کور کرنے کے لیے کافی گیس باقی نہیں ہے۔

- **_δ<sub>w</sub>=∅_**
  اگر کسی آپ کوڈ کے لیے نکالے گئے (popped) آئٹمز کی تعداد غیر متعین ہے، تو آپ کوڈ خود غیر متعین ہے۔

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  اسٹیک انڈر فلو، موجودہ آپ کوڈ کے لیے اسٹیک میں کافی آئٹمز نہیں ہیں۔

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  آپ کوڈ [`JUMP`](https://www.evm.codes/#56) ہے اور پتہ [`JUMPDEST`](https://www.evm.codes/#5b) نہیں ہے۔ جمپس _صرف_ اس وقت درست ہوتے ہیں جب منزل ایک [`JUMPDEST`](https://www.evm.codes/#5b) ہو۔

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  آپ کوڈ [`JUMPI`](https://www.evm.codes/#57) ہے، شرط درست ہے (غیر صفر) اس لیے جمپ ہونا چاہیے، اور پتہ [`JUMPDEST`](https://www.evm.codes/#5b) نہیں ہے۔ جمپس _صرف_ اس وقت درست ہوتے ہیں جب منزل ایک [`JUMPDEST`](https://www.evm.codes/#5b) ہو۔

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  آپ کوڈ [`RETURNDATACOPY`](https://www.evm.codes/#3e) ہے۔ اس آپ کوڈ میں اسٹیک عنصر _μ<sub>s</sub>[1]_ ریٹرن ڈیٹا بفر میں پڑھنے کے لیے آفسیٹ ہے، اور اسٹیک عنصر _μ<sub>s</sub>[2]_ ڈیٹا کی لمبائی ہے۔ یہ شرط اس وقت پیش آتی ہے جب آپ ریٹرن ڈیٹا بفر کے اختتام سے آگے پڑھنے کی کوشش کرتے ہیں۔ نوٹ کریں کہ کال ڈیٹا یا خود کوڈ کے لیے ایسی کوئی شرط نہیں ہے۔ جب آپ ان بفرز کے اختتام سے آگے پڑھنے کی کوشش کرتے ہیں تو آپ کو صرف صفر ملتے ہیں۔

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  اسٹیک اوور فلو۔ اگر آپ کوڈ چلانے کے نتیجے میں 1024 سے زیادہ آئٹمز کا اسٹیک بنتا ہے، تو منسوخ کر دیں۔

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  کیا ہم جامد (statically) طور پر چل رہے ہیں ([¬ نفی (negation) ہے](https://en.wikipedia.org/wiki/Negation) اور _I<sub>w</sub>_ اس وقت درست ہوتا ہے جب ہمیں بلاک چین کی حالت تبدیل کرنے کی اجازت ہوتی ہے)؟ اگر ایسا ہے، اور ہم حالت تبدیل کرنے والے آپریشن کی کوشش کر رہے ہیں، تو یہ نہیں ہو سکتا۔

  فنکشن _W(w,μ)_ کو بعد میں مساوات 159 میں بیان کیا گیا ہے۔ _W(w,μ)_ درست ہے اگر ان میں سے کوئی ایک شرط درست ہو:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    یہ آپ کوڈز حالت کو تبدیل کرتے ہیں، یا تو نیا کنٹریکٹ بنا کر، کوئی قدر اسٹور کر کے، یا موجودہ کنٹریکٹ کی خود تلفی کر کے۔ `TSTORE`، جسے یلو پیپر کے اس ورژن کے بعد شامل کیا گیا تھا، جامد سیاق و سباق میں بھی ممنوع ہے۔

  - **_LOG0≤w ∧ w≤LOG4_**
    اگر ہمیں جامد طور پر کال کیا جاتا ہے تو ہم لاگ اندراجات خارج نہیں کر سکتے۔
    لاگ آپ کوڈز تمام [`LOG0` (<span dir="ltr">A0</span>)](https://www.evm.codes/#a0) اور [`LOG4` (<span dir="ltr">A4</span>)](https://www.evm.codes/#a4) کے درمیان کی حد میں ہیں۔
    لاگ آپ کوڈ کے بعد کا نمبر بتاتا ہے کہ لاگ اندراج میں کتنے موضوعات شامل ہیں۔
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    جب آپ جامد ہوں تو آپ کسی دوسرے کنٹریکٹ کو کال کر سکتے ہیں، لیکن اگر آپ ایسا کرتے ہیں تو آپ اسے ETH منتقل نہیں کر سکتے۔

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  آپ [`SSTORE`](https://www.evm.codes/#55) نہیں چلا سکتے جب تک کہ آپ کے پاس G<sub>callstipend</sub> (ضمیمہ G میں 2300 کے طور پر بیان کیا گیا ہے) سے زیادہ گیس نہ ہو۔

## 9.4.3 Jump Destination Validity {#943-jump-dest-valid}

Here we formally define what are the [`JUMPDEST`](https://www.evm.codes/#5b) opcodes. We cannot just look for byte value 0x5B, because it might be inside a PUSH (and therefore data and not an opcode).

In equation (162) we define a function, _N(i,w)_. The first parameter, _i_, is the opcode's location. The second, _w_, is the opcode itself. If _w∈[PUSH1, PUSH32]_ that means the opcode is a PUSH (square brackets define a range that includes the endpoints). If that case the next opcode is at _i+2+(w−PUSH1)_. For [`PUSH1`](https://www.evm.codes/#60) we need to advance by two bytes (the PUSH itself and the one byte value), for [`PUSH2`](https://www.evm.codes/#61) we need to advance by three bytes because it's a two byte value, etc. All other EVM opcodes are just one byte long, so in all other cases _N(i,w)=i+1_.

This function is used in equation (161) to define _D<sub>J</sub>(c,i)_, which is the [set](<https://en.wikipedia.org/wiki/Set_(mathematics)>) of all valid jump destinations in code _c_, starting with opcode location _i_. This function is defined recursively. If _i≥||c||_, that means that we're at or after the end of the code. We are not going to find any more jump destinations, so just return the empty set.

In all other cases we look at the rest of the code by going to the next opcode and getting the set starting from it. _c[i]_ is the current opcode, so _N(i,c[i])_ is the location of the next opcode. _D<sub>J</sub>(c,N(i,c[i]))_ is therefore the set of valid jump destinations that starts at the next opcode. If the current opcode isn't a `JUMPDEST`, just return that set. If it is `JUMPDEST`, include it in the result set and return that.
## <span dir="ltr">9.4.4</span> عام رکاوٹ (Normal halting) {#944-normal-halt}

رکاوٹ کا فنکشن (halting function) _H_، تین قسم کی اقدار واپس کر سکتا ہے۔

- اگر ہم ہالٹ (halt) آپ کوڈ میں نہیں ہیں، تو _∅_، خالی سیٹ واپس کریں۔ روایت کے مطابق، اس قدر کی تشریح بولین (Boolean) غلط (false) کے طور پر کی جاتی ہے۔
- اگر ہمارے پاس ایک ہالٹ آپ کوڈ ہے جو آؤٹ پٹ پیدا نہیں کرتا ہے (یا تو [`STOP`](https://www.evm.codes/#00) یا [`SELFDESTRUCT`](https://www.evm.codes/#ff))، تو واپسی کی قدر کے طور پر صفر بائٹس کے سائز کی ایک ترتیب واپس کریں۔ نوٹ کریں کہ یہ خالی سیٹ سے بہت مختلف ہے۔ اس قدر کا مطلب ہے کہ EVM واقعی رک گیا تھا، بس پڑھنے کے لیے کوئی ریٹرن ڈیٹا نہیں ہے۔ (یہ بھی نوٹ کریں کہ [<span dir="ltr">EIP-6780</span>](https://eips.ethereum.org/EIPS/eip-6780) کے بعد سے، `SELFDESTRUCT` کنٹریکٹ کو صرف اسی صورت میں حذف کرتا ہے اگر اسے اسی ٹرانزیکشن میں کال کیا جائے جس نے کنٹریکٹ بنایا تھا۔ بصورت دیگر، یہ صرف کنٹریکٹ کا ETH منتقل کرتا ہے۔)
- اگر ہمارے پاس ایک ہالٹ آپ کوڈ ہے جو آؤٹ پٹ پیدا کرتا ہے (یا تو [`RETURN`](https://www.evm.codes/#f3) یا [`REVERT`](https://www.evm.codes/#fd))، تو اس آپ کوڈ کے ذریعہ متعین کردہ بائٹس کی ترتیب واپس کریں۔ یہ ترتیب میموری سے لی گئی ہے، اسٹیک کے اوپری حصے کی قدر (_μ<sub>s</sub>[0]_) پہلا بائٹ ہے، اور اس کے بعد کی قدر (_μ<sub>s</sub>[1]_) لمبائی ہے۔

## <span dir="ltr">H.2</span> ہدایات کا مجموعہ {#h2-instruction-set}

اس سے پہلے کہ ہم <span dir="ltr">EVM</span> کے آخری ذیلی حصے، <span dir="ltr">9.5</span> کی طرف بڑھیں، آئیے خود ہدایات پر ایک نظر ڈالتے ہیں۔ ان کی وضاحت ضمیمہ <span dir="ltr">H.2</span> میں کی گئی ہے جو صفحہ <span dir="ltr">30</span> سے شروع ہوتا ہے۔ کوئی بھی چیز جس کے بارے میں یہ واضح نہیں کیا گیا کہ وہ اس مخصوص آپ کوڈ کے ساتھ تبدیل ہو رہی ہے، اس کے بارے میں توقع کی جاتی ہے کہ وہ ویسے ہی رہے گی۔ جو متغیرات تبدیل ہوتے ہیں انہیں \<something\>′ کے طور پر واضح کیا جاتا ہے۔

مثال کے طور پر، آئیے [`ADD`](https://www.evm.codes/#01) آپ کوڈ پر ایک نظر ڈالتے ہیں۔

| قدر | نیمونک | δ | α | تفصیل |
| ----: | -------- | --- | --- | --------------------------------------------------------- |
| 0x01 | ADD | 2 | 1 | جمع کا عمل۔ |
| | | | | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ ان اقدار کی تعداد ہے جو ہم اسٹیک سے نکالتے (pop) ہیں۔ اس صورت میں دو، کیونکہ ہم اوپر کی دو اقدار کو جمع کر رہے ہیں۔

_α_ ان اقدار کی تعداد ہے جو ہم واپس ڈالتے (push) ہیں۔ اس صورت میں ایک، یعنی مجموعہ۔

لہذا نیا اسٹیک ٹاپ (_μ′<sub>s</sub>[0]_) پرانے اسٹیک ٹاپ (_μ<sub>s</sub>[0]_) اور اس کے نیچے موجود پرانی قدر (_μ<sub>s</sub>[1]_) کا مجموعہ ہے۔

تمام آپ کوڈز کی ایک طویل اور بورنگ فہرست پر نظر ڈالنے کے بجائے، یہ مضمون صرف ان آپ کوڈز کی وضاحت کرتا ہے جو کچھ نیا متعارف کراتے ہیں۔

| قدر | نیمونک | δ | α | تفصیل |
| ----: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
| 0x20 | KECCAK256 | 2 | 1 | کیچاک-۲۵۶ ہیش کا حساب لگائیں۔ |
| | | | | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
| | | | | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_ |

یہ پہلا آپ کوڈ ہے جو میموری تک رسائی حاصل کرتا ہے (اس صورت میں، صرف پڑھنے کے لیے)۔ تاہم، یہ میموری کی موجودہ حدود سے آگے بڑھ سکتا ہے، اس لیے ہمیں _μ<sub>i</sub>_ کو اپ ڈیٹ کرنے کی ضرورت ہے۔ ہم یہ صفحہ <span dir="ltr">30</span> پر مساوات <span dir="ltr">330</span> میں بیان کردہ _M_ فنکشن کا استعمال کرتے ہوئے کرتے ہیں۔

| قدر | نیمونک | δ | α | تفصیل |
| ----: | -------- | --- | --- | --------------------------------- |
| 0x31 | BALANCE | 1 | 1 | دیے گئے اکاؤنٹ کا بیلنس حاصل کریں۔ |
| | | | | ... |

وہ پتہ جس کا بیلنس ہمیں تلاش کرنے کی ضرورت ہے وہ _μ<sub>s</sub>[0] mod 2<sup>160</sup>_ ہے۔ اسٹیک کا اوپری حصہ پتہ ہے، لیکن چونکہ پتے صرف <span dir="ltr">160 bits</span> کے ہوتے ہیں، اس لیے ہم قدر کا [ماڈیولو (modulo)](https://en.wikipedia.org/wiki/Modulo_operation) <span dir="ltr">2<sup>160</sup></span> حساب لگاتے ہیں۔

اگر _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_ ہے، تو اس کا مطلب ہے کہ اس پتے کے بارے میں معلومات موجود ہیں۔ اس صورت میں، _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ اس پتے کا بیلنس ہے۔ اگر _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_ ہے، تو اس کا مطلب ہے کہ یہ پتہ غیر شروع شدہ (uninitialized) ہے اور بیلنس صفر ہے۔ آپ صفحہ <span dir="ltr">4</span> پر سیکشن <span dir="ltr">4.1</span> میں اکاؤنٹ کی معلومات کے فیلڈز کی فہرست دیکھ سکتے ہیں۔

دوسری مساوات، _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>\}_، گرم اسٹوریج (وہ اسٹوریج جس تک حال ہی میں رسائی حاصل کی گئی ہو اور جس کے کیشے (cached) ہونے کا امکان ہو) اور ٹھنڈے اسٹوریج (وہ اسٹوریج جس تک رسائی حاصل نہ کی گئی ہو اور جس کے سست اسٹوریج میں ہونے کا امکان ہو جسے بازیافت کرنا زیادہ مہنگا ہو) تک رسائی کی لاگت میں فرق سے متعلق ہے۔ _A<sub>a</sub>_ ان پتوں کی فہرست ہے جن تک ٹرانزیکشن کے ذریعے پہلے رسائی حاصل کی گئی تھی، اس لیے ان تک رسائی سستی ہونی چاہیے، جیسا کہ صفحہ <span dir="ltr">9</span> پر سیکشن <span dir="ltr">6.1</span> میں بیان کیا گیا ہے۔ آپ اس موضوع کے بارے میں مزید [<span dir="ltr">EIP-2929</span>](https://eips.ethereum.org/EIPS/eip-2929) میں پڑھ سکتے ہیں۔

| قدر | نیمونک | δ | α | تفصیل |
| ----: | -------- | --- | --- | --------------------------------------- |
| 0x8F | DUP16 | 16 | 17 | اسٹیک کے <span dir="ltr">16</span> ویں آئٹم کی نقل بنائیں۔ |
| | | | | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

نوٹ کریں کہ کسی بھی اسٹیک آئٹم کو استعمال کرنے کے لیے، ہمیں اسے نکالنا (pop) پڑتا ہے، جس کا مطلب ہے کہ ہمیں اس کے اوپر موجود تمام اسٹیک آئٹمز کو بھی نکالنا ہوگا۔ [`DUP<n>`](https://www.evm.codes/#8f) اور [`SWAP<n>`](https://www.evm.codes/#9f) کے معاملے میں، اس کا مطلب ہے کہ سولہ اقدار تک کو نکالنا اور پھر واپس ڈالنا (push) پڑتا ہے۔
## <span dir="ltr">9.5</span> عمل درآمد کا چکر {#95-exec-cycle}

اب چونکہ ہمارے پاس تمام حصے موجود ہیں، ہم بالآخر سمجھ سکتے ہیں کہ <span dir="ltr">EVM</span> کے عمل درآمد کے چکر کو کس طرح دستاویزی شکل دی گئی ہے۔

مساوات (<span dir="ltr">164</span>) کہتی ہے کہ دی گئی حالت کے مطابق:

- _σ_ (عالمی بلاک چین کی حالت)
- _μ_ (<span dir="ltr">EVM</span> کی حالت)
- _A_ (ذیلی حالت، وہ تبدیلیاں جو ٹرانزیکشن کے ختم ہونے پر ہوں گی)
- _I_ (عمل درآمد کا ماحول)

نئی حالت _(σ', μ', A', I')_ ہے۔

مساوات (<span dir="ltr">165</span>)-(<span dir="ltr">167</span>) اسٹیک اور ایک آپ کوڈ (_μ<sub>s</sub>_) کی وجہ سے اس میں ہونے والی تبدیلی کی وضاحت کرتی ہیں۔ مساوات (<span dir="ltr">168</span>) گیس (_μ<sub>g</sub>_) میں تبدیلی ہے۔ مساوات (<span dir="ltr">169</span>) پروگرام کاؤنٹر (_μ<sub>pc</sub>_) میں تبدیلی ہے۔ آخر میں، مساوات (<span dir="ltr">170</span>)-(<span dir="ltr">173</span>) یہ واضح کرتی ہیں کہ دیگر پیرامیٹرز ویسے ہی رہتے ہیں، جب تک کہ آپ کوڈ کے ذریعے واضح طور پر تبدیل نہ کیے جائیں۔

اس کے ساتھ <span dir="ltr">EVM</span> کی مکمل وضاحت ہو جاتی ہے۔
## نتیجہ {#conclusion}

ریاضیاتی اشارے (Mathematical notation) قطعی ہیں اور انہوں نے یلو پیپر کو ایتھیریم کی ہر تفصیل کی وضاحت کرنے کی اجازت دی ہے۔ تاہم، اس کی کچھ خامیاں ہیں:

- اسے صرف انسان ہی سمجھ سکتے ہیں، جس کا مطلب ہے کہ [تعمیل کے ٹیسٹ (compliance tests)](https://github.com/ethereum/tests) دستی طور پر لکھے جانے چاہئیں۔
- پروگرامرز کمپیوٹر کوڈ کو سمجھتے ہیں۔
  وہ ریاضیاتی اشارے کو سمجھ بھی سکتے ہیں اور نہیں بھی۔

ان وجوہات کی بنا پر، [اتفاق رائے کی تہہ کی تفصیلات](https://github.com/ethereum/consensus-specs) Python میں لکھی گئی ہیں، اور اسی طرح [عمل درآمد کی تہہ کی تفصیلات](https://github.com/ethereum/execution-specs) بھی۔ Python عمل درآمد کی تہہ کی تفصیلات اب EVM کے کام کرنے کے طریقے کے لیے برقرار رکھا گیا حوالہ ہے، اور اس میں ان اپ گریڈز کی تبدیلیاں شامل ہیں جن کا یلو پیپر احاطہ نہیں کرتا ہے۔ یلو پیپر اب بھی ایک مفید رسمی تفصیل ہے، اور اسے پڑھنے کے قابل ہونا آپ کو دیگر متعلقہ ریاضیاتی مقالے پڑھنے میں مدد کرتا ہے۔
