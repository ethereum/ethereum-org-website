---
title: "اسکیم ٹوکنز کے ذریعے استعمال ہونے والی کچھ چالیں اور ان کا پتہ لگانے کا طریقہ"
description: اس ٹیوٹوریل میں ہم ایک اسکیم ٹوکن کا تجزیہ کرتے ہیں تاکہ یہ دیکھا جا سکے کہ اسکیمرز کون سی چالیں چلتے ہیں، وہ انہیں کیسے نافذ کرتے ہیں، اور ہم ان کا کیسے پتہ لگا سکتے ہیں۔
author: اوری پومرانٹز
tags: ["اسکیم", "solidity", "erc-20", "javascript", "typescript"]
skill: intermediate
breadcrumb: اسکیم ٹوکن کی چالیں
published: 2023-09-15
lang: ur
---

اس ٹیوٹوریل میں ہم [ایک اسکیم ٹوکن](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) کا تجزیہ کرتے ہیں تاکہ یہ دیکھا جا سکے کہ اسکیمرز کون سی چالیں چلتے ہیں اور وہ انہیں کیسے نافذ کرتے ہیں۔ ٹیوٹوریل کے اختتام تک آپ کو ERC-20 ٹوکن کنٹریکٹس، ان کی صلاحیتوں، اور شکوک و شبہات کی ضرورت کے بارے میں زیادہ جامع نظریہ حاصل ہو جائے گا۔ پھر ہم اس اسکیم ٹوکن کے ذریعے خارج ہونے والے ایونٹس کو دیکھتے ہیں اور یہ جاننے کی کوشش کرتے ہیں کہ ہم خودکار طریقے سے کیسے پہچان سکتے ہیں کہ یہ جائز نہیں ہے۔

## اسکیم ٹوکنز - یہ کیا ہیں، لوگ انہیں کیوں بناتے ہیں، اور ان سے کیسے بچا جائے {#scam-tokens}

Ethereum کا ایک سب سے عام استعمال کسی گروپ کے لیے ایک قابل تجارت ٹوکن بنانا ہے، جو ایک لحاظ سے ان کی اپنی کرنسی ہوتی ہے۔ تاہم، جہاں کہیں بھی جائز استعمال کے معاملات ہوتے ہیں جو قدر لاتے ہیں، وہاں ایسے مجرم بھی ہوتے ہیں جو اس قدر کو اپنے لیے چرانے کی کوشش کرتے ہیں۔

آپ صارف کے نقطہ نظر سے اس موضوع کے بارے میں [ethereum.org پر کہیں اور](/guides/how-to-id-scam-tokens/) مزید پڑھ سکتے ہیں۔ یہ ٹیوٹوریل ایک اسکیم ٹوکن کا تجزیہ کرنے پر مرکوز ہے تاکہ یہ دیکھا جا سکے کہ یہ کیسے کیا جاتا ہے اور اس کا پتہ کیسے لگایا جا سکتا ہے۔

### مجھے کیسے معلوم ہوگا کہ wARB ایک اسکیم ہے؟ {#warb-scam}

