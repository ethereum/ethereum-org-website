---
title: "⁦ERC-20⁩ حفاظتی ریلز کے ساتھ"
description: "لوگوں کو احمقانہ غلطیوں سے بچنے میں کیسے مدد کی جائے"
author: "اوری پومرانٹز"
lang: ur
tags:
  - "erc-20"
skill: beginner
breadcrumb: "⁦ERC-20⁩ کی حفاظت"
published: 2022-08-15
---

## تعارف {#introduction}

ایتھیریم کی ایک بہترین بات یہ ہے کہ کوئی ایسی مرکزی اتھارٹی نہیں ہے جو آپ کی ٹرانزیکشنز میں ترمیم یا انہیں منسوخ کر سکے۔ ایتھیریم کے ساتھ ایک بڑا مسئلہ یہ ہے کہ کوئی ایسی مرکزی اتھارٹی نہیں ہے جس کے پاس صارف کی غلطیوں یا غیر قانونی ٹرانزیکشنز کو منسوخ کرنے کا اختیار ہو۔ اس مضمون میں آپ ان عام غلطیوں کے بارے میں جانیں گے جو صارفین [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) ٹوکنز کے ساتھ کرتے ہیں، اور ساتھ ہی یہ بھی سیکھیں گے کہ ایسے <span dir="ltr">ERC-20</span> کنٹریکٹس کیسے بنائے جائیں جو صارفین کو ان غلطیوں سے بچنے میں مدد دیں، یا جو کسی مرکزی اتھارٹی کو کچھ اختیار دیں (مثال کے طور پر اکاؤنٹس کو منجمد کرنے کا)۔

نوٹ کریں کہ اگرچہ ہم [OpenZeppelin <span dir="ltr">ERC-20</span> ٹوکن کنٹریکٹ](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) استعمال کریں گے، لیکن یہ مضمون اس کی زیادہ تفصیل سے وضاحت نہیں کرتا ہے۔ آپ یہ معلومات [یہاں](/developers/tutorials/erc20-annotated-code) حاصل کر سکتے ہیں۔

اگر آپ مکمل سورس کوڈ دیکھنا چاہتے ہیں:

