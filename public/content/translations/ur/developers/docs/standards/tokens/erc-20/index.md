---
title: "⁦ERC-20⁩ ٹوکن سٹینڈرڈ"
description: "⁦ERC-20⁩ کے بارے میں جانیں، جو ایتھیریم پر قابل تبادلہ ٹوکنز کا سٹینڈرڈ ہے اور قابلِ باہمی عمل ٹوکن ایپلی کیشنز کو فعال کرتا ہے۔"
lang: ur
---

## تعارف {#introduction}

**ٹوکن کیا ہے؟**

ٹوکنز [ایتھیریم](/) میں عملی طور پر کسی بھی چیز کی نمائندگی کر سکتے ہیں:

- ایک آن لائن پلیٹ فارم میں ساکھ کے پوائنٹس
- کسی گیم میں کردار کی مہارتیں
- مالیاتی اثاثے جیسے کسی کمپنی میں حصہ
- فیاٹ کرنسی جیسے <span dir="ltr">USD</span>
- ایک اونس سونا
- اور بہت کچھ...

ایتھیریم کی اتنی طاقتور خصوصیت کو ایک مضبوط سٹینڈرڈ کے ذریعے سنبھالا جانا چاہیے، ہے نا؟ بالکل یہیں <span dir="ltr">ERC-20</span> اپنا کردار ادا کرتا ہے! یہ سٹینڈرڈ ڈیولپرز کو ایسی ٹوکن ایپلی کیشنز بنانے کی اجازت دیتا ہے جو دیگر پروڈکٹس اور سروسز کے ساتھ قابلِ باہمی عمل ہوں۔ <span dir="ltr">ERC-20</span> سٹینڈرڈ کا استعمال [ایتھر](/glossary/#ether) کو اضافی فعالیت فراہم کرنے کے لیے بھی کیا جاتا ہے۔

**<span dir="ltr">ERC-20</span> کیا ہے؟**

<span dir="ltr">ERC-20</span> قابل تبادلہ ٹوکنز (Fungible Tokens) کے لیے ایک سٹینڈرڈ متعارف کراتا ہے، دوسرے الفاظ میں، ان میں ایک ایسی خصوصیت ہوتی ہے جو ہر ٹوکن کو بالکل دوسرے ٹوکن کے (قسم اور قدر میں) یکساں بناتی ہے۔ مثال کے طور پر، ایک <span dir="ltr">ERC-20</span> ٹوکن بالکل <span dir="ltr">ETH</span> کی طرح کام کرتا ہے، جس کا مطلب ہے کہ <span dir="ltr">1</span> ٹوکن ہمیشہ دیگر تمام ٹوکنز کے برابر ہوتا ہے اور رہے گا۔

## پیشگی شرائط {#prerequisites}

- [اکاؤنٹس](/developers/docs/accounts)
- [سمارٹ کنٹریکٹس](/developers/docs/smart-contracts/)
- [ٹوکن سٹینڈرڈز](/developers/docs/standards/tokens/)

## باڈی {#body}

<span dir="ltr">ERC-20</span> (Ethereum Request for Comments 20)، جسے نومبر <span dir="ltr">2015</span> میں Fabian Vogelsteller نے تجویز کیا تھا، ایک ٹوکن سٹینڈرڈ ہے جو سمارٹ کنٹریکٹس کے اندر ٹوکنز کے لیے ایک <span dir="ltr">API</span> نافذ کرتا ہے۔

<span dir="ltr">ERC-20</span> کی فراہم کردہ افعال کی مثالیں:

- ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں ٹوکنز کی منتقلی
- کسی اکاؤنٹ کا موجودہ ٹوکن بیلنس حاصل کرنا
- نیٹ ورک پر دستیاب ٹوکن کی کل سپلائی حاصل کرنا
- یہ منظور کرنا کہ آیا کسی اکاؤنٹ سے ٹوکن کی ایک مخصوص رقم کسی تیسرے فریق کے اکاؤنٹ کے ذریعے خرچ کی جا سکتی ہے

اگر کوئی سمارٹ کنٹریکٹ درج ذیل طریقوں اور ایونٹس کو نافذ کرتا ہے تو اسے <span dir="ltr">ERC-20</span> ٹوکن کنٹریکٹ کہا جا سکتا ہے اور، ایک بار تعینات ہونے کے بعد، یہ ایتھیریم پر بنائے گئے ٹوکنز کا ریکارڈ رکھنے کا ذمہ دار ہوگا۔

[<span dir="ltr">EIP-20</span>](https://eips.ethereum.org/EIPS/eip-20) سے:

### طریقے {#methods}

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

آئیے دیکھتے ہیں کہ ایتھیریم پر کسی بھی <span dir="ltr">ERC-20</span> ٹوکن کنٹریکٹ کا معائنہ کرنے کے لیے چیزوں کو آسان بنانے میں ایک سٹینڈرڈ کتنا اہم ہے۔ ہمیں کسی بھی <span dir="ltr">ERC-20</span> ٹوکن کا انٹرفیس بنانے کے لیے صرف کنٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) کی ضرورت ہوتی ہے۔ جیسا کہ آپ نیچے دیکھ سکتے ہیں، ہم اسے ایک آسان مثال بنانے کے لیے ایک سادہ <span dir="ltr">ABI</span> استعمال کریں گے۔

#### <span dir="ltr">Web3.py</span> کی مثال {#web3py-example-2}

سب سے پہلے، یقینی بنائیں کہ آپ نے [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) <span dir="ltr">Python</span> لائبریری انسٹال کر لی ہے:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # ریپڈ ایتھر (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # یونی سویپ V2: DAI 2

# یہ ایک ERC-20 ٹوکن کنٹریکٹ کا سادہ کنٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) ہے۔
# یہ صرف درج ذیل میتھڈز کو ظاہر کرے گا: balanceOf(address)، decimals()، symbol() اور totalSupply()
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

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## معلوم مسائل {#erc20-issues}

### <span dir="ltr">ERC-20</span> ٹوکن وصولی کا مسئلہ {#reception-issue}

**<span dir="ltr">06/20/2024</span> تک اس مسئلے کی وجہ سے کم از کم <span dir="ltr">$83,656,418</span> مالیت کے <span dir="ltr">ERC-20</span> ٹوکنز ضائع ہو چکے ہیں۔ نوٹ کریں کہ ایک خالص <span dir="ltr">ERC-20</span> عمل درآمد اس مسئلے کا شکار ہو سکتا ہے جب تک کہ آپ ذیل میں درج سٹینڈرڈ کے اوپر اضافی پابندیوں کا ایک سیٹ نافذ نہ کریں۔**

جب <span dir="ltr">ERC-20</span> ٹوکنز کسی ایسے سمارٹ کنٹریکٹ کو بھیجے جاتے ہیں جو <span dir="ltr">ERC-20</span> ٹوکنز کو سنبھالنے کے لیے ڈیزائن نہیں کیا گیا ہے، تو وہ ٹوکنز مستقل طور پر ضائع ہو سکتے ہیں۔ ایسا اس لیے ہوتا ہے کیونکہ وصول کرنے والے کنٹریکٹ میں آنے والے ٹوکنز کو پہچاننے یا ان کا جواب دینے کی فعالیت نہیں ہوتی، اور <span dir="ltr">ERC-20</span> سٹینڈرڈ میں وصول کرنے والے کنٹریکٹ کو آنے والے ٹوکنز کے بارے میں مطلع کرنے کا کوئی طریقہ کار نہیں ہے۔ یہ مسئلہ بنیادی طور پر درج ذیل طریقوں سے سامنے آتا ہے:

1.	ٹوکن کی منتقلی کا طریقہ کار
  - <span dir="ltr">ERC-20</span> ٹوکنز کو <span dir="ltr">transfer</span> یا <span dir="ltr">transferFrom</span> فنکشنز کا استعمال کرتے ہوئے منتقل کیا جاتا ہے
	-	جب کوئی صارف ان فنکشنز کا استعمال کرتے ہوئے کسی کنٹریکٹ کے پتے پر ٹوکنز بھیجتا ہے، تو ٹوکنز منتقل ہو جاتے ہیں قطع نظر اس کے کہ وصول کرنے والا کنٹریکٹ انہیں سنبھالنے کے لیے ڈیزائن کیا گیا ہے یا نہیں
2.	اطلاع کی کمی
	-	وصول کرنے والے کنٹریکٹ کو کوئی اطلاع یا کال بیک موصول نہیں ہوتا کہ اسے ٹوکنز بھیجے گئے ہیں
	-	اگر وصول کرنے والے کنٹریکٹ میں ٹوکنز کو سنبھالنے کے طریقہ کار کی کمی ہے (مثلاً، ایک فال بیک فنکشن یا ٹوکن کی وصولی کو منظم کرنے کے لیے ایک مخصوص فنکشن)، تو ٹوکنز مؤثر طریقے سے کنٹریکٹ کے پتے میں پھنس جاتے ہیں
3.	کوئی بلٹ ان ہینڈلنگ نہیں
	-	<span dir="ltr">ERC-20</span> سٹینڈرڈ میں وصول کرنے والے کنٹریکٹس کے لیے نافذ کرنے کے لیے کوئی لازمی فنکشن شامل نہیں ہے، جس کی وجہ سے ایسی صورتحال پیدا ہوتی ہے جہاں بہت سے کنٹریکٹس آنے والے ٹوکنز کو مناسب طریقے سے منظم کرنے سے قاصر ہوتے ہیں

**ممکنہ حل**

اگرچہ <span dir="ltr">ERC-20</span> کے ساتھ اس مسئلے کو مکمل طور پر روکنا ممکن نہیں ہے، لیکن ایسے طریقے موجود ہیں جو آخری صارف کے لیے ٹوکنز کے ضائع ہونے کے امکان کو نمایاں طور پر کم کرنے کی اجازت دیں گے:

- سب سے عام مسئلہ تب ہوتا ہے جب کوئی صارف ٹوکنز کو خود ٹوکن کنٹریکٹ کے پتے پر بھیجتا ہے (مثلاً، <span dir="ltr">USDT</span> ٹوکن کنٹریکٹ کے پتے پر جمع کیا گیا <span dir="ltr">USDT</span>)۔ یہ تجویز کیا جاتا ہے کہ ایسی منتقلی کی کوششوں کو ریورٹ کرنے کے لیے `transfer(..)` فنکشن کو محدود کیا جائے۔ `transfer(..)` فنکشن کے نفاذ کے اندر `require(_to != address(this));` چیک شامل کرنے پر غور کریں۔
- عام طور پر `transfer(..)` فنکشن کنٹریکٹس میں ٹوکنز جمع کرنے کے لیے ڈیزائن نہیں کیا گیا ہے۔ اس کے بجائے کنٹریکٹس میں <span dir="ltr">ERC-20</span> ٹوکنز جمع کرنے کے لیے `approve(..) & transferFrom(..)` پیٹرن استعمال کیا جاتا ہے۔ منتقلی کے فنکشن کو محدود کرنا ممکن ہے تاکہ اس کے ساتھ کسی بھی کنٹریکٹ میں ٹوکنز جمع کرنے کی اجازت نہ دی جائے، تاہم یہ ان کنٹریکٹس کے ساتھ مطابقت کو توڑ سکتا ہے جو یہ فرض کرتے ہیں کہ ٹوکنز کو `transfer(..)` فنکشن کے ساتھ کنٹریکٹس میں جمع کیا جا سکتا ہے (مثلاً، یونی سویپ سیالیت کے پولز)۔
- ہمیشہ یہ فرض کریں کہ <span dir="ltr">ERC-20</span> ٹوکنز آپ کے کنٹریکٹ میں آ سکتے ہیں یہاں تک کہ اگر آپ کے کنٹریکٹ کو کبھی کوئی ٹوکن وصول نہیں کرنا چاہیے۔ وصول کنندگان کے اختتام پر حادثاتی ڈپازٹس کو روکنے یا مسترد کرنے کا کوئی طریقہ نہیں ہے۔ یہ تجویز کیا جاتا ہے کہ ایک ایسا فنکشن نافذ کیا جائے جو حادثاتی طور پر جمع کیے گئے <span dir="ltr">ERC-20</span> ٹوکنز کو نکالنے کی اجازت دے۔
- متبادل ٹوکن سٹینڈرڈز استعمال کرنے پر غور کریں۔

اس مسئلے سے کچھ متبادل سٹینڈرڈز سامنے آئے ہیں جیسے [<span dir="ltr">ERC-223</span>](/developers/docs/standards/tokens/erc-223) یا [<span dir="ltr">ERC-1363</span>](/developers/docs/standards/tokens/erc-1363)۔

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">EIP-20</span>: <span dir="ltr">ERC-20</span> ٹوکن سٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-20)
- [اوپن زیپلن - ٹوکنز](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [اوپن زیپلن - <span dir="ltr">ERC-20</span> کا نفاذ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 ٹوکنز کے لیے گائیڈ](https://www.alchemy.com/overviews/erc20-solidity)

## دیگر قابل تبادلہ ٹوکن سٹینڈرڈز {#fungible-token-standards}

- [<span dir="ltr">ERC-223</span>](/developers/docs/standards/tokens/erc-223)
- [<span dir="ltr">ERC-1363</span>](/developers/docs/standards/tokens/erc-1363)
- [<span dir="ltr">ERC-777</span>](/developers/docs/standards/tokens/erc-777)
- [<span dir="ltr">ERC-4626</span> - ٹوکنائزڈ والٹس](/developers/docs/standards/tokens/erc-4626)

## ٹیوٹوریلز: ایتھیریم پر <span dir="ltr">ERC-20</span> کے ساتھ تعمیر کریں {#tutorials}

- [<span dir="ltr">ERC-20</span> کنٹریکٹ واک تھرو](/developers/tutorials/erc20-annotated-code/) _– اوپن زیپلن <span dir="ltr">ERC-20</span> کنٹریکٹ کے نفاذ کا ایک لائن بہ لائن تشریحی واک تھرو۔_
- [حفاظتی ریلز کے ساتھ <span dir="ltr">ERC-20</span>](/developers/tutorials/erc20-with-safety-rails/) _– صارفین کو عام غلطیوں سے بچنے میں مدد کے لیے <span dir="ltr">ERC-20</span> ٹوکنز میں حفاظتی اقدامات کیسے شامل کریں۔_
- [Ethers.js کا استعمال کرتے ہوئے ٹوکنز بھیجنا](/developers/tutorials/send-token-ethersjs/) _– <span dir="ltr">Ethers.js</span> کا استعمال کرتے ہوئے <span dir="ltr">ERC-20</span> ٹوکنز کی منتقلی کے لیے ابتدائی افراد کے لیے ایک سازگار گائیڈ۔_
- [سکیم ٹوکنز کے ذریعے استعمال ہونے والی کچھ چالیں اور ان کا پتہ کیسے لگایا جائے](/developers/tutorials/scam-token-tricks/) _– سکیم <span dir="ltr">ERC-20</span> ٹوکن پیٹرنز اور ان کی شناخت کرنے کے طریقے کا ایک تفصیلی جائزہ۔_