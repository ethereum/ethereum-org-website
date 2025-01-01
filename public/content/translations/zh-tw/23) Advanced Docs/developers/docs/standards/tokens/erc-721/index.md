---
title: ERC-721 非同質化代幣標準
description:
lang: zh-tw
---

## 簡介 {#introduction}

**什麼是非同質化代幣？**

非同質化代幣 (NFT) 用於以獨一無二的方式來識別某物或某人。 這類型的代幣非常適合在提供收藏品、密鑰、彩票、音樂會和體育比賽的編號座位等平台上使用。 這種特殊類型的代幣具有驚人潛力，因此它應得一個適當標準，而 ERC-721 正是來解決這個問題！

**什麼是 ERC-721？**

ERC-721 引入了非同質化代幣標準，換句話說，這類型的代幣是獨一無二，並且可以與來自同一智慧型合約的另一種代幣有不同的價值，這可能是由於其存在時間、稀有性甚至是視覺觀感等其他原因。 等一下，視覺觀感？

是的！ 所有非同質化代幣都有一個名為 `tokenId` 的 `uint256` 變數，因此對於任何 ERC-721 合約，該對 `contract address, uint256 tokenId` 必須是全局唯一的。 也就是說，去中心化應用程式可以有一個「轉換器」，使用 `tokenId` 作為輸入並輸出一些很酷的事物圖像，例如殭屍、武器、技能或神奇的小貓咪！

## 基本資訊 {#prerequisites}

- [帳戶](/developers/docs/accounts/)
- [智慧型合約](/developers/docs/smart-contracts/)
- [權杖標準](/developers/docs/standards/tokens/)

## 主旨 {#body}

ERC-721（以太坊意見請求 721）由 William Entriken、Dieter Shirley、Jacob Evans、Nastassia Sachs 於 2018 年 1 月提出，是一種非同質化代幣標準，在智慧型合約中實作代幣應用程式介面。

它提供的功能包括將代幣從一個帳戶轉移到另一個帳戶、獲取帳戶當前的代幣餘額、獲取特定代幣的所有者以及網路上可用代幣的總供應量。 此外它還有一些其他功能，例如批准帳戶中一定數量的代幣可以被第三方帳戶轉移。

如果智慧型合約實作以下方法和事件，則可以將其稱為 ERC-721 非同質化代幣合約。一旦部署，它將負責追蹤以太坊上創建的代幣。

取自 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)：

### 方法 {#methods}

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

### 事件 {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### 範例 {#web3py-example}

讓我們看看為何標準如此重要，去讓我們檢查以太坊上的任何 ERC-721 代幣合約變得簡單。 我們只需要合約應用程式二進位介面 (ABI) 來創建任何 ERC-721 代幣的介面。 以下內容將使用簡易ABI來簡單示範.

#### Web3.py 範例 {#web3py-example}

首先先確定你已安專[Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 資料庫:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# It will expose only the methods: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Using the Transfer Event ABI to get info about transferred Kitties.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# We need the event's signature to filter the logs
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - Increase the number of blocks up from 120 if no Transfer event is returned.
#   - If you didn't find any Transfer event you can also try to get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

除了標準事件外，謎戀貓合約還有一些有趣的事件。

讓我們檢查其中兩個：`Pregnant` 和 `Birth`。

```python
#通過懷孕及誕生事件ABI來取得新喵咪資訊.
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

# We need the event's signature to filter the logs
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## 熱門的非同質化代幣 {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) 按傳送量列出了以太坊上熱門的非同質化代幣。
- [CryptoKitties](https://www.cryptokitties.co/) 是一款圍繞可繁殖、可收藏且非常可愛，我們稱之為謎戀貓的生物為中心的遊戲。
- [Sorare](https://sorare.com/) 是一款全球的夢幻足球遊戲，你可以在其中收集限量版收藏品、管理你的球隊並透過競爭贏得獎品。
- [以太坊名稱服務 (ENS)](https://ens.domains/) 提供了一種安全、去中心化的方式，使用簡單及人類可讀的名稱來辨識鏈上鏈下的資源。
- [POAP](https://poap.xyz) 向參加活動或完成特定行動的人免費提供 NFT。 建立和分發 POAP 是免費的。
- [Unstoppable Domains](https://unstoppabledomains.com/) 是一家位於舊金山的公司，專注於建立區塊鏈域名服務。 區塊鏈域名以人類可辨識名稱取代加密貨幣地址，並可用於啟用抗審查網站。
- [Gods Unchained Cards](https://godsunchained.com/) 是以太坊區塊鏈上的集換式卡牌遊戲，它使用非同質化代幣為遊戲內資產帶來真正的所有權。
- [無聊猿遊艇俱樂部](https://boredapeyachtclub.com)是一件由10000 個獨一無二的非同質化代幣(NFT)構成的收藏品，也是非常罕見的藝術品，它作為俱樂部會員資格代幣，可為成員提供多種特權和福利，而且在社區的努力下特權和福利還會隨著時間不斷增加。

## 衍生閱讀 {#further-reading}

- [EIP-721：ERC-721 非同質化代幣標準](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 文檔](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 實作](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
