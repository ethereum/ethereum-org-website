---
title: "حفاظتی ریلز کے ساتھ ERC-20"
description: "لوگوں کو احمقانہ غلطیوں سے بچنے میں کیسے مدد کی جائے"
author: "اوری پومرانٹز"
lang: ur
tags: ["erc-20"]
skill: beginner
breadcrumb: "ERC-20 کی حفاظت"
published: 2022-08-15
---

## تعارف {#introduction}

ایتھیریم (Ethereum) کی ایک بہترین بات یہ ہے کہ کوئی ایسی مرکزی اتھارٹی نہیں ہے جو آپ کی ٹرانزیکشنز میں ترمیم کر سکے یا انہیں کالعدم کر سکے۔ ایتھیریم کا ایک بڑا مسئلہ یہ بھی ہے کہ کوئی ایسی مرکزی اتھارٹی نہیں ہے جس کے پاس صارفین کی غلطیوں یا غیر قانونی ٹرانزیکشنز کو کالعدم کرنے کا اختیار ہو۔ اس مضمون میں آپ ان عام غلطیوں کے بارے میں جانیں گے جو صارفین [ERC-20](/developers/docs/standards/tokens/erc-20/) ٹوکنز کے ساتھ کرتے ہیں، اور یہ بھی سیکھیں گے کہ ایسے ERC-20 کنٹریکٹس کیسے بنائے جائیں جو صارفین کو ان غلطیوں سے بچنے میں مدد دیں، یا جو کسی مرکزی اتھارٹی کو کچھ اختیار دیں (مثال کے طور پر اکاؤنٹس کو منجمد کرنے کا)۔

نوٹ کریں کہ اگرچہ ہم [OpenZeppelin ERC-20 ٹوکن کنٹریکٹ](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) استعمال کریں گے، لیکن یہ مضمون اس کی زیادہ تفصیل سے وضاحت نہیں کرتا۔ آپ یہ معلومات [یہاں](/developers/tutorials/erc20-annotated-code) حاصل کر سکتے ہیں۔

اگر آپ مکمل سورس کوڈ دیکھنا چاہتے ہیں:

