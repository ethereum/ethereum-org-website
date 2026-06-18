---
title: "معيار الرمز غير القابل للاستبدال ⁦ERC-721⁩"
description: "تعرف على ⁦ERC-721⁩، وهو معيار الرموز غير القابلة للاستبدال (NFTs) التي تمثل أصولاً رقمية فريدة على إيثيريوم."
lang: ar
---

## مقدمة {#introduction}

**ما هو الرمز غير القابل للاستبدال؟**

يُستخدم الرمز غير القابل للاستبدال (<span dir="ltr">NFT</span>) لتحديد شيء أو شخص بطريقة فريدة. هذا النوع من الرموز المميزة مثالي للاستخدام على المنصات التي تقدم مقتنيات، ومفاتيح وصول، وتذاكر يانصيب، ومقاعد مرقمة للحفلات الموسيقية والمباريات الرياضية، وما إلى ذلك. يتمتع هذا النوع الخاص من الرموز المميزة بإمكانيات مذهلة لذا فهو يستحق معيارًا مناسبًا، وقد جاء <span dir="ltr">ERC-721</span> لحل ذلك!

**ما هو <span dir="ltr">ERC-721</span>؟**

يقدم <span dir="ltr">ERC-721</span> معيارًا للرموز غير القابلة للاستبدال (<span dir="ltr">NFT</span>)، وبعبارة أخرى، هذا النوع من الرموز المميزة فريد ويمكن أن يكون له قيمة مختلفة عن رمز مميز آخر من نفس العقد الذكي، ربما بسبب عمره أو ندرته أو حتى شيء آخر مثل مظهره. انتظر، مظهره؟

نعم! تحتوي جميع الرموز غير القابلة للاستبدال (<span dir="ltr">NFTs</span>) على متغير `uint256` يسمى `tokenId`، لذلك بالنسبة لأي عقد <span dir="ltr">ERC-721</span>، يجب أن يكون الزوج `contract address, uint256 tokenId` فريدًا عالميًا. ومع ذلك، يمكن أن يحتوي أي تطبيق لامركزي (dapp) على "محول" يستخدم `tokenId` كمدخل ويخرج صورة لشيء رائع، مثل الزومبي أو الأسلحة أو المهارات أو القطط المذهلة!

## المتطلبات الأساسية {#prerequisites}

- [الحسابات](/developers/docs/accounts/)
- [العقود الذكية](/developers/docs/smart-contracts/)
- [معايير الرموز المميزة](/developers/docs/standards/tokens/)

## المحتوى {#body}

معيار <span dir="ltr">ERC-721</span> ([إيثيريوم](/) لطلب التعليقات 721)، الذي اقترحه ويليام إنتريكن، وديتر شيرلي، وجاكوب إيفانز، وناستاسيا ساكس في يناير <span dir="ltr">2018</span>، هو معيار للرموز غير القابلة للاستبدال ينفذ واجهة برمجة تطبيقات (<span dir="ltr">API</span>) للرموز المميزة داخل العقود الذكية.

يوفر وظائف مثل تحويل الرموز المميزة من حساب إلى آخر، والحصول على رصيد الرموز المميزة الحالي لحساب ما، ومعرفة مالك رمز مميز معين، وكذلك إجمالي المعروض من الرمز المميز المتاح على الشبكة. إلى جانب ذلك، يحتوي أيضًا على بعض الوظائف الأخرى مثل الموافقة على إمكانية نقل كمية من الرموز المميزة من حساب بواسطة حساب طرف ثالث.

إذا كان العقد الذكي ينفذ الطرق والأحداث التالية، فيمكن تسميته عقد رمز غير قابل للاستبدال <span dir="ltr">ERC-721</span>، وبمجرد نشره، سيكون مسؤولاً عن تتبع الرموز المميزة التي تم إنشاؤها على إيثيريوم.

