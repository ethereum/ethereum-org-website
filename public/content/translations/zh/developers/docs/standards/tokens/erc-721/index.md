---
title: ERC-721 非同质化代币标准
description:
lang: zh
---

## 介绍 {#introduction}

**什么是非同质化代币？**

非同质化代币（NFT）用于以唯一的方式标识某人或者某物。 此类型的代币可以被完美地用于出售下列物品的平台：收藏品、密钥、彩票、音乐会座位编号、体育比赛等。 这种类型的代币有着惊人的潜力，因此它需要一个适当的标准。ERC-721 就是为解决这个问题而来！

**ERC-721 是什么？**

ERC-721 为 NFT 引入了一个标准，换言之，这种类型的代币是独一无二的，并且可能与来自同一智能合约的另一代币有不同的价值，也许是因为它的年份、稀有性、甚至是它的观感。 稍等，看起来怎么样呢？

是的。 所有 NFTs 都有一个 `uint256` 变量，名为 `tokenId`，所以对于任何 ERC-721 合约，这对值` contract address, tokenId ` 必须是全局唯一的。 也就是说，去中心化应用程序可以有一个“转换器”， 使用 `tokenId` 作为输入并输出一些很酷的事物图像，例如僵尸、武器、技能或神奇的小猫咪！

## 前提条件 {#prerequisites}

- [帐户](/developers/docs/accounts/)
- [智能合约](/developers/docs/smart-contracts/)
- [代币标准](/developers/docs/standards/tokens/)

## 正文 {#body}

ERC-721（Ethereum Request for Comments 721），由 William Entriken、Dieter Shirley、Jacob Evans、Nastassia Sachs 在 2018 年 1 月提出，是一个在智能合约中实现代币 API 的非同质化代币标准。

它提供了一些功能，例如将代币从一个帐户转移到另一个帐户，获取帐户的当前代币余额，获取代币的所有者，以及整个网络的可用代币总供应量。 除此之外，它还具有其他功能，例如批准帐户中一定数量的代币可以被第三方帐户转移。

如果一个智能合约实现了下列方法和事件，它就可以被称为 ERC-721 非同质化代币合约。 一旦被部署，它将负责跟踪在以太坊上创建的代币。

来自[ EIP-721 ](https://eips.ethereum.org/EIPS/eip-721)：

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

### 示例 {#web3py-example}

让我们看看一个标准是多么重要，它使我们能够简单地在以太坊上检查任何 ERC-721 代币合约。 我们只需要合约的应用程序二进制接口（ABI）就可以创造任何 ERC-721 代币的接口。 下面我们将使用一个简化的应用程序二进制接口，让例子变得更为简单。

#### Web3.py 示例 {#web3py-example}

首先，请确保你已安装 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 库：

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

除了标准事件之外，CryptoKitties 合约还有其它一些有趣的事件。

让我们看看其中的两个，`Pregnant` 和 `Birth`。

```python
# Using the Pregnant and Birth Events ABI to get info about new Kitties.
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

## 热门的 NFT {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) 列出了以太坊上交易量最大的 NFT。
- [CryptoKitties](https://www.cryptokitties.co/) 是一个围绕着我们称之为加密猫的可繁殖、可收藏和可爱的生物游戏。
- [Sorare](https://sorare.com/) 是一场全球迷幻足球赛，你可以在这里收集有限版本的收藏品，管理你的球队，参加比赛以获得奖品。
- [以太坊域名服务 (ENS)](https://ens.domains/) 提供了一种安全和去中心化的方式，用人类可读的名字来处理链上和链下的资源。
- [POAP](https://poap.xyz) 向参加事件或完成特定行动的人免费提供非同质化代币。 POAP 的创建和分发是免费的。
- [Unstoppable Domains](https://unstoppabledomains.com/) 总部设在旧金山，是一家在区块链上创建域的公司。 区块链域将加密货币地址替换为人类可读的名称，并且可用于支持抗审查的网站。
- [Gods Unchained Cards](https://godsunchained.com/) 是以太坊区块链上的一款集换式卡牌游戏，它使用非同质化代币来为游戏中的资产提供真实所有权。
- [无聊猿游艇俱乐部](https://boredapeyachtclub.com)是一件由 10,000 个独一无二的非同质化代币构成的收藏品，也是一件非常罕见的艺术品，它作为俱乐部会员资格代币，可为成员提供多种特权和福利，而且在社区的努力下，这些特权和福利还会随着时间的推移不断增加。

## 延伸阅读 {#further-reading}

- [EIP-721：ERC-721 非同质化代币标准](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 文档](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 实施](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
