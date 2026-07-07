---
title: "ERC-721 非同质化代币标准"
description: "了解 ERC-721，这是在以太坊上代表独特数字资产的非同质化代币 (NFT) 标准。"
lang: zh
---

## 简介 {#introduction}

**什么是非同质化代币？**

非同质化代币 (NFT) 用于以独特的方式标识某物或某人。这种类型的代币非常适合用于提供收藏品、访问密钥、彩票、音乐会和体育比赛的编号座位等平台。这种特殊类型的代币具有惊人的潜力，因此它值得拥有一个适当的标准，而 ERC-721 就是为了解决这个问题而诞生的！

**什么是 ERC-721？**

ERC-721 引入了 NFT 的标准，换句话说，这种类型的代币是独一无二的，并且可以与来自同一个智能合约的另一个代币具有不同的价值，这可能是由于它的年龄、稀有度，甚至像它的外观等其他因素。等等，外观？

是的！所有的 NFT 都有一个名为 `tokenId` 的 `uint256` 变量，因此对于任何 ERC-721 合约，`contract address, uint256 tokenId` 对必须是全局唯一的。也就是说，去中心化应用 (dapp) 可以有一个“转换器”，它使用 `tokenId` 作为输入，并输出一些很酷的东西的图像，比如僵尸、武器、技能或令人惊叹的猫咪！

## 前提条件 {#prerequisites}

- [账户](/developers/docs/accounts/)
- [智能合约](/developers/docs/smart-contracts/)
- [代币标准](/developers/docs/standards/tokens/)

## 正文 {#body}

ERC-721（[以太坊](/)征求意见稿 721）由 William Entriken、Dieter Shirley、Jacob Evans 和 Nastassia Sachs 于 2018 年 1 月提出，是一个非同质化代币标准，它在智能合约中实现了代币的 API。

它提供了诸如将代币从一个账户转账到另一个账户、获取账户的当前代币余额、获取特定代币的所有者以及网络上可用代币的总供应量等功能。除此之外，它还有一些其他功能，例如授权第三方账户可以转移某个账户中的一定数量的代币。

如果一个智能合约实现了以下方法和事件，它就可以被称为 ERC-721 非同质化代币合约，并且一旦部署，它将负责跟踪在以太坊上创建的代币。

来自 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)：

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

让我们看看标准为何如此重要，它使我们能够轻松检查以太坊上的任何 ERC-721 代币合约。我们只需要合约应用程序二进制接口 (ABI) 即可创建任何 ERC-721 代币的接口。正如你在下面看到的，我们将使用一个简化的 ABI，使其成为一个低门槛的示例。

#### Web3.py 示例 {#web3py-example-2}

首先，确保你已经安装了 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 库：

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # 加密猫合约

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # 加密猫销售拍卖

# 这是一个 ERC-721 NFT 合约的简化版合约应用程序二进制接口（ABI）。
# 它将仅暴露以下方法：balanceOf(address)、name()、ownerOf(tokenId)、symbol()、totalSupply()
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

# 使用转账事件 ABI 获取有关已转账加密猫的信息。
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# 我们需要事件的签名来过滤日志
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# 注意：
#   - 如果没有返回转账事件，请将区块数量从 120 开始增加。
#   - 如果你没有找到任何转账事件，你也可以尝试在以下地址获取 tokenId：
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       点击展开事件的日志并复制其 "tokenId" 参数
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # 将上面链接中的 "tokenId" 粘贴到此处
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

加密猫合约除了标准事件外，还有一些有趣的事件。

让我们检查其中的两个，`Pregnant` 和 `Birth`。

```python
# 使用怀孕和出生事件 ABI 获取有关新加密猫的信息。
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

# 我们需要事件的签名来过滤日志
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# 这是一个怀孕事件：
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# 这是一个出生事件：
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## 流行的 NFT {#popular-nfts}

- [Etherscan NFT 追踪器](https://etherscan.io/nft-top-contracts) 按转账量列出了以太坊上的顶级 NFT。
- [加密猫](https://www.cryptokitties.co/) 是一款围绕可繁殖、可收藏且非常可爱的生物（我们称之为加密猫）为中心的游戏。
- [Sorare](https://sorare.com/) 是一款全球梦幻足球游戏，你可以在其中收集限量版收藏品，管理你的球队并竞争赢取奖品。
- [以太坊域名服务 (ENS)](https://ens.domains/) 提供了一种安全且去中心化的方式，使用简单、人类可读的名称来寻址区块链内外的资源。
- [POAP](https://poap.xyz) 向参加活动或完成特定操作的人提供免费的 NFT。POAP 可以免费创建和分发。
- [Unstoppable Domains](https://unstoppabledomains.com/) 是一家总部位于旧金山的公司，在区块链上构建域名。区块链域名用人类可读的名称取代了加密货币地址，并可用于启用抗审查的网站。
- [Gods Unchained Cards](https://godsunchained.com/) 是以太坊区块链上的一款集换式卡牌游戏 (TCG)，它使用 NFT 为游戏内资产带来真正的所有权。
- [无聊猿游艇俱乐部 (Bored Ape Yacht Club)](https://boredapeyachtclub.com) 是 10,000 个独特 NFT 的集合，它不仅是一件可证明稀有的艺术品，还充当俱乐部的会员代币，提供随着社区努力而随时间增加的会员特权和福利。

## 延伸阅读 {#further-reading}

- [EIP-721：ERC-721 非同质化代币标准](https://eips.ethereum.org/EIPS/eip-721)
- [欧本齐柏林 - ERC-721 文档](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [欧本齐柏林 - ERC-721 实现](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## 教程：在以太坊上使用非同质化代币 (ERC-721) 进行构建 {#tutorials}

- [Vyper ERC-721 合约演练](/developers/tutorials/erc-721-vyper-annotated-code/) _– 用 Vyper 编写的完整 ERC-721 NFT 合约的带注释演练。_
- [如何编写和部署 NFT（第 1/3 部分）](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– 编写和部署你的第一个 ERC-721 智能合约的分步指南。_
- [如何铸造 NFT（第 2/3 部分）](/developers/tutorials/how-to-mint-an-nft/) _– 如何使用你部署的智能合约和 Web3 铸造 ERC-721 NFT。_
- [如何在钱包中查看你的 NFT（第 3/3 部分）](/developers/tutorials/how-to-view-nft-in-metamask/) _– 部署后如何在梅塔马斯克中显示你铸造的 NFT。_
- [NFT 铸造器教程](/developers/tutorials/nft-minter/) _– 使用 React 前端、梅塔马斯克和 Alchemy 构建全栈 NFT 铸造去中心化应用 (dapp)。_