1. [Remix IDE](https://remix.ethereum.org/) کھولیں۔
2. کلون GitHub آئیکن (![clone github icon](icon-clone.png)) پر کلک کریں۔
3. GitHub ریپوزٹری `https://github.com/qbzzt/20220815-erc20-safety-rails` کو کلون کریں۔
4. **contracts > erc20-safety-rails.sol** کھولیں۔

نوٹ کریں کہ ریپوزٹری کو <span dir="ltr">OpenZeppelin Contracts 4.7.2</span> کے لیے لکھا گیا تھا، جہاں اس فنکشن کو جسے یہ مضمون اوور رائیڈ کرتا ہے `_beforeTokenTransfer` کہا جاتا ہے۔ یہ مضمون موجودہ <span dir="ltr">OpenZeppelin Contracts 5.x</span> استعمال کرتا ہے، جہاں آپ اس کے بجائے `_update` کو اوور رائیڈ کرتے ہیں، اس لیے اس مضمون کا کوڈ ریپوزٹری کے کوڈ سے قدرے مختلف ہے۔

## ایک <span dir="ltr">ERC-20</span> کنٹریکٹ بنانا {#creating-an-erc-20-contract}

اس سے پہلے کہ ہم حفاظتی ریل کی فعالیت شامل کر سکیں، ہمیں ایک <span dir="ltr">ERC-20</span> کنٹریکٹ کی ضرورت ہے۔ اس مضمون میں ہم [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard) استعمال کریں گے۔ اسے کسی دوسرے براؤزر میں کھولیں اور ان ہدایات پر عمل کریں:

1. **ERC20** منتخب کریں۔
2. یہ ترتیبات درج کریں:

   | پیرامیٹر | قدر |
   | -------------- | ------------------------- |
   | Name | SafetyRailsToken |
   | Symbol | SAFE |
   | Premint | 1000 |
   | Features | None (**Permit** کو ان چیک کریں) |
   | Access Control | Ownable |
   | Upgradability | None |

3. اوپر سکرول کریں اور **Open in Remix** (Remix کے لیے) یا مختلف ماحول استعمال کرنے کے لیے **Download** پر کلک کریں۔ میں یہ فرض کروں گا کہ آپ Remix استعمال کر رہے ہیں، اگر آپ کچھ اور استعمال کرتے ہیں تو بس مناسب تبدیلیاں کریں۔
4. اب ہمارے پاس ایک مکمل فعال <span dir="ltr">ERC-20</span> کنٹریکٹ ہے۔ آپ امپورٹ شدہ کوڈ دیکھنے کے لیے `.deps` > `npm` کو پھیلا سکتے ہیں۔
5. کنٹریکٹ کو مرتب کریں، تعینات کریں، اور اس کے ساتھ کھیل کر دیکھیں کہ یہ ایک <span dir="ltr">ERC-20</span> کنٹریکٹ کے طور پر کام کرتا ہے۔ اگر آپ کو Remix استعمال کرنے کا طریقہ سیکھنے کی ضرورت ہے، تو [یہ ٹیوٹوریل استعمال کریں](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)۔

## عام غلطیاں {#common-mistakes}

### غلطیاں {#the-mistakes}

صارفین بعض اوقات غلط پتہ پر ٹوکن بھیج دیتے ہیں۔ اگرچہ ہم ان کے ذہن نہیں پڑھ سکتے کہ وہ کیا کرنا چاہتے تھے، لیکن دو قسم کی غلطیاں ایسی ہیں جو بہت زیادہ ہوتی ہیں اور ان کا پتہ لگانا آسان ہے:

1. ٹوکنز کو کنٹریکٹ کے اپنے پتہ پر بھیجنا۔ مثال کے طور پر، [آپٹیمزم کے OP ٹوکن](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) نے دو ماہ سے بھی کم عرصے میں [<span dir="ltr">120,000</span> سے زیادہ](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP ٹوکنز جمع کر لیے۔ یہ دولت کی ایک نمایاں مقدار کی نمائندگی کرتا ہے جو غالباً لوگوں نے کھو دی ہے۔

2. ٹوکنز کو کسی خالی پتہ پر بھیجنا، جو کسی [بیرونی ملکیت والے اکاؤنٹ (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) یا [سمارٹ کنٹریکٹ](/developers/docs/smart-contracts) سے مطابقت نہیں رکھتا۔ اگرچہ میرے پاس اس کے اعداد و شمار نہیں ہیں کہ ایسا کتنی بار ہوتا ہے، لیکن [ایک واقعے میں <span dir="ltr">20,000,000</span> ٹوکنز کا نقصان ہو سکتا تھا](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)۔

### منتقلیوں کو روکنا {#preventing-transfers}

OpenZeppelin <span dir="ltr">ERC-20</span> کنٹریکٹ میں بیلنس میں ہر تبدیلی، چاہے وہ منتقلی ہو، ڈھالنا ہو، یا جلانا ہو، [ایک اندرونی فنکشن، `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-) سے گزرتی ہے۔ ہم اس پر اپنی فعالیت شامل کرنے کے لیے اسے اوور رائیڈ کر سکتے ہیں، جیسے کہ ایسے چیکس جو کوئی مسئلہ ہونے پر ریورٹ کر دیں۔

ایسا کرنے کے لیے، کنسٹرکٹر کے بعد یہ فنکشن شامل کریں:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

اگر آپ Solidity سے زیادہ واقف نہیں ہیں تو اس فنکشن کے کچھ حصے نئے ہو سکتے ہیں:

```solidity
        internal virtual
```

`virtual` کلیدی لفظ کا مطلب یہ ہے کہ جس طرح ہم نے `ERC20` سے فعالیت وراثت میں حاصل کی اور اس فنکشن کو اوور رائیڈ کیا، اسی طرح دوسرے کنٹریکٹس ہم سے وراثت حاصل کر سکتے ہیں اور اس فنکشن کو اوور رائیڈ کر سکتے ہیں۔

```solidity
        override(ERC20)
```

ہمیں واضح طور پر بتانا ہوگا کہ ہم `_update` کی ERC20 ٹوکن تعریف کو [اوور رائیڈ](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) کر رہے ہیں۔ عام طور پر، سیکیورٹی کے نقطہ نظر سے، واضح تعریفیں غیر واضح تعریفوں سے بہت بہتر ہوتی ہیں - اگر کوئی چیز آپ کے بالکل سامنے ہو تو آپ یہ نہیں بھول سکتے کہ آپ نے کچھ کیا ہے۔ یہی وجہ ہے کہ ہمیں یہ بتانے کی ضرورت ہے کہ ہم کس سپر کلاس کے `_update` کو اوور رائیڈ کر رہے ہیں۔

```solidity
        super._update(from, to, value);
```

یہ لائن اس کنٹریکٹ یا کنٹریکٹس کے `_update` فنکشن کو کال کرتی ہے جن سے ہم نے وراثت حاصل کی ہے اور جن میں یہ موجود ہے۔ اس صورت میں، یہ صرف `ERC20` ہے، `Ownable` میں یہ فنکشن نہیں ہے۔ ایک خالی ہک کے برعکس، `ERC20._update` وہ ہے جو دراصل ٹوکنز کو منتقل کرتا ہے، اس لیے اسے کال کرنا ضروری ہے۔ ہمارے چیکس اس کال سے پہلے آتے ہیں، تاکہ وہ بیلنس میں کسی بھی تبدیلی سے پہلے ریورٹ کر سکیں۔

### ضروریات کی کوڈنگ {#coding-the-requirements}

ہم اس فنکشن میں یہ ضروریات شامل کرنا چاہتے ہیں۔ چونکہ `_update` کو اس وقت بھی کال کیا جاتا ہے جب ٹوکنز جلائے جاتے ہیں، جس میں `to` کو `address(0)` پر سیٹ کیا جاتا ہے، اس لیے ہم `to` کو صرف اس وقت چیک کرتے ہیں جب یہ `address(0)` نہ ہو:

- `to` پتہ `address(this)` کے برابر نہیں ہو سکتا، جو کہ خود <span dir="ltr">ERC-20</span> کنٹریکٹ کا پتہ ہے۔
- `to` پتہ خالی نہیں ہو سکتا، اسے ان میں سے کوئی ایک ہونا چاہیے:
  - ایک بیرونی ملکیت کا اکاؤنٹ (EOA)۔ ہم براہ راست یہ چیک نہیں کر سکتے کہ آیا کوئی پتہ EOA ہے، لیکن ہم کسی پتے کا ETH بیلنس چیک کر سکتے ہیں۔ EOAs کا تقریباً ہمیشہ ایک بیلنس ہوتا ہے، یہاں تک کہ اگر وہ مزید استعمال نہ ہو رہے ہوں - انہیں آخری Wei تک صاف کرنا مشکل ہے۔
  - ایک سمارٹ کنٹریکٹ۔ یہ جانچنا کہ آیا کوئی پتہ سمارٹ کنٹریکٹ ہے، قدرے مشکل ہے۔ ایک آپ کوڈ ہے جو بیرونی کوڈ کی لمبائی چیک کرتا ہے، جسے [`EXTCODESIZE`](https://www.evm.codes/#3b) کہا جاتا ہے۔ Solidity میں آپ اسے [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types) کے ساتھ حاصل کر سکتے ہیں، جسے کمپائلر `EXTCODESIZE` میں تبدیل کر دیتا ہے۔ یہاں ہم [Yul](https://docs.soliditylang.org/en/latest/yul.html) استعمال کرتے ہیں، جو کہ EVM اسمبلی ہے، یہ دکھانے کے لیے کہ آپ کوڈ کو براہ راست کیسے کال کیا جائے۔ نوٹ کریں کہ [<span dir="ltr">EIP-7702</span>](https://eips.ethereum.org/EIPS/eip-7702) کے بعد سے ایک EOA میں کوڈ (کسی کنٹریکٹ کو تفویض) بھی ہو سکتا ہے، اس لیے یہ چیک کوڈ والے اکاؤنٹس کی نشاندہی کرتا ہے، سختی سے کنٹریکٹس کی نہیں۔ ہمارے مقصد کے لیے، خالی پتوں کو مسترد کرنا، یہ ٹھیک ہے۔

یہاں مکمل فنکشن ہے:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // جلانا ٹوکنز کو پتہ(0) پر بھیجتا ہے، اسے بلاک نہ کریں
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

آئیے نئے کوڈ کا لائن بہ لائن جائزہ لیتے ہیں:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

یہ پہلی ضرورت ہے، چیک کریں کہ `to` اور `this(address)` ایک ہی چیز نہیں ہیں۔

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

اس طرح ہم چیک کرتے ہیں کہ آیا کوئی پتہ کنٹریکٹ ہے۔ ہم Yul سے براہ راست آؤٹ پٹ حاصل نہیں کر سکتے، اس لیے اس کے بجائے ہم نتیجہ رکھنے کے لیے ایک متغیر کی تعریف کرتے ہیں (اس صورت میں `isToContract`)۔ Yul کے کام کرنے کا طریقہ یہ ہے کہ ہر آپ کوڈ کو ایک فنکشن سمجھا جاتا ہے۔ لہذا پہلے ہم کنٹریکٹ کا سائز حاصل کرنے کے لیے [`EXTCODESIZE`](https://www.evm.codes/#3b) کو کال کرتے ہیں، اور پھر یہ چیک کرنے کے لیے [`GT`](https://www.evm.codes/#11) استعمال کرتے ہیں کہ یہ صفر نہیں ہے (ہم غیر دستخط شدہ انٹیجرز (unsigned integers) کے ساتھ کام کر رہے ہیں، اس لیے یقیناً یہ منفی نہیں ہو سکتا)۔ پھر ہم نتیجہ `isToContract` میں لکھتے ہیں۔

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

اور آخر میں، ہمارے پاس خالی پتوں کے لیے اصل چیک ہے۔

## انتظامی رسائی {#admin-access}

بعض اوقات ایک ایسا منتظم ہونا مفید ہوتا ہے جو غلطیوں کو منسوخ کر سکے۔ غلط استعمال کے امکانات کو کم کرنے کے لیے، یہ منتظم ایک [ملٹی سگ](https://blog.logrocket.com/security-choices-multi-signature-wallets/) ہو سکتا ہے تاکہ متعدد لوگوں کو کسی کارروائی پر متفق ہونا پڑے۔ اس مضمون میں ہمارے پاس دو انتظامی خصوصیات ہوں گی:

1. اکاؤنٹس کو منجمد اور غیر منجمد کرنا۔ یہ اس وقت مفید ہو سکتا ہے، مثال کے طور پر، جب کسی اکاؤنٹ سے سمجھوتہ (compromise) ہو گیا ہو۔
2. اثاثوں کی صفائی۔

   بعض اوقات دھوکہ باز اصلی ٹوکن کے کنٹریکٹ میں جعلی ٹوکن بھیجتے ہیں تاکہ قانونی حیثیت حاصل کر سکیں۔ مثال کے طور پر، [یہاں دیکھیں](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)۔ جائز <span dir="ltr">ERC-20</span> کنٹریکٹ [<span dir="ltr">0x4200....0042</span>](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042) ہے۔ وہ سکیم جو اس کا روپ دھارتا ہے وہ [<span dir="ltr">0x234....bbe</span>](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe) ہے۔

   یہ بھی ممکن ہے کہ لوگ غلطی سے ہمارے کنٹریکٹ میں جائز <span dir="ltr">ERC-20</span> ٹوکن بھیج دیں، جو انہیں باہر نکالنے کا طریقہ رکھنے کی ایک اور وجہ ہے۔

اوپن زیپلن انتظامی رسائی کو فعال کرنے کے لیے دو میکانزم فراہم کرتا ہے:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) کنٹریکٹس کا ایک ہی مالک ہوتا ہے۔ وہ فنکشنز جن میں `onlyOwner` [موڈیفائر](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) ہوتا ہے انہیں صرف وہی مالک کال کر سکتا ہے۔ مالکان ملکیت کسی اور کو منتقل کر سکتے ہیں یا اسے مکمل طور پر ترک کر سکتے ہیں۔ دیگر تمام اکاؤنٹس کے حقوق عام طور پر یکساں ہوتے ہیں۔
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) کنٹریکٹس میں [رول بیسڈ ایکسیس کنٹرول (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) ہوتا ہے۔

سادگی کی خاطر، اس مضمون میں ہم `Ownable` استعمال کرتے ہیں۔

### کنٹریکٹس کو منجمد اور غیر منجمد کرنا {#freezing-and-thawing-contracts}

کنٹریکٹس کو منجمد اور غیر منجمد کرنے کے لیے کئی تبدیلیوں کی ضرورت ہوتی ہے:

- پتوں سے [بولینز (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) تک ایک [میپنگ (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) تاکہ یہ ٹریک رکھا جا سکے کہ کون سے پتے منجمد ہیں۔ تمام اقدار ابتدائی طور پر صفر ہوتی ہیں، جسے بولین اقدار کے لیے غلط (false) سمجھا جاتا ہے۔ ہم یہی چاہتے ہیں کیونکہ پہلے سے طے شدہ طور پر اکاؤنٹس منجمد نہیں ہوتے ہیں۔

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [ایونٹس](https://docs.soliditylang.org/en/latest/contracts.html#events) تاکہ کسی بھی دلچسپی رکھنے والے کو مطلع کیا جا سکے کہ کب کوئی اکاؤنٹ منجمد یا غیر منجمد ہوتا ہے۔ تکنیکی طور پر ان کارروائیوں کے لیے ایونٹس کی ضرورت نہیں ہوتی، لیکن یہ آف چین کوڈ کو ان ایونٹس کو سننے اور یہ جاننے میں مدد کرتا ہے کہ کیا ہو رہا ہے۔ سمارٹ کنٹریکٹ کے لیے یہ اچھے آداب سمجھے جاتے ہیں کہ جب کوئی ایسی چیز ہو جو کسی اور کے لیے متعلقہ ہو سکتی ہے تو وہ انہیں خارج (emit) کرے۔

  ایونٹس کو انڈیکس کیا گیا ہے تاکہ ان تمام اوقات کو تلاش کرنا ممکن ہو سکے جب کسی اکاؤنٹ کو منجمد یا غیر منجمد کیا گیا ہو۔

  ```solidity
    // جب اکاؤنٹس منجمد یا غیر منجمد کیے جاتے ہیں
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- اکاؤنٹس کو منجمد اور غیر منجمد کرنے کے فنکشنز۔ یہ دونوں فنکشنز تقریباً ایک جیسے ہیں، اس لیے ہم صرف فریز (freeze) فنکشن کا جائزہ لیں گے۔

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) کے طور پر نشان زد فنکشنز کو دوسرے سمارٹ کنٹریکٹس سے یا براہ راست کسی ٹرانزیکشن کے ذریعے کال کیا جا سکتا ہے۔

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // اکاؤنٹ منجمد کریں
  ```

  اگر اکاؤنٹ پہلے ہی منجمد ہے، تو ریورٹ کریں۔ بصورت دیگر، اسے منجمد کریں اور ایک ایونٹ `emit` کریں۔

- کسی منجمد اکاؤنٹ سے رقم منتقل ہونے سے روکنے کے لیے `_update` کو تبدیل کریں۔ نوٹ کریں کہ رقم اب بھی منجمد اکاؤنٹ میں منتقل کی جا سکتی ہے۔ اس لائن کو فنکشن کے شروع میں، `if` بلاک کے باہر رکھیں، تاکہ یہ منجمد اکاؤنٹ سے ٹوکنز جلانے کو بھی روکے۔

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### اثاثوں کی صفائی {#asset-cleanup}

اس کنٹریکٹ کے پاس موجود <span dir="ltr">ERC-20</span> ٹوکنز کو جاری کرنے کے لیے ہمیں اس ٹوکن کنٹریکٹ پر ایک فنکشن کال کرنے کی ضرورت ہے جس سے وہ تعلق رکھتے ہیں، یا تو [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) یا [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)۔ اس صورت میں الاؤنسز پر گیس ضائع کرنے کا کوئی فائدہ نہیں، ہم براہ راست منتقلی بھی کر سکتے ہیں۔

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

جب ہمیں پتہ موصول ہوتا ہے تو کسی کنٹریکٹ کے لیے آبجیکٹ بنانے کا یہ نحو (syntax) ہے۔ اسے استعمال کرنے کے لیے ہمیں [IERC20 کی تعریف](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) کی ضرورت ہے، جو کہ OpenZeppelin <span dir="ltr">ERC-20</span> کنٹریکٹ کے لیے انٹرفیس ہے۔ وزرڈ کی `import {ERC20} from ...` لائن صرف `ERC20` لاتی ہے، اس لیے اس لائن کو فائل کے اوپری حصے میں دیگر امپورٹس کے ساتھ شامل کریں:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

یہ ایک کلین اپ فنکشن ہے، اس لیے غالباً ہم کوئی ٹوکن نہیں چھوڑنا چاہتے۔ صارف سے دستی طور پر بیلنس حاصل کرنے کے بجائے، ہم اس عمل کو خودکار بھی بنا سکتے ہیں۔

## نتیجہ {#conclusion}

یہ کوئی کامل حل نہیں ہے - "صارف نے غلطی کی" کے مسئلے کا کوئی کامل حل نہیں ہے۔ تاہم، اس قسم کے چیکس کا استعمال کم از کم کچھ غلطیوں کو روک سکتا ہے۔ اکاؤنٹس کو منجمد کرنے کی صلاحیت، اگرچہ خطرناک ہے، ہیکر کو چوری شدہ فنڈز سے انکار کر کے بعض ہیکس کے نقصان کو محدود کرنے کے لیے استعمال کی جا سکتی ہے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
