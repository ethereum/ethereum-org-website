---
title: معيار الرمز غير القابل للاستبدال ERC-721
description: تعرف على ERC-721، المعيار الخاص بالرموز غير القابلة للاستبدال (NFTs) التي تمثل أصولًا رقمية فريدة على Ethereum.
lang: ar
---

## مقدمة {#مقدمة}

**ما هو الرمز غير القابل للاستبدال؟**

يُستخدم الرمز غير القابل للاستبدال (NFT) لتحديد شيء ما أو شخص ما بطريقة فريدة. يُعد هذا النوع من الرموز مثالياً للاستخدام في المنصات التي تقدم عناصر قابلة للتجميع أو مفاتيح وصول أو تذاكر يانصيب أو مقاعد مرقمة للحفلات الموسيقية والمباريات الرياضية وغيرها. لهذا النوع الخاص من الرموز إمكانيات مذهلة، لذا استحق وجود معيار مناسب له، فجاء ERC-721 ليحقق هذا الهدف!

**ما هو ERC-721؟**

يُقدِّم معيار ERC-721 نموذجًا موحدًا للرموز غير القابلة للاستبدال. بعبارة أخرى، يكون هذا النوع من الرموز فريدًا ويمكن أن يمتلك قيمة مختلفة عن أي رمز آخر صادِر من نفس العقد الذكي، ربما بسبب عمره أو ندرته أو حتى مظهره أو خصائص أخرى.
مهلًا، مظهره؟

نعم! تمتلك جميع الرموز غير القابلة للاستبدال (NFTs) متغيرًا `uint256` يُدعى `tokenId`، لذا بالنسبة لأي عقد ERC-721، يجب أن يكون الزوج
`contract address, uint256 tokenId` فريدًا عالميًا. ومع ذلك، يمكن لتطبيق لامركزي أن يمتلك "محولًا"
يستخدم `tokenId` كمدخل ويُخرج صورة لشيء رائع، مثل الزومبي أو الأسلحة أو المهارات أو القطط المذهلة!

## المتطلبات الأساسية {#prerequisites}

- [الحسابات](/developers/docs/accounts/)
- [العقود الذكية](/developers/docs/smart-contracts/)
- معايير الرمز

## الجسد {#الجسد}

تم اقتراح معيار ERC-721 (اختصارًا لـ Ethereum Request for Comments 721) من قبل ويليام إنتريكن وديتر شيرلي وجاكوب إيفانز وناستاسيا ساكس في يناير 2018، وهو معيار للرموز غير القابلة للاستبدال يوفّر واجهة برمجية (API) للتعامل مع هذه الرموز ضمن العقود الذكية.

يوفّر هذا المعيار وظائف مثل: نقل الرموز من حساب إلى آخر، الحصول على الرصيد الحالي للرموز في حساب معيّن، معرفة مالك رمز محدد، وكذلك معرفة إجمالي عدد الرموز المتاحة على الشبكة.
إلى جانب هذه الميزات، يوفّر أيضًا وظائف أخرى مثل الموافقة على السماح لطرف ثالث بنقل كمية معيّنة من الرموز من حساب معيّن.

إذا كان العقد الذكي يُنفِّذ الطرق والأحداث التالية، فيمكن اعتباره عقد رمز غير قابل للاستبدال (ERC-721 NFT)، وبمجرد نشره سيكون مسؤولًا عن تتبّع الرموز التي تم إنشاؤها على شبكة إيثريوم.