جس ٹوکن کا ہم تجزیہ کر رہے ہیں وہ [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ہے، جو جائز [ARB ٹوکن](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) کے مساوی ہونے کا دکھاوا کرتا ہے۔

یہ جاننے کا سب سے آسان طریقہ کہ کون سا ٹوکن جائز ہے، اس کی بانی تنظیم، [Arbitrum](https://arbitrum.foundation/) کو دیکھنا ہے۔ جائز ایڈریسز [ان کی دستاویزات میں](https://docs.arbitrum.foundation/deployment-addresses#token) بتائے گئے ہیں۔

### سورس کوڈ کیوں دستیاب ہے؟ {#why-source}

عام طور پر ہم توقع کرتے ہیں کہ جو لوگ دوسروں کو دھوکہ دینے کی کوشش کرتے ہیں وہ خفیہ رہتے ہیں، اور واقعی بہت سے اسکیم ٹوکنز کا کوڈ دستیاب نہیں ہوتا (مثال کے طور پر، [یہ والا](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) اور [یہ والا](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code))۔

تاہم، جائز ٹوکنز عام طور پر اپنا سورس کوڈ شائع کرتے ہیں، اس لیے جائز نظر آنے کے لیے اسکیم ٹوکنز کے مصنفین بھی بعض اوقات ایسا ہی کرتے ہیں۔ [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ان ٹوکنز میں سے ایک ہے جس کا سورس کوڈ دستیاب ہے، جس سے اسے سمجھنا آسان ہو جاتا ہے۔

اگرچہ کنٹریکٹ ڈیپلائرز یہ انتخاب کر سکتے ہیں کہ سورس کوڈ شائع کیا جائے یا نہیں، لیکن وہ غلط سورس کوڈ شائع _نہیں_ کر سکتے۔ بلاک ایکسپلورر فراہم کردہ سورس کوڈ کو آزادانہ طور پر کمپائل کرتا ہے، اور اگر اسے بالکل وہی بائٹ کوڈ نہیں ملتا، تو وہ اس سورس کوڈ کو مسترد کر دیتا ہے۔ [آپ Etherscan کی سائٹ پر اس کے بارے میں مزید پڑھ سکتے ہیں](https://etherscan.io/verifyContract)۔

## جائز ERC-20 ٹوکنز سے موازنہ {#compare-legit-erc20}

ہم اس ٹوکن کا موازنہ جائز ERC-20 ٹوکنز سے کرنے جا رہے ہیں۔ اگر آپ اس بات سے واقف نہیں ہیں کہ جائز ERC-20 ٹوکنز عام طور پر کیسے لکھے جاتے ہیں، تو [یہ ٹیوٹوریل دیکھیں](/developers/tutorials/erc20-annotated-code/)۔

### مراعات یافتہ ایڈریسز کے لیے کنسٹنٹس (Constants) {#constants-for-privileged-addresses}

کنٹریکٹس کو بعض اوقات مراعات یافتہ ایڈریسز کی ضرورت ہوتی ہے۔ طویل مدتی استعمال کے لیے بنائے گئے کنٹریکٹس کسی مراعات یافتہ ایڈریس کو ان ایڈریسز کو تبدیل کرنے کی اجازت دیتے ہیں، مثال کے طور پر ایک نئے ملٹی سگ (multisig) کنٹریکٹ کے استعمال کو فعال کرنے کے لیے۔ ایسا کرنے کے کئی طریقے ہیں۔

[`HOP` ٹوکن کنٹریکٹ](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) پیٹرن کا استعمال کرتا ہے۔ مراعات یافتہ ایڈریس کو اسٹوریج میں `_owner` نامی فیلڈ میں رکھا جاتا ہے (تیسری فائل، `Ownable.sol` دیکھیں)۔

```solidity
    address private _owner;
```

[`ARB` ٹوکن کنٹریکٹ](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) میں براہ راست کوئی مراعات یافتہ ایڈریس نہیں ہوتا۔ تاہم، اسے اس کی ضرورت بھی نہیں ہے۔ یہ [ایڈریس `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) پر ایک [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) کے پیچھے موجود ہے۔ اس کنٹریکٹ میں ایک مراعات یافتہ ایڈریس ہوتا ہے (چوتھی فائل، `ERC1967Upgrade.sol` دیکھیں) جسے اپ گریڈز کے لیے استعمال کیا جا سکتا ہے۔

```solidity
    bytes32 private constant _ADMIN_SLOT = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;
```

اس کے برعکس، `wARB` کنٹریکٹ میں ایک ہارڈ کوڈڈ `contract_owner` ہوتا ہے۔

```solidity
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
```

[یہ کنٹریکٹ اونر](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) کوئی ایسا کنٹریکٹ نہیں ہے جسے مختلف اوقات میں مختلف اکاؤنٹس کے ذریعے کنٹرول کیا جا سکے، بلکہ یہ ایک [ایکسٹرنلی اونڈ اکاؤنٹ (externally owned account)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ہے۔ اس کا مطلب ہے کہ اسے ممکنہ طور پر کسی فرد کے ذریعے قلیل مدتی استعمال کے لیے ڈیزائن کیا گیا ہے، نہ کہ ایک ایسے ERC-20 کو کنٹرول کرنے کے طویل مدتی حل کے طور پر جو قیمتی رہے گا۔

اور واقعی، اگر ہم Etherscan میں دیکھیں تو ہمیں معلوم ہوتا ہے کہ اسکیمر نے اس کنٹریکٹ کو 19 مئی 2023 کے دوران صرف 12 گھنٹے ([پہلی ٹرانزیکشن](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) سے [آخری ٹرانزیکشن](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b) تک) کے لیے استعمال کیا۔

### جعلی `_transfer` فنکشن {#the-fake-transfer-function}

یہ ایک معیاری طریقہ ہے کہ اصل ٹرانسفرز [ایک اندرونی `_transfer` فنکشن](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) کا استعمال کرتے ہوئے ہوں۔

`wARB` میں یہ فنکشن تقریباً جائز لگتا ہے:

```solidity
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[sender] = senderBalance - amount;
        }
        _balances[recipient] += amount;

        if (sender == contract_owner) {
            emit Transfer(deployer, recipient, amount);
        } else {
            emit Transfer(sender, recipient, amount);
        }

        _afterTokenTransfer(sender, recipient, amount);
    }
```

مشکوک حصہ یہ ہے:

```solidity
        if (sender == contract_owner) {
            emit Transfer(deployer, recipient, amount);
        } else {
            emit Transfer(sender, recipient, amount);
        }
```

اگر کنٹریکٹ کا مالک ٹوکن بھیجتا ہے، تو `Transfer` ایونٹ یہ کیوں دکھاتا ہے کہ وہ `deployer` کی طرف سے آئے ہیں؟

تاہم، ایک زیادہ اہم مسئلہ ہے۔ اس `_transfer` فنکشن کو کون کال کرتا ہے؟ اسے باہر سے کال نہیں کیا جا سکتا، اسے `internal` کے طور پر مارک کیا گیا ہے۔ اور ہمارے پاس موجود کوڈ میں `_transfer` کی کوئی کال شامل نہیں ہے۔ واضح طور پر، یہ یہاں ایک دھوکے کے طور پر موجود ہے۔

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _f_(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][_msgSender()];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        unchecked {
            _approve(sender, _msgSender(), currentAllowance - amount);
        }

        return true;
    }
```

جب ہم ان فنکشنز کو دیکھتے ہیں جنہیں ٹوکن ٹرانسفر کرنے کے لیے کال کیا جاتا ہے، یعنی `transfer` اور `transferFrom`، تو ہم دیکھتے ہیں کہ وہ ایک بالکل مختلف فنکشن، `_f_` کو کال کرتے ہیں۔

### اصلی `_f_` فنکشن {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal virtual _mod_(sender, recipient, amount) {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[sender] = senderBalance - amount;
        }
        _balances[recipient] += amount;

        if (sender == contract_owner) {
            emit Transfer(deployer, recipient, amount);
        } else {
            emit Transfer(sender, recipient, amount);
        }

        _afterTokenTransfer(sender, recipient, amount);
    }
```

اس فنکشن میں دو ممکنہ خطرے کی نشانیاں (red flags) ہیں۔

- [فنکشن موڈیفائر (function modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` کا استعمال۔ تاہم، جب ہم سورس کوڈ میں دیکھتے ہیں تو ہمیں معلوم ہوتا ہے کہ `_mod_` دراصل بے ضرر ہے۔

  ```solidity
      modifier _mod_(address sender, address recipient, uint256 amount) {
          _;
      }
  ```

- وہی مسئلہ جو ہم نے `_transfer` میں دیکھا تھا، یعنی جب `contract_owner` ٹوکن بھیجتا ہے تو وہ `deployer` کی طرف سے آتے ہوئے دکھائی دیتے ہیں۔

### جعلی ایونٹس کا فنکشن `dropNewTokens` {#the-fake-events-function-dropNewTokens}

اب ہم ایک ایسی چیز کی طرف آتے ہیں جو ایک حقیقی اسکیم کی طرح لگتی ہے۔ میں نے پڑھنے میں آسانی کے لیے فنکشن میں تھوڑی سی ترمیم کی ہے، لیکن یہ فنکشنلٹی کے لحاظ سے بالکل یکساں ہے۔

```solidity
    function dropNewTokens(address pool_address, address[] calldata receivers, uint256[] calldata amounts) public auth {
        for (uint256 i = 0; i < receivers.length; i++) {
            emit Transfer(pool_address, receivers[i], amounts[i]);
        }
    }
```

اس فنکشن میں `auth()` موڈیفائر ہے، جس کا مطلب ہے کہ اسے صرف کنٹریکٹ کا مالک ہی کال کر سکتا ہے۔

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed");
        _;
    }
