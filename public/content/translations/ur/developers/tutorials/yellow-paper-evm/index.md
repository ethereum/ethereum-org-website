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

ایتھیریم میں تقریباً ہر دوسری چیز کی طرح، یلو پیپر بھی وقت کے ساتھ ساتھ ارتقاء پذیر ہوتا ہے۔ کسی مخصوص ورژن کا حوالہ دینے کے قابل ہونے کے لیے، میں نے [لکھتے وقت کا موجودہ ورژن](https://ethereum.github.io/yellowpaper/paper.pdf) اپ لوڈ کر دیا ہے۔ میں جو سیکشن، صفحہ، اور مساوات کے نمبر استعمال کروں گا وہ اسی ورژن کا حوالہ دیں گے۔ اس دستاویز کو پڑھتے وقت اسے کسی دوسری ونڈو میں کھلا رکھنا ایک اچھا خیال ہے۔

### <span dir="ltr">EVM</span> کیوں؟ {#why-the-evm}

اصل یلو پیپر ایتھیریم کی ترقی کے بالکل آغاز میں لکھا گیا تھا۔ یہ اصل ثبوتِ کار (PoW) پر مبنی اتفاق رائے کا طریقہ کار بیان کرتا ہے جو اصل میں نیٹ ورک کو محفوظ بنانے کے لیے استعمال کیا گیا تھا۔ تاہم، ایتھیریم نے ثبوتِ کار (PoW) کو بند کر دیا اور <span dir="ltr">September 2022</span> میں حصہ داری کا ثبوت (PoS) پر مبنی اتفاق رائے کا استعمال شروع کر دیا۔ یہ ٹیوٹوریل یلو پیپر کے ان حصوں پر توجہ مرکوز کرے گا جو ایتھیریم ورچوئل مشین کی وضاحت کرتے ہیں۔ <span dir="ltr">EVM</span> حصہ داری کا ثبوت (PoS) کی طرف منتقلی سے غیر تبدیل شدہ رہا (سوائے DIFFICULTY آپ کوڈ کی واپسی کی قدر کے)۔

## 9 Execution model {#9-execution-model}

This section (p. 14-16) includes most of the definition of the EVM.

The term _system state_ includes everything you need to know about the system to run it. In a typical computer, this means the memory, content of registers, etc.

A [Turing machine](https://en.wikipedia.org/wiki/Turing_machine) is a computational model. Essentially, it is a simplified version of a computer, which is proved to have the same ability to run computations that a normal computer can (everything that a computer can calculate a Turing machine can calculate and vice versa). This model makes it easier to prove various theorems about what is and what isn't computable.

The term [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) means a computer that can run the same calculations as a Turing machine. Turing machines can get into infinite loops, and the EVM cannot because it would run out of gas, so it's only quasi-Turing-complete.
## <span dir="ltr">9.1</span> بنیادی باتیں {#91-basics}

یہ سیکشن <span dir="ltr">EVM</span> کی بنیادی باتیں فراہم کرتا ہے اور یہ بتاتا ہے کہ اس کا دیگر کمپیوٹیشنل ماڈلز سے کیسے موازنہ کیا جاتا ہے۔

ایک [اسٹیک مشین](https://en.wikipedia.org/wiki/Stack_machine) ایک ایسا کمپیوٹر ہے جو درمیانی ڈیٹا کو رجسٹرز میں نہیں، بلکہ ایک [**اسٹیک**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>) میں محفوظ کرتا ہے۔ یہ ورچوئل مشینوں کے لیے ترجیحی فن تعمیر ہے کیونکہ اسے نافذ کرنا آسان ہے جس کا مطلب ہے کہ بگز اور سیکیورٹی کے خطرات کا امکان بہت کم ہوتا ہے۔ اسٹیک میں میموری کو <span dir="ltr">256-bit</span> الفاظ میں تقسیم کیا گیا ہے۔ اسے اس لیے منتخب کیا گیا تھا کیونکہ یہ ایتھیریم کے بنیادی کرپٹوگرافک آپریشنز جیسے کیچاک-۲۵۶ ہیشنگ اور بیضوی منحنی کے حساب کتاب کے لیے آسان ہے۔ اسٹیک کا زیادہ سے زیادہ سائز <span dir="ltr">1024</span> آئٹمز (<span dir="ltr">1024 x 256 bits</span>) ہے۔ جب آپ کوڈز پر عمل درآمد کیا جاتا ہے تو وہ عام طور پر اپنے پیرامیٹرز اسٹیک سے حاصل کر رہے ہوتے ہیں۔ اسٹیک میں عناصر کو دوبارہ ترتیب دینے کے لیے خاص طور پر آپ کوڈز موجود ہیں جیسے `POP` (اسٹیک کے اوپری حصے سے آئٹم کو ہٹاتا ہے)، `DUP_N` (اسٹیک میں N ویں آئٹم کی نقل بناتا ہے)، وغیرہ۔

<span dir="ltr">EVM</span> میں ایک غیر مستقل جگہ بھی ہوتی ہے جسے **میموری** کہا جاتا ہے جو عمل درآمد کے دوران ڈیٹا کو محفوظ کرنے کے لیے استعمال ہوتی ہے۔ یہ میموری <span dir="ltr">32-byte</span> الفاظ میں ترتیب دی گئی ہے۔ تمام میموری کے مقامات کو صفر پر شروع کیا جاتا ہے۔ اگر آپ میموری میں ایک لفظ شامل کرنے کے لیے اس [Yul](https://docs.soliditylang.org/en/latest/yul.html) کوڈ پر عمل درآمد کرتے ہیں، تو یہ لفظ میں خالی جگہ کو صفر سے بھر کر میموری کے <span dir="ltr">32 bytes</span> کو پُر کر دے گا، یعنی یہ ایک لفظ بناتا ہے - جس میں مقامات <span dir="ltr">0-29</span> پر صفر، <span dir="ltr">30</span> پر 0x60، اور <span dir="ltr">31</span> پر 0xA7 ہوتا ہے۔

```yul
mstore(0, 0x60A7)
```

`mstore` ان تین آپ کوڈز میں سے ایک ہے جو <span dir="ltr">EVM</span> میموری کے ساتھ تعامل کے لیے فراہم کرتا ہے - یہ میموری میں ایک لفظ لوڈ کرتا ہے۔ دیگر دو `mstore8` ہیں جو میموری میں ایک بائٹ لوڈ کرتا ہے، اور `mload` جو میموری سے اسٹیک میں ایک لفظ منتقل کرتا ہے۔

<span dir="ltr">EVM</span> میں ایک الگ غیر متزلزل **اسٹوریج** ماڈل بھی ہے جسے سسٹم کی حالت کے حصے کے طور پر برقرار رکھا جاتا ہے - یہ میموری الفاظ کی صفوں (اسٹیک میں ورڈ-ایڈریس ایبل بائٹ صفوں کے برعکس) میں ترتیب دی گئی ہے۔ یہ اسٹوریج وہ جگہ ہے جہاں کنٹریکٹس مستقل ڈیٹا رکھتے ہیں - ایک کنٹریکٹ صرف اپنے اسٹوریج کے ساتھ تعامل کر سکتا ہے۔ اسٹوریج کو کلید-قدر کی میپنگز میں ترتیب دیا گیا ہے۔

اگرچہ یلو پیپر کے اس حصے میں اس کا ذکر نہیں کیا گیا ہے، لیکن یہ جاننا بھی مفید ہے کہ میموری کی ایک چوتھی قسم بھی ہے۔ **کال ڈیٹا** بائٹ-ایڈریس ایبل صرف پڑھنے کے قابل میموری ہے جو ٹرانزیکشن کے `data` پیرامیٹر کے ساتھ پاس کی گئی قدر کو محفوظ کرنے کے لیے استعمال ہوتی ہے۔ <span dir="ltr">EVM</span> کے پاس `calldata` کو منظم کرنے کے لیے مخصوص آپ کوڈز ہیں۔ `calldatasize` ڈیٹا کا سائز واپس کرتا ہے۔ `calldataload` ڈیٹا کو اسٹیک میں لوڈ کرتا ہے۔ `calldatacopy` ڈیٹا کو میموری میں کاپی کرتا ہے۔

معیاری [وان نیومین فن تعمیر](https://en.wikipedia.org/wiki/Von_Neumann_architecture) کوڈ اور ڈیٹا کو ایک ہی میموری میں محفوظ کرتا ہے۔ <span dir="ltr">EVM</span> سیکیورٹی وجوہات کی بنا پر اس معیار کی پیروی نہیں کرتا ہے - غیر مستقل میموری کا اشتراک پروگرام کوڈ کو تبدیل کرنا ممکن بناتا ہے۔ اس کے بجائے، کوڈ کو اسٹوریج میں محفوظ کیا جاتا ہے۔

صرف دو صورتیں ہیں جن میں کوڈ پر میموری سے عمل درآمد کیا جاتا ہے:

- جب ایک کنٹریکٹ دوسرا کنٹریکٹ بناتا ہے ([`CREATE`](https://www.evm.codes/#f0) یا [`CREATE2`](https://www.evm.codes/#f5) کا استعمال کرتے ہوئے)، تو کنٹریکٹ کنسٹرکٹر کا کوڈ میموری سے آتا ہے۔
- _کسی بھی_ کنٹریکٹ کی تخلیق کے دوران، کنسٹرکٹر کوڈ چلتا ہے اور پھر اصل کنٹریکٹ کے کوڈ کے ساتھ واپس آتا ہے، وہ بھی میموری سے۔

اصطلاح غیر معمولی عمل درآمد کا مطلب ایک ایسی استثنا ہے جو موجودہ کنٹریکٹ کے عمل درآمد کو روکنے کا سبب بنتی ہے۔

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
## 9.3 Execution environment {#93-execution-env}

The execution environment is a tuple, _I_, that includes information that isn't part of the blockchain state or the EVM.

| Parameter       | Opcode to access the data                                                                                        | Solidity code to access the data         |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), etc.                                                                | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Block header fields, such as [`NUMBER`](https://www.evm.codes/#43) and [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, etc. |
| _I<sub>e</sub>_ | Depth of the call stack for calls between contracts (including contract creation)                                |
| _I<sub>w</sub>_ | Is the EVM allowed to change state, or is it running statically                                                  |

A few other parameters are necessary to understand the rest of section 9:

| Parameter | Defined in section   | Meaning                                                                                                                                                                                                                  |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_       | 2 (p. 2, equation 1) | The state of the blockchain                                                                                                                                                                                              |
| _g_       | 9.3 (p. 14)          | Remaining gas                                                                                                                                                                                                            |
| _A_       | 6.1 (p. 9)           | Accrued substate (changes scheduled for when the transaction ends)                                                                                                                                                       |
| _o_       | 9.3 (p. 14)          | Output - the returned result in the case of internal transaction (when one contract calls another) and calls to view functions (when you are just asking for information, so there is no need to wait for a transaction) |
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

## 9.4.2 Exceptional Halting {#942-exceptional-halt}

This section defines the _Z_ function, which specifies when we have an abnormal termination. This is a [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type) function, so it uses [_∨_ for a logical or](https://en.wikipedia.org/wiki/Logical_disjunction) and [_∧_ for a logical and](https://en.wikipedia.org/wiki/Logical_conjunction).

We have an exceptional halt if any of these conditions is true:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  As we saw in section 9.2, _C_ is the function that specifies the gas cost. There isn't enough gas left to cover the next opcode.

- **_δ<sub>w</sub>=∅_**
  If the number of items popped for an opcode is undefined, then the opcode itself is undefined.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Stack underflow, not enough items in the stack for the current opcode.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  The opcode is [`JUMP`](https://www.evm.codes/#56) and the address is not a [`JUMPDEST`](https://www.evm.codes/#5b). Jumps are _only_ valid when the destination is a [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  The opcode is [`JUMPI`](https://www.evm.codes/#57), the condition is true (non zero) so the jump should happen, and the address is not a [`JUMPDEST`](https://www.evm.codes/#5b). Jumps are _only_ valid when the destination is a [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  The opcode is [`RETURNDATACOPY`](https://www.evm.codes/#3e). In this opcode stack element _μ<sub>s</sub>[1]_ is the offset to read from in the return data buffer, and stack element _μ<sub>s</sub>[2]_ is the length of data. This condition occurs when you try to read beyond the end of the return data buffer. Note that there isn't a similar condition for the calldata or for the code itself. When you try to read beyond the end of those buffers you just get zeros.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Stack overflow. If running the opcode will result in a stack of over 1024 items, abort.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Are we running statically ([¬ is negation](https://en.wikipedia.org/wiki/Negation) and _I<sub>w</sub>_ is true when we are allowed to change the blockchain state)? If so, and we're trying a state changing operation, it can't happen.

  The function _W(w,μ)_ is defined later in equation 159. _W(w,μ)_ is true if one of these conditions is true:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    These opcodes change the state, either by creating a new contract, storing a value, or destroying the current contract.

  - **_LOG0≤w ∧ w≤LOG4_**
    If we are called statically we cannot emit log entries.
    The log opcodes are all in the range between [`LOG0` (A0)](https://www.evm.codes/#a0) and [`LOG4` (A4)](https://www.evm.codes/#a4).
    The number after the log opcode specifies how many topics the log entry contains.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    You can call another contract when you're static, but if you do you cannot transfer ETH to it.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  You cannot run [`SSTORE`](https://www.evm.codes/#55) unless you have more than G<sub>callstipend</sub> (defined as 2300 in Appendix G) gas.
## 9.4.3 Jump Destination Validity {#943-jump-dest-valid}

Here we formally define what are the [`JUMPDEST`](https://www.evm.codes/#5b) opcodes. We cannot just look for byte value 0x5B, because it might be inside a PUSH (and therefore data and not an opcode).

In equation (162) we define a function, _N(i,w)_. The first parameter, _i_, is the opcode's location. The second, _w_, is the opcode itself. If _w∈[PUSH1, PUSH32]_ that means the opcode is a PUSH (square brackets define a range that includes the endpoints). If that case the next opcode is at _i+2+(w−PUSH1)_. For [`PUSH1`](https://www.evm.codes/#60) we need to advance by two bytes (the PUSH itself and the one byte value), for [`PUSH2`](https://www.evm.codes/#61) we need to advance by three bytes because it's a two byte value, etc. All other EVM opcodes are just one byte long, so in all other cases _N(i,w)=i+1_.

This function is used in equation (161) to define _D<sub>J</sub>(c,i)_, which is the [set](<https://en.wikipedia.org/wiki/Set_(mathematics)>) of all valid jump destinations in code _c_, starting with opcode location _i_. This function is defined recursively. If _i≥||c||_, that means that we're at or after the end of the code. We are not going to find any more jump destinations, so just return the empty set.

In all other cases we look at the rest of the code by going to the next opcode and getting the set starting from it. _c[i]_ is the current opcode, so _N(i,c[i])_ is the location of the next opcode. _D<sub>J</sub>(c,N(i,c[i]))_ is therefore the set of valid jump destinations that starts at the next opcode. If the current opcode isn't a `JUMPDEST`, just return that set. If it is `JUMPDEST`, include it in the result set and return that.
## <span dir="ltr">9.4.4</span> عام رکاوٹ {#944-normal-halt}

رکاوٹ کا فنکشن _H_، تین قسم کی قدریں واپس کر سکتا ہے۔

- اگر ہم ہالٹ آپ کوڈ میں نہیں ہیں، تو _∅_، خالی سیٹ واپس کریں۔ روایت کے مطابق، اس قدر کی تشریح بولین غلط (false) کے طور پر کی جاتی ہے۔
- اگر ہمارے پاس ایک ہالٹ آپ کوڈ ہے جو آؤٹ پٹ پیدا نہیں کرتا ہے (یا تو [`STOP`](https://www.evm.codes/#00) یا [`SELFDESTRUCT`](https://www.evm.codes/#ff))، تو واپسی کی قدر کے طور پر صفر بائٹس کے سائز کی ترتیب واپس کریں۔ نوٹ کریں کہ یہ خالی سیٹ سے بہت مختلف ہے۔ اس قدر کا مطلب ہے کہ <span dir="ltr">EVM</span> واقعی رک گیا تھا، بس پڑھنے کے لیے کوئی واپسی کا ڈیٹا نہیں ہے۔
- اگر ہمارے پاس ایک ہالٹ آپ کوڈ ہے جو آؤٹ پٹ پیدا کرتا ہے (یا تو [`RETURN`](https://www.evm.codes/#f3) یا [`REVERT`](https://www.evm.codes/#fd))، تو اس آپ کوڈ کے ذریعے بتائی گئی بائٹس کی ترتیب واپس کریں۔ یہ ترتیب میموری سے لی گئی ہے، اسٹیک کے اوپری حصے کی قدر (_μ<sub>s</sub>[0]_) پہلی بائٹ ہے، اور اس کے بعد کی قدر (_μ<sub>s</sub>[1]_) لمبائی ہے۔

## <span dir="ltr">H.2</span> ہدایات کا مجموعہ

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

دوسری مساوات، _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>\}_، گرم اسٹوریج (وہ اسٹوریج جس تک حال ہی میں رسائی حاصل کی گئی ہو اور جس کے کیشے (cached) ہونے کا امکان ہو) اور ٹھنڈے اسٹوریج (وہ اسٹوریج جس تک رسائی حاصل نہ کی گئی ہو اور جس کے سست اسٹوریج میں ہونے کا امکان ہو جسے بازیافت کرنا زیادہ مہنگا ہو) تک رسائی کی لاگت میں فرق سے متعلق ہے۔ _A<sub>a</sub>_ ان پتوں کی فہرست ہے جن تک ٹرانزیکشن کے ذریعے پہلے رسائی حاصل کی گئی تھی، اس لیے ان تک رسائی سستی ہونی چاہیے، جیسا کہ صفحہ <span dir="ltr">9</span> پر سیکشن <span dir="ltr">6.1</span> میں بیان کیا گیا ہے۔ آپ اس موضوع کے بارے میں مزید [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) میں پڑھ سکتے ہیں۔

| قدر | نیمونک | δ | α | تفصیل |
| ----: | -------- | --- | --- | --------------------------------------- |
| 0x8F | DUP16 | 16 | 17 | اسٹیک کے <span dir="ltr">16</span> ویں آئٹم کی نقل بنائیں۔ |
| | | | | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

نوٹ کریں کہ کسی بھی اسٹیک آئٹم کو استعمال کرنے کے لیے، ہمیں اسے نکالنا (pop) پڑتا ہے، جس کا مطلب ہے کہ ہمیں اس کے اوپر موجود تمام اسٹیک آئٹمز کو بھی نکالنا ہوگا۔ [`DUP<n>`](https://www.evm.codes/#8f) اور [`SWAP<n>`](https://www.evm.codes/#9f) کے معاملے میں، اس کا مطلب ہے کہ سولہ اقدار تک کو نکالنا اور پھر واپس ڈالنا (push) پڑتا ہے۔
## <span dir="ltr">9.5</span> عمل درآمد کا چکر

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

ریاضیاتی اشارے قطعی ہیں اور انہوں نے یلو پیپر کو ایتھیریم کی ہر تفصیل بتانے کی اجازت دی ہے۔ تاہم، اس کی کچھ خامیاں ہیں:

- اسے صرف انسان ہی سمجھ سکتے ہیں، جس کا مطلب ہے کہ [تعمیل کے ٹیسٹ](https://github.com/ethereum/tests) دستی طور پر لکھے جانے چاہئیں۔
- پروگرامرز کمپیوٹر کوڈ کو سمجھتے ہیں۔
  وہ ریاضیاتی اشارے کو سمجھ بھی سکتے ہیں اور نہیں بھی۔

شاید انہی وجوہات کی بنا پر، نئی [اتفاق رائے کی تہہ کی تفصیلات](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) Python میں لکھی گئی ہیں۔ Python میں [عمل درآمد کی تہہ کی تفصیلات](https://ethereum.github.io/execution-specs) موجود ہیں، لیکن وہ مکمل نہیں ہیں۔ جب تک کہ پورا یلو پیپر بھی Python یا اس جیسی کسی زبان میں ترجمہ نہیں ہو جاتا، یلو پیپر سروس میں رہے گا، اور اسے پڑھنے کے قابل ہونا مددگار ہے۔
