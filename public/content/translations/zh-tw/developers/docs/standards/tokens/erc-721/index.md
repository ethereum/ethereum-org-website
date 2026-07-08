---
title: "ERC-721 非同質化代幣標準"
description: "了解 ERC-721，這是在以太坊上代表獨特數位資產的非同質化代幣 (NFT) 標準。"
lang: zh-tw
---

## 簡介 {#introduction}

**什麼是非同質化代幣？**

非同質化代幣 (NFT) 用於以獨特的方式識別某物或某人。這種類型的代幣非常適合用於提供收藏品、存取金鑰、彩券、演唱會和體育比賽對號座等的平台。這種特殊類型的代幣具有驚人的潛力，因此它值得擁有一個適當的標準，而 ERC-721 就是為了解決這個問題而誕生的！

**什麼是 ERC-721？**

ERC-721 引入了 NFT 的標準，換句話說，這種類型的代幣是獨一無二的，並且可以與來自同一個智能合約的另一個代幣具有不同的價值，這可能是由於它的年齡、稀有度，甚至是視覺外觀等其他因素。等等，視覺外觀？

沒錯！所有的 NFT 都有一個名為 `tokenId` 的 `uint256` 變數，因此對於任何 ERC-721 合約，`contract address, uint256 tokenId` 這對組合必須是全域唯一的。也就是說，去中心化應用程式 (dapp) 可以有一個「轉換器」，將 `tokenId` 作為輸入，並輸出一些酷炫的圖像，例如殭屍、武器、技能或令人驚豔的貓咪！

## 先決條件 {#prerequisites}

- [帳戶](/developers/docs/accounts/)
- [智能合約](/developers/docs/smart-contracts/)
- [代幣標準](/developers/docs/standards/tokens/)

## 內文 {#body}

ERC-721（[以太坊](/)徵求修正意見書 721）由 William Entriken、Dieter Shirley、Jacob Evans 和 Nastassia Sachs 於 2018 年 1 月提出，是一個非同質化代幣標準，在智能合約中實作了代幣的 API。

它提供了將代幣從一個帳戶轉帳到另一個帳戶、取得帳戶目前的代幣餘額、取得特定代幣的擁有者，以及網路上可用代幣總供應量等功能。除此之外，它還有一些其他功能，例如授權第三方帳戶可以轉移某個帳戶中的一定數量的代幣。

如果一個智能合約實作了以下方法和事件，它就可以被稱為 ERC-721 非同質化代幣合約，一旦部署，它將負責追蹤在以太坊上建立的代幣。

來自 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)：

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

讓我們來看看標準為何如此重要，它讓我們能輕鬆檢查以太坊上的任何 ERC-721 代幣合約。我們只需要合約應用程式二進位介面 (ABI) 即可建立任何 ERC-721 代幣的介面。如下所示，我們將使用簡化的 ABI，使其成為一個低門檻的範例。

#### Web3.py 範例 {#web3py-example-2}

首先，請確保您已安裝 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 函式庫：

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # 加密貓合約

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # 加密貓銷售拍賣

# 這是一個簡化的 ERC-721 NFT 合約應用程式二進位介面 (ABI)。
# 它將僅公開以下方法：balanceOf(address)、name()、ownerOf(tokenId)、symbol()、totalSupply()
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

# 使用 Transfer 事件 ABI 來獲取有關已轉帳貓咪的資訊。
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# 我們需要事件的簽章來過濾日誌
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# 注意事項：
#   - 如果沒有返回 Transfer 事件，請將區塊數量從 120 往上增加。
#   - 如果您沒有找到任何 Transfer 事件，您也可以嘗試在以下網址獲取 tokenId：
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       點擊展開事件的日誌並複製其 "tokenId" 參數
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # 在此貼上來自上述連結的 "tokenId"
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

加密貓合約除了標準事件外，還有一些有趣的事件。

讓我們來看看其中的兩個：`Pregnant` 和 `Birth`。

```python
# 使用 Pregnant 和 Birth 事件 ABI 來獲取有關新貓咪的資訊。
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

# 我們需要事件的簽章來過濾日誌
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

## 熱門的 NFT {#popular-nfts}

- [Etherscan NFT 追蹤器](https://etherscan.io/nft-top-contracts)按轉帳量列出了以太坊上頂級的 NFT。
- [加密貓](https://www.cryptokitties.co/)是一款圍繞著可繁殖、可作為收藏品且非常可愛的生物（我們稱之為加密貓）的遊戲。
- [Sorare](https://sorare.com/) 是一款全球夢幻足球遊戲，您可以在其中收集限量版收藏品、管理您的球隊並透過競爭贏得獎品。
- [以太坊域名服務 (ENS)](https://ens.domains/) 提供了一種安全且去中心化的方式，使用簡單、人類可讀的名稱來定址區塊鏈上和區塊鏈外的資源。
- [POAP](https://poap.xyz) 向參加事件或完成特定操作的人發放免費的 NFT。POAP 可以免費建立和分發。
- [Unstoppable Domains](https://unstoppabledomains.com/) 是一家總部位於舊金山的公司，致力於在區塊鏈上建立域名。區塊鏈域名用人類可讀的名稱取代了加密貨幣地址，並可用於啟用抗審查的網站。
- [Gods Unchained Cards](https://godsunchained.com/) 是以太坊區塊鏈上的一款集換式卡牌遊戲 (TCG)，它使用 NFT 為遊戲內資產帶來真正的所有權。
- [無聊猿遊艇俱樂部 (Bored Ape Yacht Club)](https://boredapeyachtclub.com) 是 10,000 個獨特 NFT 的集合，它不僅是可證明的稀有藝術品，還可作為俱樂部的會員代幣，提供隨著社群努力而隨時間增加的會員特權和福利。

## 進一步閱讀 {#further-reading}

- [EIP-721：ERC-721 非同質化代幣標準](https://eips.ethereum.org/EIPS/eip-721)
- [歐本齊柏林 - ERC-721 文件](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [歐本齊柏林 - ERC-721 實作](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## 教學：在以太坊上使用非同質化代幣 (ERC-721) 進行建置 {#tutorials}

- [Vyper ERC-721 合約演練](/developers/tutorials/erc-721-vyper-annotated-code/) _– 以 Vyper 撰寫的完整 ERC-721 NFT 合約的註解演練。_
- [如何撰寫與部署 NFT（第 1/3 部分）](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– 撰寫並部署您的第一個 ERC-721 智能合約的逐步指南。_
- [如何鑄造 NFT（第 2/3 部分）](/developers/tutorials/how-to-mint-an-nft/) _– 如何使用您部署的智能合約和 Web3 鑄造 ERC-721 NFT。_
- [如何在錢包中檢視您的 NFT（第 3/3 部分）](/developers/tutorials/how-to-view-nft-in-metamask/) _– 部署後如何在梅塔馬斯克中顯示您鑄造的 NFT。_
- [NFT 鑄造器教學](/developers/tutorials/nft-minter/) _– 使用 React 前端、梅塔馬斯克和 Alchemy 建置全端 NFT 鑄造去中心化應用程式 (dapp)。_