من [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### الطرق {#methods}

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

### الأحداث {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### أمثلة {#web3py-example}

دعونا نرى كيف أن المعيار مهم جدًا لجعل الأمور بسيطة بالنسبة لنا لفحص أي عقد رمز مميز <span dir="ltr">ERC-721</span> على إيثيريوم. نحن نحتاج فقط إلى واجهة التطبيق الثنائية للعقد (<span dir="ltr">ABI</span>) لإنشاء واجهة لأي رمز مميز <span dir="ltr">ERC-721</span>. كما ترى أدناه، سنستخدم <span dir="ltr">ABI</span> مبسطًا، لجعله مثالاً سهل الفهم.

#### مثال Web3.py {#web3py-example-2}

أولاً، تأكد من تثبيت مكتبة Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # عقد كريبتو كيتيز

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # مزاد مبيعات كريبتو كيتيز

# هذه واجهة تطبيق ثنائية (ABI) مبسطة لعقد NFT من نوع ERC-721.
# ستعرض فقط الطرق: balanceOf(address)، name()، ownerOf(tokenId)، symbol()، totalSupply()
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

# استخدام واجهة التطبيق الثنائية (ABI) لحدث التحويل للحصول على معلومات حول قطط كيتيز المحولة.
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
#   - قم بزيادة عدد الكتل لأكثر من 120 إذا لم يتم إرجاع أي حدث تحويل.
#   - إذا لم تجد أي حدث تحويل، يمكنك أيضًا محاولة الحصول على tokenId في:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       انقر لتوسيع سجلات الحدث وانسخ وسيطة "tokenId" الخاصة به
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # الصق "tokenId" هنا من الرابط أعلاه
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

يحتوي عقد كريبتو كيتيز على بعض الأحداث المثيرة للاهتمام بخلاف الأحداث القياسية.

دعونا نتحقق من اثنين منها، `Pregnant` و `Birth`.

```python
# استخدام واجهة التطبيق الثنائية (ABI) لأحداث الحمل والولادة للحصول على معلومات حول قطط كيتيز الجديدة.
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

# إليك حدث حمل:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# إليك حدث ولادة:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## الرموز غير القابلة للاستبدال (NFTs) الشائعة {#popular-nfts}

- يسرد [متتبع Etherscan للرموز غير القابلة للاستبدال](https://etherscan.io/nft-top-contracts) أفضل الرموز غير القابلة للاستبدال على إيثيريوم حسب حجم التحويلات.
- [كريبتو كيتيز](https://www.cryptokitties.co/) هي لعبة تتمحور حول مخلوقات قابلة للتكاثر، ومقتنيات، ورائعة جدًا نطلق عليها اسم كريبتو كيتيز.
- [Sorare](https://sorare.com/) هي لعبة كرة قدم خيالية عالمية حيث يمكنك جمع مقتنيات ذات إصدارات محدودة، وإدارة فرقك والتنافس لكسب الجوائز.
- تقدم [خدمة أسماء إيثيريوم (ENS)](https://ens.domains/) طريقة آمنة ولامركزية لعنونة الموارد داخل وخارج سلسلة الكتل باستخدام أسماء بسيطة يمكن للبشر قراءتها.
- يقدم [POAP](https://poap.xyz) رموزًا غير قابلة للاستبدال مجانية للأشخاص الذين يحضرون الأحداث أو يكملون إجراءات محددة. رموز <span dir="ltr">POAP</span> مجانية الإنشاء والتوزيع.
- [Unstoppable Domains](https://unstoppabledomains.com/) هي شركة مقرها سان فرانسيسكو تبني نطاقات على سلاسل الكتل. تستبدل نطاقات سلسلة الكتل عناوين العملات المشفرة بأسماء يمكن للبشر قراءتها ويمكن استخدامها لتمكين مواقع الويب المقاومة للرقابة.
- [Gods Unchained Cards](https://godsunchained.com/) هي لعبة بطاقات تداول (<span dir="ltr">TCG</span>) على سلسلة كتل إيثيريوم تستخدم الرموز غير القابلة للاستبدال لجلب ملكية حقيقية للأصول داخل اللعبة.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) هي مجموعة من <span dir="ltr">10,000</span> رمز غير قابل للاستبدال فريد، والتي، بالإضافة إلى كونها قطعة فنية نادرة بشكل يمكن إثباته، تعمل كرمز مميز لعضوية النادي، مما يوفر امتيازات وفوائد للأعضاء تزداد بمرور الوقت نتيجة لجهود المجتمع.

## قراءة إضافية {#further-reading}

- [EIP-721: معيار الرمز غير القابل للاستبدال ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [أوبن زبلن - مستندات ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [أوبن زبلن - تنفيذ ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [واجهة برمجة تطبيقات (API) للرموز غير القابلة للاستبدال من Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## برامج تعليمية: البناء باستخدام الرموز غير القابلة للاستبدال (ERC-721) على إيثيريوم {#tutorials}

- [جولة إرشادية لعقد ERC-721 بلغة Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _– جولة إرشادية مشروحة لعقد رمز غير قابل للاستبدال ERC-721 كامل مكتوب بلغة Vyper._
- [كيفية كتابة ونشر رمز غير قابل للاستبدال (الجزء 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– دليل خطوة بخطوة لكتابة ونشر أول عقد ذكي ERC-721 لك._
- [كيفية سك رمز غير قابل للاستبدال (الجزء 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– كيفية سك رمز غير قابل للاستبدال ERC-721 باستخدام عقدك الذكي المنشور وWeb3._
- [كيفية عرض الرمز غير القابل للاستبدال الخاص بك في محفظتك (الجزء 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– كيفية عرض الرمز غير القابل للاستبدال الذي تم سكه في ميتاماسك بعد النشر._
- [برنامج تعليمي لسك الرموز غير القابلة للاستبدال](/developers/tutorials/nft-minter/) _– بناء تطبيق لامركزي (dapp) متكامل لسك الرموز غير القابلة للاستبدال مع واجهة أمامية باستخدام React، وميتاماسك، وAlchemy._