1. [Remix IDE](https://remix.ethereum.org/) کھولیں۔
2. کلون گٹ ہب (clone github) آئیکن پر کلک کریں (![clone github icon](icon-clone.png))۔
3. گٹ ہب ریپوزٹری `https://github.com/qbzzt/20220815-erc20-safety-rails` کو کلون کریں۔
4. **contracts > erc20-safety-rails.sol** کھولیں۔

## ایک ERC-20 کنٹریکٹ بنانا {#creating-an-erc-20-contract}

حفاظتی ریل کی فعالیت شامل کرنے سے پہلے ہمیں ایک ERC-20 کنٹریکٹ کی ضرورت ہے۔ اس مضمون میں ہم [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard) استعمال کریں گے۔ اسے کسی دوسرے براؤزر میں کھولیں اور ان ہدایات پر عمل کریں:

1. **ERC20** منتخب کریں۔
2. یہ سیٹنگز درج کریں:

   | پیرامیٹر | ویلیو |
   | -------------- | ---------------- |
   | Name | SafetyRailsToken |
   | Symbol | SAFE |
   | Premint | 1000 |
   | Features | None |
   | Access Control | Ownable |
   | Upgradability | None |

3. اوپر سکرول کریں اور **Open in Remix** (Remix کے لیے) یا مختلف ماحول استعمال کرنے کے لیے **Download** پر کلک کریں۔ میں یہ فرض کر رہا ہوں کہ آپ Remix استعمال کر رہے ہیں، اگر آپ کچھ اور استعمال کرتے ہیں تو بس مناسب تبدیلیاں کر لیں۔
4. اب ہمارے پاس ایک مکمل فعال ERC-20 کنٹریکٹ ہے۔ آپ امپورٹ شدہ کوڈ دیکھنے کے لیے `.deps` > `npm` کو پھیلا سکتے ہیں۔
5. کنٹریکٹ کو کمپائل کریں، ڈیپلائے کریں، اور اس کے ساتھ کھیل کر دیکھیں کہ یہ ایک ERC-20 کنٹریکٹ کے طور پر کام کرتا ہے۔ اگر آپ کو Remix استعمال کرنے کا طریقہ سیکھنے کی ضرورت ہے، تو [یہ ٹیوٹوریل استعمال کریں](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)۔

## عام غلطیاں {#common-mistakes}

### غلطیاں {#the-mistakes}

صارفین بعض اوقات غلط ایڈریس پر ٹوکن بھیج دیتے ہیں۔ اگرچہ ہم ان کے ذہن نہیں پڑھ سکتے کہ وہ کیا کرنا چاہتے تھے، لیکن دو قسم کی غلطیاں ایسی ہیں جو بہت زیادہ ہوتی ہیں اور ان کا پتہ لگانا آسان ہے:

1. ٹوکنز کو کنٹریکٹ کے اپنے ایڈریس پر بھیجنا۔ مثال کے طور پر، [Optimism کے OP ٹوکن](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) نے دو ماہ سے بھی کم عرصے میں [120,000 سے زیادہ](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP ٹوکنز جمع کر لیے۔ یہ دولت کی ایک نمایاں مقدار کی نمائندگی کرتا ہے جو غالباً لوگوں نے کھو دی ہے۔

2. ٹوکنز کو کسی خالی ایڈریس پر بھیجنا، جو کسی [بیرونی ملکیت والے اکاؤنٹ (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) یا [اسمارٹ کنٹریکٹ](/developers/docs/smart-contracts) سے مطابقت نہیں رکھتا۔ اگرچہ میرے پاس اس کے اعداد و شمار نہیں ہیں کہ ایسا کتنی بار ہوتا ہے، لیکن [ایک واقعے میں 20,000,000 ٹوکنز کا نقصان ہو سکتا تھا](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)۔

### ٹرانسفرز کو روکنا {#preventing-transfers}

OpenZeppelin ERC-20 کنٹریکٹ میں [ایک ہک (hook)، `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368) شامل ہے، جسے ٹوکن ٹرانسفر ہونے سے پہلے کال کیا جاتا ہے۔ پہلے سے طے شدہ طور پر یہ ہک کچھ نہیں کرتا، لیکن ہم اس پر اپنی فعالیت شامل کر سکتے ہیں، جیسے کہ ایسے چیکس جو کوئی مسئلہ ہونے پر ریورٹ (revert) کر دیں۔

ہک استعمال کرنے کے لیے، کنسٹرکٹر کے بعد یہ فنکشن شامل کریں:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

اگر آپ Solidity سے زیادہ واقف نہیں ہیں تو اس فنکشن کے کچھ حصے آپ کے لیے نئے ہو سکتے ہیں:

```solidity
        internal virtual
```

`virtual` کی ورڈ کا مطلب یہ ہے کہ جس طرح ہم نے `ERC20` سے فعالیت وراثت میں لی اور اس فنکشن کو اوور رائیڈ (override) کیا، اسی طرح دوسرے کنٹریکٹس ہم سے وراثت لے سکتے ہیں اور اس فنکشن کو اوور رائیڈ کر سکتے ہیں۔

```solidity
        override(ERC20)
```

ہمیں واضح طور پر بتانا ہوگا کہ ہم `_beforeTokenTransfer` کی ERC20 ٹوکن تعریف کو [اوور رائیڈ](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) کر رہے ہیں۔ عام طور پر، سیکیورٹی کے نقطہ نظر سے، واضح (explicit) تعریفیں غیر واضح (implicit) تعریفوں سے بہت بہتر ہوتی ہیں - اگر کوئی چیز آپ کے بالکل سامنے ہو تو آپ یہ نہیں بھول سکتے کہ آپ نے کچھ کیا ہے۔ یہی وجہ ہے کہ ہمیں یہ بتانے کی ضرورت ہے کہ ہم کس سپر کلاس کے `_beforeTokenTransfer` کو اوور رائیڈ کر رہے ہیں۔

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

یہ لائن اس کنٹریکٹ یا کنٹریکٹس کے `_beforeTokenTransfer` فنکشن کو کال کرتی ہے جن سے ہم نے وراثت لی ہے اور جن میں یہ موجود ہے۔ اس صورت میں، یہ صرف `ERC20` ہے، `Ownable` میں یہ ہک نہیں ہے۔ اگرچہ فی الحال `ERC20._beforeTokenTransfer` کچھ نہیں کرتا، ہم اسے اس صورت میں کال کرتے ہیں کہ مستقبل میں کوئی فعالیت شامل کی جائے (اور پھر ہم کنٹریکٹ کو دوبارہ ڈیپلائے کرنے کا فیصلہ کریں، کیونکہ ڈیپلائمنٹ کے بعد کنٹریکٹس تبدیل نہیں ہوتے)۔

### ضروریات کی کوڈنگ {#coding-the-requirements}

ہم فنکشن میں یہ ضروریات شامل کرنا چاہتے ہیں:

- `to` ایڈریس `address(this)` کے برابر نہیں ہو سکتا، جو کہ خود ERC-20 کنٹریکٹ کا ایڈریس ہے۔
- `to` ایڈریس خالی نہیں ہو سکتا، اسے ان میں سے کوئی ایک ہونا چاہیے:
  - ایک بیرونی ملکیت والا اکاؤنٹ (EOA)۔ ہم براہ راست یہ چیک نہیں کر سکتے کہ آیا کوئی ایڈریس EOA ہے، لیکن ہم کسی ایڈریس کا ETH بیلنس چیک کر سکتے ہیں۔ EOAs میں تقریباً ہمیشہ بیلنس ہوتا ہے، یہاں تک کہ اگر وہ مزید استعمال نہ ہو رہے ہوں - انہیں آخری wei تک صاف کرنا مشکل ہے۔
  - ایک اسمارٹ کنٹریکٹ۔ یہ ٹیسٹ کرنا کہ آیا کوئی ایڈریس اسمارٹ کنٹریکٹ ہے، تھوڑا مشکل ہے۔ ایک اوپ کوڈ (opcode) ہے جو بیرونی کوڈ کی لمبائی چیک کرتا ہے، جسے [`EXTCODESIZE`](https://www.evm.codes/#3b) کہا جاتا ہے، لیکن یہ براہ راست Solidity میں دستیاب نہیں ہے۔ اس کے لیے ہمیں [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html) استعمال کرنا پڑتا ہے، جو کہ EVM اسمبلی ہے۔ کچھ اور ویلیوز بھی ہیں جو ہم Solidity سے استعمال کر سکتے ہیں ([`<address>.code` اور `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types))، لیکن ان کی لاگت زیادہ ہوتی ہے۔

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

اس طرح ہم چیک کرتے ہیں کہ آیا کوئی ایڈریس کنٹریکٹ ہے۔ ہم براہ راست Yul سے آؤٹ پٹ حاصل نہیں کر سکتے، اس لیے ہم نتیجہ محفوظ کرنے کے لیے ایک ویری ایبل کی تعریف کرتے ہیں (اس صورت میں `isToContract`)۔ Yul کے کام کرنے کا طریقہ یہ ہے کہ ہر اوپ کوڈ کو ایک فنکشن سمجھا جاتا ہے۔ لہذا پہلے ہم کنٹریکٹ کا سائز حاصل کرنے کے لیے [`EXTCODESIZE`](https://www.evm.codes/#3b) کو کال کرتے ہیں، اور پھر یہ چیک کرنے کے لیے [`GT`](https://www.evm.codes/#11) استعمال کرتے ہیں کہ یہ صفر نہیں ہے (ہم ان سائنڈ انٹیجرز (unsigned integers) کے ساتھ کام کر رہے ہیں، اس لیے یقیناً یہ منفی نہیں ہو سکتا)۔ پھر ہم نتیجہ `isToContract` میں لکھتے ہیں۔

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

اور آخر میں، ہمارے پاس خالی ایڈریسز کے لیے اصل چیک ہے۔

## انتظامی رسائی {#admin-access}

بعض اوقات ایک ایسا ایڈمنسٹریٹر ہونا مفید ہوتا ہے جو غلطیوں کو کالعدم کر سکے۔ غلط استعمال کے امکانات کو کم کرنے کے لیے، یہ ایڈمنسٹریٹر ایک [ملٹی سگ (multisig)](https://blog.logrocket.com/security-choices-multi-signature-wallets/) ہو سکتا ہے تاکہ کسی کارروائی پر متعدد لوگوں کو متفق ہونا پڑے۔ اس مضمون میں ہمارے پاس دو انتظامی خصوصیات ہوں گی:

1. اکاؤنٹس کو منجمد (freeze) اور غیر منجمد (unfreeze) کرنا۔ یہ مفید ہو سکتا ہے، مثال کے طور پر، جب کسی اکاؤنٹ کے ہیک ہونے کا خدشہ ہو۔
2. اثاثوں کی صفائی (Asset cleanup)۔

   بعض اوقات دھوکہ باز اصلی ٹوکن کے کنٹریکٹ پر جعلی ٹوکن بھیجتے ہیں تاکہ قانونی حیثیت حاصل کر سکیں۔ مثال کے طور پر، [یہاں دیکھیں](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)۔ جائز ERC-20 کنٹریکٹ [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042) ہے۔ جو اسکیم اس کا روپ دھارتا ہے وہ [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe) ہے۔

   یہ بھی ممکن ہے کہ لوگ غلطی سے ہمارے کنٹریکٹ پر جائز ERC-20 ٹوکن بھیج دیں، جو انہیں باہر نکالنے کا طریقہ رکھنے کی ایک اور وجہ ہے۔

OpenZeppelin انتظامی رسائی کو فعال کرنے کے لیے دو میکانزم فراہم کرتا ہے:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) کنٹریکٹس کا ایک ہی مالک ہوتا ہے۔ وہ فنکشنز جن میں `onlyOwner` [موڈیفائر (modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) ہوتا ہے، انہیں صرف وہی مالک کال کر سکتا ہے۔ مالکان ملکیت کسی اور کو منتقل کر سکتے ہیں یا اسے مکمل طور پر ترک کر سکتے ہیں۔ دیگر تمام اکاؤنٹس کے حقوق عام طور پر یکساں ہوتے ہیں۔
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) کنٹریکٹس میں [رول بیسڈ ایکسیس کنٹرول (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) ہوتا ہے۔

سادگی کی خاطر، اس مضمون میں ہم `Ownable` استعمال کرتے ہیں۔

### کنٹریکٹس کو منجمد اور بحال کرنا {#freezing-and-thawing-contracts}

کنٹریکٹس کو منجمد (freezing) اور بحال (thawing) کرنے کے لیے کئی تبدیلیوں کی ضرورت ہوتی ہے:

- ایڈریسز سے [بولینز (booleans)](https://en.wikipedia.org/wiki/Boolean_data_type) تک ایک [میپنگ (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) تاکہ یہ ٹریک رکھا جا سکے کہ کون سے ایڈریسز منجمد ہیں۔ تمام ویلیوز ابتدائی طور پر صفر ہوتی ہیں، جسے بولین ویلیوز کے لیے false سمجھا جاتا ہے۔ ہم یہی چاہتے ہیں کیونکہ پہلے سے طے شدہ طور پر اکاؤنٹس منجمد نہیں ہوتے۔

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [ایونٹس (Events)](https://www.tutorialspoint.com/solidity/solidity_events.htm) تاکہ کسی بھی دلچسپی رکھنے والے کو مطلع کیا جا سکے جب کوئی اکاؤنٹ منجمد یا بحال ہو۔ تکنیکی طور پر ان کارروائیوں کے لیے ایونٹس کی ضرورت نہیں ہے، لیکن یہ آف چین (offchain) کوڈ کو ان ایونٹس کو سننے اور یہ جاننے میں مدد کرتا ہے کہ کیا ہو رہا ہے۔ اسمارٹ کنٹریکٹ کے لیے یہ اچھے آداب سمجھے جاتے ہیں کہ جب کوئی ایسی چیز ہو جو کسی اور سے متعلق ہو تو وہ انہیں ایمٹ (emit) کرے۔

  ایونٹس انڈیکسڈ (indexed) ہوتے ہیں اس لیے یہ تلاش کرنا ممکن ہو گا کہ کوئی اکاؤنٹ کتنی بار منجمد یا بحال ہوا ہے۔

  ```solidity
    // جب اکاؤنٹس منجمد یا غیر منجمد کیے جاتے ہیں
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- اکاؤنٹس کو منجمد اور بحال کرنے کے فنکشنز۔ یہ دونوں فنکشنز تقریباً ایک جیسے ہیں، اس لیے ہم صرف فریز (freeze) فنکشن کا جائزہ لیں گے۔

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  جن فنکشنز کو [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) کے طور پر نشان زد کیا گیا ہے انہیں دوسرے اسمارٹ کنٹریکٹس سے یا براہ راست کسی ٹرانزیکشن کے ذریعے کال کیا جا سکتا ہے۔

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    } // اکاؤنٹ منجمد کریں
  ```

  اگر اکاؤنٹ پہلے ہی منجمد ہے، تو ریورٹ (revert) کریں۔ بصورت دیگر، اسے منجمد کریں اور ایک ایونٹ `emit` کریں۔

- کسی منجمد اکاؤنٹ سے رقم کی منتقلی کو روکنے کے لیے `_beforeTokenTransfer` کو تبدیل کریں۔ نوٹ کریں کہ رقم اب بھی منجمد اکاؤنٹ میں منتقل کی جا سکتی ہے۔

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### اثاثوں کی صفائی {#asset-cleanup}

اس کنٹریکٹ کے پاس موجود ERC-20 ٹوکنز کو جاری کرنے کے لیے ہمیں اس ٹوکن کنٹریکٹ پر ایک فنکشن کال کرنے کی ضرورت ہے جس سے وہ تعلق رکھتے ہیں، یا تو [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) یا [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)۔ اس صورت میں الاؤنسز پر گیس ضائع کرنے کا کوئی فائدہ نہیں، ہم براہ راست ٹرانسفر بھی کر سکتے ہیں۔

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

جب ہمیں ایڈریس موصول ہوتا ہے تو کنٹریکٹ کے لیے ایک آبجیکٹ بنانے کا یہ سنٹیکس (syntax) ہے۔ ہم ایسا کر سکتے ہیں کیونکہ ہمارے پاس سورس کوڈ کے حصے کے طور پر ERC20 ٹوکنز کی تعریف موجود ہے (لائن 4 دیکھیں)، اور اس فائل میں [IERC20 کی تعریف](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) شامل ہے، جو کہ OpenZeppelin ERC-20 کنٹریکٹ کا انٹرفیس ہے۔

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

یہ ایک کلین اپ (cleanup) فنکشن ہے، اس لیے غالباً ہم کوئی ٹوکن نہیں چھوڑنا چاہتے۔ صارف سے دستی طور پر بیلنس حاصل کرنے کے بجائے، ہم اس عمل کو خودکار بھی بنا سکتے ہیں۔

## نتیجہ {#conclusion}

یہ کوئی کامل حل نہیں ہے - "صارف نے غلطی کی" کے مسئلے کا کوئی کامل حل نہیں ہے۔ تاہم، اس قسم کے چیکس کا استعمال کم از کم کچھ غلطیوں کو روک سکتا ہے۔ اکاؤنٹس کو منجمد کرنے کی صلاحیت، اگرچہ خطرناک ہے، ہیکر کو چوری شدہ فنڈز سے محروم کر کے بعض ہیکس کے نقصان کو محدود کرنے کے لیے استعمال کی جا سکتی ہے۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