---
title: "ERC-20 ٹوکن اسٹینڈرڈ"
description: "ERC-20 کے بارے میں جانیں، جو ایتھریم پر فنجیبل ٹوکنز کا ایک معیار ہے اور انٹرآپریبل ٹوکن ایپلی کیشنز کو فعال کرتا ہے۔"
lang: ur
---

## تعارف {#introduction}

**ٹوکن کیا ہے؟**

ٹوکنز [ایتھریم](/)(Ethereum) میں عملی طور پر کسی بھی چیز کی نمائندگی کر سکتے ہیں:

- آن لائن پلیٹ فارم میں ساکھ کے پوائنٹس
- گیم میں کسی کردار کی مہارتیں
- مالیاتی اثاثے جیسے کسی کمپنی میں حصہ (شیئر)
- فیاٹ کرنسی جیسے USD
- ایک اونس سونا
- اور بہت کچھ...

ایتھریم کی اتنی طاقتور خصوصیت کو ایک مضبوط معیار کے ذریعے سنبھالا جانا چاہیے، ہے نا؟ بالکل یہیں ERC-20 اپنا کردار ادا کرتا ہے! یہ معیار ڈیولپرز کو ایسی ٹوکن ایپلی کیشنز بنانے کی اجازت دیتا ہے جو دیگر پروڈکٹس اور سروسز کے ساتھ انٹرآپریبل (interoperable) ہوں۔ ERC-20 معیار کو [ایتھر](/glossary/#ether) کو اضافی فعالیت فراہم کرنے کے لیے بھی استعمال کیا جاتا ہے۔

**ERC-20 کیا ہے؟**

ERC-20 فنجیبل ٹوکنز (Fungible Tokens) کے لیے ایک معیار متعارف کراتا ہے، دوسرے الفاظ میں، ان میں ایک ایسی خاصیت ہوتی ہے جو ہر ٹوکن کو بالکل دوسرے ٹوکن کے (قسم اور قدر میں) یکساں بناتی ہے۔ مثال کے طور پر، ایک ERC-20 ٹوکن بالکل ETH کی طرح کام کرتا ہے، جس کا مطلب ہے کہ 1 ٹوکن ہمیشہ دیگر تمام ٹوکنز کے برابر ہوتا ہے اور رہے گا۔

## پیشگی شرائط {#prerequisites}

- [اکاؤنٹس](/developers/docs/accounts)
- [اسمارٹ کانٹریکٹس](/developers/docs/smart-contracts/)
- [ٹوکن کے معیارات](/developers/docs/standards/tokens/)

## باڈی {#body}

ERC-20 (Ethereum Request for Comments 20)، جسے Fabian Vogelsteller نے نومبر 2015 میں تجویز کیا تھا، ایک ٹوکن اسٹینڈرڈ ہے جو اسمارٹ کانٹریکٹس کے اندر ٹوکنز کے لیے ایک API نافذ کرتا ہے۔

ERC-20 کی فراہم کردہ فعالیت کی مثالیں:

- ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں ٹوکنز منتقل کرنا
- کسی اکاؤنٹ کا موجودہ ٹوکن بیلنس حاصل کرنا
- نیٹ ورک پر دستیاب ٹوکن کی کل سپلائی حاصل کرنا
- منظور کرنا کہ آیا کسی اکاؤنٹ سے ٹوکن کی کوئی رقم کسی فریق ثالث (تھرڈ پارٹی) اکاؤنٹ کے ذریعے خرچ کی جا سکتی ہے یا نہیں

اگر کوئی اسمارٹ کانٹریکٹ درج ذیل طریقوں (methods) اور ایونٹس کو نافذ کرتا ہے تو اسے ERC-20 ٹوکن کانٹریکٹ کہا جا سکتا ہے اور، ایک بار تعینات (deploy) ہونے کے بعد، یہ ایتھریم پر بنائے گئے ٹوکنز کا ٹریک رکھنے کا ذمہ دار ہوگا۔

[EIP-20](https://eips.ethereum.org/EIPS/eip-20) سے:

### طریقے (Methods) {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### ایونٹس {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### مثالیں {#web3py-example}

آئیے دیکھتے ہیں کہ ایتھریم پر کسی بھی ERC-20 ٹوکن کانٹریکٹ کا معائنہ کرنے کے لیے چیزوں کو ہمارے لیے آسان بنانے کے لیے ایک معیار کتنا اہم ہے۔ ہمیں کسی بھی ERC-20 ٹوکن کا انٹرفیس بنانے کے لیے صرف کانٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) کی ضرورت ہے۔ جیسا کہ آپ نیچے دیکھ سکتے ہیں ہم ایک آسان ABI استعمال کریں گے، تاکہ اسے سمجھنے میں آسان مثال بنایا جا سکے۔

#### Web3.py کی مثال {#web3py-example}

سب سے پہلے، یقینی بنائیں کہ آپ نے [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) پائتھون لائبریری انسٹال کر لی ہے:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F" # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" # ریپڈ ایتھر (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11" # یونی سویپ V2: DAI 2

# یہ ایک ERC-20 ٹوکن کنٹریکٹ کا سادہ کنٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) ہے۔
# یہ صرف ان میتھڈز کو ظاہر کرے گا: balanceOf(address)، decimals()، symbol() اور totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

# DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

# WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## معلوم مسائل {#erc20-issues}

### ERC-20 ٹوکن وصولی کا مسئلہ {#reception-issue}

**<span dir="ltr">06/20/2024</span> تک اس مسئلے کی وجہ سے کم از کم $83,656,418 مالیت کے ERC-20 ٹوکنز ضائع ہو چکے ہیں۔ نوٹ کریں کہ ایک خالص ERC-20 نفاذ اس مسئلے کا شکار ہو سکتا ہے جب تک کہ آپ معیار کے اوپر اضافی پابندیوں کا ایک سیٹ نافذ نہ کریں جیسا کہ ذیل میں درج ہے۔**

جب ERC-20 ٹوکنز کسی ایسے اسمارٹ کانٹریکٹ کو بھیجے جاتے ہیں جو ERC-20 ٹوکنز کو سنبھالنے کے لیے ڈیزائن نہیں کیا گیا ہے، تو وہ ٹوکنز مستقل طور پر ضائع ہو سکتے ہیں۔ ایسا اس لیے ہوتا ہے کیونکہ وصول کرنے والے کانٹریکٹ میں آنے والے ٹوکنز کو پہچاننے یا ان کا جواب دینے کی فعالیت نہیں ہوتی، اور ERC-20 معیار میں وصول کرنے والے کانٹریکٹ کو آنے والے ٹوکنز کے بارے میں مطلع کرنے کا کوئی طریقہ کار نہیں ہے۔ یہ مسئلہ بنیادی طور پر درج ذیل طریقوں سے سامنے آتا ہے:

1.	ٹوکن کی منتقلی کا طریقہ کار
  - ERC-20 ٹوکنز transfer یا transferFrom فنکشنز کا استعمال کرتے ہوئے منتقل کیے جاتے ہیں
	- جب کوئی صارف ان فنکشنز کا استعمال کرتے ہوئے کسی کانٹریکٹ ایڈریس پر ٹوکنز بھیجتا ہے، تو ٹوکنز منتقل ہو جاتے ہیں قطع نظر اس کے کہ وصول کرنے والا کانٹریکٹ انہیں سنبھالنے کے لیے ڈیزائن کیا گیا ہے یا نہیں
2.	اطلاع (notification) کی کمی
	- وصول کرنے والے کانٹریکٹ کو کوئی اطلاع یا کال بیک موصول نہیں ہوتا کہ اسے ٹوکنز بھیجے گئے ہیں
	- اگر وصول کرنے والے کانٹریکٹ میں ٹوکنز کو سنبھالنے کے طریقہ کار کی کمی ہے (مثلاً، ایک فال بیک فنکشن یا ٹوکن کی وصولی کو منظم کرنے کے لیے ایک مخصوص فنکشن)، تو ٹوکنز مؤثر طریقے سے کانٹریکٹ کے ایڈریس میں پھنس جاتے ہیں
3.	کوئی بلٹ ان ہینڈلنگ نہیں
	- ERC-20 معیار میں وصول کرنے والے کانٹریکٹس کے نفاذ کے لیے کوئی لازمی فنکشن شامل نہیں ہے، جس کی وجہ سے ایسی صورتحال پیدا ہوتی ہے جہاں بہت سے کانٹریکٹس آنے والے ٹوکنز کو مناسب طریقے سے منظم کرنے سے قاصر ہوتے ہیں

**ممکنہ حل**

اگرچہ ERC-20 کے ساتھ اس مسئلے کو مکمل طور پر روکنا ممکن نہیں ہے، لیکن ایسے طریقے موجود ہیں جو آخری صارف (end user) کے لیے ٹوکنز کے ضائع ہونے کے امکان کو نمایاں طور پر کم کرنے کی اجازت دیں گے:

- سب سے عام مسئلہ تب ہوتا ہے جب کوئی صارف ٹوکنز کو خود ٹوکن کانٹریکٹ کے ایڈریس پر بھیجتا ہے (مثلاً، USDT ٹوکن کانٹریکٹ کے ایڈریس پر جمع کیا گیا USDT)۔ یہ تجویز کیا جاتا ہے کہ ایسی منتقلی کی کوششوں کو واپس (revert) کرنے کے لیے `transfer(..)` فنکشن کو محدود کیا جائے۔ `transfer(..)` فنکشن کے نفاذ کے اندر `require(_to != address(this));` چیک شامل کرنے پر غور کریں۔
- عام طور پر `transfer(..)` فنکشن کانٹریکٹس میں ٹوکنز جمع کرنے کے لیے ڈیزائن نہیں کیا گیا ہے۔ اس کے بجائے ERC-20 ٹوکنز کو کانٹریکٹس میں جمع کرنے کے لیے `approve(..) & transferFrom(..)` پیٹرن استعمال کیا جاتا ہے۔ ٹرانسفر فنکشن کو محدود کرنا ممکن ہے تاکہ اس کے ساتھ کسی بھی کانٹریکٹ میں ٹوکنز جمع کرنے کی اجازت نہ دی جائے، تاہم یہ ان کانٹریکٹس کے ساتھ مطابقت (compatibility) کو توڑ سکتا ہے جو یہ فرض کرتے ہیں کہ ٹوکنز کو `trasnfer(..)` فنکشن کے ساتھ کانٹریکٹس میں جمع کیا جا سکتا ہے (مثلاً، Uniswap لیکویڈیٹی پولز)۔
- ہمیشہ یہ فرض کریں کہ ERC-20 ٹوکنز آپ کے کانٹریکٹ میں آ سکتے ہیں یہاں تک کہ اگر آپ کے کانٹریکٹ کو کبھی کوئی ٹوکن وصول نہیں کرنا چاہیے۔ وصول کنندگان کے اختتام پر حادثاتی ڈپازٹس کو روکنے یا مسترد کرنے کا کوئی طریقہ نہیں ہے۔ یہ تجویز کیا جاتا ہے کہ ایک ایسا فنکشن نافذ کیا جائے جو حادثاتی طور پر جمع کیے گئے ERC-20 ٹوکنز کو نکالنے کی اجازت دے۔
- متبادل ٹوکن معیارات استعمال کرنے پر غور کریں۔

اس مسئلے سے کچھ متبادل معیارات سامنے آئے ہیں جیسے [ERC-223](/developers/docs/standards/tokens/erc-223) یا [ERC-1363](/developers/docs/standards/tokens/erc-1363)۔

## مزید مطالعہ {#further-reading}

- [EIP-20: ERC-20 ٹوکن اسٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - ٹوکنز](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 کا نفاذ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - سولیڈیٹی (Solidity) ERC20 ٹوکنز کے لیے گائیڈ](https://www.alchemy.com/overviews/erc20-solidity)

## دیگر فنجیبل ٹوکن معیارات {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - ٹوکنائزڈ والٹس (Tokenized vaults)](/developers/docs/standards/tokens/erc-4626)

## ٹیوٹوریلز: ایتھریم پر ERC-20 کے ساتھ تعمیر کریں {#tutorials}

- [ERC-20 کانٹریکٹ واک تھرو](/developers/tutorials/erc20-annotated-code/) _– OpenZeppelin ERC-20 کانٹریکٹ کے نفاذ کا لائن بہ لائن تشریح شدہ واک تھرو۔_
- [سیفٹی ریلز کے ساتھ ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– صارفین کو عام غلطیوں سے بچنے میں مدد کے لیے ERC-20 ٹوکنز میں حفاظتی اقدامات کیسے شامل کریں۔_
- [ethers.js کا استعمال کرتے ہوئے ٹوکنز بھیجنا](/developers/tutorials/send-token-ethersjs/) _– ethers.js کا استعمال کرتے ہوئے ERC-20 ٹوکنز منتقل کرنے کے لیے ابتدائی افراد کے لیے ایک گائیڈ۔_
- [اسکیم ٹوکنز کے ذریعے استعمال ہونے والی کچھ چالیں اور ان کا پتہ کیسے لگایا جائے](/developers/tutorials/scam-token-tricks/) _– اسکیم ERC-20 ٹوکن پیٹرنز اور ان کی شناخت کرنے کے طریقے کا گہرا جائزہ۔_