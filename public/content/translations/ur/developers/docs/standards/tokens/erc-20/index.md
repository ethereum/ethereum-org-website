---
title: "ERC-20 ٹوکن اسٹینڈرڈ"
description: "ERC-20 کے بارے میں جانیں، جو Ethereum پر فنجیبل ٹوکنز کا ایک اسٹینڈرڈ ہے جو انٹرآپریبل ٹوکن ایپلیکیشنز کو قابل بناتا ہے۔"
lang: ur-in
---

## تعارف {#introduction}

**ٹوکن کیا ہے؟**

ٹوکنز Ethereum میں عملی طور پر کسی بھی چیز کی نمائندگی کر سکتے ہیں:

- ایک آن لائن پلیٹ فارم میں ساکھ کے پوائنٹس
- کسی گیم میں ایک کردار کی مہارتیں
- مالیاتی اثاثے جیسے کسی کمپنی میں ایک حصہ
- ایک فیاٹ کرنسی جیسے USD
- ایک اونس سونا
- اور مزید...

Ethereum کی ایسی طاقتور خصوصیت کو ایک مضبوط اسٹینڈرڈ کے ذریعے سنبھالا جانا چاہیے، ہے نا؟ یہیں پر
ERC-20 اپنا کردار ادا کرتا ہے! یہ اسٹینڈرڈ ڈیولپرز کو ایسی ٹوکن ایپلیکیشنز بنانے کی اجازت دیتا ہے جو دیگر مصنوعات اور خدمات کے ساتھ انٹرآپریبل ہوں۔ ERC-20 اسٹینڈرڈ [ether](/glossary/#ether) کو اضافی فعالیت فراہم کرنے کے لیے بھی استعمال ہوتا ہے۔

**ERC-20 کیا ہے؟**

ERC-20 فنجیبل ٹوکنز کے لیے ایک اسٹینڈرڈ متعارف کراتا ہے، دوسرے الفاظ میں، ان میں ایک ایسی خصوصیت ہوتی ہے جو ہر ٹوکن کو دوسرے ٹوکن کی طرح بالکل
یکساں (قسم اور قدر میں) بناتی ہے۔ مثال کے طور پر، ایک ERC-20 ٹوکن بالکل ETH کی طرح کام کرتا ہے، جس کا مطلب ہے کہ 1 ٹوکن
تمام دوسرے ٹوکنز کے برابر ہے اور ہمیشہ رہے گا۔

## شرائط {#prerequisites}

- [اکاؤنٹس](/developers/docs/accounts)
- [اسمارٹ کنٹریکٹس](/developers/docs/smart-contracts/)
- [ٹوکن معیارات](/developers/docs/standards/tokens/)

## باڈی {#body}

ERC-20 (Ethereum Request for Comments 20)، جسے نومبر 2015 میں Fabian Vogelsteller نے تجویز کیا تھا، ایک ٹوکن اسٹینڈرڈ ہے جو
اسمارٹ کنٹریکٹس کے اندر ٹوکنز کے لیے ایک API کو نافذ کرتا ہے۔

مثال کے طور پر فعالیتیں جو ERC-20 فراہم کرتا ہے:

- ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں ٹوکنز منتقل کرنا
- کسی اکاؤنٹ کا موجودہ ٹوکن بیلنس حاصل کرنا
- نیٹ ورک پر دستیاب ٹوکن کی کل سپلائی حاصل کرنا
- منظور کرنا کہ آیا کسی اکاؤنٹ سے ٹوکن کی ایک رقم تیسرے فریق کے اکاؤنٹ کے ذریعے خرچ کی جا سکتی ہے

اگر کوئی اسمارٹ کنٹریکٹ مندرجہ ذیل طریقوں اور ایونٹس کو نافذ کرتا ہے تو اسے ERC-20 ٹوکن کنٹریکٹ کہا جا سکتا ہے اور، ایک بار تعینات ہونے کے بعد، یہ
Ethereum پر بنائے گئے ٹوکنز کا ٹریک رکھنے کا ذمہ دار ہوگا۔

[EIP-20](https://eips.ethereum.org/EIPS/eip-20) سے:

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

آئیے دیکھتے ہیں کہ Ethereum پر کسی بھی ERC-20 ٹوکن کنٹریکٹ کا معائنہ کرنے کے لیے چیزوں کو ہمارے لیے آسان بنانے کے لیے ایک اسٹینڈرڈ کتنا اہم ہے۔
کسی بھی ERC-20 ٹوکن کا انٹرفیس بنانے کے لیے ہمیں صرف کنٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) کی ضرورت ہے۔ جیسا کہ آپ
نیچے دیکھ سکتے ہیں ہم ایک آسان کردہ ABI استعمال کریں گے، تاکہ اسے ایک کم رگڑ والی مثال بنایا جا سکے۔

#### Web3.py کی مثال {#web3py-example}

سب سے پہلے، یقینی بنائیں کہ آپ نے [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python لائبریری انسٹال کر لی ہے:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # لپٹا ہوا ایتھر (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# یہ ایک ERC-20 ٹوکن کنٹریکٹ کا ایک آسان کردہ کنٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) ہے۔
# یہ صرف طریقوں کو ظاہر کرے گا: balanceOf(address), decimals(), symbol() اور totalSupply()
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

### ERC-20 ٹوکن وصولی کا مسئلہ {#reception-issue}

**06/20/2024 تک اس مسئلے کی وجہ سے کم از کم $83,656,418 مالیت کے ERC-20 ٹوکنز ضائع ہو چکے ہیں۔ نوٹ کریں کہ ایک خالص ERC-20 نفاذ اس مسئلے کا شکار ہے جب تک کہ آپ ذیل میں درج کردہ اسٹینڈرڈ کے اوپر اضافی پابندیوں کا ایک سیٹ نافذ نہ کریں۔**

جب ERC-20 ٹوکنز کسی ایسے اسمارٹ کنٹریکٹ کو بھیجے جاتے ہیں جو ERC-20 ٹوکنز کو سنبھالنے کے لیے ڈیزائن نہیں کیا گیا ہے، تو وہ ٹوکنز مستقل طور پر ضائع ہو سکتے ہیں۔ ایسا اس لیے ہوتا ہے کیونکہ وصول کرنے والے کنٹریکٹ میں آنے والے ٹوکنز کو پہچاننے یا ان کا جواب دینے کی فعالیت نہیں ہوتی ہے، اور ERC-20 اسٹینڈرڈ میں وصول کرنے والے کنٹریکٹ کو آنے والے ٹوکنز کے بارے میں مطلع کرنے کا کوئی طریقہ کار نہیں ہے۔ یہ مسئلہ جن اہم طریقوں سے شکل اختیار کرتا ہے وہ یہ ہیں:

1. ٹوکن کی منتقلی کا طریقہ کار

- ERC-20 ٹوکنز transfer یا transferFrom فنکشنز کا استعمال کرتے ہوئے منتقل کیے جاتے ہیں
  - جب کوئی صارف ان فنکشنز کا استعمال کرتے ہوئے کسی کنٹریکٹ ایڈریس پر ٹوکن بھیجتا ہے، تو ٹوکنز اس بات سے قطع نظر منتقل ہو جاتے ہیں کہ وصول کرنے والا کنٹریکٹ انہیں سنبھالنے کے لیے ڈیزائن کیا گیا ہے یا نہیں

2. اطلاع کی کمی
   - وصول کرنے والے کنٹریکٹ کو یہ اطلاع یا کال بیک موصول نہیں ہوتا کہ اسے ٹوکنز بھیجے گئے ہیں
   - اگر وصول کرنے والے کنٹریکٹ میں ٹوکنز کو سنبھالنے کا کوئی طریقہ کار نہیں ہے (مثلاً، ایک فال بیک فنکشن یا ٹوکن وصولی کو منظم کرنے کے لیے ایک مخصوص فنکشن)، تو ٹوکنز مؤثر طریقے سے کنٹریکٹ کے ایڈریس میں پھنس جاتے ہیں
3. کوئی بلٹ ان ہینڈلنگ نہیں
   - ERC-20 اسٹینڈرڈ میں وصول کرنے والے کنٹریکٹس کے نفاذ کے لیے کوئی لازمی فنکشن شامل نہیں ہے، جس کی وجہ سے ایسی صورت حال پیدا ہوتی ہے جہاں بہت سے کنٹریکٹس آنے والے ٹوکنز کو مناسب طریقے سے منظم کرنے سے قاصر ہوتے ہیں

**ممکنہ حل**

اگرچہ ERC-20 کے ساتھ اس مسئلے کو مکمل طور پر روکنا ممکن نہیں ہے، لیکن ایسے طریقے موجود ہیں جو آخری صارف کے لیے ٹوکن کے نقصان کے امکان کو نمایاں طور پر کم کر دیں گے:

- سب سے عام مسئلہ تب ہوتا ہے جب کوئی صارف خود ٹوکن کنٹریکٹ ایڈریس پر ٹوکن بھیجتا ہے (مثلاً، USDT ٹوکن کنٹریکٹ کے ایڈریس پر USDT جمع کرایا جاتا ہے)۔ ایسی منتقلی کی کوششوں کو واپس کرنے کے لیے `transfer(..)` فنکشن کو محدود کرنے کی سفارش کی جاتی ہے۔ `transfer(..)` فنکشن کے نفاذ کے اندر `require(_to != address(this));` چیک شامل کرنے پر غور کریں۔
- عام طور پر `transfer(..)` فنکشن کنٹریکٹس میں ٹوکن جمع کرنے کے لیے ڈیزائن نہیں کیا گیا ہے۔ `approve(..) `& transferFrom(..)`پیٹرن اس کے بجائے کنٹریکٹس میں ERC-20 ٹوکن جمع کرنے کے لیے استعمال ہوتا ہے۔ ٹرانسفر فنکشن کو محدود کرنا ممکن ہے تاکہ اس کے ساتھ کسی بھی کنٹریکٹ میں ٹوکن جمع کرنے کی اجازت نہ دی جائے، تاہم یہ ان کنٹریکٹس کے ساتھ مطابقت کو توڑ سکتا ہے جو یہ فرض کرتے ہیں کہ ٹوکنز`trasnfer(..)` فنکشن کے ساتھ کنٹریکٹس میں جمع کیے جا سکتے ہیں (مثلاً، Uniswap لیکویڈیٹی پولز)۔
- ہمیشہ یہ فرض کریں کہ ERC-20 ٹوکنز آپ کے کنٹریکٹ میں آ سکتے ہیں چاہے آپ کے کنٹریکٹ کو کبھی کوئی ٹوکن وصول نہ کرنا ہو۔ وصول کنندگان کی طرف سے حادثاتی ڈپازٹس کو روکنے یا مسترد کرنے کا کوئی طریقہ نہیں ہے۔ ایک ایسا فنکشن نافذ کرنے کی سفارش کی جاتی ہے جو حادثاتی طور پر جمع کیے گئے ERC-20 ٹوکنز کو نکالنے کی اجازت دے۔
- متبادل ٹوکن اسٹینڈرڈز استعمال کرنے پر غور کریں۔

اس مسئلے سے کچھ متبادل اسٹینڈرڈز سامنے آئے ہیں جیسے [ERC-223](/developers/docs/standards/tokens/erc-223) یا [ERC-1363](/developers/docs/standards/tokens/erc-1363)۔

## مزید پڑھیں {#further-reading}

- [EIP-20: ERC-20 ٹوکن اسٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - ٹوکنز](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 نفاذ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 ٹوکنز کے لیے گائیڈ](https://www.alchemy.com/overviews/erc20-solidity)

## دیگر فنجیبل ٹوکن اسٹینڈرڈز {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - ٹوکنائزڈ والٹس](/developers/docs/standards/tokens/erc-4626)
