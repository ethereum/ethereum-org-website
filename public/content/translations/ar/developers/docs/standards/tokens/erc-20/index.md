---
title: ERC-20 Token Standard
description: "تعرف على ERC-20، وهو المعيار الخاص بالرموز القابلة للاستبدال على Ethereum والذي يتيح تطبيقات الرموز القابلة للتشغيل المتبادل."
lang: ar
---

## مقدمة {#introduction}

**ما هو الرمز المميز؟**

يمكن أن تمثل الرموز أي شيء تقريبًا في Ethereum:

- نقاط السمعة في منصة عبر الإنترنت
- مهارات شخصية في اللعبة
- الأصول المالية مثل حصة في شركة
- عملة ورقية مثل الدولار الأمريكي
- أونصة من الذهب
- وغير ذلك...

يجب أن تُدار ميزة بهذه القوة في شبكة إيثريوم وفق معيار قوي وموثوق، أليس كذلك؟ وهنا تحديدًا يأتي دور معيار ERC-20! يتيح هذا المعيار للمطورين إنشاء تطبيقات رمزية متوافقة مع المنتجات والخدمات الأخرى. يُستخدم معيار ERC-20 أيضًا لتوفير وظائف إضافية لـ [إيثر](/glossary/#ether).

**ما هو معيار ERC-20؟**

يُقدّم معيار ERC-20 نموذجًا موحدًا لـ الرموز القابلة للاستبدال (Fungible Tokens)، أي أنها تتمتع بخاصية تجعل كل رمز مطابقًا تمامًا (بالنوع والقيمة) للرمز الآخر. على سبيل المثال، يعمل رمز ERC-20 تمامًا مثل الإيثر، أي أن رمزًا واحدًا يساوي دائمًا جميع الرموز الأخرى من نفس النوع.

## المتطلبات الأساسية {#prerequisites}

- [الحسابات](/developers/docs/accounts)
- [العقود الذكية](/developers/docs/smart-contracts/)
- معايير الرمز

## الجسد {#body}

يُعد ERC-20 (طلب الإيثريوم للتعليقات 20)، الذي اقترحه فابيان فوجيلستيلر في نوفمبر 2015، معيارًا للرموز يُنفذ واجهة برمجة تطبيقات للرموز داخل العقود الذكية.

أمثلة على الوظائف التشغيلية التي توفرها رموز ERC-20:

- تحويل الرموز من حساب إلى حساب آخر
- الحصول على الرصيد الحالي للحساب
- الحصول على العرض الإجمالي المتاح للعملة على الشبكة
- الموافقة على ما إذا كان يمكن إنفاق عملات لحساب معين من قبل حساب من طرف ثالث

إذا نفذ العقد الذكي الأساليب والأحداث التالية، فيمكن تسميته بعقد رمز ERC-20، وبمجرد نشره، سيكون مسؤولاً عن تتبع الرموز التي تم إنشاؤها على Ethereum.

من [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### طرق {#methods}

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

### الأحداث {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### أمثلة {#web3py-example}

Let's see how a Standard is so important to make things simple for us to inspect any ERC-20 Token Contract on Ethereum.
We just need the Contract Application Binary Interface (ABI) to create an interface to any ERC-20 Token. كما ترى أدناه، سنستخدم واجهة برمجة تطبيقات (ABI) مبسطة، لجعلها مثالاً منخفض الاحتكاك.

#### مثال Web3.py {#web3py-example}

أولاً، تأكد من تثبيت مكتبة [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) الخاصة بلغة Python:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # الإيثر المغلّف (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# هذه واجهة تطبيق ثنائية (ABI) مبسطة لعقد رمزي مميز بمعيار ERC-20.
# ستكشف فقط عن الدوال التالية: balanceOf(address)، وdecimals()، وsymbol()، وtotalSupply()
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

## مشكلات معروفة {#erc20-issues}

### مشكلة استقبال الرموز المميزة بمعيار ERC-20 {#reception-issue}

**اعتبارًا من 20/06/2024، فُقِد ما لا يقل عن 83,656,418 دولارًا من الرموز المميزة بمعيار ERC-20 بسبب هذه المشكلة.** لاحظ أن التنفيذ الخالص لمعيار ERC-20 عرضة لهذه المشكلة ما لم تنفذ مجموعة من القيود الإضافية على المعيار كما هو موضح أدناه.\*\*

عندما يتم إرسال رموز ERC-20 إلى عقد ذكي غير مصمم للتعامل مع رموز ERC-20، فقد يتم فقدان هذه الرموز بشكل دائم. يحدث هذا لأن العقد المستلم لا يحتوي على الوظيفة اللازمة للتعرف على الرموز الواردة أو الاستجابة لها، ولا توجد آلية في معيار ERC-20 لإخطار العقد المستلم بالرموز الواردة. والطرق الرئيسية التي تتشكل بها هذه المشكلة هي من خلال:

1. آلية نقل الرمز

- يتم نقل رموز ERC-20 باستخدام وظائف النقل أو النقل من
  - عندما يرسل المستخدم رموزًا إلى عنوان عقد باستخدام هذه الوظائف، يتم نقل الرموز بغض النظر عما إذا كان العقد المستلم مصممًا للتعامل معها أم لا

2. عدم وجود الإخطار
   - لا يتلقى العقد المستلم إشعارًا أو مكالمة هاتفية تفيد بإرسال الرموز إليه
   - إذا كان العقد المستلم يفتقر إلى آلية للتعامل مع الرموز (على سبيل المثال، وظيفة احتياطية أو وظيفة مخصصة لإدارة استقبال الرموز)، فإن الرموز عالقة فعليًا في عنوان العقد
3. لا يوجد معالجة مدمجة
   - لا يتضمن معيار ERC-20 وظيفة إلزامية لعقود الاستلام للتنفيذ، مما يؤدي إلى موقف حيث لا تتمكن العديد من العقود من إدارة الرموز الواردة بشكل صحيح

**الحلول الممكنة**

على الرغم من أنه من غير الممكن منع هذه المشكلة تمامًا باستخدام ERC-20، إلا أن هناك طرقًا تسمح بتقليل احتمالية فقدان الرموز بشكل كبير للمستخدم النهائي:

- المشكلة الأكثر شيوعًا هي عندما يرسل المستخدم الرموز المميزة إلى عنوان عقد الرمز المميز نفسه (على سبيل المثال، إيداع USDT إلى عنوان عقد الرمز المميز USDT). يوصى بتقييد دالة `transfer(..)` لإبطال محاولات التحويل هذه. فكر في إضافة التحقق `require(_to != address(this));` ضمن تنفيذ دالة `transfer(..)`.
- بشكل عام، دالة `transfer(..)` ليست مصممة لإيداع الرموز المميزة في العقود. `approve(..) ويُستخدم نمط `transferFrom(..)`لإيداع الرموز المميزة بمعيار ERC-20 في العقود بدلاً من ذلك. من الممكن تقييد دالة التحويل لمنع إيداع الرموز المميزة في أي عقود باستخدامها، ولكن هذا قد يكسر التوافق مع العقود التي تفترض أنه يمكن إيداع الرموز المميزة في العقود باستخدام دالة`trasnfer(..)` (مثل مجمعات سيولة Uniswap).
- افترض دائمًا أن رموز ERC-20 يمكن أن تظهر في عقدك حتى لو لم يكن من المفترض أن يتلقى عقدك أيًا منها على الإطلاق. لا توجد طريقة لمنع أو رفض الإيداعات العرضية من جانب المستلمين يوصى بتنفيذ وظيفة تسمح باستخراج رموز ERC-20 المودعة عن طريق الخطأ.
- فكر في استخدام معايير رمزية بديلة

لقد ظهرت بعض المعايير البديلة نتيجة لهذه المشكلة مثل [ERC-223](/developers/docs/standards/tokens/erc-223) أو [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## قراءة إضافية {#further-reading}

- [EIP-20: معيار توكن ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - الرموز المميزة](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - تنفيذ ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - دليل رموز Solidity ERC20 المميزة](https://www.alchemy.com/overviews/erc20-solidity)

## معايير الرموز المميزة الأخرى القابلة للاستبدال {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - الخزائن المرمزة](/developers/docs/standards/tokens/erc-4626)
