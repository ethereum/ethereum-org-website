---
title: "ERC-721 非同質化代幣標準"
description: "了解 ERC-721，這是以太坊上代表獨特數位資產的非同質化代幣 (NFT) 標準。"
lang: zh-tw
---

## 介紹 {#introduction}

**什麼是非同質化代幣？**

非同質化代幣 (NFT) 用於以獨一無二的方式來識別某物或某人。 這類型的代幣非常適合在提供收藏品、密鑰、彩票、音樂會和體育比賽的編號座位等平台上使用。 這種特殊類型的代幣具有驚人潛力，因此它應得一個適當標準，而 ERC-721 正是來解決這個問題！

**什麼是 ERC-721？**

ERC-721 引入了非同質化代幣標準，換句話說，這類型的代幣是獨一無二，並且可以與來自同一智慧型合約的另一種代幣有不同的價值，這可能是由於其存在時間、稀有性甚至是視覺觀感等其他原因。
等一下，視覺觀感？

是的！ 所有 NFT 都有一個名為 `tokenId` 的 `uint256` 變數，因此對於任何 ERC-721 合約，
`contract address, uint256 tokenId` 這組配對都必須是全域唯一的。 話雖如此，一個去中心化應用程式可以有一個 "轉換器"，
它使用 `tokenId` 作為輸入，並輸出一些很酷的東西的圖片，像是殭屍、武器、技能或超讚的貓咪！

## 先決條件 {#prerequisites}

- [賬戶](/developers/docs/accounts/)
- [智能合約](/developers/docs/smart-contracts/)
- [代幣標準](/developers/docs/standards/tokens/)

## 主旨 {#body}

ERC-721（以太坊意見請求 721）由 William Entriken、Dieter Shirley、Jacob Evans、Nastassia Sachs 於 2018 年 1 月提出，是一種非同質化代幣標準，在智慧型合約中實作代幣應用程式介面。

它提供的功能包括將代幣從一個帳戶轉移到另一個帳戶、獲取帳戶當前的代幣餘額、獲取特定代幣的所有者以及網路上可用代幣的總供應量。
此外它還有一些其他功能，例如批准帳戶中一定數量的代幣可以被第三方帳戶轉移。

如果智慧型合約實作以下方法和事件，則可以將其稱為 ERC-721 非同質化代幣合約。一旦部署，它將負責追蹤以太坊上創建的代幣。

來自 [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

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

### Events {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### 範例 {#web3py-example}

讓我們看看為何標準如此重要，去讓我們檢查以太坊上的任何 ERC-721 代幣合約變得簡單。
我們只需要合約應用程式二進位介面 (ABI) 來創建任何 ERC-721 代幣的介面。 如下所示，我們將使用簡化的 ABI，使其成為一個低門檻的範例。

#### Web3.py 範例 {#web3py-example}

首先，請確認您已安裝 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 函式庫：

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties 合約

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties 銷售拍賣

# 這是 ERC-721 NFT 合約的簡化版合約應用程式二進位介面 (ABI)。
# 它只會公開以下方法：balanceOf(address)、name()、ownerOf(tokenId)、symbol()、totalSupply()
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
print(f"{name} [{symbol}] 拍賣中的 NFT：{kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] 懷孕中的 NFT：{pregnant_kitties}")

# 使用 Transfer 事件 ABI 來取得已轉移貓咪的資訊。
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# 我們需要事件的簽章來篩選日誌
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# 注意：
#   - 如果沒有回傳任何 Transfer 事件，請增加 120 這個區塊數量。
#   - 如果找不到任何 Transfer 事件，您也可以嘗試在此處取得 tokenId：
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       按一下以展開事件的日誌，並複製其「tokenId」引數
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # 從上面的連結將「tokenId」貼在此處
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFT {kitty_id} 是否懷孕：{is_pregnant}")
```

除了標準事件外，謎戀貓合約還有一些有趣的事件。

讓我們檢查其中兩個：`Pregnant` 和 `Birth`。

```python
# 使用 Pregnant 和 Birth 事件的 ABI 來取得新貓咪的資訊。
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

# 我們需要事件的簽章來篩選日誌
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# 這是一個 Pregnant 事件：
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# 這是一個 Birth 事件：
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## 熱門 NFT {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) 根據轉帳量列出以太坊上的頂級 NFT。
- [CryptoKitties](https://www.cryptokitties.co/) 是一款遊戲，主題圍繞著一種我們稱之為「謎戀貓」的
  可繁殖、可收藏且非常可愛的生物。
- [Sorare](https://sorare.com/) 是一款全球夢幻足球遊戲，你可以在其中收集限量版收藏品、
  管理你的球隊並參與競爭以贏得獎品。
- [以太坊域名服務 (ENS)](https://ens.domains/) 提供一種安全且去中心化的方式，可使用簡單易讀的名稱來定址
  鏈上和鏈下的資源。
- [POAP](https://poap.xyz) 會向參加活動或完成特定行動的人們免費發放 NFT。 建立和分發 POAP 是免費的。
- [Unstoppable Domains](https://unstoppabledomains.com/) 是一家總部位於舊金山的公司，專門在
  區塊鏈上建立網域。 區塊鏈網域以人類可讀的名稱取代加密貨幣地址，並可用於啟用
  抗審查的網站。
- [Gods Unchained Cards](https://godsunchained.com/) 是以太坊區塊鏈上的一款集換式卡牌遊戲 (TCG)，它使用 NFT 為
  遊戲內資產帶來真正的所有權。
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) 是一個包含 10,000 個獨特 NFT 的收藏品，它既是一件可證明為稀有的藝術品，也同時是俱樂部的會員代幣，能為會員提供福利，而這些福利會隨著社群的努力與時俱進。

## 延伸閱讀 {#further-reading}

- [EIP-721：ERC-721 非同質化代幣標準](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 文件](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 實作](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
