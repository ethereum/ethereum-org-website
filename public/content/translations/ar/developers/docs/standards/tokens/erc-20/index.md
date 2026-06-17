---
title: "معيار الرمز المميز ⁦ERC-20⁩"
description: "تعرف على ⁦ERC-20⁩، وهو معيار الرموز القابلة للاستبدال على إيثيريوم والذي يتيح تطبيقات الرموز المميزة القابلة للتشغيل البيني."
lang: ar
---

## مقدمة {#introduction}

**ما هو الرمز المميز؟**

يمكن أن تمثل الرموز المميزة أي شيء تقريبًا في [إيثيريوم](/):

- نقاط السمعة في منصة عبر الإنترنت
- مهارات شخصية في لعبة
- الأصول المالية مثل حصة في شركة
- عملة ورقية مثل الدولار الأمريكي (<span dir="ltr">USD</span>)
- أوقية من الذهب
- والمزيد...

يجب التعامل مع هذه الميزة القوية في إيثيريوم بواسطة معيار قوي، أليس كذلك؟ هذا بالضبط هو الدور الذي يلعبه <span dir="ltr">ERC-20</span>! يسمح هذا المعيار للمطورين ببناء تطبيقات رموز مميزة قابلة للتشغيل البيني مع المنتجات والخدمات الأخرى. يُستخدم معيار <span dir="ltr">ERC-20</span> أيضًا لتوفير وظائف إضافية لـ [إيثر](/glossary/#ether).

**ما هو <span dir="ltr">ERC-20</span>؟**

يقدم <span dir="ltr">ERC-20</span> معيارًا للرموز القابلة للاستبدال، وبعبارة أخرى، تمتلك خاصية تجعل كل رمز مميز مطابقًا تمامًا (في النوع والقيمة) لرمز مميز آخر. على سبيل المثال، يعمل الرمز المميز <span dir="ltr">ERC-20</span> تمامًا مثل <span dir="ltr">ETH</span>، مما يعني أن رمزًا مميزًا واحدًا يساوي وسيظل دائمًا مساويًا لجميع الرموز المميزة الأخرى.

## المتطلبات الأساسية {#prerequisites}

- [الحسابات](/developers/docs/accounts)
- [العقود الذكية](/developers/docs/smart-contracts/)
- [معايير الرموز المميزة](/developers/docs/standards/tokens/)

## المحتوى {#body}

معيار <span dir="ltr">ERC-20</span> (طلب تعليقات إيثيريوم 20)، الذي اقترحه فابيان فوغلستيلر في نوفمبر <span dir="ltr">2015</span>، هو معيار رمز مميز ينفذ واجهة برمجة تطبيقات (<span dir="ltr">API</span>) للرموز المميزة داخل العقود الذكية.

أمثلة على الوظائف التي يوفرها <span dir="ltr">ERC-20</span>:

- تحويل الرموز المميزة من حساب إلى آخر
- الحصول على رصيد الرمز المميز الحالي لحساب ما
- الحصول على إجمالي المعروض من الرمز المميز المتاح على الشبكة
- الموافقة على ما إذا كان يمكن إنفاق كمية من الرمز المميز من حساب بواسطة حساب طرف ثالث

إذا كان العقد الذكي ينفذ الطرق والأحداث التالية، فيمكن تسميته عقد رمز مميز <span dir="ltr">ERC-20</span>، وبمجرد نشره، سيكون مسؤولاً عن تتبع الرموز المميزة التي تم إنشاؤها على إيثيريوم.

من [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### الطرق {#methods}

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

دعونا نرى كيف أن المعيار مهم جدًا لجعل الأمور بسيطة بالنسبة لنا لفحص أي عقد رمز مميز <span dir="ltr">ERC-20</span> على إيثيريوم. نحن نحتاج فقط إلى واجهة التطبيق الثنائية للعقد (<span dir="ltr">ABI</span>) لإنشاء واجهة لأي رمز مميز <span dir="ltr">ERC-20</span>. كما ترى أدناه، سنستخدم <span dir="ltr">ABI</span> مبسطًا، لجعله مثالًا سهل الفهم.

#### مثال <span dir="ltr">Web3.py</span> {#web3py-example-2}

أولاً، تأكد من تثبيت مكتبة <span dir="ltr">Python</span> [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # إيثر مغلف (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # يونيسواب V2: DAI 2

# هذه واجهة تطبيق ثنائية (ABI) مبسطة لعقد رمز مميز ERC-20.
# ستعرض فقط الطرق: balanceOf(address) و decimals() و symbol() و totalSupply()
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

## المشكلات المعروفة {#erc20-issues}

### مشكلة استقبال الرمز المميز <span dir="ltr">ERC-20</span> {#reception-issue}

**اعتبارًا من <span dir="ltr">06/20/2024</span>، فُقد ما لا يقل عن <span dir="ltr">$83,656,418</span> من الرموز المميزة <span dir="ltr">ERC-20</span> بسبب هذه المشكلة. لاحظ أن تنفيذ <span dir="ltr">ERC-20</span> النقي عُرضة لهذه المشكلة ما لم تقم بتنفيذ مجموعة من القيود الإضافية فوق المعيار كما هو موضح أدناه.**

عندما يتم إرسال الرموز المميزة <span dir="ltr">ERC-20</span> إلى عقد ذكي غير مصمم للتعامل مع الرموز المميزة <span dir="ltr">ERC-20</span>، يمكن أن تُفقد هذه الرموز المميزة بشكل دائم. يحدث هذا لأن العقد المستلم لا يمتلك الوظيفة للتعرف على الرموز المميزة الواردة أو الاستجابة لها، ولا توجد آلية في معيار <span dir="ltr">ERC-20</span> لإخطار العقد المستلم بالرموز المميزة الواردة. الطرق الرئيسية التي تتخذها هذه المشكلة هي من خلال:

1.	آلية تحويل الرمز المميز
  - يتم تحويل الرموز المميزة <span dir="ltr">ERC-20</span> باستخدام دوال التحويل أو التحويل من (<span dir="ltr">transfer</span> أو <span dir="ltr">transferFrom</span>)
	- عندما يرسل المستخدم رموزًا مميزة إلى عنوان عقد باستخدام هذه الدوال، يتم تحويل الرموز المميزة بغض النظر عما إذا كان العقد المستلم مصممًا للتعامل معها
2.	نقص الإشعارات
	- لا يتلقى العقد المستلم إشعارًا أو استدعاءً بأنه تم إرسال رموز مميزة إليه
	- إذا كان العقد المستلم يفتقر إلى آلية للتعامل مع الرموز المميزة (على سبيل المثال، دالة احتياطية أو دالة مخصصة لإدارة استقبال الرموز المميزة)، فإن الرموز المميزة تعلق فعليًا في عنوان العقد
3.	عدم وجود معالجة مدمجة
	- لا يتضمن معيار <span dir="ltr">ERC-20</span> دالة إلزامية للعقود المستلمة لتنفيذها، مما يؤدي إلى وضع تكون فيه العديد من العقود غير قادرة على إدارة الرموز المميزة الواردة بشكل صحيح

**الحلول الممكنة**

على الرغم من أنه ليس من الممكن منع هذه المشكلة مع <span dir="ltr">ERC-20</span> تمامًا، إلا أن هناك طرقًا تسمح بتقليل احتمالية فقدان الرموز المميزة للمستخدم النهائي بشكل كبير:

- المشكلة الأكثر شيوعًا هي عندما يرسل المستخدم رموزًا مميزة إلى عنوان عقد الرمز المميز نفسه (على سبيل المثال، إيداع <span dir="ltr">USDT</span> في عنوان عقد الرمز المميز <span dir="ltr">USDT</span>). يوصى بتقييد دالة `transfer(..)` للتراجع عن محاولات التحويل هذه. فكر في إضافة فحص `require(_to != address(this));` ضمن تنفيذ دالة `transfer(..)`.
- دالة `transfer(..)` بشكل عام ليست مصممة لإيداع الرموز المميزة في العقود. يُستخدم نمط `approve(..) & transferFrom(..)` لإيداع الرموز المميزة <span dir="ltr">ERC-20</span> في العقود بدلاً من ذلك. من الممكن تقييد دالة التحويل لعدم السماح بإيداع الرموز المميزة في أي عقود بها، ومع ذلك قد يؤدي ذلك إلى كسر التوافق مع العقود التي تفترض أنه يمكن إيداع الرموز المميزة في العقود باستخدام دالة `transfer(..)` (على سبيل المثال، مجمعات سيولة يونيسواب).
- افترض دائمًا أن الرموز المميزة <span dir="ltr">ERC-20</span> يمكن أن ينتهي بها المطاف في عقدك حتى لو لم يكن من المفترض أن يتلقى عقدك أيًا منها. لا توجد طريقة لمنع أو رفض الإيداعات العرضية من جانب المستلم. يوصى بتنفيذ دالة تسمح باستخراج الرموز المميزة <span dir="ltr">ERC-20</span> المودعة عن طريق الخطأ.
- فكر في استخدام معايير رموز مميزة بديلة.

ظهرت بعض المعايير البديلة من هذه المشكلة مثل [ERC-223](/developers/docs/standards/tokens/erc-223) أو [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## قراءة إضافية {#further-reading}

- [EIP-20: معيار الرمز المميز ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [أوبن زبلن - الرموز المميزة](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [أوبن زبلن - تنفيذ ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - دليل لرموز ERC20 في Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## معايير الرموز القابلة للاستبدال الأخرى {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - الخزائن المرمزة](/developers/docs/standards/tokens/erc-4626)

## برامج تعليمية: البناء باستخدام <span dir="ltr">ERC-20</span> على إيثيريوم {#tutorials}

- [جولة في عقد ERC-20](/developers/tutorials/erc20-annotated-code/) _– جولة مشروحة سطرًا بسطر لتنفيذ عقد أوبن زبلن ERC-20._
- [ERC-20 مع حواجز الأمان](/developers/tutorials/erc20-with-safety-rails/) _– كيفية إضافة ضمانات إلى الرموز المميزة ERC-20 لمساعدة المستخدمين على تجنب الأخطاء الشائعة._
- [إرسال الرموز المميزة باستخدام Ethers.js](/developers/tutorials/send-token-ethersjs/) _– دليل مناسب للمبتدئين لتحويل الرموز المميزة ERC-20 باستخدام Ethers.js._
- [بعض الحيل التي تستخدمها الرموز المميزة الاحتيالية وكيفية اكتشافها](/developers/tutorials/scam-token-tricks/) _– استكشاف مفصل لأنماط الرموز المميزة ERC-20 الاحتيالية وكيفية التعرف عليها._