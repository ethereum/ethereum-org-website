---
title: "ایک کنٹریکٹ کی ریورس انجینئرنگ"
description: "جب آپ کے پاس سورس کوڈ نہ ہو تو کنٹریکٹ کو کیسے سمجھیں"
author: "اوری پومرانٹز"
lang: ur
tags: ["evm", "آپ کوڈز"]
skill: advanced
breadcrumb: "ریورس انجینئرنگ"
published: 2021-12-30
---
## تعارف {#introduction}

_بلاک چین پر کوئی راز نہیں ہوتے_، جو کچھ بھی ہوتا ہے وہ مستقل، قابل تصدیق اور عوامی طور پر دستیاب ہوتا ہے۔ مثالی طور پر، [کنٹریکٹس کا سورس کوڈ <span dir="ltr">Etherscan</span> پر شائع اور تصدیق شدہ ہونا چاہیے](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)۔ تاہم، [ہمیشہ ایسا نہیں ہوتا](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)۔ اس مضمون میں آپ سیکھیں گے کہ سورس کوڈ کے بغیر کسی کنٹریکٹ کو دیکھ کر کنٹریکٹس کی ریورس انجینئرنگ کیسے کی جاتی ہے، [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)۔

ریورس کمپائلرز موجود ہیں، لیکن وہ ہمیشہ [قابل استعمال نتائج](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f) پیدا نہیں کرتے۔ اس مضمون میں آپ سیکھیں گے کہ دستی طور پر ریورس انجینئرنگ کیسے کی جائے اور [آپ کوڈز](https://github.com/wolflo/evm-opcodes) سے کنٹریکٹ کو کیسے سمجھا جائے، نیز ڈی کمپائلر کے نتائج کی تشریح کیسے کی جائے۔

اس مضمون کو سمجھنے کے قابل ہونے کے لیے آپ کو پہلے سے ہی <span dir="ltr">EVM</span> کی بنیادی باتوں کا علم ہونا چاہیے، اور کم از کم <span dir="ltr">EVM</span> اسمبلر سے کچھ حد تک واقف ہونا چاہیے۔ [آپ ان موضوعات کے بارے میں یہاں پڑھ سکتے ہیں](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)۔

## قابل عمل کوڈ تیار کریں {#prepare-the-executable-code}

آپ کنٹریکٹ کے لیے <span dir="ltr">Etherscan</span> پر جا کر، **کنٹریکٹ** ٹیب پر کلک کر کے اور پھر **<span dir="ltr">Switch to Opcodes View</span>** پر کلک کر کے آپ کوڈز حاصل کر سکتے ہیں۔ آپ کو ایک ایسا ویو ملے گا جس میں ہر لائن پر ایک آپ کوڈ ہوگا۔

![Opcode View from Etherscan](opcode-view.png)

تاہم، <span dir="ltr">jumps</span> کو سمجھنے کے لیے، آپ کو یہ جاننے کی ضرورت ہے کہ کوڈ میں ہر آپ کوڈ کہاں واقع ہے۔ ایسا کرنے کا ایک طریقہ یہ ہے کہ ایک <span dir="ltr">Google Spreadsheet</span> کھولیں اور آپ کوڈز کو کالم <span dir="ltr">C</span> میں پیسٹ کریں۔ [آپ اس پہلے سے تیار شدہ اسپریڈشیٹ کی کاپی بنا کر درج ذیل مراحل کو چھوڑ سکتے ہیں](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)۔

اگلا قدم کوڈ کے درست مقامات حاصل کرنا ہے تاکہ ہم <span dir="ltr">jumps</span> کو سمجھ سکیں۔ ہم آپ کوڈ کا سائز کالم <span dir="ltr">B</span> میں، اور مقام (ہیکسا ڈیسیمل میں) کالم <span dir="ltr">A</span> میں رکھیں گے۔ سیل `B1` میں یہ فنکشن ٹائپ کریں اور پھر اسے کالم <span dir="ltr">B</span> کے باقی حصوں کے لیے کاپی اور پیسٹ کریں، جب تک کہ کوڈ ختم نہ ہو جائے۔ ایسا کرنے کے بعد آپ کالم <span dir="ltr">B</span> کو چھپا سکتے ہیں۔

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

سب سے پہلے یہ فنکشن خود آپ کوڈ کے لیے ایک بائٹ کا اضافہ کرتا ہے، اور پھر `PUSH` کو تلاش کرتا ہے۔ <span dir="ltr">Push</span> آپ کوڈز خاص ہوتے ہیں کیونکہ انہیں پش کی جانے والی ویلیو کے لیے اضافی بائٹس کی ضرورت ہوتی ہے۔ اگر آپ کوڈ `PUSH` ہے، تو ہم بائٹس کی تعداد نکالتے ہیں اور اسے شامل کرتے ہیں۔

`A1` میں پہلا آف سیٹ، صفر رکھیں۔ پھر، `A2` میں، یہ فنکشن رکھیں اور اسے دوبارہ کالم <span dir="ltr">A</span> کے باقی حصوں کے لیے کاپی اور پیسٹ کریں:

```
=dec2hex(hex2dec(A1)+B1)
```

ہمیں اس فنکشن کی ضرورت ہے تاکہ یہ ہمیں ہیکسا ڈیسیمل ویلیو دے سکے کیونکہ <span dir="ltr">jumps</span> سے پہلے پش کی جانے والی ویلیوز (`JUMP` اور `JUMPI`) ہمیں ہیکسا ڈیسیمل میں دی جاتی ہیں۔

## انٹری پوائنٹ (<span dir="ltr">0x00</span>) {#the-entry-point-0x00}

کنٹریکٹس ہمیشہ پہلی بائٹ سے ایگزیکیوٹ ہوتے ہیں۔ یہ کوڈ کا ابتدائی حصہ ہے:

| آفسیٹ | آپ کوڈ | اسٹیک (آپ کوڈ کے بعد) |
| -----: | ------------ | ------------------------ |
| <span dir="ltr">0</span> | <span dir="ltr">PUSH1 0x80</span> | <span dir="ltr">0x80</span> |
| <span dir="ltr">2</span> | <span dir="ltr">PUSH1 0x40</span> | <span dir="ltr">0x40, 0x80</span> |
| <span dir="ltr">4</span> | MSTORE | خالی |
| <span dir="ltr">5</span> | <span dir="ltr">PUSH1 0x04</span> | <span dir="ltr">0x04</span> |
| <span dir="ltr">7</span> | CALLDATASIZE | <span dir="ltr">CALLDATASIZE 0x04</span> |
| <span dir="ltr">8</span> | LT | <span dir="ltr">CALLDATASIZE\<4</span> |
| <span dir="ltr">9</span> | <span dir="ltr">PUSH2 0x005e</span> | <span dir="ltr">0x5E CALLDATASIZE\<4</span> |
| <span dir="ltr">C</span> | JUMPI | خالی |

یہ کوڈ دو کام کرتا ہے:

1. میموری لوکیشنز <span dir="ltr">0x40-0x5F</span> پر <span dir="ltr">0x80</span> کو <span dir="ltr">32</span> بائٹ ویلیو کے طور پر لکھیں (<span dir="ltr">0x80</span> کو <span dir="ltr">0x5F</span> میں اسٹور کیا جاتا ہے، اور <span dir="ltr">0x40-0x5E</span> سب صفر ہیں)۔
2. کال ڈیٹا کا سائز پڑھیں۔ عام طور پر ایتھریم کنٹریکٹ کا کال ڈیٹا [اے بی آئی (ایپلیکیشن بائنری انٹرفیس)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html) کی پیروی کرتا ہے، جس کے لیے فنکشن سلیکٹر کے لیے کم از کم چار بائٹس درکار ہوتے ہیں۔ اگر کال ڈیٹا کا سائز چار سے کم ہے، تو <span dir="ltr">0x5E</span> پر جمپ کریں۔

![Flowchart for this portion](flowchart-entry.png)

### <span dir="ltr">0x5E</span> پر ہینڈلر (نان-اے بی آئی کال ڈیٹا کے لیے) {#the-handler-at-0x5e-for-non-abi-call-data}

| آفسیٹ | آپ کوڈ |
| -----: | ------------ |
| <span dir="ltr">5E</span> | JUMPDEST |
| <span dir="ltr">5F</span> | CALLDATASIZE |
| <span dir="ltr">60</span> | <span dir="ltr">PUSH2 0x007c</span> |
| <span dir="ltr">63</span> | JUMPI |

یہ اسنپٹ `JUMPDEST` کے ساتھ شروع ہوتا ہے۔ ای وی ایم (ایتھریم ورچوئل مشین) پروگرامز ایک ایکسیپشن تھرو کرتے ہیں اگر آپ کسی ایسے آپ کوڈ پر جمپ کرتے ہیں جو `JUMPDEST` نہیں ہے۔ پھر یہ CALLDATASIZE کو دیکھتا ہے، اور اگر یہ "درست" (یعنی صفر نہیں) ہے تو <span dir="ltr">0x7C</span> پر جمپ کرتا ہے۔ ہم اس پر نیچے بات کریں گے۔

| آفسیٹ | آپ کوڈ | اسٹیک (آپ کوڈ کے بعد) |
| -----: | ---------- | -------------------------------------------------------------------------- |
| <span dir="ltr">64</span> | CALLVALUE | کال کے ذریعے فراہم کردہ [Wei](/glossary/#wei)۔ Solidity میں اسے `msg.value` کہا جاتا ہے |
| <span dir="ltr">65</span> | <span dir="ltr">PUSH1 0x06</span> | <span dir="ltr">6 CALLVALUE</span> |
| <span dir="ltr">67</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0 6 CALLVALUE</span> |
| <span dir="ltr">69</span> | DUP3 | <span dir="ltr">CALLVALUE 0 6 CALLVALUE</span> |
| <span dir="ltr">6A</span> | DUP3 | <span dir="ltr">6 CALLVALUE 0 6 CALLVALUE</span> |
| <span dir="ltr">6B</span> | SLOAD | <span dir="ltr">Storage[6] CALLVALUE 0 6 CALLVALUE</span> |

لہذا جب کوئی کال ڈیٹا نہیں ہوتا ہے تو ہم Storage[6] کی ویلیو پڑھتے ہیں۔ ہم ابھی تک نہیں جانتے کہ یہ ویلیو کیا ہے، لیکن ہم ان ٹرانزیکشنز کو تلاش کر سکتے ہیں جو کنٹریکٹ کو بغیر کسی کال ڈیٹا کے موصول ہوئی ہیں۔ وہ ٹرانزیکشنز جو بغیر کسی کال ڈیٹا (اور اس وجہ سے کوئی میتھڈ نہیں) کے صرف ETH کی منتقلی کرتی ہیں، ان کا Etherscan میں میتھڈ `Transfer` ہوتا ہے۔ درحقیقت، [کنٹریکٹ کو موصول ہونے والی سب سے پہلی ٹرانزیکشن](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) ایک منتقلی ہے۔

اگر ہم اس ٹرانزیکشن میں دیکھیں اور **Click to see More** پر کلک کریں، تو ہم دیکھتے ہیں کہ کال ڈیٹا، جسے ان پٹ ڈیٹا کہا جاتا ہے، واقعی خالی ہے (`0x`)۔ یہ بھی نوٹ کریں کہ ویلیو <span dir="ltr">1.559 ETH</span> ہے، جو بعد میں متعلقہ ہوگی۔

![The call data is empty](calldata-empty.png)

اس کے بعد، **State** ٹیب پر کلک کریں اور اس کنٹریکٹ کو پھیلائیں جسے ہم ریورس انجینئر کر رہے ہیں (<span dir="ltr">0x2510...</span>)۔ آپ دیکھ سکتے ہیں کہ ٹرانزیکشن کے دوران `Storage[6]` تبدیل ہوا تھا، اور اگر آپ Hex کو **Number** میں تبدیل کرتے ہیں، تو آپ دیکھیں گے کہ یہ <span dir="ltr">1,559,000,000,000,000,000</span> ہو گیا، جو wei میں منتقل کی گئی ویلیو ہے (میں نے وضاحت کے لیے کوما شامل کیے ہیں)، جو اگلی کنٹریکٹ ویلیو کے مساوی ہے۔

![Storage[6] میں تبدیلی](storage6.png)

اگر ہم [اسی عرصے کی دیگر `Transfer` ٹرانزیکشنز](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) کی وجہ سے ہونے والی حالت کی تبدیلیوں کو دیکھیں تو ہمیں معلوم ہوتا ہے کہ `Storage[6]` نے کچھ عرصے تک کنٹریکٹ کی ویلیو کو ٹریک کیا۔ فی الحال ہم اسے `Value*` کہیں گے۔ ایسٹرسک (`*`) ہمیں یاد دلاتا ہے کہ ہم ابھی تک نہیں _جانتے_ کہ یہ ویری ایبل کیا کرتا ہے، لیکن یہ صرف کنٹریکٹ کی ویلیو کو ٹریک کرنے کے لیے نہیں ہو سکتا کیونکہ اسٹوریج استعمال کرنے کی کوئی ضرورت نہیں ہے، جو کہ بہت مہنگا ہے، جب آپ `ADDRESS BALANCE` کا استعمال کرتے ہوئے اپنے اکاؤنٹ کا بیلنس حاصل کر سکتے ہیں۔ پہلا آپ کوڈ کنٹریکٹ کا اپنا پتہ پش کرتا ہے۔ دوسرا اسٹیک کے اوپری حصے پر موجود پتہ پڑھتا ہے اور اسے اس پتے کے بیلنس سے بدل دیتا ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------ | ------------------------------------------- |
| <span dir="ltr">6C</span> | <span dir="ltr">PUSH2 0x0075</span> | <span dir="ltr">0x75 Value\* CALLVALUE 0 6 CALLVALUE</span> |
| <span dir="ltr">6F</span> | SWAP2 | <span dir="ltr">CALLVALUE Value\* 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">70</span> | SWAP1 | <span dir="ltr">Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">71</span> | <span dir="ltr">PUSH2 0x01a7</span> | <span dir="ltr">0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">74</span> | JUMP |

ہم جمپ ڈیسٹینیشن پر اس کوڈ کو ٹریس کرنا جاری رکھیں گے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ---------- | ----------------------------------------------------------- |
| <span dir="ltr">1A7</span> | JUMPDEST | <span dir="ltr">Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1A8</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1AA</span> | DUP3 | <span dir="ltr">CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1AB</span> | NOT | <span dir="ltr">2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |

`NOT` بٹ وائز ہے، لہذا یہ کال ویلیو میں ہر بٹ کی ویلیو کو ریورس کر دیتا ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------ | --------------------------------------------------------------------------- |
| <span dir="ltr">1AC</span> | DUP3 | <span dir="ltr">Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1AD</span> | GT | <span dir="ltr">Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1AE</span> | ISZERO | <span dir="ltr">Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1AF</span> | <span dir="ltr">PUSH2 0x01df</span> | <span dir="ltr">0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1B2</span> | JUMPI |

ہم جمپ کرتے ہیں اگر `Value*` <span dir="ltr">2^256-CALLVALUE-1</span> سے چھوٹا یا اس کے برابر ہے۔ یہ اوور فلو کو روکنے کے لیے لاجک کی طرح لگتا ہے۔ اور واقعی، ہم دیکھتے ہیں کہ چند بے معنی آپریشنز کے بعد (مثال کے طور پر، میموری میں لکھنا ڈیلیٹ ہونے والا ہے) آفسیٹ <span dir="ltr">0x01DE</span> پر کنٹریکٹ ریورٹ ہو جاتا ہے اگر اوور فلو کا پتہ چلتا ہے، جو کہ ایک عام رویہ ہے۔

نوٹ کریں کہ اس طرح کا اوور فلو انتہائی ناممکن ہے، کیونکہ اس کے لیے کال ویلیو پلس `Value*` کو <span dir="ltr">2^256 wei</span> کے برابر ہونا درکار ہوگا، جو تقریباً <span dir="ltr">10^59 ETH</span> بنتا ہے۔ [لکھتے وقت، کل ETH سپلائی دو سو ملین سے کم ہے](https://etherscan.io/stat/supply)۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | -------- | ----------------------------------------- |
| <span dir="ltr">1DF</span> | JUMPDEST | <span dir="ltr">0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1E0</span> | POP | <span dir="ltr">Value\* CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1E1</span> | ADD | <span dir="ltr">Value\*+CALLVALUE 0x75 0 6 CALLVALUE</span> |
| <span dir="ltr">1E2</span> | SWAP1 | <span dir="ltr">0x75 Value\*+CALLVALUE 0 6 CALLVALUE</span> |
| <span dir="ltr">1E3</span> | JUMP |

اگر ہم یہاں پہنچ گئے ہیں، تو `Value* + CALLVALUE` حاصل کریں اور آفسیٹ <span dir="ltr">0x75</span> پر جمپ کریں۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | -------- | ------------------------------- |
| <span dir="ltr">75</span> | JUMPDEST | <span dir="ltr">Value\*+CALLVALUE 0 6 CALLVALUE</span> |
| <span dir="ltr">76</span> | SWAP1 | <span dir="ltr">0 Value\*+CALLVALUE 6 CALLVALUE</span> |
| <span dir="ltr">77</span> | SWAP2 | <span dir="ltr">6 Value\*+CALLVALUE 0 CALLVALUE</span> |
| <span dir="ltr">78</span> | SSTORE | <span dir="ltr">0 CALLVALUE</span> |

اگر ہم یہاں پہنچتے ہیں (جس کے لیے کال ڈیٹا کا خالی ہونا ضروری ہے) تو ہم `Value*` میں کال ویلیو شامل کرتے ہیں۔ یہ اس بات سے مطابقت رکھتا ہے جو ہم کہتے ہیں کہ `Transfer` ٹرانزیکشنز کرتی ہیں۔

| آفسیٹ | آپ کوڈ |
| -----: | ------ |
| <span dir="ltr">79</span> | POP |
| <span dir="ltr">7A</span> | POP |
| <span dir="ltr">7B</span> | STOP |

آخر میں، اسٹیک کو صاف کریں (جو ضروری نہیں ہے) اور ٹرانزیکشن کے کامیاب اختتام کا سگنل دیں۔

مختصراً، یہاں ابتدائی کوڈ کے لیے ایک فلو چارٹ ہے۔

![Entry point flowchart](flowchart-entry.png)

## <span dir="ltr">0x7C</span> پر ہینڈلر {#the-handler-at-0x7c}

میں نے جان بوجھ کر ہیڈنگ میں یہ نہیں لکھا کہ یہ ہینڈلر کیا کرتا ہے۔ مقصد آپ کو یہ سکھانا نہیں ہے کہ یہ مخصوص کنٹریکٹ کیسے کام کرتا ہے، بلکہ یہ سکھانا ہے کہ کنٹریکٹس کو ریورس انجینئر کیسے کیا جاتا ہے۔ آپ بھی اسی طرح سیکھیں گے جیسے میں نے سیکھا، یعنی کوڈ کی پیروی کر کے۔

ہم یہاں کئی جگہوں سے آتے ہیں:

- اگر <span dir="ltr">1, 2,</span> یا <span dir="ltr">3</span> بائٹس کا کال ڈیٹا موجود ہو (آفسیٹ <span dir="ltr">0x63</span> سے)
- اگر میتھڈ کے دستخط نامعلوم ہوں (آفسیٹس <span dir="ltr">0x42</span> اور <span dir="ltr">0x5D</span> سے)

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------ | -------------------- |
| <span dir="ltr">7C</span> | JUMPDEST |
| <span dir="ltr">7D</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0x00</span> |
| <span dir="ltr">7F</span> | <span dir="ltr">PUSH2 0x009d</span> | <span dir="ltr">0x9D 0x00</span> |
| <span dir="ltr">82</span> | <span dir="ltr">PUSH1 0x03</span> | <span dir="ltr">0x03 0x9D 0x00</span> |
| <span dir="ltr">84</span> | SLOAD | <span dir="ltr">Storage[3] 0x9D 0x00</span> |

یہ ایک اور اسٹوریج سیل ہے، جو مجھے کسی بھی ٹرانزیکشنز میں نہیں مل سکا اس لیے یہ جاننا مشکل ہے کہ اس کا کیا مطلب ہے۔ نیچے دیا گیا کوڈ اسے مزید واضح کر دے گا۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------------------------------------------- | ------------------------------- |
| <span dir="ltr">85</span> | <span dir="ltr">PUSH20 0xffffffffffffffffffffffffffffffffffffffff</span> | <span dir="ltr">0xff....ff Storage[3] 0x9D 0x00</span> |
| <span dir="ltr">9A</span> | AND | <span dir="ltr">Storage[3]-as-address 0x9D 0x00</span> |

یہ آپ کوڈز اس ویلیو کو جو ہم <span dir="ltr">Storage[3]</span> سے پڑھتے ہیں، <span dir="ltr">160</span> بٹس تک مختصر کر دیتے ہیں، جو کہ ایک ایتھریم کے پتے کی لمبائی ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------ | ------------------------------- |
| <span dir="ltr">9B</span> | SWAP1 | <span dir="ltr">0x9D Storage[3]-as-address 0x00</span> |
| <span dir="ltr">9C</span> | JUMP | <span dir="ltr">Storage[3]-as-address 0x00</span> |

یہ جمپ غیر ضروری ہے، کیونکہ ہم اگلے آپ کوڈ پر جا رہے ہیں۔ یہ کوڈ گیس کے لحاظ سے اتنا موثر نہیں ہے جتنا اسے ہونا چاہیے تھا۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ---------- | ------------------------------- |
| <span dir="ltr">9D</span> | JUMPDEST | <span dir="ltr">Storage[3]-as-address 0x00</span> |
| <span dir="ltr">9E</span> | SWAP1 | <span dir="ltr">0x00 Storage[3]-as-address</span> |
| <span dir="ltr">9F</span> | POP | <span dir="ltr">Storage[3]-as-address</span> |
| <span dir="ltr">A0</span> | <span dir="ltr">PUSH1 0x40</span> | <span dir="ltr">0x40 Storage[3]-as-address</span> |
| <span dir="ltr">A2</span> | MLOAD | <span dir="ltr">Mem[0x40] Storage[3]-as-address</span> |

کوڈ کے بالکل شروع میں ہم نے <span dir="ltr">Mem[0x40]</span> کو <span dir="ltr">0x80</span> پر سیٹ کیا تھا۔ اگر ہم بعد میں <span dir="ltr">0x40</span> کو تلاش کریں، تو ہم دیکھتے ہیں کہ ہم اسے تبدیل نہیں کرتے - لہذا ہم فرض کر سکتے ہیں کہ یہ <span dir="ltr">0x80</span> ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------ | ------------------------------------------------- |
| <span dir="ltr">A3</span> | CALLDATASIZE | <span dir="ltr">CALLDATASIZE 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">A4</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0x00 CALLDATASIZE 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">A6</span> | DUP3 | <span dir="ltr">0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">A7</span> | CALLDATACOPY | <span dir="ltr">0x80 Storage[3]-as-address</span> |

تمام کال ڈیٹا کو میموری میں کاپی کریں، جس کی شروعات <span dir="ltr">0x80</span> سے ہوتی ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------- | -------------------------------------------------------------------------------- |
| <span dir="ltr">A8</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0x00 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">AA</span> | DUP1 | <span dir="ltr">0x00 0x00 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">AB</span> | CALLDATASIZE | <span dir="ltr">CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">AC</span> | DUP4 | <span dir="ltr">0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">AD</span> | DUP6 | <span dir="ltr">Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">AE</span> | GAS | <span dir="ltr">GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">AF</span> | DELEGATE_CALL |

اب چیزیں بہت زیادہ واضح ہیں۔ یہ کنٹریکٹ ایک [پراکسی](https://blog.openzeppelin.com/proxy-patterns/) کے طور پر کام کر سکتا ہے، جو اصل کام کرنے کے لیے <span dir="ltr">Storage[3]</span> میں موجود پتے کو کال کرتا ہے۔ `DELEGATE_CALL` ایک الگ کنٹریکٹ کو کال کرتا ہے، لیکن اسی اسٹوریج میں رہتا ہے۔ اس کا مطلب یہ ہے کہ ڈیلیگیٹڈ کنٹریکٹ، جس کے لیے ہم ایک پراکسی ہیں، اسی اسٹوریج اسپیس تک رسائی حاصل کرتا ہے۔ کال کے لیے پیرامیٹرز یہ ہیں:

- _گیس_: تمام باقی ماندہ گیس
- _کال کیا گیا پتہ_: <span dir="ltr">Storage[3]-as-address</span>
- _کال ڈیٹا_: <span dir="ltr">CALLDATASIZE</span> بائٹس جو <span dir="ltr">0x80</span> سے شروع ہوتی ہیں، جہاں ہم نے اصل کال ڈیٹا رکھا تھا
- _ریٹرن ڈیٹا_: کوئی نہیں (<span dir="ltr">0x00 - 0x00</span>) ہم ریٹرن ڈیٹا دیگر ذرائع سے حاصل کریں گے (نیچے دیکھیں)

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
| <span dir="ltr">B0</span> | RETURNDATASIZE | <span dir="ltr">RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">B1</span> | DUP1 | <span dir="ltr">RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">B2</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">B4</span> | DUP5 | <span dir="ltr">0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">B5</span> | RETURNDATACOPY | <span dir="ltr">RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |

یہاں ہم تمام ریٹرن ڈیٹا کو میموری بفر میں کاپی کرتے ہیں جس کی شروعات <span dir="ltr">0x80</span> سے ہوتی ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| <span dir="ltr">B6</span> | DUP2 | <span dir="ltr">(((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">B7</span> | DUP1 | <span dir="ltr">(((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">B8</span> | ISZERO | <span dir="ltr">(((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">B9</span> | <span dir="ltr">PUSH2 0x00c0</span> | <span dir="ltr">0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">BC</span> | JUMPI | <span dir="ltr">(((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">BD</span> | DUP2 | <span dir="ltr">RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">BE</span> | DUP5 | <span dir="ltr">0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">BF</span> | RETURN | |

لہذا کال کے بعد ہم ریٹرن ڈیٹا کو بفر <span dir="ltr">0x80 - 0x80+RETURNDATASIZE</span> میں کاپی کرتے ہیں، اور اگر کال کامیاب ہو جاتی ہے تو ہم بالکل اسی بفر کے ساتھ `RETURN` کرتے ہیں۔

### <span dir="ltr">DELEGATECALL</span> ناکام ہو گیا {#delegatecall-failed}

اگر ہم یہاں، <span dir="ltr">0xC0</span> پر پہنچتے ہیں، تو اس کا مطلب ہے کہ جس کنٹریکٹ کو ہم نے کال کیا تھا وہ ریورٹ ہو گیا۔ چونکہ ہم اس کنٹریکٹ کے لیے صرف ایک پراکسی ہیں، ہم وہی ڈیٹا واپس کرنا چاہتے ہیں اور ساتھ ہی ریورٹ بھی کرنا چاہتے ہیں۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
| <span dir="ltr">C0</span> | JUMPDEST | <span dir="ltr">(((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">C1</span> | DUP2 | <span dir="ltr">RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">C2</span> | DUP5 | <span dir="ltr">0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address</span> |
| <span dir="ltr">C3</span> | REVERT |

لہذا ہم اسی بفر کے ساتھ `REVERT` کرتے ہیں جسے ہم نے پہلے `RETURN` کے لیے استعمال کیا تھا: <span dir="ltr">0x80 - 0x80+RETURNDATASIZE</span>

![Call to proxy flowchart](flowchart-proxy.png)

## <span dir="ltr">ABI</span> کالز {#abi-calls}

اگر کال ڈیٹا کا سائز چار بائٹس یا اس سے زیادہ ہے تو یہ ایک درست <span dir="ltr">ABI</span> کال ہو سکتی ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------ | ------------------------------------------------- |
| <span dir="ltr">D</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0x00</span> |
| <span dir="ltr">F</span> | <span dir="ltr">CALLDATALOAD</span> | (((کال ڈیٹا کا پہلا لفظ (<span dir="ltr">256 bits</span>)))) |
| <span dir="ltr">10</span> | <span dir="ltr">PUSH1 0xe0</span> | <span dir="ltr">0xE0</span> (((کال ڈیٹا کا پہلا لفظ (<span dir="ltr">256 bits</span>)))) |
| <span dir="ltr">12</span> | <span dir="ltr">SHR</span> | (((کال ڈیٹا کے پہلے <span dir="ltr">32 bits</span> (<span dir="ltr">4 bytes</span>)))) |

Etherscan ہمیں بتاتا ہے کہ `1C` ایک نامعلوم آپ کوڈ ہے، کیونکہ [اسے Etherscan کے اس فیچر کو بنانے کے بعد شامل کیا گیا تھا](https://eips.ethereum.org/EIPS/eip-145) اور انہوں نے اسے اپ ڈیٹ نہیں کیا ہے۔ ایک [اپ ٹو ڈیٹ آپ کوڈ ٹیبل](https://github.com/wolflo/evm-opcodes) ہمیں دکھاتا ہے کہ یہ شفٹ رائٹ (<span dir="ltr">shift right</span>) ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
| <span dir="ltr">13</span> | <span dir="ltr">DUP1</span> | (((کال ڈیٹا کے پہلے <span dir="ltr">32 bits</span> (<span dir="ltr">4 bytes</span>)))) (((کال ڈیٹا کے پہلے <span dir="ltr">32 bits</span> (<span dir="ltr">4 bytes</span>)))) |
| <span dir="ltr">14</span> | <span dir="ltr">PUSH4 0x3cd8045e</span> | <span dir="ltr">0x3CD8045E</span> (((کال ڈیٹا کے پہلے <span dir="ltr">32 bits</span> (<span dir="ltr">4 bytes</span>)))) (((کال ڈیٹا کے پہلے <span dir="ltr">32 bits</span> (<span dir="ltr">4 bytes</span>)))) |
| <span dir="ltr">19</span> | <span dir="ltr">GT</span> | <span dir="ltr">0x3CD8045E>first-32-bits-of-the-call-data</span> (((کال ڈیٹا کے پہلے <span dir="ltr">32 bits</span> (<span dir="ltr">4 bytes</span>)))) |
| <span dir="ltr">1A</span> | <span dir="ltr">PUSH2 0x0043</span> | <span dir="ltr">0x43 0x3CD8045E>first-32-bits-of-the-call-data</span> (((کال ڈیٹا کے پہلے <span dir="ltr">32 bits</span> (<span dir="ltr">4 bytes</span>)))) |
| <span dir="ltr">1D</span> | <span dir="ltr">JUMPI</span> | (((کال ڈیٹا کے پہلے <span dir="ltr">32 bits</span> (<span dir="ltr">4 bytes</span>)))) |

میتھڈ کے دستخط کے میچنگ ٹیسٹس کو اس طرح دو حصوں میں تقسیم کرنے سے اوسطاً آدھے ٹیسٹس کی بچت ہوتی ہے۔ وہ کوڈ جو اس کے فوراً بعد آتا ہے اور <span dir="ltr">0x43</span> میں موجود کوڈ اسی پیٹرن کی پیروی کرتے ہیں: کال ڈیٹا کے پہلے <span dir="ltr">32 bits</span> کو `DUP1` کریں، `PUSH4 (((method signature>` کریں، برابری چیک کرنے کے لیے `EQ` چلائیں، اور پھر اگر میتھڈ کے دستخط میچ کر جائیں تو `JUMPI` کریں۔ یہاں میتھڈ کے دستخط، ان کے پتے، اور اگر معلوم ہو تو [متعلقہ میتھڈ کی تعریف](https://www.4byte.directory/) دی گئی ہے:

| میتھڈ | میتھڈ کے دستخط | جمپ کرنے کے لیے آفسیٹ |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e) | <span dir="ltr">0x3cd8045e</span> | <span dir="ltr">0x0103</span> |
| ??? | <span dir="ltr">0x81e580d3</span> | <span dir="ltr">0x0138</span> |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | <span dir="ltr">0xba0bafb4</span> | <span dir="ltr">0x0158</span> |
| ??? | <span dir="ltr">0x1f135823</span> | <span dir="ltr">0x00C4</span> |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab) | <span dir="ltr">0x2eb4a7ab</span> | <span dir="ltr">0x00ED</span> |

اگر کوئی میچ نہیں ملتا، تو کوڈ [<span dir="ltr">0x7C</span> پر موجود پراکسی ہینڈلر](#the-handler-at-0x7c) پر جمپ کر جاتا ہے، اس امید کے ساتھ کہ جس کنٹریکٹ کے لیے ہم پراکسی ہیں اس میں کوئی میچ موجود ہو۔

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------ | ----------------------------- |
| <span dir="ltr">103</span> | JUMPDEST | |
| <span dir="ltr">104</span> | CALLVALUE | CALLVALUE |
| <span dir="ltr">105</span> | DUP1 | <span dir="ltr">CALLVALUE CALLVALUE</span> |
| <span dir="ltr">106</span> | ISZERO | <span dir="ltr">CALLVALUE==0 CALLVALUE</span> |
| <span dir="ltr">107</span> | <span dir="ltr">PUSH2 0x010f</span> | <span dir="ltr">0x010F CALLVALUE==0 CALLVALUE</span> |
| <span dir="ltr">10A</span> | JUMPI | CALLVALUE |
| <span dir="ltr">10B</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0x00 CALLVALUE</span> |
| <span dir="ltr">10D</span> | DUP1 | <span dir="ltr">0x00 0x00 CALLVALUE</span> |
| <span dir="ltr">10E</span> | REVERT | |

یہ فنکشن سب سے پہلے یہ چیک کرتا ہے کہ کال نے کوئی ETH نہیں بھیجا ہے۔ یہ فنکشن [`payable`](https://solidity-by-example.org/payable/) نہیں ہے۔ اگر کسی نے ہمیں ETH بھیجا ہے تو یہ یقیناً ایک غلطی ہوگی اور ہم `REVERT` کرنا چاہتے ہیں تاکہ وہ ETH ایسی جگہ نہ پھنس جائے جہاں سے وہ اسے واپس نہ لے سکیں۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
| <span dir="ltr">10F</span> | JUMPDEST | |
| <span dir="ltr">110</span> | POP | |
| <span dir="ltr">111</span> | <span dir="ltr">PUSH1 0x03</span> | <span dir="ltr">0x03</span> |
| <span dir="ltr">113</span> | SLOAD | (((<span dir="ltr">Storage[3]</span> یعنی وہ کنٹریکٹ جس کے لیے ہم پراکسی ہیں))) |
| <span dir="ltr">114</span> | <span dir="ltr">PUSH1 0x40</span> | <span dir="ltr">0x40</span> (((<span dir="ltr">Storage[3]</span> یعنی وہ کنٹریکٹ جس کے لیے ہم پراکسی ہیں))) |
| <span dir="ltr">116</span> | MLOAD | <span dir="ltr">0x80</span> (((<span dir="ltr">Storage[3]</span> یعنی وہ کنٹریکٹ جس کے لیے ہم پراکسی ہیں))) |
| <span dir="ltr">117</span> | <span dir="ltr">PUSH20 0xffffffffffffffffffffffffffffffffffffffff</span> | <span dir="ltr">0xFF...FF 0x80</span> (((<span dir="ltr">Storage[3]</span> یعنی وہ کنٹریکٹ جس کے لیے ہم پراکسی ہیں))) |
| <span dir="ltr">12C</span> | SWAP1 | <span dir="ltr">0x80 0xFF...FF</span> (((<span dir="ltr">Storage[3]</span> یعنی وہ کنٹریکٹ جس کے لیے ہم پراکسی ہیں))) |
| <span dir="ltr">12D</span> | SWAP2 | (((<span dir="ltr">Storage[3]</span> یعنی وہ کنٹریکٹ جس کے لیے ہم پراکسی ہیں))) <span dir="ltr">0xFF...FF 0x80</span> |
| <span dir="ltr">12E</span> | AND | <span dir="ltr">ProxyAddr 0x80</span> |
| <span dir="ltr">12F</span> | DUP2 | <span dir="ltr">0x80 ProxyAddr 0x80</span> |
| <span dir="ltr">130</span> | MSTORE | <span dir="ltr">0x80</span> |

اور اب <span dir="ltr">0x80</span> میں پراکسی کا پتہ موجود ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------ | --------- |
| <span dir="ltr">131</span> | <span dir="ltr">PUSH1 0x20</span> | <span dir="ltr">0x20 0x80</span> |
| <span dir="ltr">133</span> | ADD | <span dir="ltr">0xA0</span> |
| <span dir="ltr">134</span> | <span dir="ltr">PUSH2 0x00e4</span> | <span dir="ltr">0xE4 0xA0</span> |
| <span dir="ltr">137</span> | JUMP | <span dir="ltr">0xA0</span> |

### <span dir="ltr">E4</span> کوڈ {#the-e4-code}

یہ پہلی بار ہے جب ہم ان لائنوں کو دیکھ رہے ہیں، لیکن یہ دیگر میتھڈز کے ساتھ شیئر کی گئی ہیں (نیچے دیکھیں)۔ لہذا ہم اسٹیک میں موجود ویلیو کو X کہیں گے، اور بس یہ یاد رکھیں کہ `splitter()` میں اس X کی ویلیو <span dir="ltr">0xA0</span> ہے۔

| آفسیٹ | آپ کوڈ | اسٹیک |
| -----: | ---------- | ----------- |
| <span dir="ltr">E4</span> | JUMPDEST | X |
| <span dir="ltr">E5</span> | <span dir="ltr">PUSH1 0x40</span> | <span dir="ltr">0x40 X</span> |
| <span dir="ltr">E7</span> | MLOAD | <span dir="ltr">0x80 X</span> |
| <span dir="ltr">E8</span> | DUP1 | <span dir="ltr">0x80 0x80 X</span> |
| <span dir="ltr">E9</span> | SWAP2 | <span dir="ltr">X 0x80 0x80</span> |
| <span dir="ltr">EA</span> | SUB | <span dir="ltr">X-0x80 0x80</span> |
| <span dir="ltr">EB</span> | SWAP1 | <span dir="ltr">0x80 X-0x80</span> |
| <span dir="ltr">EC</span> | RETURN | |

لہذا یہ کوڈ اسٹیک (X) میں ایک میموری پوائنٹر وصول کرتا ہے، اور کنٹریکٹ کو ایک بفر کے ساتھ `RETURN` کرنے کا سبب بنتا ہے جو <span dir="ltr">0x80 - X</span> ہے۔

`splitter()` کے معاملے میں، یہ وہ پتہ واپس کرتا ہے جس کے لیے ہم پراکسی ہیں۔ `RETURN` بفر کو <span dir="ltr">0x80-0x9F</span> میں واپس کرتا ہے، جو وہ جگہ ہے جہاں ہم نے یہ ڈیٹا لکھا تھا (اوپر آفسیٹ <span dir="ltr">0x130</span>)۔

## currentWindow() {#currentwindow}

`0x158-0x163` آفسیٹس میں موجود کوڈ بالکل ویسا ہی ہے جیسا ہم نے `splitter()` میں `0x103-0x10E` پر دیکھا تھا (سوائے `JUMPI` کی منزل کے)، اس لیے ہم جانتے ہیں کہ `currentWindow()` بھی `payable` نہیں ہے۔

| آفسیٹ | آپ کوڈ       | اسٹیک                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DA کوڈ {#the-da-code}

یہ کوڈ دیگر میتھڈز کے ساتھ بھی شیئر کیا گیا ہے۔ اس لیے ہم اسٹیک میں موجود ویلیو کو Y کہیں گے، اور بس یہ یاد رکھیں کہ `currentWindow()` میں اس Y کی ویلیو `Storage[1]` ہے۔

| آفسیٹ | آپ کوڈ     | اسٹیک            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Y کو `0x80-0x9F` پر لکھیں۔

| آفسیٹ | آپ کوڈ     | اسٹیک          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

اور باقی کی وضاحت [اوپر](#the-e4-code) پہلے ہی کی جا چکی ہے۔ لہذا `0xDA` پر جمپس اسٹیک کے اوپری حصے (Y) کو `0x80-0x9F` پر لکھتے ہیں، اور وہ ویلیو واپس کرتے ہیں۔ `currentWindow()` کے معاملے میں، یہ `Storage[1]` واپس کرتا ہے۔

## <span dir="ltr">merkleRoot()</span> {#merkleroot}

آف سیٹس `0xED-0xF8` میں موجود کوڈ بالکل ویسا ہی ہے جیسا ہم نے `splitter()` میں `0x103-0x10E` پر دیکھا تھا (سوائے `JUMPI` منزل کے)، اس لیے ہم جانتے ہیں کہ `merkleRoot()` بھی `payable` نہیں ہے۔

| آف سیٹ | آپ کوڈ | اسٹیک |
| -----: | ------------ | -------------------- |
| <span dir="ltr">F9</span> | <span dir="ltr">JUMPDEST</span> |
| <span dir="ltr">FA</span> | <span dir="ltr">POP</span> |
| <span dir="ltr">FB</span> | <span dir="ltr">PUSH2 0x00da</span> | <span dir="ltr">0xDA</span> |
| <span dir="ltr">FE</span> | <span dir="ltr">PUSH1 0x00</span> | <span dir="ltr">0x00 0xDA</span> |
| <span dir="ltr">100</span> | <span dir="ltr">SLOAD</span> | <span dir="ltr">Storage[0] 0xDA</span> |
| <span dir="ltr">101</span> | <span dir="ltr">DUP2</span> | <span dir="ltr">0xDA Storage[0] 0xDA</span> |
| <span dir="ltr">102</span> | <span dir="ltr">JUMP</span> | <span dir="ltr">Storage[0] 0xDA</span> |

جمپ کے بعد کیا ہوتا ہے، [یہ ہم پہلے ہی جان چکے ہیں](#the-da-code)۔ لہذا `merkleRoot()` `Storage[0]` واپس کرتا ہے۔

## <span dir="ltr">0x81e580d3</span> {#0x81e580d3}

آف سیٹس <span dir="ltr">0x138-0x143</span> میں موجود کوڈ بالکل ویسا ہی ہے جیسا ہم نے `splitter()` میں <span dir="ltr">0x103-0x10E</span> میں دیکھا تھا (سوائے `JUMPI` منزل کے)، اس لیے ہم جانتے ہیں کہ یہ فنکشن بھی `payable` نہیں ہے۔

| آف سیٹ | آپ کوڈ       | اسٹیک                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

ایسا لگتا ہے کہ یہ فنکشن کم از کم <span dir="ltr">32</span> بائٹس (ایک ورڈ) کا کال ڈیٹا لیتا ہے۔

| آف سیٹ | آپ کوڈ | اسٹیک                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

اگر اسے کال ڈیٹا نہیں ملتا ہے تو ٹرانزیکشن کسی بھی ریٹرن ڈیٹا کے بغیر ریورٹ ہو جاتی ہے۔

آئیے دیکھتے ہیں کہ اگر فنکشن کو اپنی ضرورت کا کال ڈیٹا مل _جائے_ تو کیا ہوتا ہے۔

| آف سیٹ | آپ کوڈ       | اسٹیک                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` میتھڈ کے دستخط کے _بعد_ کال ڈیٹا کا پہلا ورڈ ہے۔

| آف سیٹ | آپ کوڈ       | اسٹیک                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

اگر پہلا ورڈ <span dir="ltr">Storage[4]</span> سے کم نہیں ہے، تو فنکشن ناکام ہو جاتا ہے۔ یہ کسی بھی ریٹرن ویلیو کے بغیر ریورٹ ہو جاتا ہے:

| آف سیٹ | آپ کوڈ     | اسٹیک         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

اگر <span dir="ltr">calldataload(4)</span> کی قدر <span dir="ltr">Storage[4]</span> سے کم ہے، تو ہمیں یہ کوڈ ملتا ہے:

| آف سیٹ | آپ کوڈ     | اسٹیک                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

اور میموری لوکیشنز <span dir="ltr">0x00-0x1F</span> میں اب ڈیٹا <span dir="ltr">0x04</span> موجود ہے (<span dir="ltr">0x00-0x1E</span> تمام صفر ہیں، <span dir="ltr">0x1F</span> چار ہے)

| آف سیٹ | آپ کوڈ     | اسٹیک                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

لہذا اسٹوریج میں ایک لوک اپ ٹیبل ہے، جو <span dir="ltr">0x000...0004</span> کے SHA3 سے شروع ہوتا ہے اور اس میں ہر جائز کال ڈیٹا ویلیو (<span dir="ltr">Storage[4]</span> سے کم ویلیو) کے لیے ایک اندراج موجود ہے۔

| آف سیٹ | آپ کوڈ | اسٹیک                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

ہم پہلے ہی جانتے ہیں کہ [آف سیٹ <span dir="ltr">0xDA</span> پر موجود کوڈ](#the-da-code) کیا کرتا ہے، یہ کالر کو اسٹیک کی ٹاپ ویلیو واپس کرتا ہے۔ لہذا یہ فنکشن لوک اپ ٹیبل سے کالر کو ویلیو واپس کرتا ہے۔

## <span dir="ltr">0x1f135823</span> {#0x1f135823}

<span dir="ltr">0xC4-0xCF</span> آفسیٹس میں موجود کوڈ بالکل ویسا ہی ہے جیسا ہم نے `splitter()` میں <span dir="ltr">0x103-0x10E</span> پر دیکھا تھا (سوائے `JUMPI` منزل کے)، اس لیے ہم جانتے ہیں کہ یہ فنکشن بھی `payable` نہیں ہے۔

| آفسیٹ | آپ کوڈ       | اسٹیک             |
| -----: | ------------ | ----------------- |
|     <span dir="ltr">D0</span> | JUMPDEST     |
|     <span dir="ltr">D1</span> | POP          |
|     <span dir="ltr">D2</span> | PUSH2 <span dir="ltr">0x00da</span> | <span dir="ltr">0xDA</span>              |
|     <span dir="ltr">D5</span> | PUSH1 <span dir="ltr">0x06</span>   | <span dir="ltr">0x06 0xDA</span>         |
|     <span dir="ltr">D7</span> | SLOAD        | <span dir="ltr">Value\* 0xDA</span>      |
|     <span dir="ltr">D8</span> | DUP2         | <span dir="ltr">0xDA Value\* 0xDA</span> |
|     <span dir="ltr">D9</span> | JUMP         | <span dir="ltr">Value\* 0xDA</span>      |

ہم پہلے ہی جانتے ہیں کہ [آفسیٹ <span dir="ltr">0xDA</span> پر موجود کوڈ](#the-da-code) کیا کرتا ہے، یہ کالر کو اسٹیک کی سب سے اوپر والی ویلیو واپس کرتا ہے۔ لہذا یہ فنکشن `Value*` واپس کرتا ہے۔

### میتھڈ کا خلاصہ {#method-summary}

کیا آپ کو لگتا ہے کہ آپ اس مقام پر کنٹریکٹ کو سمجھ گئے ہیں؟ مجھے تو نہیں لگتا۔ اب تک ہمارے پاس یہ میتھڈز ہیں:

| میتھڈ                            | مطلب                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | کال کے ذریعے فراہم کردہ ویلیو کو قبول کریں اور `Value*` میں اس رقم کا اضافہ کریں           |
| [splitter()](#splitter)           | <span dir="ltr">Storage[3]</span>، پراکسی پتہ واپس کریں                                                 |
| [currentWindow()](#currentwindow) | <span dir="ltr">Storage[1]</span> واپس کریں                                                                    |
| [merkleRoot()](#merkleroot)        | <span dir="ltr">Storage[0]</span> واپس کریں                                                                    |
| [<span dir="ltr">0x81e580d3</span>](#0x81e580d3)         | لک اپ ٹیبل سے ویلیو واپس کریں، بشرطیکہ پیرامیٹر <span dir="ltr">Storage[4]</span> سے کم ہو |
| [<span dir="ltr">0x1f135823</span>](#0x1f135823)         | <span dir="ltr">Storage[6]</span> واپس کریں، جسے <span dir="ltr">Value\*</span> بھی کہا جاتا ہے                                                    |

لیکن ہم جانتے ہیں کہ کوئی بھی دوسری فعالیت <span dir="ltr">Storage[3]</span> میں موجود کنٹریکٹ کے ذریعے فراہم کی جاتی ہے۔ شاید اگر ہمیں معلوم ہو جائے کہ وہ کنٹریکٹ کیا ہے تو اس سے ہمیں کوئی سراغ مل سکے۔ خوش قسمتی سے، یہ بلاک چین ہے اور کم از کم نظریاتی طور پر سب کچھ معلوم ہے۔ ہم نے کوئی ایسا میتھڈ نہیں دیکھا جو <span dir="ltr">Storage[3]</span> کو سیٹ کرتا ہو، اس لیے اسے کنسٹرکٹر کے ذریعے سیٹ کیا گیا ہوگا۔

## کنسٹرکٹر {#the-constructor}

جب ہم [کسی کنٹریکٹ کو دیکھتے ہیں](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) تو ہم اس ٹرانزیکشن کو بھی دیکھ سکتے ہیں جس نے اسے بنایا تھا۔

![Click the create transaction](create-tx.png)

اگر ہم اس ٹرانزیکشن پر کلک کریں، اور پھر **حالت** ٹیب پر، تو ہم پیرامیٹرز کی ابتدائی قدریں دیکھ سکتے ہیں۔ خاص طور پر، ہم دیکھ سکتے ہیں کہ <span dir="ltr">Storage[3]</span> میں [<span dir="ltr">0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761</span>](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761) موجود ہے۔ اس کنٹریکٹ میں لازمی طور پر وہ گمشدہ فعالیت موجود ہونی چاہیے۔ ہم اسے انہی ٹولز کا استعمال کرتے ہوئے سمجھ سکتے ہیں جو ہم نے اس کنٹریکٹ کے لیے استعمال کیے تھے جس کی ہم تحقیق کر رہے ہیں۔

## پراکسی کنٹریکٹ {#the-proxy-contract}

اوپر دیے گئے اصل کنٹریکٹ کے لیے ہم نے جو تکنیک استعمال کی تھیں، انہی کا استعمال کرتے ہوئے ہم دیکھ سکتے ہیں کہ کنٹریکٹ ریورٹ ہو جاتا ہے اگر:

- کال کے ساتھ کوئی <span dir="ltr">ETH</span> منسلک ہو (<span dir="ltr">0x05-0x0F</span>)
- کال ڈیٹا کا سائز چار سے کم ہو (<span dir="ltr">0x10-0x19</span> اور <span dir="ltr">0xBE-0xC2</span>)

اور یہ جن طریقوں (methods) کو سپورٹ کرتا ہے وہ یہ ہیں:

| طریقہ (Method)                                                                                                          | طریقہ کے دستخط (Method signature)             | چھلانگ لگانے کے لیے آفسیٹ (Offset to jump into) |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [<span dir="ltr">scaleAmountByPercentage(uint256,uint256)</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | <span dir="ltr">0x8ffb5c97</span>                   | <span dir="ltr">0x0135</span>              |
| [<span dir="ltr">isClaimed(uint256,address)</span>](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | <span dir="ltr">0xd2ef0795</span>                   | <span dir="ltr">0x0151</span>              |
| [<span dir="ltr">claim(uint256,address,uint256,bytes32[])</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | <span dir="ltr">0x2e7ba6ef</span>                   | <span dir="ltr">0x00F4</span>              |
| [<span dir="ltr">incrementWindow()</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | <span dir="ltr">0x338b1d31</span>                   | <span dir="ltr">0x0110</span>              |
| ???                                                                                                             | <span dir="ltr">0x3f26479e</span>                   | <span dir="ltr">0x0118</span>              |
| ???                                                                                                             | <span dir="ltr">0x1e7df9d3</span>                   | <span dir="ltr">0x00C3</span>              |
| [<span dir="ltr">currentWindow()</span>](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [<span dir="ltr">0xba0bafb4</span>](#currentwindow) | <span dir="ltr">0x0148</span>              |
| [<span dir="ltr">merkleRoot()</span>](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [<span dir="ltr">0x2eb4a7ab</span>](#merkleroot)    | <span dir="ltr">0x0107</span>              |
| ???                                                                                                             | [<span dir="ltr">0x81e580d3</span>](#0x81e580d3)    | <span dir="ltr">0x0122</span>              |
| ???                                                                                                             | [<span dir="ltr">0x1f135823</span>](#0x1f135823)    | <span dir="ltr">0x00D8</span>              |

ہم نیچے والے چار طریقوں کو نظر انداز کر سکتے ہیں کیونکہ ہم کبھی ان تک نہیں پہنچ پائیں گے۔ ان کے دستخط کچھ اس طرح کے ہیں کہ ہمارا اصل کنٹریکٹ خود ہی ان کو سنبھال لیتا ہے (آپ تفصیلات دیکھنے کے لیے اوپر دیے گئے دستخطوں پر کلک کر سکتے ہیں)، اس لیے یہ لازمی طور پر [اوور رائیڈ کیے گئے طریقے (methods that are overridden)](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf) ہوں گے۔

باقی ماندہ طریقوں میں سے ایک `claim(<params>)` ہے، اور دوسرا `isClaimed(<params>)` ہے، اس لیے یہ ایک ایئر ڈراپ کنٹریکٹ لگتا ہے۔ باقی ماندہ کو ایک ایک آپ کوڈ کر کے دیکھنے کے بجائے، ہم [ڈی کمپائلر آزما سکتے ہیں](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)، جو اس کنٹریکٹ کے تین فنکشنز کے لیے قابل استعمال نتائج پیدا کرتا ہے۔ باقی فنکشنز کی ریورس انجینئرنگ قاری کے لیے ایک مشق کے طور پر چھوڑی گئی ہے۔

### <span dir="ltr">scaleAmountByPercentage</span> {#scaleamountbypercentage}

اس فنکشن کے لیے ڈی کمپائلر ہمیں یہ دیتا ہے:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

پہلا `require` یہ جانچتا ہے کہ کال ڈیٹا میں، فنکشن کے دستخط کے چار بائٹس کے علاوہ، کم از کم <span dir="ltr">64</span> بائٹس موجود ہیں، جو دو پیرامیٹرز کے لیے کافی ہیں۔ اگر ایسا نہیں ہے تو ظاہر ہے کہ کچھ گڑبڑ ہے۔

`if` اسٹیٹمنٹ بظاہر یہ چیک کرتی ہے کہ `_param1` صفر نہیں ہے، اور یہ کہ `_param1 * _param2` منفی نہیں ہے۔ یہ غالباً ریپ اراؤنڈ (wrap around) کے معاملات کو روکنے کے لیے ہے۔

آخر میں، فنکشن ایک اسکیلڈ ویلیو (scaled value) واپس کرتا ہے۔

### <span dir="ltr">claim</span> {#claim}

ڈی کمپائلر جو کوڈ بناتا ہے وہ پیچیدہ ہے، اور اس کا سارا حصہ ہمارے لیے متعلقہ نہیں ہے۔ میں اس میں سے کچھ کو چھوڑنے جا رہا ہوں تاکہ ان لائنوں پر توجہ مرکوز کر سکوں جو میرے خیال میں مفید معلومات فراہم کرتی ہیں

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

ہم یہاں دو اہم چیزیں دیکھتے ہیں:

- `_param2`، اگرچہ اسے `uint256` کے طور پر ڈکلیئر کیا گیا ہے، دراصل ایک پتہ ہے۔
- `_param1` وہ ونڈو ہے جس کا دعویٰ کیا جا رہا ہے، جسے `currentWindow` یا اس سے پہلے کا ہونا چاہیے۔

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

تو اب ہم جانتے ہیں کہ <span dir="ltr">Storage[5]</span> ونڈوز اور پتوں کی ایک ایرے (array) ہے، اور یہ کہ آیا اس پتے نے اس ونڈو کے لیے انعام کا دعویٰ کیا ہے۔

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

ہم جانتے ہیں کہ `unknown2eb4a7ab` دراصل فنکشن `merkleRoot()` ہے، اس لیے یہ کوڈ ایسا لگتا ہے کہ یہ ایک [مرکل ثبوت](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5) کی تصدیق کر رہا ہے۔ اس کا مطلب ہے کہ `_param4` ایک مرکل ثبوت ہے۔

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

اس طرح ایک کنٹریکٹ اپنا <span dir="ltr">ETH</span> کسی دوسرے پتے (کنٹریکٹ یا بیرونی ملکیت والے) کو منتقل کرتا ہے۔ یہ اسے ایک ویلیو کے ساتھ کال کرتا ہے جو کہ منتقل کی جانے والی رقم ہوتی ہے۔ تو ایسا لگتا ہے کہ یہ <span dir="ltr">ETH</span> کا ایک ایئر ڈراپ ہے۔

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

نیچے کی دو لائنیں ہمیں بتاتی ہیں کہ <span dir="ltr">Storage[2]</span> بھی ایک کنٹریکٹ ہے جسے ہم کال کرتے ہیں۔ اگر ہم [کنسٹرکٹر ٹرانزیکشن کو دیکھیں](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) تو ہم دیکھتے ہیں کہ یہ کنٹریکٹ [<span dir="ltr">0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2</span>](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) ہے، جو کہ ایک ریپڈ ایتھر (ڈبلیو ایتھ) کنٹریکٹ ہے [جس کا سورس کوڈ Etherscan پر اپ لوڈ کیا گیا ہے](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)۔

تو ایسا لگتا ہے کہ کنٹریکٹ `_param2` کو <span dir="ltr">ETH</span> بھیجنے کی کوشش کرتا ہے۔ اگر یہ ایسا کر سکتا ہے، تو بہت اچھا۔ اگر نہیں، تو یہ [<span dir="ltr">WETH</span>](https://weth.tkn.eth.limo/) بھیجنے کی کوشش کرتا ہے۔ اگر `_param2` ایک بیرونی ملکیت والا اکاؤنٹ (<span dir="ltr">EOA</span>) ہے تو یہ ہمیشہ <span dir="ltr">ETH</span> وصول کر سکتا ہے، لیکن کنٹریکٹس <span dir="ltr">ETH</span> وصول کرنے سے انکار کر سکتے ہیں۔ تاہم، <span dir="ltr">WETH</span> ایک <span dir="ltr">ERC-20</span> ہے اور کنٹریکٹس اسے قبول کرنے سے انکار نہیں کر سکتے۔

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

فنکشن کے آخر میں ہم دیکھتے ہیں کہ ایک لاگ انٹری تیار کی جا رہی ہے۔ [تیار کردہ لاگ انٹریز کو دیکھیں](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) اور اس ٹاپک پر فلٹر کریں جو `0xdbd5...` سے شروع ہوتا ہے۔ اگر ہم [ایسی انٹری تیار کرنے والی ٹرانزیکشنز میں سے کسی ایک پر کلک کریں](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) تو ہم دیکھتے ہیں کہ واقعی یہ ایک دعویٰ لگتا ہے - اکاؤنٹ نے اس کنٹریکٹ کو ایک پیغام بھیجا جس کی ہم ریورس انجینئرنگ کر رہے ہیں، اور بدلے میں <span dir="ltr">ETH</span> حاصل کیا۔

![A claim transaction](claim-tx.png)

### <span dir="ltr">1e7df9d3</span> {#1e7df9d3}

یہ فنکشن اوپر دیے گئے [`claim`](#claim) سے بہت ملتا جلتا ہے۔ یہ بھی ایک مرکل ثبوت کی جانچ کرتا ہے، پہلے کو <span dir="ltr">ETH</span> منتقل کرنے کی کوشش کرتا ہے، اور اسی قسم کی لاگ انٹری تیار کرتا ہے۔

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

بنیادی فرق یہ ہے کہ پہلا پیرامیٹر، یعنی نکالنے کے لیے ونڈو، وہاں موجود نہیں ہے۔ اس کے بجائے، ان تمام ونڈوز پر ایک لوپ (loop) ہے جن کا دعویٰ کیا جا سکتا ہے۔

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

تو یہ `claim` کا ایک ایسا ویریئنٹ (variant) لگتا ہے جو تمام ونڈوز کا دعویٰ کرتا ہے۔

## نتیجہ {#conclusion}

اب تک آپ کو یہ جان لینا چاہیے کہ ان کنٹریکٹس کو کیسے سمجھا جائے جن کا سورس کوڈ دستیاب نہیں ہے، اس کے لیے یا تو آپ کوڈز کا استعمال کیا جاتا ہے یا (جب یہ کام کرے) ڈی کمپائلر کا۔ جیسا کہ اس مضمون کی طوالت سے ظاہر ہے، کسی کنٹریکٹ کی ریورس انجینئرنگ کوئی معمولی کام نہیں ہے، لیکن ایک ایسے سسٹم میں جہاں سیکیورٹی انتہائی ضروری ہو، یہ تصدیق کرنے کے قابل ہونا کہ کنٹریکٹس وعدے کے مطابق کام کرتے ہیں، ایک اہم مہارت ہے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