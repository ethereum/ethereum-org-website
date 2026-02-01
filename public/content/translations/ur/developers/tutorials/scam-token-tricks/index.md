---
title: "اسکیم ٹوکنز کے ذریعہ استعمال ہونے والی کچھ ترکیبیں اور ان کا پتہ لگانے کا طریقہ"
description: "اس ٹیوٹوریل میں ہم ایک اسکیم ٹوکن کا تجزیہ کرتے ہیں تاکہ یہ دیکھ سکیں کہ اسکامرس کونسی ترکیبیں استعمال کرتے ہیں، وہ انہیں کیسے نافذ کرتے ہیں، اور ہم ان کا پتہ کیسے لگا سکتے ہیں۔"
author: "اوری پومیرانٹز"
tags:
  [
    "اسکیم",
    "solidity",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: ur-in
---

اس ٹیوٹوریل میں ہم [ایک اسکیم ٹوکن](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) کا تجزیہ کرتے ہیں تاکہ یہ دیکھ سکیں کہ اسکامرس کونسی ترکیبیں استعمال کرتے ہیں اور وہ انہیں کیسے نافذ کرتے ہیں۔ ٹیوٹوریل کے اختتام تک آپ کو ERC-20 ٹوکن معاہدوں، ان کی صلاحیتوں، اور شکوک و شبہات کی ضرورت کیوں ہے اس کا ایک زیادہ جامع نظریہ حاصل ہو جائے گا۔ پھر ہم اس اسکیم ٹوکن کے ذریعہ جاری کردہ ایونٹس کو دیکھتے ہیں اور دیکھتے ہیں کہ ہم خود بخود اس کی شناخت کیسے کرسکتے ہیں کہ یہ قانونی نہیں ہے۔

## اسکیم ٹوکنز - وہ کیا ہیں، لوگ انہیں کیوں کرتے ہیں، اور ان سے کیسے بچا جائے {#scam-tokens}

ایتھیریم کے سب سے عام استعمالات میں سے ایک یہ ہے کہ ایک گروپ ایک قابل تجارت ٹوکن بنائے، ایک طرح سے ان کی اپنی کرنسی۔ تاہم، جہاں کہیں بھی جائز استعمال کے معاملات ہیں جو قدر لاتے ہیں، وہاں مجرم بھی ہیں جو اس قدر کو اپنے لیے چرانے کی کوشش کرتے ہیں۔

آپ اس موضوع کے بارے میں مزید [ethereum.org پر کہیں اور](/guides/how-to-id-scam-tokens/) صارف کے نقطہ نظر سے پڑھ سکتے ہیں۔ یہ ٹیوٹوریل ایک اسکیم ٹوکن کا تجزیہ کرنے پر مرکوز ہے تاکہ یہ دیکھا جا سکے کہ یہ کیسے کیا جاتا ہے اور اس کا پتہ کیسے لگایا جا سکتا ہے۔

### مجھے کیسے پتہ چلے گا کہ wARB ایک اسکیم ہے؟ {#warb-scam}

جس ٹوکن کا ہم تجزیہ کر رہے ہیں وہ [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ہے، جو کہ قانونی [ARB ٹوکن](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) کے برابر ہونے کا بہانہ کرتا ہے۔

یہ جاننے کا سب سے آسان طریقہ کہ کونسا ٹوکن قانونی ہے، اس کی اصلی تنظیم [Arbitrum](https://arbitrum.foundation/) کو دیکھنا ہے۔ جائز پتے [ان کی دستاویزات](https://docs.arbitrum.foundation/deployment-addresses#token) میں بتائے گئے ہیں۔

### سورس کوڈ کیوں دستیاب ہے؟ {#why-source}

عام طور پر ہم توقع کرتے ہیں کہ جو لوگ دوسروں کو اسکیم کرنے کی کوشش کرتے ہیں وہ خفیہ ہوتے ہیں، اور واقعی بہت سے اسکیم ٹوکنز کا کوڈ دستیاب نہیں ہوتا ہے (مثال کے طور پر، [یہ والا](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) اور [یہ والا](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code))۔

تاہم، قانونی ٹوکن عام طور پر اپنے سورس کوڈ کو شائع کرتے ہیں، لہذا قانونی نظر آنے کے لیے اسکیم ٹوکنز کے مصنفین کبھی کبھی ایسا ہی کرتے ہیں۔ [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ان ٹوکنز میں سے ایک ہے جن کا سورس کوڈ دستیاب ہے، جس سے اسے سمجھنا آسان ہو جاتا ہے۔

جبکہ کنٹریکٹ ڈیپلائرز یہ انتخاب کر سکتے ہیں کہ سورس کوڈ کو شائع کرنا ہے یا نہیں، وہ _غلط_ سورس کوڈ شائع نہیں کر سکتے۔ بلاک ایکسپلورر فراہم کردہ سورس کوڈ کو آزادانہ طور پر کمپائل کرتا ہے، اور اگر اسے بالکل وہی بائٹ کوڈ نہیں ملتا ہے، تو وہ اس سورس کوڈ کو مسترد کر دیتا ہے۔ [آپ اس بارے میں Etherscan سائٹ پر مزید پڑھ سکتے ہیں](https://etherscan.io/verifyContract)۔

## جائز ERC-20 ٹوکنز سے موازنہ {#compare-legit-erc20}

ہم اس ٹوکن کا موازنہ قانونی ERC-20 ٹوکنز سے کرنے جا رہے ہیں۔ اگر آپ اس بات سے واقف نہیں ہیں کہ قانونی ERC-20 ٹوکن عام طور پر کیسے لکھے جاتے ہیں، [تو یہ ٹیوٹوریل دیکھیں](/developers/tutorials/erc20-annotated-code/)۔

### مراعات یافتہ پتوں کے لیے مستقل {#constants-for-privileged-addresses}

معاہدوں کو کبھی کبھی مراعات یافتہ پتوں کی ضرورت ہوتی ہے۔ طویل مدتی استعمال کے لیے بنائے گئے معاہدے کچھ مراعات یافتہ پتوں کو ان پتوں کو تبدیل کرنے کی اجازت دیتے ہیں، مثال کے طور پر ایک نئے ملٹی سگ معاہدے کے استعمال کو فعال کرنے کے لیے۔ ایسا کرنے کے کئی طریقے ہیں۔

[`HOP` ٹوکن کنٹریکٹ](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) پیٹرن کا استعمال کرتا ہے۔ مراعات یافتہ پتہ اسٹوریج میں رکھا جاتا ہے، ایک فیلڈ میں جسے `_owner` کہا جاتا ہے (تیسری فائل، `Ownable.sol` دیکھیں)۔

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` ٹوکن کنٹریکٹ](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) کا براہ راست کوئی مراعات یافتہ پتہ نہیں ہے۔ تاہم، اسے کسی کی ضرورت نہیں ہے۔ یہ [ایڈریس `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) پر [`پراکسی`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) کے پیچھے بیٹھتا ہے۔ اس معاہدے کا ایک مراعات یافتہ پتہ ہے (چوتھی فائل، `ERC1967Upgrade.sol` دیکھیں) جسے اپ گریڈ کے لیے استعمال کیا جا سکتا ہے۔

```solidity
    /**
     * @dev EIP1967 ایڈمن سلاٹ میں ایک نیا پتہ اسٹور کرتا ہے۔
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

اس کے برعکس، `wARB` کنٹریکٹ میں ایک ہارڈ کوڈڈ `contract_owner` ہے۔

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[یہ کنٹریکٹ کا مالک](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) ایسا کنٹریکٹ نہیں ہے جسے مختلف اوقات میں مختلف اکاؤنٹس کے ذریعے کنٹرول کیا جا سکے، بلکہ ایک [بیرونی ملکیت والا اکاؤنٹ](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ہے۔ اس کا مطلب یہ ہے کہ یہ شاید کسی فرد کے ذریعہ قلیل مدتی استعمال کے لئے ڈیزائن کیا گیا ہے، بجائے اس کے کہ ایک ERC-20 کو کنٹرول کرنے کے لئے طویل مدتی حل کے طور پر جو قابل قدر رہے گا۔

اور واقعی، اگر ہم Etherscan میں دیکھیں تو ہم دیکھتے ہیں کہ اسکیمر نے اس معاہدے کو صرف 12 گھنٹے کے لیے استعمال کیا ([پہلی ٹرانزیکشن](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) سے [آخری ٹرانزیکشن](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b) تک) 19 مئی 2023 کے دوران۔

### جعلی `_transfer` فنکشن {#the-fake-transfer-function}

یہ معیاری ہے کہ اصل منتقلی [اندرونی `_transfer` فنکشن](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) کا استعمال کرتے ہوئے ہوتی ہے۔

`wARB` میں یہ فنکشن تقریباً جائز لگتا ہے:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: صفر پتے سے منتقلی");
        require(recipient != address(0), "ERC20: صفر پتے پر منتقلی");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: منتقلی کی رقم بیلنس سے زیادہ ہے");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

مشکوک حصہ یہ ہے:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

اگر کنٹریکٹ کا مالک ٹوکن بھیجتا ہے، تو `Transfer` ایونٹ کیوں دکھاتا ہے کہ وہ `deployer` سے آئے ہیں؟

تاہم، ایک اور اہم مسئلہ ہے۔ اس `_transfer` فنکشن کو کون کال کرتا ہے؟ اسے باہر سے کال نہیں کیا جا سکتا، اسے `internal` نشان زد کیا گیا ہے۔ اور ہمارے پاس موجود کوڈ میں `_transfer` کی کوئی کال شامل نہیں ہے۔ ظاہر ہے، یہ یہاں ایک دھوکے کے طور پر ہے۔

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: منتقلی کی رقم الاؤنس سے زیادہ ہے"));
        return true;
    }
```

جب ہم ٹوکن منتقل کرنے کے لیے کال کیے جانے والے فنکشنز، `transfer` اور `transferFrom` کو دیکھتے ہیں، تو ہم دیکھتے ہیں کہ وہ ایک بالکل مختلف فنکشن `_f_` کو کال کرتے ہیں۔

### اصلی `_f_` فنکشن {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: صفر پتے سے منتقلی");
        require(recipient != address(0), "ERC20: صفر پتے پر منتقلی");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: منتقلی کی رقم بیلنس سے زیادہ ہے");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

اس فنکشن میں دو ممکنہ خطرے کی علامتیں ہیں۔

- [فنکشن موڈیفائر](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_` کا استعمال۔ تاہم، جب ہم سورس کوڈ میں دیکھتے ہیں تو ہمیں معلوم ہوتا ہے کہ `_mod_` دراصل بے ضرر ہے۔

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- وہی مسئلہ جو ہم نے `_transfer` میں دیکھا تھا، جو یہ ہے کہ جب `contract_owner` ٹوکن بھیجتا ہے تو وہ `deployer` سے آتے ہوئے دکھائی دیتے ہیں۔

### جعلی ایونٹس کا فنکشن `dropNewTokens` {#the-fake-events-function-dropNewTokens}

اب ہم ایک ایسی چیز پر آتے ہیں جو ایک حقیقی اسکیم کی طرح نظر آتی ہے۔ میں نے پڑھنے میں آسانی کے لیے فنکشن میں تھوڑی ترمیم کی ہے، لیکن یہ فعال طور پر مساوی ہے۔

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

اس فنکشن میں `auth()` موڈیفائر ہے، جس کا مطلب ہے کہ اسے صرف کنٹریکٹ کا مالک ہی کال کر سکتا ہے۔

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "تعامل کی اجازت نہیں ہے");
    _;
}
```

یہ پابندی بالکل منطقی ہے، کیونکہ ہم نہیں چاہیں گے کہ بے ترتیب اکاؤنٹس ٹوکن تقسیم کریں۔ تاہم، باقی فنکشن مشکوک ہے۔

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

ایک پول اکاؤنٹ سے وصول کنندگان کی ایک صف میں رقوم کی ایک صف میں منتقل کرنے کا ایک فنکشن بالکل منطقی ہے۔ بہت سے استعمال کے معاملات ہیں جن میں آپ ایک ہی ذریعہ سے متعدد مقامات پر ٹوکن تقسیم کرنا چاہیں گے، جیسے پے رول، ایئر ڈراپس وغیرہ۔ یہ ایک ہی ٹرانزیکشن میں کرنا (گیس میں) سستا ہے بجائے اس کے کہ متعدد ٹرانزیکشنز جاری کی جائیں، یا یہاں تک کہ ایک ہی ٹرانزیکشن کے حصے کے طور پر ایک مختلف کنٹریکٹ سے ERC-20 کو متعدد بار کال کیا جائے۔

`dropNewTokens` ایسا نہیں کرتا ہے۔ یہ [`Transfer` ایونٹس](https://eips.ethereum.org/EIPS/eip-20#transfer-1) خارج کرتا ہے، لیکن اصل میں کوئی ٹوکن منتقل نہیں کرتا ہے۔ آف چین ایپلیکیشنز کو ایک ایسی منتقلی کے بارے میں بتا کر الجھانے کی کوئی جائز وجہ نہیں ہے جو واقعی نہیں ہوئی تھی۔

### جلانے والا `Approve` فنکشن {#the-burning-approve-function}

ERC-20 کنٹریکٹس میں الاؤنس کے لیے [ایک `approve` فنکشن](/developers/tutorials/erc20-annotated-code/#approve) ہونا چاہیے، اور واقعی ہمارے اسکیم ٹوکن میں ایسا فنکشن ہے، اور یہ درست بھی ہے۔ تاہم، چونکہ Solidity C سے ماخوذ ہے، یہ کیس کے لحاظ سے اہم ہے۔ `Approve` اور `approve` مختلف اسٹرنگز ہیں۔

نیز، فعالیت کا تعلق `approve` سے نہیں ہے۔

```solidity
    function Approve(
        address[] memory holders)
```

اس فنکشن کو ٹوکن کے ہولڈرز کے لیے پتوں کی ایک صف کے ساتھ کال کیا جاتا ہے۔

```solidity
    public approver() {
```

`approver()` موڈیفائر اس بات کو یقینی بناتا ہے کہ صرف `contract_owner` کو اس فنکشن کو کال کرنے کی اجازت ہے (نیچے دیکھیں)۔

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: جلانے کی رقم بیلنس سے زیادہ ہے");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

ہر ہولڈر ایڈریس کے لیے یہ فنکشن ہولڈر کے پورے بیلنس کو ایڈریس `0x00...01` پر منتقل کرتا ہے، مؤثر طریقے سے اسے جلاتا ہے (معیار میں اصل `burn` کل سپلائی کو بھی تبدیل کرتا ہے، اور ٹوکنز کو `0x00...00` پر منتقل کرتا ہے)۔ اس کا مطلب ہے کہ `contract_owner` کسی بھی صارف کے اثاثے ہٹا سکتا ہے۔ یہ ایک ایسی خصوصیت نہیں لگتی ہے جسے آپ گورننس ٹوکن میں چاہیں گے۔

### کوڈ کے معیار کے مسائل {#code-quality-issues}

یہ کوڈ کے معیار کے مسائل یہ _ثابت_ نہیں کرتے ہیں کہ یہ کوڈ ایک اسکیم ہے، لیکن وہ اسے مشکوک ظاہر کرتے ہیں۔ Arbitrum جیسی منظم کمپنیاں عام طور پر اتنا برا کوڈ جاری نہیں کرتی ہیں۔

#### `mount` فنکشن {#the-mount-function}

جبکہ یہ [معیار](https://eips.ethereum.org/EIPS/eip-20) میں متعین نہیں ہے، عام طور پر نئے ٹوکن بنانے والے فنکشن کو [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) کہا جاتا ہے۔

اگر ہم `wARB` کنسٹرکٹر میں دیکھیں، تو ہم دیکھتے ہیں کہ ٹائم منٹ فنکشن کا نام کسی وجہ سے `mount` رکھ دیا گیا ہے، اور اسے کارکردگی کے لیے پوری رقم کے لیے ایک بار کے بجائے، ابتدائی سپلائی کے پانچویں حصے کے ساتھ پانچ بار کال کیا جاتا ہے۔

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

`mount` فنکشن خود بھی مشکوک ہے۔

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: صفر پتے پر منٹ کریں");
```

`require` کو دیکھتے ہوئے، ہم دیکھتے ہیں کہ صرف کنٹریکٹ کے مالک کو منٹ کرنے کی اجازت ہے۔ یہ جائز ہے۔ لیکن غلطی کا پیغام _صرف مالک کو منٹ کرنے کی اجازت ہے_ یا کچھ اسی طرح کا ہونا چاہیے۔ اس کے بجائے، یہ غیر متعلقہ _ERC20: صفر پتے پر منٹ کریں_ ہے۔ صفر پتے پر منٹ کرنے کا صحیح ٹیسٹ `require(account != address(0), "<error message>")` ہے، جسے کنٹریکٹ کبھی چیک کرنے کی زحمت نہیں کرتا۔

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

منٹنگ سے براہ راست متعلق دو مزید مشکوک حقائق ہیں:

- ایک `account` پیرامیٹر ہے، جو ممکنہ طور پر وہ اکاؤنٹ ہے جسے منٹ کی گئی رقم وصول کرنی چاہیے۔ لیکن جو بیلنس بڑھتا ہے وہ دراصل `contract_owner` کا ہے۔

- جبکہ بڑھا ہوا بیلنس `contract_owner` کا ہے، خارج ہونے والا ایونٹ `account` میں منتقلی دکھاتا ہے۔

### `auth` اور `approver` دونوں کیوں؟ وہ `mod` کیوں جو کچھ نہیں کرتا؟ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

اس کنٹریکٹ میں تین موڈیفائرز ہیں: `_mod_`، `auth`، اور `approver`۔

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` تین پیرامیٹرز لیتا ہے اور ان کے ساتھ کچھ نہیں کرتا ہے۔ یہ کیوں ہے؟

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "تعامل کی اجازت نہیں ہے");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "تعامل کی اجازت نہیں ہے");
        _;
    }
```

`auth` اور `approver` زیادہ معنی خیز ہیں، کیونکہ وہ چیک کرتے ہیں کہ کنٹریکٹ `contract_owner` کے ذریعہ کال کیا گیا تھا۔ ہم توقع کریں گے کہ کچھ مراعات یافتہ کارروائیاں، جیسے منٹنگ، اس اکاؤنٹ تک محدود ہوں۔ تاہم، دو الگ الگ فنکشنز رکھنے کا کیا فائدہ ہے جو _بالکل ایک ہی کام_ کرتے ہیں؟

## ہم خود بخود کیا پتہ لگا سکتے ہیں؟ {#what-can-we-detect-automatically}

ہم Etherscan کو دیکھ کر دیکھ سکتے ہیں کہ `wARB` ایک اسکیم ٹوکن ہے۔ تاہم، یہ ایک مرکزی حل ہے۔ نظریاتی طور پر، Etherscan کو سبوتاژ یا ہیک کیا جا سکتا ہے۔ یہ بہتر ہے کہ آزادانہ طور پر یہ معلوم کیا جا سکے کہ کوئی ٹوکن جائز ہے یا نہیں۔

کچھ ترکیبیں ہیں جن کا استعمال ہم یہ شناخت کرنے کے لیے کر سکتے ہیں کہ ERC-20 ٹوکن مشکوک ہے (یا تو ایک اسکیم یا بہت بری طرح سے لکھا گیا ہے)، ان کے خارج کردہ ایونٹس کو دیکھ کر۔

## مشکوک `Approval` ایونٹس {#suspicious-approval-events}

[`Approval` ایونٹس](https://eips.ethereum.org/EIPS/eip-20#approval) صرف براہ راست درخواست کے ساتھ ہونے چاہئیں ([`Transfer` ایونٹس](https://eips.ethereum.org/EIPS/eip-20#transfer-1) کے برعکس جو الاؤنس کے نتیجے میں ہو سکتے ہیں)۔ [اس مسئلے کی تفصیلی وضاحت کے لیے Solidity دستاویزات دیکھیں](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) اور یہ کہ درخواستیں براہ راست کیوں ہونی چاہئیں، بجائے اس کے کہ کسی کنٹریکٹ کے ذریعے ثالثی کی جائے۔

`Approval` ایونٹس جو [بیرونی ملکیت والے اکاؤنٹ](/developers/docs/accounts/#types-of-account) سے خرچ کرنے کی منظوری دیتے ہیں، ان ٹرانزیکشنز سے آنے چاہئیں جو اس اکاؤنٹ میں شروع ہوتے ہیں، اور جن کی منزل ERC-20 کنٹریکٹ ہے۔ بیرونی ملکیت والے اکاؤنٹ سے کسی بھی دوسری قسم کی منظوری مشکوک ہے۔

[یہاں ایک پروگرام ہے جو اس قسم کے ایونٹ کی شناخت کرتا ہے](https://github.com/qbzzt/20230915-scam-token-detection)، [viem](https://viem.sh/) اور [TypeScript](https://www.typescriptlang.org/docs/) کا استعمال کرتے ہوئے، جو کہ ٹائپ سیفٹی کے ساتھ ایک JavaScript ویرینٹ ہے۔ اسے چلانے کے لئے:

1. `.env.example` کو `.env` میں کاپی کریں۔
2. ایک Ethereum مین نیٹ نوڈ کا URL فراہم کرنے کے لیے `.env` میں ترمیم کریں۔
3. ضروری پیکیجز انسٹال کرنے کے لیے `pnpm install` چلائیں۔
4. مشکوک منظوریوں کو تلاش کرنے کے لیے `pnpm susApproval` چلائیں۔

یہاں لائن بہ لائن وضاحت ہے:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

`viem` سے ٹائپ ڈیفینیشنز، فنکشنز، اور چین ڈیفینیشن درآمد کریں۔

```typescript
import { config } from "dotenv"
config()
```

URL حاصل کرنے کے لیے `.env` پڑھیں۔

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

ایک Viem کلائنٹ بنائیں۔ ہمیں صرف بلاکچین سے پڑھنے کی ضرورت ہے، لہذا اس کلائنٹ کو پرائیویٹ کلید کی ضرورت نہیں ہے۔

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

مشکوک ERC-20 کنٹریکٹ کا پتہ، اور وہ بلاکس جن کے اندر ہم ایونٹس تلاش کریں گے۔ نوڈ فراہم کنندگان عام طور پر ایونٹس کو پڑھنے کی ہماری صلاحیت کو محدود کرتے ہیں کیونکہ بینڈوتھ مہنگی ہو سکتی ہے۔ خوش قسمتی سے `wARB` اٹھارہ گھنٹے کی مدت کے لیے استعمال میں نہیں تھا، لہذا ہم تمام ایونٹس کو دیکھ سکتے ہیں (کل صرف 13 تھے)۔

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

یہ Viem سے ایونٹ کی معلومات مانگنے کا طریقہ ہے۔ جب ہم اسے فیلڈ کے ناموں سمیت، عین ایونٹ کا دستخط فراہم کرتے ہیں، تو یہ ہمارے لیے ایونٹ کو پارس کرتا ہے۔

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

ہمارا الگورتھم صرف بیرونی ملکیت والے اکاؤنٹس پر لاگو ہوتا ہے۔ اگر `client.getBytecode` کے ذریعہ کوئی بائٹ کوڈ واپس کیا جاتا ہے تو اس کا مطلب ہے کہ یہ ایک کنٹریکٹ ہے اور ہمیں اسے صرف چھوڑ دینا چاہیے۔

اگر آپ نے پہلے TypeScript استعمال نہیں کیا ہے، تو فنکشن کی تعریف تھوڑی عجیب لگ سکتی ہے۔ ہم اسے صرف یہ نہیں بتاتے کہ پہلا (اور واحد) پیرامیٹر `addr` کہلاتا ہے، بلکہ یہ بھی کہ یہ `Address` قسم کا ہے۔ اسی طرح، `: boolean` حصہ TypeScript کو بتاتا ہے کہ فنکشن کی واپسی کی قدر ایک بولین ہے۔

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

یہ فنکشن ایک ایونٹ سے ٹرانزیکشن کی رسید حاصل کرتا ہے۔ ہمیں رسید کی ضرورت ہے تاکہ یہ یقینی بنایا جا سکے کہ ہم جانتے ہیں کہ ٹرانزیکشن کی منزل کیا تھی۔

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

یہ سب سے اہم فنکشن ہے، جو اصل میں فیصلہ کرتا ہے کہ کوئی ایونٹ مشکوک ہے یا نہیں۔ واپسی کی قسم، `(Event | null)`، TypeScript کو بتاتی ہے کہ یہ فنکشن یا تو `Event` یا `null` واپس کر سکتا ہے۔ اگر ایونٹ مشکوک نہیں ہے تو ہم `null` واپس کرتے ہیں۔

```typescript
const owner = ev.args._owner
```

Viem کے پاس فیلڈ کے نام ہیں، لہذا اس نے ہمارے لیے ایونٹ کو پارس کیا۔ `_owner` خرچ کیے جانے والے ٹوکنز کا مالک ہے۔

```typescript
// کنٹریکٹس کے ذریعے منظوریاں مشکوک نہیں ہیں
if (await isContract(owner)) return null
```

اگر مالک ایک کنٹریکٹ ہے، تو فرض کریں کہ یہ منظوری مشکوک نہیں ہے۔ یہ چیک کرنے کے لیے کہ آیا کسی کنٹریکٹ کی منظوری مشکوک ہے یا نہیں، ہمیں ٹرانزیکشن کے مکمل عمل کو ٹریس کرنے کی ضرورت ہوگی تاکہ یہ دیکھا جا سکے کہ کیا یہ کبھی مالک کنٹریکٹ تک پہنچا، اور کیا اس کنٹریکٹ نے براہ راست ERC-20 کنٹریکٹ کو کال کیا۔ یہ اس سے کہیں زیادہ وسائل خرچ کرنے والا ہے جتنا ہم کرنا چاہیں گے۔

```typescript
const txn = await getEventTxn(ev)
```

اگر منظوری بیرونی ملکیت والے اکاؤنٹ سے آتی ہے، تو اس ٹرانزیکشن کو حاصل کریں جس کی وجہ سے یہ ہوا۔

```typescript
// منظوری مشکوک ہے اگر یہ EOA مالک سے آتی ہے جو ٹرانزیکشن کا `from` نہیں ہے
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

ہم صرف اسٹرنگ کی مساوات کی جانچ نہیں کر سکتے کیونکہ پتے ہیکسا ڈیسیمل ہوتے ہیں، لہذا ان میں حروف ہوتے ہیں۔ کبھی کبھی، مثال کے طور پر `txn.from` میں، وہ حروف سب چھوٹے ہوتے ہیں۔ دیگر معاملات میں، جیسے کہ `ev.args._owner`، پتہ [خرابی کی شناخت کے لیے مخلوط کیس](https://eips.ethereum.org/EIPS/eip-55) میں ہوتا ہے۔

لیکن اگر ٹرانزیکشن مالک کی طرف سے نہیں ہے، اور وہ مالک بیرونی طور پر ملکیت میں ہے، تو ہمارے پاس ایک مشکوک ٹرانزیکشن ہے۔

```typescript
// یہ بھی مشکوک ہے اگر ٹرانزیکشن کی منزل وہ ERC-20 کنٹریکٹ نہیں ہے جس کی ہم
// تحقیقات کر رہے ہیں
if (txn.to.toLowerCase() != testedAddress) return ev
```

اسی طرح، اگر ٹرانزیکشن کا `to` پتہ، پہلا کال کیا گیا کنٹریکٹ، زیر تفتیش ERC-20 کنٹریکٹ نہیں ہے تو یہ مشکوک ہے۔

```typescript
    // اگر مشکوک ہونے کی کوئی وجہ نہیں ہے، تو null واپس کریں۔
    return null
}
```

اگر کوئی بھی شرط درست نہیں ہے تو `Approval` ایونٹ مشکوک نہیں ہے۔

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

ایک `async` فنکشن ایک `Promise` آبجیکٹ واپس کرتا ہے۔ عام نحو، `await x()` کے ساتھ، ہم پروسیسنگ جاری رکھنے سے پہلے اس `Promise` کے پورا ہونے کا انتظار کرتے ہیں۔ یہ پروگرام کرنے اور پیروی کرنے میں آسان ہے، لیکن یہ غیر موثر بھی ہے۔ جبکہ ہم ایک مخصوص ایونٹ کے لیے `Promise` کے پورا ہونے کا انتظار کر رہے ہیں، ہم پہلے ہی اگلے ایونٹ پر کام شروع کر سکتے ہیں۔

یہاں ہم `Promise` آبجیکٹس کی ایک صف بنانے کے لیے [`map`](https://www.w3schools.com/jsref/jsref_map.asp) کا استعمال کرتے ہیں۔ پھر ہم ان تمام وعدوں کے حل ہونے کا انتظار کرنے کے لیے [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) کا استعمال کرتے ہیں۔ پھر ہم غیر مشکوک ایونٹس کو ہٹانے کے لیے ان نتائج کو [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) کرتے ہیں۔

### مشکوک `Transfer` ایونٹس {#suspicious-transfer-events}

اسکیم ٹوکنز کی شناخت کا ایک اور ممکنہ طریقہ یہ دیکھنا ہے کہ آیا ان کے پاس کوئی مشکوک منتقلی ہے۔ مثال کے طور پر، ان اکاؤنٹس سے منتقلی جن کے پاس اتنے زیادہ ٹوکن نہیں ہیں۔ آپ دیکھ سکتے ہیں کہ [اس ٹیسٹ کو کیسے نافذ کیا جائے](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)، لیکن `wARB` میں یہ مسئلہ نہیں ہے۔

## نتیجہ {#conclusion}

ERC-20 اسکیمز کا خودکار پتہ لگانا [غلط منفی](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) سے دوچار ہے، کیونکہ ایک اسکیم بالکل عام ERC-20 ٹوکن کنٹریکٹ استعمال کر سکتی ہے جو صرف کسی حقیقی چیز کی نمائندگی نہیں کرتا ہے۔ لہذا آپ کو ہمیشہ _ایک قابل اعتماد ذریعہ سے ٹوکن کا پتہ حاصل کرنے_ کی کوشش کرنی چاہیے۔

خودکار پتہ لگانا کچھ معاملات میں مدد کر سکتا ہے، جیسے کہ DeFi کے ٹکڑوں میں، جہاں بہت سے ٹوکن ہوتے ہیں اور انہیں خود بخود سنبھالنے کی ضرورت ہوتی ہے۔ لیکن ہمیشہ کی طرح [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp)، اپنی تحقیق خود کریں، اور اپنے صارفین کو بھی ایسا کرنے کی ترغیب دیں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