من [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### طرق {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### الأحداث{#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### أمثلة {#web3py-example}

Let's see how a Standard is so important to make things simple for us to inspect any ERC-721 Token Contract on Ethereum.
We just need the Contract Application Binary Interface (ABI) to create an interface to any ERC-721 Token. كما ترى أدناه، سنستخدم واجهة برمجة تطبيقات (ABI) مبسطة، لجعلها مثالاً منخفض الاحتكاك.

#### مثال Web3.py {#web3py-example}

أولاً، تأكد من تثبيت مكتبة [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) الخاصة بلغة Python:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # عقد CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # مزاد مبيعات CryptoKitties

# هذه واجهة تطبيق ثنائية للعقد (ABI) مبسطة لعقد ERC-721 NFT.
# ستكشف فقط عن الدوال التالية: balanceOf(address)، name()، ownerOf(tokenId)، symbol()، totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
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
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# استخدام واجهة التطبيق الثنائية لحدث التحويل (Transfer Event ABI) للحصول على معلومات حول القطط المحولة.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# نحتاج إلى توقيع الحدث لتصفية السجلات
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# ملاحظات:
#   - قم بزيادة عدد الكتل فوق 120 إذا لم يتم إرجاع أي حدث تحويل.
#   - إذا لم تجد أي حدث تحويل، يمكنك أيضًا محاولة الحصول على tokenId من:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       انقر لتوسيع سجلات الحدث وانسخ وسيطة "tokenId" الخاصة به
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # الصق "tokenId" هنا من الرابط أعلاه
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

عقد CryptoKitties يحتوي على بعض الأحداث المميزة الإضافية إلى جانب الأحداث القياسية.

دعنا نتحقق من اثنين منهم، `Pregnant` و `Birth`.

```python
# استخدام واجهة التطبيق الثنائية لأحداث الحمل والولادة (Pregnant and Birth Events ABI) للحصول على معلومات حول القطط الجديدة.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# نحتاج إلى توقيع الحدث لتصفية السجلات
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# هذا مثال لحدث الحمل (Pregnant Event):
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# هذا مثال لحدث الولادة (Birth Event):
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## الرموز غير القابلة للاستبدال (NFTs) الشائعة {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) يسرد أفضل الرموز غير القابلة للاستبدال على إيثريوم من حيث حجم التحويلات.
- [CryptoKitties](https://www.cryptokitties.co/) هي لعبة تتمحور حول مخلوقات قابلة للتكاثر والجمع ولطيفة للغاية
  نطلق عليها اسم CryptoKitties.
- [Sorare](https://sorare.com/) هي لعبة كرة قدم خيالية عالمية يمكنك فيها جمع مقتنيات محدودة الإصدار،
  وإدارة فرقك والمنافسة لكسب الجوائز.
- تقدم [خدمة اسم الإيثيريوم (ENS)](https://ens.domains/) طريقة آمنة ولا مركزية لعنونة الموارد سواء
  على البلوكتشين أو خارجه باستخدام أسماء بسيطة سهلة القراءة.
- يقدم [POAP](https://poap.xyz) رموزًا غير قابلة للاستبدال (NFTs) مجانية للأشخاص الذين يحضرون الفعاليات أو يكملون إجراءات محددة. يُنشأ POAPs ويُوزَّع مجانًا.
- [Unstoppable Domains](https://unstoppabledomains.com/) هي شركة مقرها سان فرانسيسكو تعمل على بناء النطاقات على
  البلوكتشين. تستبدل نطاقات البلوكتشين عناوين العملات الرقمية بأسماء سهلة القراءة للبشر ويمكن استخدامها لتمكين
  مواقع الويب المقاومة للرقابة.
- [Gods Unchained Cards](https://godsunchained.com/) هي لعبة تداول بطاقات (TCG) على بلوكتشين الإيثيريوم تستخدم الرموز غير القابلة للاستبدال (NFTs) لإضفاء الملكية الحقيقية
  على الأصول داخل اللعبة.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) هي مجموعة من 10,000 من الرموز غير القابلة للاستبدال (NFTs) الفريدة، والتي تعمل كرمز عضوية للنادي، بالإضافة إلى كونها قطعة فنية يمكن إثبات ندرتها، وتوفر امتيازات ومزايا للأعضاء تزداد بمرور الوقت نتيجة لجهود المجتمع.

## قراءة إضافية{#further-reading}

- [EIP-721: معيار الرمز غير القابل للاستبدال ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - وثائق ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - تنفيذ ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