```

یہ پابندی بالکل معقول ہے، کیونکہ ہم نہیں چاہیں گے کہ کوئی بھی عام اکاؤنٹ ٹوکن تقسیم کرے۔ تاہم، باقی فنکشن مشکوک ہے۔

```solidity
        for (uint256 i = 0; i < receivers.length; i++) {
            emit Transfer(pool_address, receivers[i], amounts[i]);
        }
```

ایک پول اکاؤنٹ سے وصول کنندگان کی ایک ارے (array) کو رقوم کی ایک ارے ٹرانسفر کرنے کا فنکشن بالکل معقول ہے۔ ایسے بہت سے استعمال کے معاملات ہیں جن میں آپ ایک ہی ذریعہ سے متعدد مقامات پر ٹوکن تقسیم کرنا چاہیں گے، جیسے پے رول، ایئر ڈراپس وغیرہ۔ متعدد ٹرانزیکشنز جاری کرنے، یا یہاں تک کہ ایک ہی ٹرانزیکشن کے حصے کے طور پر کسی مختلف کنٹریکٹ سے ERC-20 کو متعدد بار کال کرنے کے بجائے اسے ایک ہی ٹرانزیکشن میں کرنا (گیس کے لحاظ سے) سستا ہے۔

تاہم، `dropNewTokens` ایسا نہیں کرتا۔ یہ [`Transfer` ایونٹس](https://eips.ethereum.org/EIPS/eip-20#transfer-1) خارج کرتا ہے، لیکن درحقیقت کوئی ٹوکن ٹرانسفر نہیں کرتا۔ آف چین ایپلی کیشنز کو ایک ایسے ٹرانسفر کے بارے میں بتا کر الجھانے کی کوئی جائز وجہ نہیں ہے جو حقیقت میں ہوا ہی نہیں۔

### برننگ (burning) `Approve` فنکشن {#the-burning-approve-function}

ERC-20 کنٹریکٹس میں الاؤنسز کے لیے [ایک `approve` فنکشن](/developers/tutorials/erc20-annotated-code/#approve) ہونا چاہیے، اور واقعی ہمارے اسکیم ٹوکن میں ایسا فنکشن موجود ہے، اور یہ درست بھی ہے۔ تاہم، چونکہ Solidity زبان C سے ماخوذ ہے، اس لیے یہ کیس سینسیٹو (case significant) ہے۔ "Approve" اور "approve" مختلف اسٹرنگز (strings) ہیں۔

اس کے علاوہ، اس کی فنکشنلٹی کا `approve` سے کوئی تعلق نہیں ہے۔

```solidity
    function Approve(address[] memory holders)  public approver {
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _balances[holders[i]] = _balances[holders[i]] - amount;
            _balances[address(0x0000000000000000000000000000000000000001)] = _balances[address(0x0000000000000000000000000000000000000001)] + amount;
            emit Transfer(holders[i], address(0x0000000000000000000000000000000000000001), amount);
        }
    }
```

اس فنکشن کو ٹوکن ہولڈرز کے ایڈریسز کی ایک ارے کے ساتھ کال کیا جاتا ہے۔

```solidity
    function Approve(address[] memory holders)  public approver {
```

`approver()` موڈیفائر اس بات کو یقینی بناتا ہے کہ صرف `contract_owner` کو اس فنکشن کو کال کرنے کی اجازت ہو (نیچے دیکھیں)۔

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _balances[holders[i]] = _balances[holders[i]] - amount;
            _balances[address(0x0000000000000000000000000000000000000001)] = _balances[address(0x0000000000000000000000000000000000000001)] + amount;
            emit Transfer(holders[i], address(0x0000000000000000000000000000000000000001), amount);
        }
```

ہر ہولڈر کے ایڈریس کے لیے، یہ فنکشن ہولڈر کا پورا بیلنس ایڈریس `0x00...01` پر منتقل کر دیتا ہے، جو مؤثر طریقے سے اسے برن (burn) کر دیتا ہے (معیار میں اصل `burn` کل سپلائی کو بھی تبدیل کرتا ہے، اور ٹوکنز کو `0x00...00` پر ٹرانسفر کرتا ہے)۔ اس کا مطلب ہے کہ `contract_owner` کسی بھی صارف کے اثاثے ہٹا سکتا ہے۔ یہ کوئی ایسا فیچر نہیں لگتا جو آپ کسی گورننس ٹوکن میں چاہیں گے۔

### کوڈ کے معیار کے مسائل {#code-quality-issues}

کوڈ کے معیار کے یہ مسائل یہ _ثابت_ نہیں کرتے کہ یہ کوڈ ایک اسکیم ہے، لیکن یہ اسے مشکوک بناتے ہیں۔ Arbitrum جیسی منظم کمپنیاں عام طور پر اتنا خراب کوڈ جاری نہیں کرتیں۔

#### `mount` فنکشن {#the-mount-function}

اگرچہ یہ [معیار](https://eips.ethereum.org/EIPS/eip-20) میں متعین نہیں ہے، لیکن عام طور پر نئے ٹوکن بنانے والے فنکشن کو [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) کہا جاتا ہے۔

اگر ہم `wARB` کنسٹرکٹر میں دیکھیں، تو ہم دیکھتے ہیں کہ منٹ (mint) فنکشن کا نام کسی وجہ سے بدل کر `mount` رکھ دیا گیا ہے، اور کارکردگی کے لیے پوری رقم کے لیے ایک بار کال کرنے کے بجائے، اسے ابتدائی سپلائی کے پانچویں حصے کے ساتھ پانچ بار کال کیا گیا ہے۔

```solidity
    constructor() {
        mount(msg.sender, 2000000000 * 10 ** decimals());
        mount(msg.sender, 2000000000 * 10 ** decimals());
        mount(msg.sender, 2000000000 * 10 ** decimals());
        mount(msg.sender, 2000000000 * 10 ** decimals());
        mount(msg.sender, 2000000000 * 10 ** decimals());
    }
```

خود `mount` فنکشن بھی مشکوک ہے۔

```solidity
    function mount(address account, uint256 amount) public virtual {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
        _totalSupply += amount;
        _balances[contract_owner] += amount;
        emit Transfer(address(0), account, amount);
    }
```

`require` کو دیکھتے ہوئے، ہم دیکھتے ہیں کہ صرف کنٹریکٹ کے مالک کو منٹ کرنے کی اجازت ہے۔ یہ جائز ہے۔ لیکن ایرر میسج _only owner is allowed to mint_ یا اس جیسا کچھ ہونا چاہیے۔ اس کے بجائے، یہ غیر متعلقہ _ERC20: mint to the zero address_ ہے۔ زیرو ایڈریس پر منٹ کرنے کا درست ٹیسٹ `require(account != address(0), "<error message>")` ہے، جسے چیک کرنے کی زحمت یہ کنٹریکٹ کبھی نہیں کرتا۔

```solidity
        _balances[contract_owner] += amount;
        emit Transfer(address(0), account, amount);
```

منٹنگ سے براہ راست متعلق دو مزید مشکوک حقائق ہیں:

- اس میں ایک `account` پیرامیٹر ہے، جو غالباً وہ اکاؤنٹ ہے جسے منٹ کی گئی رقم وصول کرنی چاہیے۔ لیکن جو بیلنس بڑھتا ہے وہ دراصل `contract_owner` کا ہوتا ہے۔
- اگرچہ بڑھا ہوا بیلنس `contract_owner` کا ہوتا ہے، لیکن خارج ہونے والا ایونٹ `account` میں ٹرانسفر دکھاتا ہے۔

### `auth` اور `approver` دونوں کیوں؟ وہ `mod` کیوں جو کچھ نہیں کرتا؟ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

اس کنٹریکٹ میں تین موڈیفائرز شامل ہیں: `_mod_`، `auth`، اور `approver`۔

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount) {
        _;
    }
```

`_mod_` تین پیرامیٹرز لیتا ہے اور ان کے ساتھ کچھ نہیں کرتا۔ اسے کیوں رکھا گیا ہے؟

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed");
        _;
    }
```

`auth` اور `approver` زیادہ معقول لگتے ہیں، کیونکہ وہ چیک کرتے ہیں کہ کنٹریکٹ کو `contract_owner` نے کال کیا تھا۔ ہم توقع کریں گے کہ کچھ مراعات یافتہ کارروائیاں، جیسے منٹنگ، اسی اکاؤنٹ تک محدود ہوں۔ تاہم، دو الگ الگ فنکشنز رکھنے کا کیا فائدہ جو _بالکل ایک ہی کام_ کرتے ہیں؟

## ہم خودکار طریقے سے کیا پتہ لگا سکتے ہیں؟ {#what-can-we-detect-automatically}

ہم Etherscan کو دیکھ کر جان سکتے ہیں کہ `wARB` ایک اسکیم ٹوکن ہے۔ تاہم، یہ ایک سینٹرلائزڈ حل ہے۔ نظریاتی طور پر، Etherscan کو سبوتاژ یا ہیک کیا جا سکتا ہے۔ یہ بہتر ہے کہ ہم آزادانہ طور پر یہ جان سکیں کہ آیا کوئی ٹوکن جائز ہے یا نہیں۔

کچھ ایسی چالیں ہیں جنہیں ہم یہ پہچاننے کے لیے استعمال کر سکتے ہیں کہ آیا کوئی ERC-20 ٹوکن مشکوک ہے (یا تو اسکیم ہے یا بہت بری طرح لکھا گیا ہے)، ان کے خارج کردہ ایونٹس کو دیکھ کر۔

## مشکوک `Approval` ایونٹس {#suspicious-approval-events}

[`Approval` ایونٹس](https://eips.ethereum.org/EIPS/eip-20#approval) صرف براہ راست درخواست کے ساتھ ہونے چاہئیں (اس کے برعکس [`Transfer` ایونٹس](https://eips.ethereum.org/EIPS/eip-20#transfer-1) جو الاؤنس کے نتیجے میں ہو سکتے ہیں)۔ اس مسئلے کی تفصیلی وضاحت کے لیے کہ درخواستیں کسی کنٹریکٹ کے ذریعے ثالثی کے بجائے براہ راست کیوں ہونی چاہئیں، [Solidity کی دستاویزات دیکھیں](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)۔

اس کا مطلب ہے کہ `Approval` ایونٹس جو کسی [ایکسٹرنلی اونڈ اکاؤنٹ](/developers/docs/accounts/#types-of-account) سے خرچ کرنے کی منظوری دیتے ہیں، انہیں ایسی ٹرانزیکشنز سے آنا چاہیے جو اسی اکاؤنٹ سے شروع ہوں، اور جن کی منزل ERC-20 کنٹریکٹ ہو۔ ایکسٹرنلی اونڈ اکاؤنٹ سے کسی بھی دوسری قسم کی منظوری مشکوک ہے۔

یہاں [ایک پروگرام ہے جو اس قسم کے ایونٹ کی نشاندہی کرتا ہے](https://github.com/qbzzt/20230915-scam-token-detection)، جس میں [viem](https://viem.sh/) اور [TypeScript](https://www.typescriptlang.org/docs/) کا استعمال کیا گیا ہے، جو ٹائپ سیفٹی کے ساتھ JavaScript کی ایک قسم ہے۔ اسے چلانے کے لیے:

1. `.env.example` کو `.env` میں کاپی کریں۔
2. Ethereum مین نیٹ نوڈ کا URL فراہم کرنے کے لیے `.env` میں ترمیم کریں۔
3. ضروری پیکجز انسٹال کرنے کے لیے `pnpm install` چلائیں۔
4. مشکوک منظوریوں کو تلاش کرنے کے لیے `pnpm susApproval` چلائیں۔

یہاں لائن بہ لائن وضاحت دی گئی ہے:

```typescript
import { Address, createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'
```

`viem` سے ٹائپ ڈیفینیشنز، فنکشنز، اور چین ڈیفینیشن امپورٹ کریں۔

```typescript
import * as dotenv from 'dotenv'
dotenv.config()
```

URL حاصل کرنے کے لیے `.env` پڑھیں۔

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.RPC_URL),
})
```

ایک Viem کلائنٹ بنائیں۔ ہمیں صرف بلاک چین سے پڑھنے کی ضرورت ہے، اس لیے اس کلائنٹ کو پرائیویٹ کلید کی ضرورت نہیں ہے۔

```typescript
const susContract = '0xb047c8032b99841713b8e3872f06cf32beb27b82'
const startBlock = 17290000n
const endBlock = 17295000n
```

مشکوک ERC-20 کنٹریکٹ کا ایڈریس، اور وہ بلاکس جن کے اندر ہم ایونٹس تلاش کریں گے۔ نوڈ فراہم کنندگان عام طور پر ایونٹس پڑھنے کی ہماری صلاحیت کو محدود کرتے ہیں کیونکہ بینڈوتھ مہنگی ہو سکتی ہے۔ خوش قسمتی سے `wARB` اٹھارہ گھنٹے کے عرصے تک استعمال میں نہیں تھا، اس لیے ہم تمام ایونٹس تلاش کر سکتے ہیں (کل ملا کر صرف 13 تھے)۔

```typescript
  const events = await client.getLogs({
    address: susContract,
    event: parseAbiItem('event Approval(address indexed _owner, address indexed _spender, uint256 _value)'),
    fromBlock: startBlock,
    toBlock: endBlock
  })
```

یہ Viem سے ایونٹ کی معلومات مانگنے کا طریقہ ہے۔ جب ہم اسے فیلڈ کے ناموں سمیت درست ایونٹ سگنیچر فراہم کرتے ہیں، تو یہ ہمارے لیے ایونٹ کو پارس (parse) کرتا ہے۔

```typescript
const isEOA = async (addr: Address): Promise<boolean> => {
  const bytecode = await client.getBytecode({ address: addr })
  return bytecode === undefined
}
```

ہمارا الگورتھم صرف ایکسٹرنلی اونڈ اکاؤنٹس پر لاگو ہوتا ہے۔ اگر `client.getBytecode` کے ذریعے کوئی بائٹ کوڈ واپس کیا جاتا ہے تو اس کا مطلب ہے کہ یہ ایک کنٹریکٹ ہے اور ہمیں اسے چھوڑ دینا چاہیے۔

اگر آپ نے پہلے TypeScript استعمال نہیں کی ہے، تو فنکشن کی تعریف تھوڑی عجیب لگ سکتی ہے۔ ہم اسے صرف یہ نہیں بتاتے کہ پہلے (اور واحد) پیرامیٹر کا نام `addr` ہے، بلکہ یہ بھی بتاتے ہیں کہ یہ `Address` ٹائپ کا ہے۔ اسی طرح، `: boolean` حصہ TypeScript کو بتاتا ہے کہ فنکشن کی ریٹرن ویلیو ایک بولین (boolean) ہے۔

```typescript
const getTxn = async (ev: any) => {
  return await client.getTransaction({ hash: ev.transactionHash })
}
```

یہ فنکشن کسی ایونٹ سے ٹرانزیکشن کی رسید حاصل کرتا ہے۔ ہمیں رسید کی ضرورت ہوتی ہے تاکہ یہ یقینی بنایا جا سکے کہ ہمیں معلوم ہے کہ ٹرانزیکشن کی منزل کیا تھی۔

```typescript
const isSus = async (ev: any): Promise<any | null> => {
```

یہ سب سے اہم فنکشن ہے، جو دراصل یہ فیصلہ کرتا ہے کہ آیا کوئی ایونٹ مشکوک ہے یا نہیں۔ ریٹرن ٹائپ، `(Event | null)`، TypeScript کو بتاتی ہے کہ یہ فنکشن یا تو `Event` یا `null` واپس کر سکتا ہے۔ اگر ایونٹ مشکوک نہیں ہے تو ہم `null` واپس کرتے ہیں۔

```typescript
  const owner = ev.args._owner
```

Viem کے پاس فیلڈ کے نام ہیں، اس لیے اس نے ہمارے لیے ایونٹ کو پارس کیا۔ `_owner` ان ٹوکنز کا مالک ہے جنہیں خرچ کیا جانا ہے۔

```typescript
  if (!await isEOA(owner))
    return null
```

اگر مالک ایک کنٹریکٹ ہے، تو فرض کریں کہ یہ منظوری مشکوک نہیں ہے۔ یہ چیک کرنے کے لیے کہ آیا کسی کنٹریکٹ کی منظوری مشکوک ہے یا نہیں، ہمیں ٹرانزیکشن کے مکمل عمل کو ٹریس کرنا ہوگا تاکہ یہ دیکھا جا سکے کہ آیا یہ کبھی مالک کے کنٹریکٹ تک پہنچی، اور کیا اس کنٹریکٹ نے براہ راست ERC-20 کنٹریکٹ کو کال کیا۔ یہ اس سے کہیں زیادہ وسائل طلب کام ہے جتنا ہم کرنا چاہیں گے۔

```typescript
  const txn = await getTxn(ev)
```

اگر منظوری کسی ایکسٹرنلی اونڈ اکاؤنٹ سے آتی ہے، تو وہ ٹرانزیکشن حاصل کریں جس کی وجہ سے یہ ہوئی۔

```typescript
  if (txn.from.toLowerCase() !== owner.toLowerCase())
    return ev
```

ہم صرف اسٹرنگ کی برابری چیک نہیں کر سکتے کیونکہ ایڈریسز ہیکسا ڈیسیمل (hexadecimal) ہوتے ہیں، اس لیے ان میں حروف شامل ہوتے ہیں۔ بعض اوقات، مثال کے طور پر `txn.from` میں، وہ حروف تمام چھوٹے (lowercase) ہوتے ہیں۔ دیگر صورتوں میں، جیسے `ev.args._owner`، ایڈریس [ایرر کی شناخت کے لیے مکسڈ کیس (mixed-case)](https://eips.ethereum.org/EIPS/eip-55) میں ہوتا ہے۔

لیکن اگر ٹرانزیکشن مالک کی طرف سے نہیں ہے، اور وہ مالک ایکسٹرنلی اونڈ ہے، تو ہمارے پاس ایک مشکوک ٹرانزیکشن ہے۔

```typescript
  if (txn.to?.toLowerCase() !== susContract.toLowerCase())
    return ev
```

اسی طرح، اگر ٹرانزیکشن کا `to` ایڈریس، یعنی پہلا کال کیا گیا کنٹریکٹ، زیر تفتیش ERC-20 کنٹریکٹ نہیں ہے تو یہ مشکوک ہے۔

```typescript
  return null
}
```

اگر دونوں میں سے کوئی بھی شرط درست نہیں ہے تو `Approval` ایونٹ مشکوک نہیں ہے۔

```typescript
  const susEvents = (await Promise.all(events.map(isSus))).filter(x => x !== null)
```

[ایک `async` فنکشن](https://www.w3schools.com/js/js_async.asp) ایک `Promise` آبجیکٹ واپس کرتا ہے۔ عام سنٹیکس، `await x()` کے ساتھ، ہم پروسیسنگ جاری رکھنے سے پہلے اس `Promise` کے پورا ہونے کا انتظار کرتے ہیں۔ اسے پروگرام کرنا اور اس پر عمل کرنا آسان ہے، لیکن یہ غیر موثر بھی ہے۔ جب ہم کسی مخصوص ایونٹ کے لیے `Promise` کے پورا ہونے کا انتظار کر رہے ہوتے ہیں تو ہم پہلے ہی اگلے ایونٹ پر کام شروع کر سکتے ہیں۔

یہاں ہم `Promise` آبجیکٹس کی ایک ارے بنانے کے لیے [`map`](https://www.w3schools.com/jsref/jsref_map.asp) کا استعمال کرتے ہیں۔ پھر ہم ان تمام وعدوں (promises) کے حل ہونے کا انتظار کرنے کے لیے [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) کا استعمال کرتے ہیں۔ اس کے بعد ہم غیر مشکوک ایونٹس کو ہٹانے کے لیے ان نتائج کو [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) کرتے ہیں۔

### مشکوک `Transfer` ایونٹس {#suspicious-transfer-events}

اسکیم ٹوکنز کی شناخت کا ایک اور ممکنہ طریقہ یہ دیکھنا ہے کہ آیا ان میں کوئی مشکوک ٹرانسفرز ہیں۔ مثال کے طور پر، ایسے اکاؤنٹس سے ٹرانسفرز جن کے پاس اتنے ٹوکنز نہیں ہیں۔ آپ دیکھ سکتے ہیں کہ [اس ٹیسٹ کو کیسے نافذ کیا جائے](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)، لیکن `wARB` میں یہ مسئلہ نہیں ہے۔

## نتیجہ {#conclusion}

ERC-20 اسکیمز کی خودکار شناخت [فالس نیگیٹوز (false negatives)](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) کا شکار ہوتی ہے، کیونکہ ایک اسکیم بالکل نارمل ERC-20 ٹوکن کنٹریکٹ استعمال کر سکتا ہے جو محض کسی حقیقی چیز کی نمائندگی نہیں کرتا۔ اس لیے آپ کو ہمیشہ _کسی قابل اعتماد ذریعہ سے ٹوکن کا ایڈریس حاصل کرنے_ کی کوشش کرنی چاہیے۔

خودکار شناخت کچھ معاملات میں مدد کر سکتی ہے، جیسے DeFi کے حصے، جہاں بہت سے ٹوکنز ہوتے ہیں اور انہیں خودکار طریقے سے ہینڈل کرنے کی ضرورت ہوتی ہے۔ لیکن ہمیشہ کی طرح [خریدنے والا ہوشیار رہے (caveat emptor)](https://www.investopedia.com/terms/c/caveatemptor.asp)، اپنی تحقیق خود کریں، اور اپنے صارفین کو بھی ایسا کرنے کی ترغیب دیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